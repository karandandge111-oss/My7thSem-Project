import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import SearchHero from './components/SearchHero';
import FilterBar from './components/FilterBar';
import ListingCard from './components/ListingCard';
import PharmacyPortal from './components/PharmacyPortal';
import AddListingModal from './components/AddListingModal';
import EnquiryModal from './components/EnquiryModal';
import AuthModal from './components/AuthModal';
import SettingsModal from './components/SettingsModal';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import { api } from './api/client';
import { useAuth } from './context/AuthContext';
import { Search, Loader2, AlertCircle, Sparkles, Building2, HelpCircle } from 'lucide-react';

export default function App() {
  const { user, isPharmacyOwner } = useAuth();

  // Navigation View
  const [activeView, setActiveView] = useState('search'); // 'search' or 'dashboard'

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('ALL');
  const [pincode, setPincode] = useState('ALL');
  const [stockFilter, setStockFilter] = useState('ALL');
  const [dosageFilter, setDosageFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('DEFAULT');

  // Metadata
  const [areas, setAreas] = useState([]);
  const [pincodes, setPincodes] = useState([]);
  const [dosageForms, setDosageForms] = useState([]);

  // Results State
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialRole, setAuthInitialRole] = useState('customer');
  const [addListingModalOpen, setAddListingModalOpen] = useState(false);
  const [enquiryModalListing, setEnquiryModalListing] = useState(null);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  // Load Metadata once
  useEffect(() => {
    api.getMetadata()
      .then(data => {
        if (data) {
          if (data.areas) setAreas(data.areas);
          if (data.pincodes) setPincodes(data.pincodes);
          if (data.dosageForms) setDosageForms(data.dosageForms);
        }
      })
      .catch(err => console.warn('Could not load metadata from API:', err.message));
  }, []);

  // Fetch search listings
  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.searchListings({
        query: searchQuery,
        area: selectedArea,
        pincode: pincode,
        dosageForm: dosageFilter,
        stockStatus: stockFilter
      });
      setListings(data || []);
    } catch (err) {
      console.error('Search request failed:', err);
      setError('Unable to reach backend REST server. Please ensure Spring Boot is running on port 8080.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedArea, pincode, stockFilter, dosageFilter]);

  // Debounced auto-search when query or filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchListings();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchListings]);

  // Sort logic
  const sortedListings = [...listings].sort((a, b) => {
    if (sortBy === 'PRICE_ASC') {
      const priceA = a.effectivePrice || a.unitPrice || 0;
      const priceB = b.effectivePrice || b.unitPrice || 0;
      return priceA - priceB;
    }
    if (sortBy === 'PRICE_DESC') {
      const priceA = a.effectivePrice || a.unitPrice || 0;
      const priceB = b.effectivePrice || b.unitPrice || 0;
      return priceB - priceA;
    }
    if (sortBy === 'RECENT') {
      const dateA = a.lastReportedAt ? new Date(a.lastReportedAt) : 0;
      const dateB = b.lastReportedAt ? new Date(b.lastReportedAt) : 0;
      return dateB - dateA;
    }
    // DEFAULT: In Stock first, then Low Stock, then Out of Stock
    const statusOrder = { IN_STOCK: 1, LOW_STOCK: 2, OUT_OF_STOCK: 3 };
    const orderA = statusOrder[a.stockStatus] || 4;
    const orderB = statusOrder[b.stockStatus] || 4;
    return orderA - orderB;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedArea('ALL');
    setPincode('ALL');
    setStockFilter('ALL');
    setDosageFilter('ALL');
    setSortBy('DEFAULT');
  };

  const handleOpenAuth = (roleType) => {
    setAuthInitialRole(roleType);
    setAuthModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenAuth={handleOpenAuth}
        onOpenAddListing={() => setAddListingModalOpen(true)}
        onOpenSettings={() => setSettingsModalOpen(true)}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {activeView === 'dashboard' && isPharmacyOwner ? (
          <PharmacyPortal
            onOpenAddListing={() => setAddListingModalOpen(true)}
          />
        ) : (
          <>
            {/* Search Hero Section */}
            <SearchHero
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
              pincode={pincode}
              setPincode={setPincode}
              areas={areas}
              pincodes={pincodes}
              onSearch={fetchListings}
              totalResults={sortedListings.length}
            />

            {/* Filter Bar */}
            <FilterBar
              stockFilter={stockFilter}
              setStockFilter={setStockFilter}
              dosageFilter={dosageFilter}
              setDosageFilter={setDosageFilter}
              dosageForms={dosageForms}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onReset={handleResetFilters}
              totalResults={sortedListings.length}
            />

            {/* Error Message */}
            {error && (
              <div style={{ maxWidth: 1280, margin: '0 auto 24px', padding: '0 24px' }}>
                <div style={{
                  background: 'rgba(244, 63, 94, 0.15)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  color: '#fda4af',
                  padding: '14px 20px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12
                }}>
                  <AlertCircle size={20} />
                  <div>
                    <strong>Connection Note:</strong> {error}
                  </div>
                </div>
              </div>
            )}

            {/* Listings Grid */}
            <div style={{ maxWidth: 1280, margin: '0 auto 48px', padding: '0 24px' }}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
                  <Loader2 size={40} className="animate-spin" color="var(--accent-cyan)" style={{ margin: '0 auto 16px' }} />
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--heading-color)' }}>
                    Searching nearby pharmacy inventories...
                  </div>
                </div>
              ) : sortedListings.length === 0 ? (
                <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 24px' }}>
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: 'var(--text-dim)'
                  }}>
                    <Search size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--heading-color)', marginBottom: 8 }}>
                    No Pharmacy Listings Found
                  </h3>
                  <p style={{ color: 'var(--text-muted)', maxWidth: 460, margin: '0 auto 24px', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    No pharmacies reported this medicine with your current filter criteria ({selectedArea !== 'ALL' ? `in ${selectedArea}` : 'any area'}).
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="btn btn-primary"
                  >
                    Clear Filters & Show All Medicines
                  </button>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                  gap: 20
                }}>
                  {sortedListings.map((listing) => (
                    <ListingCard
                      key={listing.listingId}
                      listing={listing}
                      onEnquire={(item) => setEnquiryModalListing(item)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* About Us Section */}
            <AboutSection 
              onExploreSearch={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                const searchInput = document.querySelector('input[type="text"]');
                if (searchInput) searchInput.focus();
              }}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialRole={authInitialRole}
      />

      <AddListingModal
        isOpen={addListingModalOpen}
        onClose={() => setAddListingModalOpen(false)}
        onListingAdded={() => {
          fetchListings();
        }}
      />

      <EnquiryModal
        isOpen={!!enquiryModalListing}
        onClose={() => setEnquiryModalListing(null)}
        listing={enquiryModalListing}
      />

      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />
    </div>
  );
}

