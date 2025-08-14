'use client'

import React, { useState } from 'react'
import ProductCard, { Product } from '@/components/ProductCard'

export default function ProductCardDemo() {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [notification, setNotification] = useState<string>('')

  // サンプル商品データ
  const products: Product[] = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 159800,
      description: '最新のA17 Proチップを搭載した高性能スマートフォン',
      inStock: true
    },
    {
      id: 2,
      name: 'MacBook Air M3',
      price: 164800,
      description: 'M3チップ搭載の超薄型ノートパソコン',
      inStock: true
    },
    {
      id: 3,
      name: 'iPad Pro 12.9インチ',
      price: 129800,
      description: 'プロフェッショナル向けの大画面タブレット',
      inStock: false
    },
    {
      id: 4,
      name: 'AirPods Pro',
      price: 39800,
      description: 'アクティブノイズキャンセリング搭載ワイヤレスイヤホン',
      inStock: true
    },
    {
      id: 5,
      name: 'Apple Watch Series 9',
      price: 59800,
      description: '最新の健康管理機能を搭載したスマートウォッチ',
      inStock: true
    },
    {
      id: 6,
      name: 'Mac Studio',
      price: 248800,
      description: 'プロ向けデスクトップコンピュータ',
      inStock: false
    }
  ]

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => [...prev, product])
    setNotification(`${product.name} をカートに追加しました！`)
    
    // 通知を3秒後に消す
    setTimeout(() => {
      setNotification('')
    }, 3000)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0)
  }

  const clearCart = () => {
    setCartItems([])
    setNotification('カートをクリアしました')
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>
        ProductCard コンポーネント デモ
      </h1>

      {/* 通知 */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#4caf50',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          animation: 'slideIn 0.3s ease'
        }}>
          {notification}
        </div>
      )}

      {/* カート情報 */}
      <div style={{
        background: '#f5f5f5',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h3 style={{ margin: '0 0 8px 0' }}>🛒 ショッピングカート</h3>
          <p style={{ margin: 0, color: '#666' }}>
            {cartItems.length}個の商品 | 合計: ¥{getTotalPrice().toLocaleString()}
          </p>
        </div>
        <button
          onClick={clearCart}
          disabled={cartItems.length === 0}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            background: cartItems.length > 0 ? '#f44336' : '#ccc',
            color: 'white',
            cursor: cartItems.length > 0 ? 'pointer' : 'not-allowed'
          }}
        >
          カートをクリア
        </button>
      </div>

      {/* 商品グリッド */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        justifyItems: 'center'
      }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* カート詳細 */}
      {cartItems.length > 0 && (
        <div style={{
          marginTop: '40px',
          background: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 16px 0' }}>📦 カート内容</h3>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: index < cartItems.length - 1 ? '1px solid #f0f0f0' : 'none'
                }}
              >
                <span>{item.name}</span>
                <span style={{ fontWeight: 'bold', color: '#1976d2' }}>
                  ¥{item.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '2px solid #1976d2',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            <span>合計:</span>
            <span style={{ color: '#1976d2' }}>¥{getTotalPrice().toLocaleString()}</span>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
