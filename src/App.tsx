import React, { useState, useEffect } from 'react';
import { AndroidFrame } from './components/AndroidFrame';
import { Navigation, TabType } from './components/Navigation';
import { TodayTab } from './components/TodayTab';
import { ProgramTab } from './components/ProgramTab';
import { CardioTab } from './components/CardioTab';
import { ExercisesTab } from './components/ExercisesTab';
import { ProgressTab } from './components/ProgressTab';
import { CoachTab } from './components/CoachTab';
import { OnboardingModal } from './components/OnboardingModal';
import { MyBodyProfileModal } from './components/MyBodyProfileModal';
import { CheckInModal } from './components/CheckInModal';
import { MonthlyBiometricCheckModal } from './components/MonthlyBiometricCheckModal';
import { InitialAssessmentWizard } from './components/InitialAssessmentWizard';
import { ExerciseDetailModal } from './components/ExerciseDetailModal';
import { ActiveWorkoutModal } from './components/ActiveWorkoutModal';
import { RestTimerOverlay } from './components/RestTimerOverlay';
import { WorkoutCompletionModal } from './components/WorkoutCompletionModal';
import { AIEvolutionModal } from './components/AIEvolutionModal';
import { GymToolboxModal } from './components/GymToolboxModal';
import { GoalAssessmentModal } from './components/GoalAssessmentModal';

import { UserProfile, WorkoutPlan, WorkoutDay, WorkoutSessionLog, WeightLog, Language, CheckInFeedback, TrainingSplit, PerExerciseFeedback } from './types';
import {
  loadProfile,
  saveProfile,
  loadPlan,
  savePlan,
  loadWorkoutLogs,
  saveWorkoutLogs,
  loadWeightLogs,
  saveWeightLogs,
  loadCustomGifs,
  saveCustomGif,
  loadLanguage,
  saveLanguage,
} from './utils/storage';
import { generateWorkoutPlan } from './utils/programGenerator';
import { getExerciseById } from './data/exerciseDatabase';
import { updateAIMemoryAfterWorkout, loadAIMemory } from './utils/aiMemoryEngine';
import { calculateCycleProgress } from './utils/cycleTracker';

