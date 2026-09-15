import React, { useState } from 'react';
import { Dumbbell, Calendar, BookOpen, TrendingUp, Sparkles, User, Flame, ChevronDown, UserCheck, HeartPulse, Target } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { ProgramContextModal } from './ProgramContextModal';
import { CycleProgressInfo } from '../utils/cycleTracker';
import { CycleProgressCircle } from './CycleProgressCircle';

export type TabType = 'today' | 'program' | 'cardio' | 'exercises' | 'progress' | 'coach';

interface NavigationProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  lang: Language;
  onOpenProfile: () => void;
  userName: string;
  streakCount: number;
  trainingContext?: 'myself_6_months' | 'other_beginner';
  onChangeTrainingContext?: (context: 'myself_6_months' | 'other_beginner') => void;
  onOpenGoalModal?: () => void;
  cycleProgress?: CycleProgressInfo;
  onOpenBiometricCheck?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  lang,
  onOpenProfile,
  userName,
  streakCount,
  trainingContext = 'myself_6_months',
  onChangeTrainingContext,
  onOpenGoalModal,
  cycleProgress,
  onOpenBiometricCheck,
}) => {
  const [isContextModalOpen, setIsContextModalOpen] = useState(false);
  const t = translations[lang];

  const navItems: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'today', label: t.navToday, icon: Dumbbell },
    { id: 'program', label: t.navProgram, icon: Calendar },
    { id: 'cardio', label: t.navCardio, icon: HeartPulse },
    { id: 'exercises', label: t.navExercises, icon: BookOpen },
    { id: 'progress', label: t.navProgress, icon: TrendingUp },
    { id: 'coach', label: t.navCoach, icon: Sparkles },
  ];

  const handleSelectContext = (context: 'myself_6_months' | 'other_beginner') => {
    if (onChangeTrainingContext) {
      onChangeTrainingContext(context);
    }
  };

  return (
    <>
      {/* App Top Bar */}
      <div className="w-full px-3 sm:px-4 py-2.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between z-20 gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            id="profile-avatar-btn"
            onClick={onOpenProfile}
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 p-[1.5px] focus:outline-none focus:ring-2 focus:ring-emerald-400 active:scale-95 transition-transform shrink-0"
          >
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-emerald-400">
              <User className="w-4 h-4" />
            </div>
          </button>

          <div className="truncate">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-[11px] font-medium text-slate-400 shrink-0">{t.profile}:</span>
              <span className="text-xs sm:text-sm font-bold text-slate-100 truncate">{userName}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
              <Flame className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
              <span>{streakCount} {lang === 'fa' ? 'روز استمرار' : 'Day Streak'}</span>
            </div>
          </div>
        </div>

        {/* Top Actions: Program Context Button ("برای خودم" vs "برای دیگری") + Goal Button + 4-Week Cycle Circle + Coach Pill */}
        <div className="flex items-center gap-2 shrink-0">
          {/* 4-Week Biometric Cycle Progress Circle (دایره کوچک پیشرفت چک دوره‌ای ۴ هفته) */}
          {cycleProgress && (
            <div className="flex items-center gap-1.5 pl-1">
              <CycleProgressCircle
                progress={cycleProgress}
                lang={lang}
                onClick={onOpenBiometricCheck}
                size="sm"
              />
            </div>
          )}

          {/* Goal Button (هدف) */}
          {onOpenGoalModal && (
            <button
              id="top-goal-assessment-btn"
              type="button"
              onClick={onOpenGoalModal}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 hover:border-amber-400 text-xs font-bold text-amber-300 transition-all shadow-sm active:scale-95 cursor-pointer"
              title={lang === 'fa' ? 'هدف بدنی: تعیین وزن هدف و فیزیک دلخواه' : 'Goal: Set Target Weight & Physique'}
            >
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] sm:text-xs font-extrabold">{lang === 'fa' ? 'هدف' : 'Goal'}</span>
            </button>
          )}

          <button
            id="top-program-context-btn"
            onClick={() => setIsContextModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900/95 hover:bg-slate-800 border border-emerald-500/40 hover:border-emerald-400 text-xs font-bold text-slate-100 transition-all shadow-sm active:scale-95 cursor-pointer"
            title={lang === 'fa' ? 'تغییر وضعیت برنامه: برای خودم (۶ ماه سابقه) یا برای دیگری' : 'Switch Program Context: Myself (6 Months) vs Other'}
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs text-emerald-300">
              {trainingContext === 'myself_6_months'
                ? (lang === 'fa' ? 'برنامه خودم (۶ ماهه)' : 'Myself (6 Mo)')
                : (lang === 'fa' ? 'برنامه دیگری (مبتدی)' : 'Other (Beginner)')}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Coach Status Pill */}
          <button
            id="coach-pill-status"
            onClick={() => onSelectTab('coach')}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs hover:bg-emerald-900/40 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-[11px] font-medium">{lang === 'fa' ? 'مربی فعال' : 'Coach Active'}</span>
          </button>
        </div>
      </div>

      {/* Program Context Modal (برای خودم / برای دیگری) */}
      {isContextModalOpen && (
        <ProgramContextModal
          isOpen={isContextModalOpen}
          onClose={() => setIsContextModalOpen(false)}
          currentContext={trainingContext}
          onSelectContext={handleSelectContext}
          lang={lang}
          onOpenGoalAssessment={onOpenGoalModal}
        />
      )}

      {/* Material 3 Bottom Navigation Bar */}
      <nav className="w-full bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around z-20">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className="flex-1 py-1 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 focus:outline-none group"
            >
              {/* Active Pill Indicator */}
              <div
                className={`px-4 py-1 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                    : 'text-slate-400 group-hover:text-slate-200'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
              </div>

              {/* Label */}
              <span
                className={`text-[10px] tracking-tight transition-colors duration-150 ${
                  isActive ? 'font-bold text-emerald-400' : 'font-medium text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
