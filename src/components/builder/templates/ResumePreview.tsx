'use client';

import { useResumeStore } from '@/store/resumeStore';
import { ModernTemplate } from './ModernTemplate';
import { ClassicTemplate } from './ClassicTemplate';
import { MinimalTemplate } from './MinimalTemplate';

export function ResumePreview() {
  const { resume } = useResumeStore();

  if (!resume) return null;

  // Route to different templates based on templateId
  switch (resume.templateId) {
    case 'classic':
      return <ClassicTemplate data={resume} />;
    case 'minimal':
      return <MinimalTemplate data={resume} />;
    case 'creative':
    case 'executive':
    case 'modern':
    default:
      return <ModernTemplate data={resume} />;
  }
}
