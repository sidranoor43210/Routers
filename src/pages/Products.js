import React, { useEffect, useState } from 'react';
import '../App.css';  

const StarRating = ({ rating }) => {
  const stars = Math.round(rating * 2) / 2;
  
  const renderStars = () => {
    const starArray = [];
    for (let i = 1; i <= Math.floor(stars); i++) {
      starArray.push(<span key={`star-${i}`}>⭐</span>);
    }
    if (stars % 1 !== 0) {
      starArray.push(<span key="half-star">⭐</span>);
    }
    return starArray;
  };

  return (
    <div className="product-rating">
      <div className="stars">{renderStars()}</div>
      <span className="rating-number">({rating})</span>
    </div>
  );
};

function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://dummyjson.com/products');
        const json = await res.json();
        setData(json.products);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="listimg">
        <h1>List of Products</h1>
        <img src="https://cdn-icons-png.flaticon.com/128/14205/14205012.png" alt="Product List Logo" />
      </div>

      <ol className="products-list">
        {data.map((product) => (
          <li key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.thumbnail} alt={`Thumbnail of ${product.title}`} className="product-image" />
            </div>
            <div className="product-info">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-description">{product.description}</p>
              <div className="category-brand">
                <h3 className="product-category">Category: {product.category}</h3>
                <p className="product-brand">Brand: {product.brand}</p>
              </div>
              <div className="price-discount">
                <p className="product-price">Price: {product.price}</p>
                <p className="product-discount">Discount: {product.discountPercentage}</p>
              </div>
              <div className="stock-status">
                <p className="product-stock">Stock: {product.stock}</p>
                <p className="product-status">Availability: {product.availabilityStatus}</p>
              </div>
              <p className="product-weight">Weight: {product.weight}</p>
              <p className="product-warranty">Warranty: {product.warrantyInformation}</p>
              <p className="product-shipping">Shipping: {product.shippingInformation}</p>
              <StarRating rating={product.rating} />
              <button>Add to Cart</button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Products;
