import React, { useState } from 'react';
import { X, MessageSquare, Phone, Building2, CheckCircle2, AlertCircle, ShoppingBag } from 'lucide-react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function EnquiryModal({ isOpen, onClose, listing }) {
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.fullName || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [requestedQuantity, setRequestedQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !listing) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await api.createEnquiry({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || null,
        pharmacyId: listing.pharmacyId,
        listingId: listing.listingId,
        medicineName: `${listing.brandName} ${listing.strength}`,
        requestedQuantity: Number(requestedQuantity),
        notes: notes.trim()
      });

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to submit enquiry');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: 28, maxWidth: 520 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#34d399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MessageSquare size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--heading-color)' }}>Hold / Stock Enquiry</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Request availability confirmation before travelling
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

        {/* Selected Medicine Info Badge */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 16px',
          marginBottom: 18
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--heading-color)' }}>
              {listing.brandName}
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981' }}>
              ₹{listing.effectivePrice || listing.unitPrice}
            </span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {listing.genericName} • {listing.strength} ({listing.dosageForm})
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Building2 size={13} />
            {listing.pharmacyName} ({listing.pharmacyArea})
          </div>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '24px 12px' }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#34d399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <CheckCircle2 size={32} />
            </div>
            <h4 style={{ fontSize: '1.2rem', color: 'var(--heading-color)', marginBottom: 8 }}>Enquiry Sent to Chemist!</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 20 }}>
              The pharmacy staff has received your reservation request for <strong style={{ color: 'var(--text-main)' }}>{listing.brandName}</strong>. You can also contact them directly.
            </p>

            {listing.pharmacyPhone && (
              <a
                href={`tel:${listing.pharmacyPhone}`}
                className="btn btn-primary"
                style={{ width: '100%', marginBottom: 12 }}
              >
                <Phone size={16} />
                Call {listing.pharmacyPhone}
              </a>
            )}

            <button
              onClick={onClose}
              className="btn btn-secondary"
              style={{ width: '100%' }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
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
                {error}
              </div>
            )}

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 5 }}>
                Your Name *
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter your full name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 5 }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="+91 98..."
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 5 }}>
                  Requested Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  className="input-field"
                  value={requestedQuantity}
                  onChange={(e) => setRequestedQuantity(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 5 }}>
                Email (Optional)
              </label>
              <input
                type="email"
                className="input-field"
                placeholder="your.email@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 5 }}>
                Instructions / Message for Chemist
              </label>
              <textarea
                className="input-field"
                rows="2"
                placeholder="e.g. Please hold 2 strips, I will pick up today around 6 PM."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
              >
                {submitting ? 'Submitting...' : 'Submit Hold Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
