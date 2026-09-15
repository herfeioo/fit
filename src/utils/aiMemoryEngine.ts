import {
  Exercise,
  AIMemoryDatabase,
  PerExerciseFeedback,
  ExerciseEvolutionEvent,
  StrengthLiftHistoryEntry,
  WorkoutPlan,
  WorkoutSessionLog
} from '../types';
import {
  baseExerciseDatabase,
  getExerciseById,
  getEquivalentExercises,
  getExerciseRegression,
  getExerciseProgression,
  getPainFreeAlternatives
} from '../data/exerciseDatabase';

const STORAGE_KEYS = {
  AI_MEMORY: 'fitcoach_ai_memory_db',
  CUSTOM_EXERCISES: 'fitcoach_custom_exercises_db'
};

export const defaultAIMemory: AIMemoryDatabase = {
  trainingAgeMonths: 24, // Intermediate baseline
  weightProgressionHistory: [
    { date: new Date(Date.now() - 60 * 24 * 3600 * 1000).toISOString().split('T')[0], weight: 79.5 },
    { date: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString().split('T')[0], weight: 80.2 },
    { date: new Date().toISOString().split('T')[0], weight: 81.0 }
  ],
  strengthProgression: {
    barbell_bench_press: {
      exerciseId: 'barbell_bench_press',
      bestWeight: 90,
      bestReps: 6,
      estimated1RM: 105,
      lastTrainedDate: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString().split('T')[0],
      history: [
        { date: new Date(Date.now() - 28 * 24 * 3600 * 1000).toISOString().split('T')[0], weight: 82.5, reps: 6, estimated1RM: 96 },
        { date: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString().split('T')[0], weight: 85, reps: 6, estimated1RM: 99 },
        { date: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString().split('T')[0], weight: 90, reps: 6, estimated1RM: 105 }
      ]
    },
    barbell_back_squat: {
      exerciseId: 'barbell_back_squat',
      bestWeight: 115,
      bestReps: 5,
      estimated1RM: 132,
      lastTrainedDate: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString().split('T')[0],
      history: [
        { date: new Date(Date.now() - 25 * 24 * 3600 * 1000).toISOString().split('T')[0], weight: 105, reps: 5, estimated1RM: 120 },
        { date: new Date(Date.now() - 12 * 24 * 3600 * 1000).toISOString().split('T')[0], weight: 110, reps: 5, estimated1RM: 126 },
        { date: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString().split('T')[0], weight: 115, reps: 5, estimated1RM: 132 }
      ]
    },
    conventional_deadlift: {
      exerciseId: 'conventional_deadlift',
      bestWeight: 140,
      bestReps: 5,
      estimated1RM: 161,
      lastTrainedDate: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString().split('T')[0],
      history: [
        { date: new Date(Date.now() - 21 * 24 * 3600 * 1000).toISOString().split('T')[0], weight: 130, reps: 5, estimated1RM: 150 },
        { date: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString().split('T')[0], weight: 140, reps: 5, estimated1RM: 161 }
      ]
    }
  },
  exerciseFeedback: {
    barbell_bench_press: {
      exerciseId: 'barbell_bench_press',
      totalSessions: 6,
      averageEffectiveness: 2.8,
      lastEffectiveness: 'high',
      lastDifficulty: 'medium',
      painReportsCount: 0,
      stagnationWeeks: 0,
      status: 'optimal'
    },
    barbell_back_squat: {
      exerciseId: 'barbell_back_squat',
      totalSessions: 5,
      averageEffectiveness: 2.7,
      lastEffectiveness: 'high',
      lastDifficulty: 'hard',
      painReportsCount: 0,
      stagnationWeeks: 0,
      status: 'optimal'
    }
  },
  fatigueHistory: [
    {
      date: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString().split('T')[0],
      workoutHardness: 7,
      finishedAllSets: true,
      energyLevel: 8
    }
  ],
  injuryHistory: [],
  evolutionEvents: [],
  lastEvolutionCheckDate: new Date().toISOString()
};

