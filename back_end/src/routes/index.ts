import express from 'express';
import userRoutes from './userRoutes.js';
import doctorRoutes from './doctorRoutes.js';
import patientRoutes from './patientRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import healthFacilityRoutes from './healthFacilityRoutes.js';
import medicalRecordRoutes from './medicalRecordRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import reportRoutes from './reportRoutes.js';
import authRoutes from './authRoutes.js';
import zoomRoutes from './zoomRoutes.js';
import appointmentRoutes from './appointmentRoutes.js';
import healthConditionRoutes from './healthConditionRoutes.js';
import specialityRoutes from './specialityRoutes.js';
import prescriptionRoutes from './prescriptionRoutes.js'; 

const router = express.Router();

router.use('/users', userRoutes);
router.use('/doctors', doctorRoutes);
router.use('/patients', patientRoutes);
router.use('/notifications', notificationRoutes);
router.use('/health-facilities', healthFacilityRoutes);
router.use('/medical-records', medicalRecordRoutes);
router.use('/reviews', reviewRoutes);
router.use('/reports', reportRoutes);
router.use('/auth', authRoutes);
router.use('/zoom', zoomRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/auth', authRoutes);
router.use('/health-condition', healthConditionRoutes);
router.use('/specialties', specialityRoutes);
router.use('/prescriptions', prescriptionRoutes);

export default router;