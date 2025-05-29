"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, CalendarIcon, FileText } from 'lucide-react'
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { UseFormReturn } from "react-hook-form"

interface MedicalCondition {
  id: string
  name: string
  description: string
  dateAdded: Date
  notes?: string
  documents?: File[]
}

interface MedicalConditionsStepProps {
  form: UseFormReturn<any>
  selectedTabacStatus: string
  setSelectedTabacStatus: (value: string) => void
  selectedAlcoolConsommation: string
  setSelectedAlcoolConsommation: (value: string) => void
  selectedAllergies: MedicalCondition[]
  setSelectedAllergies: (allergies: MedicalCondition[]) => void
  selectedPathologies: MedicalCondition[]
  setSelectedPathologies: (pathologies: MedicalCondition[]) => void
  selectedAntecedents: MedicalCondition[]
  setSelectedAntecedents: (antecedents: MedicalCondition[]) => void
  SearchableSelect: React.ComponentType<any>
  MultiSelectSearch: React.ComponentType<any>
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

const allergiesList = [
  { id: "1", name: "Pénicilline", description: "Antibiotique de la famille des bêta-lactamines" },
  { id: "2", name: "Arachides", description: "Légumineuses pouvant causer des réactions anaphylactiques" },
  { id: "3", name: "Lactose", description: "Sucre présent dans le lait et produits laitiers" },
  { id: "4", name: "Pollen", description: "Particules reproductives des plantes" },
  { id: "5", name: "Fruits de mer", description: "Crustacés, mollusques et autres fruits de mer" },
  { id: "6", name: "Œufs", description: "Protéines d'œuf de poule" },
  { id: "7", name: "Soja", description: "Légumineuse et ses dérivés" },
  { id: "8", name: "Gluten", description: "Protéine présente dans le blé, l'orge et le seigle" },
]

const pathologiesList = [
  { id: "1", name: "Diabète", description: "Trouble métabolique caractérisé par une hyperglycémie chronique" },
  { id: "2", name: "Hypertension", description: "Pression artérielle élevée de façon chronique" },
  { id: "3", name: "Asthme", description: "Maladie inflammatoire chronique des voies respiratoires" },
  { id: "4", name: "Arthrite", description: "Inflammation des articulations" },
  { id: "5", name: "Insuffisance cardiaque", description: "Incapacité du cœur à pomper efficacement le sang" },
  { id: "6", name: "Dépression", description: "Trouble de l'humeur caractérisé par une tristesse persistante" },
  { id: "7", name: "Migraine", description: "Maux de tête récurrents et intenses" },
  { id: "8", name: "Épilepsie", description: "Trouble neurologique caractérisé par des crises récurrentes" },
]

const antecedentsList = [
  { id: "1", name: "Chirurgie cardiaque", description: "Intervention chirurgicale sur le cœur ou les vaisseaux" },
  { id: "2", name: "Fracture", description: "Rupture d'un os due à un traumatisme" },
  { id: "3", name: "Cancer", description: "Maladie caractérisée par une prolifération cellulaire anormale" },
  { id: "4", name: "Accident vasculaire", description: "Interruption de la circulation sanguine dans le cerveau" },
  { id: "5", name: "Transplantation", description: "Greffe d'un organe ou tissu" },
  { id: "6", name: "Intervention chirurgicale", description: "Acte médical invasif à visée thérapeutique" },
  { id: "7", name: "Hospitalisation", description: "Séjour dans un établissement de soins" },
  { id: "8", name: "Traumatisme", description: "Blessure physique ou psychologique" },
]

export default function MedicalConditionsStep({
  form,
  selectedTabacStatus,
  setSelectedTabacStatus,
  selectedAlcoolConsommation,
  setSelectedAlcoolConsommation,
  selectedAllergies,
  setSelectedAllergies,
  selectedPathologies,
  setSelectedPathologies,
  selectedAntecedents,
  setSelectedAntecedents,
  SearchableSelect,
  MultiSelectSearch,
}: MedicalConditionsStepProps) {
  const [showAllergyForm, setShowAllergyForm] = useState(false)
  const [showPathologyForm, setShowPathologyForm] = useState(false)
  const [showAntecedentForm, setShowAntecedentForm] = useState(false)

  const addCondition = (
    type: "allergy" | "pathology" | "antecedent",
    conditionId: string,
    notes?: string,
    date?: Date,
    documents?: File[],
  ) => {
    const sourceList = type === "allergy" ? allergiesList : type === "pathology" ? pathologiesList : antecedentsList

    const condition = sourceList.find((c) => c.id === conditionId)
    if (!condition) return

    const newCondition: MedicalCondition = {
      id: condition.id,
      name: condition.name,
      description: condition.description,
      dateAdded: date || new Date(),
      notes,
      documents: documents || [],
    }

    if (type === "allergy") {
      setSelectedAllergies([...selectedAllergies, newCondition])
    } else if (type === "pathology") {
      setSelectedPathologies([...selectedPathologies, newCondition])
    } else {
      setSelectedAntecedents([...selectedAntecedents, newCondition])
    }
  }

  const removeCondition = (type: "allergy" | "pathology" | "antecedent", conditionId: string) => {
    if (type === "allergy") {
      setSelectedAllergies(selectedAllergies.filter((c) => c.id !== conditionId))
    } else if (type === "pathology") {
      setSelectedPathologies(selectedPathologies.filter((c) => c.id !== conditionId))
    } else {
      setSelectedAntecedents(selectedAntecedents.filter((c) => c.id !== conditionId))
    }
  }

  const ConditionForm = ({
    type,
    onAdd,
    onCancel,
    sourceList,
  }: {
    type: "allergy" | "pathology" | "antecedent"
    onAdd: (conditionId: string, notes?: string, date?: Date, documents?: File[]) => void
    onCancel: () => void
    sourceList: { id: string; name: string; description: string }[]
  }) => {
    const [selectedCondition, setSelectedCondition] = useState("")
    const [notes, setNotes] = useState("")
    const [date, setDate] = useState<Date>(new Date())
    const [documents, setDocuments] = useState<File[]>([])

    const handleFileUpload = (files: FileList | null) => {
      if (files) {
        const newFiles = Array.from(files).slice(0, 5 - documents.length)
        setDocuments([...documents, ...newFiles])
      }
    }

    const removeDocument = (index: number) => {
      setDocuments(documents.filter((_, i) => i !== index))
    }

    const handleSubmit = () => {
      if (selectedCondition) {
        onAdd(selectedCondition, notes || undefined, date, documents)
        setSelectedCondition("")
        setNotes("")
        setDate(new Date())
        setDocuments([])
        onCancel()
      }
    }

    return (
      <Card className="border-blue-200 mt-4">
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-sm text-blue-900">
            Ajouter {type === "allergy" ? "une allergie" : type === "pathology" ? "une pathologie" : "un antécédent"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div>
            <Label className="text-blue-900">Condition</Label>
            <Select onValueChange={setSelectedCondition}>
              <SelectTrigger className="border-blue-200">
                <SelectValue placeholder="Sélectionner une condition" />
              </SelectTrigger>
              <SelectContent>
                {sourceList.map((condition) => (
                  <SelectItem key={condition.id} value={condition.id}>
                    {condition.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {type === "antecedent" && (
            <>
              <div>
                <Label className="text-blue-900">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-blue-200",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "dd/MM/yyyy") : <span>Sélectionner une date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => selectedDate && setDate(selectedDate)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-blue-900">Notes administratives</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ajouter des notes sur cet antécédent..."
                  className="border-blue-200 focus:border-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-blue-900">Documents (max 5)</Label>
                <div className="space-y-2">
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    disabled={documents.length >= 5}
                    className="border-blue-200 focus:border-blue-500"
                  />
                  {documents.length > 0 && (
                    <div className="space-y-2">
                      {documents.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-blue-50 p-2 rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-blue-800">{file.name}</span>
                            <span className="text-xs text-blue-600">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDocument(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedCondition}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Ajouter
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const ConditionList = ({
    conditions,
    type,
    onRemove,
  }: {
    conditions: MedicalCondition[]
    type: "allergy" | "pathology" | "antecedent"
    onRemove: (id: string) => void
  }) => {
    if (conditions.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          Aucune {type === "allergy" ? "allergie" : type === "pathology" ? "pathologie" : "antécédent"} ajoutée
        </div>
      )
    }

    return (
      <div className="space-y-3">
        {conditions.map((condition) => (
          <Card key={condition.id} className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {condition.name}
                    </Badge>
                    <span className="text-xs text-gray-500">Ajouté le {format(condition.dateAdded, "dd/MM/yyyy")}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{condition.description}</p>

                  {condition.notes && (
                    <div className="bg-yellow-50 p-2 rounded border-l-4 border-yellow-400 mb-2">
                      <p className="text-sm text-yellow-800">
                        <strong>Notes:</strong> {condition.notes}
                      </p>
                    </div>
                  )}

                  {condition.documents && condition.documents.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs font-medium text-gray-700 mb-1">Documents attachés:</p>
                      <div className="flex flex-wrap gap-1">
                        {condition.documents.map((doc, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <FileText className="h-3 w-3 mr-1" />
                            {doc.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(condition.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
       {/* Medical Information */}
       <div className="space-y-4">
        <h3 className="text-lg font-medium text-blue-900">Informations médicales de base</h3>
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

      <Separator />
      {/* Allergies */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <Label className="text-blue-900 text-lg font-medium">Allergies</Label>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAllergyForm(!showAllergyForm)}
            className="border-blue-500 text-blue-600 hover:bg-blue-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une allergie
          </Button>
        </div>

        {showAllergyForm && (
          <ConditionForm
            type="allergy"
            onAdd={(conditionId, notes, date, documents) =>
              addCondition("allergy", conditionId, notes, date, documents)
            }
            onCancel={() => setShowAllergyForm(false)}
            sourceList={allergiesList}
          />
        )}

        <ConditionList
          conditions={selectedAllergies}
          type="allergy"
          onRemove={(id) => removeCondition("allergy", id)}
        />
      </div>

      <Separator />

      {/* Pathologies */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <Label className="text-blue-900 text-lg font-medium">Pathologies</Label>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPathologyForm(!showPathologyForm)}
            className="border-blue-500 text-blue-600 hover:bg-blue-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une pathologie
          </Button>
        </div>

        {showPathologyForm && (
          <ConditionForm
            type="pathology"
            onAdd={(conditionId, notes, date, documents) =>
              addCondition("pathology", conditionId, notes, date, documents)
            }
            onCancel={() => setShowPathologyForm(false)}
            sourceList={pathologiesList}
          />
        )}

        <ConditionList
          conditions={selectedPathologies}
          type="pathology"
          onRemove={(id) => removeCondition("pathology", id)}
        />
      </div>

      <Separator />

      {/* Antecedents */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <Label className="text-blue-900 text-lg font-medium">Antécédents</Label>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAntecedentForm(!showAntecedentForm)}
            className="border-blue-500 text-blue-600 hover:bg-blue-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un antécédent
          </Button>
        </div>

        {showAntecedentForm && (
          <ConditionForm
            type="antecedent"
            onAdd={(conditionId, notes, date, documents) =>
              addCondition("antecedent", conditionId, notes, date, documents)
            }
            onCancel={() => setShowAntecedentForm(false)}
            sourceList={antecedentsList}
          />
        )}

        <ConditionList
          conditions={selectedAntecedents}
          type="antecedent"
          onRemove={(id) => removeCondition("antecedent", id)}
        />
      </div>
    </div>
  )
}
