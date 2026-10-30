import React from 'react';
import { Heart, MessageSquareQuote, Calendar, Star, Award, PlusCircle } from 'lucide-react';
import StarDisplay from '../common/StarDisplay';
import Badge from '../common/Badge';

export default function FacultySection({
  achievements,
  onAddStar
}) {
  // Only display entries where faculty feedback or appreciation was actually entered
  const feedbackEntries = achievements.filter(
    item => (item.facultyFeedback && item.facultyFeedback.trim().length > 0) ||
            (item.facultyName && item.facultyName.trim().length > 0)
  );

  return (
    <section id="faculty" className="py-16 sm:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold mb-3">
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400/20" />
            <span>Sharmila Banu Mam Feedback & Commendations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Recognition and Appreciation
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Direct words of encouragement, qualitative assessments, and feedback shared by Sharmila Banu Mam for outstanding Python work.
          </p>
        </div>

        {/* Content or Honest Empty State */}
        {feedbackEntries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feedbackEntries.map((entry) => {
              const formattedDate = entry.date
                ? new Date(entry.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })
                : 'Date not specified';

              return (
                <div
                  key={entry.id}
                  className="glass-panel glass-panel-hover p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <StarDisplay count={entry.stars} size="sm" />
                        <span className="text-xs font-mono font-bold text-amber-400">
                          {entry.stars} ⭐
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formattedDate}</span>
                      </div>
                    </div>

                    {/* Feedback Quote */}
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 mb-4 relative">
                      <MessageSquareQuote className="w-6 h-6 text-pink-400/60 mb-2" />
                      <p className="text-sm sm:text-base text-slate-100 italic leading-relaxed">
                        "{entry.facultyFeedback || entry.facultyReason}"
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{entry.facultyName || 'Sharmila Banu Mam'}</span>
                        {entry.isDemo && (
                          <Badge variant="demo" size="xs">
                            Demo
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-amber-300 font-medium">
                        Awarded for: <span className="text-slate-300">{entry.title}</span>
                      </p>
                    </div>
                  </div>

                  {entry.relatedTask && (
                    <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-400 truncate">
                      Task: <span className="text-slate-300">{entry.relatedTask}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Respectful empty state - no fake testimonials */
          <div className="glass-panel rounded-3xl p-10 sm:p-14 border border-white/10 text-center max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mx-auto text-pink-400">
              <MessageSquareQuote className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">
              No Faculty Feedback Logged Yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
              When an instructor shares specific commendation words or evaluation notes, record them in your star achievements to highlight them here.
            </p>
            <div className="pt-2">
              <button
                onClick={onAddStar}
                className="gold-glow-btn px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 uppercase tracking-wider inline-flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4 stroke-[2.5]" />
                <span>Add Achievement with Faculty Note</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
