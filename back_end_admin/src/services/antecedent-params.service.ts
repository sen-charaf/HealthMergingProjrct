import { PrismaClient } from '@prisma/client';
import { ICreateAntecedentParamsDto, IUpdateAntecedentParamsDto, IAntecedentParamsResponseDto } from '../models/antecedent-params.model';

const prisma = new PrismaClient();

// Find all antecedent params
export const findAll = async (): Promise<IAntecedentParamsResponseDto[]> => {
  return prisma.antecedentParams.findMany() as unknown as IAntecedentParamsResponseDto[];
};

// Find antecedent params by ID
export const findById = async (id: number): Promise<IAntecedentParamsResponseDto | null> => {
  return prisma.antecedentParams.findUnique({
    where: { id }
  }) as unknown as IAntecedentParamsResponseDto | null;
};

// Create new antecedent params
export const create = async (data: ICreateAntecedentParamsDto): Promise<IAntecedentParamsResponseDto> => {
  return prisma.antecedentParams.createMany({
    data
  }) as unknown as IAntecedentParamsResponseDto;
};

// Update antecedent params
export const update = async (id: number, data: IUpdateAntecedentParamsDto): Promise<IAntecedentParamsResponseDto> => {
  return prisma.antecedentParams.update({
    where: { id },
    data
  }) as unknown as IAntecedentParamsResponseDto;
};

// Delete antecedent params
export const remove = async (id: number): Promise<void> => {
  await prisma.antecedentParams.delete({
    where: { id }
  });
};