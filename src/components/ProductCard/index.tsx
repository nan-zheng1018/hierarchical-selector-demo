'use client'

import React, { useState } from 'react'
import './ProductCard.css'

// 商品データの型定義
export interface Product {
  id: number
  name: string
  price: number
  description?: string
  inStock?: boolean
}

// コンポーネントのプロパティ
export interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  className?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  className = ''
}) => {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    if (!product.inStock) return
    
    setIsAdding(true)
    
    // カートに追加する処理（模擬的に少し時間をかける）
    setTimeout(() => {
      onAddToCart?.(product)
      setIsAdding(false)
    }, 500)
  }

  return (
    <div className={`product-card ${!product.inStock ? 'out-of-stock' : ''} ${className}`}>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        {product.description && (
          <p className="product-description">{product.description}</p>
        )}
        <div className="product-price">
          ¥{product.price.toLocaleString()}
        </div>
        
        {!product.inStock && (
          <div className="out-of-stock-overlay">
            在庫切れ
          </div>
        )}
        
        <button
          className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdding}
        >
          {isAdding ? '追加中...' : product.inStock ? 'カートに追加' : '在庫切れ'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
