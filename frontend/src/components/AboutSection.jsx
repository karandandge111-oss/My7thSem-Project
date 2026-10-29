import React from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  Sparkles, 
  Target, 
  Eye, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  PhoneCall,
  Store,
  AlertCircle,
  FileCheck2,
  Sparkle
} from 'lucide-react';
import aboutImage from '../assets/about-pharmacy.jpg';
import visionImage from '../assets/pharmacy-vision.jpg';
import { useSettings } from '../context/SettingsContext';

export default function AboutSection({ onExploreSearch }) {
  const { t } = useSettings();

  const benefits = [
    {
      icon: Search,
      title: t('benefit1Title'),
      description: t('benefit1Desc'),
      color: '#06b6d4',
      bg: 'rgba(6, 182, 212, 0.12)'
    },
    {
      icon: MapPin,
      title: t('benefit2Title'),
      description: t('benefit2Desc'),
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.12)'
    },
    {
      icon: Clock,
      title: t('benefit3Title'),
      description: t('benefit3Desc'),
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.12)'
    }
  ];

  const steps = [
    {
      number: '01',
      title: t('step1Title'),
      description: t('step1Desc'),
      icon: Search,
      color: '#06b6d4'
    },
    {
      number: '02',
      title: t('step2Title'),
      description: t('step2Desc'),
      icon: FileCheck2,
      color: '#10b981'
    },
    {
      number: '03',
      title: t('step3Title'),
      description: t('step3Desc'),
      icon: PhoneCall,
      color: '#a855f7'
    }
  ];

  return (
    <section 
      id="about" 
      style={{
        maxWidth: 1280,
        margin: '0 auto 80px',
        padding: '0 24px',
        scrollMarginTop: '100px'
      }}
    >
      {/* Main Glassmorphic Wrapper */}
      <div 
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(28px, 5vw, 56px)',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Decorative Background Lighting */}
        <div 
          style={{
            position: 'absolute',
            top: '-15%',
            right: '-10%',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '-15%',
            left: '-10%',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Header Section Tag & Title */}
          <div style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 48px' }}>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 14px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(14, 165, 233, 0.12)',
                border: '1px solid rgba(14, 165, 233, 0.3)',
                color: 'var(--accent-cyan)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: 14
              }}
            >
              <Sparkles size={14} />
              <span>{t('aboutBadge')}</span>
            </div>

            <h2 
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                lineHeight: 1.2,
                fontWeight: 800,
                marginBottom: 18
              }}
            >
              {t('aboutHeading')}
            </h2>

            <p 
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.12rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                margin: 0
              }}
            >
              {t('aboutLead')}
            </p>
          </div>

          {/* Primary Split: Pharmacist Visual + Mission/Vision Cards */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(32px, 5vw, 56px)',
              alignItems: 'center',
              marginBottom: 56
            }}
          >
            {/* Visual Column */}
            <div style={{ position: 'relative' }}>
              <div 
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-md)',
                  aspectRatio: '4 / 3',
                  background: 'var(--bg-secondary)'
                }}
              >
                <img 
                  src={aboutImage} 
                  alt="Modern Pharmacy with Medicine Availability Search" 
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                />
                
                {/* Gradient Contrast Overlay */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10, 15, 29, 0.8) 0%, rgba(10, 15, 29, 0.1) 60%, transparent 100%)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Status Bar */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    right: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    padding: '10px 14px',
                    background: 'rgba(15, 23, 42, 0.82)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className="pulse-dot" style={{ background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc' }}>
                      {t('liveChemistNetwork')}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                    100% Verified
                  </span>
                </div>
              </div>

              {/* Floating Pill */}
              <div 
                style={{
                  position: 'absolute',
                  top: -12,
                  right: -10,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.95), rgba(16, 185, 129, 0.95))',
                  color: '#04131f',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  boxShadow: '0 8px 20px rgba(14, 165, 233, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <ShieldCheck size={14} />
                <span>Verified Pharmacies</span>
              </div>
            </div>

            {/* Mission & Vision Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Mission Card */}
              <div 
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '22px 24px',
                  position: 'relative',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div 
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'rgba(14, 165, 233, 0.15)',
                      color: 'var(--accent-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Target size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
                    {t('ourMissionTitle')}
                  </h3>
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
                  {t('ourMissionDesc')}
                </p>
              </div>

              {/* Vision Card */}
              <div 
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '22px 24px',
                  position: 'relative',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-emerald)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div 
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: 'var(--accent-emerald)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Eye size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
                    {t('ourVisionTitle')}
                  </h3>
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
                  {t('ourVisionDesc')}
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Why Choose Us? (3 Feature Cards) */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <h3 style={{ fontSize: '1.7rem', marginBottom: 8 }}>
                {t('whyChooseUsTitle')}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0 }}>
                {t('whyChooseUsSubtitle')}
              </p>
            </div>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 20
              }}
            >
              {benefits.map((b) => {
                const IconComponent = b.icon;
                return (
                  <div 
                    key={b.title}
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '24px 22px',
                      transition: 'all 0.25s ease',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.borderColor = b.color;
                      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    }}
                  >
                    <div 
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: b.bg,
                        color: b.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 16
                      }}
                    >
                      <IconComponent size={22} />
                    </div>
                    <h4 style={{ fontSize: '1.15rem', marginBottom: 8 }}>
                      {b.title}
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                      {b.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: How It Works (3-Step Visual Process) */}
          <div 
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(24px, 4vw, 40px)',
              position: 'relative',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: 'var(--accent-emerald)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: 8
                }}
              >
                <Sparkle size={13} />
                <span>Simple 3-Step Discovery</span>
              </div>
              <h3 style={{ fontSize: '1.7rem', margin: 0 }}>
                {t('howItWorksTitle')}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: 6 }}>
                {t('howItWorksSubtitle')}
              </p>
            </div>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 24,
                marginBottom: 32
              }}
            >
              {steps.map((st) => {
                const StepIcon = st.icon;
                return (
                  <div 
                    key={st.number}
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '24px 20px',
                      position: 'relative'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      marginBottom: 16 
                    }}>
                      <div 
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 10,
                          background: `${st.color}20`,
                          color: st.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <StepIcon size={20} />
                      </div>
                      <span 
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          fontFamily: 'Outfit, sans-serif',
                          color: 'var(--text-dim)'
                        }}
                      >
                        {st.number}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.08rem', marginBottom: 8 }}>
                      {st.title}
                    </h4>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                      {st.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Confirmation Note Alert */}
            <div 
              style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12
              }}
            >
              <AlertCircle size={20} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                {t('disclaimerNotice')}
              </div>
            </div>

            {/* Action CTA */}
            {onExploreSearch && (
              <div style={{ textAlign: 'center', marginTop: 28 }}>
                <button 
                  onClick={onExploreSearch}
                  className="btn btn-primary"
                  style={{
                    padding: '12px 28px',
                    fontSize: '0.96rem',
                    fontWeight: 700
                  }}
                >
                  <span>{t('searchMedicines')}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
