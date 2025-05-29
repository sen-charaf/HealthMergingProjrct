'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Stethoscope, 
  CalendarCheck, 
  Building, 
  AlertTriangle, 
  Clock 
} from "lucide-react";
import { statistics } from "@/lib/data";

export function StatisticsCards() {
  const { patientsCount, doctorsCount, appointmentsToday, roomsAvailable, emergencyCases, averageWaitTime } = statistics;

  const items = [
    {
      title: "Total Patients",
      value: patientsCount,
      icon: Users,
      description: "Active patients in system",
      change: "+5.2%",
      trend: "up",
    },
    {
      title: "Doctors",
      value: doctorsCount,
      icon: Stethoscope,
      description: "Available healthcare providers",
      change: "+1.1%",
      trend: "up",
    },
    {
      title: "Today's Appointments",
      value: appointmentsToday,
      icon: CalendarCheck,
      description: "Scheduled for today",
      change: "+12.3%",
      trend: "up",
    },
    {
      title: "Available Rooms",
      value: roomsAvailable,
      icon: Building,
      description: "Ready for occupation",
      change: "-3.5%",
      trend: "down",
    },
    {
      title: "Emergency Cases",
      value: emergencyCases,
      icon: AlertTriangle,
      description: "Current emergency patients",
      change: "+2.5%",
      trend: "up",
    },
    {
      title: "Avg. Wait Time",
      value: `${averageWaitTime} min`,
      icon: Clock,
      description: "For non-emergency patients",
      change: "-8.1%",
      trend: "down",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {item.title}
            </CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">{item.description}</p>
            <div className={`mt-2 text-xs ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {item.change} from last month
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}