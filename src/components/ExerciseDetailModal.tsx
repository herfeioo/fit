import React, { useState } from 'react';
import {
  X,
  Play,
  Link2,
  AlertCircle,
  Wind,
  Clock,
  CheckCircle2,
  Youtube,
  ExternalLink,
  RefreshCw,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Layers
} from 'lucide-react';
import { Exercise, Language } from '../types';
import { translations } from '../translations';
import { getExerciseById } from '../data/exerciseDatabase';

interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSaveCustomGif: (exerciseId: string, url: string) => void;
  customGifUrl?: string;
  onSelectAlternative?: (exerciseId: string) => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  exercise,
  isOpen,
  onClose,
  lang,
  onSaveCustomGif,
  customGifUrl,
  onSelectAlternative,
}) => {
  const t = translations[lang];
  const [activeMediaTab, setActiveMediaTab] = useState<'visual' | 'youtube'>('visual');
  const [pastedUrl, setPastedUrl] = useState<string>(customGifUrl || '');
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  if (!isOpen || !exercise) return null;

  const currentVisualUrl = customGifUrl || exercise.customGifUrl || exercise.gifUrl;

  const handleUpdateUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (pastedUrl.trim()) {
      onSaveCustomGif(exercise.id, pastedUrl.trim());
      setImageError(false);
      setShowUrlInput(false);
    }
  };

  const regressionEx = exercise.progressionOptions?.regression
    ? getExerciseById(exercise.progressionOptions.regression)
    : undefined;

  const progressionEx = exercise.progressionOptions?.progression
    ? getExerciseById(exercise.progressionOptions.progression)
    : undefined;

  const riskColor =
    exercise.injuryRiskLevel === 'high'
      ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
      : exercise.injuryRiskLevel === 'medium'
      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl max-h-[92vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {exercise.muscleGroup || exercise.targetMuscle}
              </span>
              {exercise.movementPattern && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {exercise.movementPattern}
                </span>
              )}
              {exercise.type && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                  {exercise.type}
                </span>
              )}
              {exercise.equipment && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                  {exercise.equipment}
                </span>
              )}
              {exercise.injuryRiskLevel && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${riskColor}`}>
                  Risk: {exercise.injuryRiskLevel}
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-100 mt-1">
              {exercise.name[lang]}
            </h2>
          </div>

          <button
            id="close-exercise-detail-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Toggle Pills */}
        <div className="px-5 pt-3 pb-2 bg-slate-950/40 flex items-center justify-between border-b border-slate-800/60">
          <div className="flex items-center gap-2">
            <button
              id="tab-visual-demo-btn"
              onClick={() => setActiveMediaTab('visual')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeMediaTab === 'visual'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>{t.visualDemo}</span>
            </button>

            {exercise.youtubeId && (
              <button
                id="tab-youtube-btn"
                onClick={() => setActiveMediaTab('youtube')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeMediaTab === 'youtube'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Youtube className="w-3.5 h-3.5" />
                <span>{t.watchYoutube}</span>
              </button>
            )}
          </div>

          {/* Toggle fallback custom GIF field */}
          <button
            id="toggle-custom-gif-input-btn"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] font-medium text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
            title="Paste custom link"
          >
            <Link2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === 'fa' ? 'لینک دلخواه' : 'Custom URL'}</span>
          </button>
        </div>

        {/* Custom URL Input Bar (Fallback System) */}
        {showUrlInput && (
          <form onSubmit={handleUpdateUrl} className="px-5 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center gap-2">
            <input
              type="url"
              value={pastedUrl}
              onChange={(e) => setPastedUrl(e.target.value)}
              placeholder={lang === 'fa' ? 'لینک مستقیم عکس یا گیف حرکت را وارد کنید...' : 'Paste direct image/GIF URL...'}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors cursor-pointer"
            >
              {t.updateGifUrl}
            </button>
          </form>
        )}

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Media Viewport */}
          <div className="w-full aspect-video sm:h-64 rounded-2xl overflow-hidden bg-black/60 border border-slate-800 flex items-center justify-center relative shadow-inner">
            {activeMediaTab === 'visual' ? (
              imageError ? (
                <div className="p-6 text-center text-slate-400 space-y-2">
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                  <p className="text-xs">{lang === 'fa' ? 'پیش‌نمایش تصویر در دسترس نیست. می‌توانید لینک دلخواه خود را وارد کنید.' : 'Visual preview unavailable. Paste a custom GIF URL above.'}</p>
                  <button
                    onClick={() => setShowUrlInput(true)}
                    className="px-3 py-1 bg-slate-800 text-emerald-400 text-xs rounded-lg hover:bg-slate-700"
                  >
                    {t.pasteCustomGif}
                  </button>
                </div>
              ) : (
                <img
                  src={currentVisualUrl}
                  alt={exercise.name.en}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              )
            ) : (
              // YouTube Embed Player
              <div className="w-full h-full relative">
                <iframe
                  className="w-full h-full border-0"
                  src={`https://www.youtube-nocookie.com/embed/${exercise.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
                  title={exercise.youtubeTitle || exercise.name.en}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Prescribed Training Variables */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t.target} {t.sets} × {t.reps}</span>
              <span className="text-sm font-bold text-slate-100">{exercise.defaultSets} × {exercise.defaultReps}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t.rest}</span>
              <span className="text-sm font-bold text-emerald-400">{exercise.defaultRestSec} {t.sec}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t.tempo}</span>
              <span className="text-sm font-mono font-bold text-cyan-400">{exercise.guide?.tempo || '3-0-1-0'}</span>
            </div>
          </div>

          {/* Biomechanical Progression & Regression */}
          {(regressionEx || progressionEx) && (
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>{lang === 'fa' ? 'سلسله‌مراتب بیومکانیکی (پیشرفت و ساده‌سازی)' : 'Biomechanical Progressions & Regressions'}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {regressionEx && (
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2">
                    <TrendingDown className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-amber-400 font-bold block">
                        {lang === 'fa' ? 'حرکت ساده‌تر / رگرسیون (Regression):' : 'Regression (Easier):'}
                      </span>
                      <span className="font-semibold text-slate-200">{regressionEx.name[lang]}</span>
                    </div>
                  </div>
                )}
                {progressionEx && (
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-cyan-400 font-bold block">
                        {lang === 'fa' ? 'حرکت پیشرفته‌تر / پروگرسیون (Progression):' : 'Progression (Harder):'}
                      </span>
                      <span className="font-semibold text-slate-200">{progressionEx.name[lang]}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step-by-Step Execution Guide */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.exerciseGuide}</span>
            </h3>
            <ol className="space-y-2 text-xs text-slate-300 leading-relaxed list-decimal list-inside pr-1">
              {(exercise.instructions?.[lang] || exercise.guide?.steps?.[lang] || []).map((step, idx) => (
                <li key={idx} className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-slate-200">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Coaching Form Cues */}
          {exercise.guide?.formCues?.[lang] && (
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider font-bold text-cyan-400 flex items-center gap-1.5">
                <Play className="w-4 h-4" />
                <span>{t.formCues}</span>
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {exercise.guide.formCues[lang].map((cue, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-200 flex items-start gap-2">
                    <span className="font-bold text-cyan-400 text-sm leading-none">•</span>
                    <span>{cue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Mistakes */}
          {(exercise.commonMistakes?.[lang] || exercise.guide?.commonMistakes?.[lang]) && (
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider font-bold text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>{t.commonMistakes}</span>
              </h3>
              <div className="space-y-2">
                {(exercise.commonMistakes?.[lang] || exercise.guide?.commonMistakes?.[lang] || []).map((mistake, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs text-rose-200 flex items-start gap-2">
                    <span className="font-bold text-rose-400 text-sm leading-none">✕</span>
                    <span>{mistake}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Breathing & Bracing Technique */}
          {exercise.guide?.breathing?.[lang] && (
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Wind className="w-4 h-4" />
                <span>{t.breathingTechnique}</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {exercise.guide.breathing[lang]}
              </p>
            </div>
          )}

          {/* Movement Tempo Breakdown */}
          {exercise.guide?.tempo && (
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{t.tempoGuide}</span>
                </h3>
                <span className="font-mono text-xs font-bold text-amber-300">{exercise.guide.tempo}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {exercise.guide.tempoDescription?.[lang] || 'Tempo: Eccentric - Isometric - Concentric - Peak'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-end">
          <button
            id="close-exercise-bottom-btn"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
