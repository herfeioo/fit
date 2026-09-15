import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Volume2,
  VolumeX,
  Flame,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';
import { CardioRoutine, CardioExerciseItem, Language } from '../types';
import { saveCardioCompletedSession } from '../data/cardioDatabase';
import { CardioMotionVisual } from './CardioMotionVisual';

interface ActiveCardioWorkoutModalProps {
  routine: CardioRoutine | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

type WorkoutPhase = 'warmup' | 'work' | 'rest' | 'round_rest' | 'cooldown' | 'finished';

export const ActiveCardioWorkoutModal: React.FC<ActiveCardioWorkoutModalProps> = ({
  routine,
  isOpen,
  onClose,
  lang,
}) => {
  const isFa = lang === 'fa';

  // Workout Flow State
  const [phase, setPhase] = useState<WorkoutPhase>('warmup');
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [exerciseIndex, setExerciseIndex] = useState<number>(0);
  const [warmupIndex, setWarmupIndex] = useState<number>(0);
  const [cooldownIndex, setCooldownIndex] = useState<number>(0);

  // Timer State
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    routine?.warmupSteps?.[0]?.durationSec || 60
  );
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [totalElapsedSec, setTotalElapsedSec] = useState<number>(0);

  // Audio tone generator via Web Audio API (graceful, safe)
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playBeep = (freq = 440, type: OscillatorType = 'sine', duration = 0.15) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(0.2, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      osc.start();
      osc.stop(audioCtxRef.current.currentTime + duration);
    } catch {
      // audio error safely caught
    }
  };

  // Main countdown timer interval
  useEffect(() => {
    if (isPaused || phase === 'finished') return;

    const timer = setInterval(() => {
      setTotalElapsedSec((prev) => prev + 1);

      setSecondsRemaining((prev) => {
        if (prev <= 4 && prev > 1) {
          playBeep(520, 'sine', 0.1); // 3-2-1 warning tick
        } else if (prev === 1) {
          playBeep(880, 'triangle', 0.35); // End interval ding
          advancePhase();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, phase, currentRound, exerciseIndex, warmupIndex, cooldownIndex]);

  // Phase Transitions Engine
  const advancePhase = () => {
    if (phase === 'warmup') {
      if (warmupIndex < routine.warmupSteps.length - 1) {
        const nextIdx = warmupIndex + 1;
        setWarmupIndex(nextIdx);
        setSecondsRemaining(routine.warmupSteps[nextIdx].durationSec);
      } else {
        // Transition from Warm-up to Work Phase
        setPhase('work');
        setExerciseIndex(0);
        setCurrentRound(1);
        setSecondsRemaining(routine.workSec);
      }
    } else if (phase === 'work') {
      // Transition from Work to Rest or Round Rest
      if (exerciseIndex < routine.exercises.length - 1) {
        setPhase('rest');
        setSecondsRemaining(routine.restSec);
      } else {
        // End of round
        if (currentRound < routine.rounds) {
          setPhase('round_rest');
          setSecondsRemaining(routine.roundRestSec);
        } else {
          // Finished all rounds -> Move to Cool-down
          setPhase('cooldown');
          setCooldownIndex(0);
          setSecondsRemaining(routine.cooldownSteps[0]?.durationSec || 60);
        }
      }
    } else if (phase === 'rest') {
      // After rest, move to next exercise in the same round
      const nextExIdx = exerciseIndex + 1;
      setExerciseIndex(nextExIdx);
      setPhase('work');
      setSecondsRemaining(routine.workSec);
    } else if (phase === 'round_rest') {
      // After round rest, start next round from exercise 0
      setCurrentRound((prev) => prev + 1);
      setExerciseIndex(0);
      setPhase('work');
      setSecondsRemaining(routine.workSec);
    } else if (phase === 'cooldown') {
      if (cooldownIndex < routine.cooldownSteps.length - 1) {
        const nextIdx = cooldownIndex + 1;
        setCooldownIndex(nextIdx);
        setSecondsRemaining(routine.cooldownSteps[nextIdx].durationSec);
      } else {
        // Finished workout!
        finishWorkout();
      }
    }
  };

  const finishWorkout = () => {
    setPhase('finished');
    playBeep(1046.5, 'sine', 0.6); // High C triumph note
    const durationMin = Math.max(1, Math.round(totalElapsedSec / 60));
    saveCardioCompletedSession({
      id: `cardio_sess_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      targetGroup: routine.targetGroup,
      title: routine.title.fa,
      durationMinutes: durationMin,
      caloriesBurned: Math.round(durationMin * 10.5),
      roundsCompleted: currentRound,
      exercisesCount: routine.exercises.length,
    });
  };

  const handleSkip = () => {
    advancePhase();
  };

  const currentExercise = routine?.exercises?.[exerciseIndex];
  const nextExercise = routine?.exercises?.[exerciseIndex + 1];

  // Helper formatting for seconds
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Phase color themes
  const phaseStyles = {
    warmup: {
      labelFa: 'گرم‌کردن پویا و تحرک‌پذیری',
      labelEn: 'Dynamic Warm-Up',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      accentColor: 'text-amber-400',
      ringColor: 'border-amber-500',
    },
    work: {
      labelFa: 'ست کاری پرفشار (فعالیت)',
      labelEn: 'Work Interval',
      badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse',
      accentColor: 'text-rose-400',
      ringColor: 'border-rose-500',
    },
    rest: {
      labelFa: 'استراحت کوتاه بین حرکات',
      labelEn: 'Interval Rest',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      accentColor: 'text-emerald-400',
      ringColor: 'border-emerald-500',
    },
    round_rest: {
      labelFa: 'استراحت بین راندها و نوشیدن آب',
      labelEn: 'Round Recovery',
      badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      accentColor: 'text-cyan-400',
      ringColor: 'border-cyan-500',
    },
    cooldown: {
      labelFa: 'سرد کردن و کشش ایستا',
      labelEn: 'Cool-Down & Stretch',
      badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      accentColor: 'text-indigo-400',
      ringColor: 'border-indigo-500',
    },
    finished: {
      labelFa: 'تمرین با موفقیت به پایان رسید',
      labelEn: 'Workout Completed',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      accentColor: 'text-emerald-400',
      ringColor: 'border-emerald-500',
    },
  }[phase];

  if (!isOpen || !routine) return null;

  return (
    <div
      id="active-cardio-workout-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 select-none"
      dir={isFa ? 'rtl' : 'ltr'}
    >
      <div
        id="active-cardio-workout-card"
        className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh] animate-in zoom-in-95 duration-200"
      >
        {/* Top Header */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-black border ${phaseStyles.badgeClass}`}
            >
              {isFa ? phaseStyles.labelFa : phaseStyles.labelEn}
            </span>
            {phase !== 'warmup' && phase !== 'cooldown' && phase !== 'finished' && (
              <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                {isFa
                  ? `راند ${currentRound} از ${routine.rounds}`
                  : `Round ${currentRound}/${routine.rounds}`}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={soundEnabled ? 'Mute' : 'Enable Sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto flex flex-col justify-between space-y-4">
          {phase !== 'finished' ? (
            <>
              {/* Giant Countdown Clock */}
              <div className="text-center space-y-2 py-1">
                <div className="inline-flex flex-col items-center justify-center p-6 rounded-full w-40 h-40 sm:w-44 sm:h-44 bg-slate-950 border-4 shadow-xl relative mx-auto">
                  <span className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${phaseStyles.accentColor}`}>
                    {secondsRemaining}
                  </span>
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                    {isFa ? 'ثانیه باقی‌مانده' : 'Seconds'}
                  </span>
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  {isFa ? 'مدت کل تمرین: ' : 'Elapsed: '}
                  <span className="text-slate-200 font-bold">{formatTime(totalElapsedSec)}</span>
                </div>
              </div>

              {/* Phase-Specific Exercise Card */}
              {phase === 'work' && currentExercise && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 shadow-inner">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block">
                        {isFa ? 'حرکت در حال اجرا' : 'Current Exercise'}
                      </span>
                      <h4 className="text-base sm:text-lg font-extrabold text-slate-100">
                        {isFa ? currentExercise.name.fa : currentExercise.name.en}
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-lg text-xs font-mono font-bold bg-slate-900 border border-slate-700 text-emerald-400">
                      #{exerciseIndex + 1}/{routine.exercises.length}
                    </span>
                  </div>

                  {/* Looped Movement Animation (انیمیشن گیف لوپ شده حرکت) */}
                  <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
                    {/* Visual Looped Animation */}
                    <div className="w-full h-44 sm:h-48 relative flex items-center justify-center bg-slate-950/90">
                      <CardioMotionVisual exerciseId={currentExercise.id} className="w-full h-full max-h-48" />

                      {/* Looped animation badge */}
                      <div className="absolute top-2.5 right-2.5 rtl:right-auto rtl:left-2.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-extrabold text-emerald-300 flex items-center gap-1 backdrop-blur-sm shadow">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>{isFa ? 'انیمیشن لوپ حرکت' : 'Looped Motion'}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {isFa ? currentExercise.tips.fa : currentExercise.tips.en}
                  </p>
                </div>
              )}

              {/* Rest Phase Display */}
              {(phase === 'rest' || phase === 'round_rest') && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
                  <span className="text-xs font-bold text-emerald-400 block">
                    {isFa
                      ? 'عضلات را شل کنید، نفس عمیق بکشید و آب بنوشید'
                      : 'Breathe deeply and prepare for the next round'}
                  </span>

                  {nextExercise && (
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 text-right sm:text-center space-y-1">
                      <span className="text-[10px] text-slate-400 font-semibold block">
                        {isFa ? 'آماده‌باش برای حرکت بعدی:' : 'Next up:'}
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-white block">
                        {isFa ? nextExercise.name.fa : nextExercise.name.en}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Warm-up / Cool-down Phase Display */}
              {(phase === 'warmup' || phase === 'cooldown') && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
                  <span className="text-[11px] text-slate-400 font-bold block">
                    {phase === 'warmup'
                      ? isFa
                        ? `مرحله ${warmupIndex + 1} از ۵ گرم‌کردن پویا`
                        : `Step ${warmupIndex + 1}/5 Warm-up`
                      : isFa
                      ? `مرحله ${cooldownIndex + 1} از ۵ سرد کردن و کشش`
                      : `Step ${cooldownIndex + 1}/5 Cool-down`}
                  </span>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-100">
                    {phase === 'warmup'
                      ? isFa
                        ? routine.warmupSteps[warmupIndex]?.title.fa
                        : routine.warmupSteps[warmupIndex]?.title.en
                      : isFa
                      ? routine.cooldownSteps[cooldownIndex]?.title.fa
                      : routine.cooldownSteps[cooldownIndex]?.title.en}
                  </h4>
                </div>
              )}

              {/* Player Controls Bar */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className={`flex-1 py-3 px-4 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                    isPaused
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {isPaused ? (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>{isFa ? 'ادامه تمرین' : 'Resume'}</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>{isFa ? 'توقف موقت' : 'Pause'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleSkip}
                  className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title={isFa ? 'رفتن به فاز یا حرکت بعد' : 'Skip'}
                >
                  <SkipForward className="w-4 h-4" />
                  <span>{isFa ? 'رد کردن' : 'Skip'}</span>
                </button>

                <button
                  onClick={finishWorkout}
                  className="py-3 px-3.5 rounded-2xl bg-rose-950/60 hover:bg-rose-900 border border-rose-600/40 text-rose-300 text-xs font-bold transition-colors cursor-pointer"
                  title={isFa ? 'پایان زودهنگام و ثبت' : 'Finish early'}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            // Finished Celebration Screen
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <Trophy className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {isFa ? 'خسته نباشی قهرمان! عالی بود' : 'Workout Complete!'}
                </h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  {isFa
                    ? 'جلسه هوازی این هفته با موفقیت ثبت شد و هیچ تداخلی با برنامه بدنسازی اصلی باشگاه شما ندارد.'
                    : 'This week’s home cardio session was successfully logged without altering your gym program.'}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-0.5">
                    {isFa ? 'مدت کل تمرین' : 'Duration'}
                  </span>
                  <span className="text-lg font-black text-emerald-400 font-mono">
                    {Math.max(1, Math.round(totalElapsedSec / 60))} {isFa ? 'دقیقه' : 'min'}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-0.5">
                    {isFa ? 'کالری تقریبی' : 'Est. Calories'}
                  </span>
                  <span className="text-lg font-black text-rose-400 font-mono">
                    ~{Math.round(Math.max(1, totalElapsedSec / 60) * 10.5)} {isFa ? 'kcal' : 'kcal'}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full max-w-xs mx-auto py-3 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-lg cursor-pointer"
              >
                {isFa ? 'ثبت و بازگشت به داشبورد' : 'Done & Return'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
