import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import appointmentService from "../services/AppointmentService.js";
import Doctor from "../models/Doctor";

// Créer un rendez-vous
export const createAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const { doctorId, date, startTime, endTime, conditionIds, notes } =
      req.body;

      console.log("req.body", req.body);      

    // Valider les données
    if (!doctorId || !date || !startTime || !endTime) {
      res.status(400).json({
        message: "Doctor ID, date, start time and end time are required",
      });
      return;
    }

    // Créer le rendez-vous via le service
    const savedAppointment = await appointmentService.createAppointment({
      doctorId,
      patientId: req.user.userId,
      date,
      startTime,
      endTime,
      conditionIds,
      notes,
    });

    res.status(201).json(savedAppointment);
    return;
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Server error",
    });
    return;
  }
};

// Annuler un rendez-vous
export const cancelAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const updatedAppointment = await appointmentService.cancelAppointment(
      id,
      req.user.userId,
      req.user.role,
      reason
    );

    res.status(200).json(updatedAppointment);
    return;
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Server error",
    });
    return;
  }
};

// Obtenir les détails d'un rendez-vous
export const getAppointmentDetails = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const appointment = await appointmentService.getAppointmentDetails(
      id,
      req.user.userId,
      req.user.role
    );

    res.status(200).json(appointment);
    return;
  } catch (error) {
    console.error("Error getting appointment details:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Server error",
    });
    return;
  }
};

// Obtenir les rendez-vous d'un patient
export const getPatientAppointments = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const appointments = await appointmentService.findByPatient(
      req.user.userId,
      ["doctor", "patient"]
    );

    res.status(200).json(appointments);
    return;
  } catch (error) {
    console.error("Error getting patient appointments:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Server error",
    });
    return;
  }
};

// Obtenir les rendez-vous d'un médecin
export const getDoctorAppointments = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    console.log("req.user.userId: ", req.user.userId);

    const appointments = await appointmentService.findByDoctor(
      req.user.userId,
      ["doctor", "patient"]
    );

    res.status(200).json(appointments);
    return;
  } catch (error) {
    console.error("Error getting doctor appointments:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Server error",
    });
    return;
  }
};

// Obtenir les créneaux disponibles pour un médecin à une date donnée
export const getAvailableSlots = async (req: Request, res: Response) => {
  try {
    const { doctorId, date } = req.params;

    // Vérifier si le médecin existe
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      res.status(404).json({ message: "Doctor not found" });
      return;
    }

    // Obtenir le jour de la semaine
    const selectedDate = new Date(date);
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = dayNames[selectedDate.getDay()];

    // Trouver la disponibilité pour ce jour dans l'emploi du temps du médecin
    const daySchedule = doctor.availabilitySchedule.find(
      (schedule: { day: string; isAvailable: boolean }) =>
        schedule.day === dayName && schedule.isAvailable
    );

    if (!daySchedule) {
      res.status(200).json({ slots: [] });
      return;
    }

    // Obtenir les créneaux disponibles
    const slots = await appointmentService.getAvailableSlotsForDay(
      doctorId,
      selectedDate,
      daySchedule.startTime,
      daySchedule.endTime
    );

    res.status(200).json({ slots });
    return;
  } catch (error) {
    console.error("Error getting available slots:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Server error",
    });
    return;
  }
};

// Obtenir les catégories de santé
export const getHealthCategories = async (req: Request, res: Response) => {
  try {
    const categories = await appointmentService.getHealthCategories();
    res.status(200).json(categories);
    return;
  } catch (error) {
    console.error("Error getting health categories:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Server error",
    });
    return;
  }
};

// Obtenir tous les rendez-vous (généralement pour les administrateurs)
export const getAllAppointments = async (req: AuthRequest, res: Response) => {
  try {
 
    // Obtenir les paramètres de requête pour la pagination et le filtrage
    const { page = 1, limit = 10, status, doctorId, patientId, startDate, endDate } = req.query;

    const appointments = await appointmentService.getAllAppointments({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      status: status as string,
      doctorId: doctorId as string,
      patientId: patientId as string,
      startDate: startDate as string,
      endDate: endDate as string,
    });

    res.status(200).json(appointments);
    return;
  } catch (error) {
    console.error("Error getting all appointments:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Server error",
    });
    return;
  }
};

// Change the status of an appointment
export const changeAppointmentStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate required fields
    if (!status) {
      res.status(400).json({ message: "Status is required" });
      return;
    }

    // Validate status value
    const validStatuses = [
      "scheduled",
      "confirmed",
      "in-progress",
      "completed",
      "cancelled",
      "no-show"
    ];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ message: "Invalid status value" });
      return;
    }

    // Update appointment status via service
    const updatedAppointment = await appointmentService.changeAppointmentStatus(
      id,
      status,
      req.user.userId,
      req.user.role
    );

    res.status(200).json(updatedAppointment);
    return;
  } catch (error) {
    console.error("Error changing appointment status:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Server error",
    });
    return;
  }
};