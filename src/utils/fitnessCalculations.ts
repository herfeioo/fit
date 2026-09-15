import { UserProfile, NutritionTargets, Gender } from '../types';

export interface BmiResult {
  bmi: number;
  category: { en: string; fa: string };
  color: string;
  idealWeightRange: { min: number; max: number };
  screeningNote: { en: string; fa: string };
}

export interface BodyFatResult {
  bodyFatPercent: number;
  category: { en: string; fa: string };
  color: string;
  method: 'us_navy' | 'gallagher_who' | 'user_input';
}

export interface ExcessFatDetails {
  totalFatKg: number;
  essentialFatKg: number;
  healthyBaselineFatKg: number;
  excessFatKg: number; // Exact kg of fat above healthy threshold (0 if none)
  excessFatPercent: number; // % above healthy threshold (0 if none)
  targetHealthyBfPercent: number; // 14% male, 21% female
  status: { en: string; fa: string };
  badgeColor: string;
  explanation: { en: string; fa: string };
  clinicalBreakdown: { en: string; fa: string };
}

export interface OverweightDetails {
  bmi: number;
  weightKg: number;
  minNormalWeightKg: number;
  maxNormalWeightKg: number;
  grossExcessWeightKg: number; // kg above BMI 24.9 (0 if within/below)
  grossUnderWeightKg: number; // kg below BMI 18.5 (0 if within/above)
  classificationType: 'normal' | 'muscular_athletic' | 'adipose_fat' | 'mixed' | 'underweight' | 'skinny_fat';
  badgeColor: string;
  title: { en: string; fa: string };
  tissueType: { en: string; fa: string };
  description: { en: string; fa: string };
  differentiationNote: { en: string; fa: string };
}

export interface ComprehensiveBodyAnalysis {
  bmi: BmiResult;
  bodyFat: BodyFatResult;
  weightKg: number;
  heightCm: number;
  leanMassKg: number;
  fatMassKg: number;
  ffmi: number;
  normalizedFfmi: number;
  ffmiCategory: { en: string; fa: string };
  whtr: number; // Waist to Height Ratio
  whtrCategory: { en: string; fa: string };
  whtrColor: string;
  whr?: number; // Waist to Hip Ratio
  whrCategory?: { en: string; fa: string };
  bmr: number; // Katch-McArdle using Lean Body Mass
  tdee: number;
  targetCalories: number;
  nutrition: NutritionTargets;
  excessFat: ExcessFatDetails;
  overweight: OverweightDetails;
}

const BMI_SCREENING_NOTE = {
  en: '⚠️ Important Clinical Note: BMI is ONLY a screening tool, NOT a full body composition metric. In resistance-trained athletes, elevated BMI is frequently due to muscular hypertrophy rather than excess adiposity. Do NOT rely on BMI alone for training decisions.',
  fa: '⚠️ نکته مهم علمی: شاخص BMI صرفاً یک ابزار غربالگری عمومی است، نه سنجش کامل ترکیب بدنی. در ورزشکاران قدرتی، بالا بودن BMI ناشی از توده عضلانی است؛ لذا نباید به‌تنهایی مبنای برنامه‌ریزی تمرین و تغذیه قرار گیرد.'
};

/**
 * Standard WHO BMI Calculation with Ideal Weight Range
 * Formula: BMI = weight (kg) / (height in meters × height in meters)
 * WHO Classification:
 * - Underweight: < 18.5
 * - Normal weight: 18.5 – 24.9
 * - Overweight: 25 – 29.9
 * - Obesity: ≥ 30 (Class I: 30-34.9, Class II: 35-39.9, Class III: ≥ 40)
 */
