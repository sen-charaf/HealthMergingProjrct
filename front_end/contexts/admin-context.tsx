'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  adminData: {
    name: string;
    email: string;
    role: string;
  } | null;
  setAdminData: (data: any) => void;
  clearAdminData: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [adminData, setAdminData] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);

  const clearAdminData = () => {
    setAdminData(null);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin: !!adminData,
        adminData,
        setAdminData,
        clearAdminData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}