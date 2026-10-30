import React, { useEffect } from 'react';
import { X, Printer, Star, CheckCircle2, Award, BookOpen, Calendar, Code2, Sparkles } from 'lucide-react';

export default function PrintableReport({
  isOpen,
  onClose,
  profile,
  achievements,
  topics
}) {
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

  const confirmedStars = achievements
    .filter(a => a.isVerified !== false)
    .reduce((acc, curr) => acc + (Number(curr.stars) || 0), 0);

  const totalRecords = achievements.length;
  const totalStickers = achievements.reduce((acc, curr) => acc + (Number(curr.stickers) || 0), 0);
  const completedTopicsCount = topics.filter(t => t.status === 'Completed' || t.status === 'Mastered').length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
    >
      <div className="relative w-full max-w-4xl my-4 sm:my-8 bg-[#0b0f1e] text-slate-100 rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Controls Header */}
        <div className="no-print p-4 sm:p-5 bg-[#090d1c] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>📄 Official Semester Achievement Dossier — {profile.name}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="gold-glow-btn px-4 py-2 rounded-xl text-xs font-bold text-slate-950 uppercase tracking-wider flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close report view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Content */}
        <div id="printable-dossier" className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-white text-slate-900 print:text-black print:p-0">
          {/* Header & Student Profile */}
          <div className="border-b-2 border-slate-900 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {profile.avatarUrl && (
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-300 shrink-0">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold block mb-1">
                    OFFICIAL PYTHON COURSE PORTFOLIO
                  </span>
                  <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
                    {profile.name}
                  </h1>
                  <p className="text-sm text-slate-700 font-medium mt-1">
                    Course: {profile.course} • {profile.institution}
                  </p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Semester: {profile.semester} | Academic Year: {profile.academicYear}
                  </p>
                </div>
              </div>

              <div className="text-right sm:border-l-2 sm:border-slate-300 sm:pl-6">
                <div className="text-xs font-mono uppercase text-slate-500">Total Confirmed Stars</div>
                <div className="text-4xl font-extrabold text-amber-600 font-mono">
                  {confirmedStars} ⭐
                </div>
                <div className="text-xs text-slate-600 font-medium mt-0.5">
                  {totalRecords} Records • {totalStickers} Gem Stickers
                </div>
              </div>
            </div>

            {/* Handwritten Commendation Callout */}
            <div className="mt-4 p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs flex items-center justify-between">
              <span className="font-bold text-amber-900">
                Official Handwritten Commendation from Sharmila Banu Mam: "Good Job DHARMA!"
              </span>
              <span className="font-mono text-slate-600">
                Signed by Sharmila Banu Mam (JSh) (09/09/2026)
              </span>
            </div>
          </div>

          {/* Key Metrics Summary Bar */}
          <div className="grid grid-cols-4 gap-3 text-center border border-slate-200 rounded-xl p-3 bg-slate-50">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500">Confirmed Stars</div>
              <div className="text-xl font-bold text-slate-900">{confirmedStars} ⭐</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500">Achievement Records</div>
              <div className="text-xl font-bold text-slate-900">{totalRecords}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500">Gem Stickers</div>
              <div className="text-xl font-bold text-slate-900">{totalStickers} ✨</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500">Topics Mastered</div>
              <div className="text-xl font-bold text-slate-900">{completedTopicsCount}/{topics.length || 8}</div>
            </div>
          </div>

          {/* Verified Achievements List */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-950 uppercase tracking-wider border-b border-slate-200 pb-2">
              Verified Notebook Star Awards & Reasons from Sharmila Banu Mam
            </h2>

            <div className="space-y-4">
              {achievements.map((item, index) => (
                <div key={item.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-slate-800">
                      #{String(index + 1).padStart(2, '0')} • {item.title}
                    </span>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-bold text-amber-700">{item.stars} ⭐</span>
                      {item.stickers > 0 && (
                        <span className="text-purple-700 font-semibold">({item.stickers} stickers)</span>
                      )}
                      <span className="text-slate-400">|</span>
                      <span className="text-slate-600">{item.date || 'Unspecified date'}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed">
                    <span className="font-bold text-slate-900 block mb-0.5">Sharmila Banu Mam Evaluation Reason:</span>
                    <span className="italic text-slate-700">"{item.facultyReason}"</span>
                    {item.facultyFeedback && (
                      <span className="block text-amber-800 font-bold mt-1">
                        Handwritten Note: "{item.facultyFeedback}" — {item.facultyName || 'Sharmila Banu Mam'}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
                    {item.relatedTask && (
                      <div>
                        <span className="font-semibold text-slate-800">Related Task: </span>
                        <span>{item.relatedTask}</span>
                      </div>
                    )}
                    {item.verificationNotes && (
                      <div>
                        <span className="font-semibold text-slate-800">Notebook Source: </span>
                        <span>{item.verificationNotes}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Notes & Progress */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h2 className="text-lg font-bold text-slate-950 uppercase tracking-wider border-b border-slate-200 pb-2">
              Python Learning Topics & Notes ({completedTopicsCount}/{topics.length || 8} completed)
            </h2>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {topics.map(topic => (
                <div key={topic.id} className="p-2.5 rounded border border-slate-200 bg-slate-50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{topic.name}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                      {topic.status}
                    </span>
                  </div>
                  {topic.description && (
                    <p className="text-[11px] text-slate-600 line-clamp-2">{topic.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Sign-off */}
          <div className="pt-6 border-t-2 border-slate-900 flex items-center justify-between text-xs text-slate-500">
            <span>Verified from Student Notebook Photographs (Faculty Signature: JSh)</span>
            <span>Date Generated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
