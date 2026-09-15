import { WorkoutPlan, WorkoutDay, WorkoutExerciseItem, UserProfile, Gender } from '../types';

export interface MesocyclePhaseInfo {
  month: number;
  mesocycleNumber: number;
  phase: 'hypertrophy' | 'strength' | 'peaking' | 'deload';
  name: { en: string; fa: string };
  focus: { en: string; fa: string };
  repBracket: string;
  intensityRpe: string;
  isDeloadMonth: boolean;
  scientificDescription: { en: string; fa: string };
}

// 24-Month Periodization Macrocycle Roadmap (12 distinct 2-month Mesocycles)
export const MESOCYCLE_ROADMAP_24_MONTHS: MesocyclePhaseInfo[] = [
  {
    month: 1,
    mesocycleNumber: 1,
    phase: 'hypertrophy',
    name: { en: 'Month 1: Foundation & Neuromuscular Baseline', fa: 'ماه ۱: هماهنگی عصبی عضلانی و حجم پایه' },
    focus: { en: 'Motor Pattern Mastery & Muscle Hypertrophy Accumulation', fa: 'تثبیت الگوی بیومکانیک و تجمع اولیه حجم عضلانی' },
    repBracket: '8-12 reps',
    intensityRpe: 'RPE 7.0 - 8.0',
    isDeloadMonth: false,
    scientificDescription: {
      en: 'Establishing baseline work capacity, connective tissue resilience, and neuromuscular pathway optimization.',
      fa: 'افزایش ظرفیت کاری عضلات، تقویت بافت همبند و بهینه‌سازی مسیرهای عصبی عضلانی.'
    }
  },
  {
    month: 2,
    mesocycleNumber: 1,
    phase: 'hypertrophy',
    name: { en: 'Month 2: Progressive Volume Accumulation', fa: 'ماه ۲: افزایش تدریجی حجم و اضافه بار' },
    focus: { en: 'Progressive Overload & Metabolic Hypertrophy', fa: 'اضافه بار پیوسته و هایپرتروفی متابولیک' },
    repBracket: '8-12 reps',
    intensityRpe: 'RPE 8.0 - 9.0',
    isDeloadMonth: false,
    scientificDescription: {
      en: 'Systematic set additions and incremental load increases to trigger myofibrillar protein synthesis.',
      fa: 'افزایش تدریجی ست‌های موثر و بار وزنه جهت بیشینه‌سازی سنتز پروتئین عضلانی.'
    }
  },
  {
    month: 3,
    mesocycleNumber: 2,
    phase: 'strength',
    name: { en: 'Month 3: Maximum Strength Conversion', fa: 'ماه ۳: تبدیل به قدرت بیشینه و انگیزش عصبی' },
    focus: { en: 'High Mechanical Tension & Neural Drive', fa: 'تنش مکانیکی سنگین و انگیزش سیستم عصبی' },
    repBracket: '4-6 reps',
    intensityRpe: 'RPE 8.0 - 9.0',
    isDeloadMonth: false,
    scientificDescription: {
      en: 'Transitioning to 80-85% 1RM loading to recruit high-threshold Type IIx fast-twitch motor units.',
      fa: 'بارگذاری با ۸۰ الی ۸۵ درصد 1RM جهت فراخوانی تارهای تند‌انقباض نوع دوم.'
    }
  },
  {
    month: 4,
    mesocycleNumber: 2,
    phase: 'strength',
    name: { en: 'Month 4: Strength Peak & Strategic Deload', fa: 'ماه ۴: اوج‌گیری قدرتی و هفته کاهش بار' },
    focus: { en: 'Peak Force Realization & Tissue Recovery', fa: 'ثبت رکوردهای قدرتی و ریکاوری بافت همبند' },
    repBracket: '3-6 reps (Week 4: Deload)',
    intensityRpe: 'RPE 9.0 (Deload RPE 6.5)',
    isDeloadMonth: true,
    scientificDescription: {
      en: 'Weeks 1-3 solidify personal strength records. Week 4 applies a mandatory active deload (-40% volume).',
      fa: 'هفته‌های ۱ تا ۳ تثبیت رکوردهای قدرتی؛ هفته ۴ شامل کاهش بار برنامه‌ریزی‌شده (-۴۰٪ حجم) جهت ریکاوری مفاصل.'
    }
  },
  {
    month: 5,
    mesocycleNumber: 3,
    phase: 'hypertrophy',
    name: { en: 'Month 5: Metabolic Conditioning & Sarcoplasmic Density', fa: 'ماه ۵: هایپرتروفی سارکوپلاسمیک و تراکم عضلانی' },
    focus: { en: 'High Density, Shortened Rest & Glycolytic Stress', fa: 'کاهش استراحت، استرس گلیکولیتیک و پمپ خونی بالا' },
    repBracket: '10-15 reps',
    intensityRpe: 'RPE 8.0 - 8.5',
    isDeloadMonth: false,
    scientificDescription: {
      en: 'Shortened rest intervals and accentuated time-under-tension for capillarization and metabolic adaptation.',
      fa: 'کاهش فواصل استراحت و افزایش زمان تحت تنش جهت افزایش مویرگ‌زایی و سازگاری میتوکندریایی.'
    }
  },
  {
    month: 6,
    mesocycleNumber: 3,
    phase: 'hypertrophy',
    name: { en: 'Month 6: High-Density Hypertrophy Overreach', fa: 'ماه ۶: اوج حجم هایپرتروفی نیم‌سال اول' },
    focus: { en: 'Maximal Volume Overreach & Muscle Definition', fa: 'بیشینه‌سازی حجم تمرین و تفکیک عضلانی' },
    repBracket: '10-15 reps',
    intensityRpe: 'RPE 8.5 - 9.0',
    isDeloadMonth: false,
    scientificDescription: {
      en: 'Reaching systemic volume peaks before entering the mid-year strength realization phase.',
      fa: 'رسیدن به اوج حجم هفتگی موثر پیش از ورود به فاز رکوردگیری نیم‌سال.'
    }
  },
  {
    month: 7,
    mesocycleNumber: 4,
    phase: 'strength',
    name: { en: 'Month 7: Power & Kinetic Chain Potentiation', fa: 'ماه ۷: توان انفجاری و زنجیره حرکتی قدرتی' },
    focus: { en: 'Explosive Intent & Heavy Multi-Joint Loading', fa: 'انفجار در شروع حرکت و بارگذاری چندمفصلی' },
    repBracket: '3-5 reps',
    intensityRpe: 'RPE 8.5 - 9.5',
    isDeloadMonth: false,
    scientificDescription: {
      en: 'Translating newly built muscle cross-sectional area into pure dynamic explosive strength.',
      fa: 'تبدیل سطح مقطع عضلانی ساخته شده به توان پویا و انفجاری.'
    }
  },
  {
    month: 8,
    mesocycleNumber: 4,
    phase: 'peaking',
    name: { en: 'Month 8: Mid-Year Realization & Systemic Deload', fa: 'ماه ۸: رکوردگیری نیم‌سال و دیلود استراتژیک' },
    focus: { en: 'Personal Record Audits & Connective Tissue Reset', fa: 'سنجش رکوردهای شخصی و بازسازی مفاصل' },
    repBracket: '2-5 reps (Deload W4)',
    intensityRpe: 'RPE 9.5 (Deload RPE 6.0)',
    isDeloadMonth: true,
    scientificDescription: {
      en: 'Major mid-year strength testing followed by a planned deload to supercompensate for the next half-year.',
      fa: 'تست رکوردهای نیم‌سال اول همراه با دیلود علمی جهت جبران مفرط و آغاز نیمه دوم سال.'
    }
  },
  {
    month: 9,
    mesocycleNumber: 5,
    phase: 'hypertrophy',
    name: { en: 'Month 9: Volume Re-Sensitization & Eccentric Stretch', fa: 'ماه ۹: بازحساس‌سازی به حجم و کشش برون‌گرا' },
    focus: { en: 'Full Active Range of Motion & Mechanical Stretch', fa: 'دامنه کامل حرکتی و کشش تارها تحت بار' },
    repBracket: '8-12 reps',
    intensityRpe: 'RPE 7.5 - 8.5',
    isDeloadMonth: false,
    scientificDescription: {
      en: 'Re-sensitizing muscle receptors to mechanical tension via 3-second eccentric tempos.',
      fa: 'حساس‌سازی مجدد گیرنده‌های عضله به تنش مکانیکی با تمپوی منفی ۳ ثانیه‌ای.'
    }
  },
  {
    month: 10,
    mesocycleNumber: 5,
    phase: 'hypertrophy',
    name: { en: 'Month 10: Structural Hypertrophy & Density', fa: 'ماه ۱۰: هایپرتروفی ساختاری و چگالی عضلانی' },
    focus: { en: 'Maximal Muscle Density & Joint Stability', fa: 'چگالی بالا و تقویت ثبات مفاصل' },
    repBracket: '8-12 reps',
    intensityRpe: 'RPE 8.0 - 9.0',
    isDeloadMonth: false,
    scientificDescription: {
      en: 'Progressive intensification on compound movements with strict 90-second rest intervals.',
      fa: 'افزایش شدت حرکات چندمفصلی با فواصل استراحت دقیق ۹۰ ثانیه‌ای.'
    }
  },
  {
    month: 11,
    mesocycleNumber: 6,
    phase: 'peaking',
    name: { en: 'Month 11: Power-Hypertrophy Density (PHD)', fa: 'ماه ۱۱: ترکیب قدرت و هایپرتروفی (PHD)' },
    focus: { en: 'Dual Stimulus: Heavy Compounds + Pump Accessories', fa: 'تحریک دوگانه: حرکات سنگین قدرتی + حرکات پمپی' },
    repBracket: '4-8 reps',
    intensityRpe: 'RPE 8.5 - 9.5',
    isDeloadMonth: false,
    scientificDescription: {
      en: 'Combining low-rep neural recruitment with high-rep sarcoplasmic accessories.',
      fa: 'ترکیب فعال‌سازی عصبی با تکرارهای پایین و هایپرتروفی تارهای عضلانی.'
    }
  },
  {
    month: 12,
    mesocycleNumber: 6,
    phase: 'peaking',
    name: { en: 'Month 12: Year 1 Climax: PR Milestones & Year-End Reset', fa: 'ماه ۱۲: اوج سال اول: ثبت رکوردهای نهایی و دیلود' },
    focus: { en: '1-Year Milestone Realization & Full Recovery', fa: 'تحقق اهداف سال اول و ریکاوری کامل سیستمیک' },
    repBracket: '3-6 reps (Deload W4)',
    intensityRpe: 'RPE 9.5 (Deload RPE 6.5)',
    isDeloadMonth: true,
    scientificDescription: {
      en: 'Concludes Year 1 with audited 1RM increases across all primary movement patterns.',
      fa: 'پایان سال اول تحول بدنی با بررسی دقیق افزایش قدرت و رکوردهای تمرینی.'
    }
  },
  {
    month: 13,
    mesocycleNumber: 7,
    phase: 'hypertrophy',
    name: { en: 'Month 13: Year 2 Launch: Varied Angular Loading', fa: 'ماه ۱۳: آغاز سال دوم: زوایای پیشرفته بیومکانیک' },
    focus: { en: 'New Resistance Profiles & Angular Stimuli', fa: 'تحریک تارهای عضلانی از زوایای جدید' },
    repBracket: '8-12 reps',
    intensityRpe: 'RPE 7.5 - 8.5',
    isDeloadMonth: false,
    scientificDescription: {
      en: 'Targeting regional muscle hypertrophy via varied incline angles and cable leverage vectors.',
      fa: 'تمرکز بر هایپرتروفی بخش‌های مختلف عضله با تغییر زاویه میزها و خطوط کشش سیم‌کش.'
    }
  },
  {
    month: 14,
    mesocycleNumber: 7,
    phase: 'hypertrophy',
    name: { en: 'Month 14: Regional Hypertrophy Accumulation', fa: 'ماه ۱۴: انباشت حجم در زوایای پیشرفته' },
    focus: { en: 'Targeted Volume on Lagging Angles', fa: 'افزایش حجم در زوایای نیازمند رشد' },
    repBracket: '8-12 reps',
    intensityRpe: 'RPE 8.0 - 9.0',
    isDeloadMonth: false,
    scientificDescription: {
      en: 'Progressive overload on isolated fiber angles for complete 3D muscle roundness.',
      fa: 'اضافه بار تدریجی جهت شکل‌دهی سه‌بعدی و کامل به فیگور عضلانی.'
    }
  },
  {
    month: 15,
    mesocycleNumber: 8,
    phase: 'strength',
    name: { en: 'Month 15: Wave-Loading Strength Protocol', fa: 'ماه ۱۵: پروتکل قدرتی بارگذاری موجی (Wave Loading)' },
    focus: { en: 'Post-Activation Potentiation & Neural Efficiency', fa: 'تقویت عصبی پس از فعال‌سازی و رکوردگیری موجی' },
    repBracket: '5-3-1 Wave',
    intensityRpe: 'RPE 8.5 - 9.5',
    isDeloadMonth: false,
    scientificDescription: {
      en: 'Utilizing 5-3-1 wave loading to potentiate central nervous system firing frequencies.',
      fa: 'استفاده از سیستم بارگذاری موجی برای شلیک با فرکانس بالاتر سیستم عصبی مرکزی.'
    }
  },
  {
    month: 16,
    mesocycleNumber: 8,
    phase: 'strength',
    name: { en: 'Month 16: Peak Wave Strength & Strategic Deload', fa: 'ماه ۱۶: اوج بارگذاری موجی و دیلود هدفمند' },
    focus: { en: 'Absolute Strength Supercompensation', fa: 'جبران مفرط قدرت مطلق و بازسازی بافت' },
    repBracket: '3-5 reps (Deload W4)',
    intensityRpe: 'RPE 9.5 (Deload RPE 6.5)',
    isDeloadMonth: true,
    scientificDescription: {
      en: 'Peak strength wave consolidation followed by joint deloading.',
      fa: 'تثبیت اوج قدرت و ریکاوری سیستم مفاصل و تاندون‌ها.'
    }
  },
  {
    month: 17,
    mesocycleNumber: 9,
    phase: 'hypertrophy',
    name: { en: 'Month 17: Antagonist Density Hypertrophy', fa: 'ماه ۱۷: چگالی هایپرتروفی عضلات متقابل (Antagonist)' },
    focus: { en: 'Push-Pull & Quad-Ham Antagonist Supersetting', fa: 'سوپرست‌های متقابل سینه-زیربغل و چهارسر-همسترینگ' },
    repBracket: '10-14 reps',
    intensityRpe: 'RPE 8.0 - 9.0',
    isDeloadMonth: false,
    scientificDescription: {
      en: 'Enhancing local blood flow and metabolic efficiency through antagonist paired sets.',
      fa: 'افزایش چشمگیر جریان خون موضعی و تراکم تمرین از طریق ست‌های جفت متقابل.'
    }
  },
  {
    month: 18,
    mesocycleNumber: 9,
    phase: 'hypertrophy',
    name: { en: 'Month 18: Metabolic Overreach & Muscle Fullness', fa: 'ماه ۱۸: اوج اشباع گلیکوژن و پمپ عضلانی' },
    focus: { en: 'Maximal Intracellular Hydration & Fiber Fatigue', fa: 'هیدراتاسیون درون سلولی و خستگی عمیق تارهای عضلانی' },
    repBracket: '10-14 reps',
    intensityRpe: 'RPE 8.5 - 9.5',
    isDeloadMonth: false,
    scientificDescription: {
      en: 'Pushing cellular swelling and metabolic stress to the highest safe physiological limits.',
      fa: 'تحریک تورم سلولی و استرس متابولیک در بالاترین حد ایمن فیزیولوژیک.'
    }
  },
  {
    month: 19,
    mesocycleNumber: 10,
    phase: 'peaking',
    name: { en: 'Month 19: Neuromuscular Rate of Force Development', fa: 'ماه ۱۹: نرخ توسعه نیرو و انگیزش عصبی پیشرفته' },
    focus: { en: 'Maximum Acceleration & Heavy Mechanical Drive', fa: 'شتاب حداکثری در فاز مثبت و تنش مکانیکی سنگین' },
    repBracket: '3-6 reps',
    intensityRpe: 'RPE 8.5 - 9.5',
    isDeloadMonth: false,
    scientificDescription: {
      en: 'Maximizing RFD (Rate of Force Development) across multi-joint compound lifts.',
      fa: 'بیشینه‌سازی نرخ تولید نیرو در حرکات اصلی لیفتینگ.'
    }
  },
  {
    month: 20,
    mesocycleNumber: 10,
    phase: 'peaking',
    name: { en: 'Month 20: Pre-Championship Peaking & Deload', fa: 'ماه ۲۰: اوج‌گیری قدرتی و دیلود ریکاوری' },
    focus: { en: 'Neural Potentiation & Joint Preservation', fa: 'تقویت عصبی و حفاظت از یکپارچگی مفاصل' },
    repBracket: '2-5 reps (Deload W4)',
    intensityRpe: 'RPE 9.5 (Deload RPE 6.5)',
    isDeloadMonth: true,
    scientificDescription: {
      en: 'Testing near-limit strength outputs before transitioning into functional symmetry.',
      fa: 'سنجش خروجی‌های حداکثری قدرت و اجرای دیلود آماده‌سازی.'
    }
  },
  {
    month: 21,
    mesocycleNumber: 11,
    phase: 'hypertrophy',
    name: { en: 'Month 21: Functional Symmetry & Unilateral Mastery', fa: 'ماه ۲۱: تقارن بیومکانیک و حرکات تک‌طرفه (Unilateral)' },
    focus: { en: 'Correcting Bilateral Deficits & Muscular Imbalances', fa: 'رفع عدم تقارن راست و چپ و تعادل کامل فیزیک بدنی' },
    repBracket: '8-12 reps',
    intensityRpe: 'RPE 8.0 - 8.5',
    isDeloadMonth: false,
    scientificDescription: {
      en: 'Focusing on split squats, single-arm presses, and unilateral rows to eliminate muscular imbalances.',
      fa: 'تمرکز بر اسکوات‌های تک‌پا، پرس‌های دمبل مجزا و پارویی تک‌دست جهت تقارن کامل.'
    }
  },
  {
    month: 22,
    mesocycleNumber: 11,
    phase: 'hypertrophy',
    name: { en: 'Month 22: Structural Balance & Aesthetic Refinement', fa: 'ماه ۲۲: تعادل ساختاری و ظرافت‌های زیبایی‌شناسی' },
    focus: { en: 'Polishing Proportions & Muscular Separation', fa: 'تراشیدن تناسب‌ها و تفکیک خطوط عضلانی' },
    repBracket: '8-12 reps',
    intensityRpe: 'RPE 8.5 - 9.0',
    isDeloadMonth: false,
    scientificDescription: {
      en: 'Fine-tuning muscle silhouettes, shoulder-to-waist ratios, and glute-to-quad aesthetic proportions.',
      fa: 'تنظیم دقیق نسبت سرشانه به کمر و تناسب باسن به ران با ظرافت مربیگری.'
    }
  },
  {
    month: 23,
    mesocycleNumber: 12,
    phase: 'peaking',
    name: { en: 'Month 23: 2-Year Master Transformation: Volume Peak', fa: 'ماه ۲۳: تحول ۲ ساله: اوج نهایی حجم و توان بدنی' },
    focus: { en: 'Maximum Cumulative Training Capacity', fa: 'رسیدن به بالاترین ظرفیت تمرینی در ۲ سال' },
    repBracket: '6-10 reps',
    intensityRpe: 'RPE 9.0 - 9.5',
    isDeloadMonth: false,
    scientificDescription: {
      en: 'Executing the pinnacle volume phase of the 2-year transformation cycle.',
      fa: 'اجرای سنگین‌ترین و موثرترین فاز حجم تمرینی در کل دوره ۲ ساله.'
    }
  },
  {
    month: 24,
    mesocycleNumber: 12,
    phase: 'peaking',
    name: { en: 'Month 24: 2-Year Master Transformation: Elite PRs & Full Symmetry', fa: 'ماه ۲۴: شاهکار ۲ ساله: ثبت رکوردهای نهایی و فرم بدنی ایده‌آل' },
    focus: { en: 'All-Time Personal Records & Physical Transformation Milestone', fa: 'ثبت بالاترین رکوردهای تاریخ تمرینی و تجلی تحول کامل' },
    repBracket: '3-6 reps (Deload W4)',
    intensityRpe: 'RPE 10.0 (Deload W4 RPE 6.0)',
    isDeloadMonth: true,
    scientificDescription: {
      en: 'The definitive culmination of the 2-year adaptive periodization architecture. Testing ultimate PRs and concluding with an active recovery celebration.',
      fa: 'نقطه اوج نهایی ماکروسایکل ۲ ساله انطباقی هوشمند. ثبت بالاترین توان و رکوردهای ورزشی.'
    }
  }
];

