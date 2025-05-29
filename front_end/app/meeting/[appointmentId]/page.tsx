'use client';

import { useParams } from 'next/navigation';
import MeetingRoom from '@/components/ZoomMeeting/MeetingRoom';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export default function MeetingPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const appointmentId = params.appointmentId as string;

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Handle meeting end
  const handleMeetingEnd = () => {
    // Redirect based on user type
    if (user?.userType === 'doctor') {
      router.push('/doctor/appointments');
    } else {
      router.push('/patient/appointments');
    }
  };

  if (!appointmentId) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Invalid Meeting</h1>
        <p>No appointment ID was provided. Please check your link and try again.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Video Consultation</h1>
      <MeetingRoom 
        appointmentId={appointmentId} 
        onMeetingEnd={handleMeetingEnd} 
      />
    </div>
  );
}