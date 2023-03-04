'use client'

import { swell } from "./init/client";
import { useEffect, useState } from 'react'
import { CartItem } from "swell-js/types/cart";


  

// useCart returns the current cart and functions to add, remove, and update items in the cart.
export const useCart = () => {

  const [cart, setCart] = useState<swell.Cart>();

  const addItem = async (item: CartItem) => {
    await swell.cart.addItem(item)
  }

  const removeItem = async (item: string) => {
    await swell.cart.removeItem(item);
  }

  const clearCart = async () => {
    await swell.cart.setItems([])
  }

  const getCart = async () => {
    // get the cart from swell with useEffect
    let cart = await swell.cart.get() || {};
    setCart(cart)
  }

  useEffect(() => {
    getCart()
  }, [])


  return { 
    cart,
    setCart,
    getCart,
    addItem,
    clearCart,
    removeItem,
  }
}


// useImages takes a product and/or variant and returns all unique images associated with the product and/or variant.
export const useImages = (product: any) => {
  const [images, setImages] = useState<[]>();

  useEffect(() => {
    const productImages = product?.images?.map((image: any) => image.file);

    // filter through the product variants images and return the file object into a new array

    const variantImages = product?.variants?.results.map((variant: { images: any; }) => variant.images).flat().map((image: any) => image.file);


    // combine the productImages and variantImages into one array and remove duplicates use the md5 hash
    const allImages = productImages?.concat(variantImages).flat().filter((v: { md5: any; },i: any,a: any[])=>a.findIndex(v2=>(v2.md5===v.md5))===i)
      
      setImages(allImages);
  
  }, [product]);
  

  return {images}
}


export const useMedia = (product: any) => {
  const [media, setMedia] = useState<[]>();

  useEffect(() => {
      const productMedia = product?.media?.map((media: any) => media);
      const productImages = product?.images?.map((image: any) => image.file);

      // filter through the product variants images and return the file object into a new array

      const variantImages = product?.variants?.results.map((variant: { images: any; }) => variant.images).flat().map((image: any) => image.file);


      // combine the productImages and variantImages into one array and remove duplicates use the md5 hash
      const allImages = productImages?.concat(variantImages).flat().filter((v: { md5: any; },i: any,a: any[])=>a.findIndex(v2=>(v2.md5===v.md5))===i)

      // merge productMedia and allImages into one array and remove duplicates use the md5 hash
      const allMedia = productMedia?.concat(allImages).flat().filter((v: { md5: any; },i: any,a: any[])=>a.findIndex(v2=>(v2.md5===v.md5))===i)
     
      
      setMedia(allMedia);
  
  }, [product]);
  


  return {
    media
  }
}


  const useOptions = (product: any) => {

    function unique(value: any, index: any, self: string | any[]) {
      return self.indexOf(value) === index;
    }
    
    const options = product?.options?.filter(unique);

    return {
      options
    }
  }

  export { useOptions }


  export const useSelectedOptions = () => {
    const [selectedOptions, setSelectedOptions] = useState([{}]);

    useEffect(() => {
      setSelectedOptions((selectedOptions) => [...selectedOptions]);
    }, []);

    return {selectedOptions, setSelectedOptions}
  }





const useVariants = (product: any) => {

  function unique(value: any, index: any, self: string | any[]) {
    return self.indexOf(value) === index;
  }

  let v = product?.variants?.results?.flat()
  let variants = v?.filter(unique);

  return {
    variants
  }
}

export { useVariants }



export const useVariant = (product: swell.Product, options: object) => {
  // options are an object like { Color: 'Red', Size: 'Small' }

  // call getVariant on options change and return the variant
  const [variant, setVariant] = useState<swell.Variant>();

  useEffect(() => {
    const getVariant = async () => {
      // Resolves the variation price, sale_price, orig_price, and stock_status values based on the customer's chosen options.
      const v = await swell.products.variation(product, options)
  
      return v
    }
  
    getVariant().then((v) => {
      setVariant(v)
    })
  }, [options, product])

  

  return { variant }
}

