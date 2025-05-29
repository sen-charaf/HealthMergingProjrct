// Basic ContactUrgence interface
export interface ContactUrgence {
  id: number;
  patient_id: number;
  nom_complet: string;
  relation?: string | null;
  telephone: string;
  created_at: string;
  updated_at: string;
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