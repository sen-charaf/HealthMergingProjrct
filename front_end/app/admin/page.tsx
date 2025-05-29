import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/dashboard/overview";
import { RecentPatients } from "@/components/dashboard/recent-patients";
import { EmergencyTracker } from "@/components/dashboard/emergency-tracker";
import { UpcomingAppointments } from "@/components/dashboard/upcoming-appointments";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { StatisticsCards } from "@/components/dashboard/statistics-cards";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex space-x-2">
          <Link href="/patients/register">
            <Button className="h-9">
              <PlusCircle className="mr-1 h-4 w-4" />
              Add Patient
            </Button>
          </Link>
          <Link href="/appointments/schedule">
            <Button variant="outline" className="h-9">
              <PlusCircle className="mr-1 h-4 w-4" />
              New Appointment
            </Button>
          </Link>
        </div>
      </div>

      <StatisticsCards />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Hospital Overview</CardTitle>
            <CardDescription>
              Patient admissions and discharges over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Emergency Status</CardTitle>
            <CardDescription>Current emergency department status</CardDescription>
          </CardHeader>
          <CardContent>
            <EmergencyTracker />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Recent Patients</CardTitle>
              <CardDescription>Recently admitted patients</CardDescription>
            </div>
            <Link href="/patients">
              <Button variant="outline" size="sm">View all</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <RecentPatients />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Today's scheduled appointments</CardDescription>
            </div>
            <Link href="/appointments">
              <Button variant="outline" size="sm">View all</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <UpcomingAppointments />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}