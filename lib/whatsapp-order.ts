interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export class WhatsAppCart {
  private items: CartItem[] = []

  addItem(product: { id: number; name: string; price: number }) {
    const existingItem = this.items.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.items.push({ ...product, quantity: 1 })
    }
  }

  removeItem(productId: number) {
    this.items = this.items.filter(item => item.id !== productId)
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.items.find(item => item.id === productId)
    if (item) {
      item.quantity = Math.max(1, quantity)
    }
  }

  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0)
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  getItems(): CartItem[] {
    return [...this.items]
  }

  clear() {
    this.items = []
  }

  generateWhatsAppMessage(phoneNumber: string = '+923098009999'): string {
    if (this.items.length === 0) return ''

    const message = [
      '🍔 *Manjjo Food Order*',
      '',
      '📋 *Order Details:*',
      ...this.items.map(item => 
        `• ${item.name} x${item.quantity} = Rs. ${item.price * item.quantity}`
      ),
      '',
      `💰 *Total: Rs. ${this.getTotalPrice()}*`,
      '',
      '📍 *Delivery Address:*',
      '[Please add your address]',
      '',
      '📞 *Contact Number:*',
      '[Please add your phone number]',
      '',
      '⏰ *Delivery Time:*',
      '[ASAP / Preferred time]'
    ].join('\n')

    return `https://wa.me/${phoneNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`
  }
}
