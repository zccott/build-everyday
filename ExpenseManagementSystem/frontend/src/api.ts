import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: (data: any) => api.post('/auth/login', data, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }),
  register: (data: any) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  updateMe: (data: any) => api.put('/auth/me', data),
};

export const expenses = {
  getAll: (params: any) => api.get('/expenses/', { params }),
  create: (data: any) => api.post('/expenses/', data),
  update: (id: number, data: any) => api.put(`/expenses/${id}`, data),
  delete: (id: number) => api.delete(`/expenses/${id}`),
};

export const categories = {
  getAll: () => api.get('/categories/'),
  create: (data: any) => api.post('/categories/', data),
  seed: () => api.post('/categories/seed'),
};

export const analytics = {
  getSummary: () => api.get('/analytics/summary'),
  getTrends: () => api.get('/analytics/trends'),
  getDistribution: () => api.get('/analytics/category-distribution'),
};

export default api;
