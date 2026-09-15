import React, { useState } from 'react';
import {
  Brain,
  X,
  Sparkles,
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  ShieldAlert,
  Dumbbell,
  Plus,
  RefreshCw,
  Zap,
  Info
} from 'lucide-react';
import {
  Language,
  WorkoutPlan,
  ExerciseEvolutionEvent,
  AIMemoryDatabase,
  Exercise,
  MuscleGroup,
  TargetMuscle,
  StrengthProgressionPerLift,
  ExerciseMemoryFeedbackRecord
} from '../types';
import {
  loadAIMemory,
  applyEvolutionToPlan,
  saveCustomExercise,
  getAllExercisesLibrary
} from '../utils/aiMemoryEngine';
import { getExerciseById } from '../data/exerciseDatabase';

interface AIEvolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  currentPlan: WorkoutPlan;
  onUpdatePlan: (updatedPlan: WorkoutPlan) => void;
  activeTab?: 'evolutions' | 'memory' | 'add_exercise';
}

export const AIEvolutionModal: React.FC<AIEvolutionModalProps> = ({
  isOpen,
  onClose,
  lang,
  currentPlan,
  onUpdatePlan,
  activeTab: initialTab = 'evolutions',
}) => {
  const [tab, setTab] = useState<'evolutions' | 'memory' | 'add_exercise'>(initialTab);
  const [memory, setMemory] = useState<AIMemoryDatabase>(() => loadAIMemory());

  // Form state for adding custom exercise
  const [customNameEn, setCustomNameEn] = useState('');
  const [customNameFa, setCustomNameFa] = useState('');
  const [customMuscleGroup, setCustomMuscleGroup] = useState<MuscleGroup>('chest');
  const [customType, setCustomType] = useState<'compound' | 'isolation'>('compound');
  const [customEquipment, setCustomEquipment] = useState<'barbell' | 'dumbbell' | 'machine' | 'cable' | 'bodyweight'>('barbell');
  const [customDifficulty, setCustomDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [customMovement, setCustomMovement] = useState<'push' | 'pull' | 'squat' | 'hinge' | 'carry' | 'rotation'>('push');
  const [customInjuryRisk, setCustomInjuryRisk] = useState<'low' | 'medium' | 'high'>('low');
  const [customInstructionsEn, setCustomInstructionsEn] = useState('');
  const [customInstructionsFa, setCustomInstructionsFa] = useState('');
  const [customMistakesEn, setCustomMistakesEn] = useState('');
  const [customMistakesFa, setCustomMistakesFa] = useState('');
  const [customSuccessMessage, setCustomSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const pendingEvolutions = memory.evolutionEvents.filter(e => !e.applied);

  const handleApply = (evolutionId: string) => {
    const { updatedPlan, updatedMemory } = applyEvolutionToPlan(currentPlan, evolutionId);
    onUpdatePlan(updatedPlan);
    setMemory({ ...updatedMemory });
  };

  const handleAddCustomExerciseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNameEn.trim() && !customNameFa.trim()) return;

    const newEx: Exercise = {
      id: `custom_${Date.now()}`,
      name: {
        en: customNameEn.trim() || customNameFa.trim(),
        fa: customNameFa.trim() || customNameEn.trim()
      },
      muscleGroup: customMuscleGroup,
      targetMuscle: customMuscleGroup,
      type: customType,
      equipment: customEquipment,
      difficulty: customDifficulty,
      movementPattern: customMovement,
      primaryMuscles: [customMuscleGroup],
      secondaryMuscles: [],
      injuryRiskLevel: customInjuryRisk,
      instructions: {
        en: customInstructionsEn ? customInstructionsEn.split('\n').filter(Boolean) : ['Execute with strict controlled tempo.'],
        fa: customInstructionsFa ? customInstructionsFa.split('\n').filter(Boolean) : ['حرکت را با ریتم کنترل‌شده و تمرکز کامل اجرا کنید.']
      },
      commonMistakes: {
        en: customMistakesEn ? customMistakesEn.split('\n').filter(Boolean) : ['Rushing reps.'],
        fa: customMistakesFa ? customMistakesFa.split('\n').filter(Boolean) : ['شتاب‌زدگی در تکرارها.']
      },
      defaultSets: 3,
      defaultReps: '10-12',
      defaultRestSec: 60,
      isCustom: true,
      guide: {
        steps: {
          en: [customInstructionsEn || 'Perform controlled reps.'],
          fa: [customInstructionsFa || 'اجرای تکرارها با تمرکز.']
        },
        commonMistakes: {
          en: [customMistakesEn || 'Form breakdown.'],
          fa: [customMistakesFa || 'برهم خوردن فرم.']
        },
        breathing: {
          en: 'Exhale during concentric phase, inhale during eccentric.',
          fa: 'بازدم در فاز مثبت، دم در فاز منفی.'
        },
        formCues: {
          en: ['Maintain core engagement throughout.'],
          fa: ['عضلات شکم و فیله را در طول ست منقبض نگه دارید.']
        },
        tempo: '3-0-1-0',
        tempoDescription: {
          en: '3s eccentric lowering, 1s explosive concentric lift.',
          fa: '۳ ثانیه پایین آوردن کنترلی، ۱ ثانیه بالا بردن قدرتی.'
        }
      }
    };

    saveCustomExercise(newEx);
    setCustomSuccessMessage(true);
    setTimeout(() => {
      setCustomSuccessMessage(false);
      setCustomNameEn('');
      setCustomNameFa('');
      setCustomInstructionsEn('');
      setCustomInstructionsFa('');
      setCustomMistakesEn('');
      setCustomMistakesFa('');
      setTab('evolutions');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl max-h-[92vh] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300">
                  NASM / ACSM Level Engine
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {lang === 'fa' ? `سابقه تمرین: ${memory.trainingAgeMonths} ماه` : `Training Age: ${memory.trainingAgeMonths}m`}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-100 mt-0.5">
                {lang === 'fa' ? 'موتور تطبیق و تکامل هوشمند حرکات' : 'AI Adaptive Exercise Evolution'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-800 bg-slate-950 px-5 text-xs font-bold">
          <button
            onClick={() => setTab('evolutions')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              tab === 'evolutions'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>{lang === 'fa' ? 'پیشنهادات تکامل حرکات' : 'Evolutions'}</span>
            {pendingEvolutions.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500 text-slate-950 font-black">
                {pendingEvolutions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setTab('memory')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              tab === 'memory'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>{lang === 'fa' ? 'پایگاه حافظه و پیشرفت' : 'Memory Database'}</span>
          </button>

          <button
            onClick={() => setTab('add_exercise')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              tab === 'add_exercise'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'fa' ? 'افزودن حرکت (گسترش سامانه)' : 'Add Exercise'}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {/* TAB 1: EVOLUTIONS */}
          {tab === 'evolutions' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-slate-300 leading-relaxed">
                  {lang === 'fa'
                    ? 'سیستم هر ۴ تا ۸ هفته (و بلافاصله پس از گزارش درد یا عدم اثربخشی) حرکات را ارزیابی کرده و گزینه‌های بهینه‌تر بیومکانیکی را پیشنهاد می‌دهد.'
                    : 'The AI evaluates exercise effectiveness every 4–8 weeks (or immediately upon joint pain/stagnation) and suggests biomechanically superior variations.'}
                </p>
              </div>

              {pendingEvolutions.length > 0 ? (
                <div className="space-y-3">
                  {pendingEvolutions.map(evo => {
                    const orig = getExerciseById(evo.originalExerciseId);
                    const repl = getExerciseById(evo.replacementExerciseId);

                    return (
                      <div
                        key={evo.id}
                        className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-3 shadow-lg"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            evo.reason === 'pain_relief'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {evo.reason === 'pain_relief'
                              ? (lang === 'fa' ? 'پیشگیری از آسیب و کاهش درد مفصلی' : 'Pain Relief & Joint Protection')
                              : (lang === 'fa' ? 'شکستن استپ عضلانی (Plateau Breaker)' : 'Plateau Breaker & Progressive Hypertrophy')}
                          </span>

                          <span className="text-[10px] text-slate-500 font-mono">
                            {evo.date}
                          </span>
                        </div>

                        {/* Exercise Swap Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                            <span className="text-[10px] text-slate-500 block mb-0.5">
                              {lang === 'fa' ? 'حرکت قبلی:' : 'Current Exercise:'}
                            </span>
                            <h4 className="font-bold text-slate-200">
                              {orig?.name[lang] || evo.originalExerciseId}
                            </h4>
                            <span className="text-[10px] text-rose-400 block mt-1">
                              {evo.reason === 'pain_relief'
                                ? (lang === 'fa' ? 'فشار نامناسب بر مفصل' : 'Articular shear stress')
                                : (lang === 'fa' ? 'استپ وزنه / اثربخشی کم' : 'Stagnating / Low stimulus')}
                            </span>
                          </div>

                          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 relative">
                            <span className="text-[10px] text-emerald-400 block mb-0.5 font-bold">
                              {lang === 'fa' ? 'حرکت پیشنهادی جدید هوش مصنوعی:' : 'AI Evolved Replacement:'}
                            </span>
                            <h4 className="font-black text-emerald-300">
                              {repl?.name[lang] || evo.replacementExerciseId}
                            </h4>
                            <span className="text-[10px] text-emerald-400/80 block mt-1">
                              {lang === 'fa' ? 'تنش بهینه‌تر فیبر عضلانی' : 'Optimized resistance curve'}
                            </span>
                          </div>
                        </div>

                        {/* Scientific Rationale */}
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                          <span className="font-bold text-emerald-400 block mb-1">
                            {lang === 'fa' ? 'تحلیل علمی و توجیه بیومکانیک (Biomechanics):' : 'Scientific & Biomechanical Rationale:'}
                          </span>
                          {evo.rationale[lang]}
                        </div>

                        {/* 1-Click Action */}
                        <button
                          onClick={() => handleApply(evo.id)}
                          className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{lang === 'fa' ? 'اعمال جایگزینی در برنامه تمرینی' : 'Apply Evolution to Program'}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 space-y-2">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500" />
                  <p className="text-slate-300 font-bold">
                    {lang === 'fa' ? 'تمام حرکات در وضعیت رشد بهینه قرار دارند' : 'All Exercises Are Progressing Optimally'}
                  </p>
                  <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                    {lang === 'fa'
                      ? 'هیچ استپ وزنه یا درد مفصلی ثبت نشده است. پس از ثبت بازخورد پایان جلسات تمرین، در صورت نیاز تکامل پیشنهاد داده می‌شود.'
                      : 'No joint pain or lift plateaus detected. The engine will proactively suggest variations as you log workouts.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: AI MEMORY DATABASE */}
          {tab === 'memory' && (
            <div className="space-y-4">
              {/* Stats overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">{lang === 'fa' ? 'سابقه تمرین' : 'Training Age'}</span>
                  <span className="text-sm font-black font-mono text-emerald-400">{memory.trainingAgeMonths} {lang === 'fa' ? 'ماه' : 'months'}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">{lang === 'fa' ? 'حرکات در حافظه' : 'Tracked Lifts'}</span>
                  <span className="text-sm font-black font-mono text-cyan-400">{Object.keys(memory.strengthProgression).length}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">{lang === 'fa' ? 'جلسات خستگی' : 'Fatigue Logs'}</span>
                  <span className="text-sm font-black font-mono text-amber-400">{memory.fatigueHistory.length}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">{lang === 'fa' ? 'گزارش درد/آسیب' : 'Injuries'}</span>
                  <span className="text-sm font-black font-mono text-rose-400">{memory.injuryHistory.length}</span>
                </div>
              </div>

              {/* Tracked Strength Progression & 1RM */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <h3 className="font-bold text-slate-200 flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'fa' ? 'تاریخچه رکوردها و محاسبه ۱RM حرکات' : 'Tracked Lifts & Estimated 1RM'}</span>
                </h3>

                <div className="space-y-2">
                  {(Object.values(memory.strengthProgression) as StrengthProgressionPerLift[]).map(sp => {
                    const ex = getExerciseById(sp.exerciseId);
                    return (
                      <div key={sp.exerciseId} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-slate-200">{ex?.name[lang] || sp.exerciseId}</h4>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {lang === 'fa' ? 'بهترین ست:' : 'Best set:'} {sp.bestWeight}kg × {sp.bestReps} reps • {sp.lastTrainedDate}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 block">Est. 1RM</span>
                          <span className="font-mono font-black text-emerald-400 text-sm">{sp.estimated1RM} kg</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Exercise Feedback & Effectiveness Status */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <h3 className="font-bold text-slate-200 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>{lang === 'fa' ? 'وضعیت اثربخشی حرکات (هوش مصنوعی)' : 'Exercise Effectiveness Status'}</span>
                </h3>

                <div className="space-y-2">
                  {(Object.values(memory.exerciseFeedback) as ExerciseMemoryFeedbackRecord[]).map(ef => {
                    const ex = getExerciseById(ef.exerciseId);
                    const statusColor = ef.status === 'optimal'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : ef.status === 'pain_warning'
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'bg-amber-500/20 text-amber-300';

                    return (
                      <div key={ef.exerciseId} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-slate-200">{ex?.name[lang] || ef.exerciseId}</h4>
                          <span className="text-[10px] text-slate-400">
                            {ef.totalSessions} {lang === 'fa' ? 'جلسه' : 'sessions'} • {lang === 'fa' ? 'میانگین نمره:' : 'Avg:'} {ef.averageEffectiveness} / 3
                          </span>
                        </div>
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${statusColor}`}>
                          {ef.status === 'optimal' ? (lang === 'fa' ? 'رشد بهینه' : 'Optimal') : ef.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ADD CUSTOM EXERCISE (ONTOLOGY SELF-EXPANSION) */}
          {tab === 'add_exercise' && (
            <form onSubmit={handleAddCustomExerciseSubmit} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <Plus className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-slate-300 leading-relaxed">
                  {lang === 'fa'
                    ? 'سیستم حرکات بسته نیست؛ شما می‌توانید هر تمرین جدید ورزشی، کراس‌فیت، یا تخصصی بدنسازی را با ساختار بیومکانیکی کامل به سامانه اضافه کنید.'
                    : 'The exercise library is self-expanding. Define new exercises following the NASM/ACSM schema.'}
                </p>
              </div>

              {customSuccessMessage && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 font-bold text-center animate-fadeIn">
                  ✓ {lang === 'fa' ? 'حرکت با موفقیت به کتابخانه هوشمند افزوده شد!' : 'Exercise successfully added to library!'}
                </div>
              )}

              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">{lang === 'fa' ? 'نام انگلیسی:' : 'English Name:'}</label>
                  <input
                    type="text"
                    required
                    value={customNameEn}
                    onChange={(e) => setCustomNameEn(e.target.value)}
                    placeholder="e.g. Landmine Press"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">{lang === 'fa' ? 'نام فارسی:' : 'Persian Name:'}</label>
                  <input
                    type="text"
                    required
                    value={customNameFa}
                    onChange={(e) => setCustomNameFa(e.target.value)}
                    placeholder="مثال: لندماین پرس سرشانه"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
                  />
                </div>
              </div>

              {/* Muscle & Pattern */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">{lang === 'fa' ? 'گروه عضلانی:' : 'Muscle Group:'}</label>
                  <select
                    value={customMuscleGroup}
                    onChange={(e) => setCustomMuscleGroup(e.target.value as MuscleGroup)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
                  >
                    <option value="chest">Chest (سینه)</option>
                    <option value="back">Back (پشت / زیربغل)</option>
                    <option value="shoulders">Shoulders (سرشانه)</option>
                    <option value="biceps">Biceps (جلو بازو)</option>
                    <option value="triceps">Triceps (پشت بازو)</option>
                    <option value="quads">Quads (چهارسر ران)</option>
                    <option value="hamstrings">Hamstrings (همسترینگ)</option>
                    <option value="glutes">Glutes (سرینی / باسن)</option>
                    <option value="calves">Calves (ساق پا)</option>
                    <option value="core">Core (شکم و میان‌تنه)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">{lang === 'fa' ? 'الگوی حرکتی:' : 'Movement Pattern:'}</label>
                  <select
                    value={customMovement}
                    onChange={(e) => setCustomMovement(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
                  >
                    <option value="push">Push (پرسی/هل دادنی)</option>
                    <option value="pull">Pull (کششی)</option>
                    <option value="squat">Squat (نشست و برخاست)</option>
                    <option value="hinge">Hinge (خم شدن از لگن)</option>
                    <option value="carry">Carry (حمل وزنه / ثبات)</option>
                    <option value="rotation">Rotation (چرخشی)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">{lang === 'fa' ? 'نوع حرکت:' : 'Type:'}</label>
                  <select
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
                  >
                    <option value="compound">Compound (چندمفصلی)</option>
                    <option value="isolation">Isolation (تک‌مفصلی)</option>
                  </select>
                </div>
              </div>

              {/* Equipment & Difficulty & Risk */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">{lang === 'fa' ? 'تجهیزات:' : 'Equipment:'}</label>
                  <select
                    value={customEquipment}
                    onChange={(e) => setCustomEquipment(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 outline-none"
                  >
                    <option value="barbell">Barbell</option>
                    <option value="dumbbell">Dumbbell</option>
                    <option value="machine">Machine</option>
                    <option value="cable">Cable</option>
                    <option value="bodyweight">Bodyweight</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">{lang === 'fa' ? 'سطح سختی:' : 'Difficulty:'}</label>
                  <select
                    value={customDifficulty}
                    onChange={(e) => setCustomDifficulty(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 outline-none"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">{lang === 'fa' ? 'خطر آسیب:' : 'Injury Risk:'}</label>
                  <select
                    value={customInjuryRisk}
                    onChange={(e) => setCustomInjuryRisk(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 outline-none"
                  >
                    <option value="low">Low (پایین)</option>
                    <option value="medium">Medium (متوسط)</option>
                    <option value="high">High (بالا)</option>
                  </select>
                </div>
              </div>

              {/* Instructions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">{lang === 'fa' ? 'دستورالعمل اجرا (انگلیسی):' : 'Instructions (English):'}</label>
                  <textarea
                    rows={3}
                    value={customInstructionsEn}
                    onChange={(e) => setCustomInstructionsEn(e.target.value)}
                    placeholder="Step by step execution cues..."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">{lang === 'fa' ? 'دستورالعمل اجرا (فارسی):' : 'Instructions (Persian):'}</label>
                  <textarea
                    rows={3}
                    value={customInstructionsFa}
                    onChange={(e) => setCustomInstructionsFa(e.target.value)}
                    placeholder="مراحل اجرای صحیح حرکت..."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-slate-200 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'fa' ? 'ثبت و الحاق دائم به پایگاه تمرینات' : 'Save to Exercise Ontology'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