export function getMesocycleInfoForMonth(month: number): MesocyclePhaseInfo {
  const safeMonth = Math.min(24, Math.max(1, month));
  const found = MESOCYCLE_ROADMAP_24_MONTHS.find((m) => m.month === safeMonth);
  return found || MESOCYCLE_ROADMAP_24_MONTHS[0];
}

/**
 * Intelligent Program Engine
 * - Automatically selects split based on weekly training days:
 *   3 days -> Full Body
 *   4 days -> Upper / Lower (MANDATORY DEFAULT FOR 4 DAYS)
 *   5 days -> Push / Pull / Legs / Push / Pull
 *   6 days -> Push / Pull / Legs (2x/week)
 * - Adapts strictly by GENDER:
 *   Female:
 *     - Volume tolerance (+10-20% sets on lower body)
 *     - Lower body emphasis: Hip Thrusts, Romanian Deadlifts (RDL), Bulgarian Split Squats, Lying Leg Curls
 *     - Rep ranges slightly higher (10-15 reps vs 6-10) for metabolic fatigue resistance
 *     - Shorter rest intervals on isolation/accessories (45-60s)
 *   Male:
 *     - V-taper clavicular chest & lat width emphasis
 *     - Heavy mechanical tension (4-8 reps on main compounds, 120-180s rest)
 * - Strictly maintains SEQUENTIAL MUSCLE BLOCKS (NO random muscle hopping)
 * - Full 24-month roadmap with 4 weeks per month!
 */
