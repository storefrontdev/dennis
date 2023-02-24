
import  { useCart } from "@/lib/swell/hooks"


export default function Home() {

  const { addItem } = useCart()

  return (
   <main className="h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">Hello World</h1>
    </main>
  )
}
