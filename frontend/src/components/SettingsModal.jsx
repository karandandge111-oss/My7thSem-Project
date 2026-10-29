import React, { useState } from 'react';
import { 
  X, 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  Monitor, 
  Type, 
  Globe, 
  Bell, 
  Eye, 
  RotateCcw, 
  Check, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function SettingsModal({ isOpen, onClose }) {
  const {
    theme,
    effectiveTheme,
    setTheme,
    fontSize,
    setFontSize,
    language,
    setLanguage,
    notifications,
    setNotifications,
    highContrast,
    setHighContrast,
    reducedMotion,
    setReducedMotion,
    resetSettings,
    t
  } = useSettings();

  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleReset = () => {
    resetSettings();
    setConfirmReset(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 620,
          padding: 'clamp(20px, 4vw, 32px)',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, #0ea5e9, #10b981)',
              color: '#04131f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)'
            }}>
              <SettingsIcon size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', margin: 0 }}>
                {t('settingsTitle')}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                {t('settingsSubtitle')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Settings"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: 'none',
              borderRadius: '50%',
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* 1. Appearance / Theme */}
          <div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              fontSize: '0.86rem', 
              fontWeight: 700, 
              color: 'var(--text-main)', 
              marginBottom: 10 
            }}>
              <Sun size={16} color="var(--accent-cyan)" />
              <span>{t('appearanceSection')}</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 10
            }}>
              {[
                { id: 'dark', label: t('darkMode'), icon: Moon, desc: 'Night palette' },
                { id: 'light', label: t('lightMode'), icon: Sun, desc: 'Daytime clarity' },
                { id: 'system', label: t('systemDefault'), icon: Monitor, desc: 'Auto OS match' }
              ].map((opt) => {
                const IconComponent = opt.icon;
                const isSelected = theme === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTheme(opt.id)}
                    style={{
                      background: isSelected 
                        ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.18), rgba(16, 185, 129, 0.18))' 
                        : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected 
                        ? '2px solid var(--accent-cyan)' 
                        : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '12px 10px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                  >
                    {isSelected && (
                      <div style={{
                        position: 'absolute',
                        top: 6,
                        right: 6,
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: 'var(--accent-cyan)',
                        color: '#04131f',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Check size={10} strokeWidth={3} />
                      </div>
                    )}
                    <IconComponent 
                      size={20} 
                      color={isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)'} 
                      style={{ margin: '0 auto 6px' }}
                    />
                    <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {opt.label}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 2 }}>
                      {opt.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Font Size */}
          <div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              fontSize: '0.86rem', 
              fontWeight: 700, 
              color: 'var(--text-main)', 
              marginBottom: 10 
            }}>
              <Type size={16} color="var(--accent-emerald)" />
              <span>{t('fontSizeSection')}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[
                { id: 'small', label: t('fontSmall'), scale: '90%' },
                { id: 'medium', label: t('fontMedium'), scale: '100%' },
                { id: 'large', label: t('fontLarge'), scale: '112%' }
              ].map((f) => {
                const isSelected = fontSize === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFontSize(f.id)}
                    style={{
                      background: isSelected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '2px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 12px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {f.label}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: isSelected ? 'var(--accent-emerald)' : 'var(--text-dim)', marginTop: 2 }}>
                      {f.scale} scale
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Language Selection */}
          <div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              fontSize: '0.86rem', 
              fontWeight: 700, 
              color: 'var(--text-main)', 
              marginBottom: 10 
            }}>
              <Globe size={16} color="#a855f7" />
              <span>{t('languageSection')}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { code: 'en', label: 'English', native: 'Default', region: 'India / Global' },
                { code: 'mr', label: 'मराठी', native: 'Marathi', region: 'महाराष्ट्र' }
              ].map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLanguage(lang.code)}
                    style={{
                      background: isSelected ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '2px solid #a855f7' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {lang.label}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                        {lang.native} • {lang.region}
                      </div>
                    </div>
                    {isSelected && (
                      <div style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background: '#a855f7',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Notifications & Accessibility */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14
          }}>
            {/* Notifications Toggle */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <Bell size={18} color="var(--accent-amber)" style={{ marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {t('notificationsSection')}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {t('notificationsDesc')}
                  </div>
                </div>
              </div>
              <input 
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
              />
            </label>

            <div style={{ height: 1, background: 'var(--border-subtle)' }} />

            {/* High Contrast Toggle */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <Eye size={18} color="var(--accent-cyan)" style={{ marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {t('highContrast')}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {t('highContrastDesc')}
                  </div>
                </div>
              </div>
              <input 
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
              />
            </label>

            <div style={{ height: 1, background: 'var(--border-subtle)' }} />

            {/* Reduced Motion Toggle */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <Sparkles size={18} color="#a855f7" style={{ marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {t('reducedMotion')}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {t('reducedMotionDesc')}
                  </div>
                </div>
              </div>
              <input 
                type="checkbox"
                checked={reducedMotion}
                onChange={(e) => setReducedMotion(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
              />
            </label>
          </div>

          {/* 5. Reset Settings */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 12,
            borderTop: '1px solid var(--border-subtle)'
          }}>
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="btn btn-secondary btn-sm"
                style={{
                  fontSize: '0.8rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <RotateCcw size={14} />
                <span>{t('resetButton')}</span>
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.8rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <AlertTriangle size={14} /> Confirm reset?
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-danger btn-sm"
                  style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                >
                  Yes, Reset
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                >
                  Cancel
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="btn btn-primary"
              style={{ padding: '8px 20px', fontSize: '0.88rem' }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
