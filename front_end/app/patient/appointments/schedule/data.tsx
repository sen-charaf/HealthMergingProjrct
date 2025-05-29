import {
  Heart,
  Brain,
  Stethoscope,
  Pill,
  Activity,
  Eye,
  Bone,
  User,
} from "lucide-react";
import { Reason, DoctorType, Doctor } from "./types";

// Common Health Issues
export const commonHealthIssues: Reason[] = [
  {
    id: "common-1",
    title: "Cold & Flu",
    description: "Symptoms like cough, fever, sore throat, and congestion",
    category: "common",
  },
  {
    id: "common-2",
    title: "Allergies",
    description: "Seasonal allergies, food allergies, or skin reactions",
    category: "common",
  },
  {
    id: "common-3",
    title: "Headache",
    description: "Recurring or severe headaches, including migraines",
    category: "common",
  },
  {
    id: "common-4",
    title: "Stomach Issues",
    description: "Nausea, vomiting, diarrhea, or abdominal pain",
    category: "common",
  },
];

// Chronic Conditions
export const chronicConditions: Reason[] = [
  {
    id: "chronic-1",
    title: "Diabetes",
    description: "Type 1 or Type 2 diabetes management and care",
    category: "chronic",
  },
  {
    id: "chronic-2",
    title: "Hypertension",
    description: "High blood pressure monitoring and treatment",
    category: "chronic",
  },
  {
    id: "chronic-3",
    title: "Asthma",
    description: "Breathing difficulties, wheezing, or asthma management",
    category: "chronic",
  },
  {
    id: "chronic-4",
    title: "Arthritis",
    description: "Joint pain, swelling, or stiffness",
    category: "chronic",
  },
];

// Mental Health
export const mentalHealth: Reason[] = [
  {
    id: "mental-1",
    title: "Anxiety",
    description: "Persistent worry, nervousness, or panic attacks",
    category: "mental",
  },
  {
    id: "mental-2",
    title: "Depression",
    description: "Persistent sadness, loss of interest, or low mood",
    category: "mental",
  },
  {
    id: "mental-3",
    title: "Sleep Issues",
    description: "Insomnia, sleep apnea, or other sleep disorders",
    category: "mental",
  },
  {
    id: "mental-4",
    title: "Stress",
    description: "Work-related stress, burnout, or life changes",
    category: "mental",
  },
];

// Specialized Care
export const specializedCare: Reason[] = [
  {
    id: "specialized-1",
    title: "Skin Conditions",
    description: "Rashes, acne, eczema, or other skin concerns",
    category: "specialized",
  },
  {
    id: "specialized-2",
    title: "Women's Health",
    description: "Reproductive health, pregnancy, or menopause",
    category: "specialized",
  },
  {
    id: "specialized-3",
    title: "Men's Health",
    description: "Prostate health, sexual health, or hormonal issues",
    category: "specialized",
  },
  {
    id: "specialized-4",
    title: "Pediatric Care",
    description: "Health concerns for infants, children, or adolescents",
    category: "specialized",
  },
];

// Doctor Types
export const doctorTypes: DoctorType[] = [
  {
    id: "general",
    title: "General Practitioner",
    description: "For routine check-ups and general health concerns",
    icon: <Stethoscope className="h-5 w-5 text-white" />,
    specialties: [
      "Cold & Flu",
      "Allergies",
      "Headache",
      "Stomach Issues",
      "Stress",
    ],
  },
  {
    id: "cardio",
    title: "Cardiologist",
    description: "Specializes in heart and cardiovascular health",
    icon: <Heart className="h-5 w-5 text-white" />,
    specialties: ["Hypertension", "Chest Pain", "Heart Disease"],
  },
  {
    id: "neuro",
    title: "Neurologist",
    description: "Specializes in brain and nervous system disorders",
    icon: <Brain className="h-5 w-5 text-white" />,
    specialties: ["Headache", "Migraines", "Seizures", "Memory Issues"],
  },
  {
    id: "derma",
    title: "Dermatologist",
    description: "Specializes in skin, hair, and nail conditions",
    icon: <User className="h-5 w-5 text-white" />,
    specialties: ["Skin Conditions", "Acne", "Eczema", "Rashes"],
  },
  {
    id: "psych",
    title: "Psychiatrist",
    description: "Specializes in mental health and behavioral disorders",
    icon: <Activity className="h-5 w-5 text-white" />,
    specialties: ["Anxiety", "Depression", "Sleep Issues", "Stress"],
  },
  {
    id: "ortho",
    title: "Orthopedist",
    description: "Specializes in bone and joint health",
    icon: <Bone className="h-5 w-5 text-white" />,
    specialties: ["Arthritis", "Joint Pain", "Fractures", "Sports Injuries"],
  },
  {
    id: "ophth",
    title: "Ophthalmologist",
    description: "Specializes in eye and vision care",
    icon: <Eye className="h-5 w-5 text-white" />,
    specialties: ["Vision Problems", "Eye Infections", "Cataracts"],
  },
  {
    id: "endo",
    title: "Endocrinologist",
    description: "Specializes in hormone-related conditions",
    icon: <Pill className="h-5 w-5 text-white" />,
    specialties: ["Diabetes", "Thyroid Disorders", "Hormonal Imbalances"],
  },
];

