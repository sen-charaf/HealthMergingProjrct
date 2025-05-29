import { DocumentPatient } from '@prisma/client';

// Basic DocumentPatient interface matching Prisma schema
export interface IDocumentPatient extends Omit<DocumentPatient, 'date_upload' | 'created_at' | 'updated_at'> {
  date_upload: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new document patient
export interface ICreateDocumentPatientDto {
  patient_id: number;
  nom_fichier?: string | null;
  url?: string | null;
  type: string;
  date_upload?: Date | string;
}

// Interface for updating an existing document patient
export interface IUpdateDocumentPatientDto extends Partial<Omit<ICreateDocumentPatientDto, 'patient_id'>> {}

// Response DTO for document patient data
export interface IDocumentPatientResponseDto {
  id: number;
  patient_id: number;
  nom_fichier?: string | null;
  url?: string | null;
  type: string;
  date_upload: string;
  created_at: string;
  updated_at: string;
}