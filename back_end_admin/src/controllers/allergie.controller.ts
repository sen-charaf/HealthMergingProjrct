import { Request, Response } from 'express';
import * as allergieService from '../services/allergie.service';

// Get all allergies
export const getAllAllergies = async (req: Request, res: Response) => {
  try {
    const allergies = await allergieService.findAll();
    res.json(allergies);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Get allergie by ID
export const getAllergieById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const allergie = await allergieService.findById(Number(id));
    
    if (!allergie) {
      res.status(404).json({ error: 'Allergie non trouvée' });
      return;
    }
    
    res.json(allergie);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Create new allergie
export const createAllergie = async (req: Request, res: Response) => {
  try {
    const allergie = await allergieService.create(req.body);
    res.status(201).json(allergie);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Update allergie
export const updateAllergie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const allergie = await allergieService.update(Number(id), req.body);
    res.json(allergie);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Delete allergie
export const deleteAllergie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await allergieService.remove(Number(id));
    res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};