import mongoose from 'mongoose';
import { BaseService } from './BaseService';
import Prescription from '../models/Prescription';

export class PrescriptionService extends BaseService<mongoose.Document> {
  constructor() {
    super(Prescription);
  }

  // Trouver les ordonnances par patient
  async findByPatientId(patientId: string, populate?: string | string[]) {
    try {
      let query = this.model.find({ patientId }).sort({ datePrescribed: -1 });
      
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
      throw new Error("Erreur lors de la recherche des ordonnances du patient");
    }
  }

  // Trouver les ordonnances par médecin
  async findByDoctorId(doctorId: string, populate?: string | string[]) {
    try {
      let query = this.model.find({ doctorId }).sort({ datePrescribed: -1 });
      
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
      throw new Error("Erreur lors de la recherche des ordonnances du médecin");
    }
  }

  // Créer une nouvelle ordonnance avec validation
  async createPrescription(prescriptionData: any) {
    try {
      // Validation des médicaments
      if (!prescriptionData.medications || prescriptionData.medications.length === 0) {
        throw new Error("Au moins un médicament est requis");
      }

      const newPrescription = new Prescription(prescriptionData);
      return await newPrescription.save();
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'ordonnance: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Mettre à jour le statut d'une ordonnance
  async updatePrescriptionStatus(id: string, status: string) {
    try {
      const allowedStatuses = ['active', 'expired', 'completed', 'cancelled'];
      if (!allowedStatuses.includes(status)) {
        throw new Error("Statut d'ordonnance invalide");
      }

      return await this.model.findByIdAndUpdate(
        id, 
        { status, updatedAt: new Date() }, 
        { new: true }
      ).exec();
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour du statut: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Ajouter un renouvellement à une ordonnance
  async addRefill(id: string, medicationIndex: number) {
    try {
      const prescription = await this.model.findById(id);
      if (!prescription) {
        throw new Error("Ordonnance non trouvée");
      }

      if (medicationIndex < 0 || medicationIndex >= prescription.medications.length) {
        throw new Error("Index de médicament invalide");
      }

      prescription.medications[medicationIndex].refillsRemaining += 1;
      prescription.updatedAt = new Date();

      return await prescription.save();
    } catch (error) {
      throw new Error(`Erreur lors de l'ajout du renouvellement: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

export default new PrescriptionService();