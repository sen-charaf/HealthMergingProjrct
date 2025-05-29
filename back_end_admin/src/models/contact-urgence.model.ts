import { ContactUrgence } from '@prisma/client';

// Basic ContactUrgence interface matching Prisma schema
export interface IContactUrgence extends Omit<ContactUrgence, 'created_at' | 'updated_at'> {
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new contact urgence
export interface ICreateContactUrgenceDto {
  patient_id: number;
  nom_complet: string;
  relation?: string | null;
  telephone: string;
}

// Interface for updating an existing contact urgence
export interface IUpdateContactUrgenceDto extends Partial<Omit<ICreateContactUrgenceDto, 'patient_id'>> {}

// Response DTO for contact urgence data
export interface IContactUrgenceResponseDto {
  id: number;
  patient_id: number;
  nom_complet: string;
  relation?: string | null;
  telephone: string;
  created_at: string;
  updated_at: string;
}