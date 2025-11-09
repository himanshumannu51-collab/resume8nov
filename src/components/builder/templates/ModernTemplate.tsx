import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

export function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div id="resume-preview" className="bg-white p-12 max-w-[210mm] mx-auto" style={{ minHeight: '297mm' }}>
      {/* Header */}
      <div className="border-b-2 pb-6 mb-6" style={{ borderColor: data.colors.primary }}>
        <h1 className="text-4xl font-bold mb-2" style={{ color: data.colors.text }}>
          {data.personalInfo.fullName}
        </h1>
        
        <div className="flex flex-wrap gap-4 text-sm" style={{ color: data.colors.secondary }}>
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
          {data.personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="w-4 h-4" />
              <span>{data.personalInfo.github}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 
            className="text-xl font-semibold mb-3 uppercase tracking-wide" 
            style={{ color: data.colors.primary }}
          >
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 
            className="text-xl font-semibold mb-4 uppercase tracking-wide" 
            style={{ color: data.colors.primary }}
          >
            Work Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
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
                  {exp.description.filter(Boolean).map((desc, idx) => (
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
          <h2 
            className="text-xl font-semibold mb-4 uppercase tracking-wide" 
            style={{ color: data.colors.primary }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
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
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 
            className="text-xl font-semibold mb-4 uppercase tracking-wide" 
            style={{ color: data.colors.primary }}
          >
            Skills
          </h2>
          <div className="space-y-2">
            {data.skills.map((skill) => (
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
