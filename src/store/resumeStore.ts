import { create } from 'zustand';
import type { ResumeData } from '@/types/resume';

interface ResumeStore {
  resume: ResumeData | null;
  setResume: (resume: ResumeData) => void;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  updateColors: (colors: Partial<ResumeData['colors']>) => void;
  setTemplateId: (templateId: string) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: null,
  setResume: (resume) => set({ resume }),
  updatePersonalInfo: (info) =>
    set((state) => ({
      resume: state.resume
        ? { ...state.resume, personalInfo: { ...state.resume.personalInfo, ...info } }
        : null,
    })),
  updateSummary: (summary) =>
    set((state) => ({
      resume: state.resume ? { ...state.resume, summary } : null,
    })),
  updateColors: (colors) =>
    set((state) => ({
      resume: state.resume
        ? { ...state.resume, colors: { ...state.resume.colors, ...colors } }
        : null,
    })),
  setTemplateId: (templateId) =>
    set((state) => ({
      resume: state.resume ? { ...state.resume, templateId } : null,
    })),
}));
