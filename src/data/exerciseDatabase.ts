import { Exercise, MuscleGroup } from '../types';
import { chestExercises } from './exercises/chest';
import { backExercises } from './exercises/back';
import { shoulderExercises } from './exercises/shoulders';
import { armExercises } from './exercises/arms';
import { legExercises } from './exercises/legs';
import { coreExercises } from './exercises/core';

// Static base library covering all foundational science-based exercises
export const baseExerciseDatabase: Exercise[] = [
  ...chestExercises,
  ...backExercises,
  ...shoulderExercises,
  ...armExercises,
  ...legExercises,
  ...coreExercises
];

// In-memory / dynamic merged exercise library
export const exerciseDatabase: Exercise[] = [...baseExerciseDatabase];

export const exerciseLibrary = exerciseDatabase;

// Explicit substitution map based on biomechanics & movement patterns
const EXERCISE_SUBSTITUTES_MAP: Record<string, string[]> = {
  barbell_bench_press: ['dumbbell_bench_press', 'machine_chest_press', 'dips_chest_focus', 'incline_barbell_bench_press'],
  incline_barbell_bench_press: ['incline_dumbbell_press', 'barbell_bench_press', 'cable_chest_flyes'],
  decline_barbell_bench_press: ['dips_chest_focus', 'cable_chest_flyes', 'dumbbell_bench_press'],
  dumbbell_bench_press: ['barbell_bench_press', 'machine_chest_press', 'incline_dumbbell_press'],
  incline_dumbbell_press: ['incline_barbell_bench_press', 'dumbbell_bench_press', 'pec_deck_fly'],
  machine_chest_press: ['dumbbell_bench_press', 'barbell_bench_press', 'cable_chest_flyes'],
  cable_chest_flyes: ['pec_deck_fly', 'dumbbell_bench_press', 'machine_chest_press'],
  pec_deck_fly: ['cable_chest_flyes', 'machine_chest_press'],
  dips_chest_focus: ['decline_barbell_bench_press', 'dumbbell_bench_press', 'barbell_bench_press'],

  pull_ups: ['lat_pulldown', 'close_grip_lat_pulldown', 'straight_arm_pulldown'],
  lat_pulldown: ['pull_ups', 'close_grip_lat_pulldown', 'straight_arm_pulldown'],
  close_grip_lat_pulldown: ['lat_pulldown', 'pull_ups', 'seated_cable_row'],
  barbell_bent_over_row: ['seated_cable_row', 'single_arm_dumbbell_row', 't_bar_row'],
  single_arm_dumbbell_row: ['seated_cable_row', 'barbell_bent_over_row', 't_bar_row'],
  seated_cable_row: ['single_arm_dumbbell_row', 'barbell_bent_over_row', 't_bar_row'],
  t_bar_row: ['barbell_bent_over_row', 'seated_cable_row', 'single_arm_dumbbell_row'],
  conventional_deadlift: ['sumo_deadlift', 'romanian_deadlift_rdl'],
  sumo_deadlift: ['conventional_deadlift', 'romanian_deadlift_rdl'],
  straight_arm_pulldown: ['lat_pulldown', 'pull_ups'],

  overhead_barbell_press: ['dumbbell_overhead_press', 'machine_shoulder_press', 'arnold_press'],
  dumbbell_overhead_press: ['overhead_barbell_press', 'machine_shoulder_press', 'arnold_press'],
  arnold_press: ['dumbbell_overhead_press', 'machine_shoulder_press'],
  dumbbell_lateral_raise: ['cable_lateral_raise', 'face_pulls'],
  cable_lateral_raise: ['dumbbell_lateral_raise', 'face_pulls'],
  dumbbell_front_raise: ['dumbbell_overhead_press', 'overhead_barbell_press'],
  rear_delt_fly: ['face_pulls', 'dumbbell_lateral_raise', 'seated_cable_row'],
  face_pulls: ['rear_delt_fly', 'dumbbell_lateral_raise'],
  machine_shoulder_press: ['dumbbell_overhead_press', 'overhead_barbell_press'],

  barbell_bicep_curl: ['ez_bar_curl', 'dumbbell_curl', 'cable_bicep_curl'],
  ez_bar_curl: ['barbell_bicep_curl', 'dumbbell_curl', 'preacher_curl'],
  dumbbell_curl: ['barbell_bicep_curl', 'incline_dumbbell_curl', 'cable_bicep_curl'],
  dumbbell_hammer_curl: ['dumbbell_curl', 'cable_bicep_curl', 'preacher_curl'],
  concentration_curl: ['preacher_curl', 'cable_bicep_curl', 'dumbbell_curl'],
  incline_dumbbell_curl: ['preacher_curl', 'dumbbell_curl', 'cable_bicep_curl'],
  cable_bicep_curl: ['dumbbell_curl', 'ez_bar_curl', 'barbell_bicep_curl'],
  preacher_curl: ['incline_dumbbell_curl', 'concentration_curl', 'cable_bicep_curl'],

  close_grip_bench_press: ['dips_triceps_focus', 'skull_crushers_lying_triceps_extension', 'triceps_rope_pushdown'],
  triceps_rope_pushdown: ['straight_bar_triceps_pushdown', 'overhead_triceps_extension', 'cable_triceps_kickback'],
  straight_bar_triceps_pushdown: ['triceps_rope_pushdown', 'overhead_triceps_extension'],
  overhead_triceps_extension: ['skull_crushers_lying_triceps_extension', 'triceps_rope_pushdown'],
  skull_crushers_lying_triceps_extension: ['overhead_triceps_extension', 'close_grip_bench_press', 'triceps_rope_pushdown'],
  dips_triceps_focus: ['close_grip_bench_press', 'triceps_rope_pushdown'],
  cable_triceps_kickback: ['triceps_rope_pushdown'],

  barbell_back_squat: ['hack_squat', 'leg_press', 'front_squat', 'goblet_squat'],
  front_squat: ['barbell_back_squat', 'hack_squat', 'goblet_squat', 'leg_press'],
  goblet_squat: ['leg_press', 'hack_squat', 'barbell_back_squat'],
  leg_press: ['hack_squat', 'barbell_back_squat', 'goblet_squat'],
  leg_extension: ['hack_squat', 'leg_press', 'walking_lunges'],
  hack_squat: ['leg_press', 'barbell_back_squat', 'front_squat'],
  walking_lunges: ['reverse_lunge', 'bulgarian_split_squat', 'leg_press'],
  reverse_lunge: ['walking_lunges', 'bulgarian_split_squat', 'goblet_squat'],

  romanian_deadlift_rdl: ['seated_leg_curl', 'lying_leg_curl', 'glute_ham_raise'],
  lying_leg_curl: ['seated_leg_curl', 'romanian_deadlift_rdl'],
  seated_leg_curl: ['lying_leg_curl', 'romanian_deadlift_rdl', 'glute_ham_raise'],
  glute_ham_raise: ['seated_leg_curl', 'romanian_deadlift_rdl', 'lying_leg_curl'],

  hip_thrust: ['bulgarian_split_squat', 'romanian_deadlift_rdl'],
  bulgarian_split_squat: ['reverse_lunge', 'walking_lunges', 'hip_thrust'],

  standing_calf_raise: ['seated_calf_raise', 'leg_press'],
  seated_calf_raise: ['standing_calf_raise', 'leg_press'],

  classic_crunch: ['cable_kneeling_crunch', 'hanging_leg_raise', 'bicycle_crunch'],
  decline_bench_crunch: ['cable_kneeling_crunch', 'classic_crunch', 'ab_wheel_rollout'],
  bicycle_crunch: ['russian_twist', 'classic_crunch', 'hanging_leg_raise'],
  hanging_leg_raise: ['cable_kneeling_crunch', 'ab_wheel_rollout', 'classic_crunch'],
  cable_kneeling_crunch: ['hanging_leg_raise', 'classic_crunch', 'ab_wheel_rollout'],
  standard_forearm_plank: ['ab_wheel_rollout', 'cable_kneeling_crunch'],
  russian_twist: ['bicycle_crunch', 'classic_crunch'],
  ab_wheel_rollout: ['hanging_leg_raise', 'cable_kneeling_crunch', 'standard_forearm_plank']
};

