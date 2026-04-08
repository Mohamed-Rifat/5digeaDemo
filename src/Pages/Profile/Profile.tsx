import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Circle,
  Search,
  ShoppingBag,
  ChevronRight,
  Heart,
  Sparkles,
  Camera,
  Music,
  Cake,
  Flower2,
  Shirt,
  Gem,
  MapPin,
  X,
  AlertCircle,
  ThumbsUp,
  Edit2,
  Calendar,
  User,
  Users,
  Clock,
} from "lucide-react";

interface UserInfo {
  name: string;
  partnerName: string;
  eventDate: Date | null;
}

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "not-started" | "searching" | "booked";
  iconName: string;
  navigateTo?: string;
  filterCategory?: number;
  completedDate?: Date | null;
}

// Map icon names to actual components
const getIconComponent = (iconName: string, className: string = "w-5 h-5") => {
  const icons: Record<string, React.ReactNode> = {
    Shirt: <Shirt className={className} />,
    Gem: <Gem className={className} />,
    MapPin: <MapPin className={className} />,
    Camera: <Camera className={className} />,
    Sparkles: <Sparkles className={className} />,
    Cake: <Cake className={className} />,
    Music: <Music className={className} />,
    Flower2: <Flower2 className={className} />,
  };
  return icons[iconName] || <Heart className={className} />;
};

