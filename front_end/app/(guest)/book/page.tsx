"use client";

import type React from "react";

import { useState } from "react";
import {
  Search,
  Circle,
  Square,
  Heart,
  Calendar,
  Clock,
  Shield,
  Phone,
  Sun,
  ChevronDown,
  Check,
  AlertCircle,
  ArrowLeft,
  User,
  SmileIcon as Tooth,
  Eye,
  HeartIcon,
  Bone,
  Star,
  MapPin,
  Filter,
} from "lucide-react";
import DoctorDetails from "./doctor-details";

type Reason = {
  id: string;
  category: string;
  title: string;
  description: string;
};

type DoctorType = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  specialties: string[];
  matchCount?: number;
};

type Doctor = {
  id: string;
  name: string;
  speciality: string;
  rating: number;
  reviews: number;
  experience: number;
  education: string;
  location: string;
  distance: string;
  availability: {
    day: string;
    slots: string[];
  }[];
  about: string;
  languages: string[];
  doctorTypeId: string;
  image: string;
};

export default function AppointmentBooking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedReasons, setSelectedReasons] = useState<Reason[]>([]);
  const [selectedDoctorType, setSelectedDoctorType] = useState<string | null>(
    null
  );
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [showTimeSlots, setShowTimeSlots] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"rating" | "availability">("rating");
  const [viewingDoctorDetails, setViewingDoctorDetails] = useState<
    string | null
  >(null);

  const handleReasonSelect = (reason: Reason) => {
    // Check if the reason is already selected
    if (selectedReasons.some((item) => item.id === reason.id)) {
      // If selected, remove it
      setSelectedReasons(
        selectedReasons.filter((item) => item.id !== reason.id)
      );
    } else {
      // If not selected and less than 3 items are selected, add it
      if (selectedReasons.length < 3) {
        setSelectedReasons([...selectedReasons, reason]);
      }
    }
  };

  const isSelected = (id: string) => {
    return selectedReasons.some((item) => item.id === id);
  };

  const handleContinue = () => {
    if (currentStep === 1 && selectedReasons.length > 0) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedDoctorType) {
      setCurrentStep(3);
    } else if (currentStep === 3 && selectedDoctor && selectedTimeSlot) {
      setCurrentStep(4);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);

      // Reset selections when going back
      if (currentStep === 3) {
        setSelectedDoctor(null);
        setSelectedTimeSlot(null);
        setShowTimeSlots(null);
      }
    }
  };

  const toggleTimeSlots = (doctorId: string) => {
    if (showTimeSlots === doctorId) {
      setShowTimeSlots(null);
    } else {
      setShowTimeSlots(doctorId);
      setSelectedDoctor(doctorId);
    }
  };

  const selectTimeSlot = (slot: string) => {
    setSelectedTimeSlot(slot);
  };

  const viewDoctorDetails = (doctorId: string) => {
    setViewingDoctorDetails(doctorId);
  };

  const closeDoctorDetails = () => {
    setViewingDoctorDetails(null);
  };

  const commonHealthIssues = [
    {
      id: "fever",
      category: "Common Health Issues",
      title: "Fever & Flu",
      description: "Cold, cough, or seasonal flu symptoms",
    },
    {
      id: "headache",
      category: "Common Health Issues",
      title: "Headache",
      description: "Recurring or severe headaches",
    },
    {
      id: "stomach",
      category: "Common Health Issues",
      title: "Stomach Issues",
      description: "Digestive problems or abdominal pain",
    },
    {
      id: "allergies",
      category: "Common Health Issues",
      title: "Allergies",
      description: "Seasonal allergies or reactions",
    },
  ];

  const chronicConditions = [
    {
      id: "diabetes",
      category: "Chronic Conditions",
      title: "Diabetes",
      description: "Blood sugar monitoring and management",
    },
    {
      id: "hypertension",
      category: "Chronic Conditions",
      title: "Hypertension",
      description: "Blood pressure concerns",
    },
    {
      id: "heart",
      category: "Chronic Conditions",
      title: "Heart Disease",
      description: "Cardiovascular health issues",
    },
    {
      id: "arthritis",
      category: "Chronic Conditions",
      title: "Arthritis",
      description: "Joint pain and inflammation",
    },
  ];

  const mentalHealth = [
    {
      id: "anxiety",
      category: "Mental Health",
      title: "Anxiety",
      description: "Stress and anxiety management",
    },
    {
      id: "depression",
      category: "Mental Health",
      title: "Depression",
      description: "Mood disorders and support",
    },
    {
      id: "sleep",
      category: "Mental Health",
      title: "Sleep Issues",
      description: "Insomnia or sleep disorders",
    },
    {
      id: "adhd",
      category: "Mental Health",
      title: "ADHD",
      description: "Attention and focus concerns",
    },
  ];

  const specializedCare = [
    {
      id: "skin",
      category: "Specialized Care",
      title: "Skin Conditions",
      description: "Dermatological concerns",
    },
    {
      id: "eye",
      category: "Specialized Care",
      title: "Eye Problems",
      description: "Vision or eye-related issues",
    },
    {
      id: "dental",
      category: "Specialized Care",
      title: "Dental Care",
      description: "Oral health concerns",
    },
    {
      id: "physical",
      category: "Specialized Care",
      title: "Physical Therapy",
      description: "Rehabilitation and movement",
    },
  ];

  const doctorTypes: DoctorType[] = [
    {
      id: "general",
      title: "General Practitioner",
      description: "For common health issues and routine check-ups",
      icon: <Circle className="h-5 w-5 text-white" />,
      specialties: [
        "Fever & Flu",
        "Headache",
        "Stomach Issues",
        "Allergies",
        "Hypertension",
      ],
    },
    {
      id: "psychological",
      title: "Psychological Care",
      description: "For mental health and emotional well-being",
      icon: <Square className="h-5 w-5 text-white" />,
      specialties: ["Anxiety", "Depression", "Sleep Issues", "ADHD"],
    },
    {
      id: "cardiologist",
      title: "Cardiologist",
      description: "For heart and cardiovascular conditions",
      icon: <HeartIcon className="h-5 w-5 text-white" />,
      specialties: ["Heart Disease", "Hypertension"],
    },
    {
      id: "dermatologist",
      title: "Dermatologist",
      description: "For skin conditions and treatments",
      icon: <User className="h-5 w-5 text-white" />,
      specialties: ["Skin Conditions", "Allergies"],
    },
    {
      id: "ophthalmologist",
      title: "Ophthalmologist",
      description: "For eye care and vision problems",
      icon: <Eye className="h-5 w-5 text-white" />,
      specialties: ["Eye Problems"],
    },
    {
      id: "dentist",
      title: "Dentist",
      description: "For oral health and dental care",
      icon: <Tooth className="h-5 w-5 text-white" />,
      specialties: ["Dental Care"],
    },
    {
      id: "orthopedist",
      title: "Orthopedist",
      description: "For bone, joint, and muscle issues",
      icon: <Bone className="h-5 w-5 text-white" />,
      specialties: ["Arthritis", "Physical Therapy"],
    },
  ];

  const doctors: Doctor[] = [
    {
      id: "dr-sarah-wilson",
      name: "Dr. Sarah Wilson",
      speciality: "General Medicine",
      rating: 4.8,
      reviews: 156,
      experience: 12,
      education: "Harvard Medical School",
      location: "Downtown Medical Center",
      distance: "2.3 miles",
      availability: [
        {
          day: "Today",
          slots: ["9:00 AM", "11:30 AM", "2:15 PM"],
        },
        {
          day: "Tomorrow",
          slots: ["10:00 AM", "1:45 PM", "4:30 PM"],
        },
      ],
      about:
        "Dr. Wilson specializes in preventive care and managing chronic conditions. She takes a holistic approach to patient care.",
      languages: ["English", "Spanish"],
      doctorTypeId: "general",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "dr-michael-chen",
      name: "Dr. Michael Chen",
      speciality: "Family Medicine",
      rating: 4.9,
      reviews: 203,
      experience: 8,
      education: "Johns Hopkins University",
      location: "Westside Family Clinic",
      distance: "1.5 miles",
      availability: [
        {
          day: "Tomorrow",
          slots: ["8:30 AM", "10:45 AM", "3:00 PM"],
        },
        {
          day: "Wednesday",
          slots: ["9:15 AM", "12:30 PM", "5:00 PM"],
        },
      ],
      about:
        "Dr. Chen focuses on family medicine with expertise in pediatric and geriatric care. He believes in building long-term relationships with patients.",
      languages: ["English", "Mandarin"],
      doctorTypeId: "general",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "dr-emily-patel",
      name: "Dr. Emily Patel",
      speciality: "Internal Medicine",
      rating: 4.7,
      reviews: 128,
      experience: 15,
      education: "Stanford University",
      location: "Central Medical Group",
      distance: "3.1 miles",
      availability: [
        {
          day: "Today",
          slots: ["1:00 PM", "3:30 PM", "5:15 PM"],
        },
        {
          day: "Friday",
          slots: ["9:30 AM", "11:00 AM", "2:45 PM"],
        },
      ],
      about:
        "Dr. Patel specializes in complex medical conditions and preventive care. She is known for her thorough approach to diagnosis.",
      languages: ["English", "Hindi", "Gujarati"],
      doctorTypeId: "general",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "dr-james-rodriguez",
      name: "Dr. James Rodriguez",
      speciality: "Cardiology",
      rating: 4.9,
      reviews: 187,
      experience: 20,
      education: "Yale School of Medicine",
      location: "Heart & Vascular Institute",
      distance: "4.2 miles",
      availability: [
        {
          day: "Thursday",
          slots: ["10:15 AM", "1:30 PM", "4:00 PM"],
        },
        {
          day: "Friday",
          slots: ["11:00 AM", "2:30 PM", "5:15 PM"],
        },
      ],
      about:
        "Dr. Rodriguez is a leading cardiologist specializing in heart disease prevention and treatment. He has pioneered several minimally invasive procedures.",
      languages: ["English", "Spanish"],
      doctorTypeId: "cardiologist",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "dr-lisa-thompson",
      name: "Dr. Lisa Thompson",
      speciality: "Psychiatry",
      rating: 4.8,
      reviews: 142,
      experience: 10,
      education: "Columbia University",
      location: "Mindful Wellness Center",
      distance: "2.8 miles",
      availability: [
        {
          day: "Today",
          slots: ["2:00 PM", "4:30 PM"],
        },
        {
          day: "Wednesday",
          slots: ["10:00 AM", "1:15 PM", "3:45 PM"],
        },
      ],
      about:
        "Dr. Thompson specializes in anxiety, depression, and stress management. She takes an integrative approach to mental health.",
      languages: ["English"],
      doctorTypeId: "psychological",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "dr-robert-kim",
      name: "Dr. Robert Kim",
      speciality: "Dermatology",
      rating: 4.7,
      reviews: 165,
      experience: 14,
      education: "University of California",
      location: "Clear Skin Dermatology",
      distance: "3.5 miles",
      availability: [
        {
          day: "Tomorrow",
          slots: ["9:45 AM", "12:30 PM", "3:15 PM"],
        },
        {
          day: "Thursday",
          slots: ["11:00 AM", "2:00 PM", "4:45 PM"],
        },
      ],
      about:
        "Dr. Kim specializes in medical and cosmetic dermatology. He is known for his expertise in treating complex skin conditions.",
      languages: ["English", "Korean"],
      doctorTypeId: "dermatologist",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "dr-olivia-martinez",
      name: "Dr. Olivia Martinez",
      speciality: "Ophthalmology",
      rating: 4.9,
      reviews: 178,
      experience: 16,
      education: "Duke University",
      location: "Clear Vision Eye Center",
      distance: "5.0 miles",
      availability: [
        {
          day: "Friday",
          slots: ["8:30 AM", "11:15 AM", "2:45 PM"],
        },
        {
          day: "Monday",
          slots: ["10:30 AM", "1:00 PM", "4:15 PM"],
        },
      ],
      about:
        "Dr. Martinez is a leading ophthalmologist specializing in comprehensive eye care and surgical procedures. She has performed over 5,000 successful surgeries.",
      languages: ["English", "Spanish"],
      doctorTypeId: "ophthalmologist",
      image: "/placeholder.svg?height=200&width=200",
    },
  ];

  // Filter doctor types based on selected reasons
  const getRecommendedDoctorTypes = () => {
    if (selectedReasons.length === 0) return doctorTypes;

    const selectedTitles = selectedReasons.map((reason) => reason.title);

    return doctorTypes
      .map((doctorType) => {
        const matchCount = doctorType.specialties.filter((speciality) =>
          selectedTitles.includes(speciality)
        ).length;

        return {
          ...doctorType,
          matchCount,
        };
      })
      .sort((a, b) => b.matchCount - a.matchCount);
  };

  // Filter doctors based on selected doctor type
  const getFilteredDoctors = () => {
    if (!selectedDoctorType) return [];

    const filtered = doctors.filter(
      (doctor) => doctor.doctorTypeId === selectedDoctorType
    );

    // Sort doctors based on the selected sort criteria
    if (sortBy === "rating") {
      return filtered.sort((a, b) => b.rating - a.rating);
    } else {
      // Sort by availability (doctors with today slots first)
      return filtered.sort((a, b) => {
        const aHasToday = a.availability.some((avail) => avail.day === "Today");
        const bHasToday = b.availability.some((avail) => avail.day === "Today");

        if (aHasToday && !bHasToday) return -1;
        if (!aHasToday && bHasToday) return 1;
        return b.rating - a.rating; // If tie, sort by rating
      });
    }
  };

  const recommendedDoctorTypes = getRecommendedDoctorTypes();
  const filteredDoctors = getFilteredDoctors();

  // Get the selected doctor type title
  const getSelectedDoctorTypeTitle = () => {
    if (!selectedDoctorType) return "";
    const doctorType = doctorTypes.find((dt) => dt.id === selectedDoctorType);
    return doctorType ? doctorType.title : "";
  };

  // If viewing doctor details, show that component
  if (viewingDoctorDetails) {
    return (
      <DoctorDetails
        doctorId={viewingDoctorDetails}
        onBack={closeDoctorDetails}
        onBookAppointment={() => {
          closeDoctorDetails();
          // You could also set the selected doctor here if needed
          // setSelectedDoctor(viewingDoctorDetails);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <header className="border-b border-gray-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-[#1e3a8a] fill-[#1e3a8a]" />
            <span className="text-xl font-bold text-[#1e3a8a]">HealthCare</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-[#1e3a8a] transition-colors">
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-[#1e3a8a] transition-colors">
                For Patients <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-[#1e3a8a] transition-colors">
                For Doctors <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
            <button className="text-gray-700 hover:text-[#1e3a8a] transition-colors">
              About
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Sun className="h-5 w-5 text-gray-700" />
            </button>
            <button className="px-4 py-2 bg-[#1e3a8a] text-white rounded-md hover:bg-[#152a60] transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 bg-[#f59e0b] text-white rounded-md hover:bg-[#d97706] transition-colors">
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="inline-block px-3 py-1 bg-[#e6f7f2] text-[#0d9488] text-sm font-medium rounded-full mb-4">
                Premium Healthcare Anywhere
              </div>
              <h1 className="text-2xl font-bold text-[#1e3a8a]">
                Book an Appointment
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full ${
                    currentStep >= 1 ? "bg-[#1e3a8a]" : "bg-[#94a3b8]"
                  } text-white flex items-center justify-center text-sm font-medium`}
                >
                  1
                </div>
                <div
                  className={`w-12 h-1 ${
                    currentStep >= 2 ? "bg-[#1e3a8a]" : "bg-[#94a3b8]"
                  }`}
                ></div>
              </div>
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full ${
                    currentStep >= 2 ? "bg-[#1e3a8a]" : "bg-[#94a3b8]"
                  } text-white flex items-center justify-center text-sm font-medium`}
                >
                  2
                </div>
                <div
                  className={`w-12 h-1 ${
                    currentStep >= 3 ? "bg-[#1e3a8a]" : "bg-[#94a3b8]"
                  }`}
                ></div>
              </div>
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full ${
                    currentStep >= 3 ? "bg-[#1e3a8a]" : "bg-[#94a3b8]"
                  } text-white flex items-center justify-center text-sm font-medium`}
                >
                  3
                </div>
                <div
                  className={`w-12 h-1 ${
                    currentStep >= 4 ? "bg-[#1e3a8a]" : "bg-[#94a3b8]"
                  }`}
                ></div>
              </div>
              <div
                className={`w-8 h-8 rounded-full ${
                  currentStep >= 4 ? "bg-[#1e3a8a]" : "bg-[#94a3b8]"
                } text-white flex items-center justify-center text-sm font-medium`}
              >
                4
              </div>
            </div>
          </div>

          {currentStep === 1 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-medium text-gray-800">
                  What&apos;s the reason for your visit?
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    Selected:
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      selectedReasons.length === 3
                        ? "text-[#f59e0b]"
                        : "text-[#1e3a8a]"
                    }`}
                  >
                    {selectedReasons.length}/3
                  </span>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <p className="text-gray-600">
                  Choose a category or search for specific symptoms
                </p>
                {selectedReasons.length === 3 && (
                  <div className="ml-2 flex items-center text-[#f59e0b] text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>Maximum 3 reasons</span>
                  </div>
                )}
              </div>

              {selectedReasons.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Selected reasons:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedReasons.map((reason) => (
                      <div
                        key={reason.id}
                        className="flex items-center gap-2 bg-[#eef2ff] text-[#1e3a8a] px-3 py-1.5 rounded-full text-sm"
                      >
                        <span>{reason.title}</span>
                        <button
                          onClick={() => handleReasonSelect(reason)}
                          className="hover:bg-[#1e3a8a] hover:text-white rounded-full p-0.5 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="relative mb-8">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search symptoms or conditions..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Common Health Issues */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
                      <Circle className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-medium text-[#1e3a8a]">
                      Common Health Issues
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {commonHealthIssues.map((reason) => (
                      <button
                        key={reason.id}
                        onClick={() => handleReasonSelect(reason)}
                        disabled={
                          selectedReasons.length >= 3 && !isSelected(reason.id)
                        }
                        className={`w-full text-left border rounded-lg p-4 transition-all ${
                          isSelected(reason.id)
                            ? "border-[#1e3a8a] bg-[#eef2ff] ring-2 ring-[#1e3a8a]"
                            : "border-gray-200 hover:border-[#1e3a8a]"
                        } ${
                          selectedReasons.length >= 3 && !isSelected(reason.id)
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-800">
                            {reason.title}
                          </h4>
                          {isSelected(reason.id) && (
                            <div className="bg-[#1e3a8a] text-white rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">
                          {reason.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chronic Conditions */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
                      <Square className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-medium text-[#1e3a8a]">
                      Chronic Conditions
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {chronicConditions.map((reason) => (
                      <button
                        key={reason.id}
                        onClick={() => handleReasonSelect(reason)}
                        disabled={
                          selectedReasons.length >= 3 && !isSelected(reason.id)
                        }
                        className={`w-full text-left border rounded-lg p-4 transition-all ${
                          isSelected(reason.id)
                            ? "border-[#1e3a8a] bg-[#eef2ff] ring-2 ring-[#1e3a8a]"
                            : "border-gray-200 hover:border-[#1e3a8a]"
                        } ${
                          selectedReasons.length >= 3 && !isSelected(reason.id)
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-800">
                            {reason.title}
                          </h4>
                          {isSelected(reason.id) && (
                            <div className="bg-[#1e3a8a] text-white rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">
                          {reason.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mental Health */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
                      <Circle className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-medium text-[#1e3a8a]">
                      Mental Health
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {mentalHealth.map((reason) => (
                      <button
                        key={reason.id}
                        onClick={() => handleReasonSelect(reason)}
                        disabled={
                          selectedReasons.length >= 3 && !isSelected(reason.id)
                        }
                        className={`w-full text-left border rounded-lg p-4 transition-all ${
                          isSelected(reason.id)
                            ? "border-[#1e3a8a] bg-[#eef2ff] ring-2 ring-[#1e3a8a]"
                            : "border-gray-200 hover:border-[#1e3a8a]"
                        } ${
                          selectedReasons.length >= 3 && !isSelected(reason.id)
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-800">
                            {reason.title}
                          </h4>
                          {isSelected(reason.id) && (
                            <div className="bg-[#1e3a8a] text-white rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">
                          {reason.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specialized Care */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
                      <Square className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-medium text-[#1e3a8a]">
                      Specialized Care
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {specializedCare.map((reason) => (
                      <button
                        key={reason.id}
                        onClick={() => handleReasonSelect(reason)}
                        disabled={
                          selectedReasons.length >= 3 && !isSelected(reason.id)
                        }
                        className={`w-full text-left border rounded-lg p-4 transition-all ${
                          isSelected(reason.id)
                            ? "border-[#1e3a8a] bg-[#eef2ff] ring-2 ring-[#1e3a8a]"
                            : "border-gray-200 hover:border-[#1e3a8a]"
                        } ${
                          selectedReasons.length >= 3 && !isSelected(reason.id)
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-800">
                            {reason.title}
                          </h4>
                          {isSelected(reason.id) && (
                            <div className="bg-[#1e3a8a] text-white rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">
                          {reason.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mb-8">
              <h2 className="text-xl font-medium text-gray-800 mb-2">
                Select Doctor Type
              </h2>
              <p className="text-gray-600 mb-6">
                Choose the type of doctor that best fits your needs
              </p>

              {selectedReasons.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Based on your selected reasons:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedReasons.map((reason) => (
                      <div
                        key={reason.id}
                        className="flex items-center gap-2 bg-[#eef2ff] text-[#1e3a8a] px-3 py-1.5 rounded-full text-sm"
                      >
                        <span>{reason.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedDoctorTypes.map((doctorType) => (
                  <button
                    key={doctorType.id}
                    onClick={() => setSelectedDoctorType(doctorType.id)}
                    className={`w-full text-left border rounded-lg p-6 transition-all ${
                      selectedDoctorType === doctorType.id
                        ? "border-[#1e3a8a] bg-[#eef2ff] ring-2 ring-[#1e3a8a]"
                        : "border-gray-200 hover:border-[#1e3a8a]"
                    } cursor-pointer`}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
                          {doctorType.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {doctorType.title}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {doctorType.description}
                          </p>
                        </div>
                      </div>
                      {selectedDoctorType === doctorType.id && (
                        <div className="bg-[#1e3a8a] text-white rounded-full p-1 h-6 w-6 flex items-center justify-center">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>

                    {/* Show match indicator if there are selected reasons */}
                    {selectedReasons.length > 0 &&
                      doctorType.matchCount !== undefined &&
                      doctorType.matchCount > 0 && (
                        <div className="mt-3 flex items-center">
                          <div className="bg-[#e6f7f2] text-[#0d9488] text-xs font-medium px-2 py-1 rounded-full">
                            Recommended for {doctorType.matchCount} of your
                            selected conditions
                          </div>
                        </div>
                      )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-medium text-gray-800">
                  Select a Doctor
                </h2>
                <button className="text-[#1e3a8a] text-sm font-medium hover:underline">
                  All Ratings
                </button>
              </div>
              <p className="text-gray-600 mb-4">
                Choose from our {getSelectedDoctorTypeTitle()} specialists
              </p>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-[#eef2ff] text-[#1e3a8a] px-3 py-1.5 rounded-full text-sm">
                    <span>{getSelectedDoctorTypeTitle()}</span>
                  </div>
                  {selectedReasons.length > 0 && (
                    <div className="flex items-center gap-2 bg-[#f0f9ff] text-[#0369a1] px-3 py-1.5 rounded-full text-sm">
                      <span>
                        {selectedReasons.length} condition
                        {selectedReasons.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                    <button
                      className={`px-3 py-1.5 text-sm ${
                        sortBy === "rating"
                          ? "bg-[#1e3a8a] text-white"
                          : "bg-white text-gray-700"
                      }`}
                      onClick={() => setSortBy("rating")}
                    >
                      Rating
                    </button>
                    <button
                      className={`px-3 py-1.5 text-sm ${
                        sortBy === "availability"
                          ? "bg-[#1e3a8a] text-white"
                          : "bg-white text-gray-700"
                      }`}
                      onClick={() => setSortBy("availability")}
                    >
                      Availability
                    </button>
                  </div>
                  <button className="p-2 rounded-lg border border-gray-200 text-gray-700">
                    <Filter className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className={`border rounded-lg overflow-hidden transition-all ${
                      selectedDoctor === doctor.id
                        ? "border-[#1e3a8a] ring-2 ring-[#1e3a8a]"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={doctor.image || "/placeholder.svg"}
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium text-gray-800">
                                {doctor.name}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {doctor.speciality}
                              </p>
                            </div>
                            <button
                              className="text-[#1e3a8a] text-sm font-medium hover:underline"
                              onClick={() => viewDoctorDetails(doctor.id)}
                            >
                              View Details
                            </button>
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b]" />
                              <span className="ml-1 text-sm font-medium">
                                {doctor.rating}/5
                              </span>
                              <span className="ml-1 text-xs text-gray-500">
                                ({doctor.reviews})
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="ml-1 text-sm text-gray-600">
                                {doctor.experience} years
                              </span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="ml-1 text-sm text-gray-600">
                                {doctor.distance}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            Next Available
                          </div>
                          <div className="text-sm text-gray-800">
                            {doctor.availability[0].day}
                          </div>
                        </div>
                        <button
                          onClick={() => toggleTimeSlots(doctor.id)}
                          className={`px-4 py-2 rounded-lg ${
                            selectedDoctor === doctor.id && selectedTimeSlot
                              ? "bg-[#1e3a8a] text-white"
                              : "border border-[#1e3a8a] text-[#1e3a8a]"
                          }`}
                        >
                          {selectedDoctor === doctor.id && selectedTimeSlot
                            ? "Time Selected"
                            : showTimeSlots === doctor.id
                            ? "Hide Times"
                            : "Select Time"}
                        </button>
                      </div>
                    </div>

                    {showTimeSlots === doctor.id && (
                      <div className="bg-gray-50 p-4 border-t border-gray-200">
                        {doctor.availability.map((avail) => (
                          <div key={avail.day} className="mb-3 last:mb-0">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              {avail.day}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {avail.slots.map((slot) => (
                                <button
                                  key={slot}
                                  onClick={() => selectTimeSlot(slot)}
                                  className={`px-3 py-1.5 rounded-lg text-sm ${
                                    selectedTimeSlot === slot
                                      ? "bg-[#1e3a8a] text-white"
                                      : "bg-white border border-gray-200 text-gray-700 hover:border-[#1e3a8a]"
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
              <Phone className="h-6 w-6 text-[#1e3a8a] mb-2" />
              <span className="text-sm font-medium text-gray-700">
                24/7 Support
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
              <Calendar className="h-6 w-6 text-[#1e3a8a] mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Easy Scheduling
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
              <Clock className="h-6 w-6 text-[#1e3a8a] mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Quick Response
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
              <Shield className="h-6 w-6 text-[#1e3a8a] mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Secure Data
              </span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center mb-8 bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">4.9/5</div>
              <div className="flex items-center justify-center text-[#f59e0b]">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <div className="text-sm text-gray-600 mt-1">1000+ Reviews</div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </button>
            ) : (
              <button className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                Cancel
              </button>
            )}
            <button
              onClick={handleContinue}
              className={`px-6 py-2 rounded-lg flex items-center transition-colors ${
                (currentStep === 1 && selectedReasons.length > 0) ||
                (currentStep === 2 && selectedDoctorType) ||
                (currentStep === 3 && selectedDoctor && selectedTimeSlot)
                  ? "bg-[#1e3a8a] text-white hover:bg-[#152a60]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={
                (currentStep === 1 && selectedReasons.length === 0) ||
                (currentStep === 2 && !selectedDoctorType) ||
                (currentStep === 3 && (!selectedDoctor || !selectedTimeSlot))
              }
            >
              Continue
            </button>
          </div>
        </div>
      </main>

      {/* Doctor Availability */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center">
          <Phone className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="text-sm font-medium">500+ Doctors</div>
          <div className="text-xs text-gray-600">Ready to help</div>
        </div>
      </div>
    </div>
  );
}
