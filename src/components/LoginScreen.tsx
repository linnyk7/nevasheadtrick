"use client"

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Lock, User, ShieldAlert, Loader2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Artificial delay for futuristic feel
    await new Promise(resolve => setTimeout(resolve, 2000));

    const isValidUser = username.toLowerCase().endsWith("fz");
    const isValidPass = password === "0";

    if (isValidUser && isValidPass) {
      setSuccessMsg("Conectando ao sistema...");
      setTimeout(() => {
        onLoginSuccess();
      }, 1500);
    } else {
      setError("ACESSO NEGADO: CREDENCIAIS INVÁLIDAS");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,transparent_0%,#0a0514_80%)]" />
        
        {/* Particle-like shapes */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary rounded-full animate-pulse-soft blur-sm" />
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-secondary rounded-full animate-pulse-soft blur-sm" style={{ animationDelay: '1s' }} />
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse-soft" style={{ animationDelay: '2s' }} />
      </div>

      {/* Overlay when loading */}
      <div className={cn(
        "fixed inset-0 z-50 bg-black/40 backdrop-blur-md transition-all duration-700 pointer-events-none flex items-center justify-center",
        isLoading || successMsg ? "opacity-100" : "opacity-0"
      )}>
        {(isLoading || successMsg) && (
          <div className="flex flex-col items-center gap-4 animate-in zoom-in-95 duration-500">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse" />
            </div>
            <p className="text-primary font-bold tracking-[0.3em] text-xs uppercase animate-pulse">
              {successMsg || "Verificando Protocolos..."}
            </p>
          </div>
        )}
      </div>

      <Card className="w-full max-w-md glass-premium relative z-10 border-primary/20 overflow-hidden animate-in fade-in zoom-in-95 duration-700">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <CardHeader className="text-center relative pt-12 pb-8">
          <div className="relative mx-auto w-20 h-20 mb-6 group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-500" />
            <div className="relative z-10 w-full h-full bg-black/40 rounded-full flex items-center justify-center border border-primary/40 shadow-neon-purple animate-pulse-soft">
              <Lock className="text-primary w-9 h-9 drop-shadow-[0_0_8px_rgba(176,108,255,0.8)]" />
            </div>
          </div>
          
          <CardTitle className="text-4xl font-black tracking-tighter text-neon font-headline text-white leading-none">
            NEVASFZ <span className="text-white/90">HEADTRICK</span>
          </CardTitle>
          <p className="text-white/60 text-sm mt-4 font-medium tracking-wide uppercase">
            Identifique-se para acessar o sistema
          </p>
        </CardHeader>

        <CardContent className="space-y-8 relative pb-12 px-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <div className="relative group input-glow-focus rounded-lg">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="ID de Usuário"
                  className="pl-12 bg-black/60 border-white/5 text-white placeholder:text-white/30 h-14 transition-all text-base focus:placeholder:opacity-50"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative group input-glow-focus rounded-lg">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 group-focus-within:text-primary transition-colors" />
                <Input
                  type="password"
                  placeholder="Senha de Acesso"
                  className="pl-12 bg-black/60 border-white/5 text-white placeholder:text-white/30 h-14 transition-all text-base focus:placeholder:opacity-50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 text-red-400 bg-red-500/10 p-4 rounded-lg border border-red-500/20 animate-in slide-in-from-top-2 duration-500">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-widest leading-tight">{error}</span>
              </div>
            )}

            <Button 
              type="submit" 
              className={cn(
                "w-full h-14 text-sm font-black transition-all duration-300 relative group overflow-hidden shadow-neon-purple rounded-xl active:scale-95",
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-neon-purple-strong"
              )}
              disabled={isLoading || !!successMsg}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[#7c3aed] transition-all duration-500 group-hover:brightness-110" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
              
              <span className="relative z-10 flex items-center justify-center gap-3 tracking-[0.2em]">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    ENTRANDO...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    ACESSAR PAINEL
                  </>
                )}
              </span>
              
              {/* 3D Reflection Effect */}
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%)] bg-[length:250%_250%] group-hover:animate-shimmer" />
            </Button>
          </form>
          
          <div className="text-center pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold">
                Criptografia de Ponta a Ponta Ativa
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Bottom Legal/Info */}
      <div className="fixed bottom-8 left-0 w-full text-center pointer-events-none">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-medium">
          NEVASFZ HEADTRICK OS • SECURED SYSTEM V2.5.0
        </p>
      </div>
    </div>
  );
}
