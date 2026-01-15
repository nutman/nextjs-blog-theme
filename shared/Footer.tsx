import React from 'react';
import { FiGithub } from '@react-icons/all-files/fi/FiGithub';
import { FaRegHeart } from '@react-icons/all-files/fa/FaRegHeart';
import { AiOutlineMail } from '@react-icons/all-files/ai/AiOutlineMail';
import { FiRss } from '@react-icons/all-files/fi/FiRss';

import HyperLink from './HyperLink';
// Default constants (can be moved to env variables or config)
const discussionsURL = process.env.NEXT_PUBLIC_DISCUSSIONS_URL || 'https://github.com';
const rssPath = '/rss.xml';
const supportURL = process.env.NEXT_PUBLIC_SUPPORT_URL || 'https://github.com';
import { Link } from '../types/Link';
import Row from './Row';
import SocialLinks from './SocialLinks';
// Note: profile data should be passed as prop or fetched from context
// Stubbing out for now since this component is not actively used
const profile = { socialLinks: [] };

type FooterProps = {
  className?: string,
  withFeedback?: boolean,
  withSupport?: boolean,
};

const Footer = (props: FooterProps): React.ReactElement => {
  const { className = '', withFeedback = false, withSupport = true } = props;

  const issuesLink: Link = {
    url: discussionsURL,
  };

  const subscribeLink: Link = {
    url: '/subscribe',
  };

  const rssLink: Link = {
    url: rssPath,
  };

  const supportLink: Link = {
    url: supportURL,
  };

  const feedbackFooterLink = withFeedback ? (
    <HyperLink
      link={issuesLink}
      className="text-xs mr-5"
      startEnhancer={(<FiGithub size={20} />)}
    >
      Feedback
    </HyperLink>
  ) : null;

  const supportFooterLink = withSupport ? (
    <HyperLink
      link={supportLink}
      className="text-xs mr-5"
      startEnhancer={(<FaRegHeart size={20} />)}
    >
      Support
    </HyperLink>
  ) : null;

  return (
    <footer className={`${className}`}>
      <Row responsive>
        <Row style={{ flex: 1 }} className="mb-6 sm:mb-0">
          <HyperLink
            link={subscribeLink}
            className="text-xs mr-5"
            startEnhancer={(<AiOutlineMail size={20} />)}
          >
            Subscribe
          </HyperLink>

          {feedbackFooterLink}

          {supportFooterLink}

          <HyperLink
            link={rssLink}
            className="text-xs"
            startEnhancer={(<FiRss size={20} />)}
          >
            RSS
          </HyperLink>
        </Row>

        <div
          style={{ flex: 1 }}
          className="flex flex-row items-center justify-center"
        >
          <SocialLinks
            links={profile?.socialLinks}
            expandable={false}
            iconClassName="w-5 h-5"
            itemClassName="mr-2 ml-2"
          />
        </div>

        <div style={{ flex: 1 }} className="hidden sm:flex">
          &nbsp;
        </div>
      </Row>
    </footer>
  );
};

export default Footer;
