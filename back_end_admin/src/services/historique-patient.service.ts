import { PrismaClient } from '@prisma/client';
import { ICreateHistoriquePatientDto, IHistoriquePatient } from '../models/historique-patient.model';

const prisma = new PrismaClient();

// Find all historiques
export const findAll = async (): Promise<IHistoriquePatient[]> => {
  return prisma.historiquePatient.findMany({
    orderBy: {
      modifie_le: 'desc'
    }
  }) as unknown as IHistoriquePatient[];
};

// Find historiques by patient ID
export const findByPatientId = async (patientId: number): Promise<IHistoriquePatient[]> => {
  return prisma.historiquePatient.findMany({
    where: { patient_id: patientId },
    orderBy: {
      modifie_le: 'desc'
    }
  }) as unknown as IHistoriquePatient[];
};

// Find historique by ID
export const findById = async (id: number): Promise<IHistoriquePatient | null> => {
  return prisma.historiquePatient.findUnique({
    where: { id }
  }) as unknown as IHistoriquePatient | null;
};

// Create new historique
export const create = async (data: ICreateHistoriquePatientDto): Promise<IHistoriquePatient> => {
  return prisma.historiquePatient.create({
    data
  }) as unknown as IHistoriquePatient;
};

// Delete historique
export const remove = async (id: number): Promise<void> => {
  await prisma.historiquePatient.delete({
    where: { id }
  });
};