export default function Profile() {
  const navigate = useNavigate();

  // User Info State
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    partnerName: "",
    eventDate: null,
  });
  const [isEditing, setIsEditing] = useState(true);
  const [tempName, setTempName] = useState("");
  const [tempPartnerName, setTempPartnerName] = useState("");
  const [tempDate, setTempDate] = useState("");

  // Focus states for inputs
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Validation errors
  const [errors, setErrors] = useState({
    name: false,
    partnerName: false,
  });

  // Countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Tasks
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "mens-suits",
      title: "Groom's Suit",
      description: "Find the perfect suit that reflects your style",
      category: "Attire",
      status: "not-started",
      iconName: "Shirt",
      navigateTo: "/services",
      filterCategory: 2,
      completedDate: null,
    },
    {
      id: "bridal-dresses",
      title: "Bridal Dress",
      description: "Choose your dream wedding gown",
      category: "Attire",
      status: "not-started",
      iconName: "Gem",
      navigateTo: "/services",
      filterCategory: 1,
      completedDate: null,
    },
    {
      id: "wedding-halls",
      title: "Wedding Venue",
      description: "Book the perfect venue for your celebration",
      category: "Venue",
      status: "not-started",
      iconName: "MapPin",
      navigateTo: "/services",
      filterCategory: 3,
      completedDate: null,
    },
    {
      id: "photography",
      title: "Photography & Videography",
      description: "Capture every precious moment forever",
      category: "Media",
      status: "not-started",
      iconName: "Camera",
      navigateTo: "/services",
      filterCategory: 5,
      completedDate: null,
    },
    {
      id: "makeup-hair",
      title: "Makeup & Hair",
      description: "Professional beauty services for your glow",
      category: "Beauty",
      status: "not-started",
      iconName: "Sparkles",
      navigateTo: "/services",
      filterCategory: 7,
      completedDate: null,
    },
    {
      id: "wedding-cakes",
      title: "Wedding Cake",
      description: "Design your dream cake",
      category: "Catering",
      status: "not-started",
      iconName: "Cake",
      navigateTo: "/services",
      filterCategory: 15,
      completedDate: null,
    },
    {
      id: "music-entertainment",
      title: "Music & Entertainment",
      description: "Keep the celebration alive",
      category: "Entertainment",
      status: "not-started",
      iconName: "Music",
      navigateTo: "/services",
      filterCategory: 10,
      completedDate: null,
    },
    {
      id: "event-decoration",
      title: "Event Decoration",
      description: "Transform your venue into magic",
      category: "Decor",
      status: "not-started",
      iconName: "Flower2",
      navigateTo: "/services",
      filterCategory: 11,
      completedDate: null,
    },
  ]);

  // Modal State
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Load saved data
  useEffect(() => {
    try {
      const savedInfo = localStorage.getItem("weddingRoadmap");
      if (savedInfo) {
        const parsed = JSON.parse(savedInfo);
        setUserInfo({
          name: parsed.name || "",
          partnerName: parsed.partnerName || "",
          eventDate: parsed.eventDate ? new Date(parsed.eventDate) : null,
        });
        setIsEditing(false);
      }

      const savedTasks = localStorage.getItem("weddingTasks");
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        const tasksWithDates = parsedTasks.map((task: any) => ({
          ...task,
          completedDate: task.completedDate ? new Date(task.completedDate) : null,
        }));
        setTasks(tasksWithDates);
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isEditing && userInfo.name && userInfo.partnerName) {
      try {
        const infoToSave = {
          name: userInfo.name,
          partnerName: userInfo.partnerName,
          eventDate: userInfo.eventDate ? userInfo.eventDate.toISOString() : null,
        };
        localStorage.setItem("weddingRoadmap", JSON.stringify(infoToSave));
      } catch (error) {
        console.error("Error saving user info:", error);
      }
    }
  }, [userInfo, isEditing]);

  useEffect(() => {
    try {
      const tasksToSave = tasks.map(task => ({
        ...task,
        completedDate: task.completedDate ? task.completedDate.toISOString() : null,
      }));
      localStorage.setItem("weddingTasks", JSON.stringify(tasksToSave));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  }, [tasks]);

  // Countdown timer - only if date exists
  useEffect(() => {
    if (!userInfo.eventDate) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const eventTime = userInfo.eventDate!.getTime();
      const distance = eventTime - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [userInfo.eventDate]);

  const saveUserInfo = () => {
    // Validate names are required
    const hasNameError = !tempName.trim();
    const hasPartnerError = !tempPartnerName.trim();

    setErrors({
      name: hasNameError,
      partnerName: hasPartnerError,
    });

    // Only require names, date is optional
    if (hasNameError || hasPartnerError) {
      return;
    }

    setUserInfo({
      name: tempName.trim(),
      partnerName: tempPartnerName.trim(),
      eventDate: tempDate ? new Date(tempDate) : null,
    });
    setIsEditing(false);
  };

  const handleEditInfo = () => {
    setTempName(userInfo.name);
    setTempPartnerName(userInfo.partnerName);
    setTempDate(userInfo.eventDate ? userInfo.eventDate.toISOString().split('T')[0] : "");
    setErrors({ name: false, partnerName: false });
    setIsEditing(true);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleStartSearch = (task: Task) => {
    setShowModal(false);
    setTasks(prev =>
      prev.map(t =>
        t.id === task.id
          ? { ...t, status: "searching", completedDate: null }
          : t
      )
    );
    if (task.navigateTo && task.filterCategory) {
      navigate(`${task.navigateTo}?category=${task.filterCategory}&source=roadmap&action=search`);
    }
  };

  const handleMarkBooked = (task: Task) => {
    setShowModal(false);
    setTasks(prev =>
      prev.map(t =>
        t.id === task.id
          ? { ...t, status: "booked", completedDate: new Date() }
          : t
      )
    );
  };

  const handleContinueSearch = (task: Task) => {
    setShowModal(false);
    if (task.navigateTo && task.filterCategory) {
      navigate(`${task.navigateTo}?category=${task.filterCategory}&source=roadmap&action=continue`);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "booked":
        return {
          label: "Booked ✓",
          color: "emerald",
          bgColor: "bg-emerald-50",
          textColor: "text-emerald-600",
          borderColor: "border-emerald-200",
          icon: <CheckCircle className="w-4 h-4" />,
          progress: 100,
        };
      case "searching":
        return {
          label: "Searching...",
          color: "amber",
          bgColor: "bg-amber-50",
          textColor: "text-amber-600",
          borderColor: "border-amber-200",
          icon: <Search className="w-4 h-4" />,
          progress: 50,
        };
      default:
        return {
          label: "Not Started",
          color: "gray",
          bgColor: "bg-gray-50",
          textColor: "text-gray-400",
          borderColor: "border-gray-200",
          icon: <Circle className="w-4 h-4" />,
          progress: 0,
        };
    }
  };

  const bookedTasks = tasks.filter(t => t.status === "booked").length;
  const searchingTasks = tasks.filter(t => t.status === "searching").length;
  const notStartedTasks = tasks.filter(t => t.status === "not-started").length;
  const totalTasks = tasks.length;
  const completionPercentage = (bookedTasks / totalTasks) * 100;

  const tasksByCategory = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  // Get min date for date picker (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // If no user info saved, show setup form
  if (isEditing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 opacity-20">
            <Heart className="w-20 h-20 text-rose-400" />
          </div>
          <div className="absolute bottom-10 right-10 opacity-20">
            <Sparkles className="w-16 h-16 text-amber-400" />
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50 relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-center mb-8"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg rotate-6">
                <Heart className="w-10 h-10 text-white fill-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
                Wedding Roadmap
              </h1>
              <p className="text-gray-500 mt-2">Let's plan your perfect day together</p>
            </motion.div>

            <div className="space-y-5">
              {/* Your Name Input - Required */}
              <div className="relative">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-200 ${focusedField === "name" || tempName ? "text-amber-500" : "text-gray-400"
                  }`}>
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => {
                    setTempName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: false });
                  }}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your name *"
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white/80
                    ${errors.name
                      ? "border-red-400 ring-4 ring-red-100"
                      : focusedField === "name"
                        ? "border-amber-400 shadow-lg shadow-amber-100 ring-4 ring-amber-100"
                        : "border-gray-200 hover:border-amber-300"
                    }`}
                />
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: focusedField === "name" ? 1 : 0, x: focusedField === "name" ? 0 : -10 }}
                  className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-amber-500"
                >
                  Your Name *
                </motion.div>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500 mt-1 ml-3"
                  >
                    Please enter your name
                  </motion.p>
                )}
              </div>

              {/* Partner's Name Input - Required */}
              <div className="relative">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-200 ${focusedField === "partner" || tempPartnerName ? "text-rose-500" : "text-gray-400"
                  }`}>
                  <Users className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={tempPartnerName}
                  onChange={(e) => {
                    setTempPartnerName(e.target.value);
                    if (errors.partnerName) setErrors({ ...errors, partnerName: false });
                  }}
                  onFocus={() => setFocusedField("partner")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Partner's name *"
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white/80
                    ${errors.partnerName
                      ? "border-red-400 ring-4 ring-red-100"
                      : focusedField === "partner"
                        ? "border-rose-400 shadow-lg shadow-rose-100 ring-4 ring-rose-100"
                        : "border-gray-200 hover:border-rose-300"
                    }`}
                />
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: focusedField === "partner" ? 1 : 0, x: focusedField === "partner" ? 0 : -10 }}
                  className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-rose-500"
                >
                  Partner's Name *
                </motion.div>
                {errors.partnerName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500 mt-1 ml-3"
                  >
                    Please enter partner's name
                  </motion.p>
                )}
              </div>

              {/* Wedding Date Input - Optional, only future dates allowed */}
              <div className="relative">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-200 ${focusedField === "date" || tempDate ? "text-purple-500" : "text-gray-400"
                  }`}>
                  <Calendar className="w-5 h-5" />
                </div>
                <input
                  type="date"
                  value={tempDate}
                  onChange={(e) => setTempDate(e.target.value)}
                  onFocus={() => setFocusedField("date")}
                  onBlur={() => setFocusedField(null)}
                  min={getMinDate()}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white/80
                    ${focusedField === "date"
                      ? "border-purple-400 shadow-lg shadow-purple-100 ring-4 ring-purple-100"
                      : "border-gray-200 hover:border-purple-300"
                    }`}
                />
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: focusedField === "date" ? 1 : 0, x: focusedField === "date" ? 0 : -10 }}
                  className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-purple-500"
                >
                  Wedding Date (Optional)
                </motion.div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Clock className="w-4 h-4" />
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-3 text-xs text-gray-500 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>You can always add or update your wedding date later. Only names are required to get started!</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={saveUserInfo}
                disabled={!tempName || !tempPartnerName}
                className="w-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6 shadow-lg hover:shadow-xl"
              >
                Begin Your Journey ✨
              </motion.button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-6">
              Start planning your dream wedding with us
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-amber-100 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 15 }}
                className="w-10 h-10 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full flex items-center justify-center shadow-md"
              >
                <Heart className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h2 className="font-semibold text-gray-800 text-lg">
                  {userInfo.name} <span className="text-rose-400">❤</span> {userInfo.partnerName}
                </h2>
                {userInfo.eventDate ? (
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {userInfo.eventDate?.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                ) : (
                  <p className="text-xs text-amber-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Date not set yet
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Countdown - only show if date exists */}
              {userInfo.eventDate ? (
                <div className="flex gap-2">
                  {[
                    { value: timeLeft.days, label: "Days" },
                    { value: timeLeft.hours, label: "Hours" },
                    { value: timeLeft.minutes, label: "Mins" },
                    { value: timeLeft.seconds, label: "Secs" },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="bg-white shadow-md rounded-xl px-3 py-1 min-w-[55px] border border-amber-100">
                        <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
                          {String(item.value).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span className="text-xs text-amber-600 font-medium">Set your date</span>
                </div>
              )}

              <button
                onClick={handleEditInfo}
                className="text-gray-400 hover:text-amber-600 transition-all duration-200 hover:bg-amber-50 p-2 rounded-full"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-amber-100">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full relative"
                >
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"
                  />
                </motion.div>
              </div>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" /> {bookedTasks}</span>
              <span className="flex items-center gap-1"><Search className="w-3 h-3 text-amber-500" /> {searchingTasks}</span>
              <span className="flex items-center gap-1"><Circle className="w-3 h-3 text-gray-400" /> {notStartedTasks}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Warning banner if date not set */}
        {!userInfo.eventDate && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-sm font-medium text-amber-700">Wedding date not set</p>
                <p className="text-xs text-amber-600">Set your wedding date to see the countdown and better plan your timeline</p>
              </div>
            </div>
            <button
              onClick={handleEditInfo}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
            >
              Set Date
            </button>
          </motion.div>
        )}

        <div className="space-y-10">
          {Object.entries(tasksByCategory).map(([category, categoryTasks]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-rose-500 rounded-full"></div>
                  {category}
                </h3>
                <span className="text-sm text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm">
                  {categoryTasks.filter(t => t.status === "booked").length}/{categoryTasks.length} completed
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {categoryTasks.map((task, index) => {
                  const statusConfig = getStatusConfig(task.status);
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      onClick={() => handleTaskClick(task)}
                      className={`bg-white rounded-2xl p-5 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 ${statusConfig.borderColor} relative overflow-hidden group`}
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-50 to-rose-50 rounded-full -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="flex items-start justify-between mb-3 relative z-10">
                        <div className={`w-12 h-12 rounded-xl ${statusConfig.bgColor} flex items-center justify-center ${statusConfig.textColor} transition-transform group-hover:scale-110 duration-300`}>
                          {getIconComponent(task.iconName, "w-6 h-6")}
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full ${statusConfig.bgColor} ${statusConfig.textColor} flex items-center gap-1 font-medium`}>
                          {statusConfig.icon}
                          {statusConfig.label}
                        </span>
                      </div>

                      <h4 className="font-bold text-gray-800 mb-1 text-lg">{task.title}</h4>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{task.description}</p>

                      {task.status === "searching" && (
                        <div className="mt-3">
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              animate={{ width: ["0%", "50%", "50%"] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"
                            />
                          </div>
                          <p className="text-[10px] text-amber-500 mt-1.5 font-medium">Comparing vendors...</p>
                        </div>
                      )}

                      {task.status === "booked" && (
                        <div className="flex items-center gap-1.5 text-emerald-500 text-xs mt-3 font-medium">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Confirmed & Booked!</span>
                        </div>
                      )}

                      {task.status === "not-started" && (
                        <div className="mt-3 text-xs text-gray-400 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Ready to begin?</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center pb-8"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg border border-amber-200">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-gray-600 text-sm font-medium">
              {bookedTasks === totalTasks
                ? "🎉 Congratulations! Everything is ready for your big day!"
                : searchingTasks > 0
                  ? `🔍 Actively searching for ${searchingTasks} service${searchingTasks > 1 ? "s" : ""}`
                  : `✨ ${totalTasks - bookedTasks} tasks remaining! You're doing amazing`}
            </span>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && selectedTask && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
              onClick={() => setShowModal(false)}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
              onClick={(e) => {
                // Prevent click from bubbling to backdrop
                e.stopPropagation();
              }}
            >
              <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-500 p-5 flex justify-between items-center">
                    <div className="flex items-center gap-3 text-white">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        {getIconComponent(selectedTask.iconName, "w-5 h-5")}
                      </div>
                      <h3 className="font-bold text-lg">{selectedTask.title}</h3>
                    </div>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-white hover:bg-white/20 rounded-xl p-2 transition-all duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 mb-6 leading-relaxed">{selectedTask.description}</p>

                    <div className="space-y-3">
                      {selectedTask.status !== "booked" && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleStartSearch(selectedTask)}
                            className="w-full flex items-center justify-between p-4 border-2 border-amber-200 rounded-xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-rose-50 transition-all duration-300 group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                                <Search className="w-5 h-5 text-amber-600" />
                              </div>
                              <div className="text-left">
                                <div className="font-semibold text-gray-800">Start Searching</div>
                                <div className="text-xs text-gray-500">Browse & compare options</div>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleMarkBooked(selectedTask)}
                            className="w-full flex items-center justify-between p-4 border-2 border-emerald-200 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                              </div>
                              <div className="text-left">
                                <div className="font-semibold text-gray-800">Already Booked</div>
                                <div className="text-xs text-gray-500">Mark as completed</div>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                          </motion.button>
                        </>
                      )}

                      {selectedTask.status === "searching" && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleContinueSearch(selectedTask)}
                          className="w-full flex items-center justify-between p-4 border-2 border-amber-200 rounded-xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-rose-50 transition-all duration-300 group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                              <ShoppingBag className="w-5 h-5 text-amber-600" />
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-gray-800">Continue Browsing</div>
                              <div className="text-xs text-gray-500">Find the perfect match</div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      )}

                      {selectedTask.status === "booked" && (
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-center p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl"
                        >
                          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                          <p className="text-emerald-700 font-semibold">You've already booked this!</p>
                          <p className="text-xs text-emerald-600 mt-1">Great progress on your wedding plan 🎉</p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}