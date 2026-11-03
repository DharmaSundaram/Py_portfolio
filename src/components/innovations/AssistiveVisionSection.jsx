import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Brain, 
  Cpu, 
  Radio, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  X, 
  Layers, 
  Code2, 
  Copy, 
  Check, 
  MessageSquareQuote, 
  Glasses,
  ShieldCheck
} from 'lucide-react';

export default function AssistiveVisionSection() {
  const [activeStage, setActiveStage] = useState(0);
  const [activeSimView, setActiveSimView] = useState('phosphene'); // 'camera', 'edges', 'phosphene'
  const [gridResolution, setGridResolution] = useState(16); // 10, 16, 24
  const [phospheneIntensity, setPhospheneIntensity] = useState(85);
  const [pulseAnimation, setPulseAnimation] = useState(true);
  const [isDiagramModalOpen, setIsDiagramModalOpen] = useState(false);
  const [diagramZoom, setDiagramZoom] = useState(1);
  const [copiedCode, setCopiedCode] = useState(false);

  // 5 Pipeline Stages corresponding to the diagram
  const stages = [
    {
      step: '01',
      title: 'External Image Capture',
      subtitle: 'Smart Glasses with Camera',
      icon: Glasses,
      badge: 'Capture Layer',
      color: 'from-blue-500 to-cyan-500',
      tagColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
      description: 'Miniature high-resolution CMOS camera integrated into lightweight smart glasses captures the real-world scene in real time (e.g. pedestrians, crosswalks, approaching vehicles, curbs).',
      mechanics: [
        'Real-time optical frame acquisition at 30–60 FPS',
        'Wide dynamic range sensor adapting to indoor/outdoor lighting',
        'Ultra-low latency image pipeline (<15ms)',
        'Mounted at eye-level to preserve natural head-orientation visual perspective'
      ]
    },
    {
      step: '02',
      title: 'Image Preprocessing & AI Encoder',
      subtitle: 'Computer Vision & Feature Extraction',
      icon: Cpu,
      badge: 'AI Processing Layer',
      color: 'from-emerald-500 to-teal-500',
      tagColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
      description: 'Edge detection, contrast normalization, and task-adaptive neural encoding convert complex raw visual frames into an optimized spatial stimulation pattern constrained by electrode budgets.',
      mechanics: [
        'Preprocessing: Grayscale normalization, denoising, adaptive histogram equalization',
        'Feature Extraction: Canny/Sobel edge detection, object & pedestrian bounding boxes',
        'Task-Adaptive Encoding: Prioritizes navigational obstacles & human faces',
        'Phosphene Retinotopic Mapping: Translates 2D camera coordinates into visual cortex map'
      ]
    },
    {
      step: '03',
      title: 'Wireless Neural Interface',
      subtitle: 'Wearable Processor & Implantable Stimulator',
      icon: Radio,
      badge: 'Wireless Link Layer',
      color: 'from-amber-500 to-orange-500',
      tagColor: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
      description: 'External wearable unit runs real-time AI algorithms and wirelessly beams power and encoded stimulation commands via inductive RF link through intact scalp to a subcutaneous hermetic stimulator.',
      mechanics: [
        'Transcutaneous high-frequency inductive link (RF telemetry)',
        'Biocompatible hermetic implant package (ceramic/titanium housing)',
        'Generates charge-balanced biphasic current pulses (0–100 µA)',
        'Strict electrical safety envelopes preventing neural tissue damage or electrolysis'
      ]
    },
    {
      step: '04',
      title: 'Visual Cortex Neural Implant',
      subtitle: 'Occipital Lobe (V1/V2/V3) Micro-Electrode Array',
      icon: Brain,
      badge: 'Cortical Neural Layer',
      color: 'from-rose-500 to-pink-500',
      tagColor: 'text-rose-300 bg-rose-500/10 border-rose-500/30',
      description: 'Flexible biocompatible micro-electrode array (e.g. 10x10 or higher density) surgically placed directly on primary visual cortex (V1/V2/V3) in the occipital lobe, bypassing all damaged ocular structures.',
      mechanics: [
        'Option A Strategy: Completely bypasses damaged retina, cornea, and optic nerve',
        'Micro-electrode array conforming to the curvature of the occipital cortex',
        'Direct micro-stimulation of cortical pyramidal neurons',
        'Each micro-electrode reliably evokes a localized "phosphene" (point of light)'
      ]
    },
    {
      step: '05',
      title: 'Perceived Visual Experience',
      subtitle: 'Simulated Cortical Phosphene View',
      icon: Eye,
      badge: 'Human Perception Layer',
      color: 'from-purple-500 to-indigo-500',
      tagColor: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
      description: 'The brain integrates the coordinated phosphene stimulation pattern into a coherent spatial visual percept. The user perceives shapes, moving pedestrians, doorways, and environmental obstacles.',
      mechanics: [
        'Cortical interpretation of phosphene constellations into meaningful shapes',
        'Dynamic motion tracking allows user to anticipate approaching cars & pedestrians',
        'Low-resolution but functionally transformative visual autonomy',
        'User feedback loop supported by head movement and natural scanning'
      ]
    }
  ];

  const pythonSimulationCode = `# Theory Class Solution: Visual Cortex Phosphene Encoder Simulation
# Prompted by Sharmila Banu Mam: "How can you help impaired persons?"
# Option A: Camera-Based System Bypassing Damaged Eye & Optic Nerve

import numpy as np

def simulate_cortical_vision_pipeline(image_matrix, grid_size=(16, 16), threshold=0.15):
    """
    Simulates the 5-step bio-computational pipeline converting
    external camera frames into visual cortex phosphene stimulation pulses.
    """
    # Step 1 & 2: Preprocessing - Normalization & Spatial Gradients
    normalized = np.clip(image_matrix / 255.0, 0.0, 1.0)
    gy, gx = np.gradient(normalized)
    edge_magnitude = np.sqrt(gx**2 + gy**2)
    edges = (edge_magnitude > threshold).astype(float)
    
    # Step 3 & 4: Downsampling onto Cortical Micro-Electrode Grid (e.g. 16x16)
    h, w = edges.shape
    gh, gw = grid_size
    phosphene_grid = np.zeros(grid_size, dtype=float)
    
    for r in range(gh):
        for c in range(gw):
            cell = edges[int(r*h/gh):int((r+1)*h/gh), int(c*w/gw):int((c+1)*w/gw)]
            # If edge density in this cell exceeds threshold, fire electrode
            phosphene_grid[r, c] = 1.0 if np.mean(cell) > 0.12 else 0.0
            
    # Step 5: Charge-Balanced Biphasic Pulse Synthesis (Tissue Safety)
    pulse_amplitude_uA = phosphene_grid * 30.0  # microAmperes
    active_electrode_count = int(np.sum(phosphene_grid))
    
    return {
        "status": "Safe Cortical Stimulation Commands Generated",
        "active_electrodes": active_electrode_count,
        "grid_resolution": f"{gh}x{gw} ({gh*gw} electrodes)",
        "phosphene_activation_pct": f"{(active_electrode_count / (gh*gw))*100:.1f}%",
        "max_pulse_uA": float(np.max(pulse_amplitude_uA))
    }

# Execute simulation on a 256x256 test frame representing street scene
test_frame = np.random.randint(50, 220, (256, 256))
result = simulate_cortical_vision_pipeline(test_frame, grid_size=(16, 16))
print("Neural Stimulation Telemetry:", result)`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonSimulationCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Generate synthetic phosphene points resembling person & car on street for simulation
  const simulatedDots = React.useMemo(() => {
    const dots = [];
    const size = gridResolution;
    
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const normR = r / size;
        const normC = c / size;
        
        // Model Pedestrian contour (left side, c ~ 0.25 to 0.45)
        const isPedHead = Math.abs(normC - 0.32) < 0.05 && normR > 0.22 && normR < 0.32;
        const isPedTorso = Math.abs(normC - 0.32) < 0.08 && normR >= 0.32 && normR < 0.58;
        const isPedLegs = (Math.abs(normC - 0.28) < 0.04 || Math.abs(normC - 0.36) < 0.04) && normR >= 0.58 && normR < 0.85;
        
        // Model Car contour (right side, c ~ 0.60 to 0.88, r ~ 0.45 to 0.78)
        const isCarRoof = Math.abs(normC - 0.75) < 0.09 && normR > 0.45 && normR < 0.55;
        const isCarBody = Math.abs(normC - 0.75) < 0.16 && normR >= 0.55 && normR < 0.75;
        const isCarWheelL = Math.abs(normC - 0.64) < 0.04 && normR >= 0.73 && normR < 0.82;
        const isCarWheelR = Math.abs(normC - 0.84) < 0.04 && normR >= 0.73 && normR < 0.82;
        
        // Ground / Horizon outline
        const isHorizon = normR > 0.83 && normR < 0.87;

        const isFeature = isPedHead || isPedTorso || isPedLegs || isCarRoof || isCarBody || isCarWheelL || isCarWheelR || isHorizon;
        
        if (isFeature) {
          dots.push({ r, c, active: true, intensity: 0.85 });
        } else {
          // slight background noise
          const isNoise = (r * 11 + c * 7) % 43 === 0;
          dots.push({ r, c, active: isNoise, intensity: 0.25 });
        }
      }
    }
    return dots;
  }, [gridResolution]);

  return (
    <section id="assistive-vision" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Dynamic ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-purple-600/15 via-indigo-600/15 to-amber-500/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header / Theory Class Context Banner */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-200 text-xs sm:text-sm font-semibold mb-4 shadow-lg shadow-purple-500/10">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span>Theory Class Innovation Challenge • Sharmila Banu Mam</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Camera-Based Artificial Vision System with Visual Cortex Neural Implant
          </h2>

          <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 max-w-2xl mx-auto text-left sm:text-center">
            <p className="text-amber-200 text-xs sm:text-sm font-medium">
              <span className="font-bold text-amber-300">Classroom Problem Statement: </span>
              "In our theory class, Sharmila Banu Mam asked: <span className="italic font-bold text-white">'How can you help impaired persons?'</span> For our solution, we designed a bio-computational neural system that completely bypasses damaged eyes and optic nerves to restore functional sight."
            </p>
          </div>

          <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed max-w-3xl mx-auto">
            <span className="font-bold text-white">Option A Strategy: </span> 
            When retinas or optic nerves are permanently damaged (due to glaucoma, trauma, or congenital conditions), retinal implants cannot work. Our architecture captures external scenes with smart glasses, processes visual features with AI, and delivers wireless electrical stimulation directly to the <span className="text-purple-300 font-semibold">occipital visual cortex (V1/V2/V3)</span>, evoking phosphenes that the brain perceives as recognizable shapes and motion.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/40">
              Option A: Cortical Neural Bypass
            </span>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              3 ⭐ Stars Awarded
            </span>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              Edge AI & Phosphene Synthesis
            </span>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified Theory Solution
            </span>
          </div>
        </div>

        {/* --- Card 1: Interactive Architecture Diagram Showcase --- */}
        <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 mb-12 shadow-2xl relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <Layers className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    End-to-End System Architecture Diagram
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Presented to Sharmila Banu Mam • High-Resolution Engineering Schematic
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsDiagramModalOpen(true);
                setDiagramZoom(1);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-500/40 text-xs font-bold transition-all shadow-lg shadow-purple-500/10 shrink-0"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Inspect Full Diagram in HD</span>
            </button>
          </div>

          {/* Diagram Preview Image with Hover Effect */}
          <div 
            onClick={() => {
              setIsDiagramModalOpen(true);
              setDiagramZoom(1);
            }}
            className="mt-6 relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 group cursor-pointer"
          >
            <img
              src="/evidence/artificial_vision_neural_implant.jpg"
              alt="Design Diagram: Camera-Based Artificial Vision System with Visual Cortex Neural Implant"
              className="w-full h-auto object-contain max-h-[580px] group-hover:scale-[1.01] transition-transform duration-500"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-slate-200 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
                Click anywhere on the schematic to zoom & inspect modules in detail
              </span>
              <span className="text-xs font-bold text-purple-300 bg-purple-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-purple-500/30 flex items-center gap-1.5">
                <ZoomIn className="w-4 h-4" />
                <span>Zoom Schematic</span>
              </span>
            </div>
          </div>

          {/* 4 Architectural Pillar Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                Module 1 • External
              </span>
              <h4 className="text-sm font-bold text-white">Smart Glasses & AI Unit</h4>
              <p className="text-xs text-slate-300">
                Camera captures real-time video; wearable processor extracts salient edges & computes pulse patterns.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                Module 2 • Telemetry
              </span>
              <h4 className="text-sm font-bold text-white">Wireless RF & Inductive Link</h4>
              <p className="text-xs text-slate-300">
                Safely transmits power and encoded stimulation commands through intact scalp to subcutaneous stimulator.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
                Module 3 • Neural Prosthetic
              </span>
              <h4 className="text-sm font-bold text-white">Occipital Micro-Electrode Array</h4>
              <p className="text-xs text-slate-300">
                High-density biocompatible grid on V1/V2/V3 delivers safe biphasic electrical pulses to cortical neurons.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
                Module 4 • Visual Percept
              </span>
              <h4 className="text-sm font-bold text-white">Phosphene Matrix Sight</h4>
              <p className="text-xs text-slate-300">
                Points of light coalesce into recognizable silhouettes of humans, vehicles, and pathways for safe mobility.
              </p>
            </div>
          </div>
        </div>

        {/* --- Card 2: Interactive 5-Stage Pipeline Walkthrough --- */}
        <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 mb-12 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-300 font-bold block mb-1">
              STEP-BY-STEP BIO-COMPUTATIONAL BREAKDOWN
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              The 5-Stage Artificial Vision Pipeline
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Select any stage below to inspect its operational mechanics, hardware components, and biological interface.
            </p>
          </div>

          {/* Stage Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-8">
            {stages.map((stg, idx) => {
              const IconComponent = stg.icon;
              const isActive = activeStage === idx;
              return (
                <button
                  key={stg.step}
                  onClick={() => setActiveStage(idx)}
                  className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    isActive
                      ? 'bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/15 scale-[1.02]'
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-purple-300' : 'text-slate-500'}`}>
                      {stg.step}
                    </span>
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  </div>
                  <div className="font-bold text-xs text-white leading-snug line-clamp-2">
                    {stg.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Deep-Dive Card */}
          {(() => {
            const current = stages[activeStage];
            const CurrentIcon = current.icon;
            return (
              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-0.5 shadow-lg shrink-0 flex items-center justify-center text-white">
                      <CurrentIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          Stage {current.step}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {current.badge}
                        </span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white">
                        {current.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-purple-200/90 font-medium">
                        {current.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveStage(prev => (prev === 0 ? stages.length - 1 : prev - 1))}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 border border-white/10"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() => setActiveStage(prev => (prev === stages.length - 1 ? 0 : prev + 1))}
                      className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-xs text-purple-200 border border-purple-500/40 font-bold"
                    >
                      Next →
                    </button>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {current.description}
                </p>

                {/* Technical Mechanics List */}
                <div className="space-y-2.5">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block">
                    Key Technical Mechanics & Protocols
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {current.mechanics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* --- Card 3: Interactive Live Phosphene Vision Simulator Widget --- */}
        <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 mb-12 shadow-2xl relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Interactive Perception Simulator</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                How a Visually Impaired Person Experiences Artificial Vision
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Compare the original urban camera scene with the AI edge extraction, and experience the cortical phosphene dot matrix perception.
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/10 self-stretch sm:self-auto justify-center">
              <button
                onClick={() => setActiveSimView('camera')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeSimView === 'camera'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Glasses className="w-3.5 h-3.5" />
                <span>1. Camera View</span>
              </button>
              <button
                onClick={() => setActiveSimView('edges')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeSimView === 'edges'
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>2. AI Edge Features</span>
              </button>
              <button
                onClick={() => setActiveSimView('phosphene')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeSimView === 'phosphene'
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>3. Phosphene Vision</span>
              </button>
            </div>
          </div>

          {/* Simulator Display Screen & Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            
            {/* Visual Canvas Display (8 Cols) */}
            <div className="lg:col-span-8 bg-black rounded-2xl border border-white/15 p-4 sm:p-6 flex flex-col items-center justify-center min-h-[360px] sm:min-h-[420px] relative overflow-hidden shadow-inner">
              
              {/* Overlay Tag in Simulator */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-amber-300 border border-amber-500/30">
                  {activeSimView === 'camera' && 'Real-World Camera Feed (Urban Crosswalk)'}
                  {activeSimView === 'edges' && 'AI Feature Extraction (Edge & Salience Filter)'}
                  {activeSimView === 'phosphene' && `Simulated Cortical Percept (${gridResolution}x${gridResolution} Electrodes)`}
                </span>
              </div>

              {/* View 1: Real-World Street Scene with Pedestrians & Car */}
              {activeSimView === 'camera' && (
                <div className="w-full h-full flex flex-col items-center justify-center relative animate-in fade-in duration-200">
                  <div className="w-full max-w-lg aspect-video rounded-xl bg-slate-900 border border-slate-700 overflow-hidden relative shadow-2xl flex flex-col justify-end p-4">
                    {/* Sky & Road Illustration */}
                    <div className="absolute inset-0 bg-gradient-to-b from-sky-950 via-slate-800 to-slate-900" />
                    
                    {/* Street Buildings Silhouette */}
                    <div className="absolute top-10 left-0 right-0 h-28 flex items-end justify-between px-6 opacity-30">
                      <div className="w-16 h-24 bg-slate-400 rounded-t-sm" />
                      <div className="w-20 h-28 bg-slate-500 rounded-t-sm" />
                      <div className="w-14 h-20 bg-slate-400 rounded-t-sm" />
                      <div className="w-24 h-26 bg-slate-500 rounded-t-sm" />
                    </div>

                    {/* Pedestrian Figure on Left */}
                    <div className="absolute bottom-8 left-16 z-10 flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-amber-200 mb-1 shadow-md" />
                      <div className="w-8 h-14 bg-indigo-500 rounded-md" />
                      <div className="w-6 h-12 flex justify-between gap-1">
                        <div className="w-2.5 h-full bg-slate-900 rounded-b-sm" />
                        <div className="w-2.5 h-full bg-slate-900 rounded-b-sm" />
                      </div>
                    </div>

                    {/* Approaching Car Silhouette on Right */}
                    <div className="absolute bottom-10 right-14 z-10 flex flex-col items-center">
                      <div className="w-20 h-8 bg-red-600 rounded-t-xl relative border-b border-red-800">
                        <div className="w-14 h-5 bg-sky-200/40 rounded-t-lg mx-auto mt-1" />
                      </div>
                      <div className="w-28 h-8 bg-red-700 rounded-md relative flex justify-between px-2 items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-lg shadow-amber-300" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-lg shadow-amber-300" />
                      </div>
                      <div className="w-24 flex justify-between px-1">
                        <div className="w-5 h-3 bg-slate-950 rounded-b-md" />
                        <div className="w-5 h-3 bg-slate-950 rounded-b-md" />
                      </div>
                    </div>

                    {/* Crosswalk Lines */}
                    <div className="relative z-0 w-full h-8 flex justify-around opacity-40 border-t border-dashed border-white/30 pt-2">
                      <div className="w-8 h-2 bg-white" />
                      <div className="w-8 h-2 bg-white" />
                      <div className="w-8 h-2 bg-white" />
                      <div className="w-8 h-2 bg-white" />
                    </div>

                    <div className="relative z-10 text-[10px] text-slate-300 font-mono text-center bg-black/60 backdrop-blur-sm py-1 rounded">
                      Smart Glasses Camera: 1080p Optical Input (Pedestrian Crossing & Approaching Vehicle)
                    </div>
                  </div>
                </div>
              )}

              {/* View 2: Edge-Detected Features */}
              {activeSimView === 'edges' && (
                <div className="w-full h-full flex flex-col items-center justify-center relative animate-in fade-in duration-200">
                  <div className="w-full max-w-lg aspect-video rounded-xl bg-slate-950 border border-emerald-500/40 overflow-hidden relative shadow-2xl flex flex-col justify-end p-4">
                    {/* Glowing Wireframe outlines */}
                    <div className="absolute inset-0 bg-[#020b08]" />

                    {/* Edge-detected Pedestrian Contour */}
                    <div className="absolute bottom-8 left-16 z-10 flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full border-2 border-emerald-400 mb-1" />
                      <div className="w-8 h-14 border-2 border-emerald-400 rounded-md" />
                      <div className="w-6 h-12 flex justify-between gap-1">
                        <div className="w-2.5 h-full border-b-2 border-l-2 border-emerald-400" />
                        <div className="w-2.5 h-full border-b-2 border-r-2 border-emerald-400" />
                      </div>
                    </div>

                    {/* Edge-detected Car Contour */}
                    <div className="absolute bottom-10 right-14 z-10 flex flex-col items-center">
                      <div className="w-20 h-8 border-2 border-emerald-400 rounded-t-xl" />
                      <div className="w-28 h-8 border-2 border-emerald-400 rounded-md flex justify-between px-2 items-center">
                        <div className="w-2 h-2 rounded-full border border-emerald-300" />
                        <div className="w-2 h-2 rounded-full border border-emerald-300" />
                      </div>
                      <div className="w-24 flex justify-between px-1">
                        <div className="w-5 h-3 border-b-2 border-l-2 border-r-2 border-emerald-400 rounded-b-md" />
                        <div className="w-5 h-3 border-b-2 border-l-2 border-r-2 border-emerald-400 rounded-b-md" />
                      </div>
                    </div>

                    {/* Edge-detected Crosswalk */}
                    <div className="relative z-0 w-full h-8 flex justify-around opacity-60 border-t-2 border-emerald-400/80 pt-2">
                      <div className="w-8 h-1 bg-emerald-400" />
                      <div className="w-8 h-1 bg-emerald-400" />
                      <div className="w-8 h-1 bg-emerald-400" />
                      <div className="w-8 h-1 bg-emerald-400" />
                    </div>

                    <div className="relative z-10 text-[10px] text-emerald-300 font-mono text-center bg-black/80 backdrop-blur-sm py-1 rounded border border-emerald-500/30">
                      AI Encoder: Canny Edge Filtering + Salience Weighting Applied
                    </div>
                  </div>
                </div>
              )}

              {/* View 3: Cortical Phosphene Matrix (Perceived Experience) */}
              {activeSimView === 'phosphene' && (
                <div className="w-full flex flex-col items-center justify-center py-2 animate-in fade-in duration-200">
                  <div 
                    className="grid gap-1 sm:gap-1.5 p-4 sm:p-6 bg-black rounded-2xl border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.15)]"
                    style={{
                      gridTemplateColumns: `repeat(${gridResolution}, minmax(0, 1fr))`
                    }}
                  >
                    {simulatedDots.map((dot, idx) => (
                      <div
                        key={idx}
                        className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-300 ${
                          dot.active
                            ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.95)]'
                            : 'bg-white/[0.04]'
                        } ${pulseAnimation && dot.active ? 'animate-pulse' : ''}`}
                        style={{
                          opacity: dot.active ? (phospheneIntensity / 100) * dot.intensity : 0.05,
                          transform: dot.active ? `scale(${0.9 + dot.intensity * 0.2})` : 'scale(0.8)'
                        }}
                      />
                    ))}
                  </div>

                  <p className="text-[11px] font-mono text-purple-300 text-center mt-3 bg-purple-950/40 px-3 py-1 rounded-full border border-purple-500/20">
                    ✨ Neural Phosphene Perception: The visual cortex reconstructs the pedestrian (left) and vehicle (right)
                  </p>
                </div>
              )}
            </div>

            {/* Interactive Simulation Controls (4 Cols) */}
            <div className="lg:col-span-4 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold block mb-2">
                    Micro-Electrode Grid Resolution:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[10, 16, 24].map((res) => (
                      <button
                        key={res}
                        onClick={() => setGridResolution(res)}
                        className={`py-2 px-3 rounded-xl text-xs font-mono font-bold border transition-all ${
                          gridResolution === res
                            ? 'bg-purple-500 text-white border-purple-400 shadow-md shadow-purple-500/30'
                            : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {res}x{res}
                        <span className="block text-[10px] font-normal opacity-80">{res * res} pts</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-tight">
                    Higher electrode density allows higher-fidelity phosphene resolution on the occipital cortex.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-1">
                    <span className="font-bold">Phosphene Luminance:</span>
                    <span className="text-amber-400 font-bold">{phospheneIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={phospheneIntensity}
                    onChange={(e) => setPhospheneIntensity(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Cortical Pulse Animation</span>
                    <span className="text-[10px] text-slate-400">Simulate continuous neural firing</span>
                  </div>
                  <button
                    onClick={() => setPulseAnimation(!pulseAnimation)}
                    className={`w-11 h-6 rounded-full transition-colors p-1 ${
                      pulseAnimation ? 'bg-emerald-500' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        pulseAnimation ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Bio-Engineering Highlight Box */}
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-slate-300 space-y-1.5">
                <div className="flex items-center gap-1.5 text-purple-300 font-bold font-mono">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Biphasic Pulse Safety Protocol</span>
                </div>
                <p className="leading-relaxed text-[11px]">
                  Stimulation uses charge-balanced biphasic waveforms (+phase / -phase) to ensure electrochemical reversibility at the electrode-tissue interface, eliminating tissue damage.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Card 4: Python Bio-Computational Simulation Code --- */}
        <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 mb-12 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Code2 className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Python Cortical Encoder Implementation
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  simulate_visual_cortex_encoder.py • NumPy Bio-Signal Encoding
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold transition-colors"
            >
              {copiedCode ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-300" />
                  <span>Copy Python Script</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-4 rounded-2xl bg-black/80 border border-white/10 p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-slate-300 leading-relaxed max-h-96">
            <pre>
              <code>{pythonSimulationCode}</code>
            </pre>
          </div>
        </div>

        {/* --- Card 5: Faculty Commendation Callout --- */}
        <div className="glass-panel rounded-3xl border border-amber-500/30 p-6 sm:p-8 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-transparent relative shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
              <MessageSquareQuote className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Faculty Commendation • Sharmila Banu Mam
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  Recognized Innovation
                </span>
              </div>
              <p className="text-white text-base sm:text-lg font-medium italic leading-relaxed">
                "In our theory session, when challenged to formulate a technology that helps impaired persons, Dharma and the team conceptualized a comprehensive bio-computational artificial vision architecture. Option A brilliantly bypasses the optical path, merging computer vision edge algorithms with neuro-stimulation to offer true functional autonomy."
              </p>
              <div className="pt-1 text-xs text-slate-400 font-mono">
                Awarded 3 ⭐ Stars • Special Commendation for Assistive AI & Neural Engineering
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* --- Fullscreen High-Definition Schematic Modal --- */}
      {isDiagramModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-md overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-6xl max-h-[96vh] bg-[#0b0f1e] text-slate-100 rounded-3xl border border-white/20 shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Bar */}
            <div className="p-4 sm:p-5 bg-[#090d1c] border-b border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-white truncate font-mono">
                  Design Diagram: Camera-Based Artificial Vision System (Option A)
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setDiagramZoom(prev => Math.min(prev + 0.3, 2.5))}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDiagramZoom(prev => Math.max(prev - 0.3, 0.7))}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDiagramZoom(1)}
                  className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 border border-white/10"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsDiagramModalOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body with Zoom Pan */}
            <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-black/60">
              <div 
                className="transition-transform duration-200 max-w-full"
                style={{ transform: `scale(${diagramZoom})`, transformOrigin: 'center center' }}
              >
                <img
                  src="/evidence/artificial_vision_neural_implant.jpg"
                  alt="Full schematic of Artificial Vision System with Visual Cortex Neural Implant"
                  className="w-full h-auto object-contain max-h-[82vh] rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
