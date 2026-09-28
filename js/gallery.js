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

document.addEventListener("DOMContentLoaded", () => {
  
  const slug = getParam("id");
  const gallery = GALLERIES.find((g) => g.slug === slug) || GALLERIES[0];

  document.title = `${gallery.title} — MG Photography`;
  document.getElementById("galCategory").textContent = gallery.category;
  document.getElementById("galTitle").textContent = gallery.title;
  document.getElementById("galDesc").textContent = gallery.description;

  // --- Build the grid: photos become <img>, videos become <video> with a play badge
  const grid = document.getElementById("masonryGrid");
  gallery.photos.forEach((photo, idx) => {
    const item = document.createElement("figure");
    item.className = "masonry-item";
 
    if (isVideo(photo.src)) {
      item.classList.add("is-video");
      const poster = photo.poster ? ` poster="${photo.poster}"` : "";
      // "#t=0.001" makes iOS Safari show the first frame instead of a black box
      item.innerHTML = `
        <video src="${photo.src}#t=0.001"${poster} muted playsinline preload="metadata"
               disablepictureinpicture aria-label="${gallery.title}, video ${idx + 1}"
               data-index="${idx}"></video>
        <span class="video-badge" aria-hidden="true">
          <svg width="14" height="16" viewBox="0 0 14 16"><path d="M1 1.5v13a.5.5 0 0 0 .76.43l11-6.5a.5.5 0 0 0 0-.86l-11-6.5A.5.5 0 0 0 1 1.5z" fill="currentColor"/></svg>
        </span>`;
    } else {
      item.innerHTML = `<img src="${photo.src}" alt="${gallery.title}, frame ${idx + 1}" data-index="${idx}" loading="${idx < 4 ? "eager" : "lazy"}" />`;
    }
 
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

  // Images know their size on "load"; videos know it on "loadedmetadata"
  grid.querySelectorAll("img, video").forEach((el) => {
    const isVid = el.tagName === "VIDEO";
    const ready = isVid ? el.readyState >= 1 : el.complete;
    if (ready) layout();
    el.addEventListener(isVid ? "loadedmetadata" : "load", layout);
  });
  window.addEventListener("load", layout);
  window.addEventListener("resize", debounce(layout, 150));

  // --- Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxVideo = document.getElementById("lightboxVideo");
  const lightboxCounter = document.getElementById("lightboxCounter");
  let current = 0;

  function stopVideo() {
    lightboxVideo.pause();
    lightboxVideo.removeAttribute("src");
    lightboxVideo.removeAttribute("poster");
    lightboxVideo.load(); // stops any download still in progress
  }

  function render() {
    const photo = gallery.photos[current];
    
    if (isVideo(photo.src)) {
      lightboxImg.hidden = true;
      lightboxImg.removeAttribute("src");
      lightboxVideo.hidden = false;
      lightboxVideo.src = photo.src;
      if (photo.poster) lightboxVideo.poster = photo.poster;
      else lightboxVideo.removeAttribute("poster");
      const playing = lightboxVideo.play();
      if (playing) playing.catch(() => {}); // browser may block autoplay; controls still work
    } else {
      stopVideo();
      lightboxVideo.hidden = true;
      lightboxImg.hidden = false;
      lightboxImg.src = photo.src;
      lightboxImg.alt = `${gallery.title}, frame ${current + 1}`;
    }

    lightboxCounter.textContent = `${current + 1} / ${gallery.photos.length}`;
  }

  function open(index) {
    current = index;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    render();
  }
 
  function close() {
    stopVideo();
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }
 
  function step(delta) {
    current = (current + delta + gallery.photos.length) % gallery.photos.length;
    render();
  }

  grid.addEventListener("click", (e) => {
    const media = e.target.closest("[data-index]");
    if (!media) return;
    open(parseInt(media.dataset.index, 10));
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
