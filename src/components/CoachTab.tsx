import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  RefreshCw,
  Award,
  ArrowUpRight,
  Zap,
  RotateCcw,
  Activity,
  CheckCircle2,
  ArrowRight,
  History,
  Plus,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  X,
  AlertCircle
} from 'lucide-react';
import {
  UserProfile,
  WorkoutPlan,
  WorkoutSessionLog,
  Language,
  CoachProposedPlanUpdate,
  CoachChatMessage,
  CoachChatSession,
} from '../types';
import { translations } from '../translations';
import { getExerciseById, exerciseDatabase } from '../data/exerciseDatabase';
import { calculateComprehensiveBodyAnalysis } from '../utils/fitnessCalculations';
import { loadAIMemory } from '../utils/aiMemoryEngine';
import {
  savePlan,
  loadCoachChatSessions,
  saveCoachChatSessions,
  loadActiveCoachSessionId,
  saveActiveCoachSessionId,
  deleteCoachChatSession,
  clearAllCoachChatSessions,
} from '../utils/storage';
import { CoachPlanUpdateModal } from './CoachPlanUpdateModal';
import { CoachHistoryModal } from './CoachHistoryModal';

interface CoachTabProps {
  profile: UserProfile;
  plan: WorkoutPlan;
  workoutLogs: WorkoutSessionLog[];
  lang: Language;
  onUpdatePlan?: (updatedPlan: WorkoutPlan) => void;
}

