"use client";

import React from "react";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Check, User, Phone, FileText, Heart, FolderOpen, Eye } from 'lucide-react'
import { cn } from "@/lib/utils";
import { patientService } from "@/services/patient.service";

// Import step components
import PersonalInfoStep from "@/components/add_patient_steps/personal-info-step";
import ContactEmergencyStep from "@/components/add_patient_steps/contact-emergency-step"
// import ContactAccountStep from "@/components/add_patient_steps/contact-account-step";
// import MedicalInfoStep from "@/components/add_patient_steps/medical-info-step";
import AdministrativeInfoStep from "@/components/add_patient_steps/administrative-info-step";
// import ContactsDocumentsStep from "@/components/add_patient_steps/contacts-documents-step";
import MedicalConditionsStep from "@/components/add_patient_steps/medical-conditions-step";
import DocumentsStep from "@/components/add_patient_steps/documents-step"
import ReviewStep from "@/components/add_patient_steps/review-step";

// Import shared components
import SearchableSelect from "@/components/add_patient_shared/searchable-select";
import MultiSelectSearch from "@/components/add_patient_shared/multi-select-search";

// Development mode flag
// Set this to true for testing
const DEV_MODE = true

// Add the MedicalCondition interface at the top after imports:
interface MedicalCondition {
  id: string
  name: string
  description: string
  dateAdded: Date
  notes?: string
  documents?: File[]
}

// Validation schema
const patientSchema = z.object({
  // Personal Information
  prenom: DEV_MODE ? z.string().optional() : z.string().min(1, "Prénom requis"),
  nom: DEV_MODE ? z.string().optional() : z.string().min(1, "Nom requis"),
  date_naissance: DEV_MODE ? z.date().optional() : z.date({ required_error: "Date de naissance requise" }),
  sexe: DEV_MODE ? z.string().optional() : z.string().min(1, "Sexe requis"),
  etat_civil: z.string().optional(),
  profession: z.string().optional(),
  langue_preferee: z.string().optional(),
  type_identite_id: DEV_MODE ? z.string().optional() : z.string().min(1, "Type d'identité requis"),
  identifiant: DEV_MODE ? z.string().optional() : z.string().min(1, "Identifiant requis"),
  photo_profil: z.string().optional(),

  // Contact Information
  telephone: DEV_MODE ? z.string().optional() : z.string().min(1, "Téléphone requis"),
  email: DEV_MODE ? z.string().optional() : z.string().email("Email invalide"),
  adresse: z.string().optional(),

  // Account
  nom_utilisateur: DEV_MODE ? z.string().optional() : z.string().min(3, "Nom d'utilisateur requis (min 3 caractères)"),
  mot_de_passe: DEV_MODE ? z.string().optional() : z.string().min(6, "Mot de passe requis (min 6 caractères)"),

  // Medical Information
  groupe_sanguin: z.string().optional(),
  niveau_autonomie: z.string().optional(),
  taille_cm: z.number().optional(),
  poids_kg: z.number().optional(),
  statut_tabac: z.string().optional(),
  consommation_alcool: z.string().optional(),

  // Administrative Information
  assurance: z.string().optional(),
  numero_police: z.string().optional(),
  numero_dossier: z.string().optional(),
  medecinId: z.string().optional(),
  statuts: z.string().optional(),
  service: z.string().optional(),
  priorite: z.string().optional(),
  dernier_visite: z.date().optional(),

  // Dynamic lists
  emergency_contacts: z
    .array(
      z.object({
        nom_complet: z.string().min(1, "Nom complet requis"),
        relation: z.string().min(1, "Relation requise"),
        telephone: z.string().min(1, "Téléphone requis"),
      }),
    )
    .optional(),

  documents: z
    .array(
      z.object({
        document_parametrage_id: z.string().min(1, "Type de document requis"),
        nom_fichier: z.string().min(1, "Nom de fichier requis"),
        url: z.string().url("URL invalide"),
      }),
    )
    .optional(),

  // Medical conditions
  allergies: z.array(z.string()).optional(),
  pathologies: z.array(z.string()).optional(),
  antecedents: z.array(z.string()).optional(),
})

