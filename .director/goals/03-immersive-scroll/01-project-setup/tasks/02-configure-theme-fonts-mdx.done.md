# Task: Configure dark theme, fonts, and MDX pipeline

## What To Do

Configure the complete design foundation: (1) Tailwind CSS 4 @theme directive with dark-only colors — charcoal background, cream text (#F5F0E8), antique gold accents; never use text-white for body text. (2) Font loading via next/font/google — EB Garamond (variable) for body prose, Cormorant Garamond for display headers, Geist Sans for UI elements. (3) @next/mdx configuration in next.config.ts. (4) mdx-components.tsx with prose-invert typography overrides for the dark reading experience. (5) class="dark" permanently on the html element. Do NOT enable mdxRs: true.

## Why It Matters

This task locks the visual identity and content pipeline. Every component built after this inherits the correct colors, fonts, and content rendering. Getting cream-not-white into the theme now prevents drift later.

## Size

**Estimate:** medium

Multiple configuration files and design decisions. Requires testing font rendering on dark backgrounds at reading sizes.

## Done When

- [ ] @theme configured with charcoal bg, cream text (#F5F0E8), gold accents
- [ ] EB Garamond loading via next/font/google for body text
- [ ] Cormorant Garamond loading for display headers
- [ ] Geist Sans loading for UI elements
- [ ] @next/mdx configured in next.config.ts (mdxRs NOT enabled)
- [ ] mdx-components.tsx created with prose-invert styling
- [ ] class="dark" set on html element in layout.tsx
- [ ] A test MDX file renders correctly with cream text on charcoal background

## Needs First

Project scaffolded from the previous task.
