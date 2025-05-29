import { Request, Response } from "express";
import prescriptionService from "../services/PrescriptionService";

// Obtenir toutes les ordonnances
export const getAllPrescriptions = async (req: Request, res: Response) => {
  try {
    const prescriptions = await prescriptionService.findAll("patientId doctorId");
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ 
      message: "Erreur lors de la récupération des ordonnances",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

// Obtenir une ordonnance par ID
export const getPrescriptionById = async (req: Request, res: Response) => {
  try {
    const prescription = await prescriptionService.findById(
      req.params.id, 
      "patientId doctorId"
    );
    
    if (!prescription) {
      res.status(404).json({ message: "Ordonnance non trouvée" });
      return;
    }
    
    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ 
      message: "Erreur lors de la recherche de l'ordonnance",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

// Créer une nouvelle ordonnance
export const createPrescription = async (req: Request, res: Response) => {
  try {
    const newPrescription = await prescriptionService.createPrescription(req.body);
    res.status(201).json(newPrescription);
  } catch (error) {
    res.status(400).json({ 
      message: "Erreur lors de la création de l'ordonnance",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

// Mettre à jour une ordonnance
export const updatePrescription = async (req: Request, res: Response) => {
  try {
    const updatedPrescription = await prescriptionService.update(
      req.params.id, 
      req.body
    );
    
    if (!updatedPrescription) {
      res.status(404).json({ message: "Ordonnance non trouvée" });
      return;
    }
    
    res.status(200).json(updatedPrescription);
  } catch (error) {
    res.status(400).json({ 
      message: "Erreur lors de la mise à jour de l'ordonnance",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

// Supprimer une ordonnance
export const deletePrescription = async (req: Request, res: Response) => {
  try {
    const deletedPrescription = await prescriptionService.delete(req.params.id);
    
    if (!deletedPrescription) {
      res.status(404).json({ message: "Ordonnance non trouvée" });
      return;
    }
    
    res.status(200).json({ message: "Ordonnance supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ 
      message: "Erreur lors de la suppression de l'ordonnance",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

// Obtenir les ordonnances d'un patient
export const getPrescriptionsByPatient = async (req: Request, res: Response) => {
  try {
    const prescriptions = await prescriptionService.findByPatientId(
      req.params.patientId,
      "doctorId"
    );
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ 
      message: "Erreur lors de la récupération des ordonnances du patient",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

// Obtenir les ordonnances d'un médecin
export const getPrescriptionsByDoctor = async (req: Request, res: Response) => {
  try {
    const prescriptions = await prescriptionService.findByDoctorId(
      req.params.doctorId,
      "patientId"
    );
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ 
      message: "Erreur lors de la récupération des ordonnances du médecin",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

// Mettre à jour le statut d'une ordonnance
export const updatePrescriptionStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const updatedPrescription = await prescriptionService.updatePrescriptionStatus(
      req.params.id, 
      status
    );
    
    if (!updatedPrescription) {
      res.status(404).json({ message: "Ordonnance non trouvée" });
      return;
    }
    
    res.status(200).json(updatedPrescription);
  } catch (error) {
    res.status(400).json({ 
      message: "Erreur lors de la mise à jour du statut de l'ordonnance",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

// Ajouter un renouvellement à une ordonnance
export const addPrescriptionRefill = async (req: Request, res: Response) => {
  try {
    const { medicationIndex } = req.body;
    const updatedPrescription = await prescriptionService.addRefill(
      req.params.id,
      medicationIndex
    );
    
    res.status(200).json(updatedPrescription);
  } catch (error) {
    res.status(400).json({ 
      message: "Erreur lors de l'ajout du renouvellement",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};