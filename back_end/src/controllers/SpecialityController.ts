import { Request, Response } from "express";
import specialityService from "../services/SpecialityService";

// Get recommended specialties for specific conditions
export const getSpecialistsForConditions = async (
  req: Request,
  res: Response
) => {
  try {
    const { conditions } = req.query;

    if (!conditions) {
      res.status(400).json({ message: "Conditions parameter is required" });
      return;
    }

    // Handle both array and comma-separated string formats
    let conditionIds: string[];
    if (Array.isArray(conditions)) {
      conditionIds = conditions.map((id) => String(id));
    } else {
      // Split comma-separated string and remove any empty values
      conditionIds = String(conditions)
        .split(',')
        .map(id => id.trim())
        .filter(id => id.length > 0);
    }

    console.log("conditionIds: ", conditionIds);

    if (conditionIds.length === 0) {
      res.status(400).json({ message: "At least one valid condition ID is required" });
      return;
    }

    const recommendations = await specialityService.getSpecialistsForConditions(
      conditionIds
    );

    res.status(200).json(recommendations);
  } catch (error) {
    console.error("Error getting specialists for conditions:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get all specialties
export const getAllSpecialties = async (req: Request, res: Response) => {
  try {
    const specialties = await specialityService.getAllSpecialties();
    res.status(200).json(specialties);
  } catch (error) {
    console.error("Error fetching specialties:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get specialty by ID
export const getSpecialtyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const specialty = await specialityService.getSpecialtyById(id);

    if (!specialty) {
      res.status(404).json({ message: "Specialty not found" });
      return;
    }

    res.status(200).json(specialty);
  } catch (error) {
    console.error("Error fetching specialty:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new specialty
export const createSpecialty = async (req: Request, res: Response) => {
  try {
    const { name, description, icon, commonConditions } = req.body;

    if (!name) {
      res.status(400).json({ message: "Name is required" });
      return;
    }

    const newSpecialty = await specialityService.createSpecialty({
      name,
      description,
      icon,
      commonConditions
    });

    res.status(201).json(newSpecialty);
  } catch (error) {
    console.error("Error creating specialty:", error);
    res.status(500).json({ message: "Server error" });
  }
};