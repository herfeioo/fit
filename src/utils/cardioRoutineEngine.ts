import {
  CardioExerciseItem,
  CardioRoutine,
  CardioTargetMuscleGroup,
} from '../types';
import { cardioExerciseLibrary, standardCardioWarmup, standardCardioCooldown } from '../data/cardioDatabase';
import { additionalCardioExercises } from '../data/additionalCardioExercises';

// Complete combined 56+ exercise cardio database
export const allCardioExercises: CardioExerciseItem[] = [
  ...cardioExerciseLibrary,
  ...additionalCardioExercises,
];

// Helper: Get all exercises for target
export function getAllCardioExercisesByTarget(targetGroup: CardioTargetMuscleGroup): CardioExerciseItem[] {
  if (targetGroup === 'all') {
    return allCardioExercises;
  }
  return allCardioExercises.filter((ex) => ex.targetGroup === targetGroup);
}

/**
 * Intelligent, Sports-Science Based Routine Generator:
 * 1. Absolute Zero Duplicates: Strictly unique exercises in every routine.
 * 2. True Randomization & Novelty: Prioritizes exercises not present in `excludeExerciseIds` (the previous routine).
 * 3. 5-Phase Scientific Biomechanical Sequencing:
 *    - Station 1: Primer / Dynamic Mobility (Elastic activation, ramping cardiac output)
 *    - Station 2: Explosive / Concentric Power (High motor unit recruitment while fresh)
 *    - Station 3: Core / Anti-Rotational Stability (Active balance, core wall bracing)
 *    - Station 4: Unilateral / Multi-Planar Agility (Frontal/transverse plane balance, asymmetry correction)
 *    - Station 5: Metabolic Burnout / VO2 Peak (Maximum cadence and caloric burn)
 */
