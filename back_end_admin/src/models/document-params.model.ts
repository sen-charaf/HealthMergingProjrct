import { DocumentParams } from '@prisma/client';

// Basic DocumentParams interface matching Prisma schema
export interface IDocumentParams extends Omit<DocumentParams, 'created_at' | 'updated_at'> {
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new document params
export interface ICreateDocumentParamsDto {
  nom: string;
  description?: string | null;
  is_active?: boolean;
}

// Interface for updating an existing document params
export interface IUpdateDocumentParamsDto extends Partial<ICreateDocumentParamsDto> {}

// Response DTO for document params data
export interface IDocumentParamsResponseDto {
  id: number;
  nom: string;
  description?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}