'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Key, UserPlus, ShieldCheck, Loader2, Save, AlertCircle } from 'lucide-react';

export default function SettingsPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [newAdminPassword, setNewAdminPassword] = useState('');

    const [loadingPassword, setLoadingPassword] = useState(false);
    const [loadingNewAdmin, setLoadingNewAdmin] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: 'As senhas não coincidem.' });
            return;
        }

        setLoadingPassword(true);
        const { error } = await supabase.auth.updateUser({ password });
        setLoadingPassword(false);

        if (error) {
            setMessage({ type: 'error', text: error.message });
        } else {
            setMessage({ type: 'success', text: 'Senha atualizada com sucesso!' });
            setPassword('');
            setConfirmPassword('');
        }
    };

    const handleCreateAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingNewAdmin(true);
        setMessage(null);

        try {
            const response = await fetch('/api/create-admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: newAdminEmail, password: newAdminPassword }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Erro ao criar administrador');

            setMessage({ type: 'success', text: `Administrador ${newAdminEmail} criado com sucesso!` });
            setNewAdminEmail('');
            setNewAdminPassword('');
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoadingNewAdmin(false);
        }
    };

    return (
        <div className="space-y-12 max-w-4xl font-sans">
            <header className="space-y-4">
                <h1 className="text-4xl font-black tracking-tight uppercase italic">Configurações <span className="text-neon-blue">de Segurança.</span></h1>
                <p className="text-white/40 leading-relaxed font-medium">
                    Gerencie o acesso à infraestrutura digital da Baptista Leal. Mantenha credenciais fortes para garantir a integridade do hub.
                </p>
            </header>

            {message && (
                <div className={`p-4 rounded-xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${message.type === 'success'
                        ? 'bg-neon-green/10 border-neon-green/20 text-neon-green'
                        : 'bg-neon-pink/10 border-neon-pink/20 text-neon-pink'
                    }`}>
                    {message.type === 'success' ? <ShieldCheck className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <span className="text-sm font-bold uppercase tracking-tight">{message.text}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Alterar Minha Senha */}
                <section className="glass p-8 rounded-3xl border-white/5 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 blur-3xl pointer-events-none" />
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-neon-blue/10 rounded-lg">
                            <Key className="w-5 h-5 text-neon-blue" />
                        </div>
                        <h2 className="text-lg font-bold uppercase tracking-tighter">Alterar Minha Senha</h2>
                    </div>

                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] pl-1">Nova Senha</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:neon-border-blue transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] pl-1">Confirmar Senha</label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:neon-border-blue transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            disabled={loadingPassword}
                            className="w-full bg-white text-black font-black py-3 rounded-xl hover:bg-neon-blue hover:text-white transition-all duration-300 flex items-center justify-center gap-2 uppercase text-xs tracking-widest disabled:opacity-50"
                        >
                            {loadingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Salvar Nova Senha
                        </button>
                    </form>
                </section>

                {/* Criar Novo Administrador */}
                <section className="glass p-8 rounded-3xl border-white/5 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/5 blur-3xl pointer-events-none" />
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-neon-purple/10 rounded-lg">
                            <UserPlus className="w-5 h-5 text-neon-purple" />
                        </div>
                        <h2 className="text-lg font-bold uppercase tracking-tighter">Novo Administrador</h2>
                    </div>

                    <form onSubmit={handleCreateAdmin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] pl-1">E-mail Corporativo</label>
                            <input
                                type="email"
                                required
                                value={newAdminEmail}
                                onChange={(e) => setNewAdminEmail(e.target.value)}
                                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:neon-border-purple transition-all"
                                placeholder="exemplo@baptistaleal.com.br"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] pl-1">Senha Provisória</label>
                            <input
                                type="password"
                                required
                                value={newAdminPassword}
                                onChange={(e) => setNewAdminPassword(e.target.value)}
                                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:neon-border-purple transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            disabled={loadingNewAdmin}
                            className="w-full bg-transparent border border-white/10 text-white font-black py-3 rounded-xl hover:bg-neon-purple hover:border-neon-purple transition-all duration-300 flex items-center justify-center gap-2 uppercase text-xs tracking-widest disabled:opacity-50"
                        >
                            {loadingNewAdmin ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                            Criar Acesso TI
                        </button>
                    </form>
                </section>
            </div>

            <footer className="pt-8 border-t border-white/5">
                <p className="text-[10px] text-white/20 font-mono uppercase tracking-[0.4em] text-center">
                    Criptografia AES-256 via Supabase Service Role • Baptista Leal Operations
                </p>
            </footer>
        </div>
    );
}
