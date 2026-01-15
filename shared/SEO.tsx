import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Default constants (can be moved to env variables or config)
const siteURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
const windowNamePrefix = process.env.NEXT_PUBLIC_SITE_NAME || 'Blog';
const windowNameSeparator = '|';
const twitterUser = process.env.NEXT_PUBLIC_TWITTER_USER || '';
const siteImage = '/assets/default-image.jpg';

type TitleMode = 'prefix' | 'suffix';

export const titleModePrefix: TitleMode = 'prefix';
export const titleModeSuffix: TitleMode = 'suffix';

// @see: https://ogp.me/
type ogType = 'article' | 'website' | 'profile';

export const ogTypeArticle: ogType = 'article';
export const ogTypeWebsite: ogType = 'website';
export const ogTypeProfile: ogType = 'profile';

type SEOProps = {
  title: string,
  description: string,
  image?: string,
  twitterUsername?: string,
  // No trailing slash allowed!
  baseURL?: string,
  titleMode?: TitleMode,
  type?: ogType,
};

const SEO = (props: SEOProps): React.ReactElement => {
  const {
    title,
    description,
    baseURL = siteURL,
    twitterUsername = twitterUser,
    titleMode = titleModePrefix,
    image = siteImage,
    type = ogTypeWebsite,
  } = props;

  const router = useRouter();
  const pathname = router.pathname;

  const extendedTitle = titleMode === titleModePrefix
    ? `${windowNamePrefix} ${windowNameSeparator} ${title}`
    : `${title} ${windowNameSeparator} ${windowNamePrefix}`;

  const bannerURL = `${baseURL}${image}`;

  const pageURL = `${baseURL}${pathname}`;

  // @see: https://ogp.me/
  return (
    <Head>
      <title>{extendedTitle}</title>
      <meta name="description" content={description} />
      <meta name="image" content={bannerURL} />

      <meta property="og:title" content={extendedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageURL} />
      <meta property="og:image" content={bannerURL} />
      <meta property="og:type" content={type} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={extendedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={bannerURL} />
      <meta name="twitter:url" content={pageURL} />
    </Head>
  );
};

export default SEO;
