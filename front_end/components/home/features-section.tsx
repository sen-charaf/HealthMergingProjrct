'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Stethoscope, Video, MessageSquare, FileText, ShieldCheck, Clock } from 'lucide-react';

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading">
            Premium Healthcare Features
          </h2>
          <p className="text-muted-foreground">
            Experience a comprehensive suite of tools designed to provide you with the best telehealth experience.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="neomorph rounded-xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-xl" />
              
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              
              <h3 className="text-xl font-bold font-heading mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Video,
    title: "HD Video Consultations",
    description:
      "Connect with doctors through high-quality, secure video calls with screen sharing capabilities.",
  },
  {
    icon: Stethoscope,
    title: "Verified Specialists",
    description:
      "Access to a network of verified healthcare professionals across multiple specialties.",
  },
  {
    icon: MessageSquare,
    title: "Secure Messaging",
    description:
      "HIPAA-compliant encrypted messaging for confidential communication with your healthcare providers.",
  },
  {
    icon: FileText,
    title: "Digital Prescriptions",
    description:
      "Receive electronic prescriptions and have medications delivered or ready for pickup.",
  },
  {
    icon: ShieldCheck,
    title: "Protected Health Records",
    description:
      "Your medical data is secured with enterprise-grade encryption and follows strict privacy protocols.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description:
      "Book appointments at your convenience with instant confirmation and reminders.",
  },
];