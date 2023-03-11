import React from 'react'

const CartButton = (props) => {
  const customClass = props.customClass || "rally-custom-button-class";
 
  return (
    <rally-checkout-button 
      suppressHydrationWarning={true} 
      custom-class={customClass} 
      custom-text={props.customText} 
      loader="true">
    </rally-checkout-button>
  )
}

export default CartButton;