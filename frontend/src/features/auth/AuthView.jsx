import React, { useState } from 'react';
import { useApp } from '../../shared/context/AppContext';
import CustomDropdown from './CustomDropdown';
import { Lock, User, KeyRound, UserPlus } from 'lucide-react';

const AuthView = ({ mode }) => {
  const { 
    handleLoginSubmit, 
    handleRegisterSubmit, 
    setView, 
    t 
  } = useApp();

  // Login form state
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');

  // Register form state
  const [regUser, setRegUser] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regRole, setRegRole] = useState('user');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    const success = await handleLoginSubmit(loginUser, loginPass);
    if (success) {
      setLoginUser('');
      setLoginPass('');
    }
  };

  const onRegister = async (e) => {
    e.preventDefault();
    const success = await handleRegisterSubmit(regUser, regPass, regRole);
    if (success) {
      setRegUser('');
      setRegPass('');
      setRegRole('user');
    }
  };

  return (
    <div className="page-view">
      <div className="auth-card-wrapper">
        {mode === 'login' ? (
          /* LOGIN PANEL */
          <div className="glass-card auth-container-split">
            <div className="auth-visual-panel">
              <div className="visual-badge">Ms Saodat Premium</div>
              <h3>{t('authTitle')}</h3>
              <p>{t('authDesc')}</p>
              <div className="decor-circle-1"></div>
              <div className="decor-circle-2"></div>
            </div>
            
            <div className="auth-form-panel">
              <div className="auth-header">
                <Lock className="auth-icon-header" />
                <h2>{t('welcomeBack')}</h2>
                <p>{t('welcomeDesc')}</p>
              </div>

              <form onSubmit={onLogin} className="auth-form">
                <div className="form-group">
                  <label>{t('usernameLabel')}</label>
                  <div className="input-with-icon">
                    <User />
                    <input 
                      type="text" 
                      placeholder={t('usernameLabel')} 
                      value={loginUser} 
                      onChange={(e) => setLoginUser(e.target.value)} 
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>{t('passwordLabel')}</label>
                  <div className="input-with-icon">
                    <KeyRound />
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={loginPass} 
                      onChange={(e) => setLoginPass(e.target.value)} 
                      required 
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  {t('login')}
                </button>
              </form>

              <div className="auth-footer">
                <span>{t('noAccount')}</span>
                <button className="btn btn-secondary btn-sm" onClick={() => setView('register')}>
                  {t('register')}
                </button>
              </div>

              <div className="demo-credentials">
                <h4>{t('demoAccs')}:</h4>
                <p>🔑 <strong>Admin:</strong> admin / admin123</p>
                <p>👤 <strong>User:</strong> user / user123</p>
              </div>
            </div>
          </div>
        ) : (
          /* REGISTER PANEL */
          <div className="glass-card auth-container-split inverse">
            <div className="auth-visual-panel">
              <div className="visual-badge bg-violet">Ms Saodat A'zolik</div>
              <h3>{t('joinUs')}</h3>
              <p>{t('joinUsDesc')}</p>
              <div className="decor-circle-3"></div>
            </div>

            <div className="auth-form-panel">
              <div className="auth-header">
                <UserPlus className="auth-icon-header" />
                <h2>{t('createAccount')}</h2>
                <p>Ms Saodat</p>
              </div>

              <form onSubmit={onRegister} className="auth-form">
                <div className="form-group">
                  <label>{t('usernameLabel')}</label>
                  <div className="input-with-icon">
                    <User />
                    <input 
                      type="text" 
                      placeholder={t('usernameLabel')} 
                      value={regUser} 
                      onChange={(e) => setRegUser(e.target.value)} 
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>{t('passwordLabel')}</label>
                  <div className="input-with-icon">
                    <KeyRound />
                    <input 
                      type="password" 
                      placeholder={t('alertPasswordLength')} 
                      value={regPass} 
                      onChange={(e) => setRegPass(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
                
                {/* Visual custom dropdown role selector */}
                <div className="form-group">
                  <label>{t('selectRole')}</label>
                  <CustomDropdown 
                    role={regRole} 
                    setRole={setRegRole} 
                    isOpen={showRoleDropdown}
                    setIsOpen={setShowRoleDropdown}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  {t('register')}
                </button>
              </form>

              <div className="auth-footer">
                <span>{t('haveAccount')}</span>
                <button className="btn btn-secondary btn-sm" onClick={() => setView('login')}>
                  {t('login')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthView;
