'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmergencyCaseTracker } from "@/components/emergency/emergency-case-tracker";
import { PriorityQueue } from "@/components/emergency/priority-queue";
import { ResourceAllocation } from "@/components/emergency/resource-allocation";
import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle, Ambulance, Activity, BarChart3, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NewEmergencyCaseForm } from "@/components/emergency/new-emergency-case-form";

export function EmergencyDashboard() {
  const [isNewCaseDialogOpen, setIsNewCaseDialogOpen] = useState(false);

  return (
    <div className="space-y-5">
      {/* Alert banner */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg p-3 flex items-center">
        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3" />
        <div className="flex-1">
          <p className="text-red-800 dark:text-red-300 text-sm font-medium">
            Emergency Department Alert: <span className="font-normal">High capacity (85%) - 2 critical cases in treatment</span>
          </p>
        </div>
        <Button variant="destructive" size="sm" className="ml-4">
          View Alerts
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30">
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm text-red-800 dark:text-red-400 font-medium">Critical Cases</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold text-red-900 dark:text-red-300">2</div>
            <p className="text-xs text-red-700 dark:text-red-400">+1 in last hour</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 waiting assessment</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium">Avg. Wait Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">36 min</div>
            <p className="text-xs text-muted-foreground">-12% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium">Available Beds</CardTitle>
              <Ambulance className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">15% capacity remaining</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <Tabs defaultValue="cases" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="cases">Active Cases</TabsTrigger>
              <TabsTrigger value="queue">Priority Queue</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <Dialog open={isNewCaseDialogOpen} onOpenChange={setIsNewCaseDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  New Emergency Case
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Register New Emergency Case</DialogTitle>
                  <DialogDescription>
                    Enter patient information and emergency details
                  </DialogDescription>
                </DialogHeader>
                <NewEmergencyCaseForm onSuccess={() => setIsNewCaseDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value="cases" className="mt-0">
            <EmergencyCaseTracker />
          </TabsContent>

          <TabsContent value="queue" className="mt-0">
            <PriorityQueue />
          </TabsContent>

          <TabsContent value="resources" className="mt-0">
            <ResourceAllocation />
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Emergency Department Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
                Analytics dashboard coming soon
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}