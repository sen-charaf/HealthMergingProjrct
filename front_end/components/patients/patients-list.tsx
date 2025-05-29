"use client";

import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Search, 
  Filter, 
  FileText, 
  Edit, 
  Trash, 
  ChevronLeft, 
  ChevronRight,
  Plus
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

interface Patient {
  id: string;
  name: string;
  age: number;
  status: "hospitalized" | "outpatient" | "emergency";
  service: string;
  lastVisit: string;
  priority: "low" | "medium" | "high" | "critical";
}

const patients: Patient[] = [
  {
    id: "P-0001",
    name: "Sophie Martin",
    age: 42,
    status: "hospitalized",
    service: "Cardiologie",
    lastVisit: "12 mai 2025",
    priority: "medium",
  },
  {
    id: "P-0002",
    name: "Thomas Dubois",
    age: 67,
    status: "outpatient",
    service: "Neurologie",
    lastVisit: "5 mai 2025",
    priority: "high",
  },
  {
    id: "P-0003",
    name: "Emma Petit",
    age: 28,
    status: "emergency",
    service: "Traumatologie",
    lastVisit: "Aujourd'hui",
    priority: "critical",
  },
  {
    id: "P-0004",
    name: "Lucas Bernard",
    age: 35,
    status: "hospitalized",
    service: "Pneumologie",
    lastVisit: "10 mai 2025",
    priority: "low",
  },
  {
    id: "P-0005",
    name: "Camille Leroy",
    age: 54,
    status: "outpatient",
    service: "Oncologie",
    lastVisit: "2 mai 2025",
    priority: "medium",
  },
];

export function PatientsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
    const matchesService = serviceFilter === "all" || patient.service === serviceFilter;
    const matchesPriority = priorityFilter === "all" || patient.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesService && matchesPriority;
  });

  const getStatusText = (status: string) => {
    switch (status) {
      case "hospitalized": return "Hospitalisé";
      case "outpatient": return "Patient externe";
      case "emergency": return "Urgence";
      default: return status;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "low": return "Faible";
      case "medium": return "Moyenne";
      case "high": return "Élevée";
      case "critical": return "Critique";
      default: return priority;
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "low": return "secondary";
      case "medium": return "outline";
      case "high": return "default";
      case "critical": return "destructive";
      default: return "outline";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "hospitalized": return "default";
      case "outpatient": return "secondary";
      case "emergency": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un patient..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
           <Link href="/admin/patients/register">Nouveau patient</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Statut</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tous les..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="hospitalized">Hospitalisé</SelectItem>
                <SelectItem value="outpatient">Patient externe</SelectItem>
                <SelectItem value="emergency">Urgence</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Service</label>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tous les..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les services</SelectItem>
                <SelectItem value="Cardiologie">Cardiologie</SelectItem>
                <SelectItem value="Neurologie">Neurologie</SelectItem>
                <SelectItem value="Traumatologie">Traumatologie</SelectItem>
                <SelectItem value="Pneumologie">Pneumologie</SelectItem>
                <SelectItem value="Oncologie">Oncologie</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Priorité</label>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Toutes..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes priorités</SelectItem>
                <SelectItem value="low">Faible</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="high">Élevée</SelectItem>
                <SelectItem value="critical">Critique</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IDENTITÉ</TableHead>
              <TableHead>STATUT</TableHead>
              <TableHead>SERVICE</TableHead>
              <TableHead>DERNIÈRE VISITE</TableHead>
              <TableHead>PRIORITÉ</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  Aucun patient trouvé.
                </TableCell>
              </TableRow>
            ) : (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://api.dicebear.com/7.x/micah/svg?seed=${patient.name}`} alt={patient.name} />
                        <AvatarFallback>{patient.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-sm text-muted-foreground">{patient.age} ans</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(patient.status)}>
                      {getStatusText(patient.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{patient.service}</TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>
                    <Badge variant={getPriorityVariant(patient.priority)}>
                      {getPriorityText(patient.priority)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">Ouvrir le menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          Voir les détails
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier le patient
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="h-4 w-4 mr-2" />
                          Supprimer le patient
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {filteredPatients.length} patient{filteredPatients.length > 1 ? 's' : ''} trouvé{filteredPatients.length > 1 ? 's' : ''}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Précédent
          </Button>
          <Button variant="outline" size="sm">
            Suivant
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}