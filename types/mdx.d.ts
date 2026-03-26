declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { MDXComponents } from "mdx/types";

  interface MDXProps {
    components?: MDXComponents;
  }

  const MDXComponent: ComponentType<MDXProps>;
  export default MDXComponent;

  export const metadata: {
    letter?: number;
    title: string;
    wordCount: number;
    draftDate: string;
    status: string;
  };
}
