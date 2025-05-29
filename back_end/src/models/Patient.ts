import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicalHistory: String,
  allergies: [String],
  currentMedications: [String],
  bloodType: {type: String, enum: ['O+','O-','A+','A-','B+','B-','AB+','AB-']},
  emergencyContact: {
    name: String,
    relationship: String,
    phoneNumber: String
  },
  height: Number,
  weight: Number,
  bloodPressure: String,
  heartRate: Number,
});

export default mongoose.models.Patient || mongoose.model('Patient', patientSchema);