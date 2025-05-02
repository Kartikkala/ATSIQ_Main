import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Menu, X, LogOut, Sun, Moon, Upload, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import axios from 'axios';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (file) {
      const pdfUrl = URL.createObjectURL(file);
      const formData = new FormData()
      formData.append("file", file)
      try {
        const response = await axios.post("http://localhost:8080/pdf/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization" : user.token
          }
        });
        
        console.log("Server response: " + JSON.stringify(response.data));
        navigate('/result', { state: { 
          pdfUrl,
          atsScore : response.data.score,
          feedbackPoints : response.data.suggestions.style_feedback,
          missingSections : response.data.suggestions.missing_sections,
          wordReplacements : response.data.suggestions.word_replacements
        } });

      } catch (err) {
        console.error("Upload failed:", err);
        alert("Upload failed. Check console for details.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Navigation */}
      <nav className="bg-white dark:bg-slate-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-slate-900 dark:text-white" />
              <span className="ml-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">ATSIQ</span>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              
              <Button
                variant="ghost"
                className="flex items-center"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign out
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={toggleTheme}
                className="w-full text-left px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {theme === 'light' ? (
                  <div className="flex items-center">
                    <Moon className="w-5 h-5 mr-2" />
                    Dark mode
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Sun className="w-5 h-5 mr-2" />
                    Light mode
                  </div>
                )}
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <div className="flex items-center">
                  <LogOut className="w-5 h-5 mr-2" />
                  Sign out
                </div>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-8">
              <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-3">
                Resume Checker
              </h1>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-10">
                A free and fast AI resume checker doing 16 crucial checks to ensure your resume is ready to perform and get you interview callbacks.
              </p>

              {/* Upload Section */}
              <div 
                className={`
                  border-2 border-dashed rounded-xl p-8 text-center transition-colors
                  ${isDragging 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' 
                    : 'border-slate-200 dark:border-slate-800'
                  }
                  ${file ? 'bg-green-50 dark:bg-green-900/10 border-green-500' : ''}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="mb-6">
                  <Upload className={`w-12 h-12 mx-auto mb-4 ${file ? 'text-green-500' : 'text-slate-400'}`} />
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {file ? file.name : 'Drop your resume here or choose a file'}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    PDF only. Max 2MB file size.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Button
                    variant={file ? "outline" : "primary"}
                    className="relative"
                  >
                    <span>{file ? 'Choose Another File' : 'Upload Your Resume'}</span>
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                  </Button>

                  {file && (
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      className="block w-full"
                    >
                      Check Resume
                    </Button>
                  )}
                </div>

                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Privacy guaranteed
                </p>
              </div>

              {/* Features Grid */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">ATS Compatibility</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">Check if your resume is ATS-friendly and can be properly parsed by recruitment systems.</p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Content Analysis</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">Get insights on your resume's content quality, relevance, and impact.</p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Format & Structure</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">Evaluate the organization and presentation of your resume.</p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Improvement Tips</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">Receive actionable suggestions to enhance your resume's effectiveness.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;