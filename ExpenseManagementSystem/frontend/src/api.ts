import axios from 'axios';
import type { User, Expense, Category, Summary, Trend, CategoryDistribution } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

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
  login: (data: URLSearchParams) => api.post<{ access_token: string }>('/auth/login', data, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }),
  register: (data: Partial<User> & { password?: string }) => api.post<User>('/auth/register', data),
  getMe: () => api.get<User>('/auth/me'),
  updateMe: (data: Partial<User> & { password?: string }) => api.put<User>('/auth/me', data),
};

export const expenses = {
  getAll: (params: { search?: string; category_id?: string; limit?: number; skip?: number }) => 
    api.get<Expense[]>('/expenses/', { params }),
  create: (data: Omit<Expense, 'id' | 'user_id'>) => api.post<Expense>('/expenses/', data),
  update: (id: number, data: Partial<Expense>) => api.put<Expense>(`/expenses/${id}`, data),
  delete: (id: number) => api.delete<{ message: string }>(`/expenses/${id}`),
};

export const categories = {
  getAll: () => api.get<Category[]>('/categories/'),
  create: (data: Omit<Category, 'id' | 'user_id'>) => api.post<Category>('/categories/', data),
  seed: () => api.post<{ message: string }>('/categories/seed'),
};

export const analytics = {
  getSummary: () => api.get<Summary>('/analytics/summary'),
  getTrends: () => api.get<Trend[]>('/analytics/trends'),
  getDistribution: () => api.get<CategoryDistribution[]>('/analytics/category-distribution'),
};

export default api;
