import React, { useState } from 'react';
import { useApp } from '../../shared/context/AppContext';
import ProductCard from './ProductCard';
import { Search, Filter, ArrowUpDown, Sparkles } from 'lucide-react';

const CatalogView = () => {
  const { products, setView, setSelectedProduct, language, t } = useApp();
  
  // Local state for search, filter & sort
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');

  const handleProductClick = (prod) => {
    setSelectedProduct(prod);
    setView('detail');
  };

  const getFilteredProducts = () => {
    let filtered = [...products];

    // Filter by Category
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortOption === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating-desc') {
      filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    return filtered;
  };

  const filteredList = getFilteredProducts();

  // All categories list for horizontal pills
  const categories = [
    { key: '', label: language === 'uz' ? 'Hammasi' : 'All' },
    { key: "men's clothing", label: "men's clothing" },
    { key: 'jewelery', label: 'jewelery' },
    { key: 'electronics', label: 'electronics' },
    { key: "women's clothing", label: "women's clothing" }
  ];

  return (
    <div className="page-view">
      {/* Centered Top Header */}
      <div className="catalog-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '2.5rem' }}>
        
        {/* Top small badge */}
        <div className="season-badge" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid rgba(99, 102, 241, 0.15)',
          color: '#6366f1',
          fontSize: '0.75rem',
          fontWeight: 700,
          padding: '0.35rem 1rem',
          borderRadius: '30px',
          marginBottom: '1.25rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          <Sparkles style={{ width: '0.85rem', height: '0.85rem', color: '#6366f1' }} />
          <span>{language === 'uz' ? 'Yangi Mavsum Kiyimlari' : 'New Season Apparel'}</span>
        </div>

        {/* Main Title */}
        <h1 className="page-title" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          {language === 'uz' ? 'Bizning Kiyimlar Katalogi' : 'Our Clothing Catalog'}
        </h1>
        
        {/* Subtitle */}
        <p className="section-subtitle" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto' }}>
          {language === 'uz' ? 'Zamonaviy, sifatli va qulay kiyimlarni eng hamyonbop narxlarda xarid qiling' : 'Purchase modern, quality and comfortable clothing at the most affordable prices'}
        </p>
      </div>

      {/* Search and Filters Row */}
      <div className="search-filter-bar" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {/* Search input */}
        <div className="search-input-wrapper" style={{ margin: 0, flex: 1, minWidth: '280px' }}>
          <Search className="search-icon" />
          <input 
            type="text" 
            placeholder={language === 'uz' ? 'Kiyim nomini qidiring...' : 'Search clothing name...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Select Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Filter style={{ width: '1.2rem', height: '1.2rem', color: 'var(--text-muted)', flexShrink: 0 }} />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ 
              background: 'var(--bg-secondary)', 
              border: '1px solid var(--glass-border)', 
              borderRadius: '10px', 
              height: '44px', 
              padding: '0 2.5rem 0 1rem', 
              fontSize: '0.88rem', 
              color: 'var(--text-primary)', 
              outline: 'none', 
              cursor: 'pointer',
              minWidth: '160px',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1rem'
            }}
          >
            <option value="">{language === 'uz' ? 'Barcha kiyimlar' : 'All items'}</option>
            <option value="men's clothing">{t('menClothing')}</option>
            <option value="women's clothing">{t('womenClothing')}</option>
            <option value="jewelery">{t('jewelery')}</option>
            <option value="electronics">{t('electronics')}</option>
          </select>
        </div>

        {/* Sort Select Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ArrowUpDown style={{ width: '1.2rem', height: '1.2rem', color: 'var(--text-muted)', flexShrink: 0 }} />
          <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
            style={{ 
              background: 'var(--bg-secondary)', 
              border: '1px solid var(--glass-border)', 
              borderRadius: '10px', 
              height: '44px', 
              padding: '0 2.5rem 0 1rem', 
              fontSize: '0.88rem', 
              color: 'var(--text-primary)', 
              outline: 'none', 
              cursor: 'pointer',
              minWidth: '180px',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1rem'
            }}
          >
            <option value="">{language === 'uz' ? 'Saralash: Standart' : 'Sort: Default'}</option>
            <option value="price-asc">{language === 'uz' ? 'Saralash: Narxi o\'sib borish' : 'Sort: Price Low-High'}</option>
            <option value="price-desc">{language === 'uz' ? 'Saralash: Narxi kamayib borish' : 'Sort: Price High-Low'}</option>
            <option value="rating-desc">{language === 'uz' ? 'Saralash: Reytingi yuqorilar' : 'Sort: Top Rated'}</option>
          </select>
        </div>
      </div>

      {/* Horizontal Category Pills */}
      <div className="category-pills-row" style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '1.5rem', marginBottom: '2.5rem', scrollbarWidth: 'none' }}>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            style={{
              background: selectedCategory === cat.key ? 'var(--color-primary)' : 'var(--bg-secondary)',
              border: selectedCategory === cat.key ? '1px solid var(--color-primary)' : '1px solid var(--glass-border)',
              color: selectedCategory === cat.key ? '#fff' : 'var(--text-secondary)',
              padding: '0.45rem 1.25rem',
              borderRadius: '30px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'var(--transition-smooth)'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredList.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
            <p>{t('noProductFound')}</p>
          </div>
        ) : (
          filteredList.map((prod) => (
            <ProductCard 
              key={prod.id} 
              product={prod} 
              onClick={() => handleProductClick(prod)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CatalogView;
