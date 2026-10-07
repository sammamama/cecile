// Shared looks for the /qr link page. Transparent with a white outline and
// white text, which reads against the dimmed photo where the brand brown
// would sink into the grass.

// A plain link pill.
export const linkPillClass =
  "group relative flex w-full items-center justify-center rounded-full border border-white/80 bg-transparent px-11 py-4 text-center text-lg italic text-white transition-colors duration-200 hover:bg-white/15 sm:text-xl";

// A featured link: the same outline, but a rounded card with room for media.
export const featureCardClass =
  "block overflow-hidden rounded-3xl border border-white/80 text-white";

// The text row inside a feature card. Icon pinned left, label centred, like
// the pills.
export const featureRowClass =
  "relative flex items-center justify-center px-11 py-4 text-center text-lg italic transition-colors duration-200 hover:bg-white/15 sm:text-xl";

export const featureIconClass = "absolute left-4 flex items-center";
