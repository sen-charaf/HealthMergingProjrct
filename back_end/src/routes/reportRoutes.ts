import express from 'express';
import {
  getAllReports,
  getUnsolvedReports,
  getReportById,
  createReport,
  solveReport,
  deleteReport
} from '../controllers/ReportController.js';

const router = express.Router();

router.get('/', getAllReports);
router.get('/unsolved', getUnsolvedReports);
router.get('/:id', getReportById);
router.post('/', createReport);
router.patch('/:id/solve', solveReport);
router.delete('/:id', deleteReport);

export default router;