import express from "express";
import { 
  generateSignature, 
  createMeeting, 
  getMeeting,
  handleRecordingWebhook,
  handleChatWebhook,
  getMeetingRecordings,
  getMeetingChatLogs
} from "../controllers/ZoomController.js";
import auth  from "../middlewares/authMiddleware.js";

const router = express.Router();


// Generate a signature for joining a Zoom meeting
router.post("/signature", auth, generateSignature);

// Create a new Zoom meeting
router.post("/meetings", auth, createMeeting);

// Get meeting details
router.get("/meetings/:meetingId", auth, getMeeting);

// Get meeting recordings
router.get("/meetings/:meetingId/recordings", auth, getMeetingRecordings);

// Get meeting chat logs
router.get("/meetings/:meetingId/chat", auth, getMeetingChatLogs);

// Webhook endpoints (no auth required as they're called by Zoom)
router.post("/webhooks/recording", handleRecordingWebhook);
router.post("/webhooks/chat", handleChatWebhook);

export default router;