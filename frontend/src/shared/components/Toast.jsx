import React from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, AlertCircle, Info, ShieldAlert } from 'lucide-react';

const Toast = () => {
  const { toasts, removeToast } = useApp();

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="toast-icon text-success" />;
      case 'error': return <AlertCircle className="toast-icon text-danger" />;
      case 'warning': return <ShieldAlert className="toast-icon text-warning" />;
      default: return <Info className="toast-icon text-indigo" />;
    }
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast glass-card ${toast.type}`}>
          <div className="toast-icon-box">
            {getIcon(toast.type)}
          </div>
          <div className="toast-content">
            <div className="toast-title">{toast.title}</div>
            <div className="toast-message">{toast.message}</div>
          </div>
          <button className="toast-close" onClick={() => removeToast(toast.id)}>
            <X style={{ width: '0.85rem', height: '0.85rem' }} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
