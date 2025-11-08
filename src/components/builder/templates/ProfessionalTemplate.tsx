'use client';

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
            <div className="space-y-4 text-sm
