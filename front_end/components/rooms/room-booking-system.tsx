'use client';

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoomCalendar } from "@/components/rooms/room-calendar";
import { RoomStatusBoard } from "@/components/rooms/room-status-board";
import { RoomBookingForm } from "@/components/rooms/room-booking-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { rooms } from "@/lib/data";
import { Room } from "@/lib/types";

export function RoomBookingSystem() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Stats for room overview
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(room => room.status === 'available').length;
  const occupiedRooms = rooms.filter(room => room.status === 'occupied').length;
  const maintenanceRooms = rooms.filter(room => room.status === 'maintenance').length;
  const reservedRooms = rooms.filter(room => room.status === 'reserved').length;

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardDescription>Total Rooms</CardDescription>
            <CardTitle className="text-2xl">{totalRooms}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardDescription>Available</CardDescription>
            <CardTitle className="text-2xl text-green-500">{availableRooms}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardDescription>Occupied</CardDescription>
            <CardTitle className="text-2xl text-blue-500">{occupiedRooms}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardDescription>Maintenance</CardDescription>
            <CardTitle className="text-2xl text-orange-500">{maintenanceRooms}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardDescription>Reserved</CardDescription>
            <CardTitle className="text-2xl text-purple-500">{reservedRooms}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="status">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="status">Status Board</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Book Room
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Book a Room</DialogTitle>
                <DialogDescription>
                  {selectedRoom ? (
                    <div className="flex items-center mt-1">
                      <span>Room {selectedRoom.number}</span>
                      <Badge className="ml-2" variant="outline">
                        {selectedRoom.type}
                      </Badge>
                    </div>
                  ) : (
                    "Select a room and time slot for booking."
                  )}
                </DialogDescription>
              </DialogHeader>
              <RoomBookingForm
                selectedRoom={selectedRoom}
                onBookingComplete={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>Room Status</CardTitle>
              <CardDescription>
                Current status of all hospital rooms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RoomStatusBoard onRoomSelect={handleRoomSelect} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Room Booking Calendar</CardTitle>
              <CardDescription>
                View and manage room bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RoomCalendar onRoomSelect={handleRoomSelect} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}