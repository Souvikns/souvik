import Script from "next/script";

export default function AdSense({pid}) {
    return <Script 
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${pid}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
    />
}