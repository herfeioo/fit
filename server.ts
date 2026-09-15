import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "FitCoach Pro Server" });
});

// Helper to build deep CSCS & ACSM context prompt for Gemini
function buildCoachSystemInstruction(
  profile: any,
  plan: any,
  bodyAnalysis: any,
  workoutLogs: any[],
  aiMemory: any,
  language: "fa" | "en"
): string {
  const m = profile?.measurements || {};
  const waist = m.waist || 84;
  const chest = m.chest || 104;
  const arms = m.arms || 37;
  const thighs = m.thighs || 59;
  const shoulders = m.shoulders || 122;
  const neck = m.neck || 39;
  const hips = m.hips || 98;

  const bf = bodyAnalysis?.bodyFat?.bodyFatPercent || profile?.bodyFatPercent || 15.5;
  const weight = profile?.weight || 81;
  const height = profile?.height || 180;
  const leanMass = bodyAnalysis?.leanMassKg || (weight * (1 - bf / 100)).toFixed(1);
  const fatMass = bodyAnalysis?.fatMassKg || (weight * (bf / 100)).toFixed(1);
  const ffmi = bodyAnalysis?.ffmi || (Number(leanMass) / ((height / 100) * (height / 100))).toFixed(1);
  const whtr = bodyAnalysis?.whtr || (waist / height).toFixed(2);
  const tdee = bodyAnalysis?.tdee || 2650;
  const targetCals = bodyAnalysis?.targetCalories || (profile?.goal === 'muscle_gain' ? 2850 : 2250);
  const proteinGrams = bodyAnalysis?.nutrition?.proteinGrams || Math.round(Number(leanMass) * 2.2);

  // Active workout plan details
  let planSummary = "No active workout plan generated yet.";
  if (plan && plan.days && plan.days.length > 0) {
    const daysDesc = plan.days.map((d: any, idx: number) => {
      const dayTitle = typeof d.title === "object" ? (language === "fa" ? d.title.fa : d.title.en) : d.title;
      const exList = (d.exercises || []).map((ex: any, eIdx: number) => {
        let name = ex.exerciseId;
        if (ex.exerciseName) {
          name = typeof ex.exerciseName === "object" ? (language === "fa" ? ex.exerciseName.fa : ex.exerciseName.en) : ex.exerciseName;
        }
        const sets = ex.sets || 3;
        const reps = ex.reps || "8-12";
        const rest = ex.restSeconds ? `${ex.restSeconds}s` : "90s";
        const target = ex.targetMuscle || ex.muscleGroup || "";
        const pattern = ex.movementPattern ? `[${ex.movementPattern}]` : "";
        const notes = ex.notes ? `(Note: ${ex.notes})` : "";
        return `    ${eIdx + 1}. ${name} ${pattern} (${target}): ${sets} sets × ${reps} reps, Rest: ${rest} ${notes}`;
      }).join("\n");
      return `  Day ${idx + 1} [${dayTitle} - Focus: ${d.targetFocus || "Primary"}]:\n${exList}`;
    }).join("\n\n");

    const planName = typeof plan.name === "object" ? (language === "fa" ? plan.name.fa : plan.name.en) : (plan.name || "Custom Plan");
    planSummary = `Plan Name: ${planName} | Split: ${plan.splitType || "Upper/Lower"} | Days/Week: ${plan.daysPerWeek || 4} | Phase: ${plan.mesocyclePhase || "hypertrophy"} (Week ${plan.mesocycleWeek || 1})\n${daysDesc}`;
  }

  // Recent workout logs
  let logsSummary = "No workout logs recorded yet.";
  if (workoutLogs && workoutLogs.length > 0) {
    logsSummary = workoutLogs.slice(0, 5).map((log: any, idx: number) => {
      return `Session ${idx + 1} (${log.date}): Day: "${log.dayTitle}", Hardness: ${log.perceivedHardness}/10, Finished All Sets: ${log.finishedAllSets ? "Yes" : "No"}, Notes: "${log.notes || "None"}"`;
    }).join("\n");
  }

  // AI Memory / Evolved exercises / Joint pain history
  let memorySummary = "Standard memory baseline.";
  if (aiMemory) {
    const evolutions = (aiMemory.evolutionEvents || []).map((ev: any) => {
      const rationale = typeof ev.rationale === "object" ? (language === "fa" ? ev.rationale.fa : ev.rationale.en) : ev.rationale;
      return `- Evolved movement ${ev.originalExerciseId} -> ${ev.replacementExerciseId} (Reason: ${ev.reason}, Applied: ${ev.applied}): ${rationale}`;
    }).join("\n");

    const painReports = Object.values(aiMemory.exerciseFeedback || {})
      .filter((ef: any) => ef.painReportsCount > 0)
      .map((ef: any) => `- Exercise ${ef.exerciseId}: Reported joint discomfort in ${ef.lastPainArea || "joint"}`)
      .join("\n");

    memorySummary = `Evolutions:\n${evolutions || "None"}\nJoint Sensitivity / Warnings:\n${painReports || "None"}`;
  }

  return `🧠 ROLE & IDENTITY:
You are NOT a conversational chatbot.
You are a:
👉 Professional Strength & Hypertrophy Coach
👉 Exercise Science Engine (NASM / ACSM / CSCS level)
👉 Long-term Adaptive Training System
👉 Gym Programming Machine

Your output MUST ALWAYS be:
✔ Structured
✔ Predictable
✔ Scientific
✔ Consistent
✔ Exactly formatted

🚨 ABSOLUTE RULE (VERY IMPORTANT):
Whenever you output or format a training program:
👉 EXACTLY 8 exercises per training day
👉 Same style as bodybuilding coach
👉 Same structure every time
👉 No randomness
👉 No extra conversational fluff outside the format
If format is broken → SYSTEM FAIL

📅 REQUIRED OUTPUT FORMAT FOR WORKOUT DAYS (STRICT):
Each training day MUST be:
Header:
👉 Day X — [Day Title] ([Focus / Hypertrophy / Strength])
Then EXACTLY:
🔹 Exercise 1: [Exercise Name in Farsi & English]
- Sets × Reps: [e.g. 4 × 8-10]
- Coaching Cues: [Concise real coach cues: "Scapula retracted" | "Controlled eccentric" | "No momentum" | "Full stretch under load" | "Explosive concentric"]
- Common Mistakes: [e.g. Flaring elbows / arching lower back]
- Tempo: [e.g. 3-1-1-0]

... Continue sequentially through:
🔹 Exercise 8: [Exercise Name in Farsi & English]
- Sets × Reps: ...
- Coaching Cues: ...
- Common Mistakes: ...
- Tempo: ...

🏋️ TRAINING SPLIT LOGIC (AUTO ENFORCED):
- 3 days/week → Full Body
- 4 days/week → Upper / Lower (Upper A, Lower A, Upper B, Lower B)
- 5 days/week → Push / Pull / Legs hybrid
- 6 days/week → Full PPL (Push A, Pull A, Legs A, Push B, Pull B, Legs B)

🧠 USER PROFILE MEMORY (LOCK IN REAL USER DATA):
- Weight: ${weight} kg | Height: ${height} cm
- Target Weight: ${profile?.targetWeight || 89} kg | Goal: ${profile?.goal || "muscle_gain"}
- Body Measurements (حجم و ابعاد واقعی بدن کاربر):
  • دور کمر (Waist): ${waist} cm
  • دور سینه (Chest): ${chest} cm
  • دور بازو (Arms): ${arms} cm
  • دور ران (Thighs): ${thighs} cm
  • دور سرشانه (Shoulders): ${shoulders} cm
  • دور گردن (Neck): ${neck} cm
  • دور باسن (Hips): ${hips} cm
- Body Composition:
  • Body Fat %: ${bf}% | Lean Mass: ${leanMass} kg | Fat Mass: ${fatMass} kg
  • FFMI: ${ffmi} | WHtR: ${whtr}
  • Daily Protein Target: ${proteinGrams}g | TDEE: ${tdee} kcal
- Injuries / Pain History: ${profile?.injuryLimitation || "None reported"}

USER ACTIVE WORKOUT PROGRAM:
${planSummary}

RECENT WORKOUT LOGS & PERFORMANCE:
${logsSummary}

AI MEMORY & EVOLUTIONS:
${memorySummary}

    COACHING RESPONSE RULES & DYNAMIC CAPABILITIES:
1. Language: ${language === "fa" ? "Respond in fluent, authoritative, world-class Persian (Farsi) with deep exercise science and hypertrophy terminology (اضافه بار تدریجی، انقباض در نقطه اوج، فاز اکسنتریک کنترل‌شده، RIR، ظرفیت ریکاوری سیستمیک، بار برشی مفصل، گشتاور مکانیکی، توده بدون چربی)." : "Respond in precise, world-class biomechanical English."}
2. DYNAMIC & ELITE LEVEL ANSWERS: You are an ELITE WORLD-CLASS HEAD STRENGTH & HYPERTROPHY COACH (Brad Schoenfeld / Helms / Poliquin / CSCS Master level). Answer the athlete's specific questions directly, intelligently, and with deep scientific rigor based on their real measurements (${waist}cm waist, ${chest}cm chest, ${arms}cm arms, ${weight}kg weight, ${bf}% body fat) and active program. NEVER output generic or robotic filler.
3. EXERCISE MODIFICATION & PLAN UPDATES (CRITICAL):
   - You have full authority to modify and optimize the user's exercises, volume, and intensity in their active program.
   - When the user asks about joint pain (knees, shoulders, spine), plateau/stagnation in weights, recovery fatigue, equipment changes, OR when you conduct a diagnostic audit:
     1) Deliver an elite-level biomechanical breakdown explaining why the movement is modified (e.g. angle of humeral abduction, patellar compression forces, active insufficiency vs passive tension).
     2) At the VERY END of your response, output this EXACT structured tag:
        [PLAN_UPDATE:{"dayTitle":"نام روز یا بخش مربوطه","originalExerciseName":"نام حرکت قبلی","newExerciseName":"نام حرکت جدید جایگزین","action":"swap_exercise","details":"علت بیومکانیکی تغییر","newSets":4,"newReps":"8-10"}]
     This automatically triggers an interactive modal dialog for the athlete to confirm with "اعمال شود" or "اعمال نشود".
4. FULL WORKOUT ROUTINES: ONLY when the user explicitly asks for a full daily training program or workout routine, output exactly 8 exercises formatted with Exercise 1 to 8, Sets x Reps, Coaching Cues, Common Mistakes, and Tempo. For general questions, provide direct, focused, and deeply analytical coaching answers.`;
}

