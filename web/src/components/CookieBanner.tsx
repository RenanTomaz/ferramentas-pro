  'use client';
  import { useState, useEffect } from 'react';
  import Link from 'next/link';

  export default function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
      // Verifica se o usuário já aceitou os cookies anteriormente
      const hasAccepted = localStorage.getItem('cookieConsent');
      if (!hasAccepted) {
        setShowBanner(true);
      }
    }, []);

    const acceptCookies = () => {
      localStorage.setItem('cookieConsent', 'true');
      setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
      <div className="fixed bottom-6 left-6 right-6 z-[100] animate-in fade-in slide-in-from-bottom-10 duration-700">
        <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-6 rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h4 className="text-blue-400 font-black uppercase text-[10px] tracking-[0.2em] mb-2 italic">Privacidade & Protocolos</h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              Utilizamos cookies para analisar o tráfego e melhorar sua experiência nas ferramentas. 
              Ao continuar, você concorda com nossos <Link href="/termos" className="text-white underline hover:text-blue-400">Termos</Link> e <Link href="/privacidade" className="text-white underline hover:text-blue-400">Privacidade</Link>.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={acceptCookies}
              className="w-full md:w-auto bg-white text-slate-900 font-black px-8 py-3 rounded-xl text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all active:scale-95 shadow-lg"
            >
              Aceitar Termos
            </button>
          </div>
        </div>
      </div>
    );
  }