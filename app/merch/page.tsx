import type { Metadata } from "next";
import MerchContent from "./MerchContent";
import { MERCH } from "./merch";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/app/lib/site";

const description = `${MERCH.name} — ${MERCH.price} ${MERCH.currency} (${MERCH.priceNote}). Official merch from Australian-based country singer-songwriter Cécile Gardens. ${MERCH.story}`;

export const metadata: Metadata = {
  title: `Merch — ${MERCH.name}`,
  description,
  alternates: { canonical: "/merch" },
  openGraph: {
    type: "website",
    url: "/merch",
    title: `${MERCH.name} — Cécile Gardens`,
    description,
    images: [{ url: MERCH.images[0].src, alt: MERCH.images[0].alt }],
  },
};

// Product markup so the shirt can surface in product results. `availability`
// is InStock and the seller is the artist entity from the root layout — the
// order itself goes through the enquiry form, hence no `url` to a checkout.
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: MERCH.name,
  description: MERCH.story,
  image: MERCH.images.map((image) => absoluteUrl(image.src)),
  brand: { "@type": "Brand", name: SITE_NAME },
  category: "Apparel",
  offers: {
    "@type": "Offer",
    price: MERCH.price,
    priceCurrency: MERCH.currency,
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/merch`,
    seller: { "@id": `${SITE_URL}/#artist` },
  },
};

export default function MerchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <MerchContent />
    </>
  );
}
