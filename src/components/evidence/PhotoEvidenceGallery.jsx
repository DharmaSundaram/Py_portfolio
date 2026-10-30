import React, { useState } from 'react';
import { Camera, ZoomIn, ZoomOut, Maximize2, X, CheckCircle2, Calendar, FileText, Sparkles, ExternalLink, Play } from 'lucide-react';
import { NOTEBOOK_EVIDENCE_PHOTOS } from '../../utils/realNotebookData';

export default function PhotoEvidenceGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setZoomLevel(1);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setZoomLevel(1);
    document.body.style.overflow = '';
  };

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.35, 3));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.35, 0.7));
  const resetZoom = () => setZoomLevel(1);

  return (
    <section id="evidence" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
            <Camera className="w-4 h-4 text-amber-400" />
            <span>Primary Source Documentation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            My Course Photographs & Notebook Records
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Authentic, unedited photographs of classroom quiz events, computer lab storytelling sessions, and handwritten course notebook documenting Sharmila Banu Mam's signatures, star awards, physical star stickers, and the personal commendation message: <span className="text-amber-300 font-bold">"Good Job DHARMA!"</span>
          </p>
        </div>

        {/* Course & Notebook Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {NOTEBOOK_EVIDENCE_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between group"
            >
              <div>
                {/* Photo Header */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {photo.categoryBadge || 'Original Notebook Page'}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {photo.date}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verified</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors mb-3">
                  {photo.title}
                </h3>

                {/* Image Container with Hover Zoom Trigger */}
                <div
                  onClick={() => openModal(photo)}
                  className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 h-80 sm:h-96 w-full cursor-pointer group/img"
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover/img:opacity-90 transition-opacity" />

                  {/* Highlight Pill Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-amber-200 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/30 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{photo.keyHighlight}</span>
                    </span>

                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-lg shrink-0"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </div>
                </div>

                {/* Caption Breakdown */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-4">
                  {photo.caption}
                </p>

                {photo.id === 'photo-4' && (
                  <div className="mt-3.5">
                    <a
                      href="#project-demo"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>Watch Project Demo Video</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Photo Metrics Footer */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 mt-5 text-center text-xs">
                {photo.metricLabels ? (
                  <>
                    <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">{photo.metricLabels.m1Title}</span>
                      <span className="font-bold text-white font-mono mt-0.5 block truncate">{photo.metricLabels.m1Value}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">{photo.metricLabels.m2Title}</span>
                      <span className="font-bold text-amber-400 font-mono mt-0.5 block truncate">{photo.metricLabels.m2Value}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">{photo.metricLabels.m3Title}</span>
                      <span className="font-bold text-purple-300 font-mono mt-0.5 block truncate">{photo.metricLabels.m3Value}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">Covered Records</span>
                      <span className="font-bold text-white font-mono mt-0.5 block">{photo.recordsCovered} Entries</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">Stars Counted</span>
                      <span className="font-bold text-amber-400 font-mono mt-0.5 block">{photo.starsCounted} ⭐</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">Gem Stickers</span>
                      <span className="font-bold text-purple-300 font-mono mt-0.5 block">{photo.stickersCounted} Stickers</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Zoom & Inspection Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Header Controls */}
          <div className="p-4 sm:p-5 bg-black/70 border-b border-white/10 flex items-center justify-between text-white z-20">
            <div>
              <h3 className="text-base sm:text-lg font-bold truncate max-w-md sm:max-w-xl">
                {selectedPhoto.title}
              </h3>
              <p className="text-xs text-amber-300 font-mono">
                {selectedPhoto.keyHighlight}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={zoomOut}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>

              <button
                onClick={resetZoom}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-semibold transition-colors"
                title="Reset Zoom"
              >
                {Math.round(zoomLevel * 100)}%
              </button>

              <button
                onClick={zoomIn}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                title="Zoom In"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>

              <button
                onClick={closeModal}
                className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition-colors ml-2"
                aria-label="Close image viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Image Body with Zoom & Pan */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-4 select-none cursor-grab active:cursor-grabbing">
            <div
              style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.15s ease-out' }}
              className="origin-center max-w-4xl max-h-[80vh] flex items-center justify-center"
            >
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/20"
              />
            </div>
          </div>

          {/* Modal Footer Caption */}
          <div className="p-4 bg-black/80 border-t border-white/10 text-center text-xs text-slate-300 z-20">
            <span>{selectedPhoto.caption}</span>
          </div>
        </div>
      )}
    </section>
  );
}
