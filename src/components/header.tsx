import Image from "next/image";
import Navbar from "./navbar";

export default function Header() {
  return (
    <header className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Inkaya Logo"
              width={64}
              height={32}
            />
          </div>
          <Navbar className="flex items-center"/>
        </div>
      </div>
    </header>
  )
}