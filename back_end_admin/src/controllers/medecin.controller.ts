import { Request, Response } from 'express';
import * as medecinService from '../services/medecin.service';

// Get all medecins
export const getAllMedecins = async (req: Request, res: Response) => {
  try {
    const medecins = await medecinService.findAll();
    res.json(medecins);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Get medecin by ID
export const getMedecinById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const medecin = await medecinService.findById(Number(id));
    
    if (!medecin) {
      res.status(404).json({ error: 'Médecin non trouvé' });
      return;
    }
    
    res.json(medecin);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Create new medecin
export const createMedecin = async (req: Request, res: Response) => {
  try {
    const medecin = await medecinService.create(req.body);
    res.status(201).json(medecin);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Update medecin
export const updateMedecin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const medecin = await medecinService.update(Number(id), req.body);
    res.json(medecin);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Delete medecin
export const deleteMedecin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await medecinService.remove(Number(id));
    res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};