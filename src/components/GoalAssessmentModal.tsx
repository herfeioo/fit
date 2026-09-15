import React, { useState } from 'react';
import {
  X,
  Target,
  Sparkles,
  Scale,
  Flame,
  CheckCircle2,
  TrendingUp,
  Dumbbell,
  Calendar,
  Zap,
  ChevronRight,
  Info
} from 'lucide-react';
import { UserProfile, Language } from '../types';
import { translations } from '../translations';

interface GoalAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveGoal: (updatedProfile: UserProfile) => void;
  lang: Language;
}

export const GoalAssessmentModal: React.FC<GoalAssessmentModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveGoal,
  lang,
}) => {
  const isFa = lang === 'fa';
  const t = translations[lang];

  // Form states initialized from current profile
  const [targetWeight, setTargetWeight] = useState<number>(profile.targetWeight || 89);
  const [physiqueType, setPhysiqueType] = useState<
    'aesthetic_shredded' | 'lean_muscular' | 'athletic' | 'mass_monster' | 'powerbuilder'
  >(profile.targetPhysiqueType || 'aesthetic_shredded');
  const [focusArea, setFocusArea] = useState<string>(profile.targetFocusArea || 'chest_v_taper');
  const [timeframeWeeks, setTimeframeWeeks] = useState<number>(profile.targetTimeframeWeeks || 24);
  const [targetDescription, setTargetDescription] = useState<string>(
    profile.targetDescription || (isFa ? 'فیزیک عضلانی کات با درصد چربی ۱۰-۱۲٪، زیربغل پهن V-Taper و وزن هدف ۸۹ کیلوگرم' : 'Shredded aesthetic 89kg physique with 10-12% body fat, wide V-taper and defined abs')
  );
  const [selectedPhotoPreset, setSelectedPhotoPreset] = useState<string>(
    profile.targetPhysiquePhotoUrl || 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80'
  );
  const [isSavedToast, setIsSavedToast] = useState<boolean>(false);

  // Early return placed AFTER all hooks
  if (!isOpen) return null;

  // Weight difference calculation
  const weightDiff = Math.round((targetWeight - profile.weight) * 10) / 10;
  const isGaining = weightDiff > 0;
  const isLosing = weightDiff < 0;
  const isMaintaining = weightDiff === 0;

  // Target BMI
  const heightM = profile.height / 100;
  const targetBmi = Math.round((targetWeight / (heightM * heightM)) * 10) / 10;

  // Aesthetic Presets
  const physiqueOptions: {
    id: 'aesthetic_shredded' | 'lean_muscular' | 'athletic' | 'mass_monster' | 'powerbuilder';
    titleFa: string;
    titleEn: string;
    descFa: string;
    descEn: string;
    bodyFat: string;
    img: string;
  }[] = [
    {
      id: 'aesthetic_shredded',
      titleFa: 'فیزیک کات عضلانی و V-Taper (ایده‌آل ۸۹ کیلو)',
      titleEn: 'Aesthetic V-Taper & Shredded (Ideal 89kg)',
      descFa: 'کمر باریک، زیربغل پهن، سرشانه ۳بعدی و شش‌تکه برجسته با درصد چربی تک‌رقمی تا ۱۱٪',
      descEn: 'Narrow waist, wide lats, 3D delts, and chiseled six-pack with 10-12% body fat',
      bodyFat: '10% - 12%',
      img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'lean_muscular',
      titleFa: 'حجم خالص و دانسیته عضلانی سنگین',
      titleEn: 'Lean Muscle & Dense Mass',
      descFa: 'بازوها و سینه حجیم و پر، پاهای ورزیده و ضخیم، بالک حساب‌شده با درصد چربی کنترل‌شده',
      descEn: 'Full chest, big arms, thick quads, lean mass focus with controlled body fat',
      bodyFat: '13% - 15%',
      img: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'athletic',
      titleFa: 'فیتنس ورزشی و چابک (Athletic Conditioning)',
      titleEn: 'Athletic Conditioning & Agility',
      descFa: 'عضلات کشیده، تفکیک طبیعی، چابکی و استقامت بدنی فوق‌العاده با تنفس قوی',
      descEn: 'Functional athletic physique, endurance, agility and natural muscle definition',
      bodyFat: '12% - 14%',
      img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'powerbuilder',
      titleFa: 'پاوربیلدینگ و قدرت حداکثری',
      titleEn: 'Powerbuilding & Maximum Strength',
      descFa: 'عضلات حجیم، پشت تنومند، توان جابجایی رکوردهای سنگین اسکوات، پرس و ددلیفت',
      descEn: 'Thick muscle mass, massive back, heavy lifting capacity and density',
      bodyFat: '14% - 17%',
      img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const focusOptions = [
    { id: 'chest_v_taper', labelFa: 'سینه، زیربغل پهن V-Taper و سرشانه', labelEn: 'Chest, V-Taper Lats & Shoulders' },
    { id: 'arms_chest', labelFa: 'بازوها (جلو و پشت بازو) و بالاسینه', labelEn: 'Arms (Biceps/Triceps) & Upper Chest' },
    { id: 'core_waist', labelFa: 'شکم شش‌تکه، خطوط پهلو و کمر باریک', labelEn: 'Six-Pack Abs & Tight Waist' },
    { id: 'legs_glutes', labelFa: 'چهارسر ران، همسترینگ و باسن ورزیده', labelEn: 'Quads, Hamstrings & Glutes' },
    { id: 'full_balanced', labelFa: 'هارمونی و تناسب متوازن کل بدن', labelEn: 'Full Body Complete Harmony' },
  ];

  const timeframeOptions = [
    { weeks: 12, labelFa: '۳ ماه (فاز ضربتی و شوک اولیه)', labelEn: '12 Weeks (Kickstart Shock)' },
    { weeks: 24, labelFa: '۶ ماه (فاز بنیادی ساخت فیزیک ۸۹ کیلو)', labelEn: '24 Weeks (Foundation 89kg)' },
    { weeks: 48, labelFa: '۱۲ ماه (تحول دائمی و تثبیت کامل)', labelEn: '48 Weeks (1-Year Transformation)' },
    { weeks: 96, labelFa: '۲۴ ماه (ماکروسایکل جامع حرفه‌ای)', labelEn: '24 Months (2-Year Master Plan)' },
  ];

  const handleSelectPhysique = (opt: typeof physiqueOptions[0]) => {
    setPhysiqueType(opt.id);
    setSelectedPhotoPreset(opt.img);
  };

  const handleSave = () => {
    const updated: UserProfile = {
      ...profile,
      targetWeight,
      targetPhysiqueType: physiqueType,
      targetFocusArea: focusArea,
      targetTimeframeWeeks: timeframeWeeks,
      targetDescription: targetDescription.trim(),
      targetPhysiquePhotoUrl: selectedPhotoPreset,
    };

    onSaveGoal(updated);
    setIsSavedToast(true);
    setTimeout(() => {
      setIsSavedToast(false);
      onClose();
    }, 900);
  };

  return (
    <div
      id="goal-assessment-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      dir={isFa ? 'rtl' : 'ltr'}
    >
      <div
        id="goal-assessment-modal-container"
        className="w-full max-w-xl max-h-[92vh] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-100">
                {isFa ? 'پرسشنامه و تنظیم هدف فیزیک بدنی' : 'Target Physique & Goal Assessment'}
              </h2>
              <p className="text-xs text-slate-400">
                {isFa
                  ? 'مشخص کنید دقیقاً چه اندامی با چه وزنی مدنظرتان است'
                  : 'Define the exact physique, aesthetic, and weight you want to achieve'}
              </p>
            </div>
          </div>
          <button
            id="close-goal-assessment-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          {/* Question 1: Target Weight */}
          <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>{isFa ? '۱. وزن هدف شما چقدر است؟' : '1. What is your target weight?'}</span>
              </label>
              <span className="text-xl font-black text-emerald-400">
                {targetWeight} <span className="text-xs font-normal text-slate-400">{isFa ? 'کیلوگرم' : 'kg'}</span>
              </span>
            </div>

            {/* Difference breakdown badge */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400">
                {isFa ? `وزن فعلی شما: ${profile.weight} کیلوگرم` : `Current Weight: ${profile.weight} kg`}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                  isGaining
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : isLosing
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}
              >
                {isGaining && (isFa ? `+${weightDiff} کیلوگرم عضله‌سازی هدفمند` : `+${weightDiff} kg Clean Muscle Mass`)}
                {isLosing && (isFa ? `${weightDiff} کیلوگرم چربی‌سوزی و کات` : `${weightDiff} kg Fat Loss & Definition`)}
                {isMaintaining && (isFa ? 'تثبیت وزن و ریکامپوزیشن عضلانی' : 'Weight Maintenance & Recomp')}
              </span>
              <span className="text-slate-400 text-[11px]">
                {isFa ? `(BMI هدف: ${targetBmi} برای قد ${profile.height}cm)` : `(Target BMI: ${targetBmi} for ${profile.height}cm)`}
              </span>
            </div>

            {/* Quick Weight Chips */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 pt-1">
              {[75, 80, 84, 87, 89, 90, 93, 95].map((w) => (
                <button
                  key={`weight_chip_${w}`}
                  type="button"
                  onClick={() => setTargetWeight(w)}
                  className={`py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    targetWeight === w
                      ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500 shadow-sm ring-1 ring-emerald-500/40'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-400 border-slate-800'
                  }`}
                >
                  {w} {w === 89 ? '★' : ''}
                </button>
              ))}
            </div>

            {/* Slider */}
            <input
              type="range"
              min={50}
              max={130}
              step={0.5}
              value={targetWeight}
              onChange={(e) => setTargetWeight(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          {/* Question 2: Desired Physique Style */}
          <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isFa ? '۲. دلتان می‌خواهد چه تیپ و استایل بدنی داشته باشید؟' : '2. What physique aesthetic do you want?'}</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {physiqueOptions.map((opt) => {
                const isSelected = physiqueType === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectPhysique(opt)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-2 relative overflow-hidden ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 shadow-md ring-1 ring-amber-500/30'
                        : 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <img
                        src={opt.img}
                        alt={opt.titleEn}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-xl object-cover border border-slate-800 flex-shrink-0"
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-slate-100">
                            {isFa ? opt.titleFa : opt.titleEn}
                          </span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 inline" />}
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                          {isFa ? opt.descFa : opt.descEn}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-800/60">
                      <span className="text-slate-400">{isFa ? 'درصد چربی هدف:' : 'Target Body Fat:'}</span>
                      <span className="font-bold text-amber-300">{opt.bodyFat}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question 3: Priority Muscle Groups */}
          <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-cyan-400" />
              <span>{isFa ? '۳. اولویت عضلات در فیزیک ایده‌آل شما کدام است؟' : '3. What are your priority muscle groups?'}</span>
            </label>

            <div className="space-y-1.5">
              {focusOptions.map((f) => {
                const isSelected = focusArea === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFocusArea(f.id)}
                    className={`w-full text-start p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 ring-1 ring-cyan-500/30'
                        : 'bg-slate-950/70 hover:bg-slate-800 text-slate-300 border-slate-800'
                    }`}
                  >
                    <span>{isFa ? f.labelFa : f.labelEn}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 4: Timeframe */}
          <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>{isFa ? '۴. بازه زمانی رسیدن به این فیزیک' : '4. Desired timeframe to reach this goal'}</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {timeframeOptions.map((tf) => {
                const isSelected = timeframeWeeks === tf.weeks;
                return (
                  <button
                    key={`tf_${tf.weeks}`}
                    type="button"
                    onClick={() => setTimeframeWeeks(tf.weeks)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-start flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 ring-1 ring-purple-500/30'
                        : 'bg-slate-950/70 hover:bg-slate-800 text-slate-300 border-slate-800'
                    }`}
                  >
                    <span>{isFa ? tf.labelFa : tf.labelEn}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 5: Personal Vision Description */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>{isFa ? '۵. توصیف انگیزه و هدف شخصی شما' : '5. Personal Vision & Motivation Notes'}</span>
            </label>
            <textarea
              rows={2}
              value={targetDescription}
              onChange={(e) => setTargetDescription(e.target.value)}
              placeholder={
                isFa
                  ? 'مثال: می‌خواهم با وزن ۸۹ کیلوگرم، عضلات کات و سینه پهن و بدون چربی شکم باشم...'
                  : 'Example: I want to be 89kg lean, aesthetic, wide chest, zero belly fat...'
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 leading-relaxed"
            />
          </div>

          {/* Scientific AI Summary Box */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Zap className="w-4 h-4" />
              <span>{isFa ? 'آنالیز و راهبرد هوشمند مربی برای هدف شما:' : 'Smart Coach Strategy for Your Goal:'}</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {isFa ? (
                <>
                  برای ورزشکاری با قد <strong>{profile.height} سانتیمتر</strong>، وزن هدف{' '}
                  <strong className="text-emerald-300">{targetWeight} کیلوگرم</strong> شاخص عضلانی (FFMI) بسیار متناسب
                  و برجسته‌ای را رقم می‌زند. با نرخ استاندارد اضافه کردن ماهانه{' '}
                  <span className="text-amber-300 font-semibold">+۱ کیلوگرم عضله خالص</span> در فاز هایپرتروفی و مصرف روزانه{' '}
                  <span className="text-emerald-300 font-semibold">{Math.round(targetWeight * 2.2)} گرم پروتئین</span>، شما در
                  طول {Math.round(timeframeWeeks / 4)} ماه آینده به این فرم عضلانی خوش‌فیت دست خواهید یافت.
                </>
              ) : (
                <>
                  For an athlete of <strong>{profile.height}cm</strong> height, target weight of{' '}
                  <strong className="text-emerald-300">{targetWeight}kg</strong> gives an optimal muscular FFMI. Target rate of{' '}
                  <span className="text-amber-300 font-semibold">~1kg clean muscle/month</span> and daily{' '}
                  <span className="text-emerald-300 font-semibold">{Math.round(targetWeight * 2.2)}g protein</span> will pave your path within {Math.round(timeframeWeeks / 4)} months.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isFa ? 'انصراف' : 'Cancel'}
          </button>

          <button
            id="save-target-goal-btn"
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isSavedToast ? (isFa ? 'ذخیره شد!' : 'Saved!') : (isFa ? 'ذخیره و ثبت هدف' : 'Save Goal')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
