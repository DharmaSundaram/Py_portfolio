import React from 'react';
import { Star, Heart, Database, Download, FileText, ArrowUp, RotateCcw, Trash2, Camera, CheckCircle2, BookOpen } from 'lucide-react';

export default function Footer({
  profile,
  totalStars,
  totalStickers = 5,
  grandTotalAwards = 19,
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
                  {profile.name}'s Advance Python Achievement Portfolio
                </span>
                <span className="text-xs text-amber-300 font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{grandTotalAwards} Total Awards ({totalStars} Stars + 3 Pink + 2 Green Gem Stickers)</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Authentic record of star evaluations from Sharmila Banu Mam, handwritten commendation <span className="text-amber-300 font-bold">"Good Job DHARMA!"</span>, and Pandas/Advance Python programming notes from semester notebook records.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={profile?.githubUrl || "https://github.com/DharmaSundaram"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors"
                title="Dharma's GitHub Profile"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>github.com/DharmaSundaram</span>
              </a>
            </div>

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
                  <span>Course Photos & Evidence</span>
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
                <a href="#sweet-memories" className="hover:text-pink-300 transition-colors flex items-center gap-1 text-pink-300/90">
                  <Heart className="w-3 h-3 text-pink-400" />
                  <span>Sweet Memories</span>
                </a>
              </li>
              <li>
                <a href="#analytics" className="hover:text-amber-300 transition-colors">Analytics & Distribution</a>
              </li>
              <li>
                <a 
                  href="https://medium.com/python-in-plain-english/python-the-language-that-turns-simple-ideas-into-powerful-innovations-7ea7788120a4" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-rose-300 transition-colors flex items-center gap-1 text-rose-300/90 font-medium"
                >
                  <BookOpen className="w-3 h-3 text-rose-400" />
                  <span>Medium: Python Innovations</span>
                </a>
              </li>
              <li>
                <a 
                  href={profile?.githubUrl || "https://github.com/DharmaSundaram"}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300 font-medium"
                >
                  <svg className="w-3 h-3 fill-currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub: DharmaSundaram</span>
                </a>
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
          <p>
            © {new Date().getFullYear()} {profile.name} • Advance Python Programming Course Star Achievement Portfolio •{' '}
            <a
              href={profile?.githubUrl || "https://github.com/DharmaSundaram"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white underline underline-offset-2"
            >
              GitHub (@DharmaSundaram)
            </a>
          </p>

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
