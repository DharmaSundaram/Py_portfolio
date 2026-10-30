import React, { useState, useEffect } from 'react';
import { X, Download, Upload, FileText, CheckCircle2, AlertTriangle, AlertCircle, FileSpreadsheet, RefreshCw } from 'lucide-react';
import { exportToJSON, exportToCSV, validateImportData } from '../../utils/exportImport';

export default function ExportImportModal({
  isOpen,
  onClose,
  achievements,
  profile,
  topics,
  onImportSuccess
}) {
  const [importStatus, setImportStatus] = useState(null); // { type: 'success' | 'error', message: '', data: null }
  const [importMode, setImportMode] = useState('merge'); // 'merge' | 'replace'
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleExportJSON = () => {
    exportToJSON(achievements, profile, topics);
  };

  const handleExportCSV = () => {
    try {
      exportToCSV(achievements);
    } catch (err) {
      setImportStatus({ type: 'error', message: err.message });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsProcessing(true);
    setImportStatus(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const validation = validateImportData(content);

      if (!validation.valid) {
        setImportStatus({
          type: 'error',
          message: validation.error || 'Invalid file format.'
        });
        setIsProcessing(false);
        return;
      }

      setImportStatus({
        type: 'preview',
        data: validation,
        message: `Found ${validation.summary.totalRecords} achievements (${validation.summary.totalStars} stars) ready to import.`
      });
      setIsProcessing(false);
    };

    reader.onerror = () => {
      setImportStatus({
        type: 'error',
        message: 'Failed to read file.'
      });
      setIsProcessing(false);
    };

    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    if (!importStatus || !importStatus.data) return;
    onImportSuccess(importStatus.data, importMode);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-import-title"
    >
      <div className="relative w-full max-w-xl my-8 glass-panel rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-amber-900/40 p-6 sm:p-7 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 id="export-import-title" className="text-xl font-bold text-white tracking-tight">
                Import & Export Portfolio Data
              </h2>
              <p className="text-xs text-slate-300">
                Backup, export to spreadsheet, or restore previous semester data
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

        <div className="p-6 sm:p-7 space-y-6 max-h-[72vh] overflow-y-auto">
          {/* Section 1: Export Options */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Export Portfolio
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleExportJSON}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-left transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
                    <FileText className="w-4 h-4" />
                    <span>Export JSON Backup</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Complete backup including achievements, profile info, and syllabus topics.
                  </p>
                </div>
                <span className="text-[11px] text-amber-300 font-mono mt-3 block group-hover:underline">
                  Download .json →
                </span>
              </button>

              <button
                type="button"
                onClick={handleExportCSV}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-left transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Export CSV Summary</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Tabular format compatible with Excel and Google Sheets for gradebook review.
                  </p>
                </div>
                <span className="text-[11px] text-emerald-300 font-mono mt-3 block group-hover:underline">
                  Download .csv →
                </span>
              </button>
            </div>
          </div>

          {/* Section 2: Import Options */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Import Previously Exported JSON
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload a previously exported JSON file. Your data will be validated before anything is applied.
            </p>

            <label className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer transition-colors">
              <Upload className="w-8 h-8 text-cyan-400 mb-2" />
              <span className="text-sm font-semibold text-white">Select JSON File to Import</span>
              <span className="text-xs text-slate-400 mt-0.5">.json files supported</span>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Import Status / Preview */}
            {importStatus && importStatus.type === 'error' && (
              <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Validation Error:</span>
                  <span>{importStatus.message}</span>
                </div>
              </div>
            )}

            {importStatus && importStatus.type === 'preview' && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
                <div className="flex items-start gap-2 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{importStatus.message}</span>
                </div>

                {/* Import Mode Selection */}
                <div className="space-y-2 pt-2 border-t border-emerald-500/20">
                  <span className="text-xs font-semibold text-slate-200 block">
                    Choose Import Mode:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setImportMode('merge')}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        importMode === 'merge'
                          ? 'bg-emerald-500/20 text-emerald-200 border-emerald-500/50 font-bold'
                          : 'bg-white/5 text-slate-400 border-white/10'
                      }`}
                    >
                      <span className="block font-semibold">Merge with Existing</span>
                      <span className="text-[11px] opacity-80">Append without deleting your current records</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setImportMode('replace')}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        importMode === 'replace'
                          ? 'bg-rose-500/20 text-rose-200 border-rose-500/50 font-bold'
                          : 'bg-white/5 text-slate-400 border-white/10'
                      }`}
                    >
                      <span className="block font-semibold text-rose-300">Replace Existing</span>
                      <span className="text-[11px] opacity-80">Overwrite current records with imported ones</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleConfirmImport}
                    className="gold-glow-btn px-5 py-2 rounded-xl text-xs font-bold text-slate-950 uppercase tracking-wider"
                  >
                    Confirm & Apply Import
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-5 bg-white/[0.02] border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 border border-white/10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
