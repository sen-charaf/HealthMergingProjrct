import { Request, Response } from 'express';
import * as typeIdentiteService from '../services/type-identite.service';

// Get all type identites
export const getAllTypeIdentites = async (req: Request, res: Response) => {
  try {
    const typeIdentites = await typeIdentiteService.findAll();
    res.json(typeIdentites);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Get type identite by ID
export const getTypeIdentiteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const typeIdentite = await typeIdentiteService.findById(Number(id));
    
    if (!typeIdentite) {
      res.status(404).json({ error: 'Type d\'identité non trouvé' });
      return;
    }
    
    res.json(typeIdentite);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Create new type identite
export const createTypeIdentite = async (req: Request, res: Response) => {
  try {
    const typeIdentite = await typeIdentiteService.create(req.body);
    res.status(201).json(typeIdentite);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Update type identite
export const updateTypeIdentite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const typeIdentite = await typeIdentiteService.update(Number(id), req.body);
    res.json(typeIdentite);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Delete type identite
export const deleteTypeIdentite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await typeIdentiteService.remove(Number(id));
    res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};