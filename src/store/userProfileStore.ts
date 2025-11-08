import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ExperienceLevel = 'student' | 'junior' | 'mid' | 'senior' | 'executive';
export type Industry = 'tech' | 'healthcare' | 'finance' | 'marketing' | 'education' | 'legal' | 'creative' | 'engineering' | 'sales' | 'other';
export type Goal = 'first_job' | 'career_change' | 'promotion' | 'freelance';

export interface UserProfile {
  experienceLevel: ExperienceLevel | null;
  industry: Industry | null;
  goal: Goal | null;
  hasCompletedOnboarding: boolean;
}

interface UserProfileStore {
  profile: UserProfile;
  setExperienceLevel: (level: ExperienceLevel) => void;
  setIndustry: (industry: Industry) => void;
  setGoal: (goal: Goal) => void;
  completeOnboarding: () => void;
  resetProfile: () => void;
}

const defaultProfile: UserProfile = {
  experienceLevel: null,
  industry: null,
  goal: null,
  hasCompletedOnboarding: false,
};

export const useUserProfileStore = create<UserProfileStore>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      setExperienceLevel: (level) =>
        set((state) => ({
          profile: { ...state.profile, experienceLevel: level },
        })),
      setIndustry: (industry) =>
        set((state) => ({
          profile: { ...state.profile, industry },
        })),
      setGoal: (goal) =>
        set((state) => ({
          profile: { ...state.profile, goal },
        })),
      completeOnboarding: () =>
        set((state) => ({
          profile: { ...state.profile, hasCompletedOnboarding: true },
        })),
      resetProfile: () => set({ profile: defaultProfile }),
    }),
    {
      name: 'user-profile-storage',
    }
  )
);
