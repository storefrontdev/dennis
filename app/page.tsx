
import  { useCart } from "@/lib/swell/hooks"


export default function Home() {

  const { addItem } = useCart()

  return (
   <main className="h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <button type="submit" onClick={() => addItem({ productId: "63f286c2e826fc001239e183", variant_id: "63f31c0daab30c0012da6a2e", quantity: 1 })}>Add Item to Cart</button>
    </main>
  )
}