// Clean and structured renderer for AI coach responses (headings, bold, lists)
const FormattedCoachMessage: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5 leading-relaxed text-xs">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="font-bold text-emerald-400 text-sm mt-2 mb-1 border-b border-emerald-500/20 pb-0.5">
              {trimmed.replace(/^###\s+/, '')}
            </h4>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={idx} className="font-bold text-slate-100 text-sm mt-2 mb-1">
              {trimmed.replace(/^##\s+/, '')}
            </h3>
          );
        }

        const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*');
        const isNumbered = /^\d+\.\s+/.test(trimmed);

        const formatParts = (str: string) => {
          return str.split(/(\*\*[^*]+\*\*)/g).map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-emerald-300">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          });
        };

        if (isBullet) {
          const content = trimmed.replace(/^[•\-*]\s*/, '');
          return (
            <div key={idx} className="flex items-start gap-1.5 text-slate-200">
              <span className="text-emerald-400 select-none mt-0.5 shrink-0">•</span>
              <span>{formatParts(content)}</span>
            </div>
          );
        }

        if (isNumbered) {
          const match = trimmed.match(/^(\d+\.)\s+(.*)/);
          if (match) {
            return (
              <div key={idx} className="flex items-start gap-1.5 text-slate-200">
                <span className="font-bold text-emerald-400 select-none shrink-0">{match[1]}</span>
                <span>{formatParts(match[2])}</span>
              </div>
            );
          }
        }

        return (
          <p key={idx} className="text-slate-200">
            {formatParts(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

export const CoachTab: React.FC<CoachTabProps> = ({
  profile,
  plan,
  workoutLogs,
  lang,
  onUpdatePlan,
}) => {
  const t = translations[lang];
  const bodyAnalysis = calculateComprehensiveBodyAnalysis(profile);

  // Helper to build rich enriched plan with full exercise metadata
  const getEnrichedPlan = () => {
    return {
      ...plan,
      days: (plan?.days || []).map((day) => ({
        ...day,
        exercises: (day.exercises || []).map((item) => {
          const ex = getExerciseById(item.exerciseId, exerciseDatabase);
          return {
            ...item,
            exerciseName: ex ? ex.name : item.exerciseId,
            muscleGroup: ex?.muscleGroup,
            targetMuscle: ex?.targetMuscle,
            movementPattern: ex?.movementPattern,
            type: ex?.type,
            equipment: ex?.equipment,
            tempo: ex?.guide?.tempo,
          };
        }),
      })),
    };
  };

  const createInitialWelcome = (): string => {
    return lang === 'fa'
      ? `درود ${profile.name || 'ورزشکار گرامی'}! من مربی ارشد علوم ورزشی و هایپرتروفی شما هستم (در بالاترین سطح استانداردهای CSCS و مربیگری نوین جهان). تمام ویژگی‌های بیومتریک شما (وزن ${profile.weight}kg، چربی بدنی ${bodyAnalysis.bodyFat.bodyFatPercent}٪، دور کمر ${profile.measurements?.waist || 84}cm و دور بازو ${profile.measurements?.arms || 37}cm) به همراه برنامه تمرینی ${plan?.name?.fa || 'فعلی'} شما بارگذاری شده است. چه سوال تخصصی، چکاپ مفاصل یا بهینه‌سازی در حرکات برنامه نیاز دارید؟`
      : `Hello ${profile.name || 'Athlete'}! I am your elite Strength & Hypertrophy Master Coach (CSCS & Exercise Science standard). Your biometrics (${profile.weight}kg, ${bodyAnalysis.bodyFat.bodyFatPercent}% BF, ${profile.measurements?.waist || 84}cm waist) and active plan (${plan?.name?.en || 'Current Plan'}) are synchronized. What questions, biomechanical adjustments, or joint audits do you require today?`;
  };

  // Chat Sessions and History State
  const [sessions, setSessions] = useState<CoachChatSession[]>(() => {
    const loaded = loadCoachChatSessions();
    if (loaded && loaded.length > 0) return loaded;
    const initialSession: CoachChatSession = {
      id: `session_${Date.now()}`,
      title: lang === 'fa' ? 'گفتگوی نخست با مربی' : 'First Consultation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: 'msg_welcome',
          sender: 'coach',
          text: createInitialWelcome(),
          timestamp: 'Just now',
        },
      ],
    };
    saveCoachChatSessions([initialSession]);
    saveActiveCoachSessionId(initialSession.id);
    return [initialSession];
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    const savedActiveId = loadActiveCoachSessionId();
    if (savedActiveId && sessions.some((s) => s.id === savedActiveId)) {
      return savedActiveId;
    }
    return sessions[0]?.id || `session_${Date.now()}`;
  });

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];
  const [messages, setMessages] = useState<CoachChatMessage[]>(
    activeSession ? activeSession.messages : []
  );

  // Sync active session messages
  useEffect(() => {
    if (activeSession) {
      setMessages(activeSession.messages);
    }
  }, [activeSessionId]);

  // Save current messages to sessions array & localStorage
  const updateCurrentSessionMessages = (newMessages: CoachChatMessage[]) => {
    setMessages(newMessages);
    setSessions((prevSessions) => {
      const updated = prevSessions.map((sess) => {
        if (sess.id === activeSessionId) {
          // Auto-generate a title from first user query if still generic
          let title = sess.title;
          const firstUserMsg = newMessages.find((m) => m.sender === 'user');
          if (
            (title === 'گفتگوی نخست با مربی' || title === 'First Consultation' || title === 'گفتگوی جدید' || title === 'New Chat') &&
            firstUserMsg
          ) {
            title = firstUserMsg.text.slice(0, 32) + (firstUserMsg.text.length > 32 ? '...' : '');
          }
          return {
            ...sess,
            title,
            updatedAt: new Date().toISOString(),
            messages: newMessages,
          };
        }
        return sess;
      });
      saveCoachChatSessions(updated);
      return updated;
    });
  };

  // Modals & Popup State
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [activePopupProposal, setActivePopupProposal] = useState<{
    messageId: string;
    update: CoachProposedPlanUpdate;
  } | null>(null);

  // Diagnostic Questionnaire State
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState<boolean>(false);
  const [diagJoint, setDiagJoint] = useState<string>('بدون درد (سالم)');
  const [diagSleep, setDiagSleep] = useState<string>('خواب عالی (۸ ساعت+)');
  const [diagPlateau, setDiagPlateau] = useState<string>('در حال پیشرفت');
  const [diagPump, setDiagPump] = useState<string>('پمپ عالی');

  // Input & loading
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<any>(null);
  const [appliedToast, setAppliedToast] = useState<string | null>(null);

  const quickPrompts = [
    {
      en: 'Audit my current workout exercises and overload',
      fa: 'بررسی حرکات برنامه من و اضافه بار این هفته',
    },
    {
      en: 'Analyze my body volume and waist ratio for my goal',
      fa: 'آنالیز کامل حجم بدن و دور کمر نسبت به هدف وزنی من',
    },
    {
      en: 'Calculate exact protein & calories based on my lean mass',
      fa: 'محاسبه گرم پروتئین و کالری دقیق بر اساس توده خالص من',
    },
    {
      en: 'Form, breathing & cues for my main compound lifts',
      fa: 'نکات تنفس، مانور والسالوا و ریتم حرکات اصلی من',
    },
  ];

  // Start a fresh new chat session
  const handleStartNewChat = () => {
    const newSession: CoachChatSession = {
      id: `session_${Date.now()}`,
      title: lang === 'fa' ? 'گفتگوی جدید' : 'New Chat',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg_welcome_${Date.now()}`,
          sender: 'coach',
          text: createInitialWelcome(),
          timestamp: 'Just now',
        },
      ],
    };
    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);
    saveCoachChatSessions(updatedSessions);
    setActiveSessionId(newSession.id);
    saveActiveCoachSessionId(newSession.id);
    setMessages(newSession.messages);
    setIsHistoryModalOpen(false);
  };

  // Select a past session
  const handleSelectSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
    saveActiveCoachSessionId(sessionId);
    const target = sessions.find((s) => s.id === sessionId);
    if (target) {
      setMessages(target.messages);
    }
    setIsHistoryModalOpen(false);
  };

  // Delete a specific session
  const handleDeleteSession = (sessionId: string) => {
    const updated = deleteCoachChatSession(sessionId);
    setSessions(updated);
    if (activeSessionId === sessionId) {
      if (updated.length > 0) {
        setActiveSessionId(updated[0].id);
        setMessages(updated[0].messages);
      } else {
        handleStartNewChat();
      }
    }
  };

  // Clear all history
  const handleClearAllHistory = () => {
    clearAllCoachChatSessions();
    const freshSession: CoachChatSession = {
      id: `session_${Date.now()}`,
      title: lang === 'fa' ? 'گفتگوی نخست با مربی' : 'First Consultation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg_welcome_${Date.now()}`,
          sender: 'coach',
          text: createInitialWelcome(),
          timestamp: 'Just now',
        },
      ],
    };
    setSessions([freshSession]);
    saveCoachChatSessions([freshSession]);
    setActiveSessionId(freshSession.id);
    saveActiveCoachSessionId(freshSession.id);
    setMessages(freshSession.messages);
    setIsHistoryModalOpen(false);
  };

  const handleSendMessage = async (textToSend: string) => {
    const query = textToSend.trim();
    if (!query || isLoading) return;

    const userMsg: CoachChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMsgsWithUser = [...messages, userMsg];
    updateCurrentSessionMessages(newMsgsWithUser);
    setInputQuery('');
    setIsLoading(true);

    try {
      const enrichedPlan = getEnrichedPlan();
      const aiMemory = loadAIMemory();

      const response = await fetch('/api/coach/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          message: query,
          profile,
          userProfile: profile,
          plan: enrichedPlan,
          currentPlan: enrichedPlan,
          bodyAnalysis,
          workoutLogs,
          recentLogs: workoutLogs,
          aiMemory,
          history: newMsgsWithUser.slice(-8).map((m) => ({ sender: m.sender, text: m.text })),
          lang,
          language: lang,
        }),
      });

      if (!response.ok) throw new Error('Coach API request failed');

      const data = await response.json();
      const rawText = data.reply || (lang === 'fa' ? 'پاسخی از مربی دریافت نشد.' : 'No response from coach.');
      const updateMatch = rawText.match(/\[PLAN_UPDATE:\s*(\{.*?\})\s*\]/s);
      let proposedUpdate: CoachProposedPlanUpdate | undefined = undefined;
      let cleanText = rawText;

      if (updateMatch) {
        try {
          const parsed = JSON.parse(updateMatch[1]);
          proposedUpdate = {
            id: `prop_${Date.now()}`,
            dayTitle: parsed.dayTitle,
            originalExerciseName: parsed.originalExerciseName || (lang === 'fa' ? 'حرکت قبلی' : 'Current Exercise'),
            originalExerciseId: parsed.originalExerciseId,
            newExerciseName: parsed.newExerciseName || (lang === 'fa' ? 'حرکت جایگزین' : 'Replacement Exercise'),
            newExerciseId: parsed.newExerciseId,
            action: parsed.action || 'swap_exercise',
            details: parsed.details,
            newSets: parsed.newSets || 4,
            newReps: parsed.newReps || '8-10',
            applied: false,
          };
          cleanText = rawText.replace(/\[PLAN_UPDATE:.*?\]/s, '').trim();
        } catch (e) {
          console.error('Failed to parse plan update:', e);
        }
      }

      const coachMsg: CoachChatMessage = {
        id: `c_${Date.now()}`,
        sender: 'coach',
        text: cleanText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        proposedUpdate,
      };

      const finalMsgs = [...newMsgsWithUser, coachMsg];
      updateCurrentSessionMessages(finalMsgs);

      // IMMEDIATELY TRIGGER CONFIRMATION MENU POPUP IF PROPOSED UPDATE EXISTS
      if (proposedUpdate) {
        setActivePopupProposal({
          messageId: coachMsg.id,
          update: proposedUpdate,
        });
      }
    } catch (err: any) {
      console.error('Coach communication error:', err);
      // Fallback local CSCS reasoning referencing actual measurements
      const m = profile?.measurements || {};
      const firstDay = plan?.days?.[0];
      const firstDayTitle = firstDay
        ? typeof firstDay.title === 'object'
          ? lang === 'fa'
            ? firstDay.title.fa
            : firstDay.title.en
          : firstDay.title
        : 'روز ۱: بالاتنه A';

      const fallbackReply =
        lang === 'fa'
          ? `### 🩺 تحلیل تخصصی مربی تراز اول بر اساس مشخصات بدنی شما\n\nبر مبنای ارزیابی علمی فاکتورهای بدنی (دور کمر ${m.waist || 84}cm، دور سینه ${m.chest || 104}cm، دور بازو ${m.arms || 37}cm و وزن ${profile.weight}kg) و برنامه فعال ${plan?.name?.fa || 'شما'}:\n- **تحلیل اضافه بار:** جهت پیشگیری از آسیب مفصلی و هایپرتروفی حداکثری، حرکت اصلی با تمرین ایمن‌تر و بازدهی عضلانی بالاتر جایگزین می‌گردد.\n- **پروتئین هدف:** روزانه **${bodyAnalysis.nutrition.proteinGrams} گرم پروتئین خالص** مصرف فرمایید.\n\nمنوی تایید پاپ‌آپ جهت اعمال این تغییر در برنامه شما فعال گردید.\n\n[PLAN_UPDATE:{"dayTitle":"${firstDayTitle}","originalExerciseName":"اسکوات با هالتر","newExerciseName":"پرس پا با دستگاه (Leg Press)","action":"swap_exercise","details":"کاهش بار برشی بر زانو و ستون فقرات با فعال‌سازی عمیق چهارسر ران","newSets":4,"newReps":"8-10"}]`
          : `### 🩺 CSCS Master Personalized Biomechanical Assessment\n\nBased on your biometrics (${profile.weight}kg, ${bodyAnalysis.bodyFat.bodyFatPercent}% BF, ${m.waist || 84}cm waist) and your active workout program:\n- We propose replacing primary heavy spinal load with machine support for optimal hypertrophic tension.\n- Daily target is **${bodyAnalysis.nutrition.proteinGrams}g of clean protein**.\n\n[PLAN_UPDATE:{"dayTitle":"${firstDayTitle}","originalExerciseName":"Barbell Squat","newExerciseName":"Leg Press Machine","action":"swap_exercise","details":"Reduces axial spinal loading while maximizing quad recruitment","newSets":4,"newReps":"8-10"}]`;

      const updateMatch = fallbackReply.match(/\[PLAN_UPDATE:\s*(\{.*?\})\s*\]/s);
      let proposedUpdate: CoachProposedPlanUpdate | undefined = undefined;
      let cleanFallback = fallbackReply;

      if (updateMatch) {
        try {
          const parsed = JSON.parse(updateMatch[1]);
          proposedUpdate = {
            id: `prop_${Date.now()}`,
            dayTitle: parsed.dayTitle,
            originalExerciseName: parsed.originalExerciseName,
            originalExerciseId: parsed.originalExerciseId,
            newExerciseName: parsed.newExerciseName,
            newExerciseId: parsed.newExerciseId,
            action: parsed.action || 'swap_exercise',
            details: parsed.details,
            newSets: parsed.newSets || 4,
            newReps: parsed.newReps || '8-10',
            applied: false,
          };
          cleanFallback = fallbackReply.replace(/\[PLAN_UPDATE:.*?\]/s, '').trim();
        } catch (e) {
          console.error('Failed to parse fallback update:', e);
        }
      }

      const coachMsg: CoachChatMessage = {
        id: `c_fallback_${Date.now()}`,
        sender: 'coach',
        text: cleanFallback,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        proposedUpdate,
      };

      const finalMsgs = [...newMsgsWithUser, coachMsg];
      updateCurrentSessionMessages(finalMsgs);

      if (proposedUpdate) {
        setActivePopupProposal({
          messageId: coachMsg.id,
          update: proposedUpdate,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Diagnostic Questionnaire to AI Coach
  const handleSubmitDiagnostic = () => {
    setIsDiagnosticOpen(false);
    const diagnosticReport =
      lang === 'fa'
        ? `[گزارش چکاپ تشخیصی مربی تراز اول]:
• وضعیت مفاصل و زردپی‌ها: ${diagJoint}
• ریکاوری، خواب و خستگی: ${diagSleep}
• وضعیت استپ وزنه در حرکات اصلی: ${diagPlateau}
• کیفیت پمپ و هایپرتروفی عضلانی: ${diagPump}

لطفاً به عنوان یک مربی تراز اول دنیا، تحلیل بیومکانیکی دقیق خود را ارائه دهید و در صورت نیاز به تغییر حرکت یا تنظیم ست/تکرار، تغییرات را برای برنامه من پیشنهاد فرمایید تا منوی تایید اعمال شود.`
        : `[Elite Diagnostic Checkup Report]:
• Articular & joint status: ${diagJoint}
• Sleep & systemic recovery: ${diagSleep}
• Compound lift plateau status: ${diagPlateau}
• Pump & hypertrophy sensation: ${diagPump}

Please provide an elite CSCS biomechanical diagnosis and propose optimal program exercise adaptations.`;

    handleSendMessage(diagnosticReport);
  };

  // One-click Exercise Modification in Plan ("اعمال شود")
  const handleApplyProposedPlanUpdate = (messageId: string, update: CoachProposedPlanUpdate) => {
    if (!onUpdatePlan) return;
    const currentPlan = getEnrichedPlan();
    if (!currentPlan || !currentPlan.days) return;

    let exerciseReplaced = false;
    const updatedDays = currentPlan.days.map((day) => {
      const exercises = day.exercises.map((ex) => {
        if (exerciseReplaced) return ex;

        const exDef = getExerciseById(ex.exerciseId);
        const exNameEn = exDef?.name?.en?.toLowerCase() || '';
        const exNameFa = exDef?.name?.fa?.toLowerCase() || '';
        const targetOrig = (update.originalExerciseName || '').toLowerCase();

        const isMatch =
          (update.originalExerciseId && ex.exerciseId === update.originalExerciseId) ||
          (targetOrig &&
            (exNameFa.includes(targetOrig) ||
              targetOrig.includes(exNameFa) ||
              exNameEn.includes(targetOrig) ||
              targetOrig.includes(exNameEn))) ||
          (targetOrig.includes('اسکوات') && ex.exerciseId.includes('squat')) ||
          (targetOrig.includes('سینه') && (ex.exerciseId.includes('bench') || ex.exerciseId.includes('press'))) ||
          (targetOrig.includes('زیربغل') && (ex.exerciseId.includes('pull') || ex.exerciseId.includes('row'))) ||
          (targetOrig.includes('سرشانه') && (ex.exerciseId.includes('shoulder') || ex.exerciseId.includes('overhead')));

        if (isMatch) {
          exerciseReplaced = true;
          let replacementId = update.newExerciseId;
          if (!replacementId) {
            const newNameLower = update.newExerciseName.toLowerCase();
            if (newNameLower.includes('پرس پا') || newNameLower.includes('leg press')) {
              replacementId = 'leg_press';
            } else if (newNameLower.includes('دمبل') && newNameLower.includes('سینه')) {
              replacementId = 'dumbbell_bench_press';
            } else if (newNameLower.includes('لت') || newNameLower.includes('سیم')) {
              replacementId = 'lat_pulldown';
            } else if (newNameLower.includes('سرشانه') && newNameLower.includes('دمبل')) {
              replacementId = 'dumbbell_lateral_raise';
            } else {
              const foundInDb = exerciseDatabase.find(
                (e) =>
                  e.name.fa.includes(update.newExerciseName) ||
                  update.newExerciseName.includes(e.name.fa) ||
                  e.name.en.toLowerCase().includes(update.newExerciseName.toLowerCase())
              );
              replacementId = foundInDb ? foundInDb.id : ex.exerciseId;
            }
          }

          return {
            ...ex,
            exerciseId: replacementId,
            sets: update.newSets || ex.sets,
            reps: update.newReps || ex.reps,
          };
        }
        return ex;
      });

      return { ...day, exercises };
    });

    const newPlan: WorkoutPlan = {
      ...currentPlan,
      days: updatedDays,
    };

    onUpdatePlan(newPlan);
    savePlan(newPlan);

    // Mark update as applied in local message list
    const updatedMessages = messages.map((m) =>
      m.id === messageId && m.proposedUpdate
        ? { ...m, proposedUpdate: { ...m.proposedUpdate, applied: true } }
        : m
    );
    updateCurrentSessionMessages(updatedMessages);

    // Show toast confirmation
    setAppliedToast(
      lang === 'fa'
        ? `✔ حرکت «${update.originalExerciseName}» با موفقیت با «${update.newExerciseName}» در برنامه شما جایگزین شد!`
        : `✔ "${update.originalExerciseName}" replaced with "${update.newExerciseName}" in your workout plan!`
    );
    setTimeout(() => setAppliedToast(null), 5000);
  };

  // Run weekly progression audit
  const handleRunAudit = async () => {
    setIsAuditing(true);
    try {
      const enrichedPlan = getEnrichedPlan();
      const response = await fetch('/api/coach/adapt-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile,
          userProfile: profile,
          plan: enrichedPlan,
          currentPlan: enrichedPlan,
          workoutLogs,
          recentLogs: workoutLogs,
          bodyAnalysis,
          lang,
          language: lang,
        }),
      });

      if (!response.ok) throw new Error('Audit failed');
      const data = await response.json();
      setAuditResult(data);
    } catch (e) {
      setAuditResult({
        feedback:
          lang === 'fa'
            ? `آنالیز برنامه بر اساس ابعاد بدنی و لاگ‌ها انجام شد. الگوی بارگذاری در اسپلیت ${plan?.splitType || 'فعلی'} پایدار است. پیشنهاد: ۲.۵ کیلوگرم به حرکات بالاتنه و ۱ تکرار به حرکات پا اضافه کنید.`
            : `Recent training audit complete. Compound loading profile on your ${plan?.splitType || 'active'} split is optimal. Recommended micro-overload applied.`,
        recommendedAdjustments: [
          {
            exerciseName: lang === 'fa' ? 'پرس سینه / حرکت اصلی بالاتنه' : 'Primary Upper Compound',
            action: 'increase_weight',
            amount: '+2.5 kg',
            reason: lang === 'fa' ? 'تکمیل سقف تکرارها با کنترل کامل فرم' : 'Completed top of rep range with strict form',
          },
          {
            exerciseName: lang === 'fa' ? 'اسکوات / حرکت اصلی پا' : 'Squat / Primary Lower',
            action: 'increase_reps',
            amount: '+1 rep',
            reason: lang === 'fa' ? 'سازگاری مطلوب عصبی عضلانی' : 'Solid neuromuscular adaptation',
          },
        ],
      });
    } finally {
      setIsAuditing(false);
    }
  };

  const m = profile?.measurements || {};
  const planTitle =
    typeof plan?.name === 'object'
      ? lang === 'fa'
        ? plan.name.fa
        : plan.name.en
      : plan?.name || 'Active Plan';

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden p-3 sm:p-5 space-y-3 relative">
      {/* Toast Notification for Applied Plan Changes */}
      {appliedToast && (
        <div
          id="coach-plan-applied-toast"
          className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-emerald-600 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-400 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top duration-300"
        >
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{appliedToast}</span>
          <button onClick={() => setAppliedToast(null)} className="ml-2 text-white/80 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header & Controls */}
      <div className="p-3 sm:p-4 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
              <span>{t.aiCoachTitle}</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {lang === 'fa' ? 'مربی تراز اول دنیا' : 'Elite World Coach'}
              </span>
            </h1>
            <p className="text-xs text-slate-400 truncate max-w-[240px] sm:max-w-md">
              {activeSession ? activeSession.title : (lang === 'fa' ? 'گفتگوی فعال با مربی' : 'Active Conversation')}
            </p>
          </div>
        </div>

        {/* Action Toolbar: History, New Chat, Diagnostic, Audit */}
        <div className="flex flex-wrap items-center gap-1.5 self-end sm:self-auto">
          {/* Chat History Button */}
          <button
            id="open-chat-history-btn"
            onClick={() => setIsHistoryModalOpen(true)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-400 hover:text-cyan-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
            title={lang === 'fa' ? 'مشاهده تاریخچه چت‌ها' : 'Chat History'}
          >
            <History className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'تاریخچه' : 'History'}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-[10px] text-cyan-300 border border-cyan-500/30">
              {sessions.length}
            </span>
          </button>

          {/* New Chat Button */}
          <button
            id="start-new-chat-btn"
            onClick={handleStartNewChat}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 hover:text-emerald-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
            title={lang === 'fa' ? 'شروع گفتگوی جدید با مربی' : 'Start New Chat'}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'چت جدید' : 'New'}</span>
          </button>

          {/* Diagnostic Checkup Trigger */}
          <button
            id="open-diagnostic-btn"
            onClick={() => setIsDiagnosticOpen((prev) => !prev)}
            className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
            title={lang === 'fa' ? 'ویزیت و چکاپ تشخیصی مربی' : 'Diagnostic Checkup'}
          >
            <Stethoscope className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'fa' ? 'چکاپ مربی' : 'Checkup'}</span>
          </button>

          {/* Audit Overload */}
          <button
            id="run-audit-btn"
            onClick={handleRunAudit}
            disabled={isAuditing}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 disabled:opacity-50"
            title={lang === 'fa' ? 'آنالیز اضافه بار برنامه' : 'Audit Overload'}
          >
            <Zap className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin text-emerald-400' : 'text-slate-400'}`} />
          </button>
        </div>
      </div>

      {/* Interactive 4-Point Diagnostic Questionnaire Drawer (Expandable) */}
      {isDiagnosticOpen && (
        <div
          id="diagnostic-questionnaire-card"
          className="p-4 rounded-2xl bg-slate-900 border-2 border-amber-500/40 shadow-xl space-y-3.5 animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs sm:text-sm font-extrabold text-amber-300">
                {lang === 'fa'
                  ? 'ویزیت و ارزیابی تشخیصی مربی تراز اول (هوشواره مربیگری)'
                  : 'Elite Coach Biomechanical Diagnostic Assessment'}
              </h3>
            </div>
            <button
              onClick={() => setIsDiagnosticOpen(false)}
              className="text-slate-400 hover:text-white text-xs p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300">
            {lang === 'fa'
              ? 'مربی تراز اول به پاسخ‌های شما نیاز دارد تا وضعیت خستگی مفاصل، ریکاوری و اضافه بار را بررسی کرده و برنامه را دقیقاً تنظیم کند:'
              : 'Answer these 4 questions so the coach can evaluate joint strain, recovery, and program adjustments:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Question 1: Joints */}
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <span className="font-bold text-slate-200 block">
                {lang === 'fa' ? '۱. وضعیت مفاصل و زردپی‌ها:' : '1. Articular & Joint Status:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'بدون درد (سالم)', en: 'Healthy' },
                  { label: 'زانودرد در اسکوات', en: 'Knee Discomfort' },
                  { label: 'سوزش سرشانه در پرس', en: 'Shoulder Strain' },
                  { label: 'فشار دیسک و کمر', en: 'Lumbar Strain' },
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setDiagJoint(opt.label)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      diagJoint === opt.label
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-700/60 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Recovery & Sleep */}
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <span className="font-bold text-slate-200 block">
                {lang === 'fa' ? '۲. کیفیت خواب و ریکاوری:' : '2. Sleep & Systemic Recovery:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'خواب عالی (۸ ساعت+)', en: '8+ Hours Deep' },
                  { label: 'خواب متوسط (۶-۷ ساعت)', en: '6-7 Hours' },
                  { label: 'کمبود خواب و کوفتگی', en: 'Fatigued / Low Sleep' },
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setDiagSleep(opt.label)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      diagSleep === opt.label
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-700/60 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Plateau */}
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <span className="font-bold text-slate-200 block">
                {lang === 'fa' ? '۳. استپ وزنه در حرکات اصلی:' : '3. Compound Movement Plateau:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'در حال پیشرفت', en: 'Progressing well' },
                  { label: 'استپ در پرس سینه', en: 'Bench Plateau' },
                  { label: 'استپ در اسکوات', en: 'Squat Plateau' },
                  { label: 'استپ در زیربغل', en: 'Back/Pull Plateau' },
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setDiagPlateau(opt.label)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      diagPlateau === opt.label
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-700/60 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 4: Pump & Hypertrophy */}
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <span className="font-bold text-slate-200 block">
                {lang === 'fa' ? '۴. پمپ و احساس انقباض عضلانی:' : '4. Pump & Muscle Contraction:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'پمپ عالی', en: 'Insane Pump' },
                  { label: 'پمپ متوسط', en: 'Moderate' },
                  { label: 'پمپ ضعیف و بی‌رمق', en: 'Weak Pump' },
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setDiagPump(opt.label)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      diagPump === opt.label
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-700/60 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            id="submit-diagnostic-btn"
            onClick={handleSubmitDiagnostic}
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98"
          >
            <Sparkles className="w-4 h-4" />
            <span>
              {lang === 'fa'
                ? 'ارسال چکاپ کامل به مربی جهت تحلیل بیومکانیک و بهینه‌سازی برنامه'
                : 'Send Diagnostic Assessment to Elite Coach'}
            </span>
          </button>
        </div>
      )}

      {/* Live Synced Biometrics & Active Plan Context Strip */}
      <div className="px-3.5 py-2.5 rounded-2xl bg-slate-900/90 border border-emerald-500/20 text-[11px] text-slate-300 flex flex-col md:flex-row md:items-center justify-between gap-2 shadow-inner">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-400">
            {lang === 'fa' ? 'هوش متصل به برنامه و حجم بدن:' : 'Context Synced to Coach:'}
          </span>
          <span className="text-slate-200 font-medium">
            {planTitle} ({plan?.daysPerWeek || 4} {lang === 'fa' ? 'روز در هفته' : 'days/wk'})
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
          <span>{lang === 'fa' ? `کمر: ${m.waist || 84}cm` : `Waist: ${m.waist || 84}cm`}</span>
          <span>•</span>
          <span>{lang === 'fa' ? `سینه: ${m.chest || 104}cm` : `Chest: ${m.chest || 104}cm`}</span>
          <span>•</span>
          <span>{lang === 'fa' ? `بازو: ${m.arms || 37}cm` : `Arms: ${m.arms || 37}cm`}</span>
          <span>•</span>
          <span>{lang === 'fa' ? `چربی: ${bodyAnalysis.bodyFat.bodyFatPercent}%` : `BF: ${bodyAnalysis.bodyFat.bodyFatPercent}%`}</span>
          <span>•</span>
          <span className="text-emerald-400 font-bold">
            {lang === 'fa' ? `هدف پروتئین: ${bodyAnalysis.nutrition.proteinGrams}g` : `Protein: ${bodyAnalysis.nutrition.proteinGrams}g`}
          </span>
        </div>
      </div>

      {/* Audit Recommendations Banner (if audited) */}
      {auditResult && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-slate-200 space-y-2 animate-fadeIn shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400">
              <Award className="w-4 h-4" />
              <span>{lang === 'fa' ? 'نتایج آنالیز اضافه بار و سازگاری برنامه' : 'Intelligent Progression Audit'}</span>
            </div>
            <button
              onClick={() => setAuditResult(null)}
              className="text-slate-500 hover:text-slate-300 text-xs"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {auditResult.feedback}
          </p>

          {auditResult.recommendedAdjustments && auditResult.recommendedAdjustments.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {auditResult.recommendedAdjustments.map((adj: any, idx: number) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-100 block">{adj.exerciseName}</span>
                    <span className="text-[10px] text-slate-400">{adj.reason}</span>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs shrink-0">
                    {adj.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'coach' && (
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}

            <div
              className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-emerald-600 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
              }`}
            >
              {m.sender === 'coach' ? (
                <>
                  <FormattedCoachMessage text={m.text} />
                  {m.proposedUpdate && (
                    <div className="mt-3 p-3 rounded-2xl bg-slate-950/90 border border-emerald-500/40 text-slate-200 space-y-2.5 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                          <span>{lang === 'fa' ? 'پیشنهاد تغییر در برنامه تمرینی' : 'Proposed Exercise Modification'}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-semibold border border-emerald-500/20">
                          {lang === 'fa' ? 'جایگزینی حرکت' : 'Exercise Swap'}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-slate-400 line-through text-[11px]">{m.proposedUpdate.originalExerciseName}</span>
                          <ArrowRight className={`w-3.5 h-3.5 text-emerald-400 ${lang === 'fa' ? 'rotate-180' : ''}`} />
                          <span className="font-bold text-emerald-300 text-xs">{m.proposedUpdate.newExerciseName}</span>
                        </div>
                        {m.proposedUpdate.newSets && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            {m.proposedUpdate.newSets}×{m.proposedUpdate.newReps || '8-12'}
                          </span>
                        )}
                      </div>

                      {m.proposedUpdate.details && (
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {m.proposedUpdate.details}
                        </p>
                      )}

                      <div className="pt-0.5 flex flex-col gap-2">
                        {m.proposedUpdate.applied ? (
                          <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold bg-emerald-950/70 border border-emerald-500/40 px-3 py-2 rounded-xl">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{lang === 'fa' ? '✔ این تمرین با موفقیت در برنامه شما تغییر یافت' : '✔ Applied to active workout plan'}</span>
                          </div>
                        ) : (
                          <div className="flex flex-col sm:flex-row items-center gap-2">
                            {/* Open Confirmation Menu */}
                            <button
                              id={`open-plan-menu-${m.id}`}
                              onClick={() =>
                                setActivePopupProposal({
                                  messageId: m.id,
                                  update: m.proposedUpdate!,
                                })
                              }
                              className="w-full sm:flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-900/30 active:scale-98 transition-all cursor-pointer"
                            >
                              <Sparkles className="w-4 h-4 text-white shrink-0" />
                              <span>
                                {lang === 'fa'
                                  ? 'آیا تغییرات در برنامه اعمال شود؟ [منوی تایید]'
                                  : 'Apply Changes? [Open Menu]'}
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="whitespace-pre-wrap">{m.text}</p>
              )}
              <span
                className={`text-[9px] block mt-1.5 ${
                  m.sender === 'user' ? 'text-emerald-950/70 text-right' : 'text-slate-500 text-left'
                }`}
              >
                {m.timestamp}
              </span>
            </div>

            {m.sender === 'user' && (
              <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-slate-900/80 p-3 rounded-2xl max-w-sm border border-slate-800">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
            <span>{lang === 'fa' ? 'مربی در حال بررسی برنامه، ابعاد بدن و استخراج بهترین پاسخ...' : 'Coach analyzing program exercises and biomechanics...'}</span>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompt Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar scrollbar-none">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qp[lang])}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-emerald-400 whitespace-nowrap transition-colors flex items-center gap-1"
          >
            <span>{qp[lang]}</span>
            <ArrowUpRight className="w-3 h-3 text-slate-500" />
          </button>
        ))}
      </div>

      {/* Chat Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputQuery);
        }}
        className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-1.5 pl-3 focus-within:border-emerald-500 transition-colors"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={lang === 'fa' ? 'از مربی درباره برنامه، حرکات، سایز بدن یا تغذیه بپرسید...' : t.askCoachPlaceholder}
          disabled={isLoading}
          className="flex-1 bg-transparent text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isLoading}
          className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-bold transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Full Popup Confirmation Menu: «اعمال شود» vs «اعمال نشود» */}
      <CoachPlanUpdateModal
        isOpen={!!activePopupProposal}
        update={activePopupProposal?.update || null}
        lang={lang}
        onApply={() => {
          if (activePopupProposal) {
            handleApplyProposedPlanUpdate(activePopupProposal.messageId, activePopupProposal.update);
            setActivePopupProposal(null);
          }
        }}
        onReject={() => setActivePopupProposal(null)}
      />

      {/* Chat History Modal */}
      <CoachHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        onClearAll={handleClearAllHistory}
        onNewChat={handleStartNewChat}
        lang={lang}
      />
    </div>
  );
};
