// Basic DocumentPatient interface
export interface DocumentPatient {
  id: number;
  patient_id: number;
  nom_fichier?: string | null;
  url?: string | null;
  date_upload: string;
  type: string;
  created_at: string;
  updated_at: string;
}

// Interface for creating a new document patient
export interface ICreateDocumentPatientDto {
  patient_id: number;
  nom_fichier?: string | null;
  url?: string | null;
  type: string;
}

// Interface for updating an existing document patient
export interface IUpdateDocumentPatientDto extends Partial<Omit<ICreateDocumentPatientDto, 'patient_id'>> {}