import Link from 'next/link'
import ThemeSwitch from '../ThemeSwitch'

export default () => {
  return (
    <div className="flex flex-col justify-between py-4 mb-12">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-extrabold text-base font-mono">
            <Link href={'/posts'}>HOME</Link>
          </h1>
        </div>
        <div className="flex items-center text-base leading-5">
          <div>
            <ThemeSwitch />
          </div>
        </div>
      </header>
    </div>
  )
}
