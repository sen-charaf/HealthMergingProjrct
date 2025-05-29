import { Allergie } from '@prisma/client';

// Basic Allergie interface matching Prisma schema
export interface IAllergie extends Omit<Allergie, 'created_at' | 'updated_at'> {
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new allergie
export interface ICreateAllergieDto {
  patient_id: number;
  allergie: string;
}

// Interface for updating an existing allergie
export interface IUpdateAllergieDto extends Partial<Omit<ICreateAllergieDto, 'patient_id'>> {}

// Response DTO for allergie data
export interface IAllergieResponseDto {
  id: number;
  patient_id: number;
  allergie: string;
  created_at: string;
  updated_at: string;
}