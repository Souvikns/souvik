import Socials from './socials';
export default () => {
    return <div>
        <div className="shadow-md w-full px-6 py-4">

            <div className="flex justify-center">
                <div className="p-6">
                    <img src="aboutme.svg" alt="aboutme" width="400" />
                </div>
            </div>

            <div className="grid grid-cols-6 lg:grid-cols-8 gap-2">
                <div className="lg:col-start-2 lg:col-span-6 col-start-2 col-span-4">
                    <div className="text-center font-mono lg:text-lg leading-relaxed text-sm">
                        <p className="mb-2">
                            I am undergrad B-Tech student from <a className="text-red-400" href="http://cuch.in" target="_blank" rel="noopener noreferrer">Chandigarh University</a>
                        </p>
                        <p className="mb-2">
                            I am a self taught software developer and <span className="text-yellow-400">javascript</span> is my love.
                        </p>
                        <p className="mb-2">
                            I love opensource and currently writing code for <a className="text-blue-500" href="https://github.com/asyncapi/" target="_blank" rel="noopener noreferrer">@asyncapi</a>
                        </p>
                        <p className="mb-2">
                            I am a founder and maintainer of <a className="text-yellow-500" href="https://github.com/Tech-Phantoms" target="_blank" rel="noopener noreferrer">Tech Phantoms</a>.
                        </p>
                        <p className="mb2">
                            Open to collaboration, you can reach me through my socials bellow. 
                        </p>
                    </div>
                </div>
            </div>

            <Socials />
        </div>
    </div>
}