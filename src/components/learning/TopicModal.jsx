import React, { useState, useEffect } from 'react';
import { X, Check, Code, BookOpen, AlertCircle } from 'lucide-react';

export default function TopicModal({
  isOpen,
  onClose,
  onSave,
  initialTopic = null
}) {
  const isEditing = Boolean(initialTopic);

  const [formData, setFormData] = useState({
    name: '',
    status: 'Mastered',
    description: '',
    relatedTask: '',
    skillsDemonstrated: '',
    codeSnippet: '',
    notes: '',
    relatedAchievementId: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (initialTopic) {
      setFormData({
        name: initialTopic.name || '',
        status: initialTopic.status || 'In Progress',
        description: initialTopic.description || '',
        relatedTask: initialTopic.relatedTask || '',
        skillsDemonstrated: initialTopic.skillsDemonstrated || '',
        codeSnippet: initialTopic.codeSnippet || '',
        notes: initialTopic.notes || '',
        relatedAchievementId: initialTopic.relatedAchievementId || ''
      });
    } else {
      setFormData({
        name: '',
        status: 'In Progress',
        description: '',
        relatedTask: '',
        skillsDemonstrated: '',
        codeSnippet: '',
        notes: '',
        relatedAchievementId: ''
      });
    }
    setError('');
  }, [initialTopic, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Topic name is required.');
      return;
    }

    onSave({
      id: initialTopic?.id || `custom-topic-${Date.now()}`,
      name: formData.name.trim(),
      status: formData.status,
      description: formData.description.trim(),
      relatedTask: formData.relatedTask.trim(),
      skillsDemonstrated: formData.skillsDemonstrated.trim(),
      codeSnippet: formData.codeSnippet,
      notes: formData.notes.trim(),
      relatedAchievementId: formData.relatedAchievementId.trim()
    });
  };

  const statusOptions = ['Not Started', 'In Progress', 'Completed', 'Mastered'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="topic-modal-title"
    >
      <div className="relative w-full max-w-xl my-8 glass-panel rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-indigo-900/40 p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 id="topic-modal-title" className="text-xl font-bold text-white tracking-tight">
                {isEditing ? 'Update Python Learning Topic' : 'Add Custom Python Topic'}
              </h2>
              <p className="text-xs text-slate-300">
                Track concepts, programs, skills demonstrated, and reflections
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[72vh] overflow-y-auto">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Topic Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Cartesian Product & Cross Joins in Pandas"
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Learning Status
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {statusOptions.map(st => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setFormData({ ...formData, status: st })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    formData.status === st
                      ? st === 'Mastered'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                        : st === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                        : st === 'In Progress'
                        ? 'bg-blue-500/20 text-blue-300 border-blue-500/50'
                        : 'bg-slate-700/50 text-slate-200 border-slate-600'
                      : 'bg-white/[0.03] text-slate-400 border-white/5 hover:bg-white/[0.06]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              What I Learned (Concept Description)
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Explain the concept in your own words..."
              className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Related Program or Assignment
              </label>
              <input
                type="text"
                value={formData.relatedTask}
                onChange={e => setFormData({ ...formData, relatedTask: e.target.value })}
                placeholder="e.g., Pandas Merge & Cross Join Notebook Lab"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Skills Demonstrated
              </label>
              <input
                type="text"
                value={formData.skillsDemonstrated}
                onChange={e => setFormData({ ...formData, skillsDemonstrated: e.target.value })}
                placeholder="e.g., Relational algebra, data joining, clean indexing"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Optional Code Snippet
            </label>
            <textarea
              rows={4}
              value={formData.codeSnippet}
              onChange={e => setFormData({ ...formData, codeSnippet: e.target.value })}
              placeholder="# Python demonstration code..."
              className="w-full p-3 rounded-xl bg-[#080b18] border border-white/10 font-mono text-xs text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Learning Notes & Reflections
            </label>
            <input
              type="text"
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g., Verified from Notebook Page 2 notes."
              className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-300 hover:text-white bg-white/5 border border-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="gold-glow-btn px-6 py-2 text-xs font-bold text-slate-950 uppercase tracking-wider flex items-center gap-1.5 rounded-xl"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Save Topic</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
