import { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { ChevronRight, Heart, Sparkles, Flower2, PartyPopper } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    // Fixed container variants with proper types
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    // Fixed item variants with proper easing
    const itemVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.7,
                ease: "easeOut" as const, // Use 'as const' to fix type
            },
        },
    };

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background with Blur Effect */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover scale-105"
                    style={{ filter: "blur(3px)" }}
                >
                    <source src="https://res.cloudinary.com/dqwoefi7l/video/upload/promo-Wedding_jvscmu.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Floating Wedding Elements */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                {/* Floating Hearts */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={`heart-${i}`}
                        initial={{ opacity: 0, y: 100, x: Math.random() * 100 - 50 }}
                        animate={{
                            opacity: [0, 0.5, 0],
                            y: [100, -100],
                            x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                        }}
                        transition={{
                            duration: 8 + Math.random() * 6,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "linear",
                        }}
                        className="absolute bottom-0 text-rose-300/40"
                        style={{ left: `${Math.random() * 100}%` }}
                    >
                        <Heart className="w-5 h-5 fill-rose-200" />
                    </motion.div>
                ))}

                {/* Floating Flowers */}
                <motion.div
                    initial={{ opacity: 0, y: -50, rotate: -10 }}
                    animate={{ opacity: 0.4, y: 0, rotate: 0 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute top-20 left-10 text-amber-200/50"
                >
                    <Flower2 className="w-12 h-12" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50, rotate: 15 }}
                    animate={{ opacity: 0.4, y: 0, rotate: 0 }}
                    transition={{ duration: 2, delay: 0.8 }}
                    className="absolute bottom-32 right-10 text-rose-200/50"
                >
                    <Flower2 className="w-16 h-16" />
                </motion.div>
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/3 right-20 text-amber-200/40"
                >
                    <PartyPopper className="w-10 h-10" />
                </motion.div>
            </div>

            {/* Sketch Doodle Elements */}
            <motion.svg
                className="absolute top-32 left-16 w-40 h-40 text-white/30 z-10"
                viewBox="0 0 100 100"
                initial={{ opacity: 0, rotate: -15 }}
                animate={{ opacity: 0.5, rotate: 0 }}
                transition={{ duration: 1.5, delay: 0.8 }}
            >
                <path
                    d="M20,50 Q40,30 60,50 T100,50"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                />
                <path
                    d="M30,70 Q50,90 70,70"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                />
                <circle cx="50" cy="50" r="15" stroke="currentColor" fill="none" strokeWidth="1.5" strokeDasharray="3 3" />
            </motion.svg>

            <motion.svg
                className="absolute bottom-32 right-16 w-48 h-48 text-white/30 z-10"
                viewBox="0 0 100 100"
                initial={{ opacity: 0, rotate: 10 }}
                animate={{ opacity: 0.5, rotate: 0 }}
                transition={{ duration: 1.5, delay: 1 }}
            >
                <path
                    d="M50,20 L55,35 L70,35 L60,45 L65,60 L50,50 L35,60 L40,45 L30,35 L45,35 Z"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="1.8"
                />
                <circle cx="50" cy="50" r="25" stroke="currentColor" fill="none" strokeWidth="1.5" strokeDasharray="3 3" />
            </motion.svg>

            {/* Volume Button */}
            <div className="absolute top-6 right-6 z-30">
                <IconButton
                    onClick={toggleMute}
                    className="p-3 rounded-full bg-black/50 backdrop-blur-sm text-white shadow-lg hover:bg-black/70 transition-all"
                    aria-label="Toggle sound"
                >
                    {isMuted ? (
                        <VolumeOffIcon fontSize="large" className="text-rose-400" />
                    ) : (
                        <VolumeUpIcon fontSize="large" className="text-emerald-400" />
                    )}
                </IconButton>
            </div>

            {/* Main Content */}
            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={containerVariants}
                className="relative z-20 max-w-5xl mx-auto text-center px-6"
            >
                <motion.div variants={itemVariants} className="inline-block mb-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-5 py-2 border border-amber-300 shadow-md">
                        <span className="text-amber-800 font-medium text-sm tracking-wide flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-500" /> 5digea • Your Dream Wedding Journey ✨
                        </span>
                    </div>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
                >
                    <span className="bg-gradient-to-r from-amber-200 via-rose-200 to-amber-200 bg-clip-text text-transparent drop-shadow-2xl">
                        Create Your
                    </span>
                    <br />
                    <span className="relative inline-block text-white drop-shadow-2xl">
                        Perfect Wedding Night
                        <motion.svg
                            className="absolute -bottom-8 left-0 w-full"
                            viewBox="0 0 300 12"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 1.2, duration: 1.2, ease: "easeInOut" }}
                        >
                            <motion.path
                                d="M10,8 C80,3 220,3 290,8"
                                stroke="#F59E0B"
                                strokeWidth="2.5"
                                fill="none"
                                strokeLinecap="round"
                            />
                        </motion.svg>
                    </span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-8 drop-shadow-lg"
                >
                    Everything you need for your special day — from stunning venues to exquisite details,
                    all in one place. Let us help you craft the wedding you've always dreamed of.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center">
                    <motion.button
                        onClick={() => navigate("/profile")} // 👈 غير اللينك هنا
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold shadow-xl flex items-center gap-2 transition-all"
                    >
                        Start Planning
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    <motion.button
                        onClick={() => navigate("/services")} // 👈 غير اللينك هنا
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="border-2 border-white bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-8 py-3 rounded-full font-semibold transition-all"
                    >
                        Explore Services
                    </motion.button>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    variants={itemVariants}
                    className="absolute bottom-[-80px] left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                        <div className="w-1 h-2 bg-white/70 rounded-full mt-2 animate-pulse"></div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}