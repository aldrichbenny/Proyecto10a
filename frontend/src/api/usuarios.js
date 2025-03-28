import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

//////Roles//////
export const getRoles = () => {
    axios.get(`${BASE_URL}/Roles/`);
};

export const createRoles = (data) => {
    axios.post(`${BASE_URL}/Roles/`, data);
};

export const getDetailRoles = (id) => {
    axios.get(`${BASE_URL}/Roles/${id}`);
};

export const updateRoles = (id,data) => {
    axios.put(`${BASE_URL}/Roles/${id}`, data);
};

export const deleteRoles = (id) => {
    axios.delete(`${BASE_URL}/Roles/${id}`);
};

//////Usuario//////
export const getUsuario = () => {
    axios.get(`${BASE_URL}/Usuario/`);
};

export const createUsuario = (data) => {
    axios.post(`${BASE_URL}/Usuario/`, data);
};

export const getDetailsUsuario = (id) => {
    axios.get(`${BASE_URL}/Usuario/${id}`);
};

export const updateUsuario = (id,data) => {
    axios.put(`${BASE_URL}/Usuario/${id}`, data);
};

export const deleteUsuario = (id) => {
    axios.delete(`${BASE_URL}/Usuario/${id}`);
};

//////Perfil//////
export const getPerfil = () => {
    axios.get(`${BASE_URL}/Perfil/`);
};

export const createPerfil = (data) => {
    axios.post(`${BASE_URL}/Perfil/`, data);
};

export const getDetailPerfil = (id) => {
    axios.get(`${BASE_URL}/Perfil/${id}`);
};

export const updatePerfil = (id,data) => {
    axios.put(`${BASE_URL}/Perfil/${id}`, data);
};

export const deletePerfil = (id) => {
    axios.delete(`${BASE_URL}/Perfil/${id}`);
};

//////Preguntas Seguridad//////
export const getPreguntas = () => {
    axios.get(`${BASE_URL}/Preguntasseguridad/`);
};

export const createPreguntas = (data) => {
    axios.post(`${BASE_URL}/Preguntasseguridad/`, data);
};

export const getDetailPreguntas = (id) => {
    axios.get(`${BASE_URL}/Preguntasseguridad/${id}`);
};

export const updatePreguntas = (id,data) => {
    axios.put(`${BASE_URL}/Preguntasseguridad/${id}`, data);
};

export const deletePreguntas = (id) => {
    axios.delete(`${BASE_URL}/Preguntasseguridad/${id}`);
};