import express from 'express';
import * as allergieController from '../controllers/allergie.controller';

const router = express.Router();

// Get all allergies
router.get('/', allergieController.getAllAllergies);

// Get allergie by ID
router.get('/:id', allergieController.getAllergieById);

// Create new allergie
router.post('/', allergieController.createAllergie);

// Update allergie
router.put('/:id', allergieController.updateAllergie);

// Delete allergie
router.delete('/:id', allergieController.deleteAllergie);

export default router;