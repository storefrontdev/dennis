'use client'

import React, { useContext } from 'react';
import Image from 'next/image';
import { Cross2Icon, UpdateIcon } from '@radix-ui/react-icons';
import { useCart } from '@/lib/swell/hooks';
import { swell } from "@/lib/swell/init/client";
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { StorefrontContext } from '@/providers/storefront-provider';

const CartButton = dynamic(() => import('../../lib/rally/cart-button'), {
  loading: () => <p className="text-xs">Loading Checkout Button...</p>,
  ssr: false,
})


const Cart = () => {

  const {
    cart,
    open,
    toggleCart
  } = useContext(StorefrontContext);

  const { clearCart } = useCart();


  const variants = {
    initial: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
      },
    }),
    hidden: { opacity: 0 },
  }
  

  return ( 

    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-full bg-black bg-opacity-30 z-40"
            onClick={() => toggleCart(!open)}
          />
          <motion.div
            initial={{ opacity: 0, x: '350px',  scale: '1',  }}
            animate={{ opacity: 1, x: '0', scale: '1',  }}
            transition={{ duration: 0.1, ease: 'linear', type: 'spring', stiffness: 100 }}
            exit={{ opacity: 0, x: '350px', scale: '1' }}
            className="flex flex-col justify-between h-screen w-[350px] fixed top-0 right-0 z-50 bg-white"
          >
           
              <div>
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                  <h2 className="text-xl font-bold">Your Cart</h2>
                  <button onClick={() => toggleCart(!open)} className="focus:outline-none">
                    <Cross2Icon className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div
                className="flex flex-col jusitfy-start flex-grow border border-gray-100 space-y-5 overflow-y-auto px-3">
                {cart?.items?.map((item, i) => (
                  <motion.div 
                    key={item.id} 
                    custom={i}
                    animate="visible"
                    variants={variants}
                    className="flex items-center space-x-5 shadow-sm">
                    <div className="h-20 w-20 relative">
                      <Image
                        src={item.variant.images[0].file.url || item.product.images[0].file.url}
                        alt={item.product.name}
                        fill
                        className="rounded-sm object-cover object-center"
                        
                      />
                    </div>
                    <div className="">
                      <p className="font-bold">{item.product.name}</p>
                      <p className="text-sm">{item.variant?.name}</p>
                      {item.purchase_option?.type === 'subscription' && (
                        <span className="flex items-center space-x-1">
                          <UpdateIcon className="h-3 w-3" />
                          <p className="text-xs">{item.purchase_option?.plan_description}</p>
                        </span>
                      )}
                      <p className="text-xs">Q: {item.quantity}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div>
                <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
                  <div className="flex flex-col">
                    <p className="text-sm">Subtotal</p>
                    <p className="text-xl font-bold">${cart?.subTotal?.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm">Total</p>
                    <p className="text-xl font-bold">${cart?.total?.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-5 py-5">
                  <div className="mt-[25px] flex flex-col w-full items-center">
                    <CartButton swell={swell} customText="Proceed to Checkout" customClass="flex items-center justify-center w-full px-6 py-5 rounded-sm border border-transparent bg-bright-blue-900 text-base font-medium text-white shadow-sm"></CartButton>
                    <button type="button" onClick={() => clearCart()} className="mt-3 cursor-pointer">Clear Cart</button>
                  </div>
                </div>
              </div>
         
          </motion.div>
        </>
      )}
  </AnimatePresence>
  )
};

export default Cart;