import type { NextRequest } from "next/server";

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

/**
 * In-memory fixed-window limiter, keyed by client IP.
 *
 * CAVEAT: this lives in the process, so it resets on deploy and is not shared
 * between serverless instances — a user hitting different instances can exceed
 * the limit. It stops casual abuse, not a determined attacker. Move to Redis
 * (e.g. Upstash) if this needs to hold under real traffic.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  /** Seconds until the window resets — used for the Retry-After header. */
  retryAfter: number;
};

export function rateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now >= entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1, retryAfter: 0 };
  }

  entry.count += 1;
  const retryAfter = Math.ceil((entry.resetAt - now) / 1000);

  if (entry.count > MAX_REQUESTS) {
    return { allowed: false, remaining: 0, retryAfter };
  }

  return { allowed: true, remaining: MAX_REQUESTS - entry.count, retryAfter };
}

/** Drop expired entries so the map does not grow without bound. */
export function sweep() {
  const now = Date.now();
  for (const [key, entry] of hits) {
    if (now >= entry.resetAt) hits.delete(key);
  }
}
