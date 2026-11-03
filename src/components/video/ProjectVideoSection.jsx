import React, { useRef, useState } from 'react';
import { 
  Play, 
  Pause, 
  Maximize2, 
  RotateCcw, 
  Sparkles, 
  Video, 
  CheckCircle2, 
  Laptop, 
  Layers, 
  ExternalLink,
  Download,
  Presentation,
  Recycle,
  Cpu,
  Users,
  ArrowUpRight,
  Code2
} from 'lucide-react';

export default function ProjectVideoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleSpeedChange = (speed) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
    setPlaybackRate(speed);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch((err) => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.warn('Exit fullscreen failed:', err);
      });
    }
  };

  const projectApps = [
    {
      appNumber: 'Application 1',
      role: 'Collection & Recovery (Lead)',
      leadName: 'NIDEESH C G',
      regNo: '23MIC0092',
      liveUrl: 'https://e-waste-recovery-system-sand.vercel.app/',
      githubUrl: 'https://github.com/Nideesh-CG/E-waste-Recovery-System.git',
      badgeColor: 'from-emerald-500 to-teal-500',
      tagColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
      description: 'End-to-end e-waste collection pipeline, citizen intake portal, drop-off logistics routing, and recovery tracking database.'
    },
    {
      appNumber: 'Application 2',
      role: 'Refurbishment Intelligence',
      leadName: 'Dharma S',
      regNo: '23MIC0104',
      liveUrl: 'https://circular-refurbishment-intelligence.vercel.app/',
      githubUrl: 'https://github.com/DharmaSundaram/circular-refurbishment-intelligences.git',
      badgeColor: 'from-amber-500 to-purple-600',
      tagColor: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
      description: 'AI-assisted hardware diagnostic evaluation, component refurbishment health scoring, resale/recycle valuation models, and circular lifecycle analytics.'
    }
  ];

  return (
    <section id="project-demo" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-gradient-to-tr from-amber-500/10 via-emerald-600/10 to-purple-600/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3">
            <Recycle className="w-4 h-4 text-emerald-400" />
            <span>Advance Python Programming • Storytelling Lab Project</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Circular E-Waste Recovery & Refurbishment Intelligence Platform
          </h2>

          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed max-w-3xl mx-auto">
            Comprehensive collaborative Python web platform presented during our computer lab storytelling event under <span className="text-amber-300 font-semibold">Sharmila Banu Mam's</span> review. Unites smart e-waste recovery logistics with AI-powered refurbishment intelligence.
          </p>
        </div>

        {/* Two-Tier Subsystems Cards (App 1 & App 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {projectApps.map((app, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between shadow-xl relative group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${app.tagColor}`}>
                    {app.appNumber}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{app.regNo}</span>
                  </span>
                </div>

                <div className="space-y-1 mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                    {app.role}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-200 transition-colors">
                    {app.leadName}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {app.description}
                </p>
              </div>

              {/* Action Buttons: Live App & GitHub */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                <a
                  href={app.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 group/btn"
                >
                  <span>Launch Live App</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={app.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs font-semibold transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>GitHub Repo</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Video Showcase Card */}
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.08)] mb-8">
          {/* Top Video Header Bar */}
          <div className="p-4 sm:p-5 bg-white/[0.02] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-white font-mono">
                Screen Recording • Full HD Walkthrough
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Circular E-Waste Platform
              </span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30 hidden sm:inline-block">
                Evaluator: Sharmila Banu Mam
              </span>
            </div>
          </div>

          {/* Main Video Player */}
          <div className="relative bg-black aspect-video w-full group/video flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src="/videos/project_demo.mp4"
              controls
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>

            {/* Custom Floating Play Overlay when Paused */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Play Project Demo Video"
                className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-amber-500/90 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:scale-110 transition-all duration-300 cursor-pointer pointer-events-auto z-10"
              >
                <Play className="w-9 h-9 fill-slate-950 ml-1" />
              </button>
            )}
          </div>

          {/* Video Controls & Quick Actions Bar */}
          <div className="p-4 sm:p-6 bg-slate-950/60 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-lg"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Play Demo</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={restartVideo}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                title="Replay from start"
                aria-label="Replay Video"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                title="Fullscreen"
                aria-label="Toggle Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Playback Speed Controls */}
            <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono">
              <span className="text-slate-400 px-2 hidden sm:inline">Speed:</span>
              {[0.75, 1, 1.25, 1.5].map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => handleSpeedChange(speed)}
                  className={`px-2.5 py-1 rounded-lg transition-colors font-semibold ${
                    playbackRate === speed
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* Project Details & Storytelling Context */}
          <div className="p-6 sm:p-8 bg-white/[0.01] grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 border-t border-white/5">
            {/* Col 1: Overview */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-mono uppercase tracking-wider">
                <Laptop className="w-4 h-4" />
                <span>Project Walkthrough</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Live System Execution & Architecture
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                This screen recording captures the complete execution flow of our Circular E-Waste Platform, demonstrating user collection scheduling, hardware diagnostic grading, predictive refurbishment pricing, and circular sustainability reporting.
              </p>
            </div>

            {/* Col 2: Key Milestones Covered */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Core Capabilities</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Dual-application cloud deployment on Vercel with RESTful data pipelines</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Component-level grading algorithms estimating resale & recycled material value</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Storytelling lab presentation & workstation demo reviewed by Sharmila Banu Mam</span>
                </li>
              </ul>
            </div>

            {/* Col 3: Storytelling Alignment */}
            <div className="p-5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold font-mono uppercase">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Storytelling Event Sync</span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Presented directly on lab workstations for the Advance Python Programming lab project, connecting backend Python algorithmic logic to real-world electronic waste recovery challenges.
                </p>
              </div>

              <div className="pt-4 border-t border-amber-500/20 mt-4 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Faculty Reviewer:</span>
                <span className="font-bold text-amber-300">Sharmila Banu Mam</span>
              </div>
            </div>
          </div>
        </div>

        {/* Presentation PPT Download & Details Card */}
        <div className="glass-panel rounded-3xl border border-amber-500/30 p-6 sm:p-8 bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-transparent shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0 shadow-lg shadow-amber-500/10">
              <Presentation className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                  Official Project Presentation Deck
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/30">
                  PPTX • 612 KB
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                Circular E-Waste Recovery & Refurbishment Intelligence Deck
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Full slide deck covering problem definition, system architecture for Collection & Recovery (App 1) and Refurbishment Intelligence (App 2), mathematical evaluation models, and live deployment outcomes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-stretch md:self-auto justify-end">
            <a
              href="/docs/e-waste-presentation.pptx"
              download="e-waste-presentation.pptx"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm transition-all shadow-xl shadow-amber-500/25 hover:scale-[1.02]"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download Project PPT</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
