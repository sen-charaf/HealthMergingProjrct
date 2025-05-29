import { PathologieParams } from '@prisma/client';

// Basic PathologieParams interface matching Prisma schema
export interface IPathologieParams extends Omit<PathologieParams, 'created_at' | 'updated_at'> {
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new pathologie params
export interface ICreatePathologieParamsDto {
  nom: string;
  description?: string | null;
 
}

// Interface for updating an existing pathologie params
export interface IUpdatePathologieParamsDto extends Partial<ICreatePathologieParamsDto> {}

// Response DTO for pathologie params data
export interface IPathologieParamsResponseDto {
  id: number;
  nom: string;
  description?: string | null;
 
  created_at: string;
  updated_at: string;
}