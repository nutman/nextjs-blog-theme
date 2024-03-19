import Head from 'next/head';
import { GoogleAnalytics } from '@next/third-parties/google'

export default function SEO({ title, description }) {
  return (
    <Head>
      <GoogleAnalytics gaId="G-WY88M20WM5" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
    </Head>
  );
}