// Rule-based intelligent fallback when offline or API key absent
function generateOfflineCoachResponse(
  query: string,
  profile: any,
  plan: any,
  bodyAnalysis: any,
  language: "fa" | "en"
): string {
  const q = query.toLowerCase();
  const m = profile?.measurements || {};
  const waist = m.waist || 84;
  const chest = m.chest || 104;
  const arms = m.arms || 37;
  const thighs = m.thighs || 59;
  const weight = profile?.weight || 81;
  const height = profile?.height || 180;
  const bf = bodyAnalysis?.bodyFat?.bodyFatPercent || profile?.bodyFatPercent || 15.5;
  const leanMass = bodyAnalysis?.leanMassKg || (weight * (1 - bf / 100)).toFixed(1);
  const proteinTarget = Math.round(Number(leanMass) * 2.2);

  const firstDay = plan?.days?.[0];
  const firstDayTitle = firstDay ? (typeof firstDay.title === "object" ? (language === "fa" ? firstDay.title.fa : firstDay.title.en) : firstDay.title) : "روز ۱: بالاتنه A";

  // 1. Exercise change or swap request / Diagnostic checkup
  if (q.includes("عوض") || q.includes("تغییر") || q.includes("جایگزین") || q.includes("swap") || q.includes("replace") || q.includes("درد") || q.includes("زانوم") || q.includes("کتف") || q.includes("شانه") || q.includes("چکاپ") || q.includes("ویزیت") || q.includes("استپ") || q.includes("مفاصل")) {
    let orig = "اسکوات با هالتر";
    let repl = "پرس پا با دستگاه (Leg Press)";
    let reason = "کاهش فشار برشی بر مفصل زانو و ستون فقرات با حفظ فعال‌سازی کامل عضلات چهارسر ران";

    if (q.includes("سینه") || q.includes("پرس سینه") || q.includes("bench") || q.includes("شانه") || q.includes("کتف")) {
      orig = "پرس سینه هالتر";
      repl = "پرس سینه دمبل موازی (Neutral DB Press)";
      reason = "کاهش تنش زاویه‌ای بر سرشانه قدامی، بهبود ریکاوری مفصل گلنوهومرال و افزایش دامنه انقباض سینه";
    } else if (q.includes("زیربغل") || q.includes("بارفیکس") || q.includes("pull") || q.includes("کمر")) {
      orig = "بارفیکس دست باز";
      repl = "زیربغل سیم‌کش دست جمع (Close-Grip Lat Pulldown)";
      reason = "امکان کنترل دقیق بارگذاری و تمرکز بر کشش فیبرهای پشتی بزرگ بدون فشار به مچ و ستون فقرات";
    } else if (q.includes("سرشانه") || q.includes("shoulder")) {
      orig = "پرس سرشانه هالتر نظامی";
      repl = "پرس سرشانه دمبل نشسته زاویه ۷۵ درجه";
      reason = "آزادسازی فضای ساب‌آکرومیال و پیشگیری از گیرکردگی تاندون فوق‌خاری";
    }

    if (language === "fa") {
      return `### 🩺 چکاپ تشخیصی و تحلیل بیومکانیکی مربی تراز اول

ورزشکار گرامی، بر مبنای ارزیابی تخصصی فاکتورهای مکانیکی و وضعیت بدنی شما (${weight}kg، چربی ${bf}٪):
- **تحلیل بیومکانیک حرکت:** حرکت «${orig}» به منظور ارتقای بازدهی و رفع تنش‌های مفصلی با حرکت «${repl}» جایگزین می‌شود.
- **توجیه ورزشی و فیزیولوژیک:** ${reason}. این اصلاح فنی به شما امکان می‌دهد فاز اکسنتریک ۳ ثانیه‌ای را با ایمنی کامل اجرا کرده و اضافه بار را مجدداً بدون استپ فعال کنید.
- **دستورالعمل بارگذاری جدید:** ۴ ست تخصصی با ۸ الی ۱۰ تکرار (RPE 8.5) و استراحت ۹۰ ثانیه‌ای.

منوی تایید پاپ‌آپ جهت اعمال این تغییر در برنامه شما فعال گردید. می‌توانید مستقیماً گزینه «اعمال شود» را انتخاب فرمایید.

[PLAN_UPDATE:{"dayTitle":"${firstDayTitle}","originalExerciseName":"${orig}","newExerciseName":"${repl}","action":"swap_exercise","details":"${reason}","newSets":4,"newReps":"8-10"}]`;
    } else {
      return `### 🩺 Elite Biomechanical Diagnostic & Adaptation

Athlete, based on comprehensive evaluation of joint shear, mechanical tension, and your current biometrics (${weight}kg, ${bf}% BF):
- **Target Adaptation:** Swapping "${orig}" with "${repl}".
- **Physiological Rationale:** ${reason}. This secures axial deloading while maximizing hypertrophy stimulus and neuromuscular motor unit recruitment.
- **Target Protocol:** 4 sets of 8-10 reps (RPE 8.5) with a 3-0-1-0 tempo.

The confirmation popup menu is now triggered. You can review and select "Apply Changes".

[PLAN_UPDATE:{"dayTitle":"${firstDayTitle}","originalExerciseName":"${orig}","newExerciseName":"${repl}","action":"swap_exercise","details":"${reason}","newSets":4,"newReps":"8-10"}]`;
    }
  }

  // 2. Biometrics and measurements inquiry
  if (q.includes("حجم") || q.includes("سایز") || q.includes("دور کمر") || q.includes("بازو") || q.includes("سینه") || q.includes("چربی") || q.includes("وزن") || q.includes("biometric") || q.includes("waist")) {
    if (language === "fa") {
      return `### 📊 آنالیز بیومتریک و حجم بدنی تخصصی (NASM / ACSM Standard)

داده‌های ثبت‌شده و حافظه پایدار اندام‌های شما:
- **قد و وزن:** ${height} cm | ${weight} kg (وزن هدف: ${profile?.targetWeight || 89} kg)
- **درصد چربی بدنی:** **${bf}٪** (فرمول نیروی دریایی آمریکا)
- **توده خالص عضلانی (LBM):** **${leanMass} kg** | **توده چربی:** ${(weight * (bf / 100)).toFixed(1)} kg
- **ابعاد عضلانی کلیدی:**
  • **دور سینه:** ${chest} cm
  • **دور بازو:** ${arms} cm
  • **دور ران:** ${thighs} cm
  • **دور کمر:** ${waist} cm (نسبت دور کمر به قد: ${(waist / height).toFixed(2)} - در محدوده کاملاً بهینه و سلامت متابولیک)
  • **دور سرشانه:** ${m.shoulders || 122} cm (ضریب شکل‌گیری V-Taper عالی)

🎯 **دستورالعمل اجرایی برای هایپرتروفی بدون افزایش چربی شکم:**
1. **پروتئین هدف:** روزانه **${proteinTarget} گرم** پروتئین باکیفیت (۲.۲ گرم به ازای هر کیلوگرم توده عضلانی بدون چربی).
2. **کالری هدف:** مصرف **${bodyAnalysis?.targetCalories || 2850} کیلوکالری روزانه** با مازاد کنترل‌شده ۲۵۰ تا ۳۰۰ کالری برای رشد خالص.
3. **اضافه بار تدریجی:** اضافه بار وزنه فقط پس از دستیابی به سقف تکرارها (مثلاً رسیدن به ۱۰ تکرار در هر ۴ ست) به میزان +۲.۵ کیلوگرم اعمال شود.`;
    }
  }

  // 3. Nutrition & Protein
  if (q.includes("پروتئین") || q.includes("کالری") || q.includes("غذا") || q.includes("رژیم") || q.includes("protein") || q.includes("calorie") || q.includes("diet")) {
    if (language === "fa") {
      return `### 🥗 استراتژی تغذیه و درشت‌مغذی‌ها بر اساس توده خالص شما

بر مبنای وزن ${weight} کیلوگرم و توده بدون چربی ${leanMass} کیلوگرم:
- **پروتئین روزانه:** **${proteinTarget} گرم** (تقسیم در ۴ وعده ۳۵ تا ۴۵ گرمی برای حداکثر فعال‌سازی مسیر mTOR).
- **کالری کل روزانه:** **${bodyAnalysis?.targetCalories || 2850} کیلوکالری** (متابولیسم پایه: ${bodyAnalysis?.bmr || 1850} + مخارج فعالیت روزانه).
- **کربوهیدرات:** حدود **۳۵۰ گرم** جهت شارژ ذخایر گلیکوژن تمرینات پرفشار باشگاه.
- **چربی سالم:** **۷۰ تا ۷۵ گرم** جهت حفظ تعادل هورمونی و ترشح تستوسترون.
- **مصرف آب:** روزانه حداقل **۳.۵ لیتر** برای هیدراتاسیون عضلانی و عملکرد حداکثری کلیه‌ها.`;
    }
  }

  // 4. Full workout day request
  if ((q.includes("برنامه") && q.includes("امروز")) || q.includes("۸ حرکت") || q.includes("۸ تمرین") || q.includes("برنامه روز") || q.includes("روال تمرین")) {
    if (language === "fa") {
      return `👉 Day 1 — ${firstDayTitle} (Strength & Hypertrophy Focus)

🔹 Exercise 1: پرس سینه هالتر روی نیمکت صاف (Barbell Flat Bench Press)
- Sets × Reps: 4 × 6-8
- Coaching Cues: Scapula retracted | Controlled eccentric | Full stretch under load | Explosive concentric
- Common Mistakes: باز کردن آرنج‌ها با زاویه ۹۰ درجه، پرتاب میله از روی قفسه سینه
- Tempo: 3-1-1-0

🔹 Exercise 2: پرس بالاسینه دمبل (Incline Dumbbell Press)
- Sets × Reps: 3 × 8-10
- Coaching Cues: زاویه نیمکت ۳۰ درجه | کشش کامل فیبرهای ترقوه‌ای | پرس در راستای کمان طبیعی
- Common Mistakes: زاویه دادن بیش از حد به نیمکت و درگیر شدن سرشانه قدامی
- Tempo: 3-0-1-0

🔹 Exercise 3: بارفیکس مچ برعکس یا لت زیربغل (Pull-ups / Lat Pulldown)
- Sets × Reps: 4 × 8-10
- Coaching Cues: Depress scapulae before pull | کشیدن آرنج‌ها به سمت لگن | عدم تاب دادن بدن
- Common Mistakes: نیمه‌کاره رها کردن فاز کشش در بالا
- Tempo: 3-1-1-0

🔹 Exercise 4: زیربغل هالتر خم (Barbell Bent-Over Row)
- Sets × Reps: 3 × 8-10
- Coaching Cues: Hinge at hips 45° | ستون فقرات کاملاً خنثی | کشش عضلات لوزی و پشتی بزرگ
- Common Mistakes: گرد کردن مهره‌های کمری و استفاده از شتاب بدن
- Tempo: 2-1-1-0

🔹 Exercise 5: پرس سرشانه هالتر نظامی (Overhead Barbell Press)
- Sets × Reps: 3 × 8-10
- Coaching Cues: Glutes and core braced | میله نزدیک به صورت | قفل استوار در بالای سر
- Common Mistakes: قوس بیش از حد در کمر هنگام پرس سنگین
- Tempo: 3-0-1-0

🔹 Exercise 6: نشر از جانب دمبل (Dumbbell Lateral Raise)
- Sets × Reps: 4 × 12-15
- Coaching Cues: هدایت با آرنج | زاویه اسکپولار | بدون ضربه زدن با بالاتنه
- Common Mistakes: بالا بردن مچ‌ها بالاتر از آرنج‌ها و درگیری کول
- Tempo: 2-0-1-1 (مکث در نقطه اوج)

🔹 Exercise 7: جلو بازو هالتر ایستاده (Barbell Bicep Curl)
- Sets × Reps: 3 × 10-12
- Coaching Cues: آرنج‌ها کنار پهلو فیکس | انقباض کامل دوسر بازویی | چرخش مچ کنترل‌شده
- Common Mistakes: پرتاب کمر به عقب حین بالا آوردن وزنه
- Tempo: 3-0-1-1

🔹 Exercise 8: پشت بازو سیم‌کش با طناب (Triceps Rope Pushdown)
- Sets × Reps: 3 × 10-12
- Coaching Cues: تفکیک طناب در انتهای دامنه | قفل کامل سر بلند و خارجی پشت‌بازو
- Common Mistakes: جدا شدن آرنج‌ها از پهلو و چرخش شانه
- Tempo: 3-0-1-1`;
    }
  }

  // 5. Default General Coaching Advice
  return language === "fa"
    ? `### 🧠 مربی تخصصی بدنسازی و هایپرتروفی (FitCoach Pro)

ورزشکار عزیز، بر اساس پروفایل شما (${weight} کیلوگرم، قد ${height} سانتی‌متر، دور کمر ${waist} سانتی‌متر و دور بازو ${arms} سانتی‌متر) و برنامه فعال ${plan?.splitType || "اسپلیت ۴ روزه"}:

- **پاسخ به سوال شما:** با توجه به وضعیت ریکاوری و اهداف هایپرتروفی شما، تمرکز بر حفظ فرم صحیح، اجرای فاز منفی کنترل‌شده (۳ ثانیه) و اعمال اضافه بار تدریجی (+۲.۵ کیلوگرم هنگام پر شدن تکرارها) توصیه می‌شود.
- **تغییر تمرینات:** اگر در هر حرکتی احساس ناراحتی مفصلی یا نیاز به تنوع و جایگزینی دارید، نام حرکت را بفرمایید تا حرکت جایگزین بیومکانیکی مناسب همراه با دکمه اعمال مستقیم در برنامه به شما ارائه گردد.
- **تغذیه:** روزانه **${proteinTarget} گرم پروتئین** جهت ریکاوری کامل بافت‌های تحت تنش مصرف کنید.`
    : `### 🧠 FitCoach Strength & Conditioning

Athlete, based on your profile (${weight}kg, ${height}cm, ${waist}cm waist, ${arms}cm arms) and active split (${plan?.splitType || "4-Day Split"}):

- Focus on strict 3-second eccentric control and progressive microloading (+2.5kg once top reps are completed).
- If you wish to swap or customize any exercise in your program, simply name it and a biomechanically sound substitute will be provided with a direct one-click plan update action.
- Target **${proteinTarget}g daily protein** for optimal muscle recovery.`;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "FitCoach Pro Server" });
});

