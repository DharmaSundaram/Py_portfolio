import React from 'react';
import { Star, Calendar, Code2, Sparkles, MessageSquareQuote, Edit3, Trash2, Eye, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import StarDisplay from '../common/StarDisplay';
import Badge from '../common/Badge';

export default function AchievementCard({
  achievement,
  index,
  onView,
  onEdit,
  onDelete,
  onToggleVerify
}) {
  const formattedDate = achievement.date
    ? new Date(achievement.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'Date not specified';

  const achievementNumber = String(index + 1).padStart(2, '0');
  const isVerified = achievement.isVerified !== false;

  return (
    <div className={`glass-panel glass-panel-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group border ${
      achievement.isHighlighted
        ? 'border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.2)] bg-gradient-to-b from-amber-500/[0.08] to-transparent'
        : 'border-white/10'
    }`}>
      {/* Top Header: ID Badge, Verification Pill, and Actions */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
              #{achievement.id?.startsWith('nb-') ? `RECORD-${achievementNumber}` : `STAR-${achievementNumber}`}
            </span>

            {/* Verification Status Badge */}
            {isVerified ? (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Verified</span>
              </span>
            ) : (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 animate-pulse">
                <AlertCircle className="w-3 h-3 text-amber-400" />
                <span>Needs Verification</span>
              </span>
            )}

            {/* Physical Stickers Badge */}
            {achievement.stickers > 0 && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-300" />
                <span>{achievement.stickers} {achievement.stickerColor || 'Stickers'}</span>
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onView(achievement)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="View full achievement record"
              aria-label="View details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onEdit(achievement)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-white/10 transition-colors"
              title="Edit date, star count, or reason"
              aria-label="Edit achievement"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(achievement)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/10 transition-colors"
              title="Delete record"
              aria-label="Delete achievement"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Star Awards & Date */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <StarDisplay count={achievement.stars} size="md" />
            <span className="text-xs font-bold text-amber-300 font-mono">
              ({achievement.stars} {achievement.stars === 1 ? 'Star' : 'Stars'})
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Achievement Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors leading-snug mb-3">
          {achievement.title}
        </h3>

        {/* Category Pill & Ink Color Note */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {achievement.category && (
            <Badge variant="purple" size="xs">
              {achievement.category}
            </Badge>
          )}
          {achievement.inkColor && (
            <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
              {achievement.inkColor}
            </span>
          )}
        </div>

        {/* Reason Callout Box */}
        <div className="p-4 rounded-2xl bg-amber-500/[0.07] border border-amber-500/20 mb-4 relative">
          <div className="flex items-start gap-2.5">
            <MessageSquareQuote className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/90 font-bold block">
                Sharmila Banu Mam Evaluation Reason:
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                "{achievement.facultyReason}"
              </p>

              {/* Highlight Note if present */}
              {achievement.facultyFeedback && (
                <div className="pt-2 text-xs text-amber-300 font-bold flex items-center gap-1.5">
                  <span>Note:</span>
                  <span className="bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30">
                    "{achievement.facultyFeedback}"
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">— {achievement.facultyName || 'Sharmila Banu Mam'}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Task */}
        {achievement.relatedTask && (
          <div className="mb-3 flex items-start gap-2 text-xs text-slate-300">
            <Code2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-400">Related Task: </span>
              <span className="text-slate-200">{achievement.relatedTask}</span>
            </div>
          </div>
        )}

        {/* Python Concepts Tags */}
        {achievement.pythonConcepts && achievement.pythonConcepts.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {achievement.pythonConcepts.map((concept, i) => (
              <span
                key={i}
                className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5 font-mono"
              >
                #{concept}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: Image Preview & Details CTA */}
      <div className="pt-4 border-t border-white/10 mt-2 space-y-2">
        {achievement.imageUrl && (
          <div
            onClick={() => onView(achievement)}
            className="rounded-xl overflow-hidden h-24 w-full border border-white/10 relative cursor-pointer group/img bg-black/40"
          >
            <img
              src={achievement.imageUrl}
              alt={achievement.title}
              className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-xs text-white font-medium">
              Click to view notebook page
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => onView(achievement)}
            className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View Record & Notes</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </button>

          {onToggleVerify && (
            <button
              onClick={() => onToggleVerify(achievement)}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-colors ${
                isVerified
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
              }`}
              title={isVerified ? 'Click to mark as Needs Verification' : 'Click to approve as Verified'}
            >
              {isVerified ? 'Verified' : 'Approve'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
