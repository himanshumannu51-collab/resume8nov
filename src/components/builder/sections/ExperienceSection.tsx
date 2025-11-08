'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function ExperienceSection() {
  const { resume } = useResumeStore();

  if (!resume) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
      </CardHeader>
      <CardContent>
        {resume.experience.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No work experience added yet</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {resume.experience.map((exp) => (
              <div key={exp.id} className="border rounded-lg p-4">
                <p className="font-semibold">{exp.position}</p>
                <p className="text-sm text-gray-600">{exp.company}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Another Experience
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
