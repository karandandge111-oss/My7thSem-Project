import React, { useState, useEffect } from 'react';
import { X, Plus, PackageCheck, AlertCircle } from 'lucide-react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function AddListingModal({ isOpen, onClose, onListingAdded }) {
  const { user } = useAuth();
  const pharmacyId = user?.pharmacyId || 1;

  const [catalogMedicines, setCatalogMedicines] = useState([]);
  const [useExisting, setUseExisting] = useState(false);
  const [selectedMedId, setSelectedMedId] = useState('');

  const [formData, setFormData] = useState({
    brandName: '',
    genericName: '',
    manufacturer: '',
    category: 'General Healthcare',
    dosageForm: 'Tablet',
    strength: '500 mg',
    prescriptionRequired: false,
    stockStatus: 'IN_STOCK',
    availableQuantity: 50,
    unitPrice: 25.00,
    discountPercent: 0,
    batchNumber: '',
    notes: 'Available for immediate store pickup'
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      api.getMedicines()
        .then(res => setCatalogMedicines(res || []))
        .catch(err => console.warn('Could not load catalog medicines:', err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectMedicine = (medId) => {
    setSelectedMedId(medId);
    if (!medId) return;
    const found = catalogMedicines.find(m => m.id === Number(medId));
    if (found) {
      setFormData(prev => ({
        ...prev,
        medicineId: found.id,
        brandName: found.brandName,
        genericName: found.genericName,
        manufacturer: found.manufacturer || '',
        category: found.category || 'General Healthcare',
        dosageForm: found.dosageForm,
        strength: found.strength,
        prescriptionRequired: found.prescriptionRequired || false
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        availableQuantity: Number(formData.availableQuantity),
        unitPrice: Number(formData.unitPrice),
        discountPercent: Number(formData.discountPercent || 0),
        medicineId: selectedMedId ? Number(selectedMedId) : null
      };

      const result = await api.createOrUpdateListing(pharmacyId, payload);
      if (onListingAdded) onListingAdded(result);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to add medicine listing');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 620, padding: 28 }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'rgba(14, 165, 233, 0.15)',
              color: 'var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <PackageCheck size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--heading-color)' }}>Add Medicine to Stock</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Report medicine stock status and price for customer search
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

        <form onSubmit={handleSubmit}>
          {/* Catalog Quick Select Option */}
          {catalogMedicines.length > 0 && (
            <div style={{
              background: 'rgba(15, 23, 42, 0.6)',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              marginBottom: 16,
              border: '1px solid var(--border-subtle)'
            }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: 6 }}>
                Select from standard medicine catalog (optional autofill):
              </label>
              <select
                className="input-field"
                value={selectedMedId}
                onChange={(e) => handleSelectMedicine(e.target.value)}
              >
                <option value="">-- Or enter medicine details manually below --</option>
                {catalogMedicines.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.brandName} ({m.genericName}) - {m.strength} {m.dosageForm}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Form fields in grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 5 }}>
                Brand Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Paracetamol, Dolo 650"
                className="input-field"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 5 }}>
                Generic Chemical Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Paracetamol, Amoxicillin"
                className="input-field"
                value={formData.genericName}
                onChange={(e) => setFormData({ ...formData, genericName: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 5 }}>
                Dosage Form *
              </label>
              <select
                className="input-field"
                value={formData.dosageForm}
                onChange={(e) => setFormData({ ...formData, dosageForm: e.target.value })}
              >
                <option value="Tablet">Tablet</option>
                <option value="Capsule">Capsule</option>
                <option value="Syrup">Syrup</option>
                <option value="Injection">Injection</option>
                <option value="Ointment">Ointment</option>
                <option value="Inhaler">Inhaler</option>
                <option value="Drops">Drops</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 5 }}>
                Strength *
              </label>
              <input
                type="text"
                placeholder="e.g. 500 mg, 100 ml"
                className="input-field"
                value={formData.strength}
                onChange={(e) => setFormData({ ...formData, strength: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 5 }}>
                Stock Status *
              </label>
              <select
                className="input-field"
                value={formData.stockStatus}
                onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value })}
              >
                <option value="IN_STOCK">In Stock</option>
                <option value="LOW_STOCK">Low Stock</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 5 }}>
                Available Count *
              </label>
              <input
                type="number"
                min="0"
                className="input-field"
                value={formData.availableQuantity}
                onChange={(e) => setFormData({ ...formData, availableQuantity: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 5 }}>
                Unit Price (₹) *
              </label>
              <input
                type="number"
                step="0.25"
                min="0"
                className="input-field"
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 5 }}>
                Discount %
              </label>
              <input
                type="number"
                min="0"
                max="100"
                className="input-field"
                value={formData.discountPercent}
                onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 5 }}>
                Manufacturer / Brand Maker
              </label>
              <input
                type="text"
                placeholder="e.g. Micro Labs, GSK"
                className="input-field"
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 5 }}>
                Batch Number
              </label>
              <input
                type="text"
                placeholder="e.g. B-2024-X"
                className="input-field"
                value={formData.batchNumber}
                onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
              />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 5 }}>
              Public Note for Customers
            </label>
            <input
              type="text"
              placeholder="e.g. Fresh stock, cold storage maintained"
              className="input-field"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <input
              type="checkbox"
              id="rxRequired"
              checked={formData.prescriptionRequired}
              onChange={(e) => setFormData({ ...formData, prescriptionRequired: e.target.checked })}
              style={{ width: 18, height: 18, cursor: 'pointer' }}
            />
            <label htmlFor="rxRequired" style={{ fontSize: '0.86rem', color: '#e2e8f0', cursor: 'pointer' }}>
              Doctor's Prescription Required (Schedule H/H1)
            </label>
          </div>

          {/* Modal Actions */}
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
              {submitting ? 'Saving Listing...' : 'Add to Inventory'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
