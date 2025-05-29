"use client"

import type { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { RefreshCw, Eye, EyeOff } from "lucide-react"

interface ContactAccountStepProps {
  form: UseFormReturn<any>
  showPassword: boolean
  setShowPassword: (show: boolean) => void
  generateCredentials: () => void
}

export default function ContactAccountStep({
  form,
  showPassword,
  setShowPassword,
  generateCredentials,
}: ContactAccountStepProps) {
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
    </div>
  )
}
