import {GRADIENT_TITLE} from '../styleconstants'
export default () => {
	return <div className="w-full py-6 dark:text-gray-200">
		<p className={`text-center text-2xl py-4 font-black font-mono ${GRADIENT_TITLE} `}>
			Contributions
		</p>
		<img className="w-full dark:text-gray-200" src="https://ghchart.rshah.org/Souvikns" alt="github Chart" />
	</div>
}