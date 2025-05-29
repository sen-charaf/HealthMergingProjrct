'use client';

import { appointments, doctors, patients } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export function UpcomingAppointments() {
  // Filter appointments for today and sort by time
  const today = new Date().toISOString().split('T')[0];
  const todaysAppointments = appointments
    .filter(appointment => appointment.date === today)
    .slice(0, 5);

  // Get patient and doctor details for each appointment
  const appointmentsWithDetails = todaysAppointments.map(appointment => {
    const patient = patients.find(p => p.id === appointment.patientId);
    const doctor = doctors.find(d => d.id === appointment.doctorId);
    
    return {
      ...appointment,
      patientName: patient?.name || 'Unknown Patient',
      doctorName: doctor?.name || 'Unknown Doctor',
    };
  });

  return (
    <div className="space-y-4">
      {appointmentsWithDetails.length > 0 ? (
        appointmentsWithDetails.map((appointment) => (
          <div key={appointment.id} className="flex items-center justify-between space-x-4 rounded-md border p-3">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{appointment.patientName}</p>
              <p className="text-sm text-muted-foreground">{appointment.doctorName}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <p className="text-sm">{appointment.startTime}</p>
                <Badge
                  variant="outline"
                  className={
                    appointment.type === 'emergency' ? 'ml-2 border-red-500 text-red-500' :
                    appointment.type === 'procedure' ? 'ml-2 border-orange-500 text-orange-500' :
                    'ml-2'
                  }
                >
                  {appointment.type}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {appointment.status}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-6">
          <p className="text-muted-foreground">No appointments scheduled for today</p>
        </div>
      )}
    </div>
  );
}