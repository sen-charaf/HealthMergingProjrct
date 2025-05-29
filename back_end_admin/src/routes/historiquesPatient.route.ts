import express from 'express';
import * as historiquePatientController from '../controllers/historique-patient.controller';

const router = express.Router();

// Get all historiques
router.get('/', historiquePatientController.getAllHistoriques);

// Get historiques by patient ID
router.get('/patient/:patientId', historiquePatientController.getHistoriquesByPatientId);

// Get historique by ID
router.get('/:id', historiquePatientController.getHistoriqueById);

// Create new historique
router.post('/', historiquePatientController.createHistorique);

// Delete historique
router.delete('/:id', historiquePatientController.deleteHistorique);

export default router;