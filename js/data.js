// ---------------------------------------------------------------
// Placeholder photo data. Replace picsum URLs with your own images
// (see README.md) — everything else keeps working unchanged.
// ---------------------------------------------------------------

function picsum(id, w, h) {
  return `https://picsum.photos/id/${id}/${w}/${h}`;
}

// A cycle of aspect ratios so every gallery mixes landscape, portrait,
// square and panorama frames, the way a real contact sheet would.
const DIM_CYCLE = [
  { w: 1200, h: 900 },  // landscape 4:3
  { w: 900,  h: 1200 }, // portrait 3:4
  { w: 1100, h: 1100 }, // square
  { w: 1400, h: 700 },  // panorama
  { w: 800,  h: 1200 }, // tall portrait
  { w: 1300, h: 867 },  // landscape 3:2
  { w: 950,  h: 1250 }, // portrait
  { w: 1250, h: 800 },  // landscape
];

function buildPhotos(ids) {
  return ids.map((id, i) => {
    const dim = DIM_CYCLE[i % DIM_CYCLE.length];
    return { id, src: picsum(id, dim.w, dim.h), w: dim.w, h: dim.h };
  });
}

// Non-overlapping id ranges so no two galleries pull the same source image.
const POOL = Array.from({ length: 160 }, (_, i) => i + 1);

const GALLERIES = [
  {
    slug: "qundya",
    title: "Qundya",
    category: "Lifestyle",
    description:
      "Close, unhurried sessions in available light. Most of these are made with one lens and very little direction — the goal is a likeness, not a performance.",
    photos: buildPhotos(POOL.slice(0, 14)),
  },
  {
    slug: "lesducs",
    title: "Les Ducs",
    category: "Event",
    description:
      "Close, unhurried sessions in available light. Most of these are made with one lens and very little direction — the goal is a likeness, not a performance.",
    photos: buildPhotos(POOL.slice(0, 14)),
  },
  {
    slug: "apcel",
    title: "NUS - Apcel",
    category: "Event",
    description:
      "Close, unhurried sessions in available light. Most of these are made with one lens and very little direction — the goal is a likeness, not a performance.",
    photos: buildPhotos(POOL.slice(0, 14)),
  },
  {
    slug: "portraits",
    title: "Portraits",
    category: "Portrait",
    description:
      "Close, unhurried sessions in available light. Most of these are made with one lens and very little direction — the goal is a likeness, not a performance.",
    photos: buildPhotos(POOL.slice(0, 14)),
  },
  {
    slug: "coastal-light",
    title: "Coastal Light",
    category: "Landscape",
    description:
      "Two years of early mornings on the north shore, shot between tides. A slow catalogue of the same coastline in different weather.",
    photos: buildPhotos(POOL.slice(14, 26)),
  },
  {
    slug: "city-after-dark",
    title: "City After Dark",
    category: "Street",
    description:
      "Handheld, high grain, mostly after 10pm. Streetlight and shopfronts standing in for a flash I try not to use.",
    photos: buildPhotos(POOL.slice(26, 40)),
  },
  {
    slug: "wild-union",
    title: "Wild Union",
    category: "Wedding",
    description:
      "A coastal wedding shot over one long day, from the first cup of coffee to the last song. Documentary coverage with a handful of arranged portraits.",
    photos: buildPhotos(POOL.slice(40, 54)),
  },
  {
    slug: "on-film",
    title: "On Film",
    category: "Film",
    description:
      "Selections from three years of 35mm — mostly Portra 400 and a little Tri-X when the light ran out. Scanned, not digitally corrected.",
    photos: buildPhotos(POOL.slice(54, 66)),
  },
  {
    slug: "still-life-studies",
    title: "Still Life Studies",
    category: "Studio",
    description:
      "Small studio sessions between paid work — testing light against objects that don't move, mostly borrowed from the kitchen table.",
    photos: buildPhotos(POOL.slice(66, 76)),
  },
];

// Cover image for the home page index — first frame of each gallery,
// cropped a little wider for the listing.
GALLERIES.forEach((g) => {
  g.cover = picsum(g.photos[0].id, 1400, 1000);
});
