'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const BannerAd = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window !== 'undefined' && bannerRef.current && !bannerRef.current.firstChild) {
      const confScript = document.createElement('script');
      confScript.type = 'text/javascript';
      confScript.innerHTML = `atOptions = { 'key' : 'dc9f627d8add8a618535c95426d63bc6', 'format' : 'iframe', 'height' : 50, 'width' : 320, 'params' : {} };`;
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = 'https://www.highperformanceformat.com/dc9f627d8add8a618535c95426d63bc6/invoke.js';
      bannerRef.current.appendChild(confScript);
      bannerRef.current.appendChild(invokeScript);
    }
  }, []);
  return (
    <div className="relative z-30 flex justify-center mb-4 min-h-[50px] scale-90">
      <div ref={bannerRef}></div>
    </div>
  );
};

export default function Page() {
  const [p, setP] = useState(0);
  const [i, setI] = useState(0);
  const [t, setT] = useState(0);
  const [detalhes, setDetalhes] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => {
      router.push('/');
    }, 350);
  };

  const calcular = () => {
    try {
      let resultado: any = { total: 0, itens: [] };
      const rawP = Number(p) || 0;
      const rawI = Number(i) || 0;
      const rawT = Number(t) || 0;
      ((p, i, t) => {
        const com = p * (i / 100); resultado = { total: Number(com.toFixed(2)), itens: [{ label: 'Total de Vendas', valor: p, tipo: 'info' }, { label: 'Comissão Aplicada', valor: i, tipo: 'porcentagem' }] };
        setDetalhes(resultado);
      })(rawP, rawI, rawT);
    } catch (err) {
      console.error("Erro no cálculo:", err);
    }
  };

  return (
    <main className={`relative min-h-screen bg-[#020617] py-4 px-4 font-sans text-white transition-all duration-500 ease-in-out ${isVisible && !isExiting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="fixed inset-0 bg-[#020617] -z-10 pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-900/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-xl mx-auto">
        <header className="relative mb-3 text-center pt-2">
          <button onClick={handleBack} className="absolute -top-1 -right-1 group flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 w-9 h-9 rounded-full transition-all active:scale-90">
            <span className="text-slate-400 group-hover:text-white text-xs font-black">✕</span>
          </button>
          
          <h1 className="text-2xl sm:text-3xl font-black tracking-tighter italic uppercase leading-none mb-1">{ "Comissão" }</h1>
          <div className="h-1 w-12 bg-fuchsia-600 mx-auto rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] mb-3"></div>
          
          <BannerAd />
        </header>

        <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-5 sm:p-8">
            
            <div className="mb-3 text-left">
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Valor da Venda (R$)</label>
              <input 
                type="number" step="0.01" placeholder="0,00"
                onChange={(e) => setP(Number(e.target.value))} 
                className="w-full p-3 bg-slate-900/50 border border-white/10 rounded-xl outline-none focus:border-fuchsia-500 transition-all text-white font-mono text-sm" 
              />
            </div>
            <div className="mb-3 text-left">
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Comissão (%)</label>
              <input 
                type="number" step="0.01" placeholder="0,00"
                onChange={(e) => setI(Number(e.target.value))} 
                className="w-full p-3 bg-slate-900/50 border border-white/10 rounded-xl outline-none focus:border-fuchsia-500 transition-all text-white font-mono text-sm" 
              />
            </div> 
            <button onClick={calcular} className="w-full mt-3 bg-white text-slate-900 font-black py-4 rounded-xl shadow-xl hover:scale-[1.01] active:scale-95 transition-all uppercase tracking-widest text-[10px]">Calcular</button>

            {detalhes && (
              <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-400">
                <div className="bg-fuchsia-500/10 p-5 rounded-2xl text-center border border-fuchsia-500/20 mb-4 relative overflow-hidden">
                  <span className="text-fuchsia-400 font-black uppercase text-[8px] tracking-[0.2em] mb-1 block italic">Resultado</span>
                  <div className="text-3xl font-black text-white tracking-tighter">
                    { "calculadora-de-comissao".includes("margem") || "calculadora-de-comissao".includes("roi") || "calculadora-de-comissao".includes("alcool") 
                        ? detalhes.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) + "%" 
                        : "R$ " + detalhes.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/5 space-y-2">
                    {detalhes.itens.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider italic">{item.label}</span>
                        <span className={`font-mono font-bold text-xs ${item.tipo === 'negativo' ? 'text-red-400' : item.tipo === 'positivo' ? 'text-emerald-400' : 'text-white'}`}>
                        { item.tipo === 'negativo' ? '- ' : '' }
                        { item.tipo === 'quantidade' ? item.valor : item.tipo === 'porcentagem' ? item.valor.toLocaleString('pt-BR') + '%' : item.tipo === 'texto' ? item.custom : "R$ " + item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }
                        </span>
                    </div>
                    ))}
                </div>
              </div>
            )}
            <div className="mt-5 pt-4 border-t border-white/5">
              <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-4 flex gap-4 items-start">
                <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </div>
                <div>
                  <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-widest mb-1">Aviso de Responsabilidade</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed italic">
                    Os cálculos gerados são estimativas baseadas nos dados fornecidos e possuem fins meramente informativos. 
                    O <strong>FerramentasPro</strong> não se responsabiliza por decisões financeiras ou legais tomadas com base nestes resultados. 
                    Recomendamos a consulta com um profissional qualificado.
                  </p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </main>
  );
}