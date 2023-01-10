import Socials from './socials'
export default () => {
  return (
    <div className="rounded-md shadow-sm my-4 bg-darker-800 text-cullen-100 dark:bg-darker-800">
      <div className="flex flex-row h-full">
        <div>
          <div className="p-6">
            <img
              width="200px"
              src="./souvik.png"
              alt="souvik"
              className="rounded-full border border-dark-100 shadow-md bg-white dark:bg-cullen-50"
            />
          </div>
        </div>
        <div className="flex flex-col self-center px-4">
          <div className="self-center">
            <h1 className="font-semibold">
              Hi, I'm Souvik, a junior software developer from India. I am
              currently working fulltime on{' '}
              <a
                target="_blank"
                href="https://www.asyncapi.com/"
                className="text-cyan-500 underline hover:text-cyan-600"
              >
                AsyncAPI
              </a>
              .
            </h1>
          </div>
          <div className=''>
            <Socials />
          </div>
        </div>
      </div>
    </div>
  )
}
