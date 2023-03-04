'use client'

import React, { useContext, useEffect } from 'react';
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
    getCart,
    open,
    toggleCart
  } = useContext(StorefrontContext);

  const { clearCart } = useCart();

  useEffect(() => {
    console.log('cart', cart)
  }, [cart])

  const thumbnails = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  }
  
  const thumbnail = {
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: (i * 0.3),
        type: "spring",
        stiffness: 50,
        ease: [0.56, 0.03, 0.12, 1.04],
      },
    }),
    hidden: { opacity: 0, y: -50 },
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
            initial={{ opacity: 1, x: '350px',  scale: '1' }}
            animate={{ opacity: 1, x: '0', scale: '1' }}
            transition={{ duration: 0.5, ease: 'easeInOut'}}
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
              <motion.div
                variants={thumbnails}
                initial="hidden"
                animate="visible"
                className="flex flex-col jusitfy-start flex-grow border border-gray-100 space-y-5 overflow-y-auto p-3">
                  {cart?.items?.map((item, i) => (
                    <motion.div 
                      key={item.id} 
                      custom={i}
                      variants={thumbnail}
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
              </motion.div>
              <div>
                <div className="flex flex-col px-3 py-5 border-t border-gray-200 divide-y divide-gray-200">
                  <div className="flex justify-between py-2">
                    <p className="text-sm">Subtotal</p>
                    <p className="text-sm font-bold">${cart?.sub_total}</p>
                  </div>
                  <div className="flex justify-between py-2">
                    <p className="text-md">Total</p>
                    <p className="text-md font-bold">${cart?.grand_total}</p>
                  </div>
                </div>
                <div className="flex flex-col w-full pb-5">
                  <div className="mt-5 flex flex-col w-full items-center">
                    <CartButton swell={swell} customText="Proceed to Checkout" customClass="flex items-center justify-center w-full px-8 py-5 rounded-sm border border-transparent bg-bright-blue-900 text-base font-medium text-white shadow-sm" />
                    <button type="button" onClick={() => clearCart().then(getCart())} className="mt-3 cursor-pointer">Clear Cart</button>
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