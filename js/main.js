function initHeroSlider() {
  const slider = document.getElementById("heroSlider");
  if (!slider) return;
 
  const photos = HERO_PHOTOS.length ? HERO_PHOTOS : GALLERIES.map((g) => g.cover).filter(Boolean);
  if (!photos.length) return;
 
  photos.forEach((src, i) => {
    const slide = document.createElement("div");
    slide.className = "hero-slide" + (i === 0 ? " is-active" : "");
    slide.innerHTML = `<img src="${src}" alt="" loading="${i === 0 ? "eager" : "lazy"}" />`;
    slider.appendChild(slide);
  });
 
  if (photos.length < 2) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
 
  const slides = slider.querySelectorAll(".hero-slide");
  let current = 0;
 
  setInterval(() => {
    slides[current].classList.remove("is-active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("is-active");
  }, 5000);
}

function initShowreel() {
  const btn = document.getElementById("showreelBtn");
  const lightbox = document.getElementById("showreelLightbox");
  if (!btn || !lightbox) return;

  if (!SHOWREEL_VIDEO) {
    btn.hidden = true;
    return;
  }

  const video = document.getElementById("showreelVideo");
  const closeBtn = document.getElementById("showreelClose");

  function open() {
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    video.src = SHOWREEL_VIDEO;
    if (SHOWREEL_POSTER) video.poster = SHOWREEL_POSTER;
    const playing = video.play();
    if (playing) playing.catch(() => {});
  }

  function close() {
    video.pause();
    video.removeAttribute("src");
    video.load();
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  btn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
  initShowreel();
  const filterRow = document.getElementById("filterRow");
  const grid = document.getElementById("galleryGrid");
  if (!filterRow || !grid) return;

  const categories = ["All", ...new Set(GALLERIES.flatMap((g) => g.categories))];
 
  categories.forEach((cat, i) => {
    const btn = document.createElement("button");
    btn.className = "filter-chip" + (i === 0 ? " is-active" : "");
    btn.type = "button";
    btn.dataset.filter = cat.toLowerCase();
    btn.textContent = cat === "All" ? "All work" : cat;
    filterRow.appendChild(btn);
  });
 
  GALLERIES.forEach((g, i) => {
    const card = document.createElement("a");
    card.href = `gallery.html?id=${g.slug}`;
    card.className = "gallery-card";
    card.dataset.categories = g.categories.map((c) => c.toLowerCase()).join(",");
    card.innerHTML = `
      <div class="gallery-card-media">
        <img src="${g.cover}" alt="${g.title}" loading="${i < 3 ? "eager" : "lazy"}" />
        <div class="gallery-card-tooltip">
          <span class="gallery-card-tooltip-title">${g.title}</span>
          <span class="gallery-card-tooltip-cat">${g.categories.join(", ")}</span>
        </div>
      </div>
      <div class="gallery-card-meta">
        <h3>${g.title}</h3>
        <p class="gallery-card-cat">${g.categories.join(", ")}</p>
      </div>
    `;
    grid.appendChild(card);
  });
 
  filterRow.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-chip");
    if (!btn) return;
 
    filterRow.querySelectorAll(".filter-chip").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
 
    const filter = btn.dataset.filter;
    grid.querySelectorAll(".gallery-card").forEach((card) => {
      const show = filter === "all" || card.dataset.categories.split(",").includes(filter);
      card.style.display = show ? "" : "none";
    });
  });
});
