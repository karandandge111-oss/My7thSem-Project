import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Save, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Search,
  RefreshCw
} from 'lucide-react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function PharmacyPortal({ onOpenAddListing }) {
  const { user } = useAuth();
  const pharmacyId = user?.pharmacyId || 1;

  const [activeTab, setActiveTab] = useState('inventory'); // inventory, enquiries, profile
  const [listings, setListings] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState({ totalListings: 0, inStockCount: 0, lowStockCount: 0, outOfStockCount: 0 });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Load data
  const loadData = async () => {
    setLoading(true);
    try {
      const [listingsData, statsData, enquiriesData, profileData] = await Promise.all([
        api.getPharmacyListings(pharmacyId),
        api.getPharmacyStats(pharmacyId),
        api.getPharmacyEnquiries(pharmacyId),
        api.getPharmacyProfile(pharmacyId)
      ]);
      setListings(listingsData || []);
      setStats(statsData || {});
      setEnquiries(enquiriesData || []);
      setProfile(profileData || {});
    } catch (err) {
      console.error('Failed to load pharmacy data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [pharmacyId]);

  // Quick stock status update
  const handleQuickStatusChange = async (listingId, newStatus) => {
    try {
      const updated = await api.updateStock(pharmacyId, listingId, { stockStatus: newStatus });
      setListings(prev => prev.map(item => item.listingId === listingId ? updated : item));
      // Refresh stats
      const newStats = await api.getPharmacyStats(pharmacyId);
      setStats(newStats);
      showNotification(`Stock status updated to ${newStatus}`);
    } catch (err) {
      alert(`Error updating stock: ${err.message}`);
    }
  };

  // Delete listing
  const handleDeleteListing = async (listingId, brandName) => {
    if (!window.confirm(`Are you sure you want to remove ${brandName} from your inventory?`)) return;
    try {
      await api.deleteListing(pharmacyId, listingId);
      setListings(prev => prev.filter(item => item.listingId !== listingId));
      const newStats = await api.getPharmacyStats(pharmacyId);
      setStats(newStats);
      showNotification(`${brandName} removed from listings`);
    } catch (err) {
      alert(`Error deleting listing: ${err.message}`);
    }
  };

  // Update enquiry status
  const handleEnquiryStatus = async (enquiryId, status) => {
    try {
      const updated = await api.updateEnquiryStatus(enquiryId, status);
      setEnquiries(prev => prev.map(e => e.id === enquiryId ? updated : e));
      showNotification(`Enquiry marked as ${status}`);
    } catch (err) {
      alert(`Error updating enquiry: ${err.message}`);
    }
  };

  // Update profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const updated = await api.updatePharmacyProfile(pharmacyId, profile);
      setProfile(updated);
      showNotification('Pharmacy profile updated successfully!');
    } catch (err) {
      alert(`Error updating profile: ${err.message}`);
    } finally {
      setSavingProfile(false);
    }
  };

  const showNotification = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const filteredListings = listings.filter(item => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return (
      item.brandName?.toLowerCase().includes(q) ||
      item.genericName?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '28px',
        marginBottom: 28,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: 'linear-gradient(135deg, #10b981, #0ea5e9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#061a29'
          }}>
            <Building2 size={32} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--heading-color)' }}>
                {profile?.name || user?.pharmacyName || 'Pharmacy Dashboard'}
              </h2>
              <span className="status-badge in-stock">
                Verified Chemist
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: 4 }}>
              <span>License: <strong style={{ color: 'var(--text-main)' }}>{profile?.licenseNumber || 'Verified'}</strong></span>
              <span>•</span>
              <span>Area: <strong style={{ color: 'var(--text-main)' }}>{profile?.area || profile?.city || 'Local Store'}</strong></span>
              <span>•</span>
              <span>Hours: <strong style={{ color: 'var(--text-main)' }}>{profile?.openingHours || '24 Hours'}</strong></span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={loadData}
            className="btn btn-secondary btn-sm"
            title="Refresh Inventory"
          >
            <RefreshCw size={15} />
            Refresh
          </button>
          <button
            onClick={onOpenAddListing}
            className="btn btn-primary"
          >
            <Plus size={18} />
            Add Medicine Listing
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {statusMessage && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.2)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          color: '#34d399',
          padding: '12px 20px',
          borderRadius: 'var(--radius-md)',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontWeight: 600,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <CheckCircle2 size={18} />
          {statusMessage}
        </div>
      )}

      {/* 4 Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16,
        marginBottom: 28
      }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-dim)', marginBottom: 8 }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 600 }}>Total Medicines</span>
            <Package size={20} color="var(--accent-cyan)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--heading-color)' }}>
            {stats.totalListings || 0}
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 4 }}>
            In active store inventory
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-dim)', marginBottom: 8 }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 600 }}>In Stock</span>
            <CheckCircle2 size={20} color="#10b981" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399' }}>
            {stats.inStockCount || 0}
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 4 }}>
            Ready for over-the-counter
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-dim)', marginBottom: 8 }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 600 }}>Low Stock Alert</span>
            <AlertTriangle size={20} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24' }}>
            {stats.lowStockCount || 0}
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 4 }}>
            Needs supplier reorder
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-dim)', marginBottom: 8 }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 600 }}>Customer Inquiries</span>
            <MessageSquare size={20} color="#a855f7" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#c084fc' }}>
            {enquiries.length || 0}
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 4 }}>
            Direct hold & stock queries
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: 24
      }}>
        <button
          onClick={() => setActiveTab('inventory')}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'inventory' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
            color: activeTab === 'inventory' ? '#fff' : 'var(--text-muted)',
            padding: '12px 20px',
            fontSize: '0.96rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <Package size={17} />
          Manage Stock ({listings.length})
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'enquiries' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
            color: activeTab === 'enquiries' ? '#fff' : 'var(--text-muted)',
            padding: '12px 20px',
            fontSize: '0.96rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <MessageSquare size={17} />
          Customer Inquiries ({enquiries.length})
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'profile' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
            color: activeTab === 'profile' ? '#fff' : 'var(--text-muted)',
            padding: '12px 20px',
            fontSize: '0.96rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <Building2 size={17} />
          Pharmacy Profile
        </button>
      </div>

      {/* Tab 1: Inventory Table */}
      {activeTab === 'inventory' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          {/* Search inside inventory */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            marginBottom: 20
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'rgba(15, 23, 42, 0.7)',
              padding: '8px 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              width: '100%',
              maxWidth: 380
            }}>
              <Search size={16} color="var(--text-dim)" />
              <input
                type="text"
                placeholder="Filter by medicine or generic..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-main)',
                  width: '100%',
                  fontSize: '0.88rem'
                }}
              />
            </div>

            <div style={{ fontSize: '0.84rem', color: 'var(--text-dim)' }}>
              Showing {filteredListings.length} of {listings.length} medicines
            </div>
          </div>

          {filteredListings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--text-muted)' }}>
              <Package size={42} style={{ opacity: 0.4, marginBottom: 12 }} />
              <h3>No medicines found</h3>
              <p style={{ marginTop: 6, fontSize: '0.9rem' }}>
                {filterQuery ? 'Try matching a different keyword' : 'Click "+ Add Medicine Listing" to start tracking inventory'}
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-dim)' }}>
                    <th style={{ padding: '12px 14px' }}>Medicine Details</th>
                    <th style={{ padding: '12px 14px' }}>Dosage & Strength</th>
                    <th style={{ padding: '12px 14px' }}>Stock Status (1-Click Toggle)</th>
                    <th style={{ padding: '12px 14px' }}>Quantity</th>
                    <th style={{ padding: '12px 14px' }}>Price</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredListings.map((item) => (
                    <tr
                      key={item.listingId}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        transition: 'background 0.15s'
                      }}
                    >
                      {/* Medicine Info */}
                      <td style={{ padding: '14px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--heading-color)', fontSize: '0.96rem' }}>
                          {item.brandName}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {item.genericName}
                        </div>
                      </td>

                      {/* Dosage */}
                      <td style={{ padding: '14px' }}>
                        <span style={{
                          background: 'rgba(255, 255, 255, 0.06)',
                          padding: '3px 8px',
                          borderRadius: 4,
                          fontSize: '0.78rem'
                        }}>
                          {item.dosageForm} • {item.strength}
                        </span>
                      </td>

                      {/* 1-Click Stock Toggle Buttons */}
                      <td style={{ padding: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <button
                            type="button"
                            onClick={() => handleQuickStatusChange(item.listingId, 'IN_STOCK')}
                            style={{
                              padding: '4px 10px',
                              borderRadius: 4,
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              border: item.stockStatus === 'IN_STOCK' ? '1px solid #10b981' : '1px solid transparent',
                              background: item.stockStatus === 'IN_STOCK' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                              color: item.stockStatus === 'IN_STOCK' ? '#34d399' : 'var(--text-dim)'
                            }}
                          >
                            In Stock
                          </button>

                          <button
                            type="button"
                            onClick={() => handleQuickStatusChange(item.listingId, 'LOW_STOCK')}
                            style={{
                              padding: '4px 10px',
                              borderRadius: 4,
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              border: item.stockStatus === 'LOW_STOCK' ? '1px solid #f59e0b' : '1px solid transparent',
                              background: item.stockStatus === 'LOW_STOCK' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                              color: item.stockStatus === 'LOW_STOCK' ? '#fbbf24' : 'var(--text-dim)'
                            }}
                          >
                            Low Stock
                          </button>

                          <button
                            type="button"
                            onClick={() => handleQuickStatusChange(item.listingId, 'OUT_OF_STOCK')}
                            style={{
                              padding: '4px 10px',
                              borderRadius: 4,
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              border: item.stockStatus === 'OUT_OF_STOCK' ? '1px solid #f43f5e' : '1px solid transparent',
                              background: item.stockStatus === 'OUT_OF_STOCK' ? 'rgba(244, 63, 94, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                              color: item.stockStatus === 'OUT_OF_STOCK' ? '#fb7185' : 'var(--text-dim)'
                            }}
                          >
                            Out of Stock
                          </button>
                        </div>
                      </td>

                      {/* Quantity */}
                      <td style={{ padding: '14px', fontWeight: 600 }}>
                        {item.availableQuantity} units
                      </td>

                      {/* Price */}
                      <td style={{ padding: '14px', color: '#34d399', fontWeight: 700 }}>
                        ₹{item.unitPrice ? Number(item.unitPrice).toFixed(2) : '0.00'}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px', textAlign: 'right' }}>
                        <button
                          onClick={() => handleDeleteListing(item.listingId, item.brandName)}
                          className="btn btn-danger btn-sm"
                          title="Remove listing"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Enquiries */}
      {activeTab === 'enquiries' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 16 }}>Customer Stock Inquiries & Hold Requests</h3>
          {enquiries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--text-muted)' }}>
              <MessageSquare size={42} style={{ opacity: 0.4, marginBottom: 12 }} />
              <h3>No enquiries yet</h3>
              <p style={{ marginTop: 6, fontSize: '0.9rem' }}>
                When customers search for medicines and request a stock hold, their inquiries will appear here.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 14 }}>
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '18px 20px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--heading-color)' }}>
                        {enq.customerName}
                      </span>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 4,
                        background: enq.status === 'CONFIRMED' ? 'rgba(16, 185, 129, 0.2)' :
                                   enq.status === 'FULFILLED' ? 'rgba(14, 165, 233, 0.2)' :
                                   'rgba(245, 158, 11, 0.2)',
                        color: enq.status === 'CONFIRMED' ? '#34d399' :
                               enq.status === 'FULFILLED' ? '#38bdf8' :
                               '#fbbf24'
                      }}>
                        {enq.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.86rem', color: '#e2e8f0', marginTop: 4 }}>
                      Requested: <strong style={{ color: 'var(--accent-cyan)' }}>{enq.medicineName}</strong> (Qty: {enq.requestedQuantity || 1})
                    </div>

                    {enq.notes && (
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>
                        Customer note: "{enq.notes}"
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: 8 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Phone size={12} /> {enq.customerPhone}
                      </span>
                      {enq.customerEmail && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Mail size={12} /> {enq.customerEmail}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <a
                      href={`tel:${enq.customerPhone}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <Phone size={13} color="var(--accent-emerald)" />
                      Call Customer
                    </a>
                    <button
                      onClick={() => handleEnquiryStatus(enq.id, 'CONFIRMED')}
                      className="btn btn-outline-emerald btn-sm"
                    >
                      Confirm Hold
                    </button>
                    <button
                      onClick={() => handleEnquiryStatus(enq.id, 'FULFILLED')}
                      className="btn btn-primary btn-sm"
                    >
                      Fulfilled
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Pharmacy Profile Editor */}
      {activeTab === 'profile' && profile && (
        <form onSubmit={handleSaveProfile} className="glass-panel" style={{ padding: '28px', maxWidth: 760 }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 20 }}>Pharmacy Store Profile</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>
                Pharmacy Business Name
              </label>
              <input
                type="text"
                className="input-field"
                value={profile.name || ''}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>
                Drug License Number
              </label>
              <input
                type="text"
                className="input-field"
                value={profile.licenseNumber || ''}
                disabled
                style={{ opacity: 0.65, cursor: 'not-allowed' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>
                Contact Phone
              </label>
              <input
                type="text"
                className="input-field"
                value={profile.phone || ''}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>
                Email Address
              </label>
              <input
                type="email"
                className="input-field"
                value={profile.email || ''}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>
                Locality / Area
              </label>
              <input
                type="text"
                className="input-field"
                value={profile.area || ''}
                onChange={(e) => setProfile({ ...profile, area: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>
                PIN Code
              </label>
              <input
                type="text"
                className="input-field"
                value={profile.pincode || ''}
                onChange={(e) => setProfile({ ...profile, pincode: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>
              Full Store Address Line
            </label>
            <input
              type="text"
              className="input-field"
              value={profile.addressLine || ''}
              onChange={(e) => setProfile({ ...profile, addressLine: e.target.value })}
              required
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>
              Operating Hours (e.g. 24 Hours or 08:00 AM - 11:00 PM)
            </label>
            <input
              type="text"
              className="input-field"
              value={profile.openingHours || ''}
              onChange={(e) => setProfile({ ...profile, openingHours: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={savingProfile}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <Save size={16} />
            {savingProfile ? 'Saving Changes...' : 'Save Profile Details'}
          </button>
        </form>
      )}
    </div>
  );
}
