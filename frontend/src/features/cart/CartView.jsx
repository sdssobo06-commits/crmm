import React, { useState, useEffect } from 'react';
import { useApp } from '../../shared/context/AppContext';
import { ShoppingCart, Trash2, ShieldAlert, Shirt, Sparkles } from 'lucide-react';

const CartView = () => {
  const { 
    cart, 
    currentUser, 
    updateCartQty, 
    removeCartItem, 
    handleCheckoutSubmit, 
    setView, 
    getCategoryUz,
    t 
  } = useApp();

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  // Prefill phone and address if user is logged in (simulated prefill)
  useEffect(() => {
    if (currentUser) {
      setPhone(currentUser.phone || '');
      setAddress(currentUser.address || '');
    }
  }, [currentUser]);

  const totalCartPrice = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const onSubmitOrder = (e) => {
    e.preventDefault();
    const success = handleCheckoutSubmit(address, phone);
    if (success) {
      setAddress('');
      setPhone('');
    }
  };

  const handleProductImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  return (
    <div className="page-view">
      <h1 className="page-title">{t('cartTitle')}</h1>
      
      <div className="cart-layout">
        {/* Cart Items List */}
        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div className="empty-cart-state glass-card">
              <ShoppingCart className="empty-cart-icon" />
              <h3>{t('cartEmpty')}</h3>
              <p>{t('cartEmptyDesc')}</p>
              <button className="btn btn-primary" onClick={() => setView('catalog')}>
                {t('viewCatalog')}
              </button>
            </div>
          ) : (
            cart.map((item, idx) => {
              const isClothing = item.product.category.includes('clothing');
              return (
                <div key={idx} className="glass-card cart-item">
                  <div className="cart-item-image-box">
                    {item.product.image && item.product.image !== 'placeholder' ? (
                      <img 
                        src={item.product.image} 
                        alt={item.product.title} 
                        className="cart-item-image"
                        onError={handleProductImageError}
                        loading="lazy"
                      />
                    ) : null}
                    <div className="fallback-image-wrapper" style={{ display: (!item.product.image || item.product.image === 'placeholder') ? 'flex' : 'none' }}>
                      {isClothing ? <Shirt className="fallback-icon" /> : <Sparkles className="fallback-icon" />}
                      <span>{getCategoryUz(item.product.category)}</span>
                    </div>
                  </div>

                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.product.title}</h4>
                    <div className="cart-item-meta">
                      {isClothing && (
                        <>
                          <span>{t('selectSize')}: <strong>{item.size}</strong></span>
                          <span>{t('selectColor')}: <strong>{item.color}</strong></span>
                        </>
                      )}
                      <span>{t('tableCat')}: <strong>{getCategoryUz(item.product.category)}</strong></span>
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    <div className="cart-item-qty">
                      <button className="qty-btn" onClick={() => updateCartQty(idx, -1)}>−</button>
                      <span className="qty-count">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateCartQty(idx, 1)}>+</button>
                    </div>
                    <div className="cart-item-price">${(item.product.price * item.qty).toFixed(2)}</div>
                    <button className="btn btn-danger btn-sm" onClick={() => removeCartItem(idx)} style={{ padding: '0.4rem', lineHeight: 0 }}>
                      <Trash2 style={{ width: '1.1rem', height: '1.1rem' }} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Order Summary Form */}
        {cart.length > 0 && (
          <div className="cart-summary-container">
            <form onSubmit={onSubmitOrder} className="glass-card summary-card">
              <h2>{t('orderSummary')}</h2>
              
              <div className="summary-row">
                <span>{t('productsCount')}:</span>
                <span className="bold-text">{totalCartCount} ta</span>
              </div>
              <div className="summary-row">
                <span>{t('delivery')}:</span>
                <span className="text-free font-semibold">{t('free')}</span>
              </div>
              
              <hr className="divider" />
              
              <div className="summary-row total-row">
                <span>{t('totalAmount')}:</span>
                <span className="gradient-text-amber">${totalCartPrice.toFixed(2)}</span>
              </div>

              {/* Checkout Form */}
              <div className="checkout-form-section">
                <h3>{t('deliveryInfo')}</h3>
                <div className="form-group">
                  <label>{t('addressLabel')}</label>
                  <input 
                    type="text" 
                    placeholder={t('addressPlaceholder')} 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t('phoneLabel')}</label>
                  <input 
                    type="tel" 
                    placeholder={t('phonePlaceholder')} 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-block btn-lg"
              >
                {t('completePurchaseBtn')}
              </button>

              {!currentUser && (
                <p className="guest-warning">
                  <ShieldAlert />
                  {t('guestCheckoutWarning')}
                </p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartView;
