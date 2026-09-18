'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import {
  LayoutDashboard, Users, Briefcase, GraduationCap, Mail,
  ChevronLeft, ChevronRight, Menu, X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/admin/users', label: 'Používatelia', icon: Users },
  { href: '/dashboard/admin/jobs', label: 'Ponuky', icon: Briefcase },
  { href: '/dashboard/admin/skills', label: 'Skills', icon: GraduationCap },
  { href: '/dashboard/admin/messages', label: 'Správy', icon: Mail },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, token } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!token) return;
    api.get('/admin/contact-messages/stats', token)
      .then((d: any) => setUnreadCount(d.unread))
      .catch(() => {});
  }, [token]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const NavLink = ({ item, showLabel = true }: { item: any; showLabel?: boolean }) => {
    const isActive = pathname === item.href || (item.href !== '/dashboard/admin' && pathname.startsWith(item.href));
    const Icon = item.icon;
    return (
      <Link
        href={item.href}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 text-sm transition-colors',
          isActive
            ? 'bg-[var(--jp-signal)] text-[var(--jp-ink)] font-bold'
            : 'text-[var(--jp-text)] hover:bg-[var(--jp-surface)]'
        )}
        title={!showLabel ? item.label : undefined}
      >
        <Icon className="w-5 h-5 shrink-0" />
        {showLabel && <span>{item.label}</span>}
        {showLabel && item.href === '/dashboard/admin/messages' && unreadCount > 0 && (
          <span className="ml-auto flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-[var(--jp-ink)] text-[var(--jp-signal)]">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex bg-[var(--jp-canvas)]">
      <aside className={cn(`${collapsed ? 'w-16' : 'w-56'} hidden md:flex flex-col bg-[var(--jp-bg)] border-r-2 border-[var(--jp-border)] transition-all duration-200`)}>
        <div className="flex items-center justify-between h-14 px-3 border-b-2 border-[var(--jp-border)]">
          {!collapsed && <span className="bl-mono text-sm font-bold text-[var(--jp-text)]">Admin<br />Panel</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 hover:bg-[var(--jp-surface)] text-[var(--jp-muted)]">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
        <nav className="flex-1 py-3 px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} showLabel={!collapsed} />
          ))}
        </nav>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 h-full bg-[var(--jp-bg)] border-r-2 border-[var(--jp-border)] flex flex-col">
            <div className="flex items-center justify-between h-14 px-4 border-b-2 border-[var(--jp-border)]">
              <span className="bl-mono text-sm font-bold text-[var(--jp-text)]">Admin Panel</span>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 hover:bg-[var(--jp-surface)] text-[var(--jp-muted)]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="flex-1 py-3 px-2 space-y-1">
              {navItems.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </nav>
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="md:hidden flex items-center gap-3 h-12 px-4 border-b-2 border-[var(--jp-border)] bg-[var(--jp-bg)]">
          <button onClick={() => setMobileOpen(true)} className="p-1 text-[var(--jp-text)]">
            <Menu className="w-5 h-5" />
          </button>
          <span className="bl-mono text-sm font-bold text-[var(--jp-text)]">Admin Panel</span>
        </div>
        {children}
      </div>
    </div>
  );
}