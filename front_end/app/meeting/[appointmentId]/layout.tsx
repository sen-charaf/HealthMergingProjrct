import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video Consultation | Healthcare',
  description: 'Join your scheduled video consultation with your healthcare provider',
};

export default function MeetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}