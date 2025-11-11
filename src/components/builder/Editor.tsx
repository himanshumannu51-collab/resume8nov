'use client';

import React from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { FormFieldWithTooltip } from '@/components/ui/tooltip';
import { Plus, Trash2, Save } from 'lucide-react';

export function Editor() {
  const { 
    resumeData, 
    updatePersonalInfo, 
    addExperience, 
    updateExperience, 
    deleteExperience, 
    addEducation, 
    updateEducation, 
    deleteEducation, 
    addSkill, 
    deleteSkill 
  } = useResumeStore();

  const handleSkillsChange = (value: string) => {
    const skills = value.split('\n').filter(s => s.trim());
    useResumeStore.setState({ 
      resumeData: { 
        ...resumeData, 
        skills 
      } 
    });
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        
        {/* Personal Information Section */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormFieldWithTooltip
              label="Full Name"
              tooltip="Use your full legal name as it appears on official documents"
              required
            >
              <input 
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={resumeData.personalInfo?.fullName || ''}
                onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                placeholder="e.g., John Smith"
              />
            </FormFieldWithTooltip>

            <FormFieldWithTooltip
              label="Email Address"
              tooltip="Use a professional email address (avoid nicknames or informal addresses)"
              required
            >
              <input 
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={resumeData.personalInfo?.email || ''}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                placeholder="e.g., john.smith@email.com"
              />
            </FormFieldWithTooltip>

            <FormFieldWithTooltip
              label="Phone Number"
              tooltip="Include country code if applying internationally (e.g., +1 for US/Canada)"
            >
              <input 
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={resumeData.personalInfo?.phone || ''}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                placeholder="e.g., (555) 123-4567"
              />
            </FormFieldWithTooltip>

            <FormFieldWithTooltip
              label="Location"
              tooltip="City and State/Country is sufficient (no need for full address)"
            >
              <input 
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={resumeData.personalInfo?.location || ''}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
                placeholder="e.g., San Francisco, CA"
              />
            </FormFieldWithTooltip>

            <FormFieldWithTooltip
              label="LinkedIn URL"
              tooltip="Copy your full LinkedIn profile URL (e.g., linkedin.com/in/yourname)"
            >
              <input 
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={resumeData.personalInfo?.linkedin || ''}
                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                placeholder="e.g., linkedin.com/in/johnsmith"
              />
            </FormFieldWithTooltip>

            <FormFieldWithTooltip
              label="Portfolio/Website"
              tooltip="Include your portfolio, GitHub, or personal website if relevant to the job"
            >
              <input 
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={resumeData.personalInfo?.website || ''}
                onChange={(e) => updatePersonalInfo('website', e.target.value)}
                placeholder="e.g., github.com/johnsmith"
              />
            </FormFieldWithTooltip>
          </div>

          <div className="mt-6">
            <FormFieldWithTooltip
              label="Professional Summary"
              tooltip="Write 2-4 sentences highlighting your experience, skills, and career goals. Focus on what makes you unique."
              tooltipType="success"
            >
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                value={resumeData.personalInfo?.summary || ''}
                onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                placeholder="e.g., Results-driven software engineer with 5+ years of experience building scalable web applications..."
              />
            </FormFieldWithTooltip>
          </div>
        </section>

        {/* Work Experience Section */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
            <button
              onClick={addExperience}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </button>
          </div>

          {resumeData.experience?.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No work experience added yet. Click "Add Experience" to get started.
            </p>
          )}

          <div className="space-y-6">
            {resumeData.experience?.map((exp) => (
              <div key={exp.id} className="p-4 border border-gray-200 rounded-lg relative bg-gray-50">
                <button
                  onClick={() => deleteExperience(exp.id)}
                  className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded-md transition"
                  title="Delete this experience"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormFieldWithTooltip
                    label="Job Title"
                    tooltip="Your official job title (e.g., Senior Software Engineer, Marketing Manager)"
                    required
                  >
                    <input 
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      value={exp.jobTitle || ''}
                      onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </FormFieldWithTooltip>

                  <FormFieldWithTooltip
                    label="Company Name"
                    tooltip="Full company name (no abbreviations unless widely known)"
                    required
                  >
                    <input 
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      value={exp.company || ''}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="e.g., Google Inc."
                    />
                  </FormFieldWithTooltip>

                  <FormFieldWithTooltip
                    label="Start Date"
                    tooltip="Use Month Year format (e.g., January 2020)"
                  >
                    <input 
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      value={exp.startDate || ''}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      placeholder="e.g., January 2020"
                    />
                  </FormFieldWithTooltip>

                  <FormFieldWithTooltip
                    label="End Date"
                    tooltip="Write 'Present' if you currently work here"
                  >
                    <input 
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      value={exp.endDate || ''}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      placeholder="e.g., Present"
                    />
                  </FormFieldWithTooltip>
                </div>

                <FormFieldWithTooltip
                  label="Description & Achievements"
                  tooltip="Use bullet points starting with action verbs. Quantify achievements with numbers, percentages, or metrics whenever possible (e.g., 'Increased sales by 30%')"
                  tooltipType="success"
                >
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    rows={5}
                    value={exp.description || ''}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    placeholder="• Led team of 5 developers to deliver project 2 weeks ahead of schedule&#10;• Improved application performance by 40% through code optimization&#10;• Implemented new features that increased user engagement by 25%"
                  />
                </FormFieldWithTooltip>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Education</h2>
            <button
              onClick={addEducation}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </button>
          </div>

          {resumeData.education?.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No education added yet. Click "Add Education" to get started.
            </p>
          )}

          <div className="space-y-6">
            {resumeData.education?.map((edu) => (
              <div key={edu.id} className="p-4 border border-gray-200 rounded-lg relative bg-gray-50">
                <button
                  onClick={() => deleteEducation(edu.id)}
                  className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded-md transition"
                  title="Delete this education"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormFieldWithTooltip
                    label="Degree"
                    tooltip="Full degree name (e.g., Bachelor of Science in Computer Science)"
                    required
                  >
                    <input 
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      value={edu.degree || ''}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="e.g., Bachelor of Science in Computer Science"
                    />
                  </FormFieldWithTooltip>

                  <FormFieldWithTooltip
                    label="School Name"
                    tooltip="Full institution name"
                    required
                  >
                    <input 
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      value={edu.school || ''}
                      onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                      placeholder="e.g., Stanford University"
                    />
                  </FormFieldWithTooltip>

                  <FormFieldWithTooltip
                    label="Graduation Year"
                    tooltip="Year you graduated or expect to graduate"
                  >
                    <input 
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      value={edu.graduationYear || ''}
                      onChange={(e) => updateEducation(edu.id, 'graduationYear', e.target.value)}
                      placeholder="e.g., 2020"
                    />
                  </FormFieldWithTooltip>

                  <FormFieldWithTooltip
                    label="GPA (Optional)"
                    tooltip="Only include if 3.5 or higher (out of 4.0)"
                  >
                    <input 
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      value={edu.gpa || ''}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      placeholder="e.g., 3.8/4.0"
                    />
                  </FormFieldWithTooltip>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
          </div>

          <FormFieldWithTooltip
            label="Add Your Skills"
            tooltip="List technical and soft skills relevant to the job. Separate each skill with a new line. Focus on skills mentioned in the job description."
            tooltipType="success"
          >
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={6}
              value={resumeData.skills?.join('\n') || ''}
              onChange={(e) => handleSkillsChange(e.target.value)}
              placeholder="JavaScript&#10;React&#10;Node.js&#10;Python&#10;Project Management&#10;Team Leadership"
            />
          </FormFieldWithTooltip>

          {resumeData.skills?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Your Skills:</p>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                    <span className="text-sm font-medium">{skill}</span>
                    <button
                      onClick={() => deleteSkill(skill)}
                      className="hover:bg-blue-100 rounded-full p-0.5 transition"
                      title={`Remove ${skill}`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Save Indicator */}
        <div className="flex items-center justify-center gap-2 text-sm text-green-600 py-4 bg-green-50 rounded-lg border border-green-200">
          <Save className="w-4 h-4" />
          <span className="font-medium">All changes saved automatically to your browser</span>
        </div>
      </div>
    </div>
  );
}
