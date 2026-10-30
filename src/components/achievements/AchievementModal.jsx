import React, { useState, useEffect } from 'react';
import { X, Star, Upload, Trash2, AlertCircle, Sparkles, Check, Info, CheckCircle2 } from 'lucide-react';
import { CATEGORIES } from '../../utils/constants';
import StarDisplay from '../common/StarDisplay';

export default function AchievementModal({
  isOpen,
  onClose,
  onSave,
  initialData = null
}) {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    stars: 1,
    stickers: 0,
    stickerColor: '',
    inkColor: '',
    facultyReason: '',
    facultyName: 'Sharmila Banu Mam',
    facultyFeedback: '',
    relatedTask: '',
    pythonConcepts: '',
    category: 'Problem-Solving',
    skillsDemonstrated: '',
    learningReflection: '',
    imageUrl: '',
    isVerified: true,
    verificationNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        date: initialData.date || '',
        stars: initialData.stars || 1,
        stickers: initialData.stickers || 0,
        stickerColor: initialData.stickerColor || '',
        inkColor: initialData.inkColor || '',
        facultyReason: initialData.facultyReason || '',
        facultyName: initialData.facultyName || 'Sharmila Banu Mam',
        facultyFeedback: initialData.facultyFeedback || '',
        relatedTask: initialData.relatedTask || '',
        pythonConcepts: Array.isArray(initialData.pythonConcepts)
          ? initialData.pythonConcepts.join(', ')
          : (initialData.pythonConcepts || ''),
        category: initialData.category || 'Problem-Solving',
        skillsDemonstrated: initialData.skillsDemonstrated || '',
        learningReflection: initialData.learningReflection || '',
        imageUrl: initialData.imageUrl || '',
        isVerified: initialData.isVerified !== false,
        verificationNotes: initialData.verificationNotes || ''
      });
    } else {
      setFormData({
        title: '',
        date: new Date().toISOString().split('T')[0],
        stars: 1,
        stickers: 0,
        stickerColor: '',
        inkColor: '',
        facultyReason: '',
        facultyName: 'Sharmila Banu Mam',
        facultyFeedback: '',
        relatedTask: '',
        pythonConcepts: '',
        category: 'Problem-Solving',
        skillsDemonstrated: '',
        learningReflection: '',
        imageUrl: '',
        isVerified: true,
        verificationNotes: ''
      });
    }
    setErrors({});
    setImageError('');
  }, [initialData, isOpen]);

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

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Achievement title is required.';
    }

    const starCount = Number(formData.stars);
    if (!Number.isInteger(starCount) || starCount < 1 || starCount > 10) {
      newErrors.stars = 'Stars awarded must be an integer between 1 and 10.';
    }

    if (!formData.facultyReason.trim()) {
      newErrors.facultyReason = 'Reason is required to document why this star was awarded.';
    }

    if (formData.date) {
      const parsedDate = new Date(formData.date);
      if (isNaN(parsedDate.getTime())) {
        newErrors.date = 'Please enter a valid date.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e) => {
    setImageError('');
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError('Please upload a valid image file (PNG, JPG, WebP).');
      return;
    }

    if (file.size > 800 * 1024) {
      setImageError('Image file is too large (max 800KB). Please upload a smaller screenshot.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({ ...prev, imageUrl: event.target.result }));
    };
    reader.onerror = () => {
      setImageError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    setImageError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const conceptsArray = formData.pythonConcepts
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    const achievementData = {
      id: initialData?.id || `star-${Date.now()}`,
      title: formData.title.trim(),
      date: formData.date || '',
      stars: parseInt(formData.stars, 10),
      stickers: parseInt(formData.stickers, 10) || 0,
      stickerColor: formData.stickerColor.trim(),
      inkColor: formData.inkColor.trim(),
      facultyReason: formData.facultyReason.trim(),
      facultyName: formData.facultyName.trim(),
      facultyFeedback: formData.facultyFeedback.trim(),
      relatedTask: formData.relatedTask.trim(),
      pythonConcepts: conceptsArray,
      category: formData.category,
      skillsDemonstrated: formData.skillsDemonstrated.trim(),
      learningReflection: formData.learningReflection.trim(),
      imageUrl: formData.imageUrl,
      isVerified: Boolean(formData.isVerified),
      verificationNotes: formData.verificationNotes.trim()
    };

    onSave(achievementData);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="achievement-modal-title"
    >
      <div className="relative w-full max-w-2xl my-8 glass-panel rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/40 via-amber-900/30 to-indigo-900/40 p-6 sm:p-7 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Star className="w-5 h-5 fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            </div>
            <div>
              <h2 id="achievement-modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {isEditing ? 'Edit Star Achievement Record' : 'Add New Star Achievement'}
              </h2>
              <p className="text-xs text-slate-300">
                Correct star counts, dates, verification status, and faculty feedback
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5 max-h-[72vh] overflow-y-auto">
          {/* Verification Status Toggle */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                Verification Status
              </span>
              <p className="text-[11px] text-slate-400">
                Mark as "Verified" when the date and handwritten stars match your notebook.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, isVerified: !formData.isVerified })}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                formData.isVerified
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}
            >
              {formData.isVerified ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Approved (Verified)</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Needs Verification</span>
                </>
              )}
            </button>
          </div>

          {/* Title & Stars Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Achievement Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Pandas Cartesian Product & Cross Join"
                className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40 ${
                  errors.title ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/10'
                }`}
              />
              {errors.title && (
                <p className="text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.title}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Handwritten Stars <span className="text-rose-400">*</span>
              </label>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.stars}
                  onChange={e => setFormData({ ...formData, stars: e.target.value })}
                  className="w-16 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm font-bold text-amber-400 text-center focus:outline-none"
                />
                <span className="text-xs font-bold text-amber-400 font-mono">
                  ⭐ Star{Number(formData.stars) > 1 ? 's' : ''}
                </span>
              </div>
              {errors.stars && (
                <p className="text-xs text-rose-400">{errors.stars}</p>
              )}
            </div>
          </div>

          {/* Physical Stickers & Ink Color Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Physical Gem Star Stickers
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={formData.stickers}
                onChange={e => setFormData({ ...formData, stickers: e.target.value })}
                placeholder="e.g., 3"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40"
              />
              <span className="text-[11px] text-slate-400">Physical stickers visible in notebook photo</span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Sticker Color / Ink Description
              </label>
              <input
                type="text"
                value={formData.stickerColor}
                onChange={e => setFormData({ ...formData, stickerColor: e.target.value })}
                placeholder="e.g., 3 Pink Faceted Stickers / Blue Ink"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40"
              />
            </div>
          </div>

          {/* Date & Category Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Date Received
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Achievement Category <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0e1329] border border-white/15 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id} className="bg-[#0e1329] text-white">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Actual Reason Given by Sharmila Banu Mam */}
          <div className="space-y-1.5 p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20">
            <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider">
              Sharmila Banu Mam Reason / Notebook Note <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={2}
              value={formData.facultyReason}
              onChange={e => setFormData({ ...formData, facultyReason: e.target.value })}
              placeholder="e.g., Cartesian Product when no column_ID is mentioned in Pandas merge()."
              className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                errors.facultyReason ? 'border-rose-500 ring-1 ring-rose-500' : 'border-amber-500/30'
              }`}
            />
            {errors.facultyReason && (
              <p className="text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.facultyReason}</span>
              </p>
            )}
          </div>

          {/* Commendation / Message from Sharmila Banu Mam */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Handwritten Message / Feedback from Sharmila Banu Mam
              </label>
              <input
                type="text"
                value={formData.facultyFeedback}
                onChange={e => setFormData({ ...formData, facultyFeedback: e.target.value })}
                placeholder="e.g., Good Job DHARMA! or Good!"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Evaluator / Signature
              </label>
              <input
                type="text"
                value={formData.facultyName}
                onChange={e => setFormData({ ...formData, facultyName: e.target.value })}
                placeholder="Sharmila Banu Mam"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
              />
            </div>
          </div>

          {/* Related Task & Concepts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Related Python Task / Activity
              </label>
              <input
                type="text"
                value={formData.relatedTask}
                onChange={e => setFormData({ ...formData, relatedTask: e.target.value })}
                placeholder="e.g., Pandas Merge & Cartesian Product Analysis"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Python Concepts Demonstrated
              </label>
              <input
                type="text"
                value={formData.pythonConcepts}
                onChange={e => setFormData({ ...formData, pythonConcepts: e.target.value })}
                placeholder="e.g., Pandas, Cross Join, DataFrames (comma-separated)"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
              />
            </div>
          </div>

          {/* Verification Notes */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Verification & Notebook Reference Notes
            </label>
            <input
              type="text"
              value={formData.verificationNotes}
              onChange={e => setFormData({ ...formData, verificationNotes: e.target.value })}
              placeholder="e.g., Verified from Page 1 line 4: 2 stars + 1 star with 3 pink star stickers."
              className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="gold-glow-btn px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 uppercase tracking-wider flex items-center gap-2"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{isEditing ? 'Save Changes' : 'Record Achievement'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
