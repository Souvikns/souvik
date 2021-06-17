import { SCREEN_PADDING } from '../styleconstants';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default () => {
	let router = useRouter();
	let currentRoute = router.route;
	const linkColor = 'text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-pink-500 to-red-500';

	return <div className="py-4">
		<div className="flex space-x-4">
			<div>
				<h1 className="">
					<Link href="/">
						<a>
							<img src="/s.svg" alt="s" width="40" />
						</a>
					</Link>
				</h1>
			</div>

			<div className="self-center">
				<div className="flex space-x-4 text-lg text-gray-600 font-bold">

					<Link href="/about">
						<a className={(currentRoute === '/about') ? linkColor : ""}>About</a>
					</Link>

					<Link href="/projects">
						<a className={(currentRoute === '/projects') ? linkColor : ""}>Projects</a>
					</Link>

					<a href="https://souvikns.hashnode.dev/">Blogs</a>
				</div>
			</div>
		</div>
	</div>
}