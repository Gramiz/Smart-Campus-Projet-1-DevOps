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
  getAll: (params) => api.get('/bookings', { params }),
  getMyBookings: () => api.get('/bookings', { params: { mine: true } }),
  create: (data) => api.post('/bookings', data),
  cancel: (id) => api.delete(`/bookings/${id}`),
};

// --- Salles (Rooms) ---
export const roomsAPI = {
  getAll: () => api.get('/rooms'),
  getAvailable: (start, end) => api.get('/rooms/available', { params: { start, end } }),
};

// --- Signalements (Incidents) ---
export const incidentsAPI = {
  getAll: (params) => api.get('/incidents', { params }),
  getMyIncidents: () => api.get('/incidents', { params: { mine: true } }),
  create: (data) => api.post('/incidents', data),
};

// --- Données Capteurs (Smart Sensors) ---
export const sensorsAPI = {
  getByRoom: (roomId) => api.get(`/sensors`, { params: { room_id: roomId } }),
  getLatestData: (sensorId) => api.get(`/sensors/${sensorId}/data`, { params: { limit: 1 } }),
};
