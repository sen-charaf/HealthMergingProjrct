import express from 'express';
import * as pathologieController from '../controllers/pathologie.controller';

const router = express.Router();

// Get all pathologies
router.get('/', pathologieController.getAllPathologies);

// Get pathologie by ID
router.get('/:id', pathologieController.getPathologieById);

// Create new pathologie
router.post('/', pathologieController.createPathologie);

// Update pathologie
router.put('/:id', pathologieController.updatePathologie);

// Delete pathologie
router.delete('/:id', pathologieController.deletePathologie);

export default router;