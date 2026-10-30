import React from 'react';
import { User, Edit3, Target, Sparkles, CheckCircle2, ArrowUpRight, Lightbulb, Compass } from 'lucide-react';

export default function AboutMeSection({
  profile,
  onEditProfile
}) {
  return (
    <section id="about" className="py-16 sm:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
            <User className="w-4 h-4 text-purple-400" />
            <span>Student Profile & Self-Reflection</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About Me & My Learning Mindset
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            A personal summary of my interest in Python programming, learning achievements, recognized strengths, and future aspirations.
          </p>
        </div>

        {/* Profile Card & Bio */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 mb-8 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-500 via-purple-600 to-indigo-600 p-0.5 shadow-xl shadow-purple-500/20 shrink-0 group/avatar relative">
                <div className="w-full h-full bg-[#0d1227] rounded-[22px] flex items-center justify-center text-amber-400 overflow-hidden">
                  <img
                    src={profile.avatarUrl || '/evidence/profile_picture.jpg'}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top group-hover/avatar:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {profile.name}
                  </h3>
                  <button
                    onClick={onEditProfile}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-white/5 transition-colors"
                    title="Edit profile"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-amber-400 font-medium mt-0.5">
                  {profile.course} • {profile.institution}
                </p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {profile.semester} | Academic Year {profile.academicYear}
                </p>
              </div>
            </div>

            <button
              onClick={onEditProfile}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>Edit Statement</span>
            </button>
          </div>

          {/* Interest in Python / Overview */}
          <div className="pt-6 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              My Interest in Python & Semester Journey
            </h4>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {profile.bio || "Passionate student learning Python fundamentals, data structures, and real-world scripting."}
            </p>
          </div>
        </div>

        {/* 3 Reflection Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Strengths */}
          <div className="glass-panel glass-panel-hover p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">
                My Core Strengths
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {profile.strengths || "Logical thinking, clean code organization, persistence in debugging, and quick adaptation to new Python libraries."}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/5 text-[11px] font-mono text-emerald-400">
              Demonstrated in lab assignments
            </div>
          </div>

          {/* Card 2: Areas to Improve */}
          <div className="glass-panel glass-panel-hover p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">
                What I Want to Improve
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {profile.areasToImprove || "Advanced asynchronous programming (asyncio), complex regular expressions, and writing comprehensive unit test suites."}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/5 text-[11px] font-mono text-amber-400">
              Continuous learning focus
            </div>
          </div>

          {/* Card 3: Future Goals */}
          <div className="glass-panel glass-panel-hover p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">
                My Future Goals
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {profile.futureGoals || "Build data-driven web applications with FastAPI, automate daily workflows with Python scripts, and contribute to open-source Python repositories."}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/5 text-[11px] font-mono text-purple-400">
              Semester & career ambitions
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
