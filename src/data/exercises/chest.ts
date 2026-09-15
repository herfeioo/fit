import { Exercise } from '../../types';

export const chestExercises: Exercise[] = [
  {
    id: 'barbell_bench_press',
    name: {
      en: 'Barbell Flat Bench Press',
      fa: 'پرس سینه هالتر روی نیمکت صاف'
    },
    muscleGroup: 'Chest',
    targetMuscle: 'chest',
    type: 'compound',
    equipment: 'barbell',
    difficulty: 'intermediate',
    movementPattern: 'push',
    primaryMuscles: ['Pectoralis Major (Sternal Head)', 'Pectoralis Major (Clavicular Head)'],
    secondaryMuscles: ['triceps', 'shoulders'],
    injuryRiskLevel: 'medium',
    instructions: {
      en: [
        'Lie flat on bench with eyes directly under racked bar.',
        'Grip slightly wider than shoulder-width; retract and depress scapulae.',
        'Unrack bar, stabilize directly over mid-chest.',
        'Lower bar under 3-second control to lower chest line with elbows at 45–60 degrees.',
        'Drive bar explosively up and slightly back toward eye level without losing scapular tightness.'
      ],
      fa: [
        'روی نیمکت صاف طوری دراز بکشید که چشم‌ها زیر هالتر قرار گیرد.',
        'دست‌ها را کمی بازتر از عرض شانه بگیرید؛ کتف‌ها را به عقب و پایین منقبض و قفل کنید.',
        'هالتر را با کنترل کامل و در ۳ ثانیه به آرامی روی خط نوک سینه پایین بیاورید.',
        'آرنج‌ها را در زاویه ۴۵ تا ۶۰ درجه حفظ کرده و از باز شدن ۹۰ درجه پرهیز کنید.',
        'با انقباض قدرتمند سینه، هالتر را با سرعت به بالا پرس کنید.'
      ]
    },
    commonMistakes: {
      en: [
        'Flaring elbows outward at 90 degrees causing anterior shoulder impingement.',
        'Bouncing bar violently off the sternum.',
        'Lifting buttocks off the bench.'
      ],
      fa: [
        'باز کردن بیش از حد آرنج‌ها با زاویه ۹۰ درجه که به شانه آسیب می‌زند.',
        'کوبیدن و پرتاب هالتر از روی قفسه سینه به جای مکث کنترل‌شده.',
        'بلند کردن باسن از روی نیمکت حین پرس سنگین.'
      ]
    },
    progressionOptions: {
      regression: 'dumbbell_bench_press',
      progression: 'incline_barbell_bench_press',
      alternatives: ['machine_chest_press', 'dumbbell_bench_press', 'dips_chest_focus']
    },
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=4Y2ZdHCOXok',
    youtubeId: '4Y2ZdHCOXok',
    youtubeTitle: 'How To Bench Press For Maximum Chest Growth - Jeff Nippard',
    defaultSets: 4,
    defaultReps: '6-8',
    defaultRestSec: 120,
    guide: {
      steps: {
        en: [
          'Lie flat on bench with eyes positioned directly under the racked bar.',
          'Grip bar slightly wider than shoulder-width; retract and depress scapulae.',
          'Unrack bar, stabilize over sternum with wrists stacked directly over elbows.',
          'Lower bar under control (3 seconds) to lower chest line, tucking elbows at roughly 45 degrees.',
          'Press bar forcefully up and slightly back toward your eye level.'
        ],
        fa: [
          'روی نیمکت صاف طوری دراز بکشید که چشم‌ها مستقیماً زیر میله هالتر قرار گیرند.',
          'میله را با فاصله‌ای کمی بازتر از عرض شانه بگیرید؛ تیغه‌های شانه را به عقب و پایین منقبض کنید.',
          'هالتر را از پایه جدا کرده و مچ دست‌ها را کاملاً روی آرنج‌ها قفل نگه دارید.',
          'هالتر را با کنترل کامل روی خط پایین سینه پایین بیاورید.',
          'با انقباض عضلات سینه، هالتر را با قدرت به سمت بالا پرس کنید.'
        ]
      },
      commonMistakes: {
        en: ['Flaring elbows out at 90 degrees.', 'Bouncing the bar off the ribcage.'],
        fa: ['باز کردن آرنج‌ها با زاویه ۹۰ درجه.', 'پرتاب کردن و کوبیدن هالتر به قفسه سینه.']
      },
      breathing: {
        en: 'Inhale deep into abdomen (Valsalva) on descent; exhale past the sticking point.',
        fa: 'پیش از شروع فاز منفی، نفس عمیق شکمی کشیده و پس از عبور از نقطه ناتوانی بازدم کنید.'
      },
      formCues: {
        en: ['Drive feet firmly into the floor.', 'Think of bending the bar with your hands.'],
        fa: ['کف پاها را محکم به زمین فشار دهید.', 'تصور کنید می‌خواهید میله هالتر را خم کنید.']
      },
      tempo: '3-1-1-0',
      tempoDescription: {
        en: '3 sec descent, 1 sec light chest touch pause, 1 sec explosive drive.',
        fa: '۳ ثانیه پایین آمدن کنترل‌شده، ۱ ثانیه مکث روی سینه، ۱ ثانیه بالا بردن انفجاری.'
      }
    },
    substitutes: ['dumbbell_bench_press', 'machine_chest_press', 'dips_chest_focus']
  },
  {
    id: 'incline_barbell_bench_press',
    name: {
      en: 'Incline Barbell Bench Press',
      fa: 'پرس بالاسینه هالتر'
    },
    muscleGroup: 'Chest',
    targetMuscle: 'chest',
    type: 'compound',
    equipment: 'barbell',
    difficulty: 'intermediate',
    movementPattern: 'push',
    primaryMuscles: ['Pectoralis Major (Clavicular Head - Upper Chest)'],
    secondaryMuscles: ['shoulders', 'triceps'],
    injuryRiskLevel: 'medium',
    instructions: {
      en: [
        'Set incline bench between 30 and 45 degrees (30 degrees optimal for upper chest activation).',
        'Retract scapulae and plant feet firmly.',
        'Unrack bar and stabilize over clavicles.',
        'Lower bar under control until it lightly touches upper chest/collarbone.',
        'Press upward in an arc back over eye level.'
      ],
      fa: [
        'شیب نیمکت را بین ۳۰ تا ۴۵ درجه تنظیم کنید (۳۰ درجه بیشترین تحریک بخش بالایی سینه را دارد).',
        'کتف‌ها را به عقب متمایل و کف پاها را روی زمین ثابت کنید.',
        'هالتر را جدا کرده و در ۳ ثانیه به نرمی تا بالای سینه و استخوان ترقوه پایین بیاورید.',
        'با تمرکز بر انقباض بخش بالایی سینه، وزنه را به بالا هدایت کنید.'
      ]
    },
    commonMistakes: {
      en: [
        'Setting bench too steep (over 45 degrees) which turns it into a front delt press.',
        'Dropping bar too low on the abdomen.'
      ],
      fa: [
        'شیب بیش از حد بالای نیمکت (بیش از ۴۵ درجه) که فشار را به سرشانه قدامی منتقل می‌کند.',
        'پایین آوردن هالتر روی شکم به جای بالای سینه.'
      ]
    },
    progressionOptions: {
      regression: 'incline_dumbbell_press',
      progression: 'barbell_bench_press',
      alternatives: ['incline_dumbbell_press', 'pec_deck_fly']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=0G2_XV7slIg',
    youtubeId: '0G2_XV7slIg',
    youtubeTitle: 'Incline Bench Press Technique Guide',
    defaultSets: 3,
    defaultReps: '8-10',
    defaultRestSec: 90,
    guide: {
      steps: {
        en: ['Set 30 degree incline.', 'Lower bar to upper chest.', 'Press with upper chest contraction.'],
        fa: ['شیب ۳۰ درجه تنظیم کنید.', 'هالتر را به آرامی تا بالای سینه فرود آورید.', 'با انقباض بخش فوقانی سینه بالا ببرید.']
      },
      commonMistakes: {
        en: ['Incline too steep.', 'Elbows flaring.'],
        fa: ['زاویه شیب بیش از حد تند.', 'باز شدن آرنج‌ها به طرفین.']
      },
      breathing: {
        en: 'Inhale on descent, exhale on drive.',
        fa: 'هنگام پایین آمدن دم، هنگام پرس بالا بازدم.'
      },
      formCues: {
        en: ['Lead with the upper clavicular chest fibers.', 'Keep forearms vertical.'],
        fa: ['تمرکز روی فیبرهای بالایی سینه باشد.', 'ساعدها عمود بر زمین بمانند.']
      },
      tempo: '3-0-1-0',
      tempoDescription: {
        en: '3s down, 0s pause, 1s up.',
        fa: '۳ ثانیه پایین، بدون مکث، ۱ ثانیه بالا.'
      }
    },
    substitutes: ['incline_dumbbell_press', 'cable_crossover_low']
  },
  {
    id: 'decline_barbell_bench_press',
    name: {
      en: 'Decline Barbell Bench Press',
      fa: 'پرس زیرسینه هالتر'
    },
    muscleGroup: 'Chest',
    targetMuscle: 'chest',
    type: 'compound',
    equipment: 'barbell',
    difficulty: 'intermediate',
    movementPattern: 'push',
    primaryMuscles: ['Pectoralis Major (Costal Head - Lower Chest)'],
    secondaryMuscles: ['triceps', 'shoulders'],
    injuryRiskLevel: 'medium',
    instructions: {
      en: [
        'Secure legs firmly in decline bench foot rollers.',
        'Grip bar with shoulder-width plus one hand-width distance.',
        'Unrack bar and lower under control to lower sternum.',
        'Press vertically until arms extend without hyperextending elbows.'
      ],
      fa: [
        'ساق پاها را داخل فوم‌های نیمکت شیب منفی محکم قفل کنید.',
        'میله را به فاصله عرض شانه به علاوه یک وجب بگیرید.',
        'هالتر را با کنترل کامل به سمت پایین قفسه سینه هدایت کنید.',
        'با انقباض بخش زیرین سینه، میله را با قدرت به بالا هدایت نمایید.'
      ]
    },
    commonMistakes: {
      en: ['Bouncing bar off ribs', 'Not securing feet safely in the anchors.'],
      fa: ['کوبیدن هالتر به استخوان جناغ', 'محکم قفل نکردن پاها در قلاب نیمکت.']
    },
    progressionOptions: {
      regression: 'dips_chest_focus',
      progression: 'barbell_bench_press',
      alternatives: ['dips_chest_focus', 'cable_chest_flyes']
    },
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=LfyQBUKR8SE',
    youtubeId: 'LfyQBUKR8SE',
    youtubeTitle: 'Decline Bench Press for Lower Chest - Form Breakdown',
    defaultSets: 3,
    defaultReps: '8-12',
    defaultRestSec: 90,
    guide: {
      steps: {
        en: ['Lock legs on decline bench.', 'Lower bar to bottom of chest.', 'Press with lower chest focus.'],
        fa: ['پاها را در نیمکت شیب منفی محکم کنید.', 'هالتر را به پایین سینه پایین آورید.', 'با تمرکز روی زیرسینه بالا ببرید.']
      },
      commonMistakes: {
        en: ['Losing grip control due to blood rush.'],
        fa: ['عدم تسلط به گیرش به دلیل شیب معکوس.']
      },
      breathing: {
        en: 'Controlled inhale down, exhale up.',
        fa: 'دم کنترل‌شده در پایین، بازدم قدرتی در بالا.'
      },
      formCues: {
        en: ['Keep lower chest tight.'],
        fa: ['سفتی عضلات زیرسینه را حفظ کنید.']
      },
      tempo: '3-0-1-0',
      tempoDescription: {
        en: '3s down, 1s up.',
        fa: '۳ ثانیه پایین، ۱ ثانیه بالا.'
      }
    },
    substitutes: ['dips_chest_focus', 'cable_chest_flyes']
  },
  {
    id: 'dumbbell_bench_press',
    name: {
      en: 'Flat Dumbbell Press',
      fa: 'پرس سینه دمبل روی نیمکت صاف'
    },
    muscleGroup: 'Chest',
    targetMuscle: 'chest',
    type: 'compound',
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    movementPattern: 'push',
    primaryMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['triceps', 'shoulders'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Sit with dumbbells resting vertically on knees, then kick back onto flat bench.',
        'Plant feet firmly, engage core, and set dumbbells at chest level angled at 45 degrees.',
        'Press dumbbells upward in a convergence arc without clacking weights at top.',
        'Lower with deep stretch for 3 seconds into chest fibers.'
      ],
      fa: [
        'دمبل‌ها را روی سر زانوها قرار داده و با حرکت زانو به عقب روی نیمکت بخوابید.',
        'کف پاها روی زمین و زاویه دمبل‌ها نسبت به تنه ۴۵ درجه باشد.',
        'دمبل‌ها را به سمت بالا با انقباض سینه هدایت کنید بدون اینکه دمبل‌ها در بالا به هم برخورد کنند.',
        'در فاز منفی به آرامی پایین بیاورید تا کشش کامل روی تارها احساس شود.'
      ]
    },
    commonMistakes: {
      en: ['Clacking dumbbells together at the top reducing tension.', 'Excessive wrist bending.'],
      fa: ['کوبیدن دمبل‌ها به یکدیگر در بالای حرکت.', 'خم شدن مچ دست به سمت عقب.']
    },
    progressionOptions: {
      regression: 'machine_chest_press',
      progression: 'barbell_bench_press',
      alternatives: ['barbell_bench_press', 'machine_chest_press']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=VmB1G1K7v94',
    youtubeId: 'VmB1G1K7v94',
    youtubeTitle: 'Dumbbell Bench Press Biomechanics & Form',
    defaultSets: 4,
    defaultReps: '8-10',
    defaultRestSec: 90,
    guide: {
      steps: {
        en: ['Kick dumbbells back to starting position.', 'Press dumbbells along slight convergent arc.', 'Lower under deep stretch.'],
        fa: ['دمبل‌ها را به نقطه شروع بیاورید.', 'دمبل‌ها را در یک کمان ملایم بالا ببرید.', 'با کشش عمیق پایین بیاورید.']
      },
      commonMistakes: {
        en: ['Dropping dumbbells abruptly.', 'Over-arching lower back.'],
        fa: ['رها کردن ناگهانی دمبل‌ها.', 'قوس دادن بیش از حد به کمر.']
      },
      breathing: {
        en: 'Inhale deep on descent, exhale on drive.',
        fa: 'دم عمیق در فرود، بازدم در پرس بالا.'
      },
      formCues: {
        en: ['Feel chest stretch at the bottom.', 'Keep shoulder blades pinned to bench.'],
        fa: ['کشش عضلات سینه را در پایین حس کنید.', 'کتف‌ها به نیمکت فشرده بماند.']
      },
      tempo: '3-1-1-0',
      tempoDescription: {
        en: '3s descent, 1s deep stretch pause, 1s up.',
        fa: '۳ ثانیه فرود، ۱ ثانیه مکث کششی، ۱ ثانیه بالا.'
      }
    },
    substitutes: ['barbell_bench_press', 'machine_chest_press']
  },
  {
    id: 'incline_dumbbell_press',
    name: {
      en: 'Incline Dumbbell Press (30°)',
      fa: 'پرس بالاسینه با دمبل (شیب ۳۰ درجه)'
    },
    muscleGroup: 'Chest',
    targetMuscle: 'chest',
    type: 'compound',
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    movementPattern: 'push',
    primaryMuscles: ['Pectoralis Major (Clavicular Head)'],
    secondaryMuscles: ['shoulders', 'triceps'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Set bench to 30-degree incline.',
        'Kick dumbbells to shoulders, stabilize with elbows under wrists.',
        'Press dumbbells upward until fully contracted over upper chest.',
        'Lower slowly under 3-second negative to feel clavicular stretch.'
      ],
      fa: [
        'نیمکت را روی شیب ۳۰ درجه تنظیم کنید.',
        'دمبل‌ها را بالا آورده و آرنج‌ها را دقیقاً زیر مچ دست‌ها قرار دهید.',
        'دمبل‌ها را با تمرکز بر بالای سینه به سمت بالا هدایت کنید.',
        'در ۳ ثانیه کنترل‌شده پایین آورده تا کشش مطلوب ایجاد شود.'
      ]
    },
    commonMistakes: {
      en: ['Bench angle over 45 degrees', 'Over-converging at top causing loss of tension.'],
      fa: ['شیب بیش از ۴۵ درجه', 'بهم چسباندن دمبل‌ها در بالا و افت تنش عضلانی.']
    },
    progressionOptions: {
      regression: 'machine_chest_press',
      progression: 'incline_barbell_bench_press',
      alternatives: ['incline_barbell_bench_press', 'pec_deck_fly']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=8iPEnn-ltC8',
    youtubeId: '8iPEnn-ltC8',
    youtubeTitle: 'How to Incline Dumbbell Press For Upper Chest Growth',
    defaultSets: 3,
    defaultReps: '8-10',
    defaultRestSec: 90,
    guide: {
      steps: {
        en: ['Set 30-degree incline.', 'Lower to shoulder level.', 'Press up with upper chest squeeze.'],
        fa: ['شیب ۳۰ درجه.', 'فرود تا سطح شانه.', 'بالا بردن با انقباض بالای سینه.']
      },
      commonMistakes: {
        en: ['Incline too high.'],
        fa: ['شیب بیش از حد زیاد.']
      },
      breathing: {
        en: 'Inhale down, exhale up.',
        fa: 'دم در پایین، بازدم در بالا.'
      },
      formCues: {
        en: ['Maintain 45 degree arm angle to torso.'],
        fa: ['زاویه ۴۵ درجه دست نسبت به بالاتنه را حفظ کنید.']
      },
      tempo: '3-0-1-0',
      tempoDescription: {
        en: '3s down, 1s up.',
        fa: '۳ ثانیه پایین، ۱ ثانیه بالا.'
      }
    },
    substitutes: ['incline_barbell_bench_press', 'machine_chest_press']
  },
  {
    id: 'machine_chest_press',
    name: {
      en: 'Machine Chest Press',
      fa: 'پرس سینه با دستگاه'
    },
    muscleGroup: 'Chest',
    targetMuscle: 'chest',
    type: 'compound',
    equipment: 'machine',
    difficulty: 'beginner',
    movementPattern: 'push',
    primaryMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['triceps', 'shoulders'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Adjust seat height so handles align with mid-to-lower chest.',
        'Keep back and head flat against backrest with shoulder blades retracted.',
        'Press handles outward smoothly to full arm extension without locking joints hard.',
        'Return slowly allowing deep pectoral stretch.'
      ],
      fa: [
        'ارتفاع صندلی را طوری تنظیم کنید که دستگیره‌ها هم‌تراز با وسط سینه باشند.',
        'کتف‌ها را به تکیه‌گاه چسبانده و عقب نگه دارید.',
        'دستگیره‌ها را به جلو پرس کنید تا عضلات سینه کاملاً منقبض شوند.',
        'با کنترل کامل و آرام بازگردید تا کشش سینه حاصل شود.'
      ]
    },
    commonMistakes: {
      en: ['Allowing shoulders to round forward off backrest.', 'Seat set too low.'],
      fa: ['جدا شدن شانه‌ها از پشتی دستگاه هنگام پرس.', 'تنظیم ارتفاع صندلی بیش از حد پایین.']
    },
    progressionOptions: {
      regression: 'machine_chest_press',
      progression: 'barbell_bench_press',
      alternatives: ['dumbbell_bench_press', 'barbell_bench_press']
    },
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=xUm0BiZCWlQ',
    youtubeId: 'xUm0BiZCWlQ',
    youtubeTitle: 'Machine Chest Press Setup & Mistakes - Jeff Nippard',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 75,
    guide: {
      steps: {
        en: ['Adjust seat to mid-chest.', 'Drive outward smoothly.', 'Slow 3-second return.'],
        fa: ['تنظیم صندلی هم‌تراز وسط سینه.', 'پرس روان به جلو.', 'برگشت آرام ۳ ثانیه‌ای.']
      },
      commonMistakes: {
        en: ['Protracted shoulders at peak contraction.'],
        fa: ['خم کردن شانه‌ها به جلو در نقطه انتهایی.']
      },
      breathing: {
        en: 'Exhale forward, inhale on return.',
        fa: 'بازدم هنگام فشار به جلو، دم هنگام برگشت.'
      },
      formCues: {
        en: ['Keep chest proud and shoulders back.'],
        fa: ['سینه را رو به بالا و شانه‌ها را عقب نگه دارید.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s return, 1s press, 1s peak squeeze.',
        fa: '۳ ثانیه برگشت، ۱ ثانیه پرس، ۱ ثانیه انقباض در اوج.'
      }
    },
    substitutes: ['dumbbell_bench_press', 'barbell_bench_press']
  },
  {
    id: 'cable_chest_flyes',
    name: {
      en: 'Standing Cable Fly (Mid Angle)',
      fa: 'کراس‌اور با سیم‌کش (ارتفاع متوسط)'
    },
    muscleGroup: 'Chest',
    targetMuscle: 'chest',
    type: 'isolation',
    equipment: 'cable',
    difficulty: 'intermediate',
    movementPattern: 'push',
    primaryMuscles: ['Pectoralis Major (Sternal & Costal Heads)'],
    secondaryMuscles: ['shoulders'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Set pulleys to chest height.',
        'Take handles, step forward with staggered stance, slight bend in elbows.',
        'Bring hands together in a wide hugging motion, squeezing pecs hard at midline.',
        'Slowly allow cables to pull arms back into deep horizontal adduction stretch.'
      ],
      fa: [
        'قرقره‌ها را در ارتفاع وسط سینه تنظیم کنید.',
        'دستگیره‌ها را گرفته و یک پا به جلو بگذارید؛ آرنج‌ها اندکی خمیده باشد.',
        'دست‌ها را با حرکتی شبیه به در آغوش گرفتن درخت به هم نزدیک کنید و سینه را منقبض نمایید.',
        'به آرامی به عقب بازگردید تا کشش کامل روی تارها اعمال شود.'
      ]
    },
    commonMistakes: {
      en: ['Turning the fly into a press by excessively bending and extending elbows.', 'Using momentum.'],
      fa: ['تبدیل کردن فلای به پرس با خم و راست کردن آرنج‌ها.', 'استفاده از شتاب و پرتاب بدن.']
    },
    progressionOptions: {
      regression: 'pec_deck_fly',
      progression: 'dips_chest_focus',
      alternatives: ['pec_deck_fly', 'machine_chest_press']
    },
    gifUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=taI4XduLpBe',
    youtubeId: 'taI4XduLpBe',
    youtubeTitle: 'Cable Flyes For Chest Hypertrophy - Renaissance Periodization',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Slight elbow bend locked throughout.', 'Bring hands to midline.', 'Control the negative stretch.'],
        fa: ['خم ملایم آرنج در کل دامنه ثابت بماند.', 'دست‌ها را به خط وسط بدن برسانید.', 'فاز منفی و کشش را کنترل کنید.']
      },
      commonMistakes: {
        en: ['Bending elbows dynamically like a press.'],
        fa: ['خم کردن پویا در آرنج مانند حرکت پرسی.']
      },
      breathing: {
        en: 'Exhale bringing hands together, inhale on opening chest.',
        fa: 'بازدم هنگام به هم رساندن دست‌ها، دم هنگام باز شدن سینه.'
      },
      formCues: {
        en: ['Think of touching biceps to the sides of your chest.'],
        fa: ['تصور کنید می‌خواهید جلوبازوها را به کناره‌های سینه بچسبانید.']
      },
      tempo: '3-1-1-1',
      tempoDescription: {
        en: '3s open stretch, 1s bottom stretch pause, 1s bring together, 1s squeeze.',
        fa: '۳ ثانیه کشش، ۱ ثانیه مکث کششی، ۱ ثانیه جمع کردن، ۱ ثانیه انقباض در اوج.'
      }
    },
    substitutes: ['pec_deck_fly', 'dumbbell_bench_press']
  },
  {
    id: 'pec_deck_fly',
    name: {
      en: 'Pec Deck Machine Fly',
      fa: 'فلای سینه دستگاه (پک دک)'
    },
    muscleGroup: 'Chest',
    targetMuscle: 'chest',
    type: 'isolation',
    equipment: 'machine',
    difficulty: 'beginner',
    movementPattern: 'push',
    primaryMuscles: ['Pectoralis Major (Sternal Head)'],
    secondaryMuscles: ['shoulders'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Adjust seat so elbows and handles sit slightly below shoulder height.',
        'Place forearms against pads or grip handles with soft elbow bend.',
        'Squeeze handles together across midline, contracting chest hard for 1 full second.',
        'Return under control without allowing weights to crash.'
      ],
      fa: [
        'ارتفاع صندلی را طوری تنظیم کنید که دستگیره‌ها کمی پایین‌تر از شانه باشند.',
        'دستگیره‌ها را با انحنای ملایم در آرنج بگیرید.',
        'دست‌ها را به سمت جلوی قفسه سینه به هم نزدیک کرده و ۱ ثانیه کامل منقبض نگه دارید.',
        'با کنترل به آرامی باز شوید تا کشش ملایم و بی‌خطر روی عضلات سینه اعمال شود.'
      ]
    },
    commonMistakes: {
      en: ['Letting shoulders shrug up toward ears.', 'Allowing weights to smash together violently.'],
      fa: ['بالا انداختن شانه‌ها به سمت گوش‌ها.', 'رها کردن وزنه‌ها با ضربه در پایان ست.']
    },
    progressionOptions: {
      regression: 'pec_deck_fly',
      progression: 'cable_chest_flyes',
      alternatives: ['cable_chest_flyes', 'machine_chest_press']
    },
    gifUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=O-On_8a6sno',
    youtubeId: 'O-On_8a6sno',
    youtubeTitle: 'Pec Deck Fly Mistakes to Avoid For Chest Growth',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Sit back against pad.', 'Bring handles together with chest focus.', '1s contraction squeeze at peak.'],
        fa: ['پشت را به تکیه‌گاه بچسبانید.', 'دستگیره‌ها را با تمرکز سینه به هم برسانید.', '۱ ثانیه انقباض در اوج.']
      },
      commonMistakes: {
        en: ['Excessive hyperextension at bottom.'],
        fa: ['کشش بیش از حد مفصل شانه به عقب.']
      },
      breathing: {
        en: 'Exhale bringing hands together, inhale returning.',
        fa: 'بازدم در جمع کردن، دم در بازگشت.'
      },
      formCues: {
        en: ['Focus on moving humerus across chest.'],
        fa: ['تمرکز روی نزدیک کردن استخوان بازو به جلوی سینه باشد.']
      },
      tempo: '2-1-1-1',
      tempoDescription: {
        en: '2s open, 1s stretch, 1s close, 1s squeeze.',
        fa: '۲ ثانیه بازگشت، ۱ ثانیه کشش، ۱ ثانیه جمع کردن، ۱ ثانیه انقباض.'
      }
    },
    substitutes: ['cable_chest_flyes', 'machine_chest_press']
  },
  {
    id: 'dips_chest_focus',
    name: {
      en: 'Chest Dips (Forward Lean)',
      fa: 'پارالل برای عضلات سینه (با شیب بدن به جلو)'
    },
    muscleGroup: 'Chest',
    targetMuscle: 'chest',
    type: 'compound',
    equipment: 'bodyweight',
    difficulty: 'advanced',
    movementPattern: 'push',
    primaryMuscles: ['Pectoralis Major (Lower & Outer Fibers)'],
    secondaryMuscles: ['triceps', 'shoulders'],
    injuryRiskLevel: 'medium',
    instructions: {
      en: [
        'Mount parallel bars with arms locked and torso leaning forward roughly 30 degrees.',
        'Flaring elbows slightly wider than in triceps dips.',
        'Lower body until elbows reach roughly 90-degree bend and deep stretch is felt in pecs.',
        'Push upward through palms focusing on chest contraction, maintaining forward lean.'
      ],
      fa: [
        'روی میله‌های پارالل مستقر شوید و بالاتنه را حدود ۳۰ درجه به سمت جلو شیب دهید.',
        'آرنج‌ها را کمی بازتر از حالت پارالل پشت‌بازو هدایت کنید.',
        'بدن را تا جایی پایین بیاورید که زاویه آرنج‌ها به ۹۰ درجه برسد و کشش عمیق در عضلات سینه ایجاد شود.',
        'با فشار کف دست‌ها و انقباض عضلات سینه به بالا برگردید، در تمام طول حرکت شیب به جلو را حفظ کنید.'
      ]
    },
    commonMistakes: {
      en: ['Staying too upright (shifts load to triceps).', 'Dropping too low causing anterior shoulder capsule strain.'],
      fa: ['صاف و عمود نگه داشتن بدن (که فشار را به پشت‌بازو منتقل می‌کند).', 'فرود بیش از حد عمیق که کپسول جلوی شانه را تحت آسیب قرار می‌دهد.']
    },
    progressionOptions: {
      regression: 'decline_barbell_bench_press',
      progression: 'barbell_bench_press',
      alternatives: ['decline_barbell_bench_press', 'cable_chest_flyes']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=2z8JmcrW-As',
    youtubeId: '2z8JmcrW-As',
    youtubeTitle: 'How to Do Chest Dips with Proper Form',
    defaultSets: 3,
    defaultReps: '8-12',
    defaultRestSec: 90,
    guide: {
      steps: {
        en: ['Lean torso 30 degrees forward.', 'Lower to 90 degree elbow bend.', 'Push up through chest fibers.'],
        fa: ['شیب ۳۰ درجه بالاتنه به جلو.', 'پایین آمدن تا زاویه ۹۰ درجه آرنج.', 'بالا آمدن با انقباض سینه.']
      },
      commonMistakes: {
        en: ['Dropping shoulders lower than elbows.'],
        fa: ['پایین بردن شانه پایین‌تر از خط آرنج.']
      },
      breathing: {
        en: 'Inhale lowering down, exhale pressing up.',
        fa: 'دم در فرود، بازدم در صعود.'
      },
      formCues: {
        en: ['Keep chin tucked and torso pitched forward.'],
        fa: ['چانه را به داخل متمایل و شیب بالاتنه را به جلو حفظ کنید.']
      },
      tempo: '3-1-1-0',
      tempoDescription: {
        en: '3s down, 1s stretch pause, 1s up.',
        fa: '۳ ثانیه فرود، ۱ ثانیه مکث در کشش، ۱ ثانیه بالا آمدن.'
      }
    },
    substitutes: ['decline_barbell_bench_press', 'cable_chest_flyes']
  }
];
