import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const apiService = {
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data).then(res => res.data),

  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data).then(res => res.data),

  createProject: (data: { name: string; description?: string }) =>
    api.post('/projects', data).then(res => res.data),

  getProjects: () =>
    api.get('/projects').then(res => res.data),
  
  deleteProject: (id: string) =>
    api.delete(`/projects/${id}`).then(res => res.data),

  updateProject: (id: string, data: { name: string }) =>
  api.put(`/projects/${id}`, data).then(res => res.data),

};