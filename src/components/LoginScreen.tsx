"use client"

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Lock, User, ShieldAlert, Loader2 } from "lucide-react";
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
    await new Promise(resolve => setTimeout(resolve, 800));

    const isValidUser = username.toLowerCase().endsWith("fz");
    const isValidPass = password === "0";

    if (isValidUser && isValidPass) {
      setSuccessMsg("Entrando no Headtrick...");
      setTimeout(() => {
        onLoginSuccess();
      }, 1500);
    } else {
      setError("Acesso negado");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md glass border-primary/20 shadow-neon-purple overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
        
        <CardHeader className="text-center relative pt-10">
          <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 border border-primary/30 shadow-neon-purple">
            <Lock className="text-primary w-8 h-8" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tighter text-neon font-headline">
            NEVASFZ <span className="text-white/90">HEADTRICK</span>
          </CardTitle>
          <p className="text-muted-foreground text-sm mt-2 font-body">Identifique-se para acessar o sistema</p>
        </CardHeader>

        <CardContent className="space-y-6 relative pb-10">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/70" />
                <Input
                  placeholder="Usuário"
                  className="pl-10 bg-black/40 border-white/10 focus:border-primary/50 focus:ring-primary/20 h-12 transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/70" />
                <Input
                  type="password"
                  placeholder="Senha"
                  className="pl-10 bg-black/40 border-white/10 focus:border-primary/50 focus:ring-primary/20 h-12 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20 animate-in fade-in slide-in-from-top-2 duration-300">
                <ShieldAlert className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="flex items-center gap-2 text-primary bg-primary/10 p-3 rounded-md border border-primary/20 animate-in fade-in slide-in-from-top-2 duration-300">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs font-semibold uppercase tracking-wider">{successMsg}</span>
              </div>
            )}

            <Button 
              type="submit" 
              className={cn(
                "w-full h-12 text-md font-bold transition-all duration-300 relative group overflow-hidden shadow-neon-purple",
                isLoading ? "opacity-70" : "hover:scale-[1.02] active:scale-[0.98]"
              )}
              disabled={isLoading || !!successMsg}
            >
              <div className="absolute inset-0 bg-primary opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>Verificando...</>
                ) : (
                  <>ACESSAR PAINEL</>
                )}
              </span>
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] opacity-50">
              System Ver. 2.5.0-fz
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
