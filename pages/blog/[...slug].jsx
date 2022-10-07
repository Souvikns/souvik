import { MDXLayoutRenderer } from "../../components/MDXComponent";
import {
  getFiles,
  formatSlug,
  getAllFilesFrontMatter,
  getFilesBySlug,
} from "../../lib/mdx";

export async function getStaticPaths() {
  const posts = getFiles("blog");
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split("/"),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter("blog");
  const postIndex = allPosts.findIndex(
    (post) => formatSlug(post.slug) === params.slug.join("/")
  );
  const prev = allPosts[postIndex + 1] || null;
  const next = allPosts[postIndex - 1] || null;
  const post = await getFilesBySlug( params.slug.join("/"));

  // rss
  // if (allPosts.length > 0) {
  //   const rss = generateRss(allPosts);
  //   fs.writeFileSync("./public/feed.xml", rss);
  // }

  return { props: { post, prev, next } };
}

export default function Blog({ post, authorDetails, prev, next }) {
  const { mdxSource, toc, frontmatter } = post;
  return (
    <>
      {frontmatter.draft != true ? (
        <MDXLayoutRenderer
          layout={frontmatter.layout || ""}
          toc={toc}
          mdxSource={mdxSource}
          frontmatter={frontmatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
      ) : (
        <div>
          <h1>UnderConstruction</h1>
        </div>
      )}
    </>
  );
}
