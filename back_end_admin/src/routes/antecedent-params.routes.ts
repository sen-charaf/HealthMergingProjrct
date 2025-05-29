import express from 'express';
import * as antecedentParamsController from '../controllers/antecedent-params.controller';

const router = express.Router();

// GET all antecedent params
router.get('/', antecedentParamsController.getAllAntecedentParams);

// GET antecedent params by ID
router.get('/:id', antecedentParamsController.getAntecedentParamsById);

// POST create new antecedent params
router.post('/', antecedentParamsController.createAntecedentParams);

// PUT update antecedent params
router.put('/:id', antecedentParamsController.updateAntecedentParams);

// DELETE antecedent params
router.delete('/:id', antecedentParamsController.deleteAntecedentParams);

export default router;