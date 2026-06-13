import React from 'react';
import { useApp } from '../../shared/context/AppContext';
import ProductCard from '../catalog/ProductCard';
import { ArrowRight } from 'lucide-react';

const HomeView = () => {
  const { 
    products, 
    currentUser, 
    setView, 
    setSelectedProduct, 
    t 
  } = useApp();

  // Get first 4 clothing products as featured
  const getFeaturedProducts = () => {
    const clothing = products.filter(p => 
      p.category === "men's clothing" || p.category === "women's clothing"
    );
    return clothing.length > 0 ? clothing.slice(0, 4) : products.slice(0, 4);
  };

  const handleProductClick = (prod) => {
    setSelectedProduct(prod);
    setView('detail');
  };

  return (
    <div className="page-view">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">

          <h1 className="hero-title">{t('heroTitle')}</h1>
          <p className="hero-subtitle">{t('heroSubtitle')}</p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => setView('catalog')}>
              {t('viewCatalog')} <ArrowRight style={{ width: '1rem', height: '1rem' }} />
            </button>
            {!currentUser && (
              <button className="btn btn-secondary btn-lg" onClick={() => setView('register')}>
                {t('register')}
              </button>
            )}
          </div>
        </div>

        {/* Futuristic Card Stack (Unusual Design) */}
        <div className="hero-visual-container">
          <div className="card-stack">
            <div className="stack-card card-back-2">
              <div className="card-badge-neon">NEW</div>
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400" alt="Fashion 3" />
            </div>
            <div className="stack-card card-back-1">
              <div className="card-badge-neon bg-violet">HOT</div>
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400" alt="Fashion 2" />
            </div>
            <div className="stack-card card-front">
              <div className="card-badge-neon bg-amber">TREND</div>
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400" alt="Fashion 1" />
              <div className="glass-card hero-overlay-card" style={{ width: 'calc(100% - 2rem)', left: '1rem', bottom: '1rem' }}>
                <div className="overlay-row">
                  <span className="pulse-dot"></span>
                  <span>{t('collection2026')}</span>
                </div>
                <h3>{t('premiumQuality')}</h3>
                <p>{t('premiumQualityDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="featured-section">
        <div className="section-header">
          <h2 className="section-title">{t('featuredProducts')}</h2>
          <p className="section-subtitle">{t('featuredProductsDesc')}</p>
        </div>

        <div className="products-grid">
          {products.length === 0 ? (
            <div className="loading-spinner"></div>
          ) : (
            getFeaturedProducts().map((prod) => (
              <ProductCard 
                key={prod.id} 
                product={prod} 
                onClick={() => handleProductClick(prod)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
