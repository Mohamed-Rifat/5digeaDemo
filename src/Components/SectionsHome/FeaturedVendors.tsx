import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { Star, Award } from "lucide-react";

const vendors = [
  {
    id: 1,
    name: "Elite Wedding Halls",
    category: "event-decoration",
    categoryName: "Wedding Venues",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=300&q=80",
    featured: true,
  },
  {
    id: 3,
    name: "Zara Bridal",
    category: "bridal-dresses",
    categoryName: "Bridal Dresses",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&q=80",
    featured: true,
  },
  {
    id: 2,
    name: "Elegant Suits",
    category: "mens-suits",
    categoryName: "Men's Suits",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1594938374223-9a140e0fe329?w=300&q=80",
    featured: false,
  },
  {
    id: 5,
    name: "Moments Photography",
    category: "photography",
    categoryName: "Photography",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80",
    featured: true,
  },
];

export default function FeaturedVendors() {
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleViewAllPartners = () => {
    navigate("/our-partners");
  };

  const handleVendorClick = (vendor: typeof vendors[0]) => {
    // Navigate to partners page with category filter
    navigate(`/our-partners?category=${vendor.category}`);
  };

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
            Trusted Partners
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Partners  <span className="bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">in Success</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Work with the best in the industry — hand-picked for quality and excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendors.map((vendor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
              onClick={() => handleVendorClick(vendor)}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <div className="relative h-64">
                  <img 
                    src={vendor.image} 
                    alt={vendor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  
                  {vendor.featured && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Award className="w-3 h-3" /> Featured
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg">{vendor.name}</h3>
                    <p className="text-sm text-white/80">{vendor.categoryName}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm">{vendor.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <button 
            onClick={handleViewAllPartners}
            className="text-amber-600 font-semibold hover:text-amber-700 transition-colors flex items-center gap-1 mx-auto group"
          >
            <span>View All Partners</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}