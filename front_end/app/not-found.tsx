"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Heart, Search, Home } from "lucide-react"

export default function NotFoundPage() {
  const router = useRouter()

  const handleGoHome = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4 flex flex-col items-center">
      <div className="container max-w-6xl">
        <div className="flex items-center mb-8">
          <Heart className="h-8 w-8 text-[#1e3a8a] mr-2" fill="#1e3a8a" strokeWidth={1} />
          <h1 className="text-2xl font-bold text-[#1e3a8a]">HealthCare</h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto">
        <Card className="w-full border-0 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#1e3a8a] to-[#2d4eaa] pb-6 pt-8 text-white text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/10 p-4 rounded-full">
                <Search className="h-12 w-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Page Not Found</CardTitle>
            <CardDescription className="text-gray-100 mt-2">
              We couldn't find the page you were looking for
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-8 px-6 text-center">
            <p className="text-gray-600 mb-8">
              The page you are trying to access might have been removed, had its name changed, 
              or is temporarily unavailable.
            </p>

            <Button onClick={handleGoHome} className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white transition-colors">
              <Home className="h-4 w-4 mr-2" />
              Go to Homepage
            </Button>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Need help? Contact our support team at support@healthcare.com</p>
        </div>
      </div>
    </div>
  )
}