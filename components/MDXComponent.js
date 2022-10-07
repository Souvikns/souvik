import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import BlogLayout from "./BlogLayout";
import Image from "./Image";
import TOCInline from "./TOCInline";
import Pre from "./Pre";
import CustomLink from "./Link";

export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: ({ components, layout, ...rest }) => {
    return <BlogLayout {...rest} />;
  },
};

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout components={MDXComponents} {...rest} />;
};
