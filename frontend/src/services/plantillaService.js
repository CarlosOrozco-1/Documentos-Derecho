import api from './api';

export const getPlantillas = () => api.get('/plantillas/');
export const getPlantilla = (id) => api.get(`/plantillas/${id}`);
export const createPlantilla = (data) => api.post('/plantillas/', data);
export const updatePlantilla = (id, data) => api.put(`/plantillas/${id}`, data);
export const deletePlantilla = (id) => api.delete(`/plantillas/${id}`);
