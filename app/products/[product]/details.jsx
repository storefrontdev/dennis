'use client'

import { useCart } from '@/lib/swell/hooks'

const Details = ({ product }) => {

  const { addItem, getProducts } = useCart();
  const { id, name, price, description} = product;

 // return products from async function
  getProducts().then((products) => {
    console.log(products);
  });
  
  return (
    <div className="flex flex-col space-y-5">
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-base">${price}</p>
      </div>
      <div className="text-xs" dangerouslySetInnerHTML={{ __html: description }} />
      <div className="flex">
        <button className="w-full bg-black text-white px-5 py-4" onClick={() => addItem({product_id: id, quantity: 1})}>Add {name} to Cart</button>
      </div>
    </div>
  );
}

export default Details;