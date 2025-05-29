import { AppointmentManagement } from "@/components/appointments/appointment-management";

export default function AppointmentsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Appointment Management</h1>
        <p className="text-muted-foreground mt-1">Schedule and manage patient appointments</p>
      </div>

      <AppointmentManagement />
    </div>
  );
}