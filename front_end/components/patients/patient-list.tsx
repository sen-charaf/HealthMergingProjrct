'use client';

import { useState } from "react";
import Link from "next/link";
import { patients } from "@/lib/data";
import { Patient } from "@/lib/types";
import { 
  ArrowUpDown,
  ChevronDown,
  FileText,
  MoreHorizontal,
  Search 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PatientListProps {
  filter?: "inpatient" | "outpatient" | "recent" | undefined;
}

export function PatientList({ filter }: PatientListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<keyof Patient>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filter patients based on search query and tab filter
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (patient.email && patient.email.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!filter) return matchesSearch;

    // Apply tab filters
    switch (filter) {
      case "inpatient":
        // For demo, assume patients with risk score > 0.5 are inpatients
        return matchesSearch && (patient.riskScore || 0) > 0.5;
      case "outpatient":
        // For demo, assume patients with risk score <= 0.5 are outpatients
        return matchesSearch && (patient.riskScore || 0) <= 0.5;
      case "recent":
        // For demo, show patients with visits in the last 30 days
        if (!patient.lastVisit) return false;
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return matchesSearch && new Date(patient.lastVisit) >= thirtyDaysAgo;
      default:
        return matchesSearch;
    }
  });

  // Sort patients
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    // Handle undefined values
    if (aValue === undefined) return sortDirection === "asc" ? -1 : 1;
    if (bValue === undefined) return sortDirection === "asc" ? 1 : -1;

    // Handle string comparison
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    // Handle numeric comparison
    if (
      (typeof aValue === "number" && typeof bValue === "number") ||
      (typeof aValue === "boolean" && typeof bValue === "boolean")
    ) {
      return sortDirection === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    }

    return 0;
  });

  const handleSort = (field: keyof Patient) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Insurance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Insurance</SelectItem>
              <SelectItem value="medicare">Medicare</SelectItem>
              <SelectItem value="medicaid">Medicaid</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="uninsured">Uninsured</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="p-0 font-medium"
                  onClick={() => handleSort("name")}
                >
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">Gender</TableHead>
              <TableHead className="hidden md:table-cell">Date of Birth</TableHead>
              <TableHead className="hidden lg:table-cell">
                <Button
                  variant="ghost"
                  className="p-0 font-medium"
                  onClick={() => handleSort("riskScore")}
                >
                  Risk Score
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="hidden lg:table-cell">Last Visit</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPatients.length > 0 ? (
              sortedPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>
                    <Link
                      href={`/patients/${patient.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {patient.name}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {patient.gender}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {patient.dateOfBirth}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center">
                      <div
                        className={`h-2 w-16 rounded-full ${
                          (patient.riskScore || 0) > 0.7
                            ? "bg-red-500"
                            : (patient.riskScore || 0) > 0.4
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      >
                        <div
                          className="h-full rounded-full bg-foreground/20"
                          style={{
                            width: `${((1 - (patient.riskScore || 0)) * 100).toFixed(0)}%`,
                          }}
                        />
                      </div>
                      <span className="ml-2 text-sm">
                        {(patient.riskScore || 0).toFixed(2)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {patient.lastVisit || "Never"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/patients/${patient.id}`}>View Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/patients/${patient.id}/edit`}>Edit Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/appointments/schedule?patient=${patient.id}`}>
                            Schedule Appointment
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Medical Records</DropdownMenuItem>
                        <DropdownMenuItem>Insurance Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24">
                  No patients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}