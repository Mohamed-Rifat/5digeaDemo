// src/Pages/Auth/Register.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiCalendar, FiHeart, FiMail, FiLock, FiUser, FiArrowRight, FiCheck } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
// import axios from 'axios';
// import WeddingLogo from '../../Components/Brand/WeddingLogo';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    weddingDate: '',
    role: 'bride' // 'bride' أو 'groom'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // After successful registration
    navigate('/dashboard/onboarding');
  };

  const progress = formData.name && formData.email && formData.password 
    ? (formData.weddingDate ? 100 : 75) 
    : 50;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-white flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-gold-light/20 to-pink-soft/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-l from-gold-light/10 to-rose-100/30 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-6xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gold-light/20 overflow-hidden border border-white/30"
      >
        {/* Decorative Top Bar */}
        <div className="h-2 bg-gradient-to-r from-gold-light via-gold-primary to-gold-dark" />

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
          {/* Left Side - Hero Section */}
          <div className="relative p-12 bg-gradient-to-br from-gold-light/10 via-white to-pink-soft/10 border-r border-white/30">
            <div className="absolute top-6 left-6">
              {/* <WeddingLogo size="md" /> */}
            </div>
            
            <div className="h-full flex flex-col justify-center items-center text-center space-y-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="relative"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gold-light to-gold-primary p-1 shadow-2xl shadow-gold-light/30">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <FiHeart className="w-16 h-16 text-gold-primary" />
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 border-2 border-dashed border-gold-light/50 rounded-full"
                />
              </motion.div>

              <div className="space-y-4">
                <h1 className="text-4xl font-arabic font-bold text-gray-800">
                  ابدأ رحلة حبك
                </h1>
                <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                  يوم زفافك يستحق التخطيط المثالي. لنبدأ معًا هذه الرحلة السعيدة ونبني ذكريات لن تنسى
                </p>
              </div>

              {/* Progress Steps */}
              <div className="w-full max-w-md space-y-6">
                {[
                  { number: 1, label: "إنشاء الحساب", active: true },
                  { number: 2, label: "تفاصيل الفرح", active: false },
                  { number: 3, label: "جاهز للبدء!", active: false }
                ].map((step, index) => (
                  <div key={step.number} className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center 
                      ${step.active ? 'bg-gradient-to-br from-gold-primary to-gold-dark text-white shadow-lg shadow-gold-light/30' 
                      : 'bg-gray-100 text-gray-400'}`}>
                      {step.active ? (
                        <FiCheck className="w-6 h-6" />
                      ) : (
                        <span className="text-lg font-semibold">{step.number}</span>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-arabic font-semibold text-gray-700">{step.label}</h3>
                      <p className="text-sm text-gray-500">خطوة {step.number} من 3</p>
                    </div>
                    {index < 2 && (
                      <div className="flex-1 h-1 bg-gradient-to-r from-gold-light/50 to-gray-100 rounded-full" />
                    )}
                  </div>
                ))}
              </div>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                {[
                  { icon: "🎨", text: "تصميم مخصص" },
                  { icon: "📅", text: "مخطط زمني" },
                  { icon: "💰", text: "ميزانية ذكية" },
                  { icon: "👥", text: "قائمة الضيوف" }
                ].map((feature) => (
                  <div key={feature.text} className="flex items-center gap-3 p-3 bg-white/50 rounded-xl backdrop-blur-sm">
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="font-arabic text-sm text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full space-y-8">
              {/* Form Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <HiOutlineSparkles className="w-6 h-6 text-gold-primary" />
                  <h2 className="text-3xl font-arabic font-bold text-gray-800">
                    أنشئ عالمك الخاص
                  </h2>
                </div>
                <p className="text-gray-500">
                  املأ التفاصيل لبدء التخطيط ليومك السعيد
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">تقدمك</span>
                  <span className="font-semibold text-gold-dark">{progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-gold-light to-gold-primary rounded-full"
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Role Selector */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'bride', icon: '👰', label: 'عروسة', color: 'from-pink-soft to-rose-100' },
                    { value: 'groom', icon: '🤵', label: 'عريس', color: 'from-blue-50 to-cyan-100' }
                  ].map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, role: role.value })}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 
                        ${formData.role === role.value 
                          ? 'border-gold-primary shadow-lg shadow-gold-light/20' 
                          : 'border-gray-200 hover:border-gold-light'} 
                        bg-gradient-to-br ${role.color}`}
                    >
                      <div className="text-4xl mb-2">{role.icon}</div>
                      <div className="font-arabic font-semibold text-gray-700">{role.label}</div>
                    </button>
                  ))}
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {[
                    { name: 'name', icon: FiUser, placeholder: 'الاسم الكامل', type: 'text' },
                    { name: 'email', icon: FiMail, placeholder: 'البريد الإلكتروني', type: 'email' },
                    { name: 'password', icon: FiLock, placeholder: 'كلمة المرور', type: 'password' },
                    { name: 'weddingDate', icon: FiCalendar, placeholder: 'تاريخ الزفاف المتوقع', type: 'date' }
                  ].map((field) => (
                    <div key={field.name} className="relative group">
                      <field.icon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gold-primary transition-colors" />
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        className="w-full p-4 pl-4 pr-12 bg-white border-2 border-gray-200 rounded-xl 
                          focus:border-gold-primary focus:ring-2 focus:ring-gold-light/30 
                          transition-all duration-300 outline-none
                          placeholder:text-gray-400"
                        placeholder={field.placeholder}
                        required
                      />
                      {field.type === 'date' && !formData.weddingDate && (
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                          {field.placeholder}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Privacy Agreement */}
                <div className="p-4 bg-gradient-to-r from-rose-50/50 to-amber-50/50 rounded-xl border border-rose-100">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-gold-primary 
                        focus:ring-gold-light focus:ring-2"
                    />
                    <div className="text-sm text-gray-600">
                      <span>أوافق على </span>
                      <Link to="/privacy" className="text-gold-dark font-semibold hover:underline">
                        شروط الخدمة وسياسة الخصوصية
                      </Link>
                      <p className="mt-1 text-xs text-gray-500">
                        نحن نحترم خصوصية يومك ونساعد في تنظيم كل التفاصيل
                      </p>
                    </div>
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-gold-primary to-gold-dark 
                    text-white font-semibold rounded-xl shadow-lg shadow-gold-light/30 
                    hover:shadow-xl hover:shadow-gold-light/40 transition-all duration-300 
                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>جاري الإنشاء...</span>
                    </>
                  ) : (
                    <>
                      <span className="font-arabic text-lg">ابدأ حلمك</span>
                      <FiArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Login Link */}
                <div className="text-center pt-6 border-t border-gray-100">
                  <p className="text-gray-600">
                    لديك حساب بالفعل؟{' '}
                    <Link to="/login" className="text-gold-dark font-semibold hover:underline">
                      استكمل رحلتك
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-pink-soft/20 to-gold-light/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-tr from-gold-light/10 to-amber-100/20 rounded-full blur-xl"
        />
      </motion.div>

      {/* Footer Note */}
      <div className="absolute bottom-4 text-center text-gray-400 text-sm">
        <p>© 2024 رحلة حب. جميع الحقوق محفوظة</p>
      </div>
    </div>
  );
};

export default Register;