export function generateWorkoutPlan(
  profile: UserProfile,
  targetMonth?: number,
  targetWeek?: number
): WorkoutPlan {
  const { goal, weeklyDays, preferredSplit, injuryLimitation, gender } = profile;
  
  const isMyself6Months = profile.trainingContext === 'myself_6_months' || (profile.experienceMonths === 6 && profile.trainingContext !== 'other_beginner');
  const isOtherBeginner = profile.trainingContext === 'other_beginner';
  const effectiveExperience = isMyself6Months ? 'intermediate' : isOtherBeginner ? 'beginner' : profile.experience;

  const currentMonth = targetMonth !== undefined ? targetMonth : (profile.macrocycleMonth || 1);
  const currentWeek = targetWeek !== undefined ? targetWeek : (profile.mesocycleWeek || 1);
  const safeMonth = Math.min(24, Math.max(1, currentMonth));
  const safeWeek = Math.min(4, Math.max(1, currentWeek));

  const mesoInfo = getMesocycleInfoForMonth(safeMonth);
  const isFemale = gender === 'female';

  // Rep ranges & sets adjusted by phase, month, and gender
  let primaryReps = isMyself6Months ? '6-8' : isOtherBeginner ? '10-12' : '6-8';
  let hypertrophyReps = isMyself6Months ? '8-10' : isOtherBeginner ? '10-12' : '8-12';
  let accessoryReps = '12-15';
  let compoundRest = isFemale ? 90 : 120;
  let accessoryRest = isFemale ? 50 : 60;
  let primaryRpe = isMyself6Months ? 8.0 : isOtherBeginner ? 7.0 : 7.5;
  let accessoryRpe = isMyself6Months ? 8.5 : isOtherBeginner ? 7.5 : 8.0;

  // Strategic deload week (Week 4 of deload months or if explicitly deload phase)
  const isDeloadWeek = (mesoInfo.isDeloadMonth && safeWeek === 4) || mesoInfo.phase === 'deload';

  if (isDeloadWeek) {
    // Deload week: cut sets by 40%, reduce RPE to 6-7, clear neurological fatigue
    primaryRpe = 6.5;
    accessoryRpe = 6.5;
    compoundRest = 120;
    accessoryRest = 60;
    primaryReps = '8-10';
    hypertrophyReps = '10-12';
    accessoryReps = '12-15';
  } else if (mesoInfo.phase === 'strength') {
    primaryReps = isFemale ? '5-7' : '3-5';
    hypertrophyReps = isFemale ? '7-9' : '5-8';
    accessoryReps = '10-12';
    compoundRest = isFemale ? 120 : 180;
    primaryRpe = safeWeek >= 3 ? 9.0 : 8.5;
    accessoryRpe = 8.5;
  } else if (mesoInfo.phase === 'peaking') {
    primaryReps = isFemale ? '4-6' : '2-4';
    hypertrophyReps = isFemale ? '6-8' : '5-6';
    accessoryReps = '8-10';
    compoundRest = isFemale ? 150 : 210;
    primaryRpe = safeWeek >= 3 ? 9.5 : 9.0;
    accessoryRpe = 9.0;
  } else {
    // Hypertrophy Phase
    if (isFemale) {
      primaryReps = '8-10';
      hypertrophyReps = '10-14';
      accessoryReps = '12-16';
    } else {
      primaryReps = goal === 'strength' ? '5-7' : '6-8';
      hypertrophyReps = '8-12';
      accessoryReps = '12-15';
    }

    // Progressive Overload across Weeks 1 to 4 of current month
    if (safeWeek === 1) {
      primaryRpe = 7.0; // Intro baseline (RIR 3)
      accessoryRpe = 7.5;
    } else if (safeWeek === 2) {
      primaryRpe = 8.0; // Progressive Overload (RIR 2)
      accessoryRpe = 8.0;
    } else if (safeWeek === 3) {
      primaryRpe = 8.5; // High Volume Peak (RIR 1-2)
      accessoryRpe = 8.5;
    } else if (safeWeek === 4) {
      primaryRpe = 9.0; // Overreaching Realization (RIR 1)
      accessoryRpe = 9.5;
    }
  }

  // Working sets calculation
  let mainSets = effectiveExperience === 'advanced' ? 4 : effectiveExperience === 'intermediate' ? 4 : 3;
  let accSets = effectiveExperience === 'advanced' ? 4 : effectiveExperience === 'intermediate' ? 4 : 3;

  // Female adaptation: volume tolerance on lower body & accessories
  let lowerGluteSets = isFemale ? mainSets + 1 : mainSets;
  let lowerGluteReps = isFemale ? '10-15' : hypertrophyReps;

  if (isDeloadWeek) {
    mainSets = Math.max(2, Math.round(mainSets * 0.6));
    accSets = Math.max(2, Math.round(accSets * 0.6));
    lowerGluteSets = Math.max(2, Math.round(lowerGluteSets * 0.6));
  } else if (safeWeek === 3) {
    // Week 3 peak accumulation: +1 set
    mainSets = mainSets + 1;
    lowerGluteSets = lowerGluteSets + 1;
  }

  // Injury safeguards
  const safeBenchPress = injuryLimitation === 'shoulder' ? 'incline_dumbbell_press' : 'barbell_bench_press';
  const safeOverhead = injuryLimitation === 'shoulder' ? 'dumbbell_lateral_raise' : 'overhead_barbell_press';
  const safeSquat = injuryLimitation === 'knee' ? 'leg_press' : 'barbell_back_squat';
  const safeDeadlift = injuryLimitation === 'lower_back' ? 'lat_pulldown' : 'conventional_deadlift';
  const safeBentRow = injuryLimitation === 'lower_back' ? 'seated_cable_row' : 'barbell_bent_over_row';

  // Dynamic 6-8 week Exercise Rotation (Rotates movement variants based on 2-month cycles)
  const rotationCycle = Math.floor((safeMonth - 1) / 2) % 4;
  const chestCompoundA = rotationCycle % 2 === 0 ? safeBenchPress : 'dumbbell_bench_press';
  const chestSecondaryA = rotationCycle % 2 === 0 ? 'incline_dumbbell_press' : 'cable_chest_flyes';
  const backCompoundA = rotationCycle % 2 === 0 ? 'lat_pulldown' : safeBentRow;
  const backSecondaryA = rotationCycle % 2 === 0 ? 'seated_cable_row' : 'lat_pulldown';
  const quadPrimary = rotationCycle % 2 === 0 ? safeSquat : 'leg_press';
  const quadSecondary = rotationCycle % 2 === 0 ? 'leg_press' : 'bulgarian_split_squat';

  // Split type determination
  let splitType = preferredSplit;
  if (splitType !== 'custom') {
    if (weeklyDays === 3) splitType = 'full_body';
    else if (weeklyDays === 4) splitType = 'upper_lower'; // MANDATORY 4-DAY DEFAULT
    else if (weeklyDays === 5 || weeklyDays === 6) splitType = 'ppl';
  }

  const days: WorkoutDay[] = [];

  // =========================================================================
  // 4-DAY SPLIT: UPPER / LOWER (MANDATORY DEFAULT FOR 4 DAYS)
  // Day 1: Upper A
  // Day 2: Lower A
  // Day 3: Rest
  // Day 4: Upper B
  // Day 5: Lower B
  // Day 6: Rest
  // Day 7: Rest / Overload Audit
  // =========================================================================
  if (weeklyDays === 4 || splitType === 'upper_lower') {
    const isPhase1 = mesoInfo.mesocycleNumber === 1 || safeMonth <= 2;
    const isPhase2 = mesoInfo.mesocycleNumber === 2 || (safeMonth >= 3 && safeMonth <= 4);
    const isPhase3 = mesoInfo.mesocycleNumber === 3 || (safeMonth >= 5 && safeMonth <= 6);

    // =========================================================================
    // DAY 1: UPPER A (STRENGTH / COMPOUND FOUNDATION)
    // =========================================================================
    days.push({
      id: `day_ul_1_m${safeMonth}_w${safeWeek}`,
      dayNumber: 1,
      title: {
        en: `Day 1: Upper A (${isFemale ? 'Upper Tone & Postural Strength' : 'Strength Focus'})`,
        fa: `روز ۱: بالاتنه A (${isFemale ? 'تقویت بالاسینه، زیربغل و قدرت بالاتنه' : 'تمرکز بر قدرت و تنش مکانیکی'})`
      },
      description: {
        en: isFemale
          ? 'Chest Press -> Lats -> Clavicular -> Rows -> Shoulders & Arms'
          : 'Barbell Flat Bench -> Incline DB -> Pull-ups -> Barbell Row -> OHP -> Curls & Triceps',
        fa: isFemale
          ? 'پرس سینه ← زیربغل بارفیکس/لت ← بالاسینه دمبل ← پارویی ← سرشانه و بازوها'
          : 'پرس سینه هالتر ← بالاسینه دمبل ← بارفیکس ← زیربغل هالتر خم ← پرس سرشانه ← جلو بازو و پشت بازو'
      },
      targetFocus: 'Chest, Back, Delts, Arms',
      exercises: isFemale
        ? [
            { id: 'f_u1_1', exerciseId: 'barbell_bench_press', sets: 4, reps: '6-8', restSeconds: 90, targetRpe: 7.5, notes: 'Pause 1s on chest' },
            { id: 'f_u1_2', exerciseId: 'incline_dumbbell_press', sets: 3, reps: '8-10', restSeconds: 75, targetRpe: 8 },
            { id: 'f_u1_3', exerciseId: 'pull_ups', sets: 4, reps: '8-10', restSeconds: 75, targetRpe: 8 },
            { id: 'f_u1_4', exerciseId: 'barbell_bent_over_row', sets: 3, reps: '8-10', restSeconds: 75, targetRpe: 8 },
            { id: 'f_u1_5', exerciseId: 'overhead_barbell_press', sets: 3, reps: '8-10', restSeconds: 75, targetRpe: 8 },
            { id: 'f_u1_6', exerciseId: 'dumbbell_lateral_raise', sets: 4, reps: '12-15', restSeconds: 60, targetRpe: 8.5 },
            { id: 'f_u1_7', exerciseId: 'barbell_bicep_curl', sets: 3, reps: '10-12', restSeconds: 60, targetRpe: 8 },
            { id: 'f_u1_8', exerciseId: 'triceps_rope_pushdown', sets: 3, reps: '10-12', restSeconds: 60, targetRpe: 8 }
          ]
        : [
            // MALE PHASE 1 EXACT ROUTINE - 8 EXERCISES
            { id: 'm_u1_1', exerciseId: 'barbell_bench_press', sets: isPhase2 ? 5 : 4, reps: isPhase1 ? '5' : (isPhase2 ? '6-8' : primaryReps), restSeconds: 120, targetRpe: 8, notes: 'Pause 1s on chest, drive explosively' },
            { id: 'm_u1_2', exerciseId: 'incline_dumbbell_press', sets: 3, reps: isPhase1 ? '6-8' : '8-10', restSeconds: 90, targetRpe: 8 },
            { id: 'm_u1_3', exerciseId: 'pull_ups', sets: isPhase2 ? 5 : 4, reps: '6-8', restSeconds: 120, targetRpe: 8 },
            { id: 'm_u1_4', exerciseId: 'barbell_bent_over_row', sets: 3, reps: '6-8', restSeconds: 90, targetRpe: 8 },
            { id: 'm_u1_5', exerciseId: 'overhead_barbell_press', sets: 3, reps: '6', restSeconds: 120, targetRpe: 8 },
            { id: 'm_u1_6', exerciseId: 'dumbbell_lateral_raise', sets: 4, reps: '12-15', restSeconds: 60, targetRpe: 8.5 },
            { id: 'm_u1_7', exerciseId: 'barbell_bicep_curl', sets: 3, reps: isPhase2 ? '8-10' : '8', restSeconds: 75, targetRpe: 8.5 },
            { id: 'm_u1_8', exerciseId: 'triceps_rope_pushdown', sets: 3, reps: isPhase2 ? '8-10' : '8', restSeconds: 75, targetRpe: 8.5 }
          ]
    });

    // =========================================================================
    // DAY 2: LOWER A (STRENGTH / QUADS & POSTERIOR BASE)
    // =========================================================================
    days.push({
      id: `day_ul_2_m${safeMonth}_w${safeWeek}`,
      dayNumber: 2,
      title: {
        en: `Day 2: Lower A (${isFemale ? 'Glutes, Hip Thrust & Quad Power' : 'Strength Base & Quad Focus'})`,
        fa: `روز ۲: پایین‌تنه A (${isFemale ? 'تمرکز ویژه هیپ‌تراست، باسن و چهارسر' : 'اسکوات قدرتی، پرس پا، ددلیفت رومانیایی و ساق'})`
      },
      description: {
        en: isFemale
          ? 'Hip Thrust -> Squat -> Bulgarian Split Squat -> RDL -> Lunges -> Calves'
          : 'Squat 4x5 -> Leg Press 3x8 -> Romanian Deadlift 3x6-8 -> Walking Lunges 3x10 -> Standing Calf Raise 4x12',
        fa: isFemale
          ? 'هیپ‌تراست سنگین ← اسکوات ← لانژ بلغاری ← ددلیفت رومانیایی ← ساق پا'
          : 'اسکوات ۴×۵ ← پرس پا ۳×۸ ← ددلیفت رومانیایی ۳×۶-۸ ← لانژ راه رفتنی ۳×۱۰ ← ساق پا ایستاده ۴×۱۲'
      },
      targetFocus: isFemale ? 'Glutes, Quads, Hamstrings, Calves' : 'Quads, Hamstrings, Glutes, Calves',
      exercises: isFemale
        ? [
            { id: 'f_l1_1', exerciseId: 'hip_thrust', sets: 4, reps: '8-10', restSeconds: 90, targetRpe: 8.5, notes: 'Hold 2s contraction at top' },
            { id: 'f_l1_2', exerciseId: 'barbell_back_squat', sets: 4, reps: '6-8', restSeconds: 90, targetRpe: 8 },
            { id: 'f_l1_3', exerciseId: 'leg_press', sets: 3, reps: '10-12', restSeconds: 90, targetRpe: 8 },
            { id: 'f_l1_4', exerciseId: 'romanian_deadlift_rdl', sets: 4, reps: '8-10', restSeconds: 90, targetRpe: 8 },
            { id: 'f_l1_5', exerciseId: 'walking_lunges', sets: 3, reps: '10 each', restSeconds: 75, targetRpe: 8 },
            { id: 'f_l1_6', exerciseId: 'lying_leg_curl', sets: 3, reps: '12', restSeconds: 60, targetRpe: 8 },
            { id: 'f_l1_7', exerciseId: 'standing_calf_raise', sets: 4, reps: '15', restSeconds: 60, targetRpe: 8 },
            { id: 'f_l1_8', exerciseId: 'hanging_leg_raise', sets: 3, reps: '12-15', restSeconds: 60, targetRpe: 8 }
          ]
        : [
            // MALE PHASE 1 EXACT ROUTINE - 8 EXERCISES
            { id: 'm_l1_1', exerciseId: 'barbell_back_squat', sets: isPhase2 ? 5 : 4, reps: isPhase1 ? '5' : primaryReps, restSeconds: 150, targetRpe: 8, notes: 'Deep parallel, Valsalva brace' },
            { id: 'm_l1_2', exerciseId: 'leg_press', sets: 3, reps: '8', restSeconds: 90, targetRpe: 8 },
            { id: 'm_l1_3', exerciseId: 'romanian_deadlift_rdl', sets: 3, reps: '6-8', restSeconds: 120, targetRpe: 8 },
            { id: 'm_l1_4', exerciseId: 'walking_lunges', sets: 3, reps: '10 each', restSeconds: 90, targetRpe: 8 },
            { id: 'm_l1_5', exerciseId: 'leg_extension', sets: 3, reps: '12-15', restSeconds: 60, targetRpe: 8.5 },
            { id: 'm_l1_6', exerciseId: 'lying_leg_curl', sets: 3, reps: '10-12', restSeconds: 75, targetRpe: 8.5 },
            { id: 'm_l1_7', exerciseId: 'standing_calf_raise', sets: 4, reps: '12', restSeconds: 75, targetRpe: 8.5 },
            { id: 'm_l1_8', exerciseId: 'hanging_leg_raise', sets: 3, reps: '12-15', restSeconds: 60, targetRpe: 8 }
          ]
    });

    // =========================================================================
    // DAY 3: REST & SYSTEMIC RECOVERY
    // =========================================================================
    days.push({
      id: `day_ul_rest_1_m${safeMonth}_w${safeWeek}`,
      dayNumber: 3,
      title: { en: 'Day 3: Active Rest & System Recovery', fa: 'روز ۳: استراحت فعال و ریکاوری بافت‌ها' },
      description: { en: 'Mobility work, hydration, nutrient timing, and systemic recovery', fa: 'پیاده‌روی سبک، حرکات کششی، هیدراتاسیون و سنتز پروتئین عضلانی' },
      targetFocus: 'Recovery',
      exercises: [],
      isRestDay: true
    });

    // =========================================================================
    // DAY 4: UPPER B (HYPERTROPHY & PUMP OVERLOAD)
    // =========================================================================
    days.push({
      id: `day_ul_4_m${safeMonth}_w${safeWeek}`,
      dayNumber: 4,
      title: {
        en: `Day 4: Upper B (${isFemale ? 'V-Taper Tone & Upper Sculpting' : 'Hypertrophy Focus'})`,
        fa: `روز ۴: بالاتنه B (${isFemale ? 'فرم‌دهی بالاسینه، زیربغل و سرشانه' : 'هایپرتروفی سینه، زیربغل، سرشانه و بازو'})`
      },
      description: {
        en: isFemale
          ? 'Lat Pulldown -> Seated Row -> Incline DB -> Cable Flyes -> Lateral Raises -> Arms'
          : 'Lat Pulldown 4x12 -> Seated Row 3x12 -> Machine Chest Press 3x10 -> Cable Crossover 3x15 -> Lateral Raise 4x15 -> Rear Delt Fly 3x15 -> Dumbbell Curl 3x12 -> Rope Pushdown 3x12',
        fa: isFemale
          ? 'زیربغل لت ← قایقی سیم‌کش ← پرس بالاسینه ← کراس‌اوور ← نشر جانب دمبل ← بازوها'
          : 'زیربغل لت ۴×۱۲ ← قایقی سیم‌کش ۳×۱۲ ← پرس سینه دستگاه ۳×۱۰ ← کراس‌اوور ۳×۱۵ ← نشر جانب ۴×۱۵ ← فلای معکوس ۳×۱۵ ← جلو بازو دمبل ۳×۱۲ ← پشت بازو طناب ۳×۱۲'
      },
      targetFocus: 'Lats, Upper Chest, Delts, Arms',
      exercises: isFemale
        ? [
            { id: 'f_u2_1', exerciseId: 'lat_pulldown', sets: 4, reps: '12', restSeconds: 75, targetRpe: 8 },
            { id: 'f_u2_2', exerciseId: 'seated_cable_row', sets: 3, reps: '12', restSeconds: 75, targetRpe: 8 },
            { id: 'f_u2_3', exerciseId: 'incline_dumbbell_press', sets: 3, reps: '10-12', restSeconds: 75, targetRpe: 8 },
            { id: 'f_u2_4', exerciseId: 'cable_crossover', sets: 3, reps: '15', restSeconds: 60, targetRpe: 8.5 },
            { id: 'f_u2_5', exerciseId: 'dumbbell_lateral_raise', sets: 4, reps: '15', restSeconds: 60, targetRpe: 8.5 },
            { id: 'f_u2_6', exerciseId: 'rear_delt_fly', sets: 3, reps: '15', restSeconds: 60, targetRpe: 8.5 },
            { id: 'f_u2_7', exerciseId: 'dumbbell_curl', sets: 3, reps: '12', restSeconds: 60, targetRpe: 8.5 },
            { id: 'f_u2_8', exerciseId: 'triceps_rope_pushdown', sets: 3, reps: '12', restSeconds: 60, targetRpe: 8.5 }
          ]
        : [
            // MALE PHASE 1 EXACT ROUTINE
            { id: 'm_u2_1', exerciseId: 'lat_pulldown', sets: 4, reps: '12', restSeconds: 90, targetRpe: 8.5 },
            { id: 'm_u2_2', exerciseId: 'seated_cable_row', sets: 3, reps: '12', restSeconds: 90, targetRpe: 8.5 },
            { id: 'm_u2_3', exerciseId: 'machine_chest_press', sets: 3, reps: '10', restSeconds: 90, targetRpe: 8.5 },
            { id: 'm_u2_4', exerciseId: 'cable_crossover', sets: 3, reps: '15', restSeconds: 75, targetRpe: 8.5 },
            { id: 'm_u2_5', exerciseId: 'dumbbell_lateral_raise', sets: 4, reps: '15', restSeconds: 60, targetRpe: 9, notes: isPhase3 ? 'Drop set on last 2 sets' : 'Last set drop' },
            { id: 'm_u2_6', exerciseId: 'rear_delt_fly', sets: 3, reps: '15', restSeconds: 60, targetRpe: 8.5 },
            { id: 'm_u2_7', exerciseId: 'dumbbell_curl', sets: 3, reps: '12', restSeconds: 60, targetRpe: 8.5 },
            { id: 'm_u2_8', exerciseId: 'triceps_rope_pushdown', sets: 3, reps: '12', restSeconds: 60, targetRpe: 8.5 }
          ]
    });

    // =========================================================================
    // DAY 5: LOWER B (HYPERTROPHY & POSTERIOR OVERLOAD)
    // =========================================================================
    days.push({
      id: `day_ul_5_m${safeMonth}_w${safeWeek}`,
      dayNumber: 5,
      title: {
        en: `Day 5: Lower B (${isFemale ? 'Glutes & Posterior Chain Specialization' : 'Hypertrophy Focus'})`,
        fa: `روز ۵: پایین‌تنه B (${isFemale ? 'تخصصی باسن و همسترینگ (هیپ‌تراست، RDL و لانژ)' : 'هایپرتروفی همسترینگ، چهارسر، باسن و ساق'})`
      },
      description: {
        en: isFemale
          ? 'Hip Thrust -> Romanian Deadlift -> Bulgarian Split Squat -> Leg Curl -> Leg Extension -> Seated Calf'
          : 'Romanian Deadlift 4x10 -> Hack Squat 4x12 -> Bulgarian Split Squat 3x10 -> Leg Curl 3x12 -> Leg Extension 3x15 (drop set) -> Seated Calf Raise 4x15',
        fa: isFemale
          ? 'هیپ‌تراست تخصصی ← ددلیفت رومانیایی ← لانژ بلغاری ← پشت پا دستگاه ← جلو پا ← ساق پا'
          : 'ددلیفت رومانیایی ۴×۱۰ ← هاگ پا ۴×۱۲ ← لانژ بلغاری ۳×۱۰ ← پشت پا دستگاه ۳×۱۲ ← جلو پا ۳×۱۵ (دراپ ست) ← ساق پا نشسته ۴×۱۵'
      },
      targetFocus: isFemale ? 'Glutes, Hamstrings, Quads, Calves' : 'Hamstrings, Quads, Glutes, Calves',
      exercises: isFemale
        ? [
            { id: 'f_l2_1', exerciseId: 'hip_thrust', sets: 4, reps: '10-12', restSeconds: 90, targetRpe: 9, notes: 'Peak 2s contraction' },
            { id: 'f_l2_2', exerciseId: 'romanian_deadlift_rdl', sets: 4, reps: '10', restSeconds: 90, targetRpe: 8.5 },
            { id: 'f_l2_3', exerciseId: 'bulgarian_split_squat', sets: 3, reps: '10', restSeconds: 75, targetRpe: 8.5 },
            { id: 'f_l2_4', exerciseId: 'leg_press', sets: 3, reps: '12', restSeconds: 90, targetRpe: 8.5 },
            { id: 'f_l2_5', exerciseId: 'lying_leg_curl', sets: 3, reps: '12', restSeconds: 60, targetRpe: 8.5 },
            { id: 'f_l2_6', exerciseId: 'leg_extension', sets: 3, reps: '15', restSeconds: 60, targetRpe: 8.5, notes: 'Drop set on last set' },
            { id: 'f_l2_7', exerciseId: 'seated_calf_raise', sets: 4, reps: '15', restSeconds: 60, targetRpe: 8.5 },
            { id: 'f_l2_8', exerciseId: 'hanging_leg_raise', sets: 3, reps: '12-15', restSeconds: 60, targetRpe: 8 }
          ]
        : [
            // MALE PHASE 1 EXACT ROUTINE - 8 EXERCISES
            { id: 'm_l2_1', exerciseId: 'romanian_deadlift_rdl', sets: 4, reps: '10', restSeconds: 120, targetRpe: 8.5 },
            { id: 'm_l2_2', exerciseId: 'hack_squat', sets: 4, reps: '12', restSeconds: 90, targetRpe: 8.5 },
            { id: 'm_l2_3', exerciseId: 'leg_press', sets: 3, reps: '10-12', restSeconds: 90, targetRpe: 8.5 },
            { id: 'm_l2_4', exerciseId: 'bulgarian_split_squat', sets: 3, reps: '10', restSeconds: 90, targetRpe: 8.5 },
            { id: 'm_l2_5', exerciseId: 'lying_leg_curl', sets: 3, reps: '12', restSeconds: 75, targetRpe: 8.5 },
            { id: 'm_l2_6', exerciseId: 'leg_extension', sets: 3, reps: '15', restSeconds: 75, targetRpe: 9, notes: 'Drop set on final set' },
            { id: 'm_l2_7', exerciseId: 'seated_calf_raise', sets: 4, reps: '15', restSeconds: 60, targetRpe: 8.5 },
            { id: 'm_l2_8', exerciseId: 'hanging_leg_raise', sets: 3, reps: '12-15', restSeconds: 60, targetRpe: 8 }
          ]
    });

    // Day 6: Rest
    days.push({
      id: `day_ul_rest_2_m${safeMonth}_w${safeWeek}`,
      dayNumber: 6,
      title: { en: 'Day 6: Systemic Recovery', fa: 'روز ۶: بازسازی سیستم عصبی مرکزی' },
      description: { en: 'Complete muscle protein remodeling and recovery', fa: 'استراحت کامل، بازسازی ذخایر گلیکوژن و سلامت مفاصل' },
      targetFocus: 'Recovery',
      exercises: [],
      isRestDay: true
    });

    // Day 7: Weekly Progressive Overload Audit
    days.push({
      id: `day_ul_rest_3_m${safeMonth}_w${safeWeek}`,
      dayNumber: 7,
      title: { en: 'Day 7: Weekly Progressive Overload Audit', fa: 'روز ۷: بررسی اضافه بار تدریجی و آمادگی هفته' },
      description: { en: 'Audit workout logs, prepare upcoming microcycle volume', fa: 'بررسی رکوردهای وزنه و برنامه‌ریزی افزایش وزنه برای هفته آینده' },
      targetFocus: 'Recovery',
      exercises: [],
      isRestDay: true
    });

  // =========================================================================
  // 5-DAY SPLIT: PUSH / PULL / LEGS / PUSH / PULL
  // =========================================================================
  } else if (weeklyDays === 5) {
    days.push({
      id: `day_5_1_m${safeMonth}_w${safeWeek}`,
      dayNumber: 1,
      title: { en: 'Day 1: Push A (Chest Dominant)', fa: 'روز ۱: فشاری A (تمرکز بر سینه)' },
      description: { en: 'Sequential Chest -> Shoulders -> Triceps', fa: 'تفکیک متوالی: بلوک سینه ← بلوک سرشانه ← بلوک پشت‌بازو' },
      targetFocus: 'Chest, Shoulders, Triceps',
      exercises: [
        { id: 'p5_1', exerciseId: safeBenchPress, sets: mainSets, reps: primaryReps, restSeconds: compoundRest, targetRpe: primaryRpe },
        { id: 'p5_2', exerciseId: 'incline_dumbbell_press', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'p5_3', exerciseId: 'cable_chest_flyes', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'p5_4', exerciseId: safeOverhead, sets: accSets, reps: primaryReps, restSeconds: compoundRest, targetRpe: primaryRpe },
        { id: 'p5_5', exerciseId: 'dumbbell_lateral_raise', sets: 4, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'p5_6', exerciseId: 'triceps_rope_pushdown', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'p5_7', exerciseId: 'overhead_triceps_extension', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'p5_8', exerciseId: 'hanging_leg_raise', sets: 3, reps: '12-15', restSeconds: accessoryRest, targetRpe: primaryRpe }
      ]
    });

    days.push({
      id: `day_5_2_m${safeMonth}_w${safeWeek}`,
      dayNumber: 2,
      title: { en: 'Day 2: Pull A (Back Width & Biceps)', fa: 'روز ۲: کششی A (عرض زیربغل، فیس‌پول و جلوبازو)' },
      description: { en: 'Sequential Back & Lats -> Upper Back -> Biceps -> Core', fa: 'تفکیک متوالی: بلوک زیربغل ← بلوک پشت سرشانه ← بلوک جلوبازو ← میان‌تنه' },
      targetFocus: 'Lats, Upper Back, Biceps, Core',
      exercises: [
        { id: 'pl5_1', exerciseId: 'lat_pulldown', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'pl5_2', exerciseId: safeBentRow, sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'pl5_3', exerciseId: 'seated_cable_row', sets: accSets, reps: accessoryReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'pl5_4', exerciseId: 'straight_arm_pulldown', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'pl5_5', exerciseId: 'face_pulls', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'pl5_6', exerciseId: 'barbell_bicep_curl', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'pl5_7', exerciseId: 'dumbbell_hammer_curl', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'pl5_8', exerciseId: 'hanging_leg_raise', sets: 3, reps: '12-15', restSeconds: accessoryRest, targetRpe: primaryRpe }
      ]
    });

    days.push({
      id: `day_5_3_m${safeMonth}_w${safeWeek}`,
      dayNumber: 3,
      title: { en: `Day 3: Legs (${isFemale ? 'Glutes & Posterior Chain' : 'Quad & Glute Power'})`, fa: `روز ۳: پا (${isFemale ? 'تمرکز ویژه باسن و همسترینگ' : 'اسکوات، پرس پا، همسترینگ و ساق'})` },
      description: { en: 'Sequential Quads -> Hamstrings -> Glutes -> Calves', fa: 'تفکیک متوالی: بلوک چهارسر ران ← بلوک همسترینگ و باسن ← بلوک ساق پا' },
      targetFocus: 'Quads, Hamstrings, Glutes, Calves',
      exercises: isFemale
        ? [
            { id: 'lg5_f1', exerciseId: 'hip_thrust', sets: lowerGluteSets, reps: lowerGluteReps, restSeconds: 90, targetRpe: primaryRpe },
            { id: 'lg5_f2', exerciseId: quadPrimary, sets: mainSets, reps: primaryReps, restSeconds: compoundRest, targetRpe: primaryRpe },
            { id: 'lg5_f3', exerciseId: 'bulgarian_split_squat', sets: lowerGluteSets, reps: lowerGluteReps, restSeconds: 90, targetRpe: primaryRpe },
            { id: 'lg5_f4', exerciseId: 'romanian_deadlift_rdl', sets: lowerGluteSets, reps: lowerGluteReps, restSeconds: compoundRest, targetRpe: primaryRpe },
            { id: 'lg5_f5', exerciseId: 'lying_leg_curl', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
            { id: 'lg5_f6', exerciseId: 'leg_press', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
            { id: 'lg5_f7', exerciseId: 'standing_calf_raise', sets: 3, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
            { id: 'lg5_f8', exerciseId: 'hanging_leg_raise', sets: 3, reps: '12-15', restSeconds: accessoryRest, targetRpe: primaryRpe }
          ]
        : [
            { id: 'lg5_1', exerciseId: safeSquat, sets: mainSets, reps: primaryReps, restSeconds: compoundRest, targetRpe: primaryRpe },
            { id: 'lg5_2', exerciseId: 'leg_press', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
            { id: 'lg5_3', exerciseId: 'leg_extension', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
            { id: 'lg5_4', exerciseId: 'romanian_deadlift_rdl', sets: mainSets, reps: hypertrophyReps, restSeconds: compoundRest, targetRpe: primaryRpe },
            { id: 'lg5_5', exerciseId: 'lying_leg_curl', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
            { id: 'lg5_6', exerciseId: 'hip_thrust', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
            { id: 'lg5_7', exerciseId: 'standing_calf_raise', sets: 4, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
            { id: 'lg5_8', exerciseId: 'hanging_leg_raise', sets: 3, reps: '12-15', restSeconds: accessoryRest, targetRpe: primaryRpe }
          ]
    });

    // Day 4: Active Rest Day (Recovery after 3 consecutive heavy sessions)
    days.push({
      id: `day_5_rest_1_m${safeMonth}_w${safeWeek}`,
      dayNumber: 4,
      title: { en: 'Day 4: Active Rest & System Recovery', fa: 'روز ۴: استراحت فعال و ریکاوری سیستم عصبی' },
      description: { en: 'Light mobility, hydration, glycogen replenishment, and joint recovery', fa: 'پیاده‌روی سبک، حرکات کششی، تغذیه پروتئینی و بازسازی ذخایر گلیکوژن' },
      targetFocus: 'Recovery',
      exercises: [],
      isRestDay: true
    });

    days.push({
      id: `day_5_4_m${safeMonth}_w${safeWeek}`,
      dayNumber: 5,
      title: { en: 'Day 5: Push B (Delts & Upper Chest Focus)', fa: 'روز ۵: فشاری B (تمرکز بر سرشانه، بالاسینه و پشت‌بازو)' },
      description: { en: 'Sequential Chest -> Delts -> Triceps with overhead emphasis', fa: 'تفکیک متوالی: بالاسینه و دمبل صاف ← سرشانه و نشر جانب ← پشت‌بازو' },
      targetFocus: 'Shoulders, Chest, Triceps',
      exercises: [
        { id: 'p5_8', exerciseId: 'incline_dumbbell_press', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'p5_9', exerciseId: 'dumbbell_bench_press', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'p5_10', exerciseId: 'cable_chest_flyes', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'p5_11', exerciseId: safeOverhead, sets: accSets, reps: primaryReps, restSeconds: compoundRest, targetRpe: primaryRpe },
        { id: 'p5_12', exerciseId: 'dumbbell_lateral_raise', sets: 4, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'p5_13', exerciseId: 'triceps_rope_pushdown', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'p5_14', exerciseId: 'overhead_triceps_extension', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'p5_15', exerciseId: 'hanging_leg_raise', sets: 3, reps: '12-15', restSeconds: accessoryRest, targetRpe: primaryRpe }
      ]
    });

    days.push({
      id: `day_5_5_m${safeMonth}_w${safeWeek}`,
      dayNumber: 6,
      title: { en: 'Day 6: Pull B (Posterior Chain & Thickness)', fa: 'روز ۶: کششی B (ددلیفت قدرتی، ضخامت پشت و بازو)' },
      description: { en: 'Sequential Deadlift Hinge -> Heavy Rows -> Rear Delts -> Biceps', fa: 'تفکیک متوالی: ددلیفت قدرتی ← زیربغل هالتر و قایقی ← فیس‌پول ← جلوبازو' },
      targetFocus: 'Deadlift, Lats, Rear Delts, Biceps',
      exercises: [
        { id: 'pl5_8', exerciseId: safeDeadlift, sets: 3, reps: isFemale ? '8-10' : '5-6', restSeconds: compoundRest + 30, targetRpe: primaryRpe },
        { id: 'pl5_9', exerciseId: 'lat_pulldown', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'pl5_10', exerciseId: safeBentRow, sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'pl5_11', exerciseId: 'seated_cable_row', sets: accSets, reps: accessoryReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'pl5_12', exerciseId: 'straight_arm_pulldown', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'pl5_13', exerciseId: 'face_pulls', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'pl5_14', exerciseId: 'barbell_bicep_curl', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'pl5_15', exerciseId: 'dumbbell_hammer_curl', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe }
      ]
    });

    days.push({
      id: `day_5_rest_2_m${safeMonth}_w${safeWeek}`,
      dayNumber: 7,
      title: { en: 'Day 7: Full System Recovery & Weekly Audit', fa: 'روز ۷: ریکاوری سیستماتیک و بررسی اضافه بار هفتگی' },
      description: { en: 'Full rest, nutrient replenishment, and preparing next week load', fa: 'استراحت کامل، تغذیه ریکاوری و تحلیل اضافه بار تدریجی برای هفته آینده' },
      targetFocus: 'Recovery',
      exercises: [],
      isRestDay: true
    });

  // =========================================================================
  // 6-DAY SPLIT: PUSH / PULL / LEGS (2X/WEEK)
  // =========================================================================
  } else if (weeklyDays === 6 || splitType === 'ppl') {
    // Day 1: Push A
    days.push({
      id: `day_6_1_m${safeMonth}_w${safeWeek}`,
      dayNumber: 1,
      title: { en: 'Day 1: Push A (Chest Heavy)', fa: 'روز ۱: فشاری A (تمرکز بر سینه سنگین)' },
      description: { en: 'Heavy flat bench, incline DB press, shoulders, triceps', fa: 'پرس سینه هالتر، بالاسینه دمبل، سرشانه و پشت‌بازو' },
      targetFocus: 'Chest, Shoulders, Triceps',
      exercises: [
        { id: 'p6_1', exerciseId: safeBenchPress, sets: mainSets, reps: primaryReps, restSeconds: compoundRest, targetRpe: primaryRpe },
        { id: 'p6_2', exerciseId: 'incline_dumbbell_press', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'p6_3', exerciseId: 'cable_chest_flyes', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'p6_4', exerciseId: safeOverhead, sets: accSets, reps: primaryReps, restSeconds: compoundRest, targetRpe: primaryRpe },
        { id: 'p6_5', exerciseId: 'dumbbell_lateral_raise', sets: 4, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'p6_6', exerciseId: 'triceps_rope_pushdown', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'p6_7', exerciseId: 'overhead_triceps_extension', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'p6_8', exerciseId: 'hanging_leg_raise', sets: 3, reps: '12-15', restSeconds: accessoryRest, targetRpe: primaryRpe }
      ]
    });

    // Day 2: Pull A
    days.push({
      id: `day_6_2_m${safeMonth}_w${safeWeek}`,
      dayNumber: 2,
      title: { en: 'Day 2: Pull A (Back Width & Lat Focus)', fa: 'روز ۲: کششی A (عرض زیربغل، فیس‌پول و جلوبازو)' },
      description: { en: 'Lat pulldowns, heavy rows, face pulls, bicep curls, core', fa: 'لت زیربغل، زیربغل هالتر، فیس‌پول، جلوبازو و شکم' },
      targetFocus: 'Lats, Upper Back, Biceps, Core',
      exercises: [
        { id: 'pl6_1', exerciseId: 'lat_pulldown', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'pl6_2', exerciseId: safeBentRow, sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'pl6_3', exerciseId: 'seated_cable_row', sets: accSets, reps: accessoryReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'pl6_4', exerciseId: 'straight_arm_pulldown', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'pl6_5', exerciseId: 'face_pulls', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'pl6_6', exerciseId: 'barbell_bicep_curl', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'pl6_7', exerciseId: 'dumbbell_hammer_curl', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'pl6_8', exerciseId: 'hanging_leg_raise', sets: 3, reps: '12-15', restSeconds: accessoryRest, targetRpe: primaryRpe }
      ]
    });

    // Day 3: Legs A
    days.push({
      id: `day_6_3_m${safeMonth}_w${safeWeek}`,
      dayNumber: 3,
      title: { en: `Day 3: Legs A (${isFemale ? 'Glutes & Hip Focus' : 'Quad Dominant'})`, fa: `روز ۳: پا A (${isFemale ? 'تمرکز ویژه باسن و هیپ‌تراست' : 'تمرکز بر چهارسر ران و اسکوات'})` },
      description: { en: 'Squats, leg press, extensions, RDL, hip thrust and calves', fa: 'اسکوات، پرس پا، جلوپا، ددلیفت رومانیایی و ساق' },
      targetFocus: isFemale ? 'Glutes, Quads, Hamstrings, Calves' : 'Quads, Hamstrings, Calves, Core',
      exercises: isFemale
        ? [
            { id: 'lg6_f1', exerciseId: 'hip_thrust', sets: lowerGluteSets, reps: lowerGluteReps, restSeconds: 90, targetRpe: primaryRpe },
            { id: 'lg6_f2', exerciseId: quadPrimary, sets: mainSets, reps: primaryReps, restSeconds: compoundRest, targetRpe: primaryRpe },
            { id: 'lg6_f3', exerciseId: 'bulgarian_split_squat', sets: lowerGluteSets, reps: lowerGluteReps, restSeconds: 90, targetRpe: primaryRpe },
            { id: 'lg6_f4', exerciseId: 'romanian_deadlift_rdl', sets: lowerGluteSets, reps: lowerGluteReps, restSeconds: compoundRest, targetRpe: primaryRpe },
            { id: 'lg6_f5', exerciseId: 'lying_leg_curl', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
            { id: 'lg6_f6', exerciseId: 'leg_press', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
            { id: 'lg6_f7', exerciseId: 'standing_calf_raise', sets: 3, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
            { id: 'lg6_f8', exerciseId: 'hanging_leg_raise', sets: 3, reps: '12-15', restSeconds: accessoryRest, targetRpe: primaryRpe }
          ]
        : [
            { id: 'lg6_1', exerciseId: safeSquat, sets: mainSets, reps: primaryReps, restSeconds: compoundRest, targetRpe: primaryRpe },
            { id: 'lg6_2', exerciseId: 'leg_press', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
            { id: 'lg6_3', exerciseId: 'leg_extension', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
            { id: 'lg6_4', exerciseId: 'romanian_deadlift_rdl', sets: mainSets, reps: hypertrophyReps, restSeconds: compoundRest, targetRpe: primaryRpe },
            { id: 'lg6_5', exerciseId: 'lying_leg_curl', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
            { id: 'lg6_6', exerciseId: 'hip_thrust', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
            { id: 'lg6_7', exerciseId: 'standing_calf_raise', sets: 4, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
            { id: 'lg6_8', exerciseId: 'hanging_leg_raise', sets: 3, reps: '12-15', restSeconds: accessoryRest, targetRpe: primaryRpe }
          ]
    });

    // Day 4: Push B
    days.push({
      id: `day_6_4_m${safeMonth}_w${safeWeek}`,
      dayNumber: 4,
      title: { en: 'Day 4: Push B (Shoulders & Upper Chest)', fa: 'روز ۴: فشاری B (تمرکز بر سرشانه و بالاسینه)' },
      description: { en: 'Overhead press, incline DB press, DB bench press, lateral raises, triceps', fa: 'پرس سرشانه، بالاسینه دمبل، پرس دمبل صاف، نشر جانب و پشت‌بازو' },
      targetFocus: 'Shoulders, Chest, Triceps',
      exercises: [
        { id: 'p6_8', exerciseId: 'incline_dumbbell_press', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'p6_9', exerciseId: 'dumbbell_bench_press', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'p6_10', exerciseId: 'cable_chest_flyes', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'p6_11', exerciseId: safeOverhead, sets: accSets, reps: primaryReps, restSeconds: compoundRest, targetRpe: primaryRpe },
        { id: 'p6_12', exerciseId: 'dumbbell_lateral_raise', sets: 4, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'p6_13', exerciseId: 'triceps_rope_pushdown', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'p6_14', exerciseId: 'overhead_triceps_extension', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'p6_15', exerciseId: 'hanging_leg_raise', sets: 3, reps: '12-15', restSeconds: accessoryRest, targetRpe: primaryRpe }
      ]
    });

    // Day 5: Pull B
    days.push({
      id: `day_6_5_m${safeMonth}_w${safeWeek}`,
      dayNumber: 5,
      title: { en: 'Day 5: Pull B (Back Thickness & Deadlift)', fa: 'روز ۵: کششی B (ضخامت پشت و ددلیفت)' },
      description: { en: 'Conventional deadlift, bent rows, cable rows, face pulls, bicep curls', fa: 'ددلیفت قدرتی، زیربغل هالتر خم، قایقی، فیس‌پول و جلوبازو' },
      targetFocus: 'Posterior Chain, Back Thickness, Biceps',
      exercises: [
        { id: 'pl6_8', exerciseId: safeDeadlift, sets: 3, reps: isFemale ? '8-10' : '5-5', restSeconds: compoundRest + 30, targetRpe: primaryRpe },
        { id: 'pl6_9', exerciseId: 'lat_pulldown', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'pl6_10', exerciseId: safeBentRow, sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'pl6_11', exerciseId: 'seated_cable_row', sets: accSets, reps: accessoryReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'pl6_12', exerciseId: 'straight_arm_pulldown', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'pl6_13', exerciseId: 'face_pulls', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'pl6_14', exerciseId: 'barbell_bicep_curl', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'pl6_15', exerciseId: 'dumbbell_hammer_curl', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe }
      ]
    });

    // Day 6: Legs B
    days.push({
      id: `day_6_6_m${safeMonth}_w${safeWeek}`,
      dayNumber: 6,
      title: { en: `Day 6: Legs B (${isFemale ? 'Hamstrings & Glute Specialization' : 'Hamstring & Glute Focus'})`, fa: `روز ۶: پا B (${isFemale ? 'تخصصی همسترینگ، باسن و اسکوات بلغاری' : 'زنجیره خلفی، همسترینگ و باسن'})` },
      description: { en: 'RDL, hip thrust, leg curls, Bulgarian split squats, calves', fa: 'ددلیفت رومانیایی، هیپ تراست، پشت‌پا، اسکوات بلغاری و ساق' },
      targetFocus: 'Hamstrings, Glutes, Calves',
      exercises: [
        { id: 'lg6_9', exerciseId: 'romanian_deadlift_rdl', sets: lowerGluteSets, reps: lowerGluteReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'lg6_10', exerciseId: 'hip_thrust', sets: lowerGluteSets, reps: lowerGluteReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'lg6_11', exerciseId: 'lying_leg_curl', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'lg6_12', exerciseId: 'bulgarian_split_squat', sets: lowerGluteSets, reps: lowerGluteReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'lg6_13', exerciseId: 'leg_press', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'lg6_14', exerciseId: 'leg_extension', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'lg6_15', exerciseId: 'standing_calf_raise', sets: 4, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'lg6_16', exerciseId: 'hanging_leg_raise', sets: 3, reps: '12-15', restSeconds: accessoryRest, targetRpe: primaryRpe }
      ]
    });

    // Day 7: Full System Recovery
    days.push({
      id: `day_6_rest_1_m${safeMonth}_w${safeWeek}`,
      dayNumber: 7,
      title: { en: 'Day 7: Full System Recovery', fa: 'روز ۷: بازسازی کامل سیستم عصبی' },
      description: { en: 'Active rest, mental reset, nutrition replenishment', fa: 'استراحت کامل، بازسازی ذخایر گلیکوژن و آمادگی' },
      targetFocus: 'Recovery',
      exercises: [],
      isRestDay: true
    });

  // =========================================================================
  // 3-DAY SPLIT: FULL BODY 3X (FOR 3 DAYS)
  // Day 1: Full Body A
  // Day 2: Rest
  // Day 3: Full Body B
  // Day 4: Rest
  // Day 5: Full Body C
  // Day 6: Rest
  // Day 7: Rest
  // =========================================================================
  } else {
    // Day 1: Full Body A
    days.push({
      id: `day_fb_1_m${safeMonth}_w${safeWeek}`,
      dayNumber: 1,
      title: { en: 'Day 1: Full Body A (Foundations)', fa: 'روز ۱: فول بادی A (بنیادین و قدرتی)' },
      description: { en: 'Chest block -> Back block -> Legs block -> Shoulders/Arms', fa: 'تفکیک متوالی: بلوک سینه ← بلوک پشت ← بلوک چهارسر ران ← همسترینگ ← سرشانه و بازو' },
      targetFocus: 'Chest, Back, Quads, Hamstrings, Delts, Arms',
      exercises: [
        { id: 'fb1_1', exerciseId: safeBenchPress, sets: mainSets, reps: primaryReps, restSeconds: compoundRest, targetRpe: primaryRpe },
        { id: 'fb1_2', exerciseId: 'lat_pulldown', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'fb1_3', exerciseId: safeBentRow, sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'fb1_4', exerciseId: quadPrimary, sets: mainSets, reps: primaryReps, restSeconds: compoundRest, targetRpe: primaryRpe },
        { id: 'fb1_5', exerciseId: isFemale ? 'hip_thrust' : 'romanian_deadlift_rdl', sets: lowerGluteSets, reps: lowerGluteReps, restSeconds: compoundRest, targetRpe: primaryRpe },
        { id: 'fb1_6', exerciseId: 'dumbbell_lateral_raise', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'fb1_7', exerciseId: 'barbell_bicep_curl', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'fb1_8', exerciseId: 'hanging_leg_raise', sets: 3, reps: '12-15', restSeconds: accessoryRest, targetRpe: primaryRpe }
      ]
    });

    // Day 2: Rest
    days.push({
      id: `day_fb_rest_1_m${safeMonth}_w${safeWeek}`,
      dayNumber: 2,
      title: { en: 'Day 2: Recovery & Adaptation', fa: 'روز ۲: استراحت و ریکاوری' },
      description: { en: 'Protein synthesis and systemic recovery', fa: 'سنتز پروتئین و استراحت مفاصل' },
      targetFocus: 'Recovery',
      exercises: [],
      isRestDay: true
    });

    // Day 3: Full Body B
    days.push({
      id: `day_fb_2_m${safeMonth}_w${safeWeek}`,
      dayNumber: 3,
      title: { en: 'Day 3: Full Body B (Hinge & Vertical Focus)', fa: 'روز ۳: فول بادی B (ددلیفت، پرس پا، سرشانه و بازو)' },
      description: { en: 'Legs -> Chest -> Back -> Shoulders & Triceps', fa: 'تفکیک متوالی: پرس پا و همسترینگ ← بالاسینه و فلای ← ددلیفت و لت ← سرشانه و پشت‌بازو' },
      targetFocus: 'Legs, Chest, Back, Delts, Triceps',
      exercises: [
        { id: 'fb2_1', exerciseId: 'leg_press', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'fb2_2', exerciseId: isFemale ? 'hip_thrust' : 'lying_leg_curl', sets: lowerGluteSets, reps: lowerGluteReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'fb2_3', exerciseId: 'incline_dumbbell_press', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'fb2_4', exerciseId: 'cable_chest_flyes', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'fb2_5', exerciseId: safeDeadlift, sets: 3, reps: isFemale ? '8-10' : '5-6', restSeconds: compoundRest + 30, targetRpe: primaryRpe },
        { id: 'fb2_6', exerciseId: 'lat_pulldown', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'fb2_7', exerciseId: safeOverhead, sets: accSets, reps: primaryReps, restSeconds: compoundRest, targetRpe: primaryRpe },
        { id: 'fb2_8', exerciseId: 'triceps_rope_pushdown', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe }
      ]
    });

    // Day 4: Rest
    days.push({
      id: `day_fb_rest_2_m${safeMonth}_w${safeWeek}`,
      dayNumber: 4,
      title: { en: 'Day 4: Systemic Regeneration', fa: 'روز ۴: بازسازی فیزیولوژیک' },
      description: { en: 'Cardiovascular health and tissue healing', fa: 'پیاده‌روی سبک و ترمیم بافت‌های عضلانی' },
      targetFocus: 'Recovery',
      exercises: [],
      isRestDay: true
    });

    // Day 5: Full Body C
    days.push({
      id: `day_fb_3_m${safeMonth}_w${safeWeek}`,
      dayNumber: 5,
      title: { en: 'Day 5: Full Body C (Hypertrophy & Density)', fa: 'روز ۵: فول بادی C (ضخامت پشت، سینه، اسکوات و ساق)' },
      description: { en: 'Back block -> Chest block -> Legs block -> Delts/Calves', fa: 'تفکیک متوالی: ردیف پارویی و قایقی ← پرس سینه دمبل ← اسکوات و جلوپا ← نشر جانب و ساق' },
      targetFocus: 'Back, Chest, Quads, Hamstrings, Delts, Calves',
      exercises: [
        { id: 'fb3_1', exerciseId: safeBentRow, sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'fb3_2', exerciseId: 'seated_cable_row', sets: accSets, reps: accessoryReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'fb3_3', exerciseId: 'dumbbell_bench_press', sets: mainSets, reps: hypertrophyReps, restSeconds: 90, targetRpe: primaryRpe },
        { id: 'fb3_4', exerciseId: 'cable_chest_flyes', sets: accSets, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'fb3_5', exerciseId: quadPrimary, sets: mainSets, reps: primaryReps, restSeconds: compoundRest, targetRpe: primaryRpe },
        { id: 'fb3_6', exerciseId: 'romanian_deadlift_rdl', sets: lowerGluteSets, reps: lowerGluteReps, restSeconds: compoundRest, targetRpe: primaryRpe },
        { id: 'fb3_7', exerciseId: 'dumbbell_lateral_raise', sets: 4, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe },
        { id: 'fb3_8', exerciseId: 'standing_calf_raise', sets: 4, reps: accessoryReps, restSeconds: accessoryRest, targetRpe: accessoryRpe }
      ]
    });

    // Day 6: Rest
    days.push({
      id: `day_fb_rest_3_m${safeMonth}_w${safeWeek}`,
      dayNumber: 6,
      title: { en: 'Day 6: Deep Rest', fa: 'روز ۶: استراحت کامل' },
      description: { en: 'Nutrient storage and recovery', fa: 'ریکاوری سیستم عصبی' },
      targetFocus: 'Recovery',
      exercises: [],
      isRestDay: true
    });

    // Day 7: Weekly Audit
    days.push({
      id: `day_fb_rest_4_m${safeMonth}_w${safeWeek}`,
      dayNumber: 7,
      title: { en: 'Day 7: Weekly Audit', fa: 'روز ۷: بررسی هفتگی' },
      description: { en: 'Review workout logs and plan progression', fa: 'بررسی پیشرفت هفتگی' },
      targetFocus: 'Recovery',
      exercises: [],
      isRestDay: true
    });
  }

  const planTitles: Record<number, { en: string; fa: string }> = {
    3: { en: `3-Day Scientific Full Body (M${safeMonth} - W${safeWeek})`, fa: `برنامه ۳ روزه علمی فول بادی (ماه ${safeMonth} - هفته ${safeWeek})` },
    4: { en: `4-Day Upper / Lower Periodized Split (M${safeMonth} - W${safeWeek})`, fa: `برنامه ۴ روزه بالاتنه / پایین‌تنه (ماه ${safeMonth} - هفته ${safeWeek})` },
    5: { en: `5-Day Scientific PPL Split (M${safeMonth} - W${safeWeek})`, fa: `برنامه ۵ روزه PPL علمی (ماه ${safeMonth} - هفته ${safeWeek})` },
    6: { en: `6-Day High-Frequency PPL Split (M${safeMonth} - W${safeWeek})`, fa: `برنامه ۶ روزه PPL پیشرفته (ماه ${safeMonth} - هفته ${safeWeek})` },
  };

  const basePlanTitle = planTitles[weeklyDays] || { en: `Custom Scientific Workout (M${safeMonth} - W${safeWeek})`, fa: `برنامه تمرینی اختصاصی (ماه ${safeMonth} - هفته ${safeWeek})` };

  const finalPlanName = isMyself6Months
    ? {
        en: `My 6-Month Trainee Hypertrophy Program (M${safeMonth} - W${safeWeek})`,
        fa: `برنامه تخصصی هایپرتروفی من (سابقه ۶ ماه تمرین باشگاهی - ماه ${safeMonth}، هفته ${safeWeek})`,
      }
    : isOtherBeginner
    ? {
        en: `Foundational Beginner Gym Program (M${safeMonth} - W${safeWeek})`,
        fa: `برنامه پایه‌ای و بنیادین مبتدی (شروع از صفر در باشگاه - ماه ${safeMonth}، هفته ${safeWeek})`,
      }
    : basePlanTitle;

  return {
    id: `plan_m${safeMonth}_w${safeWeek}_${Date.now()}`,
    name: finalPlanName,
    splitType,
    daysPerWeek: weeklyDays,
    days,
    createdAt: new Date().toISOString(),
    mesocyclePhase: mesoInfo.phase,
    mesocycleWeek: safeWeek,
    macrocycleMonth: safeMonth,
  };
}
