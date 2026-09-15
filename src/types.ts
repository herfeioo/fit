export type Language = 'en' | 'fa';

export type Gender = 'male' | 'female';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type FitnessGoal = 'muscle_gain' | 'fat_loss' | 'recomposition' | 'strength';

export type TrainingSplit = 'upper_lower' | 'ppl' | 'full_body' | 'custom';

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'heavy';

export type SleepQuality = 'less_than_6' | '6_to_7' | '7_to_8' | 'more_than_8';

export type InjuryLimitation = 'none' | 'knee' | 'lower_back' | 'shoulder' | 'wrist';

export type MuscleGroup = 
  | 'chest' 
  | 'back' 
  | 'shoulders' 
  | 'biceps' 
  | 'triceps' 
  | 'quads' 
  | 'hamstrings' 
  | 'glutes' 
  | 'calves' 
  | 'core'
  | 'forearms';

export type TargetMuscle = MuscleGroup;

export interface BodyMeasurements {
  waist: number; // cm
  chest: number; // cm
  arms: number; // cm
  thighs: number; // cm
  shoulders: number; // cm
  neck?: number; // cm (helpful for US Navy body fat)
  hips?: number; // cm (for females)
}

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  height: number; // cm
  weight: number; // kg
  targetWeight?: number; // kg (e.g. 89)
  targetPhysiqueType?: 'aesthetic_shredded' | 'lean_muscular' | 'athletic' | 'mass_monster' | 'powerbuilder';
  targetFocusArea?: string;
  targetTimeframeWeeks?: number;
  targetDescription?: string;
  userUploadedPhoto?: string; // Base64 data URL
  targetPhysiquePhotoUrl?: string;
  experience: ExperienceLevel;
  goal: FitnessGoal;
  weeklyDays: 3 | 4 | 5 | 6;
  preferredSplit: TrainingSplit;
  measurements: BodyMeasurements;
  bodyFatPercent?: number; // calculated or estimated
  weightUnit: 'kg' | 'lbs';
  onboardingCompleted: boolean;
  equipment?: 'full_gym' | 'barbell_dumbbell' | 'home_cables';
  focusMuscle?: 'balanced' | 'upper' | 'lower' | 'back';
  injuryLimitation?: InjuryLimitation;
  activityLevel?: ActivityLevel;
  sleepQuality?: SleepQuality;
  trainingContext?: 'myself_6_months' | 'other_beginner';
  experienceMonths?: number;
  // 2-Year Macrocycle Evolution Tracking
  macrocycleMonth?: number; // 1 - 24
  mesocycleNumber?: number; // 1 - 16
  mesocyclePhase?: 'hypertrophy' | 'strength' | 'peaking' | 'deload';
  mesocycleWeek?: number; // 1 - 6
  lastAnalysisDate?: string;
  checkIns?: CheckInFeedback[];
  programHistory?: ProgramHistoryEntry[];
  completedDayIds?: string[];
  firstWorkoutCompletedDate?: string; // ISO date string of the very first completed workout day
  lastBiometricCheckDate?: string; // ISO date string when 4-week check-in was last conducted
  trainingRecommendationsSummary?: {
    split: string;
    focus: string;
    weeklyVolumeSets: number;
    recommendedDeloadWeek: number;
  };
}

export interface ProgramHistoryEntry {
  id: string;
  month: number;
  week: number;
  phaseName: { en: string; fa: string };
  completedDate: string;
  splitType: TrainingSplit;
  sessionsCompleted?: number;
  notes?: string;
}

export interface CheckInFeedback {
  id: string;
  date: string;
  trainingDifficulty: 'too_hard' | 'balanced' | 'too_easy';
  workoutCompletion?: '100%' | '75%' | '50%' | 'under_50%';
  energyLevel: number; // 1 - 10
  fatigueRating?: number; // 1 - 10 scale
  sorenessDuration: 'under_24h' | '24_48h' | 'over_48h';
  jointPain: boolean;
  jointPainArea?: string;
  strengthProgress: 'progressing' | 'stagnant' | 'declining';
  sleepQuality: 'poor' | 'average' | 'great';
  fatigueLevel: 'low' | 'moderate' | 'high' | 'exhausted';
  aiRecommendation: { en: string; fa: string };
  actionApplied?: 'volume_reduced' | 'intensity_increased' | 'deload_triggered' | 'split_optimized' | 'maintained';
}

