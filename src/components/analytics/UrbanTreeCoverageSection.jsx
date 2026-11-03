import React, { useState, useMemo } from 'react';
import { 
  TreePine, 
  Trees, 
  BarChart3, 
  Table, 
  Calculator, 
  Search, 
  ArrowUpDown, 
  ExternalLink, 
  Code2, 
  Copy, 
  Check, 
  Sparkles, 
  Globe, 
  CheckCircle2, 
  Percent,
  TrendingUp,
  Layers
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

export default function UrbanTreeCoverageSection() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'pivot', 'stats'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');
  const [sortField, setSortField] = useState('rank'); // 'rank', 'gvi', 'city'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  const [copiedCode, setCopiedCode] = useState(false);

  // Full 34 global cities dataset from Visual Capitalist / MIT Treepedia
  const rawCityData = [
    { rank: 1, city: 'Tampa', country: 'United States', continent: 'North America', gvi: 36.1, flag: '🇺🇸' },
    { rank: 2, city: 'Breda', country: 'Netherlands', continent: 'Europe', gvi: 29.3, flag: '🇳🇱' },
    { rank: 3, city: 'Singapore', country: 'Singapore', continent: 'Asia', gvi: 29.3, flag: '🇸🇬' },
    { rank: 4, city: 'Oslo', country: 'Norway', continent: 'Europe', gvi: 28.8, flag: '🇳🇴' },
    { rank: 5, city: 'Sydney', country: 'Australia', continent: 'Oceania', gvi: 25.9, flag: '🇦🇺' },
    { rank: 6, city: 'Vancouver', country: 'Canada', continent: 'North America', gvi: 25.9, flag: '🇨🇦' },
    { rank: 7, city: 'Montreal', country: 'Canada', continent: 'North America', gvi: 25.5, flag: '🇨🇦' },
    { rank: 8, city: 'Cambridge', country: 'United States', continent: 'North America', gvi: 25.3, flag: '🇺🇸' },
    { rank: 9, city: 'Xalapa', country: 'Mexico', continent: 'North America', gvi: 24.0, flag: '🇲🇽' },
    { rank: 10, city: 'Durban', country: 'South Africa', continent: 'Africa', gvi: 23.7, flag: '🇿🇦' },
    { rank: 11, city: 'Johannesburg', country: 'South Africa', continent: 'Africa', gvi: 23.6, flag: '🇿🇦' },
    { rank: 12, city: 'Sacramento', country: 'United States', continent: 'North America', gvi: 23.6, flag: '🇺🇸' },
    { rank: 13, city: 'Frankfurt', country: 'Germany', continent: 'Europe', gvi: 21.5, flag: '🇩🇪' },
    { rank: 14, city: 'Geneva', country: 'Switzerland', continent: 'Europe', gvi: 21.4, flag: '🇨🇭' },
    { rank: 15, city: 'Veracruz', country: 'Mexico', continent: 'North America', gvi: 21.4, flag: '🇲🇽' },
    { rank: 16, city: 'Amsterdam', country: 'Netherlands', continent: 'Europe', gvi: 20.6, flag: '🇳🇱' },
    { rank: 17, city: 'Seattle', country: 'United States', continent: 'North America', gvi: 20.0, flag: '🇺🇸' },
    { rank: 18, city: 'Toronto', country: 'Canada', continent: 'North America', gvi: 19.5, flag: '🇨🇦' },
    { rank: 19, city: 'Miami', country: 'United States', continent: 'North America', gvi: 19.4, flag: '🇺🇸' },
    { rank: 20, city: 'Boston', country: 'United States', continent: 'North America', gvi: 18.2, flag: '🇺🇸' },
    { rank: 21, city: 'Tel Aviv', country: 'Israel', continent: 'Asia', gvi: 17.5, flag: '🇮🇱' },
    { rank: 22, city: 'Guadalajara', country: 'Mexico', continent: 'North America', gvi: 17.3, flag: '🇲🇽' },
    { rank: 23, city: 'León', country: 'Mexico', continent: 'North America', gvi: 16.5, flag: '🇲🇽' },
    { rank: 24, city: 'Turin', country: 'Italy', continent: 'Europe', gvi: 16.2, flag: '🇮🇹' },
    { rank: 25, city: 'Los Angeles', country: 'United States', continent: 'North America', gvi: 15.2, flag: '🇺🇸' },
    { rank: 26, city: 'Buenos Aires', country: 'Argentina', continent: 'South America', gvi: 14.5, flag: '🇦🇷' },
    { rank: 27, city: 'Franca', country: 'Brazil', continent: 'South America', gvi: 13.7, flag: '🇧🇷' },
    { rank: 28, city: 'New York', country: 'United States', continent: 'North America', gvi: 13.5, flag: '🇺🇸' },
    { rank: 29, city: 'Cape Town', country: 'South Africa', continent: 'Africa', gvi: 13.4, flag: '🇿🇦' },
    { rank: 30, city: 'London', country: 'United Kingdom', continent: 'Europe', gvi: 12.7, flag: '🇬🇧' },
    { rank: 31, city: 'São Paulo', country: 'Brazil', continent: 'South America', gvi: 11.7, flag: '🇧🇷' },
    { rank: 32, city: 'Quito', country: 'Ecuador', continent: 'South America', gvi: 10.8, flag: '🇪🇨' },
    { rank: 33, city: 'Kobe', country: 'Japan', continent: 'Asia', gvi: 9.4, flag: '🇯🇵' },
    { rank: 34, city: 'Paris', country: 'France', continent: 'Europe', gvi: 8.8, flag: '🇫🇷' }
  ];

  const continents = ['All', 'North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'];

  // 1. Ranked City Overview Filtering & Sorting
  const filteredAndSortedCities = useMemo(() => {
    let result = rawCityData.filter(item => {
      const matchesSearch = 
        item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesContinent = 
        selectedContinent === 'All' || item.continent === selectedContinent;
      return matchesSearch && matchesContinent;
    });

    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

    return result;
  }, [searchQuery, selectedContinent, sortField, sortOrder]);

  // 2. Continental Pivot Aggregation
  const continentalPivot = useMemo(() => {
    const groups = {};
    rawCityData.forEach(item => {
      if (!groups[item.continent]) {
        groups[item.continent] = [];
      }
      groups[item.continent].push(item);
    });

    return Object.keys(groups).map(cont => {
      const list = groups[cont];
      const gvis = list.map(x => x.gvi);
      const count = list.length;
      const sum = gvis.reduce((acc, v) => acc + v, 0);
      const mean = sum / count;
      
      const sorted = [...gvis].sort((a, b) => a - b);
      const median = count % 2 === 0
        ? (sorted[count / 2 - 1] + sorted[count / 2]) / 2
        : sorted[Math.floor(count / 2)];
      
      const variance = count > 1 
        ? gvis.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (count - 1)
        : 0;
      const stdDev = Math.sqrt(variance);

      const maxGvi = Math.max(...gvis);
      const minGvi = Math.min(...gvis);
      const topCity = list.find(x => x.gvi === maxGvi);
      const lowestCity = list.find(x => x.gvi === minGvi);

      return {
        continent: cont,
        count,
        mean: Number(mean.toFixed(2)),
        median: Number(median.toFixed(2)),
        stdDev: Number(stdDev.toFixed(2)),
        min: minGvi,
        max: maxGvi,
        topCity: `${topCity.city} (${topCity.gvi}%)`,
        lowestCity: `${lowestCity.city} (${lowestCity.gvi}%)`
      };
    }).sort((a, b) => b.mean - a.mean);
  }, []);

  // 3. Overall Descriptive Statistical Parameters
  const statistics = useMemo(() => {
    const gvis = rawCityData.map(c => c.gvi).sort((a, b) => a - b);
    const n = gvis.length;
    const sum = gvis.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    
    // Median
    const median = (gvis[n / 2 - 1] + gvis[n / 2]) / 2;

    // Standard deviation
    const variance = gvis.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (n - 1);
    const stdDev = Math.sqrt(variance);

    // Quartiles
    const q1 = 14.68; // (25th percentile)
    const q3 = 23.93; // (75th percentile)
    const iqr = q3 - q1;

    // Distribution Brackets
    const brackets = [
      { range: '≥ 30% GVI', label: 'Exceptional Canopy', count: gvis.filter(v => v >= 30).length, color: '#10B981' },
      { range: '25% - 29.9%', label: 'High Canopy', count: gvis.filter(v => v >= 25 && v < 30).length, color: '#059669' },
      { range: '20% - 24.9%', label: 'Above Average', count: gvis.filter(v => v >= 20 && v < 25).length, color: '#3B82F6' },
      { range: '15% - 19.9%', label: 'Moderate Canopy', count: gvis.filter(v => v >= 15 && v < 20).length, color: '#F59E0B' },
      { range: '< 15% GVI', label: 'Dense / Low Canopy', count: gvis.filter(v => v < 15).length, color: '#EF4444' }
    ];

    return {
      count: n,
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      stdDev: stdDev.toFixed(2),
      min: gvis[0].toFixed(1),
      max: gvis[n - 1].toFixed(1),
      q1: q1.toFixed(2),
      q3: q3.toFixed(2),
      iqr: iqr.toFixed(2),
      minCity: 'Paris, France (8.8%)',
      maxCity: 'Tampa, USA (36.1%)',
      brackets
    };
  }, []);

  const pythonScript = `# Python Pandas: Ranked City Overview, Continental Pivot & Descriptive Stats
# Source: Visual Capitalist / MIT Treepedia Urban Canopy Study
import pandas as pd
import numpy as np

# 1. Dataset Construction
data = [
    {"rank": 1, "city": "Tampa", "country": "United States", "continent": "North America", "gvi": 36.1},
    {"rank": 2, "city": "Breda", "country": "Netherlands", "continent": "Europe", "gvi": 29.3},
    {"rank": 3, "city": "Singapore", "country": "Singapore", "continent": "Asia", "gvi": 29.3},
    {"rank": 4, "city": "Oslo", "country": "Norway", "continent": "Europe", "gvi": 28.8},
    {"rank": 5, "city": "Sydney", "country": "Australia", "continent": "Oceania", "gvi": 25.9},
    # ... (34 global cities)
]
df = pd.DataFrame(data)

# 2. Ranked City Overview
ranked_overview = df.sort_values(by="gvi", ascending=False)[["rank", "city", "country", "gvi"]]
print("Top 5 Cities by Green View Index (%):\\n", ranked_overview.head())

# 3. Continental Pivot Summary
continental_pivot = pd.pivot_table(
    df,
    index="continent",
    values="gvi",
    aggfunc=["count", "mean", "median", "std", "min", "max"]
).round(2)
print("\\nContinental Pivot Table:\\n", continental_pivot)

# 4. Statistical Analysis & Distribution
stats_summary = df["gvi"].describe().round(2)
q1 = df["gvi"].quantile(0.25)
q3 = df["gvi"].quantile(0.75)
iqr = q3 - q1
print("\\nDescriptive Statistics:\\n", stats_summary)
print(f"IQR: {iqr:.2f}% | Skewness: {df['gvi'].skew():.2f}")`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonScript);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getCanopyBadge = (gvi) => {
    if (gvi >= 30) return { label: 'Exceptional (≥30%)', bg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' };
    if (gvi >= 25) return { label: 'High (25-30%)', bg: 'bg-teal-500/15 text-teal-300 border-teal-500/30' };
    if (gvi >= 20) return { label: 'Above Avg (20-25%)', bg: 'bg-blue-500/15 text-blue-300 border-blue-500/30' };
    if (gvi >= 15) return { label: 'Moderate (15-20%)', bg: 'bg-amber-500/15 text-amber-300 border-amber-500/30' };
    return { label: 'Developing (<15%)', bg: 'bg-rose-500/15 text-rose-300 border-rose-500/30' };
  };

  return (
    <section id="tree-coverage" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-amber-500/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3">
            <TreePine className="w-4 h-4 text-emerald-400" />
            <span>Python Exploratory Data Analysis & Analytics Study</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Ranked: The World’s Cities with the Most Tree Coverage
          </h2>

          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed max-w-3xl mx-auto">
            Interactive analytical study analyzing street-level canopy coverage across 34 global metropolitan centers measured via the <span className="text-emerald-300 font-semibold">Green View Index (GVI)</span>. Features ranked city filtering, continental pivot aggregation, and parametric statistical modeling in Python.
          </p>

          {/* External Citation Badge */}
          <div className="mt-4 flex items-center justify-center">
            <a
              href="https://www.visualcapitalist.com/ranked-the-worlds-cities-with-the-most-tree-coverage/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-colors"
            >
              <span>Source Dataset: Visual Capitalist & MIT Senseable City Lab</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* 3 Main Operation Tabs */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Table className="w-4 h-4" />
              <span>1. Ranked City Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('pivot')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'pivot'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>2. Continental Pivot Summary</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'stats'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>3. Statistical Analysis</span>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: RANKED CITY OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Top Stat Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Top Greenest City</span>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">
                  🇺🇸 Tampa (36.1%)
                </div>
                <p className="text-xs text-slate-400">#1 global rank with extensive subtropical oak canopy</p>
              </div>

              <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Joint Runners-Up</span>
                <div className="text-xl sm:text-2xl font-extrabold text-teal-300 font-mono">
                  🇳🇱 Breda & 🇸🇬 Singapore (29.3%)
                </div>
                <p className="text-xs text-slate-400">Leading Europe and Asia in street-level greenery</p>
              </div>

              <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Global Mean GVI</span>
                <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-mono">
                  19.83% GVI
                </div>
                <p className="text-xs text-slate-400">Cross-continental average across 34 cities</p>
              </div>

              <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Sample Coverage</span>
                <div className="text-xl sm:text-2xl font-extrabold text-purple-300 font-mono">
                  34 Metropolises
                </div>
                <p className="text-xs text-slate-400">Spanning 6 continents and 18 nations</p>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="glass-panel p-5 rounded-3xl border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by city or country (e.g., Singapore, Canada, Oslo)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Continent Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                {continents.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedContinent(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedContinent === c
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Sort Order Toggle */}
              <div className="flex items-center gap-2">
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-200 focus:outline-none"
                >
                  <option value="rank" className="bg-slate-900">Sort by Rank</option>
                  <option value="gvi" className="bg-slate-900">Sort by GVI %</option>
                  <option value="city" className="bg-slate-900">Sort by City Name</option>
                </select>

                <button
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300"
                  title="Toggle sort direction"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table Card */}
            <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto max-h-[560px]">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-[#0c1124] border-b border-white/10 text-[11px] font-mono uppercase tracking-wider text-slate-400 z-10">
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">Rank</th>
                      <th className="py-3.5 px-4 sm:px-6">City & Country</th>
                      <th className="py-3.5 px-4 sm:px-6">Continent</th>
                      <th className="py-3.5 px-4 sm:px-6">Green View Index (GVI %)</th>
                      <th className="py-3.5 px-4 sm:px-6">Canopy Tier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs sm:text-sm font-sans">
                    {filteredAndSortedCities.map((item) => {
                      const tier = getCanopyBadge(item.gvi);
                      const barWidth = `${(item.gvi / 40) * 100}%`;
                      return (
                        <tr key={item.rank} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-slate-300">
                            #{item.rank}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6">
                            <div className="flex items-center gap-2.5">
                              <span className="text-lg">{item.flag}</span>
                              <div>
                                <span className="font-bold text-white group-hover:text-emerald-300 transition-colors block">
                                  {item.city}
                                </span>
                                <span className="text-[11px] text-slate-400 font-mono">
                                  {item.country}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 font-mono text-xs text-slate-400">
                            {item.continent}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6">
                            <div className="space-y-1">
                              <span className="font-mono font-bold text-white block">
                                {item.gvi.toFixed(1)}%
                              </span>
                              <div className="w-36 h-2 rounded-full bg-white/10 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                                  style={{ width: barWidth }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 sm:px-6">
                            <span className={`inline-block text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${tier.bg}`}>
                              {tier.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: CONTINENTAL PIVOT SUMMARY ================= */}
        {activeTab === 'pivot' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Recharts Bar Chart: Mean GVI vs. Median GVI by Continent */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      <BarChart3 className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Continental Mean Canopy Comparison (Recharts)
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        Visualizing Average Green View Index across Continents
                      </p>
                    </div>
                  </div>
                </div>

                <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Aggregated from 34 Cities
                </span>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={continentalPivot} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
                    <XAxis dataKey="continent" stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} unit="%" />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="glass-panel p-3.5 rounded-xl border border-white/20 text-xs space-y-1 shadow-2xl bg-[#0b0f1e]/95">
                              <p className="font-bold text-white">{data.continent}</p>
                              <p className="text-emerald-400 font-mono">Mean GVI: {data.mean}%</p>
                              <p className="text-amber-400 font-mono">Median GVI: {data.median}%</p>
                              <p className="text-slate-300">Cities Sampled: {data.count}</p>
                              <p className="text-slate-400 text-[11px]">Top: {data.topCity}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="mean" radius={[8, 8, 0, 0]}>
                      {continentalPivot.map((entry, index) => {
                        const colors = ['#10B981', '#059669', '#3B82F6', '#8B5CF6', '#F59E0B', '#EC4899'];
                        return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pivot Table (Styled as Python pd.pivot_table output) */}
            <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="p-4 sm:p-5 bg-white/[0.02] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-300">
                    pd.pivot_table(df, index='continent', values='gvi')
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Aggregated Groupby View
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#0c1124] text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-white/10">
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">Continent</th>
                      <th className="py-3.5 px-4">Cities</th>
                      <th className="py-3.5 px-4">Mean GVI</th>
                      <th className="py-3.5 px-4">Median GVI</th>
                      <th className="py-3.5 px-4">Std Dev (σ)</th>
                      <th className="py-3.5 px-4">Min GVI</th>
                      <th className="py-3.5 px-4">Max GVI</th>
                      <th className="py-3.5 px-4 sm:px-6">Highest Ranked City</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs sm:text-sm font-sans">
                    {continentalPivot.map((row) => (
                      <tr key={row.continent} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-white flex items-center gap-2">
                          <Globe className="w-4 h-4 text-emerald-400" />
                          <span>{row.continent}</span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-300">{row.count}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{row.mean}%</td>
                        <td className="py-3.5 px-4 font-mono text-amber-400">{row.median}%</td>
                        <td className="py-3.5 px-4 font-mono text-slate-400">{row.stdDev ? `±${row.stdDev}%` : 'N/A (N=1)'}</td>
                        <td className="py-3.5 px-4 font-mono text-rose-400">{row.min}%</td>
                        <td className="py-3.5 px-4 font-mono text-teal-300">{row.max}%</td>
                        <td className="py-3.5 px-4 sm:px-6 font-mono text-xs text-slate-300">{row.topCity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: STATISTICAL ANALYSIS ================= */}
        {activeTab === 'stats' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* 5-Number Summary & Parametric Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Count (N)</span>
                <span className="text-xl font-bold font-mono text-white mt-1 block">{statistics.count}</span>
                <span className="text-[10px] text-slate-500 font-mono">Cities</span>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] font-mono uppercase text-emerald-400 block font-bold">Mean (μ)</span>
                <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block">{statistics.mean}%</span>
                <span className="text-[10px] text-slate-500 font-mono">Average</span>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] font-mono uppercase text-amber-400 block font-bold">Median (Q2)</span>
                <span className="text-xl font-bold font-mono text-amber-400 mt-1 block">{statistics.median}%</span>
                <span className="text-[10px] text-slate-500 font-mono">50th Percentile</span>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] font-mono uppercase text-cyan-400 block font-bold">Std Dev (σ)</span>
                <span className="text-xl font-bold font-mono text-cyan-400 mt-1 block">±{statistics.stdDev}%</span>
                <span className="text-[10px] text-slate-500 font-mono">Dispersion</span>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] font-mono uppercase text-purple-400 block font-bold">IQR (Q3 - Q1)</span>
                <span className="text-xl font-bold font-mono text-purple-400 mt-1 block">{statistics.iqr}%</span>
                <span className="text-[10px] text-slate-500 font-mono">Interquartile</span>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] font-mono uppercase text-rose-400 block font-bold">Range</span>
                <span className="text-xl font-bold font-mono text-rose-400 mt-1 block">27.3%</span>
                <span className="text-[10px] text-slate-500 font-mono">{statistics.min}% to {statistics.max}%</span>
              </div>
            </div>

            {/* Distribution Brackets Breakdown */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span>Canopy Coverage Frequency Distribution</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Histogram-style categorization dividing 34 global cities into distinct environmental canopy brackets.
              </p>

              <div className="space-y-4">
                {statistics.brackets.map((b) => {
                  const pct = ((b.count / statistics.count) * 100).toFixed(1);
                  return (
                    <div key={b.range} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-white font-bold">{b.range} • {b.label}</span>
                        <span className="text-slate-400">{b.count} cities ({pct}%)</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: b.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Python / Pandas Code Generation Block */}
            <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    <Code2 className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Python Pandas Analysis Script
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      pandas_tree_canopy_pivot.py • GroupBy, Pivot Table & Describe
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold transition-colors"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied Script!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-300" />
                      <span>Copy Python Script</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 rounded-2xl bg-black/80 border border-white/10 p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-slate-300 leading-relaxed max-h-96">
                <pre>
                  <code>{pythonScript}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
