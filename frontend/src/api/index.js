import api from './axios';

// ============================================================================
// SERVICES API (Lien avec le Backend)
// ============================================================================

// --- Authentification ---
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
};

// --- Réservations (Salles) ---
export const bookingsAPI = {
  getAll: () => api.get('/bookings'),
  create: (data) => api.post('/bookings', data),
  // Ajoutez les autres routes selon les besoins...
};

// --- Signalements (Incidents) ---
export const incidentsAPI = {
  getAll: () => api.get('/incidents'),
  create: (data) => api.post('/incidents', data),
};

// --- Données Capteurs (Smart Sensors) ---
export const sensorsAPI = {
  getLatest: (roomId) => api.get(`/sensors/latest/${roomId}`),
};
