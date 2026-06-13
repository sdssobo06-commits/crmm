import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

const API_BASE = '/api';

// Translations Dictionary
const translations = {
  uz: {
    // Header & General
    home: "Bosh sahifa",
    catalog: "Katalog",
    cart: "Savat",
    adminPanel: "Admin Panel",
    myOrders: "Buyurtmalarim",
    login: "Kirish",
    register: "Ro'yxatdan o'tish",
    logout: "Chiqish",
    guestModeActive: "Mehmon rejimi faol!",
    guestModeDesc: "Ilova yoqdimi? Qo'shimcha chegirmalarga ega bo'lish uchun ro'yxatdan o'ting.",
    
    // Hero
    heroTitle: "Eng Zamonaviy Kiyimlar To'plami",
    heroSubtitle: "Eng so'nggi dizayndagi, yuqori sifatli va qulay kiyim-kechaklarni faqat Ms Saodat premium brendidan topasiz.",
    viewCatalog: "Katalogni ko'rish",
    collection2026: "Yangi To'plam 2026",
    premiumQuality: "Premium Sifat Kafolati",
    premiumQualityDesc: "100% original kiyim-kechaklar va aksessuarlar",
    
    // Products
    featuredProducts: "Saralangan Mahsulotlar",
    featuredProductsDesc: "Xaridorlarimiz tomonidan eng yuqori baholangan kiyimlar",
    menClothing: "Erkaklar kiyimi",
    womenClothing: "Ayollar kiyimi",
    jewelery: "Taqinchoqlar",
    electronics: "Elektronika",
    
    // Catalog
    catalogTitle: "Mahsulotlar Katalogi",
    catalogSubtitle: "Barcha kiyimlar va aksessuarlarni qidirish, filterlash hamda tartiblash",
    searchPlaceholder: "Mahsulot nomini qidirish...",
    allCategories: "Barcha kategoriyalar",
    sortByDefault: "Saralash (Standart)",
    sortByPriceAsc: "Narxi: O'sib borish",
    sortByPriceDesc: "Narxi: Kamayib borish",
    sortByRatingDesc: "Reytingi: Yuqorilar",
    noProductFound: "Qidiruv bo'yicha mahsulot topilmadi.",
    
    // Detail
    backToCatalog: "Katalogga qaytish",
    selectSize: "O'lcham tanlang (Size)",
    selectColor: "Rang tanlang (Color)",
    addToCart: "Savatga qo'shish",
    reviewsCount: "ta fikrlar",
    
    // Cart
    cartTitle: "Sizning Savatingiz",
    cartEmpty: "Savat bo'sh",
    cartEmptyDesc: "Siz tanlagan mahsulotlar savatda aks etadi.",
    orderSummary: "Buyurtma Hisobi",
    productsCount: "Mahsulotlar soni",
    delivery: "Yetkazib berish",
    free: "Tekin",
    totalAmount: "Umumiy summasi",
    deliveryInfo: "Yetkazib berish ma'lumotlari",
    addressLabel: "Manzilingiz",
    addressPlaceholder: "Toshkent sh., Chilonzor...",
    phoneLabel: "Telefon raqamingiz",
    phonePlaceholder: "+998 90 123 45 67",
    completePurchaseBtn: "Xaridni yakunlash",
    guestCheckoutWarning: "Xaridni yakunlash uchun tizimga kiring! Mehmon bo'lib xarid qilib bo'lmaydi.",
    
    // Auth
    authTitle: "Yangi trendlar olamiga kiring",
    authDesc: "Sizga mos kiyimlar va eng yaxshi takliflar faqat bizda.",
    welcomeBack: "Xush kelibsiz",
    welcomeDesc: "Tizimga kirish uchun ma'lumotlarni kiriting",
    usernameLabel: "Foydalanuvchi nomi",
    passwordLabel: "Parol",
    noAccount: "Hisobingiz yo'qmi?",
    haveAccount: "Hisobingiz bormi?",
    createAccount: "Hisob yaratish",
    joinUs: "Bizga qo'shiling!",
    joinUsDesc: "O'z rolingizni tanlang va individual imkoniyatlarni qo'lga kiriting.",
    selectRole: "Rolingizni tanlang",
    roleUser: "Foydalanuvchi (User)",
    roleUserDesc: "Kiyimlarni sotib olish va savat yaratish uchun",
    roleAdmin: "Tizim Administratori (Admin)",
    roleAdminDesc: "Mahsulotlar omborini to'liq boshqarish uchun",
    demoAccs: "Demo hisoblar",
    
    // Admin
    adminDashboard: "Admin Dashboard",
    adminDashboardDesc: "Ombor mahsulotlari statistikasi va CRUD amallari",
    addNewProduct: "Yangi mahsulot qo'shish",
    totalClothingCount: "Jami kiyimlar soni",
    inventoryValue: "Ombor Qiymati",
    categoriesCount: "Kategoriyalar soni",
    inventoryTable: "Mahsulotlar ombori jadvali",
    searchTablePlaceholder: "Qidirish...",
    tablePic: "Rasm",
    tableName: "Mahsulot nomi",
    tableCat: "Kategoriya",
    tablePrice: "Narxi",
    tableActions: "Amallar",
    btnEdit: "Tahrirlash",
    btnDelete: "O'chirish",
    
    // Modal CRUD
    modalEditTitle: "Mahsulotni Tahrirlash",
    modalAddTitle: "Yangi Mahsulot Qo'shish",
    prodNameLabel: "Mahsulot nomi",
    prodNamePlaceholder: "Masalan: Erkaklar Premium jun sviteri",
    priceLabel: "Narxi ($)",
    imageLabel: "Rasm URL manzili",
    checkBtn: "Tekshirish",
    descLabel: "Mahsulot tavsifi",
    descPlaceholder: "Kiyim haqida batafsil...",
    btnCancel: "Bekor qilish",
    btnSave: "Saqlash",
    
    // Orders Tracking
    orderTrackingTitle: "Buyurtmalarni Kuzatish",
    orderTrackingSubtitle: "Buyurtmalaringiz ro'yxati va ularning yetkazib berish holati",
    orderId: "Buyurtma ID",
    orderStatus: "Holati",
    orderAddress: "Manzil",
    orderPhone: "Telefon",
    orderDate: "Sana",
    orderTotal: "Jami",
    statusPending: "Tayyorlanmoqda",
    statusShipped: "Kuryerda (Yo'lda)",
    statusDelivered: "Yetkazildi",
    noOrders: "Buyurtmalar topilmadi.",
    orderStatusProgress: "Yetkazib berish jarayoni",
    
    // Toasts & Alerts
    toastSuccess: "Muvaffaqiyatli",
    toastError: "Xatolik",
    toastInfo: "Xabar",
    toastWarning: "Taqiqlangan",
    alertRegisterSuccess: "Ro'yxatdan o'tdingiz! Endi tizimga kiring.",
    alertLoginSuccess: "Tizimga kirdingiz",
    alertLogoutSuccess: "Tizimdan muvaffaqiyatli chiqdingiz.",
    alertAddedToCart: "Savatga qo'shildi!",
    alertRemovedFromCart: "Savatdan olib tashlandi.",
    alertCheckoutSuccess: "Buyurtmangiz qabul qilindi! Kuryer tez orada bog'lanadi.",
    alertAdminOnly: "Admin panelga kirish huquqingiz yo'q!",
    alertFillFields: "Maydonlarni to'g'ri to'ldiring!",
    alertPasswordLength: "Parol kamida 4 ta belgi bo'lishi kerak!"
  },
  en: {
    // Header & General
    home: "Home",
    catalog: "Catalog",
    cart: "Cart",
    adminPanel: "Admin Panel",
    myOrders: "My Orders",
    login: "Login",
    register: "Register",
    logout: "Logout",
    guestModeActive: "Guest Mode Active!",
    guestModeDesc: "Like our app? Register now to unlock exclusive discounts and orders.",
    
    // Hero
    heroTitle: "The Ultimate Clothing Collection",
    heroSubtitle: "Discover the latest trends, premium quality, and absolute comfort only at Ms Saodat.",
    viewCatalog: "Browse Catalog",
    collection2026: "New Collection 2026",
    premiumQuality: "Premium Quality Guarantee",
    premiumQualityDesc: "100% original apparel and accessories",
    
    // Products
    featuredProducts: "Featured Products",
    featuredProductsDesc: "Highly-rated clothing handpicked by our team",
    menClothing: "Men's Clothing",
    womenClothing: "Women's Clothing",
    jewelery: "Jewelry",
    electronics: "Electronics",
    
    // Catalog
    catalogTitle: "Products Catalog",
    catalogSubtitle: "Search, filter, and sort our complete collection",
    searchPlaceholder: "Search products...",
    allCategories: "All Categories",
    sortByDefault: "Sort (Default)",
    sortByPriceAsc: "Price: Low to High",
    sortByPriceDesc: "Price: High to Low",
    sortByRatingDesc: "Rating: High to Low",
    noProductFound: "No products found matching your search.",
    
    // Detail
    backToCatalog: "Back to Catalog",
    selectSize: "Select Size",
    selectColor: "Select Color",
    addToCart: "Add to Cart",
    reviewsCount: "reviews",
    
    // Cart
    cartTitle: "Your Shopping Cart",
    cartEmpty: "Cart is empty",
    cartEmptyDesc: "Items you select will appear here.",
    orderSummary: "Order Summary",
    productsCount: "Total items",
    delivery: "Delivery",
    free: "Free",
    totalAmount: "Total price",
    deliveryInfo: "Shipping Details",
    addressLabel: "Delivery Address",
    addressPlaceholder: "123 Main St, New York...",
    phoneLabel: "Phone Number",
    phonePlaceholder: "+1 555 123 4567",
    completePurchaseBtn: "Complete Purchase",
    guestCheckoutWarning: "Please login to complete your purchase! Guests cannot checkout.",
    
    // Auth
    authTitle: "Enter the world of modern style",
    authDesc: "Discover custom styles and matching outfits just for you.",
    welcomeBack: "Welcome Back",
    welcomeDesc: "Enter your credentials to access your account",
    usernameLabel: "Username",
    passwordLabel: "Password",
    noAccount: "No account?",
    haveAccount: "Have an account?",
    createAccount: "Create Account",
    joinUs: "Join Us!",
    joinUsDesc: "Choose your role and unlock custom dashboard features.",
    selectRole: "Choose your role",
    roleUser: "User",
    roleUserDesc: "Browse, select clothing and checkout items",
    roleAdmin: "System Administrator (Admin)",
    roleAdminDesc: "Manage, create, update and delete products",
    demoAccs: "Demo credentials",
    
    // Admin
    adminDashboard: "Admin Dashboard",
    adminDashboardDesc: "Inventory statistics and CRUD operations manager",
    addNewProduct: "Add New Product",
    totalClothingCount: "Total products",
    inventoryValue: "Inventory Value",
    categoriesCount: "Categories count",
    inventoryTable: "Inventory Management Table",
    searchTablePlaceholder: "Search table...",
    tablePic: "Image",
    tableName: "Product Name",
    tableCat: "Category",
    tablePrice: "Price",
    tableActions: "Actions",
    btnEdit: "Edit",
    btnDelete: "Delete",
    
    // Modal CRUD
    modalEditTitle: "Edit Product",
    modalAddTitle: "Add New Product",
    prodNameLabel: "Product Title",
    prodNamePlaceholder: "e.g., Men's Premium Wool Sweater",
    priceLabel: "Price ($)",
    imageLabel: "Image URL",
    checkBtn: "Check",
    descLabel: "Description",
    descPlaceholder: "Detailed information about the clothing...",
    btnCancel: "Cancel",
    btnSave: "Save",
    
    // Orders Tracking
    orderTrackingTitle: "Order Tracking",
    orderTrackingSubtitle: "View and track your simulated orders status",
    orderId: "Order ID",
    orderStatus: "Status",
    orderAddress: "Address",
    orderPhone: "Phone",
    orderDate: "Date",
    orderTotal: "Total",
    statusPending: "Processing",
    statusShipped: "Shipped (In Transit)",
    statusDelivered: "Delivered",
    noOrders: "No orders found.",
    orderStatusProgress: "Delivery Progress",
    
    // Toasts & Alerts
    toastSuccess: "Success",
    toastError: "Error",
    toastInfo: "Info",
    toastWarning: "Restricted",
    alertRegisterSuccess: "Registration successful! Please login.",
    alertLoginSuccess: "Welcome back",
    alertLogoutSuccess: "Successfully logged out.",
    alertAddedToCart: "Added to cart!",
    alertRemovedFromCart: "Removed from cart.",
    alertCheckoutSuccess: "Purchase completed! A delivery courier will contact you soon.",
    alertAdminOnly: "Access denied! Administrators only.",
    alertFillFields: "Please fill out all fields correctly!",
    alertPasswordLength: "Password must be at least 4 characters long!"
  }
};

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('luxethreads_lang') || 'uz');
  const [theme, setTheme] = useState(() => localStorage.getItem('ms_saodat_theme') || 'light');
  const [activeView, setActiveView] = useState('home');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('luxethreads_cart')) || []);
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('luxethreads_user')) || null);
  
  // Selection states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Charcoal');

  // Simulated orders state
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('luxethreads_orders')) || [
    {
      id: "LT-9142",
      date: "2026-06-03 14:23",
      address: "Toshkent sh., Yunusobod 4-daha",
      phone: "+998 90 999 88 77",
      total: 129.98,
      status: "delivered", // pending, shipped, delivered
      items: [
        { title: "Men's Casual Slim Fit", qty: 2, size: "L", color: "Indigo", price: 64.99 }
      ]
    }
  ]);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Persists
  useEffect(() => {
    localStorage.setItem('luxethreads_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('luxethreads_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('luxethreads_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('luxethreads_lang', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    localStorage.setItem('ms_saodat_theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  // Helper translations key
  const t = (key) => {
    return translations[language][key] || key;
  };

  const getCategoryUz = (cat) => {
    if (language === 'uz') {
      switch (cat) {
        case "men's clothing": return "Erkaklar kiyimi";
        case "women's clothing": return "Ayollar kiyimi";
        case "jewelery": return "Taqinchoqlar";
        case "electronics": return "Elektronika";
        default: return cat;
      }
    }
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  // Toast System
  const showToast = (title, message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // API Call: Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE}/products`);
      if (!response.ok) throw new Error('Failed to load products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      showToast(t('toastError'), error.message, 'error');
    }
  };

  // API Call: Add product (Admin)
  const handleAddProduct = async (productData) => {
    try {
      const response = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      if (!response.ok) throw new Error('Could not add product');
      const newProd = await response.json();
      showToast(t('toastSuccess'), `"${newProd.title}" added to inventory!`, 'success');
      fetchProducts();
      return true;
    } catch (error) {
      showToast(t('toastError'), error.message, 'error');
      return false;
    }
  };

  // API Call: Update product (Admin)
  const handleUpdateProduct = async (id, productData) => {
    try {
      const response = await fetch(`${API_BASE}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      if (!response.ok) throw new Error('Could not update product');
      const updated = await response.json();
      showToast(t('toastSuccess'), `"${updated.title}" updated successfully!`, 'success');
      fetchProducts();
      return true;
    } catch (error) {
      showToast(t('toastError'), error.message, 'error');
      return false;
    }
  };

  // API Call: Delete product (Admin)
  const handleDeleteProduct = async (id, title) => {
    const confirmMsg = language === 'uz' 
      ? `Haqiqatan ham "${title}" mahsulotini o'chirmoqchimisiz?` 
      : `Are you sure you want to delete "${title}"?`;
    if (!confirm(confirmMsg)) return;

    try {
      const response = await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Could not delete product');
      showToast(t('toastSuccess'), 'Product deleted!', 'success');
      fetchProducts();
    } catch (error) {
      showToast(t('toastError'), error.message, 'error');
    }
  };

  // View management
  const setView = (viewName) => {
    if (viewName === 'admin' && (!currentUser || currentUser.role !== 'admin')) {
      showToast(t('toastWarning'), t('alertAdminOnly'), 'error');
      setActiveView('home');
      return;
    }
    setActiveView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = () => {
    if (!selectedProduct) return;
    const isClothing = selectedProduct.category.includes('clothing');
    const size = isClothing ? selectedSize : 'N/A';
    const color = isClothing ? selectedColor : 'N/A';

    const existingIndex = cart.findIndex(i => 
      i.product.id === selectedProduct.id && i.size === size && i.color === color
    );

    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].qty += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { product: selectedProduct, qty: 1, size, color }]);
    }
    showToast(t('toastSuccess'), `${selectedProduct.title} ${t('alertAddedToCart')}`, 'success');
  };

  const updateCartQty = (index, change) => {
    const newCart = [...cart];
    newCart[index].qty += change;
    if (newCart[index].qty <= 0) {
      newCart.splice(index, 1);
      showToast(t('toastInfo'), t('alertRemovedFromCart'), 'info');
    }
    setCart(newCart);
  };

  const removeCartItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    showToast(t('toastInfo'), t('alertRemovedFromCart'), 'info');
  };

  const handleCheckoutSubmit = (address, phone) => {
    if (!currentUser) {
      showToast(t('toastError'), t('guestCheckoutWarning'), 'error');
      setView('register');
      return false;
    }
    if (!address.trim() || !phone.trim()) {
      showToast(t('toastWarning'), t('alertFillFields'), 'error');
      return false;
    }

    // Calculate total price
    const totalCartPrice = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);

    // Create a new simulated order
    const dateNow = new Date();
    const formattedDate = `${dateNow.getFullYear()}-${String(dateNow.getMonth() + 1).padStart(2, '0')}-${String(dateNow.getDate()).padStart(2, '0')} ${String(dateNow.getHours()).padStart(2, '0')}:${String(dateNow.getMinutes()).padStart(2, '0')}`;
    const newOrder = {
      id: `LT-${Math.floor(1000 + Math.random() * 9000)}`,
      date: formattedDate,
      address: address.trim(),
      phone: phone.trim(),
      total: totalCartPrice,
      status: "pending", // pending -> shipped -> delivered simulation
      items: cart.map(i => ({ title: i.product.title, qty: i.qty, size: i.size, color: i.color, price: i.product.price }))
    };

    // Add to orders list
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    showToast(t('toastSuccess'), t('alertCheckoutSuccess'), 'success');
    
    // Periodically update simulated status (e.g. after 30 seconds -> shipped, after 60 seconds -> delivered)
    // For demo purposes, we will trigger simulated changes
    setTimeout(() => {
      setOrders(prevOrders => 
        prevOrders.map(o => o.id === newOrder.id ? { ...o, status: 'shipped' } : o)
      );
    }, 15000);

    setTimeout(() => {
      setOrders(prevOrders => 
        prevOrders.map(o => o.id === newOrder.id ? { ...o, status: 'delivered' } : o)
      );
    }, 45000);

    setView('orders');
    return true;
  };

  // Auth Operations
  const handleRegisterSubmit = async (username, password, role) => {
    if (password.length < 4) {
      showToast(t('toastError'), t('alertPasswordLength'), 'error');
      return false;
    }
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Error occurred');
      
      showToast(t('toastSuccess'), t('alertRegisterSuccess'), 'success');
      setView('login');
      return true;
    } catch (error) {
      showToast(t('toastError'), error.message, 'error');
      return false;
    }
  };

  const handleLoginSubmit = async (username, password) => {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Error occurred');
      
      setCurrentUser(result.user);
      showToast(t('toastSuccess'), `${t('alertLoginSuccess')}, ${result.user.username}!`, 'success');
      
      if (result.user.role === 'admin') {
        setView('admin');
      } else {
        setView('home');
      }
      return true;
    } catch (error) {
      showToast(t('toastError'), error.message, 'error');
      return false;
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast(t('toastInfo'), t('alertLogoutSuccess'), 'info');
    setView('home');
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      theme,
      toggleTheme,
      activeView,
      setView,
      products,
      cart,
      currentUser,
      orders,
      toasts,
      removeToast,
      showToast,
      t,
      getCategoryUz,
      
      // Detail View states
      selectedProduct,
      setSelectedProduct,
      selectedSize,
      setSelectedSize,
      selectedColor,
      setSelectedColor,
      
      // Actions
      handleAddToCart,
      updateCartQty,
      removeCartItem,
      handleCheckoutSubmit,
      handleRegisterSubmit,
      handleLoginSubmit,
      handleLogout,
      handleAddProduct,
      handleUpdateProduct,
      handleDeleteProduct
    }}>
      {children}
    </AppContext.Provider>
  );
};
