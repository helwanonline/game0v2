import React, { useState, useContext } from 'react';
import type { Language } from '../types';
import { SEO } from '../components/SEO';
import { AuthContext } from '../context/AuthContext';
import { Spinner } from '../components/Spinner';

export const AuthPage: React.FC<{ language: Language }> = ({ language }) => {
    const { signIn } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');
        try {
            const { error } = await signIn(email);
            if (error) throw error;
            setMessage(language === 'ar' ? 'تم إرسال رابط تسجيل الدخول إلى بريدك الإلكتروني!' : 'Check your email for the login link!');
        } catch (err: any) {
            setError(err.error_description || err.message);
        } finally {
            setLoading(false);
        }
    };

    const content = {
        ar: {
            title: 'تسجيل الدخول / إنشاء حساب',
            description: 'انضم إلى مجتمعنا للوصول إلى الميزات الحصرية مثل حفظ الألعاب المفضلة.',
            emailLabel: 'البريد الإلكتروني',
            buttonText: 'إرسال رابط تسجيل الدخول',
            noPassword: 'لا حاجة لكلمة مرور! سنرسل لك رابطًا سحريًا لتسجيل الدخول بأمان.',
        },
        en: {
            title: 'Login / Sign Up',
            description: 'Join our community to access exclusive features like saving your favorite games.',
            emailLabel: 'Email',
            buttonText: 'Send Login Link',
            noPassword: "No password needed! We'll send you a magic link to log in securely.",
        },
    };

    const currentContent = content[language];

    return (
        <>
            <SEO title={currentContent.title} description={currentContent.description} language={language} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-md mx-auto bg-secondary p-8 rounded-xl shadow-lg">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-light-text">{currentContent.title}</h1>
                        <p className="text-dark-text mt-2">{currentContent.description}</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-light-text">
                                {currentContent.emailLabel}
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full bg-primary border border-gray-700 rounded-md shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-accent focus:border-accent"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-hover disabled:bg-gray-600 disabled:cursor-not-allowed"
                            >
                                {loading ? <Spinner size="w-6 h-6" /> : currentContent.buttonText}
                            </button>
                        </div>
                    </form>

                    {message && <p className="mt-4 text-center text-green-400">{message}</p>}
                    {error && <p className="mt-4 text-center text-red-400">{error}</p>}

                    <div className="mt-6 text-center">
                        <p className="text-xs text-dark-text">{currentContent.noPassword}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthPage;
