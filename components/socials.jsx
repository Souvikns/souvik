const socials = [
    { name: 'github', image: '/github.png', link: 'https://github.com/Souvikns' },
    {
      name: 'linkedin',
      image: '/linkedin.png',
      link: 'https://www.linkedin.com/in/souvik-de-a2b941169/',
    },
    {
      name: 'twitter',
      image: '/twitter.png',
      link: 'https://twitter.com/Souvik_ns',
    },
    { name: 'mail', image: '/gmail.png', link: 'mailto:souvikde.ns@gmail.com' },
  ]
  
  export default () => {
    return (
      <div className="flex flex-row gap-x-4 mt-4">
        {socials.map((social) => (
          <a target="_blank" href={social.link}>
            <img key={social.name} src={social.image} width="40px" />
          </a>
        ))}
      </div>
    )
  }
  