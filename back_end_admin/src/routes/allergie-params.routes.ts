import express from 'express';
import * as allergieParamsController from '../controllers/allergie-params.controller';

const router = express.Router();

// GET all allergie params
router.get('/', allergieParamsController.getAllAllergieParams);

// GET allergie params by ID
router.get('/:id', allergieParamsController.getAllergieParamsById);

// POST create new allergie params
router.post('/', allergieParamsController.createAllergieParams);

// PUT update allergie params
router.put('/:id', allergieParamsController.updateAllergieParams);

// DELETE allergie params
router.delete('/:id', allergieParamsController.deleteAllergieParams);

export default router;