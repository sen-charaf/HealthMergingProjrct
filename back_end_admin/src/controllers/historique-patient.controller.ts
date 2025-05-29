import { Request, Response } from 'express';
import * as historiquePatientService from '../services/historique-patient.service';

// Get all historiques
export const getAllHistoriques = async (req: Request, res: Response) => {
  try {
    const historiques = await historiquePatientService.findAll();
    res.json(historiques);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Get historiques by patient ID
export const getHistoriquesByPatientId = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    const historiques = await historiquePatientService.findByPatientId(Number(patientId));
    res.json(historiques);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Get historique by ID
export const getHistoriqueById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const historique = await historiquePatientService.findById(Number(id));
    
    if (!historique) {
      res.status(404).json({ error: 'Historique non trouvé' });
      return;
    }
    
    res.json(historique);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Create new historique
export const createHistorique = async (req: Request, res: Response) => {
  try {
    const historique = await historiquePatientService.create(req.body);
    res.status(201).json(historique);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Delete historique
export const deleteHistorique = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await historiquePatientService.remove(Number(id));
    res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};