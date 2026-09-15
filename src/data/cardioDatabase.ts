import { CardioExerciseItem, CardioCompletedSession, CardioTargetMuscleGroup } from '../types';

export const CARDIO_STORAGE_KEY_SESSIONS = 'fitcoach_home_cardio_sessions';
export const CARDIO_STORAGE_KEY_PREFS = 'fitcoach_home_cardio_prefs';

export const cardioExerciseLibrary: CardioExerciseItem[] = [
  // ==========================================
  // 1. CORE & ABS (شکم و میان‌تنه)
  // ==========================================
  {
    id: 'mountain_climbers',
    name: {
      en: 'High-Tempo Mountain Climbers',
      fa: 'کوهنورد سرعتی اینتروال (شکم و استقامت)'
    },
    targetGroup: 'core',
    primaryMuscles: {
      en: 'Rectus Abdominis, Hip Flexors, Shoulders',
      fa: 'راست شکمی، خم‌کننده‌های ران و ثبات شانه'
    },
    intensity: 'high',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 11,
    instructions: {
      en: [
        'Start in a solid high plank position with hands stacked directly below shoulders.',
        'Engage your core to maintain a neutral spine without sagging hips.',
        'Drive one knee forward toward your chest rapidly, then switch legs with an explosive sprint cadence.',
        'Keep light on your toes and pump continuously for the full interval.'
      ],
      fa: [
        'در وضعیت شنا یا پلانک دست صاف قرار بگیرید؛ دست‌ها دقیقا زیر سرشانه باشند.',
        'شکم را محکم منقبض کنید تا باسن بالا نزند یا گود نیفتد.',
        'یک زانو را به سمت سینه پرتاب کرده و بلافاصله با ضرباهنگ دویدن جای پاها را عوض کنید.',
        'روی پنجه‌ها سبک بمانید و ریتم انفجاری را در تمام مدت ست حفظ کنید.'
      ]
    },
    tips: {
      en: 'Avoid letting your hips bounce high in the air. Keep shoulders locked directly over hands.',
      fa: 'از جهش دادن بیش از حد باسن به سمت بالا خودداری کنید؛ مرکز ثقل بدن را ثابت نگه دارید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'nmwgirgXLYM',
    youtubeTitle: 'How to Do Mountain Climbers | Abs Workout',
    googleSearchQuery: 'mountain climbers exercise form gif',
  },
  {
    id: 'bicycle_crunches',
    name: {
      en: 'Speed Bicycle Crunches',
      fa: 'کرانچ دوچرخه سرعتی (مورب شکمی و پهلو)'
    },
    targetGroup: 'core',
    primaryMuscles: {
      en: 'Obliques, Lower Abs, Core',
      fa: 'عضلات مورب شکم (پهلوها) و زیر شکم'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 9,
    instructions: {
      en: [
        'Lie on your back, knees bent, fingertips touching temples lightly.',
        'Lift shoulder blades off the mat and extend one leg out at 45 degrees.',
        'Rotate your torso to bring opposite elbow toward the opposite knee.',
        'Alternate sides in a fluid, rhythmic bicycling cadence without pulling on the neck.'
      ],
      fa: [
        'به پشت بخوابید، دست‌ها کنار گوش‌ها باشد و تیغه شانه‌ها را از زمین بلند کنید.',
        'یک پا را با زاویه ۴۵ درجه صاف کرده و زانوی دیگر را جمع کنید.',
        'تنه را بچرخانید تا آرنج مخالف به زانوی جمع‌شده نزدیک شود.',
        'به صورت متناوب و ریتمیک پدال بزنید بدون اینکه به گردن فشاری بیاورید.'
      ]
    },
    tips: {
      en: 'Focus on rotating the thoracic ribcage rather than simply swinging your elbows.',
      fa: 'تمرکز بر چرخش قفسه سینه از عضلات پهلو باشد، نه صرفا تاب دادن آرنج‌ها.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&auto=format&fit=crop&q=80',
    youtubeId: '9FGilxCbdz8',
    youtubeTitle: 'Bicycle Crunches Proper Form & Technique',
    googleSearchQuery: 'bicycle crunch exercise gif abs',
  },
  {
    id: 'plank_jacks',
    name: {
      en: 'Dynamic Plank Jacks',
      fa: 'پلانک جک پرشی (چربی‌سوزی میان‌تنه)'
    },
    targetGroup: 'core',
    primaryMuscles: {
      en: 'Transverse Abdominis, Glutes, Deltoids',
      fa: 'ترنسورس شکم، سرینی و کمربند شانه‌ای'
    },
    intensity: 'high',
    defaultWorkSec: 35,
    defaultRestSec: 20,
    caloriesPerMinute: 10,
    instructions: {
      en: [
        'Begin in a forearm or high plank with feet together and core braced.',
        'Jump both feet wide apart, then jump them back together like a horizontal jumping jack.',
        'Maintain a steady, flat back without letting your lower back sag.'
      ],
      fa: [
        'در وضعیت پلانک روی ساعد یا کف دست قرار گیرید و پاها را جفت کنید.',
        'با جهشی نرم و فنری، هر دو پا را به اطراف باز کرده و دوباره به هم بچسبانید.',
        'شکم را محکم قفل کنید تا ستون فقرات ذره‌ای تکان نخورد.'
      ]
    },
    tips: {
      en: 'Land softly on the balls of your feet to protect your knees and lower back.',
      fa: 'فرود نرم روی پنجه پا داشته باشید تا ضربه به مفاصل زانو و مهره‌ها جذب شود.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'xc0n_1q9qps',
    youtubeTitle: 'How to Do Plank Jacks Core Cardio',
    googleSearchQuery: 'plank jacks cardio exercise gif',
  },
  {
    id: 'sprinter_situps',
    name: {
      en: 'Explosive Sprinter Sit-Ups',
      fa: 'سیت‌آپ دونده انفجاری (شکم و ریتم دویدن)'
    },
    targetGroup: 'core',
    primaryMuscles: {
      en: 'Full Rectus Abdominis, Hip Flexors',
      fa: 'کل دیواره قدامی راست شکمی و ماهیچه خاصره'
    },
    intensity: 'high',
    defaultWorkSec: 35,
    defaultRestSec: 25,
    caloriesPerMinute: 10,
    instructions: {
      en: [
        'Lie flat on your back with legs fully extended and arms resting at your sides.',
        'Explosively sit up while driving your right knee to your chest and pumping your left arm forward like a sprinter.',
        'Lower with controlled tension back to the mat, then alternate to the left knee and right arm.'
      ],
      fa: [
        'صاف به پشت بخوابید و پاها را کشیده نگه دارید.',
        'به صورت انفجاری بالاتنه را بالا کشیده و همزمان زانوی راست را جمع کرده و دست چپ را مانند دونده سرعت جلو بیاورید.',
        'با کنترل به زمین برگشته و بلافاصله برای زانوی چپ و دست راست تکرار کنید.'
      ]
    },
    tips: {
      en: 'Use your core power rather than momentum to initiate the ascent.',
      fa: 'نیروی صعود را از عضلات شکم بگیرید نه از پرتاب گردن.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'xWz3W77_n6w',
    youtubeTitle: 'Sprinter Sit-Up Home Cardio & Core',
    googleSearchQuery: 'sprinter sit-ups exercise gif',
  },
  {
    id: 'russian_twists',
    name: {
      en: 'Fast Russian Twists',
      fa: 'چرخش روسی سرعتی (انقباض مداوم پهلو)'
    },
    targetGroup: 'core',
    primaryMuscles: {
      en: 'Internal & External Obliques',
      fa: 'عضلات مورب داخلی و خارجی شکم'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 8,
    instructions: {
      en: [
        'Sit on the floor with knees bent and feet elevated slightly off the floor.',
        'Lean torso back at a 45-degree angle to create deep abdominal tension.',
        'Clasp hands together and rotate your torso rapidly from side to side, tapping near your hips.'
      ],
      fa: [
        'روی زمین بنشینید، زانوها را خم کرده و کف پاها را کمی از زمین جدا کنید.',
        'تنه را ۴۵ درجه به عقب متمایل کنید تا شکم به شدت درگیر شود.',
        'دست‌ها را به هم قفل کرده و تنه را با سرعت و تمرکز به چپ و راست بچرخانید.'
      ]
    },
    tips: {
      en: 'Keep your chest proud and spine neutral. Do not round your upper back.',
      fa: 'سینه را باز نگه دارید و از قوز کردن شانه خودداری فرمایید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'wkD8rjkodUI',
    youtubeTitle: 'Russian Twist Form for Obliques',
    googleSearchQuery: 'russian twist cardio core exercise gif',
  },

  // ==========================================
  // 2. LEGS & GLUTES (پا و باسن)
  // ==========================================
  {
    id: 'jump_squats',
    name: {
      en: 'Explosive Jump Squats',
      fa: 'اسکوات پرشی انفجاری (چهارسر و باسن)'
    },
    targetGroup: 'legs',
    primaryMuscles: {
      en: 'Quadriceps, Glutes, Calves, Cardiovascular',
      fa: 'چهارسر ران، سرینی، ساق و سیستم قلبی‌عروقی'
    },
    intensity: 'explosive',
    defaultWorkSec: 35,
    defaultRestSec: 25,
    caloriesPerMinute: 13,
    instructions: {
      en: [
        'Stand with feet shoulder-width apart, toes slightly angled outward.',
        'Descend into a parallel squat while loading your hips and glutes.',
        'Explosively drive through the floor to launch upward into a vertical jump.',
        'Land softly through toes to midfoot and immediately absorb down into the next squat.'
      ],
      fa: [
        'بایستید، پاها به اندازه عرض شانه باز و پنجه‌ها کمی به بیرون متمایل باشند.',
        'به حالت اسکوات استاندارد تا موازی زمین پایین بروید و عضلات باسن را شارژ کنید.',
        'با انفجار تمام کف پا به زمین فشار آورده و به بالا پرتاب شوید.',
        'فرود کاملاً نرم روی پنجه و کف پا داشته باشید و بلافاصله تکرار بعد را آغاز کنید.'
      ]
    },
    tips: {
      en: 'Cushion the landing by flexing ankles, knees, and hips simultaneously.',
      fa: 'فرود را فنری و بی‌صدا انجام دهید تا کمترین فشار مخرب به مفاصل زانو وارد شود.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'A-cFYWvaW3I',
    youtubeTitle: 'How to Do Jump Squats Plyometric Cardio',
    googleSearchQuery: 'jump squats exercise gif home workout',
  },
  {
    id: 'skater_hops',
    name: {
      en: 'Lateral Skater Hops',
      fa: 'پرش اسکی‌باز به طرفین (باسن و چابکی جانبی)'
    },
    targetGroup: 'legs',
    primaryMuscles: {
      en: 'Gluteus Medius, Quads, Ankle Stabilizers',
      fa: 'سرینی میانی، پهلوی باسن و پایداری مچ پا'
    },
    intensity: 'high',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 11,
    instructions: {
      en: [
        'Start on your right foot with knee slightly bent, bounding laterally to your left.',
        'Land softly on the left foot, sweeping the right leg behind your left ankle.',
        'Immediately rebound to the right side, swinging your arms rhythmically for momentum.'
      ],
      fa: [
        'روی پای راست با زانوی کمی خم بایستید و به سمت چپ جهش جانبی کنید.',
        'فرود نرم روی پای چپ داشته و پای راست را از پشت به صورت مورب رد کنید.',
        'بلافاصله با جهشی انفجاری به سمت راست پریده و دست‌ها را هماهنگ تاب دهید.'
      ]
    },
    tips: {
      en: 'Stay low in an athletic stance throughout to keep constant tension on the glutes.',
      fa: 'مرکز ثقل را پایین نگه دارید تا فشار مداوم روی عضله سرینی میانی حفظ شود.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'dQVZ_o4y0i0',
    youtubeTitle: 'How to Do Skater Hops Cardio Agility',
    googleSearchQuery: 'skater hops exercise gif',
  },
  {
    id: 'lunge_jumps',
    name: {
      en: 'Alternating Lunge Jumps',
      fa: 'لانج پرشی متناوب (قدرت انفجاری پاها)'
    },
    targetGroup: 'legs',
    primaryMuscles: {
      en: 'Quadriceps, Hamstrings, Glutes',
      fa: 'چهارسر ران، پشت پا و باسن'
    },
    intensity: 'explosive',
    defaultWorkSec: 30,
    defaultRestSec: 30,
    caloriesPerMinute: 14,
    instructions: {
      en: [
        'Step forward into a lunge with both knees bent at 90-degree angles.',
        'Propel upward explosively, switching the position of your feet mid-air.',
        'Land softly in the opposite lunge and descend under control for the next jump.'
      ],
      fa: [
        'در وضعیت لانج قرار بگیرید؛ هر دو زانو در زاویه ۹۰ درجه باشند.',
        'با پرش انفجاری به بالا شلیک شده و در هوا جای پاها را عوض کنید.',
        'روی پای مخالف نرم فرود بیایید و بلافاصله به لانج بعدی بروید.'
      ]
    },
    tips: {
      en: 'If knee impact is an issue, perform high-speed stepping reverse lunges instead.',
      fa: 'اگر آسیب زانو دارید، به جای پرش لانج معکوس سرعتی بدون جهش اجرا کنید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80',
    youtubeId: '1ex_bNfyO5w',
    youtubeTitle: 'Jumping Lunges Plyometrics Technique',
    googleSearchQuery: 'jumping lunges exercise gif',
  },
  {
    id: 'glute_bridge_pulses',
    name: {
      en: 'High-Cadence Glute Bridge Pulses',
      fa: 'پل باسن سرعتی با پالس (انقباض متمرکز باسن)'
    },
    targetGroup: 'legs',
    primaryMuscles: {
      en: 'Gluteus Maximus, Hamstrings',
      fa: 'سرینی بزرگ و همسترینگ'
    },
    intensity: 'moderate',
    defaultWorkSec: 45,
    defaultRestSec: 15,
    caloriesPerMinute: 8,
    instructions: {
      en: [
        'Lie on back with knees bent and feet flat on the floor, hip-width apart.',
        'Drive through your heels to raise your hips into full glute lockout.',
        'Perform rapid, controlled 2-inch pulses at peak contraction without letting hips touch the floor.'
      ],
      fa: [
        'به پشت بخوابید، زانوها خم و کف پاها به اندازه عرض لگن روی زمین باشد.',
        'با فشار بر پاشنه‌ها لگن را به اوج بالا هدایت کرده و باسن را منقبض کنید.',
        'در همان اوج، پالس‌های ۵ سانتی‌متری سریع و پرفشار اجرا کنید بدون لمس زمین.'
      ]
    },
    tips: {
      en: 'Squeeze glutes actively at top. Do not hyperextend the lumbar spine.',
      fa: 'فشار را در باسن احساس کنید و از قوس دادن بیش از حد به کمر بپرهیزید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'wPM8icPu6H8',
    youtubeTitle: 'Glute Bridge Pulses at Home Workout',
    googleSearchQuery: 'glute bridge pulses exercise gif',
  },
  {
    id: 'wall_sit_calf_pulses',
    name: {
      en: 'Wall Sit with High-Frequency Calf Raises',
      fa: 'وال‌سیت دیواری ایزومتریک + ساق پا'
    },
    targetGroup: 'legs',
    primaryMuscles: {
      en: 'Quads (Isometric), Gastrocnemius, Soleus',
      fa: 'چهارسر ران (ایزومتریک) و دوقلوی ساق پا'
    },
    intensity: 'high',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 9,
    instructions: {
      en: [
        'Press your back flat against a wall and slide down until thighs are parallel to the floor.',
        'Hold the 90-degree quad burn while pumping your heels up and down in rapid calf raises.',
        'Breathe steadily through the lactic burn.'
      ],
      fa: [
        'پشت خود را به دیوار تکیه دهید و تا جایی پایین بروید که ران‌ها موازی زمین شوند.',
        'در همین زاویه ۹۰ درجه بمانید و همزمان پاشنه‌ها را سریع بالا و پایین ببرید تا ساق‌ها پمپ شوند.',
        'تنفس عمیق و ریتمیک را حفظ کرده و تسلیم سوزش اسید لاکتیک نشوید.'
      ]
    },
    tips: {
      en: 'Keep knees directly above ankles. Do not let knees cave inward.',
      fa: 'زانوها دقیقا بالای مچ پا قرار گیرند و به داخل متمایل نشوند.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'y-wV4Venusw',
    youtubeTitle: 'Wall Sit with Calf Raise Home Quad Burn',
    googleSearchQuery: 'wall sit calf raise exercise gif',
  },

  // ==========================================
  // 3. CHEST & UPPER BODY (سینه و بالاتنه)
  // ==========================================
  {
    id: 'hand_release_pushups',
    name: {
      en: 'Paced Hand-Release Push-Ups',
      fa: 'شنا سوئدی با رهایش دست (سینه، سه سر و استقامت)'
    },
    targetGroup: 'chest',
    primaryMuscles: {
      en: 'Pectoralis Major, Triceps, Anterior Deltoids',
      fa: 'سینه، پشت بازو و دلتوئید قدامی'
    },
    intensity: 'high',
    defaultWorkSec: 35,
    defaultRestSec: 25,
    caloriesPerMinute: 10,
    instructions: {
      en: [
        'Begin in a push-up position with hands slightly wider than shoulders.',
        'Lower chest all the way to the floor under full control.',
        'Lift hands 1 inch off the ground to eliminate momentum, then press the floor explosively back to plank.'
      ],
      fa: [
        'در وضعیت شنا قرار بگیرید؛ دست‌ها کمی بازتر از عرض شانه باشند.',
        'تمام سینه را با کنترل کامل روی زمین بگذارید.',
        'دست‌ها را ۲ سانتی‌متر از زمین جدا کنید تا اینرسی صفر شود، سپس با قدرت زمین را هل دهید.'
      ]
    },
    tips: {
      en: 'Keep the body rigid like a surfboard; do not peel off the floor like a wave.',
      fa: 'بدن مثل یک تخته چوب صاف بالا بیاید؛ از موج دادن به ستون فقرات بپرهیزید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&auto=format&fit=crop&q=80',
    youtubeId: '7tK1A_TqK8I',
    youtubeTitle: 'Hand Release Push Ups Proper Form',
    googleSearchQuery: 'hand release push up exercise gif',
  },
  {
    id: 'shoulder_tap_planks',
    name: {
      en: 'Speed Shoulder-Tap Planks',
      fa: 'پلانک ضربه به سرشانه (سینه و ضدچرخش)'
    },
    targetGroup: 'chest',
    primaryMuscles: {
      en: 'Chest, Anterior Deltoid, Anti-Rotation Core',
      fa: 'سینه، سرشانه قدامی و ثبات ضدچرخشی تنه'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 9,
    instructions: {
      en: [
        'Set up in a high push-up position with feet set wider than normal for hip stability.',
        'Lift right hand to tap left shoulder while resisting any torso tilt or hip wobble.',
        'Return hand and immediately tap right shoulder with left hand in continuous cadence.'
      ],
      fa: [
        'در وضعیت شنا قرار بگیرید؛ پاها را کمی بازتر بگذارید تا لگن نلرزد.',
        'دست راست را بالا آورده و سرشانه چپ را لمس کنید بدون اینکه باسن تکان بخورد.',
        'دست را برگردانده و با دست چپ سرشانه راست را با ریتمی سریع لمس کنید.'
      ]
    },
    tips: {
      en: 'Imagine balancing a cup of water on your lower back. Zero hip swaying.',
      fa: 'تصور کنید یک لیوان آب روی کمرتان است؛ باسن نباید به طرفین تاب بخورد.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'b2iR3E4p3g4',
    youtubeTitle: 'Plank Shoulder Taps Core & Upper Body',
    googleSearchQuery: 'shoulder tap plank exercise gif',
  },
  {
    id: 'explosive_chest_pushups',
    name: {
      en: 'Explosive / Knee Plyo Push-Ups',
      fa: 'شنا سوئدی انفجاری (توان و ریتم پرتابی سینه)'
    },
    targetGroup: 'chest',
    primaryMuscles: {
      en: 'Fast-Twitch Pectorals, Triceps, Delts',
      fa: 'فیبرهای تند انقباض سینه، سه سر بازو و شانه'
    },
    intensity: 'explosive',
    defaultWorkSec: 30,
    defaultRestSec: 30,
    caloriesPerMinute: 12,
    instructions: {
      en: [
        'Lower smoothly into a push-up (either from toes or knees for high volume).',
        'Press away from the floor so forcefully that your hands momentarily leave the ground.',
        'Absorb the landing softly directly into the next rep.'
      ],
      fa: [
        'به نرمی به پایین شنا بروید (می‌توان روی زانو برای حفظ سرعت و ریتم بالا اجرا کرد).',
        'با حداکثر توان زمین را به پایین هل دهید تا کف دست‌ها برای لحظه‌ای از زمین جدا شوند.',
        'فرود نرم با مچ دست و آرنج خمیده داشته باشید و فورا تکرار بعد را آغاز نمایید.'
      ]
    },
    tips: {
      en: 'Maintain strict abdominal bracing to protect the spine on every landing.',
      fa: 'شکم را در تمام طول فرود محکم نگه دارید تا فشار روی ستون فقرات نیفتد.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80',
    youtubeId: '9584V2gW1b4',
    youtubeTitle: 'Explosive Push Ups for Chest Power',
    googleSearchQuery: 'explosive push ups plyometric exercise gif',
  },
  {
    id: 't_spine_pushups',
    name: {
      en: 'Push-Up to Side T-Spine Rotation',
      fa: 'شنا با چرخش جانبی T (سینه و تحرک ستون فقرات)'
    },
    targetGroup: 'chest',
    primaryMuscles: {
      en: 'Pectorals, Serratus Anterior, Thoracic Spine',
      fa: 'سینه، دنده‌ای قدامی و چرخش قفسه سینه'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 9,
    instructions: {
      en: [
        'Perform a strict full push-up.',
        'At the top, rotate your torso to the right, extending right arm toward the ceiling in a side plank T-shape.',
        'Return to center, perform another push-up, and rotate to the left.'
      ],
      fa: [
        'یک شنا سوئدی کامل اجرا کنید.',
        'در بالای حرکت، تنه را به راست بچرخانید و دست راست را به سمت سقف باز کنید (حالت حرف T).',
        'به مرکز برگشته، یک شنای دیگر زده و این بار دست چپ را به سمت سقف بگشایید.'
      ]
    },
    tips: {
      en: 'Track your hand with your eyes as you reach upward to open the chest fully.',
      fa: 'با چشمانتان دست در حال صعود را دنبال کنید تا سینه کاملاً باز شود.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'dI0g5aPz0d0',
    youtubeTitle: 'Push Up with Rotation T-Spine Technique',
    googleSearchQuery: 'push up with rotation t-spine gif',
  },

  // ==========================================
  // 4. BACK & POSTERIOR CHAIN (پشت و زیربغل)
  // ==========================================
  {
    id: 'superman_pulldowns',
    name: {
      en: 'Superman Lat Pulldown Pulses',
      fa: 'سوپرمن با پول‌داون بدون وزنه (زیربغل و فیله)'
    },
    targetGroup: 'back',
    primaryMuscles: {
      en: 'Latissimus Dorsi, Rhomboids, Lower Back',
      fa: 'عضله پشتی بزرگ (لات)، لوزی‌شکل و فیله کمر'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 8,
    instructions: {
      en: [
        'Lie face down on the floor with arms extended straight overhead.',
        'Lift chest, arms, and thighs off the floor into a superman arch.',
        'Pull elbows down and back toward your ribs, squeezing your back lats intensely.',
        'Extend arms back forward under tension and repeat without touching the ground.'
      ],
      fa: [
        'روی شکم بخوابید و دست‌ها را بالای سر بکشید.',
        'سینه، دست‌ها و ران‌ها را از زمین بلند کنید (حالت سوپرمن).',
        'آرنج‌ها را با انقباض شدید زیربغل به سمت دنده‌ها به عقب بکشید.',
        'دست‌ها را مجددا به جلو ببرید و بدون فرود آمدن روی زمین ریتم را تکرار کنید.'
      ]
    },
    tips: {
      en: 'Imagine squeezing an orange between your shoulder blades at every pull.',
      fa: 'تصور کنید با تیغه‌های شانه در هر کشش یک پرتقال را می‌فشارید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'z6PJMT2y8GQ',
    youtubeTitle: 'Superman Lat Pulldown at Home Back Exercise',
    googleSearchQuery: 'superman lat pulldown exercise gif home',
  },
  {
    id: 'bird_dog_flow',
    name: {
      en: 'Fast-Tempo Bird Dog Pulses',
      fa: 'سگ پرنده ضربتی (ثبات فیله کمر و پشتی بزرگ)'
    },
    targetGroup: 'back',
    primaryMuscles: {
      en: 'Erector Spinae, Glutes, Posterior Slings',
      fa: 'راست‌کننده ستون فقرات، فیله و سرینی'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 7,
    instructions: {
      en: [
        'On hands and knees, extend right arm forward and left leg straight back.',
        'Drive elbow to knee under the torso, then snap back into long extension.',
        'Switch sides after half interval or alternate smoothly.'
      ],
      fa: [
        'در حالت چهاردست‌وپا قرار بگیرید؛ دست راست را جلو و پای چپ را عقب بکشید.',
        'آرنج و زانو را زیر شکم به هم برسانید و سپس با کشش انفجاری دوباره باز کنید.',
        'حرکت را برای هر دو سمت با تمرکز و ریتم انجام دهید.'
      ]
    },
    tips: {
      en: 'Keep hips square to the ground; do not let the pelvis tip or rotate.',
      fa: 'لگن را کاملا تراز نگه دارید و از کج شدن به یک سمت جلوگیری کنید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'wiFNA3sqjCA',
    youtubeTitle: 'Bird Dog Exercise for Core & Back Stability',
    googleSearchQuery: 'bird dog exercise gif back stability',
  },
  {
    id: 'reverse_plank_burn',
    name: {
      en: 'Reverse Plank Pulses',
      fa: 'پلانک معکوس با پالس (زنجیره خلفی و پشت)'
    },
    targetGroup: 'back',
    primaryMuscles: {
      en: 'Posterior Delts, Lat Slings, Erector Spinae, Hamstrings',
      fa: 'پشت شانه، عضلات خلفی، فیله کمر و همسترینگ'
    },
    intensity: 'high',
    defaultWorkSec: 35,
    defaultRestSec: 25,
    caloriesPerMinute: 9,
    instructions: {
      en: [
        'Sit with legs straight, hands behind your hips, fingers pointing toward feet.',
        'Drive hips up until your body forms a straight reverse incline from heels to shoulders.',
        'Squeeze shoulder blades back and perform small pulsing hip drives at the top.'
      ],
      fa: [
        'بنشینید، پاها صاف و دست‌ها پشت باسن قرار گیرند و نوک انگشتان رو به جلو باشد.',
        'لگن را بالا بکشید تا بدن از پاشنه تا شانه به یک خط صاف شیب‌دار تبدیل شود.',
        'تیغه‌های شانه را به هم بفشارید و پالس‌های کوتاه و قدرتمند در اوج اجرا کنید.'
      ]
    },
    tips: {
      en: 'Do not let your head drop back loosely; keep neck aligned with the spine.',
      fa: 'سر را رها نکنید؛ گردن در راستای طبیعی ستون فقرات باشد.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'Tz_u5qA9MvE',
    youtubeTitle: 'Reverse Plank Proper Form Back Chain',
    googleSearchQuery: 'reverse plank exercise gif',
  },
  {
    id: 'prone_ytw_raises',
    name: {
      en: 'Prone Y-T-W Scapular Burner',
      fa: 'لیفت پروانه‌ای Y-T-W روی شکم (عضلات پشتی و دلتوئید خلفی)'
    },
    targetGroup: 'back',
    primaryMuscles: {
      en: 'Middle/Lower Trapezius, Rear Deltoids, Rhomboids',
      fa: 'تراپزیوس میانی و پایینی، پشت شانه و لوزی‌شکل'
    },
    intensity: 'moderate',
    defaultWorkSec: 45,
    defaultRestSec: 15,
    caloriesPerMinute: 7,
    instructions: {
      en: [
        'Lie face down with forehead resting on mat.',
        'Form a Y with arms (thumbs up) and raise 10 times.',
        'Form a T with arms straight out and raise 10 times.',
        'Form a W with bent elbows and squeeze scapulae 10 times.'
      ],
      fa: [
        'روی شکم بخوابید و پیشانی را روی تشک بگذارید.',
        'دست‌ها را به شکل Y باز کرده (شست‌ها رو به سقف) و بالا بکشید.',
        'سپس دست‌ها را به شکل T کاملا افقی باز کرده و بالا ببرید.',
        'در نهایت آرنج‌ها را خم کرده (شکل W) و تیغه‌های شانه را به شدت منقبض کنید.'
      ]
    },
    tips: {
      en: 'Initiate all movements from the mid-back, keeping traps away from ears.',
      fa: 'حرکت را از عضلات میانی پشت آغاز کنید و شانه‌ها را به سمت گوش بالا نکشید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'lT9lU33b_yI',
    youtubeTitle: 'YTW Exercises for Back Posture',
    googleSearchQuery: 'prone YTW raises exercise gif back',
  },

  // ==========================================
  // 5. SHOULDERS & ARMS (سرشانه و بازوها)
  // ==========================================
  {
    id: 'shadow_boxing_intervals',
    name: {
      en: 'High-Velocity Shadow Boxing',
      fa: 'شادو بوکسینگ سرعتی (سرشانه، بازو و توان هوازی)'
    },
    targetGroup: 'shoulders_arms',
    primaryMuscles: {
      en: 'Deltoids, Biceps, Triceps, Kinetic Chain',
      fa: 'دلتوئید سرشانه، جلو بازو، پشت بازو و ضربان قلب'
    },
    intensity: 'high',
    defaultWorkSec: 45,
    defaultRestSec: 15,
    caloriesPerMinute: 12,
    instructions: {
      en: [
        'Assume an active athletic boxing stance, hands protecting chin.',
        'Throw rapid combinations of straight jabs, crosses, hooks, and uppercuts.',
        'Stay light on feet, rotating hips and snapping elbows on every punch.'
      ],
      fa: [
        'در گارد چابک بوکس قرار بگیرید؛ دست‌ها محافظ چانه باشند.',
        'ترکیب سریع ضربات مستقیم (جب و کراس)، قلاب (هوک) و آپرکات پرتاب کنید.',
        'روی پنجه‌ها برقصید، باسن را بچرخانید و در پایان هر ضربه بازو را سریع جمع کنید.'
      ]
    },
    tips: {
      en: 'Do not hyperextend the elbows at the end of punches; keep a soft micro-bend.',
      fa: 'آرنج را در پایان ضربه قفل نکنید؛ خمش میلی‌متری ایمنی مفصل را تضمین می‌کند.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'fL00iUjH9zM',
    youtubeTitle: 'Shadow Boxing Cardio Workout for Beginners',
    googleSearchQuery: 'shadow boxing cardio workout gif',
  },
  {
    id: 'inchworm_pushup',
    name: {
      en: 'Dynamic Inchworm to Push-Up',
      fa: 'کرم صدپا با شنا سوئدی (سرشانه و کشش پویا)'
    },
    targetGroup: 'shoulders_arms',
    primaryMuscles: {
      en: 'Shoulders, Triceps, Chest, Hamstrings',
      fa: 'سرشانه، پشت بازو، سینه و کشش همسترینگ'
    },
    intensity: 'high',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 10,
    instructions: {
      en: [
        'Stand tall, hinge at hips, and place hands on the floor in front of your feet.',
        'Walk your hands forward step-by-step into a full plank position.',
        'Perform a crisp push-up, then walk hands backward and stand tall.'
      ],
      fa: [
        'صاف بایستید، از لگن خم شده و کف دست‌ها را جلوی پا روی زمین بگذارید.',
        'با دست‌ها قدم به قدم به جلو راه بروید تا به وضعیت پلانک برسید.',
        'یک شنا سوئدی تمیز بزنید و سپس با دست‌ها به عقب برگشته و کامل بایستید.'
      ]
    },
    tips: {
      en: 'Keep legs as straight as comfortably possible to stretch the hamstrings.',
      fa: 'تا حد امکان پاها را صاف نگه دارید تا پشت ران به زیبایی کشیده شود.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'ZY2ji_UzhX8',
    youtubeTitle: 'Inchworm Push Up Form & Technique',
    googleSearchQuery: 'inchworm push up exercise gif',
  },
  {
    id: 'couch_chair_dips',
    name: {
      en: 'Speed Chair / Couch Tricep Dips',
      fa: 'دیپ پشت بازو لبه مبل یا صندلی (سه سر بازویی)'
    },
    targetGroup: 'shoulders_arms',
    primaryMuscles: {
      en: 'Triceps Brachii, Anterior Deltoids',
      fa: 'عضله سه سر بازویی (پشت بازو) و جلوی سرشانه'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 9,
    instructions: {
      en: [
        'Sit on edge of sturdy chair or couch, grip edge next to hips, slide butt off.',
        'Bend elbows to 90 degrees lowering hips down close to chair edge.',
        'Powerfully extend elbows back to straight, locking out triceps with high cadence.'
      ],
      fa: [
        'لبه مبل یا صندلی محکم بنشینید، دست‌ها را کنار ران‌ها بگیرید و باسن را جلو ببرید.',
        'آرنج‌ها را تا زاویه ۹۰ درجه خم کنید و باسن را نزدیک لبه صندلی پایین بیاورید.',
        'با فشار قوی پشت بازوها را صاف کرده و با سرعت بالا تکرار کنید.'
      ]
    },
    tips: {
      en: 'Keep your back close to the couch to avoid excessive anterior shoulder shearing.',
      fa: 'پشت خود را نزدیک لبه مبل نگه دارید تا فشار برشی نامناسب روی مفصل شانه نیفتد.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&auto=format&fit=crop&q=80',
    youtubeId: '6kALZikXxLc',
    youtubeTitle: 'Chair Dips at Home for Triceps',
    googleSearchQuery: 'chair dips triceps exercise gif',
  },
  {
    id: 'up_down_planks',
    name: {
      en: 'Up-Down Military Planks',
      fa: 'پلانک آسانسوری بالا-پایین (بازوها، شانه و هسته بدن)'
    },
    targetGroup: 'shoulders_arms',
    primaryMuscles: {
      en: 'Triceps, Deltoids, Biceps, Core Bracing',
      fa: 'پشت بازو، سرشانه، جلو بازو و عضلات قفل شکمی'
    },
    intensity: 'high',
    defaultWorkSec: 35,
    defaultRestSec: 25,
    caloriesPerMinute: 11,
    instructions: {
      en: [
        'Start in a forearm plank.',
        'Press your right palm to the floor, then your left palm, rising to high plank.',
        'Lower right forearm back down, then left forearm, returning to forearm plank.',
        'Alternate lead arms on every rep.'
      ],
      fa: [
        'در وضعیت پلانک روی ساعد شروع کنید.',
        'کف دست راست را به زمین فشار دهید، سپس دست چپ تا به پلانک دست صاف برسید.',
        'ساعد راست را پایین بیاورید، سپس ساعد چپ را تا به موقعیت اولیه برگردید.',
        'در هر تکرار، دستی که شروع می‌کند را عوض کنید.'
      ]
    },
    tips: {
      en: 'Minimize lateral hip rocking as you press upward.',
      fa: 'تاب خوردن لگن به طرفین را هنگام بالا آمدن به حداقل برسانید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'h63v0H5N2uE',
    youtubeTitle: 'How to Do Up Down Planks (Commandos)',
    googleSearchQuery: 'up down planks commandos exercise gif',
  },

  // ==========================================
  // 6. FULL BODY & HIGH CALORIE BURN (کل بدن)
  // ==========================================
  {
    id: 'burpees_cardio',
    name: {
      en: 'Standard High-Efficiency Burpees',
      fa: 'برپی استاندارد سرعتی (حداکثر کالری‌سوزی کل بدن)'
    },
    targetGroup: 'full_body',
    primaryMuscles: {
      en: 'Full Kinetic Chain: Quads, Chest, Core, Shoulders',
      fa: 'کل زنجیره حرکتی: پاها، سینه، شکم، سرشانه و قلب'
    },
    intensity: 'explosive',
    defaultWorkSec: 35,
    defaultRestSec: 25,
    caloriesPerMinute: 15,
    instructions: {
      en: [
        'From standing, drop into a squat and place hands flat on the floor.',
        'Kick feet back into a push-up position and drop chest to the floor.',
        'Press up, snap feet forward right back into your squat.',
        'Explode straight up into the air with hands clapping overhead.'
      ],
      fa: [
        'از حالت ایستاده به اسکوات فرود آیید و دست‌ها را روی زمین بگذارید.',
        'پاها را با پرش به عقب پرتاب کرده و سینه را به زمین برسانید.',
        'بالا آمده، پاها را زیر لگن جمع کرده و در یک جهش به هوا پریده و دست‌ها را بالای سر بزنید.'
      ]
    },
    tips: {
      en: 'Find a smooth, sustainable breathing rhythm rather than sprinting then stopping.',
      fa: 'ریتم تنفسی یکنواختی پیدا کنید تا در طول ست دچار کمبود اکسیژن ناگهانی نشوید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'dZgVxmf6jkA',
    youtubeTitle: 'How to Do Burpees Properly Cardio Burn',
    googleSearchQuery: 'burpees exercise form gif cardio',
  },
  {
    id: 'jumping_jacks_speed',
    name: {
      en: 'High-Cadence Jumping Jacks',
      fa: 'پروانه پرشی سرعتی (تثبیت اکسیژن و ضربان قلب)'
    },
    targetGroup: 'full_body',
    primaryMuscles: {
      en: 'Cardiovascular, Calves, Deltoids, Adductors',
      fa: 'سیستم قلبی‌عروقی، ساق، سرشانه و نزدیک‌کننده‌های ران'
    },
    intensity: 'moderate',
    defaultWorkSec: 45,
    defaultRestSec: 15,
    caloriesPerMinute: 10,
    instructions: {
      en: [
        'Stand upright with feet together, arms resting at sides.',
        'Jump feet outward while sweeping arms overhead until hands touch.',
        'Immediately jump feet back together as arms return to sides.'
      ],
      fa: [
        'صاف بایستید؛ پاها جفت و دست‌ها کنار بدن باشند.',
        'پاها را به طرفین باز کنید و همزمان دست‌ها را به صورت قوسی بالای سر برسانید.',
        'بلافاصله به نقطه شروع برگردید و ریتمی سبک و سریع روی پنجه‌ها ایجاد کنید.'
      ]
    },
    tips: {
      en: 'Stay buoyant on the balls of your feet with soft knees.',
      fa: 'روی سینه پا فرود آیید و زانوها را نرم و فنری نگه دارید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'iSSAk4XCsRA',
    youtubeTitle: 'Jumping Jacks Exercise Form & Rhythm',
    googleSearchQuery: 'jumping jacks exercise gif cardio',
  },
  {
    id: 'high_knees_sprint',
    name: {
      en: 'In-Place High Knees Sprint',
      fa: 'دویدن درجا زانو بلند (انفجار ریه‌ها و متابولیسم)'
    },
    targetGroup: 'full_body',
    primaryMuscles: {
      en: 'Hip Flexors, Calves, Core, Cardiovascular',
      fa: 'خم‌کننده‌های ران، ساق پا، دیواره شکم و تنفس'
    },
    intensity: 'explosive',
    defaultWorkSec: 35,
    defaultRestSec: 25,
    caloriesPerMinute: 13,
    instructions: {
      en: [
        'Stand tall and run in place, driving knees up toward hip height.',
        'Pump your arms vigorously in coordination with opposing legs.',
        'Keep posture erect and maintain rapid ground turnover.'
      ],
      fa: [
        'صاف بایستید و درجا بدوید؛ زانوها را تا ارتفاع لگن یا کمر بالا بیاورید.',
        'دست‌ها را با قدرت و هماهنگ با پای مخالف تاب دهید.',
        'قامت خود را کشیده نگه داشته و سرعت تعویض پاها را به اوج برسانید.'
      ]
    },
    tips: {
      en: 'Avoid leaning backwards; lean slightly forward from ankles with tall torso.',
      fa: 'به عقب متمایل نشوید؛ تنه کشیده با شیب میلی‌متری به جلو بهینه‌ترین حالت است.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'oDdkytliOqE',
    youtubeTitle: 'High Knees Exercise for Fat Loss Cardio',
    googleSearchQuery: 'high knees exercise gif running',
  },
  {
    id: 'star_jumps_plyo',
    name: {
      en: 'Explosive Star Jumps',
      fa: 'پرش ستاره‌ای انفجاری (توان جهشی و پمپ قلبی)'
    },
    targetGroup: 'full_body',
    primaryMuscles: {
      en: 'Full Body Explosive: Glutes, Quads, Deltoids',
      fa: 'توان جهشی کل بدن: باسن، چهارسر، شانه و ریه‌ها'
    },
    intensity: 'explosive',
    defaultWorkSec: 30,
    defaultRestSec: 30,
    caloriesPerMinute: 14,
    instructions: {
      en: [
        'Crouch down with knees bent and hands touching ankles.',
        'Launch explosively into the air, spreading arms and legs wide into a mid-air star shape.',
        'Re-gather limbs softly on landing straight back into the crouch.'
      ],
      fa: [
        'در حالت اسکوات جمع بنشینید و دست‌ها را نزدیک مچ پا بگذارید.',
        'به صورت انفجاری به آسمان پرتاب شوید و دست‌ها و پاها را مثل یک ستاره در هوا بگشایید.',
        'هنگام فرود مجددا بدن را جمع کرده و به نرمی بدون ضربه تکرار بعد را آغاز کنید.'
      ]
    },
    tips: {
      en: 'Maximize your jump height and spread width while keeping landing completely cushioned.',
      fa: 'حداکثر ارتفاع و گشودگی دست و پا را با فرودی آرام و مهارشده ترکیب فرمایید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80',
    youtubeId: '0J_GZ1xJtQw',
    youtubeTitle: 'Star Jumps High Intensity Home Workout',
    googleSearchQuery: 'star jumps plyometrics exercise gif',
  }
];

// Preset Warm-up protocol (۵ دقیقه گرم‌کردن پویا)
export const standardCardioWarmup = [
  {
    title: {
      en: 'Arm Circles & Shoulder Rotations (Joint Synovial Prep)',
      fa: 'دایره‌های دست و چرخش سرشانه (روان‌کاری مفاصل بالاتنه)'
    },
    durationSec: 60,
  },
  {
    title: {
      en: 'Torso Twists & Hip Openers (Dynamic Spine Mobility)',
      fa: 'چرخش تنه و چرخش دایره‌ای لگن (تحرک‌پذیری ستون فقرات و لگن)'
    },
    durationSec: 60,
  },
  {
    title: {
      en: 'Bodyweight Air Squats with Reach (Lower Body Activation)',
      fa: 'اسکوات بدون وزن با کشش دست‌ها (فعال‌سازی پاها و باسن)'
    },
    durationSec: 60,
  },
  {
    title: {
      en: 'Light Jumping Jacks & Bounce (Heart Rate Elevation to Zone 2)',
      fa: 'پروانه آرام و پرش پنجه‌ای (بالا بردن تدریجی ضربان قلب به زون ۲)'
    },
    durationSec: 60,
  },
  {
    title: {
      en: 'Inchworm Dynamic Walkout (Hamstring & Posterior Elasticity)',
      fa: 'راه رفتن با دست به جلو بدون شنا (کشش کشسان عضلات پشت ران)'
    },
    durationSec: 60,
  }
];

// Preset Cool-down protocol (۵ دقیقه سرد کردن و کشش ایستا)
export const standardCardioCooldown = [
  {
    title: {
      en: 'Diaphragmatic Deep Breathing (Heart Rate Ramp-Down)',
      fa: 'تنفس عمیق دیافراگمی ۴-۴ (افت تدریجی ضربان قلب و آرامش سیستم عصبی)'
    },
    durationSec: 60,
  },
  {
    title: {
      en: 'Standing Quad & Hip Flexor Stretch (Lactic Acid Flushing)',
      fa: 'کشش ایستای چهارسر ران و سوئز لگنی (دفع اسید لاکتیک)'
    },
    durationSec: 60,
  },
  {
    title: {
      en: 'Seated or Standing Hamstring Fold (Posterior Chain Recovery)',
      fa: 'کشش عضلات پشت پا و باسن (ریکاوری زنجیره خلفی)'
    },
    durationSec: 60,
  },
  {
    title: {
      en: 'Child Pose with Lat Stretch (Spine Decompression)',
      fa: 'حرکت کودک یوگا با کشش عضلات زیربغل (برداشتن فشار از دیسک‌های کمر)'
    },
    durationSec: 60,
  },
  {
    title: {
      en: 'Cobra Abdominal & Chest Open Stretch (Anterior Decompression)',
      fa: 'کشش کبری برای عضلات شکم و سینه (باز شدن دیواره قدامی بدن)'
    },
    durationSec: 60,
  }
];

// Persistence: Load & Save Home Cardio Sessions
export function loadCardioCompletedSessions(): CardioCompletedSession[] {
  try {
    const raw = localStorage.getItem(CARDIO_STORAGE_KEY_SESSIONS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCardioCompletedSession(session: CardioCompletedSession): void {
  try {
    const existing = loadCardioCompletedSessions();
    const updated = [session, ...existing].slice(0, 50); // Keep last 50 sessions
    localStorage.setItem(CARDIO_STORAGE_KEY_SESSIONS, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save cardio session', err);
  }
}

export function loadCardioSavedPreferences(): {
  selectedTarget: CardioTargetMuscleGroup;
  selectedMode: 'tabata' | 'hiit' | 'moderate';
} {
  try {
    const raw = localStorage.getItem(CARDIO_STORAGE_KEY_PREFS);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return {
    selectedTarget: 'core',
    selectedMode: 'hiit',
  };
}

export function saveCardioPreferences(prefs: {
  selectedTarget: CardioTargetMuscleGroup;
  selectedMode: 'tabata' | 'hiit' | 'moderate';
}): void {
  try {
    localStorage.setItem(CARDIO_STORAGE_KEY_PREFS, JSON.stringify(prefs));
  } catch (err) {
    console.error('Failed to save cardio prefs', err);
  }
}
