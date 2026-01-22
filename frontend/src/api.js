import axios from 'axios';

const API_URL = 'https://taskmaster-backend-x592.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (username, email, password) =>
    api.post('/auth/register/', { username, email, password }),
  login: (username, password) =>
    api.post('/auth/login/', { username, password }),
};

export const tasksAPI = {
  getTasks: () => api.get('/tasks/'),
  createTask: (task) => api.post('/tasks/', task),
  updateTask: (id, task) => api.put(`/tasks/${id}/`, task),
  deleteTask: (id) => api.delete(`/tasks/${id}/`),
};

export default api;