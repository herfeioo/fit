import React, { useState } from 'react';
import { X, Check, Activity, Sparkles, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';
import { UserProfile, Language, ExperienceLevel, FitnessGoal, TrainingSplit } from '../types';
import { translations } from '../translations';
import {
  calculateComprehensiveBodyAnalysis,
  ComprehensiveBodyAnalysis
} from '../utils/fitnessCalculations';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (updated: UserProfile, regeneratePlan: boolean) => void;
  lang: Language;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  lang,
}) => {
  const [formData, setFormData] = useState<UserProfile>({ ...profile });
  const [analysisResult, setAnalysisResult] = useState<ComprehensiveBodyAnalysis | null>(() => {
    try {
      return calculateComprehensiveBodyAnalysis(profile);
    } catch {
      return null;
    }
  });
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [inputsChanged, setInputsChanged] = useState<boolean>(false);

  if (!isOpen) return null;

  const t = translations[lang];

  const handleRunAnalysis = () => {
    const height = Number(formData.height);
    const weight = Number(formData.weight);
    const waist = Number(formData.measurements.waist);
    const neck = Number(formData.measurements.neck || (formData.gender === 'male' ? Math.round(waist * 0.46) : Math.round(waist * 0.42)));
    const hips = Number(formData.measurements.hips || (formData.gender === 'female' ? Math.round(waist * 1.18) : Math.round(waist * 1.05)));

    if (!height || height < 120 || height > 240) {
      setAnalysisError(lang === 'fa' ? 'لطفاً قد معتبر بین ۱۲۰ تا ۲۴۰ سانتی‌متر وارد کنید.' : 'Please enter a valid height (120 - 240 cm).');
      return;
    }
    if (!weight || weight < 35 || weight > 250) {
      setAnalysisError(lang === 'fa' ? 'لطفاً وزن معتبر بین ۳۵ تا ۲۵۰ کیلوگرم وارد کنید.' : 'Please enter a valid weight (35 - 250 kg).');
      return;
    }
    if (!waist || waist < 40 || waist > 200) {
      setAnalysisError(lang === 'fa' ? 'لطفاً اندازه دور کمر را وارد کنید (حداقل ۴۰ سانتی‌متر).' : 'Please enter a valid waist circumference.');
      return;
    }

    if (formData.gender === 'male' && waist <= neck) {
      setAnalysisError(
        lang === 'fa'
          ? 'خطا در فرمول US Navy: دور کمر باید از دور گردن بزرگتر باشد.'
          : 'Waist circumference must be greater than neck for US Navy calculation.'
      );
      return;
    }

    if (formData.gender === 'female' && (waist + hips) <= neck) {
      setAnalysisError(
        lang === 'fa'
          ? 'خطا در فرمول US Navy بانوان: مجموع دور کمر و باسن باید از دور گردن بزرگتر باشد.'
          : 'Invalid circumference for female US Navy formula.'
      );
      return;
    }

    setAnalysisError(null);
    const res = calculateComprehensiveBodyAnalysis(formData);
    setAnalysisResult(res);
    setInputsChanged(false);

    setFormData(prev => ({
      ...prev,
      bodyFatPercent: res.bodyFat.bodyFatPercent
    }));
  };

  const handleSave = (shouldRegenerate: boolean) => {
    let finalBf = formData.bodyFatPercent;
    if (analysisResult) {
      finalBf = analysisResult.bodyFat.bodyFatPercent;
    } else {
      const computed = calculateComprehensiveBodyAnalysis(formData);
      finalBf = computed.bodyFat.bodyFatPercent;
    }

    const updated: UserProfile = {
      ...formData,
      bodyFatPercent: finalBf,
      onboardingCompleted: true,
    };
    onSaveProfile(updated, shouldRegenerate);
    onClose();
  };

  const updateField = (updater: (prev: UserProfile) => UserProfile) => {
    setFormData(prev => {
      const next = updater(prev);
      setInputsChanged(true);
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100">
                {t.onboardingTitle}
              </h2>
              <p className="text-xs text-slate-400">
                {t.onboardingSubtitle}
              </p>
            </div>
          </div>
          <button
            id="close-onboarding-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm">
          {/* Section 1: Biometrics */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-emerald-400">
              {t.personalStats}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Name */}
              <div className="col-span-2">
                <label className="block text-xs text-slate-400 mb-1">{lang === 'fa' ? 'نام ورزشکار' : 'Athlete Name'}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-slate-100 text-sm focus:outline-none"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs text-slate-400 mb-1">{t.age}</label>
                <input
                  type="number"
                  min="14"
                  max="85"
                  value={formData.age}
                  onChange={(e) => updateField(prev => ({ ...prev, age: Number(e.target.value) || 20 }))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-slate-100 text-sm focus:outline-none"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs text-slate-400 mb-1">{t.gender}</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => updateField(prev => ({ ...prev, gender: 'male' }))}
                    className={`py-2 px-2 rounded-xl border text-xs font-semibold ${
                      formData.gender === 'male'
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    {t.male}
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField(prev => ({ ...prev, gender: 'female' }))}
                    className={`py-2 px-2 rounded-xl border text-xs font-semibold ${
                      formData.gender === 'female'
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    {t.female}
                  </button>
                </div>
              </div>

              {/* Height */}
              <div>
                <label className="block text-xs text-slate-400 mb-1">{t.height} (cm)</label>
                <input
                  type="number"
                  min="120"
                  max="240"
                  value={formData.height}
                  onChange={(e) => updateField(prev => ({ ...prev, height: Number(e.target.value) || 170 }))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-slate-100 text-sm focus:outline-none"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-xs text-slate-400 mb-1">{t.weight} (kg)</label>
                <input
                  type="number"
                  min="35"
                  max="220"
                  step="0.5"
                  value={formData.weight}
                  onChange={(e) => updateField(prev => ({ ...prev, weight: Number(e.target.value) || 70 }))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-slate-100 text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Experience & Goal */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-emerald-400">
              {t.fitnessGoal} & {t.experienceLevel}
            </h3>

            {/* Goals Radio Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'muscle_gain', label: t.goal_muscle_gain, desc: t.goalDesc_muscle_gain },
                { id: 'fat_loss', label: t.goal_fat_loss, desc: t.goalDesc_fat_loss },
                { id: 'recomposition', label: t.goal_recomposition, desc: t.goalDesc_recomposition },
                { id: 'strength', label: t.goal_strength, desc: t.goalDesc_strength },
              ].map((goalItem) => (
                <button
                  type="button"
                  key={goalItem.id}
                  onClick={() => updateField(prev => ({ ...prev, goal: goalItem.id as FitnessGoal }))}
                  className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                    formData.goal === goalItem.id
                      ? 'bg-emerald-950/40 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-slate-100">{goalItem.label}</span>
                    {formData.goal === goalItem.id && <Check className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <span className="text-xs text-slate-400 leading-snug">{goalItem.desc}</span>
                </button>
              ))}
            </div>

            {/* Experience Level */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {[
                { id: 'beginner', label: t.exp_beginner },
                { id: 'intermediate', label: t.exp_intermediate },
                { id: 'advanced', label: t.exp_advanced },
              ].map((exp) => (
                <button
                  type="button"
                  key={exp.id}
                  onClick={() => updateField(prev => ({ ...prev, experience: exp.id as ExperienceLevel }))}
                  className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                    formData.experience === exp.id
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {exp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Training Days & Split */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-emerald-400">
              {t.weeklyAvailability} & {t.currentPlan}
            </h3>

            <div className="flex items-center justify-between gap-2">
              {[3, 4, 5, 6].map((daysCount) => (
                <button
                  type="button"
                  key={daysCount}
                  onClick={() => updateField(prev => ({ ...prev, weeklyDays: daysCount as any }))}
                  className={`flex-1 py-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                    formData.weeklyDays === daysCount
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {daysCount} {t.daysPerWeek}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-xs text-slate-400 mb-1">{t.splitType}</label>
              <select
                value={formData.preferredSplit}
                onChange={(e) => updateField(prev => ({ ...prev, preferredSplit: e.target.value as TrainingSplit }))}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-slate-100 text-sm"
              >
                <option value="ppl">{t.split_ppl}</option>
                <option value="upper_lower">{t.split_upper_lower}</option>
                <option value="full_body">{t.split_full_body}</option>
                <option value="custom">{t.split_custom}</option>
              </select>
            </div>
          </div>

          {/* Section 4: Anthropometric Measurements */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-wider font-bold text-emerald-400">
                {t.bodyMeasurements}
              </h3>
              <span className="text-[11px] text-slate-500">
                {lang === 'fa' ? 'جهت فرمول US Navy و نسبت‌ها' : 'For US Navy formula & ratios'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  {t.waist} <span className="text-emerald-400 font-bold">*</span> (cm)
                </label>
                <input
                  type="number"
                  value={formData.measurements.waist}
                  onChange={(e) =>
                    updateField(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, waist: Number(e.target.value) || 80 },
                    }))
                  }
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-slate-100 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">{t.neck} (cm)</label>
                <input
                  type="number"
                  value={formData.measurements.neck || 38}
                  onChange={(e) =>
                    updateField(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, neck: Number(e.target.value) || 38 },
                    }))
                  }
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-slate-100 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">{lang === 'fa' ? 'دور باسن و لگن' : 'Hips'} (cm)</label>
                <input
                  type="number"
                  value={formData.measurements.hips || 96}
                  onChange={(e) =>
                    updateField(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, hips: Number(e.target.value) || 96 },
                    }))
                  }
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-slate-100 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">{t.chest} (cm)</label>
                <input
                  type="number"
                  value={formData.measurements.chest}
                  onChange={(e) =>
                    updateField(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, chest: Number(e.target.value) || 100 },
                    }))
                  }
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-slate-100 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">{t.arms} (cm)</label>
                <input
                  type="number"
                  value={formData.measurements.arms}
                  onChange={(e) =>
                    updateField(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, arms: Number(e.target.value) || 36 },
                    }))
                  }
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-slate-100 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">{t.thighs} (cm)</label>
                <input
                  type="number"
                  value={formData.measurements.thighs}
                  onChange={(e) =>
                    updateField(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, thighs: Number(e.target.value) || 56 },
                    }))
                  }
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-slate-100 text-sm"
                />
              </div>
            </div>
          </div>

          {/* DEDICATED ANALYZE BUTTON */}
          <div className="pt-1">
            <button
              id="modal-run-analysis-btn"
              type="button"
              onClick={handleRunAnalysis}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>{lang === 'fa' ? 'آنالیز' : 'Analyze'}</span>
              <span className="opacity-80 font-bold border-r border-slate-900/30 pr-2 mr-1">
                {lang === 'fa' ? 'محاسبه مجدد ترکیبات بدنی بر اساس استاندارد جهانی' : 'Run Standard Biometrics Assessment'}
              </span>
            </button>
          </div>

          {analysisError && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{analysisError}</span>
            </div>
          )}

          {inputsChanged && analysisResult && (
            <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />
                <span>
                  {lang === 'fa'
                    ? 'اعداد تغییر کرده‌اند؛ برای به‌روزرسانی دکمه «آنالیز» را لمس کنید.'
                    : 'Inputs modified. Click "Analyze" to refresh calculations.'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleRunAnalysis}
                className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[10px]"
              >
                {lang === 'fa' ? 'آنالیز' : 'Analyze'}
              </button>
            </div>
          )}

          {/* Section 5: Scientific Report Card */}
          {analysisResult && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-inner space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {t.analysisTitle} (WHO & US Navy)
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {analysisResult.bodyFat.method === 'us_navy' ? 'US Navy DoD' : 'WHO / Gallagher'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">{t.bmi}</span>
                  <span className="text-lg font-bold text-slate-100">{analysisResult.bmi.bmi}</span>
                  <span className={`text-[10px] block font-semibold ${analysisResult.bmi.color}`}>
                    {analysisResult.bmi.category[lang]}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">{t.bodyFatEst}</span>
                  <span className="text-lg font-bold text-cyan-400">%{analysisResult.bodyFat.bodyFatPercent}</span>
                  <span className={`text-[10px] block font-semibold ${analysisResult.bodyFat.color}`}>
                    {analysisResult.bodyFat.category[lang]}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">
                    {lang === 'fa' ? 'توده عضلانی' : 'Lean Mass'}
                  </span>
                  <span className="text-lg font-bold text-emerald-400">{analysisResult.leanMassKg} kg</span>
                  <span className="text-[10px] text-slate-400 block">FFMI: {analysisResult.normalizedFfmi}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">{t.calories}</span>
                  <span className="text-lg font-bold text-amber-400">{analysisResult.targetCalories}</span>
                  <span className="text-[10px] text-slate-400 block">BMR: {analysisResult.bmr}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-4 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            id="save-profile-only-btn"
            onClick={() => handleSave(false)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            {t.updateProfile}
          </button>

          <button
            id="regenerate-plan-btn"
            onClick={() => handleSave(true)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.calculateStats}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
