import api from "@/api/api";

// Function to Get All Doctors
export const getUserId = (): string | null => {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(/user_id=([^;]+)/);
  return match ? match[1] : null;
};

export const getAppointmentsByDoctor = async () => {
  try {
    const res = await api.get(`/appointments/doctor`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDoctorAppointments = async () => {
  try {
    const res = await api.get(`/appointments/doctor`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createNewApp = async (data: any) => {
  try {
    const res = await api.post(`/appointments`, data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error; // Important to throw so react-query can catch it
  }
};

// Update your getAllAppointments function to accept pagination parameters
export const getAllAppointments = async (params = {}) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      doctorId,
      patientId,
      startDate,
      endDate,
    } = params;

    // Build query parameters
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Add optional parameters if provided
    if (status) queryParams.append("status", status);
    if (doctorId) queryParams.append("doctorId", doctorId);
    if (patientId) queryParams.append("patientId", patientId);
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);

    const response = await api.get(`/appointments?${queryParams.toString()}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

export const changeAppointmentStatus = async (id: any, data: any)=>{
  try {
    const res = await api.put(`/appointments/${id}/status`, data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}