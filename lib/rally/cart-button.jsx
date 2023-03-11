'use client'
import { useEffect } from 'react'

import React from 'react'
import { Rally } from '@/lib/rally/client';



const CartButton = (props) => {

  useEffect(() => {
    Rally
  }, [])

  const customClass = props.customClass || "rally-custom-button-class";

  return (
    <rally-checkout-button suppressHydrationWarning={true} custom-class={customClass} custom-text={props.customText} loader="true">
    </rally-checkout-button>
  )
}

export default CartButton;