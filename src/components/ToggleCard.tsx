"use client"

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToggleCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
}

export default function ToggleCard({ title, icon, description }: ToggleCardProps) {
  const [isActive, setIsActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleToggle = async (checked: boolean) => {
    if (checked) {
      setIsProcessing(true);
      setShowSuccess(false);
      
      // Simulate script loading
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsProcessing(false);
      setShowSuccess(true);
      setIsActive(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setIsActive(false);
      setIsProcessing(false);
      setShowSuccess(false);
    }
  };

  return (
    <Card className={cn(
      "glass p-5 flex flex-col gap-4 relative overflow-hidden transition-all duration-500",
      isActive ? "border-primary/40 bg-primary/5" : "border-white/5 hover:border-white/10"
    )}>
      {/* Background Glow Effect when active */}
      {isActive && (
        <div className="absolute -right-10 -top-10 w-24 h-24 bg-primary/20 blur-3xl pointer-events-none" />
      )}

      <div className="flex items-start justify-between">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300",
          isActive 
            ? "bg-primary/20 border-primary/30 shadow-neon-purple text-primary" 
            : "bg-white/5 border-white/10 text-muted-foreground"
        )}>
          {React.cloneElement(icon as React.ReactElement, { size: 24 })}
        </div>
        <Switch 
          checked={isActive || isProcessing} 
          onCheckedChange={handleToggle}
          disabled={isProcessing}
          className="data-[state=checked]:bg-primary"
        />
      </div>

      <div className="space-y-1">
        <h3 className={cn(
          "font-bold text-lg tracking-tight transition-colors",
          isActive ? "text-primary text-neon" : "text-white"
        )}>
          {title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      <div className="h-6 flex items-center">
        {isProcessing && (
          <div className="flex items-center gap-2 text-[10px] font-bold text-primary animate-pulse">
            <Loader2 size={12} className="animate-spin" />
            <span className="uppercase tracking-widest">Ativando...</span>
          </div>
        )}
        {showSuccess && (
          <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 animate-in fade-in slide-in-from-left-2">
            <CheckCircle2 size={12} />
            <span className="uppercase tracking-widest">Ativado com sucesso</span>
          </div>
        )}
        {!isProcessing && !showSuccess && isActive && (
          <div className="flex items-center gap-2 text-[10px] font-bold text-primary/60">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="uppercase tracking-widest">Sistema Operacional</span>
          </div>
        )}
      </div>

      {/* Futuristic Progress Bar during loading */}
      {isProcessing && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
          <div className="h-full bg-primary animate-[shimmer_2s_infinite] shadow-neon-purple" style={{ width: '100%' }} />
        </div>
      )}
    </Card>
  );
}
