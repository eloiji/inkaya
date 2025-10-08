import Image from "next/image";
import Link from "next/link";
import Navbar from "./navbar";

interface HeaderProps {
  // Add props here if needed in the future
}

export default function Header(props: HeaderProps = {}) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              aria-label="Go to homepage"
            >
              <Image
                src="/images/logo.png"
                alt="Inkaya Logo"
                width={100}
                height={32}
                priority
              />
            </Link>
          </div>
          <Navbar className="flex items-center" />
        </div>
      </div>
    </header>
  );
}