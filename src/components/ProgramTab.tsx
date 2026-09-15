import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  RotateCcw,
  History,
  TrendingUp,
  Dumbbell,
  ChevronDown,
  ChevronUp,
  ArrowLeftRight,
  Plus,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  Flame,
  Shield,
  Zap,
  Info,
  Lock,
  Layers,
  AlertTriangle
} from 'lucide-react';
import { WorkoutPlan, WorkoutExerciseItem, Language, UserProfile, WorkoutDay } from '../types';
import { translations } from '../translations';
import { getExerciseById, getEquivalentExercises, exerciseLibrary } from '../data/exerciseDatabase';
import {
  generateWorkoutPlan,
  getMesocycleInfoForMonth,
  MESOCYCLE_ROADMAP_24_MONTHS
} from '../utils/programGenerator';

interface ProgramTabProps {
  plan: WorkoutPlan;
  lang: Language;
  profile: UserProfile;
  onUpdatePlan: (plan: WorkoutPlan) => void;
  onRegeneratePlan: () => void;
  onAdvanceMesocycle?: () => void;
  onOpenExerciseDetail: (exerciseId: string) => void;
  onOpenCheckIn?: () => void;
  onOpenBiometricCheck?: () => void;
  onResetToDay1?: () => void;
  onRestartCurrentPhase?: () => void;
  onRecalculateFullPlan?: () => void;
  onSelectMonthWeek?: (month: number, week: number) => void;
  onCompleteWorkoutDay?: (day: WorkoutDay) => void;
  onToggleDayCompletion?: (dayId: string) => void;
  onChangeWeeklyDays?: (days: 3 | 4 | 5 | 6) => void;
  onOpenAIEvolution?: () => void;
  pendingEvolutionCount?: number;
}

