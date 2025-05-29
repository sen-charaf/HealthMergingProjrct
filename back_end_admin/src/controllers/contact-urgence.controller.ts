import { Request, Response } from 'express';
import * as contactUrgenceService from '../services/contact-urgence.service';

// Get all contacts urgence
export const getAllContactsUrgence = async (req: Request, res: Response) => {
  try {
    const contacts = await contactUrgenceService.findAll();
    res.json(contacts);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Get contacts urgence by patient ID
export const getContactsUrgenceByPatientId = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    const contacts = await contactUrgenceService.findByPatientId(Number(patientId));
    res.json(contacts);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Get contact urgence by ID
export const getContactUrgenceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contact = await contactUrgenceService.findById(Number(id));
    
    if (!contact) {
      res.status(404).json({ error: 'Contact d\'urgence non trouvé' });
      return;
    }
    
    res.json(contact);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Create new contact urgence
export const createContactUrgence = async (req: Request, res: Response) => {
  try {
    const contact = await contactUrgenceService.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Update contact urgence
export const updateContactUrgence = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contact = await contactUrgenceService.update(Number(id), req.body);
    res.json(contact);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Delete contact urgence
export const deleteContactUrgence = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await contactUrgenceService.remove(Number(id));
    res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};