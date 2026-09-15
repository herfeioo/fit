import { Exercise } from '../../types';

export const legExercises: Exercise[] = [
  // QUADRICEPS
  {
    id: 'barbell_back_squat',
    name: {
      en: 'Barbell Back Squat',
      fa: 'اسکات پا با هالتر از پشت'
    },
    muscleGroup: 'Quads',
    targetMuscle: 'quads',
    type: 'compound',
    equipment: 'barbell',
    difficulty: 'advanced',
    movementPattern: 'squat',
    primaryMuscles: ['Quadriceps (Rectus Femoris, Vastus Medialis/Lateralis)', 'Gluteus Maximus'],
    secondaryMuscles: ['hamstrings', 'calves', 'core'],
    injuryRiskLevel: 'high',
    instructions: {
      en: [
        'Rest bar across upper traps (high bar) or rear delts (low bar). Feet shoulder-width apart, toes turned out 15-30 degrees.',
        'Brace abdominal wall with deep diaphragmatic breath (Valsalva maneuver).',
        'Break at hips and knees simultaneously, descending until hip crease passes below knee joint (parallel or below).',
        'Keep knees tracking inline with second toe; maintain upright or stable torso angle.',
        'Drive out of bottom hole through whole foot, extending knees and hips simultaneously to lockout.'
      ],
      fa: [
        'هالتر را روی عضلات ذوزنقه قرار دهید؛ پاها به عرض شانه و پنجه‌ها ۱۵ تا ۳۰ درجه رو به بیرون.',
        'با یک نفس عمیق شکمی، دیواره شکم را محکم سفت کنید.',
        'همزمان با خم کردن زانو و عقب بردن لگن پایین بیایید تا مفصل لگن به زیر سطح زانو برسد (موازی یا عمیق‌تر).',
        'زانوها را در امتداد انگشت دوم پا هدایت کنید و از جمع شدن زانو به داخل پرهیز نمایید.',
        'با فشار کامل کف پاها به زمین، با قدرت به بالا برخیزید تا زانو و لگن همزمان قفل شوند.'
      ]
    },
    commonMistakes: {
      en: ['Knee valgus collapse inward.', 'Excessive forward chest collapse (good morning squat).', 'Butt wink under lumbar flexion.'],
      fa: ['چرخش زانوها به سمت داخل (والگوس زانو).', 'خم شدن بیش از حد بالاتنه به جلو مانند سلام صبحگاهی.', 'قوس و گرد شدن استخوان خاجی و کمر در انتهای دامنه (بات وینک).']
    },
    progressionOptions: {
      regression: 'goblet_squat',
      progression: 'front_squat',
      alternatives: ['hack_squat', 'leg_press', 'goblet_squat']
    },
    gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=bEv6CCg2BC8',
    youtubeId: 'bEv6CCg2BC8',
    youtubeTitle: 'How To Squat: Complete Guide - Jeff Nippard',
    defaultSets: 4,
    defaultReps: '6-8',
    defaultRestSec: 150,
    guide: {
      steps: {
        en: ['Bar on upper traps/delts.', 'Brace core with 360-degree air.', 'Descend to parallel.', 'Drive floor away.'],
        fa: ['هالتر روی کول یا سرشانه خلفی.', 'حبس تنفس و انقباض ۳۶۰ درجه شکم.', 'فرود تا خط موازی.', 'هل دادن زمین به پایین.']
      },
      commonMistakes: {
        en: ['Knees caving inward.'],
        fa: ['جمع شدن زانو به داخل.']
      },
      breathing: {
        en: 'Big inhale and brace at top, descend, exhale through sticking point on ascent.',
        fa: 'دم عمیق و قفل شکم در بالا، فرود، بازدم قدرتی پس از عبور از سخت‌ترین نقطه.'
      },
      formCues: {
        en: ['Spread the floor with your feet as you descend.'],
        fa: ['حین پایین آمدن زمین را با پاهایتان به سمت بیرون باز کنید.']
      },
      tempo: '3-1-1-0',
      tempoDescription: {
        en: '3s down, 1s hole pause, 1s explosive drive.',
        fa: '۳ ثانیه پایین، ۱ ثانیه مکث، ۱ ثانیه بالا آمدن انفجاری.'
      }
    },
    substitutes: ['hack_squat', 'leg_press', 'front_squat']
  },
  {
    id: 'front_squat',
    name: {
      en: 'Barbell Front Squat',
      fa: 'اسکات جلو با هالتر (تمرکز بر چهارسر ران)'
    },
    muscleGroup: 'Quads',
    targetMuscle: 'quads',
    type: 'compound',
    equipment: 'barbell',
    difficulty: 'advanced',
    movementPattern: 'squat',
    primaryMuscles: ['Quadriceps (High Quad Recruitment)', 'Core (Rectus Abdominis)'],
    secondaryMuscles: ['glutes', 'calves'],
    injuryRiskLevel: 'high',
    instructions: {
      en: [
        'Rest bar across anterior deltoids with fingertips under bar and elbows driven high parallel to floor.',
        'Maintain strictly upright torso posture throughout.',
        'Descend deep into squat with knees traveling forward over toes.',
        'Drive straight up out of hole, keeping elbows lifted.'
      ],
      fa: [
        'هالتر را روی سرشانه‌های قدامی قرار داده و با نوک انگشتان نگه دارید؛ آرنج‌ها را بالا و موازی با زمین حفظ کنید.',
        'ستون فقرات و بالاتنه را در طول حرکت کاملاً عمود و صاف نگه دارید.',
        'عمیق بنشینید و اجازه دهید زانوها با عبور ایمن از روی پنجه حرکت کنند.',
        'با قدرت به سمت بالا برخیزید در حالی که آرنج‌ها همچنان بالا نگه داشته شده‌اند.'
      ]
    },
    commonMistakes: {
      en: ['Elbows dropping causing bar to roll forward off delts.', 'Rounding thoracic spine.'],
      fa: ['پایین افتادن آرنج‌ها و افتادن هالتر به جلو.', 'قوز کردن بخش میانی ستون فقرات.']
    },
    progressionOptions: {
      regression: 'goblet_squat',
      progression: 'barbell_back_squat',
      alternatives: ['hack_squat', 'leg_press', 'goblet_squat']
    },
    gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=uYumuL_G_V0',
    youtubeId: 'uYumuL_G_V0',
    youtubeTitle: 'How to Front Squat with Proper Form - Alan Thrall',
    defaultSets: 3,
    defaultReps: '6-8',
    defaultRestSec: 120,
    guide: {
      steps: {
        en: ['Bar on front delts.', 'Elbows high.', 'Upright torso.', 'Drive out of hole.'],
        fa: ['هالتر روی سرشانه جلو.', 'آرنج‌ها بالا.', 'بالاتنه کاملاً عمود.', 'برخاستن قدرتی.']
      },
      commonMistakes: {
        en: ['Dropping elbows.'],
        fa: ['افتادن آرنج به پایین.']
      },
      breathing: {
        en: 'Valsalva brace at top, exhale at lockout.',
        fa: 'حبس نفس و انقباض شکم در شروع، بازدم در انتهای ایستادن.'
      },
      formCues: {
        en: ['Drive elbows up towards the ceiling continuously.'],
        fa: ['آرنج‌ها را پیوسته به سمت سقف بالا بکشید.']
      },
      tempo: '3-1-1-0',
      tempoDescription: {
        en: '3s down, 1s bottom pause, 1s up.',
        fa: '۳ ثانیه پایین، ۱ ثانیه مکث، ۱ ثانیه بالا.'
      }
    },
    substitutes: ['hack_squat', 'goblet_squat', 'leg_press']
  },
  {
    id: 'goblet_squat',
    name: {
      en: 'Kettlebell / Dumbbell Goblet Squat',
      fa: 'گابلت اسکات با دمبل / کتل‌بل'
    },
    muscleGroup: 'Quads',
    targetMuscle: 'quads',
    type: 'compound',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    movementPattern: 'squat',
    primaryMuscles: ['Quadriceps', 'Gluteus Maximus'],
    secondaryMuscles: ['core', 'calves'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Hold dumbbell vertically against chest with both palms cupping the top head.',
        'Stance shoulder-width with toes slightly flared.',
        'Squat down between legs until elbows lightly brush inside of knees.',
        'Drive through full foot to stand tall.'
      ],
      fa: [
        'دمبل را به صورت عمودی با دو دست زیر چانه و به سینه چسبیده نگه دارید.',
        'پاها به عرض شانه و پنجه‌ها کمی به بیرون متمایل باشند.',
        'به آرامی بین پاها بنشینید تا آرنج‌ها بخش داخلی زانوها را لمس کنند.',
        'با فشار کل کف پاها به زمین راست بایستید.'
      ]
    },
    commonMistakes: {
      en: ['Holding dumbbell too far away from chest.'],
      fa: ['دور نگه داشتن دمبل از قفسه سینه.']
    },
    progressionOptions: {
      regression: 'leg_press',
      progression: 'barbell_back_squat',
      alternatives: ['leg_press', 'hack_squat']
    },
    gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=MeIiIdhvXT4',
    youtubeId: 'MeIiIdhvXT4',
    youtubeTitle: 'Goblet Squat Form - Perfect Technique',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 75,
    guide: {
      steps: {
        en: ['Hold dumbbell at chest.', 'Squat between knees.', 'Stand tall.'],
        fa: ['دمبل چسبیده به سینه.', 'نشستن بین دو زانو.', 'ایستادن کامل.']
      },
      commonMistakes: {
        en: ['Heels lifting off floor.'],
        fa: ['بلند شدن پاشنه پا از زمین.']
      },
      breathing: {
        en: 'Inhale down, exhale up.',
        fa: 'دم در فرود، بازدم در صعود.'
      },
      formCues: {
        en: ['Sit your hips between your feet.'],
        fa: ['باسن را درست در فاصله بین دو پا فرود آورید.']
      },
      tempo: '3-0-1-0',
      tempoDescription: {
        en: '3s down, 1s up.',
        fa: '۳ ثانیه پایین، ۱ ثانیه بالا.'
      }
    },
    substitutes: ['leg_press', 'hack_squat']
  },
  {
    id: 'leg_press',
    name: {
      en: '45-Degree Leg Press',
      fa: 'پرس پا ۴۵ درجه با دستگاه'
    },
    muscleGroup: 'Quads',
    targetMuscle: 'quads',
    type: 'compound',
    equipment: 'machine',
    difficulty: 'beginner',
    movementPattern: 'squat',
    primaryMuscles: ['Quadriceps'],
    secondaryMuscles: ['glutes', 'hamstrings'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Sit on sled with lower back and pelvis pinned tight to backrest.',
        'Place feet shoulder-width on middle of platform.',
        'Release safety bars, lower sled under 3-second control until knees bend to 90 degrees without butt lifting off pad.',
        'Drive sled upward through midfoot and heels, stopping just short of locking knees.'
      ],
      fa: [
        'روی صندلی مستقر شوید و مطمئن شوید باسن و کمر کاملاً به تکیه‌گاه فشرده شده‌اند.',
        'پاها را به عرض شانه روی وسط صفحه پرس پا قرار دهید.',
        'قفل ایمنی را آزاد کرده و در ۳ ثانیه وزنه را پایین بیاورید تا زاویه زانوها به ۹۰ درجه برسد (بدون جدا شدن باسن از صندلی).',
        'با فشار پاشنه و کف پا وزنه را به بالا هدایت کنید و قبل از قفل کامل زانوها متوقف شوید.'
      ]
    },
    commonMistakes: {
      en: ['Allowing lower back/pelvis to round off backrest (causes lumbar disc herniation).', 'Hyperextending knees at top.'],
      fa: ['بلند شدن باسن و گود شدن کمر از تکیه‌گاه که خطر پارگی دیسک دارد.', 'قفل کردن شدید زانوها در بالا.']
    },
    progressionOptions: {
      regression: 'leg_press',
      progression: 'hack_squat',
      alternatives: ['hack_squat', 'goblet_squat', 'barbell_back_squat']
    },
    gifUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
    youtubeId: 'IZxyjW7MPJQ',
    youtubeTitle: 'How to Leg Press: Stop Making These Mistakes - Jeff Nippard',
    defaultSets: 4,
    defaultReps: '10-12',
    defaultRestSec: 90,
    guide: {
      steps: {
        en: ['Glutes glued to seat pad.', 'Lower to 90-degree knee bend.', 'Drive up without locking knees.'],
        fa: ['چسبیدن باسن به تکیه‌گاه.', 'فرود تا زاویه ۹۰ درجه.', 'فشار به بالا بدون قفل مفصل.']
      },
      commonMistakes: {
        en: ['Butt lifting off pad at bottom.'],
        fa: ['جدا شدن باسن از صندلی در پایین‌ترین نقطه.']
      },
      breathing: {
        en: 'Inhale lowering sled, exhale pressing up.',
        fa: 'دم در پایین آمدن وزنه، بازدم هنگام پرس به بالا.'
      },
      formCues: {
        en: ['Pull yourself into the seat using side handles.'],
        fa: ['با گرفتن دستگیره‌های بغل، باسن را محکم به صندلی بکشید.']
      },
      tempo: '3-1-1-0',
      tempoDescription: {
        en: '3s down, 1s pause, 1s up.',
        fa: '۳ ثانیه فرود، ۱ ثانیه مکث، ۱ ثانیه صعود.'
      }
    },
    substitutes: ['hack_squat', 'barbell_back_squat']
  },
  {
    id: 'leg_extension',
    name: {
      en: 'Machine Leg Extension',
      fa: 'جلوپا با دستگاه (تفکیک چهارسر ران)'
    },
    muscleGroup: 'Quads',
    targetMuscle: 'quads',
    type: 'isolation',
    equipment: 'machine',
    difficulty: 'beginner',
    movementPattern: 'squat',
    primaryMuscles: ['Quadriceps (Rectus Femoris Direct Isolation)'],
    secondaryMuscles: [],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Adjust machine so knee axis aligns directly with machine pivot point.',
        'Set shin pad just above ankles, sit back against backrest holding side handles.',
        'Extend knees smoothly until legs are fully straight, squeezing quads hard at top for 1 full second.',
        'Lower under 3-second control without letting weight stack touch.'
      ],
      fa: [
        'دستگاه را طوری تنظیم کنید که محور چرخش زانو دقیقاً در امتداد محور چرخش دستگاه باشد.',
        'غلتک فومی را بالای مچ پا قرار دهید و دستگیره‌های بغل را بگیرید.',
        'پاها را تا صاف شدن کامل باز کنید و ۱ ثانیه انقباض اوج در چهارسر ران اعمال نمایید.',
        'در ۳ ثانیه به آرامی پایین ببرید بدون اینکه وزنه‌ها به هم برخورد کنند.'
      ]
    },
    commonMistakes: {
      en: ['Kicking legs violently with momentum.', 'Aligning machine pivot incorrectly.'],
      fa: ['لگد زدن به وزنه و پرتاب کردن ساق پا.', 'تنظیم اشتباه محور دستگاه با مفصل زانو.']
    },
    progressionOptions: {
      regression: 'leg_extension',
      progression: 'hack_squat',
      alternatives: ['hack_squat', 'leg_press']
    },
    gifUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=YyvSfVjQeL0',
    youtubeId: 'YyvSfVjQeL0',
    youtubeTitle: 'Leg Extension Guide: Maximize Rectus Femoris Growth',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Align knee with pivot.', 'Extend legs to full lockout.', 'Hold 1s squeeze.', '3s negative.'],
        fa: ['تنظیم زانو با محور دستگاه.', 'صاف کردن کامل پا.', '۱ ثانیه انقباض در اوج.', '۳ ثانیه فرود.']
      },
      commonMistakes: {
        en: ['Swinging weight.'],
        fa: ['پرتاب کردن وزنه.']
      },
      breathing: {
        en: 'Exhale extending up, inhale lowering.',
        fa: 'بازدم هنگام بالا بردن، دم هنگام پایین آمدن.'
      },
      formCues: {
        en: ['Hold the handles tightly to keep butt pinned down.'],
        fa: ['دستگیره‌ها را محکم بگیرید تا باسن از روی صندلی بلند نشود.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s down, 1s up, 1s peak contraction hold.',
        fa: '۳ ثانیه پایین، ۱ ثانیه بالا، ۱ ثانیه مکث در انقباض.'
      }
    },
    substitutes: ['hack_squat', 'leg_press']
  },
  {
    id: 'hack_squat',
    name: {
      en: 'Machine Hack Squat',
      fa: 'هاگ اسکات با دستگاه'
    },
    muscleGroup: 'Quads',
    targetMuscle: 'quads',
    type: 'compound',
    equipment: 'machine',
    difficulty: 'intermediate',
    movementPattern: 'squat',
    primaryMuscles: ['Quadriceps (Vastus Medialis, Lateralis, Intermedius)'],
    secondaryMuscles: ['glutes'],
    injuryRiskLevel: 'medium',
    instructions: {
      en: [
        'Position shoulders under pads, back flat against backrest.',
        'Place feet low-to-mid on platform for maximum quadriceps knee flexion.',
        'Disengage safety levers, descend slowly under 3-second control into deep knee flexion.',
        'Drive through midfoot out of hole to near-lockout.'
      ],
      fa: [
        'شانه‌ها را زیر بالشتک‌های دستگاه قرار داده و پشت را به تکیه‌گاه بچسبانید.',
        'پاها را در بخش میانی یا پایینی صفحه قرار دهید تا خمیدگی زانو و درگیری چهارسر به اوج برسد.',
        'قفل‌ها را باز کرده و در ۳ ثانیه عمیق پایین بیایید تا کشش کامل چهارسر حاصل شود.',
        'با فشار محکم کف پاها به بالا برگردید بدون قفل ضربه‌ای زانو.'
      ]
    },
    commonMistakes: {
      en: ['Heels lifting off platform.'],
      fa: ['بلند شدن پاشنه پا از صفحه.']
    },
    progressionOptions: {
      regression: 'leg_press',
      progression: 'barbell_back_squat',
      alternatives: ['leg_press', 'barbell_back_squat', 'front_squat']
    },
    gifUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=0tn5K9NlCfo',
    youtubeId: '0tn5K9NlCfo',
    youtubeTitle: 'Hack Squat Technique Guide - Renaissance Periodization',
    defaultSets: 4,
    defaultReps: '8-10',
    defaultRestSec: 120,
    guide: {
      steps: {
        en: ['Back against pad.', 'Deep knee flexion.', 'Drive up through midfoot.'],
        fa: ['پشت چسبیده به پد.', 'فرود عمیق در زانو.', 'برخاستن با فشار کف پا.']
      },
      commonMistakes: {
        en: ['Cutting depth shallow.'],
        fa: ['کوتاه کردن دامنه و عمیق نرفتن.']
      },
      breathing: {
        en: 'Inhale lowering, exhale driving up.',
        fa: 'دم در فرود، بازدم در صعود.'
      },
      formCues: {
        en: ['Let knees track forward over toes.'],
        fa: ['اجازه دهید زانوها با نرمی روی پنجه‌ها به جلو حرکت کنند.']
      },
      tempo: '3-1-1-0',
      tempoDescription: {
        en: '3s down, 1s pause, 1s up.',
        fa: '۳ ثانیه پایین، ۱ ثانیه مکث، ۱ ثانیه بالا.'
      }
    },
    substitutes: ['leg_press', 'barbell_back_squat']
  },
  {
    id: 'walking_lunges',
    name: {
      en: 'Dumbbell Walking Lunges',
      fa: 'لانجز راه رفتنی با دمبل'
    },
    muscleGroup: 'Quads',
    targetMuscle: 'quads',
    type: 'compound',
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    movementPattern: 'squat',
    primaryMuscles: ['Quadriceps', 'Gluteus Maximus'],
    secondaryMuscles: ['hamstrings', 'calves', 'core'],
    injuryRiskLevel: 'medium',
    instructions: {
      en: [
        'Hold dumbbells at sides with tall spine and braced core.',
        'Take exaggerated step forward, landing heel-first and sinking hips vertically until back knee gently hovers above floor.',
        'Drive through front heel to step directly forward into next stride.',
        'Keep torso upright throughout.'
      ],
      fa: [
        'دمبل‌ها را در کنار بدن نگه دارید و بالاتنه را صاف حفظ کنید.',
        'یک گام بلند به جلو بردارید و با فرود پاشنه، باسن را عمودی پایین بیاورید تا زانوی عقب نزدیک زمین برسد.',
        'با فشار پاشنه پای جلو به سمت بالا و جلو گام بعدی را بردارید.',
        'راست‌قامتی ستون فقرات را حفظ کنید.'
      ]
    },
    commonMistakes: {
      en: ['Front knee collapsing inward.', 'Short strides causing excessive heel elevation.'],
      fa: ['چرخش زانوی جلو به داخل.', 'گام بسیار کوتاه که باعث بلند شدن پاشنه پا می‌شود.']
    },
    progressionOptions: {
      regression: 'reverse_lunge',
      progression: 'bulgarian_split_squat',
      alternatives: ['reverse_lunge', 'bulgarian_split_squat']
    },
    gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=L8fvypPrzzs',
    youtubeId: 'L8fvypPrzzs',
    youtubeTitle: 'Walking Lunges For Quad & Glute Hypertrophy',
    defaultSets: 3,
    defaultReps: '12-14 per leg',
    defaultRestSec: 90,
    guide: {
      steps: {
        en: ['Long stride forward.', 'Lower back knee toward floor.', 'Drive through front heel.'],
        fa: ['گام بلند به جلو.', 'پایین بردن زانوی عقب.', 'فشار از پاشنه پای جلو.']
      },
      commonMistakes: {
        en: ['Banging back knee violently on floor.'],
        fa: ['کوبیدن زانوی عقب به زمین.']
      },
      breathing: {
        en: 'Inhale stepping down, exhale stepping through.',
        fa: 'دم هنگام فرود در گام، بازدم در حرکت به گام بعدی.'
      },
      formCues: {
        en: ['Stay smooth and continuous without wobbling.'],
        fa: ['حرکت پیوسته و با تعادل بدون لرزش بدن.']
      },
      tempo: '2-0-1-0',
      tempoDescription: {
        en: '2s down, 1s up.',
        fa: '۲ ثانیه فرود، ۱ ثانیه صعود.'
      }
    },
    substitutes: ['reverse_lunge', 'bulgarian_split_squat']
  },
  {
    id: 'reverse_lunge',
    name: {
      en: 'Dumbbell Reverse Lunge',
      fa: 'لانجز به عقب با دمبل (کمترین فشار روی کشکک زانو)'
    },
    muscleGroup: 'Quads',
    targetMuscle: 'quads',
    type: 'compound',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    movementPattern: 'squat',
    primaryMuscles: ['Quadriceps', 'Gluteus Maximus'],
    secondaryMuscles: ['hamstrings', 'calves'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Stand tall with dumbbells at sides.',
        'Step one leg straight backward, sinking hips until both knees bend to 90 degrees.',
        'Front shin remains roughly vertical, reducing patellofemoral shear stress.',
        'Drive through front heel to return to standing.'
      ],
      fa: [
        'صاف بایستید و دمبل‌ها را در کنار بدن بگیرید.',
        'یک پا را به سمت عقب بگذارید و باسن را پایین بیاورید تا هر دو زانو در زاویه ۹۰ درجه قرار گیرند.',
        'ساق پای جلو عمود بر زمین می‌ماند که فشار مفصل کشکک زانو را به حداقل می‌رساند.',
        'با فشار پاشنه پای جلو به حالت ایستاده برگردید.'
      ]
    },
    commonMistakes: {
      en: ['Leaning backward excessively.'],
      fa: ['خم شدن بیش از حد به عقب.']
    },
    progressionOptions: {
      regression: 'reverse_lunge',
      progression: 'walking_lunges',
      alternatives: ['walking_lunges', 'bulgarian_split_squat']
    },
    gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=wrwwXE_x-yQ',
    youtubeId: 'wrwwXE_x-yQ',
    youtubeTitle: 'Reverse Lunge Technique - Joint Friendly Alternative',
    defaultSets: 3,
    defaultReps: '10-12 per leg',
    defaultRestSec: 75,
    guide: {
      steps: {
        en: ['Step backward.', 'Lower to 90 degrees.', 'Drive up through front heel.'],
        fa: ['گام به عقب.', 'فرود تا ۹۰ درجه.', 'فشار از پاشنه پای جلو به بالا.']
      },
      commonMistakes: {
        en: ['Front heel coming up.'],
        fa: ['بلند شدن پاشنه پای جلو.']
      },
      breathing: {
        en: 'Inhale stepping back, exhale standing up.',
        fa: 'دم هنگام گام به عقب، بازدم در ایستادن.'
      },
      formCues: {
        en: ['Keep weight in the front leg heel.'],
        fa: ['بیشترین وزن را روی پاشنه پای جلو متمرکز کنید.']
      },
      tempo: '2-0-1-0',
      tempoDescription: {
        en: '2s down, 1s up.',
        fa: '۲ ثانیه پایین، ۱ ثانیه بالا.'
      }
    },
    substitutes: ['walking_lunges', 'bulgarian_split_squat']
  },

  // HAMSTRINGS
  {
    id: 'romanian_deadlift_rdl',
    name: {
      en: 'Barbell Romanian Deadlift (RDL)',
      fa: 'ددلیفت رومانیایی با هالتر (RDL)'
    },
    muscleGroup: 'Hamstrings',
    targetMuscle: 'hamstrings',
    type: 'compound',
    equipment: 'barbell',
    difficulty: 'intermediate',
    movementPattern: 'hinge',
    primaryMuscles: ['Biceps Femoris (Hamstrings)', 'Gluteus Maximus'],
    secondaryMuscles: ['back', 'forearms'],
    injuryRiskLevel: 'medium',
    instructions: {
      en: [
        'Stand tall with feet hip-width apart holding bar with overhand grip against thighs.',
        'Unlock knees slightly (15-20 degree fixed bend), then push hips backward as far as possible.',
        'Slide bar down thighs keeping it glued to shins until deep hamstring stretch is felt at mid-shin.',
        'Spine remains strictly neutral without lumbar flexion.',
        'Drive hips forward powerfully squeezing glutes and hamstrings to return to lockout.'
      ],
      fa: [
        'صاف بایستید و پاها به عرض لگن باشد؛ هالتر را مماس با ران‌ها نگه دارید.',
        'زانوها را با زاویه ملایم (۱۵ تا ۲۰ درجه) قفل نگه دارید و لگن را تا حد امکان به عقب هل دهید.',
        'میله را چسبیده به ران و ساق به سمت پایین هدایت کنید تا کشش عمیق در پشت ران ایجاد شود.',
        'ستون فقرات کاملاً صاف و بدون قوز بماند.',
        'با جلو راندن لگن و انقباض شدید باسن و پشت پا به حالت ایستاده کامل بازگردید.'
      ]
    },
    commonMistakes: {
      en: ['Rounding lumbar spine at bottom stretch.', 'Turning it into a squat by bending knees excessively.', 'Letting bar drift away from shins.'],
      fa: ['قوز کردن کمر در انتهای کشش.', 'خم کردن بیش از حد زانوها و تبدیل حرکت به اسکات.', 'فاصله گرفتن میله از ساق پا.']
    },
    progressionOptions: {
      regression: 'seated_leg_curl',
      progression: 'conventional_deadlift',
      alternatives: ['seated_leg_curl', 'lying_leg_curl', 'glute_ham_raise']
    },
    gifUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=JCXUYuzwNrM',
    youtubeId: 'JCXUYuzwNrM',
    youtubeTitle: 'Romanian Deadlift (RDL) Form Guide - Jeff Nippard',
    defaultSets: 4,
    defaultReps: '8-10',
    defaultRestSec: 120,
    guide: {
      steps: {
        en: ['Slight knee bend locked.', 'Push hips back to the wall behind you.', 'Bar skims thighs to shins.', 'Squeeze glutes forward.'],
        fa: ['خم ملایم زانو قفل.', 'عقب بردن لگن به سمت دیوار پشتی.', 'هالتر مماس با ساق.', 'جلو راندن باسن در قفل.']
      },
      commonMistakes: {
        en: ['Bar floating forward away from body.'],
        fa: ['دور شدن هالتر از بدن.']
      },
      breathing: {
        en: 'Inhale and brace core at top, exhale thrusting hips forward.',
        fa: 'دم عمیق و انقباض شکم در شروع، بازدم هنگام جلو راندن لگن.'
      },
      formCues: {
        en: ['Imagine shutting a car door behind you with your glutes.'],
        fa: ['تصور کنید می‌خواهید با باسن خود در خودرو را پشت سرتان ببندید.']
      },
      tempo: '3-1-1-0',
      tempoDescription: {
        en: '3s down, 1s bottom stretch pause, 1s hip drive.',
        fa: '۳ ثانیه پایین، ۱ ثانیه مکث کششی، ۱ ثانیه جلو راندن باسن.'
      }
    },
    substitutes: ['seated_leg_curl', 'lying_leg_curl']
  },
  {
    id: 'lying_leg_curl',
    name: {
      en: 'Lying Leg Curl (Prone Hamstring Curl)',
      fa: 'پشت‌پا خوابیده با دستگاه'
    },
    muscleGroup: 'Hamstrings',
    targetMuscle: 'hamstrings',
    type: 'isolation',
    equipment: 'machine',
    difficulty: 'beginner',
    movementPattern: 'pull',
    primaryMuscles: ['Biceps Femoris', 'Semitendinosus', 'Semimembranosus'],
    secondaryMuscles: ['calves'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Lie prone with knee joints aligned with machine pivot point.',
        'Place ankle pad against lower calf just above heels.',
        'Hold front handles, keeping hips pressed firmly into bench.',
        'Curl heels upward toward glutes, holding 1-second peak squeeze.',
        'Lower weight under 3-second control to full knee extension.'
      ],
      fa: [
        'روی شکم بخوابید و مفصل زانو را هم‌تراز با محور چرخش دستگاه تنظیم کنید.',
        'بالشتک مچ را بالای پاشنه‌ها قرار دهید.',
        'دستگیره‌های جلو را بگیرید و لگن را محکم به نیمکت بفشارید.',
        'پاشنه‌ها را به سمت باسن بالا بکشید و ۱ ثانیه در اوج انقباض نگه دارید.',
        'در ۳ ثانیه با کنترل کامل تا باز شدن کامل زانوها پایین ببرید.'
      ]
    },
    commonMistakes: {
      en: ['Lifting hips high off bench when curling.', 'Swinging weight dynamically.'],
      fa: ['بلند شدن لگن از روی نیمکت حین بالا کشیدن وزنه.', 'پرتاب ضربه‌ای پاها.']
    },
    progressionOptions: {
      regression: 'lying_leg_curl',
      progression: 'seated_leg_curl',
      alternatives: ['seated_leg_curl', 'romanian_deadlift_rdl']
    },
    gifUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=1Tq3QdYUuHs',
    youtubeId: '1Tq3QdYUuHs',
    youtubeTitle: 'Lying Leg Curl Form Guide - Hamstring Hypertrophy',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 75,
    guide: {
      steps: {
        en: ['Hips pressed down.', 'Curl heels to glutes.', '1s hard squeeze at peak.', '3s negative.'],
        fa: ['لگن چسبیده به تخت.', 'بالا کشیدن پاشنه به باسن.', '۱ ثانیه انقباض در اوج.', '۳ ثانیه فرود.']
      },
      commonMistakes: {
        en: ['Hips bucking up.'],
        fa: ['بلند شدن باسن.']
      },
      breathing: {
        en: 'Exhale curling up, inhale extending down.',
        fa: 'بازدم هنگام بالا کشیدن، دم هنگام پایین بردن.'
      },
      formCues: {
        en: ['Keep hips glued into the bench throughout.'],
        fa: ['لگن را در تمام طول ست به نیمکت بچسبانید.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s down, 1s up, 1s squeeze.',
        fa: '۳ ثانیه پایین، ۱ ثانیه بالا، ۱ ثانیه انقباض.'
      }
    },
    substitutes: ['seated_leg_curl', 'romanian_deadlift_rdl']
  },
  {
    id: 'seated_leg_curl',
    name: {
      en: 'Seated Leg Curl (Loaded Stretch Position)',
      fa: 'پشت‌پا نشسته با دستگاه (بیشترین رشد عضله پشت ران)'
    },
    muscleGroup: 'Hamstrings',
    targetMuscle: 'hamstrings',
    type: 'isolation',
    equipment: 'machine',
    difficulty: 'beginner',
    movementPattern: 'pull',
    primaryMuscles: ['Hamstrings (Biceps Femoris, Semitendinosus)'],
    secondaryMuscles: ['calves'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Sit with back against backrest, secure thigh pad down tightly against quadriceps.',
        'Ankle pad rests on Achilles tendon.',
        'Curl heels underneath seat to full knee flexion, squeezing hamstrings hard.',
        'Control back up to full stretch over 3 seconds (science shows seated curl produces superior hypertrophy due to lengthened hamstring position).'
      ],
      fa: [
        'پشت را به تکیه‌گاه بچسبانید و بالشتک ران را محکم روی چهارسر قفل کنید.',
        'غلتک مچ را پشت تاندون آشیل قرار دهید.',
        'پاشنه‌ها را به زیر صندلی بکشید تا زانو کاملاً خم شود و پشت ران را فشرده کنید.',
        'در ۳ ثانیه به آرامی بالا برگردید تا کشش کامل ایجاد شود (مطالعات نشان داده فرم نشسته بیشترین هایپرتروفی را به همراه دارد).'
      ]
    },
    commonMistakes: {
      en: ['Loose thigh clamp allowing pelvis to slide forward.'],
      fa: ['شل بستن گیره ران که باعث سُر خوردن باسن به جلو می‌شود.']
    },
    progressionOptions: {
      regression: 'lying_leg_curl',
      progression: 'romanian_deadlift_rdl',
      alternatives: ['lying_leg_curl', 'romanian_deadlift_rdl']
    },
    gifUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=Orxowest56U',
    youtubeId: 'Orxowest56U',
    youtubeTitle: 'Why Seated Leg Curls Beat Lying Leg Curls - Jeff Nippard',
    defaultSets: 4,
    defaultReps: '10-12',
    defaultRestSec: 75,
    guide: {
      steps: {
        en: ['Clamp thighs down tight.', 'Curl heels under seat.', 'Slow 3-second loaded stretch return.'],
        fa: ['قفل محکم ران‌ها.', 'کشیدن پاشنه زیر صندلی.', '۳ ثانیه بازگشت در کشش عمیق.']
      },
      commonMistakes: {
        en: ['Rushing the eccentric stretch.'],
        fa: ['سریع رها کردن وزنه در فاز منفی.']
      },
      breathing: {
        en: 'Exhale curling under, inhale extending up.',
        fa: 'بازدم در کشیدن به زیر، دم در بالا آمدن.'
      },
      formCues: {
        en: ['Lean slightly forward to maximize hamstring stretch.'],
        fa: ['اندکی به جلو متمایل شوید تا کشش پشت ران به اوج برسد.']
      },
      tempo: '3-1-1-1',
      tempoDescription: {
        en: '3s return, 1s top stretch, 1s curl, 1s squeeze.',
        fa: '۳ ثانیه برگشت، ۱ ثانیه کشش، ۱ ثانیه خم کردن، ۱ ثانیه انقباض.'
      }
    },
    substitutes: ['lying_leg_curl', 'romanian_deadlift_rdl']
  },
  {
    id: 'glute_ham_raise',
    name: {
      en: 'Glute-Ham Raise (GHR)',
      fa: 'گلوت هام ریز (GHR) با دستگاه تخصصی'
    },
    muscleGroup: 'Hamstrings',
    targetMuscle: 'hamstrings',
    type: 'compound',
    equipment: 'bodyweight',
    difficulty: 'advanced',
    movementPattern: 'hinge',
    primaryMuscles: ['Hamstrings', 'Gluteus Maximus', 'Erector Spinae'],
    secondaryMuscles: ['calves'],
    injuryRiskLevel: 'medium',
    instructions: {
      en: [
        'Secure ankles in GHD machine foot rollers with thighs resting on curved pad.',
        'Lower torso and thighs forward until body is horizontal to floor.',
        'Flex hamstrings and knees to pull torso upward into kneeling position.',
        'Maintain rigid neutral spine throughout.'
      ],
      fa: [
        'مچ پاها را در فوم‌های دستگاه GHD محکم کنید و ران‌ها را روی بالشتک بگذارید.',
        'بالاتنه را به آرامی به جلو پایین بیاورید تا بدن موازی زمین شود.',
        'با انقباض شدید عضلات پشت ران و زانو، بالاتنه را به بالا بکشید.',
        'ستون فقرات را کاملاً صاف و محکم نگه دارید.'
      ]
    },
    commonMistakes: {
      en: ['Bending at hips excessively before using hamstrings.'],
      fa: ['خم شدن بیش از حد از لگن قبل از درگیر کردن پشت پا.']
    },
    progressionOptions: {
      regression: 'seated_leg_curl',
      progression: 'glute_ham_raise',
      alternatives: ['romanian_deadlift_rdl', 'seated_leg_curl']
    },
    gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=lqb_l6xTq54',
    youtubeId: 'lqb_l6xTq54',
    youtubeTitle: 'Glute Ham Raise (GHR) Execution Guide',
    defaultSets: 3,
    defaultReps: '6-10',
    defaultRestSec: 90,
    guide: {
      steps: {
        en: ['Lower body horizontally.', 'Pull up through hamstrings.', 'Control descent.'],
        fa: ['فرود افقی بالاتنه.', 'بالا کشیدن با پشت ران.', 'فرود کنترل‌شده.']
      },
      commonMistakes: {
        en: ['Dropping uncontrolled.'],
        fa: ['سقوط بدون کنترل.']
      },
      breathing: {
        en: 'Inhale lowering, exhale pulling up.',
        fa: 'دم در پایین رفتن، بازدم در بالا کشیدن.'
      },
      formCues: {
        en: ['Drive your knees into the pad to pull your body up.'],
        fa: ['زانوها را به داخل پد فشار دهید تا بدن بالا کشیده شود.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s down, 1s up, 1s hold.',
        fa: '۳ ثانیه فرود، ۱ ثانیه صعود، ۱ ثانیه مکث.'
      }
    },
    substitutes: ['seated_leg_curl', 'romanian_deadlift_rdl']
  },

  // GLUTES
  {
    id: 'hip_thrust',
    name: {
      en: 'Barbell Hip Thrust',
      fa: 'هیپ تراست با هالتر (سلطان تقویت باسن)'
    },
    muscleGroup: 'Glutes',
    targetMuscle: 'glutes',
    type: 'compound',
    equipment: 'barbell',
    difficulty: 'intermediate',
    movementPattern: 'hinge',
    primaryMuscles: ['Gluteus Maximus'],
    secondaryMuscles: ['hamstrings', 'core'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Sit on floor with upper back against sturdy flat bench, bar rolled over hips with thick pad.',
        'Place feet flat on floor shoulder-width apart, knees at 90 degrees at top of lockout.',
        'Drive through heels and thrust hips vertically toward ceiling until thighs and torso form straight line.',
        'Keep chin tucked looking forward (never look at ceiling to avoid lumbar hyperextension).',
        'Hold peak contraction for 1 full second, lower under 2-second control.'
      ],
      fa: [
        'روی زمین بنشینید و تیغه شانه‌ها را به لبه نیمکت تکیه دهید؛ پد ضخیم را دور هالتر قرار داده و روی لگن بگذارید.',
        'کف پاها به عرض شانه و زانوها در اوج حرکت در زاویه ۹۰ درجه قرار گیرند.',
        'با فشار پاشنه پاها، لگن را با قدرت به سمت سقف بلند کنید تا ران و بالاتنه کاملاً صاف شوند.',
        'چانه را به داخل قفل کرده و به روبرو نگاه کنید (به سقف نگاه نکنید تا کمر گود نشود).',
        '۱ ثانیه کامل در اوج باسن را منقبض نگه داشته و در ۲ ثانیه پایین بیایید.'
      ]
    },
    commonMistakes: {
      en: ['Hyperextending lower back at the top.', 'Looking up at the ceiling.', 'Feet placed too far forward or back.'],
      fa: ['قوس بیش از حد در ناحیه کمر در نقطه اوج.', 'نگاه کردن به سقف که باعث آسیب ستون فقرات می‌شود.', 'فاصله بیش از حد نزدیک یا دور پاها.']
    },
    progressionOptions: {
      regression: 'hip_thrust',
      progression: 'hip_thrust',
      alternatives: ['bulgarian_split_squat', 'romanian_deadlift_rdl']
    },
    gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=xDmFkJxPzeM',
    youtubeId: 'xDmFkJxPzeM',
    youtubeTitle: 'How to Hip Thrust with Perfect Form - Bret Contreras',
    defaultSets: 4,
    defaultReps: '8-12',
    defaultRestSec: 90,
    guide: {
      steps: {
        en: ['Shoulder blades on bench.', 'Drive through heels.', 'Chin tucked looking forward.', '1s hard lockout squeeze.'],
        fa: ['تیغه شانه روی نیمکت.', 'فشار از پاشنه پا.', 'چانه به داخل و نگاه به جلو.', '۱ ثانیه انقباض در اوج.']
      },
      commonMistakes: {
        en: ['Hyperextending lumbar spine.'],
        fa: ['قوس دادن شدید به کمر.']
      },
      breathing: {
        en: 'Inhale at bottom, exhale driving hips upward.',
        fa: 'دم در پایین، بازدم هنگام لیفت لگن به بالا.'
      },
      formCues: {
        en: ['Keep ribs down and chin tucked into your chest.'],
        fa: ['دنده‌ها را پایین و چانه را به سینه نزدیک نگه دارید.']
      },
      tempo: '2-0-1-1',
      tempoDescription: {
        en: '2s down, 1s up, 1s peak glute contraction hold.',
        fa: '۲ ثانیه فرود، ۱ ثانیه صعود، ۱ ثانیه انقباض در اوج.'
      }
    },
    substitutes: ['bulgarian_split_squat', 'romanian_deadlift_rdl']
  },
  {
    id: 'bulgarian_split_squat',
    name: {
      en: 'Bulgarian Split Squat',
      fa: 'اسکات بلغاری با دمبل (اسپلیت اسکات پا به عقب)'
    },
    muscleGroup: 'Glutes',
    targetMuscle: 'glutes',
    type: 'compound',
    equipment: 'dumbbell',
    difficulty: 'advanced',
    movementPattern: 'squat',
    primaryMuscles: ['Gluteus Maximus', 'Quadriceps'],
    secondaryMuscles: ['hamstrings', 'calves', 'core'],
    injuryRiskLevel: 'medium',
    instructions: {
      en: [
        'Stand roughly 2 feet in front of bench, place top of rear foot flat on bench behind you.',
        'Hold dumbbells at sides with slight forward torso tilt (30 degrees) to bias glute fibers.',
        'Descend under 3-second control until front thigh is parallel to floor and rear knee hovers above floor.',
        'Drive through front midfoot and heel to return to top.'
      ],
      fa: [
        'حدود ۶۰ سانتی‌متر جلوتر از نیمکت بایستید و روی پای عقب را روی نیمکت بگذارید.',
        'دمبل‌ها را در دست گرفته و بالاتنه را ۳۰ درجه به سمت جلو شیب دهید تا تمرکز روی عضلات باسن قرار گیرد.',
        'در ۳ ثانیه با کنترل کامل پایین بیایید تا ران پای جلو موازی زمین شود و زانوی عقب نزدیک زمین برسد.',
        'با فشار محکم پاشنه و کف پای جلو به بالا بازگردید.'
      ]
    },
    commonMistakes: {
      en: ['Staying too vertical (transfers load exclusively to quad and patellar tendon).', 'Knee valgus.'],
      fa: ['صاف و عمود ایستادن که فشار را فقط به کشکک زانو وارد می‌کند.', 'انحراف زانو به سمت داخل.']
    },
    progressionOptions: {
      regression: 'reverse_lunge',
      progression: 'bulgarian_split_squat',
      alternatives: ['walking_lunges', 'hip_thrust', 'reverse_lunge']
    },
    gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE',
    youtubeId: '2C-uNgKwPLE',
    youtubeTitle: 'Bulgarian Split Squat Form: Maximize Glute Activation',
    defaultSets: 3,
    defaultReps: '8-10 per leg',
    defaultRestSec: 90,
    guide: {
      steps: {
        en: ['Rear foot on bench.', 'Slight forward torso lean.', 'Deep descent.', 'Drive through front heel.'],
        fa: ['پای عقب روی نیمکت.', 'شیب ملایم بالاتنه به جلو.', 'فرود عمیق.', 'فشار از پاشنه پای جلو.']
      },
      commonMistakes: {
        en: ['Front knee caving inward.'],
        fa: ['انحراف زانو به داخل.']
      },
      breathing: {
        en: 'Inhale down, exhale driving up.',
        fa: 'دم در فرود، بازدم در صعود.'
      },
      formCues: {
        en: ['Push your hips slightly back as you drop into the squat.'],
        fa: ['حین فرود لگن را اندکی به سمت عقب هدایت کنید.']
      },
      tempo: '3-0-1-0',
      tempoDescription: {
        en: '3s down, 1s up.',
        fa: '۳ ثانیه پایین، ۱ ثانیه بالا.'
      }
    },
    substitutes: ['reverse_lunge', 'walking_lunges']
  },

  // CALVES
  {
    id: 'standing_calf_raise',
    name: {
      en: 'Standing Machine Calf Raise',
      fa: 'ساق پا ایستاده با دستگاه (تمرکز بر گاستروکنمیوس)'
    },
    muscleGroup: 'Calves',
    targetMuscle: 'calves',
    type: 'isolation',
    equipment: 'machine',
    difficulty: 'beginner',
    movementPattern: 'carry',
    primaryMuscles: ['Gastrocnemius'],
    secondaryMuscles: ['Soleus'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Rest shoulder pads across shoulders with knees locked in straight extension (straight knee activates gastrocnemius).',
        'Balls of feet on platform, drop heels into deep stretch below platform level (hold 2 seconds to dissipate Achilles elastic bounce).',
        'Drive onto toes as high as possible into peak plantarflexion, squeeze calves hard for 1 second.',
        'Lower under 3-second control back to deep stretch.'
      ],
      fa: [
        'بالشتک‌های دستگاه را روی شانه قرار داده و زانوها را کاملاً صاف نگه دارید (زانوی صاف ماهیچه دوقلو را فعال می‌کند).',
        'سینه پنجه روی لبه پله، پاشنه‌ها را به آرامی به زیر لبه پله فرود آورید (۲ ثانیه مکث کنید تا خاصیت ارتجاعی تاندون آشیل خنثی شود).',
        'با بیشترین قدرت روی نوک انگشتان بلند شوید و ۱ ثانیه انقباض شدید ایجاد کنید.',
        'در ۳ ثانیه کنترل‌شده به پایین‌ترین کشش بازگردید.'
      ]
    },
    commonMistakes: {
      en: ['Bouncing fast off bottom using Achilles tendon elasticity instead of muscular contraction.', 'Bending knees.'],
      fa: ['ضربه زدن و فنر شدن سریع در پایین با استفاده از تاندون آشیل.', 'خم کردن زانوها.']
    },
    progressionOptions: {
      regression: 'seated_calf_raise',
      progression: 'standing_calf_raise',
      alternatives: ['seated_calf_raise']
    },
    gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=gwLzBJYoWlI',
    youtubeId: 'gwLzBJYoWlI',
    youtubeTitle: 'Standing Calf Raise: How To Build Stubborn Calves',
    defaultSets: 4,
    defaultReps: '12-15',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Knees straight.', '2s deep stretch pause at bottom.', 'Rise high on big toes.', '1s contraction.'],
        fa: ['زانوها کاملاً صاف.', '۲ ثانیه مکث کششی در پایین.', 'بلند شدن روی نوک شست پا.', '۱ ثانیه انقباض.']
      },
      commonMistakes: {
        en: ['Bouncing out of bottom.'],
        fa: ['ضربه زدن و ریتم تند غیرمجاز.']
      },
      breathing: {
        en: 'Exhale rising up, inhale lowering down.',
        fa: 'بازدم هنگام بلند شدن، دم هنگام فرود.'
      },
      formCues: {
        en: ['Drive specifically through the ball of the big toe.'],
        fa: ['فشار صعود را مستقیماً از سینه شست پا وارد کنید.']
      },
      tempo: '3-2-1-1',
      tempoDescription: {
        en: '3s descent, 2s dead stretch pause, 1s raise, 1s peak squeeze.',
        fa: '۳ ثانیه فرود، ۲ ثانیه مکث در کشش کامل، ۱ ثانیه صعود، ۱ ثانیه انقباض در اوج.'
      }
    },
    substitutes: ['seated_calf_raise']
  },
  {
    id: 'seated_calf_raise',
    name: {
      en: 'Seated Machine Calf Raise',
      fa: 'ساق پا نشسته با دستگاه (تمرکز بر عضله نعلی / Soleus)'
    },
    muscleGroup: 'Calves',
    targetMuscle: 'calves',
    type: 'isolation',
    equipment: 'machine',
    difficulty: 'beginner',
    movementPattern: 'carry',
    primaryMuscles: ['Soleus'],
    secondaryMuscles: ['Gastrocnemius'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Sit with knees bent at 90 degrees under thigh pads (bent knee slackens gastrocnemius, isolating soleus muscle).',
        'Balls of feet on foot bar, lower heels into deep stretch.',
        'Press balls of feet to raise heels as high as possible, squeezing soleus at top.',
        'Lower under 3-second control.'
      ],
      fa: [
        'بنشینید و زانوها در زاویه ۹۰ درجه زیر بالشتک ران قرار گیرد (زاویه ۹۰ درجه زانو، عضله دوقلو را شل کرده و تمرکز را روی عضله نعلی می‌گذارد).',
        'سینه پنجه روی لبه، پاشنه‌ها را در کشش کامل پایین ببرید.',
        'با فشار پنجه، پاشنه‌ها را تا بالاترین حد بالا بیاورید و عضله نعلی را منقبض کنید.',
        'در ۳ ثانیه با کنترل کامل فرود آیید.'
      ]
    },
    commonMistakes: {
      en: ['Bouncing weights rapidly.'],
      fa: ['فنری زدن و حرکات کوتاه ضربه‌ای.']
    },
    progressionOptions: {
      regression: 'seated_calf_raise',
      progression: 'standing_calf_raise',
      alternatives: ['standing_calf_raise']
    },
    gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=JbyjNymZOt0',
    youtubeId: 'JbyjNymZOt0',
    youtubeTitle: 'Seated Calf Raise Form Guide - Soleus Muscle Hypertrophy',
    defaultSets: 3,
    defaultReps: '15-20',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Knees at 90 degrees.', 'Full stretch at bottom.', 'High peak elevation.'],
        fa: ['زانوها در ۹۰ درجه.', 'کشش کامل در پایین.', 'صعود تا بالاترین اوج.']
      },
      commonMistakes: {
        en: ['Rushing reps without pause.'],
        fa: ['انجام تکرارهای سرعتی بدون مکث.']
      },
      breathing: {
        en: 'Exhale raising, inhale lowering.',
        fa: 'بازدم در صعود، دم در فرود.'
      },
      formCues: {
        en: ['Feel the deep burn in the lower calf.'],
        fa: ['سوزش عمیق بخش پایینی و عمقی ساق را حس کنید.']
      },
      tempo: '3-1-1-1',
      tempoDescription: {
        en: '3s down, 1s stretch, 1s up, 1s hold.',
        fa: '۳ ثانیه پایین، ۱ ثانیه کشش، ۱ ثانیه بالا، ۱ ثانیه مکث.'
      }
    },
    substitutes: ['standing_calf_raise']
  }
];
