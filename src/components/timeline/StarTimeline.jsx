import React, { useState, useMemo } from 'react';
import { Calendar, Star, Code2, MessageSquareQuote, Clock, Sparkles, Filter, CheckCircle2, AlertCircle } from 'lucide-react';
import StarDisplay from '../common/StarDisplay';
import Badge from '../common/Badge';

export default function StarTimeline({
  achievements,
  onViewAchievement
}) {
  const [periodFilter, setPeriodFilter] = useState('ALL');

  const timelineEntries = useMemo(() => {
    const sorted = [...achievements].sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date);
    });

    if (periodFilter === 'ALL') return sorted;

    const now = new Date();
    return sorted.filter(item => {
      if (!item.date) return periodFilter === 'UNDATED';
      const itemDate = new Date(item.date);
      const diffDays = (now - itemDate) / (1000 * 60 * 60 * 24);

      if (periodFilter === 'LAST_30') return diffDays <= 30;
      if (periodFilter === 'LAST_60') return diffDays <= 60;
      if (periodFilter === 'LAST_90') return diffDays <= 90;
      return true;
    });
  }, [achievements, periodFilter]);

  return (
    <section id="timeline" className="py-16 sm:py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
              <Clock className="w-3.5 h-3.5" />
              <span>Chronological Notebook Progression</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Notebook-Inspired Timeline
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Real chronological timeline reconstructed from handwritten dates, signatures by Sharmila Banu Mam (JSh), and star awards.
            </p>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={periodFilter}
              onChange={e => setPeriodFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#0e1329] border border-white/15 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
            >
              <option value="ALL">All Entries ({achievements.length})</option>
              <option value="LAST_30">Last 30 Days</option>
              <option value="LAST_60">Last 60 Days</option>
              <option value="LAST_90">Last 90 Days</option>
            </select>
          </div>
        </div>

        {/* Timeline Container */}
        {timelineEntries.length > 0 ? (
          <div className="relative pl-6 sm:pl-8 border-l-2 border-white/10 space-y-10 sm:space-y-12">
            {timelineEntries.map((item) => {
              const formattedDate = item.date
                ? new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })
                : 'Date not specified';

              const isVerified = item.isVerified !== false;

              return (
                <div key={item.id} className="relative group">
                  {/* Glowing Node on Timeline */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#070913] border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-transform">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
                  </div>

                  {/* Timeline Card */}
                  <div className={`glass-panel glass-panel-hover p-6 rounded-3xl border ${
                    item.isHighlighted
                      ? 'border-amber-500/50 bg-gradient-to-r from-amber-500/[0.08] to-transparent shadow-[0_0_25px_rgba(245,158,11,0.15)]'
                      : 'border-white/10'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
                          {item.stars} ⭐ {item.stars === 1 ? 'Star' : 'Stars'}
                        </span>

                        {isVerified ? (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-amber-400" />
                            <span>Needs Verification</span>
                          </span>
                        )}

                        {item.stickers > 0 && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/40 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-purple-300" />
                            <span>{item.stickers} {item.stickerColor || 'Stickers'}</span>
                          </span>
                        )}

                        {item.category && (
                          <Badge variant="purple" size="xs">
                            {item.category}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{formattedDate}</span>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>

                    {/* Reason by Sharmila Banu Mam */}
                    <div className="p-3.5 rounded-2xl bg-amber-500/[0.05] border border-amber-500/15 mb-3 flex items-start gap-2.5">
                      <MessageSquareQuote className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/80 font-bold block">
                          Reason & Evaluation by Sharmila Banu Mam
                        </span>
                        <p className="text-xs sm:text-sm text-slate-200 italic">
                          "{item.facultyReason}"
                        </p>
                        {item.facultyFeedback && (
                          <span className="text-xs text-amber-300 font-bold block pt-1">
                            Handwritten Message: "{item.facultyFeedback}"
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Related Task */}
                    {item.relatedTask && (
                      <div className="flex items-center gap-2 text-xs text-slate-300 mb-3">
                        <Code2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="text-slate-400">Task: </span>
                        <span className="text-slate-200 font-medium">{item.relatedTask}</span>
                      </div>
                    )}

                    <button
                      onClick={() => onViewAchievement(item)}
                      className="text-xs font-semibold text-amber-300 hover:text-amber-200 hover:underline flex items-center gap-1 pt-1"
                    >
                      <span>View details & reflections</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-8 border border-white/10 text-center">
            <p className="text-sm text-slate-400">
              No timeline records available for the selected period.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
