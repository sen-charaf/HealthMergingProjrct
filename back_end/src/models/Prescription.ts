import mongoose from 'mongoose';

const PrescriptionSchema = new mongoose.Schema({
  // Informations patient
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, "L'ID du patient est requis"]
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, "L'ID du médecin est requis"]
  },

  // Détails prescription
  datePrescribed: {
    type: Date,
    default: Date.now,
    required: true
  },
  expirationDate: Date,
  status: {
    type: String,
    enum: ['active', 'expired', 'completed', 'cancelled'],
    default: 'active'
  },

  // Médicaments
  medications: [{
    name: {
      type: String,
      required: [true, "Le nom du médicament est requis"]
    },
    dosage: {
      type: String,
      required: [true, "Le dosage est requis"]
    },
    form: {
      type: String,
      enum: ['comprimé', 'gélule', 'sirop', 'injection', 'pommade', 'suppositoire', 'autre'],
      required: true
    },
    frequency: {
      type: String,
      required: [true, "La fréquence est requise"]
    },
    duration: {
      type: String,
      required: [true, "La durée est requise"]
    },
    instructions: String,
    refills: {
      type: Number,
      default: 0
    },
    refillsRemaining: {
      type: Number,
      default: 0
    }
  }],

  // Informations supplémentaires
  notes: String,
  isElectronic: {
    type: Boolean,
    default: true
  },
  signature: String, // URL ou référence de la signature numérique

  // Métadonnées
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

// Middleware pour mettre à jour la date de modification
PrescriptionSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Index pour les recherches courantes
PrescriptionSchema.index({ patientId: 1, status: 1 });
PrescriptionSchema.index({ doctorId: 1, datePrescribed: -1 });

// Méthodes personnalisées
PrescriptionSchema.methods.isValid = function() {
  return this.status === 'active' && (!this.expirationDate || this.expirationDate > new Date());
};

const Prescription = mongoose.model('Prescription', PrescriptionSchema);

export default Prescription;