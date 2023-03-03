import './globals.css'
import Navigation from '../components/navigation'
import Cart from '@/components/cart'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Navigation />
        <div className="fixed top-5 right-0 z-40">
          <Cart />
        </div>
        {children}
      </body>
    </html>
  )
}
