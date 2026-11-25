/**
 * LovoPet Consultation & Veterinary API Client
 * Connects frontend to backend /api/consultations, /api/pets, and /api/vet/consultations
 */

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Helper to retrieve token from localStorage or session
export const getStoredToken = () => {
  return (
    localStorage.getItem("accessToken") ||
    localStorage.getItem("lovopet_vet_token") ||
    ""
  );
};

// Common fetch wrapper with JSON, error handling, and silent refresh attempt
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  let token = options.token || getStoredToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let res = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  // If token expired (401), try to refresh token via cookie
  if (res.status === 401 && !options._retry) {
    try {
      const refreshRes = await fetch(`${API_BASE}/auth/refresh-token`, {
        method: "GET",
        credentials: "include",
      });
      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        if (refreshData.access_token) {
          localStorage.setItem("accessToken", refreshData.access_token);
          headers["Authorization"] = `Bearer ${refreshData.access_token}`;
          res = await fetch(url, {
            ...options,
            _retry: true,
            headers,
            credentials: "include",
          });
        }
      }
    } catch {
      // refresh failed, continue to standard error handling
    }
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errorMsg = data?.message || `Request failed with status ${res.status}`;
    const err = new Error(errorMsg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const consultationApi = {
  // ==================== USER / CUSTOMER ENDPOINTS ====================

  /** List all active veterinarians */
  getVets: async () => {
    return request("/api/consultations/vets");
  },

  /** Get free/booked slots for a vet on a specific date (YYYY-MM-DD) */
  getVetSlots: async (vetId, date) => {
    return request(`/api/consultations/vets/${vetId}/slots?date=${encodeURIComponent(date)}`);
  },

  /** Book a consultation (user must be authenticated) */
  bookConsultation: async (bookingData, token) => {
    return request("/api/consultations", {
      method: "POST",
      body: JSON.stringify(bookingData),
      token,
    });
  },

  /** Get the logged-in customer's consultation history and upcoming bookings */
  getMyConsultations: async (token) => {
    return request("/api/consultations/my", {
      method: "GET",
      token,
    });
  },

  /** Get a single consultation details for customer */
  getConsultationById: async (id, token) => {
    return request(`/api/consultations/${id}`, {
      method: "GET",
      token,
    });
  },

  /** Cancel a consultation booking */
  cancelConsultation: async (id, token) => {
    return request(`/api/consultations/${id}/cancel`, {
      method: "PATCH",
      token,
    });
  },

  // ==================== PET MANAGEMENT ENDPOINTS ====================

  /** Get list of customer's registered pets */
  getPets: async (token) => {
    return request("/api/pets", {
      method: "GET",
      token,
    });
  },

  /** Create a new pet record */
  createPet: async (petData, token) => {
    return request("/api/pets", {
      method: "POST",
      body: JSON.stringify(petData),
      token,
    });
  },

  /** Delete a pet record */
  deletePet: async (petId, token) => {
    return request(`/api/pets/${petId}`, {
      method: "DELETE",
      token,
    });
  },

  // ==================== VET ADMIN ENDPOINTS ====================

  /** Get vet dashboard statistics (pending, today, completed, total) */
  getVetStats: async (token) => {
    return request("/api/vet/consultations/stats", {
      method: "GET",
      token,
    });
  },

  /** List requests for the logged in veterinarian with optional filters */
  getVetConsultations: async (params = {}, token) => {
    const query = new URLSearchParams();
    if (params.status) query.set("status", params.status);
    if (params.date) query.set("date", params.date);
    if (params.page) query.set("page", params.page);
    if (params.limit) query.set("limit", params.limit);

    const queryString = query.toString() ? `?${query.toString()}` : "";
    return request(`/api/vet/consultations${queryString}`, {
      method: "GET",
      token,
    });
  },

  /** Get full details of a specific consultation request */
  getVetConsultationDetails: async (id, token) => {
    return request(`/api/vet/consultations/${id}`, {
      method: "GET",
      token,
    });
  },

  /** Update consultation status: accept, reject, reschedule, or complete */
  updateConsultationStatus: async (id, payload, token) => {
    return request(`/api/vet/consultations/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      token,
    });
  },

  /** Update vet practice availability schedule */
  updateVetAvailability: async (payload, token) => {
    return request("/api/vet/availability", {
      method: "PUT",
      body: JSON.stringify(payload),
      token,
    });
  },

  /** Update vet profile & account settings */
  updateVetProfile: async (payload, token) => {
    return request("/api/vet/profile", {
      method: "PUT",
      body: JSON.stringify(payload),
      token,
    });
  },
};

export default consultationApi;
