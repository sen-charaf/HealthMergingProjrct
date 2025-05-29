import { Request, Response } from 'express';
import * as pathologieService from '../services/pathologie.service';
import { ICreatePathologieDto, IUpdatePathologieDto } from '../models/pathologie.model';

// Get all pathologies
export const getAllPathologies = async (req: Request, res: Response): Promise<void> => {
  try {
    const pathologies = await pathologieService.findAll();
    res.status(200).json(pathologies);
  } catch (error) {
    console.error('Error fetching pathologies:', error);
    res.status(500).json({ message: 'Error fetching pathologies', error });
  }
};

// Get pathologies by patient ID
export const getPathologiesByPatientId = async (req: Request, res: Response): Promise<void> => {
  try {
    const patientId = parseInt(req.params.patientId);
    const pathologies = await pathologieService.findByPatientId(patientId);
    res.status(200).json(pathologies);
  } catch (error) {
    console.error('Error fetching pathologies by patient ID:', error);
    res.status(500).json({ message: 'Error fetching pathologies by patient ID', error });
  }
};

// Get pathologie by ID
export const getPathologieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const pathologie = await pathologieService.findById(id);
    
    if (!pathologie) {
      res.status(404).json({ message: 'Pathologie not found' });
      return;
    }
    
    res.status(200).json(pathologie);
  } catch (error) {
    console.error('Error fetching pathologie by ID:', error);
    res.status(500).json({ message: 'Error fetching pathologie by ID', error });
  }
};

// Create new pathologie
export const createPathologie = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: ICreatePathologieDto = req.body;
    const newPathologie = await pathologieService.create(data);
    res.status(201).json(newPathologie);
  } catch (error) {
    console.error('Error creating pathologie:', error);
    res.status(500).json({ message: 'Error creating pathologie', error });
  }
};

// Update pathologie
export const updatePathologie = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const data: IUpdatePathologieDto = req.body;
    const updatedPathologie = await pathologieService.update(id, data);
    res.status(200).json(updatedPathologie);
  } catch (error) {
    console.error('Error updating pathologie:', error);
    res.status(500).json({ message: 'Error updating pathologie', error });
  }
};

// Delete pathologie
export const deletePathologie = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await pathologieService.remove(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting pathologie:', error);
    res.status(500).json({ message: 'Error deleting pathologie', error });
  }
};