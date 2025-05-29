import mongoose from 'mongoose';

const healthFacilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['hospital', 'clinic', 'emergency_center'], required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true }
  },
  phoneNumber: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  isOpen24_7: { type: Boolean, default: false },
  specialties: [String],
  acceptsEmergencies: { type: Boolean, default: true }
});

export default mongoose.models.HealthFacility || mongoose.model('HealthFacility', healthFacilitySchema);