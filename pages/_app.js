import { Provider } from "react-redux";
import { store } from "../redux";
import Head from "next/head";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container mx-auto px-6 xl:px-96 md:px-10 h-full overflow-hidden">
      <Provider store={store}>
        <Head>
          <title>Souvik</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}

export default MyApp;
