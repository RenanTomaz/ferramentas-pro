'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Termos() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  // Efeito de entrada suave ao carregar
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

  return (
    <main className={`relative min-h-screen bg-[#020617] py-12 px-6 font-sans text-white transition-all duration-500 ease-in-out ${isVisible && !isExiting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      
      {/* Camada fixa azul marinho para garantir transição sem flash branco */}
      <div className="fixed inset-0 bg-[#020617] -z-10 pointer-events-none" />

      {/* Brilho de fundo posicionado no topo */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <button 
            onClick={handleBack}
            className="group mb-8 flex items-center gap-3 mx-auto bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-3 rounded-full transition-all active:scale-95"
          >
            <span className="text-slate-400 group-hover:text-blue-400 transition-colors text-[10px] font-black uppercase tracking-[0.3em]">Voltar</span>
          </button>
          
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter italic uppercase leading-none text-white">
            Termos de <span className="text-blue-500">Uso</span>
          </h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full mt-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        </header>

        <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl p-8 sm:p-12">
          <div className="space-y-10">
            
            <section className="space-y-4">
              <h2 className="text-sm font-black text-blue-400 uppercase tracking-[0.3em] italic">01. Natureza das Ferramentas</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                As calculadoras e simuladores disponíveis neste site são oferecidos para fins <span className="text-white font-bold italic">meramente informativos e didáticos</span>. 
                Os resultados apresentados são estimativas baseadas em parâmetros padrão e não devem ser interpretados como aconselhamento financeiro, jurídico ou contábil oficial.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-black text-blue-400 uppercase tracking-[0.3em] italic">02. Isenção de Responsabilidade</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                O uso das informações geradas por estas ferramentas é de sua inteira responsabilidade. 
                O <strong>FerramentasPro</strong> não se responsabiliza por quaisquer perdas, danos ou decisões tomadas com base nos cálculos aqui gerados. Recomendamos sempre a consulta com um profissional qualificado.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-black text-blue-400 uppercase tracking-[0.3em] italic">03. Propriedade Intelectual</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                O design, a arquitetura da roleta 3D e a lógica de processamento local são propriedades intelectuais deste projeto. 
                A reprodução total ou parcial do código e do layout sem autorização prévia é estritamente proibida.
              </p>
            </section>

          </div>
          
          <footer className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em]">Ultima atualização em 05-05-2026</p>
          </footer>
        </div>
      </div>
    </main>
  );
}