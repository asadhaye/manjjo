"use client"

import { ShoppingCart, Home, Menu } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export function BottomNav() {
  const { getTotalItems, getTotalPrice } = useCart()
  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent("Hi! I would like to place an order.")
    window.open(`https://wa.me/923098009999?text=${message}`, "_blank")
  }

  const handleMenuClick = () => {
    const menuSection = document.getElementById('menu-section')
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-manjjo-gray bg-white px-4 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-3 max-w-md mx-auto md:max-w-2xl">
        {/* Menu Button */}
        <button 
          onClick={handleMenuClick}
          className="flex items-center gap-2 text-manjjo-gray hover:text-manjjo-red transition-colors"
        >
          <Menu className="w-5 h-5" />
          <span className="text-sm font-medium">Menu</span>
        </button>

        {/* Cart Summary */}
        <div className="flex-1 text-center">
          {totalItems > 0 ? (
            <div className="flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5 text-manjjo-red" />
              <div className="text-sm">
                <span className="font-bold text-manjjo-red">{totalItems}</span>
                <span className="text-manjjo-gray"> items</span>
                <span className="text-manjjo-gray"> | </span>
                <span className="font-bold text-manjjo-red">Rs. {totalPrice}</span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Home className="w-5 h-5 mx-auto text-manjjo-gray mb-1" />
              <p className="text-xs text-manjjo-orange font-bold">Order Now</p>
            </div>
          )}
        </div>

        {/* WhatsApp Order Button */}
        <button
          onClick={handleWhatsAppOrder}
          className="bg-manjjo-red text-white py-3 px-4 rounded-lg font-bold text-sm uppercase tracking-wide transition-all duration-200 hover:bg-red-700 active:scale-95 shadow-lg"
        >
          Order on WhatsApp
        </button>
      </div>
    </nav>
  )
}
