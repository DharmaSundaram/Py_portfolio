import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, Star, PlusCircle, Sparkles, FolderX, CheckCircle2, AlertCircle, Camera } from 'lucide-react';
import AchievementCard from './AchievementCard';
import { CATEGORIES } from '../../utils/constants';

export default function AchievementGallery({
  achievements,
  onAddStar,
  onViewAchievement,
  onEditAchievement,
  onDeleteAchievement,
  onToggleVerify,
  onViewEvidence
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStars, setSelectedStars] = useState('ALL');
  const [verificationFilter, setVerificationFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest');

  // Filtered and sorted achievements
  const filteredAchievements = useMemo(() => {
    return achievements.filter(item => {
      // Search term matching
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        item.title?.toLowerCase().includes(query) ||
        item.facultyReason?.toLowerCase().includes(query) ||
        item.relatedTask?.toLowerCase().includes(query) ||
        item.skillsDemonstrated?.toLowerCase().includes(query) ||
        item.facultyFeedback?.toLowerCase().includes(query) ||
        (Array.isArray(item.pythonConcepts) && item.pythonConcepts.some(c => c.toLowerCase().includes(query)));

      // Category matching
      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;

      // Stars matching
      const matchesStars =
        selectedStars === 'ALL' ||
        (selectedStars === '1' && item.stars === 1) ||
        (selectedStars === '2' && item.stars === 2) ||
        (selectedStars === '3+' && item.stars >= 3);

      // Verification matching
      const isVerified = item.isVerified !== false;
      const matchesVerification =
        verificationFilter === 'ALL' ||
        (verificationFilter === 'VERIFIED' && isVerified) ||
        (verificationFilter === 'UNVERIFIED' && !isVerified);

      return matchesSearch && matchesCategory && matchesStars && matchesVerification;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date || 0) - new Date(a.date || 0);
      }
      if (sortBy === 'oldest') {
        return new Date(a.date || 0) - new Date(b.date || 0);
      }
      if (sortBy === 'most-stars') {
        return b.stars - a.stars;
      }
      if (sortBy === 'least-stars') {
        return a.stars - b.stars;
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [achievements, searchTerm, selectedCategory, selectedStars, verificationFilter, sortBy]);

  // Overall counts vs Filtered counts
  const confirmedStarCount = achievements
    .filter(a => a.isVerified !== false)
    .reduce((acc, curr) => acc + (Number(curr.stars) || 0), 0);

  const totalRecordCount = achievements.length;
  const pendingCount = achievements.filter(a => a.isVerified === false).length;
  const totalStickersCount = achievements.reduce((acc, curr) => acc + (Number(curr.stickers) || 0), 0);

  return (
    <section id="achievements" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Notebook Verified Achievements</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              My Star Achievements
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Authentic record of stars awarded by Sharmila Banu Mam (signed <span className="font-mono text-amber-300">JSh</span>), physical star stickers, and verified Python tasks.
            </p>
          </div>

          {/* Counts Distinction: Records vs Confirmed Stars vs Stickers */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl glass-panel border border-white/10 text-center">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Records
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                {totalRecordCount}
              </div>
            </div>

            <div className="px-5 py-2.5 rounded-2xl glass-panel border border-amber-500/30 text-center bg-amber-500/[0.05]">
              <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Confirmed Stars
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-mono flex items-center justify-center gap-1">
                <span>{confirmedStarCount}</span>
                <span className="text-sm">⭐</span>
              </div>
            </div>

            <div className="px-4 py-2.5 rounded-2xl glass-panel border border-purple-500/30 text-center bg-purple-500/[0.05]">
              <div className="text-[11px] font-mono uppercase tracking-wider text-purple-300 font-semibold">
                Gem Stickers
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-purple-300 font-mono">
                {totalStickersCount} ✨
              </div>
            </div>

            <button
              onClick={onAddStar}
              className="gold-glow-btn inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold text-slate-950 uppercase tracking-wider shadow-lg"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Add / Edit Record</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar Controls */}
        <div className="glass-panel p-4 sm:p-5 rounded-3xl border border-white/10 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search title, Sharmila Banu Mam note, task..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              />
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0e1329] border border-white/15 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
              >
                <option value="ALL">All Categories ({achievements.length})</option>
                {CATEGORIES.map(c => {
                  const count = achievements.filter(a => a.category === c.id).length;
                  return (
                    <option key={c.id} value={c.id}>
                      {c.name} ({count})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Verification Status Filter */}
            <div className="md:col-span-2">
              <select
                value={verificationFilter}
                onChange={e => setVerificationFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0e1329] border border-white/15 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              >
                <option value="ALL">All Statuses</option>
                <option value="VERIFIED">Verified Only</option>
                <option value="UNVERIFIED">Needs Verification</option>
              </select>
            </div>

            {/* Sorting */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0e1329] border border-white/15 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="most-stars">Sort: Highest Stars</option>
                <option value="least-stars">Sort: Lowest Stars</option>
                <option value="title">Sort: Title (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Banner when filters applied */}
        {(searchTerm || selectedCategory !== 'ALL' || selectedStars !== 'ALL' || verificationFilter !== 'ALL') && (
          <div className="flex items-center justify-between text-xs text-slate-400 mb-6 px-1">
            <span>
              Showing {filteredAchievements.length} record{filteredAchievements.length === 1 ? '' : 's'}
            </span>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('ALL');
                setSelectedStars('ALL');
                setVerificationFilter('ALL');
              }}
              className="text-amber-400 hover:underline font-medium"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Achievement Grid */}
        {filteredAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((item, index) => (
              <AchievementCard
                key={item.id}
                achievement={item}
                index={index}
                onView={onViewAchievement}
                onEdit={onEditAchievement}
                onDelete={onDeleteAchievement}
                onToggleVerify={onToggleVerify}
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-10 border border-white/10 text-center max-w-lg mx-auto space-y-3">
            <FolderX className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Matching Achievements</h3>
            <p className="text-xs text-slate-400">
              No records match your selected filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('ALL');
                setSelectedStars('ALL');
                setVerificationFilter('ALL');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
