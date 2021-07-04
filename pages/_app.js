import '../style.scss';
import { Provider } from 'react-redux';
import { store } from '../redux';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {

    return <div className="container md:px-24 lg:px-32 mx-auto h-full">
        <Provider store={store}>
            <Head>
                <title>Souvik</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>

                <link href="https://fonts.googleapis.com/css2?family=Andika&family=Cabin:ital,wght@0,400;0,600;1,400;1,600&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap" rel="stylesheet"></link>

            </Head>
            <Component {...pageProps} />
        </Provider>
    </div>
}

export default MyApp;