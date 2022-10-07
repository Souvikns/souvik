import LayoutWrapper from "../components/LayoutWrapper";
import "../css/tailwind.css";
import "../css/prism.css";
import "katex/dist/katex.css";

import { ThemeProvider } from "next-themes";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  );
}
