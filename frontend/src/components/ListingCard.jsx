import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle, 
  FileText, 
  Calendar, 
  Tag, 
  Share2, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';

export default function ListingCard({ listing, onEnquire }) {
  // Determine status style classes
  const statusKey = (listing.stockStatus || 'IN_STOCK').toLowerCase().replace(/_/g, '-');
  
  // Format price
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return 'Price on Enquiry';
    return `₹${Number(amount).toFixed(2)}`;
  };

  // Format relative time
  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return 'Recently';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMins = Math.round((now - date) / (1000 * 60));
    
    if (diffMins < 2) return 'Just now';
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '24px',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        border: '1px solid var(--border-subtle)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.35)';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
    >
      <div>
        {/* Top Header: Dosage Form, Rx Requirement & Stock Status Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 14
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              background: 'var(--bg-secondary)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-subtle)',
              padding: '3px 8px',
              borderRadius: 4
            }}>
              {listing.dosageForm || 'Medicine'}
            </span>

            {listing.prescriptionRequired ? (
              <span className="rx-badge rx-required">
                Rx Required
              </span>
            ) : (
              <span className="rx-badge rx-otc">
                OTC
              </span>
            )}

            {listing.category && (
              <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                • {listing.category}
              </span>
            )}
          </div>

          {/* Stock Status Indicator */}
          <div className={`status-badge ${statusKey}`}>
            <span className="pulse-dot" />
            <span>{listing.stockStatusLabel || listing.stockStatus}</span>
          </div>
        </div>

        {/* Medicine Name and Strength */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--heading-color)', fontWeight: 700 }}>
              {listing.brandName}
            </h3>
            <span style={{
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'var(--accent-cyan)',
              background: 'rgba(14, 165, 233, 0.1)',
              padding: '2px 8px',
              borderRadius: 4
            }}>
              {listing.strength}
            </span>
          </div>
          
          <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: 4 }}>
            Generic: <strong style={{ color: 'var(--text-main)' }}>{listing.genericName}</strong>
          </div>
        </div>

        {/* Pricing Block */}
        <div style={{
          background: 'var(--input-bg)',
          padding: '10px 14px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Reported Price
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>
                {formatCurrency(listing.effectivePrice || listing.unitPrice)}
              </span>
              {listing.discountPercent > 0 && (
                <>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                    {formatCurrency(listing.unitPrice)}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b' }}>
                    {listing.discountPercent}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Available Count
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: listing.availableQuantity > 0 ? 'var(--text-main)' : '#f43f5e' }}>
              {listing.availableQuantity > 0 ? `${listing.availableQuantity} units` : 'Zero Stock'}
            </div>
          </div>
        </div>

        {/* Pharmacy Details Block */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 14,
          marginBottom: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Building2 size={16} color="var(--accent-cyan)" />
            <span style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--heading-color)' }}>
              {listing.pharmacyName}
            </span>
            {listing.isVerified && (
              <CheckCircle size={14} color="#10b981" title="Verified Pharmacy" />
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: 6 }}>
            <MapPin size={15} color="var(--text-dim)" style={{ flexShrink: 0, marginTop: 2 }} />
            <span>
              {listing.pharmacyAddress}, <strong style={{ color: 'var(--text-main)' }}>{listing.pharmacyArea}</strong> ({listing.pharmacyPincode})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={14} />
              <span>{listing.pharmacyHours || 'Regular Store Hours'}</span>
            </div>
            <div>
              Updated: {formatTimeAgo(listing.lastReportedAt)}
            </div>
          </div>

          {listing.notes && (
            <div style={{
              marginTop: 10,
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              fontStyle: 'italic',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              padding: '6px 10px',
              borderRadius: 6
            }}>
              "{listing.notes}"
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        paddingTop: 12,
        borderTop: '1px solid var(--border-subtle)'
      }}>
        {/* Direct Call Button */}
        {listing.pharmacyPhone ? (
          <a
            href={`tel:${listing.pharmacyPhone}`}
            className="btn btn-secondary btn-sm"
            style={{ flex: 1, textDecoration: 'none' }}
            title={`Call ${listing.pharmacyName}`}
          >
            <Phone size={14} color="var(--accent-emerald)" />
            Call Chemist
          </a>
        ) : null}

        {/* Enquire / Reserve Hold Button */}
        <button
          onClick={() => onEnquire && onEnquire(listing)}
          className="btn btn-primary btn-sm"
          style={{ flex: 1.2 }}
        >
          <MessageSquare size={14} />
          Hold / Enquire
        </button>
      </div>
    </div>
  );
}
