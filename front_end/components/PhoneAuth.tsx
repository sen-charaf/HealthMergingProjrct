// components/PhoneAuth.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import api from "@/api/api";

interface PhoneAuthProps {
  onSuccess?: (user: any) => void;
}

export default function PhoneAuth({ onSuccess }: PhoneAuthProps) {
  const [step, setStep] = useState<'phone' | 'code' | 'register'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();

  // Registration form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState('patient');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendVerificationCode = async () => {
    if (!phoneNumber) {
      setError('Please enter a phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const cleanPhone = phoneNumber.replace(/[^\d]/g, '');
      
      await api.post('/auth/send-phone-verification', {
        phoneNumber: cleanPhone
      });

      setStep('code');
      startCountdown();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!verificationCode) {
      setError('Please enter the verification code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const cleanPhone = phoneNumber.replace(/[^\d]/g, '');
      
      const response = await api.post('/auth/verify-phone-code', {
        phoneNumber: cleanPhone,
        code: verificationCode
      });

      if (response.data.isNewUser) {
        // New user, show registration form
        setStep('register');
      } else {
        // Existing user, login successful
        if (response.data.user.userType === 'patient') {
          router.replace('/patient/dashboard');
        } else if (response.data.user.userType === 'doctor') {
          router.replace('/doctor');
        }
        
        if (onSuccess) {
          onSuccess(response.data.user);
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const completeRegistration = async () => {
    if (!firstName || !lastName || !userType) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const cleanPhone = phoneNumber.replace(/[^\d]/g, '');
      
      const response = await api.post('/auth/register-with-phone', {
        phoneNumber: `+1${cleanPhone}`,
        firstName,
        lastName,
        userType,
        dateOfBirth,
        address
      });

      // Registration successful, redirect based on user type
      if (response.data.user.userType === 'patient') {
        router.replace('/patient/dashboard');
      } else if (response.data.user.userType === 'doctor') {
        router.replace('/doctor');
      }

      if (onSuccess) {
        onSuccess(response.data.user);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    if (countdown > 0) return;
    await sendVerificationCode();
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {step === 'phone' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                +1
              </span>
              <Input
                id="phone"
                placeholder="(555) 555-5555"
                type="tel"
                className="pl-10 neomorph-inset"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                maxLength={14}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              We'll send a verification code to this number
            </p>
          </div>

          <Button 
            className="w-full" 
            size="lg" 
            onClick={sendVerificationCode}
            disabled={loading || !phoneNumber}
          >
            {loading ? 'Sending...' : 'Send Code'}
          </Button>
        </motion.div>
      )}

      {step === 'code' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="text-center space-y-2">
            <Shield className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-lg font-semibold">Enter Verification Code</h3>
            <p className="text-sm text-muted-foreground">
              We sent a 6-digit code to {phoneNumber}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="code" className="sr-only">Verification Code</Label>
            <Input
              id="code"
              placeholder="Enter 6-digit code"
              type="text"
              className="text-center text-2xl font-mono tracking-widest neomorph-inset"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
            />
          </div>

          <Button 
            className="w-full" 
            size="lg" 
            onClick={verifyCode}
            disabled={loading || verificationCode.length !== 6}
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={resendCode}
              disabled={countdown > 0 || loading}
              className="text-sm text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
            >
              {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend code'}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setStep('phone')}
            className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Change phone number
          </button>
        </motion.div>
      )}

      {step === 'register' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Complete Your Profile</h3>
            <p className="text-sm text-muted-foreground">
              Tell us a bit about yourself to get started
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                className="neomorph-inset"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                className="neomorph-inset"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>I am a</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserType('patient')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  userType === 'patient' 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-muted bg-muted/10 text-muted-foreground'
                }`}
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => setUserType('doctor')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  userType === 'doctor' 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-muted bg-muted/10 text-muted-foreground'
                }`}
              >
                Doctor
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth (Optional)</Label>
            <Input
              id="dateOfBirth"
              type="date"
              className="neomorph-inset"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address (Optional)</Label>
            <Input
              id="address"
              className="neomorph-inset"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <Button 
            className="w-full" 
            size="lg" 
            onClick={completeRegistration}
            disabled={loading || !firstName || !lastName}
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </Button>
        </motion.div>
      )}
    </div>
  );
}