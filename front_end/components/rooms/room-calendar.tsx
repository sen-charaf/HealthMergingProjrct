'use client';

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Room } from "@/lib/types";
import { rooms } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { addDays, format, isToday, startOfToday } from "date-fns";

interface RoomCalendarProps {
  onRoomSelect: (room: Room) => void;
}

interface TimeSlot {
  time: string;
  isAvailable: boolean;
  booking?: {
    purpose: string;
    patient?: string;
    doctor?: string;
  };
}

export function RoomCalendar({ onRoomSelect }: RoomCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedRoom, setSelectedRoom] = useState<string>(rooms[0]?.id || "");

  // Mock time slots data (would typically come from API)
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startHour = 8; // 8 AM
    const endHour = 20; // 8 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      // Generate 30 minute slots
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Randomly determine if slot is available (for demo purposes)
        const randomAvailability = Math.random() > 0.3;
        const isAvailable = 
          (isToday(selectedDate) && hour > new Date().getHours()) || 
          !isToday(selectedDate) ? 
          randomAvailability : false;
        
        const slot: TimeSlot = {
          time,
          isAvailable,
        };
        
        // Add booking info for unavailable slots
        if (!isAvailable) {
          slot.booking = {
            purpose: ["Consultation", "Surgery", "Examination", "Recovery", "Procedure"][Math.floor(Math.random() * 5)],
            patient: Math.random() > 0.3 ? `Patient #${Math.floor(Math.random() * 1000)}` : undefined,
            doctor: Math.random() > 0.5 ? `Dr. ${["Smith", "Johnson", "Lee", "Garcia", "Chen"][Math.floor(Math.random() * 5)]}` : undefined,
          };
        }
        
        slots.push(slot);
      }
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();
  const room = rooms.find(r => r.id === selectedRoom);

  const handleBookSlot = (timeSlot: TimeSlot) => {
    if (room && timeSlot.isAvailable) {
      onRoomSelect(room);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Select Room</label>
          <Select
            value={selectedRoom}
            onValueChange={setSelectedRoom}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a room" />
            </SelectTrigger>
            <SelectContent>
              {rooms.map((room) => (
                <SelectItem key={room.id} value={room.id}>
                  Room {room.number} ({room.type})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Select Date</label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => setSelectedDate(date || new Date())}
            disabled={(date) => date < startOfToday() || date > addDays(new Date(), 30)}
            className="border rounded-md p-3"
          />
        </div>

        {room && (
          <div className="border rounded-md p-4 space-y-2">
            <h3 className="font-medium">Room {room.number} Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Type:</div>
              <div>{room.type}</div>
              <div className="text-muted-foreground">Floor:</div>
              <div>{room.floor}</div>
              <div className="text-muted-foreground">Capacity:</div>
              <div>{room.capacity}</div>
              <div className="text-muted-foreground">Status:</div>
              <div>
                <Badge 
                  variant="secondary" 
                  className={
                    room.status === "available" ? "bg-green-100 text-green-800" :
                    room.status === "occupied" ? "bg-blue-100 text-blue-800" :
                    room.status === "maintenance" ? "bg-orange-100 text-orange-800" :
                    "bg-purple-100 text-purple-800"
                  }
                >
                  {room.status}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="md:col-span-2 border rounded-md overflow-hidden">
        <div className="bg-muted p-3 border-b">
          <h3 className="font-medium">
            {room ? `Room ${room.number} Availability` : "Select a room"} - {format(selectedDate, "MMMM d, yyyy")}
          </h3>
        </div>
        
        <div className="h-[480px] overflow-y-auto p-4">
          {room ? (
            <div className="space-y-2">
              {timeSlots.map((slot, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-md flex justify-between items-center ${
                    slot.isAvailable 
                      ? "bg-green-50 hover:bg-green-100 dark:bg-green-900/10 dark:hover:bg-green-900/20 cursor-pointer" 
                      : "bg-muted"
                  }`}
                  onClick={() => handleBookSlot(slot)}
                >
                  <div className="flex items-center">
                    <span className="font-medium">{slot.time}</span>
                    {!slot.isAvailable && slot.booking && (
                      <Badge variant="outline" className="ml-3">
                        {slot.booking.purpose}
                      </Badge>
                    )}
                  </div>
                  
                  {slot.isAvailable ? (
                    <Button size="sm" variant="outline" className="h-7">
                      Book
                    </Button>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      {slot.booking?.patient || "Unavailable"}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Please select a room to view availability
            </div>
          )}
        </div>
      </div>
    </div>
  );
}