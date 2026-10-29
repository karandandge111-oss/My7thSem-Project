import React, { useState } from 'react';
import { Search, MapPin, Hash, Sparkles, X, Activity, ShieldCheck, Clock } from 'lucide-react';

export default function SearchHero({
  searchQuery,
  setSearchQuery,
  selectedArea,
  setSelectedArea,
  pincode,
  setPincode,
  areas = [],
  pincodes = [],
  onSearch,
  totalResults = 0
}) {
  const quickSearches = [
    { label: 'Paracetamol', query: 'Paracetamol' },
    { label: 'Dolo 650', query: 'Dolo 650' },
    { label: 'Augmentin 625', query: 'Augmentin' },
    { label: 'Pan 40', query: 'Pan 40' },
    { label: 'Azithral 500', query: 'Azithral' },
    { label: 'Allegra 120', query: 'Allegra' },
    { label: 'Cetzine 10', query: 'Cetzine' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };

  return (
    <div style={{
      padding: '48px 24px 32px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: 1080,
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {/* Top Feature Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(14, 165, 233, 0.1)',
          border: '1px solid rgba(14, 165, 233, 0.25)',
          padding: '6px 16px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.84rem',
          fontWeight: 600,
          color: '#38bdf8',
          marginBottom: 20
        }}>
          <Sparkles size={15} />
          <span>MedKhoj • Live Chemist Inventory Portal</span>
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontSize: 'clamp(2.1rem, 5vw, 3.4rem)',
          lineHeight: 1.15,
          fontWeight: 800,
          marginBottom: 16
        }}>
          Find Medicine Availability <br />
          <span className="gradient-text">In Nearby Pharmacies</span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.18rem)',
          color: 'var(--text-muted)',
          maxWidth: 720,
          margin: '0 auto 36px',
          lineHeight: 1.6
        }}>
          Search live pharmacy-reported stock status, compare unit prices, and check exact availability across verified chemists before travelling.
        </p>

        {/* Primary Search Container */}
        <form
          onSubmit={handleSubmit}
          className="glass-panel"
          style={{
            padding: '10px',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4), 0 0 24px rgba(14, 165, 233, 0.15)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 10,
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          {/* 1. Medicine Name Input */}
          <div style={{
            flex: '2 1 280px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 16px',
            background: 'var(--input-bg)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <Search size={20} color="var(--accent-cyan)" />
            <input
              type="text"
              placeholder="Search medicine by brand (e.g. Paracetamol, Dolo 650, Augmentin)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-main)',
                fontSize: '0.98rem',
                fontFamily: 'inherit'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  padding: 4
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* 2. Area Selector */}
          <div style={{
            flex: '1.2 1 180px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 14px',
            background: 'var(--input-bg)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <MapPin size={18} color="var(--accent-emerald)" />
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-main)',
                fontSize: '0.92rem',
                fontFamily: 'inherit',
                cursor: 'pointer'
              }}
            >
              <option value="ALL" style={{ background: 'var(--bg-elevated)', color: 'var(--text-main)' }}>All Areas</option>
              {areas.map((a) => (
                <option key={a} value={a} style={{ background: 'var(--bg-elevated)', color: 'var(--text-main)' }}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* 3. PIN Code Filter */}
          <div style={{
            flex: '1 1 140px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 14px',
            background: 'var(--input-bg)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <Hash size={18} color="#a855f7" />
            <select
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-main)',
                fontSize: '0.92rem',
                fontFamily: 'inherit',
                cursor: 'pointer'
              }}
            >
              <option value="ALL" style={{ background: 'var(--bg-elevated)', color: 'var(--text-main)' }}>All PINs</option>
              {pincodes.map((pin) => (
                <option key={pin} value={pin} style={{ background: 'var(--bg-elevated)', color: 'var(--text-main)' }}>
                  {pin}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Search Submit Button */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              padding: '13px 26px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.98rem',
              fontWeight: 700,
              flex: '0 0 auto'
            }}
          >
            <Search size={18} />
            Search
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 8,
          marginTop: 20
        }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginRight: 4 }}>
            Popular:
          </span>
          {quickSearches.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setSearchQuery(item.query);
                if (onSearch) setTimeout(onSearch, 50);
              }}
              style={{
                background: searchQuery === item.query ? 'rgba(14, 165, 233, 0.22)' : 'var(--bg-card)',
                color: searchQuery === item.query ? '#0284c7' : 'var(--text-muted)',
                border: searchQuery === item.query ? '1px solid rgba(14, 165, 233, 0.4)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '4px 12px',
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Live Metrics Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
          marginTop: 36,
          maxWidth: 860,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Activity size={18} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--heading-color)' }}>
                {totalResults} Listings
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Reported by Pharmacies
              </div>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'rgba(14, 165, 233, 0.15)',
              color: '#0ea5e9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={18} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--heading-color)' }}>
                {areas.length || 6} Local Areas
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Across Verified Chemists
              </div>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'rgba(245, 158, 11, 0.15)',
              color: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Clock size={18} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--heading-color)' }}>
                Live Reporting
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Direct Pharmacy Portal
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
