"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle, Clock, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerificationSubmittedPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [submissionDate, setSubmissionDate] = useState<string | null>(null);
  
  useEffect(() => {
    // You could fetch the submission date from the backend here
    if (user?._id) {
      // Example API call to get verification details
      const fetchVerificationDetails = async () => {
        try {
          const response = await fetch(`/api/doctors/verification/${user._id}`);
          const data = await response.json();
          if (data.submittedAt) {
            setSubmissionDate(new Date(data.submittedAt).toLocaleDateString());
          }
        } catch (error) {
          console.error("Failed to fetch verification details:", error);
        }
      };
      
      fetchVerificationDetails();
    }
  }, [user]);

  const handleEditVerification = () => {
    router.push("/doctor/verification");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-2xl mx-auto border-0 shadow-sm">
        <CardHeader className="bg-[#f8fafc] border-b pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-50 p-3 rounded-full">
              <Clock className="h-8 w-8 text-blue-900" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl text-[#1e3a8a]">
            Verification Submitted
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-blue-700 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900">
                  Your verification request has been submitted
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  {submissionDate 
                    ? `Submitted on ${submissionDate}` 
                    : "Your information is being reviewed by our team."}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">What happens next?</h3>
            <ol className="space-y-3 list-decimal list-inside text-gray-700">
              <li>Our team will review your professional credentials</li>
              <li>We may contact you for additional information if needed</li>
              <li>Once approved, you'll gain full access to the doctor portal</li>
              <li>You'll receive an email notification about your verification status</li>
            </ol>
          </div>

          <div className="pt-4 flex justify-center">
            <Button 
              onClick={handleEditVerification}
              variant="outline" 
              className="flex items-center gap-2 border-blue-900 text-blue-900 hover:bg-blue-50"
            >
              <Edit className="h-4 w-4" />
              Edit Verification Information
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500 pt-4">
            <p>
              If you have any questions, please contact our support team at{" "}
              <a href="mailto:support@healthcare.com" className="text-blue-900 hover:underline">
                support@healthcare.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
