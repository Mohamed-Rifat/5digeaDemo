import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '../../context/FavoritesContext';
import { FiTrash2, FiInfo, FiStar, FiMapPin, FiClock, FiPhone, FiMail, FiX } from 'react-icons/fi';

export default function Favorite() {
  const { favorites, removeFromFavorites } = useFavorites();
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleRemove = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromFavorites(id);
  };

  const handleViewDetails = (provider: any) => {
    setSelectedProvider(provider);
    setShowModal(true);
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-6xl mb-4"
          >
            ❤️
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Favorites Yet</h2>
          <p className="text-gray-600">Start adding your favorite wedding services!</p>
          <p className="text-gray-500 text-sm mt-2">Click the heart icon on any service to add it here</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
            <p className="text-gray-600">Your saved wedding services ({favorites.length})</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full cursor-pointer"
                onClick={() => handleViewDetails(provider)}
              >
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button
                    onClick={(e) => handleRemove(provider.id, e)}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-red-50 transition-all duration-300"
                  >
                    <FiTrash2 className="w-4 h-4 text-red-500 hover:text-red-600" />
                  </button>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <FiStar className="text-yellow-500 text-sm fill-yellow-500" />
                    <span className="text-sm font-semibold text-gray-800">{provider.rating}</span>
                  </div>
                </div>

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
                  
                  <div className="flex-grow"></div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(provider);
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                  >
                    <FiInfo className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 "
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4 pt-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white max-w-4xl w-full  overflow-y-auto shadow-2xl ">
                <div className="relative h-72 overflow-hidden">
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

                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">About</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedProvider.description || "Professional service provider dedicated to making your wedding day perfect."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <FiMapPin className="w-5 h-5 text-pink-500" />
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm font-medium text-gray-800">{selectedProvider.location || "City Center"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <FiClock className="w-5 h-5 text-pink-500" />
                      <div>
                        <p className="text-xs text-gray-500">Hours</p>
                        <p className="text-sm font-medium text-gray-800">{selectedProvider.hours || "Mon-Sat: 9am-8pm"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <FiPhone className="w-5 h-5 text-pink-500" />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm font-medium text-gray-800">{selectedProvider.phone || "+1 234 567 890"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <FiMail className="w-5 h-5 text-pink-500" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium text-gray-800">{selectedProvider.email || "info@example.com"}</p>
                      </div>
                    </div>
                  </div>

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

                  <div className="flex gap-3">
                    <button className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-sm font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300">
                      More Information
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-sm font-semibold hover:border-pink-500 hover:text-pink-600 transition-all duration-300"
                    >
                      Close
                    </button>
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