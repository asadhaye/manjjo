"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Plus, X } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { fetchMenuData, MenuItem } from "@/lib/google-sheets"

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

export default function ProductGrid() {
  const [menuData, setMenuData] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('burgers')

  useEffect(() => {
    async function loadMenuData() {
      try {
        setLoading(true)
        const items: MenuItem[] = await fetchMenuData()
        
        // Group items by category
        const groupedData = items.reduce((acc: Category[], item) => {
          const categoryName = item.category || 'other'
          const existingCategory = acc.find(cat => cat.id === categoryName)
          
          if (existingCategory) {
            existingCategory.products.push(item)
          } else {
            acc.push({
              id: categoryName,
              name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
              products: [item]
            })
          }
          
          return acc
        }, [])
        
        setMenuData(groupedData)
      } catch (err) {
        console.error('Error loading menu data:', err)
        setError('Failed to load menu data')
      } finally {
        setLoading(false)
      }
    }

    loadMenuData()
  }, [])

  if (loading) {
    return (
      <section className="bg-[#F9F9F9] py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-manjjo-red mx-auto"></div>
            <p className="mt-4 text-manjjo-gray">Loading menu...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-[#F9F9F9] py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  const currentCategory = menuData.find((cat) => cat.id === activeCategory) || menuData[0]

  return (
    <section id="menu-section" className="bg-[#F9F9F9] py-8 px-4 md:px-8">
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
    <>
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
      )}
    </>
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
