import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pill, Clock, AlertCircle, Plus, RefreshCw } from "lucide-react"

export default function MedicationsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Medications</h1>
          <p className="text-gray-500">Manage your prescriptions and medications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
            <RefreshCw className="h-4 w-4 mr-2" /> Request Refill
          </Button>
          <Button className="bg-blue-900 hover:bg-blue-800">
            <Plus className="h-4 w-4 mr-2" /> Add Medication
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold text-blue-900 mb-4">Current Medications</h2>

          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="bg-blue-100 p-3 rounded-full h-fit">
                    <Pill className="h-6 w-6 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900">Lisinopril</h3>
                    <p className="text-sm text-gray-600">10mg • Once daily • Morning with food</p>
                    <p className="text-sm text-gray-500">Purpose: Blood pressure control</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>Since: March 10, 2022</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">30 days supply</p>
                  <p className="text-sm text-gray-500">Refills: 2 remaining</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                  <p className="text-sm">Do not take with grapefruit juice</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="bg-blue-100 p-3 rounded-full h-fit">
                    <Pill className="h-6 w-6 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900">Albuterol</h3>
                    <p className="text-sm text-gray-600">80mcg • As needed • 2 puffs</p>
                    <p className="text-sm text-gray-500">Purpose: Asthma relief</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>Since: June 22, 2018</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">200 doses</p>
                  <p className="text-sm text-gray-500">Refills: 3 remaining</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                  <p className="text-sm">Use spacer for better delivery</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="bg-blue-100 p-3 rounded-full h-fit">
                    <Pill className="h-6 w-6 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900">Vitamin D</h3>
                    <p className="text-sm text-gray-600">1000 IU • Once daily</p>
                    <p className="text-sm text-gray-500">Purpose: Vitamin supplementation</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>Since: January 15, 2023</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">90 days supply</p>
                  <p className="text-sm text-gray-500">Over-the-counter</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-blue-900 mb-4">Medication Schedule</h2>
          <Card className="p-6">
            <h3 className="font-medium text-blue-900 mb-4">Today's Medications</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-900" />
                  <div>
                    <p className="font-medium text-blue-900">Morning</p>
                    <p className="text-sm text-gray-600">8:00 AM</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-blue-900">Lisinopril</p>
                  <p className="text-sm text-gray-600">10mg • 1 tablet</p>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Taken</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Evening</p>
                    <p className="text-sm text-gray-600">8:00 PM</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Vitamin D</p>
                  <p className="text-sm text-gray-600">1000 IU • 1 tablet</p>
                </div>
                <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                  Mark as Taken
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-blue-900 mb-4">Upcoming Refills</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Lisinopril</p>
                  <p className="text-sm font-medium text-blue-900">May 20, 2023</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Albuterol</p>
                  <p className="text-sm font-medium text-blue-900">July 15, 2023</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 mt-6">
            <h3 className="font-medium text-blue-900 mb-4">Medication History</h3>
            <Button variant="outline" className="w-full border-blue-900 text-blue-900 hover:bg-blue-50">
              View Complete History
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
