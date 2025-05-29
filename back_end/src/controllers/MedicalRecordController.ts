import MedicalRecord from "../models/MedicalRecord.js";
import { Request, Response } from "express";

// Get all medical records
export const getAllMedicalRecords = async (req: Request, res: Response) => {
  try {
    const records = await MedicalRecord.find()
      .populate("patient")
      .populate("doctor")
      .populate("appointment");
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching medical records", error });
  }
};

// Get medical records by patient ID
export const getMedicalRecordsByPatientId = async (
  req: Request,
  res: Response
) => {
  try {
    const records = await MedicalRecord.find({ patient: req.params.patientId })
      .populate("doctor")
      .populate("appointment")
      .sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching patient medical records", error });
  }
};

// Get medical records by doctor ID
export const getMedicalRecordsByDoctorId = async (
  req: Request,
  res: Response
) => {
  try {
    const records = await MedicalRecord.find({ doctor: req.params.doctorId })
      .populate("patient")
      .populate("appointment")
      .sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching doctor medical records", error });
  }
};

// Get medical record by ID
export const getMedicalRecordById = async (req: Request, res: Response) => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate("patient")
      .populate("doctor")
      .populate("appointment");
    if (!record) {
      res.status(404).json({ message: "Medical record not found" });
      return;
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: "Error fetching medical record", error });
  }
};

// Create new medical record
export const createMedicalRecord = async (req: Request, res: Response) => {
  try {
    const newRecord = new MedicalRecord(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: "Error creating medical record", error });
  }
};

// Update medical record
export const updateMedicalRecord = async (req: Request, res: Response) => {
  try {
    const updatedRecord = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedRecord) {
      res.status(404).json({ message: "Medical record not found" });
      return;
    }
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: "Error updating medical record", error });
  }
};

// Delete medical record
export const deleteMedicalRecord = async (req: Request, res: Response) => {
  try {
    const deletedRecord = await MedicalRecord.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      res.status(404).json({ message: "Medical record not found" });
      return;
    }
    res.status(200).json({ message: "Medical record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting medical record", error });
  }
};
