'use client'

import Link from "next/link"
import { useCart } from "@/lib/swell/hooks"

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

const Navigation = () => {

  const {cart} = useCart()
  return (
    <div className="bg-gray-800 w-full px-3 md:px-5 lg:px-8 py-5">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <div className="text-white font-bold text-2xl">Dennis</div>
        </div>
        <div className="flex flex-row items-center">
          {links.map(({ href, label }) => (
            <div key={label} className="mr-5">
              <Link href={href} className="text-white font-bold text-lg">
                {label}
              </Link>
            </div>
          ))}
          <div>
            <span className="text-white font-bold text-lg">Cart: {cart?.itemQuantity || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;