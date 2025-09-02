import api from './api';

const aboutService = {
  get: () => api.get('/about'),
  create: (data) => api.post('/about', data),
  update: (data) => api.put('/about', data),
};

export default aboutService;

