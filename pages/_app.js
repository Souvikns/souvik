import {MDXProvider} from '@mdx-js/react';
import '../global.css'

export default function MyApp({Component, pageProps}) {
    return (
        <MDXProvider>
            <Component {...pageProps} />
        </MDXProvider>
    )
}

function getMDXComponent() {
    // customize any component
    return {

    }
}