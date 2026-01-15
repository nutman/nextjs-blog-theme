import React from 'react';
import { GetStaticProps } from 'next';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';
import Footer from '../../components/Footer';
import { getGlobalData } from '../../utils/global-data';
import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';
import { getPosts } from '../../utils/mdx-utils';
import Header from '../../components/Header';

interface Post {
    filePath: string;
    data: {
        title: string;
        description?: string;
        date?: string;
    };
}

interface AboutPageProps {
    frontMatter: {
        title: string;
        description: string;
        name: string;
    };
    posts: Post[];
    globalData: {
        name: string;
        footerText: string;
    };
}

const AboutPage: React.FC<AboutPageProps> = ({
    frontMatter,
    posts,
    globalData,
}) => {
    return (
        <Layout>
            <SEO
                title={`${frontMatter.title} - ${globalData.name}`}
                description={frontMatter.description}
            />
            <Header name={globalData.name} />
            <ul className="w-full">
                {posts.map((post) => (
                    <li
                        key={post.filePath}
                        className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
                    >
                        <Link
                            as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                            href="/posts/[year]/[slug]"
                            legacyBehavior
                        >
                            <span className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                                {post.data.date && (
                                    <p className="uppercase mb-3 font-bold opacity-60">
                                        {post.data.date}
                                    </p>
                                )}
                                <h2 className="text-2xl md:text-3xl">{post.data.title}</h2>
                                {post.data.description && (
                                    <p className="mt-3 text-lg opacity-60">
                                        {post.data.description}
                                    </p>
                                )}
                                <ArrowIcon className="mt-4" />
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

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
};

export const getStaticProps: GetStaticProps = async () => {
    const globalData = getGlobalData();
    const posts = getPosts();

    const data = {
        title: 'About',
        description: 'Page tells about Volodymyr experience',
        name: 'Volodymyr',
    };

    return {
        props: {
            globalData,
            posts,
            frontMatter: data,
        },
    };
};

export default AboutPage;
