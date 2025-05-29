import express from 'express';
import * as typeIdentiteController from '../controllers/type-identite.controller';

const router = express.Router();

// Get all type identites
router.get('/', typeIdentiteController.getAllTypeIdentites);

// Get type identite by ID
router.get('/:id', typeIdentiteController.getTypeIdentiteById);

// Create new type identite
router.post('/', typeIdentiteController.createTypeIdentite);

// Update type identite
router.put('/:id', typeIdentiteController.updateTypeIdentite);

// Delete type identite
router.delete('/:id', typeIdentiteController.deleteTypeIdentite);

export default router;