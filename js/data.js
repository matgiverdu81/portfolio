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
    slug: "family",
    title: "Family photos",
    category: "Lifestyle",
    description:
      "Close, unhurried sessions in available light. Most of these are made with one lens and very little direction — the goal is a likeness, not a performance.",
    photos: [
      { src: "images/family/mathieu_photography-100.jpg" },
      { src: "images/family/mathieu_photography-101.jpg" },
      { src: "images/family/mathieu_photography-102.jpg" },
      { src: "images/family/mathieu_photography-103.jpg" },
      { src: "images/family/mathieu_photography-104.jpg" },
      { src: "images/family/mathieu_photography-92.jpg" },
      { src: "images/family/mathieu_photography-94.jpg" },
      { src: "images/family/mathieu_photography-95.jpg" },
      { src: "images/family/mathieu_photography-96.jpg" },
      { src: "images/family/mathieu_photography-97.jpg" },
      { src: "images/family/mathieu_photography-98.jpg" },
      { src: "images/family/mathieu_photography-99.jpg" },
   ]
  },
  {
    slug: "cil",
    title: "NUS CIL",
    category: "Event",
    description:
      "Two years of early mornings on the north shore, shot between tides. A slow catalogue of the same coastline in different weather.",
    photos: [
      { src: "images/cil/mathieu_photography-105.jpg" },
      { src: "images/cil/mathieu_photography-106.jpg" },
      { src: "images/cil/mathieu_photography-107.jpg" },
      { src: "images/cil/mathieu_photography-108.jpg" },
      { src: "images/cil/mathieu_photography-109.jpg" },
      { src: "images/cil/mathieu_photography-111.jpg" },
      { src: "images/cil/mathieu_photography-111.jpg" },
      { src: "images/cil/mathieu_photography-127.jpg" },
      { src: "images/cil/mathieu_photography-128.jpg" },
      { src: "images/cil/mathieu_photography-129.jpg" },
      { src: "images/cil/mathieu_photography-130.jpg" },
      { src: "images/cil/mathieu_photography-131.jpg" },
      { src: "images/cil/mathieu_photography-79.jpg" },
      { src: "images/cil/mathieu_photography-80.jpg" },
      { src: "images/cil/mathieu_photography-82.jpg" },
      { src: "images/cil/mathieu_photography-83.jpg" },
      { src: "images/cil/mathieu_photography-84.jpg" },
      { src: "images/cil/mathieu_photography-85.jpg" },
      { src: "images/cil/mathieu_photography-86.jpg" },
      { src: "images/cil/mathieu_photography-87.jpg" },
      { src: "images/cil/mathieu_photography-88.jpg" },
      { src: "images/cil/mathieu_photography-89.jpg" },
      { src: "images/cil/mathieu_photography-90.jpg" },
      { src: "images/cil/mathieu_photography-91.jpg" },
   ]
  },
  {
    slug: "gxo",
    title: "GXO",
    category: "Event",
    description:
      "Handheld, high grain, mostly after 10pm. Streetlight and shopfronts standing in for a flash I try not to use.",
    photos: [
      { src: "images/gxo/mathieu_photography-62.jpg" },
      { src: "images/gxo/mathieu_photography-63.jpg" },
      { src: "images/gxo/mathieu_photography-64.jpg" },
      { src: "images/gxo/mathieu_photography-65.jpg" },
      { src: "images/gxo/mathieu_photography-66.jpg" },
      { src: "images/gxo/mathieu_photography-67.jpg" },
      { src: "images/gxo/mathieu_photography-68.jpg" },
      { src: "images/gxo/mathieu_photography-69.jpg" },
      { src: "images/gxo/mathieu_photography-70.jpg" },
      { src: "images/gxo/mathieu_photography-71.jpg" },
   ]
  },
  {
    slug: "musg",
    title: "Miss Universe Singapore 2025",
    category: "Event",
    description:
      "A coastal wedding shot over one long day, from the first cup of coffee to the last song. Documentary coverage with a handful of arranged portraits.",
    photos: [
      { src: "images/musg/mathieu_photography-10.jpg" },
      { src: "images/musg/mathieu_photography-11.jpg" },
      { src: "images/musg/mathieu_photography-12.jpg" },
      { src: "images/musg/mathieu_photography-13.jpg" },
      { src: "images/musg/mathieu_photography-14.jpg" },
      { src: "images/musg/mathieu_photography-15.jpg" },
      { src: "images/musg/mathieu_photography-16.jpg" },
      { src: "images/musg/mathieu_photography-17.jpg" },
      { src: "images/musg/mathieu_photography-18.jpg" },
      { src: "images/musg/mathieu_photography-19.jpg" },
      { src: "images/musg/mathieu_photography-2.jpg" },
      { src: "images/musg/mathieu_photography-20.jpg" },
      { src: "images/musg/mathieu_photography-21.jpg" },
      { src: "images/musg/mathieu_photography-22.jpg" },
      { src: "images/musg/mathieu_photography-3.jpg" },
      { src: "images/musg/mathieu_photography-4.jpg" },
      { src: "images/musg/mathieu_photography-5.jpg" },
      { src: "images/musg/mathieu_photography-6.jpg" },
      { src: "images/musg/mathieu_photography-7.jpg" },
      { src: "images/musg/mathieu_photography-8.jpg" },
      { src: "images/musg/mathieu_photography-9.jpg" },
      { src: "images/musg/mathieu_photography.jpg" },
   ]
  },
  {
    slug: "shelovesdata",
    title: "She Loves Data",
    category: "Event",
    description:
      "Selections from three years of 35mm — mostly Portra 400 and a little Tri-X when the light ran out. Scanned, not digitally corrected.",
    photos: [
      { src: "images/shelovesdata/mathieu_photography-33.jpg" },
      { src: "images/shelovesdata/mathieu_photography-34.jpg" },
      { src: "images/shelovesdata/mathieu_photography-35.jpg" },
      { src: "images/shelovesdata/mathieu_photography-36.jpg" },
      { src: "images/shelovesdata/mathieu_photography-37.jpg" },
      { src: "images/shelovesdata/mathieu_photography-38.jpg" },
      { src: "images/shelovesdata/mathieu_photography-39.jpg" },
      { src: "images/shelovesdata/mathieu_photography-40.jpg" },
      { src: "images/shelovesdata/mathieu_photography-41.jpg" },
      { src: "images/shelovesdata/mathieu_photography-42.jpg" },
      { src: "images/shelovesdata/mathieu_photography-43.jpg" },
      { src: "images/shelovesdata/mathieu_photography-44.jpg" },
      { src: "images/shelovesdata/mathieu_photography-45.jpg" },
      { src: "images/shelovesdata/mathieu_photography-46.jpg" },
   ]
  },
  {
    slug: "vaa",
    title: "Va'a World Championships 2026",
    category: "Event",
    description:
      "Small studio sessions between paid work — testing light against objects that don't move, mostly borrowed from the kitchen table.",
    photos: [
      { src: "images/vaa/mathieu_photography-112.jpg" },
      { src: "images/vaa/mathieu_photography-113.jpg" },
      { src: "images/vaa/mathieu_photography-114.jpg" },
      { src: "images/vaa/mathieu_photography-115.jpg" },
      { src: "images/vaa/mathieu_photography-117.jpg" },
      { src: "images/vaa/mathieu_photography-118.jpg" },
      { src: "images/vaa/mathieu_photography-119.jpg" },
      { src: "images/vaa/mathieu_photography-120.jpg" },
      { src: "images/vaa/mathieu_photography-121.jpg" },
      { src: "images/vaa/mathieu_photography-122.jpg" },
      { src: "images/vaa/mathieu_photography-124.jpg" },
      { src: "images/vaa/mathieu_photography-125.jpg" },
      { src: "images/vaa/mathieu_photography-126.jpg" },
      { src: "images/vaa/mathieu_photography-132.jpg" },
      { src: "images/vaa/mathieu_photography-133.jpg" },
      { src: "images/vaa/mathieu_photography-135.jpg" },
      { src: "images/vaa/mathieu_photography-136.jpg" },
      { src: "images/vaa/mathieu_photography-137.jpg" },
      { src: "images/vaa/mathieu_photography-138.jpg" },
      { src: "images/vaa/mathieu_photography-139.jpg" },
      { src: "images/vaa/mathieu_photography-140.jpg" },
      { src: "images/vaa/mathieu_photography-141.jpg" },
      { src: "images/vaa/mathieu_photography-142.jpg" },
      { src: "images/vaa/mathieu_photography-143.jpg" },
      { src: "images/vaa/mathieu_photography-145.jpg" },
      { src: "images/vaa/mathieu_photography-146.jpg" },
      { src: "images/vaa/mathieu_photography-147.jpg" },
      { src: "images/vaa/mathieu_photography-148.jpg" },
   ]
  },
];

// Cover image for the home page index — first frame of each gallery,
// cropped a little wider for the listing.
GALLERIES.forEach((g) => {
  g.cover = picsum(g.photos[0].id, 1400, 1000);
});
