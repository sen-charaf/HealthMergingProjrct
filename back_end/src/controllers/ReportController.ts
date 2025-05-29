import Report from "../models/Report.js";
import { Request, Response } from "express";

// Get all reports
export const getAllReports = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find()
      .populate("reporter")
      .populate("reportedUser")
      .populate("solvedBy");
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error });
  }
};

// Get unsolved reports
export const getUnsolvedReports = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find({ isSolved: false })
      .populate("reporter")
      .populate("reportedUser")
      .sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching unsolved reports", error });
  }
};

// Get report by ID
export const getReportById = async (req: Request, res: Response) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate("reporter")
      .populate("reportedUser")
      .populate("solvedBy");
    if (!report) {
      res.status(404).json({ message: "Report not found" });
      return;
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error fetching report", error });
  }
};

// Create new report
export const createReport = async (req: Request, res: Response) => {
  try {
    const newReport = new Report(req.body);
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(400).json({ message: "Error creating report", error });
  }
};

// Mark report as solved
export const solveReport = async (req: Request, res: Response) => {
  try {
    if (!req.body.solvedBy) {
      res.status(400).json({ message: "solvedBy field is required" });
      return;
    }

    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      {
        isSolved: true,
        solvedBy: req.body.solvedBy,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedReport) {
      res.status(404).json({ message: "Report not found" });
      return;
    }

    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(400).json({ message: "Error updating report", error });
  }
};

// Delete report
export const deleteReport = async (req: Request, res: Response) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);
    if (!deletedReport) {
      res.status(404).json({ message: "Report not found" });
      return;
    }
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting report", error });
  }
};
