'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatDate, formatSalary, getJobTypeLabel } from '@/lib/utils';
import { Briefcase, Bookmark, TrendingUp, FileText, Star, BarChart3 } from 'lucide-react';

export default function CandidateDashboard() {
  const { user, token } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    (async () => {
      const [appsRes, statsRes, savedRes, recRes] = await Promise.allSettled([
        api.get('/applications/my', token),
        api.get('/applications/my/stats', token),
        api.get('/candidates/saved-jobs', token),
        api.get('/candidates/recommended', token),
      ]);
      if (appsRes.status === 'fulfilled') setApplications(appsRes.value);
      if (statsRes.status === 'fulfilled') setStats(statsRes.value);
      if (savedRes.status === 'fulfilled') setSavedJobs(savedRes.value);
      if (recRes.status === 'fulfilled') setRecommended(recRes.value);
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
          <p className="text-gray-500">Tvoj prehľad</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/cv">
            <Button variant="outline">CV Builder</Button>
          </Link>
          <Link href="/profile">
            <Button variant="outline">Profil</Button>
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
                <p className="text-2xl font-bold text-gray-900">{stats?.total || 0}</p>
                <p className="text-sm text-gray-500">Prihlášky</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-100 p-3">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats?.reviewed || 0}</p>
                <p className="text-sm text-gray-500">V procese</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-3">
                <BarChart3 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats?.accepted || 0}</p>
                <p className="text-sm text-gray-500">Prijaté</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-3">
                <Bookmark className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{savedJobs?.length || 0}</p>
                <p className="text-sm text-gray-500">Uložené</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {recommended.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Odporúčané ponuky
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommended.slice(0, 4).map((job: any) => (
                <Link key={job.id} href={`/jobs/${job.id}`}>
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{job.title}</p>
                        <p className="text-sm text-gray-500">{job.employer?.companyName}</p>
                      </div>
                      {job.matchScore >= 0 && (
                        <div className={`flex-shrink-0 flex items-center gap-2 rounded-full px-5 py-2.5 text-2xl font-bold ${
                          job.matchScore >= 70 ? 'bg-green-100 text-green-700' :
                          job.matchScore >= 40 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          <Star className="h-7 w-7" />
                          {job.matchScore}% match
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs">{getJobTypeLabel(job.type)}</Badge>
                      <Badge variant="outline" className="text-xs">{job.location}</Badge>
                    </div>
                    {job.matchDetails?.matchedSkills?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {job.matchDetails.matchedSkills.map((s: string) => (
                          <span key={s} className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            {recommended.length > 4 && (
              <div className="mt-4 text-center">
                <Link href="/jobs">
                  <Button variant="outline">Zobraziť všetky ponuky</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Nedávne prihlášky</CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Zatiaľ si sa neprihlásil na žiadnu ponuku.</p>
                <Link href="/jobs">
                  <Button variant="outline" className="mt-4">Prezerať ponuky</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.slice(0, 5).map((app: any) => (
                  <div key={app.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">{app.job.title}</p>
                      <p className="text-sm text-gray-500">{app.job.employer.companyName}</p>
                      <p className="text-xs text-gray-400">{formatDate(app.createdAt)}</p>
                    </div>
                    <Badge variant={app.status === 'PENDING' ? 'warning' : app.status === 'ACCEPTED' ? 'success' : app.status === 'REJECTED' ? 'danger' : 'default'}>
                      {app.status === 'PENDING' ? 'Čaká' : app.status === 'REVIEWED' ? 'Prezerá sa' : app.status === 'ACCEPTED' ? 'Prijaté' : 'Zamietnuté'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Uložené ponuky</CardTitle>
          </CardHeader>
          <CardContent>
            {savedJobs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Zatiaľ nemáš žiadne uložené ponuky.</p>
                <Link href="/jobs">
                  <Button variant="outline" className="mt-4">Prezerať ponuky</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {savedJobs.slice(0, 5).map((saved: any) => (
                  <Link key={saved.id} href={`/jobs/${saved.job.id}`}>
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="font-medium text-gray-900">{saved.job.title}</p>
                        <p className="text-sm text-gray-500">{saved.job.employer.companyName} • {saved.job.location}</p>
                      </div>
                      <Badge>{getJobTypeLabel(saved.job.type)}</Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
