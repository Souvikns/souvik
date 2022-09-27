import { MDXProvider } from "@mdx-js/react";
import "../global.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="prose prose-stone">
      <MDXProvider components={getMDXComponent()}>
        <Component {...pageProps} />
      </MDXProvider>
    </div>
  );
}

function getMDXComponent() {
  // customize any component
  return {};
}
