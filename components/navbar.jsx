import { SCREEN_PADDING } from '../styleconstants';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default () => {
	let router = useRouter();

	return <div className={`shadow ${SCREEN_PADDING}`}>
		<div className="flex">
			<div>
				<h1 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-700">Souvik De</h1>
			</div>

			<div className="flex-1" />

			<div>
				<div className="flex space-x-4">
					<Link href="/">
						<a>Home</a>
					</Link>

					<Link href="/about">
						<a>About</a>
					</Link>

					<Link href="/projects">
						<a>Projects</a>
					</Link>
				</div>
			</div>
		</div>
	</div>
}