// --- CUSTOM EXERCISES (SELF-EXPANDING LIBRARY) ---

export function loadCustomExercises(): Exercise[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_EXERCISES);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error loading custom exercises', e);
  }
  return [];
}

export function saveCustomExercise(exercise: Exercise): Exercise[] {
  try {
    const current = loadCustomExercises();
    const existingIndex = current.findIndex(e => e.id === exercise.id);
    if (existingIndex >= 0) {
      current[existingIndex] = exercise;
    } else {
      current.push({ ...exercise, isCustom: true });
    }
    localStorage.setItem(STORAGE_KEYS.CUSTOM_EXERCISES, JSON.stringify(current));
    return current;
  } catch (e) {
    console.error('Error saving custom exercise', e);
    return [];
  }
}

export function getAllExercisesLibrary(): Exercise[] {
  const custom = loadCustomExercises();
  if (!custom || custom.length === 0) return baseExerciseDatabase;

  const merged = [...baseExerciseDatabase];
  custom.forEach(c => {
    const idx = merged.findIndex(m => m.id === c.id);
    if (idx >= 0) {
      merged[idx] = c;
    } else {
      merged.push(c);
    }
  });
  return merged;
}

// --- AI MEMORY DATABASE STORAGE ---

export function loadAIMemory(): AIMemoryDatabase {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AI_MEMORY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure all root keys exist
      return {
        ...defaultAIMemory,
        ...parsed,
        strengthProgression: parsed.strengthProgression || {},
        exerciseFeedback: parsed.exerciseFeedback || {},
        fatigueHistory: parsed.fatigueHistory || [],
        injuryHistory: parsed.injuryHistory || [],
        evolutionEvents: parsed.evolutionEvents || []
      };
    }
  } catch (e) {
    console.error('Error loading AI memory', e);
  }
  return defaultAIMemory;
}

export function saveAIMemory(memory: AIMemoryDatabase): void {
  try {
    localStorage.setItem(STORAGE_KEYS.AI_MEMORY, JSON.stringify(memory));
  } catch (e) {
    console.error('Error saving AI memory', e);
  }
}

// --- WORKOUT MEMORY UPDATE & EVOLUTION TRIGGER ---

export interface WorkoutMemoryUpdateInput {
  date: string;
  workoutHardness: number; // 1 to 10
  finishedAllSets: boolean;
  exerciseFeedbacks: PerExerciseFeedback[];
  userBodyweight?: number;
}

