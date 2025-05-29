
import { Request, Response, NextFunction } from 'express';
import * as patientService from '../services/patient.service';
import { AppError } from '../utils/app-error';

// Get all patients
export const getAllPatients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patients = await patientService.findAll();
    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};

// Get patient by ID
export const getPatientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const patient = await patientService.findById(id);
    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
};

// Create new patient
export const createPatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patient = await patientService.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    next(error);
  }
};

// Update patient
export const updatePatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const patient = await patientService.update(id, req.body);
    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
};

// Delete patient
export const deletePatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    await patientService.remove(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};