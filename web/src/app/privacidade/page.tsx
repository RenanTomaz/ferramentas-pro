'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Privacidade() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  // Efeito de entrada suave
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
      
      {/* Fundo sólido de segurança (mesmo padrão das ferramentas) */}
      <div className="fixed inset-0 bg-[#020617] -z-10 pointer-events-none" />

      {/* Brilho decorativo no fundo */}
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
            Política de Privacidade<span className="text-blue-500">.</span>
          </h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full mt-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        </header>

        <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl p-8 sm:p-12">
          <div className="space-y-10">
            <section>
              <p className="text-slate-300 leading-relaxed italic border-l-2 border-blue-500 pl-4">
                A sua privacidade é levada a sério. Esta política detalha como a tecnologia <strong>FerramentasPro</strong> protege seus dados.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-black text-blue-400 uppercase tracking-[0.3em] italic">01. Processamento Local</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Nossas ferramentas processam os dados <span className="text-white font-bold italic">exclusivamente no seu navegador</span>. 
                Os valores numéricos que você digita nunca saem do seu dispositivo; não coletamos nem armazenamos informações de cálculos em nossos servidores.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-black text-blue-400 uppercase tracking-[0.3em] italic">02. Analytics e Métricas</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Utilizamos métricas anônimas para entender o volume de acessos. Isso nos ajuda a manter a infraestrutura estável para os milhares de cálculos realizados diariamente.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-black text-blue-400 uppercase tracking-[0.3em] italic">03. Segurança da Camada</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                O site opera sob protocolos de criptografia modernos, garantindo que a sua interação com as calculadoras seja privada e protegida contra interceptações.
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