"use client"

import type React from "react"

import type { UseFormReturn } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MedicalInfoStepProps {
  form: UseFormReturn<any>
  selectedTabacStatus: string
  setSelectedTabacStatus: (value: string) => void
  selectedAlcoolConsommation: string
  setSelectedAlcoolConsommation: (value: string) => void
  SearchableSelect: React.ComponentType<any>
}

const tabacStatusOptions = [
  { id: "1", name: "Non-fumeur" },
  { id: "2", name: "Fumeur occasionnel" },
  { id: "3", name: "Fumeur régulier" },
  { id: "4", name: "Ex-fumeur" },
  { id: "5", name: "Fumeur de pipe/cigare" },
]

const alcoolConsommationOptions = [
  { id: "1", name: "Jamais" },
  { id: "2", name: "Occasionnel" },
  { id: "3", name: "Modéré" },
  { id: "4", name: "Régulier" },
  { id: "5", name: "Excessif" },
]

export default function MedicalInfoStep({
  form,
  selectedTabacStatus,
  setSelectedTabacStatus,
  selectedAlcoolConsommation,
  setSelectedAlcoolConsommation,
  SearchableSelect,
}: MedicalInfoStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-blue-900">Groupe sanguin</Label>
          <Select onValueChange={(value) => form.setValue("groupe_sanguin", value)}>
            <SelectTrigger className="border-blue-200">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              {["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"].map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-blue-900">Niveau d'autonomie</Label>
          <Select onValueChange={(value) => form.setValue("niveau_autonomie", value)}>
            <SelectTrigger className="border-blue-200">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Autonome">Autonome</SelectItem>
              <SelectItem value="Partiellement autonome">Partiellement autonome</SelectItem>
              <SelectItem value="Dépendant">Dépendant</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="taille_cm" className="text-blue-900">
            Taille (cm)
          </Label>
          <Input
            id="taille_cm"
            type="number"
            {...form.register("taille_cm", { valueAsNumber: true })}
            className="border-blue-200 focus:border-blue-500"
          />
        </div>
        <div>
          <Label htmlFor="poids_kg" className="text-blue-900">
            Poids (kg)
          </Label>
          <Input
            id="poids_kg"
            type="number"
            step="0.1"
            {...form.register("poids_kg", { valueAsNumber: true })}
            className="border-blue-200 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-blue-900">Statut tabac</Label>
          <SearchableSelect
            options={tabacStatusOptions}
            selected={selectedTabacStatus}
            onSelectionChange={(value: string) => {
              setSelectedTabacStatus(value)
              form.setValue("statut_tabac", value)
            }}
            placeholder="Sélectionner le statut tabac"
            searchPlaceholder="Rechercher un statut..."
          />
        </div>
        <div>
          <Label className="text-blue-900">Consommation d'alcool</Label>
          <SearchableSelect
            options={alcoolConsommationOptions}
            selected={selectedAlcoolConsommation}
            onSelectionChange={(value: string) => {
              setSelectedAlcoolConsommation(value)
              form.setValue("consommation_alcool", value)
            }}
            placeholder="Sélectionner la consommation"
            searchPlaceholder="Rechercher un niveau..."
          />
        </div>
      </div>
    </div>
  )
}
