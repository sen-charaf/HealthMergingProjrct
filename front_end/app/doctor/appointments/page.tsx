"use client"

import { Calendar, ChevronLeft, ChevronRight, Clock, Filter, MoreVertical, Plus, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { getDoctorAppointments, changeAppointmentStatus } from "@/utils/appointment"

// Add interface for AppointmentItem props
interface AppointmentItemProps {
  appointmentId?: string;
  name: string;
  time: string;
  type: string;
  status: string;
  patientId: string;
  age: number;
  gender: string;
  isVirtual?: boolean;
  isNext?: boolean;
  reason?: string;
  onStatusChange?: () => void;
}

// Interface for API appointment data
interface ApiAppointment {
  _id: string;
  patient: {
    _id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender?: string;
  };
  doctor: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  status: "scheduled" | "confirmed" | "in-progress" | "completed" | "cancelled" | "no-show";
  reason?: {
    name: string;
    reasonType: string;
  };
  notes: string[];
  payment: {
    amount: number;
    status: string;
  };
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<ApiAppointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<ApiAppointment[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch All Appointments
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getDoctorAppointments();
        setAppointments(data);
        setFilteredAppointments(data);
        console.log("Fetched appointments:", data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter appointments based on status and search term
  useEffect(() => {
    let filtered = appointments;

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter(apt => apt.status === selectedStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(apt =>
        `${apt.patient.firstName} ${apt.patient.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        apt.patient._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by active tab
    if (activeTab !== "all") {
      filtered = filtered.filter(apt => apt.status === activeTab);
    }

    setFilteredAppointments(filtered);
  }, [appointments, selectedStatus, searchTerm, activeTab]);

  // Helper function to format appointment date
  const formatAppointmentDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString();
    }
  };

  // Helper function to calculate age
  const calculateAge = (dateOfBirth: string) => {
    const birth = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  // Helper function to get count by status
  const getStatusCount = (status: string) => {
    return appointments.filter(apt => apt.status === status).length;
  };

  // Handle status change callback
  const handleStatusChange = () => {
    // Refetch appointments after status change
    const fetchData = async () => {
      try {
        const data = await getDoctorAppointments();
        setAppointments(data);
        setFilteredAppointments(data);
      } catch (error) {
        console.error("Error refetching appointments:", error);
      }
    }
    fetchData();
  };

  // Group appointments by date
  const groupAppointmentsByDate = (appointments: ApiAppointment[]) => {
    const grouped = appointments.reduce((acc, apt) => {
      const dateKey = formatAppointmentDate(apt.date);
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(apt);
      return acc;
    }, {} as Record<string, ApiAppointment[]>);

    // Sort appointments within each date by start time
    Object.keys(grouped).forEach(date => {
      grouped[date].sort((a, b) => a.startTime.localeCompare(b.startTime));
    });

    return grouped;
  };

  const groupedAppointments = groupAppointmentsByDate(filteredAppointments);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">Appointments</h1>
          <p className="text-gray-500">Manage your patient appointments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Calendar View</span>
          </Button>
          <Button className="bg-blue-700 hover:bg-blue-800 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>New Appointment</span>
          </Button>
        </div>
      </header>

      <div className="p-4 md:p-6">
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search patients..."
                    className="pl-9 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-9">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="font-medium">May 23, 2025</div>
                  <Button variant="outline" size="sm" className="h-9">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Appointments</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="no-show">No Show</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All ({appointments.length})</TabsTrigger>
            <TabsTrigger value="scheduled">
              Scheduled ({getStatusCount("scheduled")})
            </TabsTrigger>
            <TabsTrigger value="confirmed">
              Confirmed ({getStatusCount("confirmed")})
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress ({getStatusCount("in-progress")})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({getStatusCount("completed")})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({getStatusCount("cancelled")})
            </TabsTrigger>
            <TabsTrigger value="no-show">
              No Show ({getStatusCount("no-show")})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {loading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-gray-500">Loading appointments...</div>
                </CardContent>
              </Card>
            ) : filteredAppointments.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-gray-500">
                    {searchTerm ? "No appointments found matching your search." : "No appointments found."}
                  </div>
                </CardContent>
              </Card>
            ) : (
              Object.keys(groupedAppointments).map((date) => (
                <Card key={date} className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle>{date === "Today" ? "Today's Appointments" : `${date} Appointments`}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {groupedAppointments[date].map((appointment, idx) => (
                        <AppointmentItem
                          key={appointment._id}
                          appointmentId={appointment._id}
                          name={`${appointment.patient.firstName} ${appointment.patient.lastName}`}
                          time={`${appointment.startTime} - ${appointment.endTime}`}
                          type={appointment.reason?.name || appointment.reason?.reasonType || 'General Consultation'}
                          status={appointment.status}
                          patientId={appointment.patient._id}
                          age={calculateAge(appointment.patient.dateOfBirth)}
                          gender={appointment.patient.gender || 'Not specified'}
                          isVirtual={appointment.reason?.reasonType === 'virtual'}
                          isNext={idx === 0 && date === "Today" && (appointment.status === "confirmed" || appointment.status === "in-progress")}
                          reason={appointment.notes && appointment.notes.length > 0 ? appointment.notes[0] : ''}
                          onStatusChange={handleStatusChange}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function AppointmentItem({
  appointmentId,
  name,
  time,
  type,
  status,
  patientId,
  age,
  gender,
  isVirtual = false,
  isNext = false,
  reason = "",
  onStatusChange,
}: AppointmentItemProps) {
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Scheduled</Badge>
      case "confirmed":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Confirmed</Badge>
      case "in-progress":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">In Progress</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Cancelled</Badge>
      case "no-show":
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">No Show</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">{status}</Badge>
    }
  }

  const handleConfirmAppointment = async () => {
    try {
      const res = await changeAppointmentStatus(appointmentId, { status: "confirmed" });
      console.log("Appointment confirmed:", res);
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error) {
      console.error("Error confirming appointment:", error);
    }
  }

  const handleStartAppointment = async () => {
    try {
      const res = await changeAppointmentStatus(appointmentId, { status: "in-progress" });
      console.log("Appointment started:", res);
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error) {
      console.error("Error starting appointment:", error);
    }
  }

  const handleCompleteAppointment = async () => {
    try {
      const res = await changeAppointmentStatus(appointmentId, { status: "completed" });
      console.log("Appointment completed:", res);
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error) {
      console.error("Error completing appointment:", error);
    }
  }

  const handleCancelAppointment = async () => {
    try {
      const res = await changeAppointmentStatus(appointmentId, { status: "cancelled" });
      console.log("Appointment cancelled:", res);
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  }

  const renderActionButtons = () => {
    switch (status) {
      case "scheduled":
        return (
          <>
            <Button
              size="sm"
              className="bg-green-700 hover:bg-green-800"
              onClick={handleConfirmAppointment}
            >
              Confirm
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={handleCancelAppointment}>
                  Cancel Appointment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );

      case "confirmed":
        return (
          <>
            <Button
              size="sm"
              className={isVirtual ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-700 hover:bg-blue-800"}
              onClick={handleStartAppointment}
            >
              {isVirtual ? "Join Virtual" : "Start"}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={handleCancelAppointment}>
                  Cancel Appointment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );

      case "in-progress":
        return (
          <>
            <Button
              size="sm"
              className="bg-green-700 hover:bg-green-800"
              onClick={handleCompleteAppointment}
            >
              Complete
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Add Notes</DropdownMenuItem>
                <DropdownMenuItem>Send Message</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );

      case "completed":
      case "cancelled":
      case "no-show":
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Report</DropdownMenuItem>
              <DropdownMenuItem>Download Invoice</DropdownMenuItem>
              {status === "cancelled" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Reschedule</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-4 flex-1">
        <Avatar className="h-12 w-12 border">
          <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
          <AvatarFallback className="bg-blue-100 text-blue-700">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold">{name}</h3>
            {getStatusBadge(status)}
            {isNext && (
              <Badge variant="outline" className="border-green-500 text-green-700">
                Next Patient
              </Badge>
            )}
            {isVirtual && (
              <Badge variant="outline" className="border-purple-500 text-purple-700">
                Virtual
              </Badge>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 text-sm text-gray-500 mt-1">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{time}</span>
            </div>
            <div>{type}</div>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
            <span>ID: {patientId.slice(-8)}</span>
            <span>{age} years</span>
            <span>{gender}</span>
            {reason && <span className="text-orange-600">Note: {reason}</span>}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end md:self-center mt-2 md:mt-0">
        <Button variant="outline" size="sm">
          View Details
        </Button>
        {renderActionButtons()}
      </div>
    </div>
  )
}