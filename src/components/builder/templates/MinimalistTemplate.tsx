import { ResumeData } from '@/types/resume';

export function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <div id="resume-preview" className="bg-white p-12 max-w-[210mm] mx-auto" style={{ minHeight: '297mm' }}>
      {/* Header - Left Aligned Minimal */}
      <div className="mb-10">
        <h1 className="text-6xl font-light mb-2" style={{ color: data.colors.text, letterSpacing: '-0.02em' }}>
          {data.personalInfo.fullName}
        </h1>
        
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600 mt-3">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
          {data.personalInfo.github && <span>{data.personalInfo.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed text-lg font-light">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 
            className="text-sm font-semibold mb-4 uppercase tracking-widest" 
            style={{ color: data.colors.primary }}
          >
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="grid grid-cols-4 gap-4 mb-2">
                  <div className="text-sm text-gray-500 font-light">
                    {exp.startDate}<br/>
                    {exp.current ? 'Present' : exp.endDate}
                  </div>
                  <div className="col-span-3">
                    <h3 className="font-semibold text-gray-900 text-lg">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}, {exp.location}</p>
                    <ul className="mt-2 space-y-1 text-gray-700">
                      {exp.description.filter(Boolean).map((desc, idx) => (
                        <li key={idx} className="pl-4 border-l-2" style={{ borderColor: data.colors.primary }}>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 
            className="text-sm font-semibold mb-4 uppercase tracking-widest" 
            style={{ color: data.colors.primary }}
          >
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-4 gap-4">
                <div className="text-sm text-gray-500 font-light">
                  {edu.startDate}<br/>
                  {edu.endDate}
                </div>
                <div className="col-span-3">
                  <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-gray-500 mt-1">GPA: {edu.gpa}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 
            className="text-sm font-semibold mb-4 uppercase tracking-widest" 
            style={{ color: data.colors.primary }}
          >
            Skills
          </h2>
          <div className="grid grid-cols-4 gap-4">
            <div></div>
            <div className="col-span-3 space-y-2">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <span className="font-medium text-gray-800">{skill.category}</span>
                  <p className="text-gray-600 font-light">{skill.items.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
