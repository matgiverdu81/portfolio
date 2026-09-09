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
    photos: [
      { src: "images/qundya/mathieu_photography-72.jpg" },
      { src: "images/qundya/mathieu_photography-73.jpg" },
      { src: "images/qundya/mathieu_photography-74.jpg" },
      { src: "images/qundya/mathieu_photography-75.jpg" },
      { src: "images/qundya/mathieu_photography-76.jpg" },
      { src: "images/qundya/mathieu_photography-77.jpg" },
   ]
  },
  {
    slug: "lesducs",
    title: "Les Ducs",
    category: "Event",
    description:
      "Close, unhurried sessions in available light. Most of these are made with one lens and very little direction — the goal is a likeness, not a performance.",
    photos: [
      { src: "images/lesducs/mathieu_photography-23.jpg" },
      { src: "images/lesducs/mathieu_photography-24.jpg" },
      { src: "images/lesducs/mathieu_photography-25.jpg" },
      { src: "images/lesducs/mathieu_photography-26.jpg" },
      { src: "images/lesducs/mathieu_photography-27.jpg" },
      { src: "images/lesducs/mathieu_photography-28.jpg" },
      { src: "images/lesducs/mathieu_photography-29.jpg" },
      { src: "images/lesducs/mathieu_photography-30.jpg" },
      { src: "images/lesducs/mathieu_photography-31.jpg" },
      { src: "images/lesducs/mathieu_photography-32.jpg" },
   ]
  },
  {
    slug: "apcel",
    title: "NUS - Apcel",
    category: "Event",
    description:
      "Close, unhurried sessions in available light. Most of these are made with one lens and very little direction — the goal is a likeness, not a performance.",
    photos: [
      { src: "images/apcel/mathieu_photography-55.jpg" },
      { src: "images/apcel/mathieu_photography-56.jpg" },
      { src: "images/apcel/mathieu_photography-57.jpg" },
      { src: "images/apcel/mathieu_photography-58.jpg" },
      { src: "images/apcel/mathieu_photography-59.jpg" },
      { src: "images/apcel/mathieu_photography-60.jpg" },
   ]
  },
  {
    slug: "kevin",
    title: "Kevin",
    category: "Lifestyle",
    description:
      "Close, unhurried sessions in available light. Most of these are made with one lens and very little direction — the goal is a likeness, not a performance.",
    photos: [
      { src: "images/portraits/mathieu_photography-47.jpg" },
      { src: "images/portraits/mathieu_photography-48.jpg" },
      { src: "images/portraits/mathieu_photography-49.jpg" },
      { src: "images/portraits/mathieu_photography-50.jpg" },
      { src: "images/portraits/mathieu_photography-51.jpg" },
      { src: "images/portraits/mathieu_photography-52.jpg" },
      { src: "images/portraits/mathieu_photography-53.jpg" },
      { src: "images/portraits/mathieu_photography-54.jpg" },
   ]
  },
  {
    slug: "cil",
    title: "NUS CIL",
    category: "Event",
    description:
      "Two years of early mornings on the north shore, shot between tides. A slow catalogue of the same coastline in different weather.",
    photos: buildPhotos(POOL.slice(14, 26)),
  },
  {
    slug: "gxo",
    title: "GXO",
    category: "Event",
    description:
      "Handheld, high grain, mostly after 10pm. Streetlight and shopfronts standing in for a flash I try not to use.",
    photos: buildPhotos(POOL.slice(26, 40)),
  },
  {
    slug: "musg",
    title: "Miss Universe Singapore 2025",
    category: "Event",
    description:
      "A coastal wedding shot over one long day, from the first cup of coffee to the last song. Documentary coverage with a handful of arranged portraits.",
    photos: buildPhotos(POOL.slice(40, 54)),
  },
  {
    slug: "shelovesdata",
    title: "She Loves Data",
    category: "Event",
    description:
      "Selections from three years of 35mm — mostly Portra 400 and a little Tri-X when the light ran out. Scanned, not digitally corrected.",
    photos: buildPhotos(POOL.slice(54, 66)),
  },
  {
    slug: "vaa",
    title: "Va'a World Championships 2026",
    category: "Event",
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
