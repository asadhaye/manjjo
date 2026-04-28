// Test WhatsApp URL generation
const testCart = {
  items: [
    { id: 1, name: "Classic Cheese Burger", price: 550, quantity: 2 },
    { id: 2, name: "Zinger Burger", price: 610, quantity: 1 }
  ]
};

function generateWhatsAppMessage(phoneNumber = '923098009999') {
  if (testCart.items.length === 0) return ''

  const message = [
    '🍔 Manjjo Food Order',
    '',
    '📋 Order Details:',
    ...testCart.items.map(item => 
      `• ${item.name} x${item.quantity} = Rs. ${item.price * item.quantity}`
    ),
    '',
    `💰 Total: Rs. ${testCart.items.reduce((total, item) => total + (item.price * item.quantity), 0)}`,
    '',
    '📍 Delivery Address:',
    '[Please add your address]',
    '',
    '📞 Contact Number:',
    '[Please add your phone number]',
    '',
    '⏰ Delivery Time:',
    '[ASAP / Preferred time]'
  ].join('\n')

  return `https://wa.me/${phoneNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`
}

console.log('WhatsApp URL:');
console.log(generateWhatsAppMessage());
console.log('\nDecoded message:');
console.log(decodeURIComponent(generateWhatsAppMessage().split('?text=')[1]));
