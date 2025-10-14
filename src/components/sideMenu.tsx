import { useState } from "react";
import Button from "./button";
import { MenuIcon, CloseIcon } from "./icons";
import Link from "next/link";

interface SideMenuProps {
  isMobile: boolean;
}

export default function SideMenu({ isMobile }: SideMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const menuItemClass = "block py-2 pr-6 text-gray-800 text-right";

  return (
    <>
      <Button variant="icon" onClick={toggleMenu} className="ml-2">
        {!isMobile ? null : <MenuIcon />}
      </Button>
      {/* a side menu that opens from the right side , aligning contents to the right */}
      <aside className={`fixed top-0 right-0 h-full w-48 bg-white p-4 font-bold shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end pt-2 pb-4">
          <Button variant="icon" onClick={toggleMenu}>
            <CloseIcon />
          </Button>
        </div>
        <Link href="/" className={menuItemClass}>Home</Link>
        <Link href="/about" className={menuItemClass}>About</Link>
        <Link href="/contact" className={menuItemClass}>Contact</Link>
      </aside>
    </>
  );
}