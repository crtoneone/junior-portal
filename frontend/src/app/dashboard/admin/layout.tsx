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

  return (
    <div className="min-h-[calc(100vh-4rem)] flex bg-gray-50">
      <aside className={`${collapsed ? 'w-16' : 'w-56'} hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-200`}>
        <div className="flex items-center justify-between h-14 px-3 border-b border-gray-100">
          {!collapsed && <span className="text-sm font-semibold text-gray-700">Admin Panel</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
        <nav className="flex-1 py-3 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard/admin' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="relative">
                  <Icon className="w-5 h-5 shrink-0" />
                  {item.href === '/dashboard/admin/messages' && unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </div>
                {!collapsed && <span>{item.label}</span>}
                {!collapsed && item.href === '/dashboard/admin/messages' && unreadCount > 0 && (
                  <span className="ml-auto flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 h-full bg-white border-r border-gray-200 flex flex-col">
            <div className="flex items-center justify-between h-14 px-4 border-b border-gray-100">
              <span className="text-sm font-semibold text-gray-700">Admin Panel</span>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="flex-1 py-3 px-2 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/dashboard/admin' && pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{item.label}</span>
                    {item.href === '/dashboard/admin/messages' && unreadCount > 0 && (
                      <span className="ml-auto flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="md:hidden flex items-center gap-3 h-12 px-4 border-b bg-white">
          <button onClick={() => setMobileOpen(true)} className="p-1 text-gray-500">
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-gray-700">Admin Panel</span>
        </div>
        {children}
      </div>
    </div>
  );
}
