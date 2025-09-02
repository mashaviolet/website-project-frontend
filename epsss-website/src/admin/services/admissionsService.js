import api from './api';

const base = '/admissions';

const admissionsService = {
  get: () => api.get(base),
  create: (data) => api.post(base, data),
  update: (data) => api.put(base, data),
};

export default admissionsService;

