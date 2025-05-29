// Basic Allergie interface
export interface IAllergie {
  id: number;
  nom: string;
  created_at: string;
  updated_at: string;
}

// Interface for creating a new allergie
export interface ICreateAllergieDto {
  nom: string;
}

// Interface for updating an existing allergie
export interface IUpdateAllergieDto extends Partial<ICreateAllergieDto> {}