'use client';

import { useEffect, useState } from 'react';
import { Cpu, Zap, Shield, Activity, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function DashboardOverview() {
    const [stats, setStats] = useState([
        { label: 'Total de Automações', value: '0', icon: Cpu, color: 'neon-blue' },
        { label: 'Processos Ativos', value: '0', icon: Activity, color: 'neon-green' },
        { label: 'Tempo Médio de Execução', value: '4.2s', icon: Zap, color: 'neon-purple' },
        { label: 'Segurança do Sistema', value: 'Otimizada', icon: Shield, color: 'neon-pink' },
    ]);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        setLoading(true);
        const { count, error } = await supabase
            .from('automations')
            .select('*', { count: 'exact', head: true });

        if (!error && count !== null) {
            setStats(prev => prev.map(s =>
                s.label === 'Total de Automações'
                    ? { ...s, value: count.toString() }
                    : s
            ));
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);


    return (
        <div className="space-y-12 font-sans">
            <header className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase italic">Visão <span className="text-neon-blue text-4xl md:text-5xl">Geral.</span></h1>
                <p className="text-white/40 leading-relaxed max-w-xl font-medium text-sm md:text-base">
                    Bem-vindo ao centro de comando, Inova TI. O sistema reflete em tempo real o legado digital do Grupo Baptista Leal.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="glass p-6 rounded-2xl border-white/5 space-y-4 group hover:neon-border-blue transition-all duration-500">
                        <div className={`p-2 rounded-lg bg-white/5 w-fit group-hover:scale-110 transition-transform`}>
                            <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">{stat.label}</p>
                            <p className="text-2xl font-black mt-1 flex items-center gap-2">
                                {loading && stat.label.includes('Total') ? <Loader2 className="w-4 h-4 animate-spin text-white/20" /> : stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass p-8 rounded-3xl border-white/5 relative overflow-hidden bg-black/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/5 blur-3xl pointer-events-none" />
                <h2 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2 uppercase tracking-tighter">
                    <Activity className="w-5 h-5 text-neon-blue" />
                    Atividade Neural Recente
                </h2>
                <div className="space-y-4">
                    {[
                        { action: 'Integração Ativa', name: 'Sincronização Supabase Real-time', time: 'Agora' },
                        { action: 'Monitoramento', name: 'Sistema de Vigilância Inova TI', time: 'Sempre Ativo' },
                    ].map((activity, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors px-4 rounded-lg cursor-default">
                            <div className="space-y-1">
                                <p className="text-sm font-bold uppercase tracking-tight">{activity.action}</p>
                                <p className="text-xs text-white/40">{activity.name}</p>
                            </div>
                            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="pt-8 border-t border-white/5 text-center">
                <p className="text-[9px] text-white/10 font-mono uppercase tracking-[0.5em]">
                    Dados originados dinamicamente via Supabase PostgreSQL
                </p>
            </footer>
        </div>
    );
}
