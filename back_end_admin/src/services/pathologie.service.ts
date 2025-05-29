import { PrismaClient } from '@prisma/client';
import { ICreatePathologieDto, IUpdatePathologieDto, IPathologieResponseDto } from '../models/pathologie.model';

const prisma = new PrismaClient();

// Find all pathologies
export const findAll = async (): Promise<IPathologieResponseDto[]> => {
  return prisma.pathologie.findMany({
    include: {
      patient: true
    }
  }) as unknown as IPathologieResponseDto[];
};

// Find pathologies by patient ID
export const findByPatientId = async (patientId: number): Promise<IPathologieResponseDto[]> => {
  return prisma.pathologie.findMany({
    where: { patient_id: patientId }
  }) as unknown as IPathologieResponseDto[];
};

// Find pathologie by ID
export const findById = async (id: number): Promise<IPathologieResponseDto | null> => {
  return prisma.pathologie.findUnique({
    where: { id }
  }) as unknown as IPathologieResponseDto | null;
};

// Create new pathologie
export const create = async (data: ICreatePathologieDto): Promise<IPathologieResponseDto> => {
  return prisma.pathologie.createMany({
    data
  }) as unknown as IPathologieResponseDto;
};

// Update pathologie
export const update = async (id: number, data: IUpdatePathologieDto): Promise<IPathologieResponseDto> => {
  return prisma.pathologie.update({
    where: { id },
    data
  }) as unknown as IPathologieResponseDto;
};

// Delete pathologie
export const remove = async (id: number): Promise<void> => {
  await prisma.pathologie.delete({
    where: { id }
  });
};