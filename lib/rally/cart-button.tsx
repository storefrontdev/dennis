import React from 'react'
import { Rally } from '@rallycommerce/swell';
import { SwellRallyCheckoutButtonConfig } from '@rallycommerce/swell/build/swell-checkout-button';
let isInitialized = false;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'rally-checkout-button': any;
    }
  }
}
interface CartButtonProps {
  customText?: string | undefined;
  customClass?: string | undefined;
  swell?: any;
}

const CartButton = (props: CartButtonProps) => {
  const customClass = props.customClass || "rally-custom-button-class";
  const configuration: SwellRallyCheckoutButtonConfig = {
    swellInstance: props.swell
  };
  if (props.swell && !isInitialized) {
    isInitialized = true;
    Rally.init(`${process.env.NEXT_RALLY_CLIENT_ID}`, configuration);
  }
  return (<>
    {<rally-checkout-button suppressHydrationWarning={true} custom-class={customClass} custom-text={props.customText} loader="true">
    </rally-checkout-button>}
  </>)
}

export default CartButton;