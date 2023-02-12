import { Html, Head, Main, NextScript } from "next/document";

export function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="dark:bg-black bg-base-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
