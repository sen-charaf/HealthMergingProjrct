import { PrismaClient } from '@prisma/client';
import { ICreateAntecedentMedicalDto, IUpdateAntecedentMedicalDto, IAntecedentMedical } from '../models/antecedent-medical.model';

const prisma = new PrismaClient();

// Find all antecedents
export const findAll = async (): Promise<IAntecedentMedical[]> => {
  return prisma.antecedentMedical.findMany() as unknown as IAntecedentMedical[];
};

// Find antecedent by ID
export const findById = async (id: number): Promise<IAntecedentMedical | null> => {
  return prisma.antecedentMedical.findUnique({
    where: { id }
  }) as unknown as IAntecedentMedical | null;
};

// Create new antecedent
export const create = async (data: ICreateAntecedentMedicalDto): Promise<IAntecedentMedical> => {
  return prisma.antecedentMedical.createMany({
    data
  }) as unknown as IAntecedentMedical;
};

// Update antecedent
export const update = async (id: number, data: IUpdateAntecedentMedicalDto): Promise<IAntecedentMedical> => {
  return prisma.antecedentMedical.update({
    where: { id },
    data
  }) as unknown as IAntecedentMedical;
};

// Delete antecedent
export const remove = async (id: number): Promise<void> => {
  await prisma.antecedentMedical.delete({
    where: { id }
  });
};