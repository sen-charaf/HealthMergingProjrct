"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Plus, Video, User, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllAppointments } from "@/utils/appointment";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 5,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
    prevPage: null,
  });
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("upcoming");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5; // Reduced from 10 to 5 to show pagination more clearly

  // Fetch All Appointments with pagination
  const fetchAllAppointments = async (page = 1, status = null) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit,
        ...(status && { status })
      };
      
      const data = await getAllAppointments(params);
      if (data && data.appointments) {
        setAppointments(data.appointments);
        setPagination(data.pagination);
        console.log("data: ", data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset to page 1 when changing tabs
    setCurrentPage(1);
    
    // Determine status filter based on current tab
    let statusFilter = null;
    if (currentTab === "upcoming") {
      statusFilter = "scheduled";
    } else if (currentTab === "cancelled") {
      statusFilter = "cancelled";
    }
    // For "past" tab, we'll handle the logic differently since it's based on date/status combination
    
    fetchAllAppointments(1, statusFilter);
  }, [currentTab]);

  useEffect(() => {
    // Fetch appointments when page changes
    let statusFilter = null;
    if (currentTab === "upcoming") {
      statusFilter = "scheduled";
    } else if (currentTab === "cancelled") {
      statusFilter = "cancelled";
    }
    
    fetchAllAppointments(currentPage, statusFilter);
  }, [currentPage]);

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helper function to format time
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Helper function to get status badge
  const getStatusBadge = (status, paymentStatus) => {
    if (status === 'scheduled') {
      if (paymentStatus === 'pending') {
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending Payment</Badge>;
      }
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Scheduled</Badge>;
    }
    if (status === 'completed') {
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>;
    }
    if (status === 'cancelled') {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
    }
    return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>;
  };

  // Helper function to get appointment type/reason
  const getAppointmentTitle = (notes, reason) => {
    if (reason && reason.name) {
      return reason.name;
    }
    
    // Extract conditions from notes
    const conditionsNote = notes.find(note => note.includes('Selected conditions:'));
    if (conditionsNote) {
      const conditions = conditionsNote.replace('Selected conditions: ', '');
      return `Consultation - ${conditions}`;
    }
    
    // Check for specific conditions in notes
    if (notes.some(note => note.toLowerCase().includes('headache'))) {
      return 'Headache Consultation';
    }
    
    return 'General Consultation';
  };

  // Filter appointments by status and date (for display purposes)
  const now = new Date();
  const filterAppointmentsByTab = (appointments, tab) => {
    switch (tab) {
      case 'upcoming':
        return appointments.filter(apt => {
          const aptDate = new Date(apt.date);
          return aptDate >= now && apt.status === 'scheduled';
        });
      case 'past':
        return appointments.filter(apt => {
          const aptDate = new Date(apt.date);
          return aptDate < now || apt.status === 'completed';
        });
      case 'cancelled':
        return appointments.filter(apt => apt.status === 'cancelled');
      default:
        return appointments;
    }
  };

  const filteredAppointments = filterAppointmentsByTab(appointments, currentTab);

  // Pagination component for tab content areas
  const PaginationControls = () => {
    if (pagination.totalPages <= 1) return null;

    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(pagination.totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, pagination.totalCount)} of {pagination.totalCount} appointments
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={!pagination.hasPrevPage || loading}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {startPage > 1 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={loading}
                >
                  1
                </Button>
                {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
              </>
            )}

            {pageNumbers.map(pageNum => (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(pageNum)}
                disabled={loading}
                className={currentPage === pageNum ? "bg-blue-900 hover:bg-blue-800" : ""}
              >
                {pageNum}
              </Button>
            ))}

            {endPage < pagination.totalPages && (
              <>
                {endPage < pagination.totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(pagination.totalPages)}
                  disabled={loading}
                >
                  {pagination.totalPages}
                </Button>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={!pagination.hasNextPage || loading}
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  // Render appointment card
  const renderAppointmentCard = (appointment, showActions = true, isPast = false) => (
    <Card key={appointment._id} className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex gap-4">
          <div className={`${isPast ? 'bg-gray-100' : 'bg-blue-100'} p-3 rounded-full h-fit`}>
            {isPast ? 
              <Calendar className="h-6 w-6 text-gray-600" /> : 
              <Calendar className="h-6 w-6 text-blue-900" />
            }
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-blue-900">
                {getAppointmentTitle(appointment.notes, appointment.reason)}
              </h3>
              {getStatusBadge(appointment.status, appointment.payment.status)}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <User className="h-4 w-4" />
              <span>
                Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>
                  {formatDate(appointment.date)} • {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span className="font-medium">${appointment.payment.amount}</span>
              </div>
            </div>
            {appointment.notes.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  {appointment.notes[0]}
                </p>
              </div>
            )}
          </div>
        </div>
        {showActions && (
          <div className="flex gap-2">
            {!isPast ? (
              <>
                <Button
                  variant="outline"
                  className="border-blue-900 text-blue-900 hover:bg-blue-50"
                >
                  Reschedule
                </Button>
                <Link href={`/patient/appointments/virtual/${appointment._id}`}>
                  <Button className="bg-blue-900 hover:bg-blue-800">
                    <Video className="h-4 w-4 mr-2" /> Join Virtual
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="border-blue-900 text-blue-900 hover:bg-blue-50"
                  asChild
                >
                  <Link href={`/patient/appointments/summary/${appointment._id}`}>
                    View Summary
                  </Link>
                </Button>
                <Button className="bg-blue-900 hover:bg-blue-800">
                  Book Follow-up
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </Card>
  );

  if (loading && appointments.length === 0) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading appointments...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Appointments</h1>
          <p className="text-gray-500">Manage your healthcare appointments</p>
        </div>
        <Button className="bg-blue-900 hover:bg-blue-800" asChild>
          <Link href="/patient/appointments/schedule">
            <Plus className="h-4 w-4 mr-2" /> Schedule Appointment
          </Link>
        </Button>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-6">
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900"
          >
            Past
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900"
          >
            Cancelled
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-4">
          <div className="space-y-4">
            {loading ? (
              <Card className="p-6">
                <div className="flex justify-center items-center h-32">
                  <div className="text-gray-500">Loading...</div>
                </div>
              </Card>
            ) : filteredAppointments.length > 0 ? (
              <>
                {filteredAppointments.map(appointment => 
                  renderAppointmentCard(appointment, true, false)
                )}
                <PaginationControls />
              </>
            ) : (
              <Card className="p-6">
                <p className="text-gray-500">No upcoming appointments.</p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-4">
          <div className="space-y-4">
            {loading ? (
              <Card className="p-6">
                <div className="flex justify-center items-center h-32">
                  <div className="text-gray-500">Loading...</div>
                </div>
              </Card>
            ) : filteredAppointments.length > 0 ? (
              <>
                {filteredAppointments.map(appointment => 
                  renderAppointmentCard(appointment, true, true)
                )}
                <PaginationControls />
              </>
            ) : (
              <Card className="p-6">
                <p className="text-gray-500">No past appointments.</p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="cancelled" className="mt-4">
          <div className="space-y-4">
            {loading ? (
              <Card className="p-6">
                <div className="flex justify-center items-center h-32">
                  <div className="text-gray-500">Loading...</div>
                </div>
              </Card>
            ) : filteredAppointments.length > 0 ? (
              <>
                {filteredAppointments.map(appointment => 
                  renderAppointmentCard(appointment, false, false)
                )}
                <PaginationControls />
              </>
            ) : (
              <Card className="p-6">
                <p className="text-gray-500">No cancelled appointments.</p>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-bold text-blue-900 mb-4">
          Need to see a doctor?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border-2 border-blue-100 bg-blue-50">
            <h3 className="font-medium text-blue-900 mb-2">
              Schedule an Appointment
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Book an in-person visit with your doctor
            </p>
            <Button className="w-full bg-blue-900 hover:bg-blue-800" asChild>
              <Link href="/patient/appointments/schedule">Schedule Now</Link>
            </Button>
          </Card>

          <Card className="p-4 border-2 border-green-100 bg-green-50">
            <h3 className="font-medium text-green-800 mb-2">
              Virtual Consultation
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Connect with a doctor from home
            </p>
            <Button className="w-full bg-green-700 hover:bg-green-800">
              Start Virtual Visit
            </Button>
          </Card>

          <Card className="p-4 border-2 border-purple-100 bg-purple-50">
            <h3 className="font-medium text-purple-800 mb-2">Urgent Care</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get immediate care for urgent needs
            </p>
            <Button className="w-full bg-purple-700 hover:bg-purple-800">
              Find Urgent Care
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}