// Patient Types
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  contactNumber: string;
  email: string;
  address: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  medicalHistory?: string[];
  medications?: string[];
  allergies?: string[];
  riskScore?: number;
  lastVisit?: string;
  documents?: Document[];
}

// Doctor Types
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  licenseNumber: string;
  contactNumber: string;
  email: string;
  availability: Availability[];
  department: string;
  joinDate: string;
  photo?: string;
  rating?: number;
  performanceMetrics?: PerformanceMetrics;
}

export interface Availability {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
}

export interface PerformanceMetrics {
  patientsSeen: number;
  averageRating: number;
  appointmentCompletionRate: number;
  averageAppointmentDuration: number;
}

// Room Types
export interface Room {
  id: string;
  number: string;
  type: 'OR' | 'ICU' | 'General Ward' | 'Examination' | 'Recovery';
  floor: number;
  capacity: number;
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  equipment?: string[];
  currentPatient?: string;
  bookings?: RoomBooking[];
}

export interface RoomBooking {
  id: string;
  roomId: string;
  startTime: string;
  endTime: string;
  patientId?: string;
  doctorId?: string;
  purpose: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

// Appointment Types
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  roomId?: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'consultation' | 'follow-up' | 'procedure' | 'test' | 'emergency';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
}

// Emergency Types
export interface EmergencyCase {
  id: string;
  patientId?: string;
  patientName: string;
  arrivalTime: string;
  condition: string;
  severity: 'minor' | 'moderate' | 'severe' | 'critical';
  status: 'waiting' | 'in-treatment' | 'stabilized' | 'transferred' | 'discharged';
  assignedDoctor?: string;
  assignedRoom?: string;
  vitalSigns?: VitalSigns;
  treatmentNotes?: string;
}

export interface VitalSigns {
  bloodPressure?: string;
  heartRate?: number;
  respiratoryRate?: number;
  temperature?: number;
  oxygenSaturation?: number;
}

// Document Type
export interface Document {
  id: string;
  title: string;
  type: 'report' | 'prescription' | 'lab_result' | 'consent' | 'referral' | 'other';
  uploadDate: string;
  fileUrl: string;
}