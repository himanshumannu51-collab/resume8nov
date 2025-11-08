'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function EducationSection() {
  const { resume } = useResumeStore();

  if (!resume) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>
      <CardContent>
        {resume.education.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No education added yet</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {resume.education.map((edu) => (
              <div key={edu.id} className="border rounded-lg p-4">
                <p className="font-semibold">{edu.degree}</p>
                <p className="text-sm text-gray-600">{edu.institution}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Another Degree
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
