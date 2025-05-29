import { PrismaClient } from '@prisma/client';
import { ICreateContactUrgenceDto, IUpdateContactUrgenceDto, IContactUrgence } from '../models/contact-urgence.model';

const prisma = new PrismaClient();

// Find all contacts urgence
export const findAll = async (): Promise<IContactUrgence[]> => {
  return prisma.contactUrgence.findMany() as unknown as IContactUrgence[];
};

// Find contacts urgence by patient ID
export const findByPatientId = async (patientId: number): Promise<IContactUrgence[]> => {
  return prisma.contactUrgence.findMany({
    where: { patient_id: patientId }
  }) as unknown as IContactUrgence[];
};

// Find contact urgence by ID
export const findById = async (id: number): Promise<IContactUrgence | null> => {
  return prisma.contactUrgence.findUnique({
    where: { id }
  }) as unknown as IContactUrgence | null;
};

// Create new contact urgence
export const create = async (data: ICreateContactUrgenceDto): Promise<IContactUrgence> => {
  return prisma.contactUrgence.create({
    data
  }) as unknown as IContactUrgence;
};

// Update contact urgence
export const update = async (id: number, data: IUpdateContactUrgenceDto): Promise<IContactUrgence> => {
  return prisma.contactUrgence.update({
    where: { id },
    data
  }) as unknown as IContactUrgence;
};

// Delete contact urgence
export const remove = async (id: number): Promise<void> => {
  await prisma.contactUrgence.delete({
    where: { id }
  });
};