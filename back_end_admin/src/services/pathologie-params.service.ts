import { PrismaClient } from '@prisma/client';
import { ICreatePathologieParamsDto, IUpdatePathologieParamsDto, IPathologieParamsResponseDto } from '../models/pathologie-params.model';

const prisma = new PrismaClient();

// Find all pathologie params
export const findAll = async (): Promise<IPathologieParamsResponseDto[]> => {
  return prisma.pathologieParams.findMany() as unknown as IPathologieParamsResponseDto[];
};

// Find pathologie params by ID
export const findById = async (id: number): Promise<IPathologieParamsResponseDto | null> => {
  return prisma.pathologieParams.findUnique({
    where: { id }
  }) as unknown as IPathologieParamsResponseDto | null;
};

// Create new pathologie params
export const create = async (data: ICreatePathologieParamsDto): Promise<IPathologieParamsResponseDto> => {
  return prisma.pathologieParams.createMany({
    data
  }) as unknown as IPathologieParamsResponseDto;
};

// Update pathologie params
export const update = async (id: number, data: IUpdatePathologieParamsDto): Promise<IPathologieParamsResponseDto> => {
  return prisma.pathologieParams.update({
    where: { id },
    data
  }) as unknown as IPathologieParamsResponseDto;
};

// Delete pathologie params
export const remove = async (id: number): Promise<void> => {
  await prisma.pathologieParams.delete({
    where: { id }
  });
};