import { ChevronLeft, ShieldCheck, Github, CreditCard } from 'lucide-react';
import Link from 'next/link';
import AutomationFlow from '@/components/AutomationFlow';

export default function PayfySiengePage() {
    const nodes = [
        {
            id: "1",
            type: "input",
            data: { label: "📡 API: Captura de Transações Payfy" },
            position: { x: 250, y: 0 }
        },
        {
            id: "2",
            data: { label: "🗺️ Map: Tradução de Centro de Custo" },
            position: { x: 250, y: 100 }
        },
        {
            id: "3",
            data: { label: "🔍 Check: Verificação de Duplicidade" },
            position: { x: 250, y: 200 }
        },
        {
            id: "4",
            data: { label: "📝 Load: Criação de Título (Contas a Pagar)" },
            position: { x: 100, y: 300 }
        },
        {
            id: "5",
            data: { label: "🖼️ Anexo: Upload de Comprovante Digital" },
            position: { x: 400, y: 300 }
        },
        {
            id: "6",
            type: "output",
            data: { label: "✅ Fim: Fluxo Sincronizado" },
            position: { x: 250, y: 400 }
        }
    ];

    const edges = [
        { "id": "e1-2", "source": "1", "target": "2", "animated": true },
        { "id": "e2-3", "source": "2", "target": "3", "animated": true },
        { "id": "e3-4", "source": "3", "target": "4", "animated": true },
        { "id": "e3-5", "source": "3", "target": "5", "animated": true },
        { "id": "e4-6", "source": "4", "target": "6", "animated": true },
        { "id": "e5-6", "source": "5", "target": "6", "animated": true }
    ];

    return (
        <main className="min-h-screen p-8 max-w-6xl mx-auto space-y-12 font-sans">
            <header className="flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-neon-pink transition-colors group uppercase text-[10px] font-bold tracking-widest">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Voltar ao Hub
                </Link>
                <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-neon-pink flex items-center gap-1 bg-neon-pink/5 px-3 py-1 rounded-full border border-neon-pink/20">
                        <ShieldCheck className="w-3 h-3" /> STATUS: OPERACIONAL
                    </span>
                    <a
                        href="https://github.com/Kevengrf/payfy-sienge-integration"
                        target="_blank"
                        className="glass px-4 py-1.5 rounded-full text-[10px] font-bold hover:neon-border-pink transition-all flex items-center gap-2 uppercase tracking-tight"
                    >
                        VER REPOSITÓRIO <Github className="w-3 h-3" />
                    </a>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-black tracking-tighter italic uppercase">
                            Payfy <span className="text-neon-pink text-3xl align-middle px-2">X</span> Sienge.
                        </h1>
                        <p className="text-white/50 text-lg leading-relaxed font-medium">
                            Sincronização inteligente de despesas: Integre cartões corporativos Payfy diretamente ao setor de Contas a Pagar do ERP Sienge, garantindo um legado de organização e prontidão financeira.
                        </p>
                    </div>

                    <div className="glass p-1 rounded-[32px] overflow-hidden">
                        <AutomationFlow nodes={nodes} edges={edges} />
                    </div>

                    <div className="glass p-8 rounded-3xl space-y-6">
                        <h2 className="text-2xl font-bold border-b border-white/5 pb-4 uppercase tracking-tighter">Lógica Corporativa</h2>
                        <div className="prose prose-invert max-w-none text-white/60 space-y-4">
                            <p>Esta automação elimina a digitação manual de notas e despesas, garantindo que cada gasto seja devidamente provisionado com o anexo do recibo original.</p>

                            <h3 className="text-white font-bold mt-6 uppercase text-sm tracking-widest">Pilares Estratégicos</h3>
                            <ul className="list-disc pl-5 space-y-4 marker:text-neon-pink">
                                <li><strong>Sincronização via API</strong>: Conexão direta via tokens de segurança entre as nuvens Payfy e Sienge.</li>
                                <li><strong>Mapeamento Automatizado</strong>: Tradução de Centros de Custo entre os sistemas de forma paramétrica.</li>
                                <li><strong>Gestão de Documentos (GED)</strong>: Upload automático da imagem do comprovante para o módulo de anexos do ERP.</li>
                                <li><strong>Integridade de Dados</strong>: Sistema que previne a duplicidade de títulos através do ID único da transação.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <aside className="space-y-8">
                    <div className="glass p-6 rounded-2xl border-white/5 bg-black/20">
                        <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Metadados do Sistema</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-white/40 text-[11px]">Linguagem</span>
                                <span className="text-white font-mono text-[10px] text-neon-pink uppercase">Python 3.x</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/40 text-[11px]">Módulo ERP</span>
                                <span className="text-white font-mono text-[10px] flex items-center gap-1 uppercase">
                                    <CreditCard className="w-3 h-3" /> Contas a Pagar
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 glass rounded-2xl border-neon-pink/20 bg-neon-pink/5">
                        <h4 className="text-sm font-bold mb-2">Conectividade e Evolução</h4>
                        <p className="text-white/50 text-xs leading-relaxed italic">
                            &quot;Onde cada detalhe é inspirado na sua família. Na Baptista Leal, usamos tecnologia de ponta para edificar processos transparentes e eficientes.&quot;
                        </p>
                    </div>
                </aside>
            </div>
        </main>
    );
}
