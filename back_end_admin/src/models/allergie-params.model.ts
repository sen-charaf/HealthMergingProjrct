import { AllergieParams } from '@prisma/client';

// Basic AllergieParams interface matching Prisma schema
export interface IAllergieParams extends Omit<AllergieParams, 'created_at' | 'updated_at'> {
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new allergie params
export interface ICreateAllergieParamsDto {
  nom: string;
  description?: string | null;
  is_active?: boolean;
}

// Interface for updating an existing allergie params
export interface IUpdateAllergieParamsDto extends Partial<ICreateAllergieParamsDto> {}

// Response DTO for allergie params data
export interface IAllergieParamsResponseDto {
  id: number;
  nom: string;
  description?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}