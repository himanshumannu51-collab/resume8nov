import { ResumeData } from '@/types/resume';

export function ClassicTemplate({ data }: { data: ResumeData }) {
  return (
    <div id="resume-preview" className="bg-white p-12 max-w-[210mm] mx-auto" style={{ minHeight: '297mm' }}>
      {/* Header - Centered */}
      <div className="text-center mb-8 pb-6 border-b">
        <h1 className="text-5xl font-serif font-bold mb-3" style={{ color: data.colors.text }}>
          {data.personalInfo.fullName}
        </h1>
        
        <div className="text-sm text-gray-600 space-x-3">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
        </div>
        
        {(data.personalInfo.linkedin || data.personalInfo.github) && (
          <div className="text-sm text-gray-600 mt-1 space-x-3">
            {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
            {data.personalInfo.github && <span>• {data.personalInfo.github}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 
            className="text-lg font-serif font-bold mb-3 pb-1 border-b" 
            style={{ borderColor: data.colors.primary, color: data.colors.primary }}
          >
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 
            className="text-lg font-serif font-bold mb-3 pb-1 border-b" 
            style={{ borderColor: data.colors.primary, color: data.colors.primary }}
          >
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{exp.company}</h3>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="italic text-gray-700 mb-2">{exp.position} • {exp.location}</div>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
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
            className="text-lg font-serif font-bold mb-3 pb-1 border-b" 
            style={{ borderColor: data.colors.primary, color: data.colors.primary }}
          >
            EDUCATION
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                    <p className="text-gray-700">
                      {edu.degree} in {edu.field}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {edu.startDate} - {edu.endDate}
                  </span>
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
            className="text-lg font-serif font-bold mb-3 pb-1 border-b" 
            style={{ borderColor: data.colors.primary, color: data.colors.primary }}
          >
            SKILLS
          </h2>
          <div className="space-y-2 text-sm">
            {data.skills.map((skill) => (
              <div key={skill.id}>
                <span className="font-bold text-gray-800">{skill.category}: </span>
                <span className="text-gray-700">{skill.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