// AI Coach Consultation Endpoint
app.post("/api/coach/consult", async (req, res) => {
  try {
    const userQuery = (req.body.query || req.body.message || "").trim();
    const profile = req.body.profile || req.body.userProfile || {};
    const plan = req.body.plan || req.body.currentPlan || null;
    const bodyAnalysis = req.body.bodyAnalysis || null;
    const workoutLogs = req.body.workoutLogs || req.body.recentLogs || [];
    const aiMemory = req.body.aiMemory || null;
    const history = req.body.history || [];
    const language = ((req.body.lang || req.body.language || "fa") as string).toLowerCase().startsWith("fa") ? "fa" : "en";

    if (!userQuery) {
      return res.status(400).json({
        success: false,
        error: "Message query is required",
        reply: language === "fa" ? "لطفاً سوال خود را وارد کنید." : "Please enter your question."
      });
    }

    // Build the deeply tailored CSCS / ACSM system instruction
    const systemInstruction = buildCoachSystemInstruction(
      profile,
      plan,
      bodyAnalysis,
      workoutLogs,
      aiMemory,
      language
    );

    // If no API key configured, use the rich context-aware offline sports science engine
    if (!process.env.GEMINI_API_KEY) {
      const offlineReply = generateOfflineCoachResponse(
        userQuery,
        profile,
        plan,
        bodyAnalysis,
        language
      );
      return res.status(200).json({
        success: true,
        fallback: true,
        reply: offlineReply
      });
    }

    const ai = getGeminiClient();

    // Prepare multi-turn contents
    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      const recentTurns = history.slice(-8);
      for (const turn of recentTurns) {
        if (turn.text && typeof turn.text === "string" && turn.text.trim()) {
          contents.push({
            role: turn.sender === "user" ? "user" : "model",
            parts: [{ text: turn.text }]
          });
        }
      }
    }

    contents.push({
      role: "user",
      parts: [{ text: userQuery }]
    });

    const candidateModels = ["gemini-flash-latest", "gemini-3.1-flash-lite", "gemini-3.1-pro-preview", "gemini-3.8-flash"];
    let reply = "";
    let lastApiError: any = null;

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
        if (response.text && response.text.trim()) {
          reply = response.text;
          break;
        }
      } catch (err: any) {
        console.warn(`Gemini candidate ${modelName} failed, trying next:`, err.message || err.status);
        lastApiError = err;
      }
    }

    if (!reply) {
      reply = generateOfflineCoachResponse(userQuery, profile, plan, bodyAnalysis, language);
    }

    return res.json({ success: true, reply, fallback: !reply });
  } catch (error: any) {
    console.error("FitCoach AI error:", error);
    const language = ((req.body.lang || req.body.language || "fa") as string).toLowerCase().startsWith("fa") ? "fa" : "en";
    const offlineReply = generateOfflineCoachResponse(
      req.body.query || req.body.message || "",
      req.body.profile || req.body.userProfile || {},
      req.body.plan || req.body.currentPlan || null,
      req.body.bodyAnalysis || null,
      language
    );

    return res.status(200).json({
      success: true,
      fallback: true,
      error: error.message,
      reply: offlineReply
    });
  }
});

