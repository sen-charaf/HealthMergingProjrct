"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Eye, Heart } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock data for demonstration
const mockDoctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    licenseNumber: "MD12345678",
    submittedAt: "2023-05-01T10:30:00Z",
    status: "pending",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    licenseNumber: "MD87654321",
    submittedAt: "2023-05-02T14:15:00Z",
    status: "pending",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    licenseNumber: "MD23456789",
    submittedAt: "2023-04-28T09:45:00Z",
    status: "approved",
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Dermatology",
    licenseNumber: "MD34567890",
    submittedAt: "2023-04-30T16:20:00Z",
    status: "rejected",
  },
]

export default function AdminDoctorVerificationPage() {
  const [doctors, setDoctors] = useState(mockDoctors)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleApprove = (id: string) => {
    setDoctors(doctors.map((doctor) => (doctor.id === id ? { ...doctor, status: "approved" } : doctor)))
    toast({
      title: "Doctor approved",
      description: "The doctor has been verified and approved.",
    })
  }

  const handleReject = (id: string) => {
    setDoctors(doctors.map((doctor) => (doctor.id === id ? { ...doctor, status: "rejected" } : doctor)))
    toast({
      title: "Doctor rejected",
      description: "The doctor verification has been rejected.",
    })
  }

  const pendingDoctors = doctors.filter((doctor) => doctor.status === "pending")
  const approvedDoctors = doctors.filter((doctor) => doctor.status === "approved")
  const rejectedDoctors = doctors.filter((doctor) => doctor.status === "rejected")

  return (
    <div className="container mx-auto py-10 px-4">
     

      <div className="flex items-center mb-6">
        <div className="bg-[#1e3a8a] p-3 rounded-lg mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#1e3a8a]">Doctor Verification Management</h2>
          <p className="text-gray-600">Review and verify doctor accounts based on their professional information</p>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="bg-[#f8fafc] border-b pb-4">
          <CardTitle className="text-[#1e3a8a] text-xl">Doctor Verification Requests</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="pending">
            <TabsList className="mb-6 bg-gray-100">
              <TabsTrigger value="pending" className="data-[state=active]:bg-white data-[state=active]:text-[#1e3a8a]">
                Pending
                {pendingDoctors.length > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-yellow-100 text-yellow-800">
                    {pendingDoctors.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="approved" className="data-[state=active]:bg-white data-[state=active]:text-[#1e3a8a]">
                Approved
              </TabsTrigger>
              <TabsTrigger value="rejected" className="data-[state=active]:bg-white data-[state=active]:text-[#1e3a8a]">
                Rejected
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {pendingDoctors.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">No pending verification requests</div>
              ) : (
                pendingDoctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    formatDate={formatDate}
                    onApprove={() => handleApprove(doctor.id)}
                    onReject={() => handleReject(doctor.id)}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="approved" className="space-y-4">
              {approvedDoctors.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">No approved doctors</div>
              ) : (
                approvedDoctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} formatDate={formatDate} />)
              )}
            </TabsContent>

            <TabsContent value="rejected" className="space-y-4">
              {rejectedDoctors.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">No rejected doctors</div>
              ) : (
                rejectedDoctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} formatDate={formatDate} />)
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

interface DoctorCardProps {
  doctor: {
    id: string
    name: string
    specialty: string
    licenseNumber: string
    submittedAt: string
    status: string
  }
  formatDate: (date: string) => string
  onApprove?: () => void
  onReject?: () => void
}

function DoctorCard({ doctor, formatDate, onApprove, onReject }: DoctorCardProps) {
  return (
    <Card className="border border-gray-200 shadow-none">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-[#1e3a8a]">{doctor.name}</h3>
            <div className="text-sm text-gray-600">
              {doctor.specialty} • License: {doctor.licenseNumber}
            </div>
            <div className="text-sm text-gray-600">Submitted: {formatDate(doctor.submittedAt)}</div>
            <div className="mt-2">
              {doctor.status === "pending" && (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Pending Review
                </Badge>
              )}
              {doctor.status === "approved" && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Approved
                </Badge>
              )}
              {doctor.status === "rejected" && (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Rejected
                </Badge>
              )}
            </div>
          </div>

          <div className="flex gap-2 self-end md:self-center">
            <Button variant="outline" size="sm" asChild className="border-[#1e3a8a] text-[#1e3a8a]">
              <Link href={`/admin/doctor-verification/${doctor.id}`}>
                <Eye className="h-4 w-4 mr-1" /> View Details
              </Link>
            </Button>

            {doctor.status === "pending" && (
              <>
                <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700" onClick={onApprove}>
                  <CheckCircle className="h-4 w-4 mr-1" /> Approve
                </Button>
                <Button variant="destructive" size="sm" onClick={onReject}>
                  <XCircle className="h-4 w-4 mr-1" /> Reject
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}