import Link from 'next/link';
import { SCREEN_PADDING } from '../styleconstants';
export default () => {

	return <div className={`shadow ${SCREEN_PADDING}`}>
		<div className="flex">
			<div>
				<h1 className="text-xl font-bold">Souvik De</h1>
			</div>

			<div className="flex-1" />

			<div>
				<div className="flex">
					<Link href="/"><a>Home</a></Link>
					<Link href="/about"><a>About</a></Link>
					<Link href="/projects"><a>Projects</a></Link>
				</div>
			</div>
		</div>
	</div>
}