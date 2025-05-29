import express from 'express';
import * as documentPatientController from '../controllers/document-patient.controller';

const router = express.Router();

// Get all documents
router.get('/', documentPatientController.getAllDocuments);

// Get documents by patient ID
router.get('/patient/:patientId', documentPatientController.getDocumentsByPatientId);

// Get document by ID
router.get('/:id', documentPatientController.getDocumentById);

// Create new document
router.post('/', documentPatientController.createDocument);

// Update document
router.put('/:id', documentPatientController.updateDocument);

// Delete document
router.delete('/:id', documentPatientController.deleteDocument);

export default router;