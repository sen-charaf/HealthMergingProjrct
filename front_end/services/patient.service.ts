import { apiService } from './api.service';
import { ICreatePatientDto, IUpdatePatientDto, IPatient } from '../types/patient.types';

const BASE_URL = '/patients';

export  const  patientService = {
  // Get all patients
  async getAllPatients(): Promise<IPatient[]> {
    return apiService.get<IPatient[]>(BASE_URL);
  },

  // Get patient by ID
  async getPatientById(id: number): Promise<IPatient> {
    return apiService.get<IPatient>(`${BASE_URL}/${id}`);
  },

  // Create new patient
  async createPatient(data: ICreatePatientDto): Promise<IPatient> {
    return apiService.post<IPatient>(BASE_URL, data);
  },

  // Update patient
  async updatePatient(id: number, data: IUpdatePatientDto): Promise<IPatient> {
    return apiService.put<IPatient>(`${BASE_URL}/${id}`, data);
  },

  // Delete patient
  async deletePatient(id: number): Promise<void> {
    return apiService.delete<void>(`${BASE_URL}/${id}`);
  },
  
  // Add this method to your patientService
  async uploadPatientDocuments(patientId: number, formData: FormData): Promise<void> {
    return apiService.post<void>(`${BASE_URL}/${patientId}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};