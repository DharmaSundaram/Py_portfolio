import React from 'react';
import { Star, Award, CheckCircle2, TrendingUp, Edit3, ArrowDown, Sparkles, BookOpen, User, AlertCircle, Camera, Video, Play } from 'lucide-react';

export default function Hero({
  profile,
  achievements,
  topics,
  onOpenEditProfile,
  onAddStar,
  onExploreClick,
  onViewEvidence,
  onViewVideo
}) {
  // Real calculations directly from stored notebook records
  // Confirmed stars: only count records that are verified
  const confirmedStars = achievements
    .filter(a => a.isVerified !== false)
    .reduce((acc, curr) => acc + (Number(curr.stars) || 0), 0);

  const totalRecords = achievements.length;

  // Star stickers physically visible in photographs (e.g. 3 pink on 19/8 + 2 green on 9/9 = 5 stickers)
  const totalStickers = achievements.reduce((acc, curr) => acc + (Number(curr.stickers) || 0), 0);

  // Records needing verification
  const pendingVerification = achievements.filter(a => a.isVerified === false).length;

  // Topics learned
  const topicsLearnedCount = topics.filter(t => t.status === 'Completed' || t.status === 'Mastered').length;
  const totalTopicsCount = topics.length || 8;

  const stats = [
    {
      id: 'confirmed-stars',
      label: 'Total Confirmed Stars',
      value: `${confirmedStars} ⭐`,
      icon: Star,
      color: 'from-amber-400 to-yellow-500',
      glow: 'shadow-amber-500/20',
      textColor: 'text-amber-400',
      subtext: pendingVerification > 0 ? `${pendingVerification} pending review` : 'All 8 records verified'
    },
    {
      id: 'records',
      label: 'Achievement Records',
      value: totalRecords,
      icon: CheckCircle2,
      color: 'from-blue-400 to-cyan-500',
      glow: 'shadow-blue-500/20',
      textColor: 'text-cyan-400',
      subtext: 'Documented in notebook'
    },
    {
      id: 'stickers',
      label: 'Star Stickers Awarded',
      value: `${totalStickers} ✨`,
      icon: Sparkles,
      color: 'from-purple-400 to-pink-500',
      glow: 'shadow-purple-500/20',
      textColor: 'text-purple-300',
      subtext: '3 Pink + 2 Green physical gem stickers'
    },
    {
      id: 'pending',
      label: 'Pending Verification',
      value: pendingVerification,
      icon: AlertCircle,
      color: pendingVerification > 0 ? 'from-rose-400 to-amber-500' : 'from-emerald-400 to-teal-500',
      glow: pendingVerification > 0 ? 'shadow-rose-500/20' : 'shadow-emerald-500/20',
      textColor: pendingVerification > 0 ? 'text-rose-400' : 'text-emerald-400',
      subtext: pendingVerification > 0 ? 'Requires student review' : '100% Verified records'
    },
    {
      id: 'topics',
      label: 'Python Topics Learned',
      value: `${topicsLearnedCount}/${totalTopicsCount}`,
      icon: BookOpen,
      color: 'from-emerald-400 to-teal-500',
      glow: 'shadow-emerald-500/20',
      textColor: 'text-emerald-400',
      subtext: 'Includes Pandas Cartesian & Podcast'
    }
  ];

  return (
    <section id="home" className="relative pt-6 pb-16 lg:py-20 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-purple-900/25 via-indigo-800/20 to-amber-600/15 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-amber-300 text-xs sm:text-sm font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Python Programming • Verified Notebook Achievement Portfolio</span>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            My Python Journey <span className="inline-block text-amber-400 filter drop-shadow-[0_0_18px_rgba(245,158,11,0.8)]">⭐</span>
          </h1>

          <p className="text-lg sm:text-2xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            "Every star tells a story of learning, effort, creativity, and achievement."
          </p>

          {/* Commendation Highlight Pill */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm font-semibold text-amber-200">
              <span className="text-amber-400 font-bold">Sharmila Banu Mam:</span>
              <span className="italic">“Good Job DHARMA!”</span>
              <span className="text-[11px] text-slate-400 font-mono">(Signed JSh, 09/09/2026)</span>
            </div>
          </div>
        </div>

        {/* Profile Card (Glassmorphism & Editable Details) */}
        <div className="mt-10 max-w-3xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-500 p-0.5 shadow-lg shadow-purple-500/30 shrink-0 group/avatar relative">
                <div className="w-full h-full bg-[#0d1227] rounded-[14px] flex items-center justify-center text-amber-400 overflow-hidden">
                  <img
                    src={profile.avatarUrl || '/evidence/profile_picture.jpg'}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top group-hover/avatar:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {profile.name}
                  </h2>
                  <button
                    onClick={onOpenEditProfile}
                    className="p-1 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-white/5 transition-colors"
                    title="Edit profile details"
                    aria-label="Edit Profile"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-amber-400/90 font-medium mt-0.5">
                  Course: {profile.course}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="#evidence"
                onClick={onViewEvidence}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>View Notebook Photos</span>
              </a>

              <button
                onClick={onOpenEditProfile}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Edit</span>
              </button>
            </div>
          </div>

          {/* Grid of Profile Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-sm">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="block text-xs text-slate-400 uppercase font-mono tracking-wider">Institution</span>
              <span className="font-semibold text-slate-200 mt-0.5 block truncate" title={profile.institution}>
                {profile.institution}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="block text-xs text-slate-400 uppercase font-mono tracking-wider">Semester</span>
              <span className="font-semibold text-slate-200 mt-0.5 block">
                {profile.semester}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="block text-xs text-slate-400 uppercase font-mono tracking-wider">Academic Year</span>
              <span className="font-semibold text-slate-200 mt-0.5 block">
                {profile.academicYear}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="gold-glow-btn px-8 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-slate-950 uppercase tracking-wider flex items-center gap-2.5 shadow-xl"
          >
            <span>Explore My Achievements</span>
            <ArrowDown className="w-4 h-4 stroke-[3]" />
          </button>

          <a
            href="#project-demo"
            onClick={onViewVideo}
            className="px-6 py-3.5 rounded-2xl text-sm sm:text-base font-semibold text-amber-300 hover:text-white glass-panel hover:bg-white/10 border border-amber-500/30 transition-all flex items-center gap-2"
          >
            <Video className="w-4 h-4 text-amber-400" />
            <span>Watch Project Demo</span>
          </a>

          <a
            href="#evidence"
            onClick={onViewEvidence}
            className="px-6 py-3.5 rounded-2xl text-sm sm:text-base font-semibold text-slate-200 hover:text-white glass-panel hover:bg-white/10 border border-white/10 transition-all flex items-center gap-2"
          >
            <Camera className="w-4 h-4 text-amber-400" />
            <span>Course Photos (4 Events)</span>
          </a>

          <button
            onClick={onAddStar}
            className="px-6 py-3.5 rounded-2xl text-sm sm:text-base font-semibold text-slate-200 hover:text-white glass-panel hover:bg-white/10 border border-white/10 transition-all flex items-center gap-2"
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Add / Edit Record</span>
          </button>
        </div>

        {/* 5 Dynamic Dashboard Statistics Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="glass-panel glass-panel-hover p-5 sm:p-6 rounded-3xl relative overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      {stat.label}
                    </span>
                    <div className={`p-1.5 rounded-xl bg-gradient-to-br ${stat.color} text-slate-950 font-bold shadow-md`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className={`text-2xl sm:text-3xl font-extrabold ${stat.textColor} tracking-tight font-heading`}>
                    {stat.value}
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                  {stat.subtext}
                </p>

                {/* Subtle bottom gradient line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
