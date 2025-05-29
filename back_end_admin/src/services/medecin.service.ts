import { PrismaClient } from '@prisma/client';
import { ICreateMedecinDto, IUpdateMedecinDto, IMedecin } from '../models/medecin.model';

const prisma = new PrismaClient();

// Find all medecins
export const findAll = async (): Promise<IMedecin[]> => {
  return prisma.medecin.findMany() as unknown as IMedecin[];
};

// Find medecin by ID
export const findById = async (id: number): Promise<IMedecin | null> => {
  return prisma.medecin.findUnique({
    where: { id },
   
  }) as unknown as IMedecin | null;
};

// Create new medecin
export const create = async (data: ICreateMedecinDto): Promise<IMedecin> => {
  return prisma.medecin.create({
    data,
  }) as unknown as IMedecin;
};

// Update medecin
export const update = async (id: number, data: IUpdateMedecinDto): Promise<IMedecin> => {
  return prisma.medecin.update({
    where: { id },
    data
  }) as unknown as IMedecin;
};

// Delete medecin
export const remove = async (id: number): Promise<void> => {
  await prisma.medecin.delete({
    where: { id }
  });
};