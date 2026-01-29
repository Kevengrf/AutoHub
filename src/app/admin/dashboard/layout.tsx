'use client';

import { LayoutDashboard, PlusCircle, Settings, LogOut, Cpu, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin');
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Visão Geral', href: '/admin/dashboard' },
        { icon: Cpu, label: 'Automações', href: '/admin/dashboard/automations' },
        { icon: PlusCircle, label: 'Novo Fluxo', href: '/admin/dashboard/new' },
        { icon: Settings, label: 'Configurações', href: '/admin/dashboard/settings' },
    ];

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between p-4 glass border-b border-white/5 z-40">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/img/cblicodark.png" alt="CBL Logo" width={24} height={24} className="brightness-125" />
                    <span className="font-black text-xs tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">TI BAPTISTA LEAL</span>
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 glass rounded-lg text-neon-blue"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </header>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
                w-64 glass border-r border-white/5 flex flex-col p-6 space-y-8 z-50 md:z-20
            `}>
                <div className="flex justify-between items-center md:block">
                    <Link href="/" className="flex items-center gap-3 px-2 group">
                        <div className="p-1.5 glass rounded-lg neon-border-blue flex items-center justify-center group-hover:neon-glow-blue transition-all">
                            <Image src="/img/cblicodark.png" alt="CBL Logo" width={24} height={24} className="brightness-125 contrast-125" />
                        </div>
                        <span className="font-black tracking-tighter text-lg bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple uppercase">TI BAPTISTA LEAL</span>
                    </Link>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden p-2 text-white/40">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                    ? 'bg-neon-blue/10 text-neon-blue neon-border-blue'
                                    : 'text-white/40 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? 'neon-text-blue' : 'group-hover:text-neon-blue'}`} />
                                <span className="text-sm font-bold">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-neon-pink hover:bg-neon-pink/5 transition-all duration-300 mt-auto group"
                >
                    <LogOut className="w-5 h-5 group-hover:neon-text-pink" />
                    <span className="text-sm font-bold">Disconnect</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-12 relative">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neon-purple/5 blur-[100px] pointer-events-none" />
                {children}
            </main>
        </div>
    );
}
