import { RoomBookingSystem } from "@/components/rooms/room-booking-system";

export default function RoomsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Room Booking System</h1>
        <p className="text-muted-foreground mt-1">Manage and book hospital rooms</p>
      </div>

      <RoomBookingSystem />
    </div>
  );
}