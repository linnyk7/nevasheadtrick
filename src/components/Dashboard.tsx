
"use client"

import React, { useState, useEffect } from 'react';
import ToggleCard from "./ToggleCard";
import InstallPrompt from "./InstallPrompt";
import { Zap, Activity, Target, Eye, LogOut, LayoutGrid, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DashboardProps {
  onLogout: () => void;
  username: string;
}

export default function Dashboard({ onLogout, username }: DashboardProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [greeting, setGreeting] = useState("Bem-vindo");

  useEffect(() => {
    setIsMounted(true);
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Bom dia");
    else if (hours < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden selection:bg-primary/30">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-float opacity-50" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[100px] animate-float opacity-30" style={{ animationDelay: '-5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,#0a0514_90%)]" />
      </div>

      {/* Install App Prompt */}
      <InstallPrompt />

      {/* Header */}
      <header className="glass-premium border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shadow-neon-purple group hover:scale-110 transition-transform duration-300">
            <LayoutGrid className="text-primary w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-neon flex items-center gap-2">
              NEVASFZ <span className="text-white/90 font-bold">HEADTRICK</span>
            </h1>
            <div className="md:hidden flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">v2.5.0 Secure</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex">
            <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(52,211,153,0.1)] group transition-all hover:bg-emerald-500/20">
              <ShieldCheck className="w-4 h-4 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sistema Protegido</span>
            </Badge>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onLogout}
            className="text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-all duration-300 group rounded-xl px-4"
          >
            <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-[11px]">Sair</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-12 space-y-12 relative z-10">
        {/* Welcome Section */}
        <div className="space-y-6">
          <div className="space-y-2 animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[9px] text-primary font-black uppercase tracking-[0.3em]">Dashboard Operational</span>
            </div>
            
            <div className="space-y-1">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white/80 transition-all">
                {greeting}, <span className="text-white drop-shadow-[0_0_15px_rgba(176,108,255,0.6)] font-black">{username}</span>
              </h2>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight">
                PAINEL DE <span className="text-primary text-neon tracking-normal uppercase animate-pulse-soft">CONTROLE</span>
              </h3>
            </div>
            
            <p className="text-lg md:text-xl text-white/60 max-w-2xl font-medium leading-relaxed pt-2">
              Configure as otimizações avançadas do sistema para obter <span className="text-white">precisão absoluta</span> e desempenho extremo em tempo real.
            </p>
          </div>
        </div>

        {/* Section Divider */}
        <div className="relative h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary blur-[4px]" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in zoom-in-95 duration-1000">
          <ToggleCard 
            title="0 Delay" 
            icon={<Zap />} 
            description="Elimina o input lag e otimiza a resposta de comandos via hardware." 
          />
          <ToggleCard 
            title="Estabilizador" 
            icon={<Activity />} 
            description="Remove micro-vibrações e estabiliza a movimentação de sensores." 
          />
          <ToggleCard 
            title="Ajuste de Mira" 
            icon={<Target />} 
            description="Rastreio adaptativo via IA para suavização de movimentos bruscos." 
          />
          <ToggleCard 
            title="Otimização Visual" 
            icon={<Eye />} 
            description="Filtros de pós-processamento para clareza visual superior." 
          />
        </div>

        {/* Section Divider */}
        <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Status Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 animate-in slide-in-from-bottom-4 duration-700">
          <div className="glass-premium p-6 rounded-2xl flex items-center gap-5 border-primary/20 hover:border-primary/40 transition-all group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-primary font-black text-4xl text-neon group-hover:scale-110 transition-transform">99+</div>
            <div className="space-y-1">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black">Performance</div>
              <div className="text-xs text-white/80 font-bold uppercase tracking-widest">Otimizações Ativas</div>
            </div>
          </div>

          <div className="glass-premium p-6 rounded-2xl flex items-center gap-5 border-emerald-500/20 hover:border-emerald-500/40 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center justify-center">
              <div className="text-emerald-400 font-black text-3xl group-hover:scale-110 transition-transform tracking-tighter uppercase italic">Stable</div>
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="space-y-1">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black">Global Hub</div>
              <div className="text-xs text-white/80 font-bold uppercase tracking-widest">Status da Rede</div>
            </div>
          </div>

          <div className="glass-premium p-6 rounded-2xl flex items-center gap-5 border-secondary/20 hover:border-secondary/40 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-secondary font-black text-4xl text-neon group-hover:scale-110 transition-transform">0ms</div>
            <div className="space-y-1">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black">Latência</div>
              <div className="text-xs text-white/80 font-bold uppercase tracking-widest">Tempo de Resposta</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-10 text-center border-t border-white/5 relative z-10">
        <p className="text-[10px] text-white/10 uppercase tracking-[0.6em] font-black hover:text-white/30 transition-colors cursor-default">
          NEVASFZ HEADTRICK OS • SECURED PROTOCOL V2.5.0 • performance elite
        </p>
      </footer>
    </div>
  );
}
