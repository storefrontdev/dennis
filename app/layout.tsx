import './globals.css'

import Navigation from '@/app/components/navigation'
import Cart from '@/components/cart/cart'
import { StorefrontProvider } from '@/providers/storefront-provider'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <html lang="en">
      <head />
      <body>
        <StorefrontProvider>
          <Navigation />
          <Cart />
          <main>
            {children}
          </main>
        </StorefrontProvider>
      </body>
    </html>
  )
}
