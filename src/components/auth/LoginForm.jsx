import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Github, Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import FormInput from '../ui/FormInput';
import Button from '../ui/Button';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



// Handle login using mock data
const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await axios.post('http://127.0.0.1:8080/login', {
        email,
        password
      },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Strategy' : 'jwt'
      },
      withCredentials : true
    });

      if (!response.status === 200) {
        if (response.status === 400) {
          throw new Error('Invalid username or password');
        } else if (response.status === 404) {
          throw new Error('User not found');
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      }

      const data = await response.headers;

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', data.getAuthorization());
      storage.setItem('user', JSON.stringify(data));


      login({
        token : data.getAuthorization()
      });
      navigate('/dashboard');

    } catch (error) {
      console.error('Login failed:', error);
      
      // Handle different types of errors
      if (error.message === 'Failed to fetch') {
        setErrors({ 
          submit: 'Network error. Please check your connection and try again.' 
        });
      } else {
        setErrors({ 
          submit: error.message || 'Login failed. Please try again.' 
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormInput
        label="Email address"
        type="email"
        id="email"
        icon={<Mail className="w-4 h-4 text-slate-400" />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        placeholder="name@example.com"
        required
      />

      <FormInput
        label="Password"
        type={showPassword ? 'text' : 'password'}
        id="password"
        icon={
          showPassword ? (
            <EyeOff 
              className="w-4 h-4 text-slate-400 cursor-pointer" 
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <Eye 
              className="w-4 h-4 text-slate-400 cursor-pointer" 
              onClick={() => setShowPassword(true)}
            />
          )
        }
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        placeholder="Enter your password"
        required
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
          />
          <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
        </label>
        
        <a 
          href="#" 
          className="text-sm text-slate-700 dark:text-slate-300 hover:underline font-medium"
        >
          Forgot password?
        </a>
      </div>

      {errors.submit && (
        <p className="text-red-500 text-sm">{errors.submit}</p>
      )}

      <Button
        type="submit"
        fullWidth
        isLoading={isSubmitting}
      >
        Sign in
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-white dark:bg-slate-900 text-slate-500">or continue with</span>
        </div>
      </div>

      <Button 
        type="button" 
        variant="outline"
        fullWidth
        className="flex items-center justify-center space-x-2"
      >
        <Github className="w-4 h-4" />
        <span>GitHub</span>
      </Button>
    </form>
  );
};

export default LoginForm;