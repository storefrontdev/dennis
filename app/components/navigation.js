'use client'

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { StorefrontContext } from "@/providers/storefront-provider";
import { motion, AnimatePresence } from "framer-motion";

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
          <div className="text-gray-700 text-xl font-bold">SØLŌ</div>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <AnimatePresence>
            {cart?.item_quantity > 0 && (
              <motion.button 
                type="button" 
                onClick={() => toggleCart(!open)} 
                initial={{ x: 50 }}
                animate={{ x: 5 }}
                transition={{ ease: "easeOut", type: "spring", stiffness: 100 }}
                exit={{ x: 50 }}
                className="block pl-3 pr-5 py-2 w-[50px] text-gray-700 font-semibold rounded-l-full bg-energy-yellow-500  hover:bg-coral-red-500 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                {cart?.item_quantity || 0}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Navigation;