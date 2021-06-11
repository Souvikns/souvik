import Link from 'next/link';
import { SCREEN_PADDING } from '../styleconstants';
export default () => {

	return <div className={`shadow ${SCREEN_PADDING}`}>
		<div className="flex">
			<div>
				<h1 className="text-xl lg:text-2xl font-black text-gray-700">Souvik De</h1>
			</div>

			<div className="flex-1" />

			<div>
				<div className="flex">

				</div>
			</div>
		</div>
	</div>
}