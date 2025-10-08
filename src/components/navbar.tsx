import Link from "next/link";

interface NavbarProps {
  className?: string;
  links?: { href: string; label: string }[];
}

export default function Navbar(props: NavbarProps) {
  const defaultLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/login", label: "Login" },
    { href: "/register", label: "Register" },
  ];

  const links = props.links || defaultLinks;

  return (
    <nav className={props.className}>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="ml-4 text-gray-900">
          {link.label}
        </Link>
      ))}
    </nav>
  );
}