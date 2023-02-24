'use client'
import { useEffect } from 'react'
import { useCart } from '@/lib/swell/hooks'

const Details = ({ product }) => {

  const { addItem, swell } = useCart();
  const { id, name, price, description} = product;


 
    // addItem(
    //   {
    //     product_id: id, 
    //     quantity: 1, 
    //     options: [
    //       { name: 'Flavor', value: 'Double Chocolate' },
    //       { name: 'Size', value: '12 Count' }
    //     ]
    //   }
    // )

  
  return (
    <div className="flex flex-col space-y-5">
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-base">${price}</p>
      </div>
      <div className="text-xs" dangerouslySetInnerHTML={{ __html: description }} />
      <div className="flex">
        <button 
          className="w-full bg-black text-white px-5 py-4" 
          onClick={() => 
            addItem({
              product_id: id,
              quantity: 1,
              options: [
                { name: 'Flavor', value: 'Double Chocolate' },
                { name: 'Size', value: '12 Count' }
              ]
            }) 
          }
        >
          Add {name} to Cart
        </button>
      </div>
    </div>
  );
}

export default Details;