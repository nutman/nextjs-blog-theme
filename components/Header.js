import Link from 'next/link';

export default function Header({name}) {
  return (
    <>
      <header className="flex flex-row items-center px-6 sm:px-12 py-6">
        <div className="font-bold font-mono mr-6"><a href="/">LOBAN</a></div>
        <nav className="">
          <span className="hover:bg-gray-400 rounded py-1 px-2">
            <Link href="/">
            About
          </Link>
          </span>
          <span className="hover:bg-gray-400 rounded py-1 px-2">
          <Link href="/blog">

            Blog
        </Link>
      </span>
          {/*<Link href="/projects">*/}
          {/*  <a className="hover:bg-gray-400 rounded py-1 px-2">Projects</a>*/}
          {/*</Link>*/}
        </nav>
        <hr className="mt-4 opacity-20"/>
      </header>
    </>

  )
    ;
}
