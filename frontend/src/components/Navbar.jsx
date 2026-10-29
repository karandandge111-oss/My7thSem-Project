import React, { useState } from 'react';
import { Pill, Building2, User, LogOut, Search, ShieldCheck, Info, Sun, Moon, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

export default function Navbar({ onOpenAuth, activeView, setActiveView, onOpenAddListing, onOpenSettings }) {
  const { user, isAuthenticated, isPharmacyOwner, logout } = useAuth();
  const { effectiveTheme, toggleTheme, t, language } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToAbout = () => {
    setMobileMenuOpen(false);
    if (activeView !== 'search') {
      setActiveView('search');
      setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (view) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: effectiveTheme === 'light' ? 'rgba(255, 255, 255, 0.92)' : 'rgba(10, 15, 29, 0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '12px 24px',
      transition: 'background-color 0.25s ease, border-color 0.25s ease'
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16
      }}>
        {/* Brand Logo - MedKhoj */}
        <div 
          onClick={() => handleNavClick('search')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          {/* Custom MedKhoj Logo Emblem */}
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 18px rgba(14, 165, 233, 0.35)',
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {/* Medical Cross */}
              <path d="M10 4h4v16h-4z" fill="#04131f" />
              <path d="M4 10h16v4H4z" fill="#04131f" />
              {/* Search magnifier highlight ring */}
              <circle cx="15.5" cy="15.5" r="4.5" stroke="#ffffff" strokeWidth="2" fill="#0ea5e9" />
              <path d="M18.5 18.5L21.5 21.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--heading-color)' }}>
                Med<span style={{ color: '#0ea5e9' }}>Khoj</span>
              </span>
              <span style={{
                fontSize: '0.62rem',
                fontWeight: 700,
                background: 'rgba(16, 185, 129, 0.12)',
                color: '#10b981',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '2px 7px',
                borderRadius: 'var(--radius-pill)',
                letterSpacing: '0.04em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }}></span>
                VERIFIED NETWORK
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Real-Time Medicine Availability
            </div>
          </div>
        </div>

        {/* Desktop Center Nav Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }} className="desktop-nav">
          <button
            onClick={() => handleNavClick('search')}
            style={{
              background: activeView === 'search' ? (effectiveTheme === 'light' ? 'rgba(14, 165, 233, 0.1)' : 'rgba(255, 255, 255, 0.08)') : 'transparent',
              color: activeView === 'search' ? (effectiveTheme === 'light' ? '#0284c7' : '#fff') : 'var(--text-muted)',
              border: activeView === 'search' ? '1px solid var(--border-subtle)' : '1px solid transparent',
              padding: '8px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Search size={16} />
            {t('searchMedicines')}
          </button>

          {isPharmacyOwner && (
            <button
              onClick={() => handleNavClick('dashboard')}
              style={{
                background: activeView === 'dashboard' ? 'rgba(16, 185, 129, 0.14)' : 'transparent',
                color: activeView === 'dashboard' ? '#10b981' : 'var(--text-muted)',
                border: activeView === 'dashboard' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.88rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Building2 size={16} />
              {t('pharmacyPortal')}
            </button>
          )}

          <button
            onClick={scrollToAbout}
            style={{
              background: 'transparent',
              color: 'var(--text-muted)',
              border: '1px solid transparent',
              padding: '8px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--heading-color)';
              e.currentTarget.style.background = effectiveTheme === 'light' ? 'rgba(15, 23, 42, 0.05)' : 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Info size={16} />
            {t('aboutUs')}
          </button>
        </nav>

        {/* Right Controls: Theme Toggle + Settings + Auth / Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* 1. Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={effectiveTheme === 'dark' ? t('lightMode') : t('darkMode')}
            title={effectiveTheme === 'dark' ? t('lightMode') : t('darkMode')}
            style={{
              background: effectiveTheme === 'light' ? '#f1f5f9' : 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-subtle)',
              color: effectiveTheme === 'dark' ? '#fbbf24' : '#0284c7',
              width: 38,
              height: 38,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.borderColor = 'var(--border-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
          >
            {effectiveTheme === 'dark' ? (
              <Sun size={18} strokeWidth={2.2} />
            ) : (
              <Moon size={18} strokeWidth={2.2} />
            )}
          </button>

          {/* 2. Settings Button */}
          <button
            onClick={onOpenSettings}
            aria-label={t('settings')}
            title={t('settings')}
            style={{
              background: effectiveTheme === 'light' ? '#f1f5f9' : 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
              width: 38,
              height: 38,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'rotate(25deg)';
              e.currentTarget.style.borderColor = 'var(--border-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotate(0deg)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
          >
            <Settings size={18} />
          </button>

          {/* 3. Auth Profile / Sign In */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                background: effectiveTheme === 'light' ? '#f1f5f9' : 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: isPharmacyOwner ? 'rgba(16, 185, 129, 0.2)' : 'rgba(14, 165, 233, 0.2)',
                  color: isPharmacyOwner ? '#10b981' : '#0ea5e9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
                </div>
                <div style={{ lineHeight: 1.1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--heading-color)' }}>
                    {user.fullName || user.username}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: isPharmacyOwner ? '#10b981' : 'var(--text-muted)' }}>
                    {isPharmacyOwner ? (user.pharmacyName || 'Pharmacy Partner') : 'Customer'}
                  </div>
                </div>
              </div>

              {isPharmacyOwner && onOpenAddListing && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={onOpenAddListing}
                >
                  + Add Stock
                </button>
              )}

              <button
                onClick={logout}
                title="Log Out"
                aria-label="Log Out"
                style={{
                  background: 'rgba(244, 63, 94, 0.1)',
                  border: '1px solid rgba(244, 63, 94, 0.25)',
                  color: '#f43f5e',
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={() => onOpenAuth('customer')}
                className="btn btn-secondary btn-sm"
              >
                <User size={15} />
                {t('signIn')}
              </button>
              <button
                onClick={() => onOpenAuth('pharmacy')}
                className="btn btn-outline-emerald btn-sm"
              >
                <Building2 size={15} />
                {t('pharmacyLogin')}
              </button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="mobile-nav-toggle"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              cursor: 'pointer',
              padding: 6,
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div style={{
          marginTop: 12,
          paddingTop: 12,
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }}>
          <button
            onClick={() => handleNavClick('search')}
            style={{
              background: activeView === 'search' ? 'rgba(14, 165, 233, 0.12)' : 'transparent',
              color: 'var(--text-main)',
              border: 'none',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.92rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textAlign: 'left'
            }}
          >
            <Search size={16} />
            {t('searchMedicines')}
          </button>

          {isPharmacyOwner && (
            <button
              onClick={() => handleNavClick('dashboard')}
              style={{
                background: activeView === 'dashboard' ? 'rgba(16, 185, 129, 0.12)' : 'transparent',
                color: '#10b981',
                border: 'none',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.92rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                textAlign: 'left'
              }}
            >
              <Building2 size={16} />
              {t('pharmacyPortal')}
            </button>
          )}

          <button
            onClick={scrollToAbout}
            style={{
              background: 'transparent',
              color: 'var(--text-main)',
              border: 'none',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.92rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textAlign: 'left'
            }}
          >
            <Info size={16} />
            {t('aboutUs')}
          </button>
        </div>
      )}
    </header>
  );
}

