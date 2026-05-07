import React from "react"
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/contexts/cart-context'
import './globals.css'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: 'Manjjo - Best Fast Food in Lahore',
  description: 'Cravings Met? Order the best fast food in Lahore from Manjjo.',
  generator: 'v0.app',
  manifest: '/manifest.json',
  icons: {
    icon: '/images/manjjo.png',
    apple: '/images/manjjo.png',
  },
  themeColor: '#FFAE42',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Manjjo',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
