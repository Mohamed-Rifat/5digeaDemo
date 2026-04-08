import React, { useState } from 'react';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import SocialButtons from './SocialButtons';

type AuthMode = 'login' | 'register';

const AuthForm: React.FC = () => {
    const [mode, setMode] = useState<AuthMode>('login');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (mode === 'register') {
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', { mode, ...formData });
        }
    };

    const toggleMode = () => {
        setMode(prev => (prev === 'login' ? 'register' : 'login'));
        setErrors({});
    };

    return (
        <div className="w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="text-center mb-8 animate-fade-in">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl gradient-primary mb-4 glow-shadow">
                    <span className="text-primary-foreground font-bold text-xl">L</span>
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground">
                    {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
                </h2>
                <p className="text-muted-foreground mt-2">
                    {mode === 'login' ? 'Enter your credentials to access your account' : 'Fill in the details below to get started'}
                </p>
            </div>

            <div className="flex mb-8 p-1 bg-secondary rounded-xl animate-slide-up">
                <button type="button" onClick={() => setMode('login')}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${mode === 'login' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                    Login
                </button>
                <button type="button" onClick={() => setMode('register')}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${mode === 'register' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                    Register
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 animate-slide-up">
                <AuthInput
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    error={errors.email}
                />

                <AuthInput
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    error={errors.password}
                />

                {mode === 'register' && (
                    <AuthInput
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange('confirmPassword')}
                        error={errors.confirmPassword}
                    />
                )}

                {mode === 'login' && (
                    <div className="flex justify-end">
                        <button type="button" className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">Forgot password?</button>
                    </div>
                )}
                <AuthButton type="submit" variant="primary">{mode === 'login' ? 'Sign In' : 'Create Account'}</AuthButton>
            </form>

            <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-sm text-muted-foreground">or continue with</span>
                <div className="flex-1 h-px bg-border" />
            </div>

            <SocialButtons onGoogleClick={() => console.log('Google login')} onFacebookClick={() => console.log('Facebook login')} />

            <p className="text-center text-sm text-muted-foreground mt-8">
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button type="button" onClick={toggleMode} className="text-primary hover:text-primary/80 font-medium transition-colors">
                    {mode === 'login' ? 'Register' : 'Login'}
                </button>
            </p>
        </div>
    );
};

export default AuthForm;
