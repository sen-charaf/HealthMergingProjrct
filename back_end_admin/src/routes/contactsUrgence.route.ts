import express from 'express';
import * as contactUrgenceController from '../controllers/contact-urgence.controller';

const router = express.Router();

// Get all contacts urgence
router.get('/', contactUrgenceController.getAllContactsUrgence);

// Get contacts urgence by patient ID
router.get('/patient/:patientId', contactUrgenceController.getContactsUrgenceByPatientId);

// Get contact urgence by ID
router.get('/:id', contactUrgenceController.getContactUrgenceById);

// Create new contact urgence
router.post('/', contactUrgenceController.createContactUrgence);

// Update contact urgence
router.put('/:id', contactUrgenceController.updateContactUrgence);

// Delete contact urgence
router.delete('/:id', contactUrgenceController.deleteContactUrgence);

export default router;