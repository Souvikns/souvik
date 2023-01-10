import Link from 'next/link'
import ThemeSwitch from '../ThemeSwitch'

const NavLinks = [
  { title: 'Posts', href: '/posts' },
  { title: 'Projects', href: '/project' },
]
export default () => {
  return (
    <div className="flex flex-col justify-between py-4 mb-12">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-extrabold font-mono text-xl">
            <Link href={'/'}>Souvik</Link>
          </h1>
        </div>
        <div className="flex items-center text-base leading-5">
          {NavLinks.map((el) => (
            <h1 className="p-1 font-bold sm:p-4">
              <Link href={el.href}>{el.title}</Link>
            </h1>
          ))}

          <div>
            <ThemeSwitch />
          </div>
        </div>
      </header>
    </div>
  )
}
