import React from 'react';
import Link from 'next/link';

interface HeaderProps {
    name?: string;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ name, className = '' }) => {
    return (
        <header className={`flex flex-row items-center px-6 sm:px-12 py-6 ${className}`}>
            <div className="font-bold font-mono mr-6">
                <Link href="/">LOBAN</Link>
            </div>
            <nav className="">
                <span className="hover:bg-gray-400 rounded py-1 px-2">
                    <Link href="/">About</Link>
                </span>
                <span className="hover:bg-gray-400 rounded py-1 px-2">
                    <Link href="/blog">Blog</Link>
                </span>
            </nav>
            <hr className="mt-4 opacity-20" />
        </header>
    );
};

export default Header;
