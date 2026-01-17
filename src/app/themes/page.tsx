'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Palette, Sparkles, Zap, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Autoplay from 'embla-carousel-autoplay';
import { toast } from 'sonner';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import PageLoader from '@/components/ui/PageLoader';
import { ThemeStore } from '@/components/themes/ThemeStore';
import { themes } from '@/components/themes/themes';
import { patternRenderers, PatternId } from '@/components/themes/patterns';

export default function ThemesPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  // --- STATE FOR LOGGED-IN USERS ---
  const [currentThemeId, setCurrentThemeId] = useState<string>('ocean');
  const [unlockedTiers, setUnlockedTiers] = useState({
    free: true,
    pro: true,     
    premium: true, 
  });

  
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
       // setCurrentThemeId(session.user.themeId || 'ocean');
    }
  }, [status, session]);

  // Handle Theme Selection (API)
  const handleSelectTheme = async (themeId: string) => {
    const previousTheme = currentThemeId;
    setCurrentThemeId(themeId);
    try {
      await update({ themeId }); 
      toast.success('Theme updated!', { description: 'Your profile has a fresh new look.' });
    } catch (error) {
      setCurrentThemeId(previousTheme);
      toast.error('Failed to update theme');
    }
  };

  const handleUnlock = (tier: 'pro' | 'premium') => {
    toast.info(`Unlock ${tier.toUpperCase()} Access`, { description: "Redirecting to payment gateway..." });
  };


  // --- LOADING STATE ---
  if (status === 'loading') {
            return <PageLoader />;
  }

  
  if (status === 'authenticated') {
    return (
      <div className="min-h-screen bg-background">
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border p-4">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.back()}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Theme Store</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Customize your public profile appearance
              </p>
            </div>
          </div>
        </div>

        {/* Theme Grid Component */}
        <main className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <ThemeStore
              currentThemeId={currentThemeId}
              unlockedTiers={unlockedTiers}
              onSelectTheme={handleSelectTheme}
              onUnlock={handleUnlock}
            />
          </div>
        </main>
      </div>
    );
  }

  const themeList = Object.values(themes); 

  const features = [
    { icon: Palette, title: "Vibrant Gradients", description: "Hand-picked color combinations that pop on any screen." },
    { icon: Sparkles, title: "Dynamic Patterns", description: "Backgrounds that add depth, texture, and personality." },
    { icon: Zap, title: "Instant Customization", description: "Switch your vibe in one click. No coding required." }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] bg-background">
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
        
        {/* HERO */}
        <section className="text-center mb-12 md:mb-20 max-w-4xl">
          <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-medium rounded-full">
            New Collection Available
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            Express Yourself with <br/>
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
               Unique Themes
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From minimalist elegance to cyberpunk neon. Customize your anonymous message page to match your unique personality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/sign-in">
              <Button size="lg" className="text-lg px-8 py-6 shadow-lg shadow-primary/20 transition-all hover:scale-105">
                Sign In to Customize
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover:bg-muted transition-all hover:scale-105">
                Create Account
              </Button>
            </Link>
          </div>
        </section>

        {/* FEATURES */}
        <section className="w-full max-w-5xl mb-16 md:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border bg-card/50 backdrop-blur-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 cursor-default group">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex p-3 bg-primary/10 group-hover:bg-primary/20 rounded-2xl mb-4 transition-colors duration-300">
                    <feature.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CAROUSEL */}
        <section className="w-full max-w-[1400px] mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore the Collection</h2>
            <p className="text-muted-foreground">Swipe to see how your messages could look</p>
          </div>

          <Carousel
            plugins={[Autoplay({ delay: 2500, stopOnInteraction: false })]}
            className="w-full"
            opts={{ align: "start", loop: true }}
          >
            <CarouselContent className="-ml-4">
              {themeList.map((theme) => {
                const PatternComponent = patternRenderers[theme.pattern as PatternId];
                return (
                  <CarouselItem key={theme.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <div className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-border/50">
                      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={{ background: theme.gradient }}>
                        {PatternComponent && (
                          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                             <PatternComponent opacity={0.6} />
                          </div>
                        )}
                      </div>
                      <div className="absolute inset-0 p-6 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <span className="text-4xl filter drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">
                            {theme.badge}
                          </span>
                          {theme.tier !== 'free' && (
                            <Badge variant="secondary" className="bg-black/20 text-white backdrop-blur-md border-0 uppercase tracking-widest text-[10px] font-bold">
                              {theme.tier}
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className={`font-bold text-xl leading-tight ${theme.textColor === '#ffffff' ? 'text-white' : 'text-slate-900'}`}>
                            {theme.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </div>
          </Carousel>
        </section>

        {/* SOCIAL PROOF */}
        <section className="text-center py-12 w-full bg-muted/30 rounded-3xl border border-dashed border-border/60">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-4">Ready to stand out?</h2>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground font-medium">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500"/> 24+ Themes</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500"/> Dark Mode</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}