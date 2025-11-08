'use client';

import { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Button } from '@/components/ui/button';
import { Eye, Download, Palette } from 'lucide-react';
import { PersonalInfoSection } from './sections/PersonalInfoSection';
import { SummarySection } from './sections/SummarySection';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ResumePreview } from './Preview';

export function ResumeEditor() {
  const [showPreview, setShowPreview] = useState(true);
  const { resume } = useResumeStore();

  if (!resume) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? 'Hide' : 'Show'} Preview
            </Button>
            <Button variant="outline">
              <Palette className="w-4 h-4 mr-2" />
              Customize
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className={`grid ${showPreview ? 'grid-cols-2' : 'grid-cols-1'} gap-8`}>
          {/* Editor Side */}
          <div className="space-y-6">
            <PersonalInfoSection />
            <SummarySection />
            <ExperienceSection />
            <EducationSection />
            <SkillsSection />
            <ProjectsSection />
          </div>

          {/* Preview Side */}
          {showPreview && (
            <div className="sticky top-24 h-fit">
              <ResumePreview />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
