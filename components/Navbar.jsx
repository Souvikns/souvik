import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()

  if (router.pathname === '/') {
    return (
      <div className="py-4">
        <div className="flex justify-between">
          {[
            { name: 'souvik', href: '/' },
            { name: 'Posts', href: '/posts' },
          ].map((el) => (
            <a key={el.name} href={el.href} className='font-mono font-semibold text-lg'>
              {el.name}
            </a>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="py-4">
      <a href="/posts" className="font-semibold font-mono text-xl">
        Home
      </a>
    </div>
  )
}
