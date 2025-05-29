"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Activity, Bell } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back, John Doe</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Upcoming Appointments</p>
              <h3 className="text-2xl font-bold text-blue-900 mt-1">2</h3>
            </div>
            <div className="bg-blue-100 p-2 rounded-md">
              <Calendar className="h-6 w-6 text-blue-900" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Next: May 15, 2023</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Medication Reminders</p>
              <h3 className="text-2xl font-bold text-blue-900 mt-1">3</h3>
            </div>
            <div className="bg-green-100 p-2 rounded-md">
              <Clock className="h-6 w-6 text-green-700" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Next: Today, 8:00 PM</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Conditions</p>
              <h3 className="text-2xl font-bold text-blue-900 mt-1">2</h3>
            </div>
            <div className="bg-yellow-100 p-2 rounded-md">
              <Activity className="h-6 w-6 text-yellow-700" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Last updated: 2 weeks ago</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Notifications</p>
              <h3 className="text-2xl font-bold text-blue-900 mt-1">5</h3>
            </div>
            <div className="bg-red-100 p-2 rounded-md">
              <Bell className="h-6 w-6 text-red-700" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">3 unread messages</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <Card className="col-span-1 lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-blue-900">Upcoming Appointments</h2>
            <Button variant="outline" className="text-blue-900 border-blue-900 hover:bg-blue-50">
              <Link href="/patient/appointments">View All</Link>
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-md">
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-900" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-blue-900">Annual Physical Examination</h3>
                <p className="text-sm text-gray-500">Dr. Sarah Johnson • May 15, 2023 • 10:00 AM</p>
              </div>
              <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                Details
              </Button>
            </div>

            <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-md">
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-900" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-blue-900">Cardiology Follow-up</h3>
                <p className="text-sm text-gray-500">Dr. Michael Chen • June 3, 2023 • 2:30 PM</p>
              </div>
              <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                Details
              </Button>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">Recent Activity</h2>

          <div className="space-y-4">
            <div className="border-l-2 border-blue-900 pl-4 pb-4">
              <p className="text-sm text-gray-500">Today</p>
              <p className="font-medium text-blue-900">Prescription refill request approved</p>
              <p className="text-sm text-gray-500">Lisinopril 10mg • 30 days supply</p>
            </div>

            <div className="border-l-2 border-blue-900 pl-4 pb-4">
              <p className="text-sm text-gray-500">Yesterday</p>
              <p className="font-medium text-blue-900">Lab results available</p>
              <p className="text-sm text-gray-500">Blood work from May 1, 2023</p>
            </div>

            <div className="border-l-2 border-blue-900 pl-4 pb-4">
              <p className="text-sm text-gray-500">May 2, 2023</p>
              <p className="font-medium text-blue-900">Appointment scheduled</p>
              <p className="text-sm text-gray-500">Annual Physical with Dr. Johnson</p>
            </div>

            <div className="border-l-2 border-blue-900 pl-4">
              <p className="text-sm text-gray-500">April 28, 2023</p>
              <p className="font-medium text-blue-900">Message from Dr. Johnson</p>
              <p className="text-sm text-gray-500">Regarding your recent test results</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