export default function App() {
  // State
  const [lang, setLang] = useState<Language>(() => loadLanguage());
  const [profile, setProfile] = useState<UserProfile>(() => loadProfile());
  const [plan, setPlan] = useState<WorkoutPlan>(() => loadPlan(loadProfile()));
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutSessionLog[]>(() => loadWorkoutLogs());
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>(() => loadWeightLogs());
  const [customGifs, setCustomGifs] = useState<Record<string, string>>(() => loadCustomGifs());

  const [currentTab, setCurrentTab] = useState<TabType>('today');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState<boolean>(false);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState<boolean>(false);
  const [isBiometricModalOpen, setIsBiometricModalOpen] = useState<boolean>(false);
  const [activeWorkoutDay, setActiveWorkoutDay] = useState<WorkoutDay | null>(null);
  const [completionModalDay, setCompletionModalDay] = useState<WorkoutDay | null>(null);
  const [detailExerciseId, setDetailExerciseId] = useState<string | null>(null);

  // AI Evolution & Memory Modal State
  const [isAIEvolutionModalOpen, setIsAIEvolutionModalOpen] = useState<boolean>(false);
  const [aiEvolutionTab, setAiEvolutionTab] = useState<'evolutions' | 'memory' | 'add_exercise'>('evolutions');
  const [aiMemoryVersion, setAiMemoryVersion] = useState<number>(0);

  // Floating Rest Timer State
  const [restTimerSeconds, setRestTimerSeconds] = useState<number>(90);
  const [isRestTimerActive, setIsRestTimerActive] = useState<boolean>(false);

  // Gym Toolbox (1RM, Barbell Plates & Warmup Ramp) State
  const [isGymToolboxOpen, setIsGymToolboxOpen] = useState<boolean>(false);

  // Sync RTL/LTR & language attribute on mount & update
  useEffect(() => {
    saveLanguage(lang);
  }, [lang]);

  const toggleLanguage = () => {
    const nextLang: Language = lang === 'en' ? 'fa' : 'en';
    setLang(nextLang);
  };

  // Re-run full analysis and regenerate program from scratch when profile is edited
  const handleSaveProfileAndRecalculate = (updated: UserProfile) => {
    setProfile(updated);
    saveProfile(updated);
    const newPlan = generateWorkoutPlan(updated);
    setPlan(newPlan);
    savePlan(newPlan);
  };

  const handleSaveProfile = (updated: UserProfile, shouldRegenerate: boolean) => {
    setProfile(updated);
    saveProfile(updated);
    if (shouldRegenerate) {
      const newPlan = generateWorkoutPlan(updated);
      setPlan(newPlan);
      savePlan(newPlan);
    }
  };

  // 2-Year Macrocycle: Advance Mesocycle Phase & Intelligent Program Update
  const handleAdvanceMesocycle = () => {
    const nextMonth = Math.min(24, (profile.macrocycleMonth || 1) + 1);
    const phases: Array<'hypertrophy' | 'strength' | 'peaking' | 'deload'> = ['hypertrophy', 'strength', 'peaking', 'deload'];
    const currentPhaseIndex = phases.indexOf(profile.mesocyclePhase || 'hypertrophy');
    const nextPhase = phases[(currentPhaseIndex + 1) % phases.length];
    const nextMesoNum = (profile.mesocycleNumber || 1) + (nextPhase === 'hypertrophy' ? 1 : 0);

    const updatedProfile: UserProfile = {
      ...profile,
      macrocycleMonth: nextMonth,
      mesocyclePhase: nextPhase,
      mesocycleNumber: nextMesoNum,
      mesocycleWeek: 1,
    };
    handleSaveProfileAndRecalculate(updatedProfile);
  };

  const handleApplyCheckInAdaptation = (
    checkIn: CheckInFeedback,
    updatedProfile: UserProfile,
    updatedPlan: WorkoutPlan
  ) => {
    setProfile(updatedProfile);
    saveProfile(updatedProfile);
    setPlan(updatedPlan);
    savePlan(updatedPlan);
  };

  const handleUpdatePlan = (updatedPlan: WorkoutPlan) => {
    setPlan(updatedPlan);
    savePlan(updatedPlan);
  };

  const handleRegeneratePlan = () => {
    const newPlan = generateWorkoutPlan(profile);
    setPlan(newPlan);
    savePlan(newPlan);
  };

  const handleResetToDay1 = () => {
    const updatedProfile: UserProfile = {
      ...profile,
      macrocycleMonth: 1,
      mesocycleNumber: 1,
      mesocycleWeek: 1,
      mesocyclePhase: 'hypertrophy',
    };
    const newPlan = generateWorkoutPlan(updatedProfile, 1, 1);
    setProfile(updatedProfile);
    saveProfile(updatedProfile);
    setPlan(newPlan);
    savePlan(newPlan);
  };

  const handleRestartCurrentPhase = () => {
    const updatedProfile: UserProfile = {
      ...profile,
      mesocycleWeek: 1,
    };
    const newPlan = generateWorkoutPlan(updatedProfile, updatedProfile.macrocycleMonth || 1, 1);
    setProfile(updatedProfile);
    saveProfile(updatedProfile);
    setPlan(newPlan);
    savePlan(newPlan);
  };

  const handleSelectMonthWeek = (month: number, week: number) => {
    const updatedProfile: UserProfile = {
      ...profile,
      macrocycleMonth: month,
      mesocycleWeek: week,
      mesocycleNumber: Math.ceil(month / 2),
    };
    const newPlan = generateWorkoutPlan(updatedProfile, month, week);
    setProfile(updatedProfile);
    saveProfile(updatedProfile);
    setPlan(newPlan);
    savePlan(newPlan);
  };

  const handleFinishWorkout = (sessionLog: WorkoutSessionLog) => {
    const updated = [sessionLog, ...workoutLogs];
    setWorkoutLogs(updated);
    saveWorkoutLogs(updated);
    setActiveWorkoutDay(null);
    setIsRestTimerActive(false);
  };

  const handleTriggerRestTimer = (seconds: number) => {
    setRestTimerSeconds(seconds);
    setIsRestTimerActive(true);
  };

  const handleSaveCustomGif = (exerciseId: string, url: string) => {
    saveCustomGif(exerciseId, url);
    setCustomGifs((prev) => ({ ...prev, [exerciseId]: url }));
  };

  const handleAddWeightLog = (log: WeightLog, updatedProfile: UserProfile) => {
    const updatedLogs = [log, ...weightLogs];
    setWeightLogs(updatedLogs);
    saveWeightLogs(updatedLogs);
    setProfile(updatedProfile);
    saveProfile(updatedProfile);
  };

  const handleApplyBiometricUpdate = (
    updatedProfile: UserProfile,
    newWeightLog: WeightLog,
    aiAdvisory: { en: string; fa: string; calorieAdjustmentKcal: number }
  ) => {
    const profileWithCheckDate: UserProfile = {
      ...updatedProfile,
      lastBiometricCheckDate: newWeightLog.date || new Date().toISOString().split('T')[0],
    };
    handleAddWeightLog(newWeightLog, profileWithCheckDate);
  };

  // Workout Completed Action Handlers (Button: “Workout Completed / تمرین انجام شد”)
  const handleOpenCompletionModal = (day: WorkoutDay) => {
    setCompletionModalDay(day);
  };

  const handleConfirmWorkoutCompletion = (
    dayId: string,
    dayTitle: string,
    perceivedHardness: number,
    finishedAllSets: boolean,
    notes?: string,
    exerciseFeedbacks?: PerExerciseFeedback[]
  ) => {
    const currentCompleted = profile.completedDayIds || [];
    const updatedCompleted = currentCompleted.includes(dayId) ? currentCompleted : [...currentCompleted, dayId];

    const sessionLog: WorkoutSessionLog = {
      id: `sess_${Date.now()}`,
      dayId,
      dayTitle,
      date: new Date().toISOString().split('T')[0],
      durationMinutes: 50,
      totalVolumeKg: 3500,
      perceivedHardness,
      finishedAllSets,
      notes,
      exercises: [],
    };

    const updatedLogs = [sessionLog, ...workoutLogs];
    setWorkoutLogs(updatedLogs);
    saveWorkoutLogs(updatedLogs);

    const updatedProfile: UserProfile = {
      ...profile,
      completedDayIds: updatedCompleted,
      firstWorkoutCompletedDate: profile.firstWorkoutCompletedDate || sessionLog.date,
    };
    setProfile(updatedProfile);
    saveProfile(updatedProfile);
    setCompletionModalDay(null);

    // Feed scientific performance and feedback data into AI Memory & Evolution Engine
    const { proposedEvolutions } = updateAIMemoryAfterWorkout(
      {
        date: sessionLog.date,
        workoutHardness: perceivedHardness,
        finishedAllSets,
        exerciseFeedbacks: exerciseFeedbacks || [],
        userBodyweight: profile.weight,
      },
      plan
    );

    setAiMemoryVersion((v) => v + 1);

    // If AI proposed biomechanical exercise substitutions, open the Evolution modal
    if (proposedEvolutions && proposedEvolutions.length > 0) {
      setIsAIEvolutionModalOpen(true);
      setAiEvolutionTab('evolutions');
    }
  };

  // Quick toggle or direct check/uncheck for day completion
  const handleToggleDayCompletion = (dayId: string) => {
    const currentCompleted = profile.completedDayIds || [];
    let updatedCompleted: string[];
    if (currentCompleted.includes(dayId)) {
      updatedCompleted = currentCompleted.filter((id) => id !== dayId);
    } else {
      updatedCompleted = [...currentCompleted, dayId];
    }
    const isAdding = !currentCompleted.includes(dayId);
    const updatedProfile: UserProfile = {
      ...profile,
      completedDayIds: updatedCompleted,
      firstWorkoutCompletedDate: profile.firstWorkoutCompletedDate || (isAdding ? new Date().toISOString().split('T')[0] : profile.firstWorkoutCompletedDate),
    };
    setProfile(updatedProfile);
    saveProfile(updatedProfile);
  };

  // Handle Switching Trainee Context ("برای خودم (۶ ماه سابقه)" vs "برای دیگری (مبتدی)")
  const handleChangeTrainingContext = (newContext: 'myself_6_months' | 'other_beginner') => {
    const isMyself = newContext === 'myself_6_months';
    const updatedProfile: UserProfile = {
      ...profile,
      trainingContext: newContext,
      experienceMonths: isMyself ? 6 : 0,
      experience: isMyself ? 'intermediate' : 'beginner',
    };
    const newPlan = generateWorkoutPlan(
      updatedProfile,
      updatedProfile.macrocycleMonth || 1,
      updatedProfile.mesocycleWeek || 1
    );
    setProfile(updatedProfile);
    saveProfile(updatedProfile);
    setPlan(newPlan);
    savePlan(newPlan);
    setCurrentTab('program');
  };

  // Dynamic Frequency Switcher (3, 4, 5, 6 days) - Adapts split and rest days
  const handleChangeWeeklyDays = (weeklyDays: 3 | 4 | 5 | 6) => {
    const splitMap: Record<number, TrainingSplit> = {
      3: 'full_body',
      4: 'upper_lower',
      5: 'ppl',
      6: 'ppl',
    };
    const updatedProfile: UserProfile = {
      ...profile,
      weeklyDays,
      preferredSplit: splitMap[weeklyDays] || 'upper_lower',
    };
    handleSaveProfileAndRecalculate(updatedProfile);
  };

  // Compute active streak count
  const streakCount = Math.min(14, workoutLogs.length + (workoutLogs.length > 0 ? 1 : 0));

  // Compute 4-week biometric check-in cycle progress
  const cycleProgress = calculateCycleProgress(profile, workoutLogs);

  const selectedDetailExercise = detailExerciseId ? getExerciseById(detailExerciseId) : null;
  const displayName = profile.name.trim() || (lang === 'fa' ? 'ورزشکار' : 'Athlete');

  // If initial biometric assessment hasn't been completed yet, launch the assessment directly
  if (!profile.onboardingCompleted) {
    return (
      <AndroidFrame
        lang={lang}
        onToggleLanguage={toggleLanguage}
        onOpenProfile={() => {}}
        userName={displayName}
      >
        <InitialAssessmentWizard
          initialProfile={profile}
          onComplete={(completedProfile) => {
            handleSaveProfile(completedProfile, true);
            // Add initial weigh-in entry
            const initialWeightEntry: WeightLog = {
              id: 'weight_init_' + Date.now(),
              date: new Date().toISOString().split('T')[0],
              weight: completedProfile.weight,
              bodyFat: completedProfile.bodyFatPercent,
            };
            handleAddWeightLog(initialWeightEntry, completedProfile);
          }}
          lang={lang}
        />
      </AndroidFrame>
    );
  }

  return (
    <AndroidFrame
      lang={lang}
      onToggleLanguage={toggleLanguage}
      onOpenProfile={() => setIsProfileModalOpen(true)}
      userName={displayName}
      onOpenToolbox={() => setIsGymToolboxOpen(true)}
    >
      {/* Top Header & App Bar */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        lang={lang}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenGoalModal={() => setIsGoalModalOpen(true)}
        userName={displayName}
        streakCount={streakCount}
        trainingContext={profile.trainingContext || 'myself_6_months'}
        onChangeTrainingContext={handleChangeTrainingContext}
        cycleProgress={cycleProgress}
        onOpenBiometricCheck={() => setIsBiometricModalOpen(true)}
      />

      {/* Tab Viewport */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {currentTab === 'today' && (
          <TodayTab
            plan={plan}
            profile={profile}
            lang={lang}
            onStartWorkout={(day) => setActiveWorkoutDay(day)}
            onOpenExerciseDetail={(id) => setDetailExerciseId(id)}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            onOpenGoalModal={() => setIsGoalModalOpen(true)}
            cycleProgress={cycleProgress}
            onUpdateProfile={(updated) => handleSaveProfile(updated, false)}
            onOpenCheckIn={() => setIsCheckInModalOpen(true)}
            onOpenBiometricCheck={() => setIsBiometricModalOpen(true)}
            onCompleteWorkoutDay={handleOpenCompletionModal}
            onToggleDayCompletion={handleToggleDayCompletion}
            onChangeWeeklyDays={handleChangeWeeklyDays}
          />
        )}

        {currentTab === 'program' && (
          <ProgramTab
            plan={plan}
            lang={lang}
            profile={profile}
            onUpdatePlan={handleUpdatePlan}
            onRegeneratePlan={handleRegeneratePlan}
            onAdvanceMesocycle={handleAdvanceMesocycle}
            onOpenExerciseDetail={(id) => setDetailExerciseId(id)}
            onOpenCheckIn={() => setIsCheckInModalOpen(true)}
            onOpenBiometricCheck={() => setIsBiometricModalOpen(true)}
            onResetToDay1={handleResetToDay1}
            onRestartCurrentPhase={handleRestartCurrentPhase}
            onRecalculateFullPlan={handleRegeneratePlan}
            onSelectMonthWeek={handleSelectMonthWeek}
            onCompleteWorkoutDay={handleOpenCompletionModal}
            onToggleDayCompletion={handleToggleDayCompletion}
            onChangeWeeklyDays={handleChangeWeeklyDays}
            onOpenAIEvolution={() => {
              setIsAIEvolutionModalOpen(true);
              setAiEvolutionTab('evolutions');
            }}
            pendingEvolutionCount={loadAIMemory().evolutionEvents.filter((e) => !e.applied).length}
          />
        )}

        {currentTab === 'cardio' && (
          <CardioTab lang={lang} />
        )}

        {currentTab === 'exercises' && (
          <ExercisesTab
            lang={lang}
            onOpenExerciseDetail={(id) => setDetailExerciseId(id)}
            customGifs={customGifs}
            onOpenAddExerciseModal={() => {
              setIsAIEvolutionModalOpen(true);
              setAiEvolutionTab('add_exercise');
            }}
          />
        )}

        {currentTab === 'progress' && (
          <ProgressTab
            weightLogs={weightLogs}
            profile={profile}
            workoutLogs={workoutLogs}
            lang={lang}
            onAddWeightLog={handleAddWeightLog}
            onOpenBiometricCheck={() => setIsBiometricModalOpen(true)}
          />
        )}

        {currentTab === 'coach' && (
          <CoachTab
            profile={profile}
            plan={plan}
            workoutLogs={workoutLogs}
            lang={lang}
            onUpdatePlan={handleUpdatePlan}
          />
        )}
      </div>

      {/* Floating Rest Timer Component */}
      {isRestTimerActive && (
        <RestTimerOverlay
          initialSeconds={restTimerSeconds}
          isActive={isRestTimerActive}
          onClose={() => setIsRestTimerActive(false)}
          lang={lang}
        />
      )}

      {/* Dedicated "My Body Profile / پروفایل بدن من" Modal */}
      {isProfileModalOpen && (
        <MyBodyProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          profile={profile}
          onSaveProfileAndRecalculate={handleSaveProfileAndRecalculate}
          lang={lang}
        />
      )}

      {/* 2-4 Week Auto Check-In & Adaptive Deload Modal */}
      {isCheckInModalOpen && (
        <CheckInModal
          isOpen={isCheckInModalOpen}
          onClose={() => setIsCheckInModalOpen(false)}
          profile={profile}
          plan={plan}
          onApplyCheckInAdaptation={handleApplyCheckInAdaptation}
          lang={lang}
        />
      )}

      {/* 4-Week Biometric & Nutrition Audit Modal */}
      {isBiometricModalOpen && (
        <MonthlyBiometricCheckModal
          isOpen={isBiometricModalOpen}
          onClose={() => setIsBiometricModalOpen(false)}
          profile={profile}
          onApplyBiometricUpdate={handleApplyBiometricUpdate}
          lang={lang}
          cycleProgress={cycleProgress}
        />
      )}

      {detailExerciseId && selectedDetailExercise && (
        <ExerciseDetailModal
          exercise={selectedDetailExercise}
          isOpen={!!detailExerciseId}
          onClose={() => setDetailExerciseId(null)}
          lang={lang}
          onSaveCustomGif={handleSaveCustomGif}
          customGifUrl={detailExerciseId ? customGifs[detailExerciseId] : undefined}
        />
      )}

      {activeWorkoutDay && (
        <ActiveWorkoutModal
          workoutDay={activeWorkoutDay}
          isOpen={!!activeWorkoutDay}
          onClose={() => setActiveWorkoutDay(null)}
          onFinishWorkout={handleFinishWorkout}
          onTriggerRestTimer={handleTriggerRestTimer}
          onOpenExerciseDetail={(id) => setDetailExerciseId(id)}
          lang={lang}
        />
      )}

      {/* Workout Completion Modal (Button: "Workout Completed / تمرین انجام شد") */}
      {completionModalDay && (
        <WorkoutCompletionModal
          isOpen={!!completionModalDay}
          onClose={() => setCompletionModalDay(null)}
          day={completionModalDay}
          lang={lang}
          onCompleteWorkout={handleConfirmWorkoutCompletion}
        />
      )}

      {/* AI Memory & Exercise Evolution Modal (NASM/ACSM Scientific Engine) */}
      {isAIEvolutionModalOpen && (
        <AIEvolutionModal
          isOpen={isAIEvolutionModalOpen}
          onClose={() => setIsAIEvolutionModalOpen(false)}
          lang={lang}
          currentPlan={plan}
          onUpdatePlan={handleUpdatePlan}
          activeTab={aiEvolutionTab}
        />
      )}

      {/* Smart Gym Toolbox (1RM, Plates, Warmup Ramp) */}
      {isGymToolboxOpen && (
        <GymToolboxModal
          isOpen={isGymToolboxOpen}
          onClose={() => setIsGymToolboxOpen(false)}
          lang={lang}
        />
      )}

      {/* 🎯 Goal Assessment & Dream Physique Questionnaire Modal */}
      {isGoalModalOpen && (
        <GoalAssessmentModal
          isOpen={isGoalModalOpen}
          onClose={() => setIsGoalModalOpen(false)}
          profile={profile}
          onSaveGoal={(updatedProfile) => {
            handleSaveProfile(updatedProfile, false);
            setIsGoalModalOpen(false);
          }}
          lang={lang}
        />
      )}
    </AndroidFrame>
  );
}
