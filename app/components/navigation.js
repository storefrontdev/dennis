'use client'

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { StorefrontContext } from "@/providers/storefront-provider";

const Navigation = () => {

  const {
    cart,
    open,
    toggleCart
  } = useContext(StorefrontContext);

  return (
    <div className="fixed top-0 inset-x-0 z-40 w-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center shrink px-3 md:px-5 lg:px-8 py-5">
          <HamburgerMenuIcon className="hidden h-5 w-5 mr-2" />
          <div className="text-gray-700 text-xl font-bold">SOLØ</div>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <button type="button" onClick={() => toggleCart(!open)} className="block pl-3 pr-5 py-2 text-gray-700 font-semibold rounded-l-full bg-energy-yellow-500  hover:bg-coral-red-500 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
            {cart?.item_quantity || 0}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;