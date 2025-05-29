"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, ChevronLeft, CheckCircle, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Schéma du formulaire en français
const formSchema = z.object({
  patientId: z.string().min(1, "L'ID du patient est requis"),
  medication: z.string().min(1, "Le médicament est requis"),
  dosage: z.string().min(1, "Le dosage est requis"),
  frequency: z.string().min(1, "La fréquence est requise"),
  duration: z.string().min(1, "La durée est requise"),
  instructions: z.string().optional(),
  refills: z.string().min(1, "Le nombre de renouvellements est requis"),
});

export default function AddNewPrescriptionsPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: "",
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
      refills: "0",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    router.push("/doctor/prescriptions");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-blue-900">Nouvelle Ordonnance</h1>
            <p className="text-gray-500">Créer une nouvelle ordonnance pour votre patient</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
            <XCircle className="h-4 w-4 mr-2" /> Annuler
          </Button>
          <Button className="bg-blue-900 hover:bg-blue-800" onClick={form.handleSubmit(onSubmit)}>
            <CheckCircle className="h-4 w-4 mr-2" /> Enregistrer
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ID Patient */}
              <FormField
                control={form.control}
                name="patientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Patient</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez l'ID du patient" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Médicament */}
              <FormField
                control={form.control}
                name="medication"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Médicament</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom du médicament" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dosage */}
              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosage</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: 500mg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Fréquence */}
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fréquence</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez la fréquence" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Une fois par jour">Une fois par jour</SelectItem>
                        <SelectItem value="Deux fois par jour">Deux fois par jour</SelectItem>
                        <SelectItem value="Trois fois par jour">Trois fois par jour</SelectItem>
                        <SelectItem value="Quatre fois par jour">Quatre fois par jour</SelectItem>
                        <SelectItem value="Si nécessaire">Si nécessaire</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Durée */}
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Durée</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez la durée" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="7 jours">7 jours</SelectItem>
                        <SelectItem value="14 jours">14 jours</SelectItem>
                        <SelectItem value="30 jours">30 jours</SelectItem>
                        <SelectItem value="60 jours">60 jours</SelectItem>
                        <SelectItem value="90 jours">90 jours</SelectItem>
                        <SelectItem value="Indéfinie">Indéfinie</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Renouvellements */}
              <FormField
                control={form.control}
                name="refills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Renouvellements</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Nombre de renouvellements" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Aucun renouvellement</SelectItem>
                        <SelectItem value="1">1 renouvellement</SelectItem>
                        <SelectItem value="2">2 renouvellements</SelectItem>
                        <SelectItem value="3">3 renouvellements</SelectItem>
                        <SelectItem value="4">4 renouvellements</SelectItem>
                        <SelectItem value="5">5 renouvellements</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Instructions */}
            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions spéciales</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Entrez des instructions spéciales pour le patient"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </Card>
    </div>
  );
}