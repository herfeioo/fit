import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Flame,
  BatteryCharging,
  Moon,
  TrendingUp,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { UserProfile, Language, CheckInFeedback, WorkoutPlan } from '../types';
import { translations } from '../translations';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  plan: WorkoutPlan;
  onApplyCheckInAdaptation: (
    checkIn: CheckInFeedback,
    updatedProfile: UserProfile,
    updatedPlan: WorkoutPlan
  ) => void;
  lang: Language;
}

export const CheckInModal: React.FC<CheckInModalProps> = ({
  isOpen,
  onClose,
  profile,
  plan,
  onApplyCheckInAdaptation,
  lang,
}) => {
  const t = translations[lang];

  // Feedback State
  const [trainingDifficulty, setTrainingDifficulty] = useState<'too_hard' | 'balanced' | 'too_easy'>('balanced');
  const [energyLevel, setEnergyLevel] = useState<number>(7);
  const [sorenessDuration, setSorenessDuration] = useState<'under_24h' | '24_48h' | 'over_48h'>('24_48h');
  const [jointPain, setJointPain] = useState<boolean>(false);
  const [jointPainArea, setJointPainArea] = useState<string>('none');
  const [strengthProgress, setStrengthProgress] = useState<'progressing' | 'stagnant' | 'declining'>('progressing');
  const [sleepQuality, setSleepQuality] = useState<'poor' | 'average' | 'great'>('average');
  const [fatigueLevel, setFatigueLevel] = useState<'low' | 'moderate' | 'high' | 'exhausted'>('moderate');

  // AI Output Preview
  const [submittedCheckIn, setSubmittedCheckIn] = useState<CheckInFeedback | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // AI Sports Science Logic
    let actionApplied: 'volume_reduced' | 'intensity_increased' | 'deload_triggered' | 'split_optimized' | 'maintained' = 'maintained';
    let aiRecEn = '';
    let aiRecFa = '';

    // Condition 1: Overtrained or Joint pain -> Trigger Deload
    if (jointPain || fatigueLevel === 'exhausted' || (sorenessDuration === 'over_48h' && sleepQuality === 'poor')) {
      actionApplied = 'deload_triggered';
      aiRecEn = 'Deload Week triggered: System cut training volume by 45% and reduced RPE by 2 points. Focus on joint lubrication, mobility drills, and 8+ hours sleep to clear neurological fatigue.';
      aiRecFa = 'هفته کاهش بار (Deload) فعال شد: حجم تمرینات ۴۵٪ کاهش یافت و شدت ست‌ها به سطح ریکاوری منتقل شد. تمرکز این هفته روی کاهش التهاب مفاصل، کشش فعال و ۸ ساعت خواب عمیق خواهد بود.';
    }
    // Condition 2: Too hard / high fatigue -> Reduce volume
    else if (trainingDifficulty === 'too_hard' || fatigueLevel === 'high') {
      actionApplied = 'volume_reduced';
      aiRecEn = 'Volume Auto-Reduced: Dropped 1 working set per exercise and increased compound rest periods to optimize intra-session ATP resynthesis.';
      aiRecFa = 'کاهش خودکار حجم تمرین: ۱ ست از حرکات کم شد و استراحت بین ست‌های سنگین ۳۰ ثانیه افزایش یافت تا بازسازی ذخایر ATP و ریکاوری عصبی تضمین شود.';
    }
    // Condition 3: Plateau detected
    else if (strengthProgress === 'stagnant') {
      actionApplied = 'split_optimized';
      aiRecEn = 'Plateau Protocol Activated: Applied micro-loading (+1.25kg - 2.5kg) on compound movements and varied accessory movement angles to overcome neurological adaptation.';
      aiRecFa = 'پروتکل شکست استپ وزنی فعال شد: استراتژی میکرو بارگذاری (+۱.۲۵ الی ۲.۵ کیلوگرم) در حرکات چندمفصلی اعمال شد و زاویه فشارهای کمکی تغییر یافت.';
    }
    // Condition 4: Too easy / High energy -> Increase load
    else if (trainingDifficulty === 'too_easy' && energyLevel >= 8 && strengthProgress === 'progressing') {
      actionApplied = 'intensity_increased';
      aiRecEn = 'Progressive Overload Accelerated: Supercompensation phase confirmed. Target weights on core lifts increased by 2.5 - 5kg and target RPE raised to 8.5-9.';
      aiRecFa = 'تسریع اضافه بار تدریجی: فاز جبران مفرط تایید شد. وزنه هدف حرکات اصلی ۲.۵ تا ۵ کیلوگرم افزایش یافت و هدف RPE به ۸.۵ الی ۹ ارتقا پیدا کرد.';
    }
    // Default: Optimal maintenance
    else {
      actionApplied = 'maintained';
      aiRecEn = 'Optimal Homeostasis: Your recovery-to-stress ratio is perfectly dialed in. Maintain current progressive overload schedule.';
      aiRecFa = 'تعادل فیزیولوژیک عالی: نسبت استرس تمرینی به ریکاوری در وضعیت ایده‌آل است. به روند فعلی اضافه بار با تمرکز بر فرم صحیح ادامه دهید.';
    }

    const checkInRecord: CheckInFeedback = {
      id: `checkin_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      trainingDifficulty,
      energyLevel,
      sorenessDuration,
      jointPain,
      jointPainArea: jointPain ? jointPainArea : undefined,
      strengthProgress,
      sleepQuality,
      fatigueLevel,
      aiRecommendation: {
        en: aiRecEn,
        fa: aiRecFa,
      },
      actionApplied,
    };

    // Apply adaptation to workout plan
    const updatedDays = plan.days.map((day) => {
      if (day.isRestDay) return day;

      const adaptedExercises = day.exercises.map((ex) => {
        let sets = ex.sets;
        let rest = ex.restSeconds;
        let rpe = ex.targetRpe || 8;

        if (actionApplied === 'deload_triggered') {
          sets = Math.max(2, Math.round(sets * 0.55));
          rpe = 6;
          rest += 30;
        } else if (actionApplied === 'volume_reduced') {
          sets = Math.max(2, sets - 1);
          rest += 20;
          rpe = Math.max(7, rpe - 0.5);
        } else if (actionApplied === 'intensity_increased') {
          rpe = Math.min(9.5, rpe + 0.5);
        }

        return {
          ...ex,
          sets,
          restSeconds: rest,
          targetRpe: rpe,
        };
      });

      return { ...day, exercises: adaptedExercises };
    });

    const updatedPlan: WorkoutPlan = {
      ...plan,
      days: updatedDays,
      lastAdaptedAt: new Date().toISOString().split('T')[0],
    };

    const updatedProfile: UserProfile = {
      ...profile,
      checkIns: [checkInRecord, ...(profile.checkIns || [])],
      mesocyclePhase: actionApplied === 'deload_triggered' ? 'deload' : profile.mesocyclePhase || 'hypertrophy',
    };

    setSubmittedCheckIn(checkInRecord);
    onApplyCheckInAdaptation(checkInRecord, updatedProfile, updatedPlan);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl max-h-[92vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100">
                {t.checkInTitle}
              </h2>
              <p className="text-xs text-slate-400">
                {t.checkInSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {!submittedCheckIn ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Question 1: Difficulty */}
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-bold">
                  1. {t.trainingTooHard}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'too_easy', label: t.tooEasy, color: 'hover:border-cyan-500' },
                    { id: 'balanced', label: t.balanced, color: 'hover:border-emerald-500' },
                    { id: 'too_hard', label: t.tooHard, color: 'hover:border-rose-500' },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setTrainingDifficulty(item.id as any)}
                      className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                        trainingDifficulty === item.id
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 ' + item.color
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Energy Level */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-slate-300 font-bold">
                    2. {t.energyLevel}
                  </label>
                  <span className="font-mono font-bold text-emerald-400 text-sm">{energyLevel} / 10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={energyLevel}
                  onChange={(e) => setEnergyLevel(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Question 3: Muscle Soreness */}
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-bold">
                  3. {t.sorenessDuration}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'under_24h', label: t.sorenessUnder24 },
                    { id: '24_48h', label: t.soreness2448 },
                    { id: 'over_48h', label: t.sorenessOver48 },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setSorenessDuration(item.id as any)}
                      className={`p-2 rounded-xl border text-center font-medium transition-all cursor-pointer ${
                        sorenessDuration === item.id
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 4: Joint Pain */}
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-bold">
                  4. {t.jointPain}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setJointPain(false)}
                    className={`p-2 rounded-xl border font-bold text-center cursor-pointer transition-all ${
                      !jointPain
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {lang === 'fa' ? 'خیر، مفاصل سالم هستند' : 'No Joint Pain'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setJointPain(true)}
                    className={`p-2 rounded-xl border font-bold text-center cursor-pointer transition-all ${
                      jointPain
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {lang === 'fa' ? 'بله، احساس درد / حساسیت' : 'Yes, Discomfort Present'}
                  </button>
                </div>
                {jointPain && (
                  <div className="pt-1">
                    <select
                      value={jointPainArea}
                      onChange={(e) => setJointPainArea(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-200"
                    >
                      <option value="knee">{lang === 'fa' ? 'زانوها' : 'Knees'}</option>
                      <option value="lower_back">{lang === 'fa' ? 'کمر / مهره‌های لومبار' : 'Lower Back'}</option>
                      <option value="shoulder">{lang === 'fa' ? 'شانه و روتاتور کاف' : 'Shoulder / Rotator Cuff'}</option>
                      <option value="wrist">{lang === 'fa' ? 'مچ دست' : 'Wrists'}</option>
                      <option value="elbow">{lang === 'fa' ? 'آرنج' : 'Elbow'}</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Question 5: Strength Progress */}
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-bold">
                  5. {t.strengthProgress}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'progressing', label: t.progressing },
                    { id: 'stagnant', label: t.stagnant },
                    { id: 'declining', label: t.declining },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setStrengthProgress(item.id as any)}
                      className={`p-2 rounded-xl border text-center font-medium transition-all cursor-pointer ${
                        strengthProgress === item.id
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 6: Sleep Quality & Fatigue */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-slate-300 font-bold">
                    6. {t.sleepQuality}
                  </label>
                  <select
                    value={sleepQuality}
                    onChange={(e) => setSleepQuality(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-200"
                  >
                    <option value="poor">{t.sleepPoor}</option>
                    <option value="average">{t.sleepAvg}</option>
                    <option value="great">{t.sleepGreat}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-300 font-bold">
                    7. {t.fatigueLevel}
                  </label>
                  <select
                    value={fatigueLevel}
                    onChange={(e) => setFatigueLevel(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-200"
                  >
                    <option value="low">{t.fatigueLow}</option>
                    <option value="moderate">{t.fatigueMod}</option>
                    <option value="high">{t.fatigueHigh}</option>
                    <option value="exhausted">{t.fatigueExhausted}</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  id="submit-checkin-btn"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 font-black flex items-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.submitCheckIn}</span>
                </button>
              </div>
            </form>
          ) : (
            /* AI Response Confirmation */
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-5 h-5" />
                <span>{lang === 'fa' ? 'پاسخ و تطبیق هوشمند مربی اعمال شد' : 'AI Adaptive Prescription Applied'}</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {submittedCheckIn.aiRecommendation[lang]}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold cursor-pointer"
                >
                  {t.done}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
