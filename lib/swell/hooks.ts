'use client'

import { swell } from "./init/client";
import { useEffect, useState } from 'react'
import { Cart } from "swell-js/types/cart";



export const useCart = () => {
  const [cart, setCart] = useState<Cart | null>();

  useEffect(() => {
    swell.cart.get().then((cart) => {
      setCart(cart);
    });
  }, [cart]);

  return { cart, addItem: swell.cart.addItem, removeItem: swell.cart.removeItem, updateItem: swell.cart.updateItem };
}


// useImages takes a product and/or variant and returns all unique images associated with the product and/or variant.
export const useImages = (product: any) => {
  const [images, setImages] = useState<[]>();

  useEffect(() => {
      const productImages = product?.images?.map((image: any) => image);
      const variantImages = product?.variants?.results.map((variant: { images: any; }) => variant.images).flat().map((image: any) => image);
      const allImages = productImages?.concat(variantImages).flat().filter((v: { file: { md5: any; }; },i: any,a: any[])=>a.findIndex(v2=>(v2.file.md5===v.file?.md5))===i)
      setImages(allImages);
  
  }, [product]);
  

  return {images}
}


export const useVariant = (product: swell.Product, options: object) => {
  // options are an object like { Color: 'Red', Size: 'Small' }

  const [variant, setVariant] = useState<object | null>();

  const getVariant = async () => {
    // Resolves the variation price, sale_price, orig_price, and stock_status values based on the customer's chosen options.
    const v = await swell.products.variation(product, options)

    return v
  }

  getVariant().then((variant) => {
    setVariant(variant);
  })

  return {variant}
}
