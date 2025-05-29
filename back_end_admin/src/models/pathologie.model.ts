import { Pathologie } from '@prisma/client';

// Basic Pathologie interface matching Prisma schema
export interface IPathologie extends Omit<Pathologie, 'created_at' | 'updated_at'> {
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new pathologie
export interface ICreatePathologieDto {
  patient_id: number;
  pathologie: string;
}

// Interface for updating an existing pathologie
export interface IUpdatePathologieDto extends Partial<Omit<ICreatePathologieDto, 'patient_id'>> {}

// Response DTO for pathologie data
export interface IPathologieResponseDto {
  id: number;
  patient_id: number;
  pathologie: string;
  created_at: string;
  updated_at: string;
}