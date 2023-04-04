'use client'
import { useEffect } from 'react'

import React from 'react'
import { Rally } from '@/lib/rally/client';



const CartButton = ({customClass, customText}) => {

  useEffect(() => {
    Rally
  }, [])


  return (
    <rally-checkout-button suppressHydrationWarning={true} custom-class={customClass} custom-text={customText} loader="true" />
  )
}

export default CartButton;