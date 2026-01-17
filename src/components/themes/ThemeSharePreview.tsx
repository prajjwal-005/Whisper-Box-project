import React from 'react';
import { Theme } from './themes';
import { patternRenderers, PatternId } from './patterns';

interface ThemeSharePreviewProps {
  theme: Theme;
}

export const ThemeSharePreview: React.FC<ThemeSharePreviewProps> = ({ theme }) => {
  // Get the specific pattern component safely
  const PatternComponent = patternRenderers[theme.pattern as PatternId];

  return (
    <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-xl relative select-none group ring-1 ring-black/5">
      {/* 1. Background Gradient */}
      <div 
        className="w-full h-full flex flex-col items-center justify-between p-6 sm:p-8 relative transition-transform duration-500"
        style={{ background: theme.gradient }}
      >
        {/* 2. Pattern Layer (Optimized Blending) */}
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none mix-blend-overlay">
          {PatternComponent && <PatternComponent opacity={0.6} />}
        </div>

        {/* 3. Top Section (Badge/Emoji) */}
        <div className="relative z-10 flex flex-col items-center gap-2 mt-1">
          <span className="text-6xl drop-shadow-md filter transition-transform duration-300 group-hover:scale-110">
            
          </span>
        </div>

        {/* 4. Mock Message Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center w-full my-2">
          <div className="text-center relative max-w-full">
            <span className="block text-5xl text-white/30 font-serif leading-none mb-0">“</span>
            <p className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-lg italic leading-tight px-3 break-words">
              I've never told anyone this, but I secretly admire you
            </p>
            <span className="block text-5xl text-white/30 font-serif leading-none mt-4">”</span>
          </div>
        </div>

        {/* 5. Footer Branding */}
        <div className="relative z-10 flex flex-col items-center gap-2 w-full mb-1">
          <div className="bg-black/30 backdrop-blur-md text-white text-[10px] sm:text-xs px-5 py-1.5 rounded-full font-bold shadow-lg border border-white/20 flex items-center gap-2">
            <span>Reply on</span>
            <span className="text-cyan-300">whisper-box.xyz</span>
          </div>
          <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase">
           
          </span>
        </div>
      </div>
    </div>
  );
};