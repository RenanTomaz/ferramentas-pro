'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- COMPONENTE DE ANÚNCIO ---
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
    <div className="relative z-30 flex justify-center my-6 min-h-[50px] overflow-hidden">
      <div ref={bannerRef}></div>
    </div>
  );
};

const DataStreamBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    let lastTime = 0;
    const fps = 20;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    const characters = '0123456789';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(0).map(() => 
      Math.floor(Math.random() * (window.innerHeight / fontSize))
    );
    const draw = (time: number) => {
      const deltaTime = time - lastTime;
      if (deltaTime > 1000 / fps) {
        ctx.fillStyle = 'rgba(2, 6, 23, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1e293b'; 
        ctx.font = `${fontSize}px monospace`;
        for (let i = 0; i < drops.length; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) drops[i] = 0;
          drops[i]++;
        }
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    animationFrameId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" />;
};

const ferramentas = [
  { slug: "calculadora-juros-compostos", titulo: "Juros Compostos", desc: "Simule rendimentos e o poder dos juros no tempo.", cor: "from-blue-600 to-blue-800" },
  { slug: "simulador-clt-vs-pj", titulo: "Salário Líquido", desc: "Simule seu salário após deduções de INSS e IRRF.", cor: "from-emerald-600 to-emerald-800" },
  { slug: "calculadora-decimo-terceiro", titulo: "13º Salário", desc: "Cálculo preciso da sua gratificação natalina.", cor: "from-indigo-600 to-indigo-800" },
  { slug: "calculadora-horas-extras", titulo: "Horas Extras", desc: "Valorize seu tempo adicional com cálculos exatos.", cor: "from-orange-600 to-orange-800" },
  { slug: "calculadora-margem-de-lucro", titulo: "Margem de Lucro", desc: "Precificação estratégica para o seu negócio.", cor: "from-cyan-600 to-cyan-800" },
  { slug: "calculadora-de-roi", titulo: "ROI", desc: "Meça o retorno real de cada investimento realizado.", cor: "from-violet-600 to-violet-800" },
  { slug: "simulador-de-parcelamento", titulo: "Parcelamento", desc: "Descubra o custo efetivo das compras parceladas.", cor: "from-rose-600 to-rose-800" },
  { slug: "alcool-ou-gasolina", titulo: "Combustível", desc: "Economia inteligente na hora de abastecer.", cor: "from-amber-600 to-amber-800" },
  { slug: "custo-funcionario-empresa", titulo: "Custo de Contratação", desc: "Visão clara dos encargos para empreendedores.", cor: "from-slate-700 to-slate-900" },
  { slug: "calculadora-de-comissao", titulo: "Comissão", desc: "Projeção de ganhos por metas e vendas.", cor: "from-fuchsia-600 to-fuchsia-800" },
];

