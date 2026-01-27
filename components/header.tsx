"use client"

import Image from "next/image"
import { ShoppingCart } from "lucide-react"

export function Header() {
  const cartItemCount = 3 // Example count - would come from cart state

  return (
    <header className="sticky top-0 z-50 bg-manjjo-red">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <div className="overflow-hidden rounded-lg bg-black/90 px-3 py-1.5 shadow-md">
            <Image 
              src="/images/manjjo.png" 
              alt="Manjjo Logo" 
              width={140} 
              height={45}
              className="h-9 w-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Cart Icon with Badge */}
        <button 
          className="relative p-2 transition-transform hover:scale-105 active:scale-95"
          aria-label={`Shopping cart with ${cartItemCount} items`}
        >
          <ShoppingCart className="h-6 w-6 text-white" />
          {cartItemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-manjjo-yellow text-xs font-bold text-black">
              {cartItemCount > 9 ? "9+" : cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
