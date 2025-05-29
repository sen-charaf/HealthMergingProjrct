
import { Heart } from "lucide-react";

export default function Loading() {
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
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a]"></div>
          <p className="text-[#1e3a8a] font-medium">Retrieving your profile data...</p>
          <div className="flex items-center text-blue-900 mt-2">
            <Heart className="h-5 w-5 mr-2 animate-pulse" fill="#1e3a8a" strokeWidth={1} />
            <span className="text-sm">HealthCare</span>
          </div>
        </div>
      </div>
    </div>
  );
}