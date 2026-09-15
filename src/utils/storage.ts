import { UserProfile, WorkoutPlan, WorkoutSessionLog, WeightLog, Language, CoachChatSession } from '../types';
import { generateWorkoutPlan } from './programGenerator';

const STORAGE_KEYS = {
  PROFILE: 'fitcoach_profile',
  PLAN: 'fitcoach_plan',
  WORKOUT_LOGS: 'fitcoach_workout_logs',
  WEIGHT_LOGS: 'fitcoach_weight_logs',
  CUSTOM_GIFS: 'fitcoach_custom_gifs',
  LANGUAGE: 'fitcoach_language',
  VIEW_MODE: 'fitcoach_view_mode',
  COACH_SESSIONS: 'fitcoach_coach_sessions',
  ACTIVE_COACH_SESSION: 'fitcoach_active_coach_session_id',
};

export const defaultProfile: UserProfile = {
  name: '',
  age: 26,
  gender: 'male',
  height: 180,
  weight: 81,
  experience: 'intermediate',
  goal: 'muscle_gain',
  weeklyDays: 4,
  preferredSplit: 'upper_lower',
  measurements: {
    waist: 84,
    chest: 104,
    arms: 37,
    thighs: 59,
    shoulders: 122,
    neck: 39,
    hips: 98,
  },
  bodyFatPercent: 15.5,
  weightUnit: 'kg',
  onboardingCompleted: false,
  equipment: 'full_gym',
  focusMuscle: 'balanced',
  injuryLimitation: 'none',
  targetWeight: 89,
  targetPhysiqueType: 'aesthetic_shredded',
  targetFocusArea: 'chest_v_taper',
  targetTimeframeWeeks: 24,
  targetDescription: 'فیزیک عضلانی کات با درصد چربی ۱۰-۱۲٪، زیربغل پهن V-Taper و وزن هدف ۸۹ کیلوگرم',
  trainingContext: 'myself_6_months',
  experienceMonths: 6,
  macrocycleMonth: 1,
  mesocycleNumber: 1,
  mesocyclePhase: 'hypertrophy',
  mesocycleWeek: 1,
  checkIns: [],
};

export function loadProfile(): UserProfile {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultProfile,
        ...parsed,
        trainingContext: parsed.trainingContext || 'myself_6_months',
        experienceMonths: parsed.experienceMonths !== undefined ? parsed.experienceMonths : 6,
      };
    }
  } catch (e) {
    console.error('Error loading profile', e);
  }
  return defaultProfile;
}

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile', e);
  }
}

export function loadPlan(profile: UserProfile): WorkoutPlan {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PLAN);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading plan', e);
  }
  const generated = generateWorkoutPlan(profile);
  savePlan(generated);
  return generated;
}

export function savePlan(plan: WorkoutPlan): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(plan));
  } catch (e) {
    console.error('Error saving plan', e);
  }
}

export function loadWorkoutLogs(): WorkoutSessionLog[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.WORKOUT_LOGS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading workout logs', e);
  }
  return [];
}

export function saveWorkoutLogs(logs: WorkoutSessionLog[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.WORKOUT_LOGS, JSON.stringify(logs));
  } catch (e) {
    console.error('Error saving workout logs', e);
  }
}

export function loadWeightLogs(): WeightLog[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.WEIGHT_LOGS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading weight logs', e);
  }
  return [];
}

export function saveWeightLogs(logs: WeightLog[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.WEIGHT_LOGS, JSON.stringify(logs));
  } catch (e) {
    console.error('Error saving weight logs', e);
  }
}

export function loadCustomGifs(): Record<string, string> {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_GIFS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading custom gifs', e);
  }
  return {};
}

export function saveCustomGif(exerciseId: string, url: string): void {
  try {
    const current = loadCustomGifs();
    current[exerciseId] = url;
    localStorage.setItem(STORAGE_KEYS.CUSTOM_GIFS, JSON.stringify(current));
  } catch (e) {
    console.error('Error saving custom gif', e);
  }
}

export function loadLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as Language;
    if (saved === 'en' || saved === 'fa') return saved;
  } catch {
    // ignore
  }
  return 'fa';
}

export function saveLanguage(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.body.dir = lang === 'fa' ? 'rtl' : 'ltr';
  } catch {
    // ignore
  }
}

export function loadCoachChatSessions(): CoachChatSession[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.COACH_SESSIONS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading coach chat sessions', e);
  }
  return [];
}

export function saveCoachChatSessions(sessions: CoachChatSession[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.COACH_SESSIONS, JSON.stringify(sessions));
  } catch (e) {
    console.error('Error saving coach chat sessions', e);
  }
}

export function loadActiveCoachSessionId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_COACH_SESSION);
  } catch {
    return null;
  }
}

export function saveActiveCoachSessionId(id: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_COACH_SESSION, id);
  } catch (e) {
    console.error('Error saving active coach session id', e);
  }
}

export function deleteCoachChatSession(sessionId: string): CoachChatSession[] {
  try {
    const current = loadCoachChatSessions();
    const filtered = current.filter((s) => s.id !== sessionId);
    saveCoachChatSessions(filtered);
    const activeId = loadActiveCoachSessionId();
    if (activeId === sessionId) {
      if (filtered.length > 0) {
        saveActiveCoachSessionId(filtered[0].id);
      } else {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_COACH_SESSION);
      }
    }
    return filtered;
  } catch (e) {
    console.error('Error deleting coach chat session', e);
    return [];
  }
}

export function clearAllCoachChatSessions(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.COACH_SESSIONS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_COACH_SESSION);
  } catch (e) {
    console.error('Error clearing coach chat sessions', e);
  }
}

