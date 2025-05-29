"use client"

import type { UseFormReturn, UseFieldArrayReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { RefreshCw, Eye, EyeOff, Plus, Trash2 } from 'lucide-react'

interface ContactEmergencyStepProps {
  form: UseFormReturn<any>
  showPassword: boolean
  setShowPassword: (show: boolean) => void
  generateCredentials: () => void
  emergencyFields: UseFieldArrayReturn<any, "emergency_contacts", "id">["fields"]
  appendEmergency: UseFieldArrayReturn<any, "emergency_contacts", "id">["append"]
  removeEmergency: UseFieldArrayReturn<any, "emergency_contacts", "id">["remove"]
}

export default function ContactEmergencyStep({
  form,
  showPassword,
  setShowPassword,
  generateCredentials,
  emergencyFields,
  appendEmergency,
  removeEmergency,
}: ContactEmergencyStepProps) {
  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-blue-900">Informations de contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="telephone" className="text-blue-900">
              Téléphone
            </Label>
            <Input id="telephone" {...form.register("telephone")} className="border-blue-200 focus:border-blue-500" />
          </div>
          <div>
            <Label htmlFor="email" className="text-blue-900">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              className="border-blue-200 focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="adresse" className="text-blue-900">
            Adresse
          </Label>
          <Textarea
            id="adresse"
            {...form.register("adresse")}
            className="border-blue-200 focus:border-blue-500"
            rows={3}
          />
        </div>
      </div>

      <Separator />

      {/* Account Information */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-blue-900">Compte utilisateur</h3>
          <Button
            type="button"
            variant="outline"
            onClick={generateCredentials}
            className="border-blue-500 text-blue-600 hover:bg-blue-50"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Générer automatiquement
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nom_utilisateur" className="text-blue-900">
              Nom d'utilisateur
            </Label>
            <Input
              id="nom_utilisateur"
              {...form.register("nom_utilisateur")}
              className="border-blue-200 focus:border-blue-500"
            />
          </div>
          <div>
            <Label htmlFor="mot_de_passe" className="text-blue-900">
              Mot de passe
            </Label>
            <div className="relative">
              <Input
                id="mot_de_passe"
                type={showPassword ? "text" : "password"}
                {...form.register("mot_de_passe")}
                className="border-blue-200 focus:border-blue-500 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Emergency Contacts */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-blue-900">Contacts d'urgence</h3>
        {emergencyFields.map((field, index) => (
          <div key={field.id} className="border border-blue-100 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-blue-900">Contact {index + 1}</h4>
              {emergencyFields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeEmergency(index)}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-blue-900">Nom complet</Label>
                <Input
                  {...form.register(`emergency_contacts.${index}.nom_complet`)}
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>
              <div>
                <Label className="text-blue-900">Relation</Label>
                <Input
                  {...form.register(`emergency_contacts.${index}.relation`)}
                  placeholder="Époux, Parent, Ami..."
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>
              <div>
                <Label className="text-blue-900">Téléphone</Label>
                <Input
                  {...form.register(`emergency_contacts.${index}.telephone`)}
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => appendEmergency({ nom_complet: "", relation: "", telephone: "" })}
          className="border-blue-500 text-blue-600 hover:bg-blue-50"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un contact
        </Button>
      </div>
    </div>
  )
}
