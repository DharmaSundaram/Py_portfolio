import React from 'react';
import { User, Edit3, Target, Sparkles, CheckCircle2, ArrowUpRight, Lightbulb, Compass, BookOpen, ExternalLink } from 'lucide-react';

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
            A personal summary of my interest in Advance Python programming, learning achievements, recognized strengths, and future aspirations.
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

            <div className="flex items-center gap-2">
              <a
                href={profile?.githubUrl || "https://github.com/DharmaSundaram"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                title="Dharma's GitHub Profile"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub Profile</span>
              </a>

              <button
                onClick={onEditProfile}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Edit Statement</span>
              </button>
            </div>
          </div>

          {/* Interest in Python / Overview */}
          <div className="pt-6 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              My Interest in Advance Python & Semester Journey
            </h4>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {profile.bio || "Passionate student learning Python fundamentals, data structures, and real-world scripting."}
            </p>
          </div>
        </div>

        {/* Featured Technical Publication: Python in Plain English (Medium) */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-950/25 via-[#0d1227]/90 to-purple-950/25 mb-8 relative overflow-hidden shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Featured Publication on Medium</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/5 text-slate-300 border border-white/10">
                  Python in Plain English
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  ⭐ 4 min read
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Python: The Language That Turns Simple Ideas into Powerful Innovations
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Authored by Dharma on Medium's <em>Python in Plain English</em>. Explores how Python's clean, human-readable syntax eliminates friction—enabling students and developers to transform raw ideas into production systems, automated workflows, and cutting-edge Artificial Intelligence breakthroughs.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/5">💡 Human-Centric Syntax</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/5">⚡ Rapid Prototyping</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/5">🤖 AI & Data Science</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/5">🚀 Democratizing Tech</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <a
                href={profile?.mediumUrl || "https://medium.com/python-in-plain-english/python-the-language-that-turns-simple-ideas-into-powerful-innovations-7ea7788120a4"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 shadow-lg shadow-rose-600/30 hover:scale-[1.02] transition-all"
              >
                <span>Read on Medium</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="text-center lg:text-left text-[11px] text-slate-400 font-mono">
                Companion to Tech Speech & Lab Work
              </div>
            </div>
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
