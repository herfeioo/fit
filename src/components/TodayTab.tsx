import React, { useState, useEffect } from 'react';
import {
  Play,
  Moon,
  Clock,
  Dumbbell,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Activity,
  CheckCircle2,
  Lock,
  Calendar,
  Layers,
  Flame,
  AlertTriangle,
  RotateCcw,
  Target
} from 'lucide-react';
import { WorkoutPlan, WorkoutDay, UserProfile, Language } from '../types';
import { translations } from '../translations';
import { getExerciseById } from '../data/exerciseDatabase';
import { calculateNutrition, calculateBmi, estimateBodyFat } from '../utils/fitnessCalculations';
import { DreamPhysiqueCard } from './DreamPhysiqueCard';
import { CycleProgressInfo } from '../utils/cycleTracker';
import { CycleProgressCircle } from './CycleProgressCircle';

interface TodayTabProps {
  plan: WorkoutPlan;
  profile: UserProfile;
  lang: Language;
  onStartWorkout: (day: WorkoutDay) => void;
  onOpenExerciseDetail: (exerciseId: string) => void;
  onOpenProfile: () => void;
  onOpenCheckIn: () => void;
  onOpenBiometricCheck?: () => void;
  onOpenGoalModal?: () => void;
  cycleProgress?: CycleProgressInfo;
  onUpdateProfile?: (updated: UserProfile) => void;
  onCompleteWorkoutDay?: (day: WorkoutDay) => void;
  onToggleDayCompletion?: (dayId: string) => void;
  onChangeWeeklyDays?: (days: 3 | 4 | 5 | 6) => void;
}

