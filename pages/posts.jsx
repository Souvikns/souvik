import Listlayout from "../components/layout/ListLayout";
import { getAllFilesFrontMatter } from "../lib/mdx";

export const POST_PER_PAGE = 5;

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("blog");
  const initialDisplayPosts = posts.slice(0, POST_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POST_PER_PAGE),
  };

  return { props: { initialDisplayPosts, posts, pagination } };
}

export default function Blog({ posts, pagination, initialDisplayPosts }) {
  return (
    <>
      <Listlayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  );
}
