import express from 'express';
import {
    getSpecialistsForConditions,
    getAllSpecialties,
    getSpecialtyById,
    createSpecialty,
} from '../controllers/SpecialityController.js';

const router = express.Router();

router.route('/').get(getSpecialistsForConditions).post(createSpecialty);
router.route('/all').get(getAllSpecialties);

export default router;