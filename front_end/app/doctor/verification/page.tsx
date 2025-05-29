"use client";

import type React from "react";

import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus, Heart, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import api from "@/api/api";

// Validation types
// Add speciality to ValidationErrors type
type ValidationErrors = {
  licenseNumber?: string;
  biography?: string;
  speciality?: string; // Add this line
  education: { institution?: string; degree?: string; year?: string }[];
  experience: {
    position?: string;
    institution?: string;
    startYear?: string;
    endYear?: string;
  }[];
  languages?: string;
  consultationFee?: string;
  availabilitySchedule?: string;
};

export default function DoctorVerificationPage() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth(); // Add this line to use auth context
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<ValidationErrors>({
    education: [],
    experience: [],
  });

  // Form state
  const [licenseNumber, setLicenseNumber] = useState("");
  const [biography, setBiography] = useState("");
  const [speciality, setSpeciality] = useState(""); // Add this line
  const [education, setEducation] = useState([
    { institution: "", degree: "", year: "" },
  ]);
  const [experience, setExperience] = useState([
    { position: "", institution: "", startYear: "", endYear: "" },
  ]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [consultationFee, setConsultationFee] = useState("");
  const [availabilitySchedule, setAvailabilitySchedule] = useState([
    { day: "Monday", startTime: "09:00", endTime: "17:00", isAvailable: false },
    {
      day: "Tuesday",
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: false,
    },
    {
      day: "Wednesday",
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: false,
    },
    {
      day: "Thursday",
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: false,
    },
    { day: "Friday", startTime: "09:00", endTime: "17:00", isAvailable: false },
    {
      day: "Saturday",
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: false,
    },
    { day: "Sunday", startTime: "09:00", endTime: "17:00", isAvailable: false },
  ]);

  // Language options
  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Arabic",
    "Russian",
    "Japanese",
    "Portuguese",
    "Hindi",
  ];
  // Speciality options
  const specialityOptions = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Family Medicine",
    "Gastroenterology",
    "General Medicine",
    "Neurology",
    "Obstetrics & Gynecology",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Pulmonology",
    "Radiology",
    "Urology",
  ];

  // Mark field as touched
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Validate the form
  useEffect(() => {
    const newErrors: ValidationErrors = {
      education: [],
      experience: [],
    };

    // License number validation
    if (!licenseNumber.trim()) {
      newErrors.licenseNumber = "License number is required";
    } else if (!/^[A-Z0-9]{6,12}$/i.test(licenseNumber)) {
      newErrors.licenseNumber =
        "License number should be 6-12 alphanumeric characters";
    }

    // Speciality validation
    if (!speciality) {
      newErrors.speciality = "Speciality is required";
    }

    // Biography validation (optional but if provided, should be at least 50 characters)
    if (biography && biography.length < 50) {
      newErrors.biography = "Biography should be at least 50 characters";
    }

    // Education validation
    newErrors.education = education.map((edu) => {
      const eduErrors: {
        institution?: string;
        degree?: string;
        year?: string;
      } = {};

      if (!edu.institution.trim()) {
        eduErrors.institution = "Institution is required";
      }

      if (!edu.degree.trim()) {
        eduErrors.degree = "Degree is required";
      }

      if (!edu.year) {
        eduErrors.year = "Year is required";
      } else {
        const yearNum = Number(edu.year);
        const currentYear = new Date().getFullYear();
        if (isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear) {
          eduErrors.year = `Year must be between 1900 and ${currentYear}`;
        }
      }

      return eduErrors;
    });

    // Experience validation
    newErrors.experience = experience.map((exp) => {
      const expErrors: {
        position?: string;
        institution?: string;
        startYear?: string;
        endYear?: string;
      } = {};

      if (!exp.position.trim()) {
        expErrors.position = "Position is required";
      }

      if (!exp.institution.trim()) {
        expErrors.institution = "Institution is required";
      }

      if (!exp.startYear) {
        expErrors.startYear = "Start year is required";
      } else {
        const startYearNum = Number(exp.startYear);
        const currentYear = new Date().getFullYear();
        if (
          isNaN(startYearNum) ||
          startYearNum < 1900 ||
          startYearNum > currentYear
        ) {
          expErrors.startYear = `Year must be between 1900 and ${currentYear}`;
        }
      }

      if (exp.endYear) {
        const endYearNum = Number(exp.endYear);
        const startYearNum = Number(exp.startYear);
        const currentYear = new Date().getFullYear();

        if (
          isNaN(endYearNum) ||
          endYearNum < 1900 ||
          endYearNum > currentYear + 10
        ) {
          expErrors.endYear = `Year must be between 1900 and ${
            currentYear + 10
          }`;
        } else if (startYearNum && endYearNum < startYearNum) {
          expErrors.endYear = "End year must be after start year";
        }
      }

      return expErrors;
    });

    // Languages validation
    if (languages.length === 0) {
      newErrors.languages = "Select at least one language";
    }

    // Consultation fee validation
    if (!consultationFee) {
      newErrors.consultationFee = "Consultation fee is required";
    } else {
      const fee = Number(consultationFee);
      if (isNaN(fee) || fee <= 0) {
        newErrors.consultationFee = "Fee must be a positive number";
      }
    }

    // Availability schedule validation
    const hasAvailability = availabilitySchedule.some(
      (schedule) => schedule.isAvailable
    );
    if (!hasAvailability) {
      newErrors.availabilitySchedule =
        "Select at least one day of availability";
    }

    setErrors(newErrors);
  }, [
    licenseNumber,
    biography,
    speciality,
    education,
    experience,
    languages,
    consultationFee,
    availabilitySchedule,
  ]);

  // Check if the form has any errors
  const hasErrors = () => {
    if (
      errors.licenseNumber ||
      errors.biography ||
      errors.languages ||
      errors.consultationFee ||
      errors.availabilitySchedule
    ) {
      return true;
    }

    // Check education errors
    for (const eduError of errors.education) {
      if (Object.keys(eduError).length > 0) return true;
    }

    // Check experience errors
    for (const expError of errors.experience) {
      if (Object.keys(expError).length > 0) return true;
    }

    return false;
  };

  const addEducation = () => {
    setEducation([...education, { institution: "", degree: "", year: "" }]);
    setErrors((prev) => ({
      ...prev,
      education: [...prev.education, {}],
    }));
  };

  const removeEducation = (index: number) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    setEducation(newEducation);

    const newErrors = { ...errors };
    newErrors.education.splice(index, 1);
    setErrors(newErrors);
  };

  // Add/remove experience entries
  const addExperience = () => {
    setExperience([
      ...experience,
      { position: "", institution: "", startYear: "", endYear: "" },
    ]);
    setErrors((prev) => ({
      ...prev,
      experience: [...prev.experience, {}],
    }));
  };

  const removeExperience = (index: number) => {
    const newExperience = [...experience];
    newExperience.splice(index, 1);
    setExperience(newExperience);

    const newErrors = { ...errors };
    newErrors.experience.splice(index, 1);
    setErrors(newErrors);
  };

  // Update education field
  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEducation(newEducation);

    // Mark as touched
    setTouched((prev) => ({ ...prev, [`education.${index}.${field}`]: true }));
  };

  // Update experience field
  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setExperience(newExperience);

    // Mark as touched
    setTouched((prev) => ({ ...prev, [`experience.${index}.${field}`]: true }));
  };

  // Toggle language selection
  const toggleLanguage = (language: string) => {
    if (languages.includes(language)) {
      setLanguages(languages.filter((lang) => lang !== language));
    } else {
      setLanguages([...languages, language]);
    }

    // Mark as touched
    setTouched((prev) => ({ ...prev, languages: true }));
  };

  // Toggle availability for a day
  const toggleAvailability = (index: number) => {
    const newSchedule = [...availabilitySchedule];
    newSchedule[index] = {
      ...newSchedule[index],
      isAvailable: !newSchedule[index].isAvailable,
    };
    setAvailabilitySchedule(newSchedule);

    // Mark as touched
    setTouched((prev) => ({ ...prev, availabilitySchedule: true }));
  };

  // Update schedule time
  const updateScheduleTime = (index: number, field: string, value: string) => {
    const newSchedule = [...availabilitySchedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setAvailabilitySchedule(newSchedule);
  };

  // Check if user is authenticated and is a doctor
  useEffect(() => {
    if (!isLoading && !isAuthenticated()) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    if (!isLoading && user?.userType !== "doctor") {
      toast({
        title: "Access denied",
        description: "This page is only accessible to doctors",
        variant: "destructive",
      });
      router.push("/");
    }
  }, [isLoading, isAuthenticated, user, router]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to show all validation errors
    const touchAll: Record<string, boolean> = {
      licenseNumber: true,
      biography: true,
      languages: true,
      consultationFee: true,
      availabilitySchedule: true,
    };

    education.forEach((_, index) => {
      touchAll[`education.${index}.institution`] = true;
      touchAll[`education.${index}.degree`] = true;
      touchAll[`education.${index}.year`] = true;
    });

    experience.forEach((_, index) => {
      touchAll[`experience.${index}.position`] = true;
      touchAll[`experience.${index}.institution`] = true;
      touchAll[`experience.${index}.startYear`] = true;
      touchAll[`experience.${index}.endYear`] = true;
    });

    setTouched(touchAll);

    // Check for validation errors
    if (hasErrors()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please correct the errors in the form before submitting.",
      });
      return;
    }

    if (!user || !user._id) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "User information not found. Please log in again.",
      });
      return;
    }

    setLoading(true);

    try {
      // Format the data according to the model
      const doctorData = {
        professionalLicenseNumber: licenseNumber,
        biography,
        speciality, // Add this line
        education: education.map((edu) => ({
          institution: edu.institution,
          degree: edu.degree,
          year: Number(edu.year),
        })),
        experience: experience.map((exp) => ({
          position: exp.position,
          institution: exp.institution,
          startYear: Number(exp.startYear),
          endYear: Number(exp.endYear),
        })),
        languages,
        consultationFee: Number(consultationFee),
        availabilitySchedule: availabilitySchedule.filter(
          (schedule) => schedule.isAvailable
        ),
      };

      // Use the user.id from the auth context
      const response = await api.put(`/doctors/user/${user._id}`, doctorData);

      console.log("Submitting doctor data:", response);

      toast({
        title: "Verification information submitted",
        description:
          "Your professional information has been submitted for review.",
      });

      // Redirect to a confirmation page
      router.push("/doctor/verification/submitted");
    } catch (error) {
      console.error("Error submitting doctor verification:", error);
      toast({
        title: "Submission failed",
        description:
          "There was an error submitting your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper to show error message
  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
      <div className="text-red-500 text-sm mt-1 flex items-center">
        <AlertCircle className="h-3 w-3 mr-1" />
        {message}
      </div>
    );
  };

  // Helper to determine if a field has an error and should show it
  const showError = (field: string, error?: string) => {
    return touched[field] && error;
  };
  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!user || !user._id) return;
      
      try {
        setFetchingData(true);
        const response = await api.get(`/doctors/user/${user._id}`);
        const doctorData = response.data;
        
        if (doctorData) {
          // Populate form with existing data
          setLicenseNumber(doctorData.professionalLicenseNumber || "");
          setBiography(doctorData.biography || "");
          setSpeciality(doctorData.speciality || "");
          
          // Handle education data
          if (doctorData.education && doctorData.education.length > 0) {
            setEducation(
              doctorData.education.map((edu: any) => ({
                institution: edu.institution || "",
                degree: edu.degree || "",
                year: edu.year ? edu.year.toString() : "",
              }))
            );
          }
          
          // Handle experience data
          if (doctorData.experience && doctorData.experience.length > 0) {
            setExperience(
              doctorData.experience.map((exp: any) => ({
                position: exp.position || "",
                institution: exp.institution || "",
                startYear: exp.startYear ? exp.startYear.toString() : "",
                endYear: exp.endYear ? exp.endYear.toString() : "",
              }))
            );
          }
          
          // Handle languages
          if (doctorData.languages) {
            setLanguages(doctorData.languages);
          }
          
          // Handle consultation fee
          if (doctorData.consultationFee) {
            setConsultationFee(doctorData.consultationFee.toString());
          }
          
          // Handle availability schedule
          if (doctorData.availabilitySchedule && doctorData.availabilitySchedule.length > 0) {
            const newSchedule = [...availabilitySchedule];
            
            doctorData.availabilitySchedule.forEach((schedule: any) => {
              const dayIndex = newSchedule.findIndex(
                (s) => s.day === schedule.day
              );
              
              if (dayIndex !== -1) {
                newSchedule[dayIndex] = {
                  ...newSchedule[dayIndex],
                  startTime: schedule.startTime || "09:00",
                  endTime: schedule.endTime || "17:00",
                  isAvailable: true,
                };
              }
            });
            
            setAvailabilitySchedule(newSchedule);
          }
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        toast({
          variant: "destructive",
          title: "Failed to load data",
          description: "Could not retrieve your existing information. You can still proceed with the form.",
        });
      } finally {
        setFetchingData(false);
      }
    };

    if (!isLoading && user && user._id) {
      fetchDoctorData();
    } else {
      setFetchingData(false);
    }
  }, [isLoading, user]);
  if (fetchingData) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex items-center mb-6">
          <div className="bg-[#1e3a8a] p-3 rounded-lg mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#1e3a8a]">
              Doctor Registration
            </h2>
            <p className="text-gray-600">
              Loading your information...
            </p>
          </div>
        </div>
        
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a]"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-10 px-4">


      <div className="flex items-center mb-6">
        <div className="bg-[#1e3a8a] p-3 rounded-lg mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#1e3a8a]">
            Doctor Registration
          </h2>
          <p className="text-gray-600">
            Join our network of healthcare professionals and start providing
            virtual consultations to patients worldwide.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card className="mb-8 border-0 shadow-sm">
              <CardHeader className="bg-[#f8fafc] border-b pb-4">
                <div className="flex items-center">
                  <Heart
                    className="h-5 w-5 text-[#1e3a8a] mr-2"
                    fill="#1e3a8a"
                    strokeWidth={1}
                  />
                  <CardTitle className="text-[#1e3a8a] text-xl">
                    Basic Information
                  </CardTitle>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  Please provide your professional details
                </p>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* License Number */}
                <div className="space-y-2">
                  <Label
                    htmlFor="licenseNumber"
                    className="text-[#1e3a8a] font-medium"
                  >
                    Professional License Number{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="licenseNumber"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    onBlur={() => handleBlur("licenseNumber")}
                    placeholder="Enter your professional license number"
                    required
                    className={`border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a] ${
                      showError("licenseNumber", errors.licenseNumber)
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {showError("licenseNumber", errors.licenseNumber) && (
                    <ErrorMessage message={errors.licenseNumber} />
                  )}
                  <p className="text-sm text-gray-500">
                    This should be your official medical license number.
                  </p>
                </div>

                {/* Speciality - Add this section */}
                <div className="space-y-2">
                  <Label
                    htmlFor="speciality"
                    className="text-[#1e3a8a] font-medium"
                  >
                    Medical Speciality <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="speciality"
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    onBlur={() => handleBlur("speciality")}
                    className={`w-full rounded-md border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a] ${
                      showError("speciality", errors.speciality)
                        ? "border-red-500"
                        : ""
                    }`}
                    required
                  >
                    <option value="">Select your speciality</option>
                    {specialityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {showError("speciality", errors.speciality) && (
                    <ErrorMessage message={errors.speciality} />
                  )}
                  <p className="text-sm text-gray-500">
                    Select the medical speciality that best describes your
                    practice.
                  </p>
                </div>

                {/* Biography */}
                <div className="space-y-2">
                  <Label
                    htmlFor="biography"
                    className="text-[#1e3a8a] font-medium"
                  >
                    Biography
                  </Label>
                  <Textarea
                    id="biography"
                    value={biography}
                    onChange={(e) => setBiography(e.target.value)}
                    onBlur={() => handleBlur("biography")}
                    placeholder="Write a short biography about yourself and your medical practice"
                    className={`min-h-[120px] border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a] ${
                      showError("biography", errors.biography)
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {showError("biography", errors.biography) && (
                    <ErrorMessage message={errors.biography} />
                  )}
                  <p className="text-sm text-gray-500">
                    This will be displayed on your public profile.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 border-0 shadow-sm">
              <CardHeader className="bg-[#f8fafc] border-b pb-4">
                <CardTitle className="text-[#1e3a8a] text-xl">
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {education.map((edu, index) => (
                  <div
                    key={`edu-${index}`}
                    className="p-4 border border-gray-200 rounded-md space-y-4 relative"
                  >
                    {education.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 text-gray-400 hover:text-gray-600"
                        onClick={() => removeEducation(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor={`edu-institution-${index}`}
                          className="text-[#1e3a8a] font-medium"
                        >
                          Institution <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id={`edu-institution-${index}`}
                          value={edu.institution}
                          onChange={(e) =>
                            updateEducation(
                              index,
                              "institution",
                              e.target.value
                            )
                          }
                          onBlur={() =>
                            handleBlur(`education.${index}.institution`)
                          }
                          placeholder="Institution name"
                          className={`border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a] ${
                            touched[`education.${index}.institution`] &&
                            errors.education[index]?.institution
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {touched[`education.${index}.institution`] &&
                          errors.education[index]?.institution && (
                            <ErrorMessage
                              message={errors.education[index]?.institution}
                            />
                          )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor={`edu-degree-${index}`}
                          className="text-[#1e3a8a] font-medium"
                        >
                          Degree <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id={`edu-degree-${index}`}
                          value={edu.degree}
                          onChange={(e) =>
                            updateEducation(index, "degree", e.target.value)
                          }
                          onBlur={() => handleBlur(`education.${index}.degree`)}
                          placeholder="Degree obtained"
                          className={`border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a] ${
                            touched[`education.${index}.degree`] &&
                            errors.education[index]?.degree
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {touched[`education.${index}.degree`] &&
                          errors.education[index]?.degree && (
                            <ErrorMessage
                              message={errors.education[index]?.degree}
                            />
                          )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor={`edu-year-${index}`}
                        className="text-[#1e3a8a] font-medium"
                      >
                        Year <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`edu-year-${index}`}
                        type="number"
                        value={edu.year}
                        onChange={(e) =>
                          updateEducation(index, "year", e.target.value)
                        }
                        onBlur={() => handleBlur(`education.${index}.year`)}
                        placeholder="Year of completion"
                        className={`border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a] ${
                          touched[`education.${index}.year`] &&
                          errors.education[index]?.year
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {touched[`education.${index}.year`] &&
                        errors.education[index]?.year && (
                          <ErrorMessage
                            message={errors.education[index]?.year}
                          />
                        )}
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addEducation}
                  className="mt-2 border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Education
                </Button>
              </CardContent>
            </Card>

            <Card className="mb-8 border-0 shadow-sm">
              <CardHeader className="bg-[#f8fafc] border-b pb-4">
                <CardTitle className="text-[#1e3a8a] text-xl">
                  Professional Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {experience.map((exp, index) => (
                  <div
                    key={`exp-${index}`}
                    className="p-4 border border-gray-200 rounded-md space-y-4 relative"
                  >
                    {experience.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 text-gray-400 hover:text-gray-600"
                        onClick={() => removeExperience(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}

                    <div className="space-y-2">
                      <Label
                        htmlFor={`exp-position-${index}`}
                        className="text-[#1e3a8a] font-medium"
                      >
                        Position <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`exp-position-${index}`}
                        value={exp.position}
                        onChange={(e) =>
                          updateExperience(index, "position", e.target.value)
                        }
                        onBlur={() =>
                          handleBlur(`experience.${index}.position`)
                        }
                        placeholder="Job title"
                        className={`border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a] ${
                          touched[`experience.${index}.position`] &&
                          errors.experience[index]?.position
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {touched[`experience.${index}.position`] &&
                        errors.experience[index]?.position && (
                          <ErrorMessage
                            message={errors.experience[index]?.position}
                          />
                        )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor={`exp-institution-${index}`}
                        className="text-[#1e3a8a] font-medium"
                      >
                        Institution <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`exp-institution-${index}`}
                        value={exp.institution}
                        onChange={(e) =>
                          updateExperience(index, "institution", e.target.value)
                        }
                        onBlur={() =>
                          handleBlur(`experience.${index}.institution`)
                        }
                        placeholder="Company or hospital name"
                        className={`border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a] ${
                          touched[`experience.${index}.institution`] &&
                          errors.experience[index]?.institution
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {touched[`experience.${index}.institution`] &&
                        errors.experience[index]?.institution && (
                          <ErrorMessage
                            message={errors.experience[index]?.institution}
                          />
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor={`exp-startYear-${index}`}
                          className="text-[#1e3a8a] font-medium"
                        >
                          Start Year <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id={`exp-startYear-${index}`}
                          type="number"
                          value={exp.startYear}
                          onChange={(e) =>
                            updateExperience(index, "startYear", e.target.value)
                          }
                          onBlur={() =>
                            handleBlur(`experience.${index}.startYear`)
                          }
                          placeholder="Start year"
                          className={`border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a] ${
                            touched[`experience.${index}.startYear`] &&
                            errors.experience[index]?.startYear
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {touched[`experience.${index}.startYear`] &&
                          errors.experience[index]?.startYear && (
                            <ErrorMessage
                              message={errors.experience[index]?.startYear}
                            />
                          )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor={`exp-endYear-${index}`}
                          className="text-[#1e3a8a] font-medium"
                        >
                          End Year
                        </Label>
                        <Input
                          id={`exp-endYear-${index}`}
                          type="number"
                          value={exp.endYear}
                          onChange={(e) =>
                            updateExperience(index, "endYear", e.target.value)
                          }
                          onBlur={() =>
                            handleBlur(`experience.${index}.endYear`)
                          }
                          placeholder="End year (or current)"
                          className={`border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a] ${
                            touched[`experience.${index}.endYear`] &&
                            errors.experience[index]?.endYear
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {touched[`experience.${index}.endYear`] &&
                          errors.experience[index]?.endYear && (
                            <ErrorMessage
                              message={errors.experience[index]?.endYear}
                            />
                          )}
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addExperience}
                  className="mt-2 border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Experience
                </Button>
              </CardContent>
            </Card>

            <Card className="mb-8 border-0 shadow-sm">
              <CardHeader className="bg-[#f8fafc] border-b pb-4">
                <CardTitle className="text-[#1e3a8a] text-xl">
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {languageOptions.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={`language-${language}`}
                        checked={languages.includes(language)}
                        onCheckedChange={() => toggleLanguage(language)}
                        className={`border-gray-300 text-[#1e3a8a] focus:ring-[#1e3a8a] ${
                          touched["languages"] &&
                          errors.languages &&
                          languages.length === 0
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      <Label
                        htmlFor={`language-${language}`}
                        className="cursor-pointer"
                      >
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
                {touched["languages"] && errors.languages && (
                  <ErrorMessage message={errors.languages} />
                )}
              </CardContent>
            </Card>

            <Card className="mb-8 border-0 shadow-sm">
              <CardHeader className="bg-[#f8fafc] border-b pb-4">
                <CardTitle className="text-[#1e3a8a] text-xl">
                  Consultation Fee
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2 max-w-md">
                  <Label
                    htmlFor="consultationFee"
                    className="text-[#1e3a8a] font-medium"
                  >
                    Fee per consultation <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                      $
                    </span>
                    <Input
                      id="consultationFee"
                      type="number"
                      value={consultationFee}
                      onChange={(e) => setConsultationFee(e.target.value)}
                      onBlur={() => handleBlur("consultationFee")}
                      placeholder="0.00"
                      className={`pl-8 border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a] ${
                        showError("consultationFee", errors.consultationFee)
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                  </div>
                  {showError("consultationFee", errors.consultationFee) && (
                    <ErrorMessage message={errors.consultationFee} />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 border-0 shadow-sm">
              <CardHeader className="bg-[#f8fafc] border-b pb-4">
                <CardTitle className="text-[#1e3a8a] text-xl">
                  Availability Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  {availabilitySchedule.map((schedule, index) => (
                    <div
                      key={schedule.day}
                      className="p-4 border border-gray-200 rounded-md"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`day-${schedule.day}`}
                            checked={schedule.isAvailable}
                            onCheckedChange={() => toggleAvailability(index)}
                            className={`border-gray-300 text-[#1e3a8a] focus:ring-[#1e3a8a] ${
                              touched["availabilitySchedule"] &&
                              errors.availabilitySchedule
                                ? "border-red-500"
                                : ""
                            }`}
                          />
                          <Label
                            htmlFor={`day-${schedule.day}`}
                            className="font-medium cursor-pointer"
                          >
                            {schedule.day}
                          </Label>
                        </div>
                      </div>

                      {schedule.isAvailable && (
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div className="space-y-2">
                            <Label
                              htmlFor={`start-${schedule.day}`}
                              className="text-[#1e3a8a] font-medium"
                            >
                              Start Time
                            </Label>
                            <Input
                              id={`start-${schedule.day}`}
                              type="time"
                              value={schedule.startTime}
                              onChange={(e) =>
                                updateScheduleTime(
                                  index,
                                  "startTime",
                                  e.target.value
                                )
                              }
                              className="border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor={`end-${schedule.day}`}
                              className="text-[#1e3a8a] font-medium"
                            >
                              End Time
                            </Label>
                            <Input
                              id={`end-${schedule.day}`}
                              type="time"
                              value={schedule.endTime}
                              onChange={(e) =>
                                updateScheduleTime(
                                  index,
                                  "endTime",
                                  e.target.value
                                )
                              }
                              className="border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a]"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {touched["availabilitySchedule"] &&
                    errors.availabilitySchedule && (
                      <ErrorMessage message={errors.availabilitySchedule} />
                    )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white"
              >
                {loading ? "Submitting..." : "Submit for Verification"}
              </Button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm sticky top-6">
            <CardHeader className="bg-[#f8fafc] border-b pb-4">
              <CardTitle className="text-[#1e3a8a] text-xl">
                Registration Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#1e3a8a] mt-0.5" />
                  <div>
                    <h3 className="font-medium text-[#1e3a8a]">
                      Expand Your Practice
                    </h3>
                    <p className="text-sm text-gray-600">
                      Reach patients beyond your physical location
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#1e3a8a] mt-0.5" />
                  <div>
                    <h3 className="font-medium text-[#1e3a8a]">
                      Flexible Schedule
                    </h3>
                    <p className="text-sm text-gray-600">
                      Set your own availability and work hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#1e3a8a] mt-0.5" />
                  <div>
                    <h3 className="font-medium text-[#1e3a8a]">
                      Secure Platform
                    </h3>
                    <p className="text-sm text-gray-600">
                      HIPAA-compliant telehealth infrastructure
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#1e3a8a] mt-0.5" />
                  <div>
                    <h3 className="font-medium text-[#1e3a8a]">
                      Easy Payments
                    </h3>
                    <p className="text-sm text-gray-600">
                      Automated billing and payment processing
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
