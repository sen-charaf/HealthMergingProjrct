import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PatientsList } from '@/components/patients/patients-list';
import { PatientRegistrationForm } from '@/components/patients/patient-registration-form';
import { Plus } from 'lucide-react';

export default function PatientsPage() {
  const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Patients', href: '/patients' },
  ];

  return (
    
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Gestion des patients</h2>
            <p className="text-muted-foreground">
              Gestion des dossiers et historique médical
            </p>
          </div>
         
        </div>

        <Tabs defaultValue="list" className="space-y-4">
          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tous les patients</CardTitle>
                <CardDescription>
                  Consulter et gérer tous les patients enregistrés dans le système.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PatientsList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
 
  );
}