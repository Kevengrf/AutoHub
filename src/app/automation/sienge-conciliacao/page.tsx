import { ChevronLeft, ShieldCheck, Github } from 'lucide-react';
import Link from 'next/link';
import AutomationFlow from '@/components/AutomationFlow';

export default function SiengeConciliationPage() {
    const nodes = [
        {
            id: "1",
            type: "input",
            data: { label: "📁 Início: Seleção OFX (Interface GUI)" },
            position: { x: 250, y: 0 }
        },
        {
            id: "2",
            data: { label: "📄 Parse: Dados Bancários (bank_parser.py)" },
            position: { x: 100, y: 100 }
        },
        {
            id: "3",
            data: { label: "🌐 Sinc: Consulta API Sienge (sienge_api.py)" },
            position: { x: 400, y: 100 }
        },
        {
            id: "4",
            data: { label: "🧠 Match: Motor de Decisão (matcher.py)" },
            position: { x: 250, y: 200 }
        },
        {
            id: "5",
            data: { label: "🤖 Ação: Conciliação em UI (bot_reconcile.py)" },
            position: { x: 250, y: 300 }
        },
        {
            id: "6",
            type: "output",
            data: { label: "✅ Fim: Sincronização Finalizada" },
            position: { x: 250, y: 400 }
        }
    ];

    const edges = [
        { id: "e1-2", source: "1", target: "2", animated: true },
        { id: "e1-3", source: "1", target: "3", animated: true },
        { id: "e2-4", source: "2", target: "4" },
        { id: "e3-4", source: "3", target: "4" },
        { id: "e4-5", source: "4", target: "5", animated: true },
        { id: "e5-6", source: "5", target: "6", animated: true }
    ];

    return (
        <main className="min-h-screen p-8 max-w-6xl mx-auto space-y-12 font-sans">
            <header className="flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-neon-purple transition-colors group uppercase text-[10px] font-bold tracking-widest">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Voltar ao Hub
                </Link>
                <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-neon-purple flex items-center gap-1 bg-neon-purple/5 px-3 py-1 rounded-full border border-neon-purple/20">
                        <ShieldCheck className="w-3 h-3" /> STATUS: OPERACIONAL
                    </span>
                    <a
                        href="https://github.com/Kevengrf/conciliacao-sienge"
                        target="_blank"
                        className="glass px-4 py-1.5 rounded-full text-[10px] font-bold hover:neon-border-purple transition-all flex items-center gap-2 uppercase tracking-tight"
                    >
                        VER REPOSITÓRIO <Github className="w-3 h-3" />
                    </a>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-black tracking-tighter uppercase">
                            Conciliação <span className="text-neon-purple">Sienge.</span>
                        </h1>
                        <p className="text-white/50 text-lg leading-relaxed font-medium">
                            Automação híbrida que integra a API e a interface do ERP Sienge para uma reconciliação bancária impecável, eliminando o erro humano e otimizando o fluxo de caixa do Grupo.
                        </p>
                    </div>

                    <div className="glass p-1 rounded-[32px] overflow-hidden">
                        <AutomationFlow nodes={nodes} edges={edges} />
                    </div>

                    <div className="glass p-8 rounded-3xl space-y-6">
                        <h2 className="text-2xl font-bold border-b border-white/5 pb-4 uppercase tracking-tighter">Arquitetura de Dados</h2>
                        <div className="prose prose-invert max-w-none text-white/60 space-y-4">
                            <p>Esta solução combina a velocidade das APIs REST com a versatilidade do RPA para automatizar tarefas de conciliação que historicamente exigiriam horas de dedicação manual da nossa equipe financeira.</p>

                            <h3 className="text-white font-bold mt-6 uppercase text-sm tracking-widest">Pilares Estratégicos</h3>
                            <ul className="list-disc pl-5 space-y-4 marker:text-neon-purple">
                                <li><strong>Parsing Dinâmico</strong>: Motor especializado que interpreta arquivos OFX de qualquer origem bancária.</li>
                                <li><strong>Sincronização via API</strong>: Comunicação direta com o núcleo do ERP para consulta de saldos e lançamentos pendentes.</li>
                                <li><strong>Matching Heurístico</strong>: Algoritmo próprio que cruza dados por valor, data e similaridade descritiva.</li>
                                <li><strong>Processamento RPA</strong>: Execução final no portal web para confirmação e encerramento dos registros conciliados.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <aside className="space-y-8">
                    <div className="glass p-6 rounded-2xl border-white/5 bg-black/20">
                        <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Núcleo Tecnológico</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-white/40 text-xs">Framework</span>
                                <span className="text-white font-mono text-[10px] text-neon-purple uppercase">Python / Playwright</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-white/40 text-xs">Sistema ERP</span>
                                <span className="text-white font-mono text-[10px] uppercase">Plataforma Sienge</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/40 text-xs">Interface</span>
                                <span className="text-white font-mono text-[10px] uppercase">REST API + OFX</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 glass rounded-2xl border-neon-purple/20 bg-neon-purple/5">
                        <h4 className="text-sm font-bold mb-2">Transformação Digital</h4>
                        <p className="text-white/50 text-xs leading-relaxed">
                            &quot;Onde cada detalhe é inspirado na sua família. Na TI, edificamos processos que garantem a segurança e transparência dos nossos resultados.&quot;
                        </p>
                    </div>
                </aside>
            </div>
        </main>
    );
}
