import { Request, Response } from 'express';
import * as pathologieParamsService from '../services/pathologie-params.service';
import { ICreatePathologieParamsDto, IUpdatePathologieParamsDto } from '../models/pathologie-params.model';

// Get all pathologie params
export const getAllPathologieParams = async (req: Request, res: Response): Promise<void> => {
  try {
    const pathologieParams = await pathologieParamsService.findAll();
    res.status(200).json(pathologieParams);
  } catch (error) {
    console.error('Error fetching pathologie params:', error);
    res.status(500).json({ message: 'Error fetching pathologie params', error });
  }
};

// Get pathologie params by ID
export const getPathologieParamsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const pathologieParams = await pathologieParamsService.findById(id);
    
    if (!pathologieParams) {
      res.status(404).json({ message: 'Pathologie params not found' });
      return;
    }
    
    res.status(200).json(pathologieParams);
  } catch (error) {
    console.error('Error fetching pathologie params by ID:', error);
    res.status(500).json({ message: 'Error fetching pathologie params by ID', error });
  }
};

// Create new pathologie params
export const createPathologieParams = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: ICreatePathologieParamsDto = req.body;
    const newPathologieParams = await pathologieParamsService.create(data);
    res.status(201).json(newPathologieParams);
  } catch (error) {
    console.error('Error creating pathologie params:', error);
    res.status(500).json({ message: 'Error creating pathologie params', error });
  }
};

// Update pathologie params
export const updatePathologieParams = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const data: IUpdatePathologieParamsDto = req.body;
    const updatedPathologieParams = await pathologieParamsService.update(id, data);
    res.status(200).json(updatedPathologieParams);
  } catch (error) {
    console.error('Error updating pathologie params:', error);
    res.status(500).json({ message: 'Error updating pathologie params', error });
  }
};

// Delete pathologie params
export const deletePathologieParams = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await pathologieParamsService.remove(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting pathologie params:', error);
    res.status(500).json({ message: 'Error deleting pathologie params', error });
  }
};