"use client"
import Link from "next/link"
import { Heart, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/api/api";

export default function EmailVerifiedPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [userType, setUserType] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await api.get(`/auth/verify_email?token=${token}`);
                console.log(response.data);
               
                if (response.data && response.data.user) {
                    setUserType(response.data.user.userType);
                   localStorage.setItem('userType', response.data.user.userType);
                   localStorage.setItem('userId', response.data.user._id);
                   localStorage.setItem('token', response.data.token);
                }
            } catch (error: any) {
                console.error('Email verification failed:', error);
                setError(error.response?.data?.message || 'Email verification failed. Please try again or contact support.');
            } finally {
                setLoading(false);
            }
        })();
    }, [token]);

    const handleDashboardClick = () => {
        // Redirect based on user type, default to patient
        if (userType === 'doctor') {
            router.push('/doctor/dashboard');
        } else {
            router.push('/patient/dashboard');
        }
    };

    const handleAppointmentClick = () => {
        // Redirect based on user type, default to patient
        if (userType === 'doctor') {
            router.push('/doctor/appointments');
        } else {
            router.push('/patient/appointments/schedule');
        }
    };

  return (
    <div className="h-screen bg-white overflow-hidden flex flex-col">
     
      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 flex flex-col items-center flex-grow">
        <Card className="max-w-md w-full p-8 shadow-lg border-0">
          {loading ? (
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
              </div>
              <h1 className="text-2xl font-bold text-blue-900 mb-2">Verifying Email...</h1>
              <p className="text-gray-600 mb-6">
                Please wait while we verify your email address.
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-red-900 mb-2">Verification Failed</h1>
              <p className="text-gray-600 mb-6">
                {error}
              </p>
              <div className="bg-red-50 p-4 rounded-lg mb-6 w-full">
                <p className="text-sm text-red-800">
                  The verification link may have expired or is invalid. Please try again or contact our support team for assistance.
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <Button 
                  className="bg-blue-900 hover:bg-blue-800 text-white w-full"
                  onClick={() => router.push('/login')}
                >
                  Return to Login
                </Button>
                <Button 
                  variant="outline" 
                  className="border-blue-900 text-blue-900 hover:bg-blue-50 w-full"
                  onClick={() => router.push('/contact-support')}
                >
                  Contact Support
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-blue-900 mb-2">Email Successfully Verified!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for verifying your email address. Your account is now active and you can access all features of
                HealthCare.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mb-6 w-full">
                <p className="text-sm text-blue-800">
                  You can now book appointments, access medical records, and connect with healthcare professionals.
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <Button 
                  className="bg-blue-900 hover:bg-blue-800 text-white w-full"
                  onClick={handleDashboardClick}
                >
                  Go to Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  className="border-blue-900 text-blue-900 hover:bg-blue-50 w-full"
                  onClick={handleAppointmentClick}
                >
                  Book an Appointment
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-8 flex items-center gap-6 justify-center">
          <div className="flex items-center gap-2 text-blue-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2 text-blue-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>Secure Data</span>
          </div>
        </div>
      </main>
    </div>
  )
}
