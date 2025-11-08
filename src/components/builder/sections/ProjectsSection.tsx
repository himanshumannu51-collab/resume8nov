'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function ProjectsSection() {
  const { resume } = useResumeStore();

  if (!resume) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <CardContent>
        {resume.projects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No projects added yet</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {resume.projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4">
                <p className="font-semibold">{project.name}</p>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Another Project
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
