# Step 1: Project setup and theme

## What This Delivers

A Next.js 16 project with TypeScript, Tailwind CSS 4 configured with the dark-only theme (cream text on charcoal, antique gold accents), fonts loaded via next/font/google (EB Garamond body, Cormorant Garamond display, Geist Sans UI), @next/mdx configured, and mdx-components.tsx with prose-invert typography styling.

## Tasks

- [x] Task 1: Scaffold Next.js 16 project with TypeScript and Tailwind CSS 4
- [ ] Task 2: Configure dark theme, fonts, and MDX pipeline

## Needs First

Nothing — this step can start right away (can run in parallel with content creation).

## Decisions

### Locked
- EB Garamond for body text, Cormorant Garamond for display headers
- Dark mode only, no toggle — class="dark" permanently on html element
- Cream text (#F5F0E8), never pure white (#FFFFFF) for body text
- @next/mdx (not next-mdx-remote which is archived), MDX export metadata (not YAML frontmatter)
- Do NOT add output: 'export' in next.config.ts (breaks next/image optimization on Vercel)
- Do NOT enable mdxRs: true (experimental, not production-ready)
- @tailwindcss/typography with prose-invert for MDX content
- Tailwind CSS 4 @theme directive (not tailwind.config.js)
