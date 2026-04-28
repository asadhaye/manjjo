"use client"

import { useState } from "react"
import { ShoppingCart, X, MessageCircle } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export function WhatsAppCartButton() {
  const [isOpen, setIsOpen] = useState(false)
  const { getTotalItems, getTotalPrice, getItems, removeFromCart, updateQuantity, shareToWhatsApp } = useCart()

  const items = getItems()
  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  return (
    <>
      {/* Cart Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="relative p-2 transition-transform hover:scale-105 active:scale-95"
        aria-label={`Shopping cart with ${totalItems} items`}
      >
        <ShoppingCart className="h-6 w-6 text-white" />
        {totalItems > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-manjjo-yellow text-xs font-bold text-black">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Your Order</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-3">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-manjjo-red font-semibold">Rs. {item.price * item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-white border hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-white border hover:bg-gray-100"
                        >
                          +
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total:</span>
                  <span className="text-xl font-bold text-manjjo-red">Rs. {totalPrice}</span>
                </div>
                <button
                  onClick={shareToWhatsApp}
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Order on WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
