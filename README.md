# Elin Cole Photography — portfolio site

A static, no-build portfolio site: a home page listing your galleries
(filterable by category) and a gallery page for each shoot with a
masonry grid that handles mixed photo orientations, plus a lightbox
for viewing photos full-size. Built with plain HTML/CSS/JS so it can
be hosted directly on GitHub Pages — no build step, no dependencies
beyond two Google Fonts.

## File structure

```
index.html        Home page — hero, category filter, gallery index
gallery.html       Gallery template — reads ?id=<slug> to load one gallery
css/style.css      All styling
js/data.js         Your galleries and photos live here
js/main.js         Home page behavior (filter chips, gallery cards)
js/gallery.js      Gallery page behavior (masonry layout, lightbox)
```

## Previewing locally

Because the pages load JS as separate files, open them through a
local server rather than double-clicking the HTML file:

```
cd portfolio
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Replacing the placeholder photos

Everything currently pulls placeholder images from
[Picsum Photos](https://picsum.photos). To swap in your own work,
edit `js/data.js`:

1. Add your images to a folder (e.g. `images/portraits/01.jpg`).
2. In `js/data.js`, replace each gallery's `photos` array with your
   own list, e.g.:

   ```js
   photos: [
     { src: "images/portraits/01.jpg" },
     { src: "images/portraits/02.jpg" },
     // ...
   ]
   ```

3. Update `title`, `category`, and `description` for each gallery to
   match your work. The `category` values are what populate the
   filter chips on the home page — reuse the same category name
   across galleries to group them.
4. The masonry grid sizes itself from each image's actual rendered
   height, so any mix of landscape, portrait, square, or panorama
   photos will lay out correctly with no extra configuration.
5. Cover images for the home page are auto-generated from each
   gallery's first photo. To use a different cover image, set
   `cover: "images/portraits/hero.jpg"` on that gallery object.

## Editing text

- Site name: the `wordmark` link text in `index.html` and
  `gallery.html`.
- Hero headline and intro: the `.hero` section in `index.html`.
- About and contact copy: the `#about` and `#contact` sections in
  `index.html`.

## Deploying to GitHub Pages

1. Create a new GitHub repository and push this folder's contents to
   the `main` branch (the site's files should sit at the repo root,
   or in a `/docs` folder — either works).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a
   branch," choose the `main` branch, and the root folder (or
   `/docs`, whichever you used).
4. Save. GitHub will publish the site at
   `https://<your-username>.github.io/<repo-name>/` within a minute
   or two.

If you use a custom domain, add it under **Settings → Pages → Custom
domain** and follow GitHub's DNS instructions.

## Notes

- All photos, name, and copy in this template are placeholders —
  replace them with your own before publishing.
- The design respects `prefers-reduced-motion` and has visible
  keyboard focus states throughout.
