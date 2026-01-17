'use client';

import React, { useRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { 
  Share2,Download,Check,PaletteIcon, X, Loader2, Type, HelpCircle, Baseline
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { themes, ThemeKey } from '@/components/themes/themes';
import { patternRenderers, PatternId } from '@/components/themes/patterns';
import { toast } from 'sonner';

type HeaderStyle = 'whisper-box' | 'badge' | 'theme-name' | 'question-mark' | 'minimal-line';
type FontStyle = 'modern' | 'serif' | 'hand';

export function ShareModal({ content }: { content: string }) {
  const captureRef = useRef<HTMLDivElement>(null);
  
  // State for personalization
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('ocean');
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle>('whisper-box');
  const [fontStyle, setFontStyle] = useState<FontStyle>('modern');
  const [textColor, setTextColor] = useState<string>('#ffffff');
  
  const [isCapturing, setIsCapturing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const theme = themes[currentTheme] || themes['ocean'];
  const PatternComponent = patternRenderers[theme.pattern as PatternId];

  // Helper for Typography
  const getFontClass = (style: FontStyle) => {
    if (style === 'serif') return 'font-serif italic';
    if (style === 'hand') return 'font-hand';
    return 'font-modern font-black italic uppercase tracking-tight';
  };

  // Helper for Headers
  const renderHeaderContent = (isExport: boolean) => {
    const sizeClasses = isExport ? "text-6xl" : "text-3xl";
    const iconSize = isExport ? 64 : 32;

    switch (headerStyle) {
      case 'whisper-box':
        return (
          <div className={`
            relative border border-white/20 shadow-2xl
            ${isExport ? 'bg-white/25 px-12 py-4 rounded-[50px]' : 'bg-white/10 backdrop-blur-md px-6 py-2 rounded-full'}
          `}>
            <span className={`font-black uppercase tracking-[0.4em] text-white inline-block ml-[0.4em] ${isExport ? 'text-4xl' : 'text-[10px]'}`}>
              Whisper Box
            </span>
          </div>
        );
      case 'theme-name':
        return <span className={`${isExport ? 'text-5xl' : 'text-xs'} font-black uppercase tracking-[0.3em] opacity-80 text-white`}>{theme.name}</span>;
      case 'question-mark':
        return <HelpCircle size={iconSize} className="opacity-80 text-white" />;
      case 'minimal-line':
        return <div className={`${isExport ? 'w-32 h-3' : 'w-16 h-1.5'} bg-white/30 rounded-full`} />;
      default: 
        return <span className={`${sizeClasses} drop-shadow-lg`}>{theme.badge}</span>;
    }
  };

  const handleCapture = async (mode: 'share' | 'download') => {
    if (!captureRef.current) return;
    setIsCapturing(true);

    try {
      await document.fonts.ready;
      captureRef.current.style.visibility = "visible";
      
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      await new Promise((resolve) => setTimeout(resolve, 150));

      const dataUrl = await htmlToImage.toPng(captureRef.current, {
        quality: 1.0,
        pixelRatio: 3, 
        cacheBust: true,
      });

      captureRef.current.style.visibility = "hidden";
      
      if (mode === 'download') {
        const link = document.createElement('a');
        link.download = `whisper-${Date.now()}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Image saved!");
      } else {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], 'whisper.png', { type: 'image/png' });
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file], title: 'Whisper Box' });
        }
      }
    } catch (err) {
      toast.error("Generation failed.");
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9 hover:text-primary transition-all">
          <Share2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-[420px] p-0 bg-card rounded-[2.5rem] overflow-hidden flex flex-col max-h-[92vh] border-none shadow-2xl">
        <DialogHeader className="px-6 py-4 border-b border-border flex flex-row items-center justify-between bg-card">
          <DialogTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
            <PaletteIcon className="w-4 h-4" />
            Personalize Card
          </DialogTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
          
          {/* ---  PREVIEW CARD --- */}
          <div className="w-full aspect-square rounded-[2.5rem] shadow-2xl overflow-hidden relative" style={{ background: theme.gradient }}>
            <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
               {PatternComponent && <PatternComponent opacity={0.5} />}
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-between p-10 text-center">
              {renderHeaderContent(false)}
              <p 
                className={`${getFontClass(fontStyle)} leading-tight drop-shadow-xl transition-colors duration-300`}
                style={{ color: textColor, fontSize: fontStyle === 'hand' ? '32px' : '22px' }}
              >
                "{content}"
              </p>
              <div className="bg-black/25 backdrop-blur-xl px-6 py-2 rounded-full text-[10px] font-bold tracking-widest border border-white/10 text-white lowercase">
                Reply on <span style={{ color: "#4ECDC4" }}>whisper-box.xyz</span>
              </div>
            </div>
          </div>

          {/* ---  PERSONALIZATION SELECTORS --- */}
          <div className="space-y-6 px-1">
            
            {/* 1. Header Styles */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-70">Visual Header</label>
              <div className="grid grid-cols-3 gap-2">
                {(['whisper-box', 'theme-name', 'question-mark', 'minimal-line', 'badge'] as HeaderStyle[]).map((s) => (
                  <button key={s} onClick={() => setHeaderStyle(s)} className={`py-2.5 text-[10px] font-bold rounded-2xl border transition-all ${headerStyle === s ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20' : 'bg-muted/40 border-transparent hover:border-primary/30'}`}>
                    {s.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Typography Styles */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-70">Typography</label>
              <div className="grid grid-cols-3 gap-2">
                {(['modern', 'serif', 'hand'] as FontStyle[]).map((f) => (
                  <button key={f} onClick={() => setFontStyle(f)} className={`py-2.5 text-[11px] rounded-2xl border transition-all flex items-center justify-center gap-2 ${fontStyle === f ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20' : 'bg-muted/40 border-transparent'}`}>
                    <Type size={12} className="opacity-70" /> <span className="capitalize">{f}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3.  Text Color Selector (NEW) */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-70">Text Color</label>
              <div className="flex gap-4">
                {[
                  { name: 'White', value: '#ffffff' },
                  { name: 'Black', value: '#000000' },
                  { name: 'Muted', value: '#cbd5e1' }
                ].map((color) => (
                  <button 
                    key={color.value} 
                    onClick={() => setTextColor(color.value)}
                    className={`h-10 flex-1 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 ${textColor === color.value ? 'border-primary bg-primary/5' : 'border-transparent bg-muted/40'}`}
                  >
                    <div className="w-4 h-4 rounded-full border border-black/10 shadow-sm" style={{ background: color.value }} />
                    <span className="text-[10px] font-bold">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Background Canvas */}
            <div className="space-y-3 pb-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-70">Color Canvas</label>
              <div className="grid grid-cols-5 gap-3">
                {Object.entries(themes).map(([key, t]) => (
                  <button key={key} onClick={() => setCurrentTheme(key as ThemeKey)} className={`aspect-square rounded-2xl transition-all flex items-center justify-center relative ${currentTheme === key ? 'ring-2 ring-primary ring-offset-4 ring-offset-background scale-110' : 'opacity-90'}`} style={{ background: t.gradient }}>
                    <span className="text-xl drop-shadow-sm">{t.badge}</span>
                    {currentTheme === key && <div className="absolute -top-1 -right-1 bg-primary rounded-full p-1 border-2 border-background"><Check className="w-2 h-2 text-white" /></div>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---  STICKY FOOTER --- */}
        <div className="p-5 bg-muted/30 backdrop-blur-xl border-t flex gap-4">
          <Button className="flex-1 h-14 gap-3 font-black rounded-3xl text-sm shadow-xl shadow-primary/20 active:scale-95" onClick={() => handleCapture('share')} disabled={isCapturing}>
             {isCapturing ? <Loader2 className="animate-spin w-5 h-5" /> : <Share2 className="w-5 h-5" />} SHARE STORY
          </Button>
          <Button variant="secondary" className="h-14 w-14 rounded-3xl p-0 shadow-lg active:scale-95" onClick={() => handleCapture('download')} disabled={isCapturing}>
            <Download className="w-6 h-6" />
          </Button>
        </div>
      </DialogContent>

      {/* ---  HIDDEN CAPTURE DIV (1080px HQ) --- */}
      <div ref={captureRef} style={{ position: "fixed", left: "0", top: "0", zIndex: "-100", visibility: "hidden", width: "1080px", height: "1080px", background: theme.gradient, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "120px" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.5 }}>{PatternComponent && <PatternComponent opacity={0.5} />}</div>
          <div style={{ zIndex: 10 }}>{renderHeaderContent(true)}</div>
          <div style={{ zIndex: 10, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "40px" }}>
            <p 
              className={getFontClass(fontStyle)} 
              style={{ 
                color: textColor, 
                fontSize: fontStyle === 'hand' ? '120px' : '100px', 
                textAlign: 'center', 
                lineHeight: 1.1, 
                textShadow: textColor === '#000000' ? "none" : "0 20px 60px rgba(0,0,0,0.3)" 
              }}
            >
              "{content}"
            </p>
          </div>
          <div style={{ 
  zIndex: 10, 
  background: "rgba(0, 0, 0, 0.25)", 
  color: "white", 
  padding: "20px 60px", 
  borderRadius: "100px", 
  fontWeight: 800, 
  fontSize: "26px", 
  letterSpacing: "0.1em",
  border: "2px solid rgba(255, 255, 255, 0.15)", 
  boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
  display: "flex",
  alignItems: "center",
  gap: "10px"
}}>
  <span>reply on</span>
  <span style={{ color: "#22d3ee", fontWeight: 900 }}>whisper-box.xyz</span>
</div>
      </div>
    </Dialog>
  );
}