import { CardioExerciseItem } from '../types';

/**
 * 30 Additional High-Tempo Scientific At-Home Cardio Exercises
 * Expanding the library across all muscle groups (Core, Legs, Chest, Back, Shoulders/Arms, Full Body).
 * Each movement is assigned a physiological patternType to enable sports-science compliant circuit sequencing.
 */
export const additionalCardioExercises: CardioExerciseItem[] = [
  // ==========================================
  // CORE EXPANSION (شکم و میان‌تنه)
  // ==========================================
  {
    id: 'hollow_body_flutter_kicks',
    name: {
      en: 'Hollow Body Rapid Flutter Kicks',
      fa: 'فلاتر کیک سرعتی هالو بادی (زیر شکم و فیله)'
    },
    targetGroup: 'core',
    patternType: 'burnout',
    primaryMuscles: {
      en: 'Lower Rectus Abdominis, Hip Flexors, Core Deep Wall',
      fa: 'زیر شکم، عضله سوئز، خم‌کننده‌های ران و دیواره عمقی شکم'
    },
    intensity: 'high',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 10,
    instructions: {
      en: [
        'Lie on back and press your lower back firmly into the floor with no gap under spine.',
        'Raise shoulders and legs 15-20cm off the floor into a tight hollow body banana shape.',
        'Perform rapid, alternating flutter kicks from the hips while keeping knees straight.',
        'Breathe rhythmically and maintain abdominal tension without letting lower back arch.'
      ],
      fa: [
        'به پشت دراز بکشید و گودی کمر را کاملاً به زمین بچسبانید تا هیچ فاصله‌ای نماند.',
        'سرشانه و پاها را ۱۵ تا ۲۰ سانتی‌متر از زمین جدا کنید تا فرم هالو بادی ایجاد شود.',
        'پاها را با زانوی صاف و از مفصل ران به صورت ضربدری و سرعتی پدال بزنید.',
        'تنفس منظم داشته باشید و نگذارید به هیچ وجه گودی کمر از زمین جدا شود.'
      ]
    },
    tips: {
      en: 'If your lower back begins to arch, raise your legs slightly higher to reduce lumbar stress.',
      fa: 'اگر گودی کمرتان بالا آمد، زاویه پاها را کمی بالاتر بیاورید تا فشار لومبار مهار شود.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'ANVdMDaYRts',
    youtubeTitle: 'How to Do Flutter Kicks | Abs Workout',
    googleSearchQuery: 'flutter kicks abs exercise gif',
  },
  {
    id: 'bear_crawl_hold_taps',
    name: {
      en: 'Bear Crawl Isometric Shoulder Taps',
      fa: 'پلانک خرسی چهار دست‌وپا با لمس شانه (ضد چرخش هسته بدن)'
    },
    targetGroup: 'core',
    patternType: 'core_stability',
    primaryMuscles: {
      en: 'Transverse Abdominis, Obliques, Serratus Anterior',
      fa: 'عضله عرضی شکم، مورب‌های شکمی و دندانه‌ای قدامی'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 9,
    instructions: {
      en: [
        'Set up on hands and knees with knees hovering just 2-3cm above the ground at 90 degrees.',
        'Keep spine flat like a tabletop and engage your core fully.',
        'Tap opposite shoulder with one hand with zero hip sway or rocking.',
        'Alternate hands with controlled, rapid stability.'
      ],
      fa: [
        'در وضعیت چهار دست و پا قرار بگیرید؛ زانوها زاویه ۹۰ درجه داشته و تنها ۲ تا ۳ سانتی‌متر از زمین شناور باشند.',
        'پشت را صاف مانند میز نگه داشته و شکم را منقبض کنید.',
        'با یک دست شانه مخالف را لمس کنید بدون اینکه لگن به طرفین تکان بخورد.',
        'دست‌ها را به تناوب با حفظ ثبات کامل هسته بدن جابجا کنید.'
      ]
    },
    tips: {
      en: 'Imagine balancing a cup of water on your lower back—do not spill a drop.',
      fa: 'تصور کنید یک لیوان آب روی گودی کمرتان قرار دارد؛ باسن نباید ذره‌ای تاب بخورد.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=700&auto=format&fit=crop&q=80',
    youtubeId: '0z5o43w1n7U',
    youtubeTitle: 'Bear Crawl Shoulder Tap Technique',
    googleSearchQuery: 'bear crawl shoulder tap form exercise gif',
  },
  {
    id: 'side_plank_hip_dips',
    name: {
      en: 'Side Plank Dynamic Hip Dips',
      fa: 'پلانک جانبی با پالس لگن (پهلو، مورب و ثبات ستون فقرات)'
    },
    targetGroup: 'core',
    patternType: 'unilateral_rotational',
    primaryMuscles: {
      en: 'Internal & External Obliques, Quadratus Lumborum',
      fa: 'عضلات مورب داخلی و خارجی شکم و مربع کمری'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 8,
    instructions: {
      en: [
        'Support yourself on one forearm directly under the shoulder, stacking feet or staggering.',
        'Lower hips down toward the mat slowly until a gentle stretch is felt in the waist.',
        'Explosively lift hips back up past neutral to maximum peak contraction.',
        'Switch sides halfway or alternate sides per interval.'
      ],
      fa: [
        'روی ساعد یک دست تکیه دهید؛ آرنج دقیقا زیر سرشانه باشد و پاها روی هم قرار گیرند.',
        'لگن را به آرامی به سمت زمین پایین بیاورید تا کشش پهلو حس شود.',
        'سپس لگن را با قدرت به بالا برانید تا انقباض کامل در پهلو شکل بگیرد.',
        'در نیمه تایم جهت را عوض کنید یا در راندهای متناوب پهلوی دیگر را هدف بگیرید.'
      ]
    },
    tips: {
      en: 'Keep your chest open and perpendicular to the ground—avoid collapsing chest forward.',
      fa: 'سینه را رو به جلو متمایل نکنید و شانه را کاملاً در راستای لگن قفل نگه دارید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'K2VljzCC16g',
    youtubeTitle: 'Side Plank Hip Dips Exercise Form',
    googleSearchQuery: 'side plank hip dips obliques gif',
  },
  {
    id: 'dead_bug_cardio_tempo',
    name: {
      en: 'Rhythmic Dead Bug Speed Pulses',
      fa: 'ددباگ ریتمیک سرعتی (هماهنگی عصبی و کنترل لگن)'
    },
    targetGroup: 'core',
    patternType: 'primer',
    primaryMuscles: {
      en: 'Deep Core Stabilizers, Pelvic Floor, Rectus Abdominis',
      fa: 'عضلات عمقی شکم، کف لگن و راست شکمی'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 8,
    instructions: {
      en: [
        'Lie on back with arms straight toward ceiling and knees bent at 90 degrees.',
        'Simultaneously extend right arm overhead and left leg straight toward floor at high tempo.',
        'Return to center and switch to opposite limbs with crisp rhythmic coordination.',
        'Ensure lower back stays glued to the floor throughout.'
      ],
      fa: [
        'به پشت بخوابید؛ دست‌ها عمود به سقف و زانوها با زاویه ۹۰ درجه بالا باشند.',
        'دست راست را به بالای سر و پای چپ را رو به جلو باز کنید با ریتم تند و کنترل‌شده.',
        'سریع به مرکز برگشته و اندام مخالف را باز کنید.',
        'کمر در تمام مسیر باید چسبیده به زمین بماند.'
      ]
    },
    tips: {
      en: 'Do not let momentum cause your lumbar spine to detach from the mat.',
      fa: 'نگذارید شتاب حرکت باعث فاصله گرفتن ستون فقرات از زمین شود.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&auto=format&fit=crop&q=80',
    youtubeId: '4XLEnwUr1d8',
    youtubeTitle: 'How to Do Dead Bug Exercise Correctly',
    googleSearchQuery: 'dead bug exercise abs form gif',
  },
  {
    id: 'standing_cross_knee_elbow',
    name: {
      en: 'Standing High-Knee Cross Oblique Drives',
      fa: 'زانو بلند ضربدری ایستاده به آرنج (چربی‌سوزی پهلو و شکم)'
    },
    targetGroup: 'core',
    patternType: 'explosive',
    primaryMuscles: {
      en: 'Obliques, Rectus Abdominis, Hip Flexors, Calves',
      fa: 'مورب شکمی، راست شکمی، عضلات خم‌کننده ران و ساق پا'
    },
    intensity: 'high',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 11,
    instructions: {
      en: [
        'Stand tall with feet shoulder-width apart, fingertips resting lightly at temples.',
        'Drive your right knee explosively up across your body toward your left elbow.',
        'Crunch your torso down diagonally to squeeze the oblique maximally.',
        'Return light on feet and alternate to opposite side with sprinting cadence.'
      ],
      fa: [
        'بایستید و دست‌ها را کنار گوش‌ها بگذارید.',
        'زانوی راست را با قدرت و جهش ریز به سمت آرنج چپ بالا بیاورید.',
        'تنه را به صورت مورب جمع کنید تا عضله پهلو فشرده شود.',
        'به نرمی فرود آمده و با ریتم سریع به سمت دیگر جابجا شوید.'
      ]
    },
    tips: {
      en: 'Focus on actively driving the knee above waist level rather than just rounding your back down.',
      fa: 'تمرکز روی بالا آوردن زانو بالاتر از خط کمر باشد نه صرفاً خم کردن سر به پایین.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'W3q8BvY3b-M',
    youtubeTitle: 'Standing Cross Knee Crunch HIIT Cardio',
    googleSearchQuery: 'standing cross knee crunch cardio gif',
  },

  // ==========================================
  // LEGS EXPANSION (پا و باسن)
  // ==========================================
  {
    id: 'pogo_hops_speed',
    name: {
      en: 'High-Frequency Pogo Ankle Hops',
      fa: 'جهش‌های پوگو سرعتی روی پنجه (چابکی مچ و تاندون آشیل)'
    },
    targetGroup: 'legs',
    patternType: 'primer',
    primaryMuscles: {
      en: 'Gastrocnemius, Soleus, Plantar Fascia, Ankle Stabilizers',
      fa: 'عضلات دوقلو، نعلی ساق، تاندون آشیل و مفاصل مچ پا'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 9,
    instructions: {
      en: [
        'Stand tall with knees almost straight, slight micro-bend to protect joints.',
        'Spring off balls of feet continuously using elastic rebound of ankles.',
        'Minimize ground contact time—bounce like a stiff rubber ball.',
        'Pump arms smoothly in sync with the ankle springs.'
      ],
      fa: [
        'بایستید؛ زانوها تقریباً صاف با خمیدگی بسیار نامحسوس باشند.',
        'فقط با استفاده از انرژی کشسانی مچ پا و روی پنجه‌ها به بالا پرتاب شوید.',
        'زمان برخورد پا با زمین را به حداقل برسانید؛ مانند یک فنر لاستیکی برگشت‌پذیر عمل کنید.',
        'دست‌ها را همگام با جهش‌های ریز حرکت دهید.'
      ]
    },
    tips: {
      en: 'Do not bend deeply at the knees; all vertical propulsion should come from calves and ankles.',
      fa: 'در ناحیه زانو خم نشوید؛ تمام جهش باید از نیروی الاستیک مچ و ساق حاصل شود.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'F2oDqu99G5Q',
    youtubeTitle: 'Pogo Jumps Exercise Form | Plyometrics',
    googleSearchQuery: 'pogo hops plyometrics exercise gif',
  },
  {
    id: 'curtsy_lunge_hops',
    name: {
      en: 'Explosive Curtsy Lunge Skater Bounds',
      fa: 'لانج تعظیمی پرشی ضربدری (باسن جانبی و داخل ران)'
    },
    targetGroup: 'legs',
    patternType: 'unilateral_rotational',
    primaryMuscles: {
      en: 'Gluteus Medius, Adductors, Quadriceps',
      fa: 'سرینی میانی، عضلات اداکتور داخل ران و چهارسر'
    },
    intensity: 'high',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 11,
    instructions: {
      en: [
        'Step one leg back and across behind your supporting leg, dropping into a deep curtsy lunge.',
        'Drive through front heel and spring laterally into the opposite curtsy lunge.',
        'Maintain an upright chest and keep hips pointing squarely forward.',
        'Land softly and immediately absorb into the next lateral bound.'
      ],
      fa: [
        'یک پا را به صورت مورب به پشت پای تکیه‌گاه برده و در وضعیت لانج تعظیمی پایین بروید.',
        'با پاشنه پای جلو فشار وارد کرده و با پرش جانبی به سمت مخالف حرکت کنید.',
        'سینه را بالا نگه دارید و جهت لگن را رو به جلو حفظ نمایید.',
        'فرود نرم داشته باشید و بلافاصله تکرار بعدی را در ریتم ادامه دهید.'
      ]
    },
    tips: {
      en: 'Ensure your front knee stays aligned over toes without collapsing inward.',
      fa: 'زانوی پای جلو نباید به داخل متمایل شود؛ در راستای پنجه نگه دارید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'dC3p3z5aV1k',
    youtubeTitle: 'Curtsy Lunge Plyo Cardio Exercise',
    googleSearchQuery: 'curtsy lunge jumps plyometrics gif',
  },
  {
    id: 'broad_jump_backpedal',
    name: {
      en: 'Broad Jump with Rapid Backpedal',
      fa: 'پرش جفت طول به جلو + عقب‌گرد سرعتی (توان انفجاری پاها)'
    },
    targetGroup: 'legs',
    patternType: 'explosive',
    primaryMuscles: {
      en: 'Glutes, Hamstrings, Quadriceps, Calves',
      fa: 'سرینی بزرگ، همسترینگ، چهارسر ران و سیستم قلبی'
    },
    intensity: 'explosive',
    defaultWorkSec: 35,
    defaultRestSec: 25,
    caloriesPerMinute: 13,
    instructions: {
      en: [
        'Hinge hips back into an athletic loaded squat with arms cocked behind.',
        'Swing arms forward and launch body as far forward horizontally as possible.',
        'Land softly in a quarter squat absorbing ground impact silently.',
        'Immediately backpedal fast on balls of feet to starting line and repeat.'
      ],
      fa: [
        'لگن را به عقب ببرید و در حالت نیمه اسکوات آماده جهش شوید؛ دست‌ها به عقب بروند.',
        'دست‌ها را به جلو پرتاب کرده و با تمام توان به جلو پرش طول کنید.',
        'فرودی بی‌صدا و نرم در حالت اسکوات کنترل‌شده داشته باشید.',
        'بلافاصله با گام‌های سریع روی پنجه به نقطه شروع برگردید و تکرار کنید.'
      ]
    },
    tips: {
      en: 'Land heel-to-toe and sit weight back into hips to safeguard knees.',
      fa: 'فرود را از پنجه به پاشنه منتقل کرده و وزن را روی باسن بیاندازید تا زانو ایمن باشد.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80',
    youtubeId: '1U3-6b4jXo0',
    youtubeTitle: 'Broad Jump to Backpedal Conditioning Drill',
    googleSearchQuery: 'broad jump backpedal conditioning gif',
  },
  {
    id: 'single_leg_bridge_kick',
    name: {
      en: 'Single-Leg Glute Bridge Pulses with Leg Kick',
      fa: 'پل باسن تک‌پا پالسی با پرتاب پا (همسترینگ و فیله)'
    },
    targetGroup: 'legs',
    patternType: 'core_stability',
    primaryMuscles: {
      en: 'Gluteus Maximus, Biceps Femoris, Lower Lumbar Chain',
      fa: 'سرینی بزرگ، همسترینگ، زنجیره خلفی و فیله کمر'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 8,
    instructions: {
      en: [
        'Lie on back with one foot planted on the ground and opposite leg raised straight to ceiling.',
        'Drive through planted heel to bridge hips up until body forms a straight ramp.',
        'Pulse at the top for 2 counts, then lower hips down to hover above floor.',
        'Maintain high tempo and swap legs halfway through the interval.'
      ],
      fa: [
        'به پشت بخوابید؛ یک پا روی زمین با زانوی خم و پای دیگر عمود به سقف صاف باشد.',
        'با پاشنه پای روی زمین فشار بیاورید و لگن را تا ایجاد خط مستقیم بالا ببرید.',
        'در نقطه اوج مکث ریز ۲ شماره‌ای کنید و سپس پایین بیایید بدون برخورد کامل با زمین.',
        'ریتم تند را حفظ کرده و در نیمه زمان پاها را عوض کنید.'
      ]
    },
    tips: {
      en: 'Squeeze glute hard at top without hyperextending through lower back.',
      fa: 'انقباض اصلی در باسن باشد نه اینکه با قوس دادن به کمر لگن را بالا بکشید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'f0XzH1Ua2_4',
    youtubeTitle: 'Single Leg Glute Bridge Form',
    googleSearchQuery: 'single leg glute bridge pulses exercise gif',
  },
  {
    id: 'sumo_squat_pulse_jumps',
    name: {
      en: 'Sumo Squat Pulse to Micro-Jump',
      fa: 'اسکوات سومو پالسی با جهش ریز (سوزش عمیق کشاله و باسن)'
    },
    targetGroup: 'legs',
    patternType: 'burnout',
    primaryMuscles: {
      en: 'Adductors, Gluteus Medius & Maximus, Vastus Medialis',
      fa: 'اداکتورها (داخل ران)، سرینی و بخش داخلی چهارسر'
    },
    intensity: 'high',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 11,
    instructions: {
      en: [
        'Take a wide stance with toes flared out at 45 degrees.',
        'Descend into a deep sumo squat, pulse up and down 5cm twice at the bottom.',
        'Explode into a small spring jump, landing softly right back into the sumo pulse.',
        'Keep torso tall and proud throughout the grueling burning interval.'
      ],
      fa: [
        'پاها را بازتر از عرض شانه بگذارید و پنجه‌ها را ۴۵ درجه رو به بیرون زاویه دهید.',
        'در عمق اسکوات سومو نشسته، دو پالس ریز ۵ سانتی‌متری در پایین بزنید.',
        'سپس جهش فنری ریزی به بالا انجام داده و نرم به عمق برگردید.',
        'سینه را کاملاً بالا و راست نگه دارید.'
      ]
    },
    tips: {
      en: 'Track knees directly in line with your angled toes—do not allow knees to cave inward.',
      fa: 'زانوها در راستای پنجه پا باز شوند و به هیچ وجه به داخل متمایل نشوند.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'b_7hQhM6Gso',
    youtubeTitle: 'Sumo Squat Pulse Jump Burnout Drill',
    googleSearchQuery: 'sumo squat pulse jump exercise gif',
  },

  // ==========================================
  // CHEST EXPANSION (سینه و بالاتنه)
  // ==========================================
  {
    id: 'wide_to_narrow_pushups',
    name: {
      en: 'Plyometric Wide-to-Narrow Pushups',
      fa: 'شنا سوئدی جابجایی دست باز به جمع جهشی (توان سینه)'
    },
    targetGroup: 'chest',
    patternType: 'explosive',
    primaryMuscles: {
      en: 'Pectoralis Major (Sternal & Clavicular), Triceps',
      fa: 'بخش میانی، خارجی و داخلی سینه و پشت بازو'
    },
    intensity: 'explosive',
    defaultWorkSec: 35,
    defaultRestSec: 25,
    caloriesPerMinute: 12,
    instructions: {
      en: [
        'Start in wide pushup position, lower chest to hover above floor.',
        'Push explosively up so hands leave floor and hop hands inward to shoulder-width.',
        'Perform narrow pushup, explode up and hop hands back out to wide stance.',
        'Keep core stiff as a board throughout the transitions.'
      ],
      fa: [
        'در وضعیت شنای دست باز شروع کنید و سینه را تا نزدیک زمین پایین ببرید.',
        'با انفجار دست‌ها را از زمین جدا کرده و دست‌ها را در فاصله عرض شانه جمع کنید.',
        'یک شنا سوئدی جمع بزنید، مجدد جهش کرده و دست‌ها را به حالت باز ببرید.',
        'بدن را کاملاً یک‌تکه و شبیه چوب سفت نگه دارید.'
      ]
    },
    tips: {
      en: 'Can be done with knees on mat if fatigued to keep explosive tempo high.',
      fa: 'در صورت افت توان می‌توانید زانوها را روی زمین بگذارید تا سرعت انفجاری حفظ شود.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'Z0qXQk7pP-0',
    youtubeTitle: 'Wide to Narrow Push Up Plyometrics',
    googleSearchQuery: 'wide to narrow push up plyometrics gif',
  },
  {
    id: 'sprawl_chest_drop',
    name: {
      en: 'Athletic Sprawl to Chest Contact',
      fa: 'اسپرال کشتی به فرود سینه و جهش سریع (توان متابولیک سینه)'
    },
    targetGroup: 'chest',
    patternType: 'burnout',
    primaryMuscles: {
      en: 'Pectorals, Anterior Deltoids, Core, Cardio Lungs',
      fa: 'سینه، دلتوئید قدامی، عضلات شکم و پمپ قلبی'
    },
    intensity: 'high',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 13,
    instructions: {
      en: [
        'From athletic stance, drop hands to mat and kick legs back into high plank.',
        'Drop chest smoothly to floor, press up immediately and snap feet wide to hands.',
        'Stand tall with hips through, pop hips forward and repeat with fight cadence.'
      ],
      fa: [
        'از حالت آماده‌باش، دست‌ها را روی مت گذاشته و پاها را سریع به عقب پرتاب کنید.',
        'سینه را مهارشده به زمین بزنید، سریع شنا را بالا آمده و پاها را کنار دست‌ها باز برگردانید.',
        'بایستید و لگن را صاف کنید و تکرار بعدی را با ریتم رزمی ادامه دهید.'
      ]
    },
    tips: {
      en: 'Snap feet wide around outside of hands to land flat on entire foot, not toes.',
      fa: 'پاها را اطراف دست‌ها پهن بنشانید تا روی کل کف پا فرود بیایید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'k7Kz0g1jM-k',
    youtubeTitle: 'Sprawl Conditioning Exercise Technique',
    googleSearchQuery: 'athletic sprawl chest drop exercise gif',
  },
  {
    id: 'pushup_to_downward_dog',
    name: {
      en: 'Pushup into Downward Dog Flow',
      fa: 'شنا سوئدی به سگ سرپایین (سینه، تحرک شانه و کشش پشت)'
    },
    targetGroup: 'chest',
    patternType: 'primer',
    primaryMuscles: {
      en: 'Pectorals, Anterior Deltoids, Scapular Retractors, Calves',
      fa: 'سینه، دلتوئید قدامی، عضلات شانه و کشش ساق و زنجیره خلفی'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 9,
    instructions: {
      en: [
        'Perform a crisp standard pushup with elbows tracking at 45 degrees.',
        'As you push up, push hips high toward ceiling into downward dog.',
        'Press chest back toward knees to open thoracic spine, then flow back forward into next pushup.'
      ],
      fa: [
        'یک شنای استاندارد تمیز بزنید به طوری که آرنج‌ها زاویه ۴۵ درجه داشته باشند.',
        'هنگام بالا آمدن، با فشار دست‌ها باسن را به بالا رانده و به سگ سرپایین بروید.',
        'سینه را به سمت زانوها کشش دهید و روان به شنا سوئدی بعدی بازگردید.'
      ]
    },
    tips: {
      en: 'Engage serratus anterior by driving hands aggressively into the floor during the downward dog peak.',
      fa: 'در نقطه اوج سگ سرپایین، دست‌ها را به زمین فشار دهید تا زیربغل و سراتوس فعال شوند.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80',
    youtubeId: '3Xl7qLp1Uqg',
    youtubeTitle: 'Push Up to Downward Dog Mobility Exercise',
    googleSearchQuery: 'pushup into downward dog flow exercise gif',
  },
  {
    id: 'isometric_chest_squeeze_pulses',
    name: {
      en: 'Isometric Prayer Chest Squeeze with High Knee Taps',
      fa: 'فشار ایزومتریک کف دست‌ها به هم با درجا ریتمیک (انقباض مداوم سینه)'
    },
    targetGroup: 'chest',
    patternType: 'core_stability',
    primaryMuscles: {
      en: 'Pectoralis Major & Minor, Biceps, Core',
      fa: 'سینه بزرگ، سینه کوچک، جلو بازو و پمپ هوازی'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 8,
    instructions: {
      en: [
        'Press palms together in front of chest in prayer position as hard as humanly possible.',
        'Maintain maximum continuous isometric chest contraction while marching or tapping knees high in place.',
        'Every 3 seconds, pulse hands forward and back 10cm without releasing palm pressure.'
      ],
      fa: [
        'کف دو دست را مقابل سینه با حداکثر توان به یکدیگر بفشارید تا سینه به لرزش بیفتد.',
        'فشار ایزومتریک را حفظ کرده و همزمان درجا زانو بلند آرام یا ریتمیک بزنید.',
        'هر ۳ ثانیه دست‌ها را ۱۰ سانتی‌متر به جلو و عقب پالس دهید بدون اینکه فشار دست‌ها کم شود.'
      ]
    },
    tips: {
      en: 'Keep elbows flared wide horizontally to concentrate all isometric recruitment directly on chest fibers.',
      fa: 'آرنج‌ها را به موازات زمین باز نگه دارید تا انقباض مستقیماً روی عضلات سینه متمرکز شود.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&auto=format&fit=crop&q=80',
    youtubeId: '6T3a1q_wG7o',
    youtubeTitle: 'Isometric Chest Squeeze Home Exercise',
    googleSearchQuery: 'isometric prayer chest squeeze exercise gif',
  },
  {
    id: 'archer_pushup_tempo',
    name: {
      en: 'Tempo Archer Pushup Alternations',
      fa: 'شنا آرچر تناوبی راست و چپ (سینه یک‌طرفه و قدرت تنه)'
    },
    targetGroup: 'chest',
    patternType: 'unilateral_rotational',
    primaryMuscles: {
      en: 'Pectoralis Major Unilateral, Triceps, Scapular Retractors',
      fa: 'سینه به صورت یک‌طرفه، پشت بازو و ثبات کتف'
    },
    intensity: 'high',
    defaultWorkSec: 35,
    defaultRestSec: 25,
    caloriesPerMinute: 10,
    instructions: {
      en: [
        'Set up in a wide pushup position with fingers angled slightly outward.',
        'Lower body toward right hand while left arm extends straight to the side like drawing a bow.',
        'Push forcefully through right palm back to center, then glide over to left side.'
      ],
      fa: [
        'دست‌ها را بازتر از شنا معمولی بگذارید و انگشتان را کمی رو به بیرون متمایل کنید.',
        'وزن را روی دست راست پایین ببرید در حالی که دست چپ مانند کشیدن کمان صاف به بغل کشیده می‌شود.',
        'با دست راست به بالا فشار آورده و سپس به سمت چپ متمایل شوید.'
      ]
    },
    tips: {
      en: 'Keep hips level with shoulders—resist the urge to rotate hips sideways.',
      fa: 'لگن را هم‌سطح شانه نگه دارید و از چرخیدن لگن به طرفین خودداری فرمایید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=700&auto=format&fit=crop&q=80',
    youtubeId: '8N_W1R7L0Q8',
    youtubeTitle: 'How to Do Archer Push Ups',
    googleSearchQuery: 'archer push ups bodyweight exercise gif',
  },

  // ==========================================
  // BACK EXPANSION (زیربغل و پشت)
  // ==========================================
  {
    id: 'swimmer_back_flutters',
    name: {
      en: 'Prone Swimmer Flutters with Scapular Retraction',
      fa: 'حرکت شناگر روی شکم سرعتی (زیربغل، فیله و باسن)'
    },
    targetGroup: 'back',
    patternType: 'burnout',
    primaryMuscles: {
      en: 'Latissimus Dorsi, Erector Spinae, Gluteals, Posterior Deltoid',
      fa: 'عضله پشتی بزرگ (زیربغل)، راست‌کننده‌های ستون فقرات و باسن'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 9,
    instructions: {
      en: [
        'Lie prone on stomach with arms extended straight overhead and legs long.',
        'Lift chest, arms, and thighs off the floor into posterior extension.',
        'Flutter opposite arm and opposite leg up and down in rapid, rhythmic swimming motion.',
        'Keep gaze directed toward mat to keep cervical spine neutral.'
      ],
      fa: [
        'روی شکم بخوابید؛ دست‌ها کشیده بالای سر و پاها صاف باشند.',
        'سینه، دست‌ها و ران‌ها را از زمین جدا کنید تا زنجیره پشتی منقبض شود.',
        'دست و پای مخالف را به صورت ضربدری و سرعتی مثل شنا کرال روی زمین بالا و پایین کنید.',
        'نگاهتان به سمت مت باشد تا گردن دچار گرفتگی نشود.'
      ]
    },
    tips: {
      en: 'Initiate flutters from shoulders and hips, not merely wrists and ankles.',
      fa: 'حرکت بال زدن را از مفصل شانه و لگن شروع کنید نه صرفاً مچ دست و پا.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'n3-7_x2U6rQ',
    youtubeTitle: 'Prone Swimmers Back Exercise Form',
    googleSearchQuery: 'swimmer flutters back exercise gif',
  },
  {
    id: 'crab_toe_touches',
    name: {
      en: 'Crab Position Alternating Toe Touches',
      fa: 'خرچنگ معکوس با لمس متناوب پنجه پا (پشت، کتف و تعادل)'
    },
    targetGroup: 'back',
    patternType: 'unilateral_rotational',
    primaryMuscles: {
      en: 'Rhomboids, Triceps, Hamstrings, Posterior Chain, Core',
      fa: 'لوزی، پشت بازو، همسترینگ، عضلات پشتی و تعادل تنه'
    },
    intensity: 'high',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 10,
    instructions: {
      en: [
        'Sit on floor, place hands behind you with fingers pointing toward feet, bend knees.',
        'Lift hips into tabletop position.',
        'Reach right hand across to touch left toes while balancing on opposite limbs.',
        'Return to tabletop and alternate rapidly with athletic rhythm.'
      ],
      fa: [
        'روی زمین بنشینید؛ دست‌ها پشت سر با انگشتان رو به پاها، زانوها خم.',
        'لگن را بالا بکشید تا وضعیت میز یا خرچنگ شکل بگیرد.',
        'دست راست را بالا آورده و پنجه پای چپ را لمس کنید.',
        'به آرامی برگردید و فوراً دست و پای مخالف را با ریتم تند جابجا کنید.'
      ]
    },
    tips: {
      en: 'Keep supporting shoulder depressed and packed away from your ears.',
      fa: 'شانه تکیه‌گاه را سفت نگه داشته و نگذارید به سمت گوش جمع شود.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'bA3q1v9M7Q0',
    youtubeTitle: 'Crab Toe Touch Core and Back Exercise',
    googleSearchQuery: 'crab toe touches exercise gif',
  },
  {
    id: 'good_morning_hinge_hops',
    name: {
      en: 'Bodyweight Good Morning Hinge to Pop Hop',
      fa: 'گود مورنینگ انفجاری با پرش کوتاه (فیله و همسترینگ)'
    },
    targetGroup: 'back',
    patternType: 'explosive',
    primaryMuscles: {
      en: 'Erector Spinae, Glutes, Hamstrings, Latissimus Stabilization',
      fa: 'فیله کمر، سرینی، همسترینگ و ثبات زیربغل'
    },
    intensity: 'high',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 11,
    instructions: {
      en: [
        'Stand with feet hip-width apart, hands interlaced lightly behind head.',
        'Hinge hips back with a flat spine until torso is nearly parallel to floor.',
        'Drive hips forward explosively and perform a crisp vertical pop hop.',
        'Absorb landing smoothly and immediately hinge back into the next repetition.'
      ],
      fa: [
        'بایستید؛ پاها به عرض لگن و دست‌ها پشت سر قلاب شوند.',
        'لگن را با پشت کاملاً صاف به عقب ببرید تا تنه موازی زمین شود (کشش پشت ران).',
        'با انقباض باسن و فیله به جلو فشار آورده و پرش عمودی کوتاهی انجام دهید.',
        'فرود نرم داشته و بلافاصله به تکرار بعدی بروید.'
      ]
    },
    tips: {
      en: 'Never round your back—keep chest broad and shoulder blades retracted throughout.',
      fa: 'کمر به هیچ وجه نباید قوز شود؛ کتف‌ها را به سمت هم جمع نگه دارید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80',
    youtubeId: '7K0d8Yq1jOo',
    youtubeTitle: 'Good Morning Hinge Jump Plyometrics',
    googleSearchQuery: 'good morning hinge hop exercise gif',
  },
  {
    id: 'prone_snow_angels',
    name: {
      en: 'Prone Snow Angels with Thumbs Up',
      fa: 'فرشته برفی روی شکم بدون وزنه (کتف، دلتوئید خلفی و زیربغل)'
    },
    targetGroup: 'back',
    patternType: 'primer',
    primaryMuscles: {
      en: 'Lower Trapezius, Rhomboids, Rear Deltoids, Lats',
      fa: 'بخش پایینی کول، عضلات لوزی، پشت شانه و زیربغل'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 7,
    instructions: {
      en: [
        'Lie on belly with legs straight and toes touching the mat.',
        'Raise chest and arms slightly off mat with thumbs pointing straight toward ceiling.',
        'Sweep arms in a wide smooth arc from overhead all the way down to touch your thighs.',
        'Squeeze shoulder blades together forcefully at the bottom, then sweep back up.'
      ],
      fa: [
        'روی شکم بخوابید؛ پنجه پاها روی زمین و پیشانی کمی بالاتر از مت باشد.',
        'دست‌ها را با شست‌های رو به بالا از زمین جدا کنید.',
        'دست‌ها را به صورت قوسی پهن از بالای سر تا کنار ران‌ها به حرکت درآورید.',
        'در کنار ران‌ها کتف‌ها را به هم فشار دهید و دوباره به آرامی به بالای سر برگردید.'
      ]
    },
    tips: {
      en: 'Keep arms fully elevated off the floor along the entire arc—do not let them touch down.',
      fa: 'در تمام طول مسیر دست‌ها نباید به زمین برخورد کنند؛ شناور در هوا بمانند.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'vT3m8r9P0q0',
    youtubeTitle: 'Prone Snow Angels Posture and Back Exercise',
    googleSearchQuery: 'prone snow angels back exercise gif',
  },
  {
    id: 'reverse_tabletop_bridge',
    name: {
      en: 'Reverse Tabletop Hip Thrust Pulses',
      fa: 'میز معکوس با پالس لگن و باز کردن قفسه سینه (کل زنجیره پشتی)'
    },
    targetGroup: 'back',
    patternType: 'core_stability',
    primaryMuscles: {
      en: 'Glutes, Hamstrings, Erector Spinae, Lat Stabilization',
      fa: 'سرینی، همسترینگ، راست‌کننده‌های ستون فقرات و ثبات زیربغل'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 8,
    instructions: {
      en: [
        'Sit with knees bent at 90 degrees, hands planted 15cm behind hips fingers forward.',
        'Drive through heels and hands to lift hips until thighs and torso create a flat table.',
        'Squeeze glutes and upper back hard, pulse 5cm down and up continuously.',
        'Keep neck relaxed looking up at the ceiling.'
      ],
      fa: [
        'بنشینید؛ زانوها ۹۰ درجه و دست‌ها کمی پشت باسن با انگشتان رو به جلو.',
        'با فشار پاشنه‌ها و کف دست‌ها لگن را تا صاف شدن کامل تنه بالا ببرید.',
        'باسن و عضلات پشت را سفت کرده و پالس‌های ۵ سانتی‌متری بالا-پایین بزنید.',
        'گردن آزاد و نگاه رو به سقف باشد.'
      ]
    },
    tips: {
      en: 'Push the floor away through hands to actively stretch anterior deltoids and contract upper back.',
      fa: 'با کف دست‌ها زمین را هل دهید تا سینه باز شده و عضلات بالای پشت منقبض شوند.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'L8p0q9M3b0A',
    youtubeTitle: 'Reverse Tabletop Glute and Back Drill',
    googleSearchQuery: 'reverse tabletop bridge pulses exercise gif',
  },

  // ==========================================
  // SHOULDERS & ARMS EXPANSION (سرشانه، بازو و بوکس)
  // ==========================================
  {
    id: 'arm_circles_speed_burn',
    name: {
      en: 'Isometric T-Hold Rapid Arm Circles',
      fa: 'حالت T ایزومتریک با دایره‌های سرعتی بازو (سوزش عمیق سرشانه)'
    },
    targetGroup: 'shoulders_arms',
    patternType: 'burnout',
    primaryMuscles: {
      en: 'Lateral Deltoids, Anterior Deltoids, Rotator Cuff',
      fa: 'دلتوئید میانی و قدامی، عضلات روتاتور کاف سرشانه'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 8,
    instructions: {
      en: [
        'Extend arms directly out to sides at exact shoulder height forming a rigid T-shape.',
        'Perform small, golf-ball sized circles forward at ultra-high frequency.',
        'Reverse direction backward at the 20-second mark without dropping arms even 1cm.',
        'Engage core and do not shrug shoulders up toward ears.'
      ],
      fa: [
        'دست‌ها را دقیقاً هم‌سطح شانه به طرفین باز کنید تا شکل T ایجاد شود.',
        'دایره‌های ریز به اندازه توپ گلف با سرعت بسیار بالا رو به جلو بزنید.',
        'در ثانیه ۲۰ جهت چرخش را بدون اینکه دست‌ها حتی ۱ سانتی‌متر پایین بیایند برعکس کنید.',
        'شانه را به گوش نچسبانید و پایین نگه دارید.'
      ]
    },
    tips: {
      en: 'Do not drop arms when the lactic burn sets in—breathe steadily through the sensation.',
      fa: 'وقتی سوزش اسید لاکتیک آغاز شد دست‌ها را پایین نیاورید؛ با تنفس عمیق ادامه دهید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&auto=format&fit=crop&q=80',
    youtubeId: '1U3-6b4jXo0',
    youtubeTitle: 'Arm Circles Shoulder Endurance Exercise',
    googleSearchQuery: 'arm circles shoulder burn exercise gif',
  },
  {
    id: 'speed_hook_uppercut_combos',
    name: {
      en: 'Speed Jab-Hook-Uppercut Boxing Combos',
      fa: 'ترکیب هوک، آپرکات و جب سرعتی بوکس (سرشانه و بازوها)'
    },
    targetGroup: 'shoulders_arms',
    patternType: 'explosive',
    primaryMuscles: {
      en: 'Deltoids, Biceps, Core Rotation, Triceps',
      fa: 'سرشانه، جلو بازو، انتقال چرخش تنه و پشت بازو'
    },
    intensity: 'high',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 11,
    instructions: {
      en: [
        'Assume boxer stance with fists guarding chin and elbows tucked in.',
        'Fire crisp combinations: Jab (straight left), Cross (straight right), Lead Hook, Rear Uppercut.',
        'Pivot on balls of feet to transfer ground force into punch rotation.',
        'Keep punches rapid and snap fists back to chin instantly after each strike.'
      ],
      fa: [
        'در گارد بوکس قرار بگیرید؛ مشت‌ها محافظ چانه و آرنج‌ها چسبیده به دنده‌ها.',
        'ضربات پشت سر هم بزنید: جب، کراس مستقیم، هوک چپ، آپرکات راست.',
        'روی پنجه پا بچرخید تا نیروی مشت از باسن و تنه منتقل شود.',
        'مشت را با شتاب پرتاب کرده و برق‌آسا به گارد برگردانید.'
      ]
    },
    tips: {
      en: 'Exhale sharply with every punch strike (pssh-pssh-pssh) to coordinate core pressure.',
      fa: 'با هر ضربه مشت بازدم انفجاری کوتاه انجام دهید تا عضلات شکم قفل شوند.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80',
    youtubeId: '3U2o_aTq6K8',
    youtubeTitle: 'Shadow Boxing Combos for Cardio Conditioning',
    googleSearchQuery: 'shadow boxing hook uppercut combination gif',
  },
  {
    id: 'bear_pushups_pike',
    name: {
      en: 'Pike Pushups to Overhead Drive',
      fa: 'شنا پایک با زاویه شیب‌دار (پرس سرشانه با وزن بدن)'
    },
    targetGroup: 'shoulders_arms',
    patternType: 'core_stability',
    primaryMuscles: {
      en: 'Anterior & Medial Deltoids, Upper Pectorals, Triceps',
      fa: 'سرشانه قدامی و جانبی، بخش بالایی سینه و پشت بازو'
    },
    intensity: 'high',
    defaultWorkSec: 35,
    defaultRestSec: 25,
    caloriesPerMinute: 10,
    instructions: {
      en: [
        'Start in downward dog or pike with hips held high and hands shoulder-width apart.',
        'Bend elbows to lower top of forehead toward floor in front of fingertips forming a tripod.',
        'Press floor away aggressively back up into high pike position.',
        'Maintain a steady, rhythmic tempo.'
      ],
      fa: [
        'در وضعیت پایک (سگ سرپایین) قرار بگیرید؛ باسن در اوج ارتفاع و دست‌ها به عرض شانه.',
        'با خم کردن آرنج‌ها، فرق سر را به آرامی به سمت نقطه جلوتر از نوک انگشتان پایین بیاورید.',
        'زمین را با قدرت فشار دهید و مجدد به موقعیت پایک بازگردید.',
        'ریتم تند و پیوسته را حفظ کنید.'
      ]
    },
    tips: {
      en: 'Keep weight stacked over your shoulders rather than drifting back onto your heels.',
      fa: 'وزن را روی سرشانه‌ها متمرکز نگه دارید نه اینکه به سمت پاشنه‌ها عقب‌نشینی کنید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'sposDXWEB0A',
    youtubeTitle: 'Pike Pushup Form and Technique',
    googleSearchQuery: 'pike pushup shoulders exercise gif',
  },
  {
    id: 'plank_upward_punch',
    name: {
      en: 'Plank with Alternating Forward Punches',
      fa: 'پلانک دست صاف با مشت به جلو (استقامت بازو و ضد چرخش)'
    },
    targetGroup: 'shoulders_arms',
    patternType: 'unilateral_rotational',
    primaryMuscles: {
      en: 'Anterior Deltoids, Triceps Stability, Core Wall',
      fa: 'دلتوئید قدامی، ثبات پشت بازو و دیواره شکم'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 9,
    instructions: {
      en: [
        'Hold a solid high plank on palms with feet slightly wider than hip-width for stability.',
        'Extend one arm straight out forward at shoulder height, throwing a clean punch.',
        'Plant hand back down and punch forward with opposite arm.',
        'Zero hip rotation—keep pelvis parallel to floor at all times.'
      ],
      fa: [
        'در پلانک دست صاف بایستید؛ پاها کمی بازتر از لگن برای تعادل.',
        'یک دست را مستقیم هم‌سطح شانه به جلو مشت بزنید.',
        'دست را بازگردانده و فوراً با دست دیگر مشت پرتاب کنید.',
        'لگن نباید بچرخد؛ کاملاً موازی با زمین بماند.'
      ]
    },
    tips: {
      en: 'Widen foot stance if you feel your hips rocking from side to side.',
      fa: 'اگر لگن تاب می‌خورد، فاصله پاها را کمی بیشتر کنید تا تعادل حفظ شود.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'a73yX3rE8qM',
    youtubeTitle: 'Plank with Punch Core and Shoulder Drill',
    googleSearchQuery: 'plank with punch exercise gif',
  },
  {
    id: 'triceps_floor_kickbacks',
    name: {
      en: 'Floor Triceps Dip Kickbacks with High Tempo',
      fa: 'دیپ کف زمین با ریتم تند (تمرکز بر سه سر بازویی)'
    },
    targetGroup: 'shoulders_arms',
    patternType: 'primer',
    primaryMuscles: {
      en: 'Triceps Brachii, Posterior Deltoid, Core',
      fa: 'سه سر بازویی (پشت بازو)، پشت شانه و میان‌تنه'
    },
    intensity: 'moderate',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 8,
    instructions: {
      en: [
        'Sit on floor with knees bent and feet flat, place hands behind hips with fingers forward.',
        'Lift hips 5cm off floor. Bend elbows straight back to lower hips toward mat.',
        'Press through palms to lock triceps out at the top in a rapid pulsing cadence.',
        'Keep elbows tracking backward, not flaring out to sides.'
      ],
      fa: [
        'روی زمین بنشینید؛ زانوها خم و کف پاها روی زمین، دست‌ها پشت باسن با انگشتان رو به جلو.',
        'لگن را ۵ سانتی‌متر از زمین بالا بیاورید؛ آرنج‌ها را مستقیم به عقب خم کنید.',
        'با کف دست فشار آورده و پشت بازوها را با ریتم تند منقبض و صاف کنید.',
        'آرنج‌ها رو به عقب بروند نه به طرفین.'
      ]
    },
    tips: {
      en: 'Ensure movement comes from bending and extending the elbows, not merely bobbing hips up and down.',
      fa: 'حرکت اصلی از باز و بسته شدن آرنج ایجاد شود نه از بالا و پایین بردن باسن.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=700&auto=format&fit=crop&q=80',
    youtubeId: '0326dy_-CzM',
    youtubeTitle: 'Floor Triceps Dips Exercise',
    googleSearchQuery: 'floor tricep dips bodyweight gif',
  },

  // ==========================================
  // FULL BODY EXPANSION (کل بدن و چربی‌سوزی جامع)
  // ==========================================
  {
    id: 'tuck_jumps_metabolic',
    name: {
      en: 'High-Elevation Plyometric Tuck Jumps',
      fa: 'پرش تاک جامپ جمع زانو به سینه در هوا (حداکثر اوج ضربان)'
    },
    targetGroup: 'full_body',
    patternType: 'explosive',
    primaryMuscles: {
      en: 'Full Body Explosive: Hip Flexors, Quads, Calves, Core',
      fa: 'توان جهشی تمام بدن، خم‌کننده‌های ران، چهارسر و سیستم قلبی'
    },
    intensity: 'explosive',
    defaultWorkSec: 30,
    defaultRestSec: 30,
    caloriesPerMinute: 15,
    instructions: {
      en: [
        'Stand with feet shoulder-width apart, knees slightly bent.',
        'Drop into a quarter squat, swing arms and explode upward vertically.',
        'Tuck knees high up toward chest at peak elevation, slapping thighs lightly with hands.',
        'Land softly on balls of feet, absorb immediately and launch into next repetition.'
      ],
      fa: [
        'بایستید؛ پاها به عرض شانه و زانوها آماده جهش.',
        'نیمه اسکوات نشسته، دست‌ها را پرتاب کرده و عمودی به هوا بپرید.',
        'در اوج ارتفاع زانوها را به سینه بچسبانید و با دست‌ها به ران‌ها ضربه بزنید.',
        'روی پنجه نرم فرود آمده و بلافاصله جهش بعدی را پرتاب کنید.'
      ]
    },
    tips: {
      en: 'Focus on pulling knees up toward chest rather than kicking heels backward toward glutes.',
      fa: 'زانوها را به سمت سینه بالا بکشید نه اینکه پاشنه‌ها را به سمت باسن پرتاب کنید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'b7A9gGfA0Z4',
    youtubeTitle: 'Tuck Jumps Plyometric Conditioning',
    googleSearchQuery: 'tuck jumps plyometrics exercise gif',
  },
  {
    id: 'half_burpee_broad_jump',
    name: {
      en: 'Half-Burpee into Forward Leap Flow',
      fa: 'نیمه برپی بدون پرش به جهش طولی جلو (چربی‌سوزی پرتوان)'
    },
    targetGroup: 'full_body',
    patternType: 'burnout',
    primaryMuscles: {
      en: 'Total Body Metabolic, Posterior Chain, Quads, Core',
      fa: 'متابولیک جامع کل بدن، عضلات پرتابی پاها و شکم'
    },
    intensity: 'high',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 13,
    instructions: {
      en: [
        'Drop into high plank, jump feet forward wide into squat.',
        'From the squat, launch directly forward in an explosive leap.',
        'Turn around 180 degrees quickly and drop straight into the next repetition.'
      ],
      fa: [
        'دست‌ها را بگذارید و پاها را به پلانک پرتاب کنید، فوراً پاها را جمع کرده و در اسکوات بنشینید.',
        'از همان حالت اسکوات، انفجاری به جلو جهش طولی انجام دهید.',
        'سریع ۱۸۰ درجه بچرخید و حرکت را تکرار کنید.'
      ]
    },
    tips: {
      en: 'Keep transitions fluid without any pauses between the plank snap and forward leap.',
      fa: 'هیچ مکثی بین جمع کردن پاها و پرش به جلو وجود نداشته باشد؛ جریان پیوسته باشد.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80',
    youtubeId: '1U3-6b4jXo0',
    youtubeTitle: 'Burpee Broad Jump Conditioning Drill',
    googleSearchQuery: 'burpee broad jump exercise gif',
  },
  {
    id: 'lateral_shuffle_floor_taps',
    name: {
      en: 'Agility Lateral Shuffle with Alternating Floor Touch',
      fa: 'شافل جانبی چابکی با لمس زمین (سرعت، هماهنگی و ریتم)'
    },
    targetGroup: 'full_body',
    patternType: 'unilateral_rotational',
    primaryMuscles: {
      en: 'Gluteus Medius, Quads, Cardio Lungs, Adductors',
      fa: 'باسن جانبی، چهارسر ران، کشاله و پمپ قلبی-تنفسی'
    },
    intensity: 'high',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 11,
    instructions: {
      en: [
        'Lower into an athletic quarter squat stance with knees loaded.',
        'Shuffle quickly 3 steps to the right, bend knees and touch the floor with right fingertips.',
        'Push off outside foot and shuffle 3 steps back to the left, touching floor with left hand.',
        'Stay low to the ground and keep eyes up throughout.'
      ],
      fa: [
        'در حالت آماده‌باش نیمه اسکوات قرار بگیرید.',
        '۳ گام سریع به راست شافل بزنید، زانو را خم کرده و با دست راست زمین را لمس کنید.',
        'بلافاصله با پای خارجی فشار آورده و ۳ گام به چپ شافل بزنید و زمین را لمس کنید.',
        'مرکز ثقل بدن را پایین نگه دارید و نگاه رو به جلو باشد.'
      ]
    },
    tips: {
      en: 'Bend at your knees and hips to touch floor rather than just rounding your neck and back down.',
      fa: 'برای لمس زمین زانو و لگن را خم کنید نه اینکه صرفاً سر و کمر را خم نمایید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'd6R9_1q_vP0',
    youtubeTitle: 'Lateral Shuffle Touch Agility Drill',
    googleSearchQuery: 'lateral shuffle floor tap exercise gif',
  },
  {
    id: 'bear_crawl_sprints',
    name: {
      en: 'Bear Crawl High-Tempo Forward and Reverse',
      fa: 'خزش خرسی رفت و برگشت با گام‌های سریع (کل بدن و استقامت)'
    },
    targetGroup: 'full_body',
    patternType: 'core_stability',
    primaryMuscles: {
      en: 'Core Wall, Shoulders, Quadriceps, Cardiorespiratory',
      fa: 'دیواره شکم، سرشانه، چهارسر ران و سیستم قلبی عروقی'
    },
    intensity: 'high',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 12,
    instructions: {
      en: [
        'Get down on hands and balls of feet, knees hovering 3cm off mat.',
        'Crawl forward 4 rapid steps moving opposite hand and foot in synchronization.',
        'Reverse direction and crawl backward 4 steps without turning around.',
        'Keep hips held low and back flat like a tabletop throughout.'
      ],
      fa: [
        'چهار دست و پا شوید به طوری که زانوها فقط ۳ سانتی‌متر بالای زمین شناور باشند.',
        '۴ گام سرعتی به جلو بروید با هماهنگی دست و پای مخالف.',
        'بدون چرخیدن، ۴ گام سرعتی با همان حالت به عقب بازگردید.',
        'باسن را پایین نگه داشته و پشت را مانند میز کاملاً صاف حفظ فرمایید.'
      ]
    },
    tips: {
      en: 'Short, compact steps are much faster and maintain greater core tension than long overreaches.',
      fa: 'گام‌های کوتاه و فشرده بسیار سریع‌تر هستند و ثبات هسته بدن را چند برابر می‌کنند.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=700&auto=format&fit=crop&q=80',
    youtubeId: '0z5o43w1n7U',
    youtubeTitle: 'Bear Crawl Conditioning Exercise',
    googleSearchQuery: 'bear crawl conditioning exercise gif',
  },
  {
    id: 'power_skipping_intervals',
    name: {
      en: 'Olympic Power Skipping with High Knee Drives',
      fa: 'اسکیپینگ پرتابی المپیک با پرتاب دست‌ها (شبیه‌ساز طناب‌زنی حرفه‌ای)'
    },
    targetGroup: 'full_body',
    patternType: 'primer',
    primaryMuscles: {
      en: 'Calves, Glutes, Core, Elastic Capacity, Lungs',
      fa: 'ساق پا، باسن، ثبات میان‌تنه، توان الاستیک و تنفس'
    },
    intensity: 'high',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    caloriesPerMinute: 11,
    instructions: {
      en: [
        'Skip in place or with small forward travel, driving one knee forcefully upward to hip height.',
        'Simultaneously punch opposite arm straight up into the air for maximum vertical extension.',
        'Spring off ball of supporting foot with a sharp, explosive hop.',
        'Switch sides in a fluid, rhythmic track-and-field cadence.'
      ],
      fa: [
        'درجا یا با پیشروی کوتاه اسکیپ بزنید؛ یک زانو را با قدرت تا ارتفاع لگن بالا پرتاب کنید.',
        'همزمان دست مخالف را عمود به آسمان پرتاب کنید تا کشش عمودی کامل شود.',
        'با پنجه پای تکیه‌گاه جهش فنری قوی انجام دهید.',
        'با ریتم ورزشکاران دوومیدانی پای دیگر را بلافاصله پرتاب فرمایید.'
      ]
    },
    tips: {
      en: 'Aim for maximum vertical height and airtime on each single-leg skip.',
      fa: 'روی حداکثر ارتفاع عمودی و معلق ماندن در هوا در هر جهش تمرکز کنید.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=700&auto=format&fit=crop&q=80',
    youtubeId: 'F2oDqu99G5Q',
    youtubeTitle: 'Power Skipping for Athletes and Cardio',
    googleSearchQuery: 'power skipping high knee drill gif',
  },
];