// Doctors
export const doctors: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Sarah Johnson",
    speciality: "General Medicine",
    image: "/doctors/doctor1.jpg",
    rating: 4.9,
    reviews: 120,
    experience: 8,
    distance: "2.5 miles away",
    location: "Downtown Medical Center",
    education: "Harvard Medical School",
    languages: ["English", "Spanish"],
    about:
      "Dr. Sarah Johnson is a board-certified general practitioner with over 8 years of experience. She specializes in preventive care and managing chronic conditions. Her approach focuses on building long-term relationships with patients and providing comprehensive care.",
    doctorTypeId: "general",
    availability: [
      {
        day: "Today",
        slots: ["10:00 AM", "11:30 AM", "2:15 PM", "4:00 PM"],
      },
      {
        day: "Tomorrow",
        slots: ["9:00 AM", "11:00 AM", "1:30 PM", "3:45 PM"],
      },
    ],
  },
  {
    id: "doc-2",
    name: "Dr. Michael Chen",
    speciality: "General Medicine",
    image: "/doctors/doctor2.jpg",
    rating: 4.7,
    reviews: 98,
    experience: 6,
    distance: "3.2 miles away",
    location: "Westside Health Clinic",
    education: "Johns Hopkins University",
    languages: ["English", "Mandarin"],
    about:
      "Dr. Michael Chen is dedicated to providing patient-centered care with a focus on preventive medicine. He believes in empowering patients through education and shared decision-making. With 6 years of experience, he has developed expertise in managing a wide range of health conditions.",
    doctorTypeId: "general",
    availability: [
      {
        day: "Tomorrow",
        slots: ["10:30 AM", "1:00 PM", "3:30 PM", "5:15 PM"],
      },
      {
        day: "Wednesday",
        slots: ["9:15 AM", "12:00 PM", "2:45 PM", "4:30 PM"],
      },
    ],
  },
  {
    id: "doc-3",
    name: "Dr. Emily Rodriguez",
    speciality: "General Medicine",
    image: "/doctors/doctor3.jpg",
    rating: 4.8,
    reviews: 145,
    experience: 10,
    distance: "1.8 miles away",
    location: "Central Family Practice",
    education: "Stanford University",
    languages: ["English", "Spanish", "Portuguese"],
    about:
      "Dr. Emily Rodriguez has been practicing family medicine for 10 years. She is passionate about providing comprehensive care to patients of all ages. Her areas of interest include women's health, pediatric care, and managing chronic conditions. She takes a holistic approach to healthcare, considering physical, emotional, and social factors.",
    doctorTypeId: "general",
    availability: [
      {
        day: "Today",
        slots: ["9:45 AM", "12:30 PM", "2:00 PM", "4:45 PM"],
      },
      {
        day: "Thursday",
        slots: ["10:15 AM", "1:45 PM", "3:00 PM", "5:30 PM"],
      },
    ],
  },
  {
    id: "doc-4",
    name: "Dr. James Wilson",
    speciality: "Cardiology",
    image: "/doctors/doctor4.jpg",
    rating: 4.9,
    reviews: 210,
    experience: 15,
    distance: "4.1 miles away",
    location: "Heart & Vascular Institute",
    education: "Yale School of Medicine",
    languages: ["English"],
    about:
      "Dr. James Wilson is a highly experienced cardiologist with 15 years of practice. He specializes in preventive cardiology, heart disease management, and hypertension treatment. He is known for his thorough approach and clear communication with patients about complex cardiac conditions.",
    doctorTypeId: "cardio",
    availability: [
      {
        day: "Tomorrow",
        slots: ["11:00 AM", "2:30 PM", "4:15 PM"],
      },
      {
        day: "Friday",
        slots: ["9:30 AM", "1:15 PM", "3:45 PM"],
      },
    ],
  },
  {
    id: "doc-5",
    name: "Dr. Olivia Thompson",
    speciality: "Neurology",
    image: "/doctors/doctor5.jpg",
    rating: 4.8,
    reviews: 175,
    experience: 12,
    distance: "3.7 miles away",
    location: "Neuroscience Center",
    education: "Columbia University",
    languages: ["English", "French"],
    about:
      "Dr. Olivia Thompson is a board-certified neurologist specializing in headache disorders, epilepsy, and neurodegenerative diseases. With 12 years of experience, she combines the latest research with compassionate care to help patients manage complex neurological conditions and improve their quality of life.",
    doctorTypeId: "neuro",
    availability: [
      {
        day: "Wednesday",
        slots: ["10:00 AM", "1:30 PM", "3:15 PM"],
      },
      {
        day: "Thursday",
        slots: ["9:45 AM", "12:30 PM", "4:00 PM"],
      },
    ],
  },
  {
    id: "doc-6",
    name: "Dr. Robert Kim",
    speciality: "Dermatology",
    image: "/doctors/doctor6.jpg",
    rating: 4.7,
    reviews: 163,
    experience: 9,
    distance: "2.3 miles away",
    location: "Skin & Aesthetic Center",
    education: "University of California",
    languages: ["English", "Korean"],
    about:
      "Dr. Robert Kim is a dermatologist with expertise in medical, surgical, and cosmetic dermatology. He treats a wide range of skin conditions including acne, eczema, psoriasis, and skin cancer. He is committed to providing personalized care and helping patients achieve healthy skin at any age.",
    doctorTypeId: "derma",
    availability: [
      {
        day: "Today",
        slots: ["11:15 AM", "2:45 PM", "5:00 PM"],
      },
      {
        day: "Friday",
        slots: ["10:30 AM", "1:00 PM", "3:30 PM"],
      },
    ],
  },
  {
    id: "doc-7",
    name: "Dr. Jennifer Patel",
    speciality: "Psychiatry",
    image: "/doctors/doctor7.jpg",
    rating: 4.9,
    reviews: 138,
    experience: 11,
    distance: "3.0 miles away",
    location: "Behavioral Health Center",
    education: "Duke University",
    languages: ["English", "Hindi"],
    about:
      "Dr. Jennifer Patel is a compassionate psychiatrist specializing in anxiety disorders, depression, and PTSD. With 11 years of experience, she takes an integrative approach to mental health, combining medication management with therapeutic techniques. She creates a safe, non-judgmental space for patients to address their mental health concerns.",
    doctorTypeId: "psych",
    availability: [
      {
        day: "Tomorrow",
        slots: ["9:00 AM", "12:15 PM", "3:00 PM", "4:45 PM"],
      },
      {
        day: "Wednesday",
        slots: ["10:45 AM", "1:30 PM", "4:15 PM"],
      },
    ],
  },
  {
    id: "doc-8",
    name: "Dr. David Martinez",
    speciality: "Orthopedics",
    image: "/doctors/doctor8.jpg",
    rating: 4.8,
    reviews: 192,
    experience: 14,
    distance: "5.2 miles away",
    location: "Sports Medicine & Orthopedic Center",
    education: "University of Pennsylvania",
    languages: ["English", "Spanish"],
    about:
      "Dr. David Martinez is an orthopedic surgeon specializing in sports medicine, joint replacement, and fracture care. With 14 years of experience, he helps patients of all ages recover from injuries and manage joint conditions. He emphasizes minimally invasive techniques and personalized rehabilitation plans to optimize recovery.",
    doctorTypeId: "ortho",
    availability: [
      {
        day: "Thursday",
        slots: ["10:15 AM", "1:45 PM", "3:30 PM"],
      },
      {
        day: "Friday",
        slots: ["9:30 AM", "12:00 PM", "2:15 PM", "4:30 PM"],
      },
    ],
  },
];
