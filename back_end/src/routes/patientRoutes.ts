import express from 'express';
import {
  getAllPatients,
  getPatientById,
  getPatientByUserId,
  createPatient,
  updatePatient,
  updatePatientByUserId,
  deletePatient,
  deletePatientByUserId,
  getPatientByName
} from '../controllers/PatientController.js';

const router = express.Router();

// Basic CRUD routes
router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.post('/', createPatient);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

router.get('/name/:name', getPatientByName);

// User ID based routes
router.get('/user/:userId', getPatientByUserId);
router.put('/user/:userId', updatePatientByUserId);
router.delete('/user/:userId', deletePatientByUserId);

export default router;