'use client'
import { useEffect, useState } from 'react'
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
import { useVelocity } from 'framer-motion'


const Details = ({ product }) => {

  const { addItem } = useCart();
  const { id, name, description} = product;
  const { options } = useOptions(product)
  const variant = useVariant(product, options)


  // const [activeVariant, setActiveVariant] = useState(null);
  // const [selectedPurchaseOption, setSelectedPurchaseOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});



  return (
    <div className="flex flex-col h-screen justify-between px-8 py-5 space-y-10">
      <div>
        <div className="flex items-center justify-center">
          <h1 className="text-6xl font-bold text-brigh-blue-900">{name}</h1>
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
          className="w-full rounded-sm bg-coral-red text-white text-xl px-5 py-8 shadow-md" 
          onClick={() => 
            addItem({
              product_id: id,
              variant_id: variant?.id,
              quantity: 1,
            }) 
          }
        >
          Buy Maui Cooler
        </button>
      </div>
    </div>
 
  );
}

export default Details;