import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiX, FiSearch, FiCheck } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  count: number;
}

export default function SidebarFilters() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const weddingCategories: Category[] = [
    { id: 1, name: "Wedding Dresses", count: 120 },
    { id: 2, name: "Groom Suits", count: 85 },
    { id: 3, name: "Wedding Halls", count: 62 },
    { id: 4, name: "Outdoor Venues", count: 47 },
    { id: 5, name: "Photographers", count: 98 },
    { id: 6, name: "Videographers", count: 76 },
    { id: 7, name: "Makeup Artists", count: 110 },
    { id: 8, name: "Hair Stylists", count: 58 },
    { id: 9, name: "Wedding Planners", count: 53 },
    { id: 10, name: "DJ & Music Bands", count: 64 },
    { id: 11, name: "Decorations", count: 140 },
    { id: 12, name: "Flowers & Bouquets", count: 93 },
    { id: 13, name: "Lighting & Stage Design", count: 38 },
    { id: 14, name: "Catering Services", count: 112 },
    { id: 15, name: "Wedding Cakes", count: 41 },
    { id: 16, name: "Invitations & Cards", count: 56 },
    { id: 17, name: "Car Rentals", count: 25 },
    { id: 18, name: "Honeymoon Packages", count: 33 },
    { id: 19, name: "Traditional Bands (Zaffa)", count: 29 },
    { id: 20, name: "Event Security", count: 15 },
  ];

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const filterParam = searchParams.get('filter');
    const noFilterParam = searchParams.get('nofilter');
    
    if (noFilterParam === 'true') {
      setSelectedCategories([]);
    } else if (categoryParam) {
      const categoryId = parseInt(categoryParam);
      setSelectedCategories([categoryId]);
    } else if (filterParam) {
      const categories = filterParam.split(',').map(id => parseInt(id));
      setSelectedCategories(categories);
    } else {
      setSelectedCategories(weddingCategories.map(c => c.id));
    }
  }, [searchParams]);

  const filteredCategories = weddingCategories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryToggle = (categoryId: number) => {
    let newSelectedCategories: number[];
    
    if (selectedCategories.includes(categoryId)) {
      newSelectedCategories = selectedCategories.filter((id) => id !== categoryId);
    } else {
      newSelectedCategories = [...selectedCategories, categoryId];
    }
    
    setSelectedCategories(newSelectedCategories);
    
    if (newSelectedCategories.length === 0) {
      setSearchParams({ nofilter: 'true' });
    } else if (newSelectedCategories.length === 1) {
      setSearchParams({ category: newSelectedCategories[0].toString() });
    } else if (newSelectedCategories.length === weddingCategories.length) {
      setSearchParams({});
    } else {
      setSearchParams({ filter: newSelectedCategories.join(',') });
    }
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSearchTerm("");
    setSearchParams({ nofilter: 'true' });
  };

  const toggleSelectAll = () => {
    if (selectedCategories.length === weddingCategories.length) {
      setSelectedCategories([]);
      setSearchParams({ nofilter: 'true' });
    } else {
      setSelectedCategories(weddingCategories.map((c) => c.id));
      setSearchParams({});
    }
  };

  const applyFilters = () => {
    if (selectedCategories.length === 0) {
      alert("⚠️ Please select at least one category to view services");
      return;
    }
    
    if (selectedCategories.length === 1) {
      setSearchParams({ category: selectedCategories[0].toString() });
    } else if (selectedCategories.length === weddingCategories.length) {
      setSearchParams({});
    } else {
      setSearchParams({ filter: selectedCategories.join(',') });
    }
    
    setIsMobileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsMobileOpen(false);
      }
    };
    if (isMobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* DESKTOP VERSION - PROFESSIONAL REDESIGN */}
      <div className="hidden md:block">
        <div className="bg-white border border-gray-100 shadow-lg overflow-hidden sticky top-24">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  5Digea Services
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {selectedCategories.length} of {weddingCategories.length} selected
                </p>
              </div>
              <button
                onClick={clearAll}
                className="text-sm text-rose-500 hover:text-rose-600 font-medium transition-all hover:scale-105"
              >
                Clear all
              </button>
            </div>

            {/* Search with icon */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Select All Toggle */}
          <div className="px-6 py-3 border-b border-gray-100 bg-white">
            <button
              onClick={toggleSelectAll}
              className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
            >
              <span className="text-sm font-medium text-gray-700">
                {selectedCategories.length === weddingCategories.length ? "Deselect All" : "Select All Categories"}
              </span>
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                selectedCategories.length === weddingCategories.length
                  ? "bg-rose-500 border-rose-500"
                  : "border-gray-300 bg-white group-hover:border-rose-400"
              }`}>
                {selectedCategories.length === weddingCategories.length && (
                  <FiCheck className="text-white text-xs" />
                )}
              </div>
            </button>
          </div>

          {/* Categories List */}
          <div className="max-h-[calc(100vh-220px)] overflow-y-auto custom-scrollbar">
            <div className="p-2 space-y-2">
              {filteredCategories.map((category) => {
                const isSelected = selectedCategories.includes(category.id);
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryToggle(category.id)}
                    className={`w-full group relative flex items-center justify-between px-4 py-1 transition-all duration-200 `}
                  >
                    <div className="flex items-center gap-3">
                      {/* Custom checkbox */}
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-rose-500 border-rose-500 shadow-sm"
                          : "border-gray-300 bg-white group-hover:border-rose-400"
                      }`}>
                        {isSelected && <FiCheck className="text-white text-xs" />}
                      </div>
                      
                      {/* Category name */}
                      <span className={`text-sm font-medium transition-colors ${
                        isSelected ? "text-rose-700" : "text-gray-700 group-hover:text-rose-600"
                      }`}>
                        {category.name}
                      </span>
                    </div>
                    
                    {/* Count badge */}
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                      isSelected
                        ? "bg-rose-100 text-rose-600"
                        : "bg-gray-100 text-gray-500 group-hover:bg-rose-50 group-hover:text-rose-500"
                    }`}>
                      {category.count}
                    </span>
                  </button>
                );
              })}
              
              {filteredCategories.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-sm">No categories found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE VERSION - KEPT EXACTLY THE SAME */}
      <div className="md:hidden mb-3 flex justify-center mt-2">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 bg-pink-500 text-white px-5 py-2 shadow-2xl hover:bg-pink-600 transition-all duration-200 text-sm font-medium"
        >
          <FiFilter className="text-base" />
          Filters
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            <motion.div
              ref={drawerRef}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed top-[65px] left-0 right-0 z-50 bg-white rounded-b-md shadow-lg p-4 border-t border-gray-200 max-h-[80vh] overflow-y-auto mt-2"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-semibold text-gray-800">
                  Wedding Services
                </h3>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <FiX size={20} />
                </button>
              </div>

              <button
                onClick={toggleSelectAll}
                className={`w-full mb-3 py-1.5 rounded-lg text-sm font-medium ${
                  selectedCategories.length === weddingCategories.length
                    ? "bg-gray-200 text-gray-800"
                    : "bg-pink-100 text-pink-600 hover:bg-pink-200"
                } transition-all duration-200`}
              >
                {selectedCategories.length === weddingCategories.length
                  ? "Unselect All"
                  : "Select All"}
              </button>

              <div className="grid grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto">
                {filteredCategories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center gap-2 text-xs cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="accent-pink-500 w-3.5 h-3.5"
                    />
                    <span className="truncate text-gray-700">
                      {category.name}
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={clearAll}
                  className="flex-1 py-1.5 border border-gray-300 rounded-lg text-gray-700 text-sm hover:bg-gray-100"
                >
                  Clear
                </button>
                <button
                  onClick={applyFilters}
                  className="flex-1 bg-gradient-to-l from-pink-500 to-purple-600 text-white py-1.5 rounded-lg text-sm font-semibold hover:from-pink-600 hover:to-purple-700"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f43f5e;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #e11d48;
        }
      `}</style>
    </>
  );
}