import type { AppProps } from 'next/app';
import React from 'react';
import ErrorBoundary from '../shared/ErrorBoundary';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
