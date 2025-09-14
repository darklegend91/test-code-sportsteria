// import api from "./api";

// export const getStudentEquipments = () => api.get("/student/equipments");
// export const getAdminEquipments = () => api.get("/admin/equipments");
// export const addEquipment = (payload) => api.post("/admin/equipments", payload);
// export const deleteEquipment = (id) => api.delete(`/admin/equipments/${id}`);
//
import axios from "axios";

const API_URL = "http://localhost:8080/api/admin";

export const getAdminEquipments = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/equipments`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching equipments:", error);
    throw error;
  }
};
