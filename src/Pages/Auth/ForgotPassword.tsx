// src/Pages/Auth/ForgotPassword.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // محاكاة إرسال البريد
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="auth-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="forgot-wrapper"
      >
        <div className="forgot-card">
          <Link to="/login" className="back-link">
            <FiArrowLeft />
            <span>العودة لتسجيل الدخول</span>
          </Link>

          {!submitted ? (
            <>
              <div className="icon-wrapper">
                <div className="help-icon">?</div>
              </div>
              
              <h1>لا تقلق، سنساعدك</h1>
              <p className="description">
                أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
              </p>

              <form onSubmit={handleSubmit} className="forgot-form">
                <div className="input-group">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn-gold"
                  disabled={loading}
                >
                  {loading ? 'جاري الإرسال...' : 'إرسال رابط التعيين'}
                </motion.button>
              </form>

              <div className="help-text">
                <p>ملاحظة: الرابط سيكون صالحاً لمدة 60 دقيقة فقط</p>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="success-message"
            >
              <FiCheckCircle className="success-icon" />
              <h2>تم الإرسال بنجاح!</h2>
              <p>
                تم إرسال رابط إعادة التعيين إلى <strong>{email}</strong>
              </p>
              <p className="check-text">
                يرجى التحقق من صندوق الوارد أو الرسائل غير المرغوب فيها
              </p>
              
              <div className="action-buttons">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail('');
                  }}
                  className="btn-outline-gold"
                >
                  إعادة إرسال
                </button>
                <Link to="/login" className="btn-gold">
                  العودة للدخول
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      <style>{`
        .forgot-wrapper {
          width: 100%;
          max-width: 450px;
        }
        
        .forgot-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: var(--shadow-medium);
          text-align: center;
        }
        
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--gold-dark);
          text-decoration: none;
          margin-bottom: 30px;
          font-size: 0.9rem;
        }
        
        .back-link:hover {
          text-decoration: underline;
        }
        
        .icon-wrapper {
          margin-bottom: 20px;
        }
        
        .help-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--gold-light), var(--pink-soft));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          font-size: 2.5rem;
          color: var(--gold-dark);
          font-weight: bold;
        }
        
        .forgot-card h1 {
          font-family: 'El Messiri', serif;
          font-size: 2rem;
          color: var(--gold-dark);
          margin-bottom: 15px;
        }
        
        .description {
          color: #666;
          margin-bottom: 30px;
          line-height: 1.6;
        }
        
        .forgot-form {
          margin-bottom: 25px;
        }
        
        .input-group {
          position: relative;
          margin-bottom: 25px;
        }
        
        .input-group .input-icon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gold-dark);
        }
        
        .input-group input {
          width: 100%;
          padding: 15px 45px 15px 15px;
          border: 2px solid var(--gold-light);
          border-radius: 12px;
          font-size: 1rem;
        }
        
        .input-group input:focus {
          outline: none;
          border-color: var(--gold-primary);
        }
        
        .help-text {
          background: var(--pink-light);
          padding: 15px;
          border-radius: 10px;
          margin-top: 20px;
        }
        
        .help-text p {
          color: var(--gold-dark);
          font-size: 0.9rem;
          margin: 0;
        }
        
        .success-message {
          padding: 20px 0;
        }
        
        .success-icon {
          font-size: 4rem;
          color: #10B981;
          margin-bottom: 20px;
        }
        
        .success-message h2 {
          color: #10B981;
          margin-bottom: 15px;
        }
        
        .success-message p {
          color: #666;
          margin-bottom: 10px;
          line-height: 1.6;
        }
        
        .check-text {
          color: #888;
          font-size: 0.9rem;
        }
        
        .action-buttons {
          display: flex;
          gap: 15px;
          margin-top: 30px;
          justify-content: center;
        }
        
        @media (max-width: 480px) {
          .forgot-card {
            padding: 30px 20px;
          }
          
          .action-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;