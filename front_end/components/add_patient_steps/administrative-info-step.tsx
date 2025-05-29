"use client"

import type React from "react"
import { useState } from "react"

import type { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AdministrativeInfoStepProps {
  form: UseFormReturn<any>
  selectedMedecin: string
  setSelectedMedecin: (value: string) => void
  selectedStatus: string
  setSelectedStatus: (value: string) => void
  selectedService: string
  setSelectedService: (value: string) => void
  selectedPriority: string
  setSelectedPriority: (value: string) => void
  SearchableSelect: React.ComponentType<any>
  insurances: Array<{ id: string; name: string; policyNumber: string }>
  setInsurances: (insurances: Array<{ id: string; name: string; policyNumber: string }>) => void
}

const doctors = [
  { id: "1", name: "Dr. Martin Dubois" },
  { id: "2", name: "Dr. Sophie Laurent" },
  { id: "3", name: "Dr. Pierre Moreau" },
]

const statusOptions = [
  { id: "1", name: "Actif" },
  { id: "2", name: "Inactif" },
  { id: "3", name: "En attente" },
  { id: "4", name: "Suspendu" },
]

const serviceOptions = [
  { id: "1", name: "Cardiologie" },
  { id: "2", name: "Neurologie" },
  { id: "3", name: "Orthopédie" },
  { id: "4", name: "Pédiatrie" },
  { id: "5", name: "Urgences" },
  { id: "6", name: "Chirurgie" },
]

const priorityOptions = [
  { id: "1", name: "Faible" },
  { id: "2", name: "Normale" },
  { id: "3", name: "Élevée" },
  { id: "4", name: "Urgente" },
  { id: "5", name: "Critique" },
]

const insuranceOptions = [
  { id: "1", name: "CNSS" },
  { id: "2", name: "CNOPS" },
  { id: "3", name: "RAMED" },
  { id: "4", name: "AMO" },
  { id: "5", name: "Assurance privée" },
  { id: "6", name: "Mutuelle" },
]

export default function AdministrativeInfoStep({
  form,
  selectedMedecin,
  setSelectedMedecin,
  selectedStatus,
  setSelectedStatus,
  selectedService,
  setSelectedService,
  selectedPriority,
  setSelectedPriority,
  SearchableSelect,
  insurances,
  setInsurances,
}: AdministrativeInfoStepProps) {
  const [showInsuranceForm, setShowInsuranceForm] = useState(false)

  const addInsurance = (insuranceId: string, policyNumber: string) => {
    const insurance = insuranceOptions.find((i) => i.id === insuranceId)
    if (insurance && insurances.length < 3) {
      setInsurances([
        ...insurances,
        {
          id: insurance.id,
          name: insurance.name,
          policyNumber,
        },
      ])
      setShowInsuranceForm(false)
    }
  }

  const removeInsurance = (insuranceId: string) => {
    setInsurances(insurances.filter((i) => i.id !== insuranceId))
  }

  const InsuranceForm = () => {
    const [selectedInsurance, setSelectedInsurance] = useState("")
    const [policyNumber, setPolicyNumber] = useState("")

    const handleSubmit = () => {
      if (selectedInsurance && policyNumber.trim()) {
        addInsurance(selectedInsurance, policyNumber.trim())
        setSelectedInsurance("")
        setPolicyNumber("")
      }
    }

    return (
      <Card className="border-blue-200 mt-4">
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-sm text-blue-900">Ajouter une assurance</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-blue-900">Type d'assurance</Label>
              <Select onValueChange={setSelectedInsurance}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Sélectionner une assurance" />
                </SelectTrigger>
                <SelectContent>
                  {insuranceOptions
                    .filter((option) => !insurances.some((ins) => ins.id === option.id))
                    .map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-blue-900">Numéro de police</Label>
              <Input
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
                placeholder="Numéro de police d'assurance"
                className="border-blue-200 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setShowInsuranceForm(false)}>
              Annuler
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedInsurance || !policyNumber.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Ajouter
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-blue-900 text-lg font-medium">Assurances (max 3)</Label>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowInsuranceForm(!showInsuranceForm)}
            disabled={insurances.length >= 3}
            className="border-blue-500 text-blue-600 hover:bg-blue-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une assurance
          </Button>
        </div>

        {showInsuranceForm && <InsuranceForm />}

        {insurances.length > 0 ? (
          <div className="space-y-3">
            {insurances.map((insurance) => (
              <Card key={insurance.id} className="border-blue-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {insurance.name}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        <strong>Numéro de police:</strong> {insurance.policyNumber}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeInsurance(insurance.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">Aucune assurance ajoutée</div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="numero_dossier" className="text-blue-900">
            Numéro de dossier
          </Label>
          <Input
            id="numero_dossier"
            {...form.register("numero_dossier")}
            className="border-blue-200 focus:border-blue-500"
          />
        </div>
        <div>
          <Label className="text-blue-900">Médecin</Label>
          <SearchableSelect
            options={doctors}
            selected={selectedMedecin}
            onSelectionChange={(value: string) => {
              setSelectedMedecin(value)
              form.setValue("medecinId", value)
            }}
            placeholder="Rechercher un médecin"
            searchPlaceholder="Tapez le nom du médecin..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label className="text-blue-900">Statuts</Label>
          <SearchableSelect
            options={statusOptions}
            selected={selectedStatus}
            onSelectionChange={(value: string) => {
              setSelectedStatus(value)
              form.setValue("statuts", value)
            }}
            placeholder="Sélectionner un statut"
            searchPlaceholder="Rechercher un statut..."
          />
        </div>
        <div>
          <Label className="text-blue-900">Service</Label>
          <SearchableSelect
            options={serviceOptions}
            selected={selectedService}
            onSelectionChange={(value: string) => {
              setSelectedService(value)
              form.setValue("service", value)
            }}
            placeholder="Sélectionner un service"
            searchPlaceholder="Rechercher un service..."
          />
        </div>
        <div>
          <Label className="text-blue-900">Priorité</Label>
          <SearchableSelect
            options={priorityOptions}
            selected={selectedPriority}
            onSelectionChange={(value: string) => {
              setSelectedPriority(value)
              form.setValue("priorite", value)
            }}
            placeholder="Sélectionner une priorité"
            searchPlaceholder="Rechercher une priorité..."
          />
        </div>
      </div>

      <div>
        <Label className="text-blue-900">Dernière visite</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal border-blue-200",
                !form.watch("dernier_visite") && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {form.watch("dernier_visite") ? (
                format(form.watch("dernier_visite")!, "dd/MM/yyyy")
              ) : (
                <span>Sélectionner une date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={form.watch("dernier_visite")}
              onSelect={(date) => form.setValue("dernier_visite", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}
