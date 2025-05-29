import { Request, Response } from "express";
import patientService from "../services/PatientService.js";

// Get all patients
export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await patientService.findAllWithUserData();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error });
  }
};

// Get patient by ID
export const getPatientById = async (req: Request, res: Response) => {
  try {
    const patient = await patientService.findByIdWithUserData(req.params.id);
    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient", error });
  }
};

// Get patient by Name
export const getPatientByName = async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    // First, find patients by name in the User collection through the 'user' reference
    const patients = await patientService.findByName(name);
    
    if (!patients || patients.length === 0) {
      res.status(404).json({ message: "No patients found with that name" });
      return;
    }
    
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients by name", error });
  }
};

// Get patient by user ID
export const getPatientByUserId = async (req: Request, res: Response) => {
  try {
    const patient = await patientService.findByUserIdWithUserData(
      req.params.userId
    );
    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient", error });
  }
};

// Create new patient
export const createPatient = async (req: Request, res: Response) => {
  try {
    const savedPatient = await patientService.createPatient(req.body);
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(400).json({ message: "Error creating patient profile", error });
  }
};

// Update patient by ID
export const updatePatient = async (req: Request, res: Response) => {
  try {
    const updatedPatient = await patientService.updatePatient(
      req.params.id,
      req.body
    );
    if (!updatedPatient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: "Error updating patient profile", error });
  }
};

// Update patient by user ID
export const updatePatientByUserId = async (req: Request, res: Response) => {
  try {
    const updatedPatient = await patientService.updatePatientByUserId(
      req.params.userId,
      req.body
    );
    if (!updatedPatient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: "Error updating patient profile", error });
  }
};

// Delete patient by ID
export const deletePatient = async (req: Request, res: Response) => {
  try {
    const deletedPatient = await patientService.deletePatient(req.params.id);
    if (!deletedPatient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }
    res.status(200).json({ message: "Patient profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting patient profile", error });
  }
};

// Delete patient by user ID
export const deletePatientByUserId = async (req: Request, res: Response) => {
  try {
    const deletedPatient = await patientService.deletePatientByUserId(
      req.params.userId
    );
    if (!deletedPatient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }
    res.status(200).json({ message: "Patient profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting patient profile", error });
  }
};
