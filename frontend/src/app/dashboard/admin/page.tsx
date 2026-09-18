'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import {
  Users, Briefcase, Building2, FileText, UserPlus, TrendingUp,
  Mail, CheckCircle, XCircle,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    if (user && user.role !== 'ADMIN') { router.push('/dashboard'); return; }
    api.get('/admin/dashboard', token)
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token, user]);

  if (loading) return <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center bg-[var(--jp-canvas)]"><div className="h-8 w-8 animate-spin border-4 border-[var(--jp-accent)] border-t-transparent" /></div>;

  const cards = [
    { label: 'Používatelia', value: stats?.totalUsers || 0, icon: Users },
    { label: 'Kandidáti', value: stats?.totalCandidates || 0, icon: UserPlus },
    { label: 'Firmy', value: stats?.totalEmployers || 0, icon: Building2 },
    { label: 'Admini', value: stats?.totalAdmins || 0, icon: TrendingUp },
    { label: 'Ponuky', value: stats?.totalJobs || 0, icon: Briefcase },
    { label: 'Aktívne', value: stats?.activeJobs || 0, icon: CheckCircle },
    { label: 'Uzavreté', value: stats?.closedJobs || 0, icon: XCircle },
    { label: 'Prihlášky', value: stats?.totalApplications || 0, icon: FileText },
    { label: 'Nespracované správy', value: stats?.unreadMessages || 0, icon: Mail },
  ];

  const trends = [
    { label: 'Noví používatelia (7 dní)', value: stats?.usersLast7 || 0 },
    { label: 'Noví používatelia (30 dní)', value: stats?.usersLast30 || 0 },
    { label: 'Nové ponuky (7 dní)', value: stats?.jobsLast7 || 0 },
    { label: 'Nové ponuky (30 dní)', value: stats?.jobsLast30 || 0 },
    { label: 'Nové prihlášky (30 dní)', value: stats?.applicationsLast30 || 0 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[var(--jp-canvas)]">
      <p className="bl-mono text-[11px] uppercase tracking-wide text-[var(--jp-muted)] mb-2 flex items-center gap-2">
        <span className="inline-block w-2.5 h-2.5 bg-[var(--jp-signal)]" /> Prehľad platformy
      </p>
      <h1 className="bl-display text-4xl mb-6">Admin <span className="text-[var(--jp-signal)]">Dashboard.</span></h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[2px] bg-[var(--jp-border)] border-2 border-[var(--jp-border)] mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-[var(--jp-bg)] p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 border-2 border-[var(--jp-border)]">
                <card.icon className="w-4 h-4 text-[var(--jp-signal)]" />
              </div>
              <div className="min-w-0">
                <p className="bl-display text-xl text-[var(--jp-text)]">{card.value}</p>
                <p className="bl-mono text-[10px] text-[var(--jp-muted)] truncate">{card.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-5">
          <h2 className="bl-mono text-sm font-bold uppercase text-[var(--jp-text)] mb-3">Trendy (posledné obdobie)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[2px] bg-[var(--jp-border)] border-2 border-[var(--jp-border)]">
            {trends.map((t) => (
              <div key={t.label} className="text-center p-3 bg-[var(--jp-bg)]">
                <p className="bl-display text-xl text-[var(--jp-signal)]">{t.value}</p>
                <p className="bl-mono text-[10px] text-[var(--jp-muted)] mt-1">{t.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
