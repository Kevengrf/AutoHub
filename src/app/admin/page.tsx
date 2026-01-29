'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Key, Loader2, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            // Tradução amigável para erros comuns
            const message = error.message === 'Invalid login credentials'
                ? 'Credenciais de acesso inválidas. Verifique o e-mail e a senha.'
                : error.message;
            setError(message);
            setLoading(false);
        } else {
            router.push('/admin/dashboard');
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Brilho de Fundo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-[120px]" />

            <div className="w-full max-w-md z-10 space-y-8">
                <div className="text-center space-y-4">
                    <div className="inline-flex p-3 glass neon-border-blue rounded-2xl mb-2 flex items-center justify-center">
                        <Image
                            src="/img/cblicodark.png"
                            alt="CBL Icon"
                            width={48}
                            height={48}
                            className="brightness-125 contrast-125"
                        />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight uppercase">Conexão <span className="text-neon-blue">Inova TI.</span></h1>
                    <p className="text-white/40 text-sm font-medium">Acesso restrito a colaboradores autorizados da Baptista Leal.</p>
                </div>

                <form onSubmit={handleLogin} className="glass p-8 rounded-3xl border-white/5 space-y-6 bg-black/40">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] pl-1">Identificador (E-mail)</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@baptistaleal.com.br"
                            className="w-full bg-black/60 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:outline-none focus:neon-border-blue transition-all font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] pl-1">Chave de Acesso</label>
                        <div className="relative">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-black/60 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:outline-none focus:neon-border-blue transition-all font-medium"
                            />
                            <Key className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10" />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-neon-pink/10 border border-neon-pink/20 rounded-lg text-neon-pink text-[11px] text-center font-bold animate-in fade-in zoom-in duration-300">
                            {error}
                        </div>
                    )}

                    <button
                        disabled={loading}
                        className="w-full bg-white text-black font-black py-3 rounded-xl hover:bg-neon-blue hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 uppercase tracking-widest text-xs"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <>
                                INICIAR SESSÃO NO HUB
                                <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="flex flex-col items-center gap-4">
                    <p className="text-[10px] text-white/20 font-mono uppercase tracking-[0.3em] text-center">
                        Criptografia de Ponta a Ponta Ativa
                    </p>
                    <Image
                        src="/img/logonavblack.png"
                        alt="Logo Baptista Leal"
                        width={120}
                        height={30}
                        className="opacity-20 grayscale"
                    />
                </div>
            </div>
        </main>
    );
}
