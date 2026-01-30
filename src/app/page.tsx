import Link from 'next/link';
import Image from 'next/image';
import { Cpu, Zap, ChevronRight, LayoutDashboard } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default async function Home() {
  const { data: automations } = await supabase
    .from('automations')
    .select('*')
    .order('created_at', { ascending: false });

  // Mapa de ícones para as automações migradas
  const iconMap: Record<string, string> = {
    'Automação Caixa OFX': '/img/caixaico.png',
    'Conciliação Sienge': '/img/siengeico.png',
    'Payfy X Sienge': '/img/payfyico.png',
    'Auto Título Sienge': '/img/siengeico.png'
  };

  // Cores de neon para variedade visual
  const neonColors = ['blue', 'purple', 'pink', 'green'];

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-8 overflow-hidden font-sans">
      {/* Elementos de fundo animados */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-blue/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-purple/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="z-10 w-full max-w-6xl">
        <header className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12 md:mb-20 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="flex flex-col sm:flex-row items-center gap-4 group">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 glass neon-border-blue rounded-lg group-hover:neon-glow-purple transition-all duration-500 flex items-center justify-center">
                <Image
                  src="/img/cblicodark.png"
                  alt="CBL Icon"
                  width={34}
                  height={34}
                  className="brightness-125 contrast-125 drop-shadow-[0_0_8px_rgba(0,195,255,0.5)]"
                />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                AUTOHUB
              </span>
            </Link>

            <div className="hidden sm:flex relative items-center gap-3 pl-4 border-l border-white/10 ml-2 group">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-center px-4 py-2 bg-black/20 rounded-xl border border-white/5 backdrop-blur-sm transition-all duration-300">
                <Image
                  src="/img/logonavblack.png"
                  alt="Hub Logo"
                  width={150}
                  height={40}
                  className="brightness-125 contrast-125 object-contain h-6 md:h-8 w-auto"
                />
              </div>
            </div>
          </div>

          <Link href="/admin" className="glass px-6 py-2 rounded-full text-sm font-medium hover:neon-border-blue transition-all flex items-center gap-2 uppercase tracking-widest text-white/70">
            <LayoutDashboard className="w-4 h-4" />
            Portal de TI
          </Link>
        </header>

        <section className="text-center mb-16 md:mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/5 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-neon-blue mb-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <Zap className="w-3 h-3" />
            <span>Edificando o Futuro da Automação</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 uppercase leading-none">
            Inovação que <span className="text-neon-blue inline-block hover:scale-105 transition-transform cursor-default">Simplifica.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 font-medium px-4 md:px-0">
            O hub central de inteligência da Baptista Leal. Visualize, controle e otimize nossos fluxos neurais de forma escalável e eficiente.
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          {automations?.map((item, index) => {
            const neonColor = neonColors[index % neonColors.length];
            const customIcon = iconMap[item.name];

            return (
              <Link
                key={item.id}
                href={`/automation/${item.id}`}
                className={`glass p-8 rounded-2xl border-white/5 hover:neon-border-${neonColor} transition-all duration-500 group cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[290px]`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-neon-${neonColor}/5 blur-3xl group-hover:bg-neon-${neonColor}/10 transition-all`} />
                <div>
                  <div className={`w-16 h-16 mb-6 p-3 glass rounded-xl flex items-center justify-center border-white/5 group-hover:neon-border-${neonColor} transition-all shadow-inner bg-black/40`}>
                    {customIcon ? (
                      <Image src={customIcon} alt={item.name} width={44} height={44} className="object-contain" />
                    ) : (
                      <Cpu className="w-10 h-10 text-white group-hover:text-white transition-colors" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tighter uppercase">
                    {item.name.split(' ').map((word: string, i: number) => (
                      <span key={i} className={i === item.name.split(' ').length - 1 ? `text-neon-${neonColor}` : ''}>
                        {word}{' '}
                      </span>
                    ))}
                  </h3>
                  <p className="text-white/40 leading-relaxed text-sm line-clamp-2">{item.description}</p>
                </div>
                <div className={`mt-6 flex items-center gap-2 text-[10px] font-black text-white/20 group-hover:text-neon-${neonColor} transition-colors uppercase tracking-widest`}>
                  Ver Documentação <ChevronRight className="w-3 h-3" />
                </div>
              </Link>
            );
          })}

          {(!automations || automations.length === 0) && (
            <div className="col-span-full py-20 text-center glass rounded-3xl border-dashed border-white/10">
              <p className="text-white/20 uppercase font-mono tracking-widest italic">Aguardando novos fluxos da Inova TI...</p>
            </div>
          )}
        </div>

        <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col items-center gap-6">
          <Image
            src="/img/cblicodark.png"
            alt="Grupo Baptista Leal"
            width={70}
            height={70}
            className="opacity-40 hover:opacity-100 transition-all duration-700 cursor-help"
          />
          <div className="flex flex-col items-center gap-2">
            <p className="text-white/10 text-[9px] font-mono uppercase tracking-[0.4em] text-center">
              Arquitetura de Sistemas Distribuídos • Inova TI
            </p>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider text-center">
              Edificando sonhos, construindo lares desde 1997
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
