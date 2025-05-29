import { Request, Response } from 'express';
import * as documentParamsService from '../services/document-params.service';

// Get all document parametrages
export const getAllDocumentParams = async (req: Request, res: Response) => {
  try {
    const documentParamss = await documentParamsService.findAll();
    res.json(documentParamss);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Get document parametrage by ID
export const getDocumentParamsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const documentParams = await documentParamsService.findById(Number(id));
    
    if (!documentParams) {
      res.status(404).json({ error: 'Type de document non trouvé' });
      return;
    }
    
    res.json(documentParams);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Create new document parametrage
export const createDocumentParams = async (req: Request, res: Response) => {
  try {
    const documentParams = await documentParamsService.create(req.body);
    res.status(201).json(documentParams);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Update document parametrage
export const updateDocumentParams = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const documentParams = await documentParamsService.update(Number(id), req.body);
    res.json(documentParams);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Delete document parametrage
export const deleteDocumentParams = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await documentParamsService.remove(Number(id));
    res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};