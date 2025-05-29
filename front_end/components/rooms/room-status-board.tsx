'use client';

import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Settings, 
  Users, 
  MoreHorizontal,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { rooms, patients } from "@/lib/data";
import { Room } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RoomStatusBoardProps {
  onRoomSelect: (room: Room) => void;
}

export function RoomStatusBoard({ onRoomSelect }: RoomStatusBoardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterFloor, setFilterFloor] = useState<string>("all");

  // Get unique room types, floors
  const roomTypes = Array.from(new Set(rooms.map(room => room.type)));
  const floors = Array.from(new Set(rooms.map(room => room.floor))).sort((a, b) => a - b);

  // Filter rooms based on search and filters
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === "all" || room.type === filterType;
    const matchesStatus = filterStatus === "all" || room.status === filterStatus;
    const matchesFloor = filterFloor === "all" || room.floor.toString() === filterFloor;

    return matchesSearch && matchesType && matchesStatus && matchesFloor;
  });

  // Get patient name for occupied rooms
  const getPatientName = (patientId?: string) => {
    if (!patientId) return "N/A";
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : "Unknown Patient";
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "occupied":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "maintenance":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "reserved":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search rooms..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select 
            defaultValue="all" 
            onValueChange={(value) => setFilterType(value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Room Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {roomTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            defaultValue="all" 
            onValueChange={(value) => setFilterStatus(value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="occupied">Occupied</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="reserved">Reserved</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            defaultValue="all" 
            onValueChange={(value) => setFilterFloor(value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Floor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Floors</SelectItem>
              {floors.map((floor) => (
                <SelectItem key={floor} value={floor.toString()}>
                  Floor {floor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium">Room {room.number}</h3>
                <div className="flex items-center mt-1">
                  <Badge variant="outline">{room.type}</Badge>
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 ${getStatusColor(room.status)}`}
                  >
                    {room.status}
                  </Badge>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onRoomSelect(room)}>
                    Book Room
                  </DropdownMenuItem>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View History</DropdownMenuItem>
                  <DropdownMenuItem>Mark as Maintenance</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex justify-between text-sm">
              <div className="space-y-1">
                <div className="text-muted-foreground">Floor {room.floor}</div>
                <div className="flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span>Capacity: {room.capacity}</span>
                </div>
              </div>

              {room.status === "occupied" && (
                <div className="text-right">
                  <div className="font-medium">Current Patient:</div>
                  <div>{getPatientName(room.currentPatient)}</div>
                </div>
              )}

              {room.status === "maintenance" && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-orange-500">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span>Under maintenance</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Room unavailable until maintenance is complete</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}