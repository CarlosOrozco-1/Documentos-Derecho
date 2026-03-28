import api from './api';

export const getDocumentos = () => api.get('/documentos/');
export const getDocumento = (id) => api.get(`/documentos/${id}`);
export const createDocumento = (data) => api.post('/documentos/', data);
export const updateDocumento = (id, data) => api.put(`/documentos/${id}`, data);
export const deleteDocumento = (id) => api.delete(`/documentos/${id}`);
export const generarDocumento = (data) => api.post('/generar/', data);
