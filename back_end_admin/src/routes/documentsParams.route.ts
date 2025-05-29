import express from 'express';
import * as documentParamsController from '../controllers/document-params.controller';

const router = express.Router();

// Get all document parametrages
router.get('/', documentParamsController.getAllDocumentParams);

// Get document params by ID
router.get('/:id', documentParamsController.getDocumentParamsById);

// Create new document params
router.post('/', documentParamsController.createDocumentParams);

// Update document params
router.put('/:id', documentParamsController.updateDocumentParams);

// Delete document params
router.delete('/:id', documentParamsController.deleteDocumentParams);

export default router;