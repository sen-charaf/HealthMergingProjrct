import express from 'express';
import * as medecinController from '../controllers/medecin.controller';

const router = express.Router();

// Get all medecins
router.get('/', medecinController.getAllMedecins);

// Get medecin by ID
router.get('/:id', medecinController.getMedecinById);

// Create new medecin
router.post('/', medecinController.createMedecin);

// Update medecin
router.put('/:id', medecinController.updateMedecin);

// Delete medecin
router.delete('/:id', medecinController.deleteMedecin);

export default router;