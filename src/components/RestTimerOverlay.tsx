import React, { useEffect, useState } from 'react';
import { Timer, X, Plus, Minus, Play, Pause, Bell } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { playTimerComplete, playTimerTick } from '../utils/audioAlert';

interface RestTimerOverlayProps {
  initialSeconds: number;
  isActive: boolean;
  onClose: () => void;
  lang: Language;
}

export const RestTimerOverlay: React.FC<RestTimerOverlayProps> = ({
  initialSeconds,
  isActive,
  onClose,
  lang,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(initialSeconds);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [totalSeconds, setTotalSeconds] = useState<number>(initialSeconds);

  const t = translations[lang];

  useEffect(() => {
    setSecondsRemaining(initialSeconds);
    setTotalSeconds(initialSeconds);
    setIsPaused(false);
  }, [initialSeconds, isActive]);

  useEffect(() => {
    if (!isActive || isPaused) return;

    if (secondsRemaining <= 0) {
      playTimerComplete();
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 4 && prev > 1) {
          playTimerTick();
        }
        if (prev <= 1) {
          clearInterval(interval);
          playTimerComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isPaused, secondsRemaining]);

  if (!isActive) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const percent = Math.min(100, Math.max(0, (secondsRemaining / (totalSeconds || 1)) * 100));

  const addTime = (delta: number) => {
    const next = Math.max(0, secondsRemaining + delta);
    setSecondsRemaining(next);
    if (next > totalSeconds) setTotalSeconds(next);
  };

  return (
    <div className="fixed bottom-16 inset-x-0 mx-auto max-w-sm px-4 z-40 animate-slideUp">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-emerald-500/40 rounded-3xl p-4 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.2)] flex items-center justify-between text-slate-100">
        {/* Circular Progress & Clock */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="3.5"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="3.5"
                className={`transition-all duration-300 ${
                  secondsRemaining === 0 ? 'text-amber-400' : 'text-emerald-400'
                }`}
                strokeDasharray={125.6}
                strokeDashoffset={125.6 - (125.6 * percent) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <Timer className="w-5 h-5 absolute text-emerald-400" />
          </div>

          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-slate-400">{t.restTimer}</span>
              {secondsRemaining === 0 && (
                <span className="text-[10px] text-amber-400 font-bold animate-pulse">
                  {lang === 'fa' ? 'وقت ست بعدی!' : 'Next Set Ready!'}
                </span>
              )}
            </div>
            <div className="font-mono text-xl font-bold tracking-tight text-slate-100">
              {formatTime(secondsRemaining)}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            id="rest-minus-15-btn"
            onClick={() => addTime(-15)}
            className="px-2 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 transition-colors"
          >
            -15s
          </button>
          <button
            id="rest-plus-30-btn"
            onClick={() => addTime(30)}
            className="px-2 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 transition-colors"
          >
            +30s
          </button>

          <button
            id="rest-pause-resume-btn"
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>

          <button
            id="rest-close-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors"
            title={t.skipRest}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
