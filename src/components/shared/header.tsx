import { Button } from "@/components/ui/button";
import { navItems } from "@/constant";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-[999] overflow-hidden flex flex-row items-center justify-between py-4 px-[136px] border-b border-b-white/10 backdrop-blur-xl">
      <Link href="/" className="flex items-center flex-row gap-3">
        <Image src="/assets/icons/logo.svg" width={24} height={24} alt="logo" />
        <span className="text-base font-medium">Ulaseb</span>
      </Link>
      <nav className="flex items-center justify-center gap-6 flex-row">
        {navItems.map((nav) => (
          <Link href={nav.href} key={nav.label}>
            <span className="text-sm font-medium text-[#b5b5b5] hover:text-white duration-300 transition-all">
              {nav.label}
            </span>
          </Link>
        ))}
      </nav>

      <Button>
        <span>Get started for free</span>
      </Button>
    </header>
  );
};

export default Header;
