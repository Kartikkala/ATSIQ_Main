import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import Button from '../components/ui/Button';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pdfUrl, atsScore = 78, feedbackPoints = [
    "Missing quantifiable achievements in work experience",
    "Professional summary needs more industry-specific keywords",
    "Education section lacks relevant coursework details",
    "Skills section could be more comprehensive",
    "Contact information missing LinkedIn profile"
  ] } = location.state || {};

  if (!pdfUrl) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            No PDF file found
          </h1>
          <Button onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* PDF Preview Section */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                Resume Preview
              </h2>
              
              <div className="w-full h-[800px] bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full"
                  title="PDF Preview"
                  frameBorder="0"
                />
              </div>
            </div>
          </div>

          {/* AI Feedback Section */}
          <div className="space-y-8">
            {/* ATS Score Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  ATS Score
                </h2>
                <div className={`text-5xl font-bold tracking-tight ${getScoreColor(atsScore)}`}>
                  {atsScore}/100
                </div>
              </div>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {atsScore >= 80 ? (
                  "Your resume is well-optimized for ATS systems!"
                ) : atsScore >= 60 ? (
                  "Your resume needs some improvements for better ATS compatibility."
                ) : (
                  "Your resume requires significant optimization for ATS systems."
                )}
              </p>
            </div>

            {/* Feedback Points */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                Detailed Feedback
              </h2>
              <div className="space-y-4">
                {feedbackPoints.map((point, index) => (
                  <div 
                    key={index}
                    className="flex items-start p-4 bg-slate-50 dark:bg-slate-800 rounded-xl transition-all hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="ml-3 text-slate-700 dark:text-slate-300 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                fullWidth
                onClick={() => navigate('/dashboard')}
                className="text-sm font-medium"
              >
                Upload New Resume
              </Button>
              <Button
                variant="primary"
                fullWidth
                onClick={() => window.print()}
                className="text-sm font-medium"
              >
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;