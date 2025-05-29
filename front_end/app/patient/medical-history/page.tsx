import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function MedicalHistoryPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Medical History</h1>
          <p className="text-gray-500">John Doe • DOB: 1990-05-15</p>
        </div>
        
        
        <Button className="bg-blue-900 hover:bg-blue-800" asChild>
          <Link href="/patient/dashboard/medical-history/add">
            <Plus className="h-4 w-4 mr-2" /> Add Record
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Tabs defaultValue="overview">
          <div className="border-b border-gray-200">
            <TabsList className="bg-transparent border-b-0 p-0">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none py-3 px-6"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="conditions"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none py-3 px-6"
              >
                Conditions
              </TabsTrigger>
              <TabsTrigger
                value="surgeries"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none py-3 px-6"
              >
                Surgeries
              </TabsTrigger>
              <TabsTrigger
                value="family-history"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none py-3 px-6"
              >
                Family History
              </TabsTrigger>
              <TabsTrigger
                value="immunizations"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none py-3 px-6"
              >
                Immunizations
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Current Conditions */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Current Conditions</h3>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-blue-900">Hypertension</h4>
                        <p className="text-sm text-gray-500">Diagnosed: 2022-03-10</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Mild</Badge>
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Active</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-blue-900">Asthma</h4>
                        <p className="text-sm text-gray-500">Diagnosed: 2018-06-22</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Moderate</Badge>
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Controlled</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mt-6 mb-4">Allergies</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Penicillin</Badge>
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Peanuts</Badge>
                </div>
              </div>

              {/* Current Medications */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Current Medications</h3>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-blue-900">Lisinopril</h4>
                        <p className="text-sm text-gray-600">10mg • Once daily</p>
                        <p className="text-sm text-gray-500">Purpose: Blood pressure control</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Since 2022-03-10</p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-blue-900">Albuterol</h4>
                        <p className="text-sm text-gray-600">80mcg • As needed</p>
                        <p className="text-sm text-gray-500">Purpose: Asthma relief</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Since 2018-06-22</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Other tab contents */}
          <TabsContent value="conditions">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">All Conditions</h3>
              <p className="text-gray-500">Detailed condition history would be displayed here.</p>
            </div>
          </TabsContent>

          <TabsContent value="surgeries">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Surgical History</h3>
              <p className="text-gray-500">No surgical procedures on record.</p>
            </div>
          </TabsContent>

          <TabsContent value="family-history">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Family Medical History</h3>
              <p className="text-gray-500">Family medical history would be displayed here.</p>
            </div>
          </TabsContent>

          <TabsContent value="immunizations">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Immunization Records</h3>
              <p className="text-gray-500">Vaccination and immunization records would be displayed here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
