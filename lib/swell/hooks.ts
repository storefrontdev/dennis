'use client'

import { swell } from "./init/client";
import { useEffect, useState } from 'react'
import { Cart } from "swell-js/types/cart";

// useCart returns the current cart and functions to add, remove, and update items in the cart.
export const useCart = () => {
  const [cart, setCart] = useState<Cart | null>();

  const initializeCart = async () => {
    let cart = await swell.cart.get() || {};
    setCart(cart);
  }

  useEffect(() => {
    initializeCart();
  }, []);

  return { 
    cart, 
    addItem: (
      product_id: string,
      quantity: number,
      variant_id: string,
    ) => {
      swell.cart.addItem({
        product_id: product_id,
        quantity: quantity,
        variant_id: variant_id,
      })
    }, 
    removeItem: swell.cart.removeItem, 
    updateItem: swell.cart.updateItem, 
    getProducts: async () => await swell.products.list({
      limit: 5,
      page:1
    })
  };
}


// useImages takes a product and/or variant and returns all unique images associated with the product and/or variant.
export const useImages = (product: any) => {
  const [images, setImages] = useState<[]>();

  useEffect(() => {
      const productImages = product?.images?.map((image: any) => image);
      const variantImages = product?.variants?.results.map((variant: { images: any; }) => variant.images).flat().map((image: any) => image);
      const allImages = productImages?.concat(variantImages).flat().filter((v: { file: { md5: any; }; },i: any,a: any[])=>a.findIndex(v2=>(v2.file.md5===v.file?.md5))===i)
      
      console.log(allImages[0])
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

