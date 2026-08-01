import { demoVideos } from "./demoVideos";
import { SITE_URL, absoluteUrl } from "@/app/lib/site";

/**
 * schema.org VideoObject markup so search engines can index the performance
 * clips — the <video> tag alone tells a crawler nothing about what it contains.
 *
 * schema.org URL fields have to be absolute — a crawler resolves `contentUrl`
 * out of context, so a `/testimonial/…` path is simply invalid. `absoluteUrl`
 * prefixes the canonical origin.
 *
 * Note: Google also requires `thumbnailUrl` and `uploadDate` for video rich
 * results. Those are emitted only when filled in on `demoVideos`, so the JSON-LD
 * stays truthful rather than carrying invented values.
 */
export default function VideoSchema() {
  const data = demoVideos.map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${video.name} — Cécile Gardens live`,
    description: video.description,
    contentUrl: absoluteUrl(video.src),
    // Points at the section the clip actually plays in.
    embedUrl: `${SITE_URL}/#live`,
    creator: { "@id": `${SITE_URL}/#artist` },
    genre: "Country",
    ...(video.poster ? { thumbnailUrl: [absoluteUrl(video.poster)] } : {}),
    ...(video.uploadDate ? { uploadDate: video.uploadDate } : {}),
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
