import React from 'react';
import classNames from 'classnames';
import styles from './Layout.module.css';
import { useTheme } from '../hooks/useTheme';

interface GradientBackgroundProps {
  variant?: 'large' | 'small';
  className?: string;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({ 
  variant, 
  className 
}) => {
  const classes = classNames(
    {
      [styles.colorBackground]: variant === 'large',
      [styles.colorBackgroundBottom]: variant === 'small',
    },
    className
  );

  return <div className={classes} />;
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useTheme();

  return (
    <div className="relative pb-24 overflow-hidden">
      <div className="max-w-screen-xl self-stretch m-auto w-full">
        {children}
      </div>
    </div>
  );
};

export default Layout;
