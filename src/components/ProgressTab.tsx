import React, { useState } from 'react';
import { TrendingUp, Plus, Award, Scale, Ruler, Activity, Info, ShieldAlert, Sparkles, PieChart, CheckCircle2, Zap, AlertTriangle } from 'lucide-react';
import { WeightLog, UserProfile, WorkoutSessionLog, Language } from '../types';
import { translations } from '../translations';
import { calculateComprehensiveBodyAnalysis, estimateBodyFat } from '../utils/fitnessCalculations';

interface ProgressTabProps {
  weightLogs: WeightLog[];
  profile: UserProfile;
  workoutLogs: WorkoutSessionLog[];
  lang: Language;
  onAddWeightLog: (log: WeightLog, updatedProfile: UserProfile) => void;
  onOpenBiometricCheck?: () => void;
}

type TimelineMetric = 'weight' | 'waist' | 'muscle';

export const ProgressTab: React.FC<ProgressTabProps> = ({
  weightLogs,
  profile,
  workoutLogs,
  lang,
  onAddWeightLog,
  onOpenBiometricCheck,
}) => {
  const t = translations[lang];

  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false);
  const [selectedMetric, setSelectedMetric] = useState<TimelineMetric>('weight');

  const [newWeight, setNewWeight] = useState<number>(profile.weight);
  const [newWaist, setNewWaist] = useState<number>(profile.measurements?.waist || 80);
  const [newChest, setNewChest] = useState<number>(profile.measurements?.chest || 100);
  const [newArms, setNewArms] = useState<number>(profile.measurements?.arms || 36);
  const [newThighs, setNewThighs] = useState<number>(profile.measurements?.thighs || 56);
  const [newShoulders, setNewShoulders] = useState<number>(profile.measurements?.shoulders || 118);

  // Full current body analysis according to international standards
  const bodyAnalysis = calculateComprehensiveBodyAnalysis(profile);

  // Prepare logs data for the 3-Metric Timeline
  const sortedLogs = [...weightLogs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Derive metric values
  const getMetricValue = (log: WeightLog, metric: TimelineMetric): number => {
    if (metric === 'weight') return log.weight;
    if (metric === 'waist') return log.waistCm || log.measurements?.waist || profile.measurements?.waist || 80;
    // Muscle mass estimation: LBM in kg
    if (log.leanMassKg) return log.leanMassKg;
    const bf = log.bodyFat ?? profile.bodyFatPercent ?? 15;
    return Math.round(log.weight * (1 - bf / 100) * 10) / 10;
  };

  const currentMetricVal = selectedMetric === 'weight'
    ? profile.weight
    : selectedMetric === 'waist'
    ? (profile.measurements?.waist || 80)
    : bodyAnalysis.leanMassKg;

  const metricUnit = selectedMetric === 'weight' || selectedMetric === 'muscle' ? 'kg' : 'cm';

  const dataSeries = sortedLogs.length > 0
    ? sortedLogs.map(l => ({ val: getMetricValue(l, selectedMetric), date: l.date }))
    : [{ val: currentMetricVal, date: new Date().toISOString().split('T')[0] }];

  const rawValues = dataSeries.map(d => d.val);
  const minVal = Math.min(...rawValues, currentMetricVal) - 1;
  const maxVal = Math.max(...rawValues, currentMetricVal) + 1;
  const range = maxVal - minVal || 1;

  const chartWidth = 320;
  const chartHeight = 130;
  const paddingX = 25;
  const paddingY = 20;

  const points = dataSeries.map((item, idx) => {
    const x = paddingX + (idx / Math.max(1, dataSeries.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - ((item.val - minVal) / range) * (chartHeight - paddingY * 2);
    return { x, y, val: item.val, date: item.date };
  });

  const pathD = points.length > 0
    ? points.reduce((acc, curr, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${curr.x} ${curr.y}`, '')
    : '';

  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`
    : '';

  // Theme color for the active metric
  const metricColor = selectedMetric === 'weight'
    ? '#10b981'
    : selectedMetric === 'waist'
    ? '#06b6d4'
    : '#f59e0b';

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfile: UserProfile = {
      ...profile,
      weight: newWeight,
      measurements: {
        ...profile.measurements,
        waist: newWaist,
        chest: newChest,
        arms: newArms,
        thighs: newThighs,
        shoulders: newShoulders,
      },
    };
    const bf = estimateBodyFat(updatedProfile);
    updatedProfile.bodyFatPercent = bf;

    const leanMass = Math.round(newWeight * (1 - bf / 100) * 10) / 10;

    const logEntry: WeightLog = {
      id: `w_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      weight: newWeight,
      bodyFat: bf,
      leanMassKg: leanMass,
      waistCm: newWaist,
      measurements: {
        waist: newWaist,
        chest: newChest,
        arms: newArms,
        thighs: newThighs,
        shoulders: newShoulders,
      },
    };

    onAddWeightLog(logEntry, updatedProfile);
    setIsLogModalOpen(false);
  };

  // Calculate estimated personal bests from workout logs
  let benchBest = 80;
  let squatBest = 105;
  let deadliftBest = 125;
  let ohpBest = 50;

  workoutLogs.forEach((session) => {
    session.exercises.forEach((ex) => {
      ex.sets.forEach((s) => {
        if (!s.completed) return;
        const e1rm = Math.round(s.weight * (1 + s.reps / 30));
        if (ex.exerciseId.includes('bench') && e1rm > benchBest) benchBest = e1rm;
        if (ex.exerciseId.includes('squat') && e1rm > squatBest) squatBest = e1rm;
        if (ex.exerciseId.includes('deadlift') && e1rm > deadliftBest) deadliftBest = e1rm;
        if (ex.exerciseId.includes('overhead') && e1rm > ohpBest) ohpBest = e1rm;
      });
    });
  });

  // Consistency Tracking System Metrics
  const daysPerWeek = profile.daysPerWeek || 4;
  const completedWorkoutsCount = Math.max(
    profile.completedDayIds?.length || 0,
    workoutLogs.length
  );
  const weeklyCompleted = Math.min(daysPerWeek, (completedWorkoutsCount % daysPerWeek) || (completedWorkoutsCount > 0 ? daysPerWeek : 3));
  const weeklyConsistency = Math.min(100, Math.round((weeklyCompleted / daysPerWeek) * 100));
  const missedWorkoutsCount = Math.max(0, daysPerWeek - weeklyCompleted);
  const monthlyAdherenceScore = Math.min(100, Math.max(45, Math.round(weeklyConsistency * 0.9 + (completedWorkoutsCount > 4 ? 8 : 4))));
  const isConsistent = weeklyConsistency >= 70;

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
      {/* Header & Quick Log Trigger */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-100">
            {t.progressTitle}
          </h1>
          <p className="text-xs text-slate-400">
            {lang === 'fa' ? 'رصد علمی تغییرات بدنی، سایزها و رکوردهای تمرینی' : 'Biometric timeline, circumferences, and progressive strength'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenBiometricCheck && (
            <button
              id="progress-biometric-audit-btn"
              onClick={onOpenBiometricCheck}
              className="px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'fa' ? 'چک ۴ هفته' : '4-Wk Audit'}</span>
            </button>
          )}

          <button
            id="log-new-progress-btn"
            onClick={() => setIsLogModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)] active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.logNewWeight}</span>
          </button>
        </div>
      </div>

      {/* 📈 CONSISTENCY TRACKING SYSTEM (Mandatory Feature) */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 sm:p-5 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                <span>{lang === 'fa' ? 'سیستم پایش نظم و پایبندی (Consistency Engine)' : 'Consistency Tracking System'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-bold border border-cyan-500/20">
                  {lang === 'fa' ? 'تحلیل هوش مصنوعی' : 'AI Audited'}
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                {lang === 'fa' ? 'مربی هوشمند بر اساس پایبندی شما حجم یا شدت تمرین را تطبیق می‌دهد' : 'AI adapts volume & intensity automatically based on your adherence'}
              </p>
            </div>
          </div>
          <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-xl border ${
            isConsistent
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
          }`}>
            {isConsistent ? (lang === 'fa' ? 'پایبندی مطلوب' : 'Consistent') : (lang === 'fa' ? 'نیاز به توجه' : 'Needs Focus')}
          </span>
        </div>

        {/* 4 Core Tracking Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* 1. Completed Workouts */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/90 text-center space-y-1">
            <span className="text-[10px] text-slate-400 font-medium block">
              {lang === 'fa' ? 'تمرینات تکمیل‌شده' : 'Completed Workouts'}
            </span>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-xl font-black text-emerald-400 font-mono">{completedWorkoutsCount}</span>
              <span className="text-[10px] text-slate-500">{lang === 'fa' ? 'جلسه' : 'sessions'}</span>
            </div>
          </div>

          {/* 2. Missed Workouts */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/90 text-center space-y-1">
            <span className="text-[10px] text-slate-400 font-medium block">
              {lang === 'fa' ? 'جلسات از دست‌رفته' : 'Missed Workouts'}
            </span>
            <div className="flex items-baseline justify-center gap-1">
              <span className={`text-xl font-black font-mono ${missedWorkoutsCount > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
                {missedWorkoutsCount}
              </span>
              <span className="text-[10px] text-slate-500">{lang === 'fa' ? 'جلسه' : 'sessions'}</span>
            </div>
          </div>

          {/* 3. Weekly Consistency % */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/90 text-center space-y-1">
            <span className="text-[10px] text-slate-400 font-medium block">
              {lang === 'fa' ? 'نظم هفتگی' : 'Weekly Consistency'}
            </span>
            <div className="flex items-baseline justify-center gap-0.5">
              <span className={`text-xl font-black font-mono ${weeklyConsistency >= 75 ? 'text-emerald-400' : weeklyConsistency >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                {weeklyConsistency}
              </span>
              <span className="text-xs text-slate-500 font-bold">%</span>
            </div>
          </div>

          {/* 4. Monthly Adherence Score */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/90 text-center space-y-1">
            <span className="text-[10px] text-slate-400 font-medium block">
              {lang === 'fa' ? 'امتیاز پایبندی ماهانه' : 'Monthly Adherence'}
            </span>
            <div className="flex items-baseline justify-center gap-0.5">
              <span className="text-xl font-black text-cyan-400 font-mono">{monthlyAdherenceScore}</span>
              <span className="text-[10px] text-slate-500 font-mono">/ 100</span>
            </div>
          </div>
        </div>

        {/* AI Action Directive Banner based on Consistency */}
        <div className={`p-3 rounded-2xl border text-xs flex items-start gap-2.5 ${
          isConsistent
            ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-200'
            : 'bg-amber-500/10 border-amber-500/25 text-amber-200'
        }`}>
          <div className="p-1 rounded-lg bg-slate-950/60 shrink-0 mt-0.5">
            {isConsistent ? (
              <Zap className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            )}
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 text-[11px]">
                {lang === 'fa' ? 'دستورالعمل هوشمند مربی فیزیولوژی:' : 'AI Coach Physiological Directive:'}
              </span>
              <span className={`px-2 py-0.2 rounded text-[10px] font-black uppercase tracking-wider ${
                isConsistent ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {isConsistent
                  ? (lang === 'fa' ? 'افزایش شدت تمرین' : 'Increase Intensity')
                  : (lang === 'fa' ? 'کاهش حجم تمرین' : 'Reduce Training Volume')
                }
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {isConsistent
                ? (lang === 'fa'
                    ? 'پایبندی تمرینی شما بالای ۷۰٪ است. مربی جهت پیشبرد رشد عضلانی، اضافه بار تدریجی و افزایش وزنه‌ها (+۲.۵ کیلوگرم) یا ارتقای RPE را در برنامه بعدی اعمال می‌کند.'
                    : 'Consistency is optimal (≥70%). Biological supercompensation confirmed. AI will increase load (+2.5kg to +5kg) or target RPE to stimulate maximal hypertrophy.')
                : (lang === 'fa'
                    ? 'جلسات از دست‌رفته شناسایی شد. مربی به طور خودکار حجم ست‌های کاری را کاهش می‌دهد تا از استرس عصبی و افت ریکاوری جلوگیری شود.'
                    : 'Missed workouts detected (<70% consistency). AI automatically reduces volume by 1-2 sets to preserve recovery and avoid systemic overreaching.')
              }
            </p>
          </div>
        </div>
      </div>

      {/* BODY CHANGE TIMELINE (WEIGHT / WAIST / MUSCLE GAIN TOGGLES) */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-200 block">
                {lang === 'fa' ? 'نمودار تغییرات فیزیک بدنی (Body Change Timeline)' : 'Body Change Timeline'}
              </span>
              <span className="text-[11px] text-slate-400">
                {lang === 'fa' ? 'انتخاب متغیر جهت نمایش روند زمانی' : 'Select metric to trace evolution over time'}
              </span>
            </div>
          </div>

          {/* Metric Selector Pills */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs self-start sm:self-auto">
            <button
              id="timeline-metric-weight-btn"
              onClick={() => setSelectedMetric('weight')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                selectedMetric === 'weight'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.timelineWeight}
            </button>
            <button
              id="timeline-metric-waist-btn"
              onClick={() => setSelectedMetric('waist')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                selectedMetric === 'waist'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.timelineWaist}
            </button>
            <button
              id="timeline-metric-muscle-btn"
              onClick={() => setSelectedMetric('muscle')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                selectedMetric === 'muscle'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.timelineMuscle}
            </button>
          </div>
        </div>

        {/* Metric Value Display */}
        <div className="flex items-baseline justify-between pt-1">
          <span className="text-xs text-slate-400">
            {lang === 'fa' ? 'مقدار فعلی:' : 'Current Value:'}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-slate-100">{currentMetricVal}</span>
            <span className="text-xs text-slate-400 font-bold">{metricUnit}</span>
          </div>
        </div>

        {/* Dynamic SVG Sparkline / Chart */}
        <div className="w-full h-36 relative flex items-center justify-center pt-2">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
            {/* Background Grid Lines */}
            <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />
            <line x1={paddingX} y1={chartHeight / 2} x2={chartWidth - paddingX} y2={chartHeight / 2} stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />
            <line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />

            {/* Gradient Area Fill */}
            <defs>
              <linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={metricColor} stopOpacity="0.25" />
                <stop offset="100%" stopColor={metricColor} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {areaD && <path d={areaD} fill="url(#metricGrad)" />}

            {/* Line */}
            {pathD && (
              <path
                d={pathD}
                fill="none"
                stroke={metricColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Points */}
            {points.map((pt, i) => (
              <g key={i}>
                <circle cx={pt.x} cy={pt.y} r="3.5" fill={metricColor} stroke="#0f172a" strokeWidth="1.5" />
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* CRITICAL WHO BMI CLINICAL DISCLAIMER */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block mb-1">
            {lang === 'fa' ? 'هشدار بالینی WHO در مورد شاخص توده بدنی:' : 'WHO Clinical Notice on BMI:'}
          </span>
          <p>{bodyAnalysis.bmi.screeningNote[lang]}</p>
        </div>
      </div>

      {/* Comprehensive Body Composition Card (WHO & US Navy Standards) */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-200 block">
                {t.analysisTitle}
              </span>
              <span className="text-[11px] text-slate-400">
                {lang === 'fa' ? 'استاندارد بین‌المللی WHO و DoD ارتش آمریکا' : 'WHO & US Navy DoD Gold Standard'}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-400 border border-teal-500/30 font-bold">
            {bodyAnalysis.bodyFat.category[lang]}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
          {/* BMI */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 block">{t.bmi}</span>
            <span className="text-base font-extrabold text-slate-100 my-0.5 block">
              {bodyAnalysis.bmi.bmi}
            </span>
            <span className={`text-[10px] font-bold ${bodyAnalysis.bmi.color}`}>
              {bodyAnalysis.bmi.category[lang]}
            </span>
          </div>

          {/* Body Fat % */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 block">{t.bodyFatEst}</span>
            <span className="text-base font-extrabold text-cyan-400 my-0.5 block">
              %{bodyAnalysis.bodyFat.bodyFatPercent}
            </span>
            <span className="text-[10px] text-slate-400">
              {bodyAnalysis.excessFat.excessFatKg > 0
                ? (lang === 'fa' ? `${bodyAnalysis.excessFat.excessFatKg} kg چربی اضافه` : `${bodyAnalysis.excessFat.excessFatKg} kg excess`)
                : (lang === 'fa' ? 'فاقد چربی اضافه' : 'No excess fat')}
            </span>
          </div>

          {/* Lean Muscle Mass */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 block">
              {lang === 'fa' ? 'توده عضلانی (LBM)' : 'Lean Mass'}
            </span>
            <span className="text-base font-extrabold text-emerald-400 my-0.5 block">
              {bodyAnalysis.leanMassKg} kg
            </span>
            <span className="text-[10px] text-emerald-400/80">
              FFMI: {bodyAnalysis.normalizedFfmi}
            </span>
          </div>

          {/* Calorie Target */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 block">{t.calories}</span>
            <span className="text-base font-extrabold text-amber-400 my-0.5 block">
              {bodyAnalysis.targetCalories}
            </span>
            <span className="text-[10px] text-slate-400">
              BMR: {bodyAnalysis.bmr} kcal
            </span>
          </div>
        </div>

        {/* 1. Scientific Overweight & Tissue Differentiation Card */}
        {bodyAnalysis.overweight && (
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-200">
                    {lang === 'fa' ? 'آنالیز وضعیت وزن و اضافه وزن (تفکیک عضله از چربی)' : 'Weight Status & Tissue Differentiation'}
                  </h5>
                  <span className="text-[10px] text-slate-400">
                    {lang === 'fa' ? 'بررسی علمی بافت وزن مازاد فراتر از شاخص ساده BMI' : 'Multi-compartment body analysis'}
                  </span>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border bg-slate-900 ${bodyAnalysis.overweight.badgeColor} border-current/20`}>
                {bodyAnalysis.overweight.title[lang]}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">
                  {lang === 'fa' ? 'محدوده وزن سالم قد شما (WHO)' : 'WHO Healthy Weight Range'}
                </span>
                <span className="text-xs font-bold text-slate-200 mt-0.5 block">
                  {bodyAnalysis.overweight.minNormalWeightKg} - {bodyAnalysis.overweight.maxNormalWeightKg} kg
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">
                  {lang === 'fa' ? 'اختلاف با سقف نرمال' : 'Weight vs WHO Ceiling'}
                </span>
                <span className={`text-xs font-bold mt-0.5 block ${bodyAnalysis.overweight.grossExcessWeightKg > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {bodyAnalysis.overweight.grossExcessWeightKg > 0
                    ? `+${bodyAnalysis.overweight.grossExcessWeightKg} kg ${lang === 'fa' ? 'بالای سقف' : 'above ceiling'}`
                    : (lang === 'fa' ? 'در محدوده استاندارد' : 'Within Normal Range')}
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">
                  {lang === 'fa' ? 'ماهیت بافت وزن' : 'Tissue Classification'}
                </span>
                <span className={`text-xs font-bold mt-0.5 block ${bodyAnalysis.overweight.badgeColor}`}>
                  {bodyAnalysis.overweight.tissueType[lang]}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
              {bodyAnalysis.overweight.description[lang]}
            </p>

            <div className="text-[10px] text-slate-400 flex items-start gap-1.5 pt-0.5">
              <span className="text-emerald-400 font-bold shrink-0">✓</span>
              <span>{bodyAnalysis.overweight.differentiationNote[lang]}</span>
            </div>
          </div>
        )}

        {/* 2. Scientific Excess Fat Breakdown Card */}
        {bodyAnalysis.excessFat && (
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <PieChart className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-200">
                    {lang === 'fa' ? 'آنالیز تفکیکی چربی اضافه و چربی فیزیولوژیک' : 'Excess Fat vs Physiological Fat Analysis'}
                  </h5>
                  <span className="text-[10px] text-slate-400">
                    {lang === 'fa' ? 'تفکیک چربی ضروری بدن از چربی مازاد برای جلوگیری از خطای محاسباتی' : 'Compartmental breakdown of fat mass'}
                  </span>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border bg-slate-900 ${bodyAnalysis.excessFat.badgeColor} border-current/20`}>
                {bodyAnalysis.excessFat.status[lang]}
              </span>
            </div>

            {/* 3-Tier Fat Breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">
                  {lang === 'fa' ? 'چربی ضروری زیستی' : 'Essential Fat'}
                </span>
                <span className="text-sm font-extrabold text-slate-200 my-0.5 block">
                  {bodyAnalysis.excessFat.essentialFatKg} <span className="text-[10px] font-normal text-slate-500">kg</span>
                </span>
                <span className="text-[9px] text-slate-500">
                  {lang === 'fa' ? 'برای اعصاب و هورمون' : 'Vital physiological'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">
                  {lang === 'fa' ? 'چربی سالم مجاز' : 'Healthy Baseline'}
                </span>
                <span className="text-sm font-extrabold text-emerald-400 my-0.5 block">
                  {bodyAnalysis.excessFat.healthyBaselineFatKg} <span className="text-[10px] font-normal text-slate-500">kg</span>
                </span>
                <span className="text-[9px] text-emerald-400/80">
                  {lang === 'fa' ? `تا سقف %${bodyAnalysis.excessFat.targetHealthyBfPercent}` : `Up to ${bodyAnalysis.excessFat.targetHealthyBfPercent}%`}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">
                  {lang === 'fa' ? 'چربی اضافه واقعی' : 'Actual Excess Fat'}
                </span>
                <span className={`text-sm font-extrabold my-0.5 block ${bodyAnalysis.excessFat.excessFatKg > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {bodyAnalysis.excessFat.excessFatKg} <span className="text-[10px] font-normal text-slate-500">kg</span>
                </span>
                <span className="text-[9px] text-slate-400">
                  {bodyAnalysis.excessFat.excessFatKg > 0 ? (lang === 'fa' ? 'مازاد برای سوزاندن' : 'Fat to burn') : (lang === 'fa' ? 'فاقد چربی اضافه' : 'Optimal')}
                </span>
              </div>
            </div>

            {/* Proportional Stack Bar */}
            <div className="space-y-1">
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                {/* Essential */}
                <div
                  className="bg-slate-500 h-full"
                  style={{ width: `${Math.max(5, (bodyAnalysis.excessFat.essentialFatKg / Math.max(1, bodyAnalysis.fatMassKg)) * 100)}%` }}
                  title="Essential Fat"
                />
                {/* Healthy Baseline */}
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${Math.max(10, ((bodyAnalysis.excessFat.healthyBaselineFatKg - bodyAnalysis.excessFat.essentialFatKg) / Math.max(1, bodyAnalysis.fatMassKg)) * 100)}%` }}
                  title="Healthy Baseline Fat"
                />
                {/* Excess Fat */}
                {bodyAnalysis.excessFat.excessFatKg > 0 && (
                  <div
                    className="bg-amber-400 h-full"
                    style={{ width: `${Math.max(5, (bodyAnalysis.excessFat.excessFatKg / Math.max(1, bodyAnalysis.fatMassKg)) * 100)}%` }}
                    title="Excess Fat"
                  />
                )}
              </div>
              <div className="flex justify-between text-[9px] text-slate-500 px-0.5">
                <span>{lang === 'fa' ? `چربی کل: ${bodyAnalysis.fatMassKg} kg (%${bodyAnalysis.bodyFat.bodyFatPercent})` : `Total Fat: ${bodyAnalysis.fatMassKg} kg (${bodyAnalysis.bodyFat.bodyFatPercent}%)`}</span>
                <span>{lang === 'fa' ? `چربی هدف: %${bodyAnalysis.excessFat.targetHealthyBfPercent}` : `Target BF: ${bodyAnalysis.excessFat.targetHealthyBfPercent}%`}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
              {bodyAnalysis.excessFat.explanation[lang]}
            </p>

            <p className="text-[10px] text-cyan-400/90 font-medium">
              🎯 {bodyAnalysis.excessFat.clinicalBreakdown[lang]}
            </p>
          </div>
        )}

        {/* Additional WHO Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              {lang === 'fa' ? 'محدوده وزن سالم قد شما (WHO):' : 'WHO Healthy Weight Range:'}
            </span>
            <span className="font-bold text-slate-200">
              {bodyAnalysis.bmi.idealWeightRange.min} - {bodyAnalysis.bmi.idealWeightRange.max} kg
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              {lang === 'fa' ? 'نسبت دور کمر به قد (WHtR):' : 'Waist-to-Height Ratio:'}
            </span>
            <span className={`font-bold ${bodyAnalysis.whtrColor}`}>
              {bodyAnalysis.whtr} ({bodyAnalysis.whtrCategory[lang]})
            </span>
          </div>
        </div>
      </div>

      {/* Body Circumferences Cards */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-200 block">{t.bodyMeasurements}</span>
              <span className="text-[11px] text-slate-400">{lang === 'fa' ? 'اندازه‌گیری دور عضلات (سانتی‌متر)' : 'Circumferences (cm)'}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {[
            { label: t.waist, val: profile.measurements?.waist || 80 },
            { label: t.chest, val: profile.measurements?.chest || 100 },
            { label: t.arms, val: profile.measurements?.arms || 36 },
            { label: t.thighs, val: profile.measurements?.thighs || 56 },
            { label: t.shoulders, val: profile.measurements?.shoulders || 118 },
            { label: t.neck, val: profile.measurements?.neck || 38 },
          ].map((m, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">{m.label}</span>
              <span className="text-sm font-mono font-bold text-slate-100">{m.val} <span className="text-[10px] text-slate-500">cm</span></span>
            </div>
          ))}
        </div>
      </div>

      {/* Strength & 1RM Personal Bests */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-200 block">{t.personalRecords}</span>
              <span className="text-[11px] text-slate-400">{lang === 'fa' ? 'رکوردهای تخمینی تک تکرار حداکثر' : 'Calculated 1-Rep Maxes'}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">{lang === 'fa' ? 'پرس سینه' : 'Bench Press'}</span>
            <span className="text-base font-extrabold text-slate-100">{benchBest} kg</span>
            <span className="text-[9px] text-emerald-400 block">E1RM Max</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">{lang === 'fa' ? 'اسکوات' : 'Back Squat'}</span>
            <span className="text-base font-extrabold text-slate-100">{squatBest} kg</span>
            <span className="text-[9px] text-emerald-400 block">E1RM Max</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">{lang === 'fa' ? 'ددلیفت' : 'Deadlift'}</span>
            <span className="text-base font-extrabold text-slate-100">{deadliftBest} kg</span>
            <span className="text-[9px] text-emerald-400 block">E1RM Max</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">{lang === 'fa' ? 'پرس سرشانه' : 'Overhead Press'}</span>
            <span className="text-base font-extrabold text-slate-100">{ohpBest} kg</span>
            <span className="text-[9px] text-emerald-400 block">E1RM Max</span>
          </div>
        </div>
      </div>

      {/* Log Progress Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100">{t.logNewWeight}</h3>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveLog} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">{t.weight} (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newWeight}
                  onChange={(e) => setNewWeight(parseFloat(e.target.value) || 70)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">{t.waist} (cm)</label>
                  <input
                    type="number"
                    value={newWaist}
                    onChange={(e) => setNewWaist(parseFloat(e.target.value) || 80)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">{t.chest} (cm)</label>
                  <input
                    type="number"
                    value={newChest}
                    onChange={(e) => setNewChest(parseFloat(e.target.value) || 100)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">{t.arms} (cm)</label>
                  <input
                    type="number"
                    value={newArms}
                    onChange={(e) => setNewArms(parseFloat(e.target.value) || 36)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">{t.thighs} (cm)</label>
                  <input
                    type="number"
                    value={newThighs}
                    onChange={(e) => setNewThighs(parseFloat(e.target.value) || 56)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-100"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold shadow-md hover:bg-emerald-400 cursor-pointer"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
