"use client"

import type React from "react"

import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface PersonalInfoStepProps {
  form: UseFormReturn<any>
  profileImage: File | null
  setProfileImage: (file: File | null) => void
}

const identityTypes = [
  { id: "1", name: "Carte d'identité" },
  { id: "2", name: "Passeport" },
  { id: "3", name: "Permis de conduire" },
]

const etatCivilOptions = [
  { id: "celibataire", name: "Célibataire" },
  { id: "marie", name: "Marié(e)" },
  { id: "divorce", name: "Divorcé(e)" },
  { id: "veuf", name: "Veuf/Veuve" },
  { id: "separe", name: "Séparé(e)" },
  { id: "concubinage", name: "Concubinage" },
  { id: "pacs", name: "PACS" },
]

const langueOptions = [
  { id: "francais", name: "Français" },
  { id: "arabe", name: "Arabe" },
  { id: "amazigh", name: "Amazigh" },
  { id: "anglais", name: "Anglais" },
  { id: "espagnol", name: "Espagnol" },
  { id: "allemand", name: "Allemand" },
  { id: "italien", name: "Italien" },
]

export default function PersonalInfoStep({ form, profileImage, setProfileImage }: PersonalInfoStepProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Veuillez sélectionner un fichier image valide")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("La taille du fichier ne doit pas dépasser 5MB")
        return
      }

      setProfileImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setProfileImage(null)
    setImagePreview(null)
    form.setValue("photo_profil", "")
  }
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="prenom" className="text-blue-900">
            Prénom
          </Label>
          <Input id="prenom" {...form.register("prenom")} className="border-blue-200 focus:border-blue-500" />
          {form.formState.errors.prenom && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.prenom?.message?.toString()}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="nom" className="text-blue-900">
            Nom
          </Label>
          <Input id="nom" {...form.register("nom")} className="border-blue-200 focus:border-blue-500" />
          {form.formState.errors.nom && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.nom?.message?.toString()}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-blue-900">Date de naissance</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-blue-200",
                  !form.watch("date_naissance") && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {form.watch("date_naissance") ? (
                  format(form.watch("date_naissance")!, "dd/MM/yyyy")
                ) : (
                  <span>Sélectionner une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={form.watch("date_naissance")}
                onSelect={(date) => form.setValue("date_naissance", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label className="text-blue-900">Sexe</Label>
          <Select onValueChange={(value) => form.setValue("sexe", value)}>
            <SelectTrigger className="border-blue-200">
              <SelectValue placeholder="Sélectionner le sexe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Homme">Homme</SelectItem>
              <SelectItem value="Femme">Femme</SelectItem>
              <SelectItem value="Autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
          <Label className="text-blue-900">État civil</Label>
          <Select onValueChange={(value) => form.setValue("etat_civil", value)}>
            <SelectTrigger className="border-blue-200">
              <SelectValue placeholder="Sélectionner l'état civil" />
            </SelectTrigger>
            <SelectContent>
              {etatCivilOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="profession" className="text-blue-900">
            Profession
          </Label>
          <Input
            id="profession"
            {...form.register("profession")}
            placeholder="Ex: Médecin, Enseignant, Ingénieur..."
            className="border-blue-200 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-blue-900">Langue préférée</Label>
          <Select onValueChange={(value) => form.setValue("langue_preferee", value)}>
            <SelectTrigger className="border-blue-200">
              <SelectValue placeholder="Sélectionner la langue" />
            </SelectTrigger>
            <SelectContent>
              {langueOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-blue-900">Type d'identité</Label>
          <Select onValueChange={(value) => form.setValue("type_identite_id", value)}>
            <SelectTrigger className="border-blue-200">
              <SelectValue placeholder="Sélectionner le type" />
            </SelectTrigger>
            <SelectContent>
              {identityTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
       
      </div>

      <div>
      <Label htmlFor="identifiant" className="text-blue-900">
      Identifiant
        </Label>
        <Input
           id="identifiant"
           {...form.register("identifiant")}
           placeholder="Numéro de la pièce d'identité"
          className="border-blue-200 focus:border-blue-500"
        />
      </div>
      <div>
        <Label className="text-blue-900">Photo de profil</Label>
        <div className="mt-2">
          {imagePreview ? (
            <div className="relative inline-block">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Aperçu de la photo de profil"
                className="w-32 h-32 object-cover rounded-lg border-2 border-blue-200"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={removeImage}
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-blue-400 mb-4" />
              <div className="space-y-2">
                <Label htmlFor="photo-upload" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-800 font-medium">
                    Cliquez pour télécharger une photo
                  </span>
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </Label>
                <p className="text-sm text-gray-500">PNG, JPG, GIF jusqu'à 5MB</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
