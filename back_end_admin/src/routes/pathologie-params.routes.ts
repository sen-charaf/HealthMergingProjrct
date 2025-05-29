import express from 'express';
import * as pathologieParamsController from '../controllers/pathologie-params.controller';

const router = express.Router();

// GET all pathologie params
router.get('/', pathologieParamsController.getAllPathologieParams);

// GET pathologie params by ID
router.get('/:id', pathologieParamsController.getPathologieParamsById);

// POST create new pathologie params
router.post('/', pathologieParamsController.createPathologieParams);

// PUT update pathologie params
router.put('/:id', pathologieParamsController.updatePathologieParams);

// DELETE pathologie params
router.delete('/:id', pathologieParamsController.deletePathologieParams);

export default router;