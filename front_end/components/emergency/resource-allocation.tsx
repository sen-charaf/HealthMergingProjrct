'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  AlertTriangle, 
  Thermometer, 
  Syringe,
  Stethoscope,
  Monitor,
  User,
  Clipboard,
  CheckCheck
} from "lucide-react";

export function ResourceAllocation() {
  // Mock resource data
  const staffResources = [
    { 
      title: "Emergency Physicians", 
      available: 3, 
      total: 5, 
      busy: 2,
      icon: Stethoscope
    },
    { 
      title: "Trauma Surgeons", 
      available: 1, 
      total: 2, 
      busy: 1,
      icon: User
    },
    { 
      title: "ER Nurses", 
      available: 6, 
      total: 12, 
      busy: 6,
      icon: User
    },
    { 
      title: "Anesthesiologists", 
      available: 1, 
      total: 2, 
      busy: 1,
      icon: Thermometer
    },
  ];

  const equipmentResources = [
    { 
      title: "Ventilators", 
      available: 2, 
      total: 5, 
      busy: 3,
      icon: Monitor,
      critical: true
    },
    { 
      title: "ICU Beds", 
      available: 1, 
      total: 8, 
      busy: 7,
      icon: Activity,
      critical: true
    },
    { 
      title: "Defibrillators", 
      available: 4, 
      total: 6, 
      busy: 2,
      icon: Activity
    },
    { 
      title: "Portable X-Ray", 
      available: 2, 
      total: 3, 
      busy: 1,
      icon: Clipboard
    },
    { 
      title: "Emergency Blood Units", 
      available: 15, 
      total: 20, 
      busy: 5,
      icon: Syringe
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Staff Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {staffResources.map((resource, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <resource.icon className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="font-medium">{resource.title}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{resource.available}</span>
                    <span className="text-muted-foreground"> / {resource.total} available</span>
                  </div>
                </div>
                <Progress value={(resource.busy / resource.total) * 100} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{resource.busy} in use</span>
                  <span>{Math.round((resource.available / resource.total) * 100)}% available</span>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Button variant="outline" className="w-full">
                <CheckCheck className="mr-2 h-4 w-4" />
                Manage Staff Assignments
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <Clipboard className="mr-2 h-5 w-5" />
            Equipment Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {equipmentResources.map((resource, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <resource.icon className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="font-medium">{resource.title}</span>
                    {resource.critical && resource.available <= 1 && (
                      <Badge variant="destructive" className="ml-2 text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Low
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{resource.available}</span>
                    <span className="text-muted-foreground"> / {resource.total} available</span>
                  </div>
                </div>
                <Progress 
                  value={(resource.busy / resource.total) * 100} 
                  className={`h-2 ${
                    resource.critical && resource.available <= 1 
                      ? 'bg-red-100 dark:bg-red-900/20' 
                      : ''
                  }`}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{resource.busy} in use</span>
                  <span>{Math.round((resource.available / resource.total) * 100)}% available</span>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Button variant="outline" className="w-full">
                <Clipboard className="mr-2 h-4 w-4" />
                Request Additional Resources
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}