"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import api from "@/api/api";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && isResendDisabled) {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, isResendDisabled]);

  const resendVerificationHandler = async () => {
    try {
      setIsResendDisabled(true);
      setCountdown(30);
      
      const response = await api.post("/auth/resend_verification", { email });
      // You can add success notification here if needed
    } catch (error) {
      // Handle error
      console.error("Failed to resend verification email:", error);
      // You can add error notification here if needed
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 flex flex-col items-center">
        <Card className="max-w-md w-full p-8 shadow-lg border-0">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-blue-900 mb-2">
              Check Your Email
            </h1>
            <p className="text-gray-600 mb-6">
              We've sent a verification link to{" "}
              <span className="font-medium">{email}</span>. Please check your
              inbox and click the link to verify your account.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6 w-full">
              <p className="text-sm text-blue-800">
                If you don't see the email in your inbox, please check your spam
                folder or request a new verification link.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Button 
                className="bg-blue-900 hover:bg-blue-800 text-white w-full"
                onClick={resendVerificationHandler}
                disabled={isResendDisabled}
              >
                {isResendDisabled 
                  ? `Resend Available in ${countdown}s` 
                  : "Resend Verification Email"}
              </Button>
              <Button
                variant="outline"
                className="border-blue-900 text-blue-900 hover:bg-blue-50 w-full"
                asChild
              >
                <Link href="/login">Back to Sign In</Link>
              </Button>
            </div>
          </div>
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
  );
}
