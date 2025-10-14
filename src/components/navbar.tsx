import Link from "next/link";

interface NavbarProps {
  direction: 'row' | 'col';
  links: { href: string; label: string }[];
}

export default function Navbar(props: NavbarProps) {
  const { direction, links } = props;
  let listClass = 'flex-row';
  let listItemClass = "ml-4 xs:ml-2 first:ml-0";
  let linkClass = "font-bold text-gray-900 hover:text-cyan-900 transition-colors";

  if(direction === "col") {
    listClass = 'flex-col';
    listItemClass = "pr-4 pl-20";
    linkClass = "block py-2 font-bold text-gray-900 text-right";
  }

  return (
    <nav role="navigation" aria-label="Main navigation">
      <ul className={`flex ${listClass}`}>
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`} className={listItemClass}>
            <Link href={link.href} className={linkClass} aria-label={link.label} tabIndex={0}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}