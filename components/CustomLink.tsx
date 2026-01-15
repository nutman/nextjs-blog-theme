import React from 'react';
import Link from 'next/link';

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: string;
  href: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ 
  as, 
  href, 
  children, 
  ...otherProps 
}) => {
  return (
    <Link as={as} href={href} legacyBehavior>
      <a {...otherProps}>{children}</a>
    </Link>
  );
};

export default CustomLink;
