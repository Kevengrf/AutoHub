'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Bot, ChevronLeft, ExternalLink, ShieldCheck, Timer, Cpu, GitBranch, Terminal } from 'lucide-react';
import Link from 'next/link';
import AutomationFlow from '@/components/AutomationFlow';
import { supabase } from '@/lib/supabase';

export default function AutomationDetail() {
    const { id } = useParams();
    const [automation, setAutomation] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) fetchAutomation();
    }, [id]);

    const fetchAutomation = async () => {
        const { data, error } = await supabase
            .from('automations')
            .select('*')
            .eq('id', id)
            .single();

        if (!error) setAutomation(data);
        setLoading(false);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue"></div>
        </div>
    );

    if (!automation) return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
            <h1 className="text-2xl font-bold uppercase tracking-tighter text-white/40">Fluxo não encontrado</h1>
            <Link href="/" className="text-neon-blue hover:underline uppercase text-xs font-black">Voltar ao Hub</Link>
        </div>
    );

    return (
        <main className="min-h-screen p-8 max-w-6xl mx-auto space-y-12 font-sans">
            <header className="flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-neon-blue transition-colors group uppercase text-[10px] font-bold tracking-widest">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Voltar ao Hub
                </Link>
                <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-mono flex items-center gap-1 px-3 py-1 rounded-full border ${automation.status === 'active'
                            ? 'text-neon-green bg-neon-green/5 border-neon-green/20'
                            : 'text-white/40 bg-white/5 border-white/10'
                        }`}>
                        <ShieldCheck className="w-3 h-3" /> STATUS: {automation.status?.toUpperCase() || 'ACTIVE'}
                    </span>
                    {automation.link && (
                        <a href={automation.link} target="_blank" className="glass px-4 py-1.5 rounded-full text-[10px] font-bold hover:neon-border-blue transition-all flex items-center gap-2 uppercase tracking-tight">
                            EXECUTAR AGORA <ExternalLink className="w-3 h-3" />
                        </a>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-black tracking-tighter uppercase italic">
                            {automation.name} <span className="text-neon-blue text-4xl align-middle">.</span>
                        </h1>
                        <p className="text-white/50 text-lg leading-relaxed font-medium">
                            {automation.description || "Nenhuma descrição fornecida para este fluxo neural."}
                        </p>
                    </div>

                    <div className="glass p-1 rounded-[32px] overflow-hidden bg-black/40">
                        <AutomationFlow nodes={automation.flow_data?.nodes || []} edges={automation.flow_data?.edges || []} />
                    </div>

                    <div className="glass p-8 rounded-3xl space-y-6 bg-black/20">
                        <h2 className="text-2xl font-bold border-b border-white/5 pb-4 uppercase tracking-tighter flex items-center gap-3">
                            <Terminal className="w-6 h-6 text-neon-blue" /> Documentação Técnica
                        </h2>
                        <div className="prose prose-invert max-w-none text-white/60 space-y-4 font-medium">
                            {automation.documentation ? (
                                <div className="whitespace-pre-wrap">{automation.documentation}</div>
                            ) : (
                                <p className="italic text-white/20">A documentação detalhada para este processo está em fase de estruturação pela Inova TI.</p>
                            )}
                        </div>
                    </div>
                </div>

                <aside className="space-y-8">
                    <div className="glass p-6 rounded-2xl border-white/5 bg-black/20">
                        <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Metadados Corporativos</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-white/40 text-[11px]">Última Sincronização</span>
                                <span className="text-white font-mono text-[10px] text-neon-blue uppercase">
                                    {automation.last_sync ? new Date(automation.last_sync).toLocaleDateString() : 'Pendente'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-white/40 text-[11px]">Categoria</span>
                                <span className="text-white font-mono text-[10px] uppercase">{automation.category || 'Geral'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/40 text-[11px]">Periodicidade</span>
                                <span className="text-white font-mono text-[10px] flex items-center gap-1 uppercase">
                                    <Timer className="w-3 h-3 text-neon-blue" /> {automation.frequency || 'Manual'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 glass rounded-2xl border-neon-blue/20 bg-neon-blue/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-neon-blue/10 blur-2xl transition-all group-hover:bg-neon-blue/20" />
                        <h3 className="text-[10px] font-bold text-neon-blue uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <GitBranch className="w-4 h-4" /> Pontos de Extremidade
                        </h3>
                        <div className="space-y-3">
                            {[automation.link || '/api/v1/internal'].map((endpoint) => (
                                <div key={endpoint} className="bg-black/60 p-3 rounded-lg border border-white/5 font-mono text-[9px] text-white/50 hover:text-white hover:border-neon-blue/30 transition-all cursor-pointer truncate">
                                    {endpoint}
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}
