import { Assurance } from '@prisma/client';

// Basic Assurance interface matching Prisma schema
export interface IAssurance extends Omit<Assurance, 'created_at' | 'updated_at'> {
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new assurance
export interface ICreateAssuranceDto {
  patient_id: number;
  assurance: string;
  numero_police: string;
}

// Interface for updating an existing assurance
export interface IUpdateAssuranceDto extends Partial<Omit<ICreateAssuranceDto, 'patient_id'>> {}

// Response DTO for assurance data
export interface IAssuranceResponseDto {
  id: number;
  patient_id: number;
  assurance: string;
  numero_police: string;
  created_at: string;
  updated_at: string;
}