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
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vitaj, {user?.firstName}!</h1>
          <p className="text-gray-500">Prehľad tvojich ponúk</p>
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-3">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalJobs || 0}</p>
                <p className="text-sm text-gray-500">Celkom ponúk</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-3">
                <Eye className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats?.activeJobs || 0}</p>
                <p className="text-sm text-gray-500">Aktívne</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-3">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalApplications || 0}</p>
                <p className="text-sm text-gray-500">Prihlášky</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tvoje ponuky</CardTitle>
        </CardHeader>
        <CardContent>
          {jobs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">Zatiaľ nemáš žiadne ponuky</p>
              <p className="text-sm mb-6">Vytvor svoju prvú ponuku a nájdi juniora do tímu.</p>
              <Link href="/dashboard/employer/create-job">
                <Button>Vytvoriť ponuku</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job: any) => (
                <div key={job.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <Link href={`/jobs/${job.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                        {job.title}
                      </Link>
                      <Badge variant={job.status === 'ACTIVE' ? 'success' : 'secondary'}>
                        {job.status === 'ACTIVE' ? 'Aktívna' : 'Zatvorená'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
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
  );
}
