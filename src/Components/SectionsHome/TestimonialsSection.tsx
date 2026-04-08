import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Amina & Karim",
    role: "Married November 2024",
    content: "5digea made our wedding planning effortless. Their Nubian touch and attention to detail made our celebration truly unforgettable. Everything in one place — we couldn't be happier!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1587271407850-8f438ca9f7a2?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Sarah & Mohamed",
    role: "Married September 2024",
    content: "The best decision we made was choosing 5digea. From venue selection to photography, every vendor was top-notch. The comparison tool saved us so much time and money!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Layla & Omar",
    role: "Married June 2024",
    content: "Absolutely amazing experience! The team understood our vision perfectly and helped us find the most beautiful traditional Nubian elements for our wedding. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=100&h=100&fit=crop",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-amber-50/80 via-white to-rose-50/80">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
            Love Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">Couples Say</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-amber-100"
            >
              {/* Sketch Frame */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <rect x="15" y="15" width="calc(100% - 30)" height="calc(100% - 30)" fill="none" stroke="#D97706" strokeWidth="1.5" strokeDasharray="6 6"/>
              </svg>
              
              <Quote className="w-12 h-12 text-amber-400 mb-6" />
              
              <p className="text-xl md:text-2xl text-gray-700 italic mb-8 leading-relaxed">
                "{testimonials[current].content}"
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-r from-amber-200 to-rose-200 p-0.5">
                    <img 
                      src={testimonials[current].image} 
                      alt={testimonials[current].name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">{testimonials[current].name}</div>
                    <div className="text-amber-600 text-sm">{testimonials[current].role}</div>
                    <div className="flex gap-1 mt-1">
                      {[...Array(testimonials[current].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-amber-700" />
                  </button>
                  <button
                    onClick={next}
                    className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-amber-700" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  current === i ? "w-6 bg-amber-600" : "bg-amber-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}