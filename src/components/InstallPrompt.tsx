
"use client"

import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Verificar se já foi dispensado ou se já está instalado
    const isDismissed = localStorage.getItem('fz_install_dismissed');
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    if (isDismissed || isStandalone) return;

    // Detectar iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    if (isIOSDevice) {
      // Mostrar após 3 segundos para usuários iOS (não tem evento nativo)
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }

    // Evento padrão para Chrome/Android/Desktop
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Mostrar após um pequeno delay para ser "surpresa" premium
      setTimeout(() => setIsVisible(true), 2000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsVisible(false);
      localStorage.setItem('fz_install_dismissed', 'true');
    }
    setDeferredPrompt(null);
  };

  const dismiss = () => {
    setIsVisible(false);
    // Salvar que foi dispensado para não incomodar
    localStorage.setItem('fz_install_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md animate-in slide-in-from-bottom-8 duration-700">
      <div className="glass-premium p-5 rounded-2xl border-primary/30 shadow-neon-purple-strong relative overflow-hidden group">
        {/* Animated Background Energy */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer" />

        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 shadow-neon-purple">
            <Smartphone className="text-primary w-6 h-6 animate-pulse" />
          </div>
          
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-black text-white tracking-tighter uppercase">
              App <span className="text-primary text-neon">Headtrick</span>
            </h4>
            <p className="text-[11px] text-white/60 font-medium leading-tight">
              {isIOS 
                ? "Adicione à tela inicial para acesso instantâneo e performance otimizada."
                : "Instale o painel como aplicativo para precisão absoluta e resposta extrema."}
            </p>
          </div>

          <button 
            onClick={dismiss}
            className="text-white/20 hover:text-white/60 transition-colors p-1"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-5 flex gap-3 relative z-10">
          {isIOS ? (
            <div className="w-full flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[10px] text-white/70 font-bold uppercase tracking-widest">
              <Info size={14} className="text-primary" />
              <span>Clique em compartilhar e "Adicionar à Tela de Início"</span>
            </div>
          ) : (
            <Button 
              onClick={handleInstall}
              className="w-full h-11 bg-primary hover:bg-primary/80 text-white rounded-xl shadow-neon-purple border-t border-white/20 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group/btn"
            >
              <Download size={16} className="group-hover/btn:translate-y-0.5 transition-transform" />
              <span className="font-black text-[11px] uppercase tracking-[0.2em]">Instalar Aplicativo</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
