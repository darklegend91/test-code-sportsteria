import api from "./api";
import axios from "axios";

// ----------------- STUDENT -----------------
export const createStudentRequest = (payload) => api.post("/requests/student", payload);
export const getStudentRequests = () => api.get("/requests/student");

// ----------------- ADMIN -----------------
export const getAllRequestsAdmin = () => api.get("/requests/admin");
export const approveRequest = (id) => api.put(`/requests/admin/${id}/approve`);
export const rejectRequest = (id) => api.put(`/requests/admin/${id}/reject`);