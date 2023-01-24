import '../global.css'
import MDXProvider from '../components/MDX'
import Navbar from '../components/Navbar'
import SectionContainer from '../components/SectionContainer'

export default function App({ Component, pageProps, rounter }) {
  return (
    <SectionContainer>
      <Navbar />
      <MDXProvider>
        <Component {...pageProps} />
      </MDXProvider>
    </SectionContainer>
  )
}
