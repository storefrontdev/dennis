'use client'

import React from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, UpdateIcon } from '@radix-ui/react-icons';
import { useCart } from '@/lib/swell/hooks';
import { swell } from "@/lib/swell/init/client";
import CartButton from  '@/lib/rally/cart-button'


const Cart = () => {

  const { cart, itemQuantity, clearCart, open, setOpen } = useCart();

  // useEffect(() => {
  //   console.log('cart', cart)
  // }, [cart])

  return ( 
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button type="button" className="z-40 cursor-pointer shadow-md bg-energy-yellow-500 text-bright-blue-900 rounded-l-full rounded-r-none px-6 py-4">
        { itemQuantity }
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="z-50 bg-black bg-opacity-30 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="z-50 h-screen overflow-auto flex flex-col justify-between data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide fixed inset-y-0 right-0 h-screen w-[330px] md:w-[400px] rounded-sm bg-white p-[25px] focus:outline-none">
          <div>
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              Cart
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              Your shoping cart!
            </Dialog.Description>
          </div>

          <div className="flex flex-col jusitfy-start flex-grow border border-gray-100 space-y-5 overflow-y-auto">
            {cart?.items?.map((item) => (
              <div key={item.id} className="flex items-center space-x-5 shadow-sm">
                <div className="h-20 w-20 relative">
                  <Image
                    src={item.product.images[0].file.url}
                    alt={item.product.name}
                    fill
                    className="rounded-sm object-cover object-center"
                    
                  />
                </div>
                <div className="">
                  <p className="font-bold">{item.product.name}</p>
                  <p className="text-sm">{item.variant?.name}</p>
                  {item.purchase_option.type === 'subscription' && (
                    <span className="flex items-center space-x-1">
                      <UpdateIcon className="h-4 w-4" />
                      <p className="text-sm">{item.purchase_option.plan_description}</p>
                    </span>
                  )}
                  <p>{item.purchase_option.plan_description}</p>

                  <p className="text-xs">Q: {item.quantity}</p>
                </div>
              </div>
            ))}

      
          </div>

          <div className="mt-[25px] flex flex-col w-full items-center">

            <CartButton swell={swell} customText="Proceed to Checkout" customClass="flex items-center justify-center w-full px-6 py-5 rounded-sm border border-transparent bg-bright-blue-900 text-base font-medium text-white shadow-sm"></CartButton>
            <button type="button" onClick={() => clearCart()} className="mt-3 cursor-pointer">Clear Cart</button>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-bright-blue-900 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
};

export default Cart;