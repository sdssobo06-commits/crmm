import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, ShoppingCart, LogIn, LogOut, ShieldCheck, User, Sun, Moon, Home, Grid } from 'lucide-react';

const Header = () => {
  const { 
    language,
    theme,
    toggleTheme,
    activeView, 
    setView, 
    currentUser, 
    cart, 
    handleLogout, 
    t 
  } = useApp();

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="header">
      <div className="header-container">
        {/* Left Side: Logo */}
        <div className="logo-container" onClick={() => setView('home')}>
          <div className="logo-glow-wrapper">
            <ShoppingBag className="logo-icon" />
          </div>
          <span className="logo-text">Distinction</span>
        </div>

        {/* Center: Navigation Dock */}
        <nav className="nav-links">
          <button 
            className={`nav-link ${activeView === 'home' ? 'active' : ''}`}
            onClick={() => setView('home')}
          >
            <Home className="nav-icon" />
            <span className="nav-text">{t('home')}</span>
          </button>
          
          <button 
            className={`nav-link ${activeView === 'catalog' ? 'active' : ''}`}
            onClick={() => setView('catalog')}
          >
            <Grid className="nav-icon" />
            <span className="nav-text">{t('catalog')}</span>
          </button>
        </nav>

        {/* Right Side: User Menu, Theme Switcher & Cart */}
        <div className="header-right">
          {currentUser ? (
            <div className="user-profile-pill">
              {currentUser.role === 'admin' ? (
                <button 
                  className={`nav-link-pill ${activeView === 'admin' ? 'active' : ''}`}
                  onClick={() => setView('admin')}
                >
                  <ShieldCheck className="pill-icon admin" />
                  <span className="pill-text admin-panel-text">{t('adminPanel')}</span>
                </button>
              ) : (
                <button 
                  className={`nav-link-pill ${activeView === 'orders' ? 'active' : ''}`}
                  onClick={() => setView('orders')}
                >
                  <User className="pill-icon user" />
                  <span className="pill-text">{t('myOrders')}</span>
                </button>
              )}
              
              <span className="pill-divider">|</span>
              
              <span className="username-text">
                {currentUser.username}
              </span>
              
              <span className="pill-divider">|</span>
              
              <button 
                onClick={handleLogout}
                className="btn-logout-icon"
                title={t('logout')}
              >
                <LogOut className="logout-icon" />
              </button>
            </div>
          ) : (
            <button 
              className="pill-auth-btn"
              onClick={() => setView('login')}
            >
              <LogIn className="auth-btn-icon" />
              <span className="auth-btn-text">{language === 'uz' ? 'Kirish' : 'Login'}</span>
            </button>
          )}

          {/* Vertical Divider */}
          <div className="vertical-sep"></div>

          {/* Theme Switcher Button */}
          <button 
            onClick={toggleTheme}
            className="theme-switcher-btn"
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="theme-icon sun" />
            ) : (
              <Moon className="theme-icon moon" />
            )}
          </button>

          {/* Cart Icon */}
          <div onClick={() => setView('cart')} className="cart-trigger">
            <ShoppingCart className="nav-cart-icon" />
            {totalCartCount > 0 && (
              <span className="cart-badge animate-pop">
                {totalCartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
