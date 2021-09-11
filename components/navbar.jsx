import Link from "next/link";
export default () => {
  return (
    <div className="flex flex-row-reverse text-gray-500">
      <div className="px-4">
        <Link href="/">Home</Link>
      </div>

      <div className="px-4">
        <Link href="/blog">Blog</Link>
      </div>

      <div className="px-4">
        <Link href="/about">About</Link>
      </div>

      <div className="px-4">
        <Link href="/resume">Resume</Link>
      </div>
    </div>
  );
};
