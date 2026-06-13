import React, { useState } from 'react';
import { useApp } from '../../shared/context/AppContext';
import { Info, Clock, CheckCircle2, Truck, PackageCheck } from 'lucide-react';

const OrdersView = () => {
  const { orders, language, t } = useApp();
  const [selectedOrderId, setSelectedOrderId] = useState(orders.length > 0 ? orders[0].id : null);

  const getStatusClass = (status) => {
    switch (status) {
      case 'delivered': return 'badge-success';
      case 'shipped': return 'badge-warning';
      default: return 'badge-info';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return t('statusDelivered');
      case 'shipped': return t('statusShipped');
      default: return t('statusPending');
    }
  };

  const currentOrder = orders.find(o => o.id === selectedOrderId);

  // Status progress helpers
  const getProgressWidth = (status) => {
    if (status === 'delivered') return '100%';
    if (status === 'shipped') return '50%';
    return '10%';
  };

  return (
    <div className="page-view">
      <div className="section-header align-left">
        <h1 className="page-title">{t('orderTrackingTitle')}</h1>
        <p className="section-subtitle">{t('orderTrackingSubtitle')}</p>
      </div>

      <div className="orders-layout">
        {/* Left Side: Orders list */}
        <div className="orders-sidebar-list">
          {orders.length === 0 ? (
            <div className="glass-card pad-2 text-center text-muted">
              <Clock style={{ width: '2rem', height: '2rem', marginBottom: '1rem', opacity: 0.5 }} />
              <p>{t('noOrders')}</p>
            </div>
          ) : (
            orders.map(order => (
              <div 
                key={order.id} 
                className={`glass-card order-sidebar-item ${selectedOrderId === order.id ? 'active' : ''}`}
                onClick={() => setSelectedOrderId(order.id)}
              >
                <div className="order-sidebar-header">
                  <span className="order-sidebar-id">{order.id}</span>
                  <span className={`order-sidebar-badge ${getStatusClass(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="order-sidebar-meta">
                  <span>{order.date}</span>
                  <span className="order-sidebar-total">${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Detailed Tracking View */}
        <div className="order-tracking-main">
          {currentOrder ? (
            <div className="glass-card tracking-card-detail">
              <div className="tracking-header">
                <h2>{t('orderId')}: {currentOrder.id}</h2>
                <span className="text-muted">{currentOrder.date}</span>
              </div>

              {/* simulated Tracking Progress Bar */}
              <div className="tracking-timeline-section">
                <h3>{t('orderStatusProgress')}</h3>
                <div className="timeline-progress-wrapper">
                  <div className="timeline-progress-bar" style={{ width: getProgressWidth(currentOrder.status) }}></div>
                  
                  <div className="timeline-steps">
                    {/* Step 1: Placed */}
                    <div className="timeline-step completed">
                      <div className="step-icon-box">
                        <CheckCircle2 />
                      </div>
                      <span className="step-label">
                        {language === 'uz' ? 'Qabul qilindi' : 'Accepted'}
                      </span>
                    </div>

                    {/* Step 2: Shipped */}
                    <div className={`timeline-step ${(currentOrder.status === 'shipped' || currentOrder.status === 'delivered') ? 'completed' : ''}`}>
                      <div className="step-icon-box">
                        <Truck />
                      </div>
                      <span className="step-label">
                        {t('statusShipped')}
                      </span>
                    </div>

                    {/* Step 3: Delivered */}
                    <div className={`timeline-step ${currentOrder.status === 'delivered' ? 'completed' : ''}`}>
                      <div className="step-icon-box">
                        <PackageCheck />
                      </div>
                      <span className="step-label">
                        {t('statusDelivered')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="simulated-note-banner">
                  <Info className="text-indigo" />
                  <p>
                    {currentOrder.status === 'pending' && (language === 'uz' ? 'Buyurtmangiz tayyorlanmoqda. Tez orada kuryerga topshiriladi.' : 'Your order is being processed. It will be dispatched shortly.')}
                    {currentOrder.status === 'shipped' && (language === 'uz' ? 'Kuryerimiz buyurtmani olib yo\'lga chiqdi, yaqin daqiqalarda sizga yetib boradi.' : 'Our courier is on the way. You will receive your parcel soon.')}
                    {currentOrder.status === 'delivered' && (language === 'uz' ? 'Buyurtma yetkazildi. Ms Saodat xizmatidan foydalanganingiz uchun rahmat!' : 'Delivered. Thank you for choosing Ms Saodat!')}
                  </p>
                </div>
              </div>

              {/* Order specifications */}
              <div className="order-details-section">
                <h3>{t('deliveryInfo')}</h3>
                <div className="order-info-grid">
                  <div>
                    <span className="info-title">{t('addressLabel')}</span>
                    <span className="info-value">{currentOrder.address}</span>
                  </div>
                  <div>
                    <span className="info-title">{t('phoneLabel')}</span>
                    <span className="info-value">{currentOrder.phone}</span>
                  </div>
                  <div>
                    <span className="info-title">{t('orderTotal')}</span>
                    <span className="info-value gradient-text-amber">${currentOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="order-items-list-section">
                <h3>{t('cartTitle')}</h3>
                <div className="order-items-table-wrapper">
                  <table className="order-items-table">
                    <thead>
                      <tr>
                        <th>{t('tableName')}</th>
                        <th style={{ textAlign: 'center' }}>Qtd</th>
                        <th style={{ textAlign: 'right' }}>{t('tablePrice')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrder.items.map((item, idx) => (
                        <tr key={idx}>
                          <td>
                            <div className="order-item-title-box">
                              <span className="order-item-title-text">{item.title}</span>
                              <span className="order-item-meta-text">({item.size} / {item.color})</span>
                            </div>
                          </td>
                          <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{item.qty}</td>
                          <td style={{ textAlign: 'right', fontWeight: 'bold' }}>${(item.price * item.qty).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card tracking-card-detail empty-detail text-center text-muted">
              <p>{t('noOrders')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersView;
