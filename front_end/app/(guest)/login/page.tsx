"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Heart,
  User,
  Stethoscope,
  // PhoneCall,
  // Calendar,
  // Clock,
  // ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import api from "@/api/api";
import PhoneAuth from "@/components/PhoneAuth";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
        userType,
      });

      console.log("Login response:", response.data);

      // Add a small delay to ensure cookies are set before navigation
      setTimeout(() => {
        if (!response.data.user.isVerified) {
          router.replace(`/verify_email?email=${email}`);
        } else if (response.data.user.userType === "patient") {
          router.replace("/patient/dashboard");
        } else if (response.data.user.userType === "doctor") {
          router.replace("/doctor");
        } else {
          // Fallback if userType is unexpected
          console.error("Unknown user type:", response.data.user.userType);
          router.replace("/");
        }
      }, 300);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || "Failed to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneAuthSuccess = (user: any) => {
    // This will be called when phone auth is successful
    console.log("Phone auth successful:", user);
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen px-4 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
        <motion.div
          className="space-y-6 p-8 lg:p-12 neomorph rounded-2xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold font-heading">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 neomorph-inset">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                {/* <PhoneCall className="h-4 w-4" /> */}
                Phone
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-6 pt-4">
              {error && (
                <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        className="pl-10 neomorph-inset"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10 neomorph-inset"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 justify-around py-2">
                    <UserTypeButton
                      icon={User}
                      label="Patient"
                      active={userType === "patient"}
                      onClick={() => setUserType("patient")}
                    />
                    <UserTypeButton
                      icon={Stethoscope}
                      label="Doctor"
                      active={userType === "doctor"}
                      onClick={() => setUserType("doctor")}
                    />
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                      href="/register"
                      className="font-medium text-primary hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="phone" className="space-y-6 pt-4">
              <PhoneAuth onSuccess={handlePhoneAuthSuccess} />
              
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          className="hidden lg:flex items-center justify-center relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-10 rounded-3xl blur-xl -m-4" />
          <div className="neomorph rounded-2xl overflow-hidden relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="space-y-4 max-w-sm">
                <h2 className="text-2xl font-bold font-heading">
                  Premium Healthcare Access
                </h2>
                <p className="text-muted-foreground">
                  Join thousands of patients and doctors using our platform for
                  quality healthcare delivery.
                </p>
                <div className="grid grid-cols-2 gap-3 py-4">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <benefit.icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function UserTypeButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center space-y-2 rounded-lg p-3 transition-all",
        active
          ? "neomorph text-primary"
          : "neomorph-inset text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

const benefits = [
  { icon: PhoneCall, text: "24/7 Support" },
  { icon: Calendar, text: "Easy Scheduling" },
  { icon: Clock, text: "Quick Response" },
  { icon: ShieldCheck, text: "Secure Data" },
];

import { PhoneCall, Calendar, Clock, ShieldCheck } from "lucide-react";