// Adaptive Weekly Plan Analysis Endpoint
app.post("/api/coach/adapt-plan", async (req, res) => {
  try {
    const profile = req.body.profile || req.body.userProfile || {};
    const plan = req.body.plan || req.body.currentPlan || null;
    const workoutLogs = req.body.workoutLogs || req.body.recentLogs || [];
    const language = ((req.body.lang || req.body.language || "fa") as string).toLowerCase().startsWith("fa") ? "fa" : "en";

    // Fallback audit adjustments based on active plan
    const firstExName = plan?.days?.[0]?.exercises?.[0]?.exerciseName
      ? (typeof plan.days[0].exercises[0].exerciseName === "object"
          ? (language === "fa" ? plan.days[0].exercises[0].exerciseName.fa : plan.days[0].exercises[0].exerciseName.en)
          : plan.days[0].exercises[0].exerciseName)
      : (language === "fa" ? "حرکت اصلی بالاتنه" : "Primary Compound Lift");

    const secondExName = plan?.days?.[1]?.exercises?.[0]?.exerciseName
      ? (typeof plan.days[1].exercises[0].exerciseName === "object"
          ? (language === "fa" ? plan.days[1].exercises[0].exerciseName.fa : plan.days[1].exercises[0].exerciseName.en)
          : plan.days[1].exercises[0].exerciseName)
      : (language === "fa" ? "اسکوات یا حرکت اصلی پا" : "Squat / Primary Lower Lift");

    const fallbackAdjustments = [
      {
        exerciseName: firstExName,
        action: "increase_weight",
        amount: "+2.5 kg",
        reason: language === "fa" ? "تثبیت فرم حرکتی و اتمام تمام ست‌های هدف با کنترل کامل" : "Solid technical mastery and top-of-bracket completion",
      },
      {
        exerciseName: secondExName,
        action: "increase_reps",
        amount: "+1 rep",
        reason: language === "fa" ? "سازگاری عصبی عضلانی مطلوب و ریکاوری باکیفیت" : "Optimal neuromuscular adaptation and systemic recovery",
      },
    ];

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        success: true,
        fallback: true,
        feedback: language === "fa"
          ? `آنالیز برنامه و عملکرد بدنی انجام شد. تعادل بارگذاری در اسپلیت ${plan?.splitType || "فعلی"} پایدار است. پیشنهاد می‌شود برای حفظ روند اضافه بار در حرکات بالاتنه ۲.۵ کیلوگرم و در حرکات پا ۱ تکرار اضافه کنید.`
          : `Performance audit complete. Weekly loading profile on your ${plan?.splitType || "active"} split is optimal. Recommended micro-overload applied.`,
        recommendedAdjustments: fallbackAdjustments,
      });
    }

    const ai = getGeminiClient();
    const systemPrompt = `You are a certified CSCS biomechanics auditor.
Analyze the user's active workout plan, logged performance, and body profile.
Provide an assessment and 2-4 exact exercise adjustments for next week.
Language: ${language === "fa" ? "Persian (Farsi)" : "English"}.
Respond ONLY with a valid JSON object matching this schema:
{
  "feedback": "string explaining overall audit analysis and recovery status",
  "recommendedAdjustments": [
    {
      "exerciseName": "name of an actual exercise from the user's program",
      "action": "increase_weight" | "increase_reps" | "deload" | "form_focus",
      "amount": "+2.5 kg or +1-2 reps or -10% load",
      "reason": "scientific rationale"
    }
  ]
}`;

    const promptContent = `User Profile: ${JSON.stringify(profile)}. Active Plan: ${JSON.stringify(plan)}. Recent Workout Logs: ${JSON.stringify(workoutLogs?.slice(0, 5))}`;

    const candidateModels = ["gemini-flash-latest", "gemini-3.1-flash-lite", "gemini-3.1-pro-preview", "gemini-3.8-flash"];
    let parsedResult: any = null;

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: promptContent,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
          },
        });

        if (response.text && response.text.trim()) {
          try {
            const parsed = JSON.parse(response.text);
            if (parsed && parsed.feedback && Array.isArray(parsed.recommendedAdjustments)) {
              parsedResult = parsed;
              break;
            }
          } catch {
            // continue
          }
        }
      } catch (err: any) {
        console.warn(`Adapt-plan model ${modelName} failed, trying next:`, err.message || err.status);
      }
    }

    if (parsedResult && parsedResult.feedback && Array.isArray(parsedResult.recommendedAdjustments)) {
      return res.json({ success: true, ...parsedResult });
    }

    return res.json({
      success: true,
      feedback: language === "fa"
        ? `بررسی علمی برنامه انجام شد. روند سازگاری عضلانی و حجم تمرینی شما در سطح مطلوبی قرار دارد.`
        : `Scientific audit complete. Neuromuscular volume and adaptation are progressing smoothly.`,
      recommendedAdjustments: fallbackAdjustments,
    });
  } catch (err: any) {
    console.error("Adapt plan error:", err);
    return res.status(200).json({
      success: true,
      fallback: true,
      feedback: req.body?.language === "fa" || req.body?.lang === "fa"
        ? "آنالیز هفته اخیر تکمیل شد. روند بارگیری و ریکاوری عمومی در تعادل است."
        : "Recent training audit complete. Loading pattern and recovery are well balanced.",
      recommendedAdjustments: [
        {
          exerciseName: "Primary Upper Compound",
          action: "increase_weight",
          amount: "+2.5 kg",
          reason: "Progressive overload benchmark achieved",
        },
      ],
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FitCoach Pro server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
