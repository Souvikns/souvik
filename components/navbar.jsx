import Link from "next/link";

const pages = [
  {name: '/', label: 'Home'},
  {name: '/blog', label: 'Blog'},
  {name: '/about', label: 'About'},
  {name: '/resume', label: 'Resume'}
]

export default () => {
  return (
    <div className="flex flex-row-reverse text-gray-500 gap-4 py-4 xl:text-lg">
      {pages.map(page => <div className="hover:text-red-400 font-medium">
        <Link href={page.name}>{page.label}</Link>
      </div>)}
    </div>
  );
};
