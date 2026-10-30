import React, { useState, useMemo } from 'react';
import { Award, MessageSquareQuote, BarChart3, Star, Filter, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { CATEGORIES } from '../../utils/constants';
import StarDisplay from '../common/StarDisplay';
import Badge from '../common/Badge';

export default function WhyStarsSection({
  achievements,
  onViewAchievement
}) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Compute category distribution data for Recharts
  const chartData = useMemo(() => {
    const categoryCounts = {};
    const categoryStars = {};

    achievements.forEach(item => {
      const cat = item.category || 'Other';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      categoryStars[cat] = (categoryStars[cat] || 0) + (Number(item.stars) || 1);
    });

    return CATEGORIES.map(cat => ({
      name: cat.name,
      shortName: cat.name.length > 14 ? cat.name.substring(0, 12) + '...' : cat.name,
      count: categoryCounts[cat.id] || 0,
      stars: categoryStars[cat.id] || 0,
      description: cat.description
    })).filter(c => c.count > 0); // Only include categories with actual achievements
  }, [achievements]);

  // Filter achievements for the reason cards list
  const filteredAchievements = useMemo(() => {
    if (selectedCategory === 'ALL') return achievements;
    return achievements.filter(item => item.category === selectedCategory);
  }, [achievements, selectedCategory]);

  const COLORS = ['#F59E0B', '#10B981', '#A855F7', '#3B82F6', '#EC4899', '#F97316', '#8B5CF6', '#06B6D4', '#64748B'];

  return (
    <section id="why-stars" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Core Evaluation & Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why Sharmila Banu Mam Awarded Me These Stars
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Every star is anchored to an official evaluation reason—documenting specific problem-solving techniques, clean architecture, or novel initiative recognized by Sharmila Banu Mam.
          </p>
        </div>

        {/* Visual Summary Chart & Insights */}
        {achievements.length > 0 && chartData.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
            {/* Chart Card */}
            <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-amber-400" />
                    <span>Recognition Distribution by Skill Category</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    {chartData.length} Active Categories
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  Number of achievements and star points awarded across distinct programming competencies.
                </p>
              </div>

              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                    <XAxis
                      dataKey="shortName"
                      stroke="#94a3b8"
                      fontSize={11}
                      tickLine={false}
                      interval={0}
                      angle={-20}
                      textAnchor="end"
                    />
                    <YAxis
                      stroke="#94a3b8"
                      fontSize={11}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="glass-dropdown p-3 rounded-xl border border-white/20 text-xs shadow-2xl">
                              <p className="font-bold text-white mb-1">{data.name}</p>
                              <p className="text-amber-300 font-mono">
                                {data.stars} Total Stars ({data.count} {data.count === 1 ? 'Record' : 'Records'})
                              </p>
                              <p className="text-slate-400 text-[11px] mt-1 max-w-xs">{data.description}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="stars" radius={[8, 8, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Recognized Skills Breakdown */}
            <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Recognized Competency Strengths
                </h3>
                <p className="text-xs text-slate-400 mb-5">
                  Skills that faculty acknowledged most frequently in assignments and lab challenges.
                </p>

                <div className="space-y-3.5">
                  {chartData.map((item, idx) => (
                    <div
                      key={item.name}
                      onClick={() => setSelectedCategory(item.name)}
                      className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 cursor-pointer transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                        />
                        <div>
                          <div className="text-xs sm:text-sm font-semibold text-white">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {item.count} {item.count === 1 ? 'award' : 'awards'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold text-amber-400 font-mono">
                        <span>{item.stars} ⭐</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Categories reflect real faculty criteria assigned to achievements.</span>
              </div>
            </div>
          </div>
        ) : null}

        {/* Category Filter Pills for Reasons */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              Faculty Recognition Quotes & Reasons
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#0e1329] border border-white/15 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
            >
              <option value="ALL">Show All Categories</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Reasons Cards Grid */}
        {filteredAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAchievements.map((item, idx) => (
              <div
                key={item.id}
                className="glass-panel glass-panel-hover p-6 rounded-3xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <StarDisplay count={item.stars} size="sm" />
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {item.stars} ⭐
                      </span>
                    </div>

                    <Badge variant="purple" size="xs">
                      {item.category || 'Other'}
                    </Badge>
                  </div>

                  <h4 className="text-base font-bold text-white mb-3">
                    {item.title}
                  </h4>

                  {/* Official Reason Quote */}
                  <div className="p-4 rounded-2xl bg-amber-500/[0.08] border border-amber-500/25 mb-4">
                    <div className="flex items-start gap-3">
                      <MessageSquareQuote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                          Reason from Sharmila Banu Mam
                        </span>
                        <p className="text-xs sm:text-sm text-slate-100 italic leading-relaxed">
                          "{item.facultyReason}"
                        </p>
                        {item.facultyName && (
                          <span className="text-xs text-amber-300 font-semibold block pt-1">
                            — {item.facultyName || 'Sharmila Banu Mam'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {item.relatedTask && (
                    <p className="text-xs text-slate-400 mb-2">
                      <span className="font-semibold text-slate-300">Task: </span>
                      {item.relatedTask}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-end">
                  <button
                    onClick={() => onViewAchievement(item)}
                    className="text-xs font-semibold text-amber-300 hover:text-amber-200 hover:underline"
                  >
                    View details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-8 border border-white/10 text-center">
            <p className="text-sm text-slate-400">
              No achievements recorded under the selected category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
