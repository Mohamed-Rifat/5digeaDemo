import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useFavorites } from '../../context/FavoritesContext';
import { FiHeart, FiX, FiInfo, FiMapPin, FiClock, FiPhone, FiMail, FiStar } from 'react-icons/fi';

interface ServiceProvider {
  id: number;
  name: string;
  category: number;
  price: string;
  rating: number;
  image: string;
  description?: string;
  location?: string;
  phone?: string;
  email?: string;
  hours?: string;
}

interface CategoryNames {
  [key: number]: string;
}

const serviceProviders: ServiceProvider[] = [
  { 
    id: 1, 
    name: "Elegant Bridal Studio", 
    category: 1, 
    price: "$500-$2000", 
    rating: 4.8, 
    image: "https://images.unsplash.com/photo-1667580385419-fd00f32b3265?q=80&w",
    description: "Experience luxury and elegance with our premium bridal collection. We offer custom-made wedding dresses designed to make you feel like royalty on your special day.",
    location: "123 Bridal Avenue, Downtown",
    phone: "+1 234 567 890",
    email: "info@elegantbridal.com",
    hours: "Mon-Sat: 10am-8pm, Sun: 12pm-6pm"
  },
  { 
    id: 2, 
    name: "Royal Wedding Gowns", 
    category: 1, 
    price: "$800-$3000", 
    rating: 4.9, 
    image: "https://images.unsplash.com/photo-1667580385419-fd00f32b3265?q=80&w",
    description: "Royal Wedding Gowns offers exclusive designer wedding dresses with intricate details and premium fabrics.",
    location: "456 Fashion Street, Midtown",
    phone: "+1 234 567 891",
    email: "royal@weddinggowns.com",
    hours: "Mon-Sat: 9am-7pm, Closed Sunday"
  },
  { 
    id: 3, 
    name: "Elite Groom Tailoring", 
    category: 2, 
    price: "$300-$1500", 
    rating: 4.7, 
    image: "https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?q=80",
    description: "Perfectly tailored suits for the modern groom. We specialize in custom-fit suits that combine style and comfort.",
    location: "789 Groom Lane, Business District",
    phone: "+1 234 567 892",
    email: "elite@groomtailoring.com",
    hours: "Mon-Fri: 10am-9pm, Sat: 10am-6pm"
  },
  { 
    id: 4, 
    name: "Grand Palace Hall", 
    category: 3, 
    price: "$5000-$20000", 
    rating: 4.9, 
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "A majestic venue for your dream wedding. Grand Palace Hall offers stunning architecture and exceptional service.",
    location: "1 Palace Road, City Center",
    phone: "+1 234 567 893",
    email: "events@grandpalace.com",
    hours: "By appointment only"
  },
  { 
    id: 5, 
    name: "Memory Lane Photography", 
    category: 5, 
    price: "$1000-$5000", 
    rating: 4.9, 
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Capture every precious moment with our professional photography team. We specialize in candid and artistic wedding photography.",
    location: "234 Memory Lane, Arts District",
    phone: "+1 234 567 894",
    email: "hello@memorylane.com",
    hours: "Mon-Sun: 9am-8pm"
  },
  { 
    id: 6, 
    name: "Wedding Moments Studio", 
    category: 5, 
    price: "$800-$4000", 
    rating: 4.8, 
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Creative and modern wedding photography that tells your unique love story.",
    location: "567 Photo Avenue, Creative Hub",
    phone: "+1 234 567 895",
    email: "studio@weddingmoments.com",
    hours: "Tue-Sun: 10am-7pm"
  },
  { 
    id: 7, 
    name: "Glamour Beauty Lounge", 
    category: 7, 
    price: "$200-$800", 
    rating: 4.8, 
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Professional makeup and hair services to make you look and feel your best on your special day.",
    location: "890 Beauty Boulevard, Fashion District",
    phone: "+1 234 567 896",
    email: "glamour@beautylounge.com",
    hours: "Mon-Sat: 8am-8pm"
  },
  { 
    id: 8, 
    name: "Melody Wedding Band", 
    category: 10, 
    price: "$800-$3000", 
    rating: 4.7, 
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Live music and entertainment that will keep your guests dancing all night long.",
    location: "123 Music Street, Entertainment District",
    phone: "+1 234 567 897",
    email: "book@melodyband.com",
    hours: "Available 24/7 for bookings"
  },
  { 
    id: 9, 
    name: "Dream Decor Studio", 
    category: 11, 
    price: "$1000-$5000", 
    rating: 4.9, 
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Transform your venue into a magical wonderland with our creative decoration services.",
    location: "456 Decor Avenue, Design District",
    phone: "+1 234 567 898",
    email: "dream@decorestudio.com",
    hours: "Mon-Fri: 9am-6pm, Sat: 10am-4pm"
  },
  { 
    id: 10, 
    name: "Sweet Bliss Cakes", 
    category: 15, 
    price: "$300-$1500", 
    rating: 4.8, 
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Exquisite and delicious wedding cakes crafted to perfection. Custom designs available.",
    location: "789 Sweet Street, Bakery District",
    phone: "+1 234 567 899",
    email: "orders@sweetbliss.com",
    hours: "Wed-Mon: 9am-6pm, Closed Tuesday"
  },
];

