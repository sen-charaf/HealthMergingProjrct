import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { PatientList } from "@/components/patients/patient-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export default function PatientsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Patient Management</h1>
        <Link href="/admin/patients/register">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Register Patient
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Patients</TabsTrigger>
          <TabsTrigger value="inpatient">Inpatients</TabsTrigger>
          <TabsTrigger value="outpatient">Outpatients</TabsTrigger>
          <TabsTrigger value="recent">Recent Visits</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card className="p-4">
            <PatientList />
          </Card>
        </TabsContent>
        <TabsContent value="inpatient">
          <Card className="p-4">
            <PatientList filter="inpatient" />
          </Card>
        </TabsContent>
        <TabsContent value="outpatient">
          <Card className="p-4">
            <PatientList filter="outpatient" />
          </Card>
        </TabsContent>
        <TabsContent value="recent">
          <Card className="p-4">
            <PatientList filter="recent" />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}