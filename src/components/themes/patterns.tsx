import React from 'react';

export type FreePatternId = 
  | "paper-grain" 
  | "halftone" 
  | "grid-dots" 
  | "soft-waves"
  | "simple-lines"
  | "basic-circles"
  | "minimal-cross"
  | "light-texture";

export type ProPatternId =
  | "concrete-texture" 
  | "candy-dots" 
  | "water-ripples" 
  | "marble-veins"
  | "hexagon-pattern"
  | "wave-gradient"
  | "dot-matrix"
  | "diagonal-lines";

export type PremiumPatternId =
  | "volcanic-cracks" 
  | "chrome-reflection" 
  | "thermal-scan" 
  | "mist-layers"
  | "liquid-flow"
  | "neural-web"
  | "aurora-waves"
  | "crystal-prism"
  | "quantum-particles"
  | "heat-shimmer"
  | "nebula-cloud"
  | "scale-armor"
  | "ice-fractal";

export type PatternId = FreePatternId | ProPatternId | PremiumPatternId;

export const patternRenderers: Record<PatternId, React.FC<{ opacity?: number }>> = {
  "paper-grain": ({ opacity = 0.08 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      {Array.from({ length: 300 }).map((_, i) => (
        <circle key={i} cx={(i * 47 + 123) % 600} cy={(i * 83 + 217) % 600} r="0.6" fill="white" opacity="0.25" />
      ))}
    </svg>
  ),

  "halftone": ({ opacity = 0.1 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      {Array.from({ length: 15 }).map((_, row) =>
        Array.from({ length: 15 }).map((_, col) => {
          const size = 1.5 + ((row + col) % 3) * 1;
          return <circle key={`${row}-${col}`} cx={20 + col * 40} cy={20 + row * 40} r={size} fill="white" opacity="0.3" />;
        })
      )}
    </svg>
  ),

  "grid-dots": ({ opacity = 0.09 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      {Array.from({ length: 20 }).map((_, row) =>
        Array.from({ length: 20 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={15 + col * 30} cy={15 + row * 30} r="1.2" fill="white" opacity="0.4" />
        ))
      )}
    </svg>
  ),

  "soft-waves": ({ opacity = 0.11 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, opacity }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <path key={i} d={`M0,${80 + i * 80} Q150,${50 + i * 80} 300,${80 + i * 80} T600,${80 + i * 80}`} fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />
      ))}
    </svg>
  ),

  "simple-lines": ({ opacity = 0.07 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, opacity }}>
      {Array.from({ length: 30 }).map((_, i) => (
        <line key={i} x1="0" y1={i * 20} x2="600" y2={i * 20} stroke="white" strokeWidth="1" opacity="0.25" />
      ))}
    </svg>
  ),

  "basic-circles": ({ opacity = 0.09 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={i} cx={(i * 97 + 100) % 600} cy={(i * 127 + 100) % 600} r={20 + (i % 3) * 10} fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
      ))}
    </svg>
  ),

  "minimal-cross": ({ opacity = 0.08 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      {Array.from({ length: 10 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => (
          <g key={`${row}-${col}`}>
            <line x1={30 + col * 60} y1={25 + row * 60} x2={30 + col * 60} y2={35 + row * 60} stroke="white" strokeWidth="1" opacity="0.3" />
            <line x1={25 + col * 60} y1={30 + row * 60} x2={35 + col * 60} y2={30 + row * 60} stroke="white" strokeWidth="1" opacity="0.3" />
          </g>
        ))
      )}
    </svg>
  ),

  "light-texture": ({ opacity = 0.06 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      {Array.from({ length: 40 }).map((_, i) => (
        <rect key={i} x={(i * 61 + 17) % 590} y={(i * 103 + 29) % 590} width={3 + (i % 2) * 2} height={3 + (i % 2) * 2} fill="white" opacity="0.2" />
      ))}
    </svg>
  ),

  // ===== PRO TIER =====
  "concrete-texture": ({ opacity = 0.13 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      {Array.from({ length: 60 }).map((_, i) => (
        <rect key={i} x={(i * 73 + 41) % 580} y={(i * 127 + 89) % 580} width={(i % 3) * 15 + 12} height={(i % 4) * 8 + 6} fill="white" opacity="0.2" transform={`rotate(${(i * 17) % 90} ${(i * 73 + 41) % 580} ${(i * 127 + 89) % 580})`} />
      ))}
    </svg>
  ),

  "candy-dots": ({ opacity = 0.16 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      {Array.from({ length: 35 }).map((_, i) => (
        <circle key={i} cx={(i * 89 + 67) % 600} cy={(i * 137 + 103) % 600} r={5 + (i % 3) * 3} fill="white" opacity="0.4" />
      ))}
    </svg>
  ),

  "water-ripples": ({ opacity = 0.14 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      {[60, 120, 180, 240, 300, 360].map((radius, i) => (
        <circle key={i} cx="300" cy="300" r={radius} fill="none" stroke="white" strokeWidth="2" opacity={0.4 - i * 0.05} />
      ))}
    </svg>
  ),

  "marble-veins": ({ opacity = 0.15 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, opacity }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <path key={i} d={`M${i * 50},0 Q${i * 50 + 30},${120 + i * 25} ${i * 50 + 15},300 T${i * 50 + 8},600`} fill="none" stroke="white" strokeWidth="2.5" opacity="0.3" />
      ))}
    </svg>
  ),

  "hexagon-pattern": ({ opacity = 0.14 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 7 }).map((_, col) => {
          const x = 40 + col * 80 + (row % 2) * 40;
          const y = 40 + row * 70;
          return <polygon key={`${row}-${col}`} points={`${x},${y-25} ${x+22},${y-12.5} ${x+22},${y+12.5} ${x},${y+25} ${x-22},${y+12.5} ${x-22},${y-12.5}`} fill="none" stroke="white" strokeWidth="1.5" opacity="0.35" />;
        })
      )}
    </svg>
  ),

  "wave-gradient": ({ opacity = 0.15 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, opacity }}>
      <defs>
        <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {Array.from({ length: 8 }).map((_, i) => (
        <path key={i} d={`M0,${60 + i * 70} Q150,${30 + i * 70} 300,${60 + i * 70} T600,${60 + i * 70}`} fill="none" stroke="url(#wave-grad)" strokeWidth="3" opacity="0.35" />
      ))}
    </svg>
  ),

  "dot-matrix": ({ opacity = 0.13 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      {Array.from({ length: 25 }).map((_, row) =>
        Array.from({ length: 25 }).map((_, col) => {
          const size = ((row + col) % 4) * 0.8 + 0.8;
          return <circle key={`${row}-${col}`} cx={12 + col * 24} cy={12 + row * 24} r={size} fill="white" opacity="0.35" />;
        })
      )}
    </svg>
  ),

  "diagonal-lines": ({ opacity = 0.12 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, opacity }}>
      {Array.from({ length: 30 }).map((_, i) => (
        <line key={i} x1={i * 20 - 100} y1="0" x2={i * 20 + 500} y2="600" stroke="white" strokeWidth={i % 5 === 0 ? "2" : "1"} opacity={i % 5 === 0 ? "0.35" : "0.2"} />
      ))}
    </svg>
  ),

  // ===== PREMIUM TIER (Original) =====
  "volcanic-cracks": ({ opacity = 0.2 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      {Array.from({ length: 15 }).map((_, i) => (
        <path key={i} d={`M${(i * 113) % 600},${(i * 71) % 600} L${(i * 173) % 600},${(i * 211) % 600} L${(i * 241) % 600},${(i * 157) % 600}`} fill="none" stroke="white" strokeWidth="2.5" opacity="0.4" />
      ))}
    </svg>
  ),

  "chrome-reflection": ({ opacity = 0.18 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      <defs>
        <linearGradient id="chrome-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.5" />
          <stop offset="50%" stopColor="white" stopOpacity="0.2" />
          <stop offset="100%" stopColor="white" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path d="M-50,100 Q200,50 600,-50" fill="none" stroke="url(#chrome-grad-1)" strokeWidth="100" />
      <path d="M0,520 Q350,480 650,600" fill="none" stroke="url(#chrome-grad-1)" strokeWidth="120" />
    </svg>
  ),

  "thermal-scan": ({ opacity = 0.17 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, opacity }}>
      {Array.from({ length: 25 }).map((_, i) => (
        <line key={i} x1="0" y1={i * 24} x2="600" y2={i * 24} stroke="white" strokeWidth={i % 5 === 0 ? "2.5" : "1"} opacity={i % 5 === 0 ? "0.45" : "0.2"} />
      ))}
      <rect x="0" y="280" width="100%" height="4" fill="#FF006E" opacity="0.5" />
    </svg>
  ),

  "mist-layers": ({ opacity = 0.22 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      <defs>
        <radialGradient id="mist-1">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="150" cy="150" rx="220" ry="140" fill="url(#mist-1)" />
      <ellipse cx="450" cy="350" rx="270" ry="170" fill="url(#mist-1)" />
    </svg>
  ),

  "liquid-flow": ({ opacity = 0.19 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, opacity }}>
      <defs>
        <linearGradient id="liquid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.5" />
          <stop offset="50%" stopColor="white" stopOpacity="0.8" />
          <stop offset="100%" stopColor="white" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {Array.from({ length: 10 }).map((_, i) => (
        <path key={i} d={`M${i * 60},0 Q${i * 60 + 50},${100 + i * 40} ${i * 60 + 30},${200 + i * 30} T${i * 60 + 20},${400 + i * 20} Q${i * 60 + 40},${500 + i * 15} ${i * 60 + 25},600`} fill="none" stroke="url(#liquid-grad)" strokeWidth="3.5" opacity="0.4" />
      ))}
    </svg>
  ),

  "neural-web": ({ opacity = 0.18 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      {Array.from({ length: 25 }).map((_, i) => {
        const x = (i * 89 + 100) % 600;
        const y = (i * 137 + 100) % 600;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="3" fill="white" opacity="0.5" />
            {i < 20 && (
              <line 
                x1={x} 
                y1={y} 
                x2={(((i + 1) * 89 + 100) % 600)} 
                y2={(((i + 1) * 137 + 100) % 600)} 
                stroke="white" 
                strokeWidth="0.5" 
                opacity="0.25" 
              />
            )}
          </g>
        );
      })}
    </svg>
  ),

  "aurora-waves": ({ opacity = 0.2 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, opacity }}>
      <defs>
        <linearGradient id="aurora-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0.2" />
          <stop offset="50%" stopColor="white" stopOpacity="0.6" />
          <stop offset="100%" stopColor="white" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {Array.from({ length: 6 }).map((_, i) => (
        <path key={i} d={`M0,${100 + i * 80} Q150,${60 + i * 80} 300,${100 + i * 80} T600,${100 + i * 80}`} fill="none" stroke="url(#aurora-1)" strokeWidth="8" opacity="0.4" />
      ))}
    </svg>
  ),

  "crystal-prism": ({ opacity = 0.21 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      <defs>
        <linearGradient id="prism-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.6" />
          <stop offset="100%" stopColor="white" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {Array.from({ length: 15 }).map((_, i) => {
        const cx = (i * 97 + 150) % 600;
        const cy = (i * 127 + 150) % 600;
        const size = 40 + (i % 4) * 20;
        return <polygon key={i} points={`${cx},${cy-size} ${cx+size*0.866},${cy+size*0.5} ${cx-size*0.866},${cy+size*0.5}`} fill="url(#prism-1)" stroke="white" strokeWidth="1.5" opacity="0.35" />;
      })}
    </svg>
  ),

  // ===== NEW PREMIUM PATTERNS =====
  
  "quantum-particles": ({ opacity = 0.19 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      <defs>
        <radialGradient id="quantum-glow">
          <stop offset="0%" stopColor="white" stopOpacity="0.8" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      {Array.from({ length: 30 }).map((_, i) => {
        const x = (i * 113 + 100) % 600;
        const y = (i * 157 + 100) % 600;
        const size = 2 + (i % 3);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={size} fill="url(#quantum-glow)" />
            <circle cx={x} cy={y} r={size * 0.4} fill="white" opacity="0.6" />
            {/* Energy trails */}
            <path 
              d={`M${x},${y} Q${x + 30},${y - 20} ${x + 60},${y}`} 
              fill="none" 
              stroke="white" 
              strokeWidth="0.5" 
              opacity="0.3"
              strokeDasharray="2,3"
            />
          </g>
        );
      })}
    </svg>
  ),

  "heat-shimmer": ({ opacity = 0.16 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, opacity }}>
      <defs>
        <linearGradient id="heat-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.1" />
          <stop offset="50%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {Array.from({ length: 12 }).map((_, i) => (
        <path 
          key={i}
          d={`M${i * 50},0 Q${i * 50 + 10 + (i % 3) * 5},100 ${i * 50 + 5},200 T${i * 50 + 15},400 Q${i * 50 + 8},500 ${i * 50 + 3},600`}
          fill="none"
          stroke="url(#heat-grad-1)"
          strokeWidth="2"
          opacity="0.35"
        />
      ))}
      {Array.from({ length: 15 }).map((_, i) => (
        <path 
          key={`wave-${i}`}
          d={`M0,${i * 40 + 20} Q150,${i * 40 + 15} 300,${i * 40 + 25} T600,${i * 40 + 20}`}
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity="0.15"
        />
      ))}
    </svg>
  ),

  "nebula-cloud": ({ opacity = 0.23 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      <defs>
        <radialGradient id="nebula-1">
          <stop offset="0%" stopColor="white" stopOpacity="0.5" />
          <stop offset="50%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nebula-2">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="70%" stopColor="white" stopOpacity="0.1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="180" rx="180" ry="120" fill="url(#nebula-1)" />
      <ellipse cx="400" cy="320" rx="220" ry="160" fill="url(#nebula-1)" />
      <ellipse cx="120" cy="420" rx="150" ry="100" fill="url(#nebula-2)" />
      <ellipse cx="480" cy="150" rx="170" ry="130" fill="url(#nebula-2)" />
      {/* Star particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <circle 
          key={i}
          cx={(i * 97 + 80) % 600}
          cy={(i * 127 + 80) % 600}
          r="1"
          fill="white"
          opacity="0.5"
        />
      ))}
    </svg>
  ),

  "scale-armor": ({ opacity = 0.17 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      <defs>
        <linearGradient id="scale-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="50%" stopColor="white" stopOpacity="0.2" />
          <stop offset="100%" stopColor="white" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      {Array.from({ length: 12 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => {
          const x = 30 + col * 75 + (row % 2) * 37;
          const y = 20 + row * 50;
          return (
            <g key={`${row}-${col}`}>
              <ellipse 
                cx={x} 
                cy={y} 
                rx="35" 
                ry="25" 
                fill="url(#scale-grad)"
                stroke="white"
                strokeWidth="1"
                opacity="0.4"
              />
              <path 
                d={`M${x - 25},${y} Q${x},${y - 15} ${x + 25},${y}`}
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </g>
          );
        })
      )}
    </svg>
  ),

  "ice-fractal": ({ opacity = 0.2 }) => (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, opacity }}>
      <defs>
        <linearGradient id="ice-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {Array.from({ length: 8 }).map((_, i) => {
        const cx = (i * 127 + 150) % 550 + 25;
        const cy = (i * 173 + 150) % 550 + 25;
        const size = 50 + (i % 3) * 20;
        
        return (
          <g key={i}>
            {/* Main 6-pointed snowflake arms */}
            {Array.from({ length: 6 }).map((_, angle) => {
              const deg = (angle * 60) * Math.PI / 180;
              const x1 = cx + Math.cos(deg) * size;
              const y1 = cy + Math.sin(deg) * size;
              const x2 = cx + Math.cos(deg) * (size * 0.6);
              const y2 = cy + Math.sin(deg) * (size * 0.6);
              
              return (
                <g key={angle}>
                  <line x1={cx} y1={cy} x2={x1} y2={y1} stroke="url(#ice-grad)" strokeWidth="1.5" opacity="0.45" />
                  <line x1={x2} y1={y2} x2={x2 + Math.cos(deg + 0.5) * 12} y2={y2 + Math.sin(deg + 0.5) * 12} stroke="white" strokeWidth="1" opacity="0.35" />
                  <line x1={x2} y1={y2} x2={x2 + Math.cos(deg - 0.5) * 12} y2={y2 + Math.sin(deg - 0.5) * 12} stroke="white" strokeWidth="1" opacity="0.35" />
                </g>
              );
            })}
            <circle cx={cx} cy={cy} r="3" fill="white" opacity="0.5" />
          </g>
        );
      })}
    </svg>
  )
};