export function generateScientificCardioRoutine(
  targetGroup: CardioTargetMuscleGroup,
  mode: 'tabata' | 'hiit' | 'moderate' = 'hiit',
  exerciseCount = 5,
  excludeExerciseIds: string[] = []
): CardioRoutine {
  // 1. Get eligible pool for requested target group
  let pool = targetGroup === 'all'
    ? [...allCardioExercises]
    : allCardioExercises.filter((ex) => ex.targetGroup === targetGroup);

  // If for any reason pool is too small, backfill uniquely from complementary library
  if (pool.length < exerciseCount) {
    const poolIds = new Set(pool.map((e) => e.id));
    for (const ex of allCardioExercises) {
      if (!poolIds.has(ex.id)) {
        pool.push(ex);
        poolIds.add(ex.id);
        if (pool.length >= exerciseCount * 2) break;
      }
    }
  }

  // 2. Separate into fresh pool (not seen in previous routine) vs previously used
  const excludeSet = new Set(excludeExerciseIds);
  const freshExercises = pool.filter((ex) => !excludeSet.has(ex.id));
  const previousExercises = pool.filter((ex) => excludeSet.has(ex.id));

  // Determine working pool for this randomization
  let workingPool: CardioExerciseItem[];
  if (freshExercises.length >= exerciseCount) {
    // 100% fresh - complete novelty!
    workingPool = freshExercises;
  } else {
    // Take all fresh ones, and supplement with shuffled previous ones
    workingPool = [...freshExercises, ...previousExercises.sort(() => Math.random() - 0.5)];
  }

  // 3. Select 5 exercises following the 5-phase scientific biomechanical pattern
  const targetPhases: Array<'primer' | 'explosive' | 'core_stability' | 'unilateral_rotational' | 'burnout'> = [
    'primer',
    'explosive',
    'core_stability',
    'unilateral_rotational',
    'burnout'
  ];

  const picked: CardioExerciseItem[] = [];
  const selectedIds = new Set<string>();

  // Helper to pick a candidate matching a preferred pattern type
  const pickCandidate = (preferredType: string): CardioExerciseItem | null => {
    // First look in workingPool for an unpicked item matching preferredType
    const matching = workingPool.filter(
      (ex) => !selectedIds.has(ex.id) && ex.patternType === preferredType
    );
    if (matching.length > 0) {
      const chosen = matching[Math.floor(Math.random() * matching.length)];
      selectedIds.add(chosen.id);
      return chosen;
    }

    // Fallback: look in full pool for an unpicked item matching preferredType
    const fallbackMatching = pool.filter(
      (ex) => !selectedIds.has(ex.id) && ex.patternType === preferredType
    );
    if (fallbackMatching.length > 0) {
      const chosen = fallbackMatching[Math.floor(Math.random() * fallbackMatching.length)];
      selectedIds.add(chosen.id);
      return chosen;
    }

    // Otherwise, pick any remaining unpicked item from workingPool
    const anyRemaining = workingPool.filter((ex) => !selectedIds.has(ex.id));
    if (anyRemaining.length > 0) {
      const chosen = anyRemaining[Math.floor(Math.random() * anyRemaining.length)];
      selectedIds.add(chosen.id);
      return chosen;
    }

    // Ultimate fallback: any unpicked from entire library
    const anyLib = allCardioExercises.filter((ex) => !selectedIds.has(ex.id));
    if (anyLib.length > 0) {
      const chosen = anyLib[Math.floor(Math.random() * anyLib.length)];
      selectedIds.add(chosen.id);
      return chosen;
    }

    return null;
  };

  // Populate each of the 5 stations
  for (let i = 0; i < exerciseCount; i++) {
    const phaseType = targetPhases[i % targetPhases.length];
    const candidate = pickCandidate(phaseType);
    if (candidate) {
      picked.push(candidate);
    }
  }

  // Double-check: ensure strict uniqueness (zero duplicates)
  const finalExercises: CardioExerciseItem[] = [];
  const finalSeen = new Set<string>();
  for (const ex of picked) {
    if (!finalSeen.has(ex.id)) {
      finalSeen.add(ex.id);
      finalExercises.push(ex);
    }
  }

  // If under exerciseCount, fill with any unique exercise
  if (finalExercises.length < exerciseCount) {
    for (const ex of allCardioExercises) {
      if (!finalSeen.has(ex.id)) {
        finalSeen.add(ex.id);
        finalExercises.push(ex);
        if (finalExercises.length >= exerciseCount) break;
      }
    }
  }

  // 4. Protocol settings
  let rounds = 3;
  let workSec = 40;
  let restSec = 20;
  let roundRestSec = 60;
  let modeNameFa = 'اینتروال HIIT استاندارد';
  let modeNameEn = 'HIIT Circuit';

  if (mode === 'tabata') {
    rounds = 4;
    workSec = 20;
    restSec = 10;
    roundRestSec = 45;
    modeNameFa = 'پروتکل چربی‌سوز تاباتا (Tabata 20/10)';
    modeNameEn = 'Tabata Protocol (20/10)';
  } else if (mode === 'moderate') {
    rounds = 2;
    workSec = 45;
    restSec = 25;
    roundRestSec = 90;
    modeNameFa = 'هوازی ریتمیک سبک';
    modeNameEn = 'Aerobic Flow';
  }

  const muscleNames: Record<CardioTargetMuscleGroup, { en: string; fa: string }> = {
    all: { en: 'Full Body & Core', fa: 'کل بدن و میان‌تنه' },
    core: { en: 'Abs & Core Scorch', fa: 'شکم، پهلو و میان‌تنه' },
    legs: { en: 'Legs & Glutes Plyo', fa: 'پا، باسن و چهارسر ران' },
    chest: { en: 'Chest & Upper Calisthenics', fa: 'سینه و بالاتنه' },
    back: { en: 'Back & Posterior Chain', fa: 'زیربغل، فیله و پشت' },
    shoulders_arms: { en: 'Shoulders, Arms & Boxing', fa: 'سرشانه، بازو و بوکس' },
    full_body: { en: 'Total Body Metabolic Torch', fa: 'چربی‌سوزی جامع کل بدن' },
  };

  const targetName = muscleNames[targetGroup] || muscleNames.all;

  // Varied pattern descriptors for title
  const patternsFa = ['الگوی انفجاری-متابولیک', 'الگوی چابکی و استقامت عضلانی', 'الگوی توان قلبی-عروقی'];
  const patternsEn = ['Metabolic Power Wave', 'Agility & Muscular Endurance', 'Cardiorespiratory Engine'];
  const patternIndex = Math.floor(Math.random() * patternsFa.length);

  // Time & calorie estimations
  const singleRoundSec = finalExercises.reduce((acc, ex) => acc + workSec + restSec, 0);
  const totalWorkoutSec = (singleRoundSec * rounds) + ((rounds - 1) * roundRestSec);
  const totalMinutes = Math.round((totalWorkoutSec + 300 + 300) / 60);
  const estimatedCalories = Math.round(totalMinutes * 10.2);

  return {
    id: `routine_${targetGroup}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    targetGroup,
    title: {
      en: `${targetName.en} - ${patternsEn[patternIndex]} (${modeNameEn})`,
      fa: `جلسه هوازی ${targetName.fa} - ${patternsFa[patternIndex]} (${modeNameFa})`
    },
    description: {
      en: `Scientifically calibrated circuit with zero duplicate movements. 5 distinct biomechanical stations (Primer → Explosive → Stability → Unilateral → Burnout). Includes dynamic warm-up and restorative cool-down.`,
      fa: `چینش علمی ۵ ایستگاه مجزا بدون هیچ‌گونه حرکت تکراری (پویاسازی → توان انفجاری → ثبات مرکزی → چابکی یک‌طرفه → اوج چربی‌سوزی). دارای ۵ دقیقه گرم‌کردن پویا و ۵ دقیقه کشش تنفسی پایانی.`
    },
    rounds,
    workSec,
    restSec,
    roundRestSec,
    warmupMinutes: 5,
    cooldownMinutes: 5,
    estimatedMinutes: totalMinutes,
    estimatedCalories,
    exercises: finalExercises,
    warmupSteps: standardCardioWarmup,
    cooldownSteps: standardCardioCooldown,
  };
}

// Convenient alias
export const generateCardioRoutine = generateScientificCardioRoutine;
export const getCardioExercisesByTarget = getAllCardioExercisesByTarget;
