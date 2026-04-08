import { Link } from "react-router-dom";
import { FaHeartBroken, FaHome, FaHeart, FaRing } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 sm:w-64 h-40 sm:h-64 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full opacity-20 blur-xl animate-pulse-slow"></div>
        <div className="absolute -bottom-24 sm:-bottom-32 -right-24 sm:-right-32 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-r from-red-200 to-rose-200 rounded-full opacity-20 blur-xl animate-bounce-slow"></div>

        <div className="absolute top-1/3 left-1/4 animate-float">
          <FaHeart className="text-rose-300 text-lg sm:text-2xl opacity-60" />
        </div>
        <div className="absolute top-1/2 right-1/3 animate-float-delayed">
          <FaHeart className="text-pink-300 text-base sm:text-xl opacity-50" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float-slow">
          <FaHeart className="text-red-300 text-xl sm:text-3xl opacity-40" />
        </div>

        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 animate-spin-slow">
          <FaRing className="text-amber-400 text-base sm:text-xl opacity-70" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-lg sm:max-w-2xl">
        
        <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full mb-6 sm:mb-8"></div>

        <div className="relative mb-6 sm:mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full blur-lg opacity-70 scale-110 animate-ping-slow"></div>
          <div className="relative bg-white p-4 sm:p-6 rounded-full shadow-2xl border-4 border-rose-100">
            <FaHeartBroken className="text-rose-500 text-5xl sm:text-7xl md:text-8xl" />
          </div>
        </div>

        <div className="relative mb-4 sm:mb-6">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black bg-gradient-to-br from-rose-600 via-pink-600 to-red-600 bg-clip-text text-transparent relative">
            404
            <span className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 text-2xl sm:text-4xl">💔</span>
          </h1>
          <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full blur-md opacity-50 -z-10"></div>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-rose-800 mb-3 sm:mb-4">
          عذراً.. الصفحة غير موجودة!
        </h2>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/90 mb-8 sm:mb-10 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
          <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
            يبدو أن العروس والعريس تاهوا قليلاً في التحضيرات 🥹<br />
            لكن لا تقلق، يمكنك العودة إلى رحلتنا الرائعة<br />
            واستكمال التحضيرات للعرس الأسطوري ✨💍
          </p>
        </div>

        <Link
          to="/"
          className="group relative inline-flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden text-sm sm:text-base md:text-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <div className="relative z-10 p-1.5 sm:p-2 bg-white/20 rounded-full">
            <FaHome className="text-base sm:text-xl transition-transform duration-300 group-hover:scale-110" />
          </div>
          
          <span className="relative z-10 font-bold tracking-wide">
            العودة إلى الصفحة الرئيسية
          </span>
        </Link>

        <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-rose-700/80 font-medium">
          استمر في رحلة التحضير للعرس الأسطوري معنا 💕
        </p>
      </div>

      <div className="absolute bottom-4 sm:bottom-6 text-xs sm:text-sm text-rose-900/60 font-medium">
        مع كل الحب.. فريق تحضيرات العرس السعيد ❤️
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(10px) rotate(-5deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(5px) rotate(3deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0.7; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style>
    </div>
  );
}