export function calculateBmi(weightKg: number, heightCm: number): BmiResult {
  if (heightCm <= 0 || weightKg <= 0) {
    return {
      bmi: 0,
      category: { en: 'Invalid', fa: 'نامعتبر' },
      color: 'text-slate-400',
      idealWeightRange: { min: 0, max: 0 },
      screeningNote: BMI_SCREENING_NOTE,
    };
  }

  const heightMeters = heightCm / 100;
  const bmi = Math.round((weightKg / (heightMeters * heightMeters)) * 10) / 10;

  // WHO Ideal Weight Range for this height (BMI 18.5 - 24.9)
  const minIdealWeight = Math.round(18.5 * heightMeters * heightMeters * 10) / 10;
  const maxIdealWeight = Math.round(24.9 * heightMeters * heightMeters * 10) / 10;

  if (bmi < 18.5) {
    return {
      bmi,
      category: { en: 'Underweight (< 18.5)', fa: 'کمبود وزن (زیر ۱۸.۵)' },
      color: 'text-amber-400',
      idealWeightRange: { min: minIdealWeight, max: maxIdealWeight },
      screeningNote: BMI_SCREENING_NOTE,
    };
  } else if (bmi < 25) {
    return {
      bmi,
      category: { en: 'Normal Weight (18.5 - 24.9)', fa: 'وزن نرمال و سالم (۱۸.۵ - ۲۴.۹)' },
      color: 'text-emerald-400',
      idealWeightRange: { min: minIdealWeight, max: maxIdealWeight },
      screeningNote: BMI_SCREENING_NOTE,
    };
  } else if (bmi < 30) {
    return {
      bmi,
      category: { en: 'Overweight (25 - 29.9)', fa: 'اضافه وزن (۲۵ - ۲۹.۹)' },
      color: 'text-amber-400',
      idealWeightRange: { min: minIdealWeight, max: maxIdealWeight },
      screeningNote: BMI_SCREENING_NOTE,
    };
  } else if (bmi < 35) {
    return {
      bmi,
      category: { en: 'Obesity Class I (30 - 34.9)', fa: 'چاقی درجه ۱ (۳۰ - ۳۴.۹)' },
      color: 'text-rose-400',
      idealWeightRange: { min: minIdealWeight, max: maxIdealWeight },
      screeningNote: BMI_SCREENING_NOTE,
    };
  } else if (bmi < 40) {
    return {
      bmi,
      category: { en: 'Obesity Class II (35 - 39.9)', fa: 'چاقی درجه ۲ (۳۵ - ۳۹.۹)' },
      color: 'text-rose-500',
      idealWeightRange: { min: minIdealWeight, max: maxIdealWeight },
      screeningNote: BMI_SCREENING_NOTE,
    };
  } else {
    return {
      bmi,
      category: { en: 'Obesity Class III (≥ 40)', fa: 'چاقی درجه ۳ شدید (بالای ۴۰)' },
      color: 'text-rose-600',
      idealWeightRange: { min: minIdealWeight, max: maxIdealWeight },
      screeningNote: BMI_SCREENING_NOTE,
    };
  }
}

/**
 * U.S. Navy Circumference Method (DoD Standard) + Anthropometric Precision
 */
export function calculateDetailedBodyFat(
  profile: Pick<UserProfile, 'gender' | 'height' | 'weight' | 'age' | 'measurements'> & { bodyFatPercent?: number }
): BodyFatResult {
  const { gender, height, weight, age, measurements, bodyFatPercent } = profile;

  // 1. If user explicitly provided a validated bodyFatPercent (e.g. from DEXA or InBody), respect it!
  if (bodyFatPercent && bodyFatPercent >= 4 && bodyFatPercent <= 55) {
    return {
      bodyFatPercent: Math.round(bodyFatPercent * 10) / 10,
      category: getAceBodyFatCategory(bodyFatPercent, gender),
      color: getAceBodyFatColor(bodyFatPercent, gender),
      method: 'user_input',
    };
  }

  const waist = measurements?.waist;

  // Realistic Anthropometric Neck Standard if user omitted neck:
  // Clinical average for adult male: ~38.5cm; female: ~33.5cm (with subtle scaling for height/weight)
  const realisticNeck = gender === 'male'
    ? Math.max(36, Math.min(44, Math.round(38.5 + (weight - 75) * 0.07 + (height - 175) * 0.04)))
    : Math.max(30, Math.min(38, Math.round(33.5 + (weight - 60) * 0.07 + (height - 165) * 0.04)));
  const neck = measurements?.neck || realisticNeck;

  // Realistic Anthropometric Hips Standard for females if omitted:
  const realisticHips = gender === 'female'
    ? (measurements?.hips || Math.max(waist ? waist + 12 : 92, Math.round((waist || 75) * 1.14 + (height - 160) * 0.08)))
    : (measurements?.hips || Math.round((waist || 80) * 1.05));
  const hips = realisticHips;

  let bodyFat = 0;
  let method: 'us_navy' | 'gallagher_who' | 'user_input' = 'us_navy';

  if (gender === 'male') {
    if (waist && neck && waist > neck && height > 0) {
      const denom = 1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height);
      if (denom > 0) {
        bodyFat = 495 / denom - 450;
      }
    }
  } else {
    if (waist && neck && hips && (waist + hips > neck) && height > 0) {
      const denom = 1.29579 - 0.35004 * Math.log10(waist + hips - neck) + 0.22100 * Math.log10(height);
      if (denom > 0) {
        bodyFat = 495 / denom - 450;
      }
    }
  }

  // Fallback to Gallagher / Deurenberg anthropometric formula if measurements invalid
  if (bodyFat <= 3 || bodyFat > 60) {
    method = 'gallagher_who';
    const bmi = weight / Math.pow(height / 100, 2);
    const sexConstant = gender === 'male' ? 1 : 0;
    bodyFat = 1.20 * bmi + 0.23 * age - 10.8 * sexConstant - 5.4;
  }

  bodyFat = Math.max(4, Math.min(55, Math.round(bodyFat * 10) / 10));

  return {
    bodyFatPercent: bodyFat,
    category: getAceBodyFatCategory(bodyFat, gender),
    color: getAceBodyFatColor(bodyFat, gender),
    method,
  };
}

