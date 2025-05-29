"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, ChevronDown, FileText, RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function PrescriptionsPage() {
  const router = useRouter();

  const handleNewPrescription = () => {
    router.push("/doctor/prescriptions/new"); 
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Prescriptions</h1>
          <p className="text-gray-500">Manage patient prescriptions</p>
        </div>
        <Button
          className="bg-blue-900 hover:bg-blue-800"
          onClick={handleNewPrescription}
        >
          <Plus className="h-4 w-4 mr-2" /> New Prescription
        </Button>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search prescriptions by patient, medication, or date"
              className="pl-10 bg-white border-gray-200"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-200 text-gray-700">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Button variant="outline" className="border-gray-200 text-gray-700">
              Status <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="outline" className="border-gray-200 text-gray-700">
              Date <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="active" className="mb-6">
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="active" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900">
            Active
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900">
            Pending Approval
          </TabsTrigger>
          <TabsTrigger value="refill" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900">
            Refill Requests
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900">
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 font-medium text-gray-700">
              <div className="col-span-3">Patient</div>
              <div className="col-span-3">Medication</div>
              <div className="col-span-2">Prescribed</div>
              <div className="col-span-2">Refills</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {[
              {
                patient: "John Doe",
                patientId: "P-10042389",
                medication: "Lisinopril 10mg",
                dosage: "Once daily",
                prescribed: "Mar 10, 2022",
                refills: "2 remaining",
                status: "Active",
              },
              {
                patient: "Emily Rodriguez",
                patientId: "P-10042390",
                medication: "Metformin 500mg",
                dosage: "Twice daily",
                prescribed: "Apr 15, 2023",
                refills: "3 remaining",
                status: "Active",
              },
              {
                patient: "Michael Chen",
                patientId: "P-10042391",
                medication: "Atorvastatin 20mg",
                dosage: "Once daily at bedtime",
                prescribed: "Feb 20, 2023",
                refills: "5 remaining",
                status: "Active",
              },
              {
                patient: "Sarah Williams",
                patientId: "P-10042392",
                medication: "Levothyroxine 50mcg",
                dosage: "Once daily on empty stomach",
                prescribed: "Jan 5, 2023",
                refills: "6 remaining",
                status: "Active",
              },
              {
                patient: "David Wilson",
                patientId: "P-10042395",
                medication: "Albuterol 90mcg",
                dosage: "2 puffs as needed",
                prescribed: "Mar 15, 2023",
                refills: "1 remaining",
                status: "Active",
              },
            ].map((prescription, index) => (
              <div
                key={index}
                className={`grid grid-cols-12 gap-4 p-4 items-center ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition-colors`}
              >
                <div className="col-span-3 flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-900">
                      {prescription.patient
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-blue-900">{prescription.patient}</p>
                    <p className="text-xs text-gray-500">{prescription.patientId}</p>
                  </div>
                </div>
                <div className="col-span-3">
                  <p className="font-medium text-gray-700">{prescription.medication}</p>
                  <p className="text-xs text-gray-500">{prescription.dosage}</p>
                </div>
                <div className="col-span-2 text-gray-700">{prescription.prescribed}</div>
                <div className="col-span-2 text-gray-700">{prescription.refills}</div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 font-medium text-gray-700">
              <div className="col-span-3">Patient</div>
              <div className="col-span-3">Medication</div>
              <div className="col-span-2">Requested</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {[
              {
                patient: "Jennifer Lee",
                patientId: "P-10042396",
                medication: "Escitalopram 10mg",
                dosage: "Once daily",
                requested: "May 5, 2023",
                status: "Pending Review",
              },
              {
                patient: "Thomas Brown",
                patientId: "P-10042397",
                medication: "Hydrochlorothiazide 25mg",
                dosage: "Once daily",
                requested: "May 4, 2023",
                status: "Pending Review",
              },
            ].map((prescription, index) => (
              <div
                key={index}
                className={`grid grid-cols-12 gap-4 p-4 items-center ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition-colors`}
              >
                <div className="col-span-3 flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-900">
                      {prescription.patient
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-blue-900">{prescription.patient}</p>
                    <p className="text-xs text-gray-500">{prescription.patientId}</p>
                  </div>
                </div>
                <div className="col-span-3">
                  <p className="font-medium text-gray-700">{prescription.medication}</p>
                  <p className="text-xs text-gray-500">{prescription.dosage}</p>
                </div>
                <div className="col-span-2 text-gray-700">{prescription.requested}</div>
                <div className="col-span-2">
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{prescription.status}</Badge>
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Button size="sm" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                    <XCircle className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="refill">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 font-medium text-gray-700">
              <div className="col-span-3">Patient</div>
              <div className="col-span-3">Medication</div>
              <div className="col-span-2">Requested</div>
              <div className="col-span-2">Last Filled</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {[
              {
                patient: "Robert Johnson",
                patientId: "P-10042393",
                medication: "Amlodipine 5mg",
                dosage: "Once daily",
                requested: "May 5, 2023",
                lastFilled: "Apr 5, 2023",
                urgent: true,
              },
              {
                patient: "Lisa Martinez",
                patientId: "P-10042394",
                medication: "Sertraline 50mg",
                dosage: "Once daily",
                requested: "May 3, 2023",
                lastFilled: "Apr 3, 2023",
                urgent: false,
              },
            ].map((prescription, index) => (
              <div
                key={index}
                className={`grid grid-cols-12 gap-4 p-4 items-center ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition-colors`}
              >
                <div className="col-span-3 flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-900">
                      {prescription.patient
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-blue-900">{prescription.patient}</p>
                      {prescription.urgent && <AlertCircle className="h-4 w-4 text-red-500" />}
                    </div>
                    <p className="text-xs text-gray-500">{prescription.patientId}</p>
                  </div>
                </div>
                <div className="col-span-3">
                  <p className="font-medium text-gray-700">{prescription.medication}</p>
                  <p className="text-xs text-gray-500">{prescription.dosage}</p>
                </div>
                <div className="col-span-2 text-gray-700">{prescription.requested}</div>
                <div className="col-span-2 text-gray-700">{prescription.lastFilled}</div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Button size="sm" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                    <XCircle className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 font-medium text-gray-700">
              <div className="col-span-3">Patient</div>
              <div className="col-span-3">Medication</div>
              <div className="col-span-2">Prescribed</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {[
              {
                patient: "John Doe",
                patientId: "P-10042389",
                medication: "Amoxicillin 500mg",
                dosage: "Three times daily",
                prescribed: "Jan 15, 2023",
                status: "Completed",
              },
              {
                patient: "Emily Rodriguez",
                patientId: "P-10042390",
                medication: "Prednisone 20mg",
                dosage: "Once daily, tapering dose",
                prescribed: "Feb 10, 2023",
                status: "Completed",
              },
              {
                patient: "Michael Chen",
                patientId: "P-10042391",
                medication: "Azithromycin 250mg",
                dosage: "Once daily for 5 days",
                prescribed: "Mar 5, 2023",
                status: "Completed",
              },
            ].map((prescription, index) => (
              <div
                key={index}
                className={`grid grid-cols-12 gap-4 p-4 items-center ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition-colors`}
              >
                <div className="col-span-3 flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-900">
                      {prescription.patient
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-blue-900">{prescription.patient}</p>
                    <p className="text-xs text-gray-500">{prescription.patientId}</p>
                  </div>
                </div>
                <div className="col-span-3">
                  <p className="font-medium text-gray-700">{prescription.medication}</p>
                  <p className="text-xs text-gray-500">{prescription.dosage}</p>
                </div>
                <div className="col-span-2 text-gray-700">{prescription.prescribed}</div>
                <div className="col-span-2">
                  <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{prescription.status}</Badge>
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                    Renew
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
