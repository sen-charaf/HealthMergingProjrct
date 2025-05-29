import { HistoriquePatient } from '@prisma/client';

// Basic HistoriquePatient interface matching Prisma schema
export interface IHistoriquePatient extends Omit<HistoriquePatient, 'modifie_le' | 'created_at' | 'updated_at'> {
  modifie_le: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new historique patient
export interface ICreateHistoriquePatientDto {
  patient_id: number;
  attribut: string;
  ancienne_valeur?: string | null;
  nouvelle_valeur?: string | null;
  modifie_le?: Date | string;
  modifie_par?: string | null;
}

// Interface for updating an existing historique patient
export interface IUpdateHistoriquePatientDto extends Partial<Omit<ICreateHistoriquePatientDto, 'patient_id'>> {}

// Response DTO for historique patient data
export interface IHistoriquePatientResponseDto {
  id: number;
  patient_id: number;
  attribut: string;
  ancienne_valeur?: string | null;
  nouvelle_valeur?: string | null;
  modifie_le: string;
  modifie_par?: string | null;
  created_at: string;
  updated_at: string;
}