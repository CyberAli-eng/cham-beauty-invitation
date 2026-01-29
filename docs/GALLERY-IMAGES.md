# Gallery image specs (Cham Beauty)

Use this guide when adding or replacing the ~20 photos in the 3D gallery.

## Where to put images

- **Option A (recommended):** `src/assets/`  
  - Add files like `gallery-7.jpg`, `gallery-8.jpg`, … up to `gallery-20.jpg`.  
  - Import in `src/components/GallerySection.tsx` and add entries to the `SOURCE_ITEMS` array (see below).

- **Option B:** `public/`  
  - e.g. `public/gallery/gallery-7.jpg`.  
  - Reference in the gallery as `/gallery/gallery-7.jpg` (no import).

## Recommended specs per image

| Spec | Recommendation | Notes |
|------|----------------|------|
| **Aspect ratio** | **3 : 4** (portrait) or **1 : 1** (square) | Fits the 3D carousel cards best; 4:3 landscape also works. |
| **Resolution** | **Min 400×533 px** (portrait) or **400×400 px** (square) | For sharp display on retina; up to **1200×1600** or **1200×1200** is fine. |
| **Format** | **JPG** or **WebP** | JPG for photos; WebP for smaller size. |
| **File size** | **&lt; 300 KB** per image if possible | Keeps the page fast; compress with TinyPNG or similar. |
| **Content** | Events, people, ambience, details | Consistent style (e.g. same colour grade) looks best. |

## Adding more than 6 images

1. Add the image file to `src/assets/` (e.g. `gallery-7.jpg`).
2. In `src/components/GallerySection.tsx`:
   - Add: `import gallery7 from "@/assets/gallery-7.jpg";`
   - Add to `SOURCE_ITEMS`: `{ id: 7, label: "Your caption", image: gallery7 },`
3. The carousel is set up for **20 slots**. Right now it cycles through your first 6 images. Once you have 7–20 entries in `SOURCE_ITEMS`, update `TOTAL_SLOTS` or the logic that builds `galleryItems` so it uses your full list (and only repeats if you have fewer than 20).

## Captions

Each item has a `label` (e.g. "Exclusive Launch", "VIP Lounge"). Use short, on-brand titles so they look good on hover and in the lightbox.

## Optional: different aspect ratios

The 3D cards are styled for portrait/square. If you use very wide images, they will be cropped to the card. For best results, crop or export at 3:4 or 1:1 before adding.
