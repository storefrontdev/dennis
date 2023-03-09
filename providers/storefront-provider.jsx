'use client'
import React, {useEffect, useState} from 'react'
import { swell } from '@/lib/swell/init/client'
import { useCart } from '@/lib/swell/hooks'
export const StorefrontContext = React.createContext()

export const StorefrontProvider = ({ children }) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState(null);

  useEffect(() => {
    setBody(document.querySelector("body"))
  }, [])


  const { cart, setCart, getCart, addItem, clearCart } = useCart()

  const toggleCart = () => {
    setOpen(!open)
    body.classList.toggle("overflow-hidden")
  }



  return (
    <StorefrontContext.Provider 
      value={{
        cart,
        getCart,
        addItem,
        clearCart,
        open,
        setOpen,
        loading,
        setLoading,
        toggleCart,
      }}>
      {children}
    </StorefrontContext.Provider>
  )
}
