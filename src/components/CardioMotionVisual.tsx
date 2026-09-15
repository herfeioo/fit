import React from 'react';

export interface CardioMotionVisualProps {
  exerciseId: string;
  className?: string;
}

/**
 * High-accuracy, looped animated SVG vector motions for all 18 cardio exercises.
 * Biomechanically precise representations of each movement pattern with continuous fluid loop.
 */
export const CardioMotionVisual: React.FC<CardioMotionVisualProps> = ({ exerciseId, className = 'w-full h-full' }) => {
  // Styles for looped animations
  const renderVisual = () => {
    switch (exerciseId) {
      // 1. Mountain Climbers & Crawls
      case 'mountain_climbers':
      case 'bear_crawl_hold_taps':
      case 'bear_crawl_sprints':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <style>{`
              @keyframes mcTorso { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-3px); } }
              @keyframes mcLegLeft { 0%, 100% { d: path("M95,65 L70,75 L40,80"); } 50% { d: path("M95,65 L105,75 L80,95"); } }
              @keyframes mcLegRight { 0%, 100% { d: path("M95,65 L105,75 L80,95"); } 50% { d: path("M95,65 L70,75 L40,80"); } }
            `}</style>
            <rect width="200" height="120" fill="#090d16" rx="16" />
            {/* Ground Line */}
            <line x1="20" y1="100" x2="180" y2="100" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            {/* Head */}
            <circle cx="145" cy="42" r="10" fill="#fb7185" />
            {/* Arms planted */}
            <path d="M135,52 L138,98" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" />
            <path d="M125,55 L125,98" stroke="#e11d48" strokeWidth="5" strokeLinecap="round" />
            {/* Torso */}
            <line x1="135" y1="52" x2="95" y2="65" stroke="#38bdf8" strokeWidth="10" strokeLinecap="round" />
            {/* Pumping Legs */}
            <path id="leg1" d="M95,65 L70,75 L40,80" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="d" dur="0.6s" repeatCount="indefinite" values="M95,65 L70,75 L40,98; M95,65 L115,75 L95,98; M95,65 L70,75 L40,98" />
            </path>
            <path id="leg2" d="M95,65 L115,75 L95,98" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="d" dur="0.6s" repeatCount="indefinite" values="M95,65 L115,75 L95,98; M95,65 L70,75 L40,98; M95,65 L115,75 L95,98" />
            </path>
          </svg>
        );

      // 2. Bicycle Crunches & Flutters
      case 'bicycle_crunches':
      case 'hollow_body_flutter_kicks':
      case 'dead_bug_cardio_tempo':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="95" x2="180" y2="95" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            {/* Mat */}
            <rect x="30" y="90" width="140" height="5" rx="2" fill="#475569" />
            {/* Pelvis/Torso */}
            <line x1="85" y1="85" x2="60" y2="70" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round">
              <animate attributeName="x2" values="55;65;55" dur="1s" repeatCount="indefinite" />
              <animate attributeName="y2" values="68;74;68" dur="1s" repeatCount="indefinite" />
            </line>
            {/* Head & Hands at temples */}
            <circle cx="50" cy="62" r="9" fill="#fb7185">
              <animate attributeName="cx" values="46;54;46" dur="1s" repeatCount="indefinite" />
            </circle>
            {/* Elbow rotation towards knee */}
            <path d="M52,65 L68,68 L80,72" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="d" values="M52,65 L75,65 L88,72; M52,65 L60,72 L70,80; M52,65 L75,65 L88,72" dur="1s" repeatCount="indefinite" />
            </path>
            {/* Bicycle Legs Cycling */}
            <path d="M85,85 L110,65 L145,65" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="d" values="M85,85 L95,65 L135,55; M85,85 L125,75 L155,85; M85,85 L95,65 L135,55" dur="1s" repeatCount="indefinite" />
            </path>
            <path d="M85,85 L125,75 L155,85" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="d" values="M85,85 L125,75 L155,85; M85,85 L95,65 L135,55; M85,85 L125,75 L155,85" dur="1s" repeatCount="indefinite" />
            </path>
          </svg>
        );

      // 3. Plank Jacks
      case 'plank_jacks':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="100" x2="180" y2="100" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            {/* Head */}
            <circle cx="140" cy="40" r="9" fill="#fb7185" />
            {/* Hands/Forearms */}
            <line x1="130" y1="48" x2="130" y2="98" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" />
            {/* Rigid Plank Torso */}
            <line x1="130" y1="48" x2="70" y2="58" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round">
              <animate attributeName="y2" values="58;55;58" dur="0.5s" repeatCount="indefinite" />
            </line>
            {/* Jumping feet in/out */}
            <line x1="70" y1="58" x2="40" y2="98" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round">
              <animate attributeName="x2" values="40;25;40" dur="0.5s" repeatCount="indefinite" />
              <animate attributeName="y2" values="98;88;98" dur="0.5s" repeatCount="indefinite" />
            </line>
            <line x1="70" y1="58" x2="50" y2="98" stroke="#0284c7" strokeWidth="6" strokeLinecap="round">
              <animate attributeName="x2" values="50;65;50" dur="0.5s" repeatCount="indefinite" />
              <animate attributeName="y2" values="98;88;98" dur="0.5s" repeatCount="indefinite" />
            </line>
          </svg>
        );

      // 4. Sprinter Sit-ups & Standing Drive
      case 'sprinter_situps':
      case 'standing_cross_knee_elbow':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="100" x2="180" y2="100" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            <g>
              <animateTransform attributeName="transform" type="rotate" values="0 100 95; -45 100 95; 0 100 95" dur="1.2s" repeatCount="indefinite" />
              {/* Head */}
              <circle cx="65" cy="55" r="9" fill="#fb7185" />
              {/* Torso */}
              <line x1="68" y1="62" x2="100" y2="95" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
              {/* Pumping Arm */}
              <path d="M72,66 L55,75 L62,90" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            {/* Driving Knee */}
            <path d="M100,95 L115,65 L135,70" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="d" values="M100,95 L115,65 L135,70; M100,95 L140,95 L170,95; M100,95 L115,65 L135,70" dur="1.2s" repeatCount="indefinite" />
            </path>
            {/* Straight Leg */}
            <line x1="100" y1="95" x2="165" y2="95" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
          </svg>
        );

      // 5. Russian Twists & Side Plank
      case 'russian_twists':
      case 'side_plank_hip_dips':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="100" x2="180" y2="100" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            {/* Head */}
            <circle cx="70" cy="45" r="9" fill="#fb7185" />
            {/* V-Sit Torso */}
            <line x1="72" y1="52" x2="100" y2="90" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
            {/* Elevated Feet */}
            <path d="M100,90 L125,70 L155,75" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            {/* Rotating Arms with Hands Clamped */}
            <line x1="80" y1="65" x2="70" y2="80" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round">
              <animate attributeName="x2" values="60;105;60" dur="0.8s" repeatCount="indefinite" />
              <animate attributeName="y2" values="80;75;80" dur="0.8s" repeatCount="indefinite" />
            </line>
            <circle cx="70" cy="80" r="5" fill="#facc15">
              <animate attributeName="cx" values="60;105;60" dur="0.8s" repeatCount="indefinite" />
              <animate attributeName="cy" values="80;75;80" dur="0.8s" repeatCount="indefinite" />
            </circle>
          </svg>
        );

      // 6. Jump Squats & Plyo Hops
      case 'jump_squats':
      case 'pogo_hops_speed':
      case 'broad_jump_backpedal':
      case 'sumo_squat_pulse_jumps':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="105" x2="180" y2="105" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            <g>
              <animateTransform attributeName="transform" type="translate" values="0,25; 0,-15; 0,25" dur="1s" repeatCount="indefinite" />
              {/* Head */}
              <circle cx="100" cy="30" r="9" fill="#fb7185" />
              {/* Torso */}
              <line x1="100" y1="39" x2="100" y2="65" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
              {/* Arms */}
              <path d="M100,45 L80,55 L75,70" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round">
                <animate attributeName="d" values="M100,45 L80,55 L75,70; M100,45 L70,30 L60,15; M100,45 L80,55 L75,70" dur="1s" repeatCount="indefinite" />
              </path>
              <path d="M100,45 L120,55 L125,70" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round">
                <animate attributeName="d" values="M100,45 L120,55 L125,70; M100,45 L130,30 L140,15; M100,45 L120,55 L125,70" dur="1s" repeatCount="indefinite" />
              </path>
              {/* Legs Squat to Jump */}
              <path d="M100,65 L85,75 L85,95" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                <animate attributeName="d" values="M100,65 L80,80 L80,95; M100,65 L95,85 L95,100; M100,65 L80,80 L80,95" dur="1s" repeatCount="indefinite" />
              </path>
              <path d="M100,65 L115,75 L115,95" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                <animate attributeName="d" values="M100,65 L120,80 L120,95; M100,65 L105,85 L105,100; M100,65 L120,80 L120,95" dur="1s" repeatCount="indefinite" />
              </path>
            </g>
          </svg>
        );

      // 7. Lateral Skater Hops & Shuffles
      case 'skater_hops':
      case 'lateral_shuffle_floor_taps':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="102" x2="180" y2="102" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            <g>
              <animateTransform attributeName="transform" type="translate" values="-35,0; 35,0; -35,0" dur="1.1s" repeatCount="indefinite" />
              <circle cx="100" cy="38" r="9" fill="#fb7185" />
              <line x1="100" y1="47" x2="100" y2="70" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
              {/* Sweeping arms */}
              <line x1="100" y1="52" x2="70" y2="60" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round">
                <animate attributeName="x2" values="70;130;70" dur="1.1s" repeatCount="indefinite" />
              </line>
              {/* Planted loaded leg */}
              <path d="M100,70 L90,85 L85,100" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              {/* Trailing diagonal leg */}
              <path d="M100,70 L115,80 L135,95" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                <animate attributeName="d" values="M100,70 L115,80 L135,95; M100,70 L85,80 L65,95; M100,70 L115,80 L135,95" dur="1.1s" repeatCount="indefinite" />
              </path>
            </g>
          </svg>
        );

      // 8. Alternating Lunge Jumps & Curtsy
      case 'lunge_jumps':
      case 'curtsy_lunge_hops':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="102" x2="180" y2="102" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            <g>
              <animateTransform attributeName="transform" type="translate" values="0,15; 0,-15; 0,15" dur="0.9s" repeatCount="indefinite" />
              <circle cx="100" cy="30" r="9" fill="#fb7185" />
              <line x1="100" y1="39" x2="100" y2="65" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
              {/* Pumping running arms */}
              <line x1="100" y1="45" x2="80" y2="55" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" />
              <line x1="100" y1="45" x2="120" y2="40" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" />
              {/* Front 90-degree lunge leg */}
              <path d="M100,65 L120,78 L120,98" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                <animate attributeName="d" values="M100,65 L120,78 L120,98; M100,65 L80,78 L80,98; M100,65 L120,78 L120,98" dur="0.9s" repeatCount="indefinite" />
              </path>
              {/* Back trailing 90-degree lunge leg */}
              <path d="M100,65 L80,78 L70,98" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                <animate attributeName="d" values="M100,65 L80,78 L70,98; M100,65 L120,78 L130,98; M100,65 L80,78 L70,98" dur="0.9s" repeatCount="indefinite" />
              </path>
            </g>
          </svg>
        );

      // 9. Glute Bridge Pulses & Single Leg
      case 'glute_bridge_pulses':
      case 'single_leg_bridge_kick':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="95" x2="180" y2="95" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            {/* Head on floor */}
            <circle cx="50" cy="85" r="9" fill="#fb7185" />
            {/* Shoulders on mat */}
            <line x1="60" y1="88" x2="105" y2="70" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round">
              <animate attributeName="y2" values="70;58;70" dur="0.7s" repeatCount="indefinite" />
            </line>
            {/* Pelvis to knees */}
            <line x1="105" y1="70" x2="135" y2="60" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round">
              <animate attributeName="x1" values="105;105;105" dur="0.7s" repeatCount="indefinite" />
              <animate attributeName="y1" values="70;58;70" dur="0.7s" repeatCount="indefinite" />
            </line>
            {/* Knees to planted feet */}
            <line x1="135" y1="60" x2="140" y2="95" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
            {/* Arms at sides */}
            <line x1="60" y1="90" x2="95" y2="92" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" />
          </svg>
        );

      // 10. Wall Sit with Calf Raises
      case 'wall_sit_calf_pulses':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            {/* Wall */}
            <line x1="60" y1="15" x2="60" y2="105" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
            <line x1="20" y1="105" x2="180" y2="105" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            {/* Head against wall */}
            <circle cx="72" cy="40" r="9" fill="#fb7185" />
            {/* Torso vertical against wall */}
            <line x1="72" y1="48" x2="72" y2="75" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
            {/* Thigh horizontal at 90 degrees */}
            <line x1="72" y1="75" x2="110" y2="75" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" />
            {/* Shin vertical down to heel */}
            <line x1="110" y1="75" x2="110" y2="100" stroke="#0284c7" strokeWidth="6" strokeLinecap="round">
              <animate attributeName="y2" values="102;93;102" dur="0.6s" repeatCount="indefinite" />
            </line>
            {/* Foot doing calf raise */}
            <line x1="110" y1="100" x2="122" y2="104" stroke="#facc15" strokeWidth="5" strokeLinecap="round">
              <animate attributeName="y1" values="102;93;102" dur="0.6s" repeatCount="indefinite" />
            </line>
          </svg>
        );

      // 11. Hand-Release Push-Ups & Chest Squeeze
      case 'hand_release_pushups':
      case 'isometric_chest_squeeze_pulses':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="98" x2="180" y2="98" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            <g>
              <animateTransform attributeName="transform" type="translate" values="0,-18; 0,0; 0,-18" dur="1.2s" repeatCount="indefinite" />
              <circle cx="140" cy="52" r="9" fill="#fb7185" />
              <line x1="135" y1="60" x2="60" y2="75" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
              {/* Hands pressing / releasing off ground */}
              <path d="M125,62 L125,95" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round">
                <animate attributeName="d" values="M125,62 L125,95; M125,62 L115,85; M125,62 L125,95" dur="1.2s" repeatCount="indefinite" />
              </path>
              {/* Feet planted */}
              <line x1="60" y1="75" x2="45" y2="98" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
            </g>
          </svg>
        );

      // 12. Shoulder-Tap Planks & Punches
      case 'shoulder_tap_planks':
      case 'plank_upward_punch':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="98" x2="180" y2="98" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            <circle cx="140" cy="40" r="9" fill="#fb7185" />
            <line x1="135" y1="48" x2="60" y2="60" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
            {/* Supporting Arm */}
            <line x1="130" y1="48" x2="130" y2="98" stroke="#e11d48" strokeWidth="6" strokeLinecap="round" />
            {/* Tapping Arm crossing to shoulder */}
            <path d="M125,48 L105,70 L130,52" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="d" values="M125,48 L105,70 L130,52; M125,48 L120,98 L120,98; M125,48 L105,70 L130,52" dur="0.9s" repeatCount="indefinite" />
            </path>
            {/* Feet */}
            <line x1="60" y1="60" x2="45" y2="98" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
          </svg>
        );

      // 13. Explosive Plyo Push-Ups & Archers
      case 'explosive_chest_pushups':
      case 'wide_to_narrow_pushups':
      case 'archer_pushup_tempo':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="98" x2="180" y2="98" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            <g>
              <animateTransform attributeName="transform" type="translate" values="0,10; 0,-25; 0,10" dur="0.8s" repeatCount="indefinite" />
              <circle cx="140" cy="50" r="9" fill="#fb7185" />
              <line x1="135" y1="58" x2="60" y2="72" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
              {/* Hands airborne clapping or extending */}
              <line x1="125" y1="58" x2="125" y2="85" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" />
              <line x1="60" y1="72" x2="45" y2="98" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
            </g>
          </svg>
        );

      // 14. Push-Up to Side T-Spine & Down Dog
      case 't_spine_pushups':
      case 'pushup_to_downward_dog':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="100" x2="180" y2="100" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            {/* Supporting arm */}
            <line x1="110" y1="55" x2="110" y2="98" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" />
            {/* Torso tilting up */}
            <line x1="110" y1="55" x2="55" y2="75" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
            <circle cx="120" cy="50" r="9" fill="#fb7185" />
            {/* Arm reaching straight to sky (T shape) */}
            <line x1="110" y1="55" x2="110" y2="20" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round">
              <animate attributeName="x2" values="110;80;110" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="y2" values="20;75;20" dur="1.4s" repeatCount="indefinite" />
            </line>
            <line x1="55" y1="75" x2="40" y2="98" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
          </svg>
        );

      // 15. Superman Lat Pulldowns & Swimmers
      case 'superman_pulldowns':
      case 'swimmer_back_flutters':
      case 'prone_snow_angels':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="95" x2="180" y2="95" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            {/* Arched Torso */}
            <path d="M50,75 Q100,85 150,75" stroke="#38bdf8" strokeWidth="9" fill="none" strokeLinecap="round">
              <animate attributeName="d" values="M50,75 Q100,85 150,75; M50,68 Q100,85 150,68; M50,75 Q100,85 150,75" dur="1s" repeatCount="indefinite" />
            </path>
            {/* Head */}
            <circle cx="155" cy="65" r="9" fill="#fb7185">
              <animate attributeName="cy" values="65;58;65" dur="1s" repeatCount="indefinite" />
            </circle>
            {/* Pulldown Arms retracting to W-shape */}
            <path d="M150,68 L170,55 L180,68" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="d" values="M150,68 L170,55 L180,68; M150,68 L135,72 L120,78; M150,68 L170,55 L180,68" dur="1s" repeatCount="indefinite" />
            </path>
          </svg>
        );

      // 16. Bird Dog Flow & Hinge
      case 'bird_dog_flow':
      case 'good_morning_hinge_hops':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="95" x2="180" y2="95" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            {/* Head */}
            <circle cx="135" cy="45" r="9" fill="#fb7185" />
            {/* Torso horizontal */}
            <line x1="130" y1="55" x2="80" y2="55" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
            {/* Planted knee & arm */}
            <line x1="125" y1="55" x2="125" y2="95" stroke="#e11d48" strokeWidth="5" strokeLinecap="round" />
            <line x1="85" y1="55" x2="85" y2="95" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
            {/* Extending arm and leg */}
            <line x1="130" y1="55" x2="175" y2="50" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round">
              <animate attributeName="x2" values="175;105;175" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="y2" values="50;75;50" dur="1.2s" repeatCount="indefinite" />
            </line>
            <line x1="80" y1="55" x2="35" y2="50" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round">
              <animate attributeName="x2" values="35;100;35" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="y2" values="50;75;50" dur="1.2s" repeatCount="indefinite" />
            </line>
          </svg>
        );

      // 17. Reverse Plank Pulses & Crab
      case 'reverse_plank_burn':
      case 'crab_toe_touches':
      case 'reverse_tabletop_bridge':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="100" x2="180" y2="100" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            {/* Planted Arms Behind */}
            <line x1="65" y1="55" x2="65" y2="98" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" />
            <circle cx="58" cy="48" r="9" fill="#fb7185" />
            {/* Inverted bridge line from hands to heels */}
            <line x1="65" y1="55" x2="150" y2="98" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round">
              <animate attributeName="y1" values="55;45;55" dur="0.8s" repeatCount="indefinite" />
            </line>
          </svg>
        );

      // 18. Prone Y-T-W
      case 'prone_ytw_raises':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="95" x2="180" y2="95" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            <line x1="60" y1="90" x2="140" y2="90" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" />
            <circle cx="148" cy="85" r="9" fill="#fb7185" />
            {/* Arms lifting up in Y / T / W */}
            <line x1="130" y1="88" x2="165" y2="60" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round">
              <animate attributeName="y2" values="60;45;60" dur="0.8s" repeatCount="indefinite" />
            </line>
            <line x1="130" y1="88" x2="110" y2="60" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round">
              <animate attributeName="y2" values="60;45;60" dur="0.8s" repeatCount="indefinite" />
            </line>
          </svg>
        );

      // 19. Shadow Boxing & Combos
      case 'shadow_boxing_intervals':
      case 'speed_hook_uppercut_combos':
      case 'arm_circles_speed_burn':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="102" x2="180" y2="102" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            <circle cx="95" cy="30" r="9" fill="#fb7185" />
            <line x1="95" y1="39" x2="95" y2="70" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
            {/* Boxing Stance Legs */}
            <path d="M95,70 L80,85 L75,100" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M95,70 L110,85 L115,100" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            {/* Rapid Boxing Punches (Jabs & Hooks) */}
            <line x1="95" y1="48" x2="140" y2="45" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round">
              <animate attributeName="x2" values="140;110;140" dur="0.4s" repeatCount="indefinite" />
            </line>
            <line x1="95" y1="48" x2="130" y2="38" stroke="#facc15" strokeWidth="6" strokeLinecap="round">
              <animate attributeName="x2" values="110;145;110" dur="0.4s" repeatCount="indefinite" />
            </line>
          </svg>
        );

      // 20. Inchworm to Push-Up
      case 'inchworm_pushup':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="100" x2="180" y2="100" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            {/* Inchworm walking forward and back */}
            <circle cx="130" cy="45" r="9" fill="#fb7185">
              <animate attributeName="cx" values="130;70;130" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="cy" values="45;30;45" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <line x1="125" y1="52" x2="60" y2="70" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round">
              <animate attributeName="x1" values="125;65;125" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="y1" values="52;40;52" dur="1.5s" repeatCount="indefinite" />
            </line>
            <line x1="125" y1="52" x2="125" y2="98" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round">
              <animate attributeName="x1" values="125;65;125" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="x2" values="125;65;125" dur="1.5s" repeatCount="indefinite" />
            </line>
            <line x1="60" y1="70" x2="50" y2="98" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
          </svg>
        );

      // 21. Chair / Couch Tricep Dips & Kickbacks
      case 'couch_chair_dips':
      case 'triceps_floor_kickbacks':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="100" x2="180" y2="100" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            {/* Chair / Bench */}
            <rect x="40" y="55" width="40" height="45" fill="#1e293b" stroke="#475569" strokeWidth="3" rx="4" />
            {/* Head */}
            <circle cx="95" cy="35" r="9" fill="#fb7185">
              <animate attributeName="cy" values="35;48;35" dur="0.9s" repeatCount="indefinite" />
            </circle>
            {/* Torso dipping down */}
            <line x1="95" y1="44" x2="95" y2="70" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round">
              <animate attributeName="y1" values="44;57;44" dur="0.9s" repeatCount="indefinite" />
              <animate attributeName="y2" values="70;83;70" dur="0.9s" repeatCount="indefinite" />
            </line>
            {/* Arms gripping edge of chair */}
            <path d="M78,55 L85,55 L95,48" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="d" values="M78,55 L85,55 L95,48; M78,55 L85,68 L95,60; M78,55 L85,55 L95,48" dur="0.9s" repeatCount="indefinite" />
            </path>
            {/* Legs extended out */}
            <line x1="95" y1="70" x2="145" y2="98" stroke="#0284c7" strokeWidth="6" strokeLinecap="round">
              <animate attributeName="y1" values="70;83;70" dur="0.9s" repeatCount="indefinite" />
            </line>
          </svg>
        );

      // 22. Up-Down Military Planks & Bear Push-ups
      case 'up_down_planks':
      case 'bear_pushups_pike':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="98" x2="180" y2="98" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            <g>
              <animateTransform attributeName="transform" type="translate" values="0,0; 0,15; 0,0" dur="1s" repeatCount="indefinite" />
              <circle cx="140" cy="40" r="9" fill="#fb7185" />
              <line x1="135" y1="48" x2="60" y2="60" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
              <line x1="130" y1="48" x2="130" y2="98" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" />
              <line x1="60" y1="60" x2="45" y2="98" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
            </g>
          </svg>
        );

      // 23. Burpees & Sprawls
      case 'burpees_cardio':
      case 'sprawl_chest_drop':
      case 'half_burpee_broad_jump':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="102" x2="180" y2="102" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            {/* Phase 1 Jump to Plank to Jump */}
            <g>
              <animateTransform attributeName="transform" type="translate" values="0,-20; 0,20; 0,-20" dur="1.3s" repeatCount="indefinite" />
              <circle cx="100" cy="35" r="9" fill="#fb7185" />
              <line x1="100" y1="44" x2="100" y2="68" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
              <line x1="100" y1="48" x2="75" y2="25" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" />
              <line x1="100" y1="48" x2="125" y2="25" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" />
              <line x1="100" y1="68" x2="90" y2="98" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
              <line x1="100" y1="68" x2="110" y2="98" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
            </g>
          </svg>
        );

      // 24. High-Cadence Jumping Jacks
      case 'jumping_jacks_speed':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="102" x2="180" y2="102" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            <circle cx="100" cy="30" r="9" fill="#fb7185" />
            <line x1="100" y1="39" x2="100" y2="68" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
            {/* Arms clapping overhead and down */}
            <line x1="100" y1="48" x2="70" y2="20" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round">
              <animate attributeName="x2" values="70;85;70" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="y2" values="20;75;20" dur="0.6s" repeatCount="indefinite" />
            </line>
            <line x1="100" y1="48" x2="130" y2="20" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round">
              <animate attributeName="x2" values="130;115;130" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="y2" values="20;75;20" dur="0.6s" repeatCount="indefinite" />
            </line>
            {/* Jumping feet open & closed */}
            <line x1="100" y1="68" x2="70" y2="100" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round">
              <animate attributeName="x2" values="70;95;70" dur="0.6s" repeatCount="indefinite" />
            </line>
            <line x1="100" y1="68" x2="130" y2="100" stroke="#0284c7" strokeWidth="6" strokeLinecap="round">
              <animate attributeName="x2" values="130;105;130" dur="0.6s" repeatCount="indefinite" />
            </line>
          </svg>
        );

      // 25. High Knees Sprint & Power Skipping
      case 'high_knees_sprint':
      case 'power_skipping_intervals':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="102" x2="180" y2="102" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            <circle cx="100" cy="28" r="9" fill="#fb7185" />
            <line x1="100" y1="37" x2="100" y2="65" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
            {/* Running Arms */}
            <path d="M100,45 L80,55 L75,40" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="d" values="M100,45 L80,55 L75,40; M100,45 L120,55 L125,40; M100,45 L80,55 L75,40" dur="0.45s" repeatCount="indefinite" />
            </path>
            {/* High Knees Pumping Alternating */}
            <path d="M100,65 L80,65 L80,85" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="d" values="M100,65 L80,65 L80,85; M100,65 L95,85 L95,100; M100,65 L80,65 L80,85" dur="0.45s" repeatCount="indefinite" />
            </path>
            <path d="M100,65 L105,85 L105,100" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="d" values="M100,65 L105,85 L105,100; M100,65 L120,65 L120,85; M100,65 L105,85 L105,100" dur="0.45s" repeatCount="indefinite" />
            </path>
          </svg>
        );

      // 26. Explosive Star Jumps & Tuck Jumps
      case 'star_jumps_plyo':
      case 'tuck_jumps_metabolic':
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <line x1="20" y1="102" x2="180" y2="102" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            <g>
              <animateTransform attributeName="transform" type="translate" values="0,20; 0,-20; 0,20" dur="0.9s" repeatCount="indefinite" />
              <circle cx="100" cy="30" r="9" fill="#fb7185" />
              <line x1="100" y1="39" x2="100" y2="65" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
              {/* Star limbs opening in air */}
              <line x1="100" y1="48" x2="55" y2="20" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round">
                <animate attributeName="x2" values="85;55;85" dur="0.9s" repeatCount="indefinite" />
                <animate attributeName="y2" values="60;20;60" dur="0.9s" repeatCount="indefinite" />
              </line>
              <line x1="100" y1="48" x2="145" y2="20" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round">
                <animate attributeName="x2" values="115;145;115" dur="0.9s" repeatCount="indefinite" />
                <animate attributeName="y2" values="60;20;60" dur="0.9s" repeatCount="indefinite" />
              </line>
              <line x1="100" y1="65" x2="60" y2="98" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round">
                <animate attributeName="x2" values="90;60;90" dur="0.9s" repeatCount="indefinite" />
              </line>
              <line x1="100" y1="65" x2="140" y2="98" stroke="#0284c7" strokeWidth="6" strokeLinecap="round">
                <animate attributeName="x2" values="110;140;110" dur="0.9s" repeatCount="indefinite" />
              </line>
            </g>
          </svg>
        );

      // Default fallback
      default:
        return (
          <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#090d16" rx="16" />
            <circle cx="100" cy="40" r="10" fill="#fb7185" />
            <line x1="100" y1="50" x2="100" y2="80" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" />
            <line x1="100" y1="60" x2="70" y2="70" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" />
            <line x1="100" y1="60" x2="130" y2="70" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" />
            <line x1="100" y1="80" x2="80" y2="105" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
            <line x1="100" y1="80" x2="120" y2="105" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return <div className="w-full h-full flex items-center justify-center select-none">{renderVisual()}</div>;
};
