'use client';

import { useResumeStore } from '@/store/resumeStore';
import { CheckCircle2 } from 'lucide-react';

const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and contemporary design with bold accents',
    preview: '/templates/modern.png',
    color: '#4f46e5',
    suitableFor: ['Tech', 'Design', 'Marketing'],
  },
  {
    id: 'classic',
    name: 'Classic Traditional',
    description: 'Timeless and professional layout',
    preview: '/templates/classic.png',
    color: '#1e40af',
    suitableFor: ['Finance', 'Legal', 'Corporate'],
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple and elegant typography-focused',
    preview: '/templates/minimal.png',
    color: '#64748b',
    suitableFor: ['Writing', 'Consulting', 'Academic'],
  },
  {
    id: 'creative',
    name: 'Creative Bold',
    description: 'Eye-catching design with personality',
    preview: '/templates/creative.png',
    color: '#ec4899',
    suitableFor: ['Creative', 'Arts', 'Media'],
  },
  {
    id: 'executive',
    name: 'Executive Elite',
    description: 'Sophisticated layout for senior roles',
    preview: '/templates/executive.png',
    color: '#0f172a',
    suitableFor: ['Executive', 'Management', 'Leadership'],
  },
];

export function TemplateSelector() {
  const { resume, setTemplateId, updateColors } = useResumeStore();

  const handleTemplateSelect = (templateId: string, color: string) => {
    setTemplateId(templateId);
    updateColors({ primary: color });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Choose Your Template</h2>
        <p className="text-sm text-gray-600">
          Select a template that matches your industry and style. You can change it anytime.
        </p>
      </div>

      <div className="grid gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleTemplateSelect(template.id, template.color)}
            className={`relative p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${
              resume?.templateId === template.id
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="flex gap-4">
              {/* Template Preview Placeholder */}
              <div
                className="w-24 h-32 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: template.color }}
              >
                <div className="text-center">
                  <div className="text-xs opacity-75">PREVIEW</div>
                  <div>{template.id.toUpperCase()}</div>
                </div>
              </div>

              {/* Template Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  {resume?.templateId === template.id && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <div className="flex flex-wrap gap-2">
                  {template.suitableFor.map((industry) => (
                    <span
                      key={industry}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Color Customization */}
      <div className="border-t pt-6">
        <h3 className="font-semibold mb-3">Customize Colors</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <input
              type="color"
              value={resume?.colors.primary || '#4f46e5'}
              onChange={(e) => updateColors({ primary: e.target.value })}
              className="w-full h-10 rounded border border-gray-300 cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Color
            </label>
            <input
              type="color"
              value={resume?.colors.text || '#1e293b'}
              onChange={(e) => updateColors({ text: e.target.value })}
              className="w-full h-10 rounded border border-gray-300 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
