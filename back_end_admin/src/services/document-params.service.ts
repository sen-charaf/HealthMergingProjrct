import { PrismaClient } from '@prisma/client';
import { ICreateDocumentParamsDto, IUpdateDocumentParamsDto, IDocumentParams } from '../models/document-params.model';

const prisma = new PrismaClient();

// Find all document parametrages
export const findAll = async (): Promise<IDocumentParams[]> => {
  return prisma.documentParams.findMany() as unknown as IDocumentParams[];
};

// Find document parametrage by ID
export const findById = async (id: number): Promise<IDocumentParams | null> => {
  return prisma.documentParams.findUnique({
    where: { id }
  }) as unknown as IDocumentParams | null;
};

// Create new document parametrage
export const create = async (data: ICreateDocumentParamsDto): Promise<IDocumentParams> => {
  return prisma.documentParams.createMany({
    data
  }) as unknown as IDocumentParams;
};

// Update document parametrage
export const update = async (id: number, data: IUpdateDocumentParamsDto): Promise<IDocumentParams> => {
  return prisma.documentParams.update({
    where: { id },
    data
  }) as unknown as IDocumentParams;
};

// Delete document parametrage
export const remove = async (id: number): Promise<void> => {
  await prisma.documentParams.delete({
    where: { id }
  });
};