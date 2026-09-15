import React from 'react';
import { CheckCircle2, XCircle, Dumbbell, Sparkles, ArrowLeft, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { CoachProposedPlanUpdate, Language } from '../types';

interface CoachPlanUpdateModalProps {
  isOpen: boolean;
  update: CoachProposedPlanUpdate | null;
  lang: Language;
  onApply: () => void;
  onReject: () => void;
}

export const CoachPlanUpdateModal: React.FC<CoachPlanUpdateModalProps> = ({
  isOpen,
  update,
  lang,
  onApply,
  onReject,
}) => {
  if (!isOpen || !update) return null;

  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  return (
    <div
      id="coach-plan-update-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      dir={isFa ? 'rtl' : 'ltr'}
    >
      <div
        id="coach-plan-update-modal-card"
        className="w-full max-w-lg bg-slate-900 border-2 border-emerald-500/50 rounded-2xl shadow-2xl shadow-emerald-500/20 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 p-4 border-b border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-emerald-400 uppercase tracking-wider">
                {isFa ? 'منوی تایید هوشمند تغییرات برنامه' : 'AI Coach Plan Modification'}
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                {isFa ? 'پیشنهاد مربی تراز اول علوم ورزشی' : 'Elite Exercise Science Proposal'}
              </p>
            </div>
          </div>
          <button
            onClick={onReject}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isFa ? 'بستن' : 'Close'}
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-slate-100">
          {/* Main Question */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3.5 text-center">
            <h4 className="text-base font-extrabold text-emerald-300">
              {isFa
                ? 'آیا تغییرات در برنامه تمرینی شما اعمال شود؟'
                : 'Apply these changes to your active workout plan?'}
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              {isFa
                ? 'با تایید شما، این حرکت و پروتکل جدید مستقیماً در روز تمرینی مربوطه جایگزین خواهد شد.'
                : 'Upon approval, this exercise and protocol will be directly updated in your active routine.'}
            </p>
          </div>

          {/* Target Day Info */}
          {update.dayTitle && (
            <div className="flex items-center justify-between px-3 py-2 bg-slate-800/80 rounded-xl border border-slate-700/80 text-xs">
              <span className="text-slate-400">{isFa ? 'روز تمرینی هدف:' : 'Target Workout Day:'}</span>
              <span className="font-bold text-amber-400">{update.dayTitle}</span>
            </div>
          )}

          {/* Exercise Comparison Card */}
          <div className="bg-slate-800/60 rounded-xl border border-slate-700/80 p-4 space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {isFa ? 'مقایسه حرکت قبلی و حرکت جدید جایگزین:' : 'Exercise Swap Comparison:'}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Original Exercise */}
              <div className="w-full sm:flex-1 p-3 rounded-xl bg-red-950/30 border border-red-500/30">
                <div className="text-[11px] font-bold text-red-400 flex items-center gap-1 mb-1">
                  <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                  {isFa ? 'حرکت قبلی در برنامه' : 'Current Exercise'}
                </div>
                <div className="text-sm font-black text-slate-200 line-through decoration-red-400/70">
                  {update.originalExerciseName}
                </div>
              </div>

              {/* Transition Arrow */}
              <div className="shrink-0 w-8 h-8 rounded-full bg-slate-800 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <ArrowIcon className="w-4 h-4" />
              </div>

              {/* Replacement Exercise */}
              <div className="w-full sm:flex-1 p-3 rounded-xl bg-emerald-950/40 border-2 border-emerald-500/50 shadow-inner">
                <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isFa ? 'حرکت بهینه جدید' : 'New Replacement'}
                </div>
                <div className="text-sm font-black text-emerald-300">
                  {update.newExerciseName}
                </div>
              </div>
            </div>

            {/* Protocol Specs (Sets & Reps) */}
            {(update.newSets || update.newReps) && (
              <div className="flex items-center gap-4 pt-2 border-t border-slate-700/60 text-xs">
                {update.newSets && (
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isFa ? 'تعداد ست:' : 'Sets:'}</span>
                    <span className="font-bold text-white">{update.newSets} ست</span>
                  </div>
                )}
                {update.newReps && (
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isFa ? 'تکرار هدف:' : 'Reps:'}</span>
                    <span className="font-bold text-white">{update.newReps}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Scientific Rationale */}
          {update.details && (
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/70 text-xs space-y-1">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>{isFa ? 'تحلیل بیومکانیکی مربی تراز اول:' : 'Coach Biomechanical Rationale:'}</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[13px] pt-1">
                {update.details}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons: اعمال شود vs اعمال نشود */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex flex-col-reverse sm:flex-row items-center gap-3">
          {/* Button 2: اعمال نشود */}
          <button
            id="coach-plan-update-reject-btn"
            onClick={onReject}
            className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white border border-slate-700 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <XCircle className="w-4 h-4 text-rose-400" />
            <span>{isFa ? 'اعمال نشود' : 'Do Not Apply'}</span>
          </button>

          {/* Button 1: اعمال شود */}
          <button
            id="coach-plan-update-apply-btn"
            onClick={onApply}
            className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-900/40 border border-emerald-400"
          >
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span>{isFa ? 'اعمال شود' : 'Apply Changes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
