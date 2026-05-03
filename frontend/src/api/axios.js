import axios from 'axios';

// Configuration de base pour Axios
const api = axios.create({
  // Utilise l'URL définie dans le fichier .env, sinon utilise http://localhost:8000 par défaut
  baseURL: (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000') + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