export function estimateBodyFat(
  profile: Pick<UserProfile, 'gender' | 'height' | 'weight' | 'age' | 'measurements'> & { bodyFatPercent?: number }
): number {
  return calculateDetailedBodyFat(profile).bodyFatPercent;
}

function getAceBodyFatCategory(bf: number, gender: Gender): { en: string; fa: string } {
  if (gender === 'male') {
    if (bf < 6) return { en: 'Essential Fat (Extremely Lean)', fa: 'چربی ضروری (بسیار خشک)' };
    if (bf < 14) return { en: 'Athletic / Stage Lean', fa: 'ورزشکار حرفه‌ای (عالی)' };
    if (bf < 18) return { en: 'Fitness Standard', fa: 'فیتنس و متناسب' };
    if (bf < 25) return { en: 'Average', fa: 'متوسط' };
    return { en: 'High Fat (Above Average)', fa: 'درصد چربی بالا' };
  } else {
    if (bf < 14) return { en: 'Essential Fat', fa: 'چربی ضروری' };
    if (bf < 21) return { en: 'Athletic Lean', fa: 'ورزشکار حرفه‌ای' };
    if (bf < 25) return { en: 'Fitness Standard', fa: 'فیتنس و ایده‌آل' };
    if (bf < 32) return { en: 'Average', fa: 'متوسط' };
    return { en: 'High Fat (Above Average)', fa: 'درصد چربی بالا' };
  }
}

function getAceBodyFatColor(bf: number, gender: Gender): string {
  if (gender === 'male') {
    if (bf < 6) return 'text-amber-400';
    if (bf < 14) return 'text-emerald-400';
    if (bf < 18) return 'text-teal-400';
    if (bf < 25) return 'text-amber-400';
    return 'text-rose-400';
  } else {
    if (bf < 14) return 'text-amber-400';
    if (bf < 21) return 'text-emerald-400';
    if (bf < 25) return 'text-teal-400';
    if (bf < 32) return 'text-amber-400';
    return 'text-rose-400';
  }
}

/**
 * Full Comprehensive Body Composition Analysis
 * Follows: WHO, ACSM, US Navy DoD, and ISSN Standards
 */
