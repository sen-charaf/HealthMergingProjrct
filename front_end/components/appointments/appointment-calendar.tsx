'use client';

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  format, 
  isSameDay,
  startOfToday,
  addDays,
  parseISO
} from "date-fns";
import { appointments, doctors, patients } from "@/lib/data";
import { Appointment } from "@/lib/types";
import { 
  User, 
  Calendar as CalendarIcon,
  Clock,
  ArrowRight,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function AppointmentCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Get appointments for the selected date
  const appointmentsForDate = appointments.filter(appointment => 
    isSameDay(parseISO(appointment.date), selectedDate)
  );

  // Sort appointments by start time
  const sortedAppointments = [...appointmentsForDate].sort((a, b) => 
    a.startTime.localeCompare(b.startTime)
  );

  // Get patient and doctor details for each appointment
  const appointmentsWithDetails = sortedAppointments.map(appointment => {
    const patient = patients.find(p => p.id === appointment.patientId);
    const doctor = doctors.find(d => d.id === appointment.doctorId);
    
    return {
      ...appointment,
      patientName: patient?.name || 'Unknown Patient',
      doctorName: doctor?.name || 'Unknown Doctor',
    };
  });

  // Get the number of appointments for each day to show on the calendar
  const getAppointmentCountForDate = (date: Date) => {
    return appointments.filter(appointment => 
      isSameDay(parseISO(appointment.date), date)
    ).length;
  };

  // Custom calendar day render to show appointment counts
  const renderCalendarDay = (day: Date) => {
    const appointmentCount = getAppointmentCountForDate(day);
    return (
      <div className="relative">
        <div>{format(day, "d")}</div>
        {appointmentCount > 0 && (
          <Badge 
            variant="secondary" 
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs px-1 min-w-5 text-center"
          >
            {appointmentCount}
          </Badge>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardContent className="p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => setSelectedDate(date || new Date())}
            className="rounded-md border p-3"
            renderDay={renderCalendarDay}
          />
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardContent className="p-0">
          <div className="p-4 border-b bg-muted/50">
            <h3 className="font-medium text-lg">
              Appointments for {format(selectedDate, "MMMM d, yyyy")}
            </h3>
          </div>

          <div className="divide-y max-h-[500px] overflow-y-auto">
            {appointmentsWithDetails.length > 0 ? (
              appointmentsWithDetails.map((appointment) => (
                <div key={appointment.id} className="p-4 hover:bg-muted/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <Badge className={
                          appointment.type === 'emergency' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                          appointment.type === 'procedure' ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' :
                          appointment.type === 'consultation' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                          'bg-green-100 text-green-800 hover:bg-green-200'
                        }>
                          {appointment.type}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className="ml-2"
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                      <h4 className="font-medium mt-2">{appointment.patientName}</h4>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Cancel Appointment</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="text-sm mt-2 space-y-1">
                    <div className="flex items-center text-muted-foreground">
                      <User className="h-3.5 w-3.5 mr-2" />
                      <span>Dr. {appointment.doctorName.split(' ')[1]}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-2" />
                      <span>{appointment.startTime}</span>
                      <ArrowRight className="h-3 w-3 mx-1" />
                      <span>{appointment.endTime}</span>
                    </div>
                  </div>
                  
                  {appointment.notes && (
                    <div className="mt-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded-md">
                      {appointment.notes}
                    </div>
                  )}
                  
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      Check In
                    </Button>
                    <Link href={`/appointments/${appointment.id}`}>
                      <Button size="sm" variant="secondary" className="h-7 text-xs">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
                <h3 className="font-medium mb-1">No Appointments</h3>
                <p className="text-sm mb-4">There are no appointments scheduled for this day.</p>
                <Link href="/appointments/schedule">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Appointment
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}