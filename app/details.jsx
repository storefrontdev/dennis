'use client'
import { use, useEffect, useState } from 'react'
import { useCart, useOptions, useVariant } from '@/lib/swell/hooks'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"
import Option from "@/app/products/[product]/options/option"


const Details = ({ product }) => {

  const { cart, addItem, loading, setLoading } = useCart()

  const { id, name, description} = product;
  const { options } = useOptions(product)
  const [selectedOptions, setSelectedOptions] = useState({});
  // const variant = useVariant(product, selectedOptions)

  const [ count, setCount ] = useState(0)

  useEffect(() => {
    setCount(cart?.item_quantity)
  }, [])


  // if cart length increases open cart
  useEffect(() => {
    if (cart?.item_quantity > count) {
      setLoading(false)
    }
    setCount(cart?.item_quantity)
  }, [cart?.item_quantity, count, setLoading])

  return (
    <div className="flex flex-col min-h-screen justify-between px-8 py-5 space-y-10">
      <div>
        <div className="flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-brigh-blue-900">{name}</h1>
        </div>
        <div className="mt-5 text-l md:text-xl text-bright-blue-900" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
   

        {options && (
          <div className="flex flex-col space-y-5">
            {options.map((option, i) => (
               <Option key={option.id} option={option} setSelectedOptions={setSelectedOptions} />
            ))}
          </div>
        )}

        <Tabs defaultValue="subscribe" className="mt-10 w-full h-full">
          <TabsList className="w-full grid grid-cols-2 gap-5">
            <TabsTrigger value="subscribe" className="col-span-1">Subscribe (10% off)</TabsTrigger>
            <TabsTrigger value="one-time" className="col-span-1">One-Time</TabsTrigger>
          </TabsList>
          <TabsContent value="subscribe">
            <Label>Delivery Frequency</Label>
            {product.purchase_options.subscription && (
              <div className="flex flex-col space-y-5">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                  {product.purchase_options.subscription?.plans?.map((option, i) => {
                    return (
                      <SelectItem key={i} value={option.id}>
                        {option.name} - ${option.price}
                      </SelectItem>
                    )
                  })}
                  </SelectContent>
                </Select>
              </div>
            )}
          </TabsContent>
          <TabsContent value="one-time">
            <div className="hidden">
             <p>Save 10% by subscribing</p>
            </div>
          </TabsContent>
        </Tabs>


      
      <div className="flex">
        <button 
          type="button"
          className="w-full rounded-sm bg-coral-red text-white text-xl px-5 py-8 shadow-md" 
          onClick={() => {
            setLoading(true)
            addItem({product_id: id, quantity: 1})
          }}
        >
          {loading ? "Adding to cart..." : `Add ${product.name} to Cart`}
        </button>
      </div>
    </div>
 
  );
}

export default Details;