export function updateAIMemoryAfterWorkout(
  input: WorkoutMemoryUpdateInput,
  currentPlan?: WorkoutPlan
): { memory: AIMemoryDatabase; proposedEvolutions: ExerciseEvolutionEvent[] } {
  const memory = loadAIMemory();
  const library = getAllExercisesLibrary();

  // 1. Fatigue History
  memory.fatigueHistory.push({
    date: input.date,
    workoutHardness: input.workoutHardness,
    finishedAllSets: input.finishedAllSets
  });

  // 2. Weight progression
  if (input.userBodyweight && input.userBodyweight > 30) {
    const lastWeightEntry = memory.weightProgressionHistory[memory.weightProgressionHistory.length - 1];
    if (!lastWeightEntry || lastWeightEntry.date !== input.date) {
      memory.weightProgressionHistory.push({
        date: input.date,
        weight: input.userBodyweight
      });
    }
  }

  const proposedEvolutions: ExerciseEvolutionEvent[] = [];

  // 3. Process each per-exercise feedback
  input.exerciseFeedbacks.forEach(fb => {
    const currentRec = memory.exerciseFeedback[fb.exerciseId] || {
      exerciseId: fb.exerciseId,
      totalSessions: 0,
      averageEffectiveness: 2.5,
      lastEffectiveness: 'moderate',
      lastDifficulty: 'medium',
      painReportsCount: 0,
      stagnationWeeks: 0,
      status: 'optimal'
    };

    currentRec.totalSessions += 1;
    currentRec.lastEffectiveness = fb.effectiveness;
    currentRec.lastDifficulty = fb.difficulty;

    const effValue = fb.effectiveness === 'high' ? 3 : fb.effectiveness === 'moderate' ? 2 : 1;
    // Rolling weighted average
    currentRec.averageEffectiveness = Number(
      ((currentRec.averageEffectiveness * (currentRec.totalSessions - 1) + effValue) / currentRec.totalSessions).toFixed(2)
    );

    // Pain / discomfort check
    if (fb.painOrDiscomfort) {
      currentRec.painReportsCount += 1;
      currentRec.lastPainDate = input.date;
      currentRec.lastPainArea = fb.painArea || 'Joint';
      currentRec.status = 'pain_warning';

      // Record in injury history
      memory.injuryHistory.push({
        id: `inj_${Date.now()}_${fb.exerciseId}`,
        date: input.date,
        jointArea: fb.painArea || 'Joint Discomfort',
        severity: 'moderate',
        aggravatingExerciseId: fb.exerciseId,
        status: 'active'
      });

      // Immediate Pain Evolution: propose safer alternative!
      const safeAlts = getPainFreeAlternatives(fb.exerciseId, fb.painArea, library);
      const replacement = safeAlts[0] || getExerciseRegression(fb.exerciseId, library);

      if (replacement && replacement.id !== fb.exerciseId) {
        const origEx = getExerciseById(fb.exerciseId, library);
        proposedEvolutions.push({
          id: `evo_pain_${Date.now()}_${fb.exerciseId}`,
          date: input.date,
          originalExerciseId: fb.exerciseId,
          replacementExerciseId: replacement.id,
          reason: 'pain_relief',
          rationale: {
            en: `Pain reported in ${fb.painArea || 'joint'}. Swapping from ${origEx?.name.en || fb.exerciseId} to ${replacement.name.en} to reduce articular shear stress while preserving target muscle hypertrophy stimulus.`,
            fa: `گزارش درد در مفصل ${fb.painArea || 'مربوطه'}. سیستم هوشمند حرکت ${origEx?.name.fa || fb.exerciseId} را با ${replacement.name.fa} جایگزین می‌کند تا فشار مخرب مفصلی حذف شده و رشد عضله بدون آسیب ادامه یابد.`
          },
          applied: false
        });
      }
    } else {
      if (currentRec.status === 'pain_warning' && currentRec.painReportsCount === 0) {
        currentRec.status = 'optimal';
      }
    }

    // 4. Strength Progression tracking (1RM calculation)
    if (fb.weightUsed && fb.weightUsed > 0 && fb.repsCompleted && fb.repsCompleted > 0) {
      const estimated1RM = Math.round(fb.weightUsed * (1 + fb.repsCompleted / 30));
      const liftHistoryEntry: StrengthLiftHistoryEntry = {
        date: input.date,
        weight: fb.weightUsed,
        reps: fb.repsCompleted,
        estimated1RM
      };

      const existingProgression = memory.strengthProgression[fb.exerciseId];
      if (!existingProgression) {
        memory.strengthProgression[fb.exerciseId] = {
          exerciseId: fb.exerciseId,
          bestWeight: fb.weightUsed,
          bestReps: fb.repsCompleted,
          estimated1RM,
          lastTrainedDate: input.date,
          history: [liftHistoryEntry]
        };
      } else {
        existingProgression.lastTrainedDate = input.date;
        existingProgression.history.push(liftHistoryEntry);
        if (estimated1RM > existingProgression.estimated1RM) {
          existingProgression.estimated1RM = estimated1RM;
          existingProgression.bestWeight = fb.weightUsed;
          existingProgression.bestReps = fb.repsCompleted;
          currentRec.stagnationWeeks = 0;
          currentRec.status = 'optimal';
        } else {
          // Check if lift has been flat for >= 4 sessions
          if (existingProgression.history.length >= 4) {
            const recent = existingProgression.history.slice(-4);
            const flat = recent.every(r => r.estimated1RM <= existingProgression.estimated1RM * 0.98);
            if (flat) {
              currentRec.stagnationWeeks = Math.max(4, currentRec.stagnationWeeks + 1);
              currentRec.status = 'stagnating';
            }
          }
        }
      }
    }

    // 5. Ineffective or Stagnant Evaluation
    if (currentRec.totalSessions >= 4 && currentRec.averageEffectiveness < 1.8 && !fb.painOrDiscomfort) {
      currentRec.status = 'needs_regression';
      const alt = getEquivalentExercises(fb.exerciseId, library)[0];
      if (alt && alt.id !== fb.exerciseId) {
        const origEx = getExerciseById(fb.exerciseId, library);
        proposedEvolutions.push({
          id: `evo_eff_${Date.now()}_${fb.exerciseId}`,
          date: input.date,
          originalExerciseId: fb.exerciseId,
          replacementExerciseId: alt.id,
          reason: 'plateau_breaker',
          rationale: {
            en: `Low effectiveness reported over ${currentRec.totalSessions} sessions. Biomechanical swap to ${alt.name.en} provides a novel resistance profile to stimulate lagging muscle fibers.`,
            fa: `اثربخشی پایین در ${currentRec.totalSessions} جلسه متوالی. جایگزینی بیومکانیکی با ${alt.name.fa} به منظور ایجاد تنش عضلانی جدید و غلبه بر فاز ایست (Plateau).`
          },
          applied: false
        });
      }
    }

    memory.exerciseFeedback[fb.exerciseId] = currentRec;
  });

  // Save updated evolutions to memory
  if (proposedEvolutions.length > 0) {
    proposedEvolutions.forEach(pe => {
      if (!memory.evolutionEvents.some(e => e.originalExerciseId === pe.originalExerciseId && !e.applied)) {
        memory.evolutionEvents.unshift(pe);
      }
    });
  }

  memory.lastEvolutionCheckDate = input.date;
  saveAIMemory(memory);

  return { memory, proposedEvolutions };
}

