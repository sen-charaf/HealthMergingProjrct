import api from "@/api/api";

export const getPatientById = async (id: any) => {
  try {
    const res = await api.get(`/patients/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};
export const getAllPatients = async () => {
  try {
    const res = await api.get(`/patients`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export const getPatientByName = async (name: string) => {
  try {
    const res = await api.get(`/patients/name/${name}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};
