document.addEventListener("DOMContentLoaded", async () => {
  const filterRow = document.getElementById("filterRow");
  const grid = document.getElementById("galleryGrid");
  if (!filterRow || !grid) return;

  await applyPhotoManifest();

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
      </div>
      <div class="gallery-card-meta">
        <h3>${g.title}</h3>
        <p class="gallery-card-cat">${g.category}</p>
        <p class="gallery-card-count">${g.photos.length} frames</p>
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
