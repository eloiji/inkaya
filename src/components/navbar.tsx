import Link from "next/link";

interface NavbarProps {
  direction: 'row' | 'col';
  links: { href: string; label: string }[];
}

export default function Navbar(props: NavbarProps) {
  const { direction, links } = props;
  let listClass = 'flex-row';
  let listItemClass = "ml-4 xs:ml-2 first:ml-0 last:mr-2";
  let linkClass = "font-bold text-gray-900 focus:text-cyan-600 hover:text-cyan-600 transition-colors";

  if(direction === "col") {
    listClass = 'flex-col';
    listItemClass = "pr-4 pl-20";
    linkClass = `block pt-2 mb-2 text-right ${linkClass}`;
  }

  return (
    <nav role="navigation" aria-label="Main navigation">
      <ul className={`flex ${listClass}`}>
        {links.map(({ href, label }) => ( 
          <li key={`${href}-${label}`} className={listItemClass}>
            <Link 
              href={href} 
              className={linkClass}
              aria-label={label} 
              tabIndex={0}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}