import '../style.scss';
import { Provider } from 'react-redux';
import { store } from '../redux';

function MyApp({ Component, pageProps }) {

    return <div className="container md:px-24 lg:px-32 mx-auto">
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    </div>
}

export default MyApp;