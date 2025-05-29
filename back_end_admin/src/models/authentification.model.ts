import { Authentification } from '@prisma/client';

// Basic Authentification interface matching Prisma schema
export interface IAuthentification extends Omit<Authentification, 'created_at' | 'updated_at'> {
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new authentification
export interface ICreateAuthentificationDto {
  patient_id: number;
  nom_utilisateur: string;
  mot_de_passe: string;
}

// Interface for updating an existing authentification
export interface IUpdateAuthentificationDto extends Partial<Omit<ICreateAuthentificationDto, 'patient_id'>> {}

// Response DTO for authentification data
export interface IAuthentificationResponseDto {
  id: number;
  patient_id: number;
  nom_utilisateur: string;
  created_at: string;
  updated_at: string;
}