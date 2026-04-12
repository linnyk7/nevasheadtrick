
"use client"

import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Loader2, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToggleCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  onToggleChange?: (active: boolean) => void;
}

export default function ToggleCard({ title, icon, description, onToggleChange }: ToggleCardProps) {
  const [isActive, setIsActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleToggle = async (checked: boolean) => {
    if (checked) {
      setIsProcessing(true);
      setShowSuccess(false);
      
      // Artificial delay for premium system feel
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsProcessing(false);
      setShowSuccess(true);
      setIsActive(true);
      onToggleChange?.(true);
      
      // Vibration feedback for mobile
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(50);
      }
      
      setTimeout(() => setShowSuccess(false), 2500);
    } else {
      setIsActive(false);
      setIsProcessing(false);
      setShowSuccess(false);
      onToggleChange?.(false);
    }
  };

  return (
    <Card className={cn(
      "glass-premium p-6 flex flex-col gap-5 relative overflow-hidden transition-all duration-500 group",
      isActive 
        ? "border-primary/40 bg-primary/10 -translate-y-1 shadow-neon-purple-strong" 
        : "border-white/5 hover:border-white/20 hover:-translate-y-1.5 hover:shadow-2xl"
    )}>
      {/* Energy Shimmer Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:animate-shimmer" />
      </div>

      {/* Active Glow */}
      {isActive && (
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/20 blur-[60px] pointer-events-none animate-pulse" />
      )}

      <div className="flex items-start justify-between relative z-10">
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110",
          isActive 
            ? "bg-primary/20 border-primary/40 shadow-neon-purple text-primary" 
            : "bg-white/5 border-white/10 text-white/40 group-hover:text-white/70 group-hover:border-white/20"
        )}>
          {React.cloneElement(icon as React.ReactElement, { 
            size: 28,
            className: cn(isActive && "drop-shadow-[0_0_8px_rgba(176,108,255,0.8)]")
          })}
        </div>
        <Switch 
          checked={isActive || isProcessing} 
          onCheckedChange={handleToggle}
          disabled={isProcessing}
          className={cn(
            "transition-all duration-500",
            isActive ? "data-[state=checked]:bg-primary shadow-neon-purple scale-110" : ""
          )}
        />
      </div>

      <div className="space-y-2 relative z-10">
        <h3 className={cn(
          "font-black text-xl tracking-tight transition-all duration-300",
          isActive ? "text-primary text-neon" : "text-white/90 group-hover:text-white"
        )}>
          {title}
        </h3>
        <p className="text-xs text-white/40 font-medium leading-relaxed min-h-[3rem] group-hover:text-white/60 transition-colors">
          {description}
        </p>
      </div>

      <div className="h-6 flex items-center relative z-10">
        {isProcessing && (
          <div className="flex items-center gap-2 text-[10px] font-black text-primary animate-pulse">
            <Loader2 size={12} className="animate-spin" />
            <span className="uppercase tracking-[0.2em]">Sincronizando...</span>
          </div>
        )}
        {showSuccess && (
          <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 animate-in fade-in slide-in-from-left-2 duration-300">
            <CheckCircle2 size={12} />
            <span className="uppercase tracking-[0.2em]">{title} Ativado</span>
          </div>
        )}
        {!isProcessing && !showSuccess && isActive && (
          <div className="flex items-center gap-2 text-[10px] font-black text-primary/80">
            <Sparkles size={12} className="animate-pulse" />
            <span className="uppercase tracking-[0.2em]">Protocolo Ativo</span>
          </div>
        )}
      </div>

      {/* Futuristic Progress Bar during loading */}
      {isProcessing && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
          <div className="h-full bg-primary shadow-neon-purple w-full animate-shimmer" />
        </div>
      )}
    </Card>
  );
}
