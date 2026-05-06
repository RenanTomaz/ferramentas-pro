'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
      // Aqui renomeamos para evitar conflito com os parâmetros da função interna
      const rawP = Number(p) || 0;
      const rawI = Number(i) || 0;
      const rawT = Number(t) || 0;

      ((p, i, t) => {
        const total = p * Math.pow((1 + (i / 100)), t); resultado = { total: Number(total.toFixed(2)), itens: [{ label: 'Capital Inicial', valor: p, tipo: 'info' }, { label: 'Rendimento Total', valor: Number((total - p).toFixed(2)), tipo: 'positivo' }] };
        setDetalhes(resultado);
      })(rawP, rawI, rawT);
    } catch (err) {
      console.error("Erro no cálculo:", err);
    }
  };

  return (
    <main className={`relative min-h-screen bg-[#020617] py-12 px-6 font-sans text-white transition-all duration-500 ease-in-out ${isVisible && !isExiting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="fixed inset-0 bg-[#020617] -z-10 pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <header className="mb-12 text-center">
          <button onClick={handleBack} className="group mb-8 flex items-center gap-3 mx-auto bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-3 rounded-full transition-all active:scale-95">
            <span className="text-slate-400 group-hover:text-blue-400 transition-colors text-[10px] font-black uppercase tracking-[0.3em]">Voltar</span>
          </button>
          <div className="block bg-blue-500/10 border border-blue-500/20 px-4 py-1 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-4 italic w-fit mx-auto">
            FerramentasPro
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter italic uppercase leading-none">{ "Juros Compostos" }</h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full mt-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        </header>

        <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl p-8 sm:p-12">
            
            <div className="mb-6 text-left">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Investimento Inicial (R$)</label>
              <input 
                type="number" step="0.01" placeholder="0,00"
                onChange={(e) => setP(Number(e.target.value))} 
                className="w-full p-4 bg-slate-900/50 border border-white/10 rounded-2xl outline-none focus:border-blue-500 transition-all text-white font-mono" 
              />
            </div>
            <div className="mb-6 text-left">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Taxa Anual (%)</label>
              <input 
                type="number" step="0.01" placeholder="0,00"
                onChange={(e) => setI(Number(e.target.value))} 
                className="w-full p-4 bg-slate-900/50 border border-white/10 rounded-2xl outline-none focus:border-blue-500 transition-all text-white font-mono" 
              />
            </div>
            <div className="mb-6 text-left">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Anos</label>
              <input 
                type="number" step="0.01" placeholder="0,00"
                onChange={(e) => setT(Number(e.target.value))} 
                className="w-full p-4 bg-slate-900/50 border border-white/10 rounded-2xl outline-none focus:border-blue-500 transition-all text-white font-mono" 
              />
            </div> 
            <button onClick={calcular} className="w-full mt-8 bg-white text-slate-900 font-black py-6 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-xs">Calcular</button>

            {detalhes && (
              <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-blue-500/10 p-10 rounded-[2rem] text-center border border-blue-500/20 mb-8 relative overflow-hidden">
                  <span className="text-blue-400 font-black uppercase text-[10px] tracking-[0.3em] mb-4 block italic">Resultado Final</span>
                  <div className="text-5xl sm:text-6xl font-black text-white tracking-tighter">
                    { "calculadora-juros-compostos".includes("margem") || "calculadora-juros-compostos".includes("roi") || "calculadora-juros-compostos".includes("alcool") 
                        ? detalhes.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) + "%" 
                        : "R$ " + detalhes.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-8 border border-white/5 space-y-4">
                    {detalhes.itens.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider italic">{item.label}</span>
                        <span className={`font-mono font-bold text-sm ${item.tipo === 'negativo' ? 'text-red-400' : item.tipo === 'positivo' ? 'text-emerald-400' : 'text-white'}`}>
                        { item.tipo === 'negativo' ? '- ' : '' }
                        { item.tipo === 'quantidade' ? item.valor : item.tipo === 'porcentagem' ? item.valor.toLocaleString('pt-BR') + '%' : item.tipo === 'texto' ? item.custom : "R$ " + item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }
                        </span>
                    </div>
                    ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-4 flex gap-4 items-start">
                <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-blue-400 uppercase tracking-widest mb-1">Aviso de Responsabilidade</h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed italic">
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