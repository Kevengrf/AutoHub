import { ChevronLeft, ShieldCheck, Github } from 'lucide-react';
import Link from 'next/link';
import AutomationFlow from '@/components/AutomationFlow';

export default function CaixaAutomationPage() {
    const nodes = [
        {
            id: "1",
            type: "input",
            data: { label: "🚀 Início: Init Playwright (Modo Stealth)" },
            position: { x: 250, y: 0 }
        },
        {
            id: "2",
            data: { label: "🔑 Auth: Fluxo de Login Caixa" },
            position: { x: 250, y: 100 }
        },
        {
            id: "3",
            data: { label: "📂 Navegação: Painel Gerenciador Empresa" },
            position: { x: 250, y: 200 }
        },
        {
            id: "4",
            data: { label: "⚙️ Proces: Seleção de Contas e Exportação OFX" },
            position: { x: 250, y: 300 }
        },
        {
            id: "5",
            data: { label: "💾 Armaz: Pasta Local (Área de Trabalho)" },
            position: { x: 250, y: 400 }
        },
        {
            id: "6",
            type: "output",
            data: { label: "✅ Fim: Atualização de Log e Finalização" },
            position: { x: 250, y: 500 }
        }
    ];

    const edges = [
        { id: "e1-2", source: "1", target: "2", animated: true },
        { id: "e2-3", source: "2", target: "3", animated: true },
        { id: "e3-4", source: "3", target: "4", animated: true },
        { id: "e4-5", source: "4", target: "5", animated: true },
        { id: "e5-6", source: "5", target: "6", animated: true }
    ];

    return (
        <main className="min-h-screen p-8 max-w-6xl mx-auto space-y-12">
            <header className="flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-neon-blue transition-colors group uppercase text-[10px] font-bold tracking-widest">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Voltar ao Hub
                </Link>
                <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-neon-green flex items-center gap-1 bg-neon-green/5 px-3 py-1 rounded-full border border-neon-green/20">
                        <ShieldCheck className="w-3 h-3" /> STATUS: OPERACIONAL
                    </span>
                    <a
                        href="https://github.com/Kevengrf/Automa-Caixa-ofx"
                        target="_blank"
                        className="glass px-4 py-1.5 rounded-full text-[10px] font-bold hover:neon-border-blue transition-all flex items-center gap-2 uppercase tracking-tight"
                    >
                        VER REPOSITÓRIO <Github className="w-3 h-3" />
                    </a>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-black tracking-tighter uppercase">
                            Caixa OFX <span className="text-neon-blue">Automation.</span>
                        </h1>
                        <p className="text-white/50 text-lg leading-relaxed font-medium">
                            Análise técnica de fluxo: Automação robusta desenvolvida para extração automatizada de extratos bancários, garantindo agilidade e precisão nos fechamentos financeiros do Grupo.
                        </p>
                    </div>

                    <div className="glass p-1 rounded-[32px] overflow-hidden">
                        <AutomationFlow nodes={nodes} edges={edges} />
                    </div>

                    <div className="glass p-8 rounded-3xl space-y-6">
                        <h2 className="text-2xl font-bold border-b border-white/5 pb-4 uppercase tracking-tighter">Detalhamento Logístico</h2>
                        <div className="prose prose-invert max-w-none text-white/60 space-y-4">
                            <p>Esta automação foi projetada para operar de forma transparente, simulando a interação humana em alto nível para evitar bloqueios de segurança do portal bancário.</p>

                            <h3 className="text-white font-bold mt-6 uppercase text-sm tracking-widest">Pilares da Solução</h3>
                            <ul className="list-disc pl-5 space-y-4 marker:text-neon-blue">
                                <li><strong>Playwright Stealth</strong>: Utiliza técnicas de evasão para total compatibilidade com os sistemas de segurança da Caixa.</li>
                                <li><strong>Organização Diária</strong>: Gerenciamento automático de pastas por data, facilitando o acesso da equipe de controladoria.</li>
                                <li><strong>Prevenção de Duplicidade</strong>: Sistema de check de logs para evitar downloads redundantes, economizando processamento e banda.</li>
                                <li><strong>Arquitetura Multiplataforma</strong>: Scripts prontos para execução em qualquer ambiente operacional da Baptista Leal.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <aside className="space-y-8">
                    <div className="glass p-6 rounded-2xl border-white/5 bg-black/20">
                        <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Especificações</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-white/40 text-xs">Tecnologia</span>
                                <span className="text-white font-mono text-[10px] text-neon-blue uppercase">Python / Playwright</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-white/40 text-xs">Alvo Principal</span>
                                <span className="text-white font-mono text-[10px] uppercase">Caixa Econômica</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/40 text-xs">Tipo de Fluxo</span>
                                <span className="text-white font-mono text-[10px] uppercase">Automated RPA</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 glass rounded-2xl border-neon-blue/20 bg-neon-blue/5">
                        <h4 className="text-sm font-bold mb-2">Inova TI</h4>
                        <p className="text-white/50 text-xs leading-relaxed">
                            &quot;Edificando processos, construindo eficiência. Esta automação faz parte do projeto de Transformação Digital da Baptista Leal.&quot;
                        </p>
                    </div>
                </aside>
            </div>
        </main>
    );
}
