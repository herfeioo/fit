import React, { useState } from 'react';
import {
  X,
  Play,
  Youtube,
  ExternalLink,
  Flame,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { CardioExerciseItem, Language } from '../types';
import { CardioMotionVisual } from './CardioMotionVisual';

interface CardioExerciseModalProps {
  exercise: CardioExerciseItem | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const CardioExerciseModal: React.FC<CardioExerciseModalProps> = ({
  exercise,
  isOpen,
  onClose,
  lang,
}) => {
  const isFa = lang === 'fa';
  const [activeMediaTab, setActiveMediaTab] = useState<'motion' | 'photo' | 'youtube'>('motion');
  const [imageError, setImageError] = useState(false);

  if (!isOpen || !exercise) return null;

  const googleImagesUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
    exercise.googleSearchQuery || `${exercise.name.en} exercise form`
  )}`;
  const directYoutubeUrl = `https://www.youtube.com/watch?v=${exercise.youtubeId}`;

  return (
    <div
      id="cardio-exercise-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      dir={isFa ? 'rtl' : 'ltr'}
    >
      <div
        id="cardio-exercise-modal-card"
        className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
      >
        {/* Top Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-100 line-clamp-1">
                {isFa ? exercise.name.fa : exercise.name.en}
              </h3>
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5 line-clamp-1">
                <span>{isFa ? exercise.primaryMuscles.fa : exercise.primaryMuscles.en}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Controls Bar */}
        <div className="px-5 py-2.5 bg-slate-950/70 border-b border-slate-800/80 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveMediaTab('motion')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeMediaTab === 'motion'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isFa ? 'انیمیشن لوپ حرکت' : 'Looped Motion'}</span>
            </button>

            <button
              onClick={() => setActiveMediaTab('photo')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeMediaTab === 'photo'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{isFa ? 'عکس' : 'Photo'}</span>
            </button>

            {exercise.youtubeId && (
              <button
                onClick={() => setActiveMediaTab('youtube')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeMediaTab === 'youtube'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Youtube className="w-3.5 h-3.5" />
                <span>{isFa ? 'ویدیو یوتیوب' : 'YouTube Demo'}</span>
              </button>
            )}
          </div>

          {/* Quick Google Images & YouTube Links */}
          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={googleImagesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-cyan-300 hover:text-cyan-200 text-xs font-medium flex items-center gap-1 transition-all"
              title={isFa ? 'جستجوی تصاویر و گیف‌های این حرکت در گوگل' : 'Search images on Google'}
            >
              <Search className="w-3 h-3" />
              <span className="hidden sm:inline">{isFa ? 'عکس‌ها در گوگل' : 'Google Images'}</span>
              <ExternalLink className="w-2.5 h-2.5 text-cyan-400" />
            </a>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Media Viewport */}
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center relative shadow-inner">
            {activeMediaTab === 'motion' ? (
              <div className="w-full h-full p-2 flex items-center justify-center relative bg-slate-950">
                <CardioMotionVisual exerciseId={exercise.id} className="w-full h-full max-h-56" />
                <div className="absolute top-2.5 right-2.5 rtl:right-auto rtl:left-2.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-extrabold text-emerald-300 flex items-center gap-1 backdrop-blur-sm shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>{isFa ? 'انیمیشن لوپ شده' : 'Continuous Loop'}</span>
                </div>
              </div>
            ) : activeMediaTab === 'photo' ? (
              imageError ? (
                <div className="p-6 text-center text-slate-400 space-y-2">
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                  <p className="text-xs">
                    {isFa
                      ? 'تصویر مستقیم لود نشد. می‌توانید با دکمه بالا تصاویر حرکت را در گوگل مشاهده کنید.'
                      : 'Image unavailable. Use Google Images button above.'}
                  </p>
                  <a
                    href={googleImagesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-emerald-400 text-xs rounded-xl hover:bg-slate-700 font-bold"
                  >
                    <Search className="w-3 h-3" />
                    <span>{isFa ? 'مشاهده تصاویر در گوگل' : 'Search Google'}</span>
                  </a>
                </div>
              ) : (
                <img
                  src={exercise.imageUrl}
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

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block mb-0.5">
                {isFa ? 'زمان فعالیت (کار)' : 'Work Duration'}
              </span>
              <span className="font-bold text-emerald-400 font-mono text-sm">
                {exercise.defaultWorkSec} {isFa ? 'ثانیه' : 'sec'}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block mb-0.5">
                {isFa ? 'استراحت' : 'Rest'}
              </span>
              <span className="font-bold text-slate-200 font-mono text-sm">
                {exercise.defaultRestSec} {isFa ? 'ثانیه' : 'sec'}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block mb-0.5">
                {isFa ? 'کالری‌سوزی' : 'Burn Rate'}
              </span>
              <span className="font-bold text-rose-400 font-mono text-sm">
                ~{exercise.caloriesPerMinute} {isFa ? 'کالری/دقیقه' : 'kcal/min'}
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{isFa ? 'نحوه اجرای اصولی حرکت:' : 'Execution Guide:'}</span>
            </h4>
            <ol className="space-y-1.5 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
              {(isFa ? exercise.instructions.fa : exercise.instructions.en).map((step, idx) => (
                <li key={idx} className="pl-1">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Coach Tip & Mistakes */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-1">
            <span className="font-bold block flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isFa ? 'نکته طلایی مربی و پیشگیری از خطا:' : 'Coach Pro-Tip:'}</span>
            </span>
            <p className="leading-relaxed">{isFa ? exercise.tips.fa : exercise.tips.en}</p>
          </div>

          {/* Direct External Links */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <a
              href={directYoutubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-600/40 text-rose-300 hover:text-rose-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Youtube className="w-4 h-4 text-rose-500" />
              <span>{isFa ? 'مشاهده ویدیو کامل در یوتیوب' : 'Open in YouTube'}</span>
              <ExternalLink className="w-3 h-3 text-rose-400" />
            </a>

            <a
              href={googleImagesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/40 text-cyan-300 hover:text-cyan-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span>{isFa ? 'جستجوی تصویر در گوگل' : 'Open Google Images'}</span>
              <ExternalLink className="w-3 h-3 text-cyan-400" />
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            {isFa ? 'بستن' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
