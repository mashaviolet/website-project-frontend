import api from './api';

const base = '/news';

const newsService = {
  list: () => api.get(`${base}/`),
  create: (data) => api.post(`${base}/`, data),
  update: (id, data) => api.put(`${base}/update/${id}`, data),
  remove: (id) => api.delete(`${base}/delete/${id}`),
};

export default newsService;

