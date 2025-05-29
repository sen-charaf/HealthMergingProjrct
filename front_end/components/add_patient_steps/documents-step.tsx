"use client"

import type { UseFormReturn, UseFieldArrayReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, FileText } from 'lucide-react'

interface DocumentsStepProps {
  form: UseFormReturn<any>
  documentFields: UseFieldArrayReturn<any, "documents", "id">["fields"]
  appendDocument: UseFieldArrayReturn<any, "documents", "id">["append"]
  removeDocument: UseFieldArrayReturn<any, "documents", "id">["remove"]
  documentFiles: { [key: number]: File | null }
  documentUploadMode: { [key: number]: "file" | "url" }
  handleFileUpload: (index: number, file: File | null) => void
  toggleUploadMode: (index: number) => void
}

const documentTypes = [
  { id: "1", name: "Ordonnance" },
  { id: "2", name: "Résultats d'analyse" },
  { id: "3", name: "Radiographie" },
  { id: "4", name: "Rapport médical" },
  { id: "5", name: "Certificat médical" },
  { id: "6", name: "Carte d'assurance" },
]

export default function DocumentsStep({
  form,
  documentFields,
  appendDocument,
  removeDocument,
  documentFiles,
  documentUploadMode,
  handleFileUpload,
  toggleUploadMode,
}: DocumentsStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-blue-900 mb-2">Documents du patient</h3>
        <p className="text-blue-600">Ajoutez les documents médicaux et administratifs nécessaires</p>
      </div>

      <div className="space-y-4">
        {documentFields.map((field, index) => (
          <div key={field.id} className="border border-blue-100 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-blue-900">Document {index + 1}</h4>
              {documentFields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeDocument(index)}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-blue-900">Type de document</Label>
                <Select onValueChange={(value) => form.setValue(`documents.${index}.document_parametrage_id`, value)}>
                  <SelectTrigger className="border-blue-200">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-blue-900">Nom du fichier</Label>
                <Input
                  {...form.register(`documents.${index}.nom_fichier`)}
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-blue-900">
                    {(documentUploadMode[index] || "url") === "file" ? "Fichier" : "URL"}
                  </Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleUploadMode(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {(documentUploadMode[index] || "url") === "file" ? "Utiliser URL" : "Télécharger fichier"}
                  </Button>
                </div>

                {(documentUploadMode[index] || "url") === "file" ? (
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null
                        handleFileUpload(index, file)
                      }}
                      className="border-blue-200 focus:border-blue-500"
                    />
                    {documentFiles[index] && (
                      <div className="text-sm text-blue-600 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {documentFiles[index]?.name} ({(documentFiles[index]?.size || 0 / 1024 / 1024).toFixed(2)} MB)
                      </div>
                    )}
                  </div>
                ) : (
                  <Input
                    {...form.register(`documents.${index}.url`)}
                    placeholder="https://exemple.com/document.pdf"
                    className="border-blue-200 focus:border-blue-500"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => appendDocument({ document_parametrage_id: "", nom_fichier: "", url: "" })}
          className="border-blue-500 text-blue-600 hover:bg-blue-50 w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un document
        </Button>
      </div>
    </div>
  )
}
