"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckCircle,
  XCircle,
  ArrowLeft,
  Calendar,
  Clock,
  Building,
  GraduationCap,
  Briefcase,
  Globe,
  DollarSign,
  Heart,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock data for demonstration
const mockDoctor = {
  id: "1",
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@example.com",
  specialty: "Cardiology",
  licenseNumber: "MD12345678",
  submittedAt: "2023-05-01T10:30:00Z",
  status: "pending",
  biography:
    "Board-certified cardiologist with over 10 years of experience in treating cardiovascular diseases. Specialized in interventional cardiology and heart failure management.",
  education: [
    { institution: "Harvard Medical School", degree: "Doctor of Medicine", year: 2008 },
    { institution: "Stanford University", degree: "Bachelor of Science in Biology", year: 2004 },
  ],
  experience: [
    { position: "Senior Cardiologist", institution: "Mayo Clinic", startYear: 2015, endYear: 2023 },
    { position: "Cardiology Fellow", institution: "Johns Hopkins Hospital", startYear: 2012, endYear: 2015 },
    { position: "Resident Physician", institution: "Massachusetts General Hospital", startYear: 2008, endYear: 2012 },
  ],
  languages: ["English", "Spanish", "French"],
  consultationFee: 150,
  availabilitySchedule: [
    { day: "Monday", startTime: "09:00", endTime: "17:00", isAvailable: true },
    { day: "Wednesday", startTime: "09:00", endTime: "17:00", isAvailable: true },
    { day: "Friday", startTime: "09:00", endTime: "13:00", isAvailable: true },
  ],
}

