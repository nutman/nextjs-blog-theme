import React from 'react';

// Stub constants since they may not be resolving correctly
const routes = { home: { path: '/' } };
const brandName = process.env.NEXT_PUBLIC_SITE_NAME || 'Blog';
import type { Link as LinkType } from '../types/Link';
import HyperLink from './HyperLink';

const Logo = (): React.ReactElement => {
  const link: LinkType = {
    url: routes.home.path,
  };
  return (
    <div>
      <HyperLink link={link} className="font-extrabold text-sm tracking-widest uppercase">
        {brandName}
      </HyperLink>
    </div>
  );
};

export default Logo;
