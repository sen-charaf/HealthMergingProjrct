import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Données fictives pour la démonstration
const RECENT_APPOINTMENTS = [
  {
    id: 1,
    patient: "John Doe",
    doctor: "Dr. Sarah Johnson",
    speciality: "Cardiologie",
    date: "15 Juin 2023",
    time: "10:00",
    status: "Confirmé",
  },
  {
    id: 2,
    patient: "Jane Smith",
    doctor: "Dr. Michael Brown",
    speciality: "Neurologie",
    date: "16 Juin 2023",
    time: "11:30",
    status: "En attente",
  },
  {
    id: 3,
    patient: "Robert Johnson",
    doctor: "Dr. Emily Davis",
    speciality: "Pédiatrie",
    date: "17 Juin 2023",
    time: "14:15",
    status: "Confirmé",
  },
  {
    id: 4,
    patient: "Emily Davis",
    doctor: "Dr. James Wilson",
    speciality: "Dermatologie",
    date: "18 Juin 2023",
    time: "09:45",
    status: "Annulé",
  },
];

export function RecentAppointments() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Médecin</TableHead>
          <TableHead>Spécialité</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Heure</TableHead>
          <TableHead>Statut</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {RECENT_APPOINTMENTS.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell className="font-medium">{appointment.patient}</TableCell>
            <TableCell>{appointment.doctor}</TableCell>
            <TableCell>{appointment.speciality}</TableCell>
            <TableCell>{appointment.date}</TableCell>
            <TableCell>{appointment.time}</TableCell>
            <TableCell>
              <Badge
                variant={
                  appointment.status === "Confirmé"
                    ? "default"
                    : appointment.status === "En attente"
                    ? "secondary"
                    : "destructive"
                }
              >
                {appointment.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
