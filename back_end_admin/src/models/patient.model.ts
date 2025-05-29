import { Patient } from '@prisma/client';
import { IContactUrgenceResponseDto } from './contact-urgence.model';
import { IDocumentPatientResponseDto } from './document-patient.model';
import { IAllergieResponseDto } from './allergie.model';
import { IPathologieResponseDto } from './pathologie.model';
import { IAntecedentMedicalResponseDto } from './antecedent-medical.model';
import { IAssuranceResponseDto } from './assurance.model';
import { IAuthentificationResponseDto } from './authentification.model';
import { IMedecinResponseDto } from './medecin.model';

// Basic Patient interface matching Prisma schema
export interface IPatient extends Omit<Patient, 'date_naissance' | 'dernier_visite' | 'created_at' | 'updated_at'> {
  date_naissance: Date | string;
  dernier_visite?: Date | string | null;
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new patient
export interface ICreatePatientDto {
  // Basic Info
  prenom: string;
  nom: string;
  date_naissance: Date | string;
  sexe: string;
  type_identifiant: string;
  identifiant: string;
  photo_profil?: string | null;
  
  // Contact information
  telephone?: string | null;
  email?: string | null;
  adresse?: string | null;
  
  // Medical information
  groupe_sanguin?: string | null;
  niveau_autonomie?: string | null;
  taille_cm?: number | null;
  poids_kg?: number | null;
  statut_tabac?: string | null;
  consommation_alcool?: string | null;
  
  // Administrative information
  medecinId?: number | null;
  
  // Status information
  statuts?: string | null;
  service?: string | null;
  priorite?: string | null;
  dernier_visite?: Date | string | null;
  
  // Additional information
  etat_civil?: string | null;
  profession?: string | null;
  langue_preferee?: string | null;
  consentement?: boolean;
  
  // Related entities
  contacts_urgence?: {
    nom_complet: string;
    relation?: string | null;
    telephone: string;
  }[];
  
  documents_patient?: {
    nom_fichier?: string | null;
    url?: string | null;
    type: string;
  }[];
  
  allergies?: string[];
  pathologies?: string[];
  
  antecedents?: {
    antecedent: string;
    description?: string | null;
    specialty?: string | null;
    antecedant_date?: Date | string | null;
    document1?: string | null;
    document2?: string | null;
    document3?: string | null;
    document4?: string | null;
    document5?: string | null;
  }[];
  
  assurances?: {
    assurance: string;
    numero_police: string;
  }[];
  
  credentials?: {
    nom_utilisateur: string;
    mot_de_passe: string;
  };
}

// Interface for updating an existing patient
export interface IUpdatePatientDto extends Partial<ICreatePatientDto> {}

// Interface for patient with related entities
export interface IPatientWithRelations extends IPatient {
  medecin?: IMedecinResponseDto | null;
  contacts_urgence?: IContactUrgenceResponseDto[];
  documents_patient?: IDocumentPatientResponseDto[];
  allergies?: IAllergieResponseDto[];
  pathologies?: IPathologieResponseDto[];
  antecedents?: IAntecedentMedicalResponseDto[];
  assurances?: IAssuranceResponseDto[];
  credentials?: IAuthentificationResponseDto | null;
}

// Response DTO for patient data
export interface IPatientResponseDto {
  id: number;
  prenom: string;
  nom: string;
  date_naissance: string;
  sexe: string;
  type_identifiant: string;
  identifiant: string;
  photo_profil?: string | null;
  
  // Contact information
  telephone?: string | null;
  email?: string | null;
  adresse?: string | null;
  
  // Medical information
  groupe_sanguin?: string | null;
  niveau_autonomie?: string | null;
  taille_cm?: number | null;
  poids_kg?: number | null;
  statut_tabac?: string | null;
  consommation_alcool?: string | null;
  
  // Status information
  statuts?: string | null;
  service?: string | null;
  priorite?: string | null;
  dernier_visite?: string | null;
  
  // Additional information
  etat_civil?: string | null;
  profession?: string | null;
  langue_preferee?: string | null;
  consentement: boolean;
  
  // Related entities
  medecin?: IMedecinResponseDto | null;
  contacts_urgence?: IContactUrgenceResponseDto[];
  documents_patient?: IDocumentPatientResponseDto[];
  allergies?: IAllergieResponseDto[];
  pathologies?: IPathologieResponseDto[];
  antecedents?: IAntecedentMedicalResponseDto[];
  assurances?: IAssuranceResponseDto[];
  credentials?: IAuthentificationResponseDto | null;
  
  created_at: string;
  updated_at: string;
}