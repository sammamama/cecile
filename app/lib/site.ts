export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cecilegardens.com"
).replace(/\/$/, "");

export const SITE_NAME = "Cécile Gardens";

export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const REGIONS = [
  { name: "Australia", code: "AU", city: "Melbourne", state: "Victoria" },
  { name: "Netherlands", code: "NL", city: "Bedum", state: "Groningen" },
] as const;
