import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

interface FooterProps {
  copyrightText: string;
}

const Footer: React.FC<FooterProps> = ({ copyrightText }) => {
  return (
    <footer className="py-16 flex flex-col items-center">
      <p className="dark:text-white uppercase mb-3 font-bold opacity-60">
        {copyrightText}
      </p>
      <ThemeSwitcher />
    </footer>
  );
};

export default Footer;
