import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { change } from '../redux/reducers/config';
import { motion } from 'framer-motion';

export default () => {
	let router = useRouter();
	let currentRoute = router.route;
	const linkColor = 'text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-pink-500 to-red-500';
	const { theme } = useSelector(state => state.settings);
	const dispatch = useDispatch();
	const changeTheme = () => {
		console.log(change());
		dispatch(change());
	}
	return <div className="py-4">
		<div className="flex space-x-8">
			<div>
				<h1 className="">
					<Link href="/">
						<a>
							<motion.div
								whileHover={{ rotateZ: 20, rotateX: 20 }}
							>
								<img src="/s.svg" alt="s" width="40" />
							</motion.div>
						</a>
					</Link>
				</h1>
			</div>

			<div className="self-center">
				<div className="flex space-x-4 text-lg text-gray-600 font-bold dark:text-gray-200">

					<Link href="/projects">
						<a className={(currentRoute === '/projects') ? linkColor : ""}>
							<motion.div whileHover={{ scale: 1.2 }}>
								Projects
							</motion.div>
						</a>
					</Link>

					<a href="https://souvikns.hashnode.dev/">
						<motion.div whileHover={{ scale: 1.2 }}>
							Blog
						</motion.div>
					</a>

					<Link href="/resume">
						<a className={(currentRoute === '/resume') ? linkColor : ""}>
							<motion.div whileHover={{ scale: 1.2 }}>
								Resume
							</motion.div>
						</a>
					</Link>
				</div>
			</div>

			<div className="flex-1" />
			<div className="self-center">
				{theme === 'light' ?
					<motion.div whileHover={{scale: 1.2}}>
						<img src="/sunny.svg" className="cursor-pointer" onClick={changeTheme} width="30" />
					</motion.div> :
					<motion.div whileHover={{scale: 1.2}}>
						<img src="/moon.svg" className="cursor-pointer" onClick={changeTheme} width="30" />
					</motion.div>}
			</div>
		</div>
	</div>
}