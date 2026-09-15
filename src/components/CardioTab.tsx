import React, { useState, useEffect } from 'react';
import {
  Flame,
  Dumbbell,
  Shuffle,
  Play,
  CheckCircle2,
  Calendar,
  Clock,
  Zap,
  Info,
  Layers,
  Search,
  ExternalLink,
  Youtube,
  Trophy,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Activity,
  HeartPulse
} from 'lucide-react';
import {
  CardioExerciseItem,
  CardioRoutine,
  CardioTargetMuscleGroup,
  CardioCompletedSession,
  Language,
} from '../types';
import {
  loadCardioCompletedSessions,
  loadCardioSavedPreferences,
  saveCardioPreferences,
} from '../data/cardioDatabase';
import { generateCardioRoutine } from '../utils/cardioRoutineEngine';
import { CardioExerciseModal } from './CardioExerciseModal';
import { ActiveCardioWorkoutModal } from './ActiveCardioWorkoutModal';

interface CardioTabProps {
  lang: Language;
}

export const CardioTab: React.FC<CardioTabProps> = ({ lang }) => {
  const isFa = lang === 'fa';

  // Preferences & Target
  const initialPrefs = loadCardioSavedPreferences();
  const [selectedTarget, setSelectedTarget] = useState<CardioTargetMuscleGroup>(
    initialPrefs.selectedTarget || 'core'
  );
  const [selectedMode, setSelectedMode] = useState<'tabata' | 'hiit' | 'moderate'>(
    initialPrefs.selectedMode || 'hiit'
  );

  // Active Routine
  const [routine, setRoutine] = useState<CardioRoutine>(() =>
    generateCardioRoutine(initialPrefs.selectedTarget || 'core', initialPrefs.selectedMode || 'hiit')
  );

  // Completed Sessions Log
  const [completedSessions, setCompletedSessions] = useState<CardioCompletedSession[]>(() =>
    loadCardioCompletedSessions()
  );

  // Modals
  const [selectedExerciseForDetail, setSelectedExerciseForDetail] = useState<CardioExerciseItem | null>(null);
  const [isActiveWorkoutModalOpen, setIsActiveWorkoutModalOpen] = useState<boolean>(false);

  // UI state
  const [showWarmupDetails, setShowWarmupDetails] = useState<boolean>(false);
  const [showCooldownDetails, setShowCooldownDetails] = useState<boolean>(false);
  const [justRandomized, setJustRandomized] = useState<boolean>(false);

  // Sync Preferences to LocalStorage
  useEffect(() => {
    saveCardioPreferences({
      selectedTarget,
      selectedMode,
    });
  }, [selectedTarget, selectedMode]);

  // Regenerate when target or mode changes (passing current exercise IDs to guarantee brand new unique exercises)
  const handleTargetChange = (target: CardioTargetMuscleGroup) => {
    setSelectedTarget(target);
    const currentIds = routine?.exercises ? routine.exercises.map((e) => e.id) : [];
    const newRoutine = generateCardioRoutine(target, selectedMode, 5, currentIds);
    setRoutine(newRoutine);
  };

  const handleModeChange = (mode: 'tabata' | 'hiit' | 'moderate') => {
    setSelectedMode(mode);
    const currentIds = routine?.exercises ? routine.exercises.map((e) => e.id) : [];
    const newRoutine = generateCardioRoutine(selectedTarget, mode, 5, currentIds);
    setRoutine(newRoutine);
  };

  // Station labels for sports-science biomechanical sequencing
  const getBiomechanicalStationBadge = (index: number) => {
    const stations = [
      {
        fa: 'ایستگاه ۱: فعال‌سازی و ریتم پویا (Primer)',
        en: 'Station 1: Dynamic Primer',
        badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30'
      },
      {
        fa: 'ایستگاه ۲: توان انفجاری و پلیومتریک (Explosive)',
        en: 'Station 2: Explosive Power',
        badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30'
      },
      {
        fa: 'ایستگاه ۳: ثبات مرکزی و شکم (Core Stability)',
        en: 'Station 3: Core Stability',
        badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30'
      },
      {
        fa: 'ایستگاه ۴: تعادل و چابکی چندجهته (Agility)',
        en: 'Station 4: Multi-Planar Agility',
        badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30'
      },
      {
        fa: 'ایستگاه ۵: اوج چربی‌سوزی متابولیک (Burnout)',
        en: 'Station 5: Metabolic Burnout',
        badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
      },
    ];
    return stations[index % stations.length];
  };

  // Explicit Randomize Handler: guaranteed zero repetition and different biomechanical pattern
  const handleRandomize = () => {
    const currentIds = routine?.exercises ? routine.exercises.map((e) => e.id) : [];
    const newRoutine = generateCardioRoutine(selectedTarget, selectedMode, 5, currentIds);
    setRoutine(newRoutine);
    setJustRandomized(true);
    setTimeout(() => setJustRandomized(false), 2000);
  };

  const handleWorkoutModalClose = () => {
    setIsActiveWorkoutModalOpen(false);
    // Reload completed sessions
    setCompletedSessions(loadCardioCompletedSessions());
  };

  // Check if completed this week (last 7 days)
  const isCompletedThisWeek = () => {
    if (completedSessions.length === 0) return false;
    const lastSession = completedSessions[0];
    const lastDate = new Date(lastSession.date);
    const now = new Date();
    const diffDays = (now.getTime() - lastDate.getTime()) / (1000 * 3600 * 24);
    return diffDays <= 7;
  };

  // Muscle targets list ("تمام عضلات")
  const targetOptions: { id: CardioTargetMuscleGroup; nameFa: string; nameEn: string; icon: string }[] = [
    { id: 'core', nameFa: 'شکم و میان‌تنه', nameEn: 'Core & Abs', icon: '🔥' },
    { id: 'legs', nameFa: 'پا و باسن', nameEn: 'Legs & Glutes', icon: '🦵' },
    { id: 'chest', nameFa: 'سینه و بالاتنه', nameEn: 'Chest & Upper', icon: '💪' },
    { id: 'back', nameFa: 'زیربغل و پشت', nameEn: 'Back & Lats', icon: '🦅' },
    { id: 'shoulders_arms', nameFa: 'سرشانه، بازو و بوکس', nameEn: 'Shoulders & Arms', icon: '🥊' },
    { id: 'full_body', nameFa: 'کل بدن و چربی‌سوزی', nameEn: 'Full Body HIIT', icon: '⚡' },
    { id: 'all', nameFa: 'ترکیبی همه عضلات', nameEn: 'All Combined', icon: '🌟' },
  ];

  return (
    <div
      id="cardio-tab-container"
      className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full"
      dir={isFa ? 'rtl' : 'ltr'}
    >
      {/* Top Hero Banner & Weekly Badge */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-rose-950/70 via-slate-900 to-slate-950 border border-rose-500/30 shadow-xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-md shrink-0">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  {isFa ? 'هوازی هدفمند و HIIT در خانه' : 'Targeted At-Home Cardio & HIIT'}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {isFa ? 'روز استراحت' : 'Rest Day'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {isFa
                  ? 'جلسه اختصاصی هفته‌ای ۱ بار در منزل بدون نیاز به وزنه و بدون تداخل با برنامه باشگاه'
                  : 'Once-a-week home cardio session without gym weights or altering your gym plan.'}
              </p>
            </div>
          </div>

          {/* Weekly Status Indicator */}
          <div
            className={`px-3.5 py-2 rounded-2xl border flex items-center gap-2 shrink-0 ${
              isCompletedThisWeek()
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <div className="text-xs">
              <span className="font-extrabold block leading-none">
                {isCompletedThisWeek()
                  ? isFa
                    ? 'هوازی این هفته انجام شد'
                    : 'Done this week'
                  : isFa
                  ? 'هفته‌ای ۱ بار (آماده اجرا)'
                  : 'Ready for this week'}
              </span>
              <span className="text-[10px] opacity-80 mt-0.5 block">
                {completedSessions.length > 0
                  ? isFa
                    ? `آخرین تمرین: ${completedSessions[0].date}`
                    : `Last: ${completedSessions[0].date}`
                  : isFa
                  ? 'هنوز ثبت نشده'
                  : 'Not logged yet'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Value Props Banner */}
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800/80 text-center text-xs">
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">{isFa ? 'محل تمرین' : 'Location'}</span>
            <span className="font-bold text-white text-xs">{isFa ? 'داخل منزل (بدون وزنه)' : 'At Home'}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">{isFa ? 'تجهیزات لازم' : 'Equipment'}</span>
            <span className="font-bold text-emerald-400 text-xs">{isFa ? 'فقط زیرانداز / مت' : 'Bodyweight'}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">{isFa ? 'تاثیر بر برنامه باشگاه' : 'Main Plan Impact'}</span>
            <span className="font-bold text-cyan-300 text-xs">{isFa ? 'کاملاً مستقل و صفر' : 'Zero / Independent'}</span>
          </div>
        </div>
      </div>

      {/* Muscle Group Selector ("تمام عضلات باشه") */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-slate-200 flex items-center gap-1.5">
            <Dumbbell className="w-3.5 h-3.5 text-rose-400" />
            <span>{isFa ? 'انتخاب عضله هدف برای هوازی امروز:' : 'Select Target Muscle Group:'}</span>
          </label>
          <span className="text-[11px] text-slate-400">
            {isFa ? 'تغییر دلخواه در هر بار تمرین' : 'Selectable per session'}
          </span>
        </div>

        {/* Muscle Selector Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {targetOptions.map((opt) => {
            const isSelected = selectedTarget === opt.id;
            return (
              <button
                key={opt.id}
                id={`cardio-target-${opt.id}`}
                onClick={() => handleTargetChange(opt.id)}
                className={`p-2.5 rounded-2xl border text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-950/50 scale-[1.02]'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-sm">{opt.icon}</span>
                <span className="truncate">{isFa ? opt.nameFa : opt.nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Protocol & Randomizer Controls Bar */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Protocol Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => handleModeChange('hiit')}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedMode === 'hiit'
                ? 'bg-rose-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isFa ? 'اینتروال HIIT (۴۰/۲۰)' : 'HIIT (40/20)'}
          </button>
          <button
            onClick={() => handleModeChange('tabata')}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedMode === 'tabata'
                ? 'bg-rose-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isFa ? 'تاباتا Tabata (۲۰/۱۰)' : 'Tabata (20/10)'}
          </button>
          <button
            onClick={() => handleModeChange('moderate')}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedMode === 'moderate'
                ? 'bg-rose-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isFa ? 'هوازی ملایم' : 'Steady / Light'}
          </button>
        </div>

        {/* Randomize Button */}
        <button
          id="cardio-randomize-btn"
          onClick={handleRandomize}
          className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
            justRandomized
              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 scale-105'
              : 'bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border-slate-700 text-emerald-300 hover:text-emerald-200'
          }`}
          title={isFa ? 'ترکیب حرکات تصادفی کاملا جدید و بدون تکرار بر اساس اصول ورزشی' : 'Randomize routine exercises with non-repeating scientific pattern'}
        >
          <Shuffle className={`w-3.5 h-3.5 text-emerald-400 ${justRandomized ? 'animate-spin' : ''}`} />
          <span>
            {justRandomized
              ? (isFa ? 'الگوی علمی جدید بارگذاری شد ✓' : 'Fresh Scientific Pattern Loaded ✓')
              : (isFa ? 'رندومایز تمرین این جلسه' : 'Randomize Routine')}
          </span>
        </button>
      </div>

      {/* Routine Hero Summary Card */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-sm sm:text-base font-black text-white">
              {isFa ? routine.title.fa : routine.title.en}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              {isFa ? routine.description.fa : routine.description.en}
            </p>
          </div>

          {/* Start Active Workout CTA Button */}
          <button
            id="start-home-cardio-btn"
            onClick={() => setIsActiveWorkoutModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isFa ? 'شروع تمرین در خانه' : 'Start Home Session'}</span>
          </button>
        </div>

        {/* Routine Metric Badges */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-0.5">{isFa ? 'تعداد راند' : 'Rounds'}</span>
            <span className="font-extrabold text-white font-mono text-sm">{routine.rounds} راند</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-0.5">{isFa ? 'زمان کار' : 'Work'}</span>
            <span className="font-extrabold text-rose-400 font-mono text-sm">{routine.workSec} ثانیه</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-0.5">{isFa ? 'استراحت' : 'Rest'}</span>
            <span className="font-extrabold text-emerald-400 font-mono text-sm">{routine.restSec} ثانیه</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-0.5">{isFa ? 'کالری تخمینی' : 'Calories'}</span>
            <span className="font-extrabold text-amber-400 font-mono text-sm">~{routine.estimatedCalories}</span>
          </div>
        </div>

        {/* ==================================================== */}
        {/* PHASE 1: DYNAMIC WARM-UP (۵ دقیقه گرم‌کردن پویا) */}
        {/* ==================================================== */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
          <button
            onClick={() => setShowWarmupDetails(!showWarmupDetails)}
            className="w-full px-4 py-3 flex items-center justify-between text-xs font-extrabold text-amber-300 hover:bg-amber-500/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px] font-black">
                ۱
              </span>
              <span>{isFa ? 'فاز ۱: گرم‌کردن پویا و روان‌کاری مفاصل (۵ دقیقه)' : 'Phase 1: Dynamic Warm-Up (5 min)'}</span>
            </div>
            {showWarmupDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showWarmupDetails && (
            <div className="px-4 pb-3 pt-1 space-y-1.5 text-xs border-t border-amber-500/20 bg-slate-950/40">
              {routine.warmupSteps.map((step, i) => (
                <div key={i} className="flex items-center justify-between text-slate-300 py-1">
                  <span>{isFa ? step.title.fa : step.title.en}</span>
                  <span className="font-mono text-amber-400 text-[11px] shrink-0 font-bold">
                    {step.durationSec} {isFa ? 'ثانیه' : 'sec'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ==================================================== */}
        {/* PHASE 2: MAIN CARDIO EXERCISE CIRCUIT */}
        {/* ==================================================== */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-[10px] font-black text-rose-400">
                ۲
              </span>
              <span>{isFa ? 'فاز ۲: مدار حرکات هوازی این جلسه' : 'Phase 2: Main Cardio Circuit'}</span>
            </span>
            <span className="text-[11px] text-slate-400">
              {isFa ? `${routine.exercises.length} حرکت انتخابی` : `${routine.exercises.length} exercises`}
            </span>
          </div>

          {/* Exercises Cards List */}
          <div className="space-y-2.5">
            {routine.exercises.map((ex, index) => (
              <div
                key={`${ex.id}_${index}`}
                className="p-3 sm:p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5"
              >
                <div className="flex items-center gap-3">
                  {/* Thumbnail / GIF preview */}
                  <div
                    onClick={() => setSelectedExerciseForDetail(ex)}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0 cursor-pointer relative group"
                    title={isFa ? 'کلیک برای جزئیات و ویدیو' : 'Click to inspect video & guide'}
                  >
                    <img
                      src={ex.imageUrl}
                      alt={ex.name.en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                      <Play className="w-4 h-4 text-white opacity-80 group-hover:opacity-100" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    {/* Biomechanical Station Pattern Tag */}
                    <div className="mb-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-bold ${getBiomechanicalStationBadge(index).badge}`}>
                        {isFa ? getBiomechanicalStationBadge(index).fa : getBiomechanicalStationBadge(index).en}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <h4
                        onClick={() => setSelectedExerciseForDetail(ex)}
                        className="text-xs sm:text-sm font-extrabold text-slate-100 hover:text-emerald-400 transition-colors cursor-pointer truncate"
                      >
                        {isFa ? ex.name.fa : ex.name.en}
                      </h4>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-1 truncate">
                      {isFa ? ex.primaryMuscles.fa : ex.primaryMuscles.en}
                    </p>

                    <div className="flex items-center gap-3 mt-1 text-[10px] font-mono">
                      <span className="text-emerald-400 font-bold">
                        {routine.workSec}s {isFa ? 'کار' : 'work'}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400">
                        {routine.restSec}s {isFa ? 'استراحت' : 'rest'}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-rose-400 font-bold">
                        ~{ex.caloriesPerMinute} {isFa ? 'kcal/min' : 'kcal/min'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Links: Video, Google Images, Details */}
                <div className="flex items-center justify-between gap-1.5 pt-1.5 border-t border-slate-800/60 text-xs">
                  <button
                    onClick={() => setSelectedExerciseForDetail(ex)}
                    className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Info className="w-3 h-3 text-emerald-400" />
                    <span>{isFa ? 'آموزش و نحوه اجرا' : 'Guide & Form'}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {/* YouTube Button */}
                    <button
                      onClick={() => setSelectedExerciseForDetail(ex)}
                      className="px-2 py-1 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/30 text-rose-300 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Youtube className="w-3 h-3 text-rose-500" />
                      <span className="hidden sm:inline">{isFa ? 'فیلم' : 'Video'}</span>
                    </button>

                    {/* Google Images Button */}
                    <a
                      href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
                        ex.googleSearchQuery || `${ex.name.en} exercise form`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold flex items-center gap-1 transition-colors"
                      title={isFa ? 'مشاهده تصاویر و گیف‌های این حرکت در گوگل' : 'Google Images'}
                    >
                      <Search className="w-3 h-3 text-cyan-400" />
                      <span className="hidden sm:inline">{isFa ? 'عکس گوگل' : 'Google'}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-cyan-400" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================== */}
        {/* PHASE 3: COOL-DOWN & STRETCHING (۵ دقیقه سرد کردن) */}
        {/* ==================================================== */}
        <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 overflow-hidden">
          <button
            onClick={() => setShowCooldownDetails(!showCooldownDetails)}
            className="w-full px-4 py-3 flex items-center justify-between text-xs font-extrabold text-indigo-300 hover:bg-indigo-500/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px] font-black">
                ۳
              </span>
              <span>{isFa ? 'فاز ۳: سرد کردن و کشش ایستا (۵ دقیقه)' : 'Phase 3: Cool-Down & Recovery (5 min)'}</span>
            </div>
            {showCooldownDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showCooldownDetails && (
            <div className="px-4 pb-3 pt-1 space-y-1.5 text-xs border-t border-indigo-500/20 bg-slate-950/40">
              {routine.cooldownSteps.map((step, i) => (
                <div key={i} className="flex items-center justify-between text-slate-300 py-1">
                  <span>{isFa ? step.title.fa : step.title.en}</span>
                  <span className="font-mono text-indigo-400 text-[11px] shrink-0 font-bold">
                    {step.durationSec} {isFa ? 'ثانیه' : 'sec'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* History of Completed Home Cardio Sessions */}
      {completedSessions.length > 0 && (
        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-slate-200 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>{isFa ? 'تاریخچه جلسات هوازی خانگی شما:' : 'Recent Home Cardio Sessions:'}</span>
            </h4>
            <span className="text-[11px] text-slate-400">
              {completedSessions.length} {isFa ? 'جلسه ثبت شده' : 'sessions logged'}
            </span>
          </div>

          <div className="space-y-1.5">
            {completedSessions.slice(0, 5).map((sess, idx) => (
              <div
                key={sess.id ? `${sess.id}_${idx}` : `sess_${idx}`}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-bold text-slate-200">{sess.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{sess.date}</span>
                </div>

                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span className="text-emerald-400 font-bold">
                    {sess.durationMinutes} {isFa ? 'دقیقه' : 'min'}
                  </span>
                  <span className="text-rose-400 font-bold">
                    ~{sess.caloriesBurned} {isFa ? 'kcal' : 'kcal'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Single Cardio Exercise Detail Modal */}
      {selectedExerciseForDetail && (
        <CardioExerciseModal
          exercise={selectedExerciseForDetail}
          isOpen={Boolean(selectedExerciseForDetail)}
          onClose={() => setSelectedExerciseForDetail(null)}
          lang={lang}
        />
      )}

      {/* Active Workout Runner Modal */}
      {isActiveWorkoutModalOpen && routine && (
        <ActiveCardioWorkoutModal
          routine={routine}
          isOpen={isActiveWorkoutModalOpen}
          onClose={handleWorkoutModalClose}
          lang={lang}
        />
      )}
    </div>
  );
};
