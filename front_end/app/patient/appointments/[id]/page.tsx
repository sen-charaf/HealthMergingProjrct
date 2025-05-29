import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  FileText,
  MessageCircle,
  ArrowLeft,
  Video,
  Pill,
  AlertCircle,
  Printer,
  Download,
  Share2,
  Eye,
} from "lucide-react";

export default function AppointmentSummaryPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real application, you would fetch the appointment data based on the ID
  // For this example, we'll use mock data
  const appointmentId = params.id;

  // Mock appointment data
  const appointment = {
    id: appointmentId,
    title: "Annual Physical Examination",
    status: "Completed",
    date: "May 15, 2023",
    time: "10:00 AM",
    location: "Main Hospital, Floor 3",
    type: "In-person",
    doctor: {
      name: "Dr. Sarah Johnson",
      speciality: "Cardiology",
      image: "/images/doctor-avatar.jpg",
      phone: "(555) 123-4567",
      email: "sarah.johnson@healthcare.com",
    },
    notes:
      "Patient reported occasional chest pain. Blood pressure slightly elevated. Recommended follow-up in 3 months.",
    vitals: {
      bloodPressure: "130/85",
      heartRate: "78 bpm",
      temperature: "98.6°F",
      weight: "165 lbs",
      height: "5'10\"",
      bmi: "23.7",
    },
    prescriptions: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        instructions: "Take once daily",
        refills: 3,
      },
      {
        name: "Atorvastatin",
        dosage: "20mg",
        instructions: "Take once daily at bedtime",
        refills: 2,
      },
    ],
    followUp: {
      recommended: true,
      date: "August 15, 2023",
      reason: "Follow-up on blood pressure and medication effectiveness",
    },
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" className="h-8 w-8" asChild>
          <Link href="/patient/dashboard/appointments">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-blue-900">
          Appointment Summary
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Appointment Details */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex gap-4">
                <div className="bg-blue-100 p-3 rounded-full h-fit">
                  <Calendar className="h-6 w-6 text-blue-900" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-medium text-blue-900 text-xl">
                      {appointment.title}
                    </h2>
                    <Badge
                      className={`${
                        appointment.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : appointment.status === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    {appointment.doctor.name} • {appointment.doctor.speciality}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>
                        {appointment.date} • {appointment.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="bg-blue-900 hover:bg-blue-800">
                  <MessageCircle className="h-4 w-4 mr-2" /> Message Doctor
                </Button>
              </div>
            </div>
          </Card>

          {/* Appointment Tabs */}
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="bg-white border border-gray-200 w-full justify-start">
              <TabsTrigger
                value="summary"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900"
              >
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="vitals"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900"
              >
                Vitals
              </TabsTrigger>
              <TabsTrigger
                value="prescriptions"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900"
              >
                Prescriptions
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900"
              >
                Documents
              </TabsTrigger>
            </TabsList>

            {/* Summary Tab */}
            <TabsContent value="summary" className="mt-4">
              <Card className="p-6">
                <h3 className="text-lg font-medium text-blue-900 mb-3">
                  Doctor's Notes
                </h3>
                <p className="text-gray-700 mb-6">{appointment.notes}</p>

                {appointment.followUp.recommended && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-900 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">
                          Follow-up Recommended
                        </h4>
                        <p className="text-sm text-gray-700 mb-2">
                          {appointment.followUp.reason}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-blue-900">
                          <Calendar className="h-4 w-4" />
                          <span>{appointment.followUp.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  <Button
                    variant="outline"
                    className="border-blue-900 text-blue-900 hover:bg-blue-50"
                  >
                    <Printer className="h-4 w-4 mr-2" /> Print Summary
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-900 text-blue-900 hover:bg-blue-50"
                  >
                    <Download className="h-4 w-4 mr-2" /> Download PDF
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-900 text-blue-900 hover:bg-blue-50"
                  >
                    <Share2 className="h-4 w-4 mr-2" /> Share
                  </Button>
                </div>
              </Card>
            </TabsContent>

            {/* Vitals Tab */}
            <TabsContent value="vitals" className="mt-4">
              <Card className="p-6">
                <h3 className="text-lg font-medium text-blue-900 mb-4">
                  Vital Signs
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <VitalCard
                    title="Blood Pressure"
                    value={appointment.vitals.bloodPressure}
                    icon={<AlertCircle className="h-5 w-5 text-blue-900" />}
                  />
                  <VitalCard
                    title="Heart Rate"
                    value={appointment.vitals.heartRate}
                    icon={<AlertCircle className="h-5 w-5 text-blue-900" />}
                  />
                  <VitalCard
                    title="Temperature"
                    value={appointment.vitals.temperature}
                    icon={<AlertCircle className="h-5 w-5 text-blue-900" />}
                  />
                  <VitalCard
                    title="Weight"
                    value={appointment.vitals.weight}
                    icon={<AlertCircle className="h-5 w-5 text-blue-900" />}
                  />
                  <VitalCard
                    title="Height"
                    value={appointment.vitals.height}
                    icon={<AlertCircle className="h-5 w-5 text-blue-900" />}
                  />
                  <VitalCard
                    title="BMI"
                    value={appointment.vitals.bmi}
                    icon={<AlertCircle className="h-5 w-5 text-blue-900" />}
                  />
                </div>
              </Card>
            </TabsContent>

            {/* Prescriptions Tab */}
            <TabsContent value="prescriptions" className="mt-4">
              <Card className="p-6">
                <h3 className="text-lg font-medium text-blue-900 mb-4">
                  Prescribed Medications
                </h3>
                <div className="space-y-4">
                  {appointment.prescriptions.map((prescription, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Pill className="h-5 w-5 text-blue-900" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap justify-between gap-2">
                            <h4 className="font-medium text-blue-900">
                              {prescription.name}
                            </h4>
                            <Badge className="bg-blue-100 text-blue-800">
                              {prescription.dosage}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">
                            {prescription.instructions}
                          </p>
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-sm text-gray-500">
                              Refills: {prescription.refills}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-blue-900 text-blue-900 hover:bg-blue-50"
                            >
                              Request Refill
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="mt-4">
              <Card className="p-6">
                <h3 className="text-lg font-medium text-blue-900 mb-4">
                  Related Documents
                </h3>
                <div className="space-y-3">
                  <DocumentItem
                    title="Appointment Summary"
                    type="PDF"
                    date="May 15, 2023"
                    size="245 KB"
                  />
                  <DocumentItem
                    title="Lab Results"
                    type="PDF"
                    date="May 16, 2023"
                    size="1.2 MB"
                  />
                  <DocumentItem
                    title="Prescription"
                    type="PDF"
                    date="May 15, 2023"
                    size="120 KB"
                  />
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Doctor Info */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-4">
              Healthcare Provider
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-900" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900">
                  {appointment.doctor.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {appointment.doctor.speciality}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Phone className="h-4 w-4 text-blue-900" />
                <span>{appointment.doctor.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Mail className="h-4 w-4 text-blue-900" />
                <span>{appointment.doctor.email}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col gap-2">
              <Button className="w-full bg-blue-900 hover:bg-blue-800">
                <Video className="h-4 w-4 mr-2" /> Schedule Virtual Visit
              </Button>
              <Button
                variant="outline"
                className="w-full border-blue-900 text-blue-900 hover:bg-blue-50"
              >
                <Calendar className="h-4 w-4 mr-2" /> Book Follow-up
              </Button>
            </div>
          </Card>

          {/* Related Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-4">
              Related Actions
            </h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                <FileText className="h-4 w-4 mr-2 text-blue-900" /> View Medical
                History
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                <Pill className="h-4 w-4 mr-2 text-blue-900" /> Manage
                Medications
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                <MessageCircle className="h-4 w-4 mr-2 text-blue-900" /> Message
                Support
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Add this function at the top level of your file, before or after your default export

export async function generateStaticParams() {
  // This function tells Next.js which appointment IDs to pre-render at build time
  // In a real app, you would fetch these from your API
  return [
    { id: "past-appointment-1" },
    { id: "upcoming-appointment-1" },
    { id: "upcoming-appointment-2" },
  ];
}

// Vital Card Component
function VitalCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        {icon}
      </div>
      <p className="text-xl font-bold text-blue-900">{value}</p>
    </div>
  );
}

// Document Item Component
function DocumentItem({
  title,
  type,
  date,
  size,
}: {
  title: string;
  type: string;
  date: string;
  size: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-2 rounded">
          <FileText className="h-5 w-5 text-blue-900" />
        </div>
        <div>
          <h4 className="font-medium text-blue-900">{title}</h4>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{type}</span>
            <span>•</span>
            <span>{date}</span>
            <span>•</span>
            <span>{size}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-blue-900 hover:bg-blue-50"
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-blue-900 hover:bg-blue-50"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
