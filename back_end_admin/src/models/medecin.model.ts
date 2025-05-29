import { Medecin } from '@prisma/client';

// Basic Medecin interface matching Prisma schema
export interface IMedecin extends Omit<Medecin, 'created_at' | 'updated_at'> {
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new medecin
export interface ICreateMedecinDto {
  nom: string;
  specialite?: string | null;
}

// Interface for updating an existing medecin
export interface IUpdateMedecinDto extends Partial<ICreateMedecinDto> {}

// Response DTO for medecin data
export interface IMedecinResponseDto {
  id: number;
  nom: string;
  specialite?: string | null;
  created_at: string;
  updated_at: string;
}