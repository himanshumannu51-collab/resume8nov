'use client';

import type { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full h-full bg-white p-12 font-sans">
      {/* Header */}
      <div className="border-b-4 pb-6 mb-6" style={{ borderColor: data.colors.primary }}>
        <h1 className="text-4xl font-bold mb-2" style={{ color: data.colors.primary }}>
          {data.personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            {data.personalInfo.email}
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            {data.personalInfo.phone}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {data.personalInfo.location}
          </div>
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              {data.personalInfo.linkedin}
            </div>
          )}
          {data.personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="w-4 h-4" />
              {data.personalInfo.github}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3" style={{ color: data.colors.primary }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3" style={{ color: data.colors.primary }}>
            WORK EXPERIENCE
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                    <p>{exp.location}</p>
                  </div>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
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
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3" style={{ color: data.colors.primary }}>
            EDUCATION
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>{edu.startDate} - {edu.endDate}</p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3" style={{ color: data.colors.primary }}>
            SKILLS
          </h2>
          <div className="space-y-2">
            {data.skills.map((skill) => (
              <div key={skill.id}>
                <span className="font-semibold text-gray-900">{skill.category}: </span>
                <span className="text-gray-700">{skill.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3" style={{ color: data.colors.primary }}>
            PROJECTS
          </h2>
