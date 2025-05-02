import React, { useState } from 'react';
import { Eye, EyeOff, Mail, User, Github } from 'lucide-react';
import FormInput from '../ui/FormInput';
import Button from '../ui/Button';
import axios from 'axios';

const SignupForm = ({setIsLogin}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setErrors({});
  
      try {
        const response = await axios.post('http://82.25.97.97:8082/register', {
          name,
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
  
        if (!response.status === 201) {
          if (response.status === 400) {
            throw new Error('Invalid username or password');
          } else if (response.status === 404) {
            throw new Error('User not found');
          } 
          else if (response.status === 409) {
            throw new Error('Duplicate');
          } else {
            throw new Error(`Server error: ${response.status}`);
          }
        }

        setIsLogin(true)
  
      } catch (error) {
        console.error('Login failed:', error.message);
        
        // Handle different types of errors
        if (error.message === 'Failed to fetch') {
          setErrors({ 
            submit: 'Network error. Please check your connection and try again.' 
          });
        } 
        else if (error.response.status === 409) {
          setErrors({ 
            submit: 'Email aready exists!' 
          });
        } 
        else {
          setErrors({ 
            submit: error.message || 'Register failed. Please try again.' 
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
        label="Full name"
        type="text"
        id="name"
        icon={<User className="w-4 h-4 text-slate-400" />}
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        placeholder="John Doe"
        required
      />

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
        placeholder="Create a password"
        required
      />

      <div className="space-y-2">
        <label className="flex items-start space-x-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={() => setAgreeToTerms(!agreeToTerms)}
            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
          />
          <span className="text-sm text-slate-600 dark:text-slate-400">
            I agree to the <a href="#" className="text-slate-900 dark:text-white font-medium hover:underline">Terms of Service</a> and <a href="#" className="text-slate-900 dark:text-white font-medium hover:underline">Privacy Policy</a>
          </span>
        </label>
        {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
      </div>

      <Button
        type="submit"
        fullWidth
        isLoading={isSubmitting}
      >
        Create account
      </Button>

      {errors.submit && (
        <p className="text-red-500 text-sm">{errors.submit}</p>
      )}

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

export default SignupForm;