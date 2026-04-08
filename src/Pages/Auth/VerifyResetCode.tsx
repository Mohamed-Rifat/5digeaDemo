// src/Pages/Auth/VerifyResetCode.tsx
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiClock, FiRefreshCw } from 'react-icons/fi';

const VerifyResetCode = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(300); // 5 دقائق
    const [isResending, setIsResending] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // عدّاد الوقت
    useEffect(() => {
        if (timeLeft === 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // الانتقال للحقل التالي
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // التحقق تلقائياً إذا اكتمل الرمز
        if (newCode.every(digit => digit !== '')) {
            verifyCode(newCode.join(''));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const verifyCode = (fullCode: string) => {
        console.log('Verifying code:', fullCode);
        // هنا يتم التحقق من الرمز مع الـ Backend
        setTimeout(() => {
            navigate('/reset-password');
        }, 1000);
    };

    const handleResendCode = () => {
        setIsResending(true);
        setTimeout(() => {
            setTimeLeft(300);
            setIsResending(false);
        }, 1500);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="auth-container">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="verify-wrapper"
            >
                <div className="verify-card">
                    <div className="card-header">
                        <h1>تأكيد الهوية</h1>
                        <p>أدخل الرمز المكون من 6 أرقام الذي أرسلناه إلى بريدك</p>
                    </div>

                    {/* عدّاد الوقت */}
                    <div className="timer">
                        <FiClock />
                        <span>الرمز صالح لمدة: {formatTime(timeLeft)}</span>
                    </div>

                    {/* مدخلات الرمز */}
                    <div className="code-inputs">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="code-input"
                                dir="ltr"
                            />
                        ))}
                    </div>

                    {/* زر إعادة الإرسال */}
                    <button
                        onClick={handleResendCode}
                        disabled={isResending || timeLeft > 0}
                        className="resend-btn"
                    >
                        <FiRefreshCw className={isResending ? 'spinning' : ''} />
                        <span>
                            {isResending ? 'جاري الإرسال...' :
                                timeLeft > 0 ? `إعادة الإرسال (${formatTime(timeLeft)})` :
                                    'إعادة إرسال الرمز'}
                        </span>
                    </button>

                    {/* رسالة إذا انتهى الوقت */}
                    {timeLeft === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="expired-warning"
                        >
                            <p>انتهت صلاحية الرمز. يرجى طلب رمز جديد.</p>
                        </motion.div>
                    )}

                    {/* روابط المساعدة */}
                    <div className="help-links">
                        <Link to="/forgot-password" className="help-link">
                            لم أستلم الرمز؟
                        </Link>
                        <Link to="/login" className="help-link">
                            العودة لتسجيل الدخول
                        </Link>
                    </div>
                </div>
            </motion.div>

            <style>{`
        .verify-wrapper {
          width: 100%;
          max-width: 500px;
        }
        
        .verify-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: var(--shadow-medium);
          text-align: center;
        }
        
        .card-header h1 {
          font-family: 'El Messiri', serif;
          font-size: 2rem;
          color: var(--gold-dark);
          margin-bottom: 10px;
        }
        
        .card-header p {
          color: #666;
          margin-bottom: 30px;
        }
        
        .timer {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--pink-light);
          padding: 10px 20px;
          border-radius: 50px;
          margin-bottom: 30px;
          color: var(--gold-dark);
          font-weight: 500;
        }
        
        .code-inputs {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin: 30px 0;
        }
        
        .code-input {
          width: 55px;
          height: 65px;
          border: 2px solid var(--gold-light);
          border-radius: 12px;
          text-align: center;
          font-size: 1.8rem;
          font-weight: bold;
          color: var(--gold-dark);
          transition: all 0.3s ease;
        }
        
        .code-input:focus {
          outline: none;
          border-color: var(--gold-primary);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
          transform: translateY(-2px);
        }
        
        .code-input.filled {
          background: var(--gold-light);
          border-color: var(--gold-primary);
        }
        
        .resend-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          color: var(--gold-dark);
          font-size: 1rem;
          cursor: pointer;
          padding: 10px 20px;
          border-radius: 8px;
          transition: all 0.3s ease;
          margin: 20px 0;
        }
        
        .resend-btn:hover:not(:disabled) {
          background: var(--gold-light);
        }
        
        .resend-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .spinning {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .expired-warning {
          background: #FEF2F2;
          border: 1px solid #FECACA;
          color: #DC2626;
          padding: 12px;
          border-radius: 10px;
          margin: 20px 0;
        }
        
        .help-links {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        
        .help-link {
          color: var(--gold-dark);
          text-decoration: none;
          font-size: 0.9rem;
        }
        
        .help-link:hover {
          text-decoration: underline;
        }
        
        @media (max-width: 480px) {
          .verify-card {
            padding: 30px 20px;
          }
          
          .code-inputs {
            gap: 10px;
          }
          
          .code-input {
            width: 45px;
            height: 55px;
            font-size: 1.5rem;
          }
          
          .help-links {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>
        </div>
    );
};

export default VerifyResetCode;