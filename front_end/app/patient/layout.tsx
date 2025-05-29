import type React from "react"
import Link from "next/link"
import { Heart, LayoutGrid, FileText, Calendar, Pill, FileIcon, User, Settings, LogOut } from "lucide-react"
import { PatientSideBar } from "@/components/layout/patientSideBar"



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <div className={`min-h-screen bg-gray-50 flex`}>
             {/* Sidebar */}
             <PatientSideBar />
       
             {/* Main Content */}
             <main className="flex-1 overflow-y-auto">{children}</main>
           </div>
  )
}
