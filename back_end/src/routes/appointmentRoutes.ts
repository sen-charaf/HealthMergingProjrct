import express from "express";
import {
  createAppointment,
  getAppointmentDetails,
  cancelAppointment,
  getAllAppointments,
  getDoctorAppointments,
  changeAppointmentStatus
} from "../controllers/AppointmentController";
import  protect  from "../middlewares/authMiddleware";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router({ mergeParams: true });

// Routes protégées (nécessitent authentification)
router.post("/", protect, createAppointment);
router.get("/", getAllAppointments);

router.get("/doctor", protect, getDoctorAppointments);
router.put("/:id/status", protect, changeAppointmentStatus);

router.get("/:id", protect, getAppointmentDetails);
router.put("/:id/cancel", protect, cancelAppointment);
router.put("/:id/cancel", protect, cancelAppointment);

export default router;