export function getExerciseById(id: string, customLibrary?: Exercise[]): Exercise | undefined {
  const library = customLibrary && customLibrary.length > 0 ? customLibrary : exerciseDatabase;
  const ex = library.find(ex => ex.id === id) || baseExerciseDatabase.find(ex => ex.id === id);
  if (!ex) return undefined;

  // Media guarantees: ensure gifUrl and youtubeUrl always populated
  if (!ex.gifUrl) {
    ex.gifUrl = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80';
  }
  if (!ex.youtubeUrl) {
    const searchName = typeof ex.name === 'object' ? ex.name.en : (ex.name || ex.id);
    ex.youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchName + ' perfect form tutorial')}`;
  }
  return ex;
}

export function getExercisesByMuscle(muscle: MuscleGroup, customLibrary?: Exercise[]): Exercise[] {
  const library = customLibrary && customLibrary.length > 0 ? customLibrary : exerciseDatabase;
  return library.filter(ex => ex.targetMuscle === muscle);
}

export function getEquivalentExercises(exerciseId: string, customLibrary?: Exercise[]): Exercise[] {
  const library = customLibrary && customLibrary.length > 0 ? customLibrary : exerciseDatabase;
  const current = getExerciseById(exerciseId, library);
  if (!current) return [];

  const directSubIds = [
    ...(EXERCISE_SUBSTITUTES_MAP[exerciseId] || []),
    ...(current.progressionOptions?.alternatives || []),
    ...(current.substitutes || [])
  ];

  const results: Exercise[] = [];

  directSubIds.forEach(id => {
    const ex = getExerciseById(id, library);
    if (ex && !results.some(r => r.id === ex.id) && ex.id !== exerciseId) {
      results.push(ex);
    }
  });

  // Also include same target muscle exercises with lower or equivalent injury risk
  library.forEach(ex => {
    if (
      ex.id !== exerciseId &&
      ex.targetMuscle === current.targetMuscle &&
      !results.some(r => r.id === ex.id)
    ) {
      results.push(ex);
    }
  });

  return results;
}

export function getExerciseRegression(exerciseId: string, customLibrary?: Exercise[]): Exercise | undefined {
  const ex = getExerciseById(exerciseId, customLibrary);
  if (!ex || !ex.progressionOptions?.regression) return undefined;
  return getExerciseById(ex.progressionOptions.regression, customLibrary);
}

export function getExerciseProgression(exerciseId: string, customLibrary?: Exercise[]): Exercise | undefined {
  const ex = getExerciseById(exerciseId, customLibrary);
  if (!ex || !ex.progressionOptions?.progression) return undefined;
  return getExerciseById(ex.progressionOptions.progression, customLibrary);
}

export function getPainFreeAlternatives(exerciseId: string, painfulJoint?: string, customLibrary?: Exercise[]): Exercise[] {
  const ex = getExerciseById(exerciseId, customLibrary);
  if (!ex) return [];

  const equivalents = getEquivalentExercises(exerciseId, customLibrary);
  
  // Prioritize lower injury risk and dumbbell/machine/cable variations
  return equivalents.filter(alt => {
    if (painfulJoint && painfulJoint.toLowerCase().includes('shoulder')) {
      // Avoid barbell overhead or deep flaring bench
      return alt.id !== 'overhead_barbell_press' && alt.equipment !== 'barbell';
    }
    if (painfulJoint && (painfulJoint.toLowerCase().includes('knee') || painfulJoint.toLowerCase().includes('patell'))) {
      // Avoid deep squats or lunges; prefer leg press / reverse lunge
      return alt.id !== 'barbell_back_squat' && alt.id !== 'walking_lunges';
    }
    if (painfulJoint && (painfulJoint.toLowerCase().includes('lower back') || painfulJoint.toLowerCase().includes('lumbar'))) {
      // Avoid barbell rows / heavy deadlifts; prefer chest supported rows or cable
      return alt.id !== 'barbell_bent_over_row' && alt.id !== 'conventional_deadlift';
    }
    return alt.injuryRiskLevel !== 'high';
  });
}
