'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

export function TestimonialsSection() {
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
            What Our Users Say
          </h2>
          <p className="text-muted-foreground">
            Hear from patients and doctors who have experienced the benefits of our platform.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="neomorph rounded-xl p-6 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Quote className="h-10 w-10 text-primary/20 absolute -top-2 -left-2" />
              
              <div className="pt-4">
                <p className="text-muted-foreground mb-6">"{testimonial.quote}"</p>
                
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                    />
                  </div>
                  
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                  
                  <div className="ml-auto flex text-accent">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-20 neomorph p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold font-heading mb-4">Join Thousands of Satisfied Users</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-full bg-muted rounded-full h-4 neomorph-inset overflow-hidden">
                    <div className="bg-primary h-4 rounded-full w-[95%]"></div>
                  </div>
                  <span className="ml-4 font-medium text-sm min-w-[60px]">95% Satisfied</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-muted rounded-full h-4 neomorph-inset overflow-hidden">
                    <div className="bg-secondary h-4 rounded-full w-[98%]"></div>
                  </div>
                  <span className="ml-4 font-medium text-sm min-w-[60px]">98% Success</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-muted rounded-full h-4 neomorph-inset overflow-hidden">
                    <div className="bg-accent h-4 rounded-full w-[92%]"></div>
                  </div>
                  <span className="ml-4 font-medium text-sm min-w-[60px]">92% Return</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center neomorph rounded-lg p-4">
                  <p className="text-3xl font-bold font-heading text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote: "The video quality was excellent, and I felt like I was having a face-to-face conversation with my doctor. Saved me so much time!",
    name: "Emma Thompson",
    role: "Patient",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    quote: "As a busy professional, HealthCare has been a game-changer for me. I can consult with specialists without taking time off work.",
    name: "Michael Chen",
    role: "Patient",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    quote: "The platform is intuitive and secure. I can easily manage my appointments and provide quality care to patients remotely.",
    name: "Dr. Sarah Johnson",
    role: "Cardiologist",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
];

const stats = [
  { value: "10K+", label: "Active Patients" },
  { value: "500+", label: "Verified Doctors" },
  { value: "50K+", label: "Consultations" },
  { value: "30+", label: "Specialties" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "24/7", label: "Support" },
];