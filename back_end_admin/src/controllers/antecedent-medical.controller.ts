import { Request, Response } from 'express';
import * as antecedentMedicalService from '../services/antecedent-medical.service';

// Get all antecedents
export const getAllAntecedents = async (req: Request, res: Response) => {
  try {
    const antecedents = await antecedentMedicalService.findAll();
    res.json(antecedents);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Get antecedent by ID
export const getAntecedentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const antecedent = await antecedentMedicalService.findById(Number(id));
    
    if (!antecedent) {
      res.status(404).json({ error: 'Antécédent médical non trouvé' });
      return;
    }
    
    res.json(antecedent);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Create new antecedent
export const createAntecedent = async (req: Request, res: Response) => {
  try {
    const antecedent = await antecedentMedicalService.create(req.body);
    res.status(201).json(antecedent);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Update antecedent
export const updateAntecedent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const antecedent = await antecedentMedicalService.update(Number(id), req.body);
    res.json(antecedent);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Delete antecedent
export const deleteAntecedent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await antecedentMedicalService.remove(Number(id));
    res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};