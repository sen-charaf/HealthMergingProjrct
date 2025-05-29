import express from 'express';
import * as antecedentController from '../controllers/antecedent-medical.controller';

const router = express.Router();

// Get all antecedents
router.get('/', antecedentController.getAllAntecedents);

// Get antecedent by ID
router.get('/:id', antecedentController.getAntecedentById);

// Create new antecedent
router.post('/', antecedentController.createAntecedent);

// Update antecedent
router.put('/:id', antecedentController.updateAntecedent);

// Delete antecedent
router.delete('/:id', antecedentController.deleteAntecedent);

export default router;