'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

export function CtaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -left-40 bottom-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading">
            Ready to Experience Premium Telehealth?
          </h2>
          <p className="text-muted-foreground">
            Join thousands of patients and doctors using our platform for quality healthcare delivery.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`neomorph rounded-xl p-6 ${
                plan.popular ? 'border-2 border-primary relative' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold font-heading mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.interval}</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${plan.popular ? '' : 'bg-secondary hover:bg-secondary/90'}`}
                asChild
              >
                <Link href={plan.href}>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-20 neomorph p-8 rounded-2xl overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-heading">For Healthcare Professionals</h3>
              <p className="text-muted-foreground">
                Join our network of verified specialists and expand your practice through our telehealth platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link href="/doctors/register">
                    Join as a Doctor
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/doctors/info">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              {doctorBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start neomorph p-3 rounded-lg">
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                    <benefit.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{benefit.title}</p>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const plans = [
  {
    name: "Basic",
    description: "Essential telehealth services for individuals",
    price: "19",
    interval: "month",
    href: "/register?plan=basic",
    popular: false,
    features: [
      "Up to 3 consultations per month",
      "Text & video chat with doctors",
      "24/7 chat support",
      "Digital prescriptions",
      "Basic health tracking",
    ],
  },
  {
    name: "Premium",
    description: "Comprehensive care for individuals and families",
    price: "49",
    interval: "month",
    href: "/register?plan=premium",
    popular: true,
    features: [
      "Unlimited consultations",
      "Priority doctor access",
      "Family accounts (up to 4)",
      "Advanced health records",
      "Specialist referrals",
      "Medication management",
      "Premium support",
    ],
  },
  {
    name: "Corporate",
    description: "Healthcare benefits for your employees",
    price: "99",
    interval: "month",
    href: "/register?plan=corporate",
    popular: false,
    features: [
      "All Premium features",
      "Employee management dashboard",
      "Usage analytics and reports",
      "Customizable health programs",
      "Wellness webinars",
      "Dedicated account manager",
      "White-label options",
    ],
  },
];

const doctorBenefits = [
  {
    icon: Calendar,
    title: "Flexible Schedule",
    description: "Manage your availability and work on your own terms",
  },
  {
    icon: Users,
    title: "Expand Your Practice",
    description: "Reach new patients beyond geographical limitations",
  },
  {
    icon: DollarSign,
    title: "Additional Income",
    description: "Create a new revenue stream with competitive compensation",
  },
  {
    icon: Shield,
    title: "Fully Protected",
    description: "Secure platform with malpractice coverage included",
  },
];

import { Calendar, Users, DollarSign, Shield } from 'lucide-react';