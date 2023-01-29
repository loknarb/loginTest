import "../styles/globals.css";
import type { AppProps } from "next/app";

export function App({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}
