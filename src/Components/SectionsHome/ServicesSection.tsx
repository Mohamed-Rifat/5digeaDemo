import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Heart,
  ArrowRight,
  Camera,
  Music,
  Cake,
  Flower2,
  Star,
  ChevronRight,
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  categoryId: number;
  icon?: React.ReactNode;
}

interface FallbackIcons {
  [key: string]: string;
}

const services: Service[] = [
  {
    id: "wedding-halls",
    name: "Wedding Halls",
    description: "Discover the perfect venue for your special day from our curated selection of luxurious wedding halls.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
    categoryId: 3,
    icon: <Star className="w-full h-full" />,
  },
  {
  id: "mens-suits",
  name: "Men's Suits",
  description: "Elegant and tailored suits to make the groom look his absolute best on the big day.",
  image: "https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?q=80",
  categoryId: 2,
  icon: <Star className="w-full h-full" />,
},
  {
    id: "bridal-dresses",
    name: "Bridal Dresses",
    description: "Stunning collection of bridal gowns designed to make you feel like royalty.",
    image: "https://images.unsplash.com/photo-1667580385419-fd00f32b3265?q=80&w",
    categoryId: 1,
    icon: <Star className="w-full h-full" />,
  },
  {
    id: "photography",
    name: "Photography",
    description: "Capture every precious moment with our professional wedding photography services.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
    categoryId: 5,
    icon: <Camera className="w-full h-full" />,
  },
  {
    id: "makeup-hair",
    name: "Makeup & Hair",
    description: "Professional beauty services to enhance your natural radiance for the wedding day.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
    categoryId: 7,
    icon: <Star className="w-full h-full" />,
  },
  {
    id: "wedding-cakes",
    name: "Wedding Cakes",
    description: "Exquisite and delicious wedding cakes crafted to sweeten your celebration.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
    categoryId: 15,
    icon: <Cake className="w-full h-full" />,
  },
  {
    id: "event-decoration",
    name: "Event Decoration",
    description: "Transform your venue into a magical space with our creative decoration services.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
    categoryId: 11,
    icon: <Flower2 className="w-full h-full" />,
  },
  {
    id: "music-entertainment",
    name: "Music & Entertainment",
    description: "Keep the celebration alive with our talented musicians and entertainment options.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
    categoryId: 10,
    icon: <Music className="w-full h-full" />,
  },
];

export default function ServicesSection() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const navigate = useNavigate();
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleImageError = (serviceName: string) => {
    setImageErrors((prev) => ({ ...prev, [serviceName]: true }));
  };

  const handleLearnMore = (service: Service) => {
    navigate(`/services?category=${service.categoryId}&service=${service.id}`);
  };

  const handleViewAllServices = () => {
    navigate("/services");
  };

  const fallbackIcons: FallbackIcons = {
    "Wedding Halls": "🏛️",
    "Men's Suits": "👔",
    "Bridal Dresses": "👰",
    Photography: "📸",
    "Makeup & Hair": "💄",
    "Wedding Cakes": "🎂",
    "Event Decoration": "🎨",
    "Music & Entertainment": "🎵",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative py-12 md:py-20 lg:py-28 px-4 overflow-hidden bg-gradient-to-br from-amber-50/30 via-white to-rose-50/30">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-200/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

        <svg className="absolute inset-0 w-full h-full opacity-5">
          <pattern id="serviceGrid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M50,0 L0,0 0,50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-amber-800" />
            <circle cx="25" cy="25" r="2" fill="currentColor" className="text-amber-600" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#serviceGrid)" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
          className="text-center mb-10 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-amber-100 to-rose-100 rounded-full px-4 py-1.5 md:px-5 md:py-2 shadow-sm">
              <span className="text-amber-700 font-medium text-xs md:text-sm tracking-wide flex items-center gap-2">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4" /> Premium Wedding Services
              </span>
            </div>
          </motion.div>

          <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-amber-800 via-rose-700 to-amber-800 bg-clip-text text-transparent">
            Complete Wedding Solutions
          </h2>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-amber-400 to-rose-500 mx-auto mb-5 md:mb-6 rounded-full"
          />

          <p className="text-sm md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Everything you need for your perfect wedding celebration, carefully curated
            to bring your dream day to life with elegance and style.
          </p>
        </motion.div>

        {/* Services Grid - Responsive: 2 columns on mobile, 4 on desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              custom={index}
              onHoverStart={() => setHoveredCard(service.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative"
            >
              <div className="relative bg-white rounded shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100 group-hover:border-amber-200 h-full flex flex-col">
                {/* Image Container - Full image without cropping */}
                <div className="relative bg-amber-50/30 flex-shrink-0">
                  {imageErrors[service.name] ? (
                    <div className="w-full aspect-square md:aspect-[4/3] bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center">
                      <span className="text-3xl md:text-5xl">{fallbackIcons[service.name]}</span>
                    </div>
                  ) : (
                    <>
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full aspect-square md:aspect-[4/3] object-contain bg-amber-50/20 transition-transform duration-500"
                        onError={() => handleImageError(service.name)}
                      />
                      <div className="absolute inset-0 bg-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                  )}

                  {/* Icon Badge - Fixed centering */}
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 w-6 h-6 md:w-8 md:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                    <div className="w-3 h-3 md:w-4 md:h-4 text-amber-600">
                      {service.icon}
                    </div>
                  </div>
                </div>

                {/* Content - Compact on mobile */}
                <div className="p-2.5 md:p-5 flex-1 flex flex-col">
                  <h3 className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold text-gray-800 mb-1 md:mb-2 group-hover:text-amber-700 transition-colors line-clamp-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm leading-relaxed mb-2 md:mb-4 line-clamp-2 md:line-clamp-3 flex-1">
                    {service.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-1.5 md:pt-3 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-0.5 md:gap-1">
                      <Heart className="w-2.5 h-2.5 md:w-3 md:h-3 text-rose-400" />
                      <span className="text-[8px] md:text-xs text-gray-400">Top Rated</span>
                    </div>

                    <motion.button
                      whileHover={{ x: 3 }}
                      onClick={() => handleLearnMore(service)}
                      className="flex items-center gap-0.5 md:gap-1 text-amber-600 text-[10px] sm:text-xs md:text-sm font-medium group/btn"
                    >
                      <span className="hidden sm:inline">Explore</span>
                      <span className="sm:hidden">View</span>
                      <ArrowRight className="w-2.5 h-2.5 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>

                {/* Animated Border */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 md:h-1 bg-gradient-to-r from-amber-500 to-rose-500"
                  initial={{ width: "0%" }}
                  animate={{ width: hoveredCard === service.id ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.6 } },
          }}
          className="text-center mt-8 md:mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewAllServices}
            className="group inline-flex items-center gap-2 px-5 md:px-8 py-2 md:py-3 bg-gradient-to-r from-amber-600 to-rose-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all text-sm md:text-base"
          >
            <span>View All Services</span>
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}