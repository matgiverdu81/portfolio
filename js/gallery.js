function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

document.addEventListener("DOMContentLoaded", async () => {
  await applyPhotoManifest();
  
  const slug = getParam("id");
  const gallery = GALLERIES.find((g) => g.slug === slug) || GALLERIES[0];

  document.title = `${gallery.title} — Elin Cole Photography`;
  document.getElementById("galCategory").textContent = gallery.category;
  document.getElementById("galTitle").textContent = gallery.title;
  document.getElementById("galDesc").textContent = gallery.description;
  document.getElementById("galMeta").textContent = `${gallery.photos.length} frames`;

  const grid = document.getElementById("masonryGrid");
  gallery.photos.forEach((photo, idx) => {
    const item = document.createElement("figure");
    item.className = "masonry-item";
    item.innerHTML = `<img src="${photo.src}" alt="${gallery.title}, frame ${idx + 1}" data-index="${idx}" loading="${idx < 4 ? "eager" : "lazy"}" />`;
    grid.appendChild(item);
  });

  // --- Masonry: give each item a grid-row span based on its rendered height
  function layout() {
    const styles = getComputedStyle(grid);
    const rowHeight = parseInt(styles.getPropertyValue("grid-auto-rows"), 10) || 8;
    const rowGap = parseInt(styles.getPropertyValue("gap"), 10) || 0;

    grid.querySelectorAll(".masonry-item").forEach((item) => {
      const contentHeight = item.getBoundingClientRect().height;
      const span = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
      item.style.gridRowEnd = `span ${span}`;
    });
  }

  const imgs = grid.querySelectorAll("img");
  imgs.forEach((img) => {
    if (img.complete) layout();
    img.addEventListener("load", layout);
  });
  window.addEventListener("load", layout);
  window.addEventListener("resize", debounce(layout, 150));

  // --- Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCounter = document.getElementById("lightboxCounter");
  let current = 0;

  function render() {
    const photo = gallery.photos[current];
    lightboxImg.src = photo.src;
    lightboxImg.alt = `${gallery.title}, frame ${current + 1}`;
    lightboxCounter.textContent = `${current + 1} / ${gallery.photos.length}`;
  }

  function open(index) {
    current = index;
    render();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  function step(delta) {
    current = (current + delta + gallery.photos.length) % gallery.photos.length;
    render();
  }

  grid.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;
    open(parseInt(img.dataset.index, 10));
  });

  document.getElementById("lightboxClose").addEventListener("click", close);
  document.getElementById("lightboxPrev").addEventListener("click", () => step(-1));
  document.getElementById("lightboxNext").addEventListener("click", () => step(1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });
});
