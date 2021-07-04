import { GRADIENT_TITLE } from '../styleconstants';
import Link from 'next/link';
import Typing from 'react-typing-animation';

const Landing = () => {
	return <div className="">
		<div className="flex">
			<div className="w-1/2 lg:p-24 md:p-16 sm:p-4 ">
				<img src="/me.svg" alt="me" className="w-full" />
			</div>
			<div className="w-1/2 self-center dark:text-gray-200">
				<div className="flex space-x-2 text-3xl font-black font-mono">
					<div>I am a </div>
					<Typing loop={true} className={`${GRADIENT_TITLE}`}>
						Student.
						<Typing.Delay ms={3000} />
						<Typing.Backspace count={8} />
						Web developer.
						<Typing.Delay ms={3000} />
						<Typing.Backspace count={14} />
						<Typing.Reset delay={500} />
					</Typing>
				</div>
				<p className="pt-4">
					I am an undergrad software developer and a part time open sourcerer. I blog tech in my free time and work on my side projects.
				</p>
			</div>
		</div>
	</div>
}

export default Landing;