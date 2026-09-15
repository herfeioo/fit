import React, { useState } from 'react';
import {
  X,
  Scale,
  Ruler,
  TrendingUp,
  Activity,
  Flame,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Zap,
  Calendar,
  Clock
} from 'lucide-react';
import { UserProfile, Language, WeightLog } from '../types';
import { CycleProgressInfo } from '../utils/cycleTracker';
import { CycleProgressCircle } from './CycleProgressCircle';

interface MonthlyBiometricCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onApplyBiometricUpdate: (
    updatedProfile: UserProfile,
    newWeightLog: WeightLog,
    aiAdvisory: { en: string; fa: string; calorieAdjustmentKcal: number }
  ) => void;
  lang: Language;
  cycleProgress?: CycleProgressInfo;
}

export const MonthlyBiometricCheckModal: React.FC<MonthlyBiometricCheckModalProps> = ({
  isOpen,
  onClose,
  profile,
  onApplyBiometricUpdate,
  lang,
  cycleProgress,
}) => {
  const [currentWeight, setCurrentWeight] = useState<number>(profile.weight || 81);
  const [currentWaist, setCurrentWaist] = useState<number>(profile.measurements?.waist || 84);
  const [currentChest, setCurrentChest] = useState<number>(profile.measurements?.chest || 102);
  const [currentArm, setCurrentArm] = useState<number>(profile.measurements?.arms || 37);
  const [currentThigh, setCurrentThigh] = useState<number>(profile.measurements?.thighs || 58);
  const [strengthProgress, setStrengthProgress] = useState<'progressing' | 'stagnant' | 'declining'>('progressing');
  const [fatigueLevel, setFatigueLevel] = useState<number>(5); // 1-10
  const [evaluationResult, setEvaluationResult] = useState<{
    calorieAdjustmentKcal: number;
    cardioAdjustment: boolean;
    status: 'optimal' | 'increase_calories' | 'adjust_cardio' | 'fatigue_alert';
    en: string;
    fa: string;
  } | null>(null);

  if (!isOpen) return null;

  const initialWeight = profile.weight || 81;
  const initialWaist = profile.measurements?.waist || 84;
  const initialChest = profile.measurements?.chest || 102;
  const initialArm = profile.measurements?.arms || 37;
  const initialThigh = profile.measurements?.thighs || 58;

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();

    const weightDiff = currentWeight - initialWeight;
    const waistDiff = currentWaist - initialWaist;
    const chestDiff = currentChest - initialChest;
    const armDiff = currentArm - initialArm;
    const thighDiff = currentThigh - initialThigh;

    let calorieAdjustmentKcal = 0;
    let cardioAdjustment = false;
    let status: 'optimal' | 'increase_calories' | 'adjust_cardio' | 'fatigue_alert' = 'optimal';
    let enText = '';
    let faText = '';

    // Condition A: Fatigue level is critical (>=8)
    if (fatigueLevel >= 8) {
      status = 'fatigue_alert';
      calorieAdjustmentKcal = 0;
      enText = `High Central Nervous System Fatigue (Score: ${fatigueLevel}/10). Your recovery is bottlenecked. Maintain calories, prioritize 8 hours sleep, and avoid lifting to muscular failure this week.`;
      faText = `خستگی شدید سیستم عصبی (امتیاز: ${fatigueLevel}/۱۰). ریکاوری شما با تاخیر مواجه است. کالری فعلی را حفظ کرده، خواب را به ۸ ساعت برسانید و این هفته ست‌ها را به ناتوانی کامل نرسانید.`;
    }
    // Condition B: Weight not increasing (< 0.2 kg gain over 4 weeks towards lean bulk goal)
    else if (weightDiff < 0.2) {
      status = 'increase_calories';
      calorieAdjustmentKcal = 250;
      enText = `Weight Stall Detected (${weightDiff >= 0 ? `+${weightDiff.toFixed(1)}` : weightDiff.toFixed(1)} kg over 4 weeks). To sustain hypertrophy toward your ${profile.targetWeight || 89} kg goal, daily intake is increased by +250 kcal (approx. 45g complex carbs + 15g protein).`;
      faText = `توقف وزن شناسایی شد (${weightDiff >= 0 ? `+${weightDiff.toFixed(1)}` : weightDiff.toFixed(1)} کیلوگرم در ۴ هفته). برای حفظ رشد عضلانی به سمت هدف ${profile.targetWeight || 89} کیلوگرم، کالری روزانه ۲۵۰+ کیلوکالری (معادل ۴۵ گرم کربوهیدرات پیچیده + ۱۵ گرم پروتئین) افزایش یافت.`;
    }
    // Condition C: Waist increasing too fast (> 1.2 cm while arms grew less than 0.4 cm)
    else if (waistDiff > 1.2 && (armDiff < 0.4 && chestDiff < 0.5)) {
      status = 'adjust_cardio';
      cardioAdjustment = true;
      calorieAdjustmentKcal = -150;
      enText = `Excess Adipose Accumulation Alert (+${waistDiff.toFixed(1)} cm waist vs +${armDiff.toFixed(1)} cm arm, +${chestDiff.toFixed(1)} cm chest). Surplus tightened by -150 kcal and 2x 20-min low-intensity steady-state (incline walk) added to preserve lean definition.`;
      faText = `هشدار افزایش نامتناسب چربی دور شکم (+${waistDiff.toFixed(1)} سانتی‌متر دور کمر در برابر +${armDiff.toFixed(1)} سانتی‌متر دور بازو و +${chestDiff.toFixed(1)} سینه). کالری ۱۵۰- کیلوکالری تعدیل شد و ۲ جلسه ۲۰ دقیقه‌ای پیاده‌روی روی شیب جهت حفظ تفکیک عضلانی اضافه گردید.`;
    }
    // Condition D: Lean muscle gain on track
    else {
      status = 'optimal';
      calorieAdjustmentKcal = 0;
      enText = `Optimal Hypertrophy Velocity! Weight gained ${weightDiff >= 0 ? `+${weightDiff.toFixed(1)}` : weightDiff.toFixed(1)} kg with stable waist (+${waistDiff.toFixed(1)} cm) and positive growth (Chest +${chestDiff.toFixed(1)} cm, Arms +${armDiff.toFixed(1)} cm, Thighs +${thighDiff.toFixed(1)} cm). Keep current nutrition and progressive overload intact.`;
      faText = `روند هایپرتروفی کاملاً ایده‌آل است! وزن شما ${weightDiff >= 0 ? `+${weightDiff.toFixed(1)}` : weightDiff.toFixed(1)} کیلوگرم افزایش یافته در حالی که دور کمر کنترل‌شده (+${waistDiff.toFixed(1)} سانتی‌متر) و رشد بافت‌های هدف (سینه +${chestDiff.toFixed(1)}، بازو +${armDiff.toFixed(1)}، ران +${thighDiff.toFixed(1)}) مثبت بوده است. برنامه فعلی را ادامه دهید.`;
    }

    setEvaluationResult({
      calorieAdjustmentKcal,
      cardioAdjustment,
      status,
      en: enText,
      fa: faText
    });
  };

  const handleConfirmAndSave = () => {
    if (!evaluationResult) return;

    const newWeightLog: WeightLog = {
      id: `wlog_${Date.now()}`,
      date: new Date().toISOString(),
      weight: currentWeight,
      waistCm: currentWaist,
      measurements: {
        waist: currentWaist,
        chest: currentChest,
        arms: currentArm,
        thighs: currentThigh
      },
      note: `4-Wk Biometric Audit: Wt ${currentWeight}kg, Waist ${currentWaist}cm, Chest ${currentChest}cm, Arms ${currentArm}cm, Thighs ${currentThigh}cm | ${evaluationResult.en.slice(0, 60)}...`
    };

    const updatedProfile: UserProfile = {
      ...profile,
      weight: currentWeight,
      measurements: {
        ...profile.measurements,
        waist: currentWaist,
        chest: currentChest,
        arms: currentArm,
        thighs: currentThigh
      }
    };

    onApplyBiometricUpdate(updatedProfile, newWeightLog, {
      en: evaluationResult.en,
      fa: evaluationResult.fa,
      calorieAdjustmentKcal: evaluationResult.calorieAdjustmentKcal
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 text-slate-100 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {lang === 'fa' ? 'چک ماهانه (هر ۴ هفته)' : '4-Week Biometric Audit'}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-100 mt-1">
              {lang === 'fa' ? 'سنجش پیشرفت بدنی و تنظیم کالری' : 'Monthly Progress & Nutrition Audit'}
            </h2>
          </div>
          <button
            id="close-biometric-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!evaluationResult ? (
          <form onSubmit={handleEvaluate} className="space-y-4">
            {/* 4-Week Cycle Progress Status Banner */}
            {cycleProgress && (
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <CycleProgressCircle
                    progress={cycleProgress}
                    lang={lang}
                    size="md"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs font-bold text-slate-200">
                        {lang === 'fa' ? 'محاسبه دوره ۴ هفته (۲۸ روز)' : '4-Week Cycle Status'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {cycleProgress.hasStarted
                        ? (lang === 'fa'
                          ? `آغاز از اولین تمرین تیک خورده • روز ${cycleProgress.currentDayNumber} از ۲۸ (${cycleProgress.daysRemaining} روز تا پایان دوره)`
                          : `Started from 1st completed workout • Day ${cycleProgress.currentDayNumber}/28 (${cycleProgress.daysRemaining} days left)`)
                        : (lang === 'fa'
                          ? 'شمارش دوره با تیک زدن اولین روز تمرین فعال خواهد شد'
                          : 'Cycle timer begins as soon as you complete your first workout day')}
                    </p>
                  </div>
                </div>

                <div className="text-right rtl:text-left shrink-0">
                  <span className={`text-xs font-black font-mono px-2 py-1 rounded-lg ${
                    cycleProgress.isDue
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {cycleProgress.percentage}%
                  </span>
                </div>
              </div>
            )}

            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'fa'
                ? 'سیستم هر ۴ هفته داده‌های فیزیولوژیک شما را بررسی می‌کند تا در صورت عدم رشد وزن، کالری را افزایش دهد (+۲۵۰) یا در صورت افزایش زیاد دور کمر، حجم تمرین و کاردیو را تنظیم کند.'
                : 'The AI Sports Scientist audits your biometrics every 4 weeks. If weight is stalling, calories are increased (+250 kcal); if waist grows excessively, cardio/volume is calibrated.'}
            </p>

            {/* Inputs Grid: All 5 Mandatory Biometrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {/* 1. Weight */}
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === 'fa' ? 'وزن فعلی' : 'Weight'}</span>
                </label>
                <div className="flex items-baseline gap-1">
                  <input
                    id="biometric-weight-input"
                    type="number"
                    step="0.1"
                    min="40"
                    max="200"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-2 py-1 text-sm font-bold text-emerald-400 outline-none"
                    required
                  />
                  <span className="text-[10px] text-slate-500 font-mono">kg</span>
                </div>
                <span className="text-[9px] text-slate-500 block">
                  {lang === 'fa' ? `پایه: ${initialWeight} kg` : `Base: ${initialWeight} kg`}
                </span>
              </div>

              {/* 2. Waist */}
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'fa' ? 'دور کمر' : 'Waist'}</span>
                </label>
                <div className="flex items-baseline gap-1">
                  <input
                    id="biometric-waist-input"
                    type="number"
                    step="0.5"
                    min="50"
                    max="160"
                    value={currentWaist}
                    onChange={(e) => setCurrentWaist(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl px-2 py-1 text-sm font-bold text-amber-400 outline-none"
                    required
                  />
                  <span className="text-[10px] text-slate-500 font-mono">cm</span>
                </div>
                <span className="text-[9px] text-slate-500 block">
                  {lang === 'fa' ? `پایه: ${initialWaist} cm` : `Base: ${initialWaist} cm`}
                </span>
              </div>

              {/* 3. Chest */}
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-blue-400" />
                  <span>{lang === 'fa' ? 'دور سینه' : 'Chest'}</span>
                </label>
                <div className="flex items-baseline gap-1">
                  <input
                    id="biometric-chest-input"
                    type="number"
                    step="0.5"
                    min="60"
                    max="180"
                    value={currentChest}
                    onChange={(e) => setCurrentChest(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-xl px-2 py-1 text-sm font-bold text-blue-400 outline-none"
                    required
                  />
                  <span className="text-[10px] text-slate-500 font-mono">cm</span>
                </div>
                <span className="text-[9px] text-slate-500 block">
                  {lang === 'fa' ? `پایه: ${initialChest} cm` : `Base: ${initialChest} cm`}
                </span>
              </div>

              {/* 4. Arm */}
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{lang === 'fa' ? 'دور بازو' : 'Arm Size'}</span>
                </label>
                <div className="flex items-baseline gap-1">
                  <input
                    id="biometric-arm-input"
                    type="number"
                    step="0.5"
                    min="20"
                    max="65"
                    value={currentArm}
                    onChange={(e) => setCurrentArm(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-xl px-2 py-1 text-sm font-bold text-cyan-400 outline-none"
                    required
                  />
                  <span className="text-[10px] text-slate-500 font-mono">cm</span>
                </div>
                <span className="text-[9px] text-slate-500 block">
                  {lang === 'fa' ? `پایه: ${initialArm} cm` : `Base: ${initialArm} cm`}
                </span>
              </div>

              {/* 5. Thigh */}
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 col-span-2 sm:col-span-1">
                <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-rose-400" />
                  <span>{lang === 'fa' ? 'دور ران' : 'Thigh Size'}</span>
                </label>
                <div className="flex items-baseline gap-1">
                  <input
                    id="biometric-thigh-input"
                    type="number"
                    step="0.5"
                    min="30"
                    max="100"
                    value={currentThigh}
                    onChange={(e) => setCurrentThigh(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 rounded-xl px-2 py-1 text-sm font-bold text-rose-400 outline-none"
                    required
                  />
                  <span className="text-[10px] text-slate-500 font-mono">cm</span>
                </div>
                <span className="text-[9px] text-slate-500 block">
                  {lang === 'fa' ? `پایه: ${initialThigh} cm` : `Base: ${initialThigh} cm`}
                </span>
              </div>
            </div>

            {/* Strength Progress */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'fa' ? 'روند قدرت و وزنه‌های تمرینی' : 'Strength Progress (Last 4 Weeks)'}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'progressing', labelEn: 'Increasing (+wt/reps)', labelFa: 'در حال افزایش (+وزنه)' },
                  { id: 'stagnant', labelEn: 'Stagnant (Stall)', labelFa: 'ثابت (استپ وزنی)' },
                  { id: 'declining', labelEn: 'Declining', labelFa: 'کاهش توان' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStrengthProgress(item.id as any)}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all ${
                      strengthProgress === item.id
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lang === 'fa' ? item.labelFa : item.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Fatigue Level Slider (1 - 10) */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <span>{lang === 'fa' ? 'سطح خستگی عمومی (۱ تا ۱۰)' : 'Fatigue Level (1 to 10)'}</span>
                </label>
                <span className="text-xs font-mono font-bold text-purple-400 px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20">
                  {fatigueLevel} / 10
                </span>
              </div>
              <input
                id="fatigue-level-slider"
                type="range"
                min="1"
                max="10"
                value={fatigueLevel}
                onChange={(e) => setFatigueLevel(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>{lang === 'fa' ? '۱ (پرانرژی و بدون خستگی)' : '1 (Fresh & Energetic)'}</span>
                <span>{lang === 'fa' ? '۱۰ (خستگی مفرط سیستم عصبی)' : '10 (Extreme CNS Fatigue)'}</span>
              </div>
            </div>

            {/* Submit Evaluate Button */}
            <button
              id="analyze-biometrics-btn"
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'fa' ? 'تحلیل علمی تغییرات ۴ هفته و تنظیم کالری' : 'Analyze 4-Week Progress & Calibrate Calories'}</span>
            </button>
          </form>
        ) : (
          /* Evaluation Results Screen */
          <div className="space-y-4 animate-fadeIn">
            <div className={`p-4 rounded-2xl border ${
              evaluationResult.status === 'increase_calories'
                ? 'bg-amber-500/10 border-amber-500/30'
                : evaluationResult.status === 'adjust_cardio'
                ? 'bg-orange-500/10 border-orange-500/30'
                : evaluationResult.status === 'fatigue_alert'
                ? 'bg-purple-500/10 border-purple-500/30'
                : 'bg-emerald-500/10 border-emerald-500/30'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {evaluationResult.status === 'increase_calories' ? (
                  <Flame className="w-5 h-5 text-amber-400" />
                ) : evaluationResult.status === 'adjust_cardio' ? (
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                )}
                <h3 className="text-sm font-bold text-slate-100">
                  {lang === 'fa' ? 'نتیجه تحلیل فیزیولوژیک مربی هوشمند' : 'AI Sports Scientist Diagnostic'}
                </h3>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">
                {lang === 'fa' ? evaluationResult.fa : evaluationResult.en}
              </p>

              {evaluationResult.calorieAdjustmentKcal !== 0 && (
                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">{lang === 'fa' ? 'تعدیل کالری روزانه:' : 'Daily Caloric Shift:'}</span>
                  <span className={`px-2 py-0.5 rounded-md font-mono ${
                    evaluationResult.calorieAdjustmentKcal > 0
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-orange-500/20 text-orange-300'
                  }`}>
                    {evaluationResult.calorieAdjustmentKcal > 0 ? `+${evaluationResult.calorieAdjustmentKcal}` : evaluationResult.calorieAdjustmentKcal} kcal/day
                  </span>
                </div>
              )}
            </div>

            {/* All 5 Biometrics Comparative Table & Delta */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 block">
                {lang === 'fa' ? 'مقایسه ۴ هفته گذشته با امروز (۵ فاکتور کلیدی):' : '4-Week Biometric Delta vs Baseline (5 Core Metrics):'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                {/* Weight */}
                <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">{lang === 'fa' ? 'وزن' : 'Weight'}</span>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">{initialWeight} → {currentWeight}</div>
                  <span className="text-xs font-black font-mono text-emerald-400">
                    {(currentWeight - initialWeight) >= 0 ? `+${(currentWeight - initialWeight).toFixed(1)}` : (currentWeight - initialWeight).toFixed(1)} kg
                  </span>
                </div>

                {/* Waist */}
                <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">{lang === 'fa' ? 'دور کمر' : 'Waist'}</span>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">{initialWaist} → {currentWaist}</div>
                  <span className="text-xs font-black font-mono text-amber-400">
                    {(currentWaist - initialWaist) >= 0 ? `+${(currentWaist - initialWaist).toFixed(1)}` : (currentWaist - initialWaist).toFixed(1)} cm
                  </span>
                </div>

                {/* Chest */}
                <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">{lang === 'fa' ? 'دور سینه' : 'Chest'}</span>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">{initialChest} → {currentChest}</div>
                  <span className="text-xs font-black font-mono text-blue-400">
                    {(currentChest - initialChest) >= 0 ? `+${(currentChest - initialChest).toFixed(1)}` : (currentChest - initialChest).toFixed(1)} cm
                  </span>
                </div>

                {/* Arm */}
                <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">{lang === 'fa' ? 'دور بازو' : 'Arm'}</span>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">{initialArm} → {currentArm}</div>
                  <span className="text-xs font-black font-mono text-cyan-400">
                    {(currentArm - initialArm) >= 0 ? `+${(currentArm - initialArm).toFixed(1)}` : (currentArm - initialArm).toFixed(1)} cm
                  </span>
                </div>

                {/* Thigh */}
                <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 block">{lang === 'fa' ? 'دور ران' : 'Thigh'}</span>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">{initialThigh} → {currentThigh}</div>
                  <span className="text-xs font-black font-mono text-rose-400">
                    {(currentThigh - initialThigh) >= 0 ? `+${(currentThigh - initialThigh).toFixed(1)}` : (currentThigh - initialThigh).toFixed(1)} cm
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEvaluationResult(null)}
                className="w-1/3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
              >
                {lang === 'fa' ? 'ویرایش داده‌ها' : 'Edit Inputs'}
              </button>
              <button
                id="save-biometric-audit-btn"
                type="button"
                onClick={handleConfirmAndSave}
                className="w-2/3 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-[0_0_18px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'fa' ? 'تایید و ذخیره در پرونده مربی' : 'Apply & Save to Record'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
