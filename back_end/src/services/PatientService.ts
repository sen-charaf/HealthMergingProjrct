import Patient from '../models/Patient.js';
import { BaseService } from './BaseService.js';

export class PatientService extends BaseService<any> {
  constructor() {
    super(Patient);
  }
  
  async findByUserId(userId: string): Promise<any | null> {
    try {
      return await Patient.findOne({ user: userId }).exec();
    } catch (error) {
      throw error;
    }
  }

  async findByUserIdWithUserData(userId: string): Promise<any | null> {
    try {
      return await Patient.findOne({ user: userId }).populate('user').exec();
    } catch (error) {
      throw error;
    }
  }

  async findAllWithUserData(): Promise<any[]> {
    try {
      return await Patient.find().populate('user').exec();
    } catch (error) {
      throw error;
    }
  }

  async findByIdWithUserData(id: string): Promise<any | null> {
    try {
      return await Patient.findById(id).populate('user').exec();
    } catch (error) {
      throw error;
    }
  }

  async createPatient(patientData: any): Promise<any> {
    try {
      const newPatient = new Patient(patientData);
      return await newPatient.save();
    } catch (error) {
      throw error;
    }
  }

  async updatePatient(id: string, patientData: any): Promise<any | null> {
    try {
      return await Patient.findByIdAndUpdate(id, patientData, { new: true }).exec();
    } catch (error) {
      throw error;
    }
  }

  async updatePatientByUserId(userId: string, patientData: any): Promise<any | null> {
    try {
      return await Patient.findOneAndUpdate(
        { user: userId }, 
        patientData, 
        { new: true }
      ).exec();
    } catch (error) {
      throw error;
    }
  }

  async deletePatient(id: string): Promise<any | null> {
    try {
      return await Patient.findByIdAndDelete(id).exec();
    } catch (error) {
      throw error;
    }
  }

  async deletePatientByUserId(userId: string): Promise<any | null> {
    try {
      return await Patient.findOneAndDelete({ user: userId }).exec();
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string): Promise<any[]> {
    try {
      return await Patient.find()
        .populate({
          path: 'user',
          match: { 
            $or: [
              { firstName: { $regex: name, $options: 'i' } },
              { lastName: { $regex: name, $options: 'i' } },
              { fullName: { $regex: name, $options: 'i' } } // if you have a fullName field
            ]
          }
        })
        .exec()
        .then(patients => patients.filter(patient => patient.user !== null));
    } catch (error) {
      throw error;
    }
  }
  
}

export default new PatientService();