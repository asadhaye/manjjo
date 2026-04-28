"use client"

import Image from "next/image"
import { WhatsAppCartButton } from "@/components/whatsapp-cart"

export function Header() {
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

        {/* WhatsApp Cart Button */}
        <WhatsAppCartButton />
      </div>
    </header>
  )
}
