import React, { useEffect } from 'react';
import { X, Calendar, Star, Code2, Award, Lightbulb, MessageSquareQuote, CheckCircle2, Edit3, Image, Sparkles, AlertCircle } from 'lucide-react';
import StarDisplay from '../common/StarDisplay';
import Badge from '../common/Badge';

export default function AchievementDetailModal({
  achievement,
  isOpen,
  onClose,
  onEdit
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !achievement) return null;

  const formattedDate = achievement.date
    ? new Date(achievement.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Date not specified';

  const isVerified = achievement.isVerified !== false;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="achievement-detail-title"
    >
      <div className="relative w-full max-w-2xl my-8 glass-panel rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-purple-900/40 via-amber-900/30 to-indigo-900/40 p-6 sm:p-8 border-b border-white/10 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-amber-300">
              {achievement.id}
            </span>

            {isVerified ? (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Achievement</span>
              </span>
            ) : (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Needs Verification</span>
              </span>
            )}

            {achievement.stickers > 0 && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/40 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                <span>{achievement.stickers} {achievement.stickerColor || 'Stickers'}</span>
              </span>
            )}

            {achievement.category && (
              <Badge variant="purple" size="xs">
                {achievement.category}
              </Badge>
            )}
          </div>

          <h2 id="achievement-detail-title" className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            {achievement.title}
          </h2>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <StarDisplay count={achievement.stars} size="lg" />
              <span className="text-base font-bold text-amber-300 font-mono">
                {achievement.stars} {achievement.stars === 1 ? 'Star' : 'Stars'} Awarded
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Reason Sharmila Banu Mam Awarded The Star */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 relative">
            <div className="flex items-start gap-3">
              <MessageSquareQuote className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Official Reason Given by Sharmila Banu Mam
                </h4>
                <p className="text-slate-100 text-sm sm:text-base leading-relaxed italic">
                  "{achievement.facultyReason}"
                </p>
                {achievement.facultyName && (
                  <p className="text-xs text-amber-300 font-semibold pt-1">
                    Evaluator: {achievement.facultyName || 'Sharmila Banu Mam'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Verification Notes */}
          {achievement.verificationNotes && (
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-slate-200 block uppercase tracking-wider font-mono">
                Notebook Source & Verification Notes:
              </span>
              <p>{achievement.verificationNotes}</p>
            </div>
          )}

          {/* Feedback Highlight */}
          {achievement.facultyFeedback && (
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
              <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold mb-1">
                Handwritten Message / Feedback from Sharmila Banu Mam
              </h4>
              <p className="text-base font-bold text-white italic leading-relaxed">
                "{achievement.facultyFeedback}"
              </p>
            </div>
          )}

          {/* Related Task */}
          {achievement.relatedTask && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                <Code2 className="w-4 h-4" />
                <span>Related Python Task / Activity</span>
              </div>
              <p className="text-sm text-slate-200 bg-white/[0.03] p-3.5 rounded-xl border border-white/5">
                {achievement.relatedTask}
              </p>
            </div>
          )}

          {/* Python Concepts & Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievement.pythonConcepts && achievement.pythonConcepts.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Python Concepts
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {achievement.pythonConcepts.map((c, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-slate-200 border border-white/10 font-mono"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {achievement.skillsDemonstrated && (
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Skills Demonstrated
                </span>
                <p className="text-xs sm:text-sm text-slate-300 bg-white/[0.03] p-3 rounded-xl border border-white/5">
                  {achievement.skillsDemonstrated}
                </p>
              </div>
            )}
          </div>

          {/* Learning Reflection */}
          {achievement.learningReflection && (
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-300 font-bold">
                <Lightbulb className="w-4 h-4" />
                <span>Learning Reflection & Key Takeaways</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {achievement.learningReflection}
              </p>
            </div>
          )}

          {/* Notebook Photo Evidence Preview */}
          {achievement.imageUrl && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                <Image className="w-4 h-4 text-amber-400" />
                <span>Original Notebook Photograph</span>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 max-h-96 bg-black/40">
                <img
                  src={achievement.imageUrl}
                  alt={achievement.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-white/[0.02] border-t border-white/10 flex items-center justify-between gap-4">
          <button
            onClick={() => {
              onClose();
              onEdit(achievement);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Date, Stars or Notes</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
