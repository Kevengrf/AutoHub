'use client';

import { ChevronLeft, ShieldCheck, Github, Database, ScanLine, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import AutomationFlow from '@/components/AutomationFlow';

export default function AutoTituloSiengePage() {
    const nodes = [
        {
            id: "1",
            type: "input",
            data: { label: "📂 Input: PDFs (GUI/Pasta)" },
            position: { x: 250, y: 0 }
        },
        {
            id: "2",
            data: { label: "👁️ OCR/Parser: pdfplumber + Tesseract" },
            position: { x: 250, y: 100 }
        },
        {
            id: "3",
            data: { label: "🧠 Lógica: Classificação (DAI/GUIA/BLT)" },
            position: { x: 250, y: 200 }
        },
        {
            id: "4",
            data: { label: "🗄️ DB: De-Para MySQL (CNPJ -> IDs)" },
            position: { x: 100, y: 300 }
        },
        {
            id: "5",
            data: { label: "🏗️ Build: JSON Builder & Validation" },
            position: { x: 400, y: 300 }
        },
        {
            id: "6",
            data: { label: "🚀 API: POST /bills (Sienge ERP)" },
            position: { x: 250, y: 400 }
        },
        {
            id: "7",
            type: "output",
            data: { label: "✅ Fim: Log & Upload Anexos" },
            position: { x: 250, y: 500 }
        }
    ];

    const edges = [
        { id: "e1-2", source: "1", target: "2", animated: true },
        { id: "e2-3", source: "2", target: "3", animated: true },
        { id: "e3-4", source: "3", target: "4", animated: true },
        { id: "e3-5", source: "3", target: "5", animated: true },
        { id: "e4-5", source: "4", target: "5", animated: true },
        { id: "e5-6", source: "5", target: "6", animated: true },
        { id: "e6-7", source: "6", target: "7", animated: true }
    ];

    return (
        <main className="min-h-screen p-8 max-w-6xl mx-auto space-y-12 font-sans">
            <header className="flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-neon-green transition-colors group uppercase text-[10px] font-bold tracking-widest">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Voltar ao Hub
                </Link>
                <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-neon-green flex items-center gap-1 bg-neon-green/5 px-3 py-1 rounded-full border border-neon-green/20">
                        <ShieldCheck className="w-3 h-3" /> STATUS: OPERACIONAL
                    </span>
                    <a
                        href="https://github.com/alexmiqueias-cbl/auto-titulo-sienge"
                        target="_blank"
                        className="glass px-4 py-1.5 rounded-full text-[10px] font-bold hover:neon-border-green transition-all flex items-center gap-2 uppercase tracking-tight"
                    >
                        VER REPOSITÓRIO <Github className="w-3 h-3" />
                    </a>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-black tracking-tighter uppercase">
                            Auto Título <span className="text-neon-green">Sienge.</span>
                        </h1>
                        <p className="text-white/50 text-lg leading-relaxed font-medium">
                            Automação inteligente de Contas a Pagar. Ingestão de Boletos, IPTU e ITBI com extração híbrida (OCR + Regex) e integração direta ao ERP.
                        </p>
                    </div>

                    <div className="glass p-1 rounded-[32px] overflow-hidden">
                        <AutomationFlow nodes={nodes} edges={edges} />
                    </div>

                    <div className="glass p-8 rounded-3xl space-y-6">
                        <h2 className="text-2xl font-bold border-b border-white/5 pb-4 uppercase tracking-tighter">Detalhes da Implementação</h2>
                        <div className="prose prose-invert max-w-none text-white/60 space-y-4">
                            <p>O sistema atua como um orquestrador financeiro, transformando documentos estáticos (PDFs) em lançamentos contábeis precisos no Sienge.</p>

                            <h3 className="text-white font-bold mt-6 uppercase text-sm tracking-widest">Stack Tecnológica</h3>
                            <ul className="list-disc pl-5 space-y-4 marker:text-neon-green">
                                <li><strong>OCR Híbrido</strong>: Combinação de Tesseract e Ghostscript para ler tanto PDFs nativos quanto escaneados.</li>
                                <li><strong>Inteligência Regex</strong>: Padrões determinísticos para extração de CNPJ, Datas e Valores com alta precisão.</li>
                                <li><strong>Database Auxiliar</strong>: MySQL intermediário para mapeamento &quot;De-Para&quot; de Fornecedores e Centros de Custo.</li>
                                <li><strong>Integração Sienge</strong>: Full API REST para criação de títulos (`POST /bills`) e anexos.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <aside className="space-y-8">
                    <div className="glass p-6 rounded-2xl border-white/5 bg-black/20">
                        <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Specs Técnicas</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-white/40 text-[11px]">Core</span>
                                <span className="text-white font-mono text-[10px] text-neon-green uppercase">Python 3.10+</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-white/40 text-[11px]">Motor OCR</span>
                                <span className="text-white font-mono text-[10px] uppercase flex items-center gap-1">
                                    <ScanLine className="w-3 h-3" /> Tesseract
                                </span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-white/40 text-[11px]">Banco Dados</span>
                                <span className="text-white font-mono text-[10px] uppercase flex items-center gap-1">
                                    <Database className="w-3 h-3" /> MySQL
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/40 text-[11px]">Expansão AI</span>
                                <span className="text-white font-mono text-[10px] uppercase flex items-center gap-1">
                                    <BrainCircuit className="w-3 h-3" /> Ollama (Llama 3.2)
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 glass rounded-2xl border-neon-green/20 bg-neon-green/5">
                        <h4 className="text-sm font-bold mb-2">Impacto no Negócio</h4>
                        <p className="text-white/50 text-xs leading-relaxed">
                            &quot;Redução drástica no tempo de lançamento de títulos e eliminação de erros de digitação. Auditoria e compliance garantidos desde a entrada do documento.&quot;
                        </p>
                    </div>
                </aside>
            </div>
        </main>
    );
}
