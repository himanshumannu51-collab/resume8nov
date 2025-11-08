'use client';

import type { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

export function MinimalistTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full h-full bg-white p-16 font-serif">
      {/* Header - Centered */}
      <div className="text-center mb-12 pb-8 border-b border-gray-300">
        <h1 className="text-5xl font-light mb-4 tracking-wide" style={{ color: data.colors.text }}>
          {data.personalInfo.fullName}
        </h1>
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.location}</span>
        </div>
        {(data.personalInfo.linkedin || data.personalInfo.github) && (
          <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600 mt-2">
            {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
            {data.personalInfo.linkedin && data.personalInfo.github && <span>•</span>}
            {data.personalInfo.github && <span>{data.personalInfo.github}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <p className="text-gray-700 leading-relaxed italic">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-light mb-6 text-center tracking-wide" style={{ color: data.colors.text }}>
            Experience
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="text-center mb-2">
                  <h3 className="font-semibold text-lg">{exp.position}</h3>
                  <p className="text-gray-700">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate} | {exp.location}
                  </p>
                </div>
                <ul className="space-y-1 text-gray-700 text-center">
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
        <div className="mb-10">
          <h2 className="text-2xl font-light mb-6 text-center tracking-wide" style={{ color: data.colors.text }}>
            Education
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto text-center">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                <p className="text-gray-700">{edu.institution}</p>
                <p className="text-sm text-gray-500">
                  {edu.startDate} - {edu.endDate}
                  {edu.gpa && ` | GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-light mb-6 text-center tracking-wide" style={{ color: data.colors.text }}>
            Skills
          </h2>
          <div className="space-y-2 max-w-3xl mx-auto text-center">
            {data.skills.map((skill) => (
              <p key={skill.id} className="text-gray-700">
                <span className="font-semibold">{skill.category}:</span> {skill.items.join(', ')}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div>
          <h2 className="text-2xl font-light mb-6 text-center tracking-wide" style={{ color: data.colors.text }}>
            Projects
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {data.projects.map((project) => (
              <div key={project.id} className="text-center">
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-gray-700 mb-1">{project.description}</p>
                <p className="text-sm text-gray-500">{project.technologies.join(' • ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
