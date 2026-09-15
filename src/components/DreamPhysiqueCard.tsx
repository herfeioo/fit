import React, { useRef, useState } from 'react';
import {
  Target,
  Upload,
  Camera,
  Sparkles,
  Scale,
  Edit3,
  CheckCircle2,
  Trash2,
  Maximize2,
  X,
  Layers,
  Flame,
  UserCheck
} from 'lucide-react';
import { UserProfile, Language } from '../types';

interface DreamPhysiqueCardProps {
  profile: UserProfile;
  lang: Language;
  onOpenGoalModal: () => void;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const DreamPhysiqueCard: React.FC<DreamPhysiqueCardProps> = ({
  profile,
  lang,
  onOpenGoalModal,
  onUpdateProfile,
}) => {
  const isFa = lang === 'fa';
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [activePhotoTab, setActivePhotoTab] = useState<'goal' | 'myPhoto' | 'compare'>('goal');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  // Target weight & details
  const targetWeight = profile.targetWeight || 89;
  const currentWeight = profile.weight || 81;
  const height = profile.height || 180;
  const weightDiff = Math.round((targetWeight - currentWeight) * 10) / 10;

  // Target photo URL (defaults to aesthetic fit 89kg physique)
  const defaultGoalPhoto =
    profile.targetPhysiquePhotoUrl ||
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80';

  // Physique style label
  const getPhysiqueTitle = () => {
    switch (profile.targetPhysiqueType) {
      case 'lean_muscular':
        return isFa ? 'حجم خالص و دانسیته سنگین عضلانی' : 'Dense Lean Muscle Mass';
      case 'athletic':
        return isFa ? 'فیتنس ورزشی، چابک و کات' : 'Athletic Lean & Agile';
      case 'powerbuilder':
        return isFa ? 'پاوربیلدینگ و قدرت حداکثری' : 'Powerbuilder Dense Strength';
      case 'aesthetic_shredded':
      default:
        return isFa ? 'فیزیک کات عضلانی و V-Taper (خوش‌فیت)' : 'Aesthetic V-Taper Shredded';
    }
  };

  // Image compressor & converter to base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      setUploadError(isFa ? 'لطفاً یک فایل تصویری معتبر انتخاب کنید.' : 'Please choose a valid image file.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const img = new Image();
      img.onload = () => {
        // Compress using HTML5 Canvas to keep storage under 150KB
        const canvas = document.createElement('canvas');
        const MAX_DIM = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);

          const updated: UserProfile = {
            ...profile,
            userUploadedPhoto: compressedDataUrl,
          };
          onUpdateProfile(updated);
          setActivePhotoTab(profile.userUploadedPhoto ? 'compare' : 'myPhoto');
        }
        setIsUploading(false);
      };
      img.onerror = () => {
        setUploadError(isFa ? 'خطا در بارگذاری تصویر.' : 'Error loading image.');
        setIsUploading(false);
      };
      img.src = loadEvent.target?.result as string;
    };
    reader.onerror = () => {
      setUploadError(isFa ? 'خطا در خواندن فایل.' : 'Failed to read file.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveUserPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    const updated: UserProfile = {
      ...profile,
      userUploadedPhoto: undefined,
    };
    onUpdateProfile(updated);
    setActivePhotoTab('goal');
  };

  return (
    <div
      id="dream-physique-vision-card"
      dir={isFa ? 'rtl' : 'ltr'}
      className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-amber-950/25 border border-slate-800 shadow-xl relative overflow-hidden"
    >
      {/* Hidden File Input for Image Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        id="user-physique-file-input"
      />

      {/* Header Bar */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                {isFa ? 'ویژن و فیزیک بدنی هدف' : 'Dream Physique Vision'}
              </span>
              <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                {isFa ? `تناسب قد ${height}cm و وزن هدف ${targetWeight}kg` : `Height ${height}cm • Goal ${targetWeight}kg`}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-slate-100 mt-0.5">
              {getPhysiqueTitle()}
            </h3>
          </div>
        </div>

        {/* Action button: Edit Goal Questions */}
        <button
          id="open-goal-assessment-btn"
          onClick={onOpenGoalModal}
          className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-amber-300 hover:text-amber-200 font-bold border border-slate-700 hover:border-amber-500/40 transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isFa ? 'تنظیم هدف' : 'Set Goal'}</span>
        </button>
      </div>

      {/* View Switcher Tabs (Only if user has uploaded a photo) */}
      {profile.userUploadedPhoto && (
        <div className="flex items-center gap-1 mb-3 bg-slate-950/70 p-1 rounded-xl border border-slate-800/80 w-fit text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActivePhotoTab('goal')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activePhotoTab === 'goal'
                ? 'bg-amber-500/20 text-amber-300 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isFa ? `فیزیک هدف (${targetWeight}kg)` : `Goal Body (${targetWeight}kg)`}
          </button>
          <button
            type="button"
            onClick={() => setActivePhotoTab('myPhoto')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activePhotoTab === 'myPhoto'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isFa ? 'عکس من' : 'My Photo'}
          </button>
          <button
            type="button"
            onClick={() => setActivePhotoTab('compare')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              activePhotoTab === 'compare'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>{isFa ? 'مقایسه قبل/هدف' : 'Compare'}</span>
          </button>
        </div>
      )}

      {/* Visual Presentation Area */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
        {/* Photos Column */}
        <div className="sm:col-span-5 relative group">
          {activePhotoTab === 'compare' && profile.userUploadedPhoto ? (
            /* Side-by-side comparison */
            <div className="grid grid-cols-2 gap-2">
              <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 shadow-md aspect-[3/4] bg-slate-950">
                <img
                  src={profile.userUploadedPhoto}
                  alt={isFa ? 'عکس فعلی من' : 'My current physique'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-md bg-emerald-950/90 text-emerald-300 text-[9px] font-bold border border-emerald-500/30">
                  {isFa ? `عکس من (${currentWeight}kg)` : `My Photo (${currentWeight}kg)`}
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/40 shadow-md aspect-[3/4] bg-slate-950">
                <img
                  src={defaultGoalPhoto}
                  alt={isFa ? 'فیزیک هدف ۸۹ کیلو' : 'Target 89kg physique'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-md bg-amber-950/90 text-amber-300 text-[9px] font-bold border border-amber-500/30">
                  {isFa ? `هدف (${targetWeight}kg)` : `Goal (${targetWeight}kg)`}
                </div>
              </div>
            </div>
          ) : activePhotoTab === 'myPhoto' && profile.userUploadedPhoto ? (
            /* User's uploaded photo alone */
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 shadow-lg aspect-[4/3] sm:aspect-[3/4] bg-slate-950">
              <img
                src={profile.userUploadedPhoto}
                alt={isFa ? 'عکس بدن من' : 'My uploaded body photo'}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-emerald-950/90 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                <UserCheck className="w-3 h-3" />
                <span>{isFa ? `بدن من (${currentWeight} کیلوگرم)` : `My Physique (${currentWeight}kg)`}</span>
              </div>
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setFullScreenImage(profile.userUploadedPhoto || null)}
                  className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs cursor-pointer"
                  title={isFa ? 'مشاهده تمام‌صفحه' : 'View Fullscreen'}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleRemoveUserPhoto}
                  className="p-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-700/50 text-xs cursor-pointer flex items-center gap-1"
                  title={isFa ? 'حذف عکس' : 'Delete Photo'}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="text-[10px]">{isFa ? 'حذف' : 'Remove'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Aesthetic Model Goal Photo */
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-lg aspect-[4/3] sm:aspect-[3/4] bg-slate-950">
              <img
                src={defaultGoalPhoto}
                alt={isFa ? `فیزیک بدنی مناسب قد ${height} و وزن ${targetWeight}` : `Goal physique for ${height}cm & ${targetWeight}kg`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

              <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-amber-950/90 backdrop-blur-sm text-amber-300 text-[10px] font-bold border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{isFa ? `الگوی بدنی ${targetWeight} کیلوگرم` : `Target Body ${targetWeight}kg`}</span>
              </div>

              <div className="absolute bottom-2 right-2 left-2 flex items-center justify-between text-[11px] text-slate-200 font-semibold">
                <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-slate-700">
                  {isFa ? `قد: ${height}cm` : `Height: ${height}cm`}
                </span>
                <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-slate-700 text-amber-300">
                  {isFa ? 'چربی: ۱۰-۱۲٪' : 'BF: 10-12%'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Goal Description & Upload Controls Column */}
        <div className="sm:col-span-7 space-y-3">
          {/* Target Stats Box */}
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">
                {isFa ? 'وزن هدف شما:' : 'Your Target Weight:'}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black text-amber-400">
                  {targetWeight} <span className="text-xs text-slate-400">{isFa ? 'کیلوگرم' : 'kg'}</span>
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    weightDiff > 0
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : weightDiff < 0
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}
                >
                  {weightDiff > 0 && (isFa ? `+${weightDiff} کیلو عضله خالص` : `+${weightDiff}kg Muscle Mass`)}
                  {weightDiff < 0 && (isFa ? `${weightDiff} کیلو کات` : `${weightDiff}kg Cut`)}
                  {weightDiff === 0 && (isFa ? 'تثبیت و کات' : 'Maintain & Recomp')}
                </span>
              </div>
            </div>

            {/* Target Description / Notes */}
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {profile.targetDescription ||
                (isFa
                  ? `هدف شما: دستیابی به فیزیک عضلانی کات با وزن ${targetWeight} کیلوگرم و قد ${height} سانتی‌متر؛ با تمرکز ویژه بر سرشانه گرد، زیربغل پهن V-Taper و خطوط عضلانی شکم بدون چربی اضافه.`
                  : `Your Goal: Reach an aesthetic ${targetWeight}kg physique at ${height}cm; focused on 3D shoulders, wide V-taper back, and sharp abdominal definition without excess fat.`)}
            </p>

            {/* Key Focus Markers */}
            <div className="flex flex-wrap gap-1.5 pt-1 text-[10px]">
              <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                {isFa ? '🔥 درصد چربی ایده‌آل: ۱۰-۱۲٪' : '🔥 Target BF: 10-12%'}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                {isFa ? '💪 تمرکز: سینه، زیربغل V و بازو' : '💪 Focus: Chest, Lats & Arms'}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                {isFa ? '⏱ افق زمانی: ۶ ماهه' : '⏱ Horizon: 6 Months'}
              </span>
            </div>
          </div>

          {/* Upload Button Section */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <button
                id="upload-user-physique-photo-btn"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex-1 min-w-[170px] py-2.5 px-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>{isFa ? 'در حال لود عکس...' : 'Loading Photo...'}</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4" />
                    <span>
                      {profile.userUploadedPhoto
                        ? isFa
                          ? 'تغییر عکس بدن من'
                          : 'Change My Photo'
                        : isFa
                        ? 'لود عکس / آپلود عکس من'
                        : 'Upload / Load My Photo'}
                    </span>
                  </>
                )}
              </button>

              {profile.userUploadedPhoto && (
                <button
                  type="button"
                  onClick={() => setActivePhotoTab(activePhotoTab === 'compare' ? 'goal' : 'compare')}
                  className="py-2.5 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isFa ? 'مقایسه با هدف' : 'Compare'}</span>
                </button>
              )}
            </div>

            <p className="text-[10px] text-slate-400">
              {isFa
                ? 'عکس بدنتان را آپلود کنید تا هوش مصنوعی میزان پیشرفت شما تا فیزیک ایده‌آل را تطبیق دهد.'
                : 'Upload your photo to track visual progress toward your dream physique.'}
            </p>

            {uploadError && (
              <p className="text-xs text-rose-400 font-medium">{uploadError}</p>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Image Preview Modal */}
      {fullScreenImage && (
        <div
          onClick={() => setFullScreenImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer animate-fadeIn"
        >
          <div className="relative max-w-lg max-h-[90vh] overflow-hidden rounded-3xl border border-slate-800 bg-slate-950">
            <img src={fullScreenImage} alt="Full preview" className="w-full h-auto object-contain" />
            <button
              onClick={() => setFullScreenImage(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-slate-200 hover:text-white border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
