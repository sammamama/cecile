export const MERCH = {
  name: "The Man on the Tram — T-shirt",
  price: 30,
  currency: "AUD",
  priceNote: "excl. shipping",
  sizes: ["S", "M", "L", "XL"],
  story:
    "It was a cold rainy night when I took the tram towards St Kilda. On that tram I met a random man who told me his whole life story. And even though he had been through so much he just hoped for more happiness in this world. Something I hope I can give with my song 'The Man on the Tram' and this shirt.",
  images: [
    { src: "/merch_front.jpg", alt: "The Man on the Tram t-shirt, front" },
    { src: "/merch_back.jpg", alt: "The Man on the Tram t-shirt, back" },
  ],
} as const;
