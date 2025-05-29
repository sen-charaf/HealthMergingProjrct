"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Search, Calendar, Video, FileText } from "lucide-react";

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-muted/50 relative">
      <div className="wave-separator absolute top-0 left-0 right-0 transform rotate-180"></div>
      <div className="wave-separator absolute bottom-0 left-0 right-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading">
            How It Works
          </h2>
          <p className="text-muted-foreground">
            Getting quality healthcare has never been easier. Follow these
            simple steps to connect with a doctor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative z-10 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="neomorph rounded-full h-16 w-16 flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 opacity-50" />
                <span className="text-xl font-bold font-heading">
                  {index + 1}
                </span>
              </div>

              <div className="neomorph rounded-xl p-6 space-y-4 h-full">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="text-lg font-bold font-heading">{step.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 neomorph p-6 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
            <div className="lg:col-span-2 space-y-4 text-center lg:text-left">
              <h3 className="text-2xl font-bold font-heading">
                Watch How It Works
              </h3>
              <p className="text-muted-foreground">
                See our platform in action and learn how easy it is to connect
                with healthcare professionals.
              </p>
            </div>

            <div className="lg:col-span-3 relative aspect-video rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center neomorph-inset">
                <Image
                  src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg"
                  alt="Doctor having a video consultation"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center pulse cursor-pointer">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const steps = [
  {
    icon: Search,
    title: "Find a Specialist",
    description:
      "Search and filter through our network of qualified doctors based on speciality, availability, and ratings.",
  },
  {
    icon: Calendar,
    title: "Book Appointment",
    description:
      "Select a convenient time slot from the doctor's schedule and book your virtual consultation.",
  },
  {
    icon: Video,
    title: "Virtual Consultation",
    description:
      "Connect with your doctor through our secure HD video platform for a professional consultation.",
  },
  {
    icon: FileText,
    title: "Follow-up Care",
    description:
      "Receive prescriptions, treatment plans, and schedule follow-up appointments as needed.",
  },
];
