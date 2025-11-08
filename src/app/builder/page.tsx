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
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/johndoe',
        github: 'github.com/johndoe',
      },
      summary: 'Experienced software engineer with 5+ years in full-stack development. Passionate about building scalable applications and mentoring junior developers.',
      experience: [
        {
          id: '1',
          company: 'Tech Corp',
          position: 'Senior Software Engineer',
          location: 'San Francisco, CA',
          startDate: '2021-01',
          endDate: '',
          current: true,
          description: [
            'Led development of microservices architecture serving 2M+ users',
            'Reduced API response time by 40% through optimization',
            'Mentored team of 5 junior engineers'
          ]
        }
      ],
      education: [
        {
          id: '1',
          institution: 'University of California',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          location: 'Berkeley, CA',
          startDate: '2015',
          endDate: '2019',
          gpa: '3.8'
        }
      ],
      skills: [
        {
          id: '1',
          category: 'Programming',
          items: ['JavaScript', 'TypeScript', 'Python', 'Java']
        },
        {
          id: '2',
          category: 'Frameworks',
          items: ['React', 'Next.js', 'Node.js', 'Django']
        }
      ],
      projects: [],
      certifications: [],
      customSections: [],
      colors: { primary: '#4f46e5', secondary: '#64748b', text: '#1e293b' },
      fonts: { heading: 'Inter', body: 'Inter' },
      spacing: { margin: 'normal', lineHeight: 'normal' },
    };
    setResume(sampleResume);
  }, [setResume]);

  return <ResumeEditor />;
}
