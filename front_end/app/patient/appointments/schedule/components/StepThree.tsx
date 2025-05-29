"use client";

import { Filter, Star, Clock, MapPin } from "lucide-react";
import { Doctor } from "../types";

interface StepThreeProps {
  selectedDoctorTypeTitle: string;
  selectedReasons: any[];
  sortBy: "rating" | "availability";
  setSortBy: (sort: "rating" | "availability") => void;
  filteredDoctors: Doctor[];
  selectedDoctor: string | null;
  showTimeSlots: string | null;
  toggleTimeSlots: (doctorId: string) => void;
  selectedTimeSlot: string | null;
  selectTimeSlot: (slot: string, day: string) => void; // Modified to include day
  viewDoctorDetails: (doctorId: string) => void;
  doctors: any[]
}

export default function StepThree({
  selectedDoctorTypeTitle,
  selectedReasons,
  sortBy,
  setSortBy,
  filteredDoctors,
  selectedDoctor,
  showTimeSlots,
  toggleTimeSlots,
  selectedTimeSlot,
  selectTimeSlot,
  viewDoctorDetails,
  doctors
}: StepThreeProps) {

  // Helper function to generate time slots
  const generateTimeSlots = (startTime: string, endTime: string): string[] => {
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
  };

  // Helper function to check if a specific time slot on a specific day is selected
  const isTimeSlotSelected = (slot: string, day: string): boolean => {
    if (!selectedTimeSlot) return false;
    // Parse the selectedTimeSlot if it includes day information
    const selectedSlotKey = `${day}_${slot}`;
    return selectedTimeSlot === selectedSlotKey || selectedTimeSlot === slot;
  };

  // Transform doctors data to match the component structure
  const transformedDoctors = doctors?.map((doctor) => {
    // Calculate experience years
    const currentYear = new Date().getFullYear();
    const experienceYears = doctor.experience?.length > 0 
      ? currentYear - doctor.experience[0].startYear 
      : 0;

    // Transform availability schedule
    const availability = doctor.availabilitySchedule
      ?.filter((avail) => avail.isAvailable)
      ?.map((avail) => ({
        day: avail.day,
        slots: generateTimeSlots(avail.startTime, avail.endTime)
      })) || [];

    return {
      id: doctor._id,
      name: `${doctor.user.firstName} ${doctor.user.lastName}`,
      speciality: doctor.speciality,
      rating: doctor.averageRating || 0,
      reviews: doctor.reviewsCount || 0,
      experience: experienceYears,
      distance: "5 miles", // You might want to calculate this or get from API
      image: doctor.user.profileImage || "/api/placeholder/64/64",
      availability: availability,
      consultationFee: doctor.consultationFee,
      biography: doctor.biography,
      education: doctor.education,
      languages: doctor.languages
    };
  }) || [];

  // Sort doctors based on the selected sort criteria
  const sortedDoctors = [...transformedDoctors].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating;
    } else {
      // Sort by availability (doctors with available slots first)
      const aHasAvailability = a.availability.length > 0;
      const bHasAvailability = b.availability.length > 0;

      if (aHasAvailability && !bHasAvailability) return -1;
      if (!aHasAvailability && bHasAvailability) return 1;
      return b.rating - a.rating; // If tie, sort by rating
    }
  });

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-medium text-gray-800">Select a Doctor</h2>
        <button className="text-[#1e3a8a] text-sm font-medium hover:underline">
          All Ratings
        </button>
      </div>
      <p className="text-gray-600 mb-4">
        Choose from our available specialists ({sortedDoctors.length} doctors found)
      </p>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {selectedDoctorTypeTitle && (
            <div className="flex items-center gap-2 bg-[#eef2ff] text-[#1e3a8a] px-3 py-1.5 rounded-full text-sm">
              <span>{selectedDoctorTypeTitle}</span>
            </div>
          )}
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
              className={`px-3 py-1.5 text-sm ${sortBy === "rating"
                  ? "bg-[#1e3a8a] text-white"
                  : "bg-white text-gray-700"
                }`}
              onClick={() => setSortBy("rating")}
            >
              Rating
            </button>
            <button
              className={`px-3 py-1.5 text-sm ${sortBy === "availability"
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
        {sortedDoctors && sortedDoctors.length > 0 ? (
          sortedDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className={`border rounded-lg overflow-hidden transition-all ${selectedDoctor === doctor.id
                  ? "border-[#1e3a8a] ring-2 ring-[#1e3a8a]"
                  : "border-gray-200"
                }`}
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={doctor.image}
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
                        {doctor.consultationFee && (
                          <p className="text-[#1e3a8a] text-sm font-medium">
                            ${doctor.consultationFee} consultation
                          </p>
                        )}
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
                          {doctor.rating.toFixed(1)}/5
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
                    {doctor.languages && doctor.languages.length > 0 && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">
                          Languages: {doctor.languages.join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700">
                      Availability
                    </div>
                    <div className="text-sm text-gray-800">
                      {doctor.availability && doctor.availability.length > 0
                        ? `${doctor.availability.length} day${doctor.availability.length > 1 ? 's' : ''} available`
                        : "Not available"}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleTimeSlots(doctor.id)}
                    disabled={!doctor.availability || doctor.availability.length === 0}
                    className={`px-4 py-2 rounded-lg ${
                      !doctor.availability || doctor.availability.length === 0
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : selectedDoctor === doctor.id && selectedTimeSlot
                        ? "bg-[#1e3a8a] text-white"
                        : "border border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white"
                      }`}
                  >
                    {selectedDoctor === doctor.id && selectedTimeSlot
                      ? "Time Selected"
                      : showTimeSlots === doctor.id
                        ? "Hide Times"
                        : doctor.availability && doctor.availability.length > 0
                          ? "Select Time"
                          : "No Availability"}
                  </button>
                </div>
              </div>

              {showTimeSlots === doctor.id && doctor.availability && doctor.availability.length > 0 && (
                <div className="bg-gray-50 p-4 border-t border-gray-200">
                  {doctor.availability.map((avail, index) => (
                    <div key={`${avail.day}-${index}`} className="mb-3 last:mb-0">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        {avail.day}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {avail.slots && avail.slots.length > 0 ? (
                          avail.slots.map((slot, slotIndex) => (
                            <button
                              key={`${slot}-${slotIndex}`}
                              onClick={() => selectTimeSlot(slot, avail.day)}
                              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${isTimeSlotSelected(slot, avail.day)
                                  ? "bg-[#1e3a8a] text-white"
                                  : "bg-white border border-gray-200 text-gray-700 hover:border-[#1e3a8a] hover:bg-[#eef2ff]"
                                }`}
                            >
                              {slot}
                            </button>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">No available time slots</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-800">No doctors found</h3>
            <p className="text-gray-600 mt-2">
              Please check back later or try refreshing the page
            </p>
          </div>
        )}
      </div>
    </div>
  );
}