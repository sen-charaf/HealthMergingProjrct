"use client";

import { useState } from "react";
import { ArrowLeft, Star } from "lucide-react";

type DoctorDetailsProps = {
  doctorId: string;
  onBack: () => void;
  onBookAppointment: () => void;
};

export default function DoctorDetails({
  doctorId,
  onBack,
  onBookAppointment,
}: DoctorDetailsProps) {
  const [selectedTab, setSelectedTab] = useState<"about" | "reviews">("about");

  // This would typically come from an API or props
  // Using hardcoded data for this example
  const doctor = {
    id: "dr-sarah-wilson",
    name: "Dr. Sarah Wilson",
    speciality: "General Medicine",
    rating: 4.8,
    reviews: 156,
    experience: 12,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Dr. Wilson is a board-certified physician with over 12 years of experience in general medicine. She specializes in preventive care and managing chronic conditions, taking a holistic approach to patient health.",
    consultationFee: "$200/visit",
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
    education: [
      {
        type: "Medical School",
        institution: "MD - Stanford University",
      },
      {
        type: "Residency",
        institution: "Johns Hopkins Hospital",
      },
      {
        type: "Fellowships",
        institution: "Cardiovascular Disease - Mayo Clinic",
      },
    ],
    certifications: [
      "American Board of Internal Medicine",
      "Advanced Cardiac Life Support",
    ],
    specializations: [
      "Preventive Medicine",
      "Chronic Disease Management",
      "Geriatric Care",
    ],
    publications: [
      {
        title: "Modern Approaches to Preventive Medicine",
        year: 2021,
      },
      {
        title: "Chronic Disease Management in Elderly Patients",
        year: 2020,
      },
    ],
    awards: [
      {
        title: "Excellence in Patient Care Award",
        year: 2022,
      },
      {
        title: "Top Doctor in San Francisco",
        year: 2021,
      },
    ],
    patientReviews: [
      {
        name: "John D.",
        rating: 5,
        comment: "Excellent doctor, very thorough and caring",
        date: "2023-10-15",
      },
      {
        name: "Sarah M.",
        rating: 4,
        comment: "Great experience, highly recommended",
        date: "2023-10-10",
      },
    ],
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-[#1e3a8a] mb-6 hover:underline"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Doctors
        </button>

        {/* Doctor Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-64 h-64 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={doctor.image || "/placeholder.svg"}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {doctor.name}
            </h1>
            <p className="text-gray-600 mb-2">{doctor.speciality}</p>

            <div className="flex items-center mb-4">
              <span className="font-medium mr-2">{doctor.rating}/5</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(doctor.rating)
                        ? "text-[#f59e0b] fill-[#f59e0b]"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-500">
                {doctor.experience} years
              </span>
            </div>

            <p className="text-gray-700 mb-6">{doctor.bio}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Consultation Fee</h3>
                <p className="font-medium">{doctor.consultationFee}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Next Available</h3>
                <p className="font-medium">{doctor.availability[0].day}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2">
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Education & Training
              </h2>
              <div className="space-y-4">
                {doctor.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-sm text-gray-500">{edu.type}</h3>
                    <p className="font-medium">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Specializations
              </h2>
              <div className="flex flex-wrap gap-2">
                {doctor.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Publications & Awards
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-medium mb-2">Publications</h3>
                  <ul className="space-y-2">
                    {doctor.publications.map((pub, index) => (
                      <li key={index}>
                        <p className="text-sm">
                          {pub.title}, {pub.year}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-2">Awards</h3>
                  <ul className="space-y-2">
                    {doctor.awards.map((award, index) => (
                      <li key={index}>
                        <p className="text-sm">
                          {award.title}, {award.year}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Patient Reviews
              </h2>

              <div className="space-y-4">
                {doctor.patientReviews.map((review, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 pb-4 last:border-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{review.name}</h3>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? "text-[#f59e0b] fill-[#f59e0b]"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-1">
                      {review.comment}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Certifications
              </h2>
              <ul className="space-y-2">
                {doctor.certifications.map((cert, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Availability
              </h2>

              {doctor.availability.map((avail, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <h3 className="text-sm font-medium mb-2">{avail.day}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {avail.slots.map((slot, slotIndex) => (
                      <div
                        key={slotIndex}
                        className="px-3 py-2 bg-gray-50 text-gray-800 rounded text-sm text-center border border-gray-200 hover:border-[#1e3a8a] cursor-pointer"
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={onBookAppointment}
                className="w-full mt-4 px-4 py-3 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#152a60] transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
