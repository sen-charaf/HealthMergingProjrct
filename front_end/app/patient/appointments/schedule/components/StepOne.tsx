"use client"

import { Search, Circle, Square, Check, AlertCircle } from "lucide-react"
import { Reason } from "../types"

interface StepOneProps {
  selectedReasons: Reason[]
  onReasonSelect: (reason: Reason) => void
  isSelected: (id: string) => boolean,
  categories: any,
  conditions: any
}

export default function StepOne({ selectedReasons, onReasonSelect, isSelected, categories, conditions }: StepOneProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-medium text-gray-800">What&apos;s the reason for your visit?</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Selected:</span>
          <span
            className={`text-sm font-bold ${selectedReasons.length === 3 ? "text-[#f59e0b]" : "text-[#1e3a8a]"}`}
          >
            {selectedReasons.length}/3
          </span>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <p className="text-gray-600">Choose a category or search for specific symptoms</p>
        {selectedReasons.length === 3 && (
          <div className="ml-2 flex items-center text-[#f59e0b] text-sm">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>Maximum 3 reasons</span>
          </div>
        )}
      </div>

      {selectedReasons.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Selected reasons:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedReasons.map((reason) => (
              <div
                key={reason.id}
                className="flex items-center gap-2 bg-[#eef2ff] text-[#1e3a8a] px-3 py-1.5 rounded-full text-sm"
              >
                <span>{reason.title}</span>
                <button
                  onClick={() => onReasonSelect(reason)}
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

        {categories?.map((cat: any) => {
          const categoryConditions = conditions.filter(
            (condition: any) => condition.category === cat.name
          );

          return (
            <ReasonCategory
              key={cat._id}
              title={cat.name}
              icon={<Circle className="h-5 w-5 text-white" />}
              reasons={categoryConditions.map(condition => ({
                id: condition._id,
                title: condition.name,
                description: condition.description
              }))}
              onReasonSelect={onReasonSelect}
              isSelected={isSelected}
              selectedReasons={selectedReasons}
            />
          );
        })}

      </div>
    </div>
  )
}

interface ReasonCategoryProps {
  title: string
  icon: React.ReactNode
  reasons: Reason[]
  onReasonSelect: (reason: Reason) => void
  isSelected: (id: string) => boolean
  selectedReasons: Reason[]
}

function ReasonCategory({ title, icon, reasons, onReasonSelect, isSelected, selectedReasons }: ReasonCategoryProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-[#1e3a8a]">{title}</h3>
      </div>

      <div className="space-y-3">
        {/* Display Conditions data here */}
        {reasons.map((reason) => (
          <button
            key={reason.id}
            onClick={() => onReasonSelect(reason)}
            disabled={selectedReasons.length >= 3 && !isSelected(reason.id)}
            className={`w-full text-left border rounded-lg p-4 transition-all ${isSelected(reason.id)
              ? "border-[#1e3a8a] bg-[#eef2ff] ring-2 ring-[#1e3a8a]"
              : "border-gray-200 hover:border-[#1e3a8a]"
              } ${selectedReasons.length >= 3 && !isSelected(reason.id) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="flex justify-between">
              <h4 className="font-medium text-gray-800">{reason.title}</h4>
              {isSelected(reason.id) && (
                <div className="bg-[#1e3a8a] text-white rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>
            <p className="text-gray-600 text-sm">{reason.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}