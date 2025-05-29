"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, FileText, Plus, Edit, Download, Pill } from "lucide-react";
import { useState } from "react";
import { getPatientById, getPatientByName } from "@/utils/patient";

export default function MedicalRecordsPage() {
  const [patient, setPatient] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchType, setSearchType] = useState<"id" | "name">("id");

  const fetchPatientData = async (term: string) => {
    if (!term.trim()) {
      setError("Please enter a patient ID or name");
      return;
    }

    setLoading(true);
    setError("");
    try {
      let data;
      if (searchType === "id") {
        data = await getPatientById(term);
      } else {
        const patients = await getPatientByName(term);
        data = Array.isArray(patients) ? patients[0] : patients;
      }

      if (data) {
        setPatient(data);
      } else {
        setError("Patient not found");
        setPatient({});
      }
    } catch (err) {
      setPatient({});
      setError("Failed to fetch patient data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPatientData(searchTerm);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Medical Records</h1>
          <p className="text-gray-500">View and manage patient medical records</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
            <Download className="h-4 w-4 mr-2" /> Export Records
          </Button>
          <Button className="bg-blue-900 hover:bg-blue-800">
            <Plus className="h-4 w-4 mr-2" /> Create Record
          </Button>
        </div>
      </div>

      <Card className="p-6 mb-6">
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder={`Enter patient ${searchType === "id" ? "ID" : "name"} to search`}
                className="pl-10 bg-white border-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="bg-blue-900 hover:bg-blue-800"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={searchType === "id" ? "default" : "outline"}
              className={searchType === "id" ? "bg-blue-900" : ""}
              onClick={() => setSearchType("id")}
            >
              Search by ID
            </Button>
            <Button
              type="button"
              variant={searchType === "name" ? "default" : "outline"}
              className={searchType === "name" ? "bg-blue-900" : ""}
              onClick={() => setSearchType("name")}
            >
              Search by Name
            </Button>
          </div>
        </form>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </Card>

      {patient?._id ? (
        <div className="grid grid-cols-1 gap-6">
          <Card className="p-6 lg:col-span-1">
            <h2 className="text-lg font-bold text-blue-900 mb-4">Patient Information</h2>
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-20 w-20 mb-3">
                <AvatarFallback className="bg-blue-100 text-blue-900 text-xl">
                  {patient?.user?.firstName?.[0]}{patient?.user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-blue-900 mb-2">
                {patient?.user?.firstName} {patient?.user?.lastName}
              </h3>
              <p className="text-sm text-gray-500">
                {patient?._id} • {patient?.user?.gender || 'Unknown'}, {calculateAge(patient?.user?.dateOfBirth) || 'Unknown'} years
              </p>
              {patient?.conditions?.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {patient.conditions.map((condition: string) => (
                    <Badge key={condition} className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      {condition}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="mt-2 text-sm text-gray-400">No conditions listed</div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                <p className="text-blue-900">{patient?.user?.email || 'Not provided'}</p>
                <p className="text-blue-900">{patient?.user?.phoneNumber || 'Not provided'}</p>
                {patient?.address ? (
                  <p className="text-blue-900">
                    {[patient.address.street, patient.address.city, patient.address.zipCode]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                ) : (
                  <p className="text-blue-900">Address not provided</p>
                )}
              </div>

              {patient?.emergencyContact && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Emergency Contact</h3>
                  <p className="text-blue-900">
                    {patient.emergencyContact.name} ({patient.emergencyContact.relationship})
                  </p>
                  <p className="text-blue-900">{patient.emergencyContact.phoneNumber}</p>
                </div>
              )}

              {patient?.primaryCarePhysician && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Primary Care Physician</h3>
                  <p className="text-blue-900">{patient.primaryCarePhysician}</p>
                </div>
              )}

              {patient?.insurance && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Insurance</h3>
                  <p className="text-blue-900">{patient.insurance.provider}</p>
                  <p className="text-blue-900">Policy #: {patient.insurance.policyNumber}</p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start border-blue-900 text-blue-900 hover:bg-blue-50">
                  <FileText className="h-4 w-4 mr-2" /> View Full History
                </Button>
                <Button variant="outline" className="w-full justify-start border-blue-900 text-blue-900 hover:bg-blue-50">
                  <Edit className="h-4 w-4 mr-2" /> Edit Patient Info
                </Button>
                <Button variant="outline" className="w-full justify-start border-blue-900 text-blue-900 hover:bg-blue-50">
                  <Pill className="h-4 w-4 mr-2" /> Manage Medications
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        !error && !loading && (
          <Card className="p-6 text-center">
            <p className="text-gray-500">Enter a patient {searchType === "id" ? "ID" : "name"} to view their medical records</p>
          </Card>
        )
      )}
    </div>
  );
}

// Helper function to calculate age from date of birth
function calculateAge(dateOfBirth: string): number | null {
  if (!dateOfBirth) return null;
  const dob = new Date(dateOfBirth);
  const diff = Date.now() - dob.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}