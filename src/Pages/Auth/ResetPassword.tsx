// src/Pages/Auth/ResetPassword.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiLock, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState({
    score: 0,
    criteria: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false
    }
  });

  const checkPasswordStrength = (password: string) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    const score = Object.values(criteria).filter(Boolean).length;
    
    setStrength({
      score,
      criteria
    });
  };

  const handlePasswordChange = (value: string, field: 'newPassword' | 'confirmPassword') => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (field === 'newPassword') {
      checkPasswordStrength(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      alert('كلمتا المرور غير متطابقتين');
      return;
    }
    
    setLoading(true);
    
    // محاكاة عملية الحفظ
    setTimeout(() => {
      setLoading(false);
      navigate('/login?reset=success');
    }, 1500);
  };

  const getStrengthColor = () => {
    if (strength.score < 2) return '#EF4444';
    if (strength.score < 4) return '#F59E0B';
    return '#10B981';
  };

  const getStrengthText = () => {
    if (strength.score < 2) return 'ضعيفة';
    if (strength.score < 4) return 'متوسطة';
    return 'قوية';
  };

  return (
    <div className="auth-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="reset-wrapper"
      >
        <div className="reset-card">
          <div className="card-header">
            <h1>بداية جديدة</h1>
            <p>اختر كلمة مرور قوية لتأمين حسابك</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* كلمة المرور الجديدة */}
            <div className="password-field">
              <label htmlFor="newPassword">
                <FiLock />
                <span>كلمة المرور الجديدة</span>
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={(e) => handlePasswordChange(e.target.value, 'newPassword')}
                  placeholder="أدخل كلمة المرور الجديدة"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* مؤشر القوة */}
              <div className="strength-indicator">
                <div className="strength-bar">
                  <div 
                    className="strength-fill"
                    style={{
                      width: `${(strength.score / 5) * 100}%`,
                      backgroundColor: getStrengthColor()
                    }}
                  ></div>
                </div>
                <div className="strength-label">
                  <span>قوة كلمة المرور:</span>
                  <span style={{ color: getStrengthColor() }}>
                    {getStrengthText()}
                  </span>
                </div>
              </div>

              {/* معايير القوة */}
              <div className="criteria-list">
                {Object.entries(strength.criteria).map(([key, met]) => (
                  <div key={key} className={`criterion ${met ? 'met' : ''}`}>
                    {met ? <FiCheck className="check-icon" /> : <div className="circle" />}
                    <span>
                      {key === 'length' && '8 أحرف على الأقل'}
                      {key === 'uppercase' && 'حرف كبير (A-Z)'}
                      {key === 'lowercase' && 'حرف صغير (a-z)'}
                      {key === 'number' && 'رقم واحد على الأقل'}
                      {key === 'special' && 'رمز خاص (!@#$)'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* تأكيد كلمة المرور */}
            <div className="password-field">
              <label htmlFor="confirmPassword">
                <FiLock />
                <span>تأكيد كلمة المرور</span>
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => handlePasswordChange(e.target.value, 'confirmPassword')}
                  placeholder="أعد إدخال كلمة المرور"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              
              {/* تأكيد المطابقة */}
              {formData.confirmPassword && (
                <div className={`match-indicator ${
                  formData.newPassword === formData.confirmPassword ? 'match' : 'no-match'
                }`}>
                  {formData.newPassword === formData.confirmPassword ? 
                    '✓ كلمتا المرور متطابقتان' : 
                    '✗ كلمتا المرور غير متطابقتان'}
                </div>
              )}
            </div>

            {/* زر الحفظ */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-gold reset-btn"
              disabled={loading || strength.score < 3 || formData.newPassword !== formData.confirmPassword}
            >
              {loading ? 'جاري الحفظ...' : 'حفظ كلمة المرور الجديدة'}
            </motion.button>
          </form>

          {/* رسالة نجاح محتملة */}
          <div className="success-note">
            <p>تم تحديث حمايتك بنجاح! يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.</p>
            <Link to="/login" className="login-link">
              الانتقال لتسجيل الدخول
            </Link>
          </div>
        </div>
      </motion.div>

      <style>{`
        .reset-wrapper {
          width: 100%;
          max-width: 500px;
        }
        
        .reset-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: var(--shadow-medium);
        }
        
        .card-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .card-header h1 {
          font-family: 'El Messiri', serif;
          font-size: 2rem;
          color: var(--gold-dark);
          margin-bottom: 10px;
        }
        
        .card-header p {
          color: #666;
        }
        
        .password-field {
          margin-bottom: 25px;
        }
        
        .password-field label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          color: var(--gold-dark);
          font-weight: 500;
        }
        
        .password-input-wrapper {
          position: relative;
        }
        
        .password-input-wrapper input {
          width: 100%;
          padding: 15px 50px 15px 20px;
          border: 2px solid var(--gold-light);
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .password-input-wrapper input:focus {
          outline: none;
          border-color: var(--gold-primary);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        }
        
        .toggle-password {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--gold-dark);
          cursor: pointer;
          font-size: 1.2rem;
          padding: 5px;
        }
        
        .strength-indicator {
          margin-top: 15px;
        }
        
        .strength-bar {
          height: 6px;
          background: #E5E7EB;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        
        .strength-fill {
          height: 100%;
          transition: all 0.3s ease;
        }
        
        .strength-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: #6B7280;
        }
        
        .criteria-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 15px;
          padding: 15px;
          background: #F9FAFB;
          border-radius: 10px;
        }
        
        @media (max-width: 480px) {
          .criteria-list {
            grid-template-columns: 1fr;
          }
        }
        
        .criterion {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: #9CA3AF;
        }
        
        .criterion.met {
          color: #10B981;
        }
        
        .check-icon {
          color: #10B981;
        }
        
        .circle {
          width: 12px;
          height: 12px;
          border: 2px solid #D1D5DB;
          border-radius: 50%;
        }
        
        .match-indicator {
          margin-top: 10px;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .match-indicator.match {
          background: #D1FAE5;
          color: #065F46;
        }
        
        .match-indicator.no-match {
          background: #FEE2E2;
          color: #991B1B;
        }
        
        .reset-btn {
          width: 100%;
          height: 50px;
          font-size: 1.1rem;
          margin-top: 20px;
        }
        
        .reset-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .success-note {
          margin-top: 30px;
          padding: 20px;
          background: #ECFDF5;
          border-radius: 12px;
          border: 1px solid #A7F3D0;
          text-align: center;
        }
        
        .success-note p {
          color: #065F46;
          margin-bottom: 15px;
        }
        
        .login-link {
          display: inline-block;
          color: #059669;
          font-weight: 600;
          text-decoration: none;
        }
        
        .login-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default ResetPassword;