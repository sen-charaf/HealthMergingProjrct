import { Request, Response } from "express";
import HealthCondition from "../models/HealthCondition";

// Get all health categories
export const getHealthCategories = async (req: Request, res: Response) => {
  try {
    // Get only distinct categories
    const categories = await HealthCondition.aggregate([
      { $group: { _id: "$category" } },
      { $project: { _id: 0, name: "$_id" } },
      { $sort: { name: 1 } },
    ]);

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching health categories:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get health conditions by category
export const getHealthConditions = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    let query = {};
    if (category) {
      query = { category };
    }

    const conditions = await HealthCondition.find(query).sort({ name: 1 });
    res.status(200).json(conditions);
  } catch (error) {
    console.error("Error fetching health conditions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new health condition
export const createHealthCondition = async (req: Request, res: Response) => {
  try {
    const { name, description, category, icon, specialties } = req.body;
    
    // Validate required fields
    if (!name || !category) {
      return res.status(400).json({ message: "Name and category are required fields" });
    }
    
    // Check if health condition already exists
    const existingCondition = await HealthCondition.findOne({ name });
    if (existingCondition) {
      return res.status(409).json({ message: "Health condition already exists" });
    }
    
    // Create new health condition
    const newHealthCondition = new HealthCondition({
      name,
      description,
      category,
      icon,
      specialties: specialties || []
    });
    
    // Save to database
    const savedCondition = await newHealthCondition.save();
    
    res.status(201).json(savedCondition);
  } catch (error: any) {
    console.error("Error creating health condition:", error);
    
    // Handle validation errors from mongoose
    if (error?.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: Object.values(error?.errors).map((err: any) => err?.message)
      });
    }
    
    res.status(500).json({ message: "Server error" });
  }
};