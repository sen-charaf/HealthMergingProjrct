import { AntecedentMedical } from '@prisma/client';

// Basic AntecedentMedical interface matching Prisma schema
export interface IAntecedentMedical extends Omit<AntecedentMedical, 'antecedant_date' | 'created_at' | 'updated_at'> {
  antecedant_date?: Date | string | null;
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new antecedent medical
export interface ICreateAntecedentMedicalDto {
  patient_id: number;
  antecedent: string;
  description?: string | null;
  specialty?: string | null;
  antecedant_date?: Date | string | null;
  document1?: string | null;
  document2?: string | null;
  document3?: string | null;
  document4?: string | null;
  document5?: string | null;
}

// Interface for updating an existing antecedent medical
export interface IUpdateAntecedentMedicalDto extends Partial<Omit<ICreateAntecedentMedicalDto, 'patient_id'>> {}

// Response DTO for antecedent medical data
export interface IAntecedentMedicalResponseDto {
  id: number;
  patient_id: number;
  antecedent: string;
  description?: string | null;
  specialty?: string | null;
  antecedant_date?: string | null;
  document1?: string | null;
  document2?: string | null;
  document3?: string | null;
  document4?: string | null;
  document5?: string | null;
  created_at: string;
  updated_at: string;
}