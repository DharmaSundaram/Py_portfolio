import React, { useState, useEffect } from 'react';
import { X, Check, User, School, Calendar, BookOpen, Target, Sparkles } from 'lucide-react';

export default function ProfileModal({
  isOpen,
  onClose,
  profile,
  onSave
}) {
  const [formData, setFormData] = useState({ ...profile });

  useEffect(() => {
    setFormData({ ...profile });
  }, [profile, isOpen]);

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
    onSave(formData);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
    >
      <div className="relative w-full max-w-2xl my-8 glass-panel rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-gradient-to-r from-purple-900/40 via-amber-900/30 to-indigo-900/40 p-6 sm:p-7 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 id="profile-modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Edit Student Profile & Goals
              </h2>
              <p className="text-xs text-slate-300">
                Personalize your name, college, academic year, and learning statement
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

        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5 max-h-[72vh] overflow-y-auto">
          {/* Profile Picture Preview & URL */}
          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-black/60 border border-amber-500/30 shrink-0 shadow-md">
              {formData.avatarUrl ? (
                <img
                  src={formData.avatarUrl}
                  alt={formData.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-amber-400">
                  <User className="w-8 h-8" />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-1">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Profile Picture
              </label>
              <input
                type="text"
                value={formData.avatarUrl || ''}
                onChange={e => setFormData({ ...formData, avatarUrl: e.target.value })}
                placeholder="/evidence/profile_picture.jpg"
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40 font-mono"
              />
            </div>
          </div>

          {/* Row 1: Name & Course */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Student Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Alex Johnson"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Course Title
              </label>
              <input
                type="text"
                value={formData.course}
                onChange={e => setFormData({ ...formData, course: e.target.value })}
                placeholder="e.g., Python Programming"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              />
            </div>
          </div>

          {/* Row 2: Institution, Semester, Academic Year */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Institution / College
              </label>
              <input
                type="text"
                value={formData.institution}
                onChange={e => setFormData({ ...formData, institution: e.target.value })}
                placeholder="e.g., Institute of Technology"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Semester
              </label>
              <input
                type="text"
                value={formData.semester}
                onChange={e => setFormData({ ...formData, semester: e.target.value })}
                placeholder="e.g., Semester 3 (Fall 2024)"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Academic Year
              </label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={e => setFormData({ ...formData, academicYear: e.target.value })}
                placeholder="e.g., 2024 - 2025"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              />
            </div>
          </div>

          {/* Interest in Python / Bio */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Interest in Python & Semester Journey Bio
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Describe your enthusiasm for Python and key focus areas..."
              className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40"
            />
          </div>

          {/* Strengths & Areas to Improve */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Key Strengths
              </label>
              <textarea
                rows={2}
                value={formData.strengths}
                onChange={e => setFormData({ ...formData, strengths: e.target.value })}
                placeholder="e.g., Problem breakdown, clean code, debugging..."
                className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Areas I Want to Improve
              </label>
              <textarea
                rows={2}
                value={formData.areasToImprove}
                onChange={e => setFormData({ ...formData, areasToImprove: e.target.value })}
                placeholder="e.g., Unit testing suites, recursion optimization..."
                className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              />
            </div>
          </div>

          {/* Future Goals */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Future Python & Career Goals
            </label>
            <textarea
              rows={2}
              value={formData.futureGoals}
              onChange={e => setFormData({ ...formData, futureGoals: e.target.value })}
              placeholder="e.g., Build production APIs with FastAPI and contribute to open source..."
              className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
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
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
