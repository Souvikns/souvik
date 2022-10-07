import LayoutWrapper from "../components/LayoutWrapper";
import "../global.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="">
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </div>
  );
}