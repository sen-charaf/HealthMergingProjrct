"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, MessageSquare, Bell, AlertCircle, Video, Search, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getDoctorAppointments } from "@/utils/appointment"
import { useEffect, useState } from "react"

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch the Doctor Appointments
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getDoctorAppointments();
        if (data) {
          console.log("data ===> ", data);
          setAppointments(data)
        }
      } catch (error) {
        console.error("Error fetching appointments:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData();
  }, []);

  // Helper function to format time
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours, 10)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()
    
    if (isToday) {
      return 'Today'
    }
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    })
  }

  // Filter today's appointments
  const todaysAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date)
    const today = new Date()
    // return appointmentDate.toDateString() === today.toDateString()
    return appointments
  })

  // Get next appointment
  const getNextAppointment = () => {
    const now = new Date()
    const upcomingAppointments = appointments
      .filter(apt => new Date(apt.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
    
    return upcomingAppointments[0]
  }

  const nextAppointment = getNextAppointment()

  // Calculate summary statistics
  const todaysCount = todaysAppointments.length
  const totalPatients = new Set(appointments.map(apt => apt.patient._id)).size
  const pendingReports = appointments.filter(apt => apt.status === 'pending').length
  const unreadMessages = appointments.reduce((total, apt) => total + (apt.messages?.text?.length || 0), 0)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Doctor Dashboard</h1>
          <p className="text-gray-500">Welcome back, Dr. Sarah Johnson</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="relative border-gray-200 text-gray-700 hover:bg-gray-100">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              5
            </span>
          </Button>
          <Button className="bg-blue-900 hover:bg-blue-800">
            <Video className="h-4 w-4 mr-2" /> Start Consultation
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
              <h3 className="text-2xl font-bold text-blue-900 mt-1">{todaysCount}</h3>
            </div>
            <div className="bg-blue-100 p-2 rounded-md">
              <Calendar className="h-6 w-6 text-blue-900" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {nextAppointment 
              ? `Next: ${nextAppointment.patient.firstName} ${nextAppointment.patient.lastName} at ${formatTime(nextAppointment.startTime)}`
              : 'No upcoming appointments'
            }
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Patients</p>
              <h3 className="text-2xl font-bold text-blue-900 mt-1">{totalPatients}</h3>
            </div>
            <div className="bg-green-100 p-2 rounded-md">
              <Users className="h-6 w-6 text-green-700" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Total registered patients</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Reports</p>
              <h3 className="text-2xl font-bold text-blue-900 mt-1">{pendingReports}</h3>
            </div>
            <div className="bg-yellow-100 p-2 rounded-md">
              <AlertCircle className="h-6 w-6 text-yellow-700" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Appointments pending review</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Unread Messages</p>
              <h3 className="text-2xl font-bold text-blue-900 mt-1">{unreadMessages}</h3>
            </div>
            <div className="bg-red-100 p-2 rounded-md">
              <MessageSquare className="h-6 w-6 text-red-700" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Total message count</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="col-span-1 lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-blue-900">Today's Schedule</h2>
            <Button variant="outline" className="text-blue-900 border-blue-900 hover:bg-blue-50">
              View Full Schedule
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-500">Loading appointments...</div>
            </div>
          ) : todaysAppointments.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-500">No appointments scheduled for today</div>
            </div>
          ) : (
            <div className="space-y-4">
              {todaysAppointments.map((appointment, index) => {
                const isCurrentAppointment = index === 0 // You can implement better logic for current appointment
                const patientName = `${appointment.patient.firstName} ${appointment.patient.lastName}`
                const timeSlot = `${formatTime(appointment.startTime)} - ${formatTime(appointment.endTime)}`
                const appointmentReason = appointment.reason?.name || 'General Consultation'
                const isVirtual = appointment.reason?.reasonType === 'virtual'
                
                return (
                  <div 
                    key={appointment._id} 
                    className={`flex items-center gap-4 p-4 border border-gray-200 rounded-md ${
                      isCurrentAppointment ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-blue-900" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-medium text-blue-900">{patientName}</h3>
                        {isCurrentAppointment && (
                          <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                            Current
                          </Badge>
                        )}
                        {appointment.status === 'pending' && (
                          <Badge className="ml-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            Pending
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {timeSlot} • {appointmentReason}
                      </p>
                      {appointment.notes && appointment.notes.length > 0 && (
                        <p className="text-xs text-gray-400 mt-1">
                          Note: {appointment.notes[0]}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        View Chart
                      </Button>
                      <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                        {isVirtual ? (
                          <>
                            <Video className="h-4 w-4 mr-1" /> Virtual
                          </>
                        ) : (
                          'Start'
                        )}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">Recent Activity</h2>

          <div className="space-y-4">
            {appointments.slice(0, 4).map((appointment, index) => {
              const activityTime = new Date(appointment.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })
              const patientName = `${appointment.patient.firstName} ${appointment.patient.lastName}`
              
              return (
                <div key={appointment._id} className="border-l-2 border-blue-900 pl-4 pb-4">
                  <p className="text-sm text-gray-500">{activityTime}</p>
                  <p className="font-medium text-blue-900">Appointment scheduled</p>
                  <p className="text-sm text-gray-500">
                    {patientName} - ${appointment.payment.amount}
                  </p>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Patient Search and Urgent Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">Quick Patient Search</h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search patients by name or ID"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <h3 className="font-medium text-gray-700 mb-2">Recent Patients</h3>
          <div className="space-y-3">
            {appointments.slice(0, 4).map((appointment) => {
              const patient = appointment.patient
              const patientName = `${patient.firstName} ${patient.lastName}`
              const initials = `${patient.firstName[0]}${patient.lastName[0]}`
              const appointmentDate = formatDate(appointment.date)
              const appointmentTime = formatTime(appointment.startTime)
              
              return (
                <div key={appointment._id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-900 text-xs">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-blue-900">{patientName}</p>
                      <p className="text-xs text-gray-500">{patient._id.slice(-8)}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{appointmentDate}, {appointmentTime}</p>
                </div>
              )
            })}
          </div>
          <Button className="w-full mt-4 bg-blue-900 hover:bg-blue-800">View All Patients</Button>
        </Card>

        <Card className="p-6 col-span-1 lg:col-span-2">
          <h2 className="text-lg font-bold text-blue-900 mb-4">Urgent Cases</h2>
          <div className="space-y-4">
            <div className="p-4 border border-red-200 bg-red-50 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-red-100 text-red-800">RJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-red-800">Robert Johnson</h3>
                    <p className="text-sm text-red-700">Chest Pain • Admitted: 2 hours ago</p>
                  </div>
                </div>
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm text-red-700">
                  <span className="font-medium">Vitals:</span> BP 160/95, HR 110, SpO2 94%
                </p>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Review Immediately
                </Button>
              </div>
            </div>

            <div className="p-4 border border-amber-200 bg-amber-50 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-amber-100 text-amber-800">LM</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-amber-800">Lisa Martinez</h3>
                    <p className="text-sm text-amber-700">Severe Allergic Reaction • Admitted: 1 hour ago</p>
                  </div>
                </div>
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Urgent</Badge>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm text-amber-700">
                  <span className="font-medium">Vitals:</span> BP 100/60, HR 95, SpO2 97%
                </p>
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                  Review Soon
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium text-blue-900 mb-2">Pending Lab Reviews</h3>
            <div className="space-y-2">
              {appointments.filter(apt => apt.payment.status === 'pending').slice(0, 3).map((appointment, index) => {
                const patientName = `${appointment.patient.firstName} ${appointment.patient.lastName}`
                const appointmentDate = formatDate(appointment.date)
                
                return (
                  <div key={appointment._id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium text-blue-900">{patientName}</p>
                      <p className="text-sm text-gray-500">Payment Status: {appointment.payment.status}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">{appointmentDate}</p>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}