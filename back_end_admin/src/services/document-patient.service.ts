import { PrismaClient } from '@prisma/client';
import { ICreateDocumentPatientDto, IUpdateDocumentPatientDto, IDocumentPatientResponseDto } from '../models/document-patient.model';

const prisma = new PrismaClient();

// Find all documents
export const findAll = async (): Promise<IDocumentPatientResponseDto[]> => {
  return prisma.documentPatient.findMany({
    include: {
      patient: true
    }
  }) as unknown as IDocumentPatientResponseDto[];
};

// Find documents by patient ID
export const findByPatientId = async (patientId: number): Promise<IDocumentPatientResponseDto[]> => {
  return prisma.documentPatient.findMany({
    where: { patient_id: patientId },
    include: {
      patient: true
    }
  }) as unknown as IDocumentPatientResponseDto[];
};

// Find document by ID
export const findById = async (id: number): Promise<IDocumentPatientResponseDto | null> => {
  return prisma.documentPatient.findUnique({
    where: { id },
    include: {
      patient: true
    }
  }) as unknown as IDocumentPatientResponseDto | null;
};

// Create new document
export const create = async (data: ICreateDocumentPatientDto): Promise<IDocumentPatientResponseDto> => {
  return prisma.documentPatient.create({
    data,
    include: {
      patient: true
    }
  }) as unknown as IDocumentPatientResponseDto;
};

// Update document
export const update = async (id: number, data: IUpdateDocumentPatientDto): Promise<IDocumentPatientResponseDto> => {
  return prisma.documentPatient.update({
    where: { id },
    data,
    include: {
      patient: true
    }
  }) as unknown as IDocumentPatientResponseDto;
};

// Delete document
export const remove = async (id: number): Promise<void> => {
  await prisma.documentPatient.delete({
    where: { id }
  });
};