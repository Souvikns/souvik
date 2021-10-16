export default () => {
  return (
    <div>
      <div className="pb-5">
        <img
          className="filter drop-shadow-lg"
          src="https://github.com/Souvikns/Souvikns/blob/master/images/banner.png?raw=true"
        />
      </div>

      <div>
        <h1 className="md:text-2xl text-xl font-bold">Hi there 🙋‍♂️</h1>

        <div className="py-2 text-sm md:text-base">
          <p className="font-mono text-gray-600">
            This is Souvik, CS UG Senior Student and a self-taught{" "}
            <span className="font-bold">software developer</span> from India.
          </p>

          <ul className="list-inside list-disc py-2">
            <li>
              💼 Maintainer{" "}
              <a className="text-blue-600" href="https://asyncapi.com">
                @asyncapi
              </a>
              .
            </li>
            <li>
              🔭 I'm currently working on{" "}
              <a
                className="text-blue-600"
                href="https://github.com/asyncapi/cli"
              >
                asyncapi/cli
              </a>
              .
            </li>
            <li>🎓 Bachelor of Engineering in Computer Science.</li>
            <li>
              🌱 I'm currently learning TypeScript and dependecy injection.
            </li>
            <li>
              ✍🏻 Writting blogs on{" "}
              <a
                className="text-blue-600"
                href="https://souvikns.hashnode.dev/"
              >
                hashnode
              </a>
              .
            </li>
            <li>⚡ Fun-Fact: I love anime.</li>
          </ul>

          <details>
            <summary className="font-bold cursor-pointer">
              TLDR: Click to view
            </summary>

            <ul className="list-inside list-disc py-2">
              <li>
                ✈️ Open to get Hired for remote work and internships. Reach out
                on Mail. Software Engineer
              </li>
              <li>
                Software Engineer <br />
                (Proficient in TypeScript, JavaScript, Nodejs, React, NextJs,
                Graphql, Rest, NestJs)
              </li>
              <li>
                📃 Resume:{" "}
                <a
                  className="text-blue-600"
                  href="https://souvikns.github.io/resume/"
                >
                  Resume
                </a>{" "}
                you can save this one time link for every updation on resume.
              </li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
};