export default function Home() {
  const router = useRouter();
  const [rotacao, setRotacao] = useState(0);
  const [raioCilindro, setRaioCilindro] = useState(540);
  const [isExiting, setIsExiting] = useState(false);
  
  const isDragging = useRef(false);
  const startX = useRef(0);
  const rotationAtStart = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      setRaioCilindro(window.innerWidth < 640 ? 360 : 540);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalCards = ferramentas.length;
  const anguloPorCard = 360 / totalCards;

  const rotateTo = (direction: number) => {
    setRotacao(prev => prev + (direction * anguloPorCard));
  };

  const handleStart = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX;
    rotationAtStart.current = rotacao;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging.current) return;
    const deltaX = clientX - startX.current;
    setRotacao(rotationAtStart.current + (deltaX * 0.25));
  };

  const handleEnd = () => {
    isDragging.current = false;
    const indexFinal = Math.round(rotacao / anguloPorCard);
    setRotacao(indexFinal * anguloPorCard);
  };

  const handleAccess = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => {
      router.push(`/ferramentas/${slug}`);
    }, 300);
  };

  const indexAtivo = (Math.round(-rotacao / anguloPorCard) % totalCards + totalCards) % totalCards;

  return (
    <main className={`relative min-h-screen bg-[#020617] py-6 sm:py-8 px-4 sm:px-6 overflow-hidden flex flex-col justify-between font-sans select-none text-white transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      <div className="fixed inset-0 bg-[#020617] -z-10 pointer-events-none" />
      <DataStreamBackground />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-blue-500/10 blur-[120px] sm:blur-[160px] rounded-full pointer-events-none z-0"></div>

      <header className="relative z-20 text-center pt-2 mb-2">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-1 italic uppercase leading-tight">
          Ferramentas<span className="text-blue-500">Pro</span>
        </h1>
        <div className="h-1 w-16 sm:w-54 bg-blue-500 mx-auto rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] mb-4"></div>
        <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] max-w-[280px] sm:max-w-none mx-auto leading-relaxed">
          Soluções rápidas para cálculos do dia a dia.
        </p>
      </header>

      <div className="relative w-full h-[300px] sm:h-[450px] -mt-10 sm:mt-0 z-10 flex items-center justify-center [perspective:2000px]">
        
        {/* SETA ESQUERDA - Apenas Desktop */}
        <button 
          onClick={() => rotateTo(1)}
          className="hidden sm:flex absolute left-4 lg:left-20 z-30 bg-white/5 hover:bg-white/10 border border-white/10 w-14 h-14 rounded-full items-center justify-center active:scale-90 transition-all backdrop-blur-md group"
        >
          <span className="text-white/50 group-hover:text-blue-400 text-2xl font-bold transition-colors">←</span>
        </button>

        <div 
          className="relative w-[190px] h-[150px] sm:w-[280px] sm:h-[220px] [transform-style:preserve-3d] transition-transform duration-700 ease-out cursor-grab active:cursor-grabbing"
          style={{ transform: `rotateX(-8deg) rotateY(${rotacao}deg)` }}
          onMouseDown={(e) => handleStart(e.clientX)}
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchEnd={handleEnd}
        >
          {ferramentas.map((f, i) => {
            const anguloCard = i * anguloPorCard;
            const isActive = i === indexAtivo;

            return (
              <div
                key={f.slug}
                className="absolute inset-0 transition-all duration-700"
                style={{
                  transform: `rotateY(${anguloCard}deg) translateZ(${raioCilindro}px)`,
                  backfaceVisibility: 'visible',
                  opacity: isActive ? 1 : 0.50
                }}
              >
                <div className={`relative w-full h-full rounded-[1.5rem] p-4 sm:p-6 bg-gradient-to-br ${f.cor} border border-white/10 flex flex-col justify-between transition-all duration-700
                  ${!isActive ? 'scale-75 blur-[2px] backdrop-blur-md' : 'scale-110 shadow-blue-500/40 opacity-100'}`}>
                  
                  <div className="relative z-10">
                    <h3 className="text-sm sm:text-base font-black text-white mb-1 uppercase italic leading-tight">{f.titulo}</h3>
                    <p className="text-white text-[10px] font-medium italic line-clamp-2 leading-snug">{f.desc}</p>
                  </div>

                  <div className="relative z-10">
                    {isActive ? (
                      <button 
                        onClick={(e) => handleAccess(e, f.slug)}
                        className="flex items-center justify-center gap-2 w-full bg-white text-slate-900 font-black py-2 sm:py-3 rounded-xl text-[10px] uppercase tracking-widest transition-all shadow-lg hover:bg-blue-50 text-center"
                      >
                        Acessar ferramenta
                      </button>
                    ) : (
                      <div className="w-full text-center py-1 text-[8px] font-black uppercase tracking-widest text-white/20 italic font-mono">PRO_v2.7</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SETA DIREITA - Apenas Desktop */}
        <button 
          onClick={() => rotateTo(-1)}
          className="hidden sm:flex absolute right-4 lg:right-20 z-30 bg-white/5 hover:bg-white/10 border border-white/10 w-14 h-14 rounded-full items-center justify-center active:scale-90 transition-all backdrop-blur-md group"
        >
          <span className="text-white/50 group-hover:text-blue-400 text-2xl font-bold transition-colors">→</span>
        </button>
      </div>

      <footer className="relative z-20 mt-2 pt-4 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center px-4">
        <div className="flex gap-8 justify-center">
          <Link href="/privacidade" className="text-[9px] font-bold text-slate-500 hover:text-white uppercase tracking-widest no-underline">Política de Privacidade</Link>
          <Link href="/termos" className="text-[9px] font-bold text-slate-500 hover:text-white uppercase tracking-widest no-underline">Termos de Uso</Link>
        </div>
        <p className="text-[9px] font-black text-slate-800 uppercase tracking-[0.5em]">© 2026 FERRAMENTASPRO.NET</p>
      </footer>
    </main>
  );
}
