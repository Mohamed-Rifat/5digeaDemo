import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Sparkles,
  Heart,
  Users,
  Gift,
  CheckCircle,
  ChevronRight,
  Quote,
  Star,
  TrendingUp,
  Award,
  Camera,
  Music,
  Cake,
  Flower2,
  PartyPopper,
  Crown,
} from "lucide-react";

export default function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced Skeleton with sketch-style placeholders
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50">
        {/* Skeleton Hero */}
        <div className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-8 bg-amber-200/50 rounded-full w-40 mx-auto mb-8 animate-pulse"></div>
            <div className="h-16 bg-amber-200/50 rounded-2xl w-3/4 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-2/3 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-1/2 mx-auto mb-8 animate-pulse"></div>
            <div className="flex gap-4 justify-center">
              <div className="h-12 w-32 bg-amber-200/50 rounded-full animate-pulse"></div>
              <div className="h-12 w-32 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        {/* Skeleton Cards */}
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-rose-50 text-gray-800 overflow-hidden">
      
      {/* ===== HERO SECTION with Blur on Image Only ===== */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-center px-6 overflow-hidden">
        
        {/* Background Image with Blur Filter */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/30 z-10"></div> {/* Dark overlay for text readability */}
          <img 
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=80"
            alt="Wedding celebration background"
            className="w-full h-full object-cover blur-sm scale-105"
            style={{ filter: "blur(4px)" }}
          />
        </div>

        {/* Decorative Wedding Elements - Floating Flowers & Confetti */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Floating flower petals */}
          <motion.div
            initial={{ opacity: 0, y: -50, rotate: -10 }}
            animate={{ opacity: 0.4, y: 0, rotate: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute top-10 left-10 text-amber-200/60"
          >
            <Flower2 className="w-16 h-16" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: 15 }}
            animate={{ opacity: 0.4, y: 0, rotate: 0 }}
            transition={{ duration: 2, delay: 0.8 }}
            className="absolute bottom-20 right-10 text-rose-200/60"
          >
            <Flower2 className="w-20 h-20" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 0.3, x: 0 }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute top-1/2 left-5 text-amber-200/50"
          >
            <PartyPopper className="w-12 h-12" />
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-32 right-20 text-amber-200/50"
          >
            <Crown className="w-14 h-14" />
          </motion.div>

          {/* Floating hearts */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100, x: Math.random() * 100 - 50 }}
              animate={{ 
                opacity: [0, 0.5, 0],
                y: [100, -100],
                x: [Math.random() * 100 - 50, Math.random() * 100 - 50]
              }}
              transition={{ 
                duration: 8 + Math.random() * 5,
                repeat: Infinity,
                delay: i * 1.2,
                ease: "linear"
              }}
              className="absolute bottom-0 text-rose-300/50"
              style={{ left: `${Math.random() * 100}%` }}
            >
              <Heart className="w-6 h-6 fill-rose-200" />
            </motion.div>
          ))}
        </div>

        {/* Sketch Doodle Elements */}
        <motion.svg
          className="absolute top-20 left-10 w-32 h-32 text-white/40 z-10"
          viewBox="0 0 100 100"
          initial={{ opacity: 0, rotate: -15 }}
          animate={{ opacity: 0.6, rotate: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <path d="M20,50 Q40,30 60,50 T100,50" stroke="currentColor" fill="none" strokeWidth="2" strokeDasharray="4 4"/>
          <path d="M30,70 Q50,90 70,70" stroke="currentColor" fill="none" strokeWidth="2" strokeDasharray="4 4"/>
        </motion.svg>
        
        <motion.svg
          className="absolute bottom-20 right-10 w-40 h-40 text-white/40 z-10"
          viewBox="0 0 100 100"
          initial={{ opacity: 0, rotate: 10 }}
          animate={{ opacity: 0.6, rotate: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          <path d="M50,20 L55,35 L70,35 L60,45 L65,60 L50,50 L35,60 L40,45 L30,35 L45,35 Z" stroke="currentColor" fill="none" strokeWidth="1.8"/>
          <circle cx="50" cy="50" r="25" stroke="currentColor" fill="none" strokeWidth="1.5" strokeDasharray="3 3"/>
        </motion.svg>

        {/* Main Content - No Blur Background, Just Clean Text */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-5 py-2 border border-amber-300 shadow-md">
              <span className="text-amber-800 font-medium text-sm tracking-wide flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" /> 5Digea • Nubian Heritage ✨
              </span>
            </div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-amber-700 via-rose-600 to-amber-700 bg-clip-text text-transparent drop-shadow-md">
              About
            </span>{" "}
            <span className="relative inline-block text-white drop-shadow-lg">
              5Digea
              <motion.svg
                className="absolute -bottom-3 left-0 w-full"
                viewBox="0 0 200 12"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.9, duration: 1.2, ease: "easeInOut" }}
              >
                <motion.path
                  d="M10,8 C50,3 150,3 190,8"
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p 
            className="max-w-2xl mx-auto text-lg md:text-xl text-white leading-relaxed font-medium drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            We are a passionate Nubian team dedicated to making your wedding
            journey simple, joyful, and unforgettable — all in one place.
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-4 justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2 transition-all"
            >
              Start Your Journey
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-8 py-3 rounded-full font-semibold transition-all"
            >
              View Gallery
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STORY SECTION with Scroll Animation ===== */}
      <section className="py-20 px-6 md:px-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-50/30 to-transparent"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-amber-300 rounded-full opacity-40"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-rose-300 rounded-full opacity-40"></div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 relative">
                  Our Story
                  <motion.div 
                    className="absolute -bottom-2 left-0 w-20 h-1 bg-amber-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: 80 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  />
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-4">
                  5Digea was founded by a group of passionate Nubian youth with a shared vision:
                  to simplify the wedding experience for couples.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We understand how overwhelming it can be to plan the perfect wedding, 
                  so we created a platform that brings everything together in one place — 
                  from venues and catering to photography and traditional Nubian ceremonies.
                </p>
                <motion.div 
                  className="mt-6 flex items-center gap-2 text-amber-600"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <Users className="w-5 h-5" />
                  <span className="font-medium">100+ Happy Couples Served</span>
                </motion.div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative group">
                <motion.img
                  initial={{ scale: 0.95 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
                  alt="Nubian wedding celebration"
                  className="rounded-2xl shadow-2xl w-full object-cover"
                />
                {/* Sketch overlay on image */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <rect x="10" y="10" width="calc(100% - 20)" height="calc(100% - 20)" fill="none" stroke="white" strokeWidth="2" strokeDasharray="8 8"/>
                </svg>
                <div className="absolute -bottom-4 -right-4 bg-amber-100 rounded-full p-3 shadow-lg">
                  <Heart className="w-6 h-6 text-rose-500" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== MISSION SECTION with Sketch Quote ===== */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 via-rose-100/20 to-amber-100/30"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <motion.div
                initial={{ rotate: -10, scale: 0 }}
                whileInView={{ rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block mb-6"
              >
                <Quote className="w-12 h-12 text-amber-500" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                We aim to help every bride and groom find everything they dream of
                for their special day — from flowers to venues, catering, photography, 
                and traditional Nubian services — all in one place, with the ability 
                to compare and choose the best options at the best prices.
              </p>
              {/* Sketch underline */}
              <motion.svg
                className="mx-auto mt-8"
                width="200"
                height="20"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <motion.path
                  d="M10,10 L190,10"
                  stroke="#D97706"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5 5"
                />
              </motion.svg>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== FEATURES SECTION with Enhanced Cards ===== */}
      <section className="py-20 px-6 md:px-16">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose 5Digea?</h2>
              <p className="text-gray-600 text-lg">Everything you need, simplified and elevated</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "All-in-One Platform",
                desc: "Everything you need for your wedding — venues, catering, photography, attire, and more — all in one seamless experience.",
                color: "amber"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Smart Comparison",
                desc: "Compare services side-by-side with our intelligent tools. Make informed decisions based on price, quality, and reviews.",
                color: "rose"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Best Price Promise",
                desc: "We negotiate with vendors to bring you exclusive rates. High-quality services at competitive prices, guaranteed.",
                color: "amber"
              }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-amber-100"
                >
                  {/* Sketch corner decoration */}
                  <svg className="absolute top-4 right-4 w-12 h-12 opacity-20">
                    <path d="M2,2 L10,2 M2,2 L2,10" stroke="currentColor" strokeWidth="1.5" className="text-amber-600"/>
                  </svg>
                  <div className={`w-16 h-16 bg-${item.color}-100 rounded-2xl flex items-center justify-center text-${item.color}-600 mb-6 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  <motion.div 
                    className="mt-4 flex items-center gap-1 text-amber-600 text-sm font-medium"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1, x: 5 }}
                  >
                    Learn more <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES WE OFFER Section ===== */}
      <section className="py-20 px-6 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Help You Find</h2>
              <p className="text-gray-600 text-lg">Curated services for your perfect day</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Camera className="w-6 h-6" />, name: "Photography", count: "45+ Vendors" },
              { icon: <Music className="w-6 h-6" />, name: "Music & DJ", count: "30+ Artists" },
              { icon: <Cake className="w-6 h-6" />, name: "Catering", count: "50+ Options" },
              { icon: <Gift className="w-6 h-6" />, name: "Wedding Favors", count: "25+ Creators" },
            ].map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-xl p-6 text-center border border-amber-200 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-700">
                    {service.icon}
                  </div>
                  <h4 className="font-semibold text-gray-800">{service.name}</h4>
                  <p className="text-sm text-gray-500">{service.count}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION with Sketch Numbers ===== */}
      <section className="py-20 bg-gradient-to-r from-amber-800 to-rose-800 text-white relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20,0 L20,40 M0,20 L40,20" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)"/>
        </svg>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Happy Couples" },
              { value: "50+", label: "Expert Vendors" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "24/7", label: "Concierge Support" }
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: i * 0.1 }}
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-amber-200 font-medium">{stat.label}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL with Sketch Style ===== */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <motion.div 
              className="relative bg-white rounded-3xl p-10 shadow-xl border border-amber-100"
              whileHover={{ boxShadow: "0 25px 40px -12px rgba(0,0,0,0.1)" }}
            >
              {/* Sketch frame */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <rect x="15" y="15" width="calc(100% - 30)" height="calc(100% - 30)" fill="none" stroke="#D97706" strokeWidth="1.5" strokeDasharray="6 6"/>
              </svg>
              <Quote className="w-10 h-10 text-amber-400 mb-4" />
              <p className="text-xl md:text-2xl text-gray-700 italic mb-6">
                "5Digea made our wedding planning effortless. Their Nubian touch and attention 
                to detail made our celebration truly unforgettable. Everything in one place — 
                we couldn't be happier!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-800">Amina & Moamen</div>
                  <div className="text-amber-600 text-sm">Married November 2024</div>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 px-6 bg-gradient-to-r from-amber-100 to-rose-100">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Heart className="w-16 h-16 text-rose-500 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Let's Make Your Dream Wedding Real 💍
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto mb-8">
                With 5Digea, your journey becomes easier, smarter, and more beautiful.
                Start planning your perfect night today.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-xl flex items-center gap-2 mx-auto transition-all"
              >
                Get Started with 5Digea
                <CheckCircle className="w-5 h-5" />
              </motion.button>
              <p className="text-sm text-gray-500 mt-4">Free consultation • No obligation</p>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

// ===== SCROLL REVEAL COMPONENT =====
interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
}

function ScrollReveal({ children, direction = "up", delay = 0 }: ScrollRevealProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -60 : direction === "right" ? 60 : 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
      {children}
    </motion.div>
  );
}