import React, { useState } from 'react';
import { useApp } from '../../shared/context/AppContext';
import AdminChart from './AdminChart';
import { Plus, Search, Shirt, DollarSign, Tags, Edit3, Trash2, X, Sparkles } from 'lucide-react';

const AdminView = () => {
  const { 
    products, 
    handleAddProduct, 
    handleUpdateProduct, 
    handleDeleteProduct,
    getCategoryUz,
    t 
  } = useApp();

  // Search filter
  const [adminSearch, setAdminSearch] = useState('');

  // Modal form states
  const [showModal, setShowModal] = useState(false);
  const [modalProductId, setModalProductId] = useState(null); // null = Create, number = Edit
  const [modalTitle, setModalTitle] = useState('');
  const [modalPrice, setModalPrice] = useState('');
  const [modalCategory, setModalCategory] = useState("men's clothing");
  const [modalImage, setModalImage] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalImagePreview, setModalImagePreview] = useState('');
  const [showImagePreview, setShowImagePreview] = useState(false);

  // Math Statistics
  const totalInventoryValue = products.reduce((sum, p) => sum + p.price, 0);
  const activeCategoriesCount = [...new Set(products.map(p => p.category))].length;

  const getAdminProducts = () => {
    if (!adminSearch.trim()) return products;
    const q = adminSearch.toLowerCase();
    return products.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q)
    );
  };

  const openAddModal = () => {
    setModalProductId(null);
    setModalTitle('');
    setModalPrice('');
    setModalCategory("men's clothing");
    setModalImage('');
    setModalDescription('');
    setShowImagePreview(false);
    setShowModal(true);
  };

  const openEditModal = (prod) => {
    setModalProductId(prod.id);
    setModalTitle(prod.title);
    setModalPrice(prod.price);
    setModalCategory(prod.category);
    setModalImage(prod.image);
    setModalDescription(prod.description);
    setModalImagePreview(prod.image);
    setShowImagePreview(true);
    setShowModal(true);
  };

  const verifyModalImage = () => {
    if (modalImage.trim()) {
      setModalImagePreview(modalImage.trim());
      setShowImagePreview(true);
    }
  };

  const handleModalFormSubmit = async (e) => {
    e.preventDefault();
    const priceFloat = parseFloat(modalPrice);
    if (!modalTitle.trim() || isNaN(priceFloat) || !modalImage.trim() || !modalDescription.trim()) {
      alert(t('alertFillFields'));
      return;
    }

    const payload = {
      title: modalTitle.trim(),
      price: priceFloat,
      category: modalCategory,
      image: modalImage.trim(),
      description: modalDescription.trim()
    };

    let success = false;
    if (modalProductId) {
      success = await handleUpdateProduct(modalProductId, payload);
    } else {
      success = await handleAddProduct(payload);
    }

    if (success) {
      setShowModal(false);
    }
  };

  const handleProductImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  return (
    <div className="page-view">
      {/* Header and Add button */}
      <div className="admin-header-row">
        <div className="section-header align-left" style={{ marginBottom: 0 }}>
          <h1 className="page-title">{t('adminDashboard')}</h1>
          <p className="section-subtitle">{t('adminDashboardDesc')}</p>
        </div>
        <button className="btn btn-primary" onClick={openAddModal}>
          <Plus />
          {t('addNewProduct')}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper color-indigo">
            <Shirt />
          </div>
          <div className="stat-details">
            <span className="stat-title">{t('totalClothingCount')}</span>
            <span className="stat-value">{products.length} ta</span>
          </div>
        </div>
        
        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper color-green">
            <DollarSign />
          </div>
          <div className="stat-details">
            <span className="stat-title">{t('inventoryValue')}</span>
            <span className="stat-value">${totalInventoryValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper color-amber">
            <Tags />
          </div>
          <div className="stat-details">
            <span className="stat-title">{t('categoriesCount')}</span>
            <span className="stat-value">{activeCategoriesCount} ta</span>
          </div>
        </div>
      </div>

      {/* Interaktiv SVG Grafigi */}
      <AdminChart />

      {/* Inventory Management Table */}
      <div className="glass-card table-card">
        <div className="table-header">
          <h2>{t('inventoryTable')}</h2>
          <div className="table-search">
            <Search style={{ width: '1.05rem', height: '1.05rem', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder={t('searchTablePlaceholder')} 
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>{t('tablePic')}</th>
                <th>{t('tableName')}</th>
                <th>{t('tableCat')}</th>
                <th>{t('tablePrice')}</th>
                <th style={{ width: '200px', textAlign: 'center' }}>{t('tableActions')}</th>
              </tr>
            </thead>
            <tbody>
              {getAdminProducts().map((prod) => {
                const isClothing = prod.category.includes('clothing');
                return (
                  <tr key={prod.id}>
                    <td>
                      <div className="table-prod-img">
                        {prod.image && prod.image !== 'placeholder' ? (
                          <img 
                            src={prod.image} 
                            alt={prod.title} 
                            onError={handleProductImageError}
                            loading="lazy"
                          />
                        ) : null}
                        <div className="fallback-image-wrapper" style={{ display: (!prod.image || prod.image === 'placeholder') ? 'flex' : 'none' }}>
                          {isClothing ? <Shirt className="fallback-icon" /> : <Sparkles className="fallback-icon" />}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="admin-table-title" title={prod.title}>{prod.title}</div>
                    </td>
                    <td>
                      <span className="admin-table-category">{getCategoryUz(prod.category)}</span>
                    </td>
                    <td style={{ fontWeight: 700 }}>${prod.price.toFixed(2)}</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn-secondary btn-sm" onClick={() => openEditModal(prod)}>
                          <Edit3 style={{ width: '0.9rem', height: '0.9rem' }} /> {t('btnEdit')}
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(prod.id, prod.title)}>
                          <Trash2 style={{ width: '0.9rem', height: '0.9rem' }} /> {t('btnDelete')}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD MODAL */}
      {showModal && (
        <div className="modal-backdrop" onClick={(e) => { if (e.target.className === 'modal-backdrop') setShowModal(false); }}>
          <div className="glass-card modal-content">
            <div className="modal-header">
              <h2>{modalProductId ? t('modalEditTitle') : t('modalAddTitle')}</h2>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>
            
            <form onSubmit={handleModalFormSubmit} className="modal-form">
              <div className="form-group">
                <label>{t('prodNameLabel')}</label>
                <input 
                  type="text" 
                  value={modalTitle} 
                  onChange={(e) => setModalTitle(e.target.value)} 
                  placeholder={t('prodNamePlaceholder')} 
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group col-6">
                  <label>{t('priceLabel')}</label>
                  <input 
                    type="number" 
                    value={modalPrice} 
                    onChange={(e) => setModalPrice(e.target.value)} 
                    placeholder="49.99" 
                    step="0.01" 
                    min="0.01" 
                    required 
                  />
                </div>
                <div className="form-group col-6">
                  <label>{t('tableCat')}</label>
                  <select value={modalCategory} onChange={(e) => setModalCategory(e.target.value)}>
                    <option value="men's clothing">{t('menClothing')}</option>
                    <option value="women's clothing">{t('womenClothing')}</option>
                    <option value="jewelery">{t('jewelery')}</option>
                    <option value="electronics">{t('electronics')}</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>{t('imageLabel')}</label>
                <div className="input-with-action">
                  <input 
                    type="url" 
                    value={modalImage} 
                    onChange={(e) => setModalImage(e.target.value)} 
                    placeholder="https://rasm.com/kiyim.jpg" 
                    required 
                  />
                  <button type="button" className="btn btn-secondary btn-sm" onClick={verifyModalImage}>
                    {t('checkBtn')}
                  </button>
                </div>
                {showImagePreview && (
                  <div className="image-preview-container">
                    <img 
                      src={modalImagePreview} 
                      alt="Preview" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }} 
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>{t('descLabel')}</label>
                <textarea 
                  value={modalDescription} 
                  onChange={(e) => setModalDescription(e.target.value)} 
                  rows="4" 
                  placeholder={t('descPlaceholder')} 
                  required 
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  {t('btnCancel')}
                </button>
                <button type="submit" className="btn btn-primary">
                  {t('btnSave')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
