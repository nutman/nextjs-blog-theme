import { getGlobalData } from '../../../utils/global-data';
// import {
//   getArticles,
//   getNextPostBySlug,
//   getPostBySlug, getPostsByYears,
//   getPreviousPostBySlug, getYearDirectory,
//   postFilePaths,
// } from '../../../utils/mdx-utils';

import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import Link from 'next/link';
import ArrowIcon from '../../../components/ArrowIcon';
import CustomLink from '../../../components/CustomLink';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Layout, { GradientBackground } from '../../../components/Layout';
import SEO from '../../../components/SEO';

// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import { serialize } from 'next-mdx-remote/serialize';
import {getArticles, getPostsByYears, getYearDirectory, POSTS_PATH,getPostBySlug} from "../../../utils/mdx-utils";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  Link: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  Head,
};

export default function PostPage({
  source,
  frontMatter,
  prevPost,
  nextPost,
  globalData,
}) {
  return (
    <Layout>
      <SEO
        title={`${frontMatter.title} - ${globalData.name}`}
        description={frontMatter.description}
      />
      <Header name={globalData.name} />
      <div className='px-6 sm:px-12 py-6'>
        <article className="px-6 md:px-0">
          <header>
            <h1 className="text-3xl md:text-5xl dark:text-white text-center mb-12">
              {frontMatter.title}
            </h1>
            {frontMatter.description && (
              <p className="text-xl mb-4">{frontMatter.description}</p>
            )}
          </header>
          <main>
            <article className="m-auto prose dark:prose-dark">
              <MDXRemote {...source} components={components} />
            </article>
          </main>
          <div className="grid md:grid-cols-2 lg:-mx-24 mt-12">
            {prevPost && (
              <Link href={`/posts/${prevPost.slug}`}>
                <span className="py-8 px-10 text-center md:text-right first:rounded-t-lg md:first:rounded-tr-none md:first:rounded-l-lg last:rounded-r-lg first last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 last:border-t md:border-r-0 md:last:border-r md:last:rounded-r-none flex flex-col">
                  <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                    Previous
                  </p>
                  <h4 className="text-2xl text-gray-700 mb-6 dark:text-white">
                    {prevPost.title}
                  </h4>
                  <ArrowIcon className="transform rotate-180 mx-auto md:mr-0 mt-auto" />
                </span>
              </Link>
            )}
            {nextPost && (
              <Link href={`/posts/${nextPost.slug}`}>
                <span className="py-8 px-10 text-center md:text-left md:first:rounded-t-lg last:rounded-b-lg first:rounded-l-lg md:last:rounded-bl-none md:last:rounded-r-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-t-0 first:border-t first:rounded-t-lg md:border-t border-b-0 last:border-b flex flex-col">
                  <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                    Next
                  </p>
                  <h4 className="text-2xl text-gray-700 mb-6 dark:text-white">
                    {nextPost.title}
                  </h4>
                  <ArrowIcon className="mt-auto mx-auto md:ml-0" />
                </span>
              </Link>
            )}
          </div>
        </article>
      </div>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="absolute -top-32 opacity-30 dark:opacity-50"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const globalData = getGlobalData();
  const { year, slug } = params;
  const { mdxSource, data: frontMatter } = await getPostBySlug(year, slug);

  return {
    props: {
      globalData,
      source: mdxSource,
      frontMatter,
    },
  };
};

export const getStaticPaths = async () => {

  const articlesDirectory = POSTS_PATH;
  const years = getPostsByYears(articlesDirectory);

  const paths = years.flatMap(year => {
    const yearDirectory = getYearDirectory(articlesDirectory, year);
    const articles = getArticles(yearDirectory);
    return articles.map(article => ({
      params: {
        year,
        slug: article.replace(/\.md$/, ''),
      },
    }));
  });

  return {
    paths,
    fallback: false,
  };

};
