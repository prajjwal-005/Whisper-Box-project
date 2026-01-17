import React, { useState, useMemo } from 'react';
import { themes, Theme } from './themes';
import { ThemePreviewCard } from './ThemePreviewCard';
import { ThemeSharePreview } from './ThemeSharePreview';
import { checkThemeAccess, getRecommendedPlatforms } from './utils/themeUtils';
import { X } from 'lucide-react'; 

interface ThemeStoreProps {
  currentThemeId: string;
  unlockedTiers: {
    free: boolean;
    pro: boolean;
    premium: boolean;
  };
  onSelectTheme: (themeId: string) => void;
  onUnlock: (tier: 'pro' | 'premium') => void;
}

type ThemeWithStatus = Theme & { 
  isLocked: boolean; 
  recommendedFor: string[];
};

const CATEGORIES = ["all", "aesthetic", "luxury", "playful", "minimal", "bold"] as const;
const TIERS = ["all", "free", "pro", "premium"] as const;

export const ThemeStore: React.FC<ThemeStoreProps> = ({
  currentThemeId,
  unlockedTiers,
  onSelectTheme,
  onUnlock,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTier, setSelectedTier] = useState<string>("all");
  
  const [previewTheme, setPreviewTheme] = useState<ThemeWithStatus | null>(null);

  // Flatten and process themes
  const processedThemes = useMemo(() => {
    return Object.values(themes).map((theme) => ({
      ...theme,
      isLocked: !checkThemeAccess(theme.tier, unlockedTiers),
      recommendedFor: getRecommendedPlatforms(theme.category),
    }));
  }, [unlockedTiers]);

  // Filter Logic
  const filteredThemes = useMemo(() => {
    return processedThemes.filter((theme) => {
      const matchesSearch = theme.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || theme.category === selectedCategory;
      const matchesTier = selectedTier === "all" || theme.tier === selectedTier;
      return matchesSearch && matchesCategory && matchesTier;
    });
  }, [processedThemes, searchQuery, selectedCategory, selectedTier]);

  const handleApplyFromPreview = () => {
    if (previewTheme) {
      if (previewTheme.isLocked) {
        onUnlock(previewTheme.tier as 'pro' | 'premium');
      } else {
        onSelectTheme(previewTheme.id);
        setPreviewTheme(null);
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen text-slate-800">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Theme Store</h2>
          <p className="text-slate-500 mt-1">Customize your whisper box card appearance.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative group">
            <input
              type="text"
              placeholder="Search themes..."
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3.5 top-3 text-gray-400 group-focus-within:text-blue-500">🔍</span>
          </div>
          
          {/* Unlock CTA */}
          {!unlockedTiers.premium && (
            <button
              onClick={() => onUnlock('premium')}
              className="relative overflow-hidden px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Unlock All Access</span>
                <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded uppercase tracking-wide">Best Value</span>
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col md:flex-row gap-4 border-b border-gray-200 pb-4 overflow-x-auto">
        <div className="flex gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors whitespace-nowrap ${
                selectedCategory === cat 
                  ? "bg-slate-900 text-white" 
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="w-px bg-gray-300 mx-2 hidden md:block"></div>
        <div className="flex gap-2">
          {TIERS.map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                selectedTier === tier 
                  ? "bg-blue-100 text-blue-700 border border-blue-200" 
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredThemes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredThemes.map((theme) => (
            <ThemePreviewCard
              key={theme.id}
              theme={theme}
              isActive={currentThemeId === theme.id}
              isLocked={theme.isLocked}
              onSelect={() => setPreviewTheme(theme)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold text-slate-900">No themes found</h3>
          <p className="text-slate-500">Try adjusting your search or filters.</p>
          <button 
            onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setSelectedTier("all"); }}
            className="mt-6 text-blue-600 font-medium hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* ===== PREVIEW MODAL ===== */}
      {previewTheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{previewTheme.name}</h3>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  {previewTheme.tier} Tier
                </span>
              </div>
              <button 
                onClick={() => setPreviewTheme(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 bg-gray-50 flex justify-center">
               <ThemeSharePreview theme={previewTheme} />
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setPreviewTheme(null)}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition-transform active:scale-95"
              >
               Preview
              </button>
              
              {/* <button
                onClick={handleApplyFromPreview}
                className={`flex-1 py-2.5 rounded-xl text-white font-bold shadow-lg transition-transform active:scale-95 ${
                  previewTheme.isLocked 
                    ? "bg-slate-900 hover:bg-slate-800" 
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {previewTheme.isLocked 
                  ? `Unlock ${previewTheme.tier} Access` 
                  : "Apply Theme"
                }
              </button> */}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};