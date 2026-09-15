import React, { useState, useEffect } from 'react';
import { X, Check, Timer, Plus, Trash2, Dumbbell, Award, Flame, Info } from 'lucide-react';
import { WorkoutDay, WorkoutSessionLog, LoggedExercise, LoggedSet, Language } from '../types';
import { translations } from '../translations';
import { getExerciseById } from '../data/exerciseDatabase';
import { calculateOneRepMax } from '../utils/fitnessCalculations';

interface ActiveWorkoutModalProps {
  workoutDay: WorkoutDay;
  isOpen: boolean;
  onClose: () => void;
  onFinishWorkout: (log: WorkoutSessionLog) => void;
  onTriggerRestTimer: (seconds: number) => void;
  onOpenExerciseDetail: (exerciseId: string) => void;
  lang: Language;
}

export const ActiveWorkoutModal: React.FC<ActiveWorkoutModalProps> = ({
  workoutDay,
  isOpen,
  onClose,
  onFinishWorkout,
  onTriggerRestTimer,
  onOpenExerciseDetail,
  lang,
}) => {
  const t = translations[lang];

  // Initialize active session state
  const [exercisesState, setExercisesState] = useState<LoggedExercise[]>(() => {
    if (!workoutDay?.exercises) return [];
    return workoutDay.exercises.map((item) => {
      const defaultWeight = 50; // reasonable default starting weight
      const initialSets: LoggedSet[] = Array.from({ length: item.sets }, (_, i) => ({
        setNumber: i + 1,
        weight: defaultWeight,
        reps: parseInt(item.reps.split('-')[0]) || 8,
        completed: false,
        rpe: item.targetRpe || 8,
      }));
      return {
        exerciseId: item.exerciseId,
        sets: initialSets,
      };
    });
  });

  const [startTime] = useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [completedSummaryLog, setCompletedSummaryLog] = useState<WorkoutSessionLog | null>(null);

  // Live workout stopwatch
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatElapsed = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const toggleSetComplete = (exIdx: number, setIdx: number, restSeconds: number) => {
    setExercisesState((prev) => {
      const updated = [...prev];
      const ex = { ...updated[exIdx] };
      const sets = [...ex.sets];
      const targetSet = { ...sets[setIdx] };

      targetSet.completed = !targetSet.completed;
      sets[setIdx] = targetSet;
      ex.sets = sets;
      updated[exIdx] = ex;

      if (targetSet.completed) {
        onTriggerRestTimer(restSeconds);
      }

      return updated;
    });
  };

  const updateSetField = (exIdx: number, setIdx: number, field: 'weight' | 'reps', val: number) => {
    setExercisesState((prev) => {
      const updated = [...prev];
      const ex = { ...updated[exIdx] };
      const sets = [...ex.sets];
      sets[setIdx] = { ...sets[setIdx], [field]: val };
      ex.sets = sets;
      updated[exIdx] = ex;
      return updated;
    });
  };

  const addSetToExercise = (exIdx: number) => {
    setExercisesState((prev) => {
      const updated = [...prev];
      const ex = { ...updated[exIdx] };
      const lastSet = ex.sets[ex.sets.length - 1];
      const newSet: LoggedSet = {
        setNumber: ex.sets.length + 1,
        weight: lastSet ? lastSet.weight : 50,
        reps: lastSet ? lastSet.reps : 8,
        completed: false,
        rpe: 8,
      };
      ex.sets = [...ex.sets, newSet];
      updated[exIdx] = ex;
      return updated;
    });
  };

  const removeSetFromExercise = (exIdx: number, setIdx: number) => {
    setExercisesState((prev) => {
      const updated = [...prev];
      const ex = { ...updated[exIdx] };
      if (ex.sets.length <= 1) return prev;
      ex.sets = ex.sets.filter((_, idx) => idx !== setIdx).map((s, idx) => ({ ...s, setNumber: idx + 1 }));
      updated[exIdx] = ex;
      return updated;
    });
  };

  // Calculate total volume moved in session
  const totalVolumeKg = exercisesState.reduce((total, ex) => {
    const exerciseVol = ex.sets.reduce((exTotal, s) => {
      if (s.completed) {
        return exTotal + s.weight * s.reps;
      }
      return exTotal;
    }, 0);
    return total + exerciseVol;
  }, 0);

  const completedSetsCount = exercisesState.reduce((cnt, ex) => {
    return cnt + ex.sets.filter((s) => s.completed).length;
  }, 0);

  const totalSetsCount = exercisesState.reduce((cnt, ex) => cnt + ex.sets.length, 0);

  const handleFinish = () => {
    const durationMin = Math.max(1, Math.round(elapsedSeconds / 60));
    const sessionLog: WorkoutSessionLog = {
      id: `session_${Date.now()}`,
      dayId: workoutDay.id,
      dayTitle: workoutDay.title[lang],
      date: new Date().toISOString(),
      durationMinutes: durationMin,
      exercises: exercisesState,
      totalVolumeKg,
    };
    setCompletedSummaryLog(sessionLog);
    setShowSummary(true);
  };

  const handleConfirmSummary = () => {
    if (completedSummaryLog) {
      onFinishWorkout(completedSummaryLog);
    }
    onClose();
  };

  if (!isOpen || !workoutDay) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl h-[94vh] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Active Session Header */}
        <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-400">
                {t.activeWorkout}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-100 mt-0.5">
              {workoutDay.title[lang]}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Stopwatch */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 font-bold">
              <Timer className="w-3.5 h-3.5" />
              <span>{formatElapsed(elapsedSeconds)}</span>
            </div>

            <button
              id="cancel-active-workout-btn"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Exercises Logger List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {exercisesState.map((loggedEx, exIdx) => {
            const exerciseDef = getExerciseById(loggedEx.exerciseId);
            const planExercise = workoutDay.exercises[exIdx];
            const restTime = planExercise?.restSeconds || 90;

            return (
              <div
                key={loggedEx.exerciseId}
                className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 space-y-3 shadow-sm"
              >
                {/* Exercise Title Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => onOpenExerciseDetail(loggedEx.exerciseId)}
                      className="text-sm sm:text-base font-bold text-slate-100 hover:text-emerald-400 transition-colors text-left flex items-center gap-1.5"
                    >
                      <span>{exerciseDef ? exerciseDef.name[lang] : loggedEx.exerciseId}</span>
                      <Info className="w-3.5 h-3.5 text-slate-500 hover:text-emerald-400" />
                    </button>
                    {planExercise?.notes && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-medium">
                        💡 {planExercise.notes}
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-slate-400 font-medium">
                    {t.rest}: {restTime}s
                  </span>
                </div>

                {/* Sets Table */}
                <div className="space-y-2">
                  <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 text-center">
                    <span className="col-span-2 text-left">{t.set}</span>
                    <span className="col-span-4">{t.weight} ({t.kg})</span>
                    <span className="col-span-3">{t.reps}</span>
                    <span className="col-span-3 text-right">{t.completed}</span>
                  </div>

                  {loggedEx.sets.map((setObj, setIdx) => {
                    const oneRm = calculateOneRepMax(setObj.weight, setObj.reps);

                    return (
                      <div
                        key={setIdx}
                        className={`grid grid-cols-12 gap-2 items-center p-2 rounded-xl transition-all ${
                          setObj.completed
                            ? 'bg-emerald-950/30 border border-emerald-500/30 text-slate-100'
                            : 'bg-slate-950 border border-slate-800'
                        }`}
                      >
                        {/* Set Number & 1RM */}
                        <div className="col-span-2 flex flex-col">
                          <span className="text-xs font-bold text-slate-300">
                            #{setObj.setNumber}
                          </span>
                          <span className="text-[9px] text-slate-500 font-mono">
                            {oneRm}kg
                          </span>
                        </div>

                        {/* Weight Input */}
                        <div className="col-span-4">
                          <input
                            type="number"
                            step="0.5"
                            value={setObj.weight}
                            onChange={(e) =>
                              updateSetField(exIdx, setIdx, 'weight', parseFloat(e.target.value) || 0)
                            }
                            className="w-full bg-slate-900 border border-slate-700/80 focus:border-emerald-500 rounded-lg px-2 py-1 text-center text-xs font-bold text-slate-100 focus:outline-none"
                          />
                        </div>

                        {/* Reps Input */}
                        <div className="col-span-3">
                          <input
                            type="number"
                            min="1"
                            max="50"
                            value={setObj.reps}
                            onChange={(e) =>
                              updateSetField(exIdx, setIdx, 'reps', parseInt(e.target.value) || 0)
                            }
                            className="w-full bg-slate-900 border border-slate-700/80 focus:border-emerald-500 rounded-lg px-2 py-1 text-center text-xs font-bold text-slate-100 focus:outline-none"
                          />
                        </div>

                        {/* Complete Checkbox Button */}
                        <div className="col-span-3 flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => toggleSetComplete(exIdx, setIdx, restTime)}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                              setObj.completed
                                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                            }`}
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                          </button>

                          {loggedEx.sets.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSetFromExercise(exIdx, setIdx)}
                              className="text-slate-600 hover:text-rose-400 p-1 transition-colors"
                              title="Remove set"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add Set Button */}
                <button
                  type="button"
                  onClick={() => addSetToExercise(exIdx)}
                  className="w-full py-1.5 rounded-xl border border-dashed border-slate-700 hover:border-emerald-500/60 text-slate-400 hover:text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.addSet}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Finish Bar */}
        <div className="px-5 py-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">
              {t.completed}: {completedSetsCount} / {totalSetsCount} {t.sets}
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {totalVolumeKg.toLocaleString()} {t.kg} {lang === 'fa' ? 'جابجا شد' : 'volume'}
            </span>
          </div>

          <button
            id="finish-workout-btn"
            onClick={handleFinish}
            className="px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95 transition-all flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>{t.finishWorkout}</span>
          </button>
        </div>

        {/* Celebration Summary Modal */}
        {showSummary && completedSummaryLog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-md bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 text-center text-slate-100 space-y-5 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-100">
                  {t.workoutFinishedTitle}
                </h3>
                <p className="text-xs text-slate-400">
                  {completedSummaryLog.dayTitle}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">{t.duration}</span>
                  <span className="text-base font-bold text-emerald-400">{completedSummaryLog.durationMinutes}m</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">{t.sets}</span>
                  <span className="text-base font-bold text-cyan-400">{completedSetsCount}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Volume</span>
                  <span className="text-base font-bold text-amber-400">{completedSummaryLog.totalVolumeKg.toLocaleString()}kg</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-left text-xs space-y-1">
                <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4" />
                  <span>{lang === 'fa' ? 'قانون اضافه بار تدریجی مربی' : 'Coach Progression Rule'}</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {lang === 'fa' 
                    ? 'هفته آینده: ۲.۵+ کیلوگرم به وزنه اضافه کنید یا ۱+ تکرار بیشتر بزنید. اگر به حد نصاب نرسیدید، وزنه را در جلسه بعد تکرار کنید.' 
                    : 'Next session target: +2.5 kg OR +1 rep on your top working sets. If target reps were missed, repeat the same weight next time.'}
                </p>
              </div>

              <button
                id="confirm-finish-summary-btn"
                onClick={handleConfirmSummary}
                className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
              >
                {t.done}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
