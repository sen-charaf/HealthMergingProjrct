import api from "@/api/api";

export const getHealthCategories = async () => {
  try {
    const res = await api.get(`/health-condition/categories`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error; // Important to throw so react-query can catch it
  }
};

export const getHealthConditions = async () => {
  try {
    const res = await api.get(`/health-condition`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error; // Important to throw so react-query can catch it
  }
};