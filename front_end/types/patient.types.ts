import { IAllergie } from './allergie.types';

// Basic Patient interface
export interface IPatient {
  id: number;
  nom: string;
  prenom: string;
  date_naissance: string;
  sexe: string;
  adresse?: string;
  telephone?: string;
  email?: string;
  medecinId?: number;
  type_identite_id?: number;
  numero_identite?: string;
  created_at: string;
  updated_at: string;
  
  // Relations
  medecin?: IMedecin;
  type_identite?: ITypeIdentite;
  contacts_urgence?: IContactUrgence[];
  documents_patient?: IDocumentPatient[];
  allergies?: IPatientAllergie[];
  pathologies?: IPatientPathologie[];
  antecedents?: IPatientAntecedent[];
}

// Interface for creating a new patient
export interface ICreatePatientDto {
  prenom: string;
  nom: string;
  date_naissance: Date;
  sexe: string;
  type_identifiant: string;
  identifiant: string;
  photo_profil?: string;

  telephone?: string;
  email?: string;
  adresse?: string;

  groupe_sanguin?: string;
  niveau_autonomie?: string;
  taille_cm?: number;
  poids_kg?: number;
  statut_tabac?: string;
  consommation_alcool?: string;

  statuts?: string;
  service?: string;
  priorite?: string;
  dernier_visite?: Date;
  etat_civil?: string;
  profession?: string;
  langue_preferee?: string;
  consentement?: boolean;

  contacts_urgence?: ContactUrgenceDto[];
  documents_patient?: DocumentPatientDto[];
  allergies?: string[];      // e.g., ['Pollen']
  pathologies?: string[];    // e.g., ['Asthme']
  antecedents?: AntecedentDto[];
  assurances?: AssuranceDto[];
  credentials?: CredentialsDto;
}

export interface ContactUrgenceDto {
  nom_complet: string;
  relation?: string;
  telephone: string;
}

export interface DocumentPatientDto {
  nom_fichier?: string;
  url?: string;
  type: string; // should match a value from DocumentParams.nom
}

export interface AntecedentDto {
  antecedent: string;
  antecedant_date?: Date;
  specialty?: string;
  description?: string;
  document1?: string;
  document2?: string;
  document3?: string;
  document4?: string;
  document5?: string;
}

export interface AssuranceDto {
  assurance: string;
  numero_police: string;
}

export interface CredentialsDto {
  nom_utilisateur: string;
  mot_de_passe: string;
}

// Interface for updating an existing patient
export interface IUpdatePatientDto extends Partial<ICreatePatientDto> {}

// Related interfaces
interface IMedecin {
  id: number;
  nom: string;
  prenom: string;
}

interface ITypeIdentite {
  id: number;
  nom: string;
}

interface IContactUrgence {
  id: number;
  patient_id: number;
  nom: string;
  prenom: string;
  telephone: string;
  relation: string;
}

interface ICreateContactUrgenceDto {
  nom: string;
  prenom: string;
  telephone: string;
  relation: string;
}

interface IDocumentPatient {
  id: number;
  patient_id: number;
  type_id: number;
  nom: string;
  url: string;
  type: {
    id: number;
    nom: string;
  };
}

interface ICreateDocumentPatientDto {
  type_id: number;
  nom: string;
  url: string;
}

interface IPatientAllergie {
  patient_id: number;
  allergie_id: number;
  allergie: IAllergie;
}

interface IPatientPathologie {
  patient_id: number;
  pathologie_id: number;
  pathologie: {
    id: number;
    nom: string;
  };
}

interface IPatientAntecedent {
  patient_id: number;
  antecedent_id: number;
  antecedent: {
    id: number;
    nom: string;
  };
}