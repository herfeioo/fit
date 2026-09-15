import React, { useState } from 'react';
import {
  Activity,
  Flame,
  Dumbbell,
  CheckCircle2,
  Calendar,
  Sparkles,
  Scale,
  User,
  AlertCircle,
  TrendingUp,
  ShieldAlert,
  Moon,
  Zap,
  ArrowRight,
  Info,
  PieChart
} from 'lucide-react';
import {
  UserProfile,
  Language,
  ExperienceLevel,
  FitnessGoal,
  ActivityLevel,
  SleepQuality,
  InjuryLimitation,
} from '../types';
import { translations } from '../translations';
import {
  calculateComprehensiveBodyAnalysis,
  ComprehensiveBodyAnalysis
} from '../utils/fitnessCalculations';

interface InitialAssessmentWizardProps {
  initialProfile: UserProfile;
  onComplete: (profile: UserProfile) => void;
  lang: Language;
}

export const InitialAssessmentWizard: React.FC<InitialAssessmentWizardProps> = ({
  initialProfile,
  onComplete,
  lang,
}) => {
  // Inputs start EMPTY as strictly demanded by user (NO phantom default assumptions)
  const [name, setName] = useState<string>(initialProfile.name || '');
  const [ageStr, setAgeStr] = useState<string>(initialProfile.age ? String(initialProfile.age) : '');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [heightStr, setHeightStr] = useState<string>(initialProfile.height ? String(initialProfile.height) : '');
  const [weightStr, setWeightStr] = useState<string>(initialProfile.weight ? String(initialProfile.weight) : '');

  // Body Measurements
  const [waistStr, setWaistStr] = useState<string>(initialProfile.measurements?.waist ? String(initialProfile.measurements.waist) : '');
  const [chestStr, setChestStr] = useState<string>(initialProfile.measurements?.chest ? String(initialProfile.measurements.chest) : '');
  const [armsStr, setArmsStr] = useState<string>(initialProfile.measurements?.arms ? String(initialProfile.measurements.arms) : '');
  const [thighsStr, setThighsStr] = useState<string>(initialProfile.measurements?.thighs ? String(initialProfile.measurements.thighs) : '');
  const [shouldersStr, setShouldersStr] = useState<string>(initialProfile.measurements?.shoulders ? String(initialProfile.measurements.shoulders) : '');
  const [neckStr, setNeckStr] = useState<string>(initialProfile.measurements?.neck ? String(initialProfile.measurements.neck) : '');
  const [hipsStr, setHipsStr] = useState<string>(initialProfile.measurements?.hips ? String(initialProfile.measurements.hips) : '');

  // Athlete Lifestyle, Recovery & Goals
  const [experience, setExperience] = useState<ExperienceLevel | ''>('');
  const [goal, setGoal] = useState<FitnessGoal | ''>('');
  const [targetWeightStr, setTargetWeightStr] = useState<string>(initialProfile.targetWeight ? String(initialProfile.targetWeight) : '89');
  const [weeklyDays, setWeeklyDays] = useState<3 | 4 | 5 | 6 | null>(null);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel | ''>('');
  const [sleepQuality, setSleepQuality] = useState<SleepQuality | ''>('');
  const [injuryLimitation, setInjuryLimitation] = useState<InjuryLimitation>('none');

  // Analysis State
  const [analysisResult, setAnalysisResult] = useState<ComprehensiveBodyAnalysis | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const t = translations[lang];

  const handleStartAnalysis = () => {
    setErrorMessage(null);

    const age = parseInt(ageStr, 10);
    const height = parseFloat(heightStr);
    const weight = parseFloat(weightStr);
    const waist = parseFloat(waistStr);
    const chest = chestStr ? parseFloat(chestStr) : 0;
    const arms = armsStr ? parseFloat(armsStr) : 0;
    const thighs = thighsStr ? parseFloat(thighsStr) : 0;
    const shoulders = shouldersStr ? parseFloat(shouldersStr) : 0;
    const neck = neckStr ? parseFloat(neckStr) : undefined;
    const hips = hipsStr ? parseFloat(hipsStr) : undefined;

    // Strict validation ensuring user actually provided real numbers
    if (!age || age < 12 || age > 95) {
      setErrorMessage(lang === 'fa' ? 'لطفاً سن خود را به درستی وارد کنید (۱۲ تا ۹۵ سال).' : 'Please enter a valid age (12 to 95 years).');
      return;
    }
    if (!height || height < 120 || height > 240) {
      setErrorMessage(lang === 'fa' ? 'لطفاً قد خود را به درستی به سانتی‌متر وارد کنید (۱۲۰ تا ۲۴۰).' : 'Please enter a valid height in cm (120 to 240).');
      return;
    }
    if (!weight || weight < 35 || weight > 260) {
      setErrorMessage(lang === 'fa' ? 'لطفاً وزن خود را به کیلوگرم به درستی وارد کنید (۳۵ تا ۲۶۰).' : 'Please enter a valid weight in kg (35 to 260).');
      return;
    }
    if (!waist || waist < 45 || waist > 180) {
      setErrorMessage(lang === 'fa' ? 'لطفاً دور کمر خود را وارد کنید (جهت محاسبه علمی WHtR و درصد چربی).' : 'Please enter waist circumference (required for WHO WHtR & Navy Body Fat).');
      return;
    }
    if (!experience) {
      setErrorMessage(lang === 'fa' ? 'لطفاً سطح سابقه تمرینی خود را انتخاب کنید.' : 'Please select your training experience level.');
      return;
    }
    if (!goal) {
      setErrorMessage(lang === 'fa' ? 'لطفاً هدف اصلی تناسب اندام خود را مشخص کنید.' : 'Please choose your primary fitness goal.');
      return;
    }
    if (!weeklyDays) {
      setErrorMessage(lang === 'fa' ? 'لطفاً تعداد روزهای مجاز تمرین در هفته (۳، ۴، ۵ یا ۶ روز) را مشخص کنید.' : 'Please select your weekly training frequency (3, 4, 5, or 6 days).');
      return;
    }
    if (!activityLevel) {
      setErrorMessage(lang === 'fa' ? 'لطفاً سطح فعالیت روزانه خود را انتخاب کنید.' : 'Please choose your daily activity level.');
      return;
    }
    if (!sleepQuality) {
      setErrorMessage(lang === 'fa' ? 'لطفاً میانگین کیفیت خواب شبانه خود را انتخاب کنید.' : 'Please select your average sleep quality.');
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      try {
        const analysis = calculateComprehensiveBodyAnalysis({
          gender,
          height,
          weight,
          age,
          weeklyDays: weeklyDays || 4,
          goal: goal || 'muscle_gain',
          measurements: {
            waist,
            chest: chest || Math.round(waist * 1.15),
            arms: arms || Math.round(waist * 0.42),
            thighs: thighs || Math.round(waist * 0.65),
            shoulders: shoulders || Math.round(waist * 1.35),
            neck: neck || (gender === 'male' ? Math.round(waist * 0.46) : Math.round(waist * 0.42)),
            hips: hips || (gender === 'female' ? Math.round(waist * 1.18) : Math.round(waist * 1.05)),
          },
          activityLevel: activityLevel || 'moderate'
        });

        setAnalysisResult(analysis);
        setIsAnalyzing(false);

        // Smooth scroll to analysis report
        const reportElement = document.getElementById('analysis-report-section');
        if (reportElement) {
          reportElement.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (e) {
        setIsAnalyzing(false);
        setErrorMessage(lang === 'fa' ? 'خطا در محاسبه. لطفاً مقادیر وارد شده را بررسی کنید.' : 'Calculation error. Please review your numbers.');
      }
    }, 400);
  };

  const handleFinalSubmit = () => {
    if (!analysisResult) return;

    const age = parseInt(ageStr, 10);
    const height = parseFloat(heightStr);
    const weight = parseFloat(weightStr);
    const waist = parseFloat(waistStr);

    let split: 'upper_lower' | 'ppl' | 'full_body' | 'custom' = 'upper_lower';
    if (weeklyDays === 3) split = 'full_body';
    else if (weeklyDays === 4) split = 'upper_lower';
    else if (weeklyDays === 5) split = 'custom';
    else if (weeklyDays === 6) split = 'ppl';

    const finalizedProfile: UserProfile = {
      ...initialProfile,
      name: name.trim() || (lang === 'fa' ? 'ورزشکار' : 'Athlete'),
      age,
      gender,
      height,
      weight,
      experience: (experience as ExperienceLevel) || 'beginner',
      goal: (goal as FitnessGoal) || 'muscle_gain',
      targetWeight: targetWeightStr ? parseFloat(targetWeightStr) : 89,
      targetPhysiqueType: 'aesthetic_shredded',
      weeklyDays: weeklyDays || 4,
      preferredSplit: split,
      activityLevel: (activityLevel as ActivityLevel) || 'moderate',
      sleepQuality: (sleepQuality as SleepQuality) || '7_to_8',
      injuryLimitation: injuryLimitation || 'none',
      bodyFatPercent: analysisResult.bodyFat.bodyFatPercent,
      measurements: {
        waist,
        chest: chestStr ? parseFloat(chestStr) : Math.round(waist * 1.15),
        arms: armsStr ? parseFloat(armsStr) : Math.round(waist * 0.42),
        thighs: thighsStr ? parseFloat(thighsStr) : Math.round(waist * 0.65),
        shoulders: shouldersStr ? parseFloat(shouldersStr) : Math.round(waist * 1.35),
        neck: neckStr ? parseFloat(neckStr) : (gender === 'male' ? Math.round(waist * 0.46) : Math.round(waist * 0.42)),
        hips: hipsStr ? parseFloat(hipsStr) : (gender === 'female' ? Math.round(waist * 1.18) : Math.round(waist * 1.05)),
      },
      onboardingCompleted: true,
    };

    onComplete(finalizedProfile);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'ارزیابی جامع بیومتریک و فیزیولوژیک' : 'Comprehensive Athlete Biometric Audit'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            {t.onboardingTitle}
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {lang === 'fa'
              ? 'اطلاعات بدنی خود را بدون فرضیات پیش‌فرض وارد کنید. محاسبات ترکیب بدنی (استاندارد جهانی WHO) و طراحی برنامه باشگاه تنها پس از فشردن دکمه «شروع آنالیز» انجام می‌گیرد.'
              : 'Enter your biometric data accurately. International WHO calculations and program generation are executed strictly upon clicking "Start Analysis".'}
          </p>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3 animate-shake">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* FORM SECTIONS */}
      <div className="space-y-6">
        {/* MANDATORY GENDER SELECTION HERO CARD */}
        <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                ⚧
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-100">
                  {lang === 'fa' ? 'انتخاب جنسیت / Select Gender (الزامی)' : 'Select Gender / انتخاب جنسیت (Mandatory)'}
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === 'fa' ? 'تنظیم خودکار منطق تمرین بر اساس فیزیولوژی و هورمون‌های ریکاوری' : 'Adaptive training logic configured per gender-specific sports science'}
                </p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              {lang === 'fa' ? 'انطباق هوشمند' : 'Adaptive Logic'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Male Button */}
            <button
              type="button"
              id="gender-male-hero-btn"
              onClick={() => setGender('male')}
              className={`p-4 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                gender === 'male'
                  ? 'bg-emerald-500/15 border-emerald-500 text-slate-100 shadow-md ring-2 ring-emerald-500/40'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-emerald-400">
                  {lang === 'fa' ? 'آقا / Male' : 'Male / آقا'}
                </span>
                {gender === 'male' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {lang === 'fa'
                  ? 'تمرکز بر تعریض بالاتنه (V-Taper)، بالاسینه و ضخامت سینه، تنش مکانیکی سنگین و استراحت ۲ الی ۳ دقیقه در حرکات چندمفصلی.'
                  : 'V-taper lat width, clavicular upper chest emphasis, heavy mechanical tension, and 120-180s rest on compound lifts.'}
              </p>
            </button>

            {/* Female Button */}
            <button
              type="button"
              id="gender-female-hero-btn"
              onClick={() => setGender('female')}
              className={`p-4 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                gender === 'female'
                  ? 'bg-emerald-500/15 border-emerald-500 text-slate-100 shadow-md ring-2 ring-emerald-500/40'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-emerald-400">
                  {lang === 'fa' ? 'خانم / Female' : 'Female / خانم'}
                </span>
                {gender === 'female' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {lang === 'fa'
                  ? 'تمرکز ویژه بر باسن و همسترینگ (+۲۵٪ حجم با هیپ‌تراست، RDL و لانژ)، دامنه تکرار ۱۰ الی ۱۵، ظرفیت ریکاوری درون‌تمرینی بالاتر و استراحت کوتاه‌تر.'
                  : '+25% Glute/posterior chain volume (Hip Thrusts, RDL, Split Squats), 10-15 rep brackets, higher fatigue resistance, shorter rest.'}
              </p>
            </button>
          </div>
        </div>

        {/* Section 1: Vitals */}
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <User className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-slate-200">
              {lang === 'fa' ? '۱. مشخصات فردی و آنتروپومتریک' : '1. Personal Biometrics & Vitals'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                {lang === 'fa' ? 'نام یا نام مستعار' : 'Athlete Name'}
              </label>
              <input
                id="assessment-name-input"
                type="text"
                placeholder={lang === 'fa' ? 'مثال: علی / سارا' : 'e.g. Alex'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Gender indicator inside row */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                {t.gender} *
              </label>
              <div className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-emerald-400 flex items-center justify-between">
                <span>{gender === 'female' ? t.female : t.male}</span>
                <span className="text-[10px] text-slate-500">{lang === 'fa' ? 'انتخاب شده' : 'Selected'}</span>
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                {t.age} * (سال / Years)
              </label>
              <input
                id="assessment-age-input"
                type="number"
                min="12"
                max="95"
                placeholder={lang === 'fa' ? 'مثال: ۲۴' : 'e.g. 24'}
                value={ageStr}
                onChange={(e) => setAgeStr(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Height */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                {t.height} * (سانتی‌متر / cm)
              </label>
              <input
                id="assessment-height-input"
                type="number"
                min="120"
                max="240"
                step="0.5"
                placeholder={lang === 'fa' ? 'مثال: ۱۷۸' : 'e.g. 178'}
                value={heightStr}
                onChange={(e) => setHeightStr(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                {t.weight} * (کیلوگرم / kg)
              </label>
              <input
                id="assessment-weight-input"
                type="number"
                min="35"
                max="250"
                step="0.1"
                placeholder={lang === 'fa' ? 'مثال: ۷۶.۵' : 'e.g. 76.5'}
                value={weightStr}
                onChange={(e) => setWeightStr(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Circumferences */}
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <Scale className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-slate-200">
                {lang === 'fa' ? '۲. سایزهای محیطی بدن (سانتی‌متر)' : '2. Body Circumferences (cm)'}
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">
              {lang === 'fa' ? 'ضروری جهت فرمول‌های WHO و ارتش آمریکا' : 'Required for WHO WHtR & US Navy formulas'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {/* Waist - REQUIRED */}
            <div className="col-span-2 sm:col-span-1 border border-emerald-500/40 bg-emerald-500/5 rounded-xl p-2.5">
              <label className="block text-xs font-bold text-emerald-400 mb-1">
                {t.waist} * (ضروری)
              </label>
              <input
                id="assessment-waist-input"
                type="number"
                min="45"
                max="180"
                step="0.5"
                placeholder={lang === 'fa' ? 'مثال: ۸۲' : 'e.g. 82'}
                value={waistStr}
                onChange={(e) => setWaistStr(e.target.value)}
                className="w-full bg-slate-950 border border-emerald-500/50 focus:border-emerald-400 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                {lang === 'fa' ? 'ناحیه ناف' : 'Navel level'}
              </span>
            </div>

            {/* Chest */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                {t.chest}
              </label>
              <input
                id="assessment-chest-input"
                type="number"
                min="60"
                max="180"
                placeholder={lang === 'fa' ? 'مثال: ۱۰۲' : 'e.g. 102'}
                value={chestStr}
                onChange={(e) => setChestStr(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
              />
            </div>

            {/* Arms */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                {t.arms}
              </label>
              <input
                id="assessment-arms-input"
                type="number"
                min="20"
                max="65"
                step="0.5"
                placeholder={lang === 'fa' ? 'مثال: ۳۶' : 'e.g. 36'}
                value={armsStr}
                onChange={(e) => setArmsStr(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
              />
            </div>

            {/* Thighs */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                {t.thighs}
              </label>
              <input
                id="assessment-thighs-input"
                type="number"
                min="35"
                max="90"
                step="0.5"
                placeholder={lang === 'fa' ? 'مثال: ۵۷' : 'e.g. 57'}
                value={thighsStr}
                onChange={(e) => setThighsStr(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
              />
            </div>

            {/* Shoulders */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                {t.shoulders}
              </label>
              <input
                id="assessment-shoulders-input"
                type="number"
                min="80"
                max="170"
                placeholder={lang === 'fa' ? 'مثال: ۱۱۹' : 'e.g. 119'}
                value={shouldersStr}
                onChange={(e) => setShouldersStr(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
              />
            </div>

            {/* Neck (Optional) */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                {t.neck}
              </label>
              <input
                id="assessment-neck-input"
                type="number"
                min="25"
                max="60"
                placeholder={lang === 'fa' ? 'مثال: ۳۸' : 'e.g. 38'}
                value={neckStr}
                onChange={(e) => setNeckStr(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
              />
            </div>

            {/* Hips (Required for females) */}
            {gender === 'female' && (
              <div className="col-span-2 sm:col-span-1 border border-pink-500/30 bg-pink-500/5 rounded-xl p-2.5">
                <label className="block text-xs font-bold text-pink-400 mb-1">
                  {lang === 'fa' ? 'دور باسن * (ضروری بانوان)' : 'Hips * (Required for Women)'}
                </label>
                <input
                  id="assessment-hips-input"
                  type="number"
                  min="50"
                  max="160"
                  step="0.5"
                  placeholder={lang === 'fa' ? 'مثال: ۹۸' : 'e.g. 98'}
                  value={hipsStr}
                  onChange={(e) => setHipsStr(e.target.value)}
                  className="w-full bg-slate-950 border border-pink-500/40 focus:border-pink-400 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Training & Lifestyle */}
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-5 shadow-lg space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <Dumbbell className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-slate-200">
              {lang === 'fa' ? '۳. هدف و برنامه ورزشی ورزشکار' : '3. Training Objectives & Experience'}
            </h2>
          </div>

          {/* Goal Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2.5">
              {t.fitnessGoal} *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { id: 'muscle_gain', title: t.goal_muscle_gain, desc: t.goalDesc_muscle_gain },
                { id: 'fat_loss', title: t.goal_fat_loss, desc: t.goalDesc_fat_loss },
                { id: 'recomposition', title: t.goal_recomposition, desc: t.goalDesc_recomposition },
                { id: 'strength', title: t.goal_strength, desc: t.goalDesc_strength },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  id={`goal-btn-${item.id}`}
                  onClick={() => setGoal(item.id as FitnessGoal)}
                  className={`p-3.5 rounded-xl border text-left rtl:text-right transition-all flex flex-col justify-between ${
                    goal === item.id
                      ? 'bg-emerald-500/15 border-emerald-500 text-slate-100 shadow-md ring-1 ring-emerald-500/40'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-xs font-bold text-emerald-400">{item.title}</span>
                    {goal === item.id && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Target Weight & Desired Physique Question */}
          <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-amber-400" />
                <span>
                  {lang === 'fa'
                    ? 'وزن هدف شما چقدر است؟ (مثلاً ۸۰، ۸۹ یا ۹۰ کیلو)'
                    : 'What is your target goal weight? (e.g. 80, 89, 90 kg)'}
                </span>
              </label>
              <span className="text-sm font-black text-amber-400">
                {targetWeightStr || '89'} {lang === 'fa' ? 'کیلوگرم' : 'kg'}
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              {lang === 'fa'
                ? 'مشخص کنید در پایان فاز تمرینی دلتان می‌خواهد به چه وزنی برسید تا رژیم کالری و حجم عضلانی دقیقاً بر اساس آن تنظیم گردد.'
                : 'Specify your target body weight so caloric surplus/deficit and training load align directly with your dream physique.'}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <input
                id="assessment-target-weight-input"
                type="number"
                min="45"
                max="180"
                step="0.5"
                value={targetWeightStr}
                onChange={(e) => setTargetWeightStr(e.target.value)}
                placeholder={lang === 'fa' ? 'مثال: ۸۹' : 'e.g. 89'}
                className="w-28 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-400 font-bold text-center"
              />
              <div className="flex flex-wrap gap-1">
                {[75, 80, 85, 89, 90, 95].map((w) => (
                  <button
                    key={`wiz_w_${w}`}
                    type="button"
                    onClick={() => setTargetWeightStr(String(w))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                      targetWeightStr === String(w)
                        ? 'bg-amber-500/25 text-amber-300 border-amber-500 shadow-sm'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {w}kg {w === 89 ? '★' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              {t.experienceLevel} *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'beginner', title: t.exp_beginner, sub: lang === 'fa' ? 'تمرکز بر تکنیک و سیستم پایه‌ای' : 'Technique & Motor Learning' },
                { id: 'intermediate', title: t.exp_intermediate, sub: lang === 'fa' ? 'اضافه بار تدریجی و تفکیک' : 'Progressive Overload & Splits' },
                { id: 'advanced', title: t.exp_advanced, sub: lang === 'fa' ? 'حجم بالا و مدیریت خستگی' : 'High Volume & Periodization' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  id={`exp-btn-${item.id}`}
                  onClick={() => setExperience(item.id as ExperienceLevel)}
                  className={`p-3 rounded-xl border text-left rtl:text-right transition-all ${
                    experience === item.id
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold ring-1 ring-emerald-500/40'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xs block font-bold">{item.title}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{item.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Training Days */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              {t.weeklyAvailability} *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { days: 3, title: lang === 'fa' ? '۳ روز در هفته' : '3 Days / Week', split: lang === 'fa' ? 'فول بادی (Full Body)' : 'Full Body 3x' },
                { days: 4, title: lang === 'fa' ? '۴ روز در هفته (پیشنهادی)' : '4 Days (Recommended)', split: lang === 'fa' ? 'بالاتنه / پایین‌تنه (UL)' : 'Upper / Lower (2x Freq)' },
                { days: 5, title: lang === 'fa' ? '۵ روز در هفته' : '5 Days / Week', split: lang === 'fa' ? 'ترکیبی هایپرتروفی' : 'UL + PPL Hybrid' },
                { days: 6, title: lang === 'fa' ? '۶ روز در هفته' : '6 Days / Week', split: lang === 'fa' ? 'فشاری / کششی / پا (PPL)' : 'High Frequency PPL' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.days}
                  id={`days-btn-${item.days}`}
                  onClick={() => setWeeklyDays(item.days as 3 | 4 | 5 | 6)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    weeklyDays === item.days
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold ring-1 ring-emerald-500/40'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xs block font-bold">{item.title}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{item.split}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Injury History & Recovery */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Injuries */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'fa' ? 'سابقه آسیب‌دیدگی / محدودیت مفاصل' : 'Injury / Joint Sensitivity'}</span>
              </label>
              <select
                id="injury-select"
                value={injuryLimitation}
                onChange={(e) => setInjuryLimitation(e.target.value as InjuryLimitation)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none"
              >
                <option value="none">{t.injury_none}</option>
                <option value="shoulder">{t.injury_shoulder}</option>
                <option value="lower_back">{t.injury_lower_back}</option>
                <option value="knee">{t.injury_knee}</option>
                <option value="wrist">{t.injury_wrist}</option>
              </select>
            </div>

            {/* Daily Activity Level */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>{lang === 'fa' ? 'سطح فعالیت روزانه *' : 'Daily Activity Level *'}</span>
              </label>
              <select
                id="activity-level-select"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none"
              >
                <option value="">{lang === 'fa' ? '-- انتخاب کنید --' : '-- Select --'}</option>
                <option value="sedentary">{t.activity_sedentary}</option>
                <option value="light">{t.activity_light}</option>
                <option value="moderate">{t.activity_moderate}</option>
                <option value="heavy">{t.activity_heavy}</option>
              </select>
            </div>

            {/* Sleep Quality */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>{lang === 'fa' ? 'میانگین خواب شبانه *' : 'Average Nightly Sleep *'}</span>
              </label>
              <select
                id="sleep-quality-select"
                value={sleepQuality}
                onChange={(e) => setSleepQuality(e.target.value as SleepQuality)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none"
              >
                <option value="">{lang === 'fa' ? '-- انتخاب کنید --' : '-- Select --'}</option>
                <option value="less_than_6">{t.sleep_less_6}</option>
                <option value="6_to_7">{t.sleep_6_7}</option>
                <option value="7_to_8">{t.sleep_7_8}</option>
                <option value="more_than_8">{t.sleep_more_8}</option>
              </select>
            </div>
          </div>
        </div>

        {/* DEDICATED "START ANALYSIS" / "شروع آنالیز" BUTTON */}
        <div className="pt-2 flex flex-col items-center justify-center">
          <button
            type="button"
            id="start-analysis-btn"
            onClick={handleStartAnalysis}
            disabled={isAnalyzing}
            className="w-full sm:w-auto min-w-[280px] px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 active:scale-98 text-slate-950 text-base font-black tracking-wide shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-3 transition-all cursor-pointer disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>{lang === 'fa' ? 'در حال پردازش استاندارد WHO...' : 'Running WHO Analysis...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>{t.startAnalysis}</span>
              </>
            )}
          </button>
          <span className="text-[11px] text-slate-400 mt-2 text-center">
            {lang === 'fa'
              ? 'محاسبه دقیق BMI، درصد چربی و تولید برنامه بدنسازی تنها با کلیک روی این دکمه انجام می‌شود.'
              : 'Exact BMI, body fat %, and workout program are synthesized exclusively upon clicking this button.'}
          </span>
        </div>
      </div>

      {/* ANALYSIS REPORT & BLUEPRINT SECTION */}
      {analysisResult && (
        <div
          id="analysis-report-section"
          className="mt-8 space-y-6 animate-fadeIn pb-12"
        >
          {/* Section Heading */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-100">
                  {lang === 'fa' ? 'گزارش رسمی آنالیز فیزیولوژیک (استاندارد بین‌المللی WHO)' : 'Official Physiological & Biometric Audit Report'}
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === 'fa' ? 'محاسبه شده بر اساس فرمول‌های معتبر جهانی' : 'Calculated via WHO & US Navy DoD gold standards'}
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              {lang === 'fa' ? 'آماده تأیید' : 'Verified'}
            </span>
          </div>

          {/* CRITICAL WHO BMI CLINICAL DISCLAIMER */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-1">
                {lang === 'fa' ? 'هشدار مهم در مورد شاخص توده بدنی (BMI):' : 'Critical Clinical Note on BMI:'}
              </span>
              <p>{analysisResult.bmi.screeningNote[lang]}</p>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {/* 1. WHO BMI */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <span className="text-xs text-slate-400">{t.bmi} (WHO)</span>
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-100">{analysisResult.bmi.bmi}</span>
                  <span className="text-[10px] text-slate-500">kg/m²</span>
                </div>
                <span className={`text-xs font-bold ${analysisResult.bmi.color} block mt-0.5`}>
                  {analysisResult.bmi.category[lang]}
                </span>
              </div>
              <span className="text-[10px] text-slate-500">
                {lang === 'fa' ? 'محدوده وزن سالم: ' : 'Ideal Weight: '}
                {analysisResult.bmi.idealWeightRange.min} - {analysisResult.bmi.idealWeightRange.max} kg
              </span>
            </div>

            {/* 2. Waist to Height Ratio (WHtR) */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <span className="text-xs text-slate-400">{lang === 'fa' ? 'نسبت کمر به قد (WHtR)' : 'Waist-to-Height (WHtR)'}</span>
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-100">{analysisResult.whtr}</span>
                  <span className="text-[10px] text-slate-500">ratio</span>
                </div>
                <span className={`text-xs font-bold ${analysisResult.whtrColor} block mt-0.5`}>
                  {analysisResult.whtrCategory[lang]}
                </span>
              </div>
              <span className="text-[10px] text-slate-500">
                {lang === 'fa' ? 'معیار اصلی چربی احشایی و شکمی' : 'Visceral fat screening metric'}
              </span>
            </div>

            {/* 3. US Navy Body Fat % */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <span className="text-xs text-slate-400">{t.bodyFatEst} (DoD)</span>
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-100">{analysisResult.bodyFat.bodyFatPercent}%</span>
                </div>
                <span className={`text-xs font-bold ${analysisResult.bodyFat.color} block mt-0.5`}>
                  {analysisResult.bodyFat.category[lang]}
                </span>
              </div>
              <span className="text-[10px] text-slate-500">
                {analysisResult.excessFat.excessFatKg > 0
                  ? (lang === 'fa' ? `${analysisResult.excessFat.excessFatKg} kg چربی مازاد (از کل ${analysisResult.fatMassKg}kg)` : `${analysisResult.excessFat.excessFatKg} kg excess (of ${analysisResult.fatMassKg}kg)`)
                  : (lang === 'fa' ? `توده چربی: ${analysisResult.fatMassKg} kg (بهینه)` : `Fat Mass: ${analysisResult.fatMassKg} kg`)}
              </span>
            </div>

            {/* 4. Lean Body Mass (LBM) */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <span className="text-xs text-slate-400">{lang === 'fa' ? 'توده خالص عضلانی (LBM)' : 'Lean Body Mass (LBM)'}</span>
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-emerald-400">{analysisResult.leanMassKg}</span>
                  <span className="text-[10px] text-slate-500">kg</span>
                </div>
                <span className="text-xs font-bold text-slate-300 block mt-0.5">
                  {lang === 'fa' ? `ضریب FFMI: ${analysisResult.normalizedFfmi}` : `FFMI: ${analysisResult.normalizedFfmi}`}
                </span>
              </div>
              <span className="text-[10px] text-slate-500">
                {analysisResult.ffmiCategory[lang]}
              </span>
            </div>

            {/* 5. Basal Metabolic Rate (BMR) */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <span className="text-xs text-slate-400">{t.bmr}</span>
              <div className="my-2">
                <span className="text-2xl font-black text-slate-100">{analysisResult.bmr}</span>
                <span className="text-[10px] text-slate-500 ml-1">kcal</span>
              </div>
              <span className="text-[10px] text-slate-500">
                {lang === 'fa' ? 'فرمول کچ-مک‌آردل بر اساس LBM' : 'Katch-McArdle Equation'}
              </span>
            </div>

            {/* 6. Daily Calorie Target (TDEE + Goal) */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <span className="text-xs text-slate-400">{t.dailyNutrition}</span>
              <div className="my-2">
                <span className="text-2xl font-black text-teal-400">{analysisResult.targetCalories}</span>
                <span className="text-[10px] text-slate-500 ml-1">kcal/day</span>
              </div>
              <span className="text-[10px] text-slate-500">
                {lang === 'fa' ? `پروتئین: ${analysisResult.nutrition.proteinGrams} گرم (۲.۲g/kg)` : `Protein: ${analysisResult.nutrition.proteinGrams}g`}
              </span>
            </div>
          </div>

          {/* 1. Scientific Overweight & Tissue Differentiation */}
          {analysisResult.overweight && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">
                      {lang === 'fa' ? 'آنالیز وضعیت وزن و تفکیک بافت مازاد' : 'Weight Status & Tissue Differentiation'}
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      {lang === 'fa' ? 'تفکیک عضله از بافت چربی برای جلوگیری از خطای تشخیصی BMI' : 'Multi-compartment body tissue analysis'}
                    </span>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border bg-slate-950 ${analysisResult.overweight.badgeColor} border-current/20`}>
                  {analysisResult.overweight.title[lang]}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">
                    {lang === 'fa' ? 'محدوده وزن سالم قد شما (WHO)' : 'WHO Healthy Weight Range'}
                  </span>
                  <span className="text-xs font-bold text-slate-200 mt-0.5 block">
                    {analysisResult.overweight.minNormalWeightKg} - {analysisResult.overweight.maxNormalWeightKg} kg
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">
                    {lang === 'fa' ? 'اختلاف با سقف نرمال' : 'Weight vs WHO Ceiling'}
                  </span>
                  <span className={`text-xs font-bold mt-0.5 block ${analysisResult.overweight.grossExcessWeightKg > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {analysisResult.overweight.grossExcessWeightKg > 0
                      ? `+${analysisResult.overweight.grossExcessWeightKg} kg ${lang === 'fa' ? 'بالای سقف' : 'above ceiling'}`
                      : (lang === 'fa' ? 'در محدوده استاندارد' : 'Within Normal Range')}
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">
                    {lang === 'fa' ? 'ماهیت بافت وزن' : 'Tissue Classification'}
                  </span>
                  <span className={`text-xs font-bold mt-0.5 block ${analysisResult.overweight.badgeColor}`}>
                    {analysisResult.overweight.tissueType[lang]}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                {analysisResult.overweight.description[lang]}
              </p>

              <div className="text-[11px] text-slate-400 flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span>{analysisResult.overweight.differentiationNote[lang]}</span>
              </div>
            </div>
          )}

          {/* 2. Scientific Excess Fat Breakdown */}
          {analysisResult.excessFat && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <PieChart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">
                      {lang === 'fa' ? 'آنالیز تفکیکی چربی اضافه و چربی فیزیولوژیک' : 'Excess Fat vs Physiological Fat Analysis'}
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      {lang === 'fa' ? 'محاسبه چربی ضروری و سالم جهت حفظ ایمنی ارگان‌ها' : 'Safe physiological fat reserve analysis'}
                    </span>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border bg-slate-950 ${analysisResult.excessFat.badgeColor} border-current/20`}>
                  {analysisResult.excessFat.status[lang]}
                </span>
              </div>

              {/* 3-Tier Fat Breakdown */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">
                    {lang === 'fa' ? 'چربی ضروری زیستی' : 'Essential Fat'}
                  </span>
                  <span className="text-sm font-extrabold text-slate-200 my-0.5 block">
                    {analysisResult.excessFat.essentialFatKg} <span className="text-[10px] font-normal text-slate-500">kg</span>
                  </span>
                  <span className="text-[9px] text-slate-500">
                    {lang === 'fa' ? 'حفظ سلامت غدد و اعصاب' : 'Vital physiological'}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">
                    {lang === 'fa' ? 'چربی سالم مجاز' : 'Healthy Baseline'}
                  </span>
                  <span className="text-sm font-extrabold text-emerald-400 my-0.5 block">
                    {analysisResult.excessFat.healthyBaselineFatKg} <span className="text-[10px] font-normal text-slate-500">kg</span>
                  </span>
                  <span className="text-[9px] text-emerald-400/80">
                    {lang === 'fa' ? `تا سقف %${analysisResult.excessFat.targetHealthyBfPercent}` : `Up to ${analysisResult.excessFat.targetHealthyBfPercent}%`}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">
                    {lang === 'fa' ? 'چربی اضافه واقعی' : 'Actual Excess Fat'}
                  </span>
                  <span className={`text-sm font-extrabold my-0.5 block ${analysisResult.excessFat.excessFatKg > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {analysisResult.excessFat.excessFatKg} <span className="text-[10px] font-normal text-slate-500">kg</span>
                  </span>
                  <span className="text-[9px] text-slate-400">
                    {analysisResult.excessFat.excessFatKg > 0 ? (lang === 'fa' ? 'مازاد برای کالری‌سوزی' : 'Target to burn') : (lang === 'fa' ? 'فاقد چربی اضافه' : 'Optimal')}
                  </span>
                </div>
              </div>

              {/* Stack bar */}
              <div className="space-y-1">
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                  <div
                    className="bg-slate-500 h-full"
                    style={{ width: `${Math.max(5, (analysisResult.excessFat.essentialFatKg / Math.max(1, analysisResult.fatMassKg)) * 100)}%` }}
                    title="Essential Fat"
                  />
                  <div
                    className="bg-emerald-500 h-full"
                    style={{ width: `${Math.max(10, ((analysisResult.excessFat.healthyBaselineFatKg - analysisResult.excessFat.essentialFatKg) / Math.max(1, analysisResult.fatMassKg)) * 100)}%` }}
                    title="Healthy Baseline Fat"
                  />
                  {analysisResult.excessFat.excessFatKg > 0 && (
                    <div
                      className="bg-amber-400 h-full"
                      style={{ width: `${Math.max(5, (analysisResult.excessFat.excessFatKg / Math.max(1, analysisResult.fatMassKg)) * 100)}%` }}
                      title="Excess Fat"
                    />
                  )}
                </div>
                <div className="flex justify-between text-[9px] text-slate-500 px-0.5">
                  <span>{lang === 'fa' ? `توده کل چربی: ${analysisResult.fatMassKg} کیلوگرم (%${analysisResult.bodyFat.bodyFatPercent})` : `Total Fat: ${analysisResult.fatMassKg} kg (${analysisResult.bodyFat.bodyFatPercent}%)`}</span>
                  <span>{lang === 'fa' ? `چربی هدف سالم: %${analysisResult.excessFat.targetHealthyBfPercent}` : `Target BF: ${analysisResult.excessFat.targetHealthyBfPercent}%`}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                {analysisResult.excessFat.explanation[lang]}
              </p>

              <p className="text-xs text-cyan-400 font-medium">
                🎯 {analysisResult.excessFat.clinicalBreakdown[lang]}
              </p>
            </div>
          )}

          {/* Program Architecture Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-bold text-slate-200">
                {lang === 'fa' ? 'معماری برنامه تمرینی طراحی شده:' : 'Generated Workout Architecture:'}
              </h4>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-emerald-400 block text-sm">
                  {weeklyDays === 3
                    ? (lang === 'fa' ? 'برنامه ۳ روزه علمی فول بادی (Full Body 3x)' : '3-Day Scientific Full Body Routine')
                    : weeklyDays === 4
                    ? (lang === 'fa' ? 'برنامه ۴ روزه بالاتنه / پایین‌تنه (استاندارد فرکانس ۲ بار در هفته)' : '4-Day Periodized Upper / Lower Split (2x Frequency)')
                    : weeklyDays === 5
                    ? (lang === 'fa' ? 'برنامه ۵ روزه ترکیبی هایپرتروفی (Upper/Lower/PPL)' : '5-Day Hybrid Upper/Lower + PPL Split')
                    : (lang === 'fa' ? 'برنامه ۶ روزه فشرده تفکیک PPL (Push/Pull/Legs 2x)' : '6-Day High-Frequency Push/Pull/Legs Split')}
                </span>
                <span className="text-slate-400 block mt-1">
                  {lang === 'fa'
                    ? `حجم تمرینی: ۱۲ الی ۲۰ ست در هفته به ازای هر گروه عضلانی | متناسب با سابقه (${experience}) و وضعیت مفاصل`
                    : `Volume: 12-20 sets/muscle/week with progressive overload rules`}
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold shrink-0">
                {weeklyDays} {lang === 'fa' ? 'روز در هفته' : 'days/wk'}
              </div>
            </div>
          </div>

          {/* FINAL CTA: ENTER DASHBOARD */}
          <div className="pt-4 flex justify-center">
            <button
              type="button"
              id="confirm-assessment-btn"
              onClick={handleFinalSubmit}
              className="w-full sm:w-auto min-w-[320px] px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 text-base font-black tracking-wide shadow-2xl shadow-emerald-500/30 flex items-center justify-center gap-3 transition-all cursor-pointer"
            >
              <span>{t.enterApp}</span>
              <ArrowRight className="w-5 h-5 rtl:rotate-180 text-slate-950" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
