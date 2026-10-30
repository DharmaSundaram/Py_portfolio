import React from 'react';
import { Heart, MessageSquareQuote, Star, CheckCircle2, Calendar, Award, ExternalLink, Sparkles } from 'lucide-react';
import StarDisplay from '../common/StarDisplay';
import Badge from '../common/Badge';

export default function FacultyRecognitionSection({
  onViewEvidence
}) {
  return (
    <section id="faculty" className="py-16 sm:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold mb-3">
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400/20" />
            <span>Sharmila Banu Mam Recognition & Commendations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Sharmila Banu Mam Recognition
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Direct handwritten appreciation and feedback from Sharmila Banu Mam (signed <span className="font-mono text-amber-300 font-bold">JSh</span>), preserved directly from my notebook evaluations.
          </p>
        </div>

        {/* Featured Commendation Card: "Good Job DHARMA!" */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border-2 border-amber-500/30 relative overflow-hidden shadow-2xl mb-10 bg-gradient-to-br from-amber-500/[0.08] via-purple-950/20 to-indigo-950/20">
          {/* Subtle gold backdrop glow */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold font-mono flex items-center gap-1.5 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Official Handwritten Commendation from Sharmila Banu Mam</span>
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>09 / 09 / 2026</span>
                </span>
              </div>

              {/* Commendation Quote Banner */}
              <div className="py-2">
                <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight flex items-center gap-3">
                  <span className="text-amber-400 font-serif italic">“</span>
                  <span className="gold-gradient-text">Good Job DHARMA!</span>
                  <span className="text-amber-400 font-serif italic">”</span>
                </h3>
              </div>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Handwritten in bold blue ink by Sharmila Banu Mam alongside signature <span className="text-amber-300 font-semibold font-mono">JSh</span> and awarded with <span className="text-emerald-400 font-bold">2 Stars</span> and <span className="text-emerald-400 font-bold">2 Green Gem Star Stickers</span> for exemplary lab execution and consistency.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                  Evaluator: <span className="text-white font-semibold">Sharmila Banu Mam</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold">
                  2 Green Gem Star Stickers
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold font-mono">
                  2 Stars (★★)
                </span>
              </div>
            </div>

            {/* Quick Preview Thumbnail & CTA to Evidence */}
            <div className="shrink-0 w-full md:w-64 p-4 rounded-2xl bg-black/40 border border-white/10 text-center space-y-3">
              <div className="rounded-xl overflow-hidden h-36 w-full border border-white/10 relative">
                <img
                  src="/evidence/notebook_stars_page1.png"
                  alt="Handwritten Good Job DHARMA on Notebook Page 1"
                  className="w-full h-full object-cover object-[50%_65%]"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="text-[11px] font-bold text-white bg-black/60 px-2 py-1 rounded-lg backdrop-blur-sm">
                    Page 1 Closeup
                  </span>
                </div>
              </div>

              <a
                href="#evidence"
                onClick={onViewEvidence}
                className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-amber-500/20"
              >
                <span>Inspect Original Notebook</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Second Recognition Card: "Good!" on Cartesian Product / Pandas Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel glass-panel-hover p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-500/30 font-semibold">
                  Evaluation Note: "Good!"
                </span>
                <span>16 / 10 / 2026</span>
              </div>

              <h4 className="text-xl font-bold text-white">
                Pandas Cartesian Product & Cross Joins
              </h4>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-slate-200 italic">
                "Handwritten 'Good!' with 2 ★s next to technical notes clarifying Cartesian Product and Cross Join behavior in Pandas merge(). Signed JSh."
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <StarDisplay count={2} size="sm" />
                <span className="text-amber-400 font-bold">2 Stars Awarded</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Source: Notebook Page 2</span>
              <a href="#evidence" className="text-amber-300 hover:underline flex items-center gap-1">
                <span>View Page 2</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Third Recognition Card: Tech Speech Podcast */}
          <div className="glass-panel glass-panel-hover p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30 font-semibold">
                  Technical Presentation
                </span>
                <span>16 / 10 / 2026</span>
              </div>

              <h4 className="text-xl font-bold text-white">
                Tech Speech "Podcast" Participation
              </h4>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-slate-200 italic">
                "Recognized for oral technical presentation: ': Tech Speech \'Podcast\'' communicating Python concepts to peers. Signed JSh."
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <StarDisplay count={1} size="sm" />
                <span className="text-amber-400 font-bold">1 Star Awarded</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Source: Notebook Page 2</span>
              <a href="#evidence" className="text-amber-300 hover:underline flex items-center gap-1">
                <span>View Page 2</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
