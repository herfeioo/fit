import { Exercise } from '../../types';

export const armExercises: Exercise[] = [
  // BICEPS
  {
    id: 'barbell_bicep_curl',
    name: {
      en: 'Standing Barbell Bicep Curl',
      fa: 'جلوبازو با هالتر ایستاده'
    },
    muscleGroup: 'Biceps',
    targetMuscle: 'biceps',
    type: 'isolation',
    equipment: 'barbell',
    difficulty: 'intermediate',
    movementPattern: 'pull',
    primaryMuscles: ['Biceps Brachii (Short & Long Heads)'],
    secondaryMuscles: ['forearms'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Stand tall with feet shoulder-width apart, grip straight bar with shoulder-width underhand grip.',
        'Pin elbows tightly to sides of ribcage, chest proud.',
        'Curl bar upward strictly using biceps, flexing wrists slightly at peak contraction.',
        'Lower bar under 3-second eccentric control to full arm extension.'
      ],
      fa: [
        'صاف بایستید و هالتر صاف را با گیرش از زیر به عرض شانه بگیرید.',
        'آرنج‌ها را محکم به پهلوها بچسبانید و سینه را جلو نگه دارید.',
        'هالتر را فقط با نیروی عضلات جلوبازو به بالا هدایت کرده و در اوج انقباض کامل ایجاد کنید.',
        'در ۳ ثانیه کنترل‌شده به پایین برگردید تا دست‌ها کاملاً صاف و کشیده شوند.'
      ]
    },
    commonMistakes: {
      en: ['Swinging torso or thrusting hips forward to move weight.', 'Letting elbows flare or travel forward too early.'],
      fa: ['تکان دادن بالاتنه و پرتاب باسن به جلو.', 'جلو آمدن بیش از حد آرنج‌ها که فشار را به سرشانه منتقل می‌کند.']
    },
    progressionOptions: {
      regression: 'dumbbell_curl',
      progression: 'barbell_bicep_curl',
      alternatives: ['ez_bar_curl', 'dumbbell_curl', 'cable_bicep_curl']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo',
    youtubeId: 'ykJmrZ5v0Oo',
    youtubeTitle: 'Barbell Bicep Curl Form Guide - Jeff Nippard',
    defaultSets: 3,
    defaultReps: '8-10',
    defaultRestSec: 75,
    guide: {
      steps: {
        en: ['Shoulder-width grip.', 'Elbows pinned to sides.', 'Curl without hip swing.', '3-second eccentric.'],
        fa: ['گیرش به عرض شانه.', 'آرنج‌ها چسبیده به پهلو.', 'بالا آوردن بدون تاب دادن لگن.', '۳ ثانیه پایین آوردن.']
      },
      commonMistakes: {
        en: ['Swinging hips for momentum.'],
        fa: ['پرتاب کردن بدن.']
      },
      breathing: {
        en: 'Exhale curling up, inhale lowering.',
        fa: 'بازدم هنگام بالا آوردن، دم هنگام پایین بردن.'
      },
      formCues: {
        en: ['Lock your elbows as hinges attached to your ribs.'],
        fa: ['تصور کنید آرنج‌ها مانند لولای در به پهلوهایتان متصل شده‌اند.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s down, 0s pause, 1s curl, 1s peak squeeze.',
        fa: '۳ ثانیه پایین، ۱ ثانیه بالا، ۱ ثانیه انقباض در اوج.'
      }
    },
    substitutes: ['ez_bar_curl', 'dumbbell_curl', 'cable_bicep_curl']
  },
  {
    id: 'ez_bar_curl',
    name: {
      en: 'EZ Bar Bicep Curl',
      fa: 'جلوبازو با میله هالتر EZ (خمیده)'
    },
    muscleGroup: 'Biceps',
    targetMuscle: 'biceps',
    type: 'isolation',
    equipment: 'barbell',
    difficulty: 'beginner',
    movementPattern: 'pull',
    primaryMuscles: ['Biceps Brachii', 'Brachialis'],
    secondaryMuscles: ['forearms'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Grip inner or outer curves of EZ curl bar (reduces wrist supination stress).',
        'Elbows anchored at sides, stand tall with glutes braced.',
        'Curl bar toward upper chest, squeezing biceps firmly at top.',
        'Lower with 3-second tempo to full elbow lockout.'
      ],
      fa: [
        'میله EZ را از انحنای داخلی یا خارجی بگیرید (فشار چرخشی روی مچ دست را به شدت کاهش می‌دهد).',
        'آرنج‌ها را در طرفین بدن ثابت نگه دارید.',
        'میله را به سمت بالای سینه خم کنید و جلوبازوها را منقبض نمایید.',
        'در ۳ ثانیه با کنترل کامل تا باز شدن کامل دست پایین بیاورید.'
      ]
    },
    commonMistakes: {
      en: ['Swinging body backward.'],
      fa: ['تاب خوردن بدن به عقب.']
    },
    progressionOptions: {
      regression: 'cable_bicep_curl',
      progression: 'barbell_bicep_curl',
      alternatives: ['barbell_bicep_curl', 'dumbbell_curl', 'preacher_curl']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=2Tz8i8WbC2c',
    youtubeId: '2Tz8i8WbC2c',
    youtubeTitle: 'EZ Bar Curl Form Demonstration',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 75,
    guide: {
      steps: {
        en: ['Hold ergonomic EZ curves.', 'Elbows stationary.', 'Squeeze biceps at top.'],
        fa: ['گرفتن انحنای ارگونومیک میله EZ.', 'آرنج‌ها ثابت.', 'انقباض جلوبازو در بالا.']
      },
      commonMistakes: {
        en: ['Letting elbows travel forward excessively.'],
        fa: ['جلو آمدن بیش از حد آرنج.']
      },
      breathing: {
        en: 'Exhale curling, inhale lowering.',
        fa: 'بازدم در صعود، دم در فرود.'
      },
      formCues: {
        en: ['Keep wrists neutral, do not curl wrists first.'],
        fa: ['مچ دست‌ها را صاف نگه دارید و مچ را زودتر نشکنید.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s down, 1s up, 1s squeeze.',
        fa: '۳ ثانیه پایین، ۱ ثانیه بالا، ۱ ثانیه مکث.'
      }
    },
    substitutes: ['barbell_bicep_curl', 'dumbbell_curl']
  },
  {
    id: 'dumbbell_curl',
    name: {
      en: 'Alternating Dumbbell Curl with Supination',
      fa: 'جلوبازو دمبل تک تک با چرخش مچ (سوپینیشن)'
    },
    muscleGroup: 'Biceps',
    targetMuscle: 'biceps',
    type: 'isolation',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    movementPattern: 'pull',
    primaryMuscles: ['Biceps Brachii'],
    secondaryMuscles: ['forearms'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Stand or sit with dumbbells held at sides, palms facing inward (neutral).',
        'As you curl dumbbell upward, rotate wrist outward (supinate) so palm faces ceiling at peak.',
        'Squeeze bicep intensely at top of contraction.',
        'Lower with 3-second control, rotating palm back to neutral.'
      ],
      fa: [
        'بایستید یا بنشینید، دمبل‌ها در کنار بدن با کف دست رو به ران‌ها باشد.',
        'هنگام بالا آوردن دمبل، مچ دست را به سمت بیرون بچرخانید تا کف دست در اوج رو به سقف باشد.',
        'در بالای حرکت عضله جلوبازو را به شدت منقبض کنید.',
        'در ۳ ثانیه کنترل‌شده پایین آورید و مچ را دوباره به حالت اولیه بازگردانید.'
      ]
    },
    commonMistakes: {
      en: ['Failing to supinate fully at the top.', 'Swinging the shoulder.'],
      fa: ['عدم چرخش کامل مچ دست در بالا.', 'تاب دادن شانه برای بالا بردن دمبل.']
    },
    progressionOptions: {
      regression: 'cable_bicep_curl',
      progression: 'barbell_bicep_curl',
      alternatives: ['incline_dumbbell_curl', 'dumbbell_hammer_curl']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=sAq_ocpRh_I',
    youtubeId: 'sAq_ocpRh_I',
    youtubeTitle: 'Dumbbell Bicep Curl Form Guide',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Neutral grip at bottom.', 'Supinate palm toward ceiling.', 'Full contraction.', '3s descent.'],
        fa: ['گیرش موازی در پایین.', 'چرخش کف دست به سقف.', 'انقباض کامل.', '۳ ثانیه فرود.']
      },
      commonMistakes: {
        en: ['Rotating wrist too late.'],
        fa: ['چرخاندن دیرهنگام مچ.']
      },
      breathing: {
        en: 'Exhale curling, inhale lowering.',
        fa: 'بازدم در صعود، دم در فرود.'
      },
      formCues: {
        en: ['Turn your pinky finger outward at peak.'],
        fa: ['در بالاترین نقطه انگشت کوچک را به بیرون متمایل کنید.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s down, 1s up, 1s squeeze.',
        fa: '۳ ثانیه فرود، ۱ ثانیه صعود، ۱ ثانیه انقباض.'
      }
    },
    substitutes: ['incline_dumbbell_curl', 'dumbbell_hammer_curl']
  },
  {
    id: 'dumbbell_hammer_curl',
    name: {
      en: 'Dumbbell Hammer Curl',
      fa: 'جلوبازو دمبل چکشی'
    },
    muscleGroup: 'Biceps',
    targetMuscle: 'biceps',
    type: 'isolation',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    movementPattern: 'pull',
    primaryMuscles: ['Brachialis', 'Brachioradialis'],
    secondaryMuscles: ['biceps', 'forearms'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Hold dumbbells with neutral grip (palms facing each other throughout).',
        'Keep elbows pinned securely at sides.',
        'Curl dumbbells upward to shoulder height without rotating wrists.',
        'Lower under 3-second control, feeling intense tension along outer upper arm.'
      ],
      fa: [
        'دمبل‌ها را با گیرش موازی (کف دست‌ها رو به یکدیگر) در کل دامنه نگه دارید.',
        'آرنج‌ها را چسبیده به پهلو نگه دارید.',
        'دمبل‌ها را تا سطح شانه بالا ببرید بدون چرخاندن مچ دست.',
        'در ۳ ثانیه آرام پایین بیاورید تا عضله بازویی قدامی و ساعد کاملاً تحریک شوند.'
      ]
    },
    commonMistakes: {
      en: ['Swinging weights with torso.'],
      fa: ['پرتاب کردن وزنه‌ها با بالاتنه.']
    },
    progressionOptions: {
      regression: 'cable_bicep_curl',
      progression: 'dumbbell_hammer_curl',
      alternatives: ['dumbbell_curl', 'preacher_curl']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=zC3nLlEvin4',
    youtubeId: 'zC3nLlEvin4',
    youtubeTitle: 'Hammer Curls for Arm Thickness - Jeff Nippard',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Maintain neutral palms throughout.', 'Drive thumbs toward shoulders.', 'Full extension.'],
        fa: ['کف دست‌ها موازی در کل حرکت.', 'هدایت شست‌ها به سمت شانه.', 'صاف کردن کامل دست.']
      },
      commonMistakes: {
        en: ['Elbows kicking backward.'],
        fa: ['عقب رفتن آرنج‌ها.']
      },
      breathing: {
        en: 'Exhale curling, inhale lowering.',
        fa: 'بازدم در صعود، دم در فرود.'
      },
      formCues: {
        en: ['Keep wrists locked like a hammer handle.'],
        fa: ['مچ دست‌ها را مانند دسته چکش سفت و ثابت نگه دارید.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s down, 1s up, 1s hold.',
        fa: '۳ ثانیه فرود، ۱ ثانیه صعود، ۱ ثانیه مکث.'
      }
    },
    substitutes: ['dumbbell_curl', 'preacher_curl']
  },
  {
    id: 'concentration_curl',
    name: {
      en: 'Seated Concentration Curl',
      fa: 'جلوبازو دمبل تمرکزی (خمیده نشسته)'
    },
    muscleGroup: 'Biceps',
    targetMuscle: 'biceps',
    type: 'isolation',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    movementPattern: 'pull',
    primaryMuscles: ['Biceps Brachii (Short Head & Peak)'],
    secondaryMuscles: ['forearms'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Sit on bench, brace triceps/elbow against inner thigh near knee.',
        'Hold dumbbell hanging vertically at full arm extension.',
        'Curl dumbbell upward to face while keeping upper arm strictly stationary.',
        'Squeeze bicep peak forcefully for 1 second, lower under 3-second control.'
      ],
      fa: [
        'روی لبه نیمکت بنشینید و پشت بازو/آرنج را به بخش داخلی ران تکیه دهید.',
        'دمبل را به صورت کاملاً آویزان نگه دارید.',
        'دمبل را به سمت صورت بالا بکشید در حالی که بازو کاملاً ثابت به ران تکیه دارد.',
        'در اوج قله جلوبازو ۱ ثانیه انقباض شدید ایجاد کرده و در ۳ ثانیه به آرامی فرود آیید.'
      ]
    },
    commonMistakes: {
      en: ['Swinging torso or lifting elbow off inner thigh.'],
      fa: ['بلند کردن آرنج از روی ران یا تاب دادن بالاتنه.']
    },
    progressionOptions: {
      regression: 'concentration_curl',
      progression: 'preacher_curl',
      alternatives: ['preacher_curl', 'cable_bicep_curl']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=Jvj2wV0vOYU',
    youtubeId: 'Jvj2wV0vOYU',
    youtubeTitle: 'Concentration Curl Form for Bicep Peak - Scott Herman',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Anchor elbow on inner thigh.', 'Curl up to chin.', '1s hard peak squeeze.'],
        fa: ['تکیه آرنج به داخل ران.', 'بالا آوردن به سمت چانه.', '۱ ثانیه انقباض شدید در اوج.']
      },
      commonMistakes: {
        en: ['Rocking shoulder back.'],
        fa: ['عقب کشیدن شانه.']
      },
      breathing: {
        en: 'Exhale curling, inhale lowering.',
        fa: 'بازدم در صعود، دم در فرود.'
      },
      formCues: {
        en: ['Isolate the bicep completely.'],
        fa: ['عضله جلوبازو را کاملاً تفکیک و ایزوله کنید.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s down, 1s up, 1s peak squeeze.',
        fa: '۳ ثانیه پایین، ۱ ثانیه بالا، ۱ ثانیه انقباض در اوج.'
      }
    },
    substitutes: ['preacher_curl', 'cable_bicep_curl']
  },
  {
    id: 'incline_dumbbell_curl',
    name: {
      en: 'Incline Dumbbell Curl (Long Head Stretch)',
      fa: 'جلوبازو دمبل روی نیمکت شیبدار (کشش سر بلند)'
    },
    muscleGroup: 'Biceps',
    targetMuscle: 'biceps',
    type: 'isolation',
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    movementPattern: 'pull',
    primaryMuscles: ['Biceps Brachii (Long Head)'],
    secondaryMuscles: ['forearms'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Set bench to 45-60 degree incline, sit back with head and shoulders firmly supported.',
        'Let arms hang vertically behind torso to place long head of bicep under maximum passive stretch.',
        'Curl dumbbells upward while keeping elbows behind torso alignment.',
        'Lower with 3-second control into full stretch position.'
      ],
      fa: [
        'نیمکت را روی شیب ۴۵ تا ۶۰ درجه تنظیم کنید و کاملاً به آن تکیه دهید.',
        'دست‌ها را آویزان به سمت عقب نگه دارید تا سر بلند جلوبازو در کشش حداکثری قرار گیرد.',
        'دمبل‌ها را به سمت بالا خم کنید بدون اینکه آرنج‌ها به جلو حرکت کنند.',
        'در ۳ ثانیه با تمرکز بالا تا کشش کامل اولیه پایین بیاورید.'
      ]
    },
    commonMistakes: {
      en: ['Swinging elbows forward to shoulder line.'],
      fa: ['جلو کشیدن آرنج‌ها و از بین بردن کشش سر بلند.']
    },
    progressionOptions: {
      regression: 'dumbbell_curl',
      progression: 'incline_dumbbell_curl',
      alternatives: ['preacher_curl', 'cable_bicep_curl']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=soxrZlIl35U',
    youtubeId: 'soxrZlIl35U',
    youtubeTitle: 'Incline Dumbbell Curl - Bicep Long Head Hypertrophy',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 75,
    guide: {
      steps: {
        en: ['Set 45-degree incline.', 'Arms hang behind torso.', 'Curl without moving elbows forward.'],
        fa: ['شیب ۴۵ درجه.', 'دست‌ها آویزان پشت بالاتنه.', 'بالا آوردن بدون جلو آمدن آرنج.']
      },
      commonMistakes: {
        en: ['Elbows drifting forward.'],
        fa: ['حرکت آرنج به سمت جلو.']
      },
      breathing: {
        en: 'Exhale curling, inhale on stretch.',
        fa: 'بازدم در صعود، دم در کشش عمیق.'
      },
      formCues: {
        en: ['Feel the deep stretch at the bottom of each rep.'],
        fa: ['کشش عمیق را در انتهای هر تکرار کاملاً لمس کنید.']
      },
      tempo: '3-1-1-1',
      tempoDescription: {
        en: '3s down, 1s bottom stretch pause, 1s up, 1s squeeze.',
        fa: '۳ ثانیه پایین، ۱ ثانیه مکث کششی، ۱ ثانیه بالا، ۱ ثانیه انقباض.'
      }
    },
    substitutes: ['preacher_curl', 'dumbbell_curl']
  },
  {
    id: 'cable_bicep_curl',
    name: {
      en: 'Standing Cable Bicep Curl',
      fa: 'جلوبازو با سیم‌کش ایستاده'
    },
    muscleGroup: 'Biceps',
    targetMuscle: 'biceps',
    type: 'isolation',
    equipment: 'cable',
    difficulty: 'beginner',
    movementPattern: 'pull',
    primaryMuscles: ['Biceps Brachii'],
    secondaryMuscles: ['forearms'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Attach straight or EZ bar to low cable pulley.',
        'Stand facing stack with elbows pinned to sides.',
        'Curl handle smoothly upward; cable provides continuous tension throughout full range.',
        'Lower under 3-second control to full elbow extension.'
      ],
      fa: [
        'میله صاف یا EZ را به قرقره پایین سیم‌کش متصل کنید.',
        'رو به دستگاه بایستید و آرنج‌ها را به پهلوها بچسبانید.',
        'میله را به بالا خم کنید؛ سیم‌کش کشش یکنواخت و پیوسته در تمام دامنه ایجاد می‌کند.',
        'در ۳ ثانیه آرام پایین ببرید تا دست‌ها کاملاً صاف شوند.'
      ]
    },
    commonMistakes: {
      en: ['Leaning backward.'],
      fa: ['خم شدن به عقب.']
    },
    progressionOptions: {
      regression: 'cable_bicep_curl',
      progression: 'barbell_bicep_curl',
      alternatives: ['preacher_curl', 'dumbbell_curl']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=opF4s8vKvd4',
    youtubeId: 'opF4s8vKvd4',
    youtubeTitle: 'Cable Bicep Curls: Maximizing Constant Tension',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Low cable pulley.', 'Elbows pinned.', 'Smooth constant tension.'],
        fa: ['سیم‌کش در پایین.', 'آرنج چسبیده.', 'تنش یکنواخت و پیوسته.']
      },
      commonMistakes: {
        en: ['Letting weight slam at bottom.'],
        fa: ['برخورد وزنه‌ها به هم در پایین.']
      },
      breathing: {
        en: 'Exhale curling, inhale lowering.',
        fa: 'بازدم در صعود، دم در فرود.'
      },
      formCues: {
        en: ['Constant muscle tension from bottom to top.'],
        fa: ['تنش پیوسته روی عضله از پایین تا بالای دامنه.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s down, 1s up, 1s squeeze.',
        fa: '۳ ثانیه پایین، ۱ ثانیه بالا، ۱ ثانیه انقباض.'
      }
    },
    substitutes: ['dumbbell_curl', 'preacher_curl']
  },
  {
    id: 'preacher_curl',
    name: {
      en: 'Preacher Bench Bicep Curl',
      fa: 'جلوبازو لاری با هالتر EZ یا دمبل'
    },
    muscleGroup: 'Biceps',
    targetMuscle: 'biceps',
    type: 'isolation',
    equipment: 'barbell',
    difficulty: 'intermediate',
    movementPattern: 'pull',
    primaryMuscles: ['Biceps Brachii (Short Head)'],
    secondaryMuscles: ['forearms'],
    injuryRiskLevel: 'medium',
    instructions: {
      en: [
        'Adjust preacher seat so chest sits snug against angled pad and armpits rest over top edge.',
        'Grip EZ bar with underhand grip, arms flat against pad.',
        'Curl weight upward stopping before forearms go vertical (to maintain tension).',
        'Lower weight under strict 3-second control, stopping just short of hyperextending elbows.'
      ],
      fa: [
        'صندلی میز لاری را تنظیم کنید تا سینه به لبه پد بچسبد و زیربغل روی لبه بالایی قرار گیرد.',
        'میله EZ را بگیرید و بازوها را صاف روی پد بگذارید.',
        'وزنه را به سمت بالا خم کنید و قبل از عمود شدن کامل ساعد متوقف شوید (جهت حفظ تنش).',
        'در ۳ ثانیه با احتیاط کامل پایین آورید بدون اینکه در انتها آرنج بیش از حد قفل شود.'
      ]
    },
    commonMistakes: {
      en: ['Hyperextending and bouncing out of bottom stretch (distal bicep tendon rupture risk).'],
      fa: ['قفل کردن محکم و ضربه زدن در انتهای کشش که خطر پارگی تاندون دیستال جلوبازو را دارد.']
    },
    progressionOptions: {
      regression: 'cable_bicep_curl',
      progression: 'barbell_bicep_curl',
      alternatives: ['incline_dumbbell_curl', 'concentration_curl']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=fIWP-FRFNU0',
    youtubeId: 'fIWP-FRFNU0',
    youtubeTitle: 'Preacher Curl Mistakes: Avoid Bicep Injury - Jeff Nippard',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 75,
    guide: {
      steps: {
        en: ['Armpits over pad.', 'Strict form.', 'Do not bounce at bottom.', 'Stop just short of hyperextension.'],
        fa: ['زیربغل روی پد.', 'حرکت کاملاً ایزوله.', 'ضربه نزدن در پایین.', 'توقف قبل از قفل کامل آرنج.']
      },
      commonMistakes: {
        en: ['Bouncing weights off bottom.'],
        fa: ['فنر کردن وزنه در پایین‌ترین نقطه.']
      },
      breathing: {
        en: 'Exhale curling up, inhale lowering down.',
        fa: 'بازدم در صعود، دم در فرود.'
      },
      formCues: {
        en: ['Control the bottom 2 inches carefully.'],
        fa: ['۵ سانتی‌متر انتهای فاز منفی را با بیشترین احتیاط کنترل کنید.']
      },
      tempo: '3-1-1-0',
      tempoDescription: {
        en: '3s down, 1s gentle bottom stretch, 1s up.',
        fa: '۳ ثانیه پایین، ۱ ثانیه کشش ملایم، ۱ ثانیه بالا.'
      }
    },
    substitutes: ['incline_dumbbell_curl', 'concentration_curl']
  },

  // TRICEPS
  {
    id: 'close_grip_bench_press',
    name: {
      en: 'Close-Grip Barbell Bench Press',
      fa: 'پرس سینه هالتر دست جمع (پشت‌بازو)'
    },
    muscleGroup: 'Triceps',
    targetMuscle: 'triceps',
    type: 'compound',
    equipment: 'barbell',
    difficulty: 'intermediate',
    movementPattern: 'push',
    primaryMuscles: ['Triceps Brachii (All Heads)'],
    secondaryMuscles: ['chest', 'shoulders'],
    injuryRiskLevel: 'medium',
    instructions: {
      en: [
        'Lie on flat bench, grip bar with hands shoulder-width apart (never excessively narrow to save wrists).',
        'Unrack bar, lower under control with elbows tucked close to ribcage (30-45 degrees).',
        'Touch lower sternum lightly, then press forcefully to arm lockout emphasizing triceps extension.'
      ],
      fa: [
        'روی نیمکت صاف دراز بکشید و هالتر را دقیقاً به عرض شانه بگیرید (بیش از حد جمع نکنید تا مچ آسیب نبیند).',
        'هالتر را جدا کرده و در حالی که آرنج‌ها چسبیده به دنده‌ها هستند به آرامی پایین بیاورید.',
        'پایین جناغ سینه را لمس کرده و با فشار قدرتمند عضلات پشت‌بازو هالتر را به بالا پرس کنید.'
      ]
    },
    commonMistakes: {
      en: ['Hands placed too close (under 6 inches) causing extreme wrist radial deviation.', 'Flaring elbows.'],
      fa: ['گرفتن هالتر با فاصله بسیار کم که باعث درد مچ دست می‌شود.', 'باز کردن آرنج‌ها به طرفین.']
    },
    progressionOptions: {
      regression: 'triceps_rope_pushdown',
      progression: 'dips_triceps_focus',
      alternatives: ['skull_crushers_lying_triceps_extension', 'dips_triceps_focus']
    },
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=nEF0bv2FW94',
    youtubeId: 'nEF0bv2FW94',
    youtubeTitle: 'Close Grip Bench Press Form - Jeff Nippard',
    defaultSets: 4,
    defaultReps: '8-10',
    defaultRestSec: 90,
    guide: {
      steps: {
        en: ['Shoulder-width grip.', 'Elbows tucked.', 'Press to full triceps lockout.'],
        fa: ['گیرش به عرض شانه.', 'آرنج‌ها چسبیده به پهلو.', 'پرس تا صاف شدن کامل پشت‌بازو.']
      },
      commonMistakes: {
        en: ['Grip too narrow.'],
        fa: ['فاصله دست‌ها بسیار کم.']
      },
      breathing: {
        en: 'Inhale lowering, exhale pressing up.',
        fa: 'دم در فرود، بازدم در صعود.'
      },
      formCues: {
        en: ['Push through the heels of your hands.'],
        fa: ['نیروی پرس را با پاشنه دست وارد کنید.']
      },
      tempo: '3-0-1-0',
      tempoDescription: {
        en: '3s down, 1s up.',
        fa: '۳ ثانیه پایین، ۱ ثانیه بالا.'
      }
    },
    substitutes: ['dips_triceps_focus', 'skull_crushers_lying_triceps_extension']
  },
  {
    id: 'triceps_rope_pushdown',
    name: {
      en: 'Triceps Rope Pushdown',
      fa: 'پشت‌بازو سیم‌کش با طناب'
    },
    muscleGroup: 'Triceps',
    targetMuscle: 'triceps',
    type: 'isolation',
    equipment: 'cable',
    difficulty: 'beginner',
    movementPattern: 'push',
    primaryMuscles: ['Triceps Brachii (Lateral Head)'],
    secondaryMuscles: ['forearms'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Attach rope to high pulley, grasp ends with neutral grip.',
        'Slightly hinge torso forward, pin elbows tightly to sides.',
        'Push rope downward until arms are completely straight, then spread rope ends apart at bottom for peak contraction.',
        'Control rope back up to chest height (90-degree elbow bend) under 3 seconds.'
      ],
      fa: [
        'طناب را به قرقره بالا متصل کنید و دو سر آن را با دست بگیرید.',
        'کمی بالاتنه را به جلو شیب دهید و آرنج‌ها را کاملاً به پهلوها بچسبانید.',
        'طناب را تا صاف شدن کامل دست‌ها به پایین فشار دهید و در انتها دو سر طناب را از هم باز کنید.',
        'در ۳ ثانیه با کنترل تا زاویه ۹۰ درجه آرنج به بالا برگردید.'
      ]
    },
    commonMistakes: {
      en: ['Allowing elbows to drift forward and back on every rep.', 'Using shoulders to press down.'],
      fa: ['عقب و جلو رفتن آرنج‌ها در طول ست.', 'کمک گرفتن از عضلات سرشانه برای پایین بردن طناب.']
    },
    progressionOptions: {
      regression: 'triceps_rope_pushdown',
      progression: 'overhead_triceps_extension',
      alternatives: ['straight_bar_triceps_pushdown', 'overhead_triceps_extension']
    },
    gifUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=-vztqKOmEr4',
    youtubeId: '-vztqKOmEr4',
    youtubeTitle: 'Tricep Rope Pushdown Mistakes - ATHLEAN-X',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Elbows pinned to sides.', 'Push down to arm lockout.', 'Spread rope at bottom for peak squeeze.'],
        fa: ['آرنج‌ها چسبیده به پهلو.', 'فشار به پایین تا صاف شدن دست.', 'باز کردن طناب در انتها.']
      },
      commonMistakes: {
        en: ['Elbows swinging.'],
        fa: ['تاب خوردن آرنج.']
      },
      breathing: {
        en: 'Exhale pushing down, inhale returning.',
        fa: 'بازدم هنگام فشار به پایین، دم در بازگشت.'
      },
      formCues: {
        en: ['Lock elbows in concrete.'],
        fa: ['آرنج‌ها را مانند ستون بتنی بی‌حرکت نگه دارید.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s return, 1s down, 1s spread squeeze.',
        fa: '۳ ثانیه برگشت، ۱ ثانیه پایین، ۱ ثانیه مکث در انقباض.'
      }
    },
    substitutes: ['straight_bar_triceps_pushdown', 'overhead_triceps_extension']
  },
  {
    id: 'straight_bar_triceps_pushdown',
    name: {
      en: 'Straight-Bar Triceps Pushdown',
      fa: 'پشت‌بازو سیم‌کش با میله صاف / V'
    },
    muscleGroup: 'Triceps',
    targetMuscle: 'triceps',
    type: 'isolation',
    equipment: 'cable',
    difficulty: 'beginner',
    movementPattern: 'push',
    primaryMuscles: ['Triceps Brachii (Medial & Lateral Heads)'],
    secondaryMuscles: ['forearms'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Attach straight or V-bar to high cable pulley.',
        'Overhand grip with thumbs over bar.',
        'Press bar down extending elbows fully, squeeze triceps at bottom.',
        'Allow bar to return under 3-second control to chest height.'
      ],
      fa: [
        'میله صاف را به سیم‌کش بالا متصل کنید.',
        'با گیرش از رو میله را بگیرید و آرنج‌ها را به تنه بچسبانید.',
        'میله را به پایین فشار داده تا بازوها کاملاً صاف شوند و پشت‌بازو را منقبض کنید.',
        'در ۳ ثانیه با کنترل کامل تا سطح سینه به بالا بازگردید.'
      ]
    },
    commonMistakes: {
      en: ['Elbows flaring wide.'],
      fa: ['باز شدن آرنج‌ها به طرفین.']
    },
    progressionOptions: {
      regression: 'straight_bar_triceps_pushdown',
      progression: 'close_grip_bench_press',
      alternatives: ['triceps_rope_pushdown', 'overhead_triceps_extension']
    },
    gifUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU',
    youtubeId: '2-LAMcpzODU',
    youtubeTitle: 'Straight Bar Tricep Pushdown Technique',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Grip straight bar.', 'Push down to lockout.', 'Controlled return.'],
        fa: ['گرفتن میله صاف.', 'فشار تا صاف شدن دست.', 'برگشت با کنترل.']
      },
      commonMistakes: {
        en: ['Body weight leaning over bar.'],
        fa: ['انداختن وزن بدن روی میله.']
      },
      breathing: {
        en: 'Exhale down, inhale up.',
        fa: 'بازدم در پایین، دم در بالا.'
      },
      formCues: {
        en: ['Full triceps contraction at bottom.'],
        fa: ['انقباض کامل در انتهای حرکت.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s up, 1s down, 1s squeeze.',
        fa: '۳ ثانیه بالا، ۱ ثانیه پایین، ۱ ثانیه مکث.'
      }
    },
    substitutes: ['triceps_rope_pushdown', 'overhead_triceps_extension']
  },
  {
    id: 'overhead_triceps_extension',
    name: {
      en: 'Cable Overhead Triceps Extension',
      fa: 'پشت‌بازو سیم‌کش از پشت سر (کشش سر بلند)'
    },
    muscleGroup: 'Triceps',
    targetMuscle: 'triceps',
    type: 'isolation',
    equipment: 'cable',
    difficulty: 'intermediate',
    movementPattern: 'push',
    primaryMuscles: ['Triceps Brachii (Long Head)'],
    secondaryMuscles: ['shoulders'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Set cable pulley at chest or high level with rope attachment.',
        'Face away from stack in staggered stance, pull rope behind head with elbows elevated overhead.',
        'Extend elbows forward and overhead until arms are straight, keeping upper arms pinned.',
        'Lower rope back behind head under 3-second control into deep stretch of triceps long head.'
      ],
      fa: [
        'قرقره سیم‌کش را در ارتفاع سینه یا بالا با طناب تنظیم کنید.',
        'پشت به دستگاه با یک پا جلو بایستید و طناب را پشت سر با آرنج‌های رو به بالا نگه دارید.',
        'دست‌ها را به سمت جلو و بالای سر صاف کنید در حالی که زاویه بازوها ثابت است.',
        'در ۳ ثانیه کنترل‌شده طناب را به پشت سر برگردانید تا سر بلند پشت‌بازو در کشش کامل قرار گیرد.'
      ]
    },
    commonMistakes: {
      en: ['Dropping elbows during extension.'],
      fa: ['پایین آوردن آرنج‌ها در طول حرکت.']
    },
    progressionOptions: {
      regression: 'triceps_rope_pushdown',
      progression: 'skull_crushers_lying_triceps_extension',
      alternatives: ['skull_crushers_lying_triceps_extension', 'triceps_rope_pushdown']
    },
    gifUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=ns-RGsbz43E',
    youtubeId: 'ns-RGsbz43E',
    youtubeTitle: 'Overhead Cable Triceps Extension Form Guide',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 75,
    guide: {
      steps: {
        en: ['Face away from cable.', 'Keep upper arms elevated.', 'Extend forward to lockout.', 'Deep stretch on return.'],
        fa: ['پشت به سیم‌کش.', 'بازوها بالا و ثابت.', 'صاف کردن دست به جلو.', 'کشش عمیق در بازگشت.']
      },
      commonMistakes: {
        en: ['Moving shoulders instead of extending elbows.'],
        fa: ['حرکت دادن شانه به جای مفصل آرنج.']
      },
      breathing: {
        en: 'Exhale extending, inhale on deep stretch.',
        fa: 'بازدم هنگام صاف کردن دست، دم در کشش عمیق.'
      },
      formCues: {
        en: ['Feel the intense stretch in the long head of your triceps.'],
        fa: ['کشش شدید سر بلند پشت‌بازو را پشت سر احساس کنید.']
      },
      tempo: '3-1-1-1',
      tempoDescription: {
        en: '3s return stretch, 1s stretch pause, 1s extend, 1s squeeze.',
        fa: '۳ ثانیه بازگشت، ۱ ثانیه مکث کششی، ۱ ثانیه صعود، ۱ ثانیه انقباض.'
      }
    },
    substitutes: ['skull_crushers_lying_triceps_extension', 'triceps_rope_pushdown']
  },
  {
    id: 'skull_crushers_lying_triceps_extension',
    name: {
      en: 'Barbell / EZ Bar Skull Crushers (Lying Triceps Extension)',
      fa: 'پشت‌بازو هالتر خوابیده (Skull Crushers)'
    },
    muscleGroup: 'Triceps',
    targetMuscle: 'triceps',
    type: 'isolation',
    equipment: 'barbell',
    difficulty: 'intermediate',
    movementPattern: 'push',
    primaryMuscles: ['Triceps Brachii (Long & Medial Heads)'],
    secondaryMuscles: ['forearms'],
    injuryRiskLevel: 'medium',
    instructions: {
      en: [
        'Lie on flat bench holding EZ bar with narrow overhand grip.',
        'Angle upper arms slightly backward (around 70 degrees from floor) rather than straight vertical.',
        'Bend elbows to lower bar smoothly to crown of head or just behind bench.',
        'Extend elbows forcefully to lock out while maintaining backward angle of upper arm.'
      ],
      fa: [
        'روی نیمکت بخوابید و میله EZ را با گیرش جمع بگیرید.',
        'بازوها را به جای عمود بودن، کمی به سمت پشت سر متمایل کنید (زاویه ۷۰ درجه با زمین).',
        'آرنج‌ها را خم کرده و میله را با کنترل به سمت پیشانی یا بالای سر پایین بیاورید.',
        'با انقباض پشت‌بازو آرنج‌ها را صاف کنید بدون اینکه زاویه شیب بازو تغییر کند.'
      ]
    },
    commonMistakes: {
      en: ['Flaring elbows outward excessively (causes medial epicondylitis/elbow irritation).', 'Bouncing off head.'],
      fa: ['باز کردن بیش از حد آرنج‌ها به طرفین که باعث آرنج‌درد می‌شود.', 'کوبیدن وزنه به سمت سر.']
    },
    progressionOptions: {
      regression: 'overhead_triceps_extension',
      progression: 'close_grip_bench_press',
      alternatives: ['overhead_triceps_extension', 'close_grip_bench_press']
    },
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=d_KZxkY_0cM',
    youtubeId: 'd_KZxkY_0cM',
    youtubeTitle: 'How to Skull Crusher without Elbow Pain - Jeff Nippard',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 90,
    guide: {
      steps: {
        en: ['Upper arm angled back slightly.', 'Lower bar to top of forehead/bench.', 'Extend to lockout.'],
        fa: ['زاویه بازو کمی متمایل به عقب.', 'فرود میله به بالای سر.', 'صاف کردن دست تا قفل پشت‌بازو.']
      },
      commonMistakes: {
        en: ['Flaring elbows wide.'],
        fa: ['باز کردن آرنج‌ها به طرفین.']
      },
      breathing: {
        en: 'Inhale lowering to head, exhale driving up.',
        fa: 'دم در پایین آوردن به سمت سر، بازدم هنگام صاف کردن دست.'
      },
      formCues: {
        en: ['Keep elbows tucked in line with shoulders.'],
        fa: ['آرنج‌ها را در راستای عرض شانه حفظ کنید.']
      },
      tempo: '3-0-1-0',
      tempoDescription: {
        en: '3s down, 1s up.',
        fa: '۳ ثانیه پایین، ۱ ثانیه بالا.'
      }
    },
    substitutes: ['overhead_triceps_extension', 'close_grip_bench_press']
  },
  {
    id: 'dips_triceps_focus',
    name: {
      en: 'Triceps Dips (Upright Torso)',
      fa: 'پارالل برای پشت‌بازو (بدن عمود)'
    },
    muscleGroup: 'Triceps',
    targetMuscle: 'triceps',
    type: 'compound',
    equipment: 'bodyweight',
    difficulty: 'advanced',
    movementPattern: 'push',
    primaryMuscles: ['Triceps Brachii'],
    secondaryMuscles: ['chest', 'shoulders'],
    injuryRiskLevel: 'medium',
    instructions: {
      en: [
        'Mount parallel bars, keeping torso strictly upright (vertical).',
        'Keep elbows tucked close to sides rather than flared.',
        'Lower body until elbows bend to 90 degrees.',
        'Press upward through palms to full elbow extension, squeezing triceps hard.'
      ],
      fa: [
        'روی میله‌های پارالل مستقر شوید و بالاتنه را کاملاً عمود و صاف نگه دارید.',
        'آرنج‌ها را به موازات پهلوها هدایت کنید نه به سمت بیرون.',
        'تا زاویه ۹۰ درجه در مفصل آرنج پایین بیایید.',
        'با فشار کف دست‌ها و انقباض پشت‌بازو به حالت ایستاده دست‌ها بازگردید.'
      ]
    },
    commonMistakes: {
      en: ['Leaning forward (shifts tension to chest).', 'Dropping below 90 degrees putting extreme strain on shoulders.'],
      fa: ['خم شدن به جلو که فشار را به سینه منتقل می‌کند.', 'پایین رفتن بیش از حد که به مفصل شانه آسیب می‌زند.']
    },
    progressionOptions: {
      regression: 'close_grip_bench_press',
      progression: 'dips_triceps_focus',
      alternatives: ['close_grip_bench_press', 'skull_crushers_lying_triceps_extension']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=0326dy_-CzM',
    youtubeId: '0326dy_-CzM',
    youtubeTitle: 'How to Do Dips for Triceps - Form Guide',
    defaultSets: 3,
    defaultReps: '8-12',
    defaultRestSec: 90,
    guide: {
      steps: {
        en: ['Vertical torso.', 'Elbows tucked close.', 'Lower to 90 degrees.', 'Press through triceps.'],
        fa: ['بالاتنه کاملاً عمود.', 'آرنج‌ها چسبیده.', 'فرود تا ۹۰ درجه.', 'پرس با پشت‌بازو.']
      },
      commonMistakes: {
        en: ['Forward shoulder roll.'],
        fa: ['افتادگی شانه به جلو.']
      },
      breathing: {
        en: 'Inhale lowering, exhale pressing up.',
        fa: 'دم در فرود، بازدم در پرس به بالا.'
      },
      formCues: {
        en: ['Keep chest up and gaze forward.'],
        fa: ['سینه بالا و نگاه به روبرو.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s down, 1s up, 1s lockout squeeze.',
        fa: '۳ ثانیه پایین، ۱ ثانیه بالا، ۱ ثانیه انقباض در قفل.'
      }
    },
    substitutes: ['close_grip_bench_press', 'triceps_rope_pushdown']
  },
  {
    id: 'cable_triceps_kickback',
    name: {
      en: 'Cable Triceps Kickback',
      fa: 'پشت‌بازو کیک‌بک با سیم‌کش'
    },
    muscleGroup: 'Triceps',
    targetMuscle: 'triceps',
    type: 'isolation',
    equipment: 'cable',
    difficulty: 'beginner',
    movementPattern: 'push',
    primaryMuscles: ['Triceps Brachii (Lateral & Long Heads)'],
    secondaryMuscles: ['forearms'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Set cable pulley to elbow height with no attachment (hold rubber ball).',
        'Hinge torso forward to roughly 45 degrees, pin upper arm parallel to floor.',
        'Kick forearm backward until arm is locked in complete extension.',
        'Hold peak contraction for 1 second, control return to 90 degrees.'
      ],
      fa: [
        'قرقره سیم‌کش را در ارتفاع آرنج تنظیم کنید.',
        'بالاتنه را در ۴۵ درجه خم کنید و بازو را موازی با زمین ثابت نگه دارید.',
        'ساعد را به سمت عقب هدایت کنید تا دست کاملاً صاف و پشت‌بازو منقبض شود.',
        '۱ ثانیه در اوج مکث کرده و در ۳ ثانیه با کنترل تا زاویه ۹۰ درجه برگردید.'
      ]
    },
    commonMistakes: {
      en: ['Dropping elbow towards floor.'],
      fa: ['پایین افتادن آرنج حین حرکت.']
    },
    progressionOptions: {
      regression: 'cable_triceps_kickback',
      progression: 'triceps_rope_pushdown',
      alternatives: ['triceps_rope_pushdown', 'overhead_triceps_extension']
    },
    gifUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=6SS6KT26ae8',
    youtubeId: '6SS6KT26ae8',
    youtubeTitle: 'Tricep Cable Kickback Technique Guide',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Upper arm parallel to floor.', 'Extend forearm backward.', '1s peak contraction hold.'],
        fa: ['بازو موازی با زمین.', 'صاف کردن ساعد به عقب.', '۱ ثانیه انقباض در اوج.']
      },
      commonMistakes: {
        en: ['Swinging arm from shoulder.'],
        fa: ['تاب دادن دست از مفصل شانه.']
      },
      breathing: {
        en: 'Exhale kicking back, inhale returning.',
        fa: 'بازدم هنگام صاف کردن دست به عقب، دم در بازگشت.'
      },
      formCues: {
        en: ['Only the forearm moves; upper arm stays frozen.'],
        fa: ['فقط ساعد حرکت می‌کند؛ بازو کاملاً ثابت است.']
      },
      tempo: '2-0-1-1',
      tempoDescription: {
        en: '2s return, 1s extend, 1s squeeze.',
        fa: '۲ ثانیه بازگشت، ۱ ثانیه امتداد، ۱ ثانیه انقباض.'
      }
    },
    substitutes: ['triceps_rope_pushdown']
  }
];
