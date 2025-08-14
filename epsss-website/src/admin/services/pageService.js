// src/admin/services/pageService.js
import api from './api';

const pageService = {
  getPage: (pageSlug) => api.get(`/pages/${pageSlug}`),
  updatePageContent: (pageSlug, content) => api.put(`/pages/${pageSlug}`, content),
  createPage: (pageData) => api.post('/pages', pageData),
  deletePage: (pageSlug) => api.delete(`/pages/${pageSlug}`),
  getAllPages: () => api.get('/pages'),
  getPageTemplates: () => api.get('/page-templates'),
  createPageTemplate: (templateData) => api.post('/page-templates', templateData),
};

export default pageService;