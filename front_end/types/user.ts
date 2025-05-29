interface BaseUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  profileImage?: string;
  userType: 'patient' | 'doctor' | 'admin';
  isVerified: boolean;
}

export interface PatientProfile {
  bloodType?: string;
  height?: string;
  weight?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
  insuranceProvider?: {
    name: string;
    policyNumber: string;
  };
  preferredPharmacy?: {
    name: string;
    address: string;
  };
  primaryCarePhysician?: string;
}

export interface DoctorProfile  {
  isVerifiedDoctor: boolean;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Not Requested';
  speciality?: string;
  professionalLicenseNumber?: string;
  biography?: string;
  education: Array<{
    institution: string;
    degree: string;
    year: number;
  }>;
  experience?: Array<{
    position: string;
    institution: string;
    startYear: number;
    endYear: number;
  }>;
  languages?: string[];
  consultationFee?: number;
  availabilitySchedule?: Array<{
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }>;
  averageRating?: number;
  reviewsCount?: number;
};


export default interface UserProfile extends BaseUser  {
  profile: PatientProfile | DoctorProfile;
}
