import React from 'react';
import { useApp } from '../../shared/context/AppContext';
import { ArrowLeft, Star, Shirt, Sparkles, Check, ShoppingCart } from 'lucide-react';

const clothingColors = [
  { name: 'Indigo', hex: '#4f46e5' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Ruby', hex: '#991b1b' },
  { name: 'Amber', hex: '#d97706' },
  { name: 'Charcoal', hex: '#1e293b' }
];

const DetailView = () => {
  const { 
    selectedProduct, 
    setView, 
    selectedSize, 
    setSelectedSize, 
    selectedColor, 
    setSelectedColor,
    handleAddToCart,
    getCategoryUz,
    t 
  } = useApp();

  if (!selectedProduct) {
    setView('catalog');
    return null;
  }

  const isClothing = selectedProduct.category.includes('clothing');

  const handleProductImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  return (
    <div className="page-view">
      {/* Back button */}
      <div className="back-link" onClick={() => setView('catalog')}>
        <ArrowLeft style={{ width: '1.2rem', height: '1.2rem' }} />
        <span>{t('backToCatalog')}</span>
      </div>

      <div className="detail-container">
        {/* Product Image */}
        <div className="detail-image-box">
          {selectedProduct.image && selectedProduct.image !== 'placeholder' ? (
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.title} 
              className="detail-image"
              onError={handleProductImageError}
              loading="lazy"
            />
          ) : null}
          <div className="fallback-image-wrapper" style={{ display: (!selectedProduct.image || selectedProduct.image === 'placeholder') ? 'flex' : 'none' }}>
            {isClothing ? <Shirt className="fallback-icon" /> : <Sparkles className="fallback-icon" />}
            <span>{getCategoryUz(selectedProduct.category)}</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="detail-info">
          <span className="detail-category">{getCategoryUz(selectedProduct.category)}</span>
          <h1 className="detail-title">{selectedProduct.title}</h1>
          
          {/* Rating */}
          <div className="detail-rating-row">
            <div className="detail-rating-box">
              <Star style={{ fill: 'var(--color-accent)', stroke: 'var(--color-accent)', width: '1.1rem', height: '1.1rem' }} />
              <span>{selectedProduct.rating?.rate || '4.5'}</span>
            </div>
            <span className="detail-rating-count-text">
              {selectedProduct.rating?.count || '10'} {t('reviewsCount')}
            </span>
          </div>

          <div className="detail-price">${selectedProduct.price.toFixed(2)}</div>
          <p className="detail-description">{selectedProduct.description}</p>

          {/* Clothing Specific Options */}
          {isClothing && (
            <>
              {/* Size selector */}
              <div className="detail-options-box">
                <div className="options-title">{t('selectSize')}</div>
                <div className="sizes-grid">
                  {['S', 'M', 'L', 'XL'].map((sz) => (
                    <span 
                      key={sz} 
                      className={`size-badge ${selectedSize === sz ? 'active' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </span>
                  ))}
                </div>
              </div>

              {/* Color selector */}
              <div className="detail-options-box" style={{ borderTop: 'none', paddingTop: '0.5rem' }}>
                <div className="options-title">{t('selectColor')}</div>
                <div className="colors-grid">
                  {clothingColors.map((c) => (
                    <span 
                      key={c.name} 
                      className={`color-badge ${selectedColor === c.name ? 'active' : ''}`} 
                      style={{ backgroundColor: c.hex }} 
                      title={c.name}
                      onClick={() => setSelectedColor(c.name)}
                    >
                      {selectedColor === c.name && <Check style={{ width: '0.9rem', height: '0.9rem' }} />}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Add to Cart Action */}
          <div style={{ marginTop: '2rem' }}>
            <button className="btn btn-primary btn-lg" onClick={handleAddToCart} style={{ minWidth: '240px' }}>
              <ShoppingCart />
              {t('addToCart')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
