import { Exercise } from '../../types';

export const coreExercises: Exercise[] = [
  {
    id: 'classic_crunch',
    name: {
      en: 'Floor Abdominal Crunch',
      fa: 'کرانچ ساده روی زمین (شکم)'
    },
    muscleGroup: 'Core',
    targetMuscle: 'core',
    type: 'isolation',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    movementPattern: 'rotation',
    primaryMuscles: ['Rectus Abdominis (Upper Fibers)'],
    secondaryMuscles: ['obliques'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Lie supine on floor with knees bent at 90 degrees and feet flat.',
        'Place fingertips gently behind ears (do not pull neck).',
        'Flatten lower back into floor (posterior pelvic tilt).',
        'Flex thoracic spine curling ribs toward pelvis until shoulder blades leave floor.',
        'Squeeze abs hard at peak for 1 second, lower under 2-second control.'
      ],
      fa: [
        'به پشت روی زمین بخوابید و زانوها را در ۹۰ درجه خم کنید؛ کف پاها روی زمین باشد.',
        'نوک انگشتان را پشت گوش‌ها بگذارید (از کشیدن گردن به جلو خودداری کنید).',
        'گودی کمر را به زمین بچسبانید تا لگن به عقب متمایل شود.',
        'قفسه سینه را به سمت لگن جمع کنید تا تیغه‌های شانه از زمین جدا شوند.',
        '۱ ثانیه انقباض شدید در اوج ایجاد کرده و در ۲ ثانیه به آرامی فرود آیید.'
      ]
    },
    commonMistakes: {
      en: ['Yanking neck forward with hands.', 'Lifting lower back off floor.'],
      fa: ['کشیدن گردن با دست‌ها.', 'بلند شدن گودی کمر از زمین.']
    },
    progressionOptions: {
      regression: 'classic_crunch',
      progression: 'cable_kneeling_crunch',
      alternatives: ['cable_kneeling_crunch', 'hanging_leg_raise']
    },
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU',
    youtubeId: 'Xyd_fa5zoEU',
    youtubeTitle: 'How to Crunch Properly Without Neck Pain',
    defaultSets: 3,
    defaultReps: '15-20',
    defaultRestSec: 45,
    guide: {
      steps: {
        en: ['Lower back pinned to floor.', 'Fingers behind ears.', 'Curl ribs to pelvis.', '1s hard squeeze.'],
        fa: ['کمر چسبیده به زمین.', 'دست‌ها پشت گوش.', 'جمع کردن دنده‌ها به لگن.', '۱ ثانیه انقباض.']
      },
      commonMistakes: {
        en: ['Pulling cervical spine.'],
        fa: ['فشار به مهره‌های گردن.']
      },
      breathing: {
        en: 'Exhale completely at peak contraction, inhale lowering.',
        fa: 'بازدم کامل در اوج انقباض، دم در فرود.'
      },
      formCues: {
        en: ['Think about rolling your ribcage into your hip bones.'],
        fa: ['تصور کنید می‌خواهید دنده‌هایتان را به داخل استخوان لگن لوله کنید.']
      },
      tempo: '2-0-1-1',
      tempoDescription: {
        en: '2s down, 1s up, 1s squeeze.',
        fa: '۲ ثانیه پایین، ۱ ثانیه بالا، ۱ ثانیه انقباض.'
      }
    },
    substitutes: ['cable_kneeling_crunch', 'hanging_leg_raise']
  },
  {
    id: 'decline_bench_crunch',
    name: {
      en: 'Decline Bench Ab Crunch',
      fa: 'کرانچ روی میز شیبدار منفی'
    },
    muscleGroup: 'Core',
    targetMuscle: 'core',
    type: 'isolation',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    movementPattern: 'rotation',
    primaryMuscles: ['Rectus Abdominis'],
    secondaryMuscles: ['hip flexors'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Hook feet firmly under ankle rollers on decline bench.',
        'Cross arms over chest, curl spine smoothly pulling forehead toward thighs.',
        'Keep tension on abs without lying flat on bench between reps.',
        'Lower with 3-second control.'
      ],
      fa: [
        'پاها را در قلاب میز شیب منفی محکم کنید.',
        'دست‌ها را روی سینه ضربدری بگذارید و ستون فقرات را به آرامی به جلو جمع کنید.',
        'تنش شکم را در کل ست حفظ کنید بدون اینکه در انتها روی میز استراحت کنید.',
        'در ۳ ثانیه آرام به عقب برگردید.'
      ]
    },
    commonMistakes: {
      en: ['Using momentum or hip flexors exclusively.'],
      fa: ['استفاده از شتاب یا حرکت صرف مفصل ران به جای شکم.']
    },
    progressionOptions: {
      regression: 'classic_crunch',
      progression: 'ab_wheel_rollout',
      alternatives: ['cable_kneeling_crunch', 'ab_wheel_rollout']
    },
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=1bXy_L3wV7w',
    youtubeId: '1bXy_L3wV7w',
    youtubeTitle: 'Decline Bench Crunch Technique',
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Secure ankles.', 'Curl spine forward.', 'Constant tension.'],
        fa: ['ثابت کردن پاها.', 'جمع کردن ستون فقرات.', 'تنش یکنواخت.']
      },
      commonMistakes: {
        en: ['Hyperextending spine backwards.'],
        fa: ['قوس دادن شدید به کمر در عقب.']
      },
      breathing: {
        en: 'Exhale curling, inhale lowering.',
        fa: 'بازدم در صعود، دم در فرود.'
      },
      formCues: {
        en: ['Round your back on the way up to work abs.'],
        fa: ['ستون فقرات را گرد کنید تا شکم منقبض شود.']
      },
      tempo: '2-0-1-1',
      tempoDescription: {
        en: '2s down, 1s up, 1s hold.',
        fa: '۲ ثانیه پایین، ۱ ثانیه بالا، ۱ ثانیه مکث.'
      }
    },
    substitutes: ['cable_kneeling_crunch', 'classic_crunch']
  },
  {
    id: 'bicycle_crunch',
    name: {
      en: 'Bicycle Abdominal Crunch',
      fa: 'کرانچ دوچرخه (شکم و پهلو)'
    },
    muscleGroup: 'Core',
    targetMuscle: 'core',
    type: 'isolation',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    movementPattern: 'rotation',
    primaryMuscles: ['Rectus Abdominis', 'Internal & External Obliques'],
    secondaryMuscles: ['hip flexors'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Lie on back with fingers behind ears and legs elevated in tabletop.',
        'Rotate right elbow toward left knee while fully extending right leg straight.',
        'Alternate smoothly without pulling on neck, rotating torso completely on each side.'
      ],
      fa: [
        'روی کمر دراز بکشید، دست‌ها پشت گوش و پاها در هوا خمیده باشند.',
        'آرنج راست را به سمت زانوی چپ بچرخانید در حالی که پای راست کاملاً صاف کشیده می‌شود.',
        'به آرامی بین دو طرف جابجا شوید بدون کشیدن گردن و بالاتنه را بچرخانید.'
      ]
    },
    commonMistakes: {
      en: ['Speeding through reps without rotation.'],
      fa: ['سرعت بالا بدون چرخش کامل بالاتنه.']
    },
    progressionOptions: {
      regression: 'classic_crunch',
      progression: 'russian_twist',
      alternatives: ['russian_twist', 'hanging_leg_raise']
    },
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=9FGilxCbdz8',
    youtubeId: '9FGilxCbdz8',
    youtubeTitle: 'Bicycle Crunches: The Right Way - Jeff Cavaliere',
    defaultSets: 3,
    defaultReps: '20 total (10 per side)',
    defaultRestSec: 45,
    guide: {
      steps: {
        en: ['Opposite elbow to opposite knee.', 'Extend free leg straight.', 'Control cadence.'],
        fa: ['آرنج مخالف به زانوی مخالف.', 'صاف کردن پای آزاد.', 'ریتم کنترل‌شده.']
      },
      commonMistakes: {
        en: ['Yanking neck.'],
        fa: ['کشیدن گردن.']
      },
      breathing: {
        en: 'Rhythmic exhale on each cross-rotation.',
        fa: 'بازدم هماهنگ در هر چرخش به طرفین.'
      },
      formCues: {
        en: ['Turn your shoulder toward the knee, not just the elbow.'],
        fa: ['شانه را به سمت زانو بچرخانید نه فقط آرنج.']
      },
      tempo: '2-0-1-0',
      tempoDescription: {
        en: 'Smooth rotational tempo.',
        fa: 'ریتم چرخشی آرام و کنترل‌شده.'
      }
    },
    substitutes: ['russian_twist', 'hanging_leg_raise']
  },
  {
    id: 'hanging_leg_raise',
    name: {
      en: 'Hanging Leg / Knee Raise',
      fa: 'بالا کشیدن پا در حالت آویزان از بارفیکس (زیرشکم)'
    },
    muscleGroup: 'Core',
    targetMuscle: 'core',
    type: 'compound',
    equipment: 'bodyweight',
    difficulty: 'advanced',
    movementPattern: 'rotation',
    primaryMuscles: ['Rectus Abdominis (Lower Region)', 'Iliopsoas'],
    secondaryMuscles: ['forearms'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Hang from pull-up bar with overhand grip and engaged scapulae.',
        'Without swinging, curl pelvis upward (posterior tilt) and raise straight legs (or knees) until toes reach bar level or horizontal.',
        'Pause at peak for 1 second, lower under strict 3-second control without swinging backwards.'
      ],
      fa: [
        'از میله بارفیکس آویزان شوید و کتف‌ها را فعال نگه دارید.',
        'بدون تاب خوردن، لگن را به بالا بچرخانید و پاها را صاف تا موازات خط افق یا بالاتر بیاورید.',
        '۱ ثانیه در اوج مکث کرده و در ۳ ثانیه با کنترل کامل بدون تاب خوردن پایین بیاورید.'
      ]
    },
    commonMistakes: {
      en: ['Using swinging pendulum momentum.', 'Only lifting thighs without curling pelvis (only works hip flexors).'],
      fa: ['استفاده از تاب خوردن بدن.', 'بالا آوردن ران بدون چرخش لگن به بالا (که فقط خم‌کننده‌های ران را درگیر می‌کند).']
    },
    progressionOptions: {
      regression: 'cable_kneeling_crunch',
      progression: 'hanging_leg_raise',
      alternatives: ['cable_kneeling_crunch', 'ab_wheel_rollout']
    },
    gifUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=hdng3Nm1x_E',
    youtubeId: 'hdng3Nm1x_E',
    youtubeTitle: 'Hanging Leg Raise: Stop Swinging - Jeff Cavaliere',
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Dead hang stable.', 'Curl pelvis toward sternum.', 'Lift legs horizontal.', '3s slow negative.'],
        fa: ['آویزان با تعادل.', 'چرخش لگن به سمت جناغ.', 'بالا آوردن پاها تا افق.', '۳ ثانیه فرود منفی.']
      },
      commonMistakes: {
        en: ['Swinging backwards.'],
        fa: ['تاب خوردن به عقب.']
      },
      breathing: {
        en: 'Exhale raising legs, inhale lowering.',
        fa: 'بازدم هنگام بالا کشیدن پاها، دم هنگام فرود.'
      },
      formCues: {
        en: ['Show your belt buckle to your chest.'],
        fa: ['سگک کمربندتان را به سمت سینه بالا بچرخانید.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s down, 1s up, 1s peak hold.',
        fa: '۳ ثانیه فرود، ۱ ثانیه صعود، ۱ ثانیه مکث.'
      }
    },
    substitutes: ['cable_kneeling_crunch', 'ab_wheel_rollout']
  },
  {
    id: 'cable_kneeling_crunch',
    name: {
      en: 'Kneeling Cable Crunch',
      fa: 'کرانچ سیم‌کش زانو زده (شکم سیم‌کش با طناب)'
    },
    muscleGroup: 'Core',
    targetMuscle: 'core',
    type: 'isolation',
    equipment: 'cable',
    difficulty: 'intermediate',
    movementPattern: 'rotation',
    primaryMuscles: ['Rectus Abdominis (Full Sheet Progressive Overload)'],
    secondaryMuscles: ['obliques'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Kneel below high pulley with rope attachment held at sides of head/neck.',
        'Hips remain locked in high stationary position (do not sit back on heels).',
        'Flex spine curling elbows down toward knees, squeezing rectus abdominis forcefully.',
        'Hold contraction for 1 second, control return up to loaded stretch.'
      ],
      fa: [
        'زیر سیم‌کش بالا زانو بزنید و دو سر طناب را کنار گوش‌ها یا گردن نگه دارید.',
        'مفصل لگن در تمام طول حرکت ثابت و بالا بماند (روی پاشنه‌ها ننشینید).',
        'ستون فقرات را خم کرده و آرنج‌ها را به سمت زانوها جمع کنید و شکم را به شدت منقبض کنید.',
        '۱ ثانیه در اوج انقباض مکث کرده و در ۳ ثانیه به آرامی تا کشش کامل بالا برگردید.'
      ]
    },
    commonMistakes: {
      en: ['Sitting hips down onto heels turning it into a hip flexion exercise.'],
      fa: ['نشستن باسن روی پاشنه پاها و حذف تنش از روی شکم.']
    },
    progressionOptions: {
      regression: 'classic_crunch',
      progression: 'hanging_leg_raise',
      alternatives: ['hanging_leg_raise', 'ab_wheel_rollout']
    },
    gifUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=2fO41lqgE1U',
    youtubeId: '2fO41lqgE1U',
    youtubeTitle: 'How to Kneeling Cable Crunch: Stop Sitting on Your Heels',
    defaultSets: 4,
    defaultReps: '12-15',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Rope at temples.', 'Hips stationary.', 'Curl elbows to knees.', '1s hard contraction.'],
        fa: ['طناب کنار شقیقه‌ها.', 'لگن بی‌حرکت.', 'جمع کردن آرنج به زانو.', '۱ ثانیه انقباض در اوج.']
      },
      commonMistakes: {
        en: ['Sitting on heels.'],
        fa: ['نشستن روی پاشنه پا.']
      },
      breathing: {
        en: 'Exhale curling down, inhale extending up.',
        fa: 'بازدم هنگام جمع شدن، دم در بازگشت.'
      },
      formCues: {
        en: ['Curl your ribcage down to your pelvic bone.'],
        fa: ['قفسه سینه را مانند طومار به سمت استخوان لگن جمع کنید.']
      },
      tempo: '3-0-1-1',
      tempoDescription: {
        en: '3s return stretch, 1s crunch, 1s peak squeeze.',
        fa: '۳ ثانیه برگشت، ۱ ثانیه انقباض، ۱ ثانیه مکث.'
      }
    },
    substitutes: ['hanging_leg_raise', 'ab_wheel_rollout']
  },
  {
    id: 'standard_forearm_plank',
    name: {
      en: 'Isometric Forearm Plank',
      fa: 'پلانک ساعد ایزومتریک (ثبات عمقی مرکز بدن)'
    },
    muscleGroup: 'Core',
    targetMuscle: 'core',
    type: 'isolation',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    movementPattern: 'carry',
    primaryMuscles: ['Transverse Abdominis', 'Rectus Abdominis'],
    secondaryMuscles: ['glutes', 'shoulders'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Rest forearms on floor with elbows directly beneath shoulders.',
        'Extend legs straight, balance on balls of feet.',
        'Brace abdominal wall, squeeze glutes and quadriceps, maintaining perfectly straight line from head to heels.',
        'Pull elbows toward toes isometrically (RKC plank style) to amplify neural recruitment.'
      ],
      fa: [
        'روی ساعدها قرار بگیرید به طوری که آرنج‌ها دقیقاً زیر خط شانه باشند.',
        'پاها را صاف کشیده و روی پنجه‌ها تعادل بگیرید.',
        'شکم، باسن و چهارسر ران را محکم منقبض کنید تا بدن از سر تا پاشنه یک خط کاملاً مستقیم باشد.',
        'آرنج‌ها را به صورت ایزومتریک به سمت پنجه پاها بکشید تا انقباض عمقی به حداکثر برسد.'
      ]
    },
    commonMistakes: {
      en: ['Sagging lumbar spine towards floor.', 'Piking hips into air.'],
      fa: ['گود شدن و افتادن کمر به سمت زمین.', 'بالا دادن بیش از حد باسن به شکل هشت.']
    },
    progressionOptions: {
      regression: 'standard_forearm_plank',
      progression: 'ab_wheel_rollout',
      alternatives: ['ab_wheel_rollout', 'hanging_leg_raise']
    },
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c',
    youtubeId: 'ASdvN_XEl_c',
    youtubeTitle: 'How to Plank with Maximum Core Activation (RKC Plank)',
    defaultSets: 3,
    defaultReps: '45-60s hold',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Elbows under shoulders.', 'Glutes & core braced.', 'Straight line spine.', 'Hold isometric tension.'],
        fa: ['آرنج زیر شانه.', 'انقباض شکم و باسن.', 'ستون فقرات کاملاً صاف.', 'حفظ تنش ایزومتریک.']
      },
      commonMistakes: {
        en: ['Sagging hips.'],
        fa: ['افتادن لگن به پایین.']
      },
      breathing: {
        en: 'Shallow rhythmic diaphragmatic breathing while maintaining brace.',
        fa: 'تنفس ریتمیک دیافراگمی در حین حفظ انقباض کامل شکم.'
      },
      formCues: {
        en: ['Pull elbows toward toes to double core tension.'],
        fa: ['آرنج‌ها را بدون حرکت به سمت پنجه‌ها منقبض کنید.']
      },
      tempo: 'Hold',
      tempoDescription: {
        en: 'Sustained maximal isometric contraction.',
        fa: 'حفظ تنش ایزومتریک حداکثری بدون لرزش.'
      }
    },
    substitutes: ['ab_wheel_rollout', 'cable_kneeling_crunch']
  },
  {
    id: 'russian_twist',
    name: {
      en: 'Seated Russian Twist with Weight',
      fa: 'راشن توئیست نشسته با وزنه (چرخش روسی مورب شکم)'
    },
    muscleGroup: 'Core',
    targetMuscle: 'core',
    type: 'isolation',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    movementPattern: 'rotation',
    primaryMuscles: ['External Obliques', 'Internal Obliques'],
    secondaryMuscles: ['Rectus Abdominis'],
    injuryRiskLevel: 'low',
    instructions: {
      en: [
        'Sit on floor, lean torso back 45 degrees, elevate feet slightly off floor for balance.',
        'Hold weight plate or dumbbell at chest.',
        'Rotate torso smoothly from left to right, tapping weight near hip on each side.',
        'Maintain tall chest and avoid spinal slumping.'
      ],
      fa: [
        'روی زمین بنشینید، بالاتنه را ۴۵ درجه به عقب متمایل کنید و پاها را برای حفظ تعادل کمی از زمین جدا کنید.',
        'دمبل یا صفحه وزنه را در جلوی سینه نگه دارید.',
        'بالاتنه را به آرامی به چپ و راست بچرخانید و وزنه را نزدیک زمین در کنار باسن مماس کنید.',
        'سینه را بالا نگه دارید و از قوز کردن پرهیز نمایید.'
      ]
    },
    commonMistakes: {
      en: ['Only moving arms side to side without rotating torso.'],
      fa: ['فقط تکان دادن دست‌ها به چپ و راست بدون چرخش واقعی بالاتنه.']
    },
    progressionOptions: {
      regression: 'bicycle_crunch',
      progression: 'hanging_leg_raise',
      alternatives: ['bicycle_crunch', 'cable_kneeling_crunch']
    },
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI',
    youtubeId: 'wkD8rjkodUI',
    youtubeTitle: 'Russian Twist Form: Maximize Obliques',
    defaultSets: 3,
    defaultReps: '20 twists (10 per side)',
    defaultRestSec: 60,
    guide: {
      steps: {
        en: ['Lean back 45 degrees.', 'Rotate ribs side to side.', 'Controlled cadence.'],
        fa: ['شیب ۴۵ درجه به عقب.', 'چرخش دنده‌ها به طرفین.', 'ریتم کنترل‌شده.']
      },
      commonMistakes: {
        en: ['Rushing without full rotation.'],
        fa: ['انجام سرعتی بدون چرخش کامل.']
      },
      breathing: {
        en: 'Exhale with each rotation.',
        fa: 'بازدم در هر بار چرخش به طرفین.'
      },
      formCues: {
        en: ['Turn your entire ribcage to the side.'],
        fa: ['تمام قفسه سینه را به سمت چپ و راست بچرخانید.']
      },
      tempo: '1-0-1-0',
      tempoDescription: {
        en: 'Controlled rhythmic rotational cadence.',
        fa: 'ریتم چرخشی کنترل‌شده و هماهنگ.'
      }
    },
    substitutes: ['bicycle_crunch']
  },
  {
    id: 'ab_wheel_rollout',
    name: {
      en: 'Kneeling Ab Wheel Rollout',
      fa: 'غلتک شکم زانو زده (Ab Wheel Rollout)'
    },
    muscleGroup: 'Core',
    targetMuscle: 'core',
    type: 'compound',
    equipment: 'bodyweight',
    difficulty: 'advanced',
    movementPattern: 'carry',
    primaryMuscles: ['Rectus Abdominis (Anti-Extension)', 'Transverse Abdominis'],
    secondaryMuscles: ['lats', 'shoulders'],
    injuryRiskLevel: 'medium',
    instructions: {
      en: [
        'Kneel with knees hip-width on pad, hold ab roller directly under shoulders.',
        'Brace core and tuck pelvis under (posterior pelvic tilt).',
        'Roll wheel forward under 3-second control extending body as far as possible without lower back sagging.',
        'Contract abdominal wall and lats to pull wheel back under shoulders.'
      ],
      fa: [
        'روی پد زانو بزنید و دسته‌های غلتک را درست زیر شانه نگه دارید.',
        'عضلات شکم را کاملاً منقبض کرده و لگن را به زیر بکشید.',
        'غلتک را در ۳ ثانیه به آرامی به جلو بغلتانید تا جایی که بدن کشیده شود بدون اینکه کمر گود بیفتد.',
        'با انقباض شدید شکم و زیربغل، غلتک را دوباره به زیر شانه‌ها بازگردانید.'
      ]
    },
    commonMistakes: {
      en: ['Allowing lower back to hyperextend/sag into lumbar lordosis under peak extension.'],
      fa: ['گود شدن و سقوط کمر به سمت زمین در اوج کشش به جلو که برای دیسک مهره‌ها خطرناک است.']
    },
    progressionOptions: {
      regression: 'standard_forearm_plank',
      progression: 'hanging_leg_raise',
      alternatives: ['hanging_leg_raise', 'cable_kneeling_crunch']
    },
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=33K16Xw70v8',
    youtubeId: '33K16Xw70v8',
    youtubeTitle: 'Ab Wheel Rollout Guide: Don’t Hurt Your Back - Jeff Cavaliere',
    defaultSets: 3,
    defaultReps: '8-12',
    defaultRestSec: 75,
    guide: {
      steps: {
        en: ['Posterior pelvic tilt locked.', 'Roll forward under control.', 'Stop before back arches.', 'Pull back with abs.'],
        fa: ['قفل انقباض لگن.', 'غلتیدن به جلو با کنترل.', 'توقف قبل از گود شدن کمر.', 'بازگشت با نیروی شکم.']
      },
      commonMistakes: {
        en: ['Hyperextending spine.'],
        fa: ['قوس دادن به ستون فقرات.']
      },
      breathing: {
        en: 'Inhale rolling out, exhale pulling back.',
        fa: 'دم هنگام غلتیدن به جلو، بازدم هنگام بازگشت به عقب.'
      },
      formCues: {
        en: ['Never let your lower back sag towards the floor.'],
        fa: ['هرگز اجازه ندهید گودی کمر به سمت زمین خم شود.']
      },
      tempo: '3-0-1-0',
      tempoDescription: {
        en: '3s roll out, 1s pull in.',
        fa: '۳ ثانیه رفت، ۱ ثانیه برگشت.'
      }
    },
    substitutes: ['hanging_leg_raise', 'cable_kneeling_crunch']
  }
];
