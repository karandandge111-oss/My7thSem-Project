// API client for Medicine Availability Finder
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Generic request helper with error handling
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `HTTP error ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.message) errorMessage = errorData.message;
      } catch (e) {
        // use default error message
      }
      throw new Error(errorMessage);
    }

    // Return empty object for 204 No Content
    if (response.status === 204) return {};
    return await response.json();
  } catch (error) {
    console.warn(`API call failed to ${endpoint}:`, error.message);
    throw error;
  }
}

export const api = {
  // Search Listings
  searchListings: async ({ query = '', area = '', pincode = '', dosageForm = '', stockStatus = '' } = {}) => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (area && area !== 'ALL') params.append('area', area);
    if (pincode && pincode !== 'ALL') params.append('pincode', pincode);
    if (dosageForm && dosageForm !== 'ALL') params.append('dosageForm', dosageForm);
    if (stockStatus && stockStatus !== 'ALL') params.append('stockStatus', stockStatus);

    const queryString = params.toString();
    return await request(`/search${queryString ? `?${queryString}` : ''}`);
  },

  // Metadata
  getMetadata: async () => {
    return await request('/metadata');
  },

  // Medicine catalog
  getMedicines: async (query = '') => {
    const params = query ? `?query=${encodeURIComponent(query)}` : '';
    return await request(`/medicines${params}`);
  },

  // Auth
  login: async (credentials) => {
    return await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: async (userData) => {
    return await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Pharmacy Portal
  getPharmacyListings: async (pharmacyId) => {
    return await request(`/pharmacy/${pharmacyId}/listings`);
  },

  createOrUpdateListing: async (pharmacyId, listingData) => {
    return await request(`/pharmacy/${pharmacyId}/listings`, {
      method: 'POST',
      body: JSON.stringify(listingData),
    });
  },

  updateStock: async (pharmacyId, listingId, updateData) => {
    return await request(`/pharmacy/${pharmacyId}/listings/${listingId}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData),
    });
  },

  deleteListing: async (pharmacyId, listingId) => {
    return await request(`/pharmacy/${pharmacyId}/listings/${listingId}`, {
      method: 'DELETE',
    });
  },

  getPharmacyStats: async (pharmacyId) => {
    return await request(`/pharmacy/${pharmacyId}/stats`);
  },

  getPharmacyProfile: async (pharmacyId) => {
    return await request(`/pharmacy/${pharmacyId}/profile`);
  },

  updatePharmacyProfile: async (pharmacyId, profileData) => {
    return await request(`/pharmacy/${pharmacyId}/profile`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Customer Inquiries
  createEnquiry: async (enquiryData) => {
    return await request('/enquiries', {
      method: 'POST',
      body: JSON.stringify(enquiryData),
    });
  },

  getPharmacyEnquiries: async (pharmacyId) => {
    return await request(`/enquiries/pharmacy/${pharmacyId}`);
  },

  updateEnquiryStatus: async (enquiryId, status) => {
    return await request(`/enquiries/${enquiryId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};
