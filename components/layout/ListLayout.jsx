import { useState } from "react";
import formatDate from "../../lib/utils/formatDate";
import Tag from '../Tag'
import Link from '../Link'

export default function Listlayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}) {
  const [searchValues, setSearchValues] = useState("");
  const filterBlogPosts = posts.filter((frontmatter) => {
    const searchContent =
      frontmatter.title + frontmatter.summary + frontmatter.tags.join(" ");
    return searchContent.toLowerCase().includes(searchValues.toLowerCase());
  });

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValues
      ? initialDisplayPosts
      : filterBlogPosts;

  return (
    <>
      <div className="divide-y divide-slate-500 dark:divide-gray-700">
        {/* <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight ">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div> */}

        <ul>
          {!filterBlogPosts.length && "No Posts Found"}
          {displayPosts.map((frontmatter) => {
            const { slug, date, title, summary, tags } = frontmatter;
            return (
              <li key={slug} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published On</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <div>
                        <h3 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link
                            href={`/posts/${slug}`}
                            className="text-gray-900"
                          >
                            {title}
                          </Link>
                        </h3>
                        <div className="flex flex-wrap">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
