import api from './api';

export const getCampos = () => api.get('/campos/');
export const getCampo = (id) => api.get(`/campos/${id}`);
export const getCamposPorPlantilla = (plantillaId) => api.get(`/campos/plantilla/${plantillaId}`);
export const createCampo = (data) => api.post('/campos/', data);
export const updateCampo = (id, data) => api.put(`/campos/${id}`, data);
export const deleteCampo = (id) => api.delete(`/campos/${id}`);