// Apply an evolution event directly to the active workout plan
export function applyEvolutionToPlan(
  plan: WorkoutPlan,
  evolutionEventId: string
): { updatedPlan: WorkoutPlan; updatedMemory: AIMemoryDatabase } {
  const memory = loadAIMemory();
  const evolution = memory.evolutionEvents.find(e => e.id === evolutionEventId);
  const library = getAllExercisesLibrary();

  if (!evolution) {
    return { updatedPlan: plan, updatedMemory: memory };
  }

  const replacementExercise = getExerciseById(evolution.replacementExerciseId, library);
  if (!replacementExercise) {
    return { updatedPlan: plan, updatedMemory: memory };
  }

  // Clone plan and swap exercise
  const newDays = plan.days.map(day => {
    const newExercises = day.exercises.map(item => {
      if (item.exerciseId === evolution.originalExerciseId) {
        return {
          ...item,
          exerciseId: replacementExercise.id,
          sets: replacementExercise.defaultSets || item.sets,
          reps: replacementExercise.defaultReps || item.reps,
          restSeconds: replacementExercise.defaultRestSec || item.restSeconds
        };
      }
      return item;
    });
    return {
      ...day,
      exercises: newExercises
    };
  });

  const updatedPlan: WorkoutPlan = {
    ...plan,
    days: newDays,
    lastAdaptedAt: new Date().toISOString()
  };

  // Mark evolution as applied
  evolution.applied = true;
  saveAIMemory(memory);

  return { updatedPlan, updatedMemory: memory };
}
