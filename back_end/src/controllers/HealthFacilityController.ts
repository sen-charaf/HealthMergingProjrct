import HealthFacility from "../models/HealthFacility.js";
import { Request, Response } from "express";

// Get all health facilities
export const getAllHealthFacilities = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    const facilities = await HealthFacility.find();
    res.status(200).json(facilities);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching health facilities", error });
  }
};

// Get health facility by ID
export const getHealthFacilityById = async (req: Request, res: Response) => {
  try {
    const facility = await HealthFacility.findById(req.params.id);
    if (!facility) {
      res.status(404).json({ message: "Health facility not found" });
      return;
    }
    res.status(200).json(facility);
  } catch (error) {
    res.status(500).json({ message: "Error fetching health facility", error });
  }
};

// Create new health facility
export const createHealthFacility = async (req: Request, res: Response) => {
  try {
    const newFacility = new HealthFacility(req.body);
    const savedFacility = await newFacility.save();
    res.status(201).json(savedFacility);
  } catch (error) {
    res.status(400).json({ message: "Error creating health facility", error });
  }
};

// Update health facility
export const updateHealthFacility = async (req: Request, res: Response) => {
  try {
    const updatedFacility = await HealthFacility.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFacility) {
      res.status(404).json({ message: "Health facility not found" });
      return;
    }
    res.status(200).json(updatedFacility);
  } catch (error) {
    res.status(400).json({ message: "Error updating health facility", error });
  }
};

// Delete health facility
export const deleteHealthFacility = async (req: Request, res: Response) => {
  try {
    const deletedFacility = await HealthFacility.findByIdAndDelete(
      req.params.id
    );
    if (!deletedFacility) {
      res.status(404).json({ message: "Health facility not found" });
      return;
    }
    res.status(200).json({ message: "Health facility deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting health facility", error });
  }
};
