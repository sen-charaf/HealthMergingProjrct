'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/api/api';
import { ZoomMtg } from '@zoomus/websdk';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

// Preload Zoom SDK
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

interface MeetingRoomProps {
  appointmentId: string;
  onMeetingEnd?: () => void;
}

export default function MeetingRoom({ appointmentId, onMeetingEnd }: MeetingRoomProps) {
  const { user } = useAuth();
  const [meeting, setMeeting] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Determine if user is doctor or patient to set role
  const role = user?.userType === 'doctor' ? 1 : 0; // 1 for host (doctor), 0 for attendee (patient)
  
  // Fetch meeting details
  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        const response = await api.get(`/appointments/${appointmentId}`);
        if (response.data.meetingId) {
          const meetingResponse = await api.get(`/zoom/meetings/${response.data.meetingId}`);
          setMeeting(meetingResponse.data);
        } else {
          setError('No meeting has been scheduled for this appointment');
        }
      } catch (err) {
        console.error('Error fetching meeting details:', err);
        setError('Failed to load meeting details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMeetingDetails();
  }, [appointmentId]);
  
  const getSignature = async () => {
    try {
      console.log('Getting signature for meeting:', meeting.zoomMeetingId, 'with role:', role);
      
      const response = await api.post('/zoom/signature', {
        meetingNumber: meeting.zoomMeetingId,
        role: role
      });
      
      console.log('Signature response:', response.data);
      
      if (!response.data.signature) {
        throw new Error('No signature returned from server');
      }
      
      startMeeting(response.data.signature);
    } catch (err) {
      console.error('Error getting signature:', err);
      setError('Failed to authenticate with Zoom - please check your connection and try again');
      setJoining(false);
    }
  };
  
  function startMeeting(signature: string) {
      // Ensure the zmmtg-root element exists
      let zoomRoot = document.getElementById('zmmtg-root');
      if (!zoomRoot) {
        console.log('Creating zmmtg-root element');
        zoomRoot = document.createElement('div');
        zoomRoot.id = 'zmmtg-root';
        document.body.appendChild(zoomRoot);
      }
      
      zoomRoot.style.display = 'block';
      zoomRoot.style.position = 'fixed';
      zoomRoot.style.top = '0';
      zoomRoot.style.left = '0';
      zoomRoot.style.width = '100%';
      zoomRoot.style.height = '100%';
      zoomRoot.style.zIndex = '9999';
  
      const userName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'User';
      
      console.log('Starting meeting with signature:', signature.substring(0, 10) + '...');
      console.log('Meeting details:', {
        meetingNumber: meeting.zoomMeetingId,
        userName,
        sdkKey: process.env.NEXT_PUBLIC_ZOOM_API_KEY?.substring(0, 5) + '...'
      });
      
      // Set the Zoom JS lib path
      ZoomMtg.setZoomJSLib('https://source.zoom.us/2.13.0/lib', '/av');
      
      // Add a timeout to detect if joining is taking too long
      const joinTimeout = setTimeout(() => {
        console.error('Join meeting timeout - taking too long to connect');
        setError('Connection timeout. Please try again.');
        setJoining(false);
      }, 30000); // 30 seconds timeout
      
      ZoomMtg.init({
        leaveUrl: window.location.origin,
        isSupportAV: true,
        success: () => {
          console.log('Zoom SDK initialized successfully');
          
          ZoomMtg.join({
            signature: signature,
            sdkKey: process.env.NEXT_PUBLIC_ZOOM_API_KEY,
            meetingNumber: meeting.zoomMeetingId,
            passWord: meeting.password,
            userName: userName,
            userEmail: user?.email || 'user@example.com',
            success: () => {
              console.log('Joined Zoom meeting successfully');
              clearTimeout(joinTimeout);
              setJoining(false);
              
              // Update meeting status if doctor (host)
              if (role === 1) {
                api.put(`/zoom/meetings/${meeting._id}/status`, { status: 'started' })
                  .catch(err => console.error('Failed to update meeting status:', err));
              }
            },
            error: (error: any) => {
              clearTimeout(joinTimeout);
              console.error('Failed to join Zoom meeting:', error);
              setError(`Failed to join meeting: ${error.errorMessage || 'Unknown error'}`);
              setJoining(false);
              
              // Clean up the Zoom interface
              zoomRoot.style.display = 'none';
            },
          });
        },
        error: (error: any) => {
          clearTimeout(joinTimeout);
          console.error('Failed to initialize Zoom:', error);
          setError(`Failed to initialize Zoom: ${error.errorMessage || 'Unknown error'}`);
          setJoining(false);
          
          // Clean up the Zoom interface
          zoomRoot.style.display = 'none';
        },
      });
    }
  
  const joinMeeting = () => {
    console.log("Join button clicked");
    if (!meeting) return;
    
    setJoining(true);
    setError(null);
    
    // Get signature and start meeting
    getSignature();
  };
  
  if (loading) {
    return (
      <Card className="p-6 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <p className="mt-2">Loading meeting details...</p>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card className="p-6 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </Card>
    );
  }
  
  if (!meeting) {
    return (
      <Card className="p-6 text-center">
        <p>No meeting found for this appointment.</p>
      </Card>
    );
  }
  
  return (
    <div className="zoom-meeting-container">
      <Card className="p-6 mb-4">
        <h2 className="text-xl font-bold mb-2">{meeting.topic}</h2>
        <p className="mb-4">
          <span className="font-medium">Time:</span> {new Date(meeting.startTime).toLocaleString()}
        </p>
        <Button 
          onClick={joinMeeting} 
          disabled={joining}
          className="w-full"
        >
          {joining ? 'Joining...' : 'Join Meeting'}
        </Button>
      </Card>
      
      {/* The zmmtg-root div is automatically created by Zoom SDK */}
    </div>
  );
}