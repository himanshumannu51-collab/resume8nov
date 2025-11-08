'use client';

import { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ResumePreview } from '@/components/templates/ResumePreview';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Download, 
  Save,
  FileText,
  Plus,
  Trash2
} from 'lucide-react';

type TabType = 'personal' | 'experience' | 'education' | 'skills';

export function ResumeEditor() {
  const { resume, updatePersonalInfo, updateSummary } = useResumeStore();
  const [activeTab, setActiveTab] = useState<TabType>('personal');

  if (!resume) return <div>Loading...</div>;

  const tabs = [
    { id: 'personal' as TabType, label: 'Personal Info', icon: User },
    { id: 'experience' as TabType, label: 'Experience', icon: Briefcase },
    { id: 'education' as TabType, label: 'Education', icon: GraduationCap },
    { id: 'skills' as TabType, label: 'Skills', icon: Code },
  ];

  const handlePrint = () => {
    window.print();
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
                <p className="text-xs text-gray-500">Auto-saved • Last edited now</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button size="sm" onClick={handlePrint} className="bg-indigo-600 hover:bg-indigo-700">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
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
                  <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                  
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
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  </div>

                  {resume.experience.map((exp) => (
                    <div key={exp.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 space-y-3">
                          <input
                            type="text"
                            value={exp.position}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg font-medium"
                            placeholder="Job Title"
                          />
                          <input
                            type="text"
                            value={exp.company}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="Company Name"
                          />
                        </div>
                        <button className="text-red-500 hover:text-red-700 ml-2">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={exp.startDate}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Start Date (MM/YYYY)"
                        />
                        <input
                          type="text"
                          value={exp.endDate}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="End Date"
                        />
                      </div>

                      <textarea
                        value={exp.description.join('\n')}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Describe your responsibilities..."
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Education</h2>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </Button>
                  </div>

                  {resume.education.map((edu) => (
                    <div key={edu.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 space-y-3">
                          <input
                            type="text"
                            value={edu.institution}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg font-medium"
                            placeholder="University/School Name"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={edu.degree}
                              className="px-3 py-2 border border-gray-300 rounded-lg"
                              placeholder="Degree"
                            />
                            <input
                              type="text"
                              value={edu.field}
                              className="px-3 py-2 border border-gray-300 rounded-lg"
                              placeholder="Field of Study"
                            />
                          </div>
                        </div>
                        <button className="text-red-500 hover:text-red-700 ml-2">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Skills</h2>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Category
                    </Button>
                  </div>

                  {resume.skills.map((skill) => (
                    <div key={skill.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <input
                          type="text"
                          value={skill.category}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-medium"
                          placeholder="Category (e.g., Programming Languages)"
                        />
                        <button className="text-red-500 hover:text-red-700 ml-2">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={skill.items.join(', ')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Add skills separated by commas"
                      />
                    </div>
                  ))}
                </div>
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
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-inner">
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
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
