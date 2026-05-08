'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AdminProvider, useAdmin } from '@/lib/adminContext';
import { useMessages } from '@/lib/useSiteData';

const NAV = [
  { id: 'overview',    label: 'Overview',    icon: '📊', href: '/admin/dashboard' },
  { id: 'hero',        label: 'Hero Section', icon: '🌟', href: '/admin/dashboard/hero' },
  { id: 'experience',  label: 'Experience',  icon: '🏅', href: '/admin/dashboard/experience' },
  { id: 'story',       label: 'My Story',    icon: '📖', href: '/admin/dashboard/story' },
  { id: 'blog',        label: 'Blog Posts',  icon: '📝', href: '/admin/dashboard/blog' },
  { id: 'messages',    label: 'Messages',    icon: '💬', href: '/admin/dashboard/messages' },
  { id: 'contact',     label: 'Contact',     icon: '📞', href: '/admin/dashboard/contact' },
];

function SaveBadge() {
  const { saved } = useAdmin();
  if (!saved) return null;
  return (
    <span className="fixed bottom-6 right-6 z-50 bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-xl shadow-teal-500/30 flex items-center gap-2 animate-bounce">
      ✅ Changes saved!
    </span>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const messages = useMessages();
  const unreadCount = messages.filter(m => !m.read).length;

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== '1') {
      router.replace('/admin');
    }
  }, [router]);

  const logout = () => {
    sessionStorage.removeItem('admin_auth');
    router.push('/admin');
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans">
      {/* ── Sidebar ── */}
      <aside className={`flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'} shrink-0`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shrink-0 text-xl">🏥</div>
          {!collapsed && <span className="font-extrabold text-white text-sm leading-tight">Dipti<br/><span className="text-teal-400 font-medium text-xs">Admin Panel</span></span>}
          <button onClick={() => setCollapsed(!collapsed)} className="ml-auto text-slate-500 hover:text-white transition shrink-0">
            {collapsed ? '»' : '«'}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {NAV.map((n) => {
            const active = pathname === n.href;
            const showBadge = n.id === 'messages' && unreadCount > 0;
            return (
              <Link
                key={n.id}
                href={n.href}
                title={n.label}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium relative ${
                  active
                    ? 'bg-teal-600/20 text-teal-400 border border-teal-500/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-lg shrink-0">{n.icon}</span>
                {!collapsed && (
                  <>
                    <span>{n.label}</span>
                    {showBadge && (
                      <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </>
                )}
                {collapsed && showBadge && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 space-y-1">
          <Link
            href="/"
            target="_blank"
            title="View Site"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition text-sm font-medium"
          >
            <span className="text-lg shrink-0">🌐</span>
            {!collapsed && 'View Site'}
          </Link>
          <button
            onClick={logout}
            title="Logout"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-red-900/30 hover:text-red-400 transition text-sm font-medium"
          >
            <span className="text-lg shrink-0">🚪</span>
            {!collapsed && 'Logout'}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      <SaveBadge />
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <Shell>{children}</Shell>
    </AdminProvider>
  );
}
