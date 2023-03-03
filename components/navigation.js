'use client'

import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

const Navigation = () => {


  return (
    <div className="fixed top-0 inset-x-0 z-40 w-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center shrink px-3 md:px-5 lg:px-8 py-5">
          <HamburgerMenuIcon className="block md:hidden h-5 w-5 mr-2" />
          <div className="text-gray-700 text-xl font-bold">SOLØ</div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;