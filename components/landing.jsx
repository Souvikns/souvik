import { GRADIENT_TITLE } from '../styleconstants';
import Link from 'next/link';
const Landing = () => {
	return <div className="w-full flex shadow-lg my-14 px-4 py-2 md:space-x-6 space-x-2 divide-x divide-pink-300">
		<div>
			<img src="/me.svg" alt="" style={{ width: "800px" }} />
		</div>

		<div className="pt-12 pl-12 ">
			<div className="flex-column">

				<h1 className={`text-3xl font-black font-mono ${GRADIENT_TITLE} `}>Hi, I'm Souvik De!</h1>

				<div className="my-6">
					<div className="flex space-x-4">
						<a href="http://github.com/Souvikns" target="_blank" rel="noopener noreferrer">
							<img src="/github.svg" alt="github" width="30" />
						</a>

						<a href="https://twitter.com/souvik_ns" target="_blank" rel="noopener noreferrer">
							<img src="twitter.svg" alt="twitter" width="30" />
						</a>

						<a href="https://www.linkedin.com/in/souvik-de-a2b941169/" target="_blank" rel="noopener noreferrer">
							<img src="linkedin.svg" alt="linkedin" width="30" />
						</a>

						<a href="mailto:souvikde.ns@gmail.com" target="_blank" rel="noopener noreferrer">
							<img src="email.svg" alt="email" width="40" />
						</a>
					</div>
				</div>
				<p className="text-gray-500 font-mono">
					I am a undergrad software developer B-Tech Student from
					Chandigarh University. I love JavaScript and working on open source
					software. Learning new things everyday and growing my skills
				</p>

				<div className="my-4">
					<ul className="text-gray-500 leading-relaxed list-disc list-inside">
						<li>
							<Link href="/about"><span className={`font-black cursor-pointer ${GRADIENT_TITLE}`}>{"About"}</span></Link>: <span className="font-mono">An introduction and a short history.</span> 
						</li>
						<li>
							<a className={`font-black ${GRADIENT_TITLE}`} href="https://souvikns.hashnode.dev/">Blog</a>: <span className="font-mono">I write Technical Blogs on concepts that I learn.</span>
						</li>
						<li>
							<Link href="/projects"><span className={`font-black cursor-pointer ${GRADIENT_TITLE}`}>{'Projects'}</span></Link>: <span className="font-mono">Projects I have built and worked on in my carrer.</span> 
						</li>
					</ul>
				</div>

				<div className="my-4 font-mono text-pink-400">
					<h1>Scoll down to see my latest blogs, hope you like it.</h1>
				</div>

			</div>
		</div>
	</div>
}

export default Landing;