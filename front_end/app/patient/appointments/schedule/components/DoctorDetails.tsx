"use client";

import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  GraduationCap,
  Languages,
  Heart,
} from "lucide-react";
import { doctors } from "../data";

interface DoctorDetailsProps {
  doctorId: string;
  onBack: () => void;
  onBookAppointment: () => void;
}

export default function DoctorDetails({
  doctorId,
  onBack,
  onBookAppointment,
}: DoctorDetailsProps) {
  // Find the doctor by ID
  const doctor = doctors.find((doc) => doc.id === doctorId);

  if (!doctor) {
    return (
      <div className="p-8 text-center">
        <div className="text-lg font-medium text-gray-800">
          Doctor not found
        </div>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#152a60] transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <button
          onClick={onBack}
          className="flex items-center text-[#1e3a8a] hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to doctors
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={doctor.image || "/placeholder.svg"}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {doctor.name}
                  </h1>
                  <p className="text-gray-600">{doctor.speciality}</p>
                </div>
                <button className="text-[#1e3a8a]">
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-4 mt-3">
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

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#eef2ff] rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-[#1e3a8a]" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Education</div>
                <div className="font-medium">{doctor.education}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#eef2ff] rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-[#1e3a8a]" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Location</div>
                <div className="font-medium">{doctor.location}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#eef2ff] rounded-lg flex items-center justify-center">
                <Languages className="h-5 w-5 text-[#1e3a8a]" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Languages</div>
                <div className="font-medium">{doctor.languages.join(", ")}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#eef2ff] rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-[#1e3a8a]" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Next Available</div>
                <div className="font-medium">
                  {doctor.availability[0].day} at{" "}
                  {doctor.availability[0].slots[0]}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-4">
            About Dr. {doctor.name.split(" ")[1]}
          </h2>
          <p className="text-gray-700 leading-relaxed">{doctor.about}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-4">
            Availability
          </h2>
          <div className="space-y-4">
            {doctor.availability.map((avail) => (
              <div key={avail.day}>
                <h3 className="font-medium text-gray-800 mb-2">{avail.day}</h3>
                <div className="flex flex-wrap gap-2">
                  {avail.slots.map((slot) => (
                    <div
                      key={slot}
                      className="px-3 py-1.5 rounded-lg text-sm bg-white border border-gray-200 text-gray-700"
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onBookAppointment}
            className="px-8 py-3 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#152a60] transition-colors"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
