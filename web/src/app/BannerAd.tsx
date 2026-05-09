'use client';
import { useEffect, useRef } from 'react';

export default function BannerAd() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verifica se o script já foi carregado para não duplicar
    if (bannerRef.current && !bannerRef.current.firstChild) {
      const confScript = document.createElement('script');
      confScript.type = 'text/javascript';
      confScript.innerHTML = `
        atOptions = {
          'key' : 'dc9f627d8add8a618535c95426d63bc6',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };
      `;

      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = 'https://www.highperformanceformat.com/dc9f627d8add8a618535c95426d63bc6/invoke.js';

      bannerRef.current.appendChild(confScript);
      bannerRef.current.appendChild(invokeScript);
    }
  }, []);

  return (
    <div className="relative z-30 flex justify-center my-4 min-h-[50px]">
      <div ref={bannerRef}></div>
    </div>
  );
}