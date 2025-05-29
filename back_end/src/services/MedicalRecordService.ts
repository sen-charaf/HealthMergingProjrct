import MedicalRecord from '../models/MedicalRecord.js';
import { BaseService } from './BaseService.js';

export class MedicalRecordService extends BaseService<any> {
  constructor() {
    super(MedicalRecord);
  }
  
  async findByPatient(patientId: string, populate?: string | string[]): Promise<any[]> {
    try {
      let query = MedicalRecord.find({ patient: patientId });
      
      if (populate) {
        if (Array.isArray(populate)) {
          populate.forEach(field => {
            query = query.populate(field);
          });
        } else {
          query = query.populate(populate);
        }
      }
      
      return await query.exec();
    } catch (error) {
      throw error;
    }
  }
  
  async findByDoctor(doctorId: string, populate?: string | string[]): Promise<any[]> {
    try {
      let query = MedicalRecord.find({ doctor: doctorId });
      
      if (populate) {
        if (Array.isArray(populate)) {
          populate.forEach(field => {
            query = query.populate(field);
          });
        } else {
          query = query.populate(populate);
        }
      }
      
      return await query.exec();
    } catch (error) {
      throw error;
    }
  }
}

export default new MedicalRecordService();