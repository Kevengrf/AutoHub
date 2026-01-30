'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Cpu, Trash2, ExternalLink, RefreshCw, Loader2, AlertTriangle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AutomationsManagement() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [automations, setAutomations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const fetchAutomations = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('automations')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) setAutomations(data || []);
        setLoading(false);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchAutomations();
    }, [fetchAutomations]);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Tem certeza que deseja remover permanentemente a automação "${name}"?`)) return;

        setDeletingId(id);
        const { error } = await supabase
            .from('automations')
            .delete()
            .eq('id', id);

        if (error) {
            setMessage({ type: 'error', text: `Erro: ${error.message}` });
        } else {
            setMessage({ type: 'success', text: `Automação "${name}" removida com sucesso!` });
            setAutomations(automations.filter(a => a.id !== id));
        }
        setDeletingId(null);

        // Limpar mensagem após 3 segundos
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div className="space-y-12 font-sans">
            <header className="flex justify-between items-end">
                <div className="space-y-4">
                    <h1 className="text-4xl font-black tracking-tight uppercase italic">Gestão de <span className="text-neon-blue">Fluxos.</span></h1>
                    <p className="text-white/40 leading-relaxed max-w-xl font-medium">
                        Monitore e gerencie as automações ativas na infraestrutura do Grupo Baptista Leal.
                    </p>
                </div>
                <button
                    onClick={fetchAutomations}
                    className="p-3 glass rounded-xl hover:neon-border-blue transition-all group"
                    title="Recarregar"
                >
                    <RefreshCw className={`w-5 h-5 text-white/40 group-hover:text-neon-blue ${loading ? 'animate-spin' : ''}`} />
                </button>
            </header>

            {message && (
                <div className={`p-4 rounded-xl border flex items-center justify-center gap-3 animate-in fade-in zoom-in duration-300 ${message.type === 'success'
                    ? 'bg-neon-green/10 border-neon-green/20 text-neon-green'
                    : 'bg-neon-pink/10 border-neon-pink/20 text-neon-pink'
                    }`}>
                    {message.type === 'success' ? <ShieldCheck className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                    <span className="text-sm font-bold uppercase tracking-wider">{message.text}</span>
                </div>
            )}

            <div className="glass rounded-[24px] md:rounded-[32px] border-white/5 overflow-hidden">
                {/* Desktop Table */}
                <table className="hidden md:table w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/5">
                            <th className="px-8 py-5 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Automação</th>
                            <th className="px-8 py-5 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Status</th>
                            <th className="px-8 py-5 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Última Sincronização</th>
                            <th className="px-8 py-5 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan={4} className="px-8 py-10">
                                        <div className="h-4 bg-white/5 rounded w-1/3" />
                                    </td>
                                </tr>
                            ))
                        ) : automations.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-8 py-20 text-center">
                                    <p className="text-white/20 uppercase font-mono tracking-widest text-sm italic">Nenhuma automação personalizada encontrada.</p>
                                </td>
                            </tr>
                        ) : (
                            automations.map((item) => (
                                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 glass rounded-xl group-hover:neon-border-blue transition-all">
                                                <Cpu className="w-5 h-5 text-neon-blue" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white uppercase tracking-tight">{item.name}</p>
                                                <p className="text-xs text-white/30 line-clamp-1">{item.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${item.status === 'active'
                                            ? 'bg-neon-green/10 text-neon-green border border-neon-green/20'
                                            : 'bg-white/5 text-white/40 border border-white/10'
                                            }`}>
                                            {item.status || 'Active'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-xs font-mono text-white/40">
                                            {item.last_sync ? new Date(item.last_sync).toLocaleString() : 'Nunca sincronizado'}
                                        </p>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link
                                                href={`/automation/${item.id}`}
                                                className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors"
                                                title="Ver Mapeamento"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id, item.name)}
                                                disabled={deletingId === item.id}
                                                className="p-2 hover:bg-neon-pink/10 rounded-lg text-white/20 hover:text-neon-pink transition-colors disabled:opacity-50"
                                                title="Excluir Permanentemente"
                                            >
                                                {deletingId === item.id ? <Loader2 className="w-4 h-4 animate-spin text-neon-pink" /> : <Trash2 className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Mobile Card List */}
                <div className="md:hidden divide-y divide-white/5">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="p-6 animate-pulse space-y-4">
                                <div className="h-4 bg-white/5 rounded w-1/2" />
                                <div className="h-4 bg-white/5 rounded w-full" />
                            </div>
                        ))
                    ) : automations.length === 0 ? (
                        <div className="p-12 text-center text-white/20 uppercase font-mono tracking-widest text-xs italic">
                            Nenhuma automação.
                        </div>
                    ) : (
                        automations.map((item) => (
                            <div key={item.id} className="p-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 glass rounded-lg">
                                            <Cpu className="w-5 h-5 text-neon-blue" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white uppercase tracking-tight text-sm">{item.name}</p>
                                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${item.status === 'active'
                                                ? 'bg-neon-green/10 text-neon-green border border-neon-green/20'
                                                : 'bg-white/5 text-white/40 border border-white/10'
                                                }`}>
                                                {item.status || 'Active'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/automation/${item.id}`}
                                            className="p-2 glass rounded-lg text-white/40"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id, item.name)}
                                            className="p-2 glass rounded-lg text-neon-pink/40"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-xs text-white/30 line-clamp-2">{item.description}</p>
                                <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                                    Sync: {item.last_sync ? new Date(item.last_sync).toLocaleDateString() : 'Nunca'}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="flex justify-center mt-12">
                <Link
                    href="/admin/dashboard/new"
                    className="px-8 py-4 glass neon-border-blue rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-neon-blue/10 transition-all flex items-center gap-3 group"
                >
                    Edificar Novo Fluxo
                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                </Link>
            </div>
        </div>
    );
}
