import React, { useEffect } from 'react';
import { useApp } from '../../shared/context/AppContext';
import { User, ShieldAlert, ChevronDown, ShieldCheck } from 'lucide-react';

const CustomDropdown = ({ role, setRole, isOpen, setIsOpen }) => {
  const { t } = useApp();

  // Close dropdown on clicking outside
  useEffect(() => {
    const closeOnOutsideClick = () => setIsOpen(false);
    window.addEventListener('click', closeOnOutsideClick);
    return () => window.removeEventListener('click', closeOnOutsideClick);
  }, [setIsOpen]);

  return (
    <div className="custom-dropdown" onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}>
      <div className={`dropdown-trigger ${isOpen ? 'active' : ''}`}>
        <span id="selected-role-label">
          {role === 'admin' ? (
            <>
              <ShieldCheck className="dropdown-icon-left text-violet" />
              {t('roleAdmin')}
            </>
          ) : (
            <>
              <User className="dropdown-icon-left text-indigo" />
              {t('roleUser')}
            </>
          )}
        </span>
        <ChevronDown className="dropdown-chevron" />
      </div>

      {isOpen && (
        <div className="dropdown-options">
          {/* USER option */}
          <div 
            className={`dropdown-option ${role === 'user' ? 'selected' : ''}`}
            onClick={() => setRole('user')}
          >
            <User className="text-indigo" />
            <div className="option-details">
              <span className="option-title">{t('roleUser')}</span>
              <span className="option-desc">{t('roleUserDesc')}</span>
            </div>
          </div>

          {/* ADMIN option */}
          <div 
            className={`dropdown-option ${role === 'admin' ? 'selected' : ''}`}
            onClick={() => setRole('admin')}
          >
            <ShieldAlert className="text-violet" />
            <div className="option-details">
              <span className="option-title">{t('roleAdmin')}</span>
              <span className="option-desc">{t('roleAdminDesc')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
