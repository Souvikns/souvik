import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { change } from '../redux/reducers/config';

export default () => {
	let router = useRouter();
	let currentRoute = router.route;
	const linkColor = 'text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-pink-500 to-red-500';
	const [colorTheme, setTheme] = useDarkMode();
	const { theme } = useSelector(state => state.settings);
	const dispatch = useDispatch();
	const changeTheme = () => {
		console.log(change());
		dispatch(change());
	}
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
				<div className="flex space-x-4 text-lg text-gray-600 font-bold dark:text-gray-200">

					<Link href="/projects">
						<a className={(currentRoute === '/projects') ? linkColor : ""}>Projects</a>
					</Link>

					<a href="https://souvikns.hashnode.dev/">Blogs</a>

					<Link href="/resume">
						<a className={(currentRoute === '/resume') ? linkColor : ""}>Resume</a>
					</Link>
				</div>
			</div>

			<div className="flex-1" />
			<div className="self-center">
				{theme === 'light' ?
					<img src="/sunny.svg" className="cursor-pointer" onClick={changeTheme} width="30" /> :
					<img src="/moon.svg" className="cursor-pointer" onClick={changeTheme} width="30" />}
			</div>
		</div>
	</div>
}