export type ExerciseType = 'compound' | 'isolation';
export type EquipmentType = 'barbell' | 'dumbbell' | 'machine' | 'cable' | 'bodyweight';
export type MovementPattern = 'push' | 'pull' | 'squat' | 'hinge' | 'carry' | 'rotation';
export type InjuryRiskLevel = 'low' | 'medium' | 'high';

export interface ExerciseProgressionOptions {
  regression?: string; // ID of easier version
  progression?: string; // ID of harder version
  alternatives?: string[]; // IDs of biomechanically equivalent swaps
}

export interface ExerciseGuide {
  steps: { en: string[]; fa: string[] };
  commonMistakes: { en: string[]; fa: string[] };
  breathing: { en: string; fa: string };
  formCues: { en: string[]; fa: string[] };
  tempo: string; // e.g. "3-1-1-0"
  tempoDescription: { en: string; fa: string };
}

export interface Exercise {
  id: string;
  name: { en: string; fa: string };
  muscleGroup: string; // e.g. "Chest", "Back", "Shoulders", "Biceps", "Triceps", "Quads", "Hamstrings", "Glutes", "Calves", "Core"
  targetMuscle: MuscleGroup;
  type: ExerciseType;
  equipment: EquipmentType;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  movementPattern: MovementPattern;
  primaryMuscles: string[];
  secondaryMuscles: (MuscleGroup | string)[];
  injuryRiskLevel: InjuryRiskLevel;
  instructions: { en: string[]; fa: string[] };
  commonMistakes: { en: string[]; fa: string[] };
  progressionOptions?: ExerciseProgressionOptions;
  gifUrl?: string;
  youtubeUrl?: string;
  customGifUrl?: string;
  youtubeId?: string;
  youtubeTitle?: string;
  defaultSets: number;
  defaultReps: string; // e.g. "8-12"
  defaultRestSec: number;
  guide: ExerciseGuide;
  substitutes?: string[]; // IDs of equivalent scientific replacement exercises
  isCustom?: boolean;
}

// AI MEMORY & ADAPTIVE EVOLUTION SCHEMA
export interface PerExerciseFeedback {
  exerciseId: string;
  effectiveness: 'high' | 'moderate' | 'low';
  painOrDiscomfort: boolean;
  painArea?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  weightUsed?: number;
  repsCompleted?: number;
}

export interface StrengthLiftHistoryEntry {
  date: string;
  weight: number;
  reps: number;
  estimated1RM: number;
}

export interface StrengthProgressionPerLift {
  exerciseId: string;
  bestWeight: number;
  bestReps: number;
  estimated1RM: number;
  lastTrainedDate: string;
  history: StrengthLiftHistoryEntry[];
}

export interface ExerciseMemoryFeedbackRecord {
  exerciseId: string;
  totalSessions: number;
  averageEffectiveness: number; // 1 to 3
  lastEffectiveness: 'high' | 'moderate' | 'low';
  lastDifficulty: 'easy' | 'medium' | 'hard';
  painReportsCount: number;
  lastPainDate?: string;
  lastPainArea?: string;
  stagnationWeeks: number;
  status: 'optimal' | 'stagnating' | 'needs_regression' | 'needs_progression' | 'pain_warning';
}

export interface FatigueHistoryEntry {
  date: string;
  workoutHardness: number; // 1 - 10
  finishedAllSets: boolean;
  energyLevel?: number;
}

export interface InjuryHistoryEntry {
  id: string;
  date: string;
  jointArea: string;
  severity: 'mild' | 'moderate' | 'severe';
  aggravatingExerciseId?: string;
  status: 'active' | 'improving' | 'resolved';
}

export interface ExerciseEvolutionEvent {
  id: string;
  date: string;
  originalExerciseId: string;
  replacementExerciseId: string;
  reason: 'pain_relief' | 'plateau_breaker' | 'hypertrophy_progression' | 'biomechanical_swap' | 'user_requested';
  rationale: { en: string; fa: string };
  applied: boolean;
}

export interface AIMemoryDatabase {
  trainingAgeMonths: number;
  weightProgressionHistory: { date: string; weight: number }[];
  strengthProgression: Record<string, StrengthProgressionPerLift>;
  exerciseFeedback: Record<string, ExerciseMemoryFeedbackRecord>;
  fatigueHistory: FatigueHistoryEntry[];
  injuryHistory: InjuryHistoryEntry[];
  evolutionEvents: ExerciseEvolutionEvent[];
  lastEvolutionCheckDate: string;
}

