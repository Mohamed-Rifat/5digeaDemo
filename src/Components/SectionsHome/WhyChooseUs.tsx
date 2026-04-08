import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Shield, 
  Clock, 
  ThumbsUp, 
  Users, 
  Award, 
  Headphones 
} from "lucide-react";

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Trusted & Verified",
    description: "All vendors are thoroughly vetted and verified for quality.",
    color: "amber",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Time-Saving",
    description: "Everything in one place — no more endless searching.",
    color: "rose",
  },
  {
    icon: <ThumbsUp className="w-6 h-6" />,
    title: "Satisfaction Guaranteed",
    description: "98% customer satisfaction rate across all services.",
    color: "amber",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Expert Team",
    description: "Dedicated wedding specialists available 24/7.",
    color: "rose",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Best Price Promise",
    description: "Exclusive deals and competitive pricing guaranteed.",
    color: "amber",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "24/7 Support",
    description: "Round-the-clock assistance for peace of mind.",
    color: "rose",
  },
];

export default function WhyChooseUs() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-amber-900 to-rose-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20,0 L20,40 M0,20 L40,20" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)"/>
        </svg>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
            Why Couples Love Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-amber-300">5Digea</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            We're not just a platform — we're your wedding planning partner
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <div className={`text-${feature.color}-300`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}