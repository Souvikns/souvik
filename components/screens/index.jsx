import Home from './home';
import About from './about';
import Project from './projects';
import { useSelector } from 'react-redux';


export default () => {
	let { currentRoute } = useSelector(state => state.route)
	return <div>
		{(currentRoute === "Home" ? <Home /> : null)}
		{(currentRoute === "About") ? <About /> : null}
		{(currentRoute === "Projects") ? <Project /> : null}
	</div>
}