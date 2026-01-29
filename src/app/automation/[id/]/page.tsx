import { Bot, ChevronLeft, ExternalLink, ShieldCheck, Timer } from 'lucide-react';
import Link from 'next/link';
import AutomationFlow from '@/components/AutomationFlow';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export default async function AutomationDetail({ params }: { params: { id: string } }) {
    const { id } = params;

    const { data: automation } = await supabase
        .from('automations')
        .select('*')
        .eq('id', id)
        .single();

    if (!automation) {
        notFound();
    }

    return (
        <main className="min-h-screen p-8 max-w-6xl mx-auto space-y-12">
            <header className="flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-neon-blue transition-colors group">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Hub
                </Link>
                <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-neon-green flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> STATUS: {automation.status.toUpperCase()}
                    </span>
                    <a
                        href={automation.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass px-4 py-1.5 rounded-full text-xs font-bold hover:neon-border-blue transition-all flex items-center gap-2"
                    >
                        RUN NOW <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-black tracking-tighter">
                            {automation.name.split(' ').slice(0, -1).join(' ')} <span className="text-neon-blue">{automation.name.split(' ').slice(-1)}</span>
                        </h1>
                        <p className="text-white/50 text-lg leading-relaxed">
                            {automation.description}
                        </p>
                    </div>

                    <AutomationFlow
                        nodes={automation.flow_data?.nodes}
                        edges={automation.flow_data?.edges}
                    />

                    <div className="glass p-8 rounded-3xl space-y-6">
                        <h2 className="text-2xl font-bold border-b border-white/5 pb-4">Technical Documentation</h2>
                        <div className="prose prose-invert max-w-none text-white/60 space-y-4 whitespace-pre-wrap">
                            {automation.documentation || 'No documentation provided for this neural node.'}
                        </div>
                    </div>
                </div>

                <aside className="space-y-8">
                    <div className="glass p-6 rounded-2xl border-white/5">
                        <h3 className="text-sm font-bold text-white/30 uppercase tracking-widest mb-4">Meta Data</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-white/40 text-sm">Last Sync</span>
                                <span className="text-white font-mono text-xs text-neon-blue">
                                    {automation.last_sync ? new Date(automation.last_sync).toLocaleTimeString() : 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/40 text-sm">Category</span>
                                <span className="text-white font-mono text-xs">{automation.category || 'General'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/40 text-sm">Frequency</span>
                                <span className="text-white font-mono text-xs flex items-center gap-1">
                                    <Timer className="w-3 h-3" /> {automation.frequency}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="glass p-6 rounded-2xl border-neon-purple/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-neon-purple/10 blur-2xl transition-all group-hover:bg-neon-purple/20" />
                        <h3 className="text-sm font-bold text-neon-purple uppercase tracking-widest mb-4">Operational Endpoints</h3>
                        <div className="space-y-3">
                            {['/api/v1/sync', '/api/v1/logs', '/api/v1/health'].map((endpoint) => (
                                <div key={endpoint} className="bg-black/40 p-3 rounded-lg border border-white/5 font-mono text-[10px] text-white/50 hover:text-white hover:border-neon-purple/30 transition-all cursor-copy">
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
