import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { ArrowRight } from 'lucide-react';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {isLogin ? 'Welcome back' : 'Join us'}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          {isLogin 
            ? 'Sign in to access your account' 
            : 'Create an account to get started'}
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-900 shadow-lg rounded-xl overflow-hidden transition-all duration-300">
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-4 text-center font-medium transition-all ${
              isLogin 
                ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-4 text-center font-medium transition-all ${
              !isLogin 
                ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Sign Up
          </button>
        </div>
        
        <div className="p-6">
          {isLogin ? <LoginForm /> : <SignupForm />}
          
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-slate-900 dark:text-white font-medium inline-flex items-center group"
              >
                {isLogin ? "Sign up" : "Sign in"}
                <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" />
              </button>
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-500">
        <p>By continuing, you agree to our</p>
        <div className="mt-1 space-x-2 font-medium">
          <a href="#" className="text-slate-700 dark:text-slate-300 hover:underline">Terms of Service</a>
          <span>•</span>
          <a href="#" className="text-slate-700 dark:text-slate-300 hover:underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;