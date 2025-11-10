'use client';

import { useEffect, useState } from 'react';
import { ResumeData } from '@/types/resume';
import { calculateATSScore } from '@/lib/atsScore';
import { CheckCircle2, XCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface Props {
  resume: ResumeData;
}

export function ATSScorePanel({ resume }: Props) {
  const [result, setResult] = useState(calculateATSScore(resume));

  useEffect(() => {
    setResult(calculateATSScore(resume));
  }, [resume]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">ATS Optimization Score</h2>
        <p className="text-sm text-gray-600">
          Check how well your resume will perform with Applicant Tracking Systems
        </p>
      </div>

      {/* Score Display */}
      <div className={`rounded-xl p-6 ${getScoreBgColor(result.score)}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className={`text-5xl font-bold ${getScoreColor(result.score)}`}>
              {result.score}
            </div>
            <div className="text-sm font-medium text-gray-700 mt-1">
              {getScoreLabel(result.score)}
            </div>
          </div>
          <div className="text-right">
            <TrendingUp className={`w-12 h-12 ${getScoreColor(result.score)}`} />
          </div>
        </div>
        
        <div className="w-full bg-white rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              result.score >= 80 ? 'bg-green-600' : 
              result.score >= 60 ? 'bg-yellow-600' : 
              'bg-red-600'
            }`}
            style={{ width: `${result.score}%` }}
          />
        </div>
      </div>

      {/* Issues */}
      {result.issues.length > 0 && (
        <div className="border border-red-200 rounded-lg p-4 bg-red-50">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-900">Critical Issues ({result.issues.length})</h3>
          </div>
          <ul className="space-y-2">
            {result.issues.map((issue, index) => (
              <li key={index} className="text-sm text-red-800 flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {result.suggestions.length > 0 && (
        <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-900">Suggestions for Improvement ({result.suggestions.length})</h3>
          </div>
          <ul className="space-y-2">
            {result.suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-yellow-800 flex items-start gap-2">
                <span className="text-yellow-600 mt-0.5">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Success Message */}
      {result.passed && result.issues.length === 0 && result.suggestions.length === 0 && (
        <div className="border border-green-200 rounded-lg p-4 bg-green-50">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Great Job!</h3>
          </div>
          <p className="text-sm text-green-800">
            Your resume is well-optimized for ATS systems. It should pass most automated screening processes.
          </p>
        </div>
      )}

      {/* Tips */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <h3 className="font-semibold text-indigo-900 mb-2">ATS Tips</h3>
        <ul className="space-y-1 text-sm text-indigo-800">
          <li>• Use standard section headings (Experience, Education, Skills)</li>
          <li>• Include relevant keywords from job descriptions</li>
          <li>• Use bullet points for easy scanning</li>
          <li>• Quantify achievements with numbers and percentages</li>
          <li>• Avoid images, tables, and complex formatting</li>
          <li>• Save and submit as PDF for best compatibility</li>
        </ul>
      </div>
    </div>
  );
}
