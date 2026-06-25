import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: { "Content-Type": "application/json" },
});

// CONTRACTS
export const getContracts = () => api.get("/contracts");
export const createContract = (data: any) => api.post("/contracts", data);
export const updateContract = (id: number, data: any) => api.put(`/contracts/${id}`, data);
export const deleteContract = (id: number) => api.delete(`/contracts/${id}`);

// POINTS
export const getPoints = () => api.get("/points");
export const createPoint = (data: any) => api.post("/points", data);
export const updatePoint = (id: string, data: any) => api.put(`/points/${id}`, data);
export const deletePoint = (id: string) => api.delete(`/points/${id}`);

// LOGIN
export const loginUser = (data: any) => api.post("/login", data);

export default api;