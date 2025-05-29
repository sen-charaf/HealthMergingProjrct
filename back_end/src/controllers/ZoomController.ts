import { Request, Response } from "express";
import ZoomService from "../services/ZoomService.js";

// Generate a Zoom meeting signature
export const generateSignature = (req: Request, res: Response): void => {
  try {
    const { meetingNumber, role } = req.body;
    
    // Validate required parameters
    if (!meetingNumber) {
      res.status(400).json({ message: "Meeting number is required" });
      return;
    }
    
    const signature = ZoomService.generateSignature(meetingNumber, role || 0);
    
    res.status(200).json({
      signature: signature
    });
  } catch (error) {
    console.error("Error generating Zoom signature:", error);
    res.status(500).json({ message: "Failed to generate signature", error });
  }
};

// Create a new Zoom meeting
export const createMeeting = async (req: Request, res: Response): Promise<void> => {
  try {
    const { topic, duration, startTime, doctorId, patientId, appointmentId } = req.body;
    
    // Validate required parameters
    if (!topic || !duration || !startTime || !doctorId || !patientId || !appointmentId) {
      res.status(400).json({ message: "Missing required meeting parameters" });
      return;
    }
    
    const meeting = await ZoomService.createMeeting({
      topic,
      duration,
      startTime,
      doctorId,
      patientId,
      appointmentId
    });
    
    res.status(201).json(meeting);
  } catch (error) {
    console.error("Error creating Zoom meeting:", error);
    res.status(500).json({ message: "Failed to create meeting", error });
  }
};

// Get meeting details
export const getMeeting = async (req: Request, res: Response): Promise<void> => {
  try {
    const { meetingId } = req.params;
    
    const meeting = await ZoomService.getMeeting(meetingId);
    
    res.status(200).json(meeting);
  } catch (error) {
    console.error("Error fetching meeting:", error);
    res.status(500).json({ 
      message: error instanceof Error ? error.message : "Failed to fetch meeting", 
      error 
    });
  }
};

// Handle Zoom webhook for recording completed
export const handleRecordingWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { payload } = req.body;
    
    await ZoomService.processRecordingWebhook(payload);
    
    res.status(200).send('Webhook processed successfully');
  } catch (error) {
    console.error("Error processing recording webhook:", error);
    res.status(500).json({ message: "Failed to process webhook", error });
  }
};

// Handle Zoom webhook for chat logs
export const handleChatWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { payload } = req.body;
    
    await ZoomService.processChatWebhook(payload);
    
    res.status(200).send('Chat webhook processed successfully');
  } catch (error) {
    console.error("Error processing chat webhook:", error);
    res.status(500).json({ message: "Failed to process webhook", error });
  }
};

// Get meeting recordings
export const getMeetingRecordings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { meetingId } = req.params;
    const refresh = req.query.refresh === 'true';
    
    const recordings = await ZoomService.getMeetingRecordings(meetingId, refresh);
    
    res.status(200).json(recordings);
  } catch (error) {
    console.error("Error fetching recordings:", error);
    res.status(500).json({ 
      message: error instanceof Error ? error.message : "Failed to fetch recordings", 
      error 
    });
  }
};

// Get meeting chat logs
export const getMeetingChatLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { meetingId } = req.params;
    
    const chatLogs = await ZoomService.getMeetingChatLogs(meetingId);
    
    res.status(200).json(chatLogs);
  } catch (error) {
    console.error("Error fetching chat logs:", error);
    res.status(500).json({ 
      message: error instanceof Error ? error.message : "Failed to fetch chat logs", 
      error 
    });
  }
};