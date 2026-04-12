"use client"

import React from 'react';
import ToggleCard from "./ToggleCard";
import { Zap, Activity, Target, Eye, LogOut, LayoutGrid, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  return (
    <div className="min-h-screen flex flex-col animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <header className="glass border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center shadow-neon-purple">
            <LayoutGrid className="text-primary w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-neon tracking-tighter hidden sm:block">
              NEVASFZ <span className="text-white/80">HEADTRICK</span>
            </h1>
            <div className="flex items-center gap-1 sm:hidden">
              <span className="text-primary font-bold">FZ</span>
              <span className="text-white/40 text-xs">V2.5</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sistema Protegido</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onLogout}
            className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors group"
          >
            <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-10 space-y-10">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Painel de <span className="text-primary text-neon">Controle</span>
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Configure as otimizações do sistema para obter o melhor desempenho e precisão.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ToggleCard 
            title="0 Delay" 
            icon={<Zap />} 
            description="Remove o input lag e otimiza a resposta dos comandos instantaneamente." 
          />
          <ToggleCard 
            title="Remover Tremedeira" 
            icon={<Activity />} 
            description="Estabiliza a movimentação da câmera eliminando micro-vibrações." 
          />
          <ToggleCard 
            title="Ajuste de Mira" 
            icon={<Target />} 
            description="Algoritmo avançado para suavizar o rastreio de alvos em movimento." 
          />
          <ToggleCard 
            title="Mira Clean" 
            icon={<Eye />} 
            description="Reduz efeitos visuais obstrutivos para uma visão clara do campo." 
          />
        </div>

        {/* Footer/System Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/5">
          <div className="glass p-4 rounded-xl flex items-center gap-4 border-white/5">
            <div className="text-primary font-bold text-2xl">99+</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
              Otimizações<br/>Realizadas
            </div>
          </div>
          <div className="glass p-4 rounded-xl flex items-center gap-4 border-white/5">
            <div className="text-emerald-400 font-bold text-2xl">Stable</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
              Status do<br/>Servidor
            </div>
          </div>
          <div className="glass p-4 rounded-xl flex items-center gap-4 border-white/5">
            <div className="text-primary font-bold text-2xl">0ms</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
              Latência de<br/>Processamento
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Legal/Info */}
      <footer className="p-8 text-center border-t border-white/5">
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] opacity-30">
          NEVASFZ HEADTRICK © 2024 • Desenvolvido para Performance Extrema
        </p>
      </footer>
    </div>
  );
}
