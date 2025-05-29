"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, CheckCircle, X } from "lucide-react";

// Import components
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";
import ProgressSteps from "./components/ProgressSteps";
import DoctorDetails from "./components/DoctorDetails";

// Import types and data
import { Reason, Doctor } from "./types";
import { doctorTypes } from "./data";
import { fetchAllDoctors } from "@/utils/doctor";
import { getHealthCategories, getHealthConditions } from "@/utils/HealthCondition";
import { getAllSpecialities, getSpecialities } from "@/utils/specialities";
import { getDoctorsBySpeciality, getDoctorById } from "@/utils/doctor";
import { createNewApp } from "@/utils/appointment";

export default function AppointmentBooking() {
  // Doctor Hooks to fetch the data
  // const { data: doctors = [], isLoading, isError } = useDoctors();

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<string | null>(null);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [categories, setCategories] = useState<String[]>([]);
  const [conditions, setConditions] = useState<String[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Payment-related state
  const [paymentMethod, setPaymentMethod] = useState<"creditCard" | "insurance" | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(80.00); // Default amount
  const [currentPatientId, setCurrentPatientId] = useState<string>("64c1e3e71b8f8c2a8f0b1234"); // This should come from auth/session

  // Success alert state
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     try {
  //       const data = await fetchAllDoctors();
  //       setDoctors(data);
  //       setIsLoading(false);
  //       // console.log("data: ", data);

  //     } catch (error) {
  //       console.error("Error fetching doctors:", error);
  //       setIsError(true);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchDoctors();
  // }, []);

  // Fetch All Health Categories
  useEffect(() => {
    const fetchHealthCategories = async () => {
      try {
        const data = await getHealthCategories();
        setCategories(data);
        console.log("Categories data: ", data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchHealthCategories();
  }, []);

  // Fetch All Health Conditions
  useEffect(() => {
    const fetchHealthConditions = async () => {
      try {
        const data = await getHealthConditions();
        setConditions(data);
        console.log("Conditions data: ", data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchHealthConditions();
  }, []);

  // State for the booking process
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedReasons, setSelectedReasons] = useState<Reason[]>([]);
  const [selectedDoctorType, setSelectedDoctorType] = useState<string | null>(
    null
  );
  const [selectedDoctorSpeciality, setSelectedDoctorSpeciality] = useState<string | null>(
    null
  );
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [showTimeSlots, setShowTimeSlots] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"rating" | "availability">(
    "availability"
  );
  const [viewingDoctorDetails, setViewingDoctorDetails] = useState<
    string | null
  >(null);

  // Add ref for scrolling to top when step changes
  const contentRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  // Add to your state declarations
  const [specialities, setSpecialities] = useState<any[]>([]);
  const [allSpecialities, setAllSpecialities] = useState<any[]>([]);

  // Fetch Specialities
  useEffect(() => {
    const fetchSpecialities = async () => {
      if (selectedReasons.length === 0) {
        setSpecialities([]);
        return;
      }

      // Extract Ids from selectedReasons
      const selectedIds = selectedReasons.map(reason => reason.id);

      try {
        const data = await getSpecialities(selectedIds);
        setSpecialities(data);
        // console.log("data =========> ", data);
      } catch (error) {
        console.error("Error fetching specialties:", error);
        setSpecialities([]);
      }
    };

    fetchSpecialities();
  }, [selectedReasons]);

  // Fetch All Specialities
  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const data = await getAllSpecialities();
        setAllSpecialities(data);
        console.log("data =========> =======> ==> $$$ ", data);
      } catch (error) {
        console.error("Error fetching specialties:", error);
        setAllSpecialities([]);
      }
    };

    fetchSpecialities();
  }, []);


  // Fetch Doctor by Speciality
  useEffect(() => {
    const fetchDoctorsBySpeciality = async () => {
      if (!selectedDoctorSpeciality) return;
      console.log("selectedDoctorSpeciality: ", selectedDoctorSpeciality?.name);
      try {
        const data = await getDoctorsBySpeciality(selectedDoctorSpeciality?.name);
        setDoctors(data);
        setSelectedDoctor(data[0]);
        console.log("getDoctorsBySpeciality data: ", data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDoctorsBySpeciality();
  }, [selectedDoctorSpeciality]);

  // Fetch Doctor By Id
  useEffect(() => {
    const fetchDocById = async () => {
      try {
        if (selectedDoctor) {
          // console.log("selectedDoctor: ", selectedDoctor);
          const data = await getDoctorById(selectedDoctor?._id);
          if (data) {
            console.log("doc data ===> ", data);
            setDoctor(data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchDocById();
  }, [selectedDoctor]);

  // Helper function to convert day name to date
  const convertDayToDate = (dayName: string): string => {
    const today = new Date();
    const dayMap: { [key: string]: number } = {
      'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3,
      'Thursday': 4, 'Friday': 5, 'Saturday': 6
    };

    if (dayName === 'Today') {
      return today.toISOString();
    }

    if (dayName === 'Tomorrow') {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      return tomorrow.toISOString();
    }

    // For other days, find the next occurrence of that day
    const targetDay = dayMap[dayName];
    if (targetDay !== undefined) {
      const daysUntilTarget = (targetDay - today.getDay() + 7) % 7;
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + (daysUntilTarget === 0 ? 7 : daysUntilTarget));
      return targetDate.toISOString();
    }

    // Fallback to today if day name is not recognized
    return today.toISOString();
  };

  // Helper function to generate transaction ID
  const generateTransactionId = (): string => {
    return `TXN${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  };

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

  const handleContinue = async () => {
    if (currentStep === 1 && selectedReasons.length > 0) {
      setCurrentStep(2);
      setTimeout(() => {
        if (mainContainerRef.current) {
          window.scrollTo({
            top: mainContainerRef.current.offsetTop,
            behavior: "smooth",
          });
        }
      }, 100);
    } else if (currentStep === 2 && selectedDoctorType) {
      setCurrentStep(3);
      setTimeout(() => {
        if (mainContainerRef.current) {
          window.scrollTo({
            top: mainContainerRef.current.offsetTop,
            behavior: "smooth",
          });
        }
      }, 100);
    } else if (currentStep === 3 && selectedDoctor && selectedTimeSlot) {
      setCurrentStep(4);
      setTimeout(() => {
        if (mainContainerRef.current) {
          window.scrollTo({
            top: mainContainerRef.current.offsetTop,
            behavior: "smooth",
          });
        }
      }, 100);
    } else if (currentStep === 4) {
      // Submit the Appointment
      console.log("Submit the Appointment");

      // Extract the actual time slot from the key
      const actualTimeSlot = selectedTimeSlot?.split('_')[1] || selectedTimeSlot;
      const appointmentDate = convertDayToDate(selectedDay || 'Today');

      // Create the appointment data in the required format
      const appointmentData = {
        doctorId: selectedDoctor,
        date: appointmentDate,
        startTime: actualTimeSlot?.split(' - ')[0] || "10:00",
        endTime: actualTimeSlot?.split(' - ')[1] || "10:30",
        status: "scheduled",
        conditionIds: selectedReasons.map(reason => reason.id),
        payment: {
          amount: paymentAmount,
          status: "pending",
          transactionId: generateTransactionId(),
          paymentMethod: paymentMethod === "creditCard" ? "credit_card" : "insurance",
          paidAt: new Date().toISOString()
        },
        notes: [
          "Appointment booked via patient portal",
          `Selected conditions: ${selectedReasons.map(r => r.title).join(', ')}`
        ],
        meeting: null, // This will be created by the backend
        messages: {
          text: [
            "Please arrive 10 minutes early",
            "Make sure you have a stable internet connection for the video consultation"
          ],
          userType: "system"
        },
        createdAt: new Date().toISOString()
      };

      try {

        const res = await createNewApp(appointmentData);
        if (res) {
          setShowSuccessAlert(true);
          resetFormState();
          setCurrentStep(1);
        } else {
          setTimeout(() => {
            setShowSuccessAlert(false);
          }, 5000);
        }
      } catch (error) {
        console.error("Error submitting appointment:", error);
      }
    }
  };

  // Function to reset all form state
  const resetFormState = () => {
    setSelectedReasons([]);
    setSelectedDoctorType(null);
    setSelectedDoctorSpeciality(null);
    setSelectedDoctor(null);
    setSelectedTimeSlot(null);
    setSelectedDay(null);
    setShowTimeSlots(null);
    setPaymentMethod(null);
    setDoctor(null);
    setDoctors([]);
    setSpecialities([]);
  };



  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);

      // Reset selections when going back
      if (currentStep === 3) {
        setSelectedDoctor(null);
        setSelectedTimeSlot(null);
        setSelectedDay(null);
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

  const selectTimeSlot = (slot: string, day: string) => {
    const slotKey = `${day}_${slot}`;
    setSelectedTimeSlot(slotKey);
    setSelectedDay(day);
  };

  const viewDoctorDetails = (doctorId: string) => {
    setViewingDoctorDetails(doctorId);
  };

  const closeDoctorDetails = () => {
    setViewingDoctorDetails(null);
  };

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

    // Map the API data to match the expected Doctor type
    const mappedDoctors = doctors.map((doctor: any) => ({
      id: doctor._id,
      name: `${doctor.user.firstName} ${doctor.user.lastName}`,
      speciality: doctor.speciality,
      rating: doctor.averageRating,
      reviews: doctor.reviewsCount,
      experience: doctor.experience.length > 0
        ? new Date().getFullYear() - doctor.experience[0].startYear
        : 0,
      distance: "5 miles", // You might want to calculate this or get from API
      image: doctor.user.profileImage || "/placeholder.svg",
      availability: doctor.availabilitySchedule
        .filter((avail: any) => avail.isAvailable)
        .map((avail: any) => ({
          day: avail.day,
          slots: generateTimeSlots(avail.startTime, avail.endTime) // Helper function needed
        }))
    }));

    // console.log("doctor.speciality: ", doctors[1].speciality);

    // generateTimeSlots
    function generateTimeSlots(startTime: string, endTime: string): string[] {
      const slots = [];
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);

      let currentHour = startHour;
      let currentMinute = startMinute;

      while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
        const nextHour = currentMinute + 30 >= 60 ? currentHour + 1 : currentHour;
        const nextMinute = (currentMinute + 30) % 60;

        const endHourFormatted = nextHour.toString().padStart(2, '0');
        const endMinuteFormatted = nextMinute.toString().padStart(2, '0');

        slots.push(
          `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')} - ${endHourFormatted}:${endMinuteFormatted}`
        );

        currentHour = nextHour;
        currentMinute = nextMinute;
      }

      return slots;
    }

    // Filter by selected doctor type
    const filtered = mappedDoctors.filter(
      (doctor: any) => doctor.speciality.toLowerCase() === selectedDoctorType.toLowerCase()
    );

    // Sort doctors based on the selected sort criteria
    if (sortBy === "rating") {
      return filtered.sort((a: any, b: any) => b.rating - a.rating);
    } else {
      // Sort by availability (doctors with today slots first)
      return filtered.sort((a: any, b: any) => {
        const aHasToday = a.availability.some((avail: any) => avail.day === "Today");
        const bHasToday = b.availability.some((avail: any) => avail.day === "Today");

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

  // Get the selected doctor object
  const getSelectedDoctorObject = (): Doctor | null => {
    if (!selectedDoctor) return null;
    return doctors.find((doc) => doc.id === selectedDoctor) || null;
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
    <div
      className="min-h-screen bg-white overflow-x-hidden"
      ref={mainContainerRef}
    >

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-green-800">
                  Appointment Created Successfully!
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Your appointment has been booked. You'll receive a confirmation email shortly.
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  onClick={() => setShowSuccessAlert(false)}
                  className="inline-flex text-green-400 hover:text-green-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div
          ref={contentRef}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="inline-block px-3 py-1 bg-[#e6f7f2] text-[#0d9488] text-sm font-medium rounded-full mb-4">
                Premium Healthcare Anywhere
              </div>
              <h1 className="text-2xl font-bold text-[#1e3a8a]">
                Book an Appointment
              </h1>
            </div>
            <ProgressSteps currentStep={currentStep} />
          </div>

          <div className="max-h-[calc(100vh-250px)] overflow-y-auto px-2 pb-4">
            {currentStep === 1 && (
              <StepOne
                selectedReasons={selectedReasons}
                onReasonSelect={handleReasonSelect}
                isSelected={isSelected}
                categories={categories}
                conditions={conditions}
              />
            )}

            {currentStep === 2 && (
              <StepTwo
                selectedReasons={selectedReasons}
                recommendedDoctorTypes={[...recommendedDoctorTypes]}
                selectedDoctorType={selectedDoctorType}
                setSelectedDoctorType={setSelectedDoctorType}
                setSelectedDoctorSpeciality={setSelectedDoctorSpeciality}
                specialities={specialities}
                allSpecialities={allSpecialities}
              />
            )}

            {currentStep === 3 && (
              <StepThree
                selectedDoctorTypeTitle={getSelectedDoctorTypeTitle()}
                selectedReasons={selectedReasons}
                sortBy={sortBy}
                setSortBy={setSortBy}
                filteredDoctors={filteredDoctors}
                selectedDoctor={selectedDoctor}
                showTimeSlots={showTimeSlots}
                toggleTimeSlots={toggleTimeSlots}
                selectedTimeSlot={selectedTimeSlot}
                selectTimeSlot={selectTimeSlot} // This now receives (slot, day) parameters
                viewDoctorDetails={viewDoctorDetails}
                doctors={doctors}
              />
            )}

            {currentStep === 4 && (
              <StepFour
                selectedDoctor={getSelectedDoctorObject()}
                selectedTimeSlot={selectedTimeSlot}
                selectedReasons={selectedReasons}
                doctor={doctor}
              />
            )}
          </div>

          {/* Navigation buttons - fixed at the bottom */}
          <div className="mt-6 flex justify-between items-center border-t border-gray-100 pt-6">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 ${currentStep === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-50"
                }`}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={
                (currentStep === 1 && selectedReasons.length === 0) ||
                (currentStep === 2 && !selectedDoctorType) ||
                (currentStep === 3 && (!selectedDoctor || !selectedTimeSlot))
              }
              className={`px-6 py-2 rounded-lg ${(currentStep === 1 && selectedReasons.length === 0) ||
                (currentStep === 2 && !selectedDoctorType) ||
                (currentStep === 3 && (!selectedDoctor || !selectedTimeSlot))
                ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-500"
                : "bg-[#1e3a8a] text-white hover:bg-[#1e40af]"
                }`}
            >
              {currentStep === 4 ? "Confirm Appointment" : "Continue"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
