'use client';

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { patients } from "@/lib/data";
import { Patient } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

function getInitials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
}

export function RecentPatients() {
  // Sort patients by lastVisit date (most recent first)
  const sortedPatients = [...patients]
    .filter(patient => patient.lastVisit)
    .sort((a, b) => {
      return new Date(b.lastVisit!).getTime() - new Date(a.lastVisit!).getTime();
    })
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {sortedPatients.map((patient) => (
        <div key={patient.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{patient.name}</p>
            <p className="text-sm text-muted-foreground">
              {patient.medicalHistory && patient.medicalHistory.length > 0
                ? patient.medicalHistory.join(', ')
                : 'No conditions'}
            </p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(patient.lastVisit!), { addSuffix: true })}
          </div>
        </div>
      ))}
    </div>
  );
}