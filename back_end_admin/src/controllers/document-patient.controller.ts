import { Request, Response } from 'express';
import * as documentPatientService from '../services/document-patient.service';

// Get all documents
export const getAllDocuments = async (req: Request, res: Response) => {
  try {
    const documents = await documentPatientService.findAll();
    res.json(documents);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Get documents by patient ID
export const getDocumentsByPatientId = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    const documents = await documentPatientService.findByPatientId(Number(patientId));
    res.json(documents);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Get document by ID
export const getDocumentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const document = await documentPatientService.findById(Number(id));
    
    if (!document) {
      res.status(404).json({ error: 'Document non trouvé' });
      return;
    }
    
    res.json(document);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Create new document
export const createDocument = async (req: Request, res: Response) => {
  try {
    const document = await documentPatientService.create(req.body);
    res.status(201).json(document);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Update document
export const updateDocument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const document = await documentPatientService.update(Number(id), req.body);
    res.json(document);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Delete document
export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await documentPatientService.remove(Number(id));
    res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};