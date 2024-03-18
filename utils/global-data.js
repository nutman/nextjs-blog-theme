export const getGlobalData = () => {
  const name = process.env.NEXT_PUBLIC_BLOG_NAME
    ? decodeURI(process.env.NEXT_PUBLIC_BLOG_NAME)
    : 'Jay Doe';
  const blogTitle = process.env.NEXT_PUBLIC_BLOG_TITLE
    ? decodeURI(process.env.NEXT_PUBLIC_BLOG_TITLE)
    : 'Next.js Blog Theme';
  const blogDescription = process.env.NEXT_PUBLIC_BLOG_DESCRIPTION
    ? decodeURI(process.env.NEXT_PUBLIC_BLOG_DESCRIPTION)
    : 'Next.js Blog Theme';
  const footerText = process.env.BLOG_FOOTER_TEXT
    ? decodeURI(process.env.BLOG_FOOTER_TEXT)
    : 'All rights reserved.';

  return {
    name,
    blogTitle,
    blogDescription,
    footerText,
  };
};
