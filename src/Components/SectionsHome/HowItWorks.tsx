import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Calendar, 
  Search, 
  Heart, 
  PartyPopper,
  ChevronRight 
} from "lucide-react";

const steps = [
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Share Your Vision",
    description: "Tell us your dream wedding details, preferences, and budget.",
    color: "from-amber-500 to-orange-500",
    delay: 0,
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "Curated Selection",
    description: "We handpick the best vendors matching your unique style.",
    color: "from-rose-500 to-pink-500",
    delay: 0.2,
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Compare & Choose",
    description: "Easy side-by-side comparisons for informed decisions.",
    color: "from-purple-500 to-violet-500",
    delay: 0.4,
  },
  {
    icon: <PartyPopper className="w-8 h-8" />,
    title: "Celebrate Perfectly",
    description: "Enjoy your flawless wedding night, completely stress-free.",
    color: "from-emerald-500 to-teal-500",
    delay: 0.6,
  },
];

export default function HowItWorks() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-amber-50/50 via-white to-rose-50/50">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Four simple steps to your dream wedding — we make the journey as beautiful as the destination
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: step.delay, duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-rose-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              
              <div className="relative bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all border border-amber-100 group-hover:border-amber-300">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${step.color} text-white flex items-center justify-center font-bold shadow-lg`}>
                    {index + 1}
                  </div>
                </div>
                
                <div className={`w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-r ${step.color} bg-opacity-10 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {step.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-amber-300" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}