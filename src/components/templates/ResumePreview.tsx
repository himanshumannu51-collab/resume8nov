'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

export function ResumePreview() {
  const { resume } = useResumeStore();

  if (!resume) return null;

  return (
    <div id="resume-preview" className="bg-white p-12 max-w-[210mm] mx-auto" style={{ minHeight: '297mm' }}>
      {/* Header */}
      <div className="border-b-2 pb-6 mb-6" style={{ borderColor: resume.colors.primary }}>
        <h1 className="text-4xl font-bold mb-2" style={{ color: resume.colors.text }}>
          {resume.personalInfo.fullName}
        </h1>
        
        <div className="flex flex-wrap gap-4 text-sm" style={{ color: resume.colors.secondary }}>
          {resume.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{resume.personalInfo.email}</span>
            </div>
          )}
          {resume.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{resume.personalInfo.phone}</span>
            </div>
          )}
          {resume.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{resume.personalInfo.location}</span>
            </div>
          )}
          {resume.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <span>{resume.personalInfo.linkedin}</span>
            </div>
          )}
          {resume.personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="w-4 h-4" />
              <span>{resume.personalInfo.github}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="mb-6">
          <h2 
            className="text-xl font-semibold mb-3 uppercase tracking-wide" 
            style={{ color: resume.colors.primary }}
          >
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <div className="mb-6">
          <h2 
            className="text-xl font-semibold mb-4 uppercase tracking-wide" 
            style={{ color: resume.colors.primary }}
          >
            Work Experience
          </h2>
          <div className="space-y-4">
            {resume.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-lg">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company} • {exp.location}</p>
                  </div>
                  <div className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                  {exp.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div className="mb-6">
          <h2 
            className="text-xl font-semibold mb-4 uppercase tracking-wide" 
            style={{ color: resume.colors.primary }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{edu.institution}</h3>
                    <p className="text-gray-700">
                      {edu.degree} in {edu.field}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div className="mb-6">
          <h2 
            className="text-xl font-semibold mb-4 uppercase tracking-wide" 
            style={{ color: resume.colors.primary }}
          >
            Skills
          </h2>
          <div className="space-y-2">
            {resume.skills.map((skill) => (
              <div key={skill.id}>
                <span className="font-semibold text-gray-800">{skill.category}: </span>
                <span className="text-gray-700">{skill.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
