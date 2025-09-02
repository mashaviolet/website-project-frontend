import api from './api';

const base = '/contact';

const contactService = {
  list: () => api.get(`${base}/`),
  update: (id, data) => api.put(`${base}/update/${id}`, data),
  remove: (id) => api.delete(`${base}/delete/${id}`),
};

export default contactService;

