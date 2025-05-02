import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthForm from '../components/auth/AuthForm';
import { BookOpen } from 'lucide-react';

function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 lg:order-2">
              <AuthForm />
            </div>
            
            <div className="flex-1 lg:order-1 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-6">
                <div className="flex items-center space-x-2 text-2xl font-bold">
                  <BookOpen className="w-8 h-8" />
                  <span>Typography</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight lg:leading-tight mb-6">
                The art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">written</span> communication
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Join our community of typography enthusiasts and elevate your design skills through thoughtful type selection and layout.
              </p>
              
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                  <div className="font-bold text-3xl text-blue-600 dark:text-blue-400 mb-1">200+</div>
                  <div className="text-slate-600 dark:text-slate-400 text-sm">Curated fonts</div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                  <div className="font-bold text-3xl text-indigo-600 dark:text-indigo-400 mb-1">50k+</div>
                  <div className="text-slate-600 dark:text-slate-400 text-sm">Active members</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;