import { TypeIdentite } from '@prisma/client';

// Basic TypeIdentite interface matching Prisma schema
export interface ITypeIdentite extends Omit<TypeIdentite, 'created_at' | 'updated_at'> {
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new type identite
export interface ICreateTypeIdentiteDto {
  nom: string;
  description?: string | null;
}

// Interface for updating an existing type identite
export interface IUpdateTypeIdentiteDto extends Partial<ICreateTypeIdentiteDto> {}

// Response DTO for type identite data
export interface ITypeIdentiteResponseDto {
  id: number;
  nom: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
}