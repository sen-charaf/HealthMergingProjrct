
import type React from "react";

import DoctorSidebarClient from "./DoctorSidebarClient";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Client Component */}
      <DoctorSidebarClient />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}