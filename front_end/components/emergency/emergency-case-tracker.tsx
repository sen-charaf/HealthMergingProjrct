'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { emergencyCases, doctors } from "@/lib/data";
import { EmergencyCase } from "@/lib/types";
import { 
  AlertTriangle, 
  Clock, 
  MoreHorizontal, 
  ChevronRight,
  ArrowRight,
  User,
  Heart,
  Search,
  Stethoscope,
  Building
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function EmergencyCaseTracker() {
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  // Filter emergency cases
  const filteredCases = emergencyCases.filter((emergencyCase) => {
    const matchesSearch =
      emergencyCase.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emergencyCase.condition.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity = severityFilter === "all" || emergencyCase.severity === severityFilter;
    const matchesStatus = statusFilter === "all" || emergencyCase.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  // Sort cases by severity (critical first) and then by arrival time
  const sortedCases = [...filteredCases].sort((a, b) => {
    const severityOrder = { critical: 0, severe: 1, moderate: 2, minor: 3 };
    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
      return severityOrder[a.severity] - severityOrder[b.severity];
    }
    return new Date(a.arrivalTime).getTime() - new Date(b.arrivalTime).getTime();
  });

  // Get severity badge color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300";
      case "severe":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300";
      case "moderate":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "minor":
        return "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "";
    }
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300";
      case "in-treatment":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300";
      case "stabilized":
        return "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300";
      case "transferred":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300";
      case "discharged":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-300";
      default:
        return "";
    }
  };

  // Get doctor name by ID
  const getDoctorName = (doctorId?: string) => {
    if (!doctorId) return "Unassigned";
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : "Unknown Doctor";
  };

  // Get treatment progress based on status
  const getTreatmentProgress = (status: string): number => {
    switch (status) {
      case "waiting":
        return 0;
      case "in-treatment":
        return 50;
      case "stabilized":
        return 75;
      case "transferred":
      case "discharged":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search cases..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select 
            defaultValue="all" 
            onValueChange={(value) => setSeverityFilter(value)}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="severe">Severe</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="minor">Minor</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            defaultValue="all" 
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="waiting">Waiting</SelectItem>
              <SelectItem value="in-treatment">In Treatment</SelectItem>
              <SelectItem value="stabilized">Stabilized</SelectItem>
              <SelectItem value="transferred">Transferred</SelectItem>
              <SelectItem value="discharged">Discharged</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        {sortedCases.map((emergencyCase) => (
          <Card 
            key={emergencyCase.id} 
            className={`border ${
              emergencyCase.severity === 'critical' 
                ? 'border-red-200 dark:border-red-800/50' 
                : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-2">
                    {emergencyCase.severity === 'critical' && (
                      <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 mr-1.5" />
                    )}
                    <Badge className={getSeverityColor(emergencyCase.severity)}>
                      {emergencyCase.severity}
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className={`ml-2 ${getStatusColor(emergencyCase.status)}`}
                    >
                      {emergencyCase.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground ml-3 flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {formatDistanceToNow(new Date(emergencyCase.arrivalTime), { addSuffix: true })}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium">{emergencyCase.patientName}</h3>
                    <ChevronRight 
                      className={`h-5 w-5 text-muted-foreground ml-1 transition-transform ${
                        expandedCase === emergencyCase.id ? 'rotate-90' : ''
                      }`}
                      onClick={() => setExpandedCase(
                        expandedCase === emergencyCase.id ? null : emergencyCase.id
                      )}
                    />
                  </div>
                  
                  <p className="text-muted-foreground mt-1">{emergencyCase.condition}</p>
                </div>
                
                <div className="flex">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 mr-2">
                          Assign
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Assign doctor and resources</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                      <DropdownMenuItem>Record Vitals</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Transfer Patient</DropdownMenuItem>
                      <DropdownMenuItem>Discharge Patient</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="text-xs text-muted-foreground mb-1">Treatment Progress</div>
                <Progress value={getTreatmentProgress(emergencyCase.status)} className="h-2" />
              </div>
              
              {expandedCase === emergencyCase.id && (
                <div className="mt-4 bg-muted/30 p-3 rounded-md space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-muted-foreground mr-2" />
                      <div>
                        <div className="text-xs text-muted-foreground">Patient ID</div>
                        <div className="text-sm">{emergencyCase.patientId || "Unregistered"}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Stethoscope className="h-4 w-4 text-muted-foreground mr-2" />
                      <div>
                        <div className="text-xs text-muted-foreground">Assigned Doctor</div>
                        <div className="text-sm">{getDoctorName(emergencyCase.assignedDoctor)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Building className="h-4 w-4 text-muted-foreground mr-2" />
                      <div>
                        <div className="text-xs text-muted-foreground">Room</div>
                        <div className="text-sm">{emergencyCase.assignedRoom || "Not assigned"}</div>
                      </div>
                    </div>
                  </div>
                  
                  {emergencyCase.vitalSigns && (
                    <div className="border-t pt-3 mt-3">
                      <div className="text-sm font-medium mb-2">Vital Signs</div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {emergencyCase.vitalSigns.bloodPressure && (
                          <div>
                            <div className="text-xs text-muted-foreground">Blood Pressure</div>
                            <div className="text-sm flex items-center">
                              <Heart className="h-3 w-3 text-red-500 mr-1" />
                              {emergencyCase.vitalSigns.bloodPressure}
                            </div>
                          </div>
                        )}
                        
                        {emergencyCase.vitalSigns.heartRate && (
                          <div>
                            <div className="text-xs text-muted-foreground">Heart Rate</div>
                            <div className="text-sm">{emergencyCase.vitalSigns.heartRate} bpm</div>
                          </div>
                        )}
                        
                        {emergencyCase.vitalSigns.respiratoryRate && (
                          <div>
                            <div className="text-xs text-muted-foreground">Respiratory Rate</div>
                            <div className="text-sm">{emergencyCase.vitalSigns.respiratoryRate} br/min</div>
                          </div>
                        )}
                        
                        {emergencyCase.vitalSigns.temperature && (
                          <div>
                            <div className="text-xs text-muted-foreground">Temperature</div>
                            <div className="text-sm">{emergencyCase.vitalSigns.temperature}°C</div>
                          </div>
                        )}
                        
                        {emergencyCase.vitalSigns.oxygenSaturation && (
                          <div>
                            <div className="text-xs text-muted-foreground">SpO2</div>
                            <div className="text-sm">{emergencyCase.vitalSigns.oxygenSaturation}%</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {emergencyCase.treatmentNotes && (
                    <div className="border-t pt-3">
                      <div className="text-sm font-medium mb-1">Treatment Notes</div>
                      <div className="text-sm">{emergencyCase.treatmentNotes}</div>
                    </div>
                  )}
                  
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button variant="outline" size="sm">Update Status</Button>
                    <Button size="sm">View Full Details</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}