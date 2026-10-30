import React from 'react';
import { Star, Heart, Database, Download, FileText, ArrowUp, RotateCcw, Trash2, Camera, CheckCircle2 } from 'lucide-react';

export default function Footer({
  profile,
  totalStars,
  onOpenExportImport,
  onOpenReport,
  onResetToDefaults,
  onResetAll
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#060814]/95 backdrop-blur-2xl text-slate-400 py-12 sm:py-16 relative z-10 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Profile */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-purple-600 p-0.5 shadow-lg shadow-amber-500/20">
                <div className="w-full h-full bg-[#0d1227] rounded-[10px] flex items-center justify-center">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
              </div>
              <div>
                <span className="font-heading font-extrabold text-white text-base block">
                  {profile.name}'s Python Achievement Portfolio
                </span>
                <span className="text-xs text-amber-300 font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{totalStars} Confirmed Stars • 5 Gem Stickers</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Authentic record of star evaluations from Sharmila Banu Mam, handwritten commendation <span className="text-amber-300 font-bold">"Good Job DHARMA!"</span>, and Pandas/Python programming notes from semester notebook records.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>LocalStorage Persistence Active</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              Portfolio Sections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-amber-300 transition-colors">Home & Dashboard</a>
              </li>
              <li>
                <a href="#evidence" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <Camera className="w-3 h-3 text-amber-400" />
                  <span>Notebook Photos</span>
                </a>
              </li>
              <li>
                <a href="#achievements" className="hover:text-amber-300 transition-colors">Star Achievements</a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-amber-300 transition-colors">Chronological Timeline</a>
              </li>
              <li>
                <a href="#why-stars" className="hover:text-amber-300 transition-colors">Sharmila Banu Mam's Reasons</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-amber-300 transition-colors">Python Notes & Skills</a>
              </li>
              <li>
                <a href="#faculty" className="hover:text-amber-300 transition-colors">Sharmila Banu Mam Recognition</a>
              </li>
              <li>
                <a href="#analytics" className="hover:text-amber-300 transition-colors">Analytics & Distribution</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Data & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              Data & Tools
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              <button
                onClick={onOpenExportImport}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors text-left"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export / Import Backup (JSON/CSV)</span>
              </button>

              <button
                onClick={onOpenReport}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors text-left"
              >
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                <span>Print Official Dossier Report</span>
              </button>

              <button
                onClick={onResetToDefaults}
                className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors text-left pt-1"
                title="Restore the authentic notebook records extracted from photographs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore Notebook Records</span>
              </button>

              <button
                onClick={onResetAll}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-rose-400 transition-colors text-left pt-1 text-[11px]"
              >
                <Trash2 className="w-3 h-3" />
                <span>Reset All Local Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {profile.name} • Python Programming Course Star Achievement Portfolio</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-amber-300 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
