import React, { useState } from 'react';
import { Heart, Camera, ZoomIn, ZoomOut, Maximize2, X, Sparkles, MapPin, Calendar, Users, Award, BookOpen } from 'lucide-react';
import { SWEET_MEMORIES_DATA } from '../../utils/realNotebookData';

export default function SweetMemoriesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const openLightbox = () => {
    setIsModalOpen(true);
    setZoomLevel(1);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsModalOpen(false);
    setZoomLevel(1);
    document.body.style.overflow = '';
  };

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.35, 3));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.35, 0.7));
  const resetZoom = () => setZoomLevel(1);

  return (
    <section id="sweet-memories" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-pink-900/20 via-purple-900/20 to-amber-600/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-300 text-xs sm:text-sm font-semibold mb-3 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400/40 animate-pulse" />
            <span>Sweet Memories • Class of Advance Python Programming</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Sweet Memories with Sharmila Banu Mam
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            A treasured milestone photograph celebrating our entire Advance Python Programming class gathered together with our respected faculty mentor, <span className="text-amber-300 font-semibold">Sharmila Banu Mam</span>, in the computer laboratory at VIT.
          </p>
        </div>

        {/* Featured Showcase Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border-2 border-pink-500/30 relative overflow-hidden shadow-2xl bg-gradient-to-br from-pink-950/20 via-[#0d1227]/90 to-purple-950/30">
          {/* Subtle Pink & Gold Corner Glow */}
          <div className="absolute -top-16 -right-16 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            {/* Top Metadata Badges */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                <span className="px-3 py-1 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-500/30 font-semibold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Advance Python Batch 2026</span>
                </span>

                <span className="px-3 py-1 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>Faculty: Sharmila Banu Mam</span>
                </span>

                <span className="px-3 py-1 rounded-xl bg-white/5 text-slate-300 border border-white/10 font-mono flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>VIT Computer Lab</span>
                </span>
              </div>

              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Academic Semester 2026</span>
              </span>
            </div>

            {/* Photo Preview Container (Clickable for High-Res Lightbox) */}
            <div
              onClick={openLightbox}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-black/80 cursor-pointer group/photo shadow-2xl max-h-[580px]"
            >
              <img
                src={SWEET_MEMORIES_DATA.imageUrl}
                alt="Advance Python Programming Class with Sharmila Banu Mam"
                className="w-full h-full object-cover object-center group-hover/photo:scale-[1.02] transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover/photo:opacity-40 transition-opacity" />

              {/* Hover Overlay Hint Button */}
              <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6">
                <button
                  type="button"
                  className="px-4 py-2.5 rounded-2xl bg-slate-950/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 font-bold text-xs flex items-center gap-2 shadow-2xl group-hover/photo:scale-105 transition-all"
                >
                  <Maximize2 className="w-4 h-4 text-pink-400" />
                  <span>Click to Expand High-Res Photo</span>
                </button>
              </div>

              {/* Floating Badge in Bottom Left */}
              <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 max-w-md">
                <div className="px-3.5 py-2 rounded-2xl bg-black/75 backdrop-blur-md border border-pink-500/30 text-xs text-slate-200 shadow-xl flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold text-white truncate">
                    Sharmila Banu Mam with Advance Python Students
                  </span>
                </div>
              </div>
            </div>

            {/* Commendation Quote Banner */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 border border-pink-500/25 relative">
              <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed text-center sm:text-left">
                {SWEET_MEMORIES_DATA.quote}
              </p>
            </div>

            {/* Memory Description & Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="md:col-span-2 space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                  <span>The Story Behind This Sweet Memory</span>
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {SWEET_MEMORIES_DATA.description}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every lab session was filled with active hands-on coding, interactive debugging at the workstations, and constructive evaluations. Sharmila Banu Mam's encouraging words, handwritten stars, and personal praise provided the foundation for our technical and personal growth.
                </p>
              </div>

              {/* Highlights Pill Column */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                  Classroom Highlights
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {SWEET_MEMORIES_DATA.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-pink-400 font-bold shrink-0">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Lightbox Header Bar */}
          <div
            className="w-full max-w-6xl flex items-center justify-between text-white pb-3 border-b border-white/10 z-10"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
                <Heart className="w-4 h-4 fill-pink-400" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-white">
                  Advance Python Programming Class • Sweet Memories
                </h4>
                <p className="text-[11px] text-slate-400 font-mono">
                  Sharmila Banu Mam & Students • VIT Computer Lab
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white/10 rounded-xl p-1 border border-white/10">
                <button
                  onClick={zoomOut}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={resetZoom}
                  className="px-2 py-1 text-xs font-mono text-slate-300 hover:text-white"
                  title="Reset Zoom"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button
                  onClick={zoomIn}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={closeLightbox}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                title="Close Lightbox (Esc)"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Image Stage */}
          <div
            className="flex-1 w-full max-w-6xl flex items-center justify-center overflow-auto p-2"
            onClick={closeLightbox}
          >
            <div
              className="transition-transform duration-200 cursor-grab active:cursor-grabbing max-h-[85vh] max-w-full"
              style={{ transform: `scale(${zoomLevel})` }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={SWEET_MEMORIES_DATA.imageUrl}
                alt="Advance Python Programming Class Group with Sharmila Banu Mam"
                className="rounded-2xl shadow-2xl border border-white/20 object-contain max-h-[80vh] w-auto mx-auto select-none"
              />
            </div>
          </div>

          {/* Lightbox Footer Caption */}
          <div
            className="w-full max-w-4xl text-center text-xs text-slate-400 py-2 border-t border-white/10"
            onClick={e => e.stopPropagation()}
          >
            <span>Advance Python Programming Laboratory Moment • Mentored by Sharmila Banu Mam • School of Computing & Computer Applications</span>
          </div>
        </div>
      )}
    </section>
  );
}
