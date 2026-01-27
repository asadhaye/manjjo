"use client"

export function BottomNav() {
  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent("Hi! I would like to place an order.")
    window.open(`https://wa.me/?text=${message}`, "_blank")
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 px-4 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="flex items-center gap-3 max-w-md mx-auto md:max-w-2xl">
        <div className="shrink-0">
          <p className="text-sm font-semibold" style={{ color: "#000000" }}>
            Rs. 1,290 | 3 Items
          </p>
        </div>
        <button
          onClick={handleWhatsAppOrder}
          className="flex-1 py-3 px-4 rounded-lg font-bold text-sm uppercase tracking-wide transition-transform active:scale-[0.98]"
          style={{ backgroundColor: "#FFC700", color: "#000000" }}
        >
          Place Order on WhatsApp
        </button>
      </div>
    </nav>
  )
}
