import { Exercise } from '../../types';

export const shoulderExercises: Exercise[] = [
  {
    id: 'overhead_barbell_press',
    name: {
      en: 'Standing Overhead Barbell Press (OHP)',
      fa: 'پرس سرشانه هالتر نظامی ایستاده (OHP)'
    },
    muscleGroup: 'Shoulders',
    targetMuscle: 'shoulders',
    type: 'compound',
    equipment: 'barbell',
    difficulty: 'intermediate',
    movementPattern: 'push',
    primaryMuscles: ['Anterior Deltoid', 'Lateral Deltoid'],
    secondaryMuscles: ['triceps', 'core'],
    injuryRiskLevel: 'medium',
    instructions: {
      en: [
        'Stand tall with feet shoulder-width apart, glutes and abs squeezed tight.',
        'Rest bar across upper collarbone, forearms vertical with elbows slightly in front of bar.',
        'Pull head back slightly, press bar directly vertical in straight line.',
        'As bar passes forehead, push head forward into natural alignment and lock out overhead.',
        'Lower bar under 3-second control back to clavicle.'
      ],
      fa: [
        'صاف بایستید و پاها به عرض شانه باشد؛ باسن و عضلات شکم را کاملاً منقبض کنید.',
        'هالتر را روی بالای ترقوه قرار دهید و ساعدها عمود بر زمین باشند.',
        'سر را اندکی به عقب متمایل کنید و هالتر را در یک خط مستقیم به بالا پرس کنید.',
        'پس از عبور هالتر از پیشانی، سر را به جلو آورده و وزنه را در بالای سر مهار کنید.',
        'هالتر را در ۳ ثانیه با کنترل به روی استخوان ترقوه برگردانید.'
      ]
    },
    commonMistakes: {
      en: ['Leaning backward into excessive lumbar hyperextension.', 'Pressing bar forward in an arc.'],
      fa: ['خم شدن به عقب و قوس شدید کمر.', 'پرس کردن هالتر به سمت جلو به جای خط مستقیم عمودی.']
    },
    progressionOptions: {
      regression: 'dumbbell_overhead_press',
      progression: 'overhead_barbell_press',
      alternatives: ['dumbbell_overhead_press', 'machine_shoulder_press', 'arnold_press']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI',
    youtubeId: '2yjwXTZQDDI',
    youtubeTitle: 'How To Overhead Press (OHP) With Proper Form - Alan Thrall',
    defaultSets: 4,
    defaultReps: '6-8',
    defaultRestSec: 120,
    guide: {
      steps: {
        en: ['Grip bar at shoulder width.', 'Forearms strictly vertical.', 'Press overhead in straight line.'],
        fa: ['میله را به عرض شانه بگیرید.', 'ساعدها عمود بر زمین.', 'پرس عمودی به بالای سر.']
      },
      commonMistakes: {
        en: ['Hyperextending lumbar spine.'],
        fa: ['قوس دادن غیرمجاز به کمر.']
      },
      breathing: {
        en: 'Inhale and brace core at bottom, exhale driving overhead.',
        fa: 'دم و حبس شکم در شروع، بازدم در قفل بالای سر.'
      },
      formCues: {
        en: ['Squeeze glutes hard to create a solid pillar.'],
        fa: ['باسن را محکم منقبض کنید تا ستون فقرات پایدار بماند.']
      },
      tempo: '3-0-1-0',
      tempoDescription: {
        en: '3s down, 0s pause, 1s up.',
        fa: '۳ ثانیه پایین، ۱ ثانیه بالا.'
      }
    },
    substitutes: ['dumbbell_overhead_press', 'machine_shoulder_press']
  },
  {
    id: 'dumbbell_overhead_press',
    name: {
      en: 'Seated Dumbbell Shoulder Press',
      fa: 'پرس سرشانه با دمبل نشسته'
    },
    muscleGroup: 'Shoulders',
    targetMuscle: 'shoulders',
    type: 'compound',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    movementPattern: 'push',
    primaryMuscles: ['Anterior Deltoid', 'Lateral Deltoid'],
    secondaryMuscles: ['triceps', 'shoulders'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Set bench to near-vertical (80–85 degrees to avoid lower back impingement).',
        'Kick dumbbells to shoulder height with palms forward or slightly angled.',
        'Press dumbbells upward in a gentle converging arc above head.',
        'Lower weights with control until dumbbells touch shoulder line.'
      ],
      fa: [
        'تکیه‌گاه نیمکت را روی زاویه ۸۰ تا ۸۵ درجه تنظیم کنید.',
        'دمبل‌ها را تا سطح شانه بالا آورده و زاویه ملایمی به کف دست‌ها بدهید.',
        'دمبل‌ها را در یک مسیر کمانی به سمت بالای سر پرس کنید.',
        'به آرامی پایین بیاورید تا دمبل‌ها به سطح شانه برسند.'
      ]
    },
    commonMistakes: {
      en: ['Flaring elbows 90 degrees out directly to sides.', 'Banging weights together at top.'],
      fa: ['باز کردن بیش از حد آرنج‌ها به موازات شانه‌ها.', 'کوبیدن دمبل‌ها به هم در اوج حرکت.']
    },
    progressionOptions: {
      regression: 'machine_shoulder_press',
      progression: 'overhead_barbell_press',
      alternatives: ['overhead_barbell_press', 'arnold_press', 'machine_shoulder_press']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog',
    youtubeId: 'qEwKCR5JCog',
    youtubeTitle: 'Dumbbell Shoulder Press Form - Jeff Nippard',
    defaultSets: 4,
    defaultReps: '8-10',
    defaultRestSec: 90,
    guide: {
      steps: {
        en: ['Sit on 80-85 degree bench.', 'Keep elbows angled slightly forward in scapular plane.', 'Press up smoothly.'],
        fa: ['روی نیمکت با شیب ۸۰ درجه بنشینید.', 'آرنج‌ها در صفحه کتف کمی متمایل به جلو.', 'پرس روان به بالا.']
      },
      commonMistakes: {
        en: ['Lower back arching off pad.'],
        fa: ['جدا شدن کمر از تکیه‌گاه.']
      },
      breathing: {
        en: 'Inhale lowering, exhale pressing up.',
        fa: 'دم در پایین آوردن، بازدم در پرس به بالا.'
      },
      formCues: {
        en: ['Keep elbows tucked slightly inside 60 degrees.'],
        fa: ['آرنج‌ها را کمی به داخل جمع نگه دارید.']
      },
      tempo: '3-0-1-0',
      tempoDescription: {
        en: '3s down, 1s up.',
        fa: '۳ ثانیه پایین، ۱ ثانیه بالا.'
      }
    },
    substitutes: ['overhead_barbell_press', 'machine_shoulder_press']
  },
  {
    id: 'arnold_press',
    name: {
      en: 'Arnold Dumbbell Press',
      fa: 'پرس سرشانه آرنولدی با دمبل'
    },
    muscleGroup: 'Shoulders',
    targetMuscle: 'shoulders',
    type: 'compound',
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    movementPattern: 'push',
    primaryMuscles: ['Anterior Deltoid', 'Lateral Deltoid'],
    secondaryMuscles: ['triceps', 'shoulders'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Hold dumbbells at chin height with palms facing your chest (supinated).',
        'As you begin to press upward, rotate wrists so palms face forward at top of the movement.',
        'Reach full overhead extension with arms aligned with ears.',
        'Reverse motion smoothly on way down, rotating palms back facing chest.'
      ],
      fa: [
        'دمبل‌ها را جلوی چانه طوری نگه دارید که کف دست‌ها رو به سینه باشد.',
        'هنگام پرس به بالا، به نرمی مچ‌ها را بچرخانید تا در بالای سر کف دست‌ها رو به جلو قرار گیرد.',
        'در بالای حرکت دست‌ها را کاملاً صاف کرده و شانه را منقبض کنید.',
        'هنگام پایین آمدن مسیر را برعکس طی کرده و کف دست‌ها را دوباره رو به سینه بچرخانید.'
      ]
    },
    commonMistakes: {
      en: ['Jerky rotational motion during press.', 'Using excessive weight that compromises rotator cuff.'],
      fa: ['چرخش ناهماهنگ و ضربه‌ای.', 'انتخاب وزنه سنگین که به روتاتور کاف آسیب می‌زند.']
    },
    progressionOptions: {
      regression: 'machine_shoulder_press',
      progression: 'dumbbell_overhead_press',
      alternatives: ['dumbbell_overhead_press', 'machine_shoulder_press']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=3ml7BH7mNwQ',
    youtubeId: '3ml7BH7mNwQ',
    youtubeTitle: 'How to Do Arnold Press Correctly - Mind Pump',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 75,
    guide: {
      steps: {
        en: ['Start with palms facing chest.', 'Rotate palms outward as you press overhead.', 'Reverse on descent.'],
        fa: ['شروع با کف دست رو به سینه.', 'چرخش رو به بیرون حین پرس.', 'برگشت هماهنگ در فرود.']
      },
      commonMistakes: {
        en: ['Rotating prematurely before clearing chin.'],
        fa: ['چرخاندن پیش از موعد مچ دست.']
      },
      breathing: {
        en: 'Exhale pressing and rotating up, inhale lowering.',
        fa: 'بازدم در صعود و چرخش، دم در پایین آوردن.'
      },
      formCues: {
        en: ['Smooth continuous rotation without pauses.'],
        fa: ['چرخش پیوسته و یکنواخت بدون توقف.']
      },
      tempo: '3-0-1-0',
      tempoDescription: {
        en: '3s return, 1s press & rotate.',
        fa: '۳ ثانیه فرود و چرخش، ۱ ثانیه صعود.'
      }
    },
    substitutes: ['dumbbell_overhead_press', 'machine_shoulder_press']
  },
  {
    id: 'dumbbell_lateral_raise',
    name: {
      en: 'Dumbbell Lateral Raise',
      fa: 'نشر جانب با دمبل (سرشانه از بغل)'
    },
    muscleGroup: 'Shoulders',
    targetMuscle: 'shoulders',
    type: 'isolation',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    movementPattern: 'push',
    primaryMuscles: ['Lateral Deltoid'],
    secondaryMuscles: ['shoulders'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Stand or sit with slight forward torso tilt (10-15 degrees) to align with scapular plane.',
        'Hold dumbbells at sides with slight bend in elbows.',
        'Raise arms out to sides leading with elbows until parallel to floor at shoulder height.',
        'Lower weights with 3-second control without swinging or bouncing off hips.'
      ],
      fa: [
        'بایستید و بالاتنه را ۱۰ تا ۱۵ درجه به جلو متمایل کنید تا حرکت در صفحه کتف باشد.',
        'دمبل‌ها را با اندکی خمیدگی در آرنج در طرفین نگه دارید.',
        'دست‌ها را تا موازات خط شانه بالا ببرید و آرنج‌ها را پیشرو قرار دهید.',
        'در ۳ ثانیه کنترل‌شده پایین آورید بدون اینکه به ران‌ها برخورد کرده و فنر شوند.'
      ]
    },
    commonMistakes: {
      en: ['Swinging torso or using momentum.', 'Raising hands higher than elbows (shifts tension to front delt).'],
      fa: ['تاب دادن بالاتنه و استفاده از شتاب بدن.', 'بالاتر قرار گرفتن مچ دست از آرنج که فشار را از بخش میانی سرشانه خارج می‌کند.']
    },
    progressionOptions: {
      regression: 'cable_lateral_raise',
      progression: 'dumbbell_lateral_raise',
      alternatives: ['cable_lateral_raise', 'face_pulls']
    },
    gifUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
    youtubeId: '3VcKaXpzqRo',
    youtubeTitle: 'Stop Doing Lateral Raises Like This - Jeff Nippard',
    defaultSets: 4,
    defaultReps: '12-15',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Slight forward lean.', 'Lead with elbows.', 'Stop at shoulder height.', '3-second negative.'],
        fa: ['شیب ملایم به جلو.', 'پیشرو بودن آرنج.', 'توقف در سطح شانه.', '۳ ثانیه منفی.']
      },
      commonMistakes: {
        en: ['Shrugging traps excessively.'],
        fa: ['بالا انداختن کول و انقباض ذوزنقه.']
      },
      breathing: {
        en: 'Exhale raising, inhale lowering.',
        fa: 'بازدم هنگام بالا بردن، دم هنگام فرود.'
      },
      formCues: {
        en: ['Think of pouring water from a pitcher at top.'],
        fa: ['تصور کنید در اوج حرکت می‌خواهید با پارچ آب بریزید (کف دست اندکی رو به پایین).']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s down, 1s up, 1s peak hold.',
        fa: '۳ ثانیه فرود، ۱ ثانیه صعود، ۱ ثانیه مکث در اوج.'
      }
    },
    substitutes: ['cable_lateral_raise', 'face_pulls']
  },
  {
    id: 'cable_lateral_raise',
    name: {
      en: 'Cable Lateral Raise',
      fa: 'نشر جانب با سیم‌کش'
    },
    muscleGroup: 'Shoulders',
    targetMuscle: 'shoulders',
    type: 'isolation',
    equipment: 'cable',
    difficulty: 'beginner',
    movementPattern: 'push',
    primaryMuscles: ['Lateral Deltoid'],
    secondaryMuscles: ['shoulders'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Set pulley at knee or wrist height.',
        'Stand beside pulley, cross cable behind or in front of body.',
        'Raise cable outward leading with elbow through entire range of motion.',
        'Continuous tension from stretched start position to peak contraction.'
      ],
      fa: [
        'قرقره سیم‌کش را در ارتفاع زانو یا مچ پا تنظیم کنید.',
        'در کنار دستگاه بایستید و کابل را با دست دورتر بگیرید.',
        'دست را با هدایت آرنج به پهلو تا سطح شانه بالا ببرید.',
        'تنش ممتد سیم‌کش را از نقطه شروع کشیده تا اوج انقباض حس کنید.'
      ]
    },
    commonMistakes: {
      en: ['Jerking weight stack.'],
      fa: ['ضربه زدن به وزنه برای شروع حرکت.']
    },
    progressionOptions: {
      regression: 'cable_lateral_raise',
      progression: 'dumbbell_lateral_raise',
      alternatives: ['dumbbell_lateral_raise', 'machine_shoulder_press']
    },
    gifUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=PPrzBWZDOhA',
    youtubeId: 'PPrzBWZDOhA',
    youtubeTitle: 'Cable Lateral Raise Technique - Renaissance Periodization',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Set low pulley.', 'Raise along scapular plane.', 'Full 3-second negative.'],
        fa: ['تنظیم سیم‌کش در پایین.', 'بالا بردن در زاویه کتف.', '۳ ثانیه منفی.']
      },
      commonMistakes: {
        en: ['Leaning away too far.'],
        fa: ['خم شدن بیش از حد به طرفین.']
      },
      breathing: {
        en: 'Exhale raising, inhale lowering.',
        fa: 'بازدم در بالا بردن، دم در بازگشت.'
      },
      formCues: {
        en: ['Keep shoulder depressed.'],
        fa: ['کتف را پایین نگه دارید.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s down, 1s up, 1s hold.',
        fa: '۳ ثانیه فرود، ۱ ثانیه بالا، ۱ ثانیه مکث.'
      }
    },
    substitutes: ['dumbbell_lateral_raise']
  },
  {
    id: 'dumbbell_front_raise',
    name: {
      en: 'Dumbbell Front Raise',
      fa: 'نشر روبرو با دمبل (سرشانه قدامی)'
    },
    muscleGroup: 'Shoulders',
    targetMuscle: 'shoulders',
    type: 'isolation',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    movementPattern: 'push',
    primaryMuscles: ['Anterior Deltoid'],
    secondaryMuscles: ['shoulders'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Stand tall with dumbbells resting on front of thighs, palms facing backward.',
        'Keeping slight bend in elbows, raise one or both dumbbells straight forward to eye level.',
        'Pause at peak for 1 second, lower under 3-second control.'
      ],
      fa: [
        'صاف بایستید و دمبل‌ها را جلوی ران‌ها با کف دست رو به بدن نگه دارید.',
        'با خم ملایم در آرنج، دمبل‌ها را تا سطح چشم‌ها به جلو بالا ببرید.',
        '۱ ثانیه در اوج مکث کرده و در ۳ ثانیه با کنترل پایین بیاورید.'
      ]
    },
    commonMistakes: {
      en: ['Swinging backwards with lower back momentum.'],
      fa: ['پرتاب کردن بالاتنه به عقب برای بالا آوردن دمبل.']
    },
    progressionOptions: {
      regression: 'dumbbell_front_raise',
      progression: 'dumbbell_overhead_press',
      alternatives: ['dumbbell_overhead_press', 'machine_shoulder_press']
    },
    gifUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=-t7fuZ0KhDA',
    youtubeId: '-t7fuZ0KhDA',
    youtubeTitle: 'How To Front Raise With Proper Form',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Raise to eye level.', 'Hold 1s.', 'Lower 3s controlled.'],
        fa: ['بالا بردن تا سطح چشم.', '۱ ثانیه مکث.', '۳ ثانیه فرود.']
      },
      commonMistakes: {
        en: ['Rocking body.'],
        fa: ['تکان دادن بالاتنه.']
      },
      breathing: {
        en: 'Exhale raising, inhale lowering.',
        fa: 'بازدم در صعود، دم در فرود.'
      },
      formCues: {
        en: ['Keep core locked tight.'],
        fa: ['شکم را سفت نگه دارید.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s down, 1s up, 1s squeeze.',
        fa: '۳ ثانیه پایین، ۱ ثانیه بالا، ۱ ثانیه مکث.'
      }
    },
    substitutes: ['dumbbell_overhead_press', 'machine_shoulder_press']
  },
  {
    id: 'rear_delt_fly',
    name: {
      en: 'Reverse Pec Deck / Rear Delt Fly',
      fa: 'فلای معکوس با دستگاه (سرشانه خلفی)'
    },
    muscleGroup: 'Shoulders',
    targetMuscle: 'shoulders',
    type: 'isolation',
    equipment: 'machine',
    difficulty: 'beginner',
    movementPattern: 'pull',
    primaryMuscles: ['Posterior Deltoid', 'Infraspinatus'],
    secondaryMuscles: ['Rhomboids'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Sit facing machine chest pad with handles adjusted to shoulder height.',
        'Grip handles with neutral or pronated grip with soft elbow bend.',
        'Sweep arms horizontally outward in wide arc focusing entirely on back of shoulders.',
        'Squeeze posterior delts hard at full horizontal abduction, return under control.'
      ],
      fa: [
        'رو به پشتی دستگاه پک دک بنشینید و سینه را به بالشتک بچسبانید.',
        'دستگیره‌ها را با اندکی خم در آرنج بگیرید.',
        'دست‌ها را در یک کمان افقی به سمت طرفین و عقب باز کنید با تمرکز روی پشت سرشانه.',
        'در انتهای حرکت عضلات خلفی شانه را منقبض کرده و به آرامی برگردید.'
      ]
    },
    commonMistakes: {
      en: ['Using traps and pinching scapulae excessively instead of rear delts.'],
      fa: ['فشردن بیش از حد کتف‌ها به جای تمرکز خالص روی سرشانه خلفی.']
    },
    progressionOptions: {
      regression: 'rear_delt_fly',
      progression: 'face_pulls',
      alternatives: ['face_pulls', 'seated_cable_row']
    },
    gifUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=6yMdhi2DVao',
    youtubeId: '6yMdhi2DVao',
    youtubeTitle: 'Rear Delt Fly Form Guide - Jeff Nippard',
    defaultSets: 4,
    defaultReps: '12-15',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Sit chest on pad.', 'Sweep arms wide horizontally.', 'Squeeze rear delts.'],
        fa: ['سینه روی بالشتک.', 'باز کردن دست‌ها به طرفین.', 'انقباض سرشانه خلفی.']
      },
      commonMistakes: {
        en: ['Bending elbows into row.'],
        fa: ['خم کردن بیش از حد آرنج مانند حرکت پارویی.']
      },
      breathing: {
        en: 'Exhale opening arms, inhale returning.',
        fa: 'بازدم هنگام باز کردن دست‌ها، دم در بازگشت.'
      },
      formCues: {
        en: ['Think about touching the back walls with your knuckles.'],
        fa: ['تصور کنید می‌خواهید با پشت دست دیوار پشتی را لمس کنید.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s return, 1s pull, 1s peak contraction.',
        fa: '۳ ثانیه برگشت، ۱ ثانیه باز کردن، ۱ ثانیه انقباض در اوج.'
      }
    },
    substitutes: ['face_pulls', 'seated_cable_row']
  },
  {
    id: 'face_pulls',
    name: {
      en: 'Cable Face Pull with External Rotation',
      fa: 'فیس پول با سیم‌کش و چرخش خارجی'
    },
    muscleGroup: 'Shoulders',
    targetMuscle: 'shoulders',
    type: 'isolation',
    equipment: 'cable',
    difficulty: 'intermediate',
    movementPattern: 'pull',
    primaryMuscles: ['Posterior Deltoid', 'Infraspinatus', 'Teres Minor'],
    secondaryMuscles: ['Rhomboids'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Set cable pulley to eye height with rope attachment.',
        'Hold rope with thumbs backward (underhand hook grip).',
        'Step back, pull rope toward nose and eyes while driving elbows high and wide.',
        'At finish position, rotate wrists and hands backward to achieve external shoulder rotation.',
        'Lower weight slowly under 3-second control to maintain rotator cuff tension.'
      ],
      fa: [
        'قرقره سیم‌کش را در سطح چشم تنظیم کنید و طناب متصل نمایید.',
        'انتهای طناب را طوری بگیرید که شست‌ها رو به عقب باشد.',
        'طناب را به سمت بینی و چشم‌ها بکشید و آرنج‌ها را بالا و باز هدایت کنید.',
        'در انتهای حرکت مچ‌ها را به سمت عقب بچرخانید تا چرخش خارجی شانه کامل شود.',
        'در ۳ ثانیه به آرامی به جلو برگردید تا روتاتور کاف تقویت شود.'
      ]
    },
    commonMistakes: {
      en: ['Using too heavy weight and turning it into a body-row.', 'Dropping elbows below wrists.'],
      fa: ['انتخاب وزنه بیش از حد سنگین و تکان دادن بالاتنه.', 'افتادن آرنج‌ها پایین‌تر از مچ دست‌ها.']
    },
    progressionOptions: {
      regression: 'rear_delt_fly',
      progression: 'face_pulls',
      alternatives: ['rear_delt_fly', 'seated_cable_row']
    },
    gifUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=rep-qVOkqgk',
    youtubeId: 'rep-qVOkqgk',
    youtubeTitle: 'How to Face Pull with Perfect Form - Jeff Cavaliere ATHLEAN-X',
    defaultSets: 4,
    defaultReps: '15-20',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Thumbs backward grip.', 'Pull rope to eyes.', 'Externally rotate hands back.', 'Hold 1s squeeze.'],
        fa: ['گیرش با شست به عقب.', 'کشیدن طناب به سمت چشم‌ها.', 'چرخش خارجی دست به عقب.', '۱ ثانیه مکث.']
      },
      commonMistakes: {
        en: ['Dropping elbows.'],
        fa: ['پایین افتادن آرنج.']
      },
      breathing: {
        en: 'Exhale pulling to face, inhale extending forward.',
        fa: 'بازدم هنگام کشیدن به صورت، دم در بازگشت.'
      },
      formCues: {
        en: ['Show your biceps to the wall behind you.'],
        fa: ['در انتهای حرکت بازوها را به شکل فیگور جفت بازو بچرخانید.']
      },
      tempo: '2-0-1-1',
      tempoDescription: {
        en: '2s return, 1s pull, 1s peak hold.',
        fa: '۲ ثانیه برگشت، ۱ ثانیه کشیدن، ۱ ثانیه مکث.'
      }
    },
    substitutes: ['rear_delt_fly', 'seated_cable_row']
  },
  {
    id: 'machine_shoulder_press',
    name: {
      en: 'Machine Overhead Shoulder Press',
      fa: 'پرس سرشانه با دستگاه'
    },
    muscleGroup: 'Shoulders',
    targetMuscle: 'shoulders',
    type: 'compound',
    equipment: 'machine',
    difficulty: 'beginner',
    movementPattern: 'push',
    primaryMuscles: ['Anterior Deltoid', 'Lateral Deltoid'],
    secondaryMuscles: ['triceps'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Adjust seat height so handles sit level with upper ears.',
        'Sit back firmly against pad, core engaged.',
        'Press handles overhead to full arm extension without banging weights.',
        'Lower under 3-second control to ear level.'
      ],
      fa: [
        'ارتفاع صندلی را طوری تنظیم کنید که دستگیره‌ها هم‌سطح بالای گوش‌ها باشند.',
        'پشت را به تکیه‌گاه محکم بچسبانید و شکم را منقبض کنید.',
        'دستگیره‌ها را به بالا پرس کنید تا دست‌ها صاف شوند بدون قفل شدید مفصل.',
        'در ۳ ثانیه کنترل‌شده تا سطح گوش پایین بیاورید.'
      ]
    },
    commonMistakes: {
      en: ['Arched lower back.'],
      fa: ['قوس غیرعادی کمر.']
    },
    progressionOptions: {
      regression: 'machine_shoulder_press',
      progression: 'dumbbell_overhead_press',
      alternatives: ['dumbbell_overhead_press', 'overhead_barbell_press']
    },
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=Wqq43dKW1TU',
    youtubeId: 'Wqq43dKW1TU',
    youtubeTitle: 'Machine Shoulder Press Demonstration',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 75,
    guide: {
      steps: {
        en: ['Seat adjusted to ears.', 'Press upward smoothly.', 'Control descent.'],
        fa: ['تنظیم صندلی هم‌سطح گوش.', 'پرس روان به بالا.', 'فرود کنترل‌شده.']
      },
      commonMistakes: {
        en: ['Seat set too high or low.'],
        fa: ['تنظیم نامناسب ارتفاع صندلی.']
      },
      breathing: {
        en: 'Exhale up, inhale down.',
        fa: 'بازدم در صعود، دم در فرود.'
      },
      formCues: {
        en: ['Keep back pressed against seat.'],
        fa: ['پشت را به صندلی چسبیده نگه دارید.']
      },
      tempo: '3-0-1-0',
      tempoDescription: {
        en: '3s down, 1s up.',
        fa: '۳ ثانیه پایین، ۱ ثانیه بالا.'
      }
    },
    substitutes: ['dumbbell_overhead_press', 'overhead_barbell_press']
  }
];
