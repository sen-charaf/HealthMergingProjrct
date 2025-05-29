import express from 'express';
import * as patientController from '../controllers/patient.controller';

const router = express.Router();

// Get all patients
router.get('/', patientController.getAllPatients);

// Get patient by ID
router.get('/:id', patientController.getPatientById);

// Create new patient
router.post('/', patientController.createPatient);

// Update patient
router.put('/:id', patientController.updatePatient);

// Delete patient
router.delete('/:id', patientController.deletePatient);

export default router;