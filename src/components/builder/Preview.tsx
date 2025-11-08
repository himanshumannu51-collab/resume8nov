'use client';

import { useResumeStore } from '@/store/resumeStore';
import { ModernTemplate } from './templates/ModernTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { MinimalistTemplate } from './templates/MinimalistTemplate';

export function ResumePreview() {
  const { resume } = useResumeStore();

  if (!resume) return null;

  const renderTemplate = () => {
    switch (resume.templateId) {
      case 'modern':
        return <ModernTemplate data={resume} />;
      case 'professional':
        return <ProfessionalTemplate data={resume} />;
      case 'minimalist':
        return <MinimalistTemplate data={resume} />;
      default:
        return <ModernTemplate data={resume} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="aspect-[8.5/11] overflow-auto">
        {renderTemplate()}
      </div>
    </div>
  );
}