const categoryNames: CategoryNames = {
  1: "Wedding Dresses",
  2: "Groom Suits",
  3: "Wedding Halls",
  4: "Outdoor Venues",
  5: "Photographers",
  6: "Videographers",
  7: "Makeup Artists",
  8: "Hair Stylists",
  9: "Wedding Planners",
  10: "DJ & Music Bands",
  11: "Decorations",
  12: "Flowers & Bouquets",
  13: "Lighting & Stage Design",
  14: "Catering Services",
  15: "Wedding Cakes",
  16: "Invitations & Cards",
  17: "Car Rentals",
  18: "Honeymoon Packages",
  19: "Traditional Bands (Zaffa)",
  20: "Event Security",
};

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function ServicesContent() {
  const [searchParams] = useSearchParams();
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [hasNoFilter, setHasNoFilter] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  // Scroll to top when filters change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const filterParam = searchParams.get('filter');
    const noFilterParam = searchParams.get('nofilter');
    
    setIsLoading(true);
    
    setTimeout(() => {
      if (noFilterParam === 'true') {
        setHasNoFilter(true);
        setFilteredProviders([]);
        setSelectedCategory(null);
      } else if (categoryParam) {
        const categoryId = parseInt(categoryParam);
        setSelectedCategory(categoryId);
        const filtered = serviceProviders.filter(provider => provider.category === categoryId);
        setFilteredProviders(filtered);
        setHasNoFilter(false);
      } else if (filterParam) {
        const categories = filterParam.split(',').map(id => parseInt(id));
        setSelectedCategory(null);
        const filtered = serviceProviders.filter(provider => categories.includes(provider.category));
        setFilteredProviders(filtered);
        setHasNoFilter(false);
      } else {
        setSelectedCategory(null);
        setFilteredProviders(serviceProviders);
        setHasNoFilter(false);
      }
      setIsLoading(false);
    }, 300);
  }, [searchParams]);

  const handleFavoriteToggle = (provider: ServiceProvider, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(provider.id)) {
      removeFromFavorites(provider.id);
    } else {
      addToFavorites(provider);
    }
  };

  const handleViewDetails = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setShowModal(true);
  };

  return (
    <>
      <div ref={contentRef} className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Header with animation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="mb-8"
          >
            {selectedCategory ? (
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {categoryNames[selectedCategory]}
                </h1>
                <p className="text-gray-600">
                  Find the best {categoryNames[selectedCategory].toLowerCase()} for your special day
                </p>
              </>
            ) : !hasNoFilter && (
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  All Wedding Services
                </h1>
                <p className="text-gray-600">
                  Browse all our curated wedding service providers
                </p>
              </>
            )}
          </motion.div>

          {/* Loading animation */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center py-20"
              >
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-pink-200 rounded-full"></div>
                  <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message when no categories selected */}
          <AnimatePresence>
            {!isLoading && hasNoFilter && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="text-center py-16 bg-white rounded-xl shadow-sm"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-6xl mb-4"
                >
                  🎯
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Choose Your Perfect Service
                </h3>
                <p className="text-gray-600 text-lg mb-2">
                  Please select at least one category from the sidebar
                </p>
                <p className="text-gray-500">
                  to discover amazing wedding services tailored just for you
                </p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 flex justify-center gap-3 flex-wrap"
                >
                  <div className="px-4 py-2 bg-pink-50 text-pink-600 rounded-lg text-sm">
                    ✨ Wedding Dresses
                  </div>
                  <div className="px-4 py-2 bg-pink-50 text-pink-600 rounded-lg text-sm">
                    📸 Photography
                  </div>
                  <div className="px-4 py-2 bg-pink-50 text-pink-600 rounded-lg text-sm">
                    🎂 Wedding Cakes
                  </div>
                  <div className="px-4 py-2 bg-pink-50 text-pink-600 rounded-lg text-sm">
                    👔 Groom Suits
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results count with animation */}
          <AnimatePresence>
            {!isLoading && !hasNoFilter && filteredProviders.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-6"
              >
                <p className="text-gray-600">
                  Showing {filteredProviders.length} {filteredProviders.length === 1 ? 'result' : 'results'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Services Grid with improved cards */}
          <AnimatePresence>
            {!isLoading && !hasNoFilter && filteredProviders.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProviders.map((provider) => (
                  <motion.div
                    key={provider.id}
                    variants={itemVariants}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full cursor-pointer"
                    onClick={() => handleViewDetails(provider)}
                  >
                    {/* Image Container */}
                    <div className="relative h-72 overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
                      <motion.img
                        src={provider.image}
                        alt={provider.name}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Favorite Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleFavoriteToggle(provider, e)}
                        className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <FiHeart 
                          className={`w-5 h-5 transition-colors duration-300 ${
                            isFavorite(provider.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-500 hover:text-red-500'
                          }`}
                        />
                      </motion.button>
                      
                      {/* Rating badge */}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <FiStar className="text-yellow-500 text-sm fill-yellow-500" />
                        <span className="text-sm font-semibold text-gray-800">{provider.rating}</span>
                      </div>
                    </div>

                    {/* Content Container */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors duration-300 line-clamp-1">
                        {provider.name}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500 text-sm">💰</span>
                          <span className="text-gray-700 text-sm font-medium">{provider.price}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-pink-50 px-2 py-0.5 rounded-full">
                          <span className="text-pink-500 text-xs">✓</span>
                          <span className="text-xs text-pink-600">Verified</span>
                        </div>
                      </div>
                      
                      <div className="mb-4 flex gap-2">
                        <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                          Professional
                        </div>
                        <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                          Licensed
                        </div>
                      </div>
                      
                      <div className="flex-grow"></div>
                      
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(provider);
                        }}
                        className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <FiInfo className="w-4 h-4" />
                        <span>View Details</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* No results message */}
          <AnimatePresence>
            {!isLoading && !hasNoFilter && filteredProviders.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="text-center py-12 bg-white rounded-xl shadow-sm"
              >
                <p className="text-gray-500 text-lg">
                  No service providers found.
                </p>
                <p className="text-gray-400 mt-2">
                  Try selecting different categories from the sidebar.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {showModal && selectedProvider && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Modal Header with Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={selectedProvider.image}
                    alt={selectedProvider.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all duration-300"
                  >
                    <FiX className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteToggle(selectedProvider, e);
                    }}
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <FiHeart 
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isFavorite(selectedProvider.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-500 hover:text-red-500'
                      }`}
                    />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedProvider.name}</h2>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-yellow-500/90 px-2 py-1 rounded-full">
                        <FiStar className="text-white text-sm fill-white" />
                        <span className="text-sm font-semibold text-white">{selectedProvider.rating}</span>
                      </div>
                      <div className="bg-white/90 px-2 py-1 rounded-full">
                        <span className="text-xs font-medium text-gray-700">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">About</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedProvider.description || "Professional service provider dedicated to making your wedding day perfect. With years of experience and countless happy couples, we ensure exceptional quality and service."}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <FiMapPin className="w-5 h-5 text-pink-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm font-medium text-gray-800">{selectedProvider.location || "City Center"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <FiClock className="w-5 h-5 text-pink-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Hours</p>
                        <p className="text-sm font-medium text-gray-800">{selectedProvider.hours || "Mon-Sat: 9am-8pm"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <FiPhone className="w-5 h-5 text-pink-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm font-medium text-gray-800">{selectedProvider.phone || "+1 234 567 890"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <FiMail className="w-5 h-5 text-pink-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium text-gray-800">{selectedProvider.email || "info@example.com"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Price Range</p>
                        <p className="text-xl font-bold text-gray-800">{selectedProvider.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Starting from</p>
                        <p className="text-lg font-semibold text-pink-600">{selectedProvider.price.split('-')[0]}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-sm font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-md"
                    >
                      More Information
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowModal(false)}
                      className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-sm font-semibold hover:border-pink-500 hover:text-pink-600 transition-all duration-300"
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}