'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Save, Loader2, Link as LinkIcon, FileText, Layout, Zap, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewAutomation() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        documentation: '',
        link: '',
        category: '',
        frequency: 'Diário',
    });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from('automations').insert([
            {
                ...formData,
                flow_data: {}, // Inicializa com dados de fluxo vazios
                status: 'active'
            },
        ]);

        if (error) {
            alert('Erro ao criar automação: ' + error.message);
            setLoading(false);
        } else {
            router.push('/admin/dashboard/automations');
        }
    };

    return (
        <div className="max-w-4xl space-y-8 font-sans">
            <header className="space-y-4">
                <Link href="/admin/dashboard/automations" className="flex items-center gap-2 text-white/40 hover:text-neon-blue transition-colors text-[10px] font-bold uppercase tracking-widest">
                    <ChevronLeft className="w-4 h-4" /> Voltar para Gestão
                </Link>
                <h1 className="text-4xl font-black tracking-tight italic uppercase flex items-center gap-3">
                    <Zap className="w-8 h-8 neon-text-blue" />
                    Edificar <span className="text-neon-blue">Novo Fluxo.</span>
                </h1>
                <p className="text-white/40 font-medium">Cadastre um novo processo inteligente e defina sua estrutura de documentação técnica.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Informações Principais */}
                    <div className="glass p-8 rounded-3xl border-white/5 space-y-6 bg-black/20">
                        <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Metadados do Processo
                        </h3>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest pl-1">Nome da Automação</label>
                            <input
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="ex: Conciliação Bradesco OFX"
                                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:outline-none focus:neon-border-blue transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest pl-1">Endpoint de Execução (Opcional)</label>
                            <div className="relative">
                                <input
                                    value={formData.link}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    placeholder="https://sua-vps.com/api/sync"
                                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:outline-none focus:neon-border-blue transition-all pl-10"
                                />
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest pl-1">Categoria</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:neon-border-blue transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Selecionar</option>
                                    <option value="Financeiro">Financeiro</option>
                                    <option value="Administrativo">Administrativo</option>
                                    <option value="TI / Infra">TI / Infra</option>
                                    <option value="Jurídico">Jurídico</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest pl-1">Frequência</label>
                                <select
                                    value={formData.frequency}
                                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:neon-border-blue transition-all appearance-none cursor-pointer"
                                >
                                    <option value="Em tempo real">Tempo Real</option>
                                    <option value="Hora em hora">Hora em Hora</option>
                                    <option value="Diário">Diário</option>
                                    <option value="Semanal">Semanal</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Documentação */}
                    <div className="glass p-8 rounded-3xl border-white/5 space-y-6 bg-black/20">
                        <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <Layout className="w-4 h-4" /> Documentação Técnica
                        </h3>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest pl-1">Resumo Curto (Home)</label>
                            <textarea
                                rows={3}
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Breve explicação do propósito deste fluxo..."
                                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:outline-none focus:neon-border-blue transition-all resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest pl-1">Documentação Detalhada (Markdown)</label>
                            <textarea
                                rows={6}
                                value={formData.documentation}
                                onChange={(e) => setFormData({ ...formData, documentation: e.target.value })}
                                placeholder="# Detalhes da Implementação\n\n1. Conectar à API...\n2. Mapear campos..."
                                className="w-full bg-black/40 border border-white/5 font-mono text-sm rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:outline-none focus:neon-border-blue transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-8 py-3 rounded-xl border border-white/5 hover:bg-white/5 transition-all text-sm font-bold uppercase tracking-widest"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-white text-black font-black px-12 py-3 rounded-xl hover:bg-neon-blue hover:text-white transition-all duration-300 flex items-center gap-2 disabled:opacity-50 uppercase text-xs tracking-widest shadow-xl"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Edificar Processo
                    </button>
                </div>
            </form>
        </div>
    );
}
