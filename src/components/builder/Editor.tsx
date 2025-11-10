'use client';

import { useState, useEffect } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { useUserProfileStore } from '@/store/userProfileStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ResumePreview } from '@/components/templates/ResumePreview';
import { TemplateSelector } from '@/components/builder/TemplateSelector';
import { ATSScorePanel } from '@/components/builder/ATSScorePanel';
import { ContentSuggestions } from '@/components/builder/ContentSuggestions';
import { exportToPDF } from '@/lib/pdfExport';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Download, 
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  Palette,
  Sparkles,
  Target
} from 'lucide-react';

type TabType = 'personal' | 'experience' | 'education' | 'skills' | 'templates' | 'optimize';

export function ResumeEditor() {
  const { 
    resume, 
    updatePersonalInfo, 
    updateSummary,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkillCategory,
    updateSkillCategory,
    deleteSkillCategory,
    lastSaved,
    getCompletionPercentage
  } = useResumeStore();
  
  const { profile } = useUserProfileStore();
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [completion, setCompletion] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    setCompletion(getCompletionPercentage());
  }, [resume, getCompletionPercentage]);

  if (!resume) return <div>Loading...</div>;

  const tabs = [
    { id: 'personal' as TabType, label: 'Personal', icon: User },
    { id: 'experience' as TabType, label: 'Experience', icon: Briefcase },
    { id: 'education' as TabType, label: 'Education', icon: GraduationCap },
    { id: 'skills' as TabType, label: 'Skills', icon: Code },
    { id: 'templates' as TabType, label: 'Templates', icon: Palette },
    { id: 'optimize' as TabType, label: 'ATS Check', icon: Target },
  ];

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    try {
      const filename = `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
      await exportToPDF('resume-preview', filename);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const formatLastSaved = () => {
    if (!lastSaved) return 'Not saved yet';
    const seconds = Math.floor((Date.now() - new Date(lastSaved).getTime()) / 1000);
    if (seconds < 10) return 'Just now';
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Over an hour ago';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-lg">Resume Builder</h1>
                <p className="text-xs text-gray-500">
                  <CheckCircle2 className="w-3 h-3 inline mr-1 text-green-500" />
                  Auto-saved • {formatLastSaved()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-indigo-700">
                  {completion}% Complete
                </span>
              </div>
              <Button 
                size="sm" 
                onClick={handleDownloadPDF}
                disabled={isExporting}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Download className="w-4 h-4 mr-2" />
                {isExporting ? 'Generating...' : 'Download PDF'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Resume Completion</span>
                <span className="text-sm font-bold text-indigo-600">{completion}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <Card className="p-6">
              {activeTab === 'personal' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    {profile.industry && (
                      <ContentSuggestions 
                        type="summary" 
                        industry={profile.industry}
                        onSelect={(text) => updateSummary(text)}
                      />
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={resume.personalInfo.fullName}
                      onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={resume.personalInfo.email}
                        onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={resume.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={resume.personalInfo.location}
                      onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="San Francisco, CA"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn
                      </label>
                      <input
                        type="text"
                        value={resume.personalInfo.linkedin || ''}
                        onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="linkedin.com/in/johndoe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GitHub
                      </label>
                      <input
                        type="text"
                        value={resume.personalInfo.github || ''}
                        onChange={(e) => updatePersonalInfo({ github: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="github.com/johndoe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Professional Summary
                    </label>
                    <textarea
                      value={resume.summary}
                      onChange={(e) => updateSummary(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Write a brief summary about yourself..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {resume.summary.length} / 500 characters
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Work Experience</h2>
                    <div className="flex gap-2">
                      {profile.industry && (
                        <ContentSuggestions 
                          type="bullets" 
                          industry={profile.industry}
                          onSelect={(text) => {
                            if (resume.experience.length > 0) {
                              const lastExp = resume.experience[resume.experience.length - 1];
                              updateExperience(lastExp.id, {
                                description: [...lastExp.description, text]
                              });
                            }
                          }}
                        />
                      )}
                      <Button 
                        size="sm" 
                        className="bg-indigo-600 hover:bg-indigo-700"
                        onClick={addExperience}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>

                  {resume.experience.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Briefcase className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p>No experience added yet. Click "Add" to start.</p>
                    </div>
                  )}

                  {resume.experience.map((exp, index) => (
                    <div key={exp.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-medium text-gray-500">Experience #{index + 1}</span>
                        <button 
                          onClick={() => deleteExperience(exp.id)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg font-medium"
                          placeholder="Job Title"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Company Name"
                        />
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Location"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Start (MM/YYYY)"
                        />
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="End or Present"
                          disabled={exp.current}
                        />
                      </div>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, { current: e.target.checked, endDate: e.target.checked ? '' : exp.endDate })}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">I currently work here</span>
                      </label>

                      <textarea
                        value={exp.description.join('\n')}
                        onChange={(e) => updateExperience(exp.id, { description: e.target.value.split('\n').filter(Boolean) })}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="• Achievement with quantifiable result&#10;• Another key responsibility&#10;• Impact you made (use numbers!)"
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Education</h2>
                    <Button 
                      size="sm" 
                      className="bg-indigo-600 hover:bg-indigo-700"
                      onClick={addEducation}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>

                  {resume.education.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <GraduationCap className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p>No education added yet. Click "Add" to start.</p>
                    </div>
                  )}

                  {resume.education.map((edu, index) => (
                    <div key={edu.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-medium text-gray-500">Education #{index + 1}</span>
                        <button 
                          onClick={() => deleteEducation(edu.id)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg font-medium"
                          placeholder="University/School Name"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="Degree (e.g., Bachelor's)"
                          />
                          <input
                            type="text"
                            value={edu.field}
                            onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="Field of Study"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <input
                            type="text"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Start Year"
                          />
                          <input
                            type="text"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="End Year"
                          />
                          <input
                            type="text"
                            value={edu.gpa || ''}
                            onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="GPA (opt)"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Skills</h2>
                    <div className="flex gap-2">
                      {profile.industry && (
                        <ContentSuggestions 
                          type="skills" 
                          industry={profile.industry}
                          onSelect={(text) => {
                            // Add as new skill category
                            addSkillCategory();
                          }}
                        />
                      )}
                      <Button 
                        size="sm" 
                        className="bg-indigo-600 hover:bg-indigo-700"
                        onClick={addSkillCategory}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>

                  {resume.skills.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Code className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p>No skills added yet. Click "Add" to start.</p>
                    </div>
                  )}

                  {resume.skills.map((skill, index) => (
                    <div key={skill.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-medium text-gray-500">Category #{index + 1}</span>
                        <button 
                          onClick={() => deleteSkillCategory(skill.id)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={skill.category}
                        onChange={(e) => updateSkillCategory(skill.id, { category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg font-medium"
                        placeholder="Category (e.g., Programming Languages)"
                      />
                      <input
                        type="text"
                        value={skill.items.join(', ')}
                        onChange={(e) => updateSkillCategory(skill.id, { items: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Skills separated by commas: JavaScript, React, Node.js"
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'templates' && (
                <TemplateSelector />
              )}

              {activeTab === 'optimize' && (
                <ATSScorePanel resume={resume} />
              )}
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Live Preview</h3>
                <div className="text-xs text-gray-500">Updates in real-time</div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-inner" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                <div className="scale-[0.5] origin-top-left" style={{ width: '200%', height: '200%' }}>
                  <ResumePreview />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-preview, #resume-preview * {
            visibility: visible;
          }
          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
