import { UserProfile, WorkoutSessionLog } from '../types';

export interface CycleProgressInfo {
  hasStarted: boolean;
  cycleStartDate: string | null;
  daysElapsed: number;
  totalCycleDays: number; // 28 days (4 weeks)
  daysRemaining: number;
  percentage: number;
  isDue: boolean;
  cycleNumber: number;
  currentDayNumber: number;
}

/**
 * Computes 4-week (28-day) periodic check-in progress starting strictly from the first day
 * the user completed a workout (ticked off a day).
 */
export function calculateCycleProgress(
  profile: UserProfile,
  workoutLogs: WorkoutSessionLog[] = []
): CycleProgressInfo {
  const TOTAL_CYCLE_DAYS = 28; // 4 weeks

  // 1. Identify start date of first completion
  let startDateStr: string | null = profile.firstWorkoutCompletedDate || null;

  if (!startDateStr && workoutLogs && workoutLogs.length > 0) {
    // Find the earliest date in workout logs
    const sortedDates = workoutLogs
      .map((log) => log.date)
      .filter(Boolean)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    if (sortedDates.length > 0) {
      startDateStr = sortedDates[0];
    }
  }

  // If user has completedDayIds but no date recorded, we can treat today as initiation or profile creation
  if (!startDateStr && profile.completedDayIds && profile.completedDayIds.length > 0) {
    startDateStr = new Date().toISOString().split('T')[0];
  }

  // If not started yet
  if (!startDateStr) {
    return {
      hasStarted: false,
      cycleStartDate: null,
      daysElapsed: 0,
      totalCycleDays: TOTAL_CYCLE_DAYS,
      daysRemaining: TOTAL_CYCLE_DAYS,
      percentage: 0,
      isDue: false,
      cycleNumber: 1,
      currentDayNumber: 0,
    };
  }

  // Calculate elapsed days from cycle start (or last completed biometric check)
  const baseDateStr = profile.lastBiometricCheckDate || startDateStr;
  const startDate = new Date(baseDateStr);
  const today = new Date();
  
  // Set to midnight for clean day difference
  startDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffMs = today.getTime() - startDate.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  const currentDayInCycle = (diffDays % TOTAL_CYCLE_DAYS) + 1;
  const cycleNumber = Math.floor(diffDays / TOTAL_CYCLE_DAYS) + 1;
  const daysRemaining = Math.max(0, TOTAL_CYCLE_DAYS - ((diffDays % TOTAL_CYCLE_DAYS) + 1));
  const percentage = Math.min(100, Math.round(((diffDays % TOTAL_CYCLE_DAYS) + 1) / TOTAL_CYCLE_DAYS * 100));
  const isDue = diffDays >= TOTAL_CYCLE_DAYS - 1 || percentage >= 100;

  return {
    hasStarted: true,
    cycleStartDate: startDateStr,
    daysElapsed: diffDays,
    totalCycleDays: TOTAL_CYCLE_DAYS,
    daysRemaining,
    percentage,
    isDue,
    cycleNumber,
    currentDayNumber: currentDayInCycle,
  };
}
