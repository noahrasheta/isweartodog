import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => (
      <article className="prose prose-invert prose-lg mx-auto max-w-3xl px-6 py-16 prose-headings:font-display prose-headings:text-gold prose-p:text-cream prose-p:leading-relaxed prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-cream prose-blockquote:border-gold-dim prose-blockquote:text-cream/80">
        {children}
      </article>
    ),
    h1: ({ children }) => (
      <h1 className="font-display text-4xl tracking-tight text-gold">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-3xl tracking-tight text-gold">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-2xl tracking-tight text-gold">
        {children}
      </h3>
    ),
    ...components,
  };
}
