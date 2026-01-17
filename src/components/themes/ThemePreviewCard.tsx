

import React from 'react';
import { Theme } from './themes';
import { patternRenderers, PatternId } from './patterns'; 
import { isDarkTheme, getContrastingTextColor } from './utils/themeUtils';

interface ThemePreviewCardProps {
  theme: Theme & { isLocked: boolean; recommendedFor: string[] };
  isActive: boolean;
  isLocked: boolean;
  onSelect: () => void;
}

export const ThemePreviewCard: React.FC<ThemePreviewCardProps> = ({
  theme,
  isActive,
  isLocked,
  onSelect,
}) => {
  // 1. Get the correct pattern renderer

  const PatternComponent = patternRenderers[theme.pattern as PatternId];
  
  // 2. Safe color calculation
  const isDark = theme.textColor ? isDarkTheme(theme.textColor) : false;
  const buttonTextColor = theme.accentColor ? getContrastingTextColor(theme.accentColor) : '#000';

  return (
    <div 
      onClick={onSelect}
      className={`group relative flex flex-col w-full aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isActive 
          ? "ring-4 ring-offset-4 ring-blue-500 shadow-xl scale-[1.02]" 
          : "hover:shadow-xl hover:-translate-y-1 shadow-sm ring-1 ring-black/5"
      }`}
    >
      {/* Background & Pattern */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110"
        style={{ background: theme.gradient }}
      >
        {/* Render Pattern with correct opacity */}
        {PatternComponent && <PatternComponent opacity={0.15} />}
      </div>

      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-20 backdrop-blur-sm bg-black/40 flex flex-col items-center justify-center text-white transition-opacity">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-3">
            🔒
          </div>
          <span className="font-semibold tracking-wide uppercase text-sm">
            Unlock {theme.tier}
          </span>
        </div>
      )}

      {/* Content Overlay */}
      <div className={`relative z-10 h-full flex flex-col justify-between p-5 ${isLocked ? 'opacity-40' : 'opacity-100'}`}>
        
        {/* Top Badges */}
        <div className="flex justify-between items-start">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg backdrop-blur-md"
            style={{ 
              backgroundColor: theme.accentColor, 
              color: buttonTextColor 
            }}
          >
            {theme.badge}
          </div>
          
          {isActive && (
            <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-bold shadow-md">
              ✓
            </span>
          )}
        </div>

        {/* Bottom Info */}
        <div>
          <h3 
            className="text-xl font-bold mb-1 leading-tight truncate"
            style={{ color: theme.textColor }}
          >
            {theme.name}
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-2">
             <span className={`text-[10px] px-2 py-0.5 rounded-md border uppercase tracking-wider font-semibold ${
               isDark ? 'border-white/20 text-white/70' : 'border-black/10 text-black/60'
             }`}>
               {theme.category}
             </span>
             {theme.tier !== 'free' && (
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-yellow-400/90 text-yellow-900 border border-yellow-500/20 uppercase tracking-wider font-bold">
                  {theme.tier}
                </span>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};