import Head from 'next/head';

export default function SEO({ title, description }) {
  return (
    <Head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-WY88M20WM5"></script>
      <script>
        // eslint-disable
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-WY88M20WM5');
      </script>

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
    </Head>
  );
}