export function calculateComprehensiveBodyAnalysis(
  profile: Pick<UserProfile, 'gender' | 'height' | 'weight' | 'age' | 'weeklyDays' | 'goal' | 'measurements' | 'activityLevel'>
): ComprehensiveBodyAnalysis {
  const { gender, height, weight, measurements, weeklyDays, goal, activityLevel } = profile;

  // 1. WHO BMI
  const bmiResult = calculateBmi(weight, height);

  // 2. Body Fat %
  const bodyFatResult = calculateDetailedBodyFat(profile);
  const bfPercent = bodyFatResult.bodyFatPercent;

  // 3. Compartmental Masses
  const fatMassKg = Math.round(weight * (bfPercent / 100) * 10) / 10;
  const leanMassKg = Math.round((weight - fatMassKg) * 10) / 10;

  // 4. Fat-Free Mass Index (FFMI)
  const heightM = height / 100;
  const rawFfmi = Math.round((leanMassKg / (heightM * heightM)) * 10) / 10;
  // Normalized FFMI for height (Kouri et al.)
  const normalizedFfmi = Math.round((rawFfmi + 6.1 * (1.8 - heightM)) * 10) / 10;

  let ffmiCategory: { en: string; fa: string };
  if (normalizedFfmi < 18) {
    ffmiCategory = { en: 'Below Average Muscularity', fa: 'حجم عضلانی زیر متوسط' };
  } else if (normalizedFfmi < 20) {
    ffmiCategory = { en: 'Average Muscularity', fa: 'توده عضلانی متوسط' };
  } else if (normalizedFfmi < 22) {
    ffmiCategory = { en: 'Athletic Muscularity', fa: 'آمادگی ورزشی و توسعه عضلانی خوب' };
  } else if (normalizedFfmi < 25) {
    ffmiCategory = { en: 'Excellent Muscular Development', fa: 'توسعه عضلانی عالی (پیشرفته)' };
  } else {
    ffmiCategory = { en: 'Elite / Near Natural Limit', fa: 'سقف پتانسیل ژنتیکی طبیعی' };
  }

  // 5. Waist-to-Height Ratio (WHtR) - WHO Standard
  const waist = measurements?.waist || 80;
  const whtr = Math.round((waist / height) * 100) / 100;
  let whtrCategory: { en: string; fa: string };
  let whtrColor = 'text-emerald-400';

  if (whtr < 0.40) {
    whtrCategory = { en: 'Very Lean / Narrow (< 0.40)', fa: 'بسیار لاغر و باریک (زیر ۰.۴۰)' };
    whtrColor = 'text-cyan-400';
  } else if (whtr <= 0.49) {
    whtrCategory = { en: 'Healthy & Ideal Waistline (0.40 - 0.49)', fa: 'محدوده سالم و ایده‌آل (۰.۴۰ - ۰.۴۹)' };
    whtrColor = 'text-emerald-400';
  } else if (whtr <= 0.59) {
    whtrCategory = { en: 'Increased Visceral Risk (0.50 - 0.59)', fa: 'تجمع چربی احشایی با خطر متوسط (۰.۵۰ - ۰.۵۹)' };
    whtrColor = 'text-amber-400';
  } else {
    whtrCategory = { en: 'High Visceral Health Risk (≥ 0.60)', fa: 'چربی احشایی بالا و پرخطر (بالای ۰.۶۰)' };
    whtrColor = 'text-rose-400';
  }

  // 6. Waist-to-Hip Ratio (WHR) if available
  let whr: number | undefined;
  let whrCategory: { en: string; fa: string } | undefined;
  if (measurements?.hips && measurements.hips > 0) {
    whr = Math.round((waist / measurements.hips) * 100) / 100;
    if (gender === 'male') {
      whrCategory = whr < 0.90
        ? { en: 'Low Health Risk', fa: 'کم‌خطر و عالی' }
        : whr <= 0.99
        ? { en: 'Moderate Risk', fa: 'متوسط' }
        : { en: 'High Visceral Risk', fa: 'پرخطر (الگوی سیبی)' };
    } else {
      whrCategory = whr < 0.80
        ? { en: 'Low Health Risk', fa: 'کم‌خطر و عالی' }
        : whr <= 0.85
        ? { en: 'Moderate Risk', fa: 'متوسط' }
        : { en: 'High Risk', fa: 'پرخطر' };
    }
  }

  // 7. BMR (Katch-McArdle using Lean Body Mass)
  // Formula: BMR = 370 + (21.6 × LBM_kg)
  const bmr = Math.round(370 + 21.6 * leanMassKg);

  // 8. TDEE based on activity level & training frequency
  let activityMultiplier = 1.45;
  if (activityLevel === 'sedentary') activityMultiplier = 1.25;
  else if (activityLevel === 'light') activityMultiplier = 1.375;
  else if (activityLevel === 'moderate') activityMultiplier = 1.55;
  else if (activityLevel === 'heavy') activityMultiplier = 1.725;
  else {
    // derive from weekly days
    if (weeklyDays === 3) activityMultiplier = 1.375;
    else if (weeklyDays === 4) activityMultiplier = 1.465;
    else if (weeklyDays === 5) activityMultiplier = 1.55;
    else if (weeklyDays === 6) activityMultiplier = 1.725;
  }

  const tdee = Math.round(bmr * activityMultiplier);

  // Target calories based on goal
  let targetCalories = tdee;
  if (goal === 'muscle_gain') {
    targetCalories += 350; // Lean bulk
  } else if (goal === 'fat_loss') {
    targetCalories -= 450; // Calorie deficit
  } else if (goal === 'strength') {
    targetCalories += 150;
  } else {
    targetCalories -= 100; // Body recomp
  }

  // 9. Macronutrients (ISSN standards)
  const proteinGrams = Math.round(weight * 2.2);
  const proteinCalories = proteinGrams * 4;
  const fatCalories = targetCalories * 0.25;
  const fatGrams = Math.round(fatCalories / 9);
  const carbCalories = Math.max(0, targetCalories - (proteinCalories + fatCalories));
  const carbGrams = Math.round(carbCalories / 4);
  const waterLiters = Math.round((weight * 0.038 + 0.5) * 10) / 10;

  const nutrition: NutritionTargets = {
    calories: Math.round(targetCalories),
    proteinGrams,
    carbGrams,
    fatGrams,
    waterLiters,
    tdee,
    bmr,
  };

  // 10. Clinical & Sports Science Analysis: Exact Excess Fat Calculation
  // Standard target healthy body fat percentage for athletic/fitness health:
  // Male: 14.0% (range 10-15%), Female: 21.0% (range 18-23%)
  const targetHealthyBfPercent = gender === 'male' ? 14.0 : 21.0;
  const essentialFatPercent = gender === 'male' ? 4.0 : 11.0;
  const essentialFatKg = Math.round(weight * (essentialFatPercent / 100) * 10) / 10;

  let excessFatKg = 0;
  let excessFatPercent = 0;
  let healthyBaselineFatKg = fatMassKg;
  let excessFatStatus: { en: string; fa: string };
  let excessFatBadgeColor = 'text-emerald-400';
  let excessFatExplanation: { en: string; fa: string };
  let excessFatClinicalBreakdown: { en: string; fa: string };

  if (bfPercent <= targetHealthyBfPercent) {
    excessFatKg = 0;
    excessFatPercent = 0;
    healthyBaselineFatKg = fatMassKg;
    excessFatBadgeColor = 'text-emerald-400';
    excessFatStatus = {
      en: '0.0 kg Excess Fat (Optimal / Athletic Range)',
      fa: '۰.۰ کیلوگرم چربی اضافه (وضعیت ایده‌آل و ورزشکاری)'
    };
    excessFatExplanation = {
      en: `Your body fat (${bfPercent}%) is at or below the optimal fitness standard (${targetHealthyBfPercent}%). You have NO excess fat to lose.`,
      fa: `درصد چربی شما (${bfPercent}٪) در محدوده استاندارد فیتنس (${targetHealthyBfPercent}٪) یا پایین‌تر است. شما هیچ چربی اضافه‌ای برای سوزاندن ندارید.`
    };
    excessFatClinicalBreakdown = {
      en: `Total fat (${fatMassKg} kg) consists entirely of healthy functional and essential adipose tissue (${essentialFatKg} kg essential).`,
      fa: `کل چربی بدن شما (${fatMassKg} کیلوگرم) صرفاً شامل بافت‌های ضروری (${essentialFatKg} کیلوگرم) و چربی محافظت فیزیولوژیک است.`
    };
  } else {
    // Formula preserving lean body mass:
    // ExcessFat = (Weight * (BF% - TargetBF%)) / (100 - TargetBF%)
    const rawExcess = (weight * (bfPercent - targetHealthyBfPercent)) / (100 - targetHealthyBfPercent);
    excessFatKg = Math.max(0.1, Math.round(rawExcess * 10) / 10);
    excessFatPercent = Math.round((bfPercent - targetHealthyBfPercent) * 10) / 10;
    healthyBaselineFatKg = Math.max(0, Math.round((fatMassKg - excessFatKg) * 10) / 10);

    excessFatBadgeColor = excessFatPercent > 8 ? 'text-rose-400' : 'text-amber-400';
    excessFatStatus = {
      en: `${excessFatKg} kg Excess Adipose Tissue (+${excessFatPercent}%)`,
      fa: `${excessFatKg} کیلوگرم چربی اضافه مازاد (+${excessFatPercent}٪)`
    };
    excessFatExplanation = {
      en: `Out of your total ${fatMassKg} kg fat, exactly ${excessFatKg} kg is true excess above the ${targetHealthyBfPercent}% fitness standard. The remaining ${healthyBaselineFatKg} kg is healthy physiological fat (including ${essentialFatKg} kg essential fat) which MUST NOT be depleted.`,
      fa: `از کل ${fatMassKg} کیلوگرم چربی بدنتان، دقیقاً ${excessFatKg} کیلوگرم چربی مازاد بر استاندارد ${targetHealthyBfPercent}٪ فیتنس است. مقدار ${healthyBaselineFatKg} کیلوگرم باقیمانده، چربی سالم و ضروری (${essentialFatKg} کیلوگرم) بدن شماست که حفظ آن برای عملکرد هورمونی حیاتی است.`
    };
    excessFatClinicalBreakdown = {
      en: `Healthy Target Weight: ${Math.round((weight - excessFatKg) * 10) / 10} kg at ${targetHealthyBfPercent}% body fat (preserving all ${leanMassKg} kg of lean muscle).`,
      fa: `وزن هدف ایده‌آل با حفظ کامل ${leanMassKg} کیلوگرم عضله خالص: ${Math.round((weight - excessFatKg) * 10) / 10} کیلوگرم با چربی ${targetHealthyBfPercent}٪.`
    };
  }

  const excessFat: ExcessFatDetails = {
    totalFatKg: fatMassKg,
    essentialFatKg,
    healthyBaselineFatKg,
    excessFatKg,
    excessFatPercent,
    targetHealthyBfPercent,
    status: excessFatStatus,
    badgeColor: excessFatBadgeColor,
    explanation: excessFatExplanation,
    clinicalBreakdown: excessFatClinicalBreakdown,
  };

  // 11. Overweight & Muscle-vs-Fat Tissue Differentiation
  const minNormalWeightKg = Math.round(18.5 * heightM * heightM * 10) / 10;
  const maxNormalWeightKg = Math.round(24.9 * heightM * heightM * 10) / 10;
  const grossExcessWeightKg = weight > maxNormalWeightKg ? Math.round((weight - maxNormalWeightKg) * 10) / 10 : 0;
  const grossUnderWeightKg = weight < minNormalWeightKg ? Math.round((minNormalWeightKg - weight) * 10) / 10 : 0;

  let classificationType: OverweightDetails['classificationType'] = 'normal';
  let overweightBadgeColor = 'text-emerald-400';
  let overweightTitle: { en: string; fa: string };
  let overweightTissueType: { en: string; fa: string };
  let overweightDescription: { en: string; fa: string };
  let overweightDifferentiationNote: { en: string; fa: string };

  const isBfLean = gender === 'male' ? bfPercent <= 15.5 : bfPercent <= 23.5;
  const isBfModerate = gender === 'male' ? (bfPercent > 15.5 && bfPercent <= 20.0) : (bfPercent > 23.5 && bfPercent <= 28.0);
  const isHighMuscularity = normalizedFfmi >= 20.8;

  if (weight < minNormalWeightKg) {
    classificationType = 'underweight';
    overweightBadgeColor = 'text-amber-400';
    overweightTitle = { en: `Underweight (-${grossUnderWeightKg} kg below WHO standard)`, fa: `کمبود وزن (${grossUnderWeightKg} کیلوگرم زیر حداقل استاندارد)` };
    overweightTissueType = { en: 'Deficit in lean muscle mass & baseline energy reserves', fa: 'کمبود توده عضلانی و ذخایر پایه‌ای' };
    overweightDescription = {
      en: `Your weight is ${grossUnderWeightKg} kg below the WHO lower threshold (${minNormalWeightKg} kg). A hyper-caloric nutrition plan is required to build muscular volume safely.`,
      fa: `وزن شما ${grossUnderWeightKg} کیلوگرم کمتر از حداقل وزن سالم (${minNormalWeightKg} کیلوگرم) است. نیاز به مازاد کالری پاک و برنامه هایپرتروفی برای عضله‌سازی دارید.`
    };
    overweightDifferentiationNote = {
      en: 'Focus on progressive overload and high-density nutrient intake.',
      fa: 'تمرکز بر بار اضافه تدریجی، دریافت پروتئین کافی و کالری مازاد برای ساخت ساختار عضلانی پایدار.'
    };
  } else if (grossExcessWeightKg > 0) {
    if (isBfLean || (isHighMuscularity && !isBfModerate)) {
      classificationType = 'muscular_athletic';
      overweightBadgeColor = 'text-emerald-400';
      overweightTitle = { en: `Athletic Hypertrophy Overweight (+${grossExcessWeightKg} kg)`, fa: `اضافه وزن عضلانی و هایپرتروفی (+${grossExcessWeightKg} کیلوگرم)` };
      overweightTissueType = { en: 'Dense Skeletal Muscle Tissue (FFMI Verified)', fa: 'بافت خالص عضلانی متراکم (تأییدشده با شاخص FFMI)' };
      overweightDescription = {
        en: `Although BMI places you +${grossExcessWeightKg} kg above the generic ceiling (${maxNormalWeightKg} kg), this is DENSE MUSCLE TISSUE (FFMI: ${normalizedFfmi}), NOT fat. Your body fat is ${bfPercent}%. You have ZERO excess fat obesity risk.`,
        fa: `اگرچه شاخص ساده BMI شما را ${grossExcessWeightKg} کیلوگرم بالای سقف جدول عمومی (${maxNormalWeightKg} کیلوگرم) نشان می‌دهد، این وزن ناشی از توده عضلانی متراکم (FFMI: ${normalizedFfmi}) است. درصد چربی شما (${bfPercent}٪) در سطح ورزشی است و هیچ ریسک سلامتی متوجه شما نیست.`
      };
      overweightDifferentiationNote = {
        en: 'Clinical Notice: BMI equations produce false positives for resistance athletes. Do NOT restrict calories to lower BMI.',
        fa: 'نکته ورزشی مهم: جدول سنتی BMI برای ورزشکاران با عضله بالا گمراه‌کننده است. به هیچ وجه به دنبال کاهش وزن عمومی نباشید.'
      };
    } else if (isBfModerate && isHighMuscularity) {
      classificationType = 'mixed';
      overweightBadgeColor = 'text-cyan-400';
      overweightTitle = { en: `Mixed Athletic Mass (+${grossExcessWeightKg} kg)`, fa: `اضافه وزن ترکیبی عضلانی-چربی (+${grossExcessWeightKg} کیلوگرم)` };
      overweightTissueType = { en: 'High Muscularity with Mild Subcutaneous Adiposity', fa: 'توده عضلانی خوب همراه با مقداری چربی مازاد' };
      overweightDescription = {
        en: `Your +${grossExcessWeightKg} kg above WHO standard is composed of solid muscle foundation combined with ~${excessFatKg} kg of adipose tissue.`,
        fa: `وزن مازاد ${grossExcessWeightKg} کیلوگرمی شما ترکیبی از پایه عضلانی قوی (FFMI: ${normalizedFfmi}) به همراه حدود ${excessFatKg} کیلوگرم چربی مازاد است.`
      };
      overweightDifferentiationNote = {
        en: 'Strategic Recommendation: Gentle caloric deficit with high protein to strip excess fat while sparing muscle mass.',
        fa: 'راهبرد علمی: کات ملایم یا ریکامپوزیشن با حفظ پروتئین در سطح ۲.۲ گرم به ازای وزن بدن برای آب کردن چربی با حفظ کامل عضلات.'
      };
    } else {
      classificationType = 'adipose_fat';
      overweightBadgeColor = 'text-rose-400';
      overweightTitle = { en: `Adipose Overweight (+${grossExcessWeightKg} kg)`, fa: `اضافه وزن ناشی از بافت چربی (+${grossExcessWeightKg} کیلوگرم)` };
      overweightTissueType = { en: 'Excess Subcutaneous & Visceral Adipose Tissue', fa: 'بافت چربی مازاد زیرپوستی و احشایی' };
      overweightDescription = {
        en: `Your weight is ${grossExcessWeightKg} kg above the normal range, driven primarily by ${excessFatKg} kg of excess adipose tissue (Body Fat: ${bfPercent}%).`,
        fa: `وزن شما ${grossExcessWeightKg} کیلوگرم بالای سقف وزن استاندارد است که دلیل اصلی آن ${excessFatKg} کیلوگرم چربی اضافه مازاد (درصد چربی: ${bfPercent}٪) است.`
      };
      overweightDifferentiationNote = {
        en: 'Targeted caloric deficit combined with resistance training will selectively oxidize fat while preserving resting metabolism.',
        fa: 'راهبرد علمی: برنامه با کسری کالری حساب‌شده همراه با تمرینات پرفشار برای سوزاندن چربی مازاد و افزایش متابولیسم پایه طراحی شده است.'
      };
    }
  } else {
    // Weight is within normal range
    const isHighFat = gender === 'male' ? bfPercent >= 21.0 : bfPercent >= 29.0;
    if (isHighFat && normalizedFfmi < 19.5) {
      classificationType = 'skinny_fat';
      overweightBadgeColor = 'text-amber-400';
      overweightTitle = { en: 'Normal Weight with High Fat (Skinny Fat)', fa: 'سندرم لاغری با چربی پنهان (Skinny Fat)' };
      overweightTissueType = { en: 'Low Muscular Density + Elevated Adipose Stores', fa: 'کمبود بافت عضلانی + تجمع چربی شکمی و احشایی' };
      overweightDescription = {
        en: `Your scale weight (${weight} kg) is within the normal BMI range, but body fat is high (${bfPercent}%) with ${excessFatKg} kg excess fat and low muscle development.`,
        fa: `وزن کل شما روی ترازو نرمال است، اما درصد چربی بدن بالاست (${bfPercent}٪) و دارای ${excessFatKg} کیلوگرم چربی اضافه به همراه کمبود بافت عضلانی هستید.`
      };
      overweightDifferentiationNote = {
        en: 'Do NOT diet or lose more weight. Prioritize Body Recomposition: heavy compound lifting + high protein at maintenance calories.',
        fa: 'هشدار مهم: وزن کم نکنید! کاهش وزن وضعیت را بدتر می‌کند. اولویت قطعی شما ریکامپوزیشن (تبدیل چربی به عضله) با تمرینات سنگین و تغذیه دقیق است.'
      };
    } else {
      classificationType = 'normal';
      overweightBadgeColor = 'text-emerald-400';
      overweightTitle = { en: 'Optimal / Standard Body Weight', fa: 'وزن کاملاً استاندارد و متوازن' };
      overweightTissueType = { en: 'Balanced Skeletal Muscle & Healthy Adipose Ratio', fa: 'ترکیب بهینه عضله و چربی سالم' };
      overweightDescription = {
        en: `Your weight (${weight} kg) is in the ideal WHO range (${minNormalWeightKg} - ${maxNormalWeightKg} kg) with a healthy body fat profile.`,
        fa: `وزن شما (${weight} کیلوگرم) کاملاً در محدوده استاندارد سلامت سازمان بهداشت جهانی (${minNormalWeightKg} تا ${maxNormalWeightKg} کیلوگرم) قرار دارد.`
      };
      overweightDifferentiationNote = {
        en: 'Maintain progressive strength stimulus and target nutritional balance.',
        fa: 'پایبندی به اصل بار اضافه تدریجی در تمرینات و تغذیه هدفمند را ادامه دهید.'
      };
    }
  }

  const overweight: OverweightDetails = {
    bmi: bmiResult.bmi,
    weightKg: weight,
    minNormalWeightKg,
    maxNormalWeightKg,
    grossExcessWeightKg,
    grossUnderWeightKg,
    classificationType,
    badgeColor: overweightBadgeColor,
    title: overweightTitle,
    tissueType: overweightTissueType,
    description: overweightDescription,
    differentiationNote: overweightDifferentiationNote,
  };

  return {
    bmi: bmiResult,
    bodyFat: bodyFatResult,
    weightKg: weight,
    heightCm: height,
    leanMassKg,
    fatMassKg,
    ffmi: rawFfmi,
    normalizedFfmi,
    ffmiCategory,
    whtr,
    whtrCategory,
    whtrColor,
    whr,
    whrCategory,
    bmr,
    tdee,
    targetCalories: Math.round(targetCalories),
    nutrition,
    excessFat,
    overweight,
  };
}

export function calculateNutrition(profile: UserProfile): NutritionTargets {
  const fullAnalysis = calculateComprehensiveBodyAnalysis(profile);
  return fullAnalysis.nutrition;
}

// 1RM Calculation (Epley Formula)
export function calculateOneRepMax(weight: number, reps: number): number {
  if (reps <= 1) return weight;
  return Math.round(weight * (1 + reps / 30));
}