export interface WorkoutExerciseItem {
  id: string;
  exerciseId: string;
  sets: number;
  reps: string;
  restSeconds: number;
  targetRpe?: number;
  notes?: string;
}

export interface WorkoutDay {
  id: string;
  dayNumber: number;
  title: { en: string; fa: string };
  description: { en: string; fa: string };
  targetFocus: string;
  exercises: WorkoutExerciseItem[];
  isRestDay?: boolean;
}

export interface WorkoutPlan {
  id: string;
  name: { en: string; fa: string };
  splitType: TrainingSplit;
  daysPerWeek: number;
  days: WorkoutDay[];
  createdAt: string;
  lastAdaptedAt?: string;
  mesocyclePhase?: 'hypertrophy' | 'strength' | 'peaking' | 'deload';
  mesocycleWeek?: number;
  macrocycleMonth?: number;
}

export interface LoggedSet {
  setNumber: number;
  weight: number; // in user preferred unit
  reps: number;
  completed: boolean;
  rpe?: number;
}

export interface LoggedExercise {
  exerciseId: string;
  sets: LoggedSet[];
}

export interface WorkoutSessionLog {
  id: string;
  dayId: string;
  dayTitle: string;
  date: string;
  durationMinutes: number;
  exercises: LoggedExercise[];
  totalVolumeKg: number;
  perceivedHardness?: number; // 1 - 10 ("How hard was it?")
  finishedAllSets?: boolean; // ("Did you finish all sets?")
  notes?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}

export interface WeightLog {
  id: string;
  date: string;
  weight: number;
  bodyFat?: number;
  leanMassKg?: number;
  waistCm?: number;
  measurements?: Partial<BodyMeasurements>;
  note?: string;
}

export interface NutritionTargets {
  calories: number;
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
  waterLiters: number;
  tdee: number;
  bmr: number;
}

export interface AdaptiveInsight {
  id: string;
  date: string;
  type: 'progression' | 'plateau' | 'recovery' | 'deload';
  message: { en: string; fa: string };
  exerciseId?: string;
  recommendedAction?: { en: string; fa: string };
}

export interface CoachProposedPlanUpdate {
  id: string;
  dayId?: string;
  dayTitle?: string;
  originalExerciseId?: string;
  originalExerciseName: string;
  newExerciseId?: string;
  newExerciseName: string;
  action: 'swap_exercise' | 'adjust_load' | 'modify_sets_reps' | 'change_intensity';
  details?: string;
  newSets?: number;
  newReps?: string;
  applied?: boolean;
}

export interface CoachChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
  proposedUpdate?: CoachProposedPlanUpdate;
}

export interface CoachChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: CoachChatMessage[];
}

// ==========================================
// Dedicated At-Home Cardio & HIIT Module Types
// ==========================================
export type CardioTargetMuscleGroup =
  | 'all'
  | 'core'
  | 'legs'
  | 'chest'
  | 'back'
  | 'shoulders_arms'
  | 'full_body';

export interface CardioExerciseItem {
  id: string;
  name: { en: string; fa: string };
  targetGroup: CardioTargetMuscleGroup;
  primaryMuscles: { en: string; fa: string };
  intensity: 'moderate' | 'high' | 'explosive';
  defaultWorkSec: number;
  defaultRestSec: number;
  caloriesPerMinute: number;
  instructions: { en: string[]; fa: string[] };
  tips: { en: string; fa: string };
  imageUrl: string;
  youtubeId: string;
  youtubeTitle: string;
  googleSearchQuery: string;
  equipmentNeeded?: string;
  patternType?: 'primer' | 'explosive' | 'core_stability' | 'unilateral_rotational' | 'burnout';
}

export interface CardioRoutine {
  id: string;
  targetGroup: CardioTargetMuscleGroup;
  title: { en: string; fa: string };
  description: { en: string; fa: string };
  rounds: number;
  workSec: number;
  restSec: number;
  roundRestSec: number;
  warmupMinutes: number;
  cooldownMinutes: number;
  estimatedMinutes: number;
  estimatedCalories: number;
  exercises: CardioExerciseItem[];
  warmupSteps: { title: { en: string; fa: string }; durationSec: number }[];
  cooldownSteps: { title: { en: string; fa: string }; durationSec: number }[];
}

export interface CardioCompletedSession {
  id: string;
  date: string;
  targetGroup: CardioTargetMuscleGroup;
  title: string;
  durationMinutes: number;
  caloriesBurned: number;
  roundsCompleted: number;
  exercisesCount: number;
}



