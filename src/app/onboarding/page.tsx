'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUserProfileStore, ExperienceLevel, Industry, Goal } from '@/store/userProfileStore';
import { ArrowRight, ArrowLeft, Briefcase, GraduationCap, TrendingUp, Users, FileText } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { profile, setExperienceLevel, setIndustry, setGoal, completeOnboarding } = useUserProfileStore();

  const handleComplete = () => {
    completeOnboarding();
    router.push('/builder');
  };

  const experienceLevels = [
    { id: 'student' as ExperienceLevel, label: 'Student / No Experience', icon: GraduationCap, desc: 'Looking for first job or internship' },
    { id: 'junior' as ExperienceLevel, label: '0-2 Years', icon: Briefcase, desc: 'Entry-level professional' },
    { id: 'mid' as ExperienceLevel, label: '3-5 Years', icon: TrendingUp, desc: 'Mid-level professional' },
    { id: 'senior' as ExperienceLevel, label: '5-10 Years', icon: Users, desc: 'Senior professional' },
    { id: 'executive' as ExperienceLevel, label: '10+ Years', icon: FileText, desc: 'Executive / Leadership' },
  ];

  const industries = [
    { id: 'tech' as Industry, label: '💻 Technology & IT', desc: 'Software, Hardware, IT Services' },
    { id: 'healthcare' as Industry, label: '🏥 Healthcare', desc: 'Medical, Nursing, Pharma' },
    { id: 'finance' as Industry, label: '💰 Finance & Banking', desc: 'Accounting, Investment, Insurance' },
    { id: 'marketing' as Industry, label: '📈 Marketing & Sales', desc: 'Digital Marketing, Sales, PR' },
    { id: 'education' as Industry, label: '📚 Education', desc: 'Teaching, Training, Academia' },
    { id: 'legal' as Industry, label: '⚖️ Legal', desc: 'Law, Compliance, Paralegal' },
    { id: 'creative' as Industry, label: '🎨 Creative & Design', desc: 'Design, Media, Arts' },
    { id: 'engineering' as Industry, label: '🏗️ Engineering', desc: 'Civil, Mechanical, Electrical' },
    { id: 'sales' as Industry, label: '🤝 Sales & Business', desc: 'B2B, B2C, Retail' },
    { id: 'other' as Industry, label: '🔧 Other', desc: 'Something else' },
  ];

  const goals = [
    { id: 'first_job' as Goal, label: 'Get My First Job', icon: '🎯', desc: 'Starting my career' },
    { id: 'career_change' as Goal, label: 'Change Careers', icon: '🔄', desc: 'Switching industries' },
    { id: 'promotion' as Goal, label: 'Get Promoted', icon: '📈', desc: 'Level up in current field' },
    { id: 'freelance' as Goal, label: 'Freelance Work', icon: '💼', desc: 'Independent consulting' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of 3</span>
            <span className="text-sm font-medium text-indigo-600">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Experience Level */}
        {step === 1 && (
          <Card className="p-8 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">What's your experience level?</h1>
              <p className="text-gray-600">We'll customize your resume based on your background</p>
            </div>

            <div className="space-y-3">
              {experienceLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setExperienceLevel(level.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-start gap-4 hover:shadow-md ${
                    profile.experienceLevel === level.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div className={`p-3 rounded-lg ${
                    profile.experienceLevel === level.id ? 'bg-indigo-600' : 'bg-gray-100'
                  }`}>
                    <level.icon className={`w-6 h-6 ${
                      profile.experienceLevel === level.id ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">{level.label}</div>
                    <div className="text-sm text-gray-600">{level.desc}</div>
                  </div>
                  {profile.experienceLevel === level.id && (
                    <div className="text-indigo-600">✓</div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex justify-end mt-8">
              <Button
                size="lg"
                onClick={() => setStep(2)}
                disabled={!profile.experienceLevel}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Industry */}
        {step === 2 && (
          <Card className="p-8 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">What industry are you in?</h1>
              <p className="text-gray-600">We'll suggest relevant skills and templates</p>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {industries.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setIndustry(ind.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                    profile.industry === ind.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900 mb-1">{ind.label}</div>
                  <div className="text-sm text-gray-600">{ind.desc}</div>
                  {profile.industry === ind.id && (
                    <div className="text-indigo-600 mt-2">✓ Selected</div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                size="lg"
                variant="outline"
                onClick={() => setStep(1)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                size="lg"
                onClick={() => setStep(3)}
                disabled={!profile.industry}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Goal */}
        {step === 3 && (
          <Card className="p-8 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">What's your goal?</h1>
              <p className="text-gray-600">We'll optimize your resume for your objective</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {goals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={`p-6 rounded-xl border-2 transition-all text-center hover:shadow-md ${
                    profile.goal === g.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="text-4xl mb-3">{g.icon}</div>
                  <div className="font-semibold text-gray-900 mb-1">{g.label}</div>
                  <div className="text-sm text-gray-600">{g.desc}</div>
                  {profile.goal === g.id && (
                    <div className="text-indigo-600 mt-3 font-medium">✓ Selected</div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                size="lg"
                variant="outline"
                onClick={() => setStep(2)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                size="lg"
                onClick={handleComplete}
                disabled={!profile.goal}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Create My Resume
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
