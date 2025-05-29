import express from 'express';
import {
  getAllHealthFacilities,
  getHealthFacilityById,
  createHealthFacility,
  updateHealthFacility,
  deleteHealthFacility
} from '../controllers/HealthFacilityController.js';

const router = express.Router();

router.get('/', getAllHealthFacilities);
router.get('/:id', getHealthFacilityById);
router.post('/', createHealthFacility);
router.put('/:id', updateHealthFacility);
router.delete('/:id', deleteHealthFacility);

export default router;