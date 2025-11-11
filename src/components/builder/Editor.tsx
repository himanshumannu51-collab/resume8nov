'use client';

import React from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { FormFieldWithTooltip } from '@/components/ui/tooltip';
import { Plus, Trash2, Save } from 'lucide-react';

export function ResumeEditor() {
  const {
    resume,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkillCategory,
    deleteSkillCategory,
  } = useResumeStore();

  if (!resume) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>No resume data found. Start by adding your personal information.</p>
      </div>
    );
  }

  const handleSkillsChange = (value: string) => {
    const newSkills = value.split('\n').filter((s) => s.trim());
    useResumeStore.setState((state) => ({
      resume: {
        ...state.resume!,
        skills: [
          {
            id: 'default',
            category: 'General',
            items: newSkills,
          },
        ],
      },
    }));
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-3xl mx-auto p-6 space-y-8">

        {/* PERSONAL INFO SECTION */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Personal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormFieldWithTooltip label="Full Name" required>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                value={resume.personalInfo?.fullName || ''}
                onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                placeholder="e.g., John Smith"
              />
            </FormFieldWithTooltip>

            <FormFieldWithTooltip label="Email" required>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                value={resume.personalInfo?.email || ''}
                onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                placeholder="e.g., john.smith@email.com"
              />
            </FormFieldWithTooltip>

            <FormFieldWithTooltip label="Phone">
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                value={resume.personalInfo?.phone || ''}
                onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                placeholder="e.g., +1 234 567 8901"
              />
            </FormFieldWithTooltip>

            <FormFieldWithTooltip label="Location">
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                value={resume.personalInfo?.location || ''}
                onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                placeholder="e.g., San Francisco, CA"
              />
            </FormFieldWithTooltip>
          </div>

          <div className="mt-6">
            <FormFieldWithTooltip
              label="Professional Summary"
              tooltip="Write 2-4 sentences summarizing your experience."
            >
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                value={resume.summary || ''}
                onChange={(e) =>
                  useResumeStore.getState().updateSummary(e.target.value)
                }
                placeholder="Results-driven software engineer with 5+ years..."
              />
            </FormFieldWithTooltip>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
            <button
              onClick={addExperience}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add Experience
            </button>
          </div>

          {resume.experience?.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No experience added yet. Click “Add Experience”.
            </p>
          )}

          <div className="space-y-6">
            {resume.experience?.map((exp) => (
              <div
                key={exp.id}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative"
              >
                <button
                  onClick={() => deleteExperience(exp.id)}
                  className="absolute top-4 right-4 text-red-600 hover:bg-red-50 p-2 rounded-md"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormFieldWithTooltip label="Position" required>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      value={exp.position || ''}
                      onChange={(e) =>
                        updateExperience(exp.id, { position: e.target.value })
                      }
                    />
                  </FormFieldWithTooltip>

                  <FormFieldWithTooltip label="Company" required>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      value={exp.company || ''}
                      onChange={(e) =>
                        updateExperience(exp.id, { company: e.target.value })
                      }
                    />
                  </FormFieldWithTooltip>
                </div>

                <FormFieldWithTooltip label="Description">
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={exp.description?.join('\n') || ''}
                    onChange={(e) =>
                      updateExperience(exp.id, {
                        description: e.target.value.split('\n'),
                      })
                    }
                  />
                </FormFieldWithTooltip>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Education</h2>
            <button
              onClick={addEducation}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add Education
            </button>
          </div>

          {resume.education?.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No education added yet. Click “Add Education”.
            </p>
          )}

          <div className="space-y-6">
            {resume.education?.map((edu) => (
              <div
                key={edu.id}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative"
              >
                <button
                  onClick={() => deleteEducation(edu.id)}
                  className="absolute top-4 right-4 text-red-600 hover:bg-red-50 p-2 rounded-md"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormFieldWithTooltip label="Degree" required>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      value={edu.degree || ''}
                      onChange={(e) =>
                        updateEducation(edu.id, { degree: e.target.value })
                      }
                    />
                  </FormFieldWithTooltip>

                  <FormFieldWithTooltip label="Institution" required>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      value={edu.institution || ''}
                      onChange={(e) =>
                        updateEducation(edu.id, { institution: e.target.value })
                      }
                    />
                  </FormFieldWithTooltip>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Skills</h2>
          <FormFieldWithTooltip
            label="Add Your Skills"
            tooltip="List your skills, one per line"
            tooltipType="success"
          >
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              rows={6}
              value={resume.skills?.flatMap((s) => s.items).join('\n') || ''}
              onChange={(e) => handleSkillsChange(e.target.value)}
              placeholder="JavaScript\nReact\nLeadership"
            />
          </FormFieldWithTooltip>

          {resume.skills?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Your Skills:</p>
              <div className="flex flex-wrap gap-2">
                {resume.skills.flatMap((skillGroup) =>
                  skillGroup.items.map((skill, index) => (
                    <div
                      key={`${skillGroup.id}-${index}`}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                    >
                      <span className="text-sm font-medium">{skill}</span>
                      <button
                        onClick={() => deleteSkillCategory(skillGroup.id)}
                        className="hover:bg-blue-100 rounded-full p-0.5 transition"
                        title={`Remove ${skill}`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </section>

        {/* SAVE INDICATOR */}
        <div className="flex items-center justify-center gap-2 text-sm text-green-600 py-4 bg-green-50 rounded-lg border border-green-200">
          <Save className="w-4 h-4" />
          <span className="font-medium">All changes saved automatically</span>
        </div>
      </div>
    </div>
  );
}