type PatientFormData = z.infer<typeof patientSchema>

const steps = [
  { id: 1, title: "Informations personnelles", icon: User },
  { id: 2, title: "Contact & Urgence", icon: Phone },
  { id: 3, title: "Informations administratives", icon: FileText },
  { id: 4, title: "Médical & Conditions", icon: Heart },
  { id: 5, title: "Documents", icon: FolderOpen },
  { id: 6, title: "Révision & Envoi", icon: Eye },
]

export default function PatientForm() {
  const [currentStep, setCurrentStep] = useState(1)
  // Replace the medical condition state declarations with:
  const [selectedAllergies, setSelectedAllergies] = useState<MedicalCondition[]>([])
  const [selectedPathologies, setSelectedPathologies] = useState<MedicalCondition[]>([])
  const [selectedAntecedents, setSelectedAntecedents] = useState<MedicalCondition[]>([])
  const [selectedMedecin, setSelectedMedecin] = useState<string>("")
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedPriority, setSelectedPriority] = useState<string>("")
  const [consentAccepted, setConsentAccepted] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [selectedTabacStatus, setSelectedTabacStatus] = useState<string>("")
  const [selectedAlcoolConsommation, setSelectedAlcoolConsommation] = useState<string>("")
  const [documentFiles, setDocumentFiles] = useState<{ [key: number]: File | null }>({})
  const [documentUploadMode, setDocumentUploadMode] = useState<{ [key: number]: "file" | "url" }>({})
  const [insurances, setInsurances] = useState<Array<{ id: string; name: string; policyNumber: string }>>([])
  const [profileImage, setProfileImage] = useState<File | null>(null)

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      // Personal Information
      prenom: "John",
      nom: "Doe",
      date_naissance: new Date("1990-01-01"),
      sexe: "M",
      etat_civil: "Célibataire",
      profession: "Ingénieur",
      langue_preferee: "Français",
      type_identite_id: "1",
      identifiant: "ID123456",
      photo_profil: "",

      // Contact Information
      telephone: "+33123456789",
      email: "john.doe@example.com",
      adresse: "123 Rue de la Paix, Paris",

      // Account
      nom_utilisateur: "johndoe",
      mot_de_passe: "password123",

      // Medical Information
      groupe_sanguin: "A+",
      niveau_autonomie: "Autonome",
      taille_cm: 175,
      poids_kg: 70,
      statut_tabac: "Non-fumeur",
      consommation_alcool: "Occasionnel",

      // Administrative Information
      assurance: "AXA",
      numero_police: "POL123456",
      numero_dossier: "DOS789",
      medecinId: "1",
      statuts: "Actif",
      service: "Médecine générale",
      priorite: "Normal",
      dernier_visite: new Date("2023-12-01"),

      // Emergency Contacts
      emergency_contacts: [
        {
          nom_complet: "Jane Doe",
          relation: "Épouse",
          telephone: "+33987654321"
        }
      ],

      // Documents
      documents: [
        {
          document_parametrage_id: "1",
          nom_fichier: "carte_vitale.pdf",
          url: "https://example.com/documents/carte_vitale.pdf"
        }
      ],

      // Medical conditions
      allergies: ["Pénicilline", "Pollen"],
      pathologies: ["Asthme", "Hypertension"],
      antecedents: ["Appendicectomie", "Fracture du bras"]
    },
  })

  const {
    fields: emergencyFields,
    append: appendEmergency,
    remove: removeEmergency,
  } = useFieldArray({
    control: form.control,
    name: "emergency_contacts",
  })

  const {
    fields: documentFields,
    append: appendDocument,
    remove: removeDocument,
  } = useFieldArray({
    control: form.control,
    name: "documents",
  })

  const generateCredentials = () => {
    const randomUsername = `user_${Math.random().toString(36).substring(2, 8)}`
    const randomPassword = Math.random().toString(36).substring(2, 10)

    form.setValue("nom_utilisateur", randomUsername)
    form.setValue("mot_de_passe", randomPassword)
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFileUpload = (index: number, file: File | null) => {
    setDocumentFiles((prev) => ({ ...prev, [index]: file }))
    if (file) {
      form.setValue(`documents.${index}.nom_fichier`, file.name)
      form.setValue(`documents.${index}.url`, URL.createObjectURL(file))
    }
  }

  const toggleUploadMode = (index: number) => {
    const currentMode = documentUploadMode[index] || "url"
    const newMode = currentMode === "url" ? "file" : "url"
    setDocumentUploadMode((prev) => ({ ...prev, [index]: newMode }))

    // Clear the fields when switching modes
    if (newMode === "file") {
      form.setValue(`documents.${index}.url`, "")
    } else {
      setDocumentFiles((prev) => ({ ...prev, [index]: null }))
      form.setValue(`documents.${index}.nom_fichier`, "")
    }
  }

  const onSubmit = async (data: PatientFormData) => {
    // Create FormData for file uploads
    const formData = new FormData()

    // Add profile image if exists
    if (profileImage) {
      formData.append("profileImage", profileImage)
    }
    // Format the data to match the backend DTO structure
    const finalData = {
      // Basic Info
      prenom: data.prenom || "",
      nom: data.nom || "",
      date_naissance: data.date_naissance || new Date(),
      sexe: data.sexe || "",
      type_identifiant: data.type_identite_id || "",
      identifiant: data.identifiant || "",
      photo_profil: data.photo_profil || undefined, // Changed null to undefined
      
      // Contact information
      telephone: data.telephone || "",
      email: data.email || "",
      adresse: data.adresse || undefined, // Changed null to undefined
      
      // Medical information
      groupe_sanguin: data.groupe_sanguin || undefined,
      niveau_autonomie: data.niveau_autonomie || undefined,
      taille_cm: data.taille_cm || undefined,
      poids_kg: data.poids_kg || undefined,
      statut_tabac: selectedTabacStatus || undefined,
      consommation_alcool: selectedAlcoolConsommation || undefined,
      
      // Administrative information
      medecinId: selectedMedecin ? parseInt(selectedMedecin) : undefined,
      statuts: selectedStatus || undefined,
      service: selectedService || undefined,
      priorite: selectedPriority || undefined,
      dernier_visite: data.dernier_visite || undefined,
      
      // Credentials
      credentials: {
        nom_utilisateur: data.nom_utilisateur || "",
        mot_de_passe: data.mot_de_passe || ""
      },
      
      // Related entities
      contacts_urgence: data.emergency_contacts?.map(contact => ({
        nom_complet: contact.nom_complet || "",
        relation: contact.relation || "",
        telephone: contact.telephone || ""
      })) || [],
      
      documents_patient: data.documents?.map(doc => ({
        nom_fichier: doc.nom_fichier || "",
        url: doc.url || "",
        type: doc.document_parametrage_id || ""
      })) || [],
      
      allergies: selectedAllergies.map(a => a.name),
      pathologies: selectedPathologies.map(p => p.name),
      
      antecedents: selectedAntecedents.map(a => ({
        antecedent: a.name,
        description: a.description || undefined,
        specialty: undefined,
        antecedant_date: a.dateAdded
      })),
      
      assurances: data.assurance && data.numero_police ? [{
        assurance: data.assurance,
        numero_police: data.numero_police
      }] : []
    }

     // Add JSON data to FormData
     formData.append("patientData", JSON.stringify(finalData))

     // Add document files
     Object.entries(documentFiles).forEach(([index, file]) => {
       if (file) {
         formData.append(`document_${index}`, file)
       }
     })
 

    try {
      // Create the patient data first
      const response = await patientService.createPatient(finalData);
      
      // If you need to upload files separately, create a new method for that
      if (Object.entries(documentFiles).length > 0) {
        const formData = new FormData();
        formData.append("patientId", response.id.toString());
        
        Object.entries(documentFiles).forEach(([index, file]) => {
          if (file) {
            formData.append(`document_${index}`, file);
          }
        });
        
        // Create a new method in patientService for uploading documents
        await patientService.uploadPatientDocuments(response.id, formData);
      }
      
      alert("Patient créé avec succès!")
      // Reset form and state as before
      form.reset()
      setCurrentStep(1)
      setSelectedAllergies([])
      setSelectedPathologies([])
      setSelectedAntecedents([])
      setSelectedMedecin("")
      setSelectedStatus("")
      setSelectedService("")
      setSelectedPriority("")
      setConsentAccepted(false)
      setShowPassword(false)
      setSelectedTabacStatus("")
      setSelectedAlcoolConsommation("")
      setDocumentFiles({})
      setDocumentUploadMode({})
      setInsurances([])
      setProfileImage(null)
    } catch (error) {
      console.error("Erreur:", error)
      alert("Erreur lors de la création du patient")
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep form={form} profileImage={profileImage} setProfileImage={setProfileImage} />

      case 2:
        return (
          <ContactEmergencyStep
            form={form}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            generateCredentials={generateCredentials}
            emergencyFields={emergencyFields}
            appendEmergency={appendEmergency}
            removeEmergency={removeEmergency}
          />
        )

      case 3:
        return (
          <AdministrativeInfoStep
            form={form}
            selectedMedecin={selectedMedecin}
            setSelectedMedecin={setSelectedMedecin}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
            SearchableSelect={SearchableSelect}
            insurances={insurances}
            setInsurances={setInsurances}
          />
        )

        case 4:
          return (
            <MedicalConditionsStep
              form={form}
              selectedTabacStatus={selectedTabacStatus}
              setSelectedTabacStatus={setSelectedTabacStatus}
              selectedAlcoolConsommation={selectedAlcoolConsommation}
              setSelectedAlcoolConsommation={setSelectedAlcoolConsommation}
              selectedAllergies={selectedAllergies}
              setSelectedAllergies={setSelectedAllergies}
              selectedPathologies={selectedPathologies}
              setSelectedPathologies={setSelectedPathologies}
              selectedAntecedents={selectedAntecedents}
              setSelectedAntecedents={setSelectedAntecedents}
              SearchableSelect={SearchableSelect}
              MultiSelectSearch={MultiSelectSearch}
            />
          )

      case 5:
        return (
          <DocumentsStep
            form={form}
            documentFields={documentFields}
            appendDocument={appendDocument}
            removeDocument={removeDocument}
            documentFiles={documentFiles}
            documentUploadMode={documentUploadMode}
            handleFileUpload={handleFileUpload}
            toggleUploadMode={toggleUploadMode}
          />
        )

      case 6:
        return (
          <ReviewStep
            form={form}
            selectedAllergies={selectedAllergies}
            selectedPathologies={selectedPathologies}
            selectedAntecedents={selectedAntecedents}
            selectedMedecin={selectedMedecin}
            selectedStatus={selectedStatus}
            selectedService={selectedService}
            selectedPriority={selectedPriority}
            selectedTabacStatus={selectedTabacStatus}
            selectedAlcoolConsommation={selectedAlcoolConsommation}
            consentAccepted={consentAccepted}
            setConsentAccepted={setConsentAccepted}
            insurances={insurances}
            profileImage={profileImage}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Création d'un nouveau patient</h1>
          <p className="text-blue-600">Suivez les étapes pour compléter le dossier patient</p>
          {DEV_MODE && (
            <Badge variant="outline" className="mt-2 border-orange-500 text-orange-600">
              Mode développement - Validation désactivée
            </Badge>
          )}
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors",
                    currentStep === step.id
                      ? "bg-blue-600 text-white border-blue-600"
                      : currentStep > step.id
                        ? "bg-blue-100 text-blue-600 border-blue-600"
                        : "bg-gray-100 text-gray-400 border-gray-300",
                  )}
                >
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 text-center max-w-20",
                    currentStep === step.id ? "text-blue-600 font-medium" : "text-gray-500",
                  )}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Step Content */}
          <Card className="border-blue-200 min-h-96">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center gap-2 text-blue-900">
                {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5" })}
                {steps[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">{renderStepContent()}</CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Précédent
            </Button>

            {currentStep === steps.length ? (
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                disabled={form.formState.isSubmitting || !consentAccepted}
              >
                {form.formState.isSubmitting ? "Création en cours..." : "Créer le patient"}
              </Button>
            ) : (
              <Button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white">
                Suivant
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}