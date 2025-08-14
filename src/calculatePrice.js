// 普通の関数：データを受け取って、データを返す
function calculatePrice(basePrice, discount) {
  return basePrice * (1 - discount)
}

// 使い方
const finalPrice = calculatePrice(1000, 0.1) // 900が返される
console.log(finalPrice) // 画面には何も表示されない

// Reactコンポーネント：データを受け取って、「見た目」を返す
function ProductCard({ name, price, image }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{price}円</p>
      <button>カートに追加</button>
    </div>
  )
}

// 使い方
<ProductCard name="iPhone" price={100000} image="iphone.jpg" />
