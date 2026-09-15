import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Languages, Wrench } from 'lucide-react';
import appLogo from '../assets/images/fitcoach_logo_1789339653130.jpg';

interface AndroidFrameProps {
  children: React.ReactNode;
  lang: Language;
  onToggleLanguage: () => void;
  onOpenProfile: () => void;
  userName: string;
  onOpenToolbox?: () => void;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  lang,
  onToggleLanguage,
  onOpenToolbox,
}) => {
  const t = translations[lang];

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col items-center justify-start transition-colors duration-300">
      {/* Auto-responsive / Adaptive Layout:
          - Mobile screens: 100% full width and height with native app feel
          - Tablet & Desktop: cleanly centered in max-w-4xl / max-w-5xl container with subtle borders
          - Zero fake phone bezels, zero fake wifi/battery/5G/punch-hole status bars
      */}
      <div className="w-full max-w-4xl lg:max-w-5xl min-h-screen flex flex-col bg-slate-950 sm:border-x sm:border-slate-800/80 shadow-2xl relative">
        {/* Top Header */}
        <header className="w-full px-3 sm:px-4 py-2 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between text-xs z-30 select-none">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden ring-1 ring-emerald-500/50 shadow-md shadow-emerald-950/50 shrink-0 bg-slate-900 group">
              <img
                src={appLogo}
                alt="FitCoach Pro Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wider text-slate-100 text-sm block leading-none">
                  {t.appTitle}
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30">
                  PRO
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block leading-tight mt-0.5">
                {t.appSubtitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Gym Toolbox Quick Action */}
            {onOpenToolbox && (
              <button
                id="header-gym-toolbox-btn"
                onClick={onOpenToolbox}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-700 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-300 hover:text-emerald-200 text-xs font-bold transition-all active:scale-95 shadow-sm cursor-pointer"
                title={lang === 'fa' ? 'جعبه ابزار باشگاه: محاسبه ۱RM، چینش صفحات هالتر و گرم‌کردن' : 'Gym Toolbox: 1RM, Plates & Warmup'}
              >
                <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'fa' ? 'جعبه ابزار' : 'Gym Tools'}</span>
              </button>
            )}

            {/* Clean Language Switcher (Zero Flags) */}
            <button
              id="lang-toggle-btn"
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-700 border border-slate-700/60 text-slate-200 text-xs font-semibold transition-all active:scale-95 shadow-sm cursor-pointer"
              title="تغییر زبان / Switch Language"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'en' ? 'فارسی' : 'English'}</span>
            </button>
          </div>
        </header>

        {/* Application Content Viewport */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </main>
      </div>
    </div>
  );
};
