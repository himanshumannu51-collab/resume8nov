'use client';

import React from 'react';
import type { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function ProfessionalTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full h-full bg-white flex">
      {/* Sidebar */}
      <div className="w-1/3 p-8" style={{ backgroundColor: data.colors.secondary }}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-6 text-white">
            {data.personalInfo.fullName}
          </h1>
          
          {/* Contact */}
          <div className="space-y-3 text-sm text-white/90">
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="break-all">{data.personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{data.personalInfo.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{data.personalInfo.location}</span>
            </div>
            {data.personalInfo.linkedin && (
              <div className="flex items-start gap-2">
                <Linkedin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="break-all">{data.personalInfo.linkedin}</span>
              </div>
            )}
            {data.personalInfo.github && (
              <div className="flex items-start gap-2">
                <Github className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="break-all">{data.personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-white">SKILLS</h2>
            <div className="space-y-3 text-sm text-white/90">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <p className="font-semibold text-white">{skill.category}</p>
                  <p>{skill.items.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-white">EDUCATION</h2>
            <div className="space-y-4 text-sm text-white/90">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <p className="font-bold text-white">{edu.degree}</p>
                  <p>{edu.field}</p>
                  <p>{edu.institution}</p>
                  <p>{edu.startDate} - {edu.endDate}</p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3" style={{ color: data.colors.primary }}>
              PROFILE
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4" style={{ color: data.colors.primary }}>
              EXPERIENCE
            </h2>
            <div className="space-y-5">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                  <p className="text-gray-700 font-semibold">{exp.company} | {exp.location}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
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

        {/* Projects */}
        {data.projects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4" style={{ color: data.colors.primary }}>
              PROJECTS
            </h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  <p className="text-gray-700 mb-1">{project.description}</p>
                  <p className="text-sm text-gray-600">
                    {project.technologies.join(' • ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