export const ProgramTab: React.FC<ProgramTabProps> = ({
  plan,
  lang,
  profile,
  onUpdatePlan,
  onRegeneratePlan,
  onAdvanceMesocycle,
  onOpenExerciseDetail,
  onOpenCheckIn,
  onOpenBiometricCheck,
  onResetToDay1,
  onRestartCurrentPhase,
  onRecalculateFullPlan,
  onSelectMonthWeek,
  onCompleteWorkoutDay,
  onToggleDayCompletion,
  onChangeWeeklyDays,
  onOpenAIEvolution,
  pendingEvolutionCount = 0,
}) => {
  const t = translations[lang];

  // Active month/week in user profile
  const activeMonth = profile.macrocycleMonth || 1;
  const activeWeek = profile.mesocycleWeek || 1;

  // Currently browsed month (1 to 24) and week (1 to 4)
  const [selectedMonth, setSelectedMonth] = useState<number>(activeMonth);
  const [selectedWeek, setSelectedWeek] = useState<number>(activeWeek);

  // Expanded day in accordion
  const [expandedDayId, setExpandedDayId] = useState<string>('');

  // Modals state
  const [isRestartModalOpen, setIsRestartModalOpen] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [exercisePickerOpenForDay, setExercisePickerOpenForDay] = useState<string | null>(null);
  const [replacementTarget, setReplacementTarget] = useState<{ dayId: string; exIndex: number; exerciseId: string } | null>(null);

  // Get mesocycle info for the currently selected month
  const selectedMesoInfo = getMesocycleInfoForMonth(selectedMonth);

  // Generate or obtain workout plan for browsed month and week
  const isViewingActivePlan = selectedMonth === activeMonth && selectedWeek === activeWeek;
  const currentDisplayedPlan: WorkoutPlan = isViewingActivePlan
    ? plan
    : generateWorkoutPlan(profile, selectedMonth, selectedWeek);

  // Set default expanded day if none selected
  React.useEffect(() => {
    if (!expandedDayId && currentDisplayedPlan.days.length > 0) {
      setExpandedDayId(currentDisplayedPlan.days[0].id);
    }
  }, [currentDisplayedPlan, expandedDayId]);

  const toggleDayExpand = (dayId: string) => {
    setExpandedDayId((prev) => (prev === dayId ? '' : dayId));
  };

  const handleActivateThisPlan = () => {
    if (onSelectMonthWeek) {
      onSelectMonthWeek(selectedMonth, selectedWeek);
    }
  };

  const handleRemoveExercise = (dayId: string, exIndex: number) => {
    const updatedDays = currentDisplayedPlan.days.map((d) => {
      if (d.id !== dayId) return d;
      const updatedExs = d.exercises.filter((_, idx) => idx !== exIndex);
      return { ...d, exercises: updatedExs };
    });
    onUpdatePlan({ ...currentDisplayedPlan, days: updatedDays });
  };

  const handleAddExerciseToDay = (dayId: string, exerciseId: string) => {
    const exerciseDef = getExerciseById(exerciseId);
    if (!exerciseDef) return;

    const newItem: WorkoutExerciseItem = {
      id: `ex_${Date.now()}`,
      exerciseId,
      sets: exerciseDef.defaultSets,
      reps: exerciseDef.defaultReps,
      restSeconds: exerciseDef.defaultRestSec,
      targetRpe: 8,
    };

    const updatedDays = currentDisplayedPlan.days.map((d) => {
      if (d.id !== dayId) return d;
      return { ...d, exercises: [...d.exercises, newItem] };
    });

    onUpdatePlan({ ...currentDisplayedPlan, days: updatedDays });
    setExercisePickerOpenForDay(null);
  };

  const handlePerformSwap = (newExerciseId: string) => {
    if (!replacementTarget) return;
    const { dayId, exIndex } = replacementTarget;
    const targetExDef = getExerciseById(newExerciseId);
    if (!targetExDef) return;

    const updatedDays = currentDisplayedPlan.days.map((d) => {
      if (d.id !== dayId) return d;
      const updatedExs = [...d.exercises];
      const oldItem = updatedExs[exIndex];
      updatedExs[exIndex] = {
        ...oldItem,
        exerciseId: newExerciseId,
        reps: targetExDef.defaultReps,
        restSeconds: targetExDef.defaultRestSec,
      };
      return { ...d, exercises: updatedExs };
    });

    onUpdatePlan({ ...currentDisplayedPlan, days: updatedDays });
    setReplacementTarget(null);
  };

  const currentSwapList = replacementTarget ? getEquivalentExercises(replacementTarget.exerciseId) : [];
  const currentTargetDef = replacementTarget ? getExerciseById(replacementTarget.exerciseId) : null;

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-5 text-slate-100">
      {/* Top Header: "My Program / برنامه من" + Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {lang === 'fa' ? 'سیستم تمرینی ۲ ساله' : '2-Year Adaptive System'}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {lang === 'fa' ? `ماه فعال: ${activeMonth} | هفته: ${activeWeek}` : `Active: M${activeMonth} | W${activeWeek}`}
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-100 flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-emerald-400" />
            <span>{t.myProgram}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'fa'
              ? 'ساختار دوره‌ای ۲۴ ماهه با ارزیابی و تطبیق هوشمند هر ۶ الی ۸ هفته'
              : '24-Month periodized macrocycle evolving every 6–8 weeks based on real feedback'}
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Restart Program Button */}
          <button
            id="restart-program-btn"
            onClick={() => setIsRestartModalOpen(true)}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.restartProgram}</span>
          </button>

          {/* Program History Button */}
          <button
            id="program-history-btn"
            onClick={() => setIsHistoryModalOpen(true)}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.programHistory}</span>
          </button>

          {/* 4-Week Biometric & Calorie Audit Trigger */}
          {onOpenBiometricCheck && (
            <button
              id="program-biometric-audit-btn"
              onClick={onOpenBiometricCheck}
              className="px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'fa' ? 'چک ۴ هفته و کالری' : '4-Wk Calorie Audit'}</span>
            </button>
          )}

          {/* 6-8 Week Check-In Trigger */}
          {onOpenCheckIn && (
            <button
              id="adaptive-checkin-btn"
              onClick={onOpenCheckIn}
              className="px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.checkInBtn}</span>
            </button>
          )}

          {/* AI Memory & Evolution Engine Trigger */}
          {onOpenAIEvolution && (
            <button
              id="program-ai-evolution-btn"
              onClick={onOpenAIEvolution}
              className="px-3 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm relative"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'fa' ? 'تکامل هوشمند حرکات' : 'AI Exercise Evolution'}</span>
              {pendingEvolutionCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white font-black animate-pulse">
                  {pendingEvolutionCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* 🚨 AI EVOLUTION ALERT BANNER (If pending evolutions exist) */}
      {pendingEvolutionCount > 0 && onOpenAIEvolution && (
        <div
          onClick={onOpenAIEvolution}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-emerald-500/40 flex items-center justify-between cursor-pointer hover:border-emerald-400 transition-all shadow-lg animate-fadeIn"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-300 text-xs sm:text-sm">
                {lang === 'fa' ? 'تکامل جدید بیومکانیکی برای حرکات شما آماده است' : 'AI Biomechanical Evolution Ready'}
              </h4>
              <p className="text-[11px] text-slate-300">
                {lang === 'fa'
                  ? 'بر اساس گزارش درد یا استپ وزنه، هوش مصنوعی جایگزینی علمی پیشنهاد داده است. کلیک کنید.'
                  : 'Based on feedback/pain, the AI proposed science-based exercise substitutions. Click to review.'}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs shrink-0">
            {lang === 'fa' ? 'مشاهده و اعمال' : 'Review'}
          </span>
        </div>
      )}

      {/* Gender Scientific Training Science Badge */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3.5 flex items-start gap-3 text-xs">
        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
          <Shield className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <h4 className="font-bold text-slate-200">
            {profile.gender === 'female'
              ? (lang === 'fa' ? 'اصول بیومکانیک اختصاصی بانوان فعال است' : 'Female Training Science Active')
              : (lang === 'fa' ? 'اصول بیومکانیک اختصاصی آقایان فعال است' : 'Male Training Science Active')}
          </h4>
          <p className="text-slate-400 leading-relaxed">
            {profile.gender === 'female' ? t.femaleTrainingNotice : t.maleTrainingNotice}
          </p>
        </div>
      </div>

      {/* 📅 SECTION 1: MONTHLY VIEW (Month 1 → Month 24) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm sm:text-base font-bold text-slate-100">
              {t.monthlyRoadmap}
            </h2>
          </div>
          <span className="text-[11px] text-slate-400">
            {lang === 'fa' ? 'انتخاب هر ماه برای مشاهده جزئیات برنامه و فاز علمی' : 'Click any month to inspect periodization phase'}
          </span>
        </div>

        {/* 24-Month Grid Selector */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2 pt-1">
          {MESOCYCLE_ROADMAP_24_MONTHS.map((meso) => {
            const isSelected = selectedMonth === meso.month;
            const isActive = activeMonth === meso.month;
            const isCompleted = activeMonth > meso.month;

            let phaseColor = 'border-slate-800 bg-slate-950 text-slate-400';
            if (meso.phase === 'hypertrophy') phaseColor = 'border-blue-500/30 text-blue-300';
            else if (meso.phase === 'strength') phaseColor = 'border-amber-500/30 text-amber-300';
            else if (meso.phase === 'peaking') phaseColor = 'border-rose-500/30 text-rose-300';
            else if (meso.phase === 'deload') phaseColor = 'border-teal-500/30 text-teal-300';

            return (
              <button
                key={`m_${meso.month}`}
                onClick={() => setSelectedMonth(meso.month)}
                className={`py-2 px-1.5 rounded-xl border text-center transition-all cursor-pointer relative flex flex-col items-center justify-center gap-0.5 ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-md ring-1 ring-emerald-500/50'
                    : isActive
                    ? 'bg-slate-800 border-teal-500 text-teal-300'
                    : isCompleted
                    ? 'bg-slate-950/60 border-slate-800 text-slate-500'
                    : 'bg-slate-950 border-slate-800/80 text-slate-300 hover:border-slate-700'
                }`}
              >
                {isActive && (
                  <span className="absolute -top-1.5 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
                )}
                <span className="text-[10px] font-mono font-bold">
                  {lang === 'fa' ? `ماه ${meso.month}` : `M${meso.month}`}
                </span>
                <span className={`text-[8px] uppercase tracking-wider font-extrabold px-1 rounded ${phaseColor}`}>
                  {meso.phase === 'hypertrophy' ? 'Hyp' : meso.phase === 'strength' ? 'Str' : meso.phase === 'peaking' ? 'Peak' : 'Deload'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Month Scientific Overview Banner */}
        <div className="mt-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {lang === 'fa' ? `مزوسایکل ${selectedMesoInfo.mesocycleNumber}` : `Mesocycle ${selectedMesoInfo.mesocycleNumber}`}
                </span>
                <span className="text-xs font-bold text-slate-200">
                  {selectedMesoInfo.name[lang]}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {selectedMesoInfo.focus[lang]}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                <span className="text-slate-500 text-[10px] block">{lang === 'fa' ? 'تکرارها' : 'Reps'}</span>
                <span className="text-slate-200 font-bold">{selectedMesoInfo.repBracket}</span>
              </div>
              <div className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                <span className="text-slate-500 text-[10px] block">{lang === 'fa' ? 'شدت RPE' : 'RPE'}</span>
                <span className="text-emerald-400 font-bold">{selectedMesoInfo.intensityRpe}</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800/60">
            {selectedMesoInfo.scientificDescription[lang]}
          </p>
        </div>
      </div>

      {/* 📆 SECTION 2: WEEKLY BREAKDOWN (Week 1, Week 2, Week 3, Week 4) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm sm:text-base font-bold text-slate-100">
              {t.weeklyBreakdown}
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            {lang === 'fa' ? `ماه ${selectedMonth} | هفته انتخابی: هفته ${selectedWeek}` : `Month ${selectedMonth} | Selected: Week ${selectedWeek}`}
          </span>
        </div>

        {/* 4 Weekly Breakdown Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            {
              week: 1,
              title: lang === 'fa' ? 'هفته ۱: مبنای اولیه' : 'Week 1: Intro Baseline',
              sub: lang === 'fa' ? 'حجم پایه (RIR 3)' : 'Base Volume (RIR 3)',
              badge: 'Intro'
            },
            {
              week: 2,
              title: lang === 'fa' ? 'هفته ۲: اضافه بار تدریجی' : 'Week 2: Progressive Overload',
              sub: lang === 'fa' ? '+تکرار / +وزنه (RIR 2)' : '+Reps / +Weight (RIR 2)',
              badge: 'Overload'
            },
            {
              week: 3,
              title: lang === 'fa' ? 'هفته ۳: اوج حجم' : 'Week 3: Volume Peak',
              sub: lang === 'fa' ? '+۱ ست حرکات اصلی (RIR 1)' : '+1 Set Compounds (RIR 1)',
              badge: 'Peak Vol'
            },
            {
              week: 4,
              title: selectedMesoInfo.isDeloadMonth
                ? (lang === 'fa' ? 'هفته ۴: دیلود ریکاوری' : 'Week 4: Active Deload')
                : (lang === 'fa' ? 'هفته ۴: رکوردگیری' : 'Week 4: Realization Peak'),
              sub: selectedMesoInfo.isDeloadMonth
                ? (lang === 'fa' ? '-۴۰٪ حجم (RIR 4)' : '-40% Volume (RIR 4)')
                : (lang === 'fa' ? 'بیشینه‌سازی (RIR 0-1)' : 'Overreaching (RIR 0-1)'),
              badge: selectedMesoInfo.isDeloadMonth ? 'Deload' : 'Max Realization'
            }
          ].map((w) => {
            const isWeekSelected = selectedWeek === w.week;
            const isWeekActive = activeMonth === selectedMonth && activeWeek === w.week;

            return (
              <button
                key={`w_${w.week}`}
                onClick={() => setSelectedWeek(w.week)}
                className={`p-3 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                  isWeekSelected
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 shadow-md ring-1 ring-emerald-500/40'
                    : isWeekActive
                    ? 'bg-slate-800 border-teal-500/60 text-teal-300'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black">{w.title}</span>
                  {isWeekActive && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      {lang === 'fa' ? 'جاری' : 'Active'}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400">{w.sub}</span>
              </button>
            );
          })}
        </div>

        {/* If browsing a different month/week, provide "Set as Active Training Plan" button */}
        {!isViewingActivePlan && (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
            <span>
              {lang === 'fa'
                ? `در حال پیش‌نمایش برنامه ماه ${selectedMonth}، هفته ${selectedWeek} هستید.`
                : `Previewing Month ${selectedMonth}, Week ${selectedWeek}.`}
            </span>
            <button
              onClick={handleActivateThisPlan}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-colors cursor-pointer"
            >
              {lang === 'fa' ? 'انتخاب به عنوان برنامه فعال من' : 'Set as My Active Plan'}
            </button>
          </div>
        )}
      </div>

      {/* 🏋️ SECTION 3: STRUCTURED WORKOUT DAYS FOR SELECTED WEEK */}
      <div className="space-y-3">
        {/* 🗓 DYNAMIC FREQUENCY & REST ADAPTATION CONTROLLER */}
        <div className="p-3.5 sm:p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs sm:text-sm font-bold text-slate-100">
                {lang === 'fa' ? 'تطبیق روزهای تمرین و استراحت (طبق آمار شما):' : 'Adaptive Split & Rest Days (Your Stats):'}
              </h4>
            </div>
            <span className="text-[11px] text-emerald-400 font-medium">
              {(profile.weeklyDays || 4) === 4
                ? (lang === 'fa' ? '۴ روز تمرین + ۳ روز استراحت (روزهای ۳، ۶ و ۷ استراحت)' : '4 Training + 3 Rest Days (Days 3, 6, 7 are rest)')
                : (profile.weeklyDays || 4) === 5
                ? (lang === 'fa' ? '۵ روز تمرین + ۲ روز استراحت (روزهای ۴ و ۷ استراحت)' : '5 Training + 2 Rest Days (Days 4, 7 are rest)')
                : (profile.weeklyDays || 4) === 3
                ? (lang === 'fa' ? '۳ روز تمرین + ۴ روز استراحت (روزهای ۲، ۴، ۶ و ۷ استراحت)' : '3 Training + 4 Rest Days (Days 2, 4, 6, 7 are rest)')
                : (lang === 'fa' ? '۶ روز تمرین + ۱ روز استراحت (روز ۷ استراحت)' : '6 Training + 1 Rest Day (Day 7 is rest)')}
            </span>
          </div>

          {/* Quick 3, 4, 5, 6 Day Switcher */}
          <div className="grid grid-cols-4 gap-1.5">
            {([3, 4, 5, 6] as const).map((daysNum) => {
              const isCurrent = (profile.weeklyDays || 4) === daysNum;
              return (
                <button
                  key={`program_split_btn_${daysNum}`}
                  id={`program-weekly-days-${daysNum}-btn`}
                  onClick={() => onChangeWeeklyDays && onChangeWeeklyDays(daysNum)}
                  className={`py-2 px-2 rounded-2xl text-xs font-bold border transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                    isCurrent
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 shadow-sm ring-1 ring-emerald-500/30'
                      : 'bg-slate-950/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-800'
                  }`}
                >
                  <span>{lang === 'fa' ? `${daysNum} روز` : `${daysNum} Days`}</span>
                  <span className="text-[9px] opacity-75">
                    {daysNum === 4
                      ? (lang === 'fa' ? '۴ تمرین + ۳ استراحت' : '4 On / 3 Off')
                      : daysNum === 5
                      ? (lang === 'fa' ? '۵ تمرین + ۲ استراحت' : '5 On / 2 Off')
                      : daysNum === 3
                      ? (lang === 'fa' ? '۳ تمرین + ۴ استراحت' : '3 On / 4 Off')
                      : (lang === 'fa' ? '۶ تمرین + ۱ استراحت' : '6 On / 1 Off')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <span>{currentDisplayedPlan.name[lang] || currentDisplayedPlan.name.en}</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {currentDisplayedPlan.daysPerWeek} {lang === 'fa' ? 'روز در هفته' : 'Days / Week'}
          </span>
        </div>

        {currentDisplayedPlan.days.map((day: WorkoutDay, dayIndex: number) => {
          const isExpanded = expandedDayId === day.id;
          const isDone = profile.completedDayIds?.includes(day.id);

          // Gating logic: Day N is locked if any prior day is not completed
          let isLocked = false;
          if (dayIndex > 0) {
            for (let i = 0; i < dayIndex; i++) {
              const prev = currentDisplayedPlan.days[i];
              if (!prev || !profile.completedDayIds?.includes(prev.id)) {
                isLocked = true;
                break;
              }
            }
          }

          const handleDayCheckToggle = (e: React.MouseEvent) => {
            e.stopPropagation();
            if (day.isRestDay) {
              if (onToggleDayCompletion) {
                onToggleDayCompletion(day.id);
              }
            } else {
              if (isDone) {
                if (onToggleDayCompletion) {
                  onToggleDayCompletion(day.id);
                }
              } else if (onCompleteWorkoutDay) {
                onCompleteWorkoutDay(day);
              } else if (onToggleDayCompletion) {
                onToggleDayCompletion(day.id);
              }
            }
          };

          return (
            <div
              key={day.id}
              className={`bg-slate-900 border rounded-3xl overflow-hidden transition-all shadow-md ${
                isDone
                  ? 'border-emerald-500/40 ring-1 ring-emerald-500/20'
                  : isLocked
                  ? 'border-slate-800/80 opacity-90'
                  : 'border-slate-800'
              }`}
            >
              {/* Day Header Accordion Toggle */}
              <div className="p-4 flex items-center justify-between hover:bg-slate-800/40 text-left rtl:text-right transition-colors">
                <div 
                  onClick={() => toggleDayExpand(day.id)}
                  className="space-y-1 flex-1 cursor-pointer"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                      {lang === 'fa' ? `روز ${day.dayNumber}` : `Day ${day.dayNumber}`}
                    </span>
                    {day.isRestDay ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                        {lang === 'fa' ? 'استراحت و ریکاوری' : 'Recovery Day'}
                      </span>
                    ) : (
                      <span className="text-xs text-emerald-400 font-semibold">
                        {day.targetFocus}
                      </span>
                    )}
                    {isDone ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{lang === 'fa' ? 'انجام شد' : 'DONE'}</span>
                      </span>
                    ) : isLocked ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-amber-400" />
                        <span>{lang === 'fa' ? '🔒 قفل (منتظر تیک روز قبل)' : '🔒 Locked'}</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        {lang === 'fa' ? 'در حال انجام' : 'Active'}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-100">
                    {day.title[lang]}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {day.description[lang]}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    id={`workout-completed-day-${day.id}-btn`}
                    onClick={handleDayCheckToggle}
                    disabled={isLocked}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isDone
                        ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                        : isLocked
                        ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                    }`}
                    title={lang === 'fa' ? 'ثبت اتمام تمرین' : 'Mark workout completed'}
                  >
                    {isLocked ? (
                      <Lock className="w-3.5 h-3.5" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )}
                    <span className="hidden sm:inline">
                      {isDone
                        ? (lang === 'fa' ? '✓ تیک ثبت شد' : '✓ Done')
                        : isLocked
                        ? (lang === 'fa' ? 'قفل' : 'Locked')
                        : (lang === 'fa' ? 'ثبت تیک روز' : 'Mark Completed')}
                    </span>
                  </button>
                  <button
                    onClick={() => toggleDayExpand(day.id)}
                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Day Content */}
              {isExpanded && (
                <div className="p-4 pt-0 border-t border-slate-800/60 space-y-3 mt-2">
                  {/* Lock Alert Banner if Day is Locked */}
                  {isLocked && (
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="font-semibold">
                        {lang === 'fa'
                          ? `⚠️ این روز قفل است! تا زمانی که تیک اتمام روز ${day.dayNumber - 1} را نزنید، این برنامه فعال نخواهد شد.`
                          : `⚠️ Day ${day.dayNumber} is locked! Complete Day ${day.dayNumber - 1} before starting.`}
                      </span>
                    </div>
                  )}

                  {day.isRestDay ? (
                    <div className="py-5 text-center text-xs text-slate-400 space-y-2">
                      <p className="font-bold text-slate-200 text-sm">
                        {lang === 'fa' ? 'ریکاوری فعال و ترمیم تارهای عضلانی' : 'Active Systemic Recovery'}
                      </p>
                      <p className="max-w-md mx-auto leading-relaxed">
                        {lang === 'fa'
                          ? 'استراحت کامل جهت پر شدن ذخایر گلیکوژن عضلانی، بهبود سیستم عصبی و ترشح هورمون‌های آنابولیک.'
                          : 'Prioritize 8+ hours sleep, optimal protein distribution, and joint mobility.'}
                      </p>

                      {/* Dedicated Rest Day Checkbox Card */}
                      <div className="p-3.5 mt-3 rounded-2xl bg-slate-950 border border-teal-500/30 flex items-center justify-between gap-3 text-left rtl:text-right max-w-lg mx-auto">
                        <div className="flex items-center gap-2.5">
                          <button
                            id={`rest-day-program-checkbox-${day.id}`}
                            onClick={handleDayCheckToggle}
                            disabled={isLocked}
                            className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                              isDone
                                ? 'bg-teal-500 text-slate-950'
                                : isLocked
                                ? 'bg-slate-900 border border-slate-700 text-slate-600 cursor-not-allowed'
                                : 'bg-slate-900 border border-teal-500/40 text-transparent'
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                          </button>
                          <div>
                            <span className="text-xs font-bold text-slate-200 block">
                              {isDone
                                ? (lang === 'fa' ? '✓ تیک استراحت ثبت شد (روز بعد باز است)' : '✓ Rest Completed (Next day unlocked)')
                                : (lang === 'fa' ? 'تیک روز استراحت و ریکاوری' : 'Tick Rest Day Recovery')}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {lang === 'fa' ? 'برای باز شدن روز بعدی، تیک استراحت را بزنید.' : 'Unlocks subsequent workout day.'}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={handleDayCheckToggle}
                          disabled={isLocked}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isDone
                              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                              : isLocked
                              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                              : 'bg-teal-500 text-slate-950 font-black'
                          }`}
                        >
                          {isDone ? (lang === 'fa' ? '✓ ثبت شد' : '✓ Done') : (lang === 'fa' ? 'ثبت تیک استراحت' : 'Mark Done')}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Exercises Table / Cards */}
                      <div className="space-y-2.5">
                        {day.exercises.map((exItem, exIndex) => {
                          const exDef = getExerciseById(exItem.exerciseId);
                          if (!exDef) return null;

                          return (
                            <div
                              key={exItem.id || `ex_${exIndex}`}
                              className="p-3 sm:p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                            >
                              {/* Exercise Info & Clickable Title for GIF / Masterclass */}
                              <div
                                onClick={() => onOpenExerciseDetail(exItem.exerciseId)}
                                className="flex items-center gap-3 cursor-pointer group flex-1"
                              >
                                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0 group-hover:border-emerald-500 transition-colors">
                                  <Dumbbell className="w-4 h-4" />
                                </div>
                                <div>
                                  <h5 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                                    <span>{exDef.name[lang]}</span>
                                  </h5>
                                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                                    <span className="capitalize">{exDef.targetMuscle}</span>
                                    <span>•</span>
                                    <span className="font-mono text-emerald-400 font-bold">{exItem.sets} {t.sets} × {exItem.reps} {t.reps}</span>
                                    <span>•</span>
                                    <span className="font-mono">{exItem.restSeconds}s {t.rest}</span>
                                    {exItem.targetRpe && (
                                      <>
                                        <span>•</span>
                                        <span className="text-amber-400 font-mono">RPE {exItem.targetRpe}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Exercise Actions: Swap and Remove */}
                              <div className="flex items-center gap-2 self-end sm:self-auto">
                                <button
                                  onClick={() => setReplacementTarget({ dayId: day.id, exIndex, exerciseId: exItem.exerciseId })}
                                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer"
                                  title={t.replaceExercise}
                                >
                                  <ArrowLeftRight className="w-3 h-3 text-cyan-400" />
                                  <span>{t.replaceExercise}</span>
                                </button>
                                <button
                                  onClick={() => handleRemoveExercise(day.id, exIndex)}
                                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 text-xs transition-colors cursor-pointer"
                                  title={t.removeExercise}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Add Exercise to Day */}
                      <div className="pt-1">
                        <button
                          onClick={() => setExercisePickerOpenForDay(day.id)}
                          className="w-full py-2.5 rounded-xl border border-dashed border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-slate-400 hover:text-emerald-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{t.addExercise}</span>
                        </button>
                      </div>

                      {/* 🎯 MANDATORY DEDICATED COMPLETION CHECKBOX CARD UNDER PROGRAM */}
                      <div className={`p-4 rounded-2xl border-2 transition-all mt-2 ${
                        isDone
                          ? 'bg-emerald-950/40 border-emerald-500/50'
                          : 'bg-slate-950 border-emerald-500/40'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <button
                              id={`program-checkbox-day-${day.id}`}
                              onClick={handleDayCheckToggle}
                              disabled={isLocked}
                              className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer mt-0.5 ${
                                isDone
                                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                                  : isLocked
                                  ? 'bg-slate-800 border border-slate-700 text-slate-600 cursor-not-allowed'
                                  : 'bg-slate-900 border-2 border-emerald-500/60 hover:border-emerald-400 text-transparent'
                              }`}
                            >
                              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                            </button>

                            <div className="space-y-0.5">
                              <span className="text-xs sm:text-sm font-black text-slate-100 flex items-center gap-2">
                                {isDone
                                  ? (lang === 'fa'
                                      ? `✓ تیک انجام روز ${day.dayNumber} ثبت شد (روز بعدی باز است)`
                                      : `✓ Day ${day.dayNumber} Marked Complete (Next day unlocked)`)
                                  : (lang === 'fa'
                                      ? `تیک انجام روز ${day.dayNumber} (پایان تمرین و باز شدن روز بعد)`
                                      : `Mark Day ${day.dayNumber} as Complete`)}
                              </span>
                              <p className="text-[11px] text-slate-400 leading-relaxed max-w-md">
                                {isDone
                                  ? (lang === 'fa'
                                      ? 'تمرین با موفقیت در کارنامه ذخیره شد. برای لغو یا ویرایش کلیک کنید.'
                                      : 'Workout logged. Click again to edit or undo.')
                                  : (lang === 'fa'
                                      ? '⚠️ تا زمانی که این تیک را ثبت نکنید، برنامه به هیچ وجه به روز بعدی نخواهد رفت.'
                                      : '⚠️ The program will strictly not advance until this tick is marked.')}
                              </p>
                            </div>
                          </div>

                          <button
                            id={`workout-completed-day-${day.id}-expanded-btn`}
                            onClick={handleDayCheckToggle}
                            disabled={isLocked}
                            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 self-end sm:self-center shrink-0 cursor-pointer ${
                              isDone
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                                : isLocked
                                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.3)] active:scale-95'
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>
                              {isDone
                                ? (lang === 'fa' ? '✓ ثبت شد (ویرایش)' : '✓ Done (Edit)')
                                : (lang === 'fa' ? 'ثبت تیک پایان تمرین' : 'Mark Completed')}
                            </span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 🔄 RESTART PROGRAM MODAL */}
      {isRestartModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    {t.restartModalTitle}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t.restartModalSubtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsRestartModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Option 1: Reset to Day 1 */}
              <button
                id="reset-to-day1-btn"
                onClick={() => {
                  if (onResetToDay1) onResetToDay1();
                  setIsRestartModalOpen(false);
                }}
                className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/60 hover:bg-amber-500/5 text-left rtl:text-right transition-all cursor-pointer space-y-1 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-200 group-hover:text-amber-300">
                    1. {t.resetToDay1}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    M1 - W1
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {t.resetToDay1Desc}
                </p>
              </button>

              {/* Option 2: Restart Current Phase */}
              <button
                id="restart-current-phase-btn"
                onClick={() => {
                  if (onRestartCurrentPhase) onRestartCurrentPhase();
                  setIsRestartModalOpen(false);
                }}
                className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-teal-500/60 hover:bg-teal-500/5 text-left rtl:text-right transition-all cursor-pointer space-y-1 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-200 group-hover:text-teal-300">
                    2. {t.restartPhase}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    {lang === 'fa' ? `ماه ${activeMonth} - هفته ۱` : `M${activeMonth} - W1`}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {t.restartPhaseDesc}
                </p>
              </button>

              {/* Option 3: Recalculate Full 2-Year Plan */}
              <button
                id="recalculate-full-plan-btn"
                onClick={() => {
                  if (onRecalculateFullPlan) onRecalculateFullPlan();
                  setIsRestartModalOpen(false);
                }}
                className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/60 hover:bg-emerald-500/5 text-left rtl:text-right transition-all cursor-pointer space-y-1 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-200 group-hover:text-emerald-300">
                    3. {t.recalculateAll}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    AI Sports Engine
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {t.recalculateAllDesc}
                </p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📋 PROGRAM HISTORY MODAL */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg max-h-[85vh] bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl flex flex-col overflow-hidden text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    {t.programHistory}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t.historyDesc}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsHistoryModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-2.5 text-xs">
              {profile.checkIns && profile.checkIns.length > 0 ? (
                profile.checkIns.map((ci) => (
                  <div key={ci.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span className="font-mono">{ci.date}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-cyan-300">
                        {ci.actionApplied}
                      </span>
                    </div>
                    <p className="text-slate-200 text-xs font-semibold">
                      {ci.aiRecommendation[lang]}
                    </p>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-slate-500 space-y-2">
                  <Clock className="w-8 h-8 mx-auto text-slate-600" />
                  <p>{lang === 'fa' ? 'هنوز سابقه چک‌اینی ثبت نشده است.' : 'No periodic check-ins completed yet.'}</p>
                  <p className="text-[11px] text-slate-600">
                    {lang === 'fa'
                      ? 'با رسیدن به پایان هر دوره ۶ الی ۸ هفته‌ای، ارزیابی انطباقی انجام دهید.'
                      : 'Complete an adaptive check-in at the end of every 6–8 week cycle.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SWAP EXERCISE MODAL */}
      {replacementTarget && currentTargetDef && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-slate-100">{t.replaceExercise}</h4>
                <p className="text-xs text-slate-400">
                  {lang === 'fa' ? `جایگزینی علمی برای: ${currentTargetDef.name[lang]}` : `Science-backed swap for: ${currentTargetDef.name[lang]}`}
                </p>
              </div>
              <button
                onClick={() => setReplacementTarget(null)}
                className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto text-xs">
              {currentSwapList.map((alt) => (
                <button
                  key={alt.id}
                  onClick={() => handlePerformSwap(alt.id)}
                  className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500 text-left rtl:text-right transition-all flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <h5 className="font-bold text-slate-200">{alt.name[lang]}</h5>
                    <span className="text-[10px] text-slate-400 capitalize">{alt.targetMuscle} • {alt.difficulty}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    {lang === 'fa' ? 'انتخاب' : 'Select'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ADD EXERCISE PICKER MODAL */}
      {exercisePickerOpenForDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md max-h-[80vh] bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl flex flex-col text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-slate-100">{t.addExercise}</h4>
              <button
                onClick={() => setExercisePickerOpenForDay(null)}
                className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-2 text-xs">
              {exerciseLibrary.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => handleAddExerciseToDay(exercisePickerOpenForDay, ex.id)}
                  className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500 text-left rtl:text-right transition-all flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <h5 className="font-bold text-slate-200">{ex.name[lang]}</h5>
                    <span className="text-[10px] text-slate-400 capitalize">{ex.targetMuscle} • {ex.difficulty}</span>
                  </div>
                  <Plus className="w-4 h-4 text-emerald-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
