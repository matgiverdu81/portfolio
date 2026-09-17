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

document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
  const filterRow = document.getElementById("filterRow");
  const grid = document.getElementById("galleryGrid");
  if (!filterRow || !grid) return;

  const categories = ["All", ...new Set(GALLERIES.map((g) => g.category))];

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
    card.dataset.category = g.category.toLowerCase();
    card.innerHTML = `
      <div class="gallery-card-media">
        <img src="${g.cover}" alt="${g.title}" loading="${i < 3 ? "eager" : "lazy"}" />
        <div class="gallery-card-tooltip">
          <span class="gallery-card-tooltip-title">${g.title}</span>
          <span class="gallery-card-tooltip-cat">${g.category}</span>
        </div>
      </div>
      <div class="gallery-card-meta">
        <h3>${g.title}</h3>
        <p class="gallery-card-cat">${g.category}</p>
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
      const show = filter === "all" || card.dataset.category === filter;
      card.style.display = show ? "" : "none";
    });
  });
});
