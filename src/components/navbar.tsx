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
      <ul className="flex">
        {links.map((link) => (
          <li key={link.href} className="ml-4 first:ml-0">
            <Link href={link.href} className="text-gray-900">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}