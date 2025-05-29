'use client';

import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  Shield, 
  Database, 
  Mail, 
  Smartphone, 
  Save 
} from 'lucide-react';

export default function SettingsPage() {
  // États pour les différents formulaires
  const [profileForm, setProfileForm] = useState({
    name: 'Admin Utilisateur',
    email: 'admin@healthcare.com',
    phone: '+33 6 12 34 56 78',
    bio: 'Administrateur principal de la plateforme HealthCare.',
  });
  
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
  });
  
  const [notificationForm, setNotificationForm] = useState({
    emailNotifications: true,
    smsNotifications: false,
    securityAlerts: true,
    marketingEmails: false,
  });
  
  const [appearanceForm, setAppearanceForm] = useState({
    theme: 'system',
    language: 'fr',
    timezone: 'Europe/Paris',
  });
  
  // Gestionnaires d'événements
  const handleProfileChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSecurityChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setSecurityForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToggleChange = (name: string, value: boolean) => {
    setNotificationForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSecurityToggle = (name: string, value: boolean) => {
    setSecurityForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAppearanceChange = (name: string, value: string) => {
    setAppearanceForm(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Paramètres</h1>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" /> Profil
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Lock className="mr-2 h-4 w-4" /> Sécurité
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center">
            <Globe className="mr-2 h-4 w-4" /> Apparence
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center">
            <Database className="mr-2 h-4 w-4" /> Système
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations du profil</CardTitle>
              <CardDescription>
                Mettez à jour vos informations personnelles et de contact.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={profileForm.name} 
                    onChange={handleProfileChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={profileForm.email} 
                    onChange={handleProfileChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={profileForm.phone} 
                    onChange={handleProfileChange} 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    name="bio" 
                    value={profileForm.bio} 
                    onChange={handleProfileChange} 
                    rows={4} 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="flex items-center">
                <Save className="mr-2 h-4 w-4" /> Enregistrer les modifications
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité du compte</CardTitle>
              <CardDescription>
                Gérez votre mot de passe et activez l'authentification à deux facteurs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                  <Input 
                    id="currentPassword" 
                    name="currentPassword" 
                    type="password" 
                    value={securityForm.currentPassword} 
                    onChange={handleSecurityChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input 
                    id="newPassword" 
                    name="newPassword" 
                    type="password" 
                    value={securityForm.newPassword} 
                    onChange={handleSecurityChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type="password" 
                    value={securityForm.confirmPassword} 
                    onChange={handleSecurityChange} 
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="twoFactorEnabled" 
                    checked={securityForm.twoFactorEnabled} 
                    onCheckedChange={(checked) => handleSecurityToggle('twoFactorEnabled', checked)} 
                  />
                  <Label htmlFor="twoFactorEnabled">Activer l'authentification à deux facteurs</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="flex items-center">
                <Shield className="mr-2 h-4 w-4" /> Mettre à jour la sécurité
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Sessions actives</CardTitle>
              <CardDescription>
                Gérez vos sessions actives sur différents appareils.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Smartphone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">iPhone 13 Pro</p>
                      <p className="text-sm text-muted-foreground">Paris, France • Actif maintenant</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Déconnecter</Button>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Chrome sur Windows</p>
                      <p className="text-sm text-muted-foreground">Paris, France • Actif il y a 2 heures</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Déconnecter</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notification</CardTitle>
              <CardDescription>
                Configurez comment et quand vous souhaitez être notifié.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Notifications par email</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevez des notifications par email pour les activités importantes.
                    </p>
                  </div>
                  <Switch 
                    id="emailNotifications" 
                    checked={notificationForm.emailNotifications} 
                    onCheckedChange={(checked) => handleToggleChange('emailNotifications', checked)} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="smsNotifications">Notifications par SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevez des notifications par SMS pour les activités urgentes.
                    </p>
                  </div>
                  <Switch 
                    id="smsNotifications" 
                    checked={notificationForm.smsNotifications} 
                    onCheckedChange={(checked) => handleToggleChange('smsNotifications', checked)} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="securityAlerts">Alertes de sécurité</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevez des alertes concernant les activités suspectes sur votre compte.
                    </p>
                  </div>
                  <Switch 
                    id="securityAlerts" 
                    checked={notificationForm.securityAlerts} 
                    onCheckedChange={(checked) => handleToggleChange('securityAlerts', checked)} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketingEmails">Emails marketing</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevez des emails concernant les nouvelles fonctionnalités et offres.
                    </p>
                  </div>
                  <Switch 
                    id="marketingEmails" 
                    checked={notificationForm.marketingEmails} 
                    onCheckedChange={(checked) => handleToggleChange('marketingEmails', checked)} 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="flex items-center">
                <Bell className="mr-2 h-4 w-4" /> Enregistrer les préférences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Apparence et langue</CardTitle>
              <CardDescription>
                Personnalisez l'apparence et la langue de l'interface.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Thème</Label>
                  <Select 
                    value={appearanceForm.theme} 
                    onValueChange={(value) => handleAppearanceChange('theme', value)}
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Sélectionnez un thème" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Clair</SelectItem>
                      <SelectItem value="dark">Sombre</SelectItem>
                      <SelectItem value="system">Système</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Langue</Label>
                  <Select 
                    value={appearanceForm.language} 
                    onValueChange={(value) => handleAppearanceChange('language', value)}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Sélectionnez une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Select 
                    value={appearanceForm.timezone} 
                    onValueChange={(value) => handleAppearanceChange('timezone', value)}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Sélectionnez un fuseau horaire" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                      <SelectItem value="America/New_York">America/New_York</SelectItem>
                      <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                      <SelectItem value="Australia/Sydney">Australia/Sydney</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="flex items-center">
                <Save className="mr-2 h-4 w-4" /> Enregistrer les préférences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres système</CardTitle>
              <CardDescription>
                Configurez les paramètres système et les options avancées.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mode maintenance</Label>
                    <p className="text-sm text-muted-foreground">
                      Activer le mode maintenance pour effectuer des mises à jour.
                    </p>
                  </div>
                  <Switch id="maintenanceMode" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Journalisation avancée</Label>
                    <p className="text-sm text-muted-foreground">
                      Activer la journalisation détaillée pour le débogage.
                    </p>
                  </div>
                  <Switch id="advancedLogging" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Fréquence de sauvegarde</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="backupFrequency">
                      <SelectValue placeholder="Sélectionnez une fréquence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Toutes les heures</SelectItem>
                      <SelectItem value="daily">Quotidienne</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                      <SelectItem value="monthly">Mensuelle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Réinitialiser les paramètres</Button>
              <Button className="flex items-center">
                <Save className="mr-2 h-4 w-4" /> Enregistrer les paramètres
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-red-200 bg-red-50 dark:bg-red-950/10">
            <CardHeader>
              <CardTitle className="text-red-600">Zone de danger</CardTitle>
              <CardDescription>
                Ces actions sont irréversibles. Procédez avec prudence.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="destructive" className="w-full">Effacer toutes les données</Button>
                <Button variant="destructive" className="w-full">Supprimer le compte administrateur</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}