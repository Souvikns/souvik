import Link from 'next/link';
import { SCREEN_PADDING } from '../styleconstants';
import { change } from '../redux/reducers/route';
import { useDispatch } from 'react-redux';

export default () => {
	let dispatch = useDispatch();

	return <div className={`shadow ${SCREEN_PADDING}`}>
		<div className="flex">
			<div>
				<h1 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-700">Souvik De</h1>
			</div>

			<div className="flex-1" />

			<div>
				<div className="flex">
					{
						["Home", "About", "Projects"].map(route => <div key={route}>
							<p className="md:text-xl cursor-pointer ml-4 font-bold text-gray-700" onClick={() => {
								dispatch(change(route));
							}}>{route}</p>
						</div>)
					}
				</div>
			</div>
		</div>
	</div>
}