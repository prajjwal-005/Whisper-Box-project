import { Theme } from '../themes';

export const isDarkTheme = (textColorHex: string): boolean => {
  const r = parseInt(textColorHex.substring(1, 3), 16);
  const g = parseInt(textColorHex.substring(3, 5), 16);
  const b = parseInt(textColorHex.substring(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  
  return yiq >= 128;
};


export const getContrastingTextColor = (hexColor: string): string => {
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#000000' : '#FFFFFF';
};


export const checkThemeAccess = (
  themeTier: Theme['tier'],
  unlockedTiers: { free: boolean; pro: boolean; premium: boolean }
): boolean => {
  if (themeTier === 'free') return true;
  if (themeTier === 'pro') return unlockedTiers.pro || unlockedTiers.premium;
  if (themeTier === 'premium') return unlockedTiers.premium;
  return false;
};


export const getRecommendedPlatforms = (category: Theme['category']): string[] => {
  const map: Record<string, string[]> = {
    minimal: ['linkedin', 'resume', 'portfolio'],
    playful: ['tiktok', 'instagram', 'personal'],
    bold: ['twitter', 'twitch', 'youtube'],
    luxury: ['business', 'store', 'fashion'],
    aesthetic: ['instagram', 'pinterest', 'blog'],
  };
  return map[category] || ['web'];
};