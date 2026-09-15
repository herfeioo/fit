import React, { useState } from 'react';
import {
  Wrench,
  X,
  Dumbbell,
  Calculator,
  Flame,
  Layers,
  ChevronRight,
  Sparkles,
  Info,
  RotateCcw
} from 'lucide-react';
import { Language } from '../types';

interface GymToolboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

type ToolTab = '1rm' | 'plates' | 'warmup';

export const GymToolboxModal: React.FC<GymToolboxModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const isFa = lang === 'fa';
  const [activeTab, setActiveTab] = useState<ToolTab>('1rm');

  // 1RM Calculator State
  const [liftWeight, setLiftWeight] = useState<number>(80);
  const [liftReps, setLiftReps] = useState<number>(8);

  // Barbell Plate Calculator State
  const [targetWeight, setTargetWeight] = useState<number>(90);
  const [barWeight, setBarWeight] = useState<number>(20);

  if (!isOpen) return null;

  // Calculations for 1RM
  // Epley formula: 1RM = Weight * (1 + Reps / 30)
  // Brzycki formula: 1RM = Weight * (36 / (37 - Reps))
  const calculated1RM = Math.round(
    liftReps === 1 ? liftWeight : (liftWeight * (1 + liftReps / 30) + liftWeight * (36 / (37 - liftReps))) / 2
  );

  const percentageTable = [
    { pct: 100, reps: '1', purposeFa: 'حداکثر رکورد بیشینه (1RM)', purposeEn: 'Max Single' },
    { pct: 95, reps: '2', purposeFa: 'قدرت مطلق عصبی', purposeEn: 'Maximal Strength' },
    { pct: 90, reps: '3 - 4', purposeFa: 'توسعه توان و قدرت انفجاری', purposeEn: 'Power & High Force' },
    { pct: 85, reps: '5 - 6', purposeFa: 'هایپرتروفی قدرتی و بارهای سنگین', purposeEn: 'Strength & Hypertrophy' },
    { pct: 80, reps: '7 - 8', purposeFa: 'تنش مکانیکی بهینه رشد عضلانی', purposeEn: 'Optimal Mechanical Tension' },
    { pct: 75, reps: '9 - 10', purposeFa: 'حجم عضلانی استاندارد و امن', purposeEn: 'Classic Hypertrophy' },
    { pct: 70, reps: '10 - 12', purposeFa: 'پمپ عضلانی و هایپرتروفی متابولیک', purposeEn: 'Metabolic Stress / Pump' },
    { pct: 65, reps: '12 - 15', purposeFa: 'استقامت عضلانی موضعی', purposeEn: 'Muscle Endurance' },
  ].map((row) => ({
    ...row,
    weight: Math.round((calculated1RM * row.pct) / 100 / 2.5) * 2.5, // rounded to nearest 2.5kg
  }));

  // Calculations for Barbell Plates
  const netWeightForPlates = Math.max(0, targetWeight - barWeight);
  const weightPerSide = netWeightForPlates / 2;

  const availablePlates = [20, 15, 10, 5, 2.5, 1.25];
  const plateColors: Record<number, string> = {
    20: 'bg-blue-600 text-white border-blue-400',
    15: 'bg-yellow-500 text-slate-950 border-yellow-300 font-bold',
    10: 'bg-emerald-600 text-white border-emerald-400',
    5: 'bg-slate-200 text-slate-900 border-white font-bold',
    2.5: 'bg-rose-600 text-white border-rose-400',
    1.25: 'bg-amber-700 text-amber-100 border-amber-500',
  };

  const calculatePlatesPerSide = (sideWeight: number) => {
    let remaining = sideWeight;
    const result: { plate: number; count: number }[] = [];

    for (const p of availablePlates) {
      if (remaining >= p) {
        const count = Math.floor(remaining / p);
        result.push({ plate: p, count });
        remaining = Math.round((remaining - count * p) * 100) / 100;
      }
    }
    return { plates: result, remainder: remaining };
  };

  const sidePlateBreakdown = calculatePlatesPerSide(weightPerSide);

  // Warmup protocol for working weight
  const warmupSteps = [
    {
      step: 1,
      titleFa: 'گرم‌کردن مفصلی با میله خالی',
      titleEn: 'Joint Prep & Empty Bar',
      weight: barWeight,
      reps: '10-12',
      noteFa: 'گردش مایع سینوویال و تثبیت مسیر بیومکانیکی حرکت',
      noteEn: 'Synovial fluid circulation & motor path groove',
      rest: '60s',
    },
    {
      step: 2,
      titleFa: 'بیدارباش عصبی ۵۰٪',
      titleEn: 'Neural Activation 50%',
      weight: Math.round((targetWeight * 0.5) / 2.5) * 2.5,
      reps: '5',
      noteFa: 'احساس وزن بدون اسید لاکتیک یا خستگی عضلانی',
      noteEn: 'Feel weight without lactic acid or fatigue',
      rest: '60-90s',
    },
    {
      step: 3,
      titleFa: 'بسیج واحدهای حرکتی ۷۰٪',
      titleEn: 'Motor Unit Recruitment 70%',
      weight: Math.round((targetWeight * 0.7) / 2.5) * 2.5,
      reps: '3',
      noteFa: 'تمرکز بر انفجار و سرعت فاز کانسنتریک',
      noteEn: 'Speed and explosive intent in concentric phase',
      rest: '90s',
    },
    {
      step: 4,
      titleFa: 'پرایمر عصبی ۸۵٪ (فوق‌العاده مهم)',
      titleEn: 'CNS Primer 85%',
      weight: Math.round((targetWeight * 0.85) / 2.5) * 2.5,
      reps: '1',
      noteFa: 'آماده‌سازی سیستم عصبی برای حس سبکی وزنه اصلی',
      noteEn: 'Primes CNS so working sets feel light',
      rest: '120s',
    },
    {
      step: 5,
      titleFa: 'ست‌های کاری اصلی ۱۰۰٪',
      titleEn: 'Main Working Sets 100%',
      weight: targetWeight,
      reps: `${liftReps}`,
      noteFa: 'تمرین با حداکثر تمرکز، تمپوی کنترل‌شده و اضافه بار تدریجی',
      noteEn: 'Full intensity with strict controlled tempo',
      rest: '2-3m',
      isWork: true,
    },
  ];

  return (
    <div
      id="gym-toolbox-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      dir={isFa ? 'rtl' : 'ltr'}
    >
      <div
        id="gym-toolbox-modal-card"
        className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
      >
        {/* Top Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-100 flex items-center gap-2">
                <span>{isFa ? 'جعبه ابزار هوشمند باشگاه' : 'Smart Gym Toolbox'}</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  CSCS
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                {isFa
                  ? 'محاسبه‌گر ۱RM، چینش صفحات هالتر و پروتکل گرم‌کردن'
                  : '1RM, Barbell Plates & Scientific Warmup Ramp'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/60 px-3 py-2 gap-1.5">
          <button
            id="toolbox-tab-1rm"
            onClick={() => setActiveTab('1rm')}
            className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === '1rm'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{isFa ? 'تخمین ۱RM و درصدها' : '1RM & % Table'}</span>
          </button>

          <button
            id="toolbox-tab-plates"
            onClick={() => setActiveTab('plates')}
            className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'plates'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isFa ? 'صفحات هالتر' : 'Barbell Plates'}</span>
          </button>

          <button
            id="toolbox-tab-warmup"
            onClick={() => setActiveTab('warmup')}
            className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'warmup'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{isFa ? 'پروتکل گرم‌کردن' : 'Warmup Ramp'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: 1RM & PERCENTAGES */}
          {activeTab === '1rm' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Controls */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    {isFa ? 'وزنه فعلی (کیلوگرم):' : 'Lift Weight (kg):'}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={5}
                      max={400}
                      step={2.5}
                      value={liftWeight}
                      onChange={(e) => setLiftWeight(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 font-mono font-bold text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    {isFa ? 'تعداد تکرار اجرا شده:' : 'Reps Completed:'}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={liftReps}
                      onChange={(e) => setLiftReps(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 font-mono font-bold text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* 1RM Hero Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/70 to-slate-900 border border-emerald-500/40 text-center space-y-1 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 block">
                  {isFa ? 'یک تکرار بیشینه تخمینی (1RM):' : 'Estimated One-Rep Max (1RM):'}
                </span>
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                    {calculated1RM}
                  </span>
                  <span className="text-xs font-bold text-slate-400">{isFa ? 'کیلوگرم' : 'kg'}</span>
                </div>
                <p className="text-[10px] text-slate-400 pt-1">
                  {isFa
                    ? 'محاسبه شده بر مبنای ترکیب فرمول استاندارد اپلی (Epley) و برزیکی (Brzycki)'
                    : 'Calculated via combined Epley & Brzycki scientific formulas'}
                </p>
              </div>

              {/* Percentages Table */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-200 flex items-center justify-between">
                  <span>{isFa ? 'جدول درصدهای تمرینی و کاربرد هایپرتروفی:' : 'Hypertrophy Loading Zones:'}</span>
                </h4>
                <div className="space-y-1.5 text-xs">
                  {percentageTable.map((row) => (
                    <div
                      key={row.pct}
                      className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-2 hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-10 px-1.5 py-0.5 rounded text-center font-mono font-bold bg-slate-900 text-emerald-400 text-[11px]">
                          {row.pct}%
                        </span>
                        <div>
                          <span className="text-slate-200 font-bold block text-[11px]">
                            {isFa ? row.purposeFa : row.purposeEn}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {isFa ? `${row.reps} تکرار` : `~${row.reps} reps`}
                          </span>
                        </div>
                      </div>

                      <span className="text-sm font-mono font-bold text-white px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-700">
                        {row.weight} {isFa ? 'kg' : 'kg'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BARBELL PLATES */}
          {activeTab === 'plates' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Target & Bar Inputs */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    {isFa ? 'وزن کل هدف (کیلوگرم):' : 'Total Target Weight (kg):'}
                  </label>
                  <input
                    type="number"
                    min={barWeight}
                    max={400}
                    step={2.5}
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(parseFloat(e.target.value) || barWeight)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 font-mono font-bold text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    {isFa ? 'وزن میله هالتر:' : 'Barbell Weight:'}
                  </label>
                  <select
                    value={barWeight}
                    onChange={(e) => setBarWeight(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value={20}>{isFa ? '۲۰ کیلوگرم (المپیک استاندارد مردان)' : '20kg (Olympic Men)'}</option>
                    <option value={15}>{isFa ? '۱۵ کیلوگرم (بانوان / کراس‌فیت)' : '15kg (Women / Crossfit)'}</option>
                    <option value={10}>{isFa ? '۱۰ کیلوگرم (میله سبک / EZ)' : '10kg (EZ / Light Bar)'}</option>
                  </select>
                </div>
              </div>

              {/* Visual Barbell Representation */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold">
                    {isFa ? 'وزن خالص هر طرف میله:' : 'Net Weight Per Side:'}
                  </span>
                  <span className="font-mono font-extrabold text-emerald-400 text-sm">
                    {weightPerSide} {isFa ? 'کیلوگرم در هر طرف' : 'kg per side'}
                  </span>
                </div>

                {/* Graphical Plates Stack */}
                <div className="flex items-center justify-center gap-1.5 py-4 overflow-x-auto min-h-[90px] border-y border-slate-800/80 bg-slate-900/40 rounded-xl px-2">
                  {/* Left Collar */}
                  <div className="h-10 w-2 bg-slate-600 rounded-sm" title="Collar" />

                  {/* Plates displayed from inside out */}
                  {sidePlateBreakdown.plates.length === 0 ? (
                    <span className="text-xs text-slate-500 italic">
                      {isFa ? 'تنها میله خالی (بدون صفحه اضافه)' : 'Empty Barbell only'}
                    </span>
                  ) : (
                    sidePlateBreakdown.plates.flatMap((p) =>
                      Array.from({ length: p.count }).map((_, i) => (
                        <div
                          key={`${p.plate}-${i}`}
                          className={`flex items-center justify-center rounded border shadow-sm px-1.5 transition-all text-center ${
                            plateColors[p.plate] || 'bg-slate-700 text-white'
                          }`}
                          style={{
                            height: `${Math.min(76, Math.max(38, p.plate * 3.5))}px`,
                            minWidth: '24px',
                          }}
                          title={`${p.plate} kg`}
                        >
                          <span className="text-[10px] font-extrabold font-mono rotate-90 sm:rotate-0">
                            {p.plate}
                          </span>
                        </div>
                      ))
                    )
                  )}

                  {/* Right Bar End */}
                  <div className="h-4 w-12 bg-slate-600 rounded-r-md border border-slate-500" title="Barbell Sleeve" />
                </div>

                {/* Exact Breakdown list */}
                <div className="space-y-1 pt-1">
                  <span className="text-[11px] font-bold text-slate-300 block">
                    {isFa ? 'دستورالعمل چیدمان صفحات در هر طرف:' : 'Plates Needed On Each Side:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sidePlateBreakdown.plates.map((p) => (
                      <span
                        key={p.plate}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center gap-1 ${plateColors[p.plate]}`}
                      >
                        <span>{p.count} ×</span>
                        <span>{p.plate} kg</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SCIENTIFIC WARMUP RAMP */}
          {activeTab === 'warmup' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5 leading-relaxed">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {isFa
                    ? 'پروتکل گرم‌کردن تصاعدی هرمی، سیستم عصبی CNS و مفاصل را آماده می‌کند، بدون اینکه ذره‌ای اسید لاکتیک یا خستگی ایجاد کند که قدرت ست اصلی شما را کاهش دهد.'
                    : 'A progressive warmup ramp activates synovial fluid and motor units without generating lactic fatigue.'}
                </span>
              </div>

              {/* Steps */}
              <div className="space-y-2">
                {warmupSteps.map((step) => (
                  <div
                    key={step.step}
                    className={`p-3 rounded-2xl border transition-all ${
                      step.isWork
                        ? 'bg-emerald-950/40 border-emerald-500/50 shadow-sm'
                        : 'bg-slate-800/60 border-slate-700/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
                            step.isWork
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-700 text-slate-200'
                          }`}
                        >
                          {step.step}
                        </span>
                        <h5
                          className={`text-xs font-bold ${
                            step.isWork ? 'text-emerald-300' : 'text-slate-100'
                          }`}
                        >
                          {isFa ? step.titleFa : step.titleEn}
                        </h5>
                      </div>

                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-xs font-bold text-white px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-700">
                          {step.weight} kg
                        </span>
                        <span className="text-xs text-slate-400">× {step.reps}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-1 border-t border-slate-700/50">
                      <span>{isFa ? step.noteFa : step.noteEn}</span>
                      <span className="font-mono text-emerald-400 shrink-0">
                        {isFa ? `استراحت: ${step.rest}` : `Rest: ${step.rest}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            {isFa ? 'بستن پنجره' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
