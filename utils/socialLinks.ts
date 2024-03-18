// @flow
import { socialLinkTypes } from '../types/SocialLink';
import type { SocialLink } from '../types/SocialLink';

export const socialLinks: SocialLink[] = [
  {
    type: socialLinkTypes.linkedIn,
    url: 'https://www.linkedin.com/in/volodymyr-loban/',
    secondary: false,
    caption: 'Volodymyr Loban on LinkedIn',
  },
  {
    type: socialLinkTypes.gitHub,
    url: 'https://github.com/nutman',
    secondary: false,
    caption: 'Volodymyr Loban on GitHub',
  },
  {
    type: socialLinkTypes.twitter,
    url: 'https://twitter.com/juncker88',
    secondary: false,
    caption: 'Volodymyr Loban on Twitter',
  },
  {
    type: socialLinkTypes.facebook,
    url: 'https://www.facebook.com/vladimir.loban.3',
    secondary: true,
    hidden: true,
    caption: 'Volodymyr Loban on Facebook',
  },
  {
    type: socialLinkTypes.instagram,
    url: 'https://www.instagram.com/',
    secondary: true,
    hidden: true,
    caption: 'Volodymyr Loban on Instagram',
  },
  {
    type: socialLinkTypes.medium,
    url: 'https://medium.com/@vloban',
    secondary: true,
    caption: 'Volodymyr Loban on Medium',
  },
  {
    type: socialLinkTypes.devTo,
    url: 'https://dev.to/',
    secondary: true,
    caption: 'Volodymyr Loban on DevTo',
    hidden: true,
  },
  {
    type: socialLinkTypes.stackOverflow,
    url: 'https://stackoverflow.com/',
    secondary: true,
    hidden: true,
    caption: 'Volodymyr Loban on StackOverflow',
  },
  {
    type: socialLinkTypes.youTube,
    url: 'https://www.youtube.com/',
    secondary: true,
    hidden: true,
    caption: 'Volodymyr Loban on YouTube',
  },
];
