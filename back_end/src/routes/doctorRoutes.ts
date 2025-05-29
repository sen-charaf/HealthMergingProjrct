import express from "express";
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorProfile,
  updateDoctorProfile,
  getAllVerifiedDoctors,
  getDoctorsBySpeciality,
} from "../controllers/DoctorController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

// Basic CRUD routes
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.post("/", auth, createDoctor);
router.put("/:id", auth, updateDoctor);
router.delete("/:id", auth, deleteDoctor);

// Doctor profile routes
router.get("/user/:userId", getDoctorProfile);
router.put("/user/:userId", auth, updateDoctorProfile);

// Speciality routes
router.get("/speciality/:speciality", getDoctorsBySpeciality);

// Verified doctors route
router.get("/verified/list", getAllVerifiedDoctors);

export default router;
