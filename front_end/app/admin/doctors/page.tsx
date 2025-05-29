import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { DoctorList } from "@/components/doctors/doctor-list";

export default function DoctorsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Doctor Management</h1>
        <Link href="/doctors/register">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Doctor
          </Button>
        </Link>
      </div>

      <DoctorList />
    </div>
  );
}