'use client';

import { useEffect } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { ResumeEditor } from '@/components/builder/Editor';
import type { ResumeData } from '@/types/resume';

export default function BuilderPage() {
  const { setResume } = useResumeStore();

  useEffect(() => {
    const sampleResume: ResumeData = {
      title: 'My Resume',
      templateId: 'modern',
      personalInfo: {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 8900',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/johndoe',
        github: 'github.com/johndoe',
      },
      summary: 'Experienced professional with proven track record in software development.',
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      customSections: [],
      colors: { primary: '#2563eb', secondary: '#64748b', text: '#1e293b' },
      fonts: { heading: 'Inter', body: 'Inter' },
      spacing: { margin: 'normal', lineHeight: 'normal' },
    };
    setResume(sampleResume);
  }, [setResume]);

  return <ResumeEditor />;
}
