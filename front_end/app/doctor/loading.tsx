import { Heart } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar skeleton - we keep this static since the sidebar is already loaded via the layout */}
      <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        {/* This space is for the sidebar that's already rendered by the layout */}
      </div>

      {/* Main content skeleton */}
      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 bg-blue-100 rounded-full animate-pulse"></div>
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gray-100 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-3 w-32 bg-gray-100 rounded animate-pulse"></div>
                  </div>
                  <div className="h-8 w-24 bg-blue-100 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center items-center mt-8">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-blue-900 animate-pulse" />
              <span className="text-sm text-blue-900 font-medium">Loading content...</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}