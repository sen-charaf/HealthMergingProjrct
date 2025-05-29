import { PrismaClient } from '@prisma/client';
import { ICreateAllergieDto, IUpdateAllergieDto, IAllergie } from '../models/allergie.model';

const prisma = new PrismaClient();

// Find all allergies
export const findAll = async (): Promise<IAllergie[]> => {
  return prisma.allergie.findMany() as unknown as IAllergie[];
};

// Find allergie by ID
export const findById = async (id: number): Promise<IAllergie | null> => {
  return prisma.allergie.findUnique({
    where: { id }
  }) as unknown as IAllergie | null;
};

// Create new allergie
export const create = async (data: ICreateAllergieDto): Promise<IAllergie> => {
  return prisma.allergie.createMany({
    data
  }) as unknown as IAllergie;
};

// Update allergie
export const update = async (id: number, data: IUpdateAllergieDto): Promise<IAllergie> => {
  return prisma.allergie.update({
    where: { id },
    data
  }) as unknown as IAllergie;
};

// Delete allergie
export const remove = async (id: number): Promise<void> => {
  await prisma.allergie.delete({
    where: { id }
  });
};