export const TodayTab: React.FC<TodayTabProps> = ({
  plan,
  profile,
  lang,
  onStartWorkout,
  onOpenExerciseDetail,
  onOpenProfile,
  onOpenCheckIn,
  onOpenBiometricCheck,
  onOpenGoalModal,
  cycleProgress,
  onUpdateProfile,
  onCompleteWorkoutDay,
  onToggleDayCompletion,
  onChangeWeeklyDays,
}) => {
  const t = translations[lang];

  // 1. Mandatory Gating Logic: Find the first uncompleted day in the sequence
  const completedIds = profile.completedDayIds || [];
  const firstUncompletedIndex = plan.days.findIndex((d) => !completedIds.includes(d.id));
  const activeSequenceIndex = firstUncompletedIndex !== -1 ? firstUncompletedIndex : 0;

  // Track the day currently in view. Defaults strictly to the first uncompleted day!
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(activeSequenceIndex);
  const [lockAlertMsg, setLockAlertMsg] = useState<string | null>(null);

  // When completedDayIds or plan changes, advance view to the current active uncompleted day
  useEffect(() => {
    const nextUncompleted = plan.days.findIndex((d) => !completedIds.includes(d.id));
    if (nextUncompleted !== -1) {
      setSelectedDayIndex(nextUncompleted);
    } else if (plan.days.length > 0) {
      setSelectedDayIndex(plan.days.length - 1);
    }
  }, [profile.completedDayIds, plan.days]);

  // Check if a specific day index is locked
  const isDayIndexLocked = (index: number): boolean => {
    if (index === 0) return false; // Day 1 is always unlocked
    // Day N is locked if ANY previous day in sequence is not completed
    for (let i = 0; i < index; i++) {
      const priorDay = plan.days[i];
      if (!priorDay || !completedIds.includes(priorDay.id)) {
        return true;
      }
    }
    return false;
  };

  const currentWorkout = plan.days[selectedDayIndex] || plan.days[0];
  const isCurrentDayDone = Boolean(currentWorkout && completedIds.includes(currentWorkout.id));
  const isCurrentDayLocked = isDayIndexLocked(selectedDayIndex);

  const nutrition = calculateNutrition(profile);
  const bmiInfo = calculateBmi(profile.weight, profile.height);
  const bodyFat = profile.bodyFatPercent || estimateBodyFat(profile);

  const macroMonth = profile.macrocycleMonth || 1;
  const mesoPhase = profile.mesocyclePhase || 'hypertrophy';
  const weeklyDays = profile.weeklyDays || 4;

  // Handle click on day chip
  const handleSelectDay = (index: number) => {
    if (isDayIndexLocked(index)) {
      setLockAlertMsg(
        lang === 'fa'
          ? `روز ${index + 1} قفل است. تا زمانی که تیک روز ${index} را نزنید، به روز ${index + 1} نمی‌توانید بروید.`
          : `Day ${index + 1} is locked! Check off Day ${index} before proceeding.`
      );
      setTimeout(() => setLockAlertMsg(null), 4000);
      return;
    }
    setSelectedDayIndex(index);
    setLockAlertMsg(null);
  };

  // Primary Checkbox Click Handler (Underneath the Program)
  const handleCheckboxToggle = () => {
    if (!currentWorkout) return;

    if (currentWorkout.isRestDay) {
      // Rest day completion toggle
      if (onToggleDayCompletion) {
        onToggleDayCompletion(currentWorkout.id);
      }
    } else {
      // Workout day
      if (isCurrentDayDone) {
        // Toggle off / uncheck
        if (onToggleDayCompletion) {
          onToggleDayCompletion(currentWorkout.id);
        }
      } else {
        // Mark as completed via completion feedback modal
        if (onCompleteWorkoutDay) {
          onCompleteWorkoutDay(currentWorkout);
        } else if (onToggleDayCompletion) {
          onToggleDayCompletion(currentWorkout.id);
        }
      }
    }
  };

  // Rest day distribution descriptions based on weeklyDays
  const getRestDayDescription = () => {
    switch (weeklyDays) {
      case 3:
        return lang === 'fa'
          ? '۳ روز تمرین فول‌بادی + ۴ روز استراحت (روزهای ۲، ۴، ۶ و ۷ استراحت)'
          : '3 Training Days + 4 Rest Days (Days 2, 4, 6, 7 are rest)';
      case 4:
        return lang === 'fa'
          ? '۴ روز تمرین بالاتنه/پایین‌تنه + ۳ روز استراحت (روزهای ۳، ۶ و ۷ استراحت)'
          : '4 Training Days + 3 Rest Days (Days 3, 6, 7 are rest)';
      case 5:
        return lang === 'fa'
          ? '۵ روز تمرین تخصصی + ۲ روز استراحت (روزهای ۴ و ۷ استراحت)'
          : '5 Training Days + 2 Rest Days (Days 4, 7 are rest)';
      case 6:
        return lang === 'fa'
          ? '۶ روز تمرین PPL دوگانه + ۱ روز استراحت (روز ۷ استراحت)'
          : '6 Training Days + 1 Rest Day (Day 7 is rest)';
      default:
        return '';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
      {/* 🎯 DREAM PHYSIQUE & GOAL VISION CARD (Top of Main Screen) */}
      <DreamPhysiqueCard
        profile={profile}
        lang={lang}
        onOpenGoalModal={onOpenGoalModal || onOpenProfile}
        onUpdateProfile={onUpdateProfile || (() => {})}
      />

      {/* Welcome & 2-Year Roadmap Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-emerald-950/40 border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="flex items-start justify-between relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <Sparkles className="w-3 h-3" />
                <span>{lang === 'fa' ? `ماه ${macroMonth} از ۲۴ (ماکروسایکل ۲ ساله)` : `Month ${macroMonth}/24 • 2-Year System`}</span>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-100 pt-1">
              {lang === 'fa' ? `سلام ${profile.name || 'ورزشکار'}، آماده‌ای؟` : `Ready, ${profile.name || 'Athlete'}?`}
            </h1>
            <p className="text-xs text-slate-400 max-w-sm">
              {lang === 'fa'
                ? `هدف: ${t[`goal_${profile.goal}` as keyof typeof t]} • فاز: ${mesoPhase.toUpperCase()}`
                : `Goal: ${t[`goal_${profile.goal}` as keyof typeof t]} • Phase: ${mesoPhase.toUpperCase()}`}
            </p>
          </div>

          <div className="flex flex-col gap-1.5 items-end">
            <div className="flex items-center gap-1.5">
              {/* 4-Week Cycle Progress Circle */}
              {cycleProgress && (
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-slate-800/80 border border-slate-700/80">
                  <CycleProgressCircle
                    progress={cycleProgress}
                    lang={lang}
                    onClick={onOpenBiometricCheck}
                    size="sm"
                  />
                  <div className="text-[10px] leading-tight text-right rtl:text-left select-none">
                    <span className="text-slate-400 block">{lang === 'fa' ? 'چک ۴ هفته' : '4-Wk Check'}</span>
                    <span className={`font-bold ${cycleProgress.isDue ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {cycleProgress.hasStarted
                        ? (lang === 'fa' ? `روز ${cycleProgress.currentDayNumber}/۲۸` : `Day ${cycleProgress.currentDayNumber}/28`)
                        : (lang === 'fa' ? 'شروع با تیک' : 'Ready')}
                    </span>
                  </div>
                </div>
              )}

              {onOpenGoalModal && (
                <button
                  id="today-quick-goal-btn"
                  onClick={onOpenGoalModal}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-xs text-amber-300 font-bold border border-amber-500/30 transition-colors flex items-center gap-1 cursor-pointer"
                  title={lang === 'fa' ? 'تنظیم هدف و فیزیک دلخواه' : 'Set Target Physique Goal'}
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? `هدف: ${profile.targetWeight || 89}kg` : `Goal: ${profile.targetWeight || 89}kg`}</span>
                </button>
              )}
              <button
                id="today-my-profile-btn"
                onClick={onOpenProfile}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-emerald-400 font-bold border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>{t.myBodyProfile}</span>
              </button>
            </div>
            <div className="flex items-center gap-1">
              {onOpenBiometricCheck && (
                <button
                  id="today-biometric-audit-btn"
                  onClick={onOpenBiometricCheck}
                  className="px-2 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-[10px] text-amber-300 font-semibold border border-amber-500/30 transition-colors cursor-pointer"
                >
                  {lang === 'fa' ? '📊 ثبت اطلاعات ۴ هفته' : '📊 4-Wk Audit'}
                </button>
              )}
              <button
                id="today-checkin-btn"
                onClick={onOpenCheckIn}
                className="px-2.5 py-1 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-[11px] text-teal-300 font-medium border border-teal-500/30 transition-colors cursor-pointer"
              >
                {t.checkInBtn}
              </button>
            </div>
          </div>
        </div>

        {/* Nutrition Bar */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-center">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t.calories}</span>
            <span className="text-sm font-bold text-amber-400">{nutrition.calories} <span className="text-[10px]">kcal</span></span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t.protein}</span>
            <span className="text-sm font-bold text-emerald-400">{nutrition.proteinGrams}g</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t.bodyFatEst}</span>
            <span className="text-sm font-bold text-cyan-400">~{bodyFat}%</span>
          </div>
        </div>
      </div>

      {/* 🗓 DYNAMIC FREQUENCY & REST ADAPTATION CONTROLLER */}
      <div className="p-3.5 sm:p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-100">
              {lang === 'fa' ? 'تطبیق روزهای تمرین و استراحت:' : 'Adaptive Split & Rest Days:'}
            </h3>
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">
            {getRestDayDescription()}
          </span>
        </div>

        {/* Quick 3, 4, 5, 6 Day Switcher */}
        <div className="grid grid-cols-4 gap-1.5">
          {([3, 4, 5, 6] as const).map((daysNum) => {
            const isCurrent = weeklyDays === daysNum;
            return (
              <button
                key={`split_btn_${daysNum}`}
                id={`set-weekly-days-${daysNum}-btn`}
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

      {/* 🔒 LOCK ALERT TOAST / BANNER */}
      {lockAlertMsg && (
        <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-2.5 animate-fadeIn">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="font-semibold leading-relaxed">{lockAlertMsg}</span>
        </div>
      )}

      {/* 📍 SEQUENTIAL DAY NAVIGATION BAR (Day 1, Day 2, Day 3 ...) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            {lang === 'fa' ? 'مسیر پیشرفت روزها (پیش‌روی گام‌به‌گام با تیک):' : 'Progress Sequence (Tick to Advance):'}
          </span>
          <span className="text-[11px] text-slate-400">
            {completedIds.length}/{plan.days.length} {lang === 'fa' ? 'روز تکمیل‌شده' : 'completed'}
          </span>
        </div>

        {/* Day Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {plan.days.map((day, idx) => {
            const isCompleted = completedIds.includes(day.id);
            const isLocked = isDayIndexLocked(idx);
            const isSelected = selectedDayIndex === idx;

            return (
              <button
                key={`day_chip_${day.id}`}
                id={`day-nav-chip-${idx + 1}`}
                onClick={() => handleSelectDay(idx)}
                className={`px-3 py-2 rounded-2xl text-xs font-bold border shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] ring-2 ring-emerald-500/40'
                    : isCompleted
                    ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/40 hover:bg-emerald-950/70'
                    : isLocked
                    ? 'bg-slate-950/50 text-slate-500 border-slate-800/80 cursor-not-allowed opacity-60'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : isLocked ? (
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
                <span>
                  {lang === 'fa'
                    ? `روز ${day.dayNumber}${day.isRestDay ? ' (استراحت)' : ''}`
                    : `Day ${day.dayNumber}${day.isRestDay ? ' (Rest)' : ''}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 🏋️ CURRENT DAY WORKOUT VIEW */}
      {currentWorkout && currentWorkout.isRestDay ? (
        /* REST DAY VIEW */
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-4 shadow-lg">
          <div className="w-14 h-14 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/20 shadow-inner">
            <Moon className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-bold">
              <span>{lang === 'fa' ? `روز ${currentWorkout.dayNumber}: روز استراحت علمی` : `Day ${currentWorkout.dayNumber}: Scientific Rest Day`}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-100">{currentWorkout.title[lang]}</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              {currentWorkout.description[lang]}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 max-w-md mx-auto space-y-1 text-left rtl:text-right">
            <span className="text-cyan-400 font-bold block">{lang === 'fa' ? 'دستورالعمل ریکاوری:' : 'Recovery Protocol:'}</span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {lang === 'fa'
                ? '• مصرف پروتئین کافی (۲ گرم به ازای هر کیلو وزن بدن) جهت سنتز عضلانی\n• ۳۰ دقیقه پیاده‌روی ریکاوری سبک و کشش‌های ملایم\n• حداقل ۸ ساعت خواب ترمیمی عمیق'
                : '• High protein intake (2g/kg) for muscle protein synthesis\n• 30m light active walk & dynamic mobility\n• 8+ hours restorative sleep'}
            </p>
          </div>

          {/* Dedicated Checkbox for Rest Day */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 flex items-center justify-between gap-3 text-left rtl:text-right">
            <div className="flex items-center gap-3">
              <button
                id={`rest-day-checkbox-${currentWorkout.id}`}
                onClick={handleCheckboxToggle}
                className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  isCurrentDayDone
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'bg-slate-900 border-2 border-cyan-500/50 hover:border-cyan-400 text-transparent'
                }`}
              >
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              </button>
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-100 block">
                  {isCurrentDayDone
                    ? (lang === 'fa' ? '✓ تیک استراحت ثبت شد (روز بعد باز شد)' : '✓ Rest Day Completed (Next day unlocked)')
                    : (lang === 'fa' ? 'تیک روز استراحت: ریکاوری انجام شد' : 'Tick Rest Day: Recovery Completed')}
                </span>
                <span className="text-[11px] text-slate-400">
                  {lang === 'fa' ? 'برای باز شدن روز بعد، تیک استراحت را بزنید.' : 'Tick this to unlock the subsequent training day.'}
                </span>
              </div>
            </div>

            <button
              id="rest-day-action-toggle-btn"
              onClick={handleCheckboxToggle}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isCurrentDayDone
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-md'
              }`}
            >
              {isCurrentDayDone ? (lang === 'fa' ? '✓ ثبت شد' : '✓ Done') : (lang === 'fa' ? 'ثبت تیک استراحت' : 'Mark Done')}
            </button>
          </div>
        </div>
      ) : (
        /* ACTIVE WORKOUT DAY VIEW */
        <div className="rounded-3xl bg-slate-900 border border-slate-800/90 overflow-hidden shadow-md space-y-0">
          {/* Card Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-start justify-between bg-slate-950/40">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {lang === 'fa' ? `روز ${currentWorkout.dayNumber} از ${plan.days.length}` : `Day ${currentWorkout.dayNumber} of ${plan.days.length}`}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {currentWorkout.exercises.length} {t.exercisesCount}
                </span>
                {isCurrentDayDone && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{lang === 'fa' ? 'انجام شد' : 'DONE'}</span>
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                {currentWorkout.title[lang]}
              </h2>
              <p className="text-xs text-slate-400">
                {currentWorkout.description[lang]}
              </p>
            </div>

            {/* Launch Workout Big Action Button */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              <button
                id="start-workout-action-btn"
                onClick={() => onStartWorkout(currentWorkout)}
                className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-[0_0_18px_rgba(16,185,129,0.35)] active:scale-95 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{t.startWorkout}</span>
              </button>
            </div>
          </div>

          {/* Exercise Items Preview List */}
          <div className="divide-y divide-slate-800/60 p-2">
            {currentWorkout.exercises.map((item, idx) => {
              const exDef = getExerciseById(item.exerciseId);
              if (!exDef) return null;

              return (
                <div
                  key={item.id || idx}
                  onClick={() => onOpenExerciseDetail(exDef.id)}
                  className="p-3 rounded-2xl hover:bg-slate-800/50 cursor-pointer flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    {/* Visual Thumbnail */}
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0 relative">
                      <img
                        src={exDef.customGifUrl || exDef.gifUrl}
                        alt={exDef.name.en}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                          {exDef.name[lang]}
                        </h3>
                        {item.notes && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[9px] font-medium">
                            {item.notes}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="font-semibold text-emerald-400">{item.sets} {t.sets} × {item.reps}</span>
                        <span>•</span>
                        <span>{t.rest}: {item.restSeconds}s</span>
                        <span>•</span>
                        <span className="text-amber-400">RPE {item.targetRpe}</span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                </div>
              );
            })}
          </div>

          {/* 🎯 MANDATORY DEDICATED COMPLETION CHECKBOX CARD UNDER PROGRAM */}
          <div className={`p-4 sm:p-5 border-t-2 transition-all ${
            isCurrentDayDone
              ? 'bg-emerald-950/40 border-emerald-500/50'
              : 'bg-slate-950/80 border-emerald-500/40'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3.5">
                {/* Big Interactive Checkbox */}
                <button
                  id={`day-completion-checkbox-${currentWorkout.id}`}
                  onClick={handleCheckboxToggle}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer mt-0.5 ${
                    isCurrentDayDone
                      ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                      : 'bg-slate-900 border-2 border-emerald-500/60 hover:border-emerald-400 text-transparent'
                  }`}
                  title={lang === 'fa' ? 'تیک اتمام تمرین' : 'Check off workout'}
                >
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                </button>

                <div className="space-y-0.5">
                  <span className="text-xs sm:text-sm font-black text-slate-100 flex items-center gap-2">
                    {isCurrentDayDone
                      ? (lang === 'fa'
                          ? `✓ تیک پایان روز ${currentWorkout.dayNumber} ثبت شد (روز بعدی باز است)`
                          : `✓ Day ${currentWorkout.dayNumber} Completed (Next day unlocked)`)
                      : (lang === 'fa'
                          ? `تیک انجام روز ${currentWorkout.dayNumber} (پایان تمرین و باز شدن روز بعد)`
                          : `Mark Day ${currentWorkout.dayNumber} Complete (Unlocks Next Day)`)}
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed max-w-md">
                    {isCurrentDayDone
                      ? (lang === 'fa'
                          ? 'این تمرین ثبت شده است و روز بعد اکنون در دسترس است. برای لغو تیک کلیک کنید.'
                          : 'Recorded! The next day is now accessible. Click to undo if needed.')
                      : (lang === 'fa'
                          ? '⚠️ تا زمانی که این تیک را نزنید، برنامه به هیچ عنوان به روز بعدی نخواهد رفت.'
                          : '⚠️ Program will not advance to the next day until this tick is confirmed.')}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                id="workout-completed-today-footer-btn"
                onClick={handleCheckboxToggle}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 self-end sm:self-center shrink-0 cursor-pointer ${
                  isCurrentDayDone
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.35)] active:scale-95'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isCurrentDayDone
                    ? (lang === 'fa' ? '✓ ثبت شد (لغو / ویرایش)' : '✓ Done (Undo/Edit)')
                    : (lang === 'fa' ? 'ثبت تیک پایان تمرین' : 'Mark Workout Completed')}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Science Coaching Tip Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <span className="font-bold text-slate-100 block mb-0.5">
            {lang === 'fa' ? 'قانون انطباق هوشمند تمرین و ریکاوری' : 'Adaptive Recovery & Progression Law'}
          </span>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            {lang === 'fa'
              ? 'تغییر ساختار تمرین به ۴ یا ۵ روز، روزهای استراحت را با تناسب بیومکانیکی بازآرایی می‌کند. تا زمانی که تیک هر روز ثبت نشود، محرک رشدی جلسه قبلی برای سیستم تثبیت نخواهد شد.'
              : 'Switching between 4 and 5 day splits automatically spaces rest days for optimal CNS recovery. Each day remains gated until ticked to guarantee structured overload.'}
          </p>
        </div>
      </div>
    </div>
  );
};
