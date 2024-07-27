import Link from 'next/link';
import {getPosts} from '../utils/mdx-utils';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, {GradientBackground} from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import {getGlobalData} from '../utils/global-data';
import SEO from '../components/SEO';
import Image from "next/image";
import profilePic from '../assets/image.jpg'

// import type { Profile as ProfileType } from '../types/Profile';
// import Avatar from '../shared/Avatar';
import Location from '../shared/Location';
import H, { hLevel } from '../shared/H';
import Tags from '../shared/Tags';
import SocialLinks from '../shared/SocialLinks';
import Greeting from '../shared/Greeting';
import { FiBriefcase } from '@react-icons/all-files/fi/FiBriefcase';

import Avatar from '../shared/Avatar';
import { Profile } from '../types/Profile';
import { socialLinks } from '../utils/socialLinks';



export default function Index({posts, globalData}) {

  const profile: Profile = {
    firstName: `${process.env.NEXT_PUBLIC_FIRST_NAME}`,
    lastName: `${process.env.NEXT_PUBLIC_LAST_NAME}` ,
    position: 'Tech Lead | Senior Software Engineer',
    summary:[],

    avatar: {
      srcPath: '/assets/image.jpg',
      caption: `${process.env.NEXT_PUBLIC_FIRST_NAME} ${process.env.NEXT_PUBLIC_LAST_NAME}`
    },
    location: {
      name: 'Bulgaria • from 🇺🇦',
    },
    tags: [
      { name: 'Full Stack' },
      { name: 'JavaScript' },
      { name: 'React' },
      { name: 'Angular' },
      { name: 'Node.js' },
      {name: "TypeScript"},
      {name: "Python"},
      {name: "CSS"},
      {name: "HTML"},
      {name: "NgRx"},
      {name: "Redux"},
      {name: "RxJs"},
      {name: "Lodash"},
      {name: "Bootstrap"},
      {name: "Moment.js"},
      {name: "Nest.js"},
      {name: "Express.js"},
      {name: "Chart.js"},
      {name: "JEST"},
      {name: "Jasmine"},
      {name: "Karma"},
      {name: "Mocha"},
      {name: "Chai"},
      {name: "Sinon"},
      {name: "Cypress"},
      {name: "Socket.IO"},
      {name: "GraphQL"},
      {name: "MongoDB"},
      {name: "MySQL"},
      {name: "PostgreSQL"},
      {name: "MariaDB"},
      {name: "Redis"},
      {name: "Nginx"},
      {name: "AWS"},
      {name: "Lambda"},
      {name: "S3"},
      {name: "EC2"},
      {name: "Firebase"},
      {name: "Heroku"},
      {name: "Docker"},
      {name: "Git"},
      {name: "RabbitMQ"},
      {name: "Digital Ocean"},
      {name: "REST"},
      {name: "SonarQube"},
      {name: "SonarCloud"},
      {name: "Microservice Architecture"},
      {name: "PWA"},
      {name: "XSS"},
      {name: "SSL"},
      {name: "Figma"},
      {name: "Zeplin"},
      {name: "Balsamiq"},
      {name: "Unit Testing"},
      {name: "AI"},
      {name: "CRM"}
    ],
    socialLinks,
  };

  const avatarElement = profile.avatar ? (
    <div className="mr-0 mb-6 sm:mr-6 sm:mb-0">
      <Avatar avatar={profile.avatar} className="w-64 h-64 rounded-full overflow-hidden" />
    </div>
  ) : null;

  const userName = [
    profile?.firstName || '',
    profile?.lastName || '',
  ].join(' ');

  const userNameElement = userName ? (
    <div className="flex flex-row text-center">
      <H level={hLevel.h1} className="mb-1 uppercase font-extrabold">
        {userName}
      </H>
    </div>
  ) : null;

  const positionElement = profile?.position ? (
    <div className="mb-3 font-light flex flex-row items-center">
      <FiBriefcase className="mr-1 w-4 h-4" />
      {profile.position}
    </div>
  ) : null;

  const summaryLines = (profile?.summary || []).map(
    (summaryLine: string) => (
      <div key={summaryLine} className="text-center sm:text-left mb-0">
        {summaryLine}
      </div>
    ),
  );

  const summaryLinesElement = profile?.summary ? (
    <div className="mb-3 font-light">
      {summaryLines}
    </div>
  ) : null;

  const locationElement = profile?.location ? (
    <div className="mb-3">
      <Location location={profile.location} />
    </div>
  ) : null;

  const tagsElement = profile?.tags ? (
    <div className="mb-4">
      <Tags tags={profile.tags} />
    </div>
  ) : null;

  const socialLinksElement = (
    <SocialLinks links={profile?.socialLinks} />
  );

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle}/>
      <main className="flex flex-col items-center">
        <div className="max-w-screen-xl self-stretch m-auto w-full">
          <Header name={globalData.name} className="px-6 sm:px-12 py-6" />

          <div className="px-6 sm:px-12 py-6">
            <div className="flex flex-col items-center sm:flex-row mb-12">
              <div className="mr-0 mb-6 sm:mr-6 sm:mb-0">
                <Image src={profilePic}
                       width={300}
                       height={300}
                       alt="Picture of the author"
                       className="rounded-full block mx-auto mb-4"/>
              </div>
              <div className="flex flex-col justify-center items-center sm:items-start">
                {/*<h1 className="text-3xl lg:text-5xl text-center mb-12">*/}
                {/*  {globalData.name}*/}
                {/*</h1>*/}
                {userNameElement}
                {positionElement}
                {summaryLinesElement}
                {locationElement}
                {tagsElement}
                {socialLinksElement}
              </div>
            </div>

            <p className="font-light">{globalData.blogDescription}</p>
            {globalData.description.map(function(str, i){
              return <p className="font-light mt-3" key={i}>{str}</p>
            })}
            <p className="text-2xl dark:text-white text-center">
            </p>
          </div>
          <Footer copyrightText={globalData.footerText}/>
        </div>
      </main>

      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();
  const globalData = getGlobalData();

  return {props: {posts, globalData}};
}
