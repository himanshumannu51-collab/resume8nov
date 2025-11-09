import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ResumeData, Experience, Education, Skill } from '@/types/resume';

interface ResumeStore {
  resume: ResumeData | null;
  lastSaved: Date | null;
  
  setResume: (resume: ResumeData) => void;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  updateColors: (colors: Partial<ResumeData['colors']>) => void;
  setTemplateId: (templateId: string) => void;
  
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  
  addSkillCategory: () => void;
  updateSkillCategory: (id: string, data: Partial<Skill>) => void;
  deleteSkillCategory: (id: string) => void;
  
  markSaved: () => void;
  getCompletionPercentage: () => number;
}

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resume: null,
      lastSaved: null,

      setResume: (resume) => set({ resume, lastSaved: new Date() }),
      
      updatePersonalInfo: (info) =>
        set((state) => ({
          resume: state.resume
            ? { ...state.resume, personalInfo: { ...state.resume.personalInfo, ...info } }
            : null,
          lastSaved: new Date(),
        })),
      
      updateSummary: (summary) =>
        set((state) => ({
          resume: state.resume ? { ...state.resume, summary } : null,
          lastSaved: new Date(),
        })),
      
      updateColors: (colors) =>
        set((state) => ({
          resume: state.resume
            ? { ...state.resume, colors: { ...state.resume.colors, ...colors } }
            : null,
          lastSaved: new Date(),
        })),
      
      setTemplateId: (templateId) =>
        set((state) => ({
          resume: state.resume ? { ...state.resume, templateId } : null,
          lastSaved: new Date(),
        })),

      addExperience: () =>
        set((state) => {
          if (!state.resume) return state;
          const newExp: Experience = {
            id: generateId(),
            company: '',
            position: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: [''],
          };
          return {
            resume: {
              ...state.resume,
              experience: [...state.resume.experience, newExp],
            },
            lastSaved: new Date(),
          };
        }),

      updateExperience: (id, data) =>
        set((state) => {
          if (!state.resume) return state;
          return {
            resume: {
              ...state.resume,
              experience: state.resume.experience.map((exp) =>
                exp.id === id ? { ...exp, ...data } : exp
              ),
            },
            lastSaved: new Date(),
          };
        }),

      deleteExperience: (id) =>
        set((state) => {
          if (!state.resume) return state;
          return {
            resume: {
              ...state.resume,
              experience: state.resume.experience.filter((exp) => exp.id !== id),
            },
            lastSaved: new Date(),
          };
        }),

      addEducation: () =>
        set((state) => {
          if (!state.resume) return state;
          const newEdu: Education = {
            id: generateId(),
            institution: '',
            degree: '',
            field: '',
            location: '',
            startDate: '',
            endDate: '',
            gpa: '',
          };
          return {
            resume: {
              ...state.resume,
              education: [...state.resume.education, newEdu],
            },
            lastSaved: new Date(),
          };
        }),

      updateEducation: (id, data) =>
        set((state) => {
          if (!state.resume) return state;
          return {
            resume: {
              ...state.resume,
              education: state.resume.education.map((edu) =>
                edu.id === id ? { ...edu, ...data } : edu
              ),
            },
            lastSaved: new Date(),
          };
        }),

      deleteEducation: (id) =>
        set((state) => {
          if (!state.resume) return state;
          return {
            resume: {
              ...state.resume,
              education: state.resume.education.filter((edu) => edu.id !== id),
            },
            lastSaved: new Date(),
          };
        }),

      addSkillCategory: () =>
        set((state) => {
          if (!state.resume) return state;
          const newSkill: Skill = {
            id: generateId(),
            category: '',
            items: [],
          };
          return {
            resume: {
              ...state.resume,
              skills: [...state.resume.skills, newSkill],
            },
            lastSaved: new Date(),
          };
        }),

      updateSkillCategory: (id, data) =>
        set((state) => {
          if (!state.resume) return state;
          return {
            resume: {
              ...state.resume,
              skills: state.resume.skills.map((skill) =>
                skill.id === id ? { ...skill, ...data } : skill
              ),
            },
            lastSaved: new Date(),
          };
        }),

      deleteSkillCategory: (id) =>
        set((state) => {
          if (!state.resume) return state;
          return {
            resume: {
              ...state.resume,
              skills: state.resume.skills.filter((skill) => skill.id !== id),
            },
            lastSaved: new Date(),
          };
        }),

      markSaved: () => set({ lastSaved: new Date() }),

      getCompletionPercentage: () => {
        const state = get();
        if (!state.resume) return 0;
        
        let completed = 0;
        const total = 10;
        
        if (state.resume.personalInfo.fullName) completed++;
        if (state.resume.personalInfo.email) completed++;
        if (state.resume.personalInfo.phone) completed++;
        if (state.resume.summary) completed++;
        if (state.resume.experience.length > 0) completed += 2;
        if (state.resume.education.length > 0) completed += 2;
        if (state.resume.skills.length > 0) completed += 2;
        
        return Math.round((completed / total) * 100);
      },
    }),
    {
      name: 'resume-storage',
    }
  )
);
