import { SCREEN_PADDING } from '../styleconstants';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default () => {
	let router = useRouter();
	let currentRoute = router.route;
	const linkColor = 'text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-pink-500 to-red-500';

	return <div className={`shadow ${SCREEN_PADDING}`}>
		<div className="flex">
			<div>
				<h1 className="text-xl md:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">Souvik De</h1>
			</div>

			<div className="flex-1" />

			<div>
				<div className="flex space-x-4 text-xl text-gray-600 font-bold">
					<Link href="/">
						<a className={(currentRoute === '/'? linkColor : "")}>Home</a>
					</Link>

					<Link href="/about">
						<a className={(currentRoute === '/about')? linkColor: ""}>About</a>
					</Link>

					<Link href="/projects">
						<a className={(currentRoute === '/projects')? linkColor : ""}>Projects</a>
					</Link>

					<a href="https://souvikns.hashnode.dev/">Blogs</a>
				</div>
			</div>
		</div>
	</div>
}