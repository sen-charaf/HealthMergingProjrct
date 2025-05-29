import { AntecedentParams } from '@prisma/client';

// Basic AntecedentParams interface matching Prisma schema
export interface IAntecedentParams extends Omit<AntecedentParams, 'created_at' | 'updated_at'> {
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new antecedent params
export interface ICreateAntecedentParamsDto {
  nom: string;
  description?: string | null;
  is_active?: boolean;
}

// Interface for updating an existing antecedent params
export interface IUpdateAntecedentParamsDto extends Partial<ICreateAntecedentParamsDto> {}

// Response DTO for antecedent params data
export interface IAntecedentParamsResponseDto {
  id: number;
  nom: string;
  description?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}