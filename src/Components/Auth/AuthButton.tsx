import React from 'react';

interface AuthButtonProps {
  children: React.ReactNode; type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'social';
  onClick?: () => void; disabled?: boolean; icon?: React.ReactNode;
}

const AuthButton: React.FC<AuthButtonProps> = ({ children, type = 'button', variant = 'primary', onClick, disabled = false, icon }) => {
  const baseStyles = `w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-medium transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed`;
  const variants = {
    primary: `gradient-primary text-primary-foreground btn-shadow hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]`,
    secondary: `bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]`,
    social: `bg-background border border-input text-foreground hover:bg-secondary hover:border-primary/20 active:scale-[0.98] card-shadow`,
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default AuthButton;
