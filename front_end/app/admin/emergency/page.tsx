import { EmergencyDashboard } from "@/components/emergency/emergency-dashboard";

export default function EmergencyPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Emergency Department</h1>
        <p className="text-muted-foreground mt-1">Real-time emergency case tracking and management</p>
      </div>

      <EmergencyDashboard />
    </div>
  );
}