import React from 'react';
import { useApp } from '../../shared/context/AppContext';
import { Star, Shirt, Sparkles } from 'lucide-react';

const ProductCard = ({ product, onClick }) => {
  const { getCategoryUz, language } = useApp();

  const handleProductImage = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  const isClothing = product.category.includes('clothing');

  return (
    <div className="glass-card product-card" onClick={onClick}>
      <div className="card-image-box">
        <span className="card-category-badge">
          {product.category.toUpperCase()}
        </span>
        
        {product.image && product.image !== 'placeholder' ? (
          <img 
            src={product.image} 
            alt={product.title} 
            className="product-image"
            onError={handleProductImage}
            loading="lazy"
          />
        ) : null}

        <div className="fallback-image-wrapper" style={{ display: (!product.image || product.image === 'placeholder') ? 'flex' : 'none' }}>
          {isClothing ? <Shirt className="fallback-icon" /> : <Sparkles className="fallback-icon" />}
          <span>{getCategoryUz(product.category)}</span>
        </div>
      </div>
      <div className="card-details">
        <h3 className="card-title" title={product.title}>{product.title}</h3>
        <div className="card-meta-row">
          <span className="card-price">${product.price.toFixed(2)}</span>
          <div className="card-rating">
            <Star className="rating-star" style={{ width: '0.9rem', height: '0.9rem', fill: '#f59e0b', stroke: '#f59e0b' }} />
            <span style={{ fontWeight: 600, color: '#475569', fontSize: '0.85rem' }}>{product.rating?.rate || '4.5'}</span>
            <span className="card-rating-count" style={{ color: '#64748b', fontSize: '0.8rem' }}>
              ({product.rating?.count || '10'} {language === 'uz' ? 'sharh' : 'reviews'})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
