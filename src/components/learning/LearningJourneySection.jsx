import React, { useState } from 'react';
import { BookOpen, CheckCircle, Clock, Award, Code2, Copy, Check, Edit3, Plus, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export default function LearningJourneySection({
  topics,
  onEditTopic,
  onAddTopic
}) {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [expandedSnippets, setExpandedSnippets] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const toggleSnippet = (id) => {
    setExpandedSnippets(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyCode = (id, code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredTopics = topics.filter(t => {
    if (statusFilter === 'ALL') return true;
    return t.status === statusFilter;
  });

  // Calculate syllabus stats
  const masteredCount = topics.filter(t => t.status === 'Mastered').length;
  const completedCount = topics.filter(t => t.status === 'Completed').length;
  const inProgressCount = topics.filter(t => t.status === 'In Progress').length;
  const notStartedCount = topics.filter(t => t.status === 'Not Started').length;
  const totalCount = topics.length || 8;

  const progressPercentage = Math.round(((masteredCount + completedCount) / totalCount) * 100);

  const statusBadges = {
    'Mastered': 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]',
    'Completed': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    'In Progress': 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    'Not Started': 'bg-slate-700/50 text-slate-200 border-slate-600'
  };

  return (
    <section id="skills" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Verified Notebook Notes & Core Curriculum</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              My Python Learning Journey
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Verified topics from my notebook notes—including <span className="text-cyan-300 font-semibold">Pandas Cartesian Products</span> and the <span className="text-purple-300 font-semibold">Tech Speech Podcast</span>—alongside semester competencies.
            </p>
          </div>

          <button
            onClick={onAddTopic}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-panel hover:bg-white/10 text-xs font-semibold text-slate-200 border border-white/10 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Add Custom Topic</span>
          </button>
        </div>

        {/* Syllabus Progress Overview Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Learning Progress
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1 flex items-baseline gap-2">
                <span>{progressPercentage}% Completed</span>
                <span className="text-xs text-slate-400 font-sans font-normal">
                  ({masteredCount + completedCount} of {totalCount} topics mastered)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 text-xs font-semibold flex-wrap">
              <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30">
                {masteredCount} Mastered
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 text-blue-300 border border-blue-500/30">
                {inProgressCount} In Progress
              </span>
            </div>
          </div>

          {/* Multi-segment Progress Bar */}
          <div className="w-full h-3 rounded-full bg-slate-800/80 overflow-hidden flex">
            <div
              style={{ width: `${(masteredCount / totalCount) * 100}%` }}
              className="bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.6)] transition-all duration-500"
              title={`Mastered: ${masteredCount}`}
            />
            <div
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
              className="bg-emerald-400 transition-all duration-500"
              title={`Completed: ${completedCount}`}
            />
            <div
              style={{ width: `${(inProgressCount / totalCount) * 100}%` }}
              className="bg-blue-400 transition-all duration-500"
              title={`In Progress: ${inProgressCount}`}
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar text-xs">
          {[
            { id: 'ALL', label: `All Topics (${topics.length})` },
            { id: 'Mastered', label: `Mastered (${masteredCount})` },
            { id: 'In Progress', label: `In Progress (${inProgressCount})` },
            { id: 'Not Started', label: `Not Started (${notStartedCount})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
                statusFilter === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic, index) => {
            const isSnippetOpen = expandedSnippets[topic.id] || false;
            const isCopied = copiedId === topic.id;

            return (
              <div
                key={topic.id}
                className="glass-panel glass-panel-hover p-6 rounded-3xl border border-white/10 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="font-mono text-xs text-slate-400">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                        statusBadges[topic.status] || statusBadges['Not Started']
                      }`}
                    >
                      {topic.status}
                    </span>
                  </div>

                  {topic.source && (
                    <div className="mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {topic.source}
                      </span>
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors mb-2">
                    {topic.name}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {topic.description}
                  </p>

                  {topic.relatedTask && (
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 mb-3 text-xs">
                      <span className="font-semibold text-cyan-400 block mb-0.5">Related Task / Activity:</span>
                      <span className="text-slate-200">{topic.relatedTask}</span>
                    </div>
                  )}

                  {topic.skillsDemonstrated && (
                    <div className="p-2.5 rounded-xl bg-purple-500/[0.05] border border-purple-500/15 mb-3 text-xs">
                      <span className="font-semibold text-purple-300 block mb-0.5">Skills Demonstrated:</span>
                      <span className="text-slate-300">{topic.skillsDemonstrated}</span>
                    </div>
                  )}

                  {/* Code Snippet Box */}
                  {topic.codeSnippet && (
                    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#080b18] mb-4">
                      <div className="px-3 py-1.5 bg-white/5 border-b border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-mono flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>python_notes.py</span>
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => copyCode(topic.id, topic.codeSnippet)}
                            className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                            title="Copy code"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => toggleSnippet(topic.id)}
                            className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                            title={isSnippetOpen ? 'Collapse' : 'Expand'}
                          >
                            {isSnippetOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <pre className={`p-3 font-mono text-[11px] text-amber-200 overflow-x-auto leading-relaxed ${
                        isSnippetOpen ? 'max-h-60' : 'max-h-20'
                      }`}>
                        <code>{topic.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {topic.notes && (
                    <p className="text-[11px] text-slate-400 italic mb-4">
                      Notebook Note: {topic.notes}
                    </p>
                  )}
                </div>

                {/* Edit Topic Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => onEditTopic(topic)}
                    className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 hover:underline flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Topic Progress</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
