import React, { useState, useEffect } from 'react';
import { Star, PlusCircle, Menu, X, Download, FileText, Sparkles, Camera, CheckCircle2 } from 'lucide-react';

export default function Navbar({
  onAddStar,
  onOpenExportImport,
  onOpenReport,
  totalStars = 14,
  achievementCount = 8
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'evidence', 'project-demo', 'achievements', 'timeline', 'why-stars', 'skills', 'faculty', 'analytics', 'about'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'evidence', label: 'Course Photos' },
    { id: 'project-demo', label: 'Project Demo' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'why-stars', label: 'Why Stars' },
    { id: 'skills', label: 'Python Notes' },
    { id: 'faculty', label: 'Sharmila Banu Mam' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'about', label: 'About Me' }
  ];

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-300 no-print ${
        isScrolled
          ? 'bg-[#090d20]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-purple-600 p-0.5 shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-[#0d1227] rounded-[10px] flex items-center justify-center overflow-hidden">
                <img
                  src="/evidence/profile_picture.jpg"
                  alt="Dharma"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-lg tracking-tight text-white flex items-center gap-2">
                <span>Dharma's Python Journey</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {totalStars} ⭐
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono tracking-wider uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />
                <span>Verified Notebook Star Portfolio</span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1 bg-white/[0.03] border border-white/5 p-1 rounded-2xl backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={() => scrollTo('evidence')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 rounded-xl border border-amber-500/30 transition-colors"
              title="Inspect handwritten notebook photos"
            >
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>Notebook Photos</span>
            </button>

            <button
              onClick={onOpenExportImport}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
              title="Import / Export Data (JSON & CSV)"
              aria-label="Import and Export Data"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
              title="View & Print Professional Portfolio Report"
            >
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Report</span>
            </button>

            <button
              onClick={onAddStar}
              className="gold-glow-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 uppercase tracking-wider"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Add / Edit</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onAddStar}
              className="gold-glow-btn p-2 rounded-xl text-slate-950"
              aria-label="Add new star"
            >
              <PlusCircle className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden px-4 pt-3 pb-6 border-b border-white/10 bg-[#090d20]/95 backdrop-blur-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReport();
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white rounded-xl bg-white/5 border border-white/10"
              >
                <FileText className="w-4 h-4 text-purple-400" />
                <span>Print Achievement Dossier</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenExportImport();
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white rounded-xl bg-white/5 border border-white/10"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Import / Export Data (JSON & CSV)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
