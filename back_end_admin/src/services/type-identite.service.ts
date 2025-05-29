import { PrismaClient } from '@prisma/client';
import { ICreateTypeIdentiteDto, IUpdateTypeIdentiteDto, ITypeIdentite } from '../models/type-identite.model';

const prisma = new PrismaClient();

// Find all type identites
export const findAll = async (): Promise<ITypeIdentite[]> => {
  return prisma.typeIdentite.findMany() as unknown as ITypeIdentite[];
};

// Find type identite by ID
export const findById = async (id: number): Promise<ITypeIdentite | null> => {
  return prisma.typeIdentite.findUnique({
    where: { id }
  }) as unknown as ITypeIdentite | null;
};

// Create new type identite
export const create = async (data: ICreateTypeIdentiteDto): Promise<ITypeIdentite> => {
  return prisma.typeIdentite.createMany({
    data
  }) as unknown as ITypeIdentite;
};

// Update type identite
export const update = async (id: number, data: IUpdateTypeIdentiteDto): Promise<ITypeIdentite> => {
  return prisma.typeIdentite.update({
    where: { id },
    data
  }) as unknown as ITypeIdentite;
};

// Delete type identite
export const remove = async (id: number): Promise<void> => {
  await prisma.typeIdentite.delete({
    where: { id }
  });
};