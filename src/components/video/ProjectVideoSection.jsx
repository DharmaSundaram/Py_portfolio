import React, { useRef, useState } from 'react';
import { 
  Play, 
  Pause, 
  Maximize2, 
  RotateCcw, 
  Sparkles, 
  Video, 
  CheckCircle2, 
  Clock, 
  Laptop, 
  FileCode2, 
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function ProjectVideoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.warn('Exit fullscreen failed:', err);
      });
      setIsFullscreen(false);
    }
  };

  return (
    <section id="project-demo" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-amber-500/10 via-indigo-600/10 to-purple-600/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
            <Video className="w-4 h-4 text-amber-400" />
            <span>Project Video Demonstration</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Advance Python Lab Project Demo
          </h2>

          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Authentic screen recording walkthrough of my <span className="text-amber-300 font-semibold">Advance Python Programming Lab Project</span>, demonstrating live code execution, modular system architecture, and technical storytelling presented in the computer lab.
          </p>
        </div>

        {/* Video Showcase Card */}
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.08)]">
          {/* Top Video Header Bar */}
          <div className="p-4 sm:p-5 bg-white/[0.02] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-white font-mono">
                Screen Recording 2026-10-28 • Full HD Demo
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Storytelling Lab Project
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
                This screen recording captures the complete execution flow of our Advance Python programming project, demonstrating input parsing, algorithmic processing, state persistence, and formatted output generation on the lab workstations.
              </p>
            </div>

            {/* Col 2: Key Milestones Covered */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Concepts Demonstrated</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Modular Python function design & structured error recovery</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Live interactive terminal input, validation, and output logs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Aligned with lab storytelling event reviewed by Sharmila Banu Mam</span>
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
                  Presented alongside the computer lab storytelling session where project decisions, code structure, and runtime execution were showcased directly at the workstation.
                </p>
              </div>

              <div className="pt-4 border-t border-amber-500/20 mt-4 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Faculty Review:</span>
                <span className="font-bold text-amber-300">Sharmila Banu Mam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
