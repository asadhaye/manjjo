"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface Product {
  id: number
  name: string
  price: number
  image: string
  description?: string
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
      { id: 1, name: "Classic Cheese Burger", price: 550, image: "/images/menu/cheese-burger.jpg" },
      { id: 2, name: "Chicken Cheese Burger", price: 590, image: "/images/menu/cheese-burger.jpg" },
      { id: 3, name: "Zinger Burger", price: 610, image: "/images/menu/zinger-burger.jpg" },
      { id: 4, name: "Crunchy Zinger Burger", price: 650, image: "/images/menu/zinger-burger.jpg" },
      { id: 5, name: "Spicy Zinger Burger", price: 650, image: "/images/menu/zinger-burger.jpg" },
      { id: 6, name: "Jumbo Zinger Burger", price: 750, image: "/images/menu/zinger-burger.jpg" },
      { id: 7, name: "Manjjo Special Burger", price: 820, image: "/images/menu/tower-burger.jpg" },
      { id: 8, name: "Cheese Mushroom Burger", price: 820, image: "/images/menu/cheese-burger.jpg" },
      { id: 9, name: "Tower Burger", price: 990, image: "/images/menu/tower-burger.jpg" },
      { id: 10, name: "Manjjo King Burger", price: 1050, image: "/images/menu/tower-burger.jpg" },
    ],
  },
  {
    id: "pizzas",
    name: "Pizzas",
    products: [
      { id: 11, name: "Margherita", price: 790, image: "/images/menu/margherita-pizza.jpg" },
      { id: 12, name: "Fajita", price: 890, image: "/images/menu/fajita-pizza.jpg" },
      { id: 13, name: "Chicken Tikka", price: 890, image: "/images/menu/fajita-pizza.jpg" },
      { id: 14, name: "Seekh Kebab", price: 890, image: "/images/menu/fajita-pizza.jpg" },
      { id: 15, name: "Chicken Fajita", price: 990, image: "/images/menu/fajita-pizza.jpg" },
      { id: 16, name: "Pepperoni", price: 990, image: "/images/menu/pepperoni-pizza.jpg" },
      { id: 17, name: "Malai Boti", price: 990, image: "/images/menu/fajita-pizza.jpg" },
      { id: 18, name: "Super Supreme", price: 1090, image: "/images/menu/pepperoni-pizza.jpg" },
      { id: 19, name: "Manjjo Special", price: 1190, image: "/images/menu/pepperoni-pizza.jpg" },
      { id: 20, name: "Tikka Malai", price: 1190, image: "/images/menu/fajita-pizza.jpg" },
      { id: 21, name: "Cheese Lover", price: 1190, image: "/images/menu/margherita-pizza.jpg" },
    ],
  },
  {
    id: "wraps",
    name: "Wraps & Rolls",
    products: [
      { id: 22, name: "Chicken Wrap", price: 590, image: "/images/menu/chicken-wrap.jpg" },
      { id: 23, name: "Zinger Wrap", price: 610, image: "/images/menu/chicken-wrap.jpg" },
      { id: 24, name: "Mayo Garlic Wrap", price: 650, image: "/images/menu/chicken-wrap.jpg" },
      { id: 25, name: "Reshmi Kebab Wrap", price: 650, image: "/images/menu/malai-boti-wrap.jpg" },
      { id: 26, name: "Malai Boti Wrap", price: 690, image: "/images/menu/malai-boti-wrap.jpg" },
      { id: 27, name: "Boti Paratha Roll", price: 690, image: "/images/menu/malai-boti-wrap.jpg" },
      { id: 28, name: "Seekh Kebab Paratha Roll", price: 690, image: "/images/menu/malai-boti-wrap.jpg" },
    ],
  },
  {
    id: "sides",
    name: "Sides & Add-ons",
    products: [
      { id: 29, name: "French Fries", price: 290, image: "/images/menu/loaded-fries.jpg" },
      { id: 30, name: "Nuggets (6 pcs)", price: 350, image: "/images/menu/nuggets.jpg" },
      { id: 31, name: "Spicy Wings (6 pcs)", price: 450, image: "/images/menu/hot-wings.jpg" },
      { id: 32, name: "Zinger Wings (6 pcs)", price: 590, image: "/images/menu/hot-wings.jpg" },
    ],
  },
  {
    id: "deals",
    name: "Deals & Specials",
    products: [
      { id: 33, name: "Whole Rotisserie Chicken", price: 1890, image: "/images/menu/rotisserie-chicken.jpg" },
      { id: 34, name: "Deal 1", price: 1290, image: "/images/menu/deal-combo.jpg", description: "2 Zinger Burgers + 2 Drinks + 1 Fries" },
      { id: 35, name: "Deal 2", price: 1390, image: "/images/menu/deal-combo.jpg", description: "1 Chicken Cheese + 1 Zinger + 2 Drinks + 1 Fries" },
      { id: 36, name: "Deal 3", price: 1390, image: "/images/menu/deal-combo.jpg", description: "2 Crunchy Zinger Burgers + 2 Drinks + 1 Fries" },
      { id: 37, name: "Deal 4", price: 2490, image: "/images/menu/deal-combo.jpg", description: "4 Zinger Burgers + 4 Drinks + 2 Fries" },
      { id: 38, name: "Deal 5", price: 1790, image: "/images/menu/deal-combo.jpg", description: "2 Manjjo Special Burgers + 2 Drinks + 1 Fries" },
      { id: 39, name: "Deal 6", price: 1890, image: "/images/menu/deal-combo.jpg", description: "1 Tower + 1 Manjjo Special + 2 Drinks + 1 Fries" },
    ],
  },
]

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden relative">
      {/* Image Section */}
      <div className="relative aspect-square">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Add Button - overlapping bottom right of image */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="absolute -bottom-5 right-4 w-10 h-10 bg-manjjo-red rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors active:scale-95"
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 pt-6">
        <h3 className="font-semibold text-black text-base leading-tight">{product.name}</h3>
        {product.description && (
          <p className="text-gray-500 text-xs mt-1 leading-snug">{product.description}</p>
        )}
        <p className="text-manjjo-red font-bold text-lg mt-1">
          Rs. {product.price.toLocaleString()}
        </p>
      </div>
    </div>
  )
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
    <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            activeCategory === category.id
              ? "bg-manjjo-red text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
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
