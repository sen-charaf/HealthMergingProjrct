'use client';

import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Download, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  CreditCard,
  Calendar,
  Filter
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

// Données fictives pour la démonstration
const TRANSACTIONS_DATA = [
  { id: 1, patient: 'John Doe', service: 'Consultation Cardiologie', date: '15 Juin 2023', amount: 120, status: 'Payé' },
  { id: 2, patient: 'Jane Smith', service: 'Consultation Neurologie', date: '16 Juin 2023', amount: 150, status: 'En attente' },
  { id: 3, patient: 'Robert Johnson', service: 'Radiographie', date: '17 Juin 2023', amount: 200, status: 'Payé' },
  { id: 4, patient: 'Emily Davis', service: 'Analyse de sang', date: '18 Juin 2023', amount: 80, status: 'Payé' },
  { id: 5, patient: 'Michael Wilson', service: 'Consultation Psychiatrie', date: '19 Juin 2023', amount: 130, status: 'Remboursé' },
];

// Données pour les graphiques
const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Fév', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Avr', revenue: 2780 },
  { name: 'Mai', revenue: 1890 },
  { name: 'Juin', revenue: 2390 },
  { name: 'Juil', revenue: 3490 },
  { name: 'Août', revenue: 4000 },
  { name: 'Sep', revenue: 2780 },
  { name: 'Oct', revenue: 1890 },
  { name: 'Nov', revenue: 3578 },
  { name: 'Déc', revenue: 5000 },
];

const paymentMethodData = [
  { name: 'Carte de crédit', value: 65 },
  { name: 'Espèces', value: 15 },
  { name: 'Assurance', value: 20 },
];

const COLORS = ['#4F46E5', '#0D9488', '#FF7E00'];

// Fonction pour formater les montants en euros
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

export default function FinancesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTransactions = TRANSACTIONS_DATA.filter(transaction => 
    transaction.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    transaction.service.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calcul des statistiques financières
  const totalRevenue = TRANSACTIONS_DATA.reduce((sum, transaction) => 
    transaction.status !== 'Remboursé' ? sum + transaction.amount : sum, 0
  );
  
  const pendingAmount = TRANSACTIONS_DATA.filter(t => t.status === 'En attente')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const refundedAmount = TRANSACTIONS_DATA.filter(t => t.status === 'Remboursé')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Finances</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" /> Exporter les données
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+12.5% par rapport au mois dernier</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paiements en attente</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(pendingAmount)}</div>
            <div className="flex items-center text-xs text-amber-500 mt-1">
              <Calendar className="mr-1 h-3 w-3" />
              <span>2 paiements en attente</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remboursements</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(refundedAmount)}</div>
            <div className="flex items-center text-xs text-red-500 mt-1">
              <TrendingDown className="mr-1 h-3 w-3" />
              <span>-2.3% par rapport au mois dernier</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="revenus">Revenus</TabsTrigger>
          <TabsTrigger value="rapports">Rapports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des transactions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button variant="outline" className="ml-auto">
              <Filter className="mr-2 h-4 w-4" /> Filtrer
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.patient}</TableCell>
                    <TableCell>{transaction.service}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                    <TableCell>
                      <Badge variant={
                        transaction.status === 'Payé' ? 'default' :
                        transaction.status === 'En attente' ? 'secondary' :
                        'destructive'
                      }>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="revenus" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenus mensuels</CardTitle>
              <CardDescription>Aperçu des revenus pour l'année en cours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}€`} />
                    <Tooltip formatter={(value) => [`${value}€`, 'Revenu']} />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary) / 0.2)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Méthodes de paiement</CardTitle>
                <CardDescription>Répartition des méthodes de paiement utilisées</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={paymentMethodData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {paymentMethodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenus par service</CardTitle>
                <CardDescription>Analyse des revenus par type de service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Données à venir...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="rapports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapports financiers</CardTitle>
              <CardDescription>Générez et téléchargez des rapports financiers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" /> Rapport mensuel (Juin 2023)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" /> Rapport trimestriel (Q2 2023)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" /> Rapport fiscal (2023)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" /> Rapport personnalisé
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}