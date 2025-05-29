import { PrismaClient } from '@prisma/client';
import { ICreateAllergieParamsDto, IUpdateAllergieParamsDto, IAllergieParamsResponseDto } from '../models/allergie-params.model';

const prisma = new PrismaClient();

// Find all allergie params
export const findAll = async (): Promise<IAllergieParamsResponseDto[]> => {
  return prisma.allergieParams.findMany() as unknown as IAllergieParamsResponseDto[];
};

// Find allergie params by ID
export const findById = async (id: number): Promise<IAllergieParamsResponseDto | null> => {
  return prisma.allergieParams.findUnique({
    where: { id }
  }) as unknown as IAllergieParamsResponseDto | null;
};

// Create new allergie params
export const create = async (data: ICreateAllergieParamsDto): Promise<IAllergieParamsResponseDto> => {
  return prisma.allergieParams.createMany({
    data,
    skipDuplicates: true
  }) as unknown as IAllergieParamsResponseDto;
};

// Update allergie params
export const update = async (id: number, data: IUpdateAllergieParamsDto): Promise<IAllergieParamsResponseDto> => {
  return prisma.allergieParams.update({
    where: { id },
    data
  }) as unknown as IAllergieParamsResponseDto;
};

// Delete allergie params
export const remove = async (id: number): Promise<void> => {
  await prisma.allergieParams.delete({
    where: { id }
  });
};