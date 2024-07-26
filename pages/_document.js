import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="theme-compiled">
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon_package_v0.16/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon_package_v0.16/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon_package_v0.16/favicon-16x16.png" />
          <link rel="manifest" href="/assets/favicon_package_v0.16/site.webmanifest" />
          <link rel="mask-icon" href="/assets/favicon_package_v0.16/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body
          className={`antialiased text-lg bg-white dark:bg-gray-900 dark:text-white leading-base`}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
