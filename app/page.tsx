
import { Inter } from '@next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <main className="h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">Hello World</h1>
    </main>
  )
}
