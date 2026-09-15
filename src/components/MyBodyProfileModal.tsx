import React, { useState } from 'react';
import {
  X,
  Edit3,
  Sparkles,
  Activity,
  Check,
  ShieldCheck,
  Target,
  Clock,
  Calendar,
  Flame,
  Award,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Scale,
  PieChart
} from 'lucide-react';
import { UserProfile, Language, FitnessGoal, TrainingSplit, ExperienceLevel, InjuryLimitation } from '../types';
import { translations } from '../translations';
import {
  calculateComprehensiveBodyAnalysis,
  ComprehensiveBodyAnalysis
} from '../utils/fitnessCalculations';

interface MyBodyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfileAndRecalculate: (updatedProfile: UserProfile) => void;
  lang: Language;
}

export const MyBodyProfileModal: React.FC<MyBodyProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfileAndRecalculate,
  lang,
}) => {
  const t = translations[lang];

  // Mode: view or edit
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Form editable state initialized from current saved profile
  const [formData, setFormData] = useState<UserProfile>({ ...profile });
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Run scientific analysis on current profile data for the saved view
  const currentAnalysis: ComprehensiveBodyAnalysis = calculateComprehensiveBodyAnalysis(profile);

  // Goal trajectory calculations
  const currentWeight = profile.weight;
  const targetWeight = profile.targetWeight || (profile.goal === 'muscle_gain' ? currentWeight + 6 : currentWeight - 5);
  const weightDiff = Math.round((targetWeight - currentWeight) * 10) / 10;
  
  // Weekly expected change: 0.35kg/wk for bulk, 0.5kg/wk for cut
  const weeklyRate = profile.goal === 'muscle_gain' ? 0.35 : profile.goal === 'fat_loss' ? 0.55 : 0.25;
  const weeksToGoal = Math.max(1, Math.round(Math.abs(weightDiff) / weeklyRate));

  // Handle "Start Analysis / شروع آنالیز" click
  const handleStartAnalysis = (e: React.FormEvent) => {
    e.preventDefault();

    const height = Number(formData.height);
    const weight = Number(formData.weight);
    const waist = Number(formData.measurements?.waist);

    if (!height || height < 120 || height > 240) {
      setAnalysisError(lang === 'fa' ? 'قد باید بین ۱۲۰ تا ۲۴۰ سانتی‌متر باشد.' : 'Height must be between 120 and 240 cm.');
      return;
    }
    if (!weight || weight < 35 || weight > 250) {
      setAnalysisError(lang === 'fa' ? 'وزن باید بین ۳۵ تا ۲۵۰ کیلوگرم باشد.' : 'Weight must be between 35 and 250 kg.');
      return;
    }
    if (!waist || waist < 40 || waist > 200) {
      setAnalysisError(lang === 'fa' ? 'دور کمر باید حداقل ۴۰ سانتی‌متر باشد.' : 'Waist circumference is required.');
      return;
    }

    setAnalysisError(null);

    // Re-run full scientific calculations
    const freshAnalysis = calculateComprehensiveBodyAnalysis(formData);

    const updated: UserProfile = {
      ...formData,
      bodyFatPercent: freshAnalysis.bodyFat.bodyFatPercent,
      targetWeight: Number(formData.targetWeight) || targetWeight,
      lastAnalysisDate: new Date().toISOString().split('T')[0],
      trainingRecommendationsSummary: {
        split: formData.preferredSplit,
        focus: formData.goal,
        weeklyVolumeSets: formData.weeklyDays * 16,
        recommendedDeloadWeek: 6,
      },
      onboardingCompleted: true,
    };

    // Trigger full system rebuild (BMI, WHtR, Calorie needs, Training program, Weekly split)
    onSaveProfileAndRecalculate(updated);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl max-h-[92vh] bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>{t.myBodyProfile}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  {profile.name || (lang === 'fa' ? 'ورزشکار' : 'Athlete')}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'fa'
                  ? 'نمایه جامع بیومتریک، اهداف بدنی و تحلیل هوشمند فیزیولوژیک'
                  : 'Biometric repository, fitness trajectory & adaptive coach analysis'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                id="edit-profile-btn"
                onClick={() => {
                  setFormData({ ...profile });
                  setIsEditing(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)] active:scale-95 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{t.editProfile}</span>
              </button>
            )}

            <button
              id="close-profile-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">

          {/* VIEW MODE: MY BODY PROFILE (PRE-LOADED DATA RETAINED) */}
          {!isEditing ? (
            <div className="space-y-5">
              {/* Athlete Identity Card */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5">
                    <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-lg font-black text-emerald-400">
                      {(profile.name || 'A')[0].toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">{profile.name || 'Athlete'}</h3>
                    <p className="text-xs text-slate-400">
                      {profile.age} {lang === 'fa' ? 'ساله' : 'y/o'} • {profile.gender === 'male' ? t.male : t.female} • {t[`exp_${profile.experience}` as keyof typeof t]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">{t.fitnessGoal}</span>
                    <span className="font-bold text-emerald-400">{t[`goal_${profile.goal}` as keyof typeof t]}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">{t.targetWeight}</span>
                    <span className="font-bold text-slate-100">{targetWeight} kg</span>
                  </div>
                </div>
              </div>

              {/* Core Physical Stats Grid */}
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-2 px-1">
                  {lang === 'fa' ? 'اطلاعات بدنی و اندازه‌گیری‌ها' : 'Physical Metrics & Circumferences'}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">{t.height}</span>
                    <span className="text-base font-black text-slate-100">{profile.height} <span className="text-xs font-normal text-slate-400">cm</span></span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">{t.weight}</span>
                    <span className="text-base font-black text-slate-100">{profile.weight} <span className="text-xs font-normal text-slate-400">kg</span></span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">{t.waist}</span>
                    <span className="text-base font-black text-cyan-400">{profile.measurements?.waist || '-'} <span className="text-xs font-normal text-slate-400">cm</span></span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">{t.chest}</span>
                    <span className="text-base font-black text-slate-100">{profile.measurements?.chest || '-'} <span className="text-xs font-normal text-slate-400">cm</span></span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">{t.arms}</span>
                    <span className="text-base font-black text-slate-100">{profile.measurements?.arms || '-'} <span className="text-xs font-normal text-slate-400">cm</span></span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">{t.thighs}</span>
                    <span className="text-base font-black text-slate-100">{profile.measurements?.thighs || '-'} <span className="text-xs font-normal text-slate-400">cm</span></span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">{t.shoulders}</span>
                    <span className="text-base font-black text-slate-100">{profile.measurements?.shoulders || '-'} <span className="text-xs font-normal text-slate-400">cm</span></span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">{t.bodyFatEst}</span>
                    <span className="text-base font-black text-emerald-400">~{currentAnalysis.bodyFat.bodyFatPercent}%</span>
                  </div>
                </div>
              </div>

              {/* RETAINED PRE-ANALYZED DATA SECTION */}
              <div className="p-4 sm:p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-xs font-bold text-slate-200">
                      {lang === 'fa' ? 'نتایج آنالیز علمی ثبت‌شده (Pre-Analyzed Intelligence)' : 'Retained Scientific Analysis'}
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    WHO Standard • DoD Model
                  </span>
                </div>

                {/* Grid of Pre-Analyzed Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">{t.bmi}</span>
                    <span className="text-base font-extrabold text-slate-100 my-0.5 block">{currentAnalysis.bmi.bmi}</span>
                    <span className={`text-[9px] font-bold ${currentAnalysis.bmi.color}`}>{currentAnalysis.bmi.category[lang]}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">WHtR (Waist/Height)</span>
                    <span className="text-base font-extrabold text-cyan-400 my-0.5 block">{currentAnalysis.whtr}</span>
                    <span className={`text-[9px] font-bold ${currentAnalysis.whtrColor}`}>{currentAnalysis.whtrCategory[lang]}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">{lang === 'fa' ? 'توده عضلانی (LBM)' : 'Lean Mass'}</span>
                    <span className="text-base font-extrabold text-emerald-400 my-0.5 block">{currentAnalysis.leanMassKg} kg</span>
                    <span className="text-[9px] text-slate-400">FFMI: {currentAnalysis.normalizedFfmi}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">{t.calories}</span>
                    <span className="text-base font-extrabold text-amber-400 my-0.5 block">{currentAnalysis.targetCalories} kcal</span>
                    <span className="text-[9px] text-slate-400">BMR: {currentAnalysis.bmr} kcal</span>
                  </div>
                </div>

                {/* Goal Trajectory Bar */}
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-slate-200">
                      <Target className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{lang === 'fa' ? 'سیر پیشرفت تا وزن هدف' : 'Fitness Goal Trajectory'}</span>
                    </div>
                    <span className="text-emerald-400 font-bold font-mono">
                      {currentWeight} kg → {targetWeight} kg ({weightDiff > 0 ? `+${weightDiff}` : weightDiff} kg)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, Math.max(15, (currentWeight / targetWeight) * 100))}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>{lang === 'fa' ? `زمان تخمینی با نرخ ایمن: حدود ${weeksToGoal} هفته` : `Estimated duration at safe rate: ~${weeksToGoal} weeks`}</span>
                    <span className="text-slate-500">2-Year Macrocycle Track</span>
                  </p>
                </div>

                {/* 1. Scientific Overweight & Tissue Differentiation Card */}
                {currentAnalysis.overweight && (
                  <div className="p-3.5 rounded-2xl bg-slate-900/95 border border-slate-800 space-y-2.5">
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
                            {lang === 'fa' ? 'طبقه‌بندی ساختار بدنی فراتر از فرمول‌های تک‌بعدی BMI' : 'Advanced multi-compartment body analysis'}
                          </span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border bg-slate-950/80 ${currentAnalysis.overweight.badgeColor} border-current/20`}>
                        {currentAnalysis.overweight.title[lang]}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                        <span className="text-[10px] text-slate-400 block">
                          {lang === 'fa' ? 'محدوده وزن سالم قد شما (WHO)' : 'WHO Healthy Weight Range'}
                        </span>
                        <span className="text-xs font-bold text-slate-200 mt-0.5 block">
                          {currentAnalysis.overweight.minNormalWeightKg} - {currentAnalysis.overweight.maxNormalWeightKg} kg
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                        <span className="text-[10px] text-slate-400 block">
                          {lang === 'fa' ? 'اختلاف با سقف وزن نرمال' : 'Weight vs WHO Ceiling'}
                        </span>
                        <span className={`text-xs font-bold mt-0.5 block ${currentAnalysis.overweight.grossExcessWeightKg > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {currentAnalysis.overweight.grossExcessWeightKg > 0
                            ? `+${currentAnalysis.overweight.grossExcessWeightKg} kg ${lang === 'fa' ? 'بالای سقف' : 'above ceiling'}`
                            : (lang === 'fa' ? 'در محدوده استاندارد' : 'Within Normal Range')}
                        </span>
                      </div>

                      <div className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                        <span className="text-[10px] text-slate-400 block">
                          {lang === 'fa' ? 'ماهیت بافت وزن مازاد' : 'Tissue Classification'}
                        </span>
                        <span className={`text-xs font-bold mt-0.5 block ${currentAnalysis.overweight.badgeColor}`}>
                          {currentAnalysis.overweight.tissueType[lang]}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                      {currentAnalysis.overweight.description[lang]}
                    </p>

                    <div className="text-[10px] text-slate-400 flex items-start gap-1.5 pt-0.5">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span>{currentAnalysis.overweight.differentiationNote[lang]}</span>
                    </div>
                  </div>
                )}

                {/* 2. Scientific Excess Fat Breakdown Card */}
                {currentAnalysis.excessFat && (
                  <div className="p-3.5 rounded-2xl bg-slate-900/95 border border-slate-800 space-y-2.5">
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
                            {lang === 'fa' ? 'تفکیک چربی ضروری بدن از چربی مازاد برای جلوگیری از اشتباه محاسباتی' : 'Compartmental breakdown of fat mass'}
                          </span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border bg-slate-950/80 ${currentAnalysis.excessFat.badgeColor} border-current/20`}>
                        {currentAnalysis.excessFat.status[lang]}
                      </span>
                    </div>

                    {/* 3-Tier Fat Breakdown */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                        <span className="text-[10px] text-slate-400 block">
                          {lang === 'fa' ? 'چربی ضروری زیستی' : 'Essential Fat'}
                        </span>
                        <span className="text-sm font-extrabold text-slate-200 my-0.5 block">
                          {currentAnalysis.excessFat.essentialFatKg} <span className="text-[10px] font-normal text-slate-500">kg</span>
                        </span>
                        <span className="text-[9px] text-slate-500">
                          {lang === 'fa' ? 'برای اعصاب و هورمون' : 'Vital physiological'}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                        <span className="text-[10px] text-slate-400 block">
                          {lang === 'fa' ? 'چربی سالم مجاز' : 'Healthy Baseline'}
                        </span>
                        <span className="text-sm font-extrabold text-emerald-400 my-0.5 block">
                          {currentAnalysis.excessFat.healthyBaselineFatKg} <span className="text-[10px] font-normal text-slate-500">kg</span>
                        </span>
                        <span className="text-[9px] text-emerald-400/80">
                          {lang === 'fa' ? `تا سقف ${currentAnalysis.excessFat.targetHealthyBfPercent}٪` : `Up to ${currentAnalysis.excessFat.targetHealthyBfPercent}%`}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                        <span className="text-[10px] text-slate-400 block">
                          {lang === 'fa' ? 'چربی اضافه واقعی' : 'Actual Excess Fat'}
                        </span>
                        <span className={`text-sm font-extrabold my-0.5 block ${currentAnalysis.excessFat.excessFatKg > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {currentAnalysis.excessFat.excessFatKg} <span className="text-[10px] font-normal text-slate-500">kg</span>
                        </span>
                        <span className="text-[9px] text-slate-400">
                          {currentAnalysis.excessFat.excessFatKg > 0 ? (lang === 'fa' ? 'مازاد برای سوزاندن' : 'Fat to burn') : (lang === 'fa' ? 'فاقد چربی اضافه' : 'Optimal')}
                        </span>
                      </div>
                    </div>

                    {/* Proportional Stack Bar */}
                    <div className="space-y-1">
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                        {/* Essential */}
                        <div
                          className="bg-slate-500 h-full"
                          style={{ width: `${Math.max(5, (currentAnalysis.excessFat.essentialFatKg / Math.max(1, currentAnalysis.fatMassKg)) * 100)}%` }}
                          title="Essential Fat"
                        />
                        {/* Healthy Baseline */}
                        <div
                          className="bg-emerald-500 h-full"
                          style={{ width: `${Math.max(10, ((currentAnalysis.excessFat.healthyBaselineFatKg - currentAnalysis.excessFat.essentialFatKg) / Math.max(1, currentAnalysis.fatMassKg)) * 100)}%` }}
                          title="Healthy Baseline Fat"
                        />
                        {/* Excess Fat */}
                        {currentAnalysis.excessFat.excessFatKg > 0 && (
                          <div
                            className="bg-amber-400 h-full"
                            style={{ width: `${Math.max(5, (currentAnalysis.excessFat.excessFatKg / Math.max(1, currentAnalysis.fatMassKg)) * 100)}%` }}
                            title="Excess Fat"
                          />
                        )}
                      </div>
                      <div className="flex justify-between text-[9px] text-slate-500 px-0.5">
                        <span>{lang === 'fa' ? `چربی کل: ${currentAnalysis.fatMassKg} kg (%${currentAnalysis.bodyFat.bodyFatPercent})` : `Total Fat: ${currentAnalysis.fatMassKg} kg (${currentAnalysis.bodyFat.bodyFatPercent}%)`}</span>
                        <span>{lang === 'fa' ? `چربی هدف: %${currentAnalysis.excessFat.targetHealthyBfPercent}` : `Target BF: ${currentAnalysis.excessFat.targetHealthyBfPercent}%`}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                      {currentAnalysis.excessFat.explanation[lang]}
                    </p>

                    <p className="text-[10px] text-cyan-400/90 font-medium">
                      🎯 {currentAnalysis.excessFat.clinicalBreakdown[lang]}
                    </p>
                  </div>
                )}
              </div>

              {/* Safety and Injuries */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300 font-medium">
                    {lang === 'fa' ? 'محدودیت یا آسیب ثبت‌شده:' : 'Injury History / Safeguard:'}
                  </span>
                </div>
                <span className="font-bold text-amber-400">
                  {t[`injury_${profile.injuryLimitation || 'none'}` as keyof typeof t]}
                </span>
              </div>
            </div>
          ) : (
            /* EDIT MODE: EDIT ALL PROFILE FIELDS & PRESS "START ANALYSIS" */
            <form onSubmit={handleStartAnalysis} className="space-y-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  {lang === 'fa'
                    ? 'توجه: با تغییر اطلاعات و فشردن دکمه «شروع آنالیز»، تمامی محاسبات بیومتریک، برنامه تمرینی و نیازهای تغذیه‌ای مجدداً به صورت اختصاصی ساخته خواهند شد.'
                    : 'Notice: Editing and pressing "Start Analysis" will completely recalculate biometrics, rebuild the training split and update nutrition targets.'}
                </p>
              </div>

              {analysisError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
                  {analysisError}
                </div>
              )}

              {/* Personal Details */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 block px-1">
                  {lang === 'fa' ? 'مشخصات فردی و هدف' : 'Personal Info & Goal'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">{lang === 'fa' ? 'نام ورزشکار' : 'Name'}</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-bold focus:border-emerald-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">{t.age}</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-bold focus:border-emerald-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">{t.gender}</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-bold focus:border-emerald-500 outline-none"
                    >
                      <option value="male">{t.male}</option>
                      <option value="female">{t.female}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Goal & Target Weight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">{t.fitnessGoal}</label>
                  <select
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value as FitnessGoal })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-bold focus:border-emerald-500 outline-none"
                  >
                    <option value="muscle_gain">{t.goal_muscle_gain}</option>
                    <option value="fat_loss">{t.goal_fat_loss}</option>
                    <option value="recomposition">{t.goal_recomposition}</option>
                    <option value="strength">{t.goal_strength}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">{t.targetWeight} (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.targetWeight || ''}
                    placeholder="e.g. 89"
                    onChange={(e) => setFormData({ ...formData, targetWeight: parseFloat(e.target.value) || undefined })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-bold focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* Body Stats */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 block px-1">
                  {lang === 'fa' ? 'سایزها و وزن (سانتی‌متر و کیلوگرم)' : 'Body Biometrics (cm & kg)'}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">{t.height} (cm)</label>
                    <input
                      type="number"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-100"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">{t.weight} (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-100"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">{t.waist} (cm)</label>
                    <input
                      type="number"
                      value={formData.measurements?.waist || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        measurements: { ...formData.measurements, waist: Number(e.target.value) }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-100"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">{t.chest} (cm)</label>
                    <input
                      type="number"
                      value={formData.measurements?.chest || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        measurements: { ...formData.measurements, chest: Number(e.target.value) }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">{t.arms} (cm)</label>
                    <input
                      type="number"
                      value={formData.measurements?.arms || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        measurements: { ...formData.measurements, arms: Number(e.target.value) }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">{t.thighs} (cm)</label>
                    <input
                      type="number"
                      value={formData.measurements?.thighs || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        measurements: { ...formData.measurements, thighs: Number(e.target.value) }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">{t.shoulders} (cm)</label>
                    <input
                      type="number"
                      value={formData.measurements?.shoulders || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        measurements: { ...formData.measurements, shoulders: Number(e.target.value) }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">{t.neck} (cm)</label>
                    <input
                      type="number"
                      value={formData.measurements?.neck || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        measurements: { ...formData.measurements, neck: Number(e.target.value) }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-100"
                    />
                  </div>
                </div>
              </div>

              {/* Training Experience & Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">{t.experienceLevel}</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value as ExperienceLevel })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-bold focus:border-emerald-500 outline-none"
                  >
                    <option value="beginner">{t.exp_beginner}</option>
                    <option value="intermediate">{t.exp_intermediate}</option>
                    <option value="advanced">{t.exp_advanced}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">{t.weeklyAvailability}</label>
                  <select
                    value={formData.weeklyDays}
                    onChange={(e) => setFormData({ ...formData, weeklyDays: Number(e.target.value) as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-bold focus:border-emerald-500 outline-none"
                  >
                    <option value={3}>3 {t.daysPerWeek}</option>
                    <option value={4}>4 {t.daysPerWeek} (Recommended)</option>
                    <option value={5}>5 {t.daysPerWeek}</option>
                    <option value={6}>6 {t.daysPerWeek}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">{lang === 'fa' ? 'آسیبدیدگی یا حساسیت' : 'Injury Limitation'}</label>
                  <select
                    value={formData.injuryLimitation || 'none'}
                    onChange={(e) => setFormData({ ...formData, injuryLimitation: e.target.value as InjuryLimitation })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-bold focus:border-emerald-500 outline-none"
                  >
                    <option value="none">{t.injury_none}</option>
                    <option value="shoulder">{t.injury_shoulder}</option>
                    <option value="lower_back">{t.injury_lower_back}</option>
                    <option value="knee">{t.injury_knee}</option>
                    <option value="wrist">{t.injury_wrist}</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons: START ANALYSIS BUTTON */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700 cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  id="start-analysis-profile-btn"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.35)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.startAnalysis}</span>
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
