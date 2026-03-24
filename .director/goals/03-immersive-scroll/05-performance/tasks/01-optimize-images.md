# Task: Optimize images — sizes prop, priority, blur placeholders

## What To Do

Review all next/image usage and verify optimization is correct: sizes prop matches actual rendered sizes (not just the default), priority only on the first image (above the fold), all other images lazy-loaded by default, blur placeholders working from static imports, total image payload reasonable (target 200-400KB per image after Vercel's WebP optimization). Check that images aren't being served larger than needed.

## Why It Matters

Nine high-quality art images are the biggest performance risk. Correct sizes props and lazy loading can mean the difference between a 2-second and a 10-second load time on mobile.

## Size

**Estimate:** medium

Requires checking network tab for actual served sizes and optimizing based on real data.

## Done When

- [ ] sizes prop on all images matches actual rendered width
- [ ] priority={true} only on first letter image
- [ ] All other images lazy-loaded
- [ ] Blur placeholders visible during loading
- [ ] Total page image weight reasonable (check in network tab)
- [ ] No images served larger than display size

## Needs First

All artwork integrated in Step 3.
