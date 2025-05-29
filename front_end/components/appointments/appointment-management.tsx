'use client';

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentCalendar } from "@/components/appointments/appointment-calendar";
import { AppointmentList } from "@/components/appointments/appointment-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function AppointmentManagement() {
  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <Tabs defaultValue="calendar" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            
            <Link href="/appointments/schedule">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </Link>
          </div>

          <TabsContent value="calendar" className="mt-0">
            <AppointmentCalendar />
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <AppointmentList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}