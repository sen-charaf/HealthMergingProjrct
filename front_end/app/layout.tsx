import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HealthCare - Premium Medical Teleconsultation",
  description:
    "Connect with top healthcare professionals through secure video consultations",
};

// Add this import
import { AuthProvider } from "@/contexts/AuthContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
// const queryClient = new QueryClient();

// Wrap your layout component with AuthProvider
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {/* <QueryClientProvider client={queryClient}> */}
            {children}
          {/* </QueryClientProvider> */}
        </AuthProvider>
      </body>
    </html>
  )
}
