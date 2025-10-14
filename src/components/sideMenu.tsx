import { useState } from "react";
import Button from "./button";
import { MenuIcon, CloseIcon } from "./icons";
import Navbar from "./navbar";

interface SideMenuProps {
  links?: { href: string; label: string }[];
}

export default function SideMenu({ links }: SideMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const baseMenuClass = "fixed top-0 right-0 h-full w-48 bg-white p-4 font-bold shadow-lg";
  const menuAnimationClass = "transform transition-transform duration-300 ease-in-out";

  return (
    <>
      <Button variant="icon" onClick={toggleMenu} className="ml-2" role="button" aria-label="Toggle menu">
        <MenuIcon />
      </Button>
      {/* a side menu that opens from the right side , aligning contents to the right */}
      <aside 
        className={`${baseMenuClass} ${menuAnimationClass} ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="navigation"
        aria-label="Side menu"
      >
        <div className="flex justify-end pt-2 pb-4">
          <Button variant="icon" onClick={toggleMenu} role="button" aria-label="Close menu">
            <CloseIcon />
          </Button>
        </div>
        <Navbar direction="col" links={links || []} />
      </aside>
    </>
  );
}