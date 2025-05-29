import { Request, Response } from 'express';
import * as antecedentParamsService from '../services/antecedent-params.service';
import { ICreateAntecedentParamsDto, IUpdateAntecedentParamsDto } from '../models/antecedent-params.model';

// Get all antecedent params
export const getAllAntecedentParams = async (req: Request, res: Response): Promise<void> => {
  try {
    const antecedentParams = await antecedentParamsService.findAll();
    res.status(200).json(antecedentParams);
  } catch (error) {
    console.error('Error fetching antecedent params:', error);
    res.status(500).json({ message: 'Error fetching antecedent params', error });
  }
};

// Get antecedent params by ID
export const getAntecedentParamsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const antecedentParams = await antecedentParamsService.findById(id);
    
    if (!antecedentParams) {
      res.status(404).json({ message: 'Antecedent params not found' });
      return;
    }
    
    res.status(200).json(antecedentParams);
  } catch (error) {
    console.error('Error fetching antecedent params by ID:', error);
    res.status(500).json({ message: 'Error fetching antecedent params by ID', error });
  }
};

// Create new antecedent params
export const createAntecedentParams = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: ICreateAntecedentParamsDto = req.body;
    const newAntecedentParams = await antecedentParamsService.create(data);
    res.status(201).json(newAntecedentParams);
  } catch (error) {
    console.error('Error creating antecedent params:', error);
    res.status(500).json({ message: 'Error creating antecedent params', error });
  }
};

// Update antecedent params
export const updateAntecedentParams = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const data: IUpdateAntecedentParamsDto = req.body;
    const updatedAntecedentParams = await antecedentParamsService.update(id, data);
    res.status(200).json(updatedAntecedentParams);
  } catch (error) {
    console.error('Error updating antecedent params:', error);
    res.status(500).json({ message: 'Error updating antecedent params', error });
  }
};

// Delete antecedent params
export const deleteAntecedentParams = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await antecedentParamsService.remove(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting antecedent params:', error);
    res.status(500).json({ message: 'Error deleting antecedent params', error });
  }
};