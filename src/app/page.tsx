
"use client"

import React, { useState, useEffect } from 'react';
import LoginScreen from "@/components/LoginScreen";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check local storage for existing auth and username
    const authStatus = localStorage.getItem('fz_auth');
    const storedUser = localStorage.getItem('fz_user');
    
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      if (storedUser) {
        setUsername(storedUser);
      }
    }
  }, []);

  const handleLoginSuccess = (user: string) => {
    setIsAuthenticated(true);
    setUsername(user);
    localStorage.setItem('fz_auth', 'true');
    localStorage.setItem('fz_user', user);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    localStorage.removeItem('fz_auth');
    localStorage.removeItem('fz_user');
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen">
      {!isAuthenticated ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Dashboard onLogout={handleLogout} username={username} />
      )}
    </main>
  );
}
