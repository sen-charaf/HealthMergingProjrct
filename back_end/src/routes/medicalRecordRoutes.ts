import express from 'express';
import {
  getAllMedicalRecords,
  getMedicalRecordsByPatientId,
  getMedicalRecordsByDoctorId,
  getMedicalRecordById,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord
} from '../controllers/MedicalRecordController.js';

const router = express.Router();

router.get('/', getAllMedicalRecords);
router.get('/patient/:patientId', getMedicalRecordsByPatientId);
router.get('/doctor/:doctorId', getMedicalRecordsByDoctorId);
router.get('/:id', getMedicalRecordById);
router.post('/', createMedicalRecord);
router.put('/:id', updateMedicalRecord);
router.delete('/:id', deleteMedicalRecord);

export default router;