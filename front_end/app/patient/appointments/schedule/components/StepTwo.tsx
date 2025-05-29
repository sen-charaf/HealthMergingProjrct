"use client"

import { Check } from "lucide-react"
import { Reason } from "../types"

interface StepTwoProps {
  selectedReasons: Reason[]
  recommendedDoctorTypes: any[] // You can define a proper type for this
  selectedDoctorType: string | null
  setSelectedDoctorType: (id: string) => void
  specialities: Array<{
    _id: string
    name: string
    description: string
    icon: string
    matchedConditionsCount: number
    totalConditionsCount: number
  }>,
  setSelectedDoctorSpeciality: any,
  allSpecialities: any[]
}

export default function StepTwo({
  selectedReasons,
  recommendedDoctorTypes,
  selectedDoctorType,
  setSelectedDoctorType,
  setSelectedDoctorSpeciality,
  specialities,
  allSpecialities
}: StepTwoProps) {
  // Determine which data to display - prioritize API-sourced specialties
  const displayData = specialities.length > 0 ? specialities : recommendedDoctorTypes

  // console.log("specialities: ", specialities);
  // console.log("selectedReasons: ", selectedReasons);

  // Filter out specialities that are already displayed in the recommended section
  const filteredOtherSpecialities = allSpecialities.filter(specialty => {
    // Check if this specialty is not already in the displayData
    return !displayData.some(item => 
      (item._id && specialty._id && item._id === specialty._id) || 
      (item.id && specialty.id && item.id === specialty.id)
    );
  });

  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium text-gray-800 mb-2">Select Doctor Type</h2>
      <p className="text-gray-600 mb-6">Choose the type of doctor that best fits your needs</p>

      {selectedReasons.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Based on your selected reasons:</h3>
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
        {displayData.map((item) => (
          <button
            key={item._id || item.id}
            onClick={() => (
              setSelectedDoctorType(item._id || item.id),
              setSelectedDoctorSpeciality(item || item)
            )}
            className={`w-full text-left border rounded-lg p-6 transition-all ${selectedDoctorType === (item._id || item.id)
              ? "border-[#1e3a8a] bg-[#eef2ff] ring-2 ring-[#1e3a8a]"
              : "border-gray-200 hover:border-[#1e3a8a]"
              } cursor-pointer`}
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
                  {/* You might want to convert icon string to actual icon component */}
                  <span className="text-white text-sm">{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{item.name || item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
              {selectedDoctorType === (item._id || item.id) && (
                <div className="bg-[#1e3a8a] text-white rounded-full p-1 h-6 w-6 flex items-center justify-center">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>

            {/* Show match indicator if there are selected reasons */}
            {selectedReasons.length > 0 && item.matchedConditionsCount !== undefined && (
              <div className="mt-3 flex items-center">
                <div className="bg-[#e6f7f2] text-[#0d9488] text-xs font-medium px-2 py-1 rounded-full">
                  Recommended for {item.matchedConditionsCount} of your {item.totalConditionsCount} conditions
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Display all other specialities */}
      {filteredOtherSpecialities.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Other Specialities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOtherSpecialities.map((speciality) => (
              <button
                key={speciality._id || speciality.id}
                onClick={() => (
                  setSelectedDoctorType(speciality._id || speciality.id),
                  setSelectedDoctorSpeciality(speciality || speciality)
                )}
                className={`w-full text-left border rounded-lg p-6 transition-all ${
                  selectedDoctorType === (speciality._id || speciality.id)
                    ? "border-[#1e3a8a] bg-[#eef2ff] ring-2 ring-[#1e3a8a]"
                    : "border-gray-200 hover:border-[#1e3a8a]"
                } cursor-pointer`}
              >
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 text-sm">{speciality.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{speciality.name || speciality.title}</h4>
                      <p className="text-gray-600 text-sm">{speciality.description}</p>
                    </div>
                  </div>
                  {selectedDoctorType === (speciality._id || speciality.id) && (
                    <div className="bg-[#1e3a8a] text-white rounded-full p-1 h-6 w-6 flex items-center justify-center">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}