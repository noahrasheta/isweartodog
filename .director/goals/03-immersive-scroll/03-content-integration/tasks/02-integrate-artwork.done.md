# Task: Integrate all artwork with next/image static imports

## What To Do

Place all 9 approved artwork files in the project. Use static imports (import letterArt1 from './art/letter-1.jpg') to get automatic blurDataURL, dimensions, and WebP conversion on Vercel. Set priority={true} only on the first letter's image. Set correct sizes prop on all images. Verify blur placeholders appear during loading and images render at the correct aspect ratio without CLS.

## Why It Matters

Static imports are the key to both performance and visual quality — they provide blur placeholders (better perceived loading), auto-dimensions (prevents layout shift), and automatic format optimization on Vercel.

## Size

**Estimate:** medium

9 images to integrate with specific next/image configuration. Requires testing loading behavior and CLS.

## Done When

- [ ] All 9 artwork files in the project
- [ ] Each image imported statically (not as public path strings)
- [ ] priority={true} set only on first letter's image
- [ ] Correct sizes prop on all images
- [ ] Blur placeholders appear during loading
- [ ] No CLS from image loading (auto-dimensions from static import)
- [ ] Images display at correct 4:3 aspect ratio

## Needs First

LetterArt component from Step 2 and all curated artwork from Goal 2.
