import React from 'react';
import { Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { CycleProgressInfo } from '../utils/cycleTracker';
import { Language } from '../types';

interface CycleProgressCircleProps {
  progress: CycleProgressInfo;
  lang: Language;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

/**
 * Visual "Very Small Circle" (دایره کوچک پیشرفت چک دوره‌ای ۴ هفته) indicator.
 * Displays circular progress tracking the 4-week check-in cycle starting from
 * the date of the first completed workout.
 */
export const CycleProgressCircle: React.FC<CycleProgressCircleProps> = ({
  progress,
  lang,
  onClick,
  size = 'sm',
}) => {
  const isFa = lang === 'fa';
  const diameter = size === 'sm' ? 34 : 44;
  const strokeWidth = size === 'sm' ? 3.5 : 4;
  const radius = (diameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress.percentage / 100) * circumference;

  const getTooltip = () => {
    if (!progress.hasStarted) {
      return isFa
        ? 'چک ۴ هفته: با تیک زدن اولین روز تمرین آغاز خواهد شد'
        : '4-Week Check-in: Starts after completing your first workout day';
    }
    if (progress.isDue) {
      return isFa
        ? 'موعد چک دوره‌ای ۴ هفته فرا رسیده است! (کلیک برای ثبت اطلاعات بدنی)'
        : '4-Week Biometric Check is DUE! (Click to audit biometrics)';
    }
    return isFa
      ? `چک دوره‌ای ۴ هفته: روز ${progress.currentDayNumber} از ${progress.totalCycleDays} (${progress.daysRemaining} روز مانده)`
      : `4-Week Cycle: Day ${progress.currentDayNumber}/${progress.totalCycleDays} (${progress.daysRemaining}d left)`;
  };

  return (
    <button
      id="cycle-progress-circle-indicator"
      type="button"
      onClick={onClick}
      className={`group relative flex items-center justify-center rounded-full transition-all focus:outline-none cursor-pointer ${
        progress.isDue
          ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-950 animate-pulse'
          : 'hover:opacity-90'
      }`}
      title={getTooltip()}
      style={{ width: diameter, height: diameter }}
    >
      <svg
        width={diameter}
        height={diameter}
        className="transform -rotate-90 origin-center"
      >
        {/* Background track circle */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          stroke="rgba(51, 65, 85, 0.5)" // slate-700
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress colored circle */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          stroke={
            progress.isDue
              ? '#f59e0b' // amber-500
              : progress.hasStarted
              ? '#10b981' // emerald-500
              : '#64748b' // slate-500
          }
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progress.hasStarted ? strokeDashoffset : circumference}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Center Display: number or icon */}
      <div className="absolute inset-0 flex items-center justify-center select-none">
        {progress.isDue ? (
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
        ) : !progress.hasStarted ? (
          <Clock className="w-3 h-3 text-slate-500" />
        ) : (
          <span className="text-[10px] font-black font-mono tracking-tighter text-emerald-300">
            {progress.currentDayNumber}
          </span>
        )}
      </div>

      {/* Pulsing indicator badge if due */}
      {progress.isDue && (
        <span className="absolute -top-0.5 -right-0.5 rtl:-right-auto rtl:-left-0.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-slate-950 animate-ping" />
      )}
    </button>
  );
};
