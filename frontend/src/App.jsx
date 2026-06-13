import React from 'react';
import { AppProvider, useApp } from './shared/context/AppContext';
import Header from './shared/components/Header';
import Footer from './shared/components/Footer';
import Toast from './shared/components/Toast';
import HomeView from './features/home/HomeView';
import CatalogView from './features/catalog/CatalogView';
import DetailView from './features/catalog/DetailView';
import CartView from './features/cart/CartView';
import AuthView from './features/auth/AuthView';
import OrdersView from './features/orders/OrdersView';
import AdminView from './features/admin/AdminView';

function AppContent() {
  const { activeView } = useApp();

  return (
    <>
      {/* Ambient background blobs for premium depth effect */}
      <div className="ambient-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Dynamic Toast Alerts Overlay */}
      <Toast />

      {/* Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="main-content">
        {activeView === 'home' && <HomeView />}
        {activeView === 'catalog' && <CatalogView />}
        {activeView === 'detail' && <DetailView />}
        {activeView === 'cart' && <CartView />}
        {activeView === 'login' && <AuthView mode="login" />}
        {activeView === 'register' && <AuthView mode="register" />}
        {activeView === 'orders' && <OrdersView />}
        {activeView === 'admin' && <AdminView />}
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
