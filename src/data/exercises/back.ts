import { Exercise } from '../../types';

export const backExercises: Exercise[] = [
  {
    id: 'pull_ups',
    name: {
      en: 'Pull-ups (Overhand Grip)',
      fa: 'بارفیکس دست باز (زیربغل)'
    },
    muscleGroup: 'Back',
    targetMuscle: 'back',
    type: 'compound',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    movementPattern: 'pull',
    primaryMuscles: ['Latissimus Dorsi', 'Teres Major'],
    secondaryMuscles: ['biceps', 'shoulders', 'core'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Grip pull-up bar slightly wider than shoulder width with overhand grip.',
        'Hang at full extension, initiate movement by depressing scapulae (pulling shoulder blades down).',
        'Drive elbows down and back toward ribs until chin clears bar comfortably.',
        'Lower under 3-second control to full dead-hang stretch.'
      ],
      fa: [
        'میله بارفیکس را با گیرش از رو و کمی بازتر از عرض شانه بگیرید.',
        'در حالت کشش کامل آویزان شوید؛ حرکت را با پایین کشیدن کتف‌ها آغاز کنید.',
        'آرنج‌ها را به سمت دنده‌ها به پایین و عقب بکشید تا چانه از میله عبور کند.',
        'با ۳ ثانیه فرود کنترل‌شده به حالت کشش اولیه بازگردید.'
      ]
    },
    commonMistakes: {
      en: ['Kicking legs or kipping for momentum.', 'Cutting range of motion short at bottom.'],
      fa: ['لگد زدن با پاها و تاب خوردن.', 'کامل نکردن دامنه در فاز منفی.']
    },
    progressionOptions: {
      regression: 'lat_pulldown',
      progression: 'barbell_bent_over_row',
      alternatives: ['lat_pulldown', 'close_grip_lat_pulldown']
    },
    gifUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
    youtubeId: 'eGo4IYlbE5g',
    youtubeTitle: 'How to Do Pullups With Perfect Form',
    defaultSets: 4,
    defaultReps: '6-10',
    defaultRestSec: 120,
    guide: {
      steps: {
        en: ['Grip bar slightly wider than shoulder width.', 'Depress scapulae first.', 'Pull elbows down to ribcage.'],
        fa: ['میله را بازتر از شانه بگیرید.', 'کتف را به پایین منقبض کنید.', 'آرنج‌ها را به سمت دنده‌ها بکشید.']
      },
      commonMistakes: {
        en: ['Kipping or swinging body.'],
        fa: ['تاب خوردن یا تکان دادن پاها.']
      },
      breathing: {
        en: 'Inhale at bottom stretch, exhale pulling up.',
        fa: 'دم در پایین، بازدم هنگام بالا کشیدن.'
      },
      formCues: {
        en: ['Think about driving elbows into your back pockets.'],
        fa: ['تصور کنید می‌خواهید آرنج‌ها را داخل جیب پشت شلوارتان ببرید.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s down, 0s pause, 1s pull, 1s top squeeze.',
        fa: '۳ ثانیه پایین، ۱ ثانیه بالا، ۱ ثانیه انقباض در اوج.'
      }
    },
    substitutes: ['lat_pulldown', 'close_grip_lat_pulldown']
  },
  {
    id: 'lat_pulldown',
    name: {
      en: 'Wide-Grip Lat Pulldown',
      fa: 'زیربغل سیم‌کش از جلو (دست باز)'
    },
    muscleGroup: 'Back',
    targetMuscle: 'back',
    type: 'compound',
    equipment: 'cable',
    difficulty: 'beginner',
    movementPattern: 'pull',
    primaryMuscles: ['Latissimus Dorsi', 'Teres Major'],
    secondaryMuscles: ['biceps', 'shoulders'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Secure thighs tightly under knee pads so pelvis cannot lift.',
        'Grip wide bar with thumbs over bar (suicide grip) or standard overhand.',
        'Lean back slightly (10-15 degrees), depress scapulae, and pull bar to upper clavicle.',
        'Control bar slowly back upward to full stretch overhead.'
      ],
      fa: [
        'ران‌ها را محکم زیر بالشتک دستگاه قرار دهید تا بدن بالا نیاید.',
        'میله را کمی بازتر از عرض شانه بگیرید.',
        '۱۰ تا ۱۵ درجه به عقب شیب بگیرید و میله را تا بالای سینه پایین بکشید.',
        'میله را در ۳ ثانیه به آرامی به بالا برگردانید تا عضلات زیربغل کاملاً کشیده شوند.'
      ]
    },
    commonMistakes: {
      en: ['Swinging torso back 45 degrees using lower back momentum.', 'Pulling bar behind neck.'],
      fa: ['تاب خوردن بالاتنه به عقب و استفاده از فیله کمر.', 'پایین کشیدن میله پشت گردن که به مفصل شانه آسیب می‌زند.']
    },
    progressionOptions: {
      regression: 'close_grip_lat_pulldown',
      progression: 'pull_ups',
      alternatives: ['pull_ups', 'close_grip_lat_pulldown', 'straight_arm_pulldown']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
    youtubeId: 'CAwf7n6Luuc',
    youtubeTitle: 'Lat Pulldowns: Stop Making These Mistakes - Jeff Nippard',
    defaultSets: 4,
    defaultReps: '8-12',
    defaultRestSec: 90,
    guide: {
      steps: {
        en: ['Adjust knee pad firmly.', 'Retract shoulder blades down.', 'Drive elbows down to chest level.'],
        fa: ['پد زانو را محکم تنظیم کنید.', 'کتف‌ها را به پایین بکشید.', 'آرنج‌ها را به سمت دنده‌ها هدایت کنید.']
      },
      commonMistakes: {
        en: ['Pulling behind the neck.'],
        fa: ['پایین کشیدن به پشت گردن.']
      },
      breathing: {
        en: 'Exhale pulling down, inhale letting bar rise.',
        fa: 'بازدم هنگام پایین کشیدن، دم هنگام بالا رفتن میله.'
      },
      formCues: {
        en: ['Drive elbows directly down to your hips.'],
        fa: ['آرنج‌ها را مستقیماً به سمت لگن پایین بکشید.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s return, 1s pull, 1s peak squeeze.',
        fa: '۳ ثانیه برگشت، ۱ ثانیه کشش، ۱ ثانیه انقباض در اوج.'
      }
    },
    substitutes: ['pull_ups', 'close_grip_lat_pulldown']
  },
  {
    id: 'close_grip_lat_pulldown',
    name: {
      en: 'Close-Grip / V-Bar Lat Pulldown',
      fa: 'زیربغل سیم‌کش دست جمع (دستگیره V)'
    },
    muscleGroup: 'Back',
    targetMuscle: 'back',
    type: 'compound',
    equipment: 'cable',
    difficulty: 'beginner',
    movementPattern: 'pull',
    primaryMuscles: ['Latissimus Dorsi (Lower Fibers)', 'Brachialis'],
    secondaryMuscles: ['biceps', 'shoulders'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Attach neutral V-bar handle to high pulley.',
        'Sit and secure thighs under pads.',
        'Pull handles down to upper chest, leading with elbows tucked close to sides.',
        'Squeeze lower lats at peak contraction, return under 3-second control.'
      ],
      fa: [
        'دستگیره دوبل V را به سیم‌کش بالا متصل کنید.',
        'بنشینید و ران‌ها را زیر پد محکم کنید.',
        'دستگیره را تا بالای قفسه سینه پایین بکشید و آرنج‌ها را چسبیده به پهلو نگه دارید.',
        'در انتهای حرکت عضلات زیربغل را فشرده کرده و در ۳ ثانیه به بالا بازگردید.'
      ]
    },
    commonMistakes: {
      en: ['Rounding shoulders forward at bottom.'],
      fa: ['خم کردن شانه‌ها به جلو در پایین‌ترین نقطه.']
    },
    progressionOptions: {
      regression: 'straight_arm_pulldown',
      progression: 'lat_pulldown',
      alternatives: ['lat_pulldown', 'seated_cable_row']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=JGeRYIZdojU',
    youtubeId: 'JGeRYIZdojU',
    youtubeTitle: 'V-Bar Close Grip Pulldown Technique',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 75,
    guide: {
      steps: {
        en: ['Grip V-bar neutrals.', 'Pull to upper sternum.', 'Keep elbows tucked.'],
        fa: ['دستگیره V را بگیرید.', 'تا بالای جناغ سینه بکشید.', 'آرنج‌ها را به پهلو بچسبانید.']
      },
      commonMistakes: {
        en: ['Rocking backwards too far.'],
        fa: ['عقب رفتن بیش از حد بالاتنه.']
      },
      breathing: {
        en: 'Exhale pulling down, inhale returning.',
        fa: 'بازدم در پایین کشیدن، دم در بازگشت.'
      },
      formCues: {
        en: ['Feel lower lats wrap around sides of torso.'],
        fa: ['کشش و انقباض بخش پایینی زیربغل را احساس کنید.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s up, 1s down, 1s hold.',
        fa: '۳ ثانیه بالا، ۱ ثانیه پایین، ۱ ثانیه مکث.'
      }
    },
    substitutes: ['lat_pulldown', 'seated_cable_row']
  },
  {
    id: 'barbell_bent_over_row',
    name: {
      en: 'Barbell Bent-Over Row',
      fa: 'زیربغل هالتر خم'
    },
    muscleGroup: 'Back',
    targetMuscle: 'back',
    type: 'compound',
    equipment: 'barbell',
    difficulty: 'advanced',
    movementPattern: 'pull',
    primaryMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    secondaryMuscles: ['biceps', 'hamstrings', 'core'],
    injuryRiskLevel: 'high',
    instructions: {
      en: [
        'Hinge at hips with knees slightly bent until torso is angled at 45 degrees.',
        'Grip bar with overhand or underhand grip slightly wider than shoulder width.',
        'Maintain strict neutral spine without rounding lumbar spine.',
        'Pull bar smoothly to belly button/lower ribcage, retracting shoulder blades completely.',
        'Lower with control under 3 seconds to full arm extension.'
      ],
      fa: [
        'از ناحیه لگن خم شوید و زانوها را اندکی خم کنید تا زاویه بالاتنه به حدود ۴۵ درجه برسد.',
        'ستون فقرات را کاملاً صاف نگه دارید و از قوز کردن در ناحیه کمر اکیداً خودداری کنید.',
        'هالتر را به سمت ناف و پایین دنده‌ها بالا بکشید و تیغه‌های شانه را کاملاً به هم بچسبانید.',
        'با ۳ ثانیه کنترل کامل هالتر را به حالت کشش اولیه پایین ببرید.'
      ]
    },
    commonMistakes: {
      en: ['Rounding lumbar spine causing acute disc shear stress.', 'Jerking torso vertically to yank bar.'],
      fa: ['قوز کردن کمر که فشار آسیب‌رسان زیادی به دیسک مهره‌ها وارد می‌کند.', 'پرتاب کردن بالاتنه به بالا با شتاب.']
    },
    progressionOptions: {
      regression: 'seated_cable_row',
      progression: 't_bar_row',
      alternatives: ['t_bar_row', 'single_arm_dumbbell_row', 'seated_cable_row']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=9efgc2ZdPW8',
    youtubeId: '9efgc2ZdPW8',
    youtubeTitle: 'Barbell Row Guide: Stop Making These Mistakes - Jeff Nippard',
    defaultSets: 4,
    defaultReps: '8-10',
    defaultRestSec: 120,
    guide: {
      steps: {
        en: ['Hinge hips 45 degrees.', 'Neutral spine braced.', 'Pull bar to navel.', 'Lower under control.'],
        fa: ['لگن را در ۴۵ درجه خم کنید.', 'کمر صاف و شکم منقبض.', 'هالتر را به ناف بکشید.', 'با کنترل پایین بیاورید.']
      },
      commonMistakes: {
        en: ['Rounding lower back.'],
        fa: ['گرد کردن یا قوز کردن کمر.']
      },
      breathing: {
        en: 'Brace core with deep inhale, exhale pulling to abdomen.',
        fa: 'دم عمیق و انقباض شکم، بازدم هنگام کشیدن به شکم.'
      },
      formCues: {
        en: ['Pull with your elbows, not your hands.'],
        fa: ['تصور کنید با آرنج‌ها وزنه را می‌کشید، نه با پنجه دست.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s down, 1s pull, 1s top contraction squeeze.',
        fa: '۳ ثانیه پایین، ۱ ثانیه کشیدن، ۱ ثانیه انقباض در اوج.'
      }
    },
    substitutes: ['seated_cable_row', 'single_arm_dumbbell_row', 't_bar_row']
  },
  {
    id: 'single_arm_dumbbell_row',
    name: {
      en: 'Single-Arm Dumbbell Row',
      fa: 'زیربغل دمبل تک‌خم روی نیمکت'
    },
    muscleGroup: 'Back',
    targetMuscle: 'back',
    type: 'compound',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    movementPattern: 'pull',
    primaryMuscles: ['Latissimus Dorsi', 'Rhomboids'],
    secondaryMuscles: ['biceps', 'shoulders'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Place one knee and hand on flat bench for torso support.',
        'Other foot planted wide on floor; hold dumbbell hanging vertically.',
        'Pull dumbbell in an arcing path toward hip pocket, keeping elbow tucked.',
        'Lower dumbbell slowly until full scapular stretch is achieved.'
      ],
      fa: [
        'یک زانو و یک دست را روی نیمکت قرار دهید تا ستون فقرات کاملاً حمایت شود.',
        'پای دیگر را روی زمین محکم بگذارید و دمبل را آویزان نگه دارید.',
        'دمبل را در یک مسیر کمانی به سمت جیب شلوار بالا بکشید.',
        'به آرامی پایین بیاورید تا کشش کامل زیربغل احساس شود.'
      ]
    },
    commonMistakes: {
      en: ['Rotating torso excessively to sling weight.', 'Pulling straight up to armpit instead of hip.'],
      fa: ['چرخاندن بیش از حد بالاتنه برای پرتاب وزنه.', 'بالا کشیدن مستقیم به سمت زیربغل به جای هدایت به سمت لگن.']
    },
    progressionOptions: {
      regression: 'seated_cable_row',
      progression: 'barbell_bent_over_row',
      alternatives: ['seated_cable_row', 't_bar_row']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=pYcpY20QaE8',
    youtubeId: 'pYcpY20QaE8',
    youtubeTitle: 'Dumbbell Row Form for Maximum Back Activation',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 75,
    guide: {
      steps: {
        en: ['Support on bench.', 'Drive dumbbell to hip.', 'Stretch down under control.'],
        fa: ['تکیه روی نیمکت.', 'هدایت دمبل به سمت باسن.', 'کشش آرام به پایین.']
      },
      commonMistakes: {
        en: ['Twisting spine.'],
        fa: ['پیچش در ستون فقرات.']
      },
      breathing: {
        en: 'Exhale rowing up, inhale lowering.',
        fa: 'بازدم در کشیدن به بالا، دم در پایین آوردن.'
      },
      formCues: {
        en: ['Row to your hip, not your chest.'],
        fa: ['دمبل را به سمت پهلو و لگن ببرید، نه به سینه.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s down, 1s up, 1s squeeze.',
        fa: '۳ ثانیه فرود، ۱ ثانیه بالا، ۱ ثانیه مکث.'
      }
    },
    substitutes: ['seated_cable_row', 'barbell_bent_over_row']
  },
  {
    id: 'seated_cable_row',
    name: {
      en: 'Seated Cable Row',
      fa: 'زیربغل قایقی با سیم‌کش'
    },
    muscleGroup: 'Back',
    targetMuscle: 'back',
    type: 'compound',
    equipment: 'cable',
    difficulty: 'beginner',
    movementPattern: 'pull',
    primaryMuscles: ['Rhomboids', 'Middle Trapezius', 'Latissimus Dorsi'],
    secondaryMuscles: ['biceps', 'shoulders'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Sit on bench, place feet on foot plates with soft knees.',
        'Grip close-grip V handle, sit upright with chest held high.',
        'Pull handle to lower abdomen, squeezing shoulder blades together firmly.',
        'Slowly extend arms forward allowing shoulder blades to protract slightly for stretch.'
      ],
      fa: [
        'روی صندلی بنشینید و پاها را با کمی خمیدگی در زانو روی صفحه دستگاه قرار دهید.',
        'دستگیره دوبل را گرفته و بالاتنه را عمود و سینه را رو به جلو نگه دارید.',
        'دستگیره را به سمت زیر شکم بکشید و تیغه‌های شانه را محکم به هم بفشارید.',
        'دست‌ها را به آرامی به جلو برگردانید تا کتف‌ها کمی باز شوند و عضلات کشیده شوند.'
      ]
    },
    commonMistakes: {
      en: ['Swinging torso back and forth like a rowing boat.', 'Shrugging shoulders into ears.'],
      fa: ['تاب دادن بالاتنه به جلو و عقب مانند قایقرانی.', 'بالا انداختن شانه‌ها حین کشش.']
    },
    progressionOptions: {
      regression: 'seated_cable_row',
      progression: 'barbell_bent_over_row',
      alternatives: ['single_arm_dumbbell_row', 't_bar_row']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=GZbfZ033f74',
    youtubeId: 'GZbfZ033f74',
    youtubeTitle: 'Seated Cable Row Technique Guide',
    defaultSets: 4,
    defaultReps: '10-12',
    defaultRestSec: 75,
    guide: {
      steps: {
        en: ['Sit upright.', 'Drive elbows backward.', 'Squeeze rhomboids at midline.'],
        fa: ['صاف بنشینید.', 'آرنج‌ها را به عقب بکشید.', 'کتف‌ها را به هم بفشارید.']
      },
      commonMistakes: {
        en: ['Excessive lumbar hyperextension.'],
        fa: ['قوس بیش از حد به کمر.']
      },
      breathing: {
        en: 'Exhale rowing to belly, inhale on stretch.',
        fa: 'بازدم هنگام کشیدن به شکم، دم در فاز کشش.'
      },
      formCues: {
        en: ['Keep chest up and shoulders away from ears.'],
        fa: ['سینه رو به بالا و شانه‌ها دور از گوش‌ها باشد.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s return, 1s row, 1s squeeze.',
        fa: '۳ ثانیه برگشت، ۱ ثانیه کشیدن، ۱ ثانیه انقباض.'
      }
    },
    substitutes: ['single_arm_dumbbell_row', 'barbell_bent_over_row']
  },
  {
    id: 't_bar_row',
    name: {
      en: 'T-Bar Row',
      fa: 'زیربغل تی بار (T-Bar Row)'
    },
    muscleGroup: 'Back',
    targetMuscle: 'back',
    type: 'compound',
    equipment: 'machine',
    difficulty: 'intermediate',
    movementPattern: 'pull',
    primaryMuscles: ['Latissimus Dorsi', 'Middle & Lower Trapezius', 'Rhomboids'],
    secondaryMuscles: ['biceps', 'shoulders', 'core'],
    injuryRiskLevel: 'medium',
    instructions: {
      en: [
        'Straddle bar, hinge at hips to roughly 45 degrees, grip handles securely.',
        'Brace abdominal wall tightly to protect lumbar spine.',
        'Pull weight toward upper abdomen, driving elbows directly behind you.',
        'Lower under strict 3-second control without dropping torso.'
      ],
      fa: [
        'روی دستگاه تی بار بایستید و بالاتنه را در ۴۵ درجه خم کنید.',
        'شکم را محکم منقبض کنید تا ستون فقرات کاملاً ایمن باشد.',
        'وزنه را به سمت بالای شکم بکشید و آرنج‌ها را به سمت عقب هدایت کنید.',
        'در ۳ ثانیه آرام پایین بیاورید بدون اینکه بالاتنه خم شود.'
      ]
    },
    commonMistakes: {
      en: ['Standing up too tall turning lift into a shrug.', 'Rounding low back.'],
      fa: ['صاف ایستادن بیش از حد که حرکت را تبدیل به کول می‌کند.', 'قوز کردن کمر.']
    },
    progressionOptions: {
      regression: 'seated_cable_row',
      progression: 'barbell_bent_over_row',
      alternatives: ['barbell_bent_over_row', 'seated_cable_row']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=j3Igk5nyZE4',
    youtubeId: 'j3Igk5nyZE4',
    youtubeTitle: 'T Bar Row Form & Execution Guide',
    defaultSets: 3,
    defaultReps: '8-10',
    defaultRestSec: 90,
    guide: {
      steps: {
        en: ['Hinge at hips.', 'Brace core.', 'Pull to midsection.', 'Lower controlled.'],
        fa: ['خم شدن از لگن.', 'انقباض شکم.', 'کشیدن به میانه شکم.', 'فرود کنترل‌شده.']
      },
      commonMistakes: {
        en: ['Rounding upper or lower spine.'],
        fa: ['خم کردن ستون فقرات.']
      },
      breathing: {
        en: 'Exhale rowing, inhale lowering.',
        fa: 'بازدم در کشیدن، دم در پایین بردن.'
      },
      formCues: {
        en: ['Pin shoulder blades together at top.'],
        fa: ['در بالا تیغه‌های شانه را به هم بچسبانید.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s down, 1s up, 1s squeeze.',
        fa: '۳ ثانیه پایین، ۱ ثانیه بالا، ۱ ثانیه مکث.'
      }
    },
    substitutes: ['barbell_bent_over_row', 'seated_cable_row']
  },
  {
    id: 'conventional_deadlift',
    name: {
      en: 'Conventional Barbell Deadlift',
      fa: 'ددلیفت استاندارد با هالتر'
    },
    muscleGroup: 'Back',
    targetMuscle: 'back',
    type: 'compound',
    equipment: 'barbell',
    difficulty: 'advanced',
    movementPattern: 'hinge',
    primaryMuscles: ['Erector Spinae', 'Gluteus Maximus', 'Hamstrings'],
    secondaryMuscles: ['back', 'quads', 'forearms'],
    injuryRiskLevel: 'high',
    instructions: {
      en: [
        'Stand with feet hip-width apart, bar over midfoot roughly 1 inch from shins.',
        'Hinge hips back, bend knees until shins touch bar, take double overhand or hook grip.',
        'Pull slack out of bar, wedge hips into position, squeeze lats to brace torso.',
        'Drive floor away through midfoot, extending hips and knees simultaneously to lock out.',
        'Hinge hips backward to lower bar along thighs under control.'
      ],
      fa: [
        'پاها را به عرض لگن باز کنید، هالتر روی وسط پنجه پا باشد.',
        'از لگن خم شده و زانوها را تا برخورد ساق به میله خم کنید؛ میله را محکم بگیرید.',
        'خلاصی هالتر را با انقباض زیربغل بگیرید و قفسه سینه را بالا نگه دارید.',
        'با فشار پاشنه‌ها به زمین، لگن و زانو را همزمان صاف کنید تا قامت صاف شود.',
        'با عقب بردن لگن، هالتر را مماس با ران‌ها پایین بیاورید.'
      ]
    },
    commonMistakes: {
      en: ['Spinal flexion under maximal loads.', 'Bar drifting forward away from body center.'],
      fa: ['قوز کردن ستون فقرات حین وزنه سنگین.', 'دور شدن هالتر از بدن حین لیفت.']
    },
    progressionOptions: {
      regression: 'romanian_deadlift_rdl',
      progression: 'sumo_deadlift',
      alternatives: ['sumo_deadlift', 'romanian_deadlift_rdl']
    },
    gifUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=VL5Ab0T07e4',
    youtubeId: 'VL5Ab0T07e4',
    youtubeTitle: 'How to Deadlift with Mark Rippetoe & Jeff Nippard',
    defaultSets: 3,
    defaultReps: '5',
    defaultRestSec: 180,
    guide: {
      steps: {
        en: ['Bar over midfoot.', 'Grip bar, touch shins.', 'Pull slack out, drive floor away.'],
        fa: ['هالتر روی وسط پا.', 'میله را بگیرید و ساق را مماس کنید.', 'خلاصی میله را بگیرید و زمین را هل دهید.']
      },
      commonMistakes: {
        en: ['Hips shooting up before chest.'],
        fa: ['بالا پریدن باسن قبل از قفسه سینه.']
      },
      breathing: {
        en: 'Deep diaphragmatic brace before pull, exhale at lockout.',
        fa: 'دم عمیق شکمی قبل از جدا کردن وزنه، بازدم در حالت ایستاده کامل.'
      },
      formCues: {
        en: ['Push the floor away rather than pulling the bar up.'],
        fa: ['به جای کشیدن میله به بالا، زمین را به پایین فشار دهید.']
      },
      tempo: '2-1-1-0',
      tempoDescription: {
        en: '2s down, 1s reset on floor, 1s drive.',
        fa: '۲ ثانیه فرود، ۱ ثانیه مکث روی زمین، ۱ ثانیه لیفت.'
      }
    },
    substitutes: ['sumo_deadlift', 'romanian_deadlift_rdl']
  },
  {
    id: 'sumo_deadlift',
    name: {
      en: 'Sumo Barbell Deadlift',
      fa: 'ددلیفت سومو با هالتر'
    },
    muscleGroup: 'Back',
    targetMuscle: 'back',
    type: 'compound',
    equipment: 'barbell',
    difficulty: 'advanced',
    movementPattern: 'hinge',
    primaryMuscles: ['Gluteus Maximus', 'Adductors', 'Erector Spinae'],
    secondaryMuscles: ['quads', 'hamstrings', 'forearms'],
    injuryRiskLevel: 'medium',
    instructions: {
      en: [
        'Adopt wide stance with toes pointed outward at 45 degrees.',
        'Grip bar directly beneath shoulders inside knee alignment.',
        'Open knees outward in line with toes, drop hips close to bar.',
        'Drive floor apart with feet, locking out hips and glutes powerfully.'
      ],
      fa: [
        'پاها را بسیار باز بگذارید و پنجه‌ها را با زاویه ۴۵ درجه به بیرون بچرخانید.',
        'دست‌ها را از داخل زانوها و دقیقاً زیر شانه روی میله قرار دهید.',
        'زانوها را به سمت بیرون باز کنید و باسن را به هالتر نزدیک نمایید.',
        'با فشار پاها به سمت بیرون و انقباض شدید باسن و پشت، راست بایستید.'
      ]
    },
    commonMistakes: {
      en: ['Allowing knees to cave inward (valgus collapse).'],
      fa: ['جمع شدن زانوها به سمت داخل (افتادگی والگوس زانو).']
    },
    progressionOptions: {
      regression: 'romanian_deadlift_rdl',
      progression: 'conventional_deadlift',
      alternatives: ['conventional_deadlift', 'romanian_deadlift_rdl']
    },
    gifUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=wOHvI4e_Qvo',
    youtubeId: 'wOHvI4e_Qvo',
    youtubeTitle: 'Sumo Deadlift Form Guide - Renaissance Periodization',
    defaultSets: 3,
    defaultReps: '5',
    defaultRestSec: 180,
    guide: {
      steps: {
        en: ['Wide stance, toes out.', 'Arms inside knees.', 'Drive floor apart.'],
        fa: ['پاهای باز، پنجه به بیرون.', 'دست‌ها داخل زانو.', 'فشار به زمین به طرفین.']
      },
      commonMistakes: {
        en: ['Knees collapsing inward.'],
        fa: ['چرخش زانو به داخل.']
      },
      breathing: {
        en: 'Valsalva brace at floor, exhale at top.',
        fa: 'حبس نفس و انقباض در پایین، بازدم در قفل بالا.'
      },
      formCues: {
        en: ['Spread the floor with your feet.'],
        fa: ['تصور کنید می‌خواهید زمین را با پاهایتان از وسط پاره کنید.']
      },
      tempo: '2-1-1-0',
      tempoDescription: {
        en: '2s down, 1s pause, 1s up.',
        fa: '۲ ثانیه پایین، ۱ ثانیه مکث، ۱ ثانیه بالا.'
      }
    },
    substitutes: ['conventional_deadlift', 'romanian_deadlift_rdl']
  },
  {
    id: 'straight_arm_pulldown',
    name: {
      en: 'Straight-Arm Cable Pulldown',
      fa: 'پلاور سیم‌کش ایستاده (زیربغل سیم‌کش دست صاف)'
    },
    muscleGroup: 'Back',
    targetMuscle: 'back',
    type: 'isolation',
    equipment: 'cable',
    difficulty: 'beginner',
    movementPattern: 'pull',
    primaryMuscles: ['Latissimus Dorsi', 'Teres Major'],
    secondaryMuscles: ['triceps', 'core'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Stand in front of high cable pulley with wide or straight bar attached.',
        'Hinge forward slightly at hips with arms extended and soft elbow bend.',
        'Keeping elbow bend fixed, sweep bar downward in a wide arc until it touches upper thighs.',
        'Squeeze lats forcefully, then control bar back overhead to full stretch.'
      ],
      fa: [
        'مقابل سیم‌کش بالا بایستید و میله صاف را بگیرید.',
        'کمی از لگن خم شوید و دست‌ها را با خمیدگی بسیار ملایم در آرنج بکشید.',
        'بدون خم کردن بیشتر آرنج، میله را در یک مسیر کمانی تا جلوی ران‌ها به پایین بکشید.',
        'زیربغل را به شدت فشرده کرده و به آرامی به بالای سر برگردانید.'
      ]
    },
    commonMistakes: {
      en: ['Bending elbows dynamically like a triceps pushdown.', 'Using torso rocking.'],
      fa: ['خم کردن آرنج‌ها و تبدیل حرکت به پشت‌بازو سیم‌کش.', 'تکان دادن بالاتنه برای پایین کشیدن وزنه.']
    },
    progressionOptions: {
      regression: 'straight_arm_pulldown',
      progression: 'lat_pulldown',
      alternatives: ['lat_pulldown', 'seated_cable_row']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=GxD_YhT2y7E',
    youtubeId: 'GxD_YhT2y7E',
    youtubeTitle: 'Straight Arm Pulldown Lat Isolation Guide',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Soft elbows locked in place.', 'Sweep bar to thighs in wide arc.', 'Deep stretch at top.'],
        fa: ['آرنج‌ها با خم ملایم قفل بماند.', 'حرکت کمانی میله تا ران‌ها.', 'کشش کامل در بالا.']
      },
      commonMistakes: {
        en: ['Bending elbows into pushdown.'],
        fa: ['خم کردن آرنج به شکل پشت‌بازو.']
      },
      breathing: {
        en: 'Exhale sweeping down, inhale on return.',
        fa: 'بازدم در پایین کشیدن، دم در بازگشت به بالا.'
      },
      formCues: {
        en: ['Think about pushing the bar down into your pockets.'],
        fa: ['تصور کنید میله را به داخل جیب‌هایتان فشار می‌دهید.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s return stretch, 1s pull, 1s peak squeeze.',
        fa: '۳ ثانیه برگشت، ۱ ثانیه پایین کشیدن، ۱ ثانیه انقباض در اوج.'
      }
    },
    substitutes: ['lat_pulldown', 'seated_cable_row']
  }
];
