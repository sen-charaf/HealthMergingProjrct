'use client';

import { Badge } from "@/components/ui/badge";
import { emergencyCases } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { Clock, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function EmergencyTracker() {
  const criticalCount = emergencyCases.filter(c => c.severity === 'critical').length;
  const severeCount = emergencyCases.filter(c => c.severity === 'severe').length;
  const moderateCount = emergencyCases.filter(c => c.severity === 'moderate').length;
  const minorCount = emergencyCases.filter(c => c.severity === 'minor').length;
  
  // Sort cases by severity (critical first) and then by arrival time
  const sortedCases = [...emergencyCases]
    .sort((a, b) => {
      const severityOrder = { critical: 0, severe: 1, moderate: 2, minor: 3 };
      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[a.severity] - severityOrder[b.severity];
      }
      return new Date(a.arrivalTime).getTime() - new Date(b.arrivalTime).getTime();
    })
    .slice(0, 3);  // Show only top 3 cases

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-red-500">{criticalCount}</span>
            <span className="text-xs text-muted-foreground">Critical</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-orange-500">{severeCount}</span>
            <span className="text-xs text-muted-foreground">Severe</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-yellow-500">{moderateCount}</span>
            <span className="text-xs text-muted-foreground">Moderate</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-green-500">{minorCount}</span>
            <span className="text-xs text-muted-foreground">Minor</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {sortedCases.map((emergency) => (
          <div key={emergency.id} className="rounded-md border p-2">
            <div className="flex justify-between items-start mb-1">
              <div className="font-medium text-sm">{emergency.patientName}</div>
              <Badge
                variant="outline"
                className={
                  emergency.severity === 'critical' ? 'border-red-500 text-red-500' :
                  emergency.severity === 'severe' ? 'border-orange-500 text-orange-500' :
                  emergency.severity === 'moderate' ? 'border-yellow-500 text-yellow-500' :
                  'border-green-500 text-green-500'
                }
              >
                {emergency.severity}
              </Badge>
            </div>
            
            <div className="text-xs text-muted-foreground mb-1">{emergency.condition}</div>
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>
                  {formatDistanceToNow(new Date(emergency.arrivalTime), { addSuffix: true })}
                </span>
              </div>
              <div>
                {emergency.status === 'waiting' ? (
                  <Badge variant="secondary\" className="text-xs">Waiting</Badge>
                ) : (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">In Treatment</Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <div className="text-xs text-muted-foreground mb-1 flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1 text-orange-500" />
          <span>ER Capacity Status</span>
        </div>
        <Progress className="h-2" value={75} />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>75% occupied</span>
          <span>5 beds available</span>
        </div>
      </div>
    </div>
  );
}