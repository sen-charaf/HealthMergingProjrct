import crypto from "crypto";
import axios from "axios";
import Meeting from "../models/Meeting.js";
import Appointment from "../models/Appointment.js";
import dotenv from "dotenv";

dotenv.config();
// Store OAuth token
let oauthToken: string | null = null;
let tokenExpiry: number = 0;

class ZoomService {
  /**
   * Get OAuth token for Zoom API
   */
  async getZoomOAuthToken(): Promise<string> {
    // Check if we have a valid token
    if (oauthToken && tokenExpiry > Date.now()) {
      return oauthToken;
    }
    
    // Get OAuth credentials
    const clientId = process.env.ZOOM_CLIENT_ID;
    const clientSecret = process.env.ZOOM_CLIENT_SECRET;
    
    if (!clientId || !clientSecret) {
      throw new Error("Zoom OAuth credentials not configured");
    }
    
    try {
      // Encode credentials for Basic Auth
      const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
      
      // Request new token
      const response = await axios.post(
        'https://zoom.us/oauth/token',
        'grant_type=account_credentials&account_id=' + process.env.ZOOM_ACCOUNT_ID,
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      
      // Store token and expiry
      oauthToken = response.data.access_token;
      // Set expiry time (subtract 5 minutes for safety)
      tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 300000;
      
      if (!oauthToken) {
        throw new Error("OAuth token is null");
      }
      return oauthToken;
    } catch (error) {
      console.error("Error getting Zoom OAuth token:", error);
      throw new Error("Failed to authenticate with Zoom");
    }
  }

  /**
   * Generate a signature for joining a Zoom meeting
   */
  generateSignature(meetingNumber: string, role: number): string {
    // Get API Key and Secret from environment variables
    const apiKey = process.env.ZOOM_CLIENT_ID;
    const apiSecret = process.env.ZOOM_CLIENT_SECRET;
    
    if (!apiKey || !apiSecret) {
      throw new Error("Zoom API credentials not configured");
    }
    
    // Timestamp for the signature
    const timestamp = new Date().getTime() - 30000;
    
    // Format the signature data
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64');
    
    // Generate the signature using HMAC-SHA256
    const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64');
    const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64');
    
    return signature;
  }

  /**
   * Create a new Zoom meeting
   */
  async createMeeting(meetingData: {
    topic: string;
    duration: number;
    startTime: string;
    doctorId: string;
    patientId: string;
    appointmentId: string;
  }): Promise<Document & any> {
    const { topic, duration, startTime, doctorId, patientId, appointmentId } = meetingData;
    
    // Get Zoom account email
    const zoomAccountEmail = process.env.ZOOM_ACCOUNT_EMAIL;
    
    if (!zoomAccountEmail) {
      throw new Error("Zoom account email not configured");
    }
    
    // Get OAuth token
    const token = await this.getZoomOAuthToken();
    
    // Create meeting in Zoom
    const zoomResponse = await axios.post(
      'https://api.zoom.us/v2/users/' + zoomAccountEmail + '/meetings',
      {
        topic,
        type: 2, // Scheduled meeting
        start_time: startTime,
        duration,
        timezone: "UTC",
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
          auto_recording: "cloud", // Enable cloud recording
          waiting_room: true,
          meeting_authentication: true,
        },
      },
      {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    );
    
    // Extract meeting details from Zoom response
    const { id: zoomMeetingId, join_url, password, start_url } = zoomResponse.data;
    
    // Create meeting record in our database
    const meeting = new Meeting({
      zoomMeetingId,
      topic,
      startTime,
      duration,
      joinUrl: join_url,
      startUrl: start_url,
      password,
      doctorId,
      patientId,
      appointmentId,
      status: 'scheduled',
      recordings: [],
      chatLogs: []
    });
    
    await meeting.save();
    
    // Update the appointment with meeting information
    await Appointment.findByIdAndUpdate(appointmentId, {
      meetingId: meeting._id,
      meetingUrl: join_url
    });
    
    return meeting;
  }

  /**
   * Get meeting by ID
   */
  async getMeeting(meetingId: string): Promise<Document & any> {
    const meeting = await Meeting.findOne({ zoomMeetingId: meetingId });
    console.log(meetingId);
    
    if (!meeting) {
      throw new Error("Meeting not found");
    }
    
    return meeting;
  }

  /**
   * Process recording webhook data
   */
  async processRecordingWebhook(payload: any): Promise<void> {
    // Verify this is a recording completed event
    if (payload.object.type !== 'recording' || payload.event !== 'recording.completed') {
      return; // Event ignored
    }
    
    const zoomMeetingId = payload.object.id;
    const recordingFiles = payload.object.recording_files || [];
    
    // Find the meeting in our database
    const meeting = await Meeting.findOne({ zoomMeetingId });
    
    if (!meeting) {
      console.error(`Meeting with Zoom ID ${zoomMeetingId} not found`);
      throw new Error("Meeting not found");
    }
    
    // Update meeting with recording information
    meeting.recordings = recordingFiles.map((file: any) => ({
      recordingId: file.id,
      fileType: file.file_type,
      fileSize: file.file_size,
      playUrl: file.play_url,
      downloadUrl: file.download_url,
      status: file.status,
      recordingType: file.recording_type,
    }));
    
    meeting.status = 'completed';
    await meeting.save();
  }

  /**
   * Process chat webhook data
   */
  async processChatWebhook(payload: any): Promise<void> {
    // Verify this is a chat event
    if (payload.object.type !== 'meeting' || !payload.event.includes('chat')) {
      return; // Event ignored
    }
    
    const zoomMeetingId = payload.object.id;
    const chatMessage = payload.object.message || {};
    
    // Find the meeting in our database
    const meeting = await Meeting.findOne({ zoomMeetingId });
    
    if (!meeting) {
      console.error(`Meeting with Zoom ID ${zoomMeetingId} not found`);
      throw new Error("Meeting not found");
    }
    
    // Add chat message to meeting
    meeting.chatLogs.push({
      sender: chatMessage.sender,
      message: chatMessage.text,
      timestamp: new Date(chatMessage.timestamp || Date.now())
    });
    
    await meeting.save();
  }

  /**
   * Get meeting recordings with optional refresh from Zoom API
   */
  async getMeetingRecordings(meetingId: string, refresh: boolean = false): Promise<any[]> {
    const meeting = await Meeting.findById(meetingId);
    
    if (!meeting) {
      throw new Error("Meeting not found");
    }
    
    // If we need to fetch updated recordings from Zoom API
    if (refresh && meeting.zoomMeetingId) {
      try {
        const token = await this.getZoomOAuthToken();
        const response = await axios.get(
          `https://api.zoom.us/v2/meetings/${meeting.zoomMeetingId}/recordings`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (response.data && response.data.recording_files) {
          meeting.recordings = response.data.recording_files.map((file: any) => ({
            recordingId: file.id,
            fileType: file.file_type,
            fileSize: file.file_size,
            playUrl: file.play_url,
            downloadUrl: file.download_url,
            status: file.status,
            recordingType: file.recording_type,
          }));
          
          await meeting.save();
        }
      } catch (err) {
        console.error("Error refreshing recordings from Zoom API:", err);
        // Continue to return existing recordings even if refresh fails
      }
    }
    
    return meeting.recordings;
  }

  /**
   * Get meeting chat logs
   */
  async getMeetingChatLogs(meetingId: string): Promise<any[]> {
    const meeting = await Meeting.findById(meetingId);
    
    if (!meeting) {
      throw new Error("Meeting not found");
    }
    
    return meeting.chatLogs;
  }
}

export default new ZoomService();