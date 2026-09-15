import React, { useState } from 'react';
import {
  CheckCircle2,
  X,
  Sparkles,
  Activity,
  AlertCircle,
  Dumbbell,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Flame,
  ShieldAlert
} from 'lucide-react';
import { WorkoutDay, Language, PerExerciseFeedback } from '../types';
import { getExerciseById } from '../data/exerciseDatabase';

interface WorkoutCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: WorkoutDay | null;
  lang: Language;
  onCompleteWorkout: (
    dayId: string,
    dayTitle: string,
    perceivedHardness: number,
    finishedAllSets: boolean,
    notes?: string,
    exerciseFeedbacks?: PerExerciseFeedback[]
  ) => void;
}

export const WorkoutCompletionModal: React.FC<WorkoutCompletionModalProps> = ({
  isOpen,
  onClose,
  day,
  lang,
  onCompleteWorkout,
}) => {
  const [hardness, setHardness] = useState<number>(7);
  const [finishedAllSets, setFinishedAllSets] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>('');

  // Per-Exercise State Map
  const [feedbacks, setFeedbacks] = useState<Record<string, {
    effectiveness: 'high' | 'moderate' | 'low';
    painOrDiscomfort: boolean;
    painArea: string;
    difficulty: 'easy' | 'medium' | 'hard';
    weightUsed: string;
    repsCompleted: string;
  }>>(() => {
    if (!day) return {};
    const initial: Record<string, any> = {};
    day.exercises.forEach(item => {
      initial[item.exerciseId] = {
        effectiveness: 'high',
        painOrDiscomfort: false,
        painArea: '',
        difficulty: 'medium',
        weightUsed: '',
        repsCompleted: ''
      };
    });
    return initial;
  });

  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(
    day?.exercises[0]?.exerciseId || null
  );

  if (!isOpen || !day) return null;

  const updateExerciseFeedback = (
    exId: string,
    field: string,
    value: any
  ) => {
    setFeedbacks(prev => ({
      ...prev,
      [exId]: {
        ...(prev[exId] || {
          effectiveness: 'high',
          painOrDiscomfort: false,
          painArea: '',
          difficulty: 'medium',
          weightUsed: '',
          repsCompleted: ''
        }),
        [field]: value
      }
    }));
  };

  const jointPainOptions = [
    { id: 'Shoulder', en: 'Shoulder (مفصل شانه)', fa: 'شانه' },
    { id: 'Elbow', en: 'Elbow (آرنج)', fa: 'آرنج' },
    { id: 'Wrist', en: 'Wrist (مچ دست)', fa: 'مچ دست' },
    { id: 'Lower Back', en: 'Lower Back (گودی کمر)', fa: 'کمر و ستون فقرات' },
    { id: 'Knee', en: 'Knee (مفصل زانو)', fa: 'زانو' },
    { id: 'Hip', en: 'Hip (مفصل ران/لگن)', fa: 'لگن' },
    { id: 'Neck', en: 'Cervical Spine (گردن)', fa: 'گردن' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedFeedbacks: PerExerciseFeedback[] = day.exercises.map(item => {
      const fb = feedbacks[item.exerciseId] || {
        effectiveness: 'high',
        painOrDiscomfort: false,
        painArea: '',
        difficulty: 'medium',
        weightUsed: '',
        repsCompleted: ''
      };
      return {
        exerciseId: item.exerciseId,
        effectiveness: fb.effectiveness,
        painOrDiscomfort: fb.painOrDiscomfort,
        painArea: fb.painOrDiscomfort ? fb.painArea : undefined,
        difficulty: fb.difficulty,
        weightUsed: fb.weightUsed ? parseFloat(fb.weightUsed) : undefined,
        repsCompleted: fb.repsCompleted ? parseInt(fb.repsCompleted, 10) : undefined
      };
    });

    onCompleteWorkout(
      day.id,
      day.title[lang],
      hardness,
      finishedAllSets,
      notes.trim() || undefined,
      formattedFeedbacks
    );
    onClose();
  };

  const getHardnessDescription = (val: number) => {
    if (val <= 3) {
      return {
        en: 'Light / Easy (RPE 5-6) - Minimal fatigue, plenty in reserve',
        fa: 'سبک و آسان (RPE ۵-۶) - خستگی اندک، توان ذخیره بالا',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
      };
    }
    if (val <= 6) {
      return {
        en: 'Moderate / Balanced (RPE 7) - Solid stimulus, controlled fatigue',
        fa: 'متوسط و متعادل (RPE ۷) - تحریک عضله مناسب، خستگی کنترل‌شده',
        color: 'text-blue-400 bg-blue-500/10 border-blue-500/30'
      };
    }
    if (val <= 8) {
      return {
        en: 'Hard / Hypertrophy Target (RPE 8-9) - 1-2 reps in reserve, optimal stimulus',
        fa: 'سنگین و هایپرتروفی موثر (RPE ۸-۹) - ۱ تا ۲ تکرار تا ناتوانی، حداکثر رشد',
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
      };
    }
    return {
      en: 'Maximal Effort / Near Failure (RPE 10) - Complete exhaustion, high CNS fatigue',
      fa: 'فشار حداکثری و ناتوانی (RPE ۱۰) - خستگی شدید سیستم عصبی',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
    };
  };

  const hardnessDesc = getHardnessDescription(hardness);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 text-slate-100 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300">
                {lang === 'fa' ? 'ثبت بازخورد هوشمند تمرین' : 'AI Adaptive Workout Feedback'}
              </span>
              <h3 className="text-base font-bold text-slate-100 mt-0.5">
                {lang === 'fa' ? 'ارزیابی اثربخشی و اتمام جلسه' : 'Workout Completion & Feedback'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Day Summary */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Dumbbell className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-xs font-bold text-slate-200 block">
                {day.title[lang]}
              </span>
              <span className="text-[10px] text-slate-400">
                {day.exercises.length} {lang === 'fa' ? 'حرکت انجام شده' : 'exercises evaluated'}
              </span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            {new Date().toLocaleDateString(lang === 'fa' ? 'fa-IR' : 'en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Question 1: How hard was it? (1 - 10) */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-200 flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>{lang === 'fa' ? '۱. سختی و شدت تمرین چقدر بود؟ (۱ تا ۱۰)' : '1. Perceived Workout Hardness (1–10)'}</span>
              </label>
              <span className="px-2 py-0.5 rounded-md font-mono font-black text-sm bg-slate-950 text-emerald-400 border border-slate-800">
                {hardness} / 10
              </span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 pt-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setHardness(num)}
                  className={`h-9 rounded-xl font-bold font-mono text-xs transition-all cursor-pointer ${
                    hardness === num
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-md ring-2 ring-emerald-400/40 scale-105'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <div className={`p-2.5 rounded-xl border text-[11px] leading-relaxed transition-all ${hardnessDesc.color}`}>
              {lang === 'fa' ? hardnessDesc.fa : hardnessDesc.en}
            </div>
          </div>

          {/* Question 2: Did you finish all sets? */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
            <label className="font-bold text-slate-200 block">
              {lang === 'fa' ? '۲. آیا تمام ست‌های تجویز شده را به پایان رساندید؟' : '2. Did you finish all prescribed sets?'}
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setFinishedAllSets(true)}
                className={`py-2.5 px-3 rounded-2xl border font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  finishedAllSets
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/40'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>✓</span>
                <span>{lang === 'fa' ? 'بله، همه ست‌ها کامل شد' : 'Yes, Finished All'}</span>
              </button>

              <button
                type="button"
                onClick={() => setFinishedAllSets(false)}
                className={`py-2.5 px-3 rounded-2xl border font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  !finishedAllSets
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-1 ring-amber-500/40'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>⚠</span>
                <span>{lang === 'fa' ? 'خیر، ست ناقص ماند' : 'No, Missed Some'}</span>
              </button>
            </div>
          </div>

          {/* 🧠 Section 3: PER-EXERCISE FEEDBACK (Effectiveness, Pain, Difficulty, 1RM) */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-slate-200">
                  {lang === 'fa' ? '۳. ارزیابی تک‌تک حرکات (حلقه بازخورد هوش مصنوعی)' : '3. Per-Exercise Feedback Loop (AI Memory)'}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">
                {lang === 'fa' ? 'برای تطبیق هوشمند حرکات' : 'Powers Adaptive Engine'}
              </span>
            </div>

            <div className="space-y-2.5 pt-1">
              {day.exercises.map((item, index) => {
                const exDef = getExerciseById(item.exerciseId);
                const fb = feedbacks[item.exerciseId] || {
                  effectiveness: 'high',
                  painOrDiscomfort: false,
                  painArea: '',
                  difficulty: 'medium',
                  weightUsed: '',
                  repsCompleted: ''
                };
                const isExpanded = expandedExerciseId === item.exerciseId;

                return (
                  <div
                    key={item.id ? `${item.id}_${index}` : `${item.exerciseId}_${index}`}
                    className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 transition-all"
                  >
                    {/* Exercise Header Row */}
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setExpandedExerciseId(isExpanded ? null : item.exerciseId)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-200 text-xs">
                            {exDef?.name[lang] || item.exerciseId}
                          </h4>
                          <span className="text-[10px] text-slate-500">
                            {item.sets} {lang === 'fa' ? 'ست' : 'sets'} × {item.reps}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {fb.painOrDiscomfort && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                            {lang === 'fa' ? 'گزارش درد' : 'Pain'}
                          </span>
                        )}
                        <button
                          type="button"
                          className="text-slate-400 hover:text-slate-200 p-1"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Controls */}
                    {isExpanded && (
                      <div className="space-y-3 pt-2 border-t border-slate-800/80 text-[11px]">
                        {/* A. Effectiveness (High / Moderate / Low) */}
                        <div className="space-y-1.5">
                          <span className="text-slate-400 font-medium block">
                            {lang === 'fa' ? 'اثربخشی و دم عضلانی (Effectiveness):' : 'Was this exercise effective?'}
                          </span>
                          <div className="grid grid-cols-3 gap-1.5">
                            {[
                              { id: 'high', labelFa: 'زیاد (عالی)', labelEn: 'High', color: 'emerald' },
                              { id: 'moderate', labelFa: 'متوسط', labelEn: 'Moderate', color: 'blue' },
                              { id: 'low', labelFa: 'کم (بی‌اثر)', labelEn: 'Low', color: 'rose' }
                            ].map(opt => (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => updateExerciseFeedback(item.exerciseId, 'effectiveness', opt.id)}
                                className={`py-1.5 px-2 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                                  fb.effectiveness === opt.id
                                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/30'
                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                {lang === 'fa' ? opt.labelFa : opt.labelEn}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* B. Difficulty (Easy / Medium / Hard) */}
                        <div className="space-y-1.5">
                          <span className="text-slate-400 font-medium block">
                            {lang === 'fa' ? 'سطح دشواری (Difficulty):' : 'Perceived Difficulty:'}
                          </span>
                          <div className="grid grid-cols-3 gap-1.5">
                            {[
                              { id: 'easy', labelFa: 'آسان (Easy)', labelEn: 'Easy' },
                              { id: 'medium', labelFa: 'متوسط (Medium)', labelEn: 'Medium' },
                              { id: 'hard', labelFa: 'سخت (Hard)', labelEn: 'Hard' }
                            ].map(opt => (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => updateExerciseFeedback(item.exerciseId, 'difficulty', opt.id)}
                                className={`py-1.5 px-2 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                                  fb.difficulty === opt.id
                                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-1 ring-amber-500/30'
                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                {lang === 'fa' ? opt.labelFa : opt.labelEn}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* C. Pain or Discomfort? */}
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-300 flex items-center gap-1.5">
                              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                              {lang === 'fa' ? 'احساس درد نامتعارف یا ناراحتی در مفصل؟' : 'Pain or joint discomfort?'}
                            </span>
                            <div className="flex gap-1.5">
                              <button
                                type="button"
                                onClick={() => updateExerciseFeedback(item.exerciseId, 'painOrDiscomfort', false)}
                                className={`px-2.5 py-1 rounded-lg border font-bold text-[10px] cursor-pointer ${
                                  !fb.painOrDiscomfort
                                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                                    : 'bg-slate-950 border-slate-800 text-slate-400'
                                }`}
                              >
                                {lang === 'fa' ? 'خیر (بدون درد)' : 'No Pain'}
                              </button>
                              <button
                                type="button"
                                onClick={() => updateExerciseFeedback(item.exerciseId, 'painOrDiscomfort', true)}
                                className={`px-2.5 py-1 rounded-lg border font-bold text-[10px] cursor-pointer ${
                                  fb.painOrDiscomfort
                                    ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                                    : 'bg-slate-950 border-slate-800 text-slate-400'
                                }`}
                              >
                                {lang === 'fa' ? 'بله (درد دارم)' : 'Yes, Discomfort'}
                              </button>
                            </div>
                          </div>

                          {fb.painOrDiscomfort && (
                            <div className="pt-1.5 border-t border-slate-800 space-y-1.5">
                              <span className="text-[10px] text-rose-300 block">
                                {lang === 'fa' ? 'محل درد را مشخص کنید تا هوش مصنوعی حرکت را اصلاح کند:' : 'Select joint area for AI biomechanical substitution:'}
                              </span>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                                {jointPainOptions.map(joint => (
                                  <button
                                    key={joint.id}
                                    type="button"
                                    onClick={() => updateExerciseFeedback(item.exerciseId, 'painArea', joint.id)}
                                    className={`p-1.5 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
                                      fb.painArea === joint.id
                                        ? 'bg-rose-500 text-slate-950 font-black'
                                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                                    }`}
                                  >
                                    {lang === 'fa' ? joint.fa : joint.id}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* D. Weight and Reps (for progressive overload tracking) */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-slate-400 block mb-1 text-[10px]">
                              {lang === 'fa' ? 'سنگین‌ترین وزنه (kg):' : 'Top Weight (kg):'}
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.5"
                              value={fb.weightUsed}
                              onChange={(e) => updateExerciseFeedback(item.exerciseId, 'weightUsed', e.target.value)}
                              placeholder="e.g. 80"
                              className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 outline-none font-mono"
                            />
                          </div>

                          <div>
                            <label className="text-slate-400 block mb-1 text-[10px]">
                              {lang === 'fa' ? 'تعداد تکرار اجرا شده:' : 'Reps Completed:'}
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={fb.repsCompleted}
                              onChange={(e) => updateExerciseFeedback(item.exerciseId, 'repsCompleted', e.target.value)}
                              placeholder="e.g. 8"
                              className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 outline-none font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Optional Notes */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
            <label className="font-medium text-slate-400 block text-[11px]">
              {lang === 'fa' ? 'یادداشت عملکرد (اختیاری):' : 'Performance Notes (Optional):'}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={lang === 'fa' ? 'مثال: وزنه اسکوات ۲.۵ کیلو اضافه شد...' : 'e.g. Added 2.5kg on squats, good pump...'}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-600 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            id="confirm-workout-completed-btn"
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{lang === 'fa' ? 'ثبت در پایگاه حافظه هوش مصنوعی و تایید اتمام تمرین' : 'Save to AI Memory & Complete Day'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
