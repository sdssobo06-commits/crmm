import React from 'react';
import { useApp } from '../context/AppContext';

const Footer = () => {
  const { language } = useApp();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Ms Saodat. {language === 'uz' ? 'Barcha huquqlar himoyalangan.' : 'All rights reserved.'}</p>
        <div className="footer-links">
          <a href="#">{language === 'uz' ? 'Foydalanish shartlari' : 'Terms of Service'}</a>
          <a href="#">{language === 'uz' ? 'Maxfiylik siyosati' : 'Privacy Policy'}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
