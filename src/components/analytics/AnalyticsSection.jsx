import React, { useMemo } from 'react';
import { BarChart3, TrendingUp, PieChart as PieIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { CATEGORIES } from '../../utils/constants';

export default function AnalyticsSection({
  achievements,
  topics
}) {
  const totalStars = achievements.reduce((acc, curr) => acc + (Number(curr.stars) || 0), 0);
  const totalAchievements = achievements.length;

  // 1. Stars Accumulated Over Time (Cumulative growth)
  const cumulativeData = useMemo(() => {
    if (achievements.length === 0) return [];

    // Filter valid dates and sort oldest to newest
    const dated = achievements
      .filter(a => a.date)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    let runningTotal = 0;
    return dated.map(item => {
      runningTotal += Number(item.stars) || 0;
      return {
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: item.date,
        title: item.title,
        starsEarned: Number(item.stars) || 0,
        cumulativeStars: runningTotal
      };
    });
  }, [achievements]);

  // 2. Category Breakdown for Donut Chart
  const categoryData = useMemo(() => {
    const counts = {};
    achievements.forEach(item => {
      const cat = item.category || 'Other';
      counts[cat] = (counts[cat] || 0) + 1;
    });

    return Object.keys(counts).map(catName => ({
      name: catName,
      value: counts[catName]
    }));
  }, [achievements]);

  // 3. Star Count Frequency (1 star vs 2 stars vs 3+ stars)
  const starDistribution = useMemo(() => {
    const dist = { '1 Star': 0, '2 Stars': 0, '3 Stars': 0, '4+ Stars': 0 };
    achievements.forEach(item => {
      const s = Number(item.stars) || 1;
      if (s === 1) dist['1 Star']++;
      else if (s === 2) dist['2 Stars']++;
      else if (s === 3) dist['3 Stars']++;
      else dist['4+ Stars']++;
    });

    return Object.keys(dist).map(key => ({
      starRating: key,
      count: dist[key]
    }));
  }, [achievements]);

  // 4. Topic Status Breakdown
  const topicStats = useMemo(() => {
    const statuses = { Mastered: 0, Completed: 0, 'In Progress': 0, 'Not Started': 0 };
    topics.forEach(t => {
      if (statuses[t.status] !== undefined) {
        statuses[t.status]++;
      } else {
        statuses['Not Started']++;
      }
    });

    return [
      { name: 'Mastered', count: statuses.Mastered, color: '#F59E0B' },
      { name: 'Completed', count: statuses.Completed, color: '#10B981' },
      { name: 'In Progress', count: statuses['In Progress'], color: '#3B82F6' },
      { name: 'Not Started', count: statuses['Not Started'], color: '#64748B' }
    ];
  }, [topics]);

  const PIE_COLORS = ['#F59E0B', '#10B981', '#A855F7', '#3B82F6', '#EC4899', '#F97316', '#8B5CF6', '#06B6D4'];

  return (
    <section id="analytics" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Quantitative Analytics & Trends</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Achievement Analytics
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Data-backed visualization of your star awards trajectory, category distribution, and syllabus progress.
          </p>
        </div>

        {achievements.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart 1: Cumulative Star Trajectory */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-amber-400" />
                    <span>Cumulative Star Progression</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {totalStars} ⭐ Total
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  Cumulative stars earned across the semester timeline.
                </p>
              </div>

              <div className="h-64 sm:h-72 w-full">
                {cumulativeData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cumulativeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="starGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const d = payload[0].payload;
                            return (
                              <div className="glass-dropdown p-3 rounded-xl border border-white/20 text-xs shadow-2xl">
                                <p className="font-bold text-white">{d.title}</p>
                                <p className="text-slate-400 font-mono">{d.fullDate}</p>
                                <p className="text-amber-300 font-semibold mt-1">
                                  +{d.starsEarned} Star{d.starsEarned > 1 ? 's' : ''} Awarded
                                </p>
                                <p className="text-emerald-400 font-bold font-mono">
                                  Running Total: {d.cumulativeStars} ⭐
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="cumulativeStars"
                        stroke="#F59E0B"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#starGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-slate-400">
                    No dated achievements available to chart time progression.
                  </div>
                )}
              </div>
            </div>

            {/* Chart 2: Category Distribution Donut */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <PieIcon className="w-5 h-5 text-purple-400" />
                    <span>Distribution by Recognition Category</span>
                  </h3>
                  <span className="text-xs font-mono text-purple-400">
                    {categoryData.length} Categories
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  Proportion of achievements awarded across each skill domain.
                </p>
              </div>

              <div className="h-64 sm:h-72 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          const pct = Math.round((data.value / totalAchievements) * 100);
                          return (
                            <div className="glass-dropdown p-2.5 rounded-xl border border-white/20 text-xs shadow-2xl">
                              <p className="font-bold text-white">{data.name}</p>
                              <p className="text-amber-300 font-mono">
                                {data.value} {data.value === 1 ? 'Record' : 'Records'} ({pct}%)
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: '11px', color: '#cbd5e1' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 3: Star Ratings Breakdown */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-cyan-400" />
                    <span>Star Award Magnitude Frequency</span>
                  </h3>
                  <span className="text-xs font-mono text-cyan-400">
                    {totalAchievements} Records
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  Count of awards by number of stars earned per task.
                </p>
              </div>

              <div className="h-60 sm:h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={starDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="starRating" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="glass-dropdown p-2.5 rounded-xl border border-white/20 text-xs shadow-2xl">
                              <p className="font-bold text-white">{data.starRating}</p>
                              <p className="text-amber-300 font-mono">{data.count} Achievements</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="count" fill="#38BDF8" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 4: Python Syllabus Topic Mastery */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Python Syllabus Mastery Breakdown</span>
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">
                    {topics.length} Concepts
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  Current mastery distribution across core semester curriculum topics.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {topicStats.map(stat => {
                  const pct = Math.round((stat.count / (topics.length || 1)) * 100);
                  return (
                    <div key={stat.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">{stat.name}</span>
                        <span className="font-mono text-slate-400">
                          {stat.count} topics ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          style={{ width: `${pct}%`, backgroundColor: stat.color }}
                          className="h-full rounded-full transition-all duration-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between">
                <span>Update status anytime in the Python Skills section.</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-12 border border-white/10 text-center max-w-lg mx-auto space-y-3">
            <BarChart3 className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-xl font-bold text-white">Awaiting Achievement Data</h3>
            <p className="text-xs text-slate-400">
              Charts and quantitative breakdowns will automatically calculate and render as you log stars and completed Python tasks.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
