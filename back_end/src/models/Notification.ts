import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['appointment_reminder', 'appointment_confirmation', 'appointment_cancellation', 'new_message', 'prescription', 'payment', 'system'],
    required: true
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  relatedTo: {
    model: { type: String, enum: ['Appointment', 'Message', 'MedicalRecord', 'Payment'] },
    id: mongoose.Schema.Types.ObjectId
  },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);