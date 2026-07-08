'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import {
  Users, Briefcase, Building2, FileText, UserPlus, TrendingUp,
  Mail, AlertCircle, CheckCircle, XCircle,
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

  if (loading) return <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" /></div>;

  const cards = [
    { label: 'Používatelia', value: stats?.totalUsers || 0, icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Kandidáti', value: stats?.totalCandidates || 0, icon: UserPlus, color: 'bg-green-100 text-green-600' },
    { label: 'Firmy', value: stats?.totalEmployers || 0, icon: Building2, color: 'bg-purple-100 text-purple-600' },
    { label: 'Admini', value: stats?.totalAdmins || 0, icon: TrendingUp, color: 'bg-orange-100 text-orange-600' },
    { label: 'Ponuky', value: stats?.totalJobs || 0, icon: Briefcase, color: 'bg-indigo-100 text-indigo-600' },
    { label: 'Aktívne', value: stats?.activeJobs || 0, icon: CheckCircle, color: 'bg-green-100 text-green-600' },
    { label: 'Uzavreté', value: stats?.closedJobs || 0, icon: XCircle, color: 'bg-gray-100 text-gray-600' },
    { label: 'Prihlášky', value: stats?.totalApplications || 0, icon: FileText, color: 'bg-pink-100 text-pink-600' },
    { label: 'Nespracované správy', value: stats?.unreadMessages || 0, icon: Mail, color: 'bg-red-100 text-red-600' },
  ];

  const trends = [
    { label: 'Noví používatelia (7 dní)', value: stats?.usersLast7 || 0 },
    { label: 'Noví používatelia (30 dní)', value: stats?.usersLast30 || 0 },
    { label: 'Nové ponuky (7 dní)', value: stats?.jobsLast7 || 0 },
    { label: 'Nové ponuky (30 dní)', value: stats?.jobsLast30 || 0 },
    { label: 'Nové prihlášky (30 dní)', value: stats?.applicationsLast30 || 0 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`rounded-lg p-2.5 ${card.color}`}>
                <card.icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-bold">{card.value}</p>
                <p className="text-xs text-gray-500 truncate">{card.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Trendy (posledné obdobie)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {trends.map((t) => (
              <div key={t.label} className="text-center p-3 rounded-lg bg-gray-50">
                <p className="text-xl font-bold text-blue-600">{t.value}</p>
                <p className="text-xs text-gray-500 mt-1">{t.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
