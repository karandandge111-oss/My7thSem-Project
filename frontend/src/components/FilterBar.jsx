import React from 'react';
import { Filter, ArrowUpDown, RotateCcw, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export default function FilterBar({
  stockFilter,
  setStockFilter,
  dosageFilter,
  setDosageFilter,
  dosageForms = [],
  sortBy,
  setSortBy,
  onReset,
  totalResults = 0
}) {
  const stockTabs = [
    { id: 'ALL', label: 'All Stock', icon: null },
    { id: 'IN_STOCK', label: 'In Stock', icon: CheckCircle2, color: '#34d399' },
    { id: 'LOW_STOCK', label: 'Low Stock', icon: AlertTriangle, color: '#fbbf24' },
    { id: 'OUT_OF_STOCK', label: 'Out of Stock', icon: XCircle, color: '#fb7185' }
  ];

  const hasActiveFilters = stockFilter !== 'ALL' || dosageFilter !== 'ALL' || sortBy !== 'DEFAULT';

  return (
    <div style={{
      maxWidth: 1280,
      margin: '0 auto 24px',
      padding: '0 24px'
    }}>
      <div className="glass-panel" style={{
        padding: '16px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16
      }}>
        {/* Left: Stock Status Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{
            fontSize: '0.82rem',
            fontWeight: 700,
            color: 'var(--text-dim)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginRight: 4
          }}>
            <Filter size={14} /> Status:
          </span>

          {stockTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = stockFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStockFilter(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  color: isSelected ? '#fff' : 'var(--text-muted)',
                  border: isSelected ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid var(--border-subtle)',
                  transition: 'all 0.15s ease'
                }}
              >
                {Icon && <Icon size={14} color={tab.color} />}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right: Dosage Form, Sort, and Reset */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          {/* Dosage Form Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>Form:</span>
            <select
              value={dosageFilter}
              onChange={(e) => setDosageFilter(e.target.value)}
              className="input-field"
              style={{ padding: '6px 28px 6px 10px', fontSize: '0.82rem', width: 'auto' }}
            >
              <option value="ALL">All Forms</option>
              {dosageForms.map((df) => (
                <option key={df} value={df}>{df}</option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ArrowUpDown size={14} color="var(--text-dim)" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
              style={{ padding: '6px 28px 6px 10px', fontSize: '0.82rem', width: 'auto' }}
            >
              <option value="DEFAULT">Availability (In Stock First)</option>
              <option value="PRICE_ASC">Price: Low to High</option>
              <option value="PRICE_DESC">Price: High to Low</option>
              <option value="RECENT">Recently Updated</option>
            </select>
          </div>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px' }}
              title="Reset all filters"
            >
              <RotateCcw size={13} />
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
