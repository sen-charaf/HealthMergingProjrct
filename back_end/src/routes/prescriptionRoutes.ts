import express from 'express';
import {
  getAllPrescriptions,
  getPrescriptionById,
  createPrescription,
  updatePrescription,
  deletePrescription,
  getPrescriptionsByPatient,
  getPrescriptionsByDoctor,
  updatePrescriptionStatus,
  addPrescriptionRefill
} from '../controllers/prescriptionController';

const router = express.Router();

// CRUD Routes
router.get('/', getAllPrescriptions);
router.get('/:id', getPrescriptionById);
router.post('/', createPrescription);
router.put('/:id', updatePrescription);
router.delete('/:id', deletePrescription);

// Special Routes
router.get('/patient/:patientId', getPrescriptionsByPatient);
router.get('/doctor/:doctorId', getPrescriptionsByDoctor);
router.patch('/:id/status', updatePrescriptionStatus);
router.post('/:id/refill', addPrescriptionRefill);

export default router;