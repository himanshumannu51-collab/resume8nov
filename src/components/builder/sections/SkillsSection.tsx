'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function SkillsSection() {
  const { resume } = useResumeStore();

  if (!resume) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent>
        {resume.skills.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No skills added yet</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Skills
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {resume.skills.map((skill) => (
              <div key={skill.id} className="border rounded-lg p-4">
                <p className="font-semibold">{skill.category}</p>
                <p className="text-sm text-gray-600">{skill.items.join(', ')}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add More Skills
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
