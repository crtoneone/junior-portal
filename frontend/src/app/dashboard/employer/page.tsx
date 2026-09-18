'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatDate, formatSalary, getJobTypeLabel, getStatusColor } from '@/lib/utils';
import { Briefcase, Users, Eye, Plus } from 'lucide-react';

export default function EmployerDashboard() {
  const { user, token } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    (async () => {
      const [jobsRes, statsRes] = await Promise.allSettled([
        api.get('/jobs/employer/mine', token),
        api.get('/jobs/employer/stats', token),
      ]);
      if (jobsRes.status === 'fulfilled') setJobs(jobsRes.value);
      if (statsRes.status === 'fulfilled') setStats(statsRes.value);
      setLoading(false);
    })();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[var(--jp-canvas)]">
        <div className="h-8 w-8 animate-spin border-4 border-[var(--jp-accent)] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--jp-canvas)]">
    <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-10 py-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="bl-mono text-[11px] uppercase tracking-wide text-[var(--jp-muted)] mb-2 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-[var(--jp-signal)]" /> Prehľad tvojich ponúk
          </p>
          <h1 className="bl-display text-4xl">Vitaj, <span className="text-[var(--jp-signal)]">{user?.firstName}</span>!</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/employer/profile">
            <Button variant="outline">Profil spoločnosti</Button>
          </Link>
          <Link href="/dashboard/employer/create-job">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nová ponuka
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-[2px] sm:grid-cols-2 lg:grid-cols-4 mb-8 bg-[var(--jp-border)] border-2 border-[var(--jp-border)]">
        <div className="bg-[var(--jp-bg)] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="bl-display text-4xl text-[var(--jp-signal)]">{stats?.totalJobs || 0}</p>
              <p className="bl-mono mt-2 text-[11px] text-[var(--jp-muted)]">Celkom ponúk</p>
            </div>
            <div className="p-3 border-2 border-[var(--jp-border)]">
              <Briefcase className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="bg-[var(--jp-bg)] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="bl-display text-4xl text-[var(--jp-signal)]">{stats?.activeJobs || 0}</p>
              <p className="bl-mono mt-2 text-[11px] text-[var(--jp-muted)]">Aktívne</p>
            </div>
            <div className="p-3 border-2 border-[var(--jp-border)]">
              <Eye className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="bg-[var(--jp-bg)] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="bl-display text-4xl text-[var(--jp-signal)]">{stats?.totalApplications || 0}</p>
              <p className="bl-mono mt-2 text-[11px] text-[var(--jp-muted)]">Prihlášky</p>
            </div>
            <div className="p-3 border-2 border-[var(--jp-border)]">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg uppercase">Tvoje ponuky</CardTitle>
        </CardHeader>
        <CardContent>
          {jobs.length === 0 ? (
            <div className="text-center py-12 text-[var(--jp-muted)]">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-[var(--jp-border)]" />
              <p className="text-lg font-bold uppercase mb-2">Zatiaľ nemáš žiadne ponuky</p>
              <p className="bl-mono text-sm mb-6">Vytvor svoju prvú ponuku a nájdi juniora do tímu.</p>
              <Link href="/dashboard/employer/create-job">
                <Button>Vytvoriť ponuku</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job: any) => (
                <div key={job.id} className="flex items-center justify-between p-4 border-2 border-[var(--jp-border)] bg-[var(--jp-bg)] hover:border-[var(--jp-signal)] transition-colors flex-wrap gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Link href={`/jobs/${job.id}`} className="font-bold uppercase text-sm text-[var(--jp-text)] hover:text-[var(--jp-signal)]">
                        {job.title}
                      </Link>
                      <Badge variant={job.status === 'ACTIVE' ? 'success' : 'secondary'}>
                        {job.status === 'ACTIVE' ? 'Aktívna' : 'Zatvorená'}
                      </Badge>
                    </div>
                    <p className="bl-mono text-xs text-[var(--jp-muted)] mt-1">
                      {job.location} • {getJobTypeLabel(job.type)} • {job._count?.applications || 0} prihlášok
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link href={`/dashboard/employer/jobs/${job.id}/applications`}>
                      <Button variant="outline" size="sm">Prihlášky</Button>
                    </Link>
                    <Link href={`/dashboard/employer/jobs/${job.id}/edit`}>
                      <Button variant="ghost" size="sm">Upraviť</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
