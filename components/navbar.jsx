import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { change } from '../redux/reducers/config';
import { motion } from 'framer-motion';

export default () => {
	let router = useRouter();
	let currentRoute = router.route;
	return <div className="py-4">
		<div className="flex space-x-8 sub-heading font-medium text-sm justify-center">
			<div>
				<h1 className={`${(currentRoute === '/') ? "text-secondary" : null}`}>
					<Link href="/"><a>Home</a></Link>
				</h1>
			</div>
			<div className={`${(currentRoute === '/projects') ? "text-secondary" : null}`}>
				<h1>
					<Link href="/projects"><a>Projects</a></Link>
				</h1>
			</div>
			<div>
				<h1>
					<a href="https://souvikns.hashnode.dev/">Blogs</a>
				</h1>
			</div>
			<div className={`${(currentRoute === '/resume') ? "text-secondary" : null}`}>
				<h1>
					<Link href="resume"><a>Resume</a></Link>
				</h1>
			</div>
		</div>
	</div>
}