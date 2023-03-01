'use client'

import Link from "next/link"
import { useCart } from "@/lib/swell/hooks"
import { BackpackIcon, HamburgerMenuIcon, MagnifyingGlassIcon, PersonIcon } from "@radix-ui/react-icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

const Navigation = () => {

  const {cart} = useCart()

  return (
    <div className="fixed top-0 inset-x-0 z-50 w-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center shrink px-3 md:px-5 lg:px-8 py-5">
          <HamburgerMenuIcon className="block md:hidden h-5 w-5 mr-2" />
          <div className="text-gray-700 text-xl font-bold">SOLØ</div>
        </div>

        <div className="flex shrink items-center justify-end bg-energy-yellow-500 rounded-l-full px-5 py-3 shadow-md">
          <span className="text-bright-blue-900 text-bold text-lg flex items-center">{cart?.item_quantity || "0"}</span>
        </div>
      </div>
    </div>
  );
};

export default Navigation;