import React from 'react';
import { Pill, ShieldAlert, Heart, Terminal, Database, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--bg-secondary)',
      padding: '48px 24px 32px',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Healthcare Disclaimer Box */}
        <div style={{
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 14,
          marginBottom: 36
        }}>
          <ShieldAlert size={22} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fbbf24', marginBottom: 4 }}>
              Demonstration & Medical Availability Disclaimer
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
              Medicine Availability Finder is a web application designed to help locate pharmacy-reported medicine stock. Listings, quantities, and prices are reported directly by participating pharmacies and may change due to fast-moving counter sales. Always confirm critical and urgent prescriptions directly with the chemist before travelling. Schedule H / H1 drugs strictly require a valid prescription.
            </div>
          </div>
        </div>

        {/* Footer Main Columns */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          paddingBottom: 28,
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          {/* Brand info */}
          <div style={{ maxWidth: 420 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #0ea5e9, #10b981)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#061a29'
              }}>
                <Pill size={18} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--heading-color)' }}>
                Med<span style={{ color: '#0ea5e9' }}>Khoj</span>
              </span>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 10 }}>
              Connecting patients and families with nearby verified pharmacy inventories for fast, stress-free healthcare access and real-time medicine availability.
            </p>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                fontSize: '0.82rem',
                color: '#38bdf8',
                textDecoration: 'none',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5
              }}
            >
              <span>Learn More About Us</span>
              <span>→</span>
            </a>
          </div>

          {/* Technology Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <Code2 size={13} color="#38bdf8" /> React + Vite
            </span>

            <span style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <Terminal size={13} color="#34d399" /> Java 25 & Spring Boot
            </span>

            <span style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <Database size={13} color="#a855f7" /> PostgreSQL & H2
            </span>
          </div>
        </div>

        {/* Bottom Credits */}
        <div style={{
          paddingTop: 24,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          fontSize: '0.8rem',
          color: 'var(--text-dim)'
        }}>
          <div>
            © {new Date().getFullYear()} MedKhoj • Real-Time Medicine Availability Finder
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            Built with care for public health & local chemist communities
          </div>
        </div>
      </div>
    </footer>
  );
}
