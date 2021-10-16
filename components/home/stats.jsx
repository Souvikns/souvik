
export default () => {
  return <div>
    <h1 className="md:text-2xl text-xl font-bold">🏅 Stats</h1>

    <div className="md:flex gap-4 w-full py-4">
      <img className="md:w-2/4" src="http://github-readme-streak-stats.herokuapp.com?user=Souvikns&theme=dark&hide_border=true"  alt="Souvik's streak stat"/>
      <img className="md:w-2/4" src="https://github-readme-stats.vercel.app/api?username=Souvikns&show_icons=true&theme=cobalt" />
    </div>
  </div>
}