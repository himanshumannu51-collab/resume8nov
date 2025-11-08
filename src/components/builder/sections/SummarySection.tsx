'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function SummarySection() {
  const { resume, updateSummary } = useResumeStore();

  if (!resume) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label>About You</Label>
        <Textarea
          value={resume.summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="Write a brief summary about your professional background and key achievements..."
          rows={5}
        />
        <p className="text-sm text-gray-500">
          {resume.summary.length} characters
        </p>
      </CardContent>
    </Card>
  );
}
