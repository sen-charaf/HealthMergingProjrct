import { Request, Response } from "express";
import doctorService from "../services/DoctorService.js";
import userService from "../services/UserService.js";

// Get all doctors
export const getAllDoctors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const doctors = await doctorService.findAll("user");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
};

// Get doctor by ID
export const getDoctorById = async (
  req: Request,
  res: Response
) => {
  try {
    const doctor = await doctorService.findById(req.params.id, "user");
    if (!doctor) {
      res.status(404).json({ message: "Doctor not found" });
      return;
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor", error });
  }
};

// Create new doctor
export const createDoctor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const savedDoctor = await doctorService.create(req.body);
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(400).json({ message: "Error creating doctor profile", error });
  }
};

// Update doctor
export const updateDoctor = async (
  req: Request,
  res: Response
) => {
  try {
    const updatedDoctor = await doctorService.update(req.params.id, req.body);
    if (!updatedDoctor) {
      res.status(404).json({ message: "Doctor not found" });
      return;
    }
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ message: "Error updating doctor profile", error });
  }
};

// Delete doctor
export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const deletedDoctor = await doctorService.delete(req.params.id);
    if (!deletedDoctor) {
      res.status(404).json({ message: "Doctor not found" });
      return;
    }
    res.status(200).json({ message: "Doctor profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor profile", error });
  }
};

// Get doctor profile
export const getDoctorProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const doctor = await doctorService.getDoctorWithUser(userId);

    res.status(200).json(doctor);
  } catch (error) {
    res.status(404).json({
      message: "Doctor profile not found",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Update doctor profile
export const updateDoctorProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Validate required fields
    if (!req.body.speciality || !req.body.professionalLicenseNumber) {
      res.status(400).json({
        message: "Speciality and professional license number are required",
      });
      return;
    }

    // Check if the license number is already in use (except by this doctor)
    const existingDoctors = await doctorService.find({
      professionalLicenseNumber: req.body.professionalLicenseNumber,
    });

    const existingDoctor =
      existingDoctors.length > 0 ? existingDoctors[0] : null;

    if (existingDoctor && existingDoctor.user.toString() !== userId) {
      res.status(400).json({
        message: "This professional license number is already registered",
      });
      return;
    }

    const updatedDoctor = await doctorService.updateDoctorProfile(
      userId,
      req.body
    );

    res.status(200).json({
      message: "Doctor profile updated successfully",
      doctor: updatedDoctor,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating doctor profile",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get all verified doctors
export const getAllVerifiedDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await doctorService.find({ isVerifiedDoctor: true });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching doctors",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get doctors by speciality
export const getDoctorsBySpeciality = async (req: Request, res: Response) => {
  try {
    const speciality = req.params.speciality;
    const doctors = await doctorService.findBySpeciality(speciality, "user");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching doctors by speciality",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
