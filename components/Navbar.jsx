import Link from "next/link";

const NavLinks = [
  {title: 'Blogs', href: '/blog'},
  {title: 'Projects', href: '/project'},
  {title: 'About', href: '/about'}
]

const Navbar = () => {
  return (
    <div className="flex flex-col justify-between py-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-extrabold text-3xl font-mono">
            <Link href={"/"}>Souvik</Link>
          </h1>
        </div>
        <div className="flex items-center text-base leading-5">
          {NavLinks.map((el) => (
            <h1 className="p-1 font-semibold sm:p-4">
              <Link href={el.href}>{el.title}</Link>
            </h1>
          ))}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
