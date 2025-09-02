import api from './api';

const base = '/gallery';

const galleryService = {
  list: () => api.get(base),
  create: (data) => api.post(base, data),
  update: (id, data) => api.put(`${base}/${id}`, data),
  remove: (id) => api.delete(`${base}/${id}`),
};

export default galleryService;

