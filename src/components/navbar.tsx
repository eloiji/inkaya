import Link from "next/link";

interface NavbarProps {
  className?: string;
  links: { href: string; label: string }[];
}

export default function Navbar(props: NavbarProps) {
  return (
    <nav className={props.className}>
      <ul className="flex">
        {props.links.map((link) => (
          <li key={`${link.href}-${link.label}`} className="ml-4 xs:ml-2 first:ml-0">
            <Link href={link.href} className="font-bold text-gray-900 hover:text-cyan-900 transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}