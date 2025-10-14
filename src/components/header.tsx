"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "./navbar";
import SideMenu from "./sideMenu";
import { useMediaQuery } from "../hooks/useMediaQuery";

const SM_BREAKPOINT = 640; // 'sm' breakpoint in Tailwind CSS

export default function Header() {
  const isMobile = useMediaQuery(SM_BREAKPOINT);
  // Default navigation and authentication links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
  const authLinks = [
    { href: "/login", label: "Login" },
    { href: "/signup", label: "Sign Up" },
  ];
  const links = isMobile ? authLinks : [...navLinks, ...authLinks];
  return (
    <header className="bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1">
            <Link 
              href="/" 
              className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-1 focus:ring-blue-300 focus:ring-offset-1 rounded"
              aria-label="Go to homepage"
            >
              <Image
                src="/images/logo.svg"
                alt="Inkaya Logo"
                width={100}
                height={32}
                priority
              />
            </Link>
          </div>
          <Navbar direction="row" links={links} />
          <div className="sm:block md:hidden">
            <SideMenu links={navLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}