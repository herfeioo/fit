import React from 'react';
import { History, Trash2, Plus, MessageSquare, X, Check, Clock, Calendar } from 'lucide-react';
import { CoachChatSession, Language } from '../types';

interface CoachHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: CoachChatSession[];
  activeSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
  onClearAll: () => void;
  onNewChat: () => void;
  lang: Language;
}

export const CoachHistoryModal: React.FC<CoachHistoryModalProps> = ({
  isOpen,
  onClose,
  sessions,
  activeSessionId,
  onSelectSession,
  onDeleteSession,
  onClearAll,
  onNewChat,
  lang,
}) => {
  if (!isOpen) return null;

  const isFa = lang === 'fa';

  return (
    <div
      id="coach-history-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      dir={isFa ? 'rtl' : 'ltr'}
    >
      <div
        id="coach-history-modal-card"
        className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
      >
        {/* Top Header */}
        <div className="bg-slate-800/80 px-5 py-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">
                {isFa ? 'تاریخچه گفتگوهای مربی هوشمند' : 'AI Coach Chat History'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isFa
                  ? `${sessions.length} گفتگوی ذخیره‌شده در حافظه`
                  : `${sessions.length} conversations saved`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar: New Chat & Clear All */}
        <div className="px-5 py-3 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between gap-3">
          <button
            id="history-start-new-chat-btn"
            onClick={() => {
              onNewChat();
              onClose();
            }}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isFa ? 'گفتگوی جدید' : 'New Chat'}</span>
          </button>

          {sessions.length > 0 && (
            <button
              id="history-clear-all-btn"
              onClick={() => {
                if (
                  window.confirm(
                    isFa
                      ? 'آیا از حذف تمام تاریخچه گفتگوها مطمئن هستید؟'
                      : 'Are you sure you want to delete all chat history?'
                  )
                ) {
                  onClearAll();
                }
              }}
              className="px-3 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 hover:text-rose-200 border border-rose-500/30 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span>{isFa ? 'حذف کل تاریخچه' : 'Clear All'}</span>
            </button>
          )}
        </div>

        {/* Sessions List */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
          {sessions.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                <MessageSquare className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-300">
                {isFa ? 'هنوز گفتگویی ذخیره نشده است' : 'No chat history found yet'}
              </p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                {isFa
                  ? 'هر سوال یا مکالمه‌ای که با مربی هوشمند داشته باشید به طور خودکار در تاریخچه ذخیره خواهد شد.'
                  : 'Every conversation with the AI coach is automatically saved here.'}
              </p>
            </div>
          ) : (
            sessions.map((session) => {
              const isActive = session.id === activeSessionId;
              const msgCount = session.messages?.length || 0;
              const formattedDate = new Date(session.updatedAt || session.createdAt).toLocaleDateString(
                isFa ? 'fa-IR' : 'en-US',
                { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
              );

              return (
                <div
                  key={session.id}
                  className={`group relative rounded-xl border p-3.5 transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-950/30 border-emerald-500/60 shadow-sm shadow-emerald-900/20'
                      : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 hover:border-slate-600'
                  }`}
                  onClick={() => {
                    onSelectSession(session.id);
                    onClose();
                  }}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isActive
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-slate-700/60 text-slate-400'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4
                          className={`text-xs font-bold truncate ${
                            isActive ? 'text-emerald-300' : 'text-slate-200'
                          }`}
                        >
                          {session.title}
                        </h4>
                        {isActive && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {isFa ? 'چت فعال' : 'Active'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {formattedDate}
                        </span>
                        <span>•</span>
                        <span>
                          {isFa ? `${msgCount} پیام` : `${msgCount} messages`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        window.confirm(
                          isFa
                            ? `آیا گفتگوی «${session.title}» حذف شود؟`
                            : `Delete conversation "${session.title}"?`
                        )
                      ) {
                        onDeleteSession(session.id);
                      }
                    }}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
                    title={isFa ? 'حذف این گفتگو' : 'Delete conversation'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom footer */}
        <div className="p-3.5 bg-slate-950/80 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
          >
            {isFa ? 'بستن' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
