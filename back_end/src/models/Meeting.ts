import mongoose from 'mongoose';

const recordingSchema = new mongoose.Schema({
  recordingId: String,
  fileType: String,
  fileSize: Number,
  playUrl: String,
  downloadUrl: String,
  status: String,
  recordingType: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const chatMessageSchema = new mongoose.Schema({
  sender: {
    id: String,
    name: String,
    role: String
  },
  message: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const meetingSchema = new mongoose.Schema({
  zoomMeetingId: {
    type: String,
    required: true,
    unique: true
  },
  topic: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  joinUrl: String,
  startUrl: String,
  password: String,
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'started', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  recordings: [recordingSchema],
  chatLogs: [chatMessageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

meetingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting;