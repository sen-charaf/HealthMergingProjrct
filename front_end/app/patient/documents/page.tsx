import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Download, Eye, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function DocumentsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Documents</h1>
          <p className="text-gray-500">Access and manage your medical documents</p>
        </div>
        <Button className="bg-blue-900 hover:bg-blue-800">
          <Plus className="h-4 w-4 mr-2" /> Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search documents" className="pl-8 bg-white border-gray-200" />
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Document Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="lab-results" className="h-4 w-4 text-blue-900 rounded" />
                    <label htmlFor="lab-results" className="ml-2 text-sm text-gray-700">
                      Lab Results
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="imaging" className="h-4 w-4 text-blue-900 rounded" />
                    <label htmlFor="imaging" className="ml-2 text-sm text-gray-700">
                      Imaging Reports
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="prescriptions" className="h-4 w-4 text-blue-900 rounded" />
                    <label htmlFor="prescriptions" className="ml-2 text-sm text-gray-700">
                      Prescriptions
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="visit-summaries" className="h-4 w-4 text-blue-900 rounded" />
                    <label htmlFor="visit-summaries" className="ml-2 text-sm text-gray-700">
                      Visit Summaries
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="other" className="h-4 w-4 text-blue-900 rounded" />
                    <label htmlFor="other" className="ml-2 text-sm text-gray-700">
                      Other
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Date Range</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="radio" name="date-range" id="last-month" className="h-4 w-4 text-blue-900" />
                    <label htmlFor="last-month" className="ml-2 text-sm text-gray-700">
                      Last Month
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="date-range" id="last-3-months" className="h-4 w-4 text-blue-900" />
                    <label htmlFor="last-3-months" className="ml-2 text-sm text-gray-700">
                      Last 3 Months
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="date-range" id="last-year" className="h-4 w-4 text-blue-900" />
                    <label htmlFor="last-year" className="ml-2 text-sm text-gray-700">
                      Last Year
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="date-range" id="all-time" className="h-4 w-4 text-blue-900" checked />
                    <label htmlFor="all-time" className="ml-2 text-sm text-gray-700">
                      All Time
                    </label>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full border-blue-900 text-blue-900 hover:bg-blue-50">
                Apply Filters
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-blue-900 mb-4">Recent Documents</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded">
                    <FileText className="h-5 w-5 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900">Blood Work Results</h3>
                    <p className="text-sm text-gray-500">May 1, 2023 • Lab Results</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded">
                    <FileText className="h-5 w-5 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900">Chest X-Ray Report</h3>
                    <p className="text-sm text-gray-500">April 15, 2023 • Imaging Reports</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded">
                    <FileText className="h-5 w-5 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900">Cardiology Visit Summary</h3>
                    <p className="text-sm text-gray-500">March 22, 2023 • Visit Summaries</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded">
                    <FileText className="h-5 w-5 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900">Prescription - Lisinopril</h3>
                    <p className="text-sm text-gray-500">March 10, 2022 • Prescriptions</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded">
                    <FileText className="h-5 w-5 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900">Annual Physical Results</h3>
                    <p className="text-sm text-gray-500">January 10, 2023 • Visit Summaries</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                Load More Documents
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
