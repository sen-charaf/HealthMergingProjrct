import { Request, Response } from 'express';
import * as allergieParamsService from '../services/allergie-params.service';
import { ICreateAllergieParamsDto, IUpdateAllergieParamsDto } from '../models/allergie-params.model';

// Get all allergie params
export const getAllAllergieParams = async (req: Request, res: Response): Promise<void> => {
  try {
    const allergieParams = await allergieParamsService.findAll();
    res.status(200).json(allergieParams);
  } catch (error) {
    console.error('Error fetching allergie params:', error);
    res.status(500).json({ message: 'Error fetching allergie params', error });
  }
};

// Get allergie params by ID
export const getAllergieParamsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const allergieParams = await allergieParamsService.findById(id);
    
    if (!allergieParams) {
      res.status(404).json({ message: 'Allergie params not found' });
      return;
    }
    
    res.status(200).json(allergieParams);
  } catch (error) {
    console.error('Error fetching allergie params by ID:', error);
    res.status(500).json({ message: 'Error fetching allergie params by ID', error });
  }
};

// Create new allergie params
export const createAllergieParams = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: ICreateAllergieParamsDto = req.body;
    const newAllergieParams = await allergieParamsService.create(data);
    res.status(201).json(newAllergieParams);
  } catch (error) {
    console.error('Error creating allergie params:', error);
    res.status(500).json({ message: 'Error creating allergie params', error });
  }
};

// Update allergie params
export const updateAllergieParams = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const data: IUpdateAllergieParamsDto = req.body;
    const updatedAllergieParams = await allergieParamsService.update(id, data);
    res.status(200).json(updatedAllergieParams);
  } catch (error) {
    console.error('Error updating allergie params:', error);
    res.status(500).json({ message: 'Error updating allergie params', error });
  }
};

// Delete allergie params
export const deleteAllergieParams = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await allergieParamsService.remove(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting allergie params:', error);
    res.status(500).json({ message: 'Error deleting allergie params', error });
  }
};