import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import {GoogleAnalytics} from "@next/third-parties/google";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="theme-compiled">
        <Head />
        <body
          className={`antialiased text-lg bg-white dark:bg-gray-900 dark:text-white leading-base`}
        >
          <Main />
          <NextScript />
          <GoogleAnalytics gaId="G-WY88M20WM5" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
