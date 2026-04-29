"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, X } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface Product {
  id: number
  name: string
  basePrice: number
  image: string
  description?: string
  category?: string
  variations?: {
    sizes?: Array<{
      name: string
      price: number
      description?: string
    }>
    spiceLevels?: Array<{
      name: string
      price: number
      description?: string
    }>
    toppings?: Array<{
      name: string
      price: number
      available?: boolean
    }>
  }
}

interface Category {
  id: string
  name: string
  products: Product[]
}

const menuData: Category[] = [
  {
    id: "burgers",
    name: "Burgers",
    products: [
      { id: 1, name: "Classic Cheese Burger", basePrice: 550, image: "/images/menu/cheese-burger.jpg", category: "burgers" },
      { id: 2, name: "Chicken Cheese Burger", basePrice: 590, image: "/images/menu/cheese-burger.jpg", category: "burgers" },
      { id: 3, name: "Zinger Burger", basePrice: 610, image: "/images/menu/zinger-burger.jpg", category: "burgers", 
        variations: {
          sizes: [
            { name: "Regular", price: 590 },
            { name: "Large", price: 650 }
          ],
          spiceLevels: [
            { name: "Mild", price: 590 },
            { name: "Medium", price: 610 }
          ]
        }
      },
      { id: 3, name: "Zinger Burger", basePrice: 610, image: "/images/menu/zinger-burger.jpg", category: "burgers",
        variations: {
          sizes: [
            { name: "Regular", price: 610 },
            { name: "Large", price: 720 }
          ],
          spiceLevels: [
            { name: "Mild", price: 610 },
            { name: "Medium", price: 720 },
            { name: "Hot", price: 830 }
          ]
        }
      },
      { id: 4, name: "Crunchy Zinger Burger", basePrice: 650, image: "/images/menu/zinger-burger.jpg", category: "burgers",
        variations: {
          sizes: [
            { name: "Regular", price: 650 },
            { name: "Large", price: 750 }
          ],
          spiceLevels: [
            { name: "Mild", price: 650 },
            { name: "Medium", price: 750 },
            { name: "Hot", price: 850 }
          ]
        }
      },
      { id: 5, name: "Spicy Zinger Burger", basePrice: 650, image: "/images/menu/zinger-burger.jpg", category: "burgers",
        variations: {
          sizes: [
            { name: "Regular", price: 650 },
            { name: "Large", price: 750 }
          ],
          spiceLevels: [
            { name: "Mild", price: 650 },
            { name: "Medium", price: 750 },
            { name: "Hot", price: 850 }
          ]
        }
      },
      { id: 6, name: "Jumbo Zinger Burger", basePrice: 750, image: "/images/menu/zinger-burger.jpg", category: "burgers",
        variations: {
          sizes: [
            { name: "Regular", price: 750 },
            { name: "Jumbo", price: 900 }
          ],
          spiceLevels: [
            { name: "Mild", price: 750 },
            { name: "Medium", price: 900 },
            { name: "Hot", price: 1000 }
          ]
        }
      },
      { id: 7, name: "Manjjo Special Burger", basePrice: 820, image: "/images/menu/tower-burger.jpg", category: "burgers",
        variations: {
          sizes: [
            { name: "Regular", price: 820 },
            { name: "Large", price: 950 }
          ],
          spiceLevels: [
            { name: "Mild", price: 820 },
            { name: "Medium", price: 950 },
            { name: "Hot", price: 1080 }
          ]
        }
      },
      { id: 8, name: "Cheese Mushroom Burger", basePrice: 820, image: "/images/menu/cheese-burger.jpg", category: "burgers",
        variations: {
          sizes: [
            { name: "Regular", price: 820 },
            { name: "Large", price: 950 }
          ],
          spiceLevels: [
            { name: "Mild", price: 820 },
            { name: "Medium", price: 950 },
            { name: "Hot", price: 1080 }
          ]
        }
      },
      { id: 9, name: "Tower Burger", basePrice: 990, image: "/images/menu/tower-burger.jpg", category: "burgers",
        variations: {
          sizes: [
            { name: "Regular", price: 990 },
            { name: "Large", price: 1150 }
          ],
          spiceLevels: [
            { name: "Mild", price: 990 },
            { name: "Medium", price: 1150 },
            { name: "Hot", price: 1300 }
          ]
        }
      },
      { id: 10, name: "Manjjo King Burger", basePrice: 1050, image: "/images/menu/tower-burger.jpg", category: "burgers",
        variations: {
          sizes: [
            { name: "Regular", price: 1050 },
            { name: "Large", price: 1200 }
          ],
          spiceLevels: [
            { name: "Mild", price: 1050 },
            { name: "Medium", price: 1200 },
            { name: "Hot", price: 1350 }
          ]
        }
      },
    ],
  },
  {
    id: "pizzas",
    name: "Pizzas",
    products: [
      { id: 11, name: "Margherita", basePrice: 790, image: "/images/menu/margherita-pizza.jpg", category: "pizzas" },
      { id: 12, name: "Fajita", basePrice: 890, image: "/images/menu/fajita-pizza.jpg", category: "pizzas" },
      { id: 13, name: "Chicken Tikka", basePrice: 890, image: "/images/menu/fajita-pizza.jpg", category: "pizzas" },
      { id: 14, name: "Seekh Kebab", basePrice: 890, image: "/images/menu/fajita-pizza.jpg", category: "pizzas" },
      { id: 15, name: "Chicken Fajita", basePrice: 990, image: "/images/menu/fajita-pizza.jpg", category: "pizzas" },
      { id: 16, name: "Pepperoni", basePrice: 990, image: "/images/menu/pepperoni-pizza.jpg", category: "pizzas" },
      { id: 17, name: "Malai Boti", basePrice: 990, image: "/images/menu/fajita-pizza.jpg", category: "pizzas" },
      { id: 18, name: "Super Supreme", basePrice: 1090, image: "/images/menu/pepperoni-pizza.jpg", category: "pizzas" },
      { id: 19, name: "Manjjo Special", basePrice: 1190, image: "/images/menu/pepperoni-pizza.jpg", category: "pizzas" },
      { id: 20, name: "Tikka Malai", basePrice: 1190, image: "/images/menu/fajita-pizza.jpg", category: "pizzas" },
      { id: 21, name: "Cheese Lover", basePrice: 1190, image: "/images/menu/margherita-pizza.jpg", category: "pizzas" },
      { id: 11, name: "Margherita", basePrice: 790, image: "/images/menu/margherita-pizza.jpg", category: "pizzas" },
      { id: 12, name: "Fajita", basePrice: 890, image: "/images/menu/fajita-pizza.jpg", category: "pizzas" },
      { id: 13, name: "Chicken Tikka", basePrice: 890, image: "/images/menu/fajita-pizza.jpg", category: "pizzas" },
      { id: 14, name: "Seekh Kebab", basePrice: 890, image: "/images/menu/fajita-pizza.jpg", category: "pizzas" },
      { id: 15, name: "Chicken Fajita", basePrice: 990, image: "/images/menu/fajita-pizza.jpg", category: "pizzas" },
      { id: 16, name: "Pepperoni", basePrice: 990, image: "/images/menu/pepperoni-pizza.jpg", category: "pizzas" },
      { id: 17, name: "Malai Boti", basePrice: 990, image: "/images/menu/fajita-pizza.jpg", category: "pizzas" },
      { id: 18, name: "Super Supreme", basePrice: 1090, image: "/images/menu/pepperoni-pizza.jpg", category: "pizzas" },
      { id: 19, name: "Manjjo Special", basePrice: 1190, image: "/images/menu/pepperoni-pizza.jpg", category: "pizzas" },
      { id: 20, name: "Tikka Malai", basePrice: 1190, image: "/images/menu/fajita-pizza.jpg", category: "pizzas" },
      { id: 21, name: "Cheese Lover", basePrice: 1190, image: "/images/menu/margherita-pizza.jpg", category: "pizzas" },
    ],
  },
  {
    id: "wraps",
    name: "Wraps & Rolls",
    products: [
      { id: 22, name: "Chicken Wrap", basePrice: 590, image: "/images/menu/chicken-wrap.jpg", category: "wraps" },
      { id: 23, name: "Zinger Wrap", basePrice: 610, image: "/images/menu/chicken-wrap.jpg", category: "wraps" },
      { id: 24, name: "Mayo Garlic Wrap", basePrice: 650, image: "/images/menu/chicken-wrap.jpg", category: "wraps" },
      { id: 25, name: "Reshmi Kebab Wrap", basePrice: 650, image: "/images/menu/malai-boti-wrap.jpg", category: "wraps" },
      { id: 26, name: "Malai Boti Wrap", basePrice: 690, image: "/images/menu/malai-boti-wrap.jpg", category: "wraps" },
      { id: 27, name: "Boti Paratha Roll", basePrice: 690, image: "/images/menu/malai-boti-wrap.jpg", category: "wraps" },
      { id: 28, name: "Seekh Kebab Paratha Roll", basePrice: 690, image: "/images/menu/malai-boti-wrap.jpg", category: "wraps" },
    ],
  },
  {
    id: "sides",
    name: "Sides & Add-ons",
    products: [
      { id: 29, name: "French Fries", basePrice: 290, image: "/images/menu/loaded-fries.jpg", category: "sides" },
      { id: 30, name: "Nuggets (6 pcs)", basePrice: 350, image: "/images/menu/nuggets.jpg", category: "sides" },
      { id: 31, name: "Spicy Wings (6 pcs)", basePrice: 450, image: "/images/menu/hot-wings.jpg", category: "sides" },
      { id: 32, name: "Zinger Wings (6 pcs)", basePrice: 590, image: "/images/menu/hot-wings.jpg", category: "sides" },
    ],
  },
  {
    id: "deals",
    name: "Deals & Specials",
    products: [
      { id: 33, name: "Whole Rotisserie Chicken", basePrice: 1890, image: "/images/menu/rotisserie-chicken.jpg", category: "deals" },
      { id: 34, name: "Deal 1", basePrice: 1290, image: "/images/menu/deal-combo.jpg", description: "2 Zinger Burgers + 2 Drinks + 1 Fries", category: "deals" },
      { id: 35, name: "Deal 2", basePrice: 1390, image: "/images/menu/deal-combo.jpg", description: "1 Chicken Cheese + 1 Zinger + 2 Drinks + 1 Fries", category: "deals" },
      { id: 36, name: "Deal 3", basePrice: 1390, image: "/images/menu/deal-combo.jpg", description: "2 Crunchy Zinger Burgers + 2 Drinks + 1 Fries", category: "deals" },
      { id: 37, name: "Deal 4", basePrice: 2490, image: "/images/menu/deal-combo.jpg", description: "4 Zinger Burgers + 4 Drinks + 2 Fries", category: "deals" },
      { id: 38, name: "Deal 5", basePrice: 1790, image: "/images/menu/deal-combo.jpg", description: "2 Manjjo Special Burgers + 2 Drinks + 1 Fries", category: "deals" },
      { id: 39, name: "Deal 6", basePrice: 1890, image: "/images/menu/deal-combo.jpg", description: "1 Tower + 1 Manjjo Special + 2 Drinks + 1 Fries", category: "deals" },
    ],
  },
]

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [showVariationModal, setShowVariationModal] = useState(false)
  const [selectedSize, setSelectedSize] = useState('Regular')
  const [selectedSpice, setSelectedSpice] = useState('Medium')

  const handleAddToCart = () => {
    const finalPrice = calculateFinalPrice(product.basePrice, selectedSize, selectedSpice)
    addToCart({
      id: product.id,
      name: `${product.name} (${selectedSize}, ${selectedSpice})`,
      price: finalPrice
    })
    setShowVariationModal(false)
  }

  const calculateFinalPrice = (basePrice: number, size: string, spice: string) => {
    let sizeMultiplier = 1
    let spiceMultiplier = 1

    // Size pricing
    if (product.variations?.sizes) {
      const sizeOption = product.variations.sizes.find(s => s.name === size)
      if (sizeOption) {
        sizeMultiplier = sizeOption.price / basePrice
      }
    }

    // Spice pricing
    if (product.variations?.spiceLevels) {
      const spiceOption = product.variations.spiceLevels.find(s => s.name === spice)
      if (spiceOption) {
        spiceMultiplier = spiceOption.price / basePrice
      }
    }

    return Math.round(basePrice * sizeMultiplier * spiceMultiplier)
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden relative group hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Add Button - overlapping bottom right of image */}
        <button
          type="button"
          onClick={() => setShowVariationModal(true)}
          className="absolute -bottom-5 right-4 w-10 h-10 bg-manjjo-red rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-all duration-200 active:scale-95 group-hover:scale-110"
          aria-label={`Customize ${product.name}`}
        >
          <Plus className="w-5 h-5 text-white transition-transform duration-200" />
        </button>
        
        {/* Badge for new/popular items */}
        {(product.id <= 5 || product.basePrice >= 1000) && (
          <div className="absolute top-2 left-2 bg-manjjo-yellow text-black text-xs font-bold px-2 py-1 rounded-full">
            {product.id <= 5 ? "NEW" : "POPULAR"}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 pt-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-black text-lg leading-tight flex-1">{product.name}</h3>
          <div className="flex items-center gap-1">
            <span className="text-xs text-manjjo-gray bg-manjjo-light px-2 py-1 rounded-full font-medium">
              {product.category || "Fast Food"}
            </span>
          </div>
        </div>
        {product.description && (
          <p className="text-manjjo-gray text-sm mt-2 leading-snug">{product.description}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <p className="text-manjjo-red font-bold text-xl">Rs. {product.basePrice.toLocaleString()}</p>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-manjjo-yellow rounded-full animate-pulse" />
            <span className="text-xs text-manjjo-gray font-medium">In Stock</span>
          </div>
        </div>
      </div>
    </div>

    {/* Variation Modal */}
    {showVariationModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Customize {product.name}</h2>
            <button 
              onClick={() => setShowVariationModal(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-4 space-y-4">
            {/* Size Selection */}
            {product.variations?.sizes && product.variations.sizes.length > 0 && (
              <div>
                <h3 className="font-medium text-manjjo-red mb-2">Choose Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {product.variations.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size.name)}
                      className={`p-3 border-2 rounded-lg transition-colors ${
                        selectedSize === size.name
                          ? "border-manjjo-red bg-manjjo-red text-white"
                          : "border-manjjo-gray hover:border-manjjo-red"
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-medium">{size.name}</div>
                        <div className="text-sm text-manjjo-gray">+Rs. {size.price}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Spice Level Selection */}
            {product.variations?.spiceLevels && product.variations.spiceLevels.length > 0 && (
              <div>
                <h3 className="font-medium text-manjjo-red mb-2">Choose Spice Level</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.variations.spiceLevels.map((spice) => (
                    <button
                      key={spice.name}
                      onClick={() => setSelectedSpice(spice.name)}
                      className={`p-3 border-2 rounded-lg transition-colors ${
                        selectedSpice === spice.name
                          ? "border-manjjo-red bg-manjjo-red text-white"
                          : "border-manjjo-gray hover:border-manjjo-red"
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-medium">{spice.name}</div>
                        <div className="text-sm text-manjjo-gray">+Rs. {spice.price}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <button
                onClick={() => setShowVariationModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-manjjo-red text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Add to Cart - Rs. {calculateFinalPrice(product.basePrice, selectedSize, selectedSpice)}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function CategoryTabs({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: { 
  categories: Category[]
  activeCategory: string
  onCategoryChange: (id: string) => void
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:flex-wrap">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border-2 border-manjjo-gray hover:border-manjjo-red ${
            activeCategory === category.id
              ? "bg-manjjo-red text-white shadow-lg"
              : "bg-white text-manjjo-gray hover:bg-manjjo-light hover:border-manjjo-red"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("burgers")
  
  const currentCategory = menuData.find((cat) => cat.id === activeCategory) || menuData[0]

  return (
    <section className="bg-[#F9F9F9] py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
          Our Menu
        </h2>
        
        {/* Category Tabs */}
        <CategoryTabs 
          categories={menuData} 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCategory.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
