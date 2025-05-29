// utils/Specialities.ts
import api from "@/api/api";

/**
 * Get specialties filtered by condition IDs
 * @param conditionIds Array of health condition IDs
 * @returns Array of filtered specialties
 */
export const getSpecialities = async (conditionIds: string[]) => {
  try {
    const params = new URLSearchParams();
    conditionIds.forEach(id => params.append('conditions', id));
    console.log("params.toString(): ",params.toString());
    
    const res = await api.get(`/specialties?${params.toString()}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching filtered specialties:", error);
    throw error;
  }
};

/**
 * Get all specialties without filtering
 * @returns Array of all specialties
 */
export const getAllSpecialities = async () => {
  try {
    const res = await api.get('/specialties/all');
    return res.data;
  } catch (error) {
    console.error("Error fetching all specialties:", error);
    throw error;
  }
};

export default {
  getSpecialities,
  getAllSpecialities
};