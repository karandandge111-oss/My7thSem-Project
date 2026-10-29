import React, { useState } from 'react';
import { X, User, Building2, Lock, Mail, Phone, MapPin, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose, initialRole = 'customer' }) {
  const { login, register, loading, authError, setAuthError } = useAuth();

  const [mode, setMode] = useState('login'); // login or register
  const [role, setRole] = useState(initialRole === 'pharmacy' ? 'PHARMACY_OWNER' : 'CUSTOMER');

  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regData, setRegData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    pharmacyName: '',
    licenseNumber: '',
    addressLine: '',
    area: '',
    city: '',
    pincode: '',
    openingHours: '08:00 AM - 10:00 PM'
  });

  if (!isOpen) return null;

  // 1-Click Quick Demo Login Helper
  const handleDemoLogin = async (username, password) => {
    const res = await login(username, password);
    if (res.success) onClose();
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const res = await login(loginUsername, loginPassword);
    if (res.success) onClose();
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const cleanUsername = regData.username.trim();
    const effectiveEmail = regData.email.trim() || 
      (cleanUsername.includes('@') ? cleanUsername : `${cleanUserSafe(cleanUsername)}@medkhoj.local`);
      
    const payload = {
      ...regData,
      username: cleanUsername,
      email: effectiveEmail,
      phone: regData.phone.trim() || '+91 94222 00000',
      addressLine: regData.addressLine.trim() || regData.area || 'Main Street',
      city: regData.city.trim() || 'Local City',
      area: regData.area.trim() || 'Central',
      pincode: regData.pincode.trim() || '400001',
      role
    };
    const res = await register(payload);
    if (res.success) onClose();
  };

  const cleanUserSafe = (str) => {
    const s = str.replace(/[^a-zA-Z0-9]/g, '');
    return s.length > 0 ? s : 'user';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: 28, maxWidth: 540 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #0ea5e9, #10b981)',
              color: '#061a29',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {role === 'PHARMACY_OWNER' ? <Building2 size={20} /> : <User size={20} />}
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--heading-color)' }}>
                {mode === 'login' ? 'Account Sign In' : 'Create an Account'}
              </h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {mode === 'login' 
                  ? 'Access customer enquiries or manage pharmacy inventory' 
                  : 'Join as a customer or register your pharmacy'}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* 1-Click Demo Accounts Quick Select */}
        <div style={{
          background: 'rgba(14, 165, 233, 0.08)',
          border: '1px solid rgba(14, 165, 233, 0.25)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 14px',
          marginBottom: 18
        }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            ⚡ Instant 1-Click Demo Logins:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <button
              type="button"
              onClick={() => handleDemoLogin('shree_ganesh_chem', 'demo123')}
              className="btn btn-secondary btn-sm"
              title="Username: shree_ganesh_chem | Password: demo123"
              style={{ fontSize: '0.76rem', padding: '5px 10px', background: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.35)' }}
            >
              <Building2 size={13} color="#10b981" />
              Shree Ganesh (demo123)
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('apollo_cidco', 'pharmacy123')}
              className="btn btn-secondary btn-sm"
              title="Username: apollo_cidco | Password: pharmacy123"
              style={{ fontSize: '0.76rem', padding: '5px 10px' }}
            >
              <Building2 size={13} color="#34d399" />
              Apollo (pharmacy123)
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('sanjivani_kranti', 'pharmacy123')}
              className="btn btn-secondary btn-sm"
              title="Username: sanjivani_kranti | Password: pharmacy123"
              style={{ fontSize: '0.76rem', padding: '5px 10px' }}
            >
              <Building2 size={13} color="#38bdf8" />
              Sanjivani (pharmacy123)
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('rahul_sharma', 'demo123')}
              className="btn btn-secondary btn-sm"
              title="Username: rahul_sharma | Password: demo123"
              style={{ fontSize: '0.76rem', padding: '5px 10px', background: 'rgba(14, 165, 233, 0.15)', borderColor: 'rgba(14, 165, 233, 0.35)' }}
            >
              <User size={13} color="#38bdf8" />
              Customer Rahul (demo123)
            </button>
          </div>
        </div>

        {/* Mode Toggle: Sign In vs Sign Up */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: 18
        }}>
          <button
            type="button"
            onClick={() => { setMode('login'); setAuthError(null); }}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              borderBottom: mode === 'login' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
              color: mode === 'login' ? '#fff' : 'var(--text-muted)',
              padding: '10px',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setAuthError(null); }}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              borderBottom: mode === 'register' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
              color: mode === 'register' ? '#fff' : 'var(--text-muted)',
              padding: '10px',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Create New Account
          </button>
        </div>

        {authError && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#fda4af',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <AlertCircle size={16} />
            {authError}
          </div>
        )}

        {/* Sign In Form */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 5 }}>
                Username
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="e.g. apollo_owner or customer_demo"
                  className="input-field"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 5 }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input-field"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '0.96rem' }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        )}

        {/* Register Form */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit}>
            {/* Role Radio Picker */}
            <div style={{
              display: 'flex',
              gap: 12,
              marginBottom: 16
            }}>
              <label style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: role === 'CUSTOMER' ? 'rgba(14, 165, 233, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: role === 'CUSTOMER' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600
              }}>
                <input
                  type="radio"
                  name="userRole"
                  value="CUSTOMER"
                  checked={role === 'CUSTOMER'}
                  onChange={() => setRole('CUSTOMER')}
                />
                Customer Account
              </label>

              <label style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: role === 'PHARMACY_OWNER' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: role === 'PHARMACY_OWNER' ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600
              }}>
                <input
                  type="radio"
                  name="userRole"
                  value="PHARMACY_OWNER"
                  checked={role === 'PHARMACY_OWNER'}
                  onChange={() => setRole('PHARMACY_OWNER')}
                />
                Pharmacy Business
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
                  Username *
                </label>
                <input
                  type="text"
                  placeholder="Unique username"
                  className="input-field"
                  value={regData.username}
                  onChange={(e) => setRegData({ ...regData, username: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
                  Password *
                </label>
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  className="input-field"
                  value={regData.password}
                  onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Shinde Karan"
                  className="input-field"
                  value={regData.fullName}
                  onChange={(e) => setRegData({ ...regData, fullName: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. name@gmail.com"
                  className="input-field"
                  value={regData.email}
                  onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                />
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
                Phone Number *
              </label>
              <input
                type="tel"
                placeholder="e.g. 7378477792"
                className="input-field"
                value={regData.phone}
                onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                required
              />
            </div>

            {/* Additional fields for Pharmacy Owner */}
            {role === 'PHARMACY_OWNER' && (
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                marginBottom: 16
              }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#34d399', marginBottom: 10 }}>
                  Pharmacy Store Information
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-dim)', marginBottom: 3 }}>
                      Store Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apollo Pharmacy"
                      className="input-field"
                      value={regData.pharmacyName}
                      onChange={(e) => setRegData({ ...regData, pharmacyName: e.target.value })}
                      required={role === 'PHARMACY_OWNER'}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-dim)', marginBottom: 3 }}>
                      Drug License No. *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. DL-KA-2024-XXXX"
                      className="input-field"
                      value={regData.licenseNumber}
                      onChange={(e) => setRegData({ ...regData, licenseNumber: e.target.value })}
                      required={role === 'PHARMACY_OWNER'}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-dim)', marginBottom: 3 }}>
                      City / Town *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai, Pune, Delhi..."
                      className="input-field"
                      value={regData.city}
                      onChange={(e) => setRegData({ ...regData, city: e.target.value })}
                      required={role === 'PHARMACY_OWNER'}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-dim)', marginBottom: 3 }}>
                      Area / Locality *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Central Market, Main Road..."
                      className="input-field"
                      value={regData.area}
                      onChange={(e) => setRegData({ ...regData, area: e.target.value })}
                      required={role === 'PHARMACY_OWNER'}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-dim)', marginBottom: 3 }}>
                      Street Address / Landmark
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Shop 4, Near Metro Station"
                      className="input-field"
                      value={regData.addressLine}
                      onChange={(e) => setRegData({ ...regData, addressLine: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-dim)', marginBottom: 3 }}>
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 400001 or 431003"
                      className="input-field"
                      value={regData.pincode}
                      onChange={(e) => setRegData({ ...regData, pincode: e.target.value })}
                      required={role === 'PHARMACY_OWNER'}
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '0.96rem' }}
            >
              {loading ? 'Creating Account...' : 'Complete Registration'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