export default function DoctorVerificationDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [doctor, setDoctor] = useState(mockDoctor)
  const [rejectionReason, setRejectionReason] = useState("")
  const [showRejectionForm, setShowRejectionForm] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleApprove = () => {
    setDoctor({ ...doctor, status: "approved" })
    toast({
      title: "Doctor approved",
      description: "The doctor has been verified and approved.",
    })
    // In a real app, you would make an API call here
    setTimeout(() => {
      router.push("/admin/doctor-verification")
    }, 1500)
  }

  const handleShowRejectionForm = () => {
    setShowRejectionForm(true)
  }

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Rejection reason required",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      })
      return
    }

    setDoctor({ ...doctor, status: "rejected" })
    toast({
      title: "Doctor rejected",
      description: "The doctor verification has been rejected.",
    })
    // In a real app, you would make an API call here with the rejection reason
    setTimeout(() => {
      router.push("/admin/doctor-verification")
    }, 1500)
  }

  return (
    <div className="container mx-auto py-10 px-4">

      <Button variant="ghost" className="mb-6 text-[#1e3a8a] hover:bg-[#1e3a8a]/10" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to List
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader className="bg-[#f8fafc] border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl text-[#1e3a8a]">{doctor.name}</CardTitle>
                  <p className="text-gray-600">{doctor.specialty}</p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    doctor.status === "pending"
                      ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                      : doctor.status === "approved"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                  }
                >
                  {doctor.status === "pending"
                    ? "Pending Review"
                    : doctor.status === "approved"
                      ? "Approved"
                      : "Rejected"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <Tabs defaultValue="details">
                <TabsList className="bg-gray-100">
                  <TabsTrigger
                    value="details"
                    className="data-[state=active]:bg-white data-[state=active]:text-[#1e3a8a]"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="education"
                    className="data-[state=active]:bg-white data-[state=active]:text-[#1e3a8a]"
                  >
                    Education
                  </TabsTrigger>
                  <TabsTrigger
                    value="experience"
                    className="data-[state=active]:bg-white data-[state=active]:text-[#1e3a8a]"
                  >
                    Experience
                  </TabsTrigger>
                  <TabsTrigger
                    value="schedule"
                    className="data-[state=active]:bg-white data-[state=active]:text-[#1e3a8a]"
                  >
                    Schedule
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6 pt-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-[#1e3a8a]">License Information</h3>
                    <div className="flex items-center text-sm">
                      <Badge variant="outline" className="mr-2 bg-[#f8fafc] text-[#1e3a8a] border-[#1e3a8a]/20">
                        License Number
                      </Badge>
                      {doctor.licenseNumber}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-[#1e3a8a]">Biography</h3>
                    <p className="text-sm text-gray-700">{doctor.biography}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-[#1e3a8a]">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((language) => (
                        <div key={language} className="flex items-center text-sm bg-[#f8fafc] px-3 py-1 rounded-full">
                          <Globe className="h-4 w-4 mr-1 text-[#1e3a8a]" />
                          {language}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-[#1e3a8a]">Consultation Fee</h3>
                    <div className="flex items-center text-sm">
                      <DollarSign className="h-4 w-4 mr-1 text-[#1e3a8a]" />${doctor.consultationFee} per session
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="education" className="space-y-4 pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-[#1e3a8a]">Education History</h3>
                  {doctor.education.map((edu, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4">
                      <div className="flex items-start">
                        <GraduationCap className="h-5 w-5 mr-2 mt-0.5 text-[#1e3a8a]" />
                        <div>
                          <h4 className="font-medium text-[#1e3a8a]">{edu.degree}</h4>
                          <div className="text-sm text-gray-600 flex items-center mt-1">
                            <Building className="h-4 w-4 mr-1" />
                            {edu.institution}
                          </div>
                          <div className="text-sm text-gray-600 flex items-center mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {edu.year}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="experience" className="space-y-4 pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-[#1e3a8a]">Professional Experience</h3>
                  {doctor.experience.map((exp, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4">
                      <div className="flex items-start">
                        <Briefcase className="h-5 w-5 mr-2 mt-0.5 text-[#1e3a8a]" />
                        <div>
                          <h4 className="font-medium text-[#1e3a8a]">{exp.position}</h4>
                          <div className="text-sm text-gray-600 flex items-center mt-1">
                            <Building className="h-4 w-4 mr-1" />
                            {exp.institution}
                          </div>
                          <div className="text-sm text-gray-600 flex items-center mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {exp.startYear} - {exp.endYear}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="schedule" className="space-y-4 pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-[#1e3a8a]">Availability Schedule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctor.availabilitySchedule.map((schedule, index) => (
                      <div key={index} className="border border-gray-200 rounded-md p-4">
                        <h4 className="font-medium text-[#1e3a8a]">{schedule.day}</h4>
                        <div className="text-sm text-gray-600 flex items-center mt-2">
                          <Clock className="h-4 w-4 mr-1" />
                          {schedule.startTime} - {schedule.endTime}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-0 shadow-sm sticky top-6">
            <CardHeader className="bg-[#f8fafc] border-b pb-4">
              <CardTitle className="text-[#1e3a8a] text-xl">Verification Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="text-sm">
                <div className="font-medium text-[#1e3a8a]">Submitted On</div>
                <div className="text-gray-600">{formatDate(doctor.submittedAt)}</div>
              </div>

              <div className="text-sm">
                <div className="font-medium text-[#1e3a8a]">Email</div>
                <div className="text-gray-600">{doctor.email}</div>
              </div>

              <Separator className="my-4" />

              {doctor.status === "pending" && !showRejectionForm && (
                <div className="flex flex-col gap-3">
                  <Button className="bg-green-600 hover:bg-green-700" onClick={handleApprove}>
                    <CheckCircle className="h-4 w-4 mr-2" /> Approve Doctor
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-200 text-red-700 hover:bg-red-50"
                    onClick={handleShowRejectionForm}
                  >
                    <XCircle className="h-4 w-4 mr-2" /> Reject Doctor
                  </Button>
                </div>
              )}

              {doctor.status === "pending" && showRejectionForm && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-[#1e3a8a]">Rejection Reason</h4>
                    <Textarea
                      placeholder="Please provide a reason for rejection"
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      className="min-h-[100px] border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="destructive" onClick={handleReject}>
                      Confirm Rejection
                    </Button>
                    <Button variant="outline" className="border-gray-300" onClick={() => setShowRejectionForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {doctor.status === "approved" && (
                <div className="bg-green-50 text-green-700 p-4 rounded-md flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  This doctor has been approved and verified
                </div>
              )}

              {doctor.status === "rejected" && (
                <div className="bg-red-50 text-red-700 p-4 rounded-md flex items-center">
                  <XCircle className="h-5 w-5 mr-2" />
                  This doctor has been rejected
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}