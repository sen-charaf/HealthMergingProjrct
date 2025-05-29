'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, PhoneCall, Calendar, Clock, ShieldCheck } from 'lucide-react';

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.1}px)`,
  };

  return (
    <section className="relative pt-28 pb-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -right-40 top-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -left-40 top-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute right-20 bottom-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="px-3 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded-full">Premium Healthcare Anywhere</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Virtual Healthcare For You
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Connect with certified medical professionals through secure video consultations. Quality healthcare from the comfort of your home.
              </p>
            </motion.div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg" className="group" asChild>
                <Link href="/book">
                  Book an Appointment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/find-doctor">
                  Find a Doctor
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg neomorph-inset"
                >
                  <feature.icon className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
          
          <motion.div
            className="relative"
            style={parallaxStyle}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-10 rounded-3xl blur-xl -m-4" />
              <div className="relative neomorph overflow-hidden rounded-3xl aspect-[4/3]">
                <Image
                  src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg"
                  alt="Doctor providing teleconsultation"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-3xl"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 glass-effect rounded-xl border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
                      <PhoneCall className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                      <p className="text-xs text-muted-foreground">Cardiologist • Available Now</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 neomorph p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background overflow-hidden">
                      <Image
                        src={`https://randomuser.me/api/portraits/men/${i + 30}.jpg`}
                        alt={`User ${i}`}
                        width={32}
                        height={32}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-medium">500+ Doctors</p>
                  <p className="text-xs text-muted-foreground">Ready to help</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -left-6 neomorph p-4 rounded-xl shadow-xl">
              <div className="text-center">
                <p className="text-lg font-medium">4.9/5</p>
                <div className="flex text-accent">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">1000+ Reviews</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: PhoneCall, text: '24/7 Support' },
  { icon: Calendar, text: 'Easy Scheduling' },
  { icon: Clock, text: 'Quick Response' },
  { icon: ShieldCheck, text: 'Secure Data' },
];