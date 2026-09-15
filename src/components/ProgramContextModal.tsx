import React from 'react';
import { UserCheck, Users, CheckCircle2, X, Sparkles, Dumbbell, ShieldCheck, Target } from 'lucide-react';
import { Language, UserProfile } from '../types';

interface ProgramContextModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentContext?: 'myself_6_months' | 'other_beginner';
  onSelectContext: (context: 'myself_6_months' | 'other_beginner') => void;
  lang: Language;
  onOpenGoalAssessment?: () => void;
}

export const ProgramContextModal: React.FC<ProgramContextModalProps> = ({
  isOpen,
  onClose,
  currentContext = 'myself_6_months',
  onSelectContext,
  lang,
  onOpenGoalAssessment,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-100">
                {lang === 'fa' ? 'انتخاب حالت برنامه تمرینی' : 'Select Program Trainee Context'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'fa'
                  ? 'برنامه برای خودتان (با سابقه ۶ ماه تمرین) نوشته شود یا برای فرد مبتدی؟'
                  : 'Generate program for yourself (6 months gym training) or a beginner?'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2 Options */}
        <div className="space-y-3">
          {/* Option 1: Myself (6 months gym experience) */}
          <button
            type="button"
            id="opt-context-myself"
            onClick={() => {
              onSelectContext('myself_6_months');
              onClose();
            }}
            className={`w-full text-right p-4 rounded-2xl border transition-all flex flex-col gap-2 relative cursor-pointer ${
              currentContext === 'myself_6_months'
                ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/40'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-100">
                      {lang === 'fa' ? 'برای خودم' : 'For Myself'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {lang === 'fa' ? '۶ ماه تمرین در باشگاه' : '6 Months Gym Athlete'}
                    </span>
                  </div>
                </div>
              </div>

              {currentContext === 'myself_6_months' && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pr-10">
              {lang === 'fa'
                ? 'مخصوص شما که هم‌اکنون ۶ ماه سابقه تمرین پیوسته در باشگاه دارید. برنامه با اضافه بار تدریجی پیشرفته، ۴ ست در حرکات اصلی، RPE ۸.۰ تا ۹.۰، و تفکیک ۸ حرکت تخصصی هایپرتروفی در هر روز تنظیم می‌شود.'
                : 'Tailored for an active gym trainee with 6 months continuous experience. Higher working sets (4 sets on compounds), RPE 8.0-9.0, advanced progressive overload, exactly 8 exercises per session.'}
            </p>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium pr-10 pt-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'سطح: متوسط ورزشی | اضافه بار مکانیکی و هایپرتروفی خالص' : 'Level: Intermediate | Mechanical Tension & Hypertrophy'}</span>
            </div>

            {onOpenGoalAssessment && (
              <div className="pt-2 pr-10">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                    onOpenGoalAssessment();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all cursor-pointer"
                >
                  <Target className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'fa' ? '🎯 تنظیم هدف فیزیک و وزن (مثلاً ۸۰، ۸۹ یا ۹۰ کیلو)' : '🎯 Set Physique Goal (e.g. 80, 89, 90kg)'}</span>
                </div>
              </div>
            )}
          </button>

          {/* Option 2: For Other / Beginner */}
          <button
            type="button"
            id="opt-context-other"
            onClick={() => {
              onSelectContext('other_beginner');
              onClose();
            }}
            className={`w-full text-right p-4 rounded-2xl border transition-all flex flex-col gap-2 relative cursor-pointer ${
              currentContext === 'other_beginner'
                ? 'bg-cyan-950/40 border-cyan-500/60 ring-1 ring-cyan-500/40'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-100">
                      {lang === 'fa' ? 'برای دیگری (دیفالت مبتدی)' : 'For Other (Default Beginner)'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {lang === 'fa' ? 'تازه شروع کرده / صفر' : 'Beginner / Day 1'}
                    </span>
                  </div>
                </div>
              </div>

              {currentContext === 'other_beginner' && (
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pr-10">
              {lang === 'fa'
                ? 'برنامه پایه برای فردی که تازه می‌خواهد ورزش در باشگاه را شروع کند. تمرکز بر یادگیری الگوی صحیح حرکات، ۳ ست کنترل‌شده، ایمنی کامل مفاصل و تاندون‌ها، و ۸ حرکت بنیادین در هر جلسه.'
                : 'Foundational routine for someone just starting at the gym. Focuses on motor pattern learning, 3 sets, joint preservation, RPE 7.0-7.5, and 8 foundational exercises per session.'}
            </p>

            <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-medium pr-10 pt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'سطح: مبتدی | آماده‌سازی عضلانی و هماهنگی عصب و عضله' : 'Level: Beginner | Neuromuscular Adaptation & Joint Prep'}</span>
            </div>
          </button>
        </div>

        {/* Footer Note */}
        <div className="pt-1 text-center">
          <p className="text-[11px] text-slate-400">
            {lang === 'fa'
              ? '💡 با کلیک روی هر گزینه، برنامه تمرینی بلافاصله بر اساس سطح و حجم عضلانی بازنویسی می‌شود.'
              : '💡 Selecting an option immediately rewrites and optimizes your active workout plan.'}
          </p>
        </div>
      </div>
    </div